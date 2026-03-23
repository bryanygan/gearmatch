"""
Fetch replacement images for products missing image_url.
Strategy:
1. Extract ASIN from Amazon /dp/ URLs → construct Amazon image URL
2. For search URLs, scrape og:image from Amazon search results
3. Try manufacturer_url og:image as fallback
4. Validate every candidate with CLIP before accepting
5. Verify final URL is publicly accessible
"""

import open_clip
import torch
from PIL import Image
import json
import io
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor

# ============================================================
# CONFIG
# ============================================================

DATA_DIR = Path("src/data/products")
CACHE_DIR = Path("scripts/.image-cache")
CACHE_DIR.mkdir(parents=True, exist_ok=True)

CATEGORY_MAP = {
    "mice": "gaming_mouse",
    "audio": "gaming_headset",
    "keyboards": "gaming_keyboard",
    "monitors": "gaming_monitor",
}

PRODUCT_LABELS = {
    "gaming_monitor": [
        "a gaming monitor", "a computer display", "an LCD screen",
        "a curved gaming monitor", "a flat panel display", "a monitor screen",
    ],
    "gaming_mouse": [
        "a gaming mouse", "a computer mouse", "a wireless gaming mouse",
        "an ergonomic mouse", "a wired mouse",
    ],
    "gaming_keyboard": [
        "a mechanical keyboard", "a gaming keyboard", "a computer keyboard",
        "a wireless keyboard", "a compact keyboard",
    ],
    "gaming_headset": [
        "a gaming headset", "gaming headphones", "headphones",
        "over ear headphones", "in ear monitors", "earbuds", "IEM earphones",
    ],
}

ACCESSORY_LABELS = [
    "a power cable", "a USB cable", "an HDMI cable", "a charging cable",
    "a mounting bracket", "a VESA mount", "a monitor stand",
    "a product box", "packaging", "a cardboard box", "a manual",
    "replacement ear pads", "extra keycaps", "mouse skates",
    "a USB dongle", "a wireless receiver", "an adapter",
    "a carrying case", "a wrist rest", "a remote control",
    "a close up of ports", "a close up of connectors",
    "a plain white background with no product", "a logo", "a brand logo",
    "text only", "a screenshot", "a desk with no clear product",
]

CLIP_THRESHOLD = 0.26  # Product score must exceed this
CLIP_MARGIN = 0.02     # Product must beat accessory by this margin

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


# ============================================================
# CLIP CLASSIFIER (reused from classify-product-images.py)
# ============================================================

class CLIPValidator:
    def __init__(self):
        print("Loading CLIP model...")
        self.device = "mps" if torch.backends.mps.is_available() else "cpu"
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32", pretrained="laion2b_s34b_b79k"
        )
        self.model = self.model.to(self.device).eval()
        self.tokenizer = open_clip.get_tokenizer("ViT-B-32")

        # Pre-encode
        with torch.no_grad():
            tokens = self.tokenizer(ACCESSORY_LABELS).to(self.device)
            self._acc_feats = self.model.encode_text(tokens)
            self._acc_feats /= self._acc_feats.norm(dim=-1, keepdim=True)

        self._prod_feats = {}
        self._prod_labels = {}
        for cat, labels in PRODUCT_LABELS.items():
            tokens = self.tokenizer(labels).to(self.device)
            with torch.no_grad():
                feats = self.model.encode_text(tokens)
                feats /= feats.norm(dim=-1, keepdim=True)
            self._prod_feats[cat] = feats
            self._prod_labels[cat] = labels
        print(f"  CLIP ready on {self.device}\n")

    def validate(self, img: Image.Image, clip_cat: str) -> tuple[bool, float, str]:
        """Returns (passed, product_score, reason)"""
        tensor = self.preprocess(img.convert("RGB")).unsqueeze(0).to(self.device)
        with torch.no_grad():
            feats = self.model.encode_image(tensor)
            feats /= feats.norm(dim=-1, keepdim=True)

        prod_scores = (feats @ self._prod_feats[clip_cat].T).squeeze(0)
        best_prod = prod_scores.max().item()

        acc_scores = (feats @ self._acc_feats.T).squeeze(0)
        best_acc = acc_scores.max().item()
        best_acc_label = ACCESSORY_LABELS[acc_scores.argmax().item()]

        gap = best_prod - best_acc

        if best_prod < CLIP_THRESHOLD:
            return False, best_prod, f"Low product score {best_prod:.3f}"
        if best_acc > best_prod:
            return False, best_prod, f"Accessory '{best_acc_label}' ({best_acc:.3f}) > product ({best_prod:.3f})"
        if gap < CLIP_MARGIN:
            return False, best_prod, f"Gap too small ({gap:.3f})"
        return True, best_prod, f"Passed ({best_prod:.3f})"


