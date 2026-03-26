"""
Pass 3: For remaining products with Amazon /dp/ ASINs, try direct Amazon
media CDN URL patterns. Amazon image IDs != ASINs, but we can try
common patterns and the images.amazon.com fallback endpoint.
"""

import open_clip
import torch
from PIL import Image
import json
import io
import re
import time
import urllib.request
from pathlib import Path

DATA_DIR = Path("src/data/products")

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
        "an ergonomic mouse", "a wired mouse",
    ],
    "gaming_keyboard": [
        "a mechanical keyboard", "a gaming keyboard", "a computer keyboard",
        "a wireless keyboard", "a compact keyboard", "a split keyboard",
    ],
    "gaming_headset": [
        "a gaming headset", "gaming headphones", "headphones",
        "over ear headphones", "in ear monitors", "earbuds", "IEM earphones",
        "wireless earbuds",
    ],
}

ACCESSORY_LABELS = [
    "a power cable", "a USB cable", "a charging cable",
    "a product box", "packaging",
    "extra keycaps", "mouse skates",
    "a USB dongle", "a carrying case",
    "a plain white background with no product", "a logo",
    "text only", "a screenshot",
]

CLIP_THRESHOLD = 0.22
CLIP_MARGIN = 0.01

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
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
        for cat, labels in PRODUCT_LABELS.items():
            tokens = self.tokenizer(labels).to(self.device)
            with torch.no_grad():
                feats = self.model.encode_text(tokens)
                feats /= feats.norm(dim=-1, keepdim=True)
            self._prod_feats[cat] = feats
        print(f"  CLIP ready on {self.device}\n")

    def validate(self, img, clip_cat):
        tensor = self.preprocess(img.convert("RGB")).unsqueeze(0).to(self.device)
        with torch.no_grad():
            feats = self.model.encode_image(tensor)
            feats /= feats.norm(dim=-1, keepdim=True)
        prod = (feats @ self._prod_feats[clip_cat].T).squeeze(0).max().item()
        acc_scores = (feats @ self._acc_feats.T).squeeze(0)
        acc = acc_scores.max().item()
        if prod < CLIP_THRESHOLD:
            return False, prod
        if acc > prod + CLIP_MARGIN:
            return False, prod
        return True, prod


def download_image(url, timeout=10):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read()
            if len(data) < 2000:
                return None
            img = Image.open(io.BytesIO(data))
            if img.size[0] < 50 or img.size[1] < 50:
                return None
            return img
    except Exception:
        return None


def extract_asin(url):
    match = re.search(r'/dp/([A-Z0-9]{10})', url)
    return match.group(1) if match else None


def try_amazon_images_api(asin):
    """Try Amazon's images endpoint which sometimes works without auth."""
    urls = []
    # Try the standard product image endpoint
    # Amazon sometimes serves images at predictable URLs for popular products
    urls.append(f"https://images-na.ssl-images-amazon.com/images/I/{asin}._AC_SL1500_.jpg")
    urls.append(f"https://m.media-amazon.com/images/I/{asin}._AC_SL1500_.jpg")

    # Try common image ID prefixes for the ASIN
    # Amazon uses image IDs like 71xxxxx, 61xxxxx, 81xxxxx, 51xxxxx for products
    for prefix in ['71', '61', '81', '51', '41', '91']:
        urls.append(f"https://m.media-amazon.com/images/I/{prefix}{asin[2:]}L._AC_SX679_.jpg")

    return urls


def scrape_amazon_with_cookies(url):
    """Try to get Amazon page with session-like headers."""
    try:
        headers = {
            **HEADERS,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as resp:
            # Handle gzip
            data = resp.read()
            try:
                import gzip
                data = gzip.decompress(data)
            except Exception:
                pass
            html = data.decode("utf-8", errors="ignore")

        images = []
        # og:image
        match = re.search(r'property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html)
        if match:
            images.append(match.group(1))

        # hiRes images from JavaScript
        for m in re.findall(r'"hiRes"\s*:\s*"([^"]+)"', html):
            if m not in images:
                images.append(m)

        # Any amazon CDN images
        for m in re.findall(r'(https://m\.media-amazon\.com/images/I/[A-Za-z0-9+_.-]+\.jpg)', html):
            # Only high-res
            if any(s in m for s in ['SL1500', 'SL1200', 'SX679', 'SY879']):
                if m not in images:
                    images.append(m)

        return images
    except Exception:
        return []


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

        print(f"\n  {cat_file.upper()}: {len(missing)} missing")
        total_missing += len(missing)
        found = 0
        updates = {}

        for i, product in enumerate(missing):
            name = product.get("name", "unknown")
            pid = product.get("id", "unknown")
            url = product.get("product_url", "")
            asin = extract_asin(url) if url else None

            if not asin:
                continue

            # Try scraping the page with better headers
            candidates = scrape_amazon_with_cookies(f"https://www.amazon.com/dp/{asin}")

            if not candidates:
                # Try API-style URLs
                candidates = try_amazon_images_api(asin)

            for img_url in candidates[:8]:
                img = download_image(img_url)
                if img is None:
                    continue
                passed, score = validator.validate(img, clip_cat)
                if passed:
                    updates[pid] = img_url
                    found += 1
                    print(f"    {name}: FOUND ({score:.3f})")
                    break

            # Small delay
            time.sleep(0.3)

        if updates:
            for p in products:
                if p["id"] in updates:
                    p["image_url"] = updates[p["id"]]
            filepath.write_text(json.dumps(products, indent=2) + "\n")

        total_found += found
        print(f"  {cat_file}: {found}/{len(missing)} found")

    print(f"\n  PASS 3 TOTAL: {total_found}/{total_missing}")
    print(f"  Still missing: {total_missing - total_found}")


if __name__ == "__main__":
    main()
