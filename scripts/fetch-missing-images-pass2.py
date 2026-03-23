"""
Pass 2: More aggressive image fetching for remaining products.
- Relaxed CLIP thresholds (monitors especially need this since they often
  look like "a display showing something" which CLIP struggles with)
- Scrape Amazon search result pages for product ASIN
- Try multiple Amazon image formats
"""

import open_clip
import torch
from PIL import Image
import json
import io
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

DATA_DIR = Path("src/data/products")
CACHE_DIR = Path("scripts/.image-cache")

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
        "a television screen", "a desktop monitor",
    ],
    "gaming_mouse": [
        "a gaming mouse", "a computer mouse", "a wireless gaming mouse",
        "an ergonomic mouse", "a wired mouse", "a trackball mouse",
    ],
    "gaming_keyboard": [
        "a mechanical keyboard", "a gaming keyboard", "a computer keyboard",
        "a wireless keyboard", "a compact keyboard", "a laptop keyboard",
        "a split keyboard",
    ],
    "gaming_headset": [
        "a gaming headset", "gaming headphones", "headphones",
        "over ear headphones", "in ear monitors", "earbuds", "IEM earphones",
        "wireless earbuds",
    ],
}

ACCESSORY_LABELS = [
    "a power cable", "a USB cable", "an HDMI cable", "a charging cable",
    "a mounting bracket", "a VESA mount",
    "a product box", "packaging", "a cardboard box",
    "replacement ear pads", "extra keycaps", "mouse skates",
    "a USB dongle", "a carrying case",
    "a plain white background with no product", "a logo", "a brand logo",
    "text only", "a screenshot",
]

# Relaxed thresholds for pass 2
CLIP_THRESHOLD = 0.22
CLIP_MARGIN = 0.01

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


class CLIPValidator:
    def __init__(self):
        print("Loading CLIP model...")
        self.device = "mps" if torch.backends.mps.is_available() else "cpu"
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32", pretrained="laion2b_s34b_b79k"
        )
        self.model = self.model.to(self.device).eval()
        self.tokenizer = open_clip.get_tokenizer("ViT-B-32")

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

    def validate(self, img, clip_cat):
        tensor = self.preprocess(img.convert("RGB")).unsqueeze(0).to(self.device)
        with torch.no_grad():
            feats = self.model.encode_image(tensor)
            feats /= feats.norm(dim=-1, keepdim=True)

        prod_scores = (feats @ self._prod_feats[clip_cat].T).squeeze(0)
        best_prod = prod_scores.max().item()
        acc_scores = (feats @ self._acc_feats.T).squeeze(0)
        best_acc = acc_scores.max().item()
        best_acc_label = ACCESSORY_LABELS[acc_scores.argmax().item()]

        if best_prod < CLIP_THRESHOLD:
            return False, best_prod, f"Low ({best_prod:.3f})"
        if best_acc > best_prod + CLIP_MARGIN:
            return False, best_prod, f"Accessory '{best_acc_label}' dominates"
        return True, best_prod, f"OK ({best_prod:.3f})"


def download_image(url, timeout=12):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read()
            if len(data) < 1000:
                return None
            img = Image.open(io.BytesIO(data))
            if img.size[0] < 50 or img.size[1] < 50:
                return None
            return img
    except Exception:
        return None


def extract_asin(url):
    match = re.search(r'/dp/([A-Z0-9]{10})', url)
    if match:
        return match.group(1)
    return None