# ============================================================
# IMAGE FETCHING STRATEGIES
# ============================================================

def download_image(url: str, timeout: int = 12) -> Image.Image | None:
    """Download image, return PIL Image or None."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read()
            if len(data) < 1000:  # Too small, likely an error page
                return None
            img = Image.open(io.BytesIO(data))
            if img.size[0] < 50 or img.size[1] < 50:  # Too small
                return None
            return img
    except Exception:
        return None


def verify_url_accessible(url: str) -> bool:
    """HEAD request to verify URL is publicly accessible."""
    try:
        req = urllib.request.Request(url, method="HEAD", headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content_type = resp.headers.get("Content-Type", "")
            return resp.status == 200 and "image" in content_type
    except Exception:
        # Some servers don't support HEAD, try GET with range
        try:
            headers = {**HEADERS, "Range": "bytes=0-1023"}
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                return resp.status in (200, 206)
        except Exception:
            return False


def extract_asin(url: str) -> str | None:
    """Extract ASIN from Amazon URL."""
    # Match /dp/ASIN or /gp/product/ASIN
    match = re.search(r'/dp/([A-Z0-9]{10})', url)
    if match:
        return match.group(1)
    match = re.search(r'/gp/product/([A-Z0-9]{10})', url)
    if match:
        return match.group(1)
    return None


def get_amazon_image_url(asin: str) -> str:
    """Construct Amazon product image URL from ASIN."""
    return f"https://m.media-amazon.com/images/I/{asin}._AC_SL1500_.jpg"


def scrape_amazon_image(url: str) -> str | None:
    """Fetch Amazon page and extract the main product image URL."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")

        # Try og:image first
        match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
        if match:
            img_url = match.group(1)
            if "media-amazon.com" in img_url:
                # Upgrade to high-res
                img_url = re.sub(r'\._[A-Z]+_\d+_\.', '._AC_SL1500_.', img_url)
                return img_url

        # Try data-a-dynamic-image (JSON of image URLs)
        match = re.search(r'data-a-dynamic-image="(\{[^"]+\})"', html)
        if match:
            try:
                img_data = json.loads(match.group(1).replace("&quot;", '"'))
                # Pick the largest image
                best_url = max(img_data.keys(), key=lambda u: sum(img_data[u]))
                return best_url
            except Exception:
                pass

        # Try landingImage
        match = re.search(r'"landingImageUrl"\s*:\s*"([^"]+)"', html)
        if match:
            return match.group(1)

        # Try any amazon image in the page
        matches = re.findall(r'https://m\.media-amazon\.com/images/I/[A-Za-z0-9+_.-]+\.jpg', html)
        if matches:
            # Prefer larger images
            for m in matches:
                if "SL1500" in m or "SL1200" in m or "SL1000" in m:
                    return m
            return matches[0]

        return None
    except Exception:
        return None


def scrape_og_image(url: str) -> str | None:
    """Fetch a page and extract og:image."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read(50000).decode("utf-8", errors="ignore")
        match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
        if match:
            return match.group(1)
        return None
    except Exception:
        return None


def find_image_candidates(product: dict) -> list[str]:
    """Generate candidate image URLs for a product, ordered by priority."""
    candidates = []
    product_url = product.get("product_url", "")
    manufacturer_url = product.get("manufacturer_url", "")

    # Strategy 1: Amazon ASIN direct image
    if product_url and "amazon." in product_url:
        asin = extract_asin(product_url)
        if asin:
            # Try multiple Amazon image ID patterns
            candidates.append(f"https://m.media-amazon.com/images/I/{asin}._AC_SL1500_.jpg")

    # Strategy 2: Scrape Amazon page for actual image
    if product_url and "amazon." in product_url and "/dp/" in product_url:
        scraped = scrape_amazon_image(product_url)
        if scraped and scraped not in candidates:
            candidates.append(scraped)

    # Strategy 3: Manufacturer og:image
    if manufacturer_url:
        og = scrape_og_image(manufacturer_url)
        if og:
            candidates.append(og)

    # Strategy 4: Retailer URLs
    for retailer_url in (product.get("retailer_urls") or {}).values():
        if retailer_url and "amazon." in retailer_url:
            asin = extract_asin(retailer_url)
            if asin:
                url = f"https://m.media-amazon.com/images/I/{asin}._AC_SL1500_.jpg"
                if url not in candidates:
                    candidates.append(url)

    return candidates


# ============================================================
# MAIN
# ============================================================

def process_category(cat_file: str, clip_cat: str, validator: CLIPValidator) -> dict:
    """Process one category, return stats and updates."""
    filepath = DATA_DIR / f"{cat_file}.json"
    products = json.loads(filepath.read_text())
    missing = [p for p in products if not p.get("image_url")]

    print(f"\n{'='*60}")
    print(f"  {cat_file.upper()}: {len(missing)} products need images")
    print(f"{'='*60}")

    found = 0
    failed = 0
    updates = {}  # id -> image_url

    for i, product in enumerate(missing):
        name = product.get("name", "unknown")
        pid = product.get("id", "unknown")

        candidates = find_image_candidates(product)
        if not candidates:
            print(f"  [{i+1}/{len(missing)}] {name}: no candidates found")
            failed += 1
            continue

        image_found = False
        for url in candidates:
            # Download
            img = download_image(url)
            if img is None:
                continue

            # CLIP validate
            passed, score, reason = validator.validate(img, clip_cat)
            if not passed:
                continue

            # Verify URL is accessible (important for end users)
            if not verify_url_accessible(url):
                continue

            # Success!
            updates[pid] = url
            found += 1
            image_found = True
            print(f"  [{i+1}/{len(missing)}] {name}: FOUND (score={score:.3f}) {url[:70]}...")
            break

        if not image_found:
            failed += 1
            if candidates:
                print(f"  [{i+1}/{len(missing)}] {name}: tried {len(candidates)} candidates, none passed")

        # Rate limit to avoid hammering servers
        if (i + 1) % 5 == 0:
            time.sleep(0.5)

    # Apply updates
    if updates:
        for p in products:
            if p["id"] in updates:
                p["image_url"] = updates[p["id"]]
        filepath.write_text(json.dumps(products, indent=2) + "\n")

    return {"category": cat_file, "total": len(missing), "found": found, "failed": failed}


def main():
    validator = CLIPValidator()

    results = []
    for cat_file, clip_cat in CATEGORY_MAP.items():
        result = process_category(cat_file, clip_cat, validator)
        results.append(result)

    # Summary
    print(f"\n{'='*60}")
    print(f"  FINAL SUMMARY")
    print(f"{'='*60}")
    total_missing = sum(r["total"] for r in results)
    total_found = sum(r["found"] for r in results)
    total_failed = sum(r["failed"] for r in results)
    for r in results:
        pct = (r["found"] / r["total"] * 100) if r["total"] > 0 else 0
        print(f"  {r['category']:12s}: {r['found']:3d}/{r['total']:3d} found ({pct:.0f}%)")
    print(f"  {'TOTAL':12s}: {total_found:3d}/{total_missing:3d} found ({total_found/total_missing*100:.0f}%)")
    print(f"  Still missing: {total_failed}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