def scrape_amazon_for_asin(search_url):
    """Scrape Amazon search results to find a product ASIN."""
    try:
        req = urllib.request.Request(search_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        # Find ASINs in search results
        asins = re.findall(r'data-asin="([A-Z0-9]{10})"', html)
        if asins:
            return asins[0]  # First result
        # Also try /dp/ links
        dp_asins = re.findall(r'/dp/([A-Z0-9]{10})', html)
        if dp_asins:
            return dp_asins[0]
        return None
    except Exception:
        return None


def scrape_amazon_page_images(url):
    """Get all image URLs from an Amazon product page."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")

        images = []

        # og:image
        match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
        if match:
            images.append(match.group(1))

        # All amazon images
        for m in re.findall(r'(https://m\.media-amazon\.com/images/I/[A-Za-z0-9+_.-]+\.(?:jpg|png))', html):
            if m not in images:
                images.append(m)

        return images
    except Exception:
        return []


def get_amazon_image_urls(asin):
    """Generate multiple possible Amazon image URLs for an ASIN."""
    # Amazon image IDs don't correlate with ASINs, but we can try the product page
    page_url = f"https://www.amazon.com/dp/{asin}"
    images = scrape_amazon_page_images(page_url)

    # Filter to likely product images (larger sizes)
    result = []
    for img in images:
        # Upgrade to high-res
        upgraded = re.sub(r'\._[A-Z_]+\d*_\.', '._AC_SL1500_.', img)
        if upgraded not in result:
            result.append(upgraded)
        if img not in result:
            result.append(img)

    return result[:5]  # Top 5 candidates


def verify_url_accessible(url):
    try:
        req = urllib.request.Request(url, method="HEAD", headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception:
        try:
            headers = {**HEADERS, "Range": "bytes=0-1023"}
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                return resp.status in (200, 206)
        except Exception:
            return False


def find_candidates(product):
    """More aggressive candidate finding for pass 2."""
    candidates = []
    product_url = product.get("product_url", "")
    manufacturer_url = product.get("manufacturer_url", "")

    # Strategy 1: Amazon /dp/ URL - scrape page for images
    if product_url and "amazon." in product_url:
        asin = extract_asin(product_url)
        if asin:
            page_images = get_amazon_image_urls(asin)
            candidates.extend(page_images)

    # Strategy 2: Amazon search URL - find ASIN first, then get images
    if product_url and "amazon." in product_url and "/s?" in product_url:
        asin = scrape_amazon_for_asin(product_url)
        if asin:
            page_images = get_amazon_image_urls(asin)
            candidates.extend(page_images)

    # Strategy 3: Manufacturer og:image
    if manufacturer_url:
        try:
            req = urllib.request.Request(manufacturer_url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=12) as resp:
                html = resp.read(100000).decode("utf-8", errors="ignore")
            match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
            if match:
                candidates.append(match.group(1))
            # Also try any large images
            for m in re.findall(r'(https?://[^\s"\']+\.(?:jpg|png|webp))', html):
                if any(kw in m.lower() for kw in ['product', 'hero', 'main', 'feature']):
                    if m not in candidates:
                        candidates.append(m)
        except Exception:
            pass

    # Strategy 4: Retailer URLs
    for url in (product.get("retailer_urls") or {}).values():
        if url and "amazon." in url:
            asin = extract_asin(url)
            if asin:
                page_images = get_amazon_image_urls(asin)
                candidates.extend(page_images)

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return unique[:10]


def main():
    validator = CLIPValidator()

    total_found = 0
    total_missing = 0

    for cat_file, clip_cat in CATEGORY_MAP.items():
        filepath = DATA_DIR / f"{cat_file}.json"
        products = json.loads(filepath.read_text())
        missing = [p for p in products if not p.get("image_url")]

        if not missing:
            continue

        print(f"\n{'='*60}")
        print(f"  {cat_file.upper()}: {len(missing)} still missing")
        print(f"{'='*60}")

        total_missing += len(missing)
        found = 0
        updates = {}

        for i, product in enumerate(missing):
            name = product.get("name", "unknown")
            pid = product.get("id", "unknown")

            candidates = find_candidates(product)
            if not candidates:
                print(f"  [{i+1}/{len(missing)}] {name}: no candidates")
                continue

            for url in candidates:
                img = download_image(url)
                if img is None:
                    continue

                passed, score, reason = validator.validate(img, clip_cat)
                if not passed:
                    continue

                if verify_url_accessible(url):
                    updates[pid] = url
                    found += 1
                    print(f"  [{i+1}/{len(missing)}] {name}: FOUND ({score:.3f})")
                    break
            else:
                print(f"  [{i+1}/{len(missing)}] {name}: {len(candidates)} candidates, none passed")

            if (i + 1) % 3 == 0:
                time.sleep(1)  # Rate limit

        if updates:
            for p in products:
                if p["id"] in updates:
                    p["image_url"] = updates[p["id"]]
            filepath.write_text(json.dumps(products, indent=2) + "\n")

        total_found += found
        print(f"  Found {found}/{len(missing)} for {cat_file}")

    print(f"\n{'='*60}")
    print(f"  PASS 2 TOTAL: {total_found}/{total_missing} found")
    print(f"  Still missing: {total_missing - total_found}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
