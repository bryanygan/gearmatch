"""
GearMatch Image Classifier
Downloads product images and uses CLIP to validate they match the expected
product category. Flags accessory/irrelevant images for removal.
"""

import open_clip
import torch
from PIL import Image
from pathlib import Path
import json
import csv
import sys
import os
import io
import time
import urllib.request
import urllib.error
from dataclasses import dataclass, asdict

# ============================================================
# CONFIGURATION
# ============================================================

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
    "a power cable", "a USB cable", "an HDMI cable", "an audio cable",
    "a charging cable", "a braided cable",
    "a mounting bracket", "a VESA mount", "a monitor stand", "a clamp mount",
    "a product box", "packaging", "a cardboard box", "a manual",
    "replacement ear pads", "extra keycaps", "mouse skates", "mouse feet",
    "a keycap puller", "a USB dongle", "a wireless receiver", "an adapter",
    "a carrying case", "a pouch", "a wrist rest", "a remote control",
    "a close up of ports", "a close up of connectors",
    "a plain white background with no product", "a logo", "a brand logo",
    "a lifestyle photo with no clear product", "text only", "a screenshot",
    "a desk with no clear product",
]

CONFIDENCE_THRESHOLD = 0.28
FLAG_MARGIN = 0.03

CACHE_DIR = Path("scripts/.image-cache")
RESULTS_FILE = Path("scripts/image-classification-results.csv")

# ============================================================
# CLASSIFIER
# ============================================================

@dataclass
class Result:
    product_id: str
    product_name: str
    category: str
    image_url: str
    status: str  # pass, flag, error
    product_score: float
    product_label: str
    accessory_score: float
    accessory_label: str
    reason: str


class Classifier:
    def __init__(self):
        print("Loading CLIP model (ViT-B-32)...")
        self.device = "mps" if torch.backends.mps.is_available() else "cpu"
        print(f"  Using device: {self.device}")
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            "ViT-B-32", pretrained="laion2b_s34b_b79k"
        )
        self.model = self.model.to(self.device).eval()
        self.tokenizer = open_clip.get_tokenizer("ViT-B-32")

        # Pre-encode accessory labels
        with torch.no_grad():
            tokens = self.tokenizer(ACCESSORY_LABELS).to(self.device)
            self._acc_features = self.model.encode_text(tokens)
            self._acc_features /= self._acc_features.norm(dim=-1, keepdim=True)

        # Pre-encode product labels per category
        self._prod_features = {}
        self._prod_labels = {}
        for cat, labels in PRODUCT_LABELS.items():
            tokens = self.tokenizer(labels).to(self.device)
            with torch.no_grad():
                feats = self.model.encode_text(tokens)
                feats /= feats.norm(dim=-1, keepdim=True)
            self._prod_features[cat] = feats
            self._prod_labels[cat] = labels

        print("  Model loaded.\n")

    def classify_image(self, img: Image.Image, clip_category: str) -> tuple:
        """Returns (status, prod_score, prod_label, acc_score, acc_label, reason)"""
        image_tensor = self.preprocess(img.convert("RGB")).unsqueeze(0).to(self.device)
        with torch.no_grad():
            img_features = self.model.encode_image(image_tensor)
            img_features /= img_features.norm(dim=-1, keepdim=True)

        # Product scores
        prod_scores = (img_features @ self._prod_features[clip_category].T).squeeze(0)
        best_prod_idx = prod_scores.argmax().item()
        prod_score = prod_scores[best_prod_idx].item()
        prod_label = self._prod_labels[clip_category][best_prod_idx]

        # Accessory scores
        acc_scores = (img_features @ self._acc_features.T).squeeze(0)
        best_acc_idx = acc_scores.argmax().item()
        acc_score = acc_scores[best_acc_idx].item()
        acc_label = ACCESSORY_LABELS[best_acc_idx]

        gap = prod_score - acc_score

        if acc_score > prod_score:
            status = "flag"
            reason = f"Accessory '{acc_label}' ({acc_score:.3f}) > product ({prod_score:.3f})"
        elif gap < FLAG_MARGIN:
            status = "flag"
            reason = f"Too close: gap {gap:.3f} between product and '{acc_label}'"
        elif prod_score < CONFIDENCE_THRESHOLD:
            status = "flag"
            reason = f"Product score {prod_score:.3f} below threshold {CONFIDENCE_THRESHOLD}"
        else:
            status = "pass"
            reason = f"Product '{prod_label}' confident at {prod_score:.3f}"

        return status, prod_score, prod_label, acc_score, acc_label, reason


def download_image(url: str, cache_dir: Path) -> Image.Image | None:
    """Download image with caching."""
    # Create a safe filename from URL
    safe_name = url.replace("://", "_").replace("/", "_").replace("?", "_")[:200]
    # Add extension
    for ext in [".jpg", ".png", ".webp", ".jpeg"]:
        if ext in url.lower():
            if not safe_name.endswith(ext):
                safe_name += ext
            break
    else:
        safe_name += ".jpg"

    cache_path = cache_dir / safe_name
    if cache_path.exists():
        try:
            return Image.open(cache_path)
        except Exception:
            cache_path.unlink(missing_ok=True)

    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) GearMatch/1.0"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        img = Image.open(io.BytesIO(data))
        # Cache it
        img.save(str(cache_path))
        return img
    except Exception as e:
        return None


def main():
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    # Load all product data
    data_dir = Path("src/data/products")
    all_entries = []  # (category_file, product, clip_category)

    for file_key, clip_cat in CATEGORY_MAP.items():
        filepath = data_dir / f"{file_key}.json"
        products = json.loads(filepath.read_text())
        for p in products:
            if p.get("image_url") and not p["image_url"].startswith("/"):
                all_entries.append((file_key, p, clip_cat))

    print(f"Found {len(all_entries)} products with remote images\n")

    classifier = Classifier()

    results: list[Result] = []
    flagged_by_category: dict[str, list] = {k: [] for k in CATEGORY_MAP}

    for i, (file_key, product, clip_cat) in enumerate(all_entries):
        url = product["image_url"]
        name = product.get("name", "unknown")
        pid = product.get("id", "unknown")

        # Download
        img = download_image(url, CACHE_DIR)
        if img is None:
            results.append(Result(
                product_id=pid, product_name=name, category=file_key,
                image_url=url, status="error", product_score=0,
                product_label="", accessory_score=0, accessory_label="",
                reason="Failed to download image"
            ))
            if (i + 1) % 100 == 0:
                print(f"  [{i+1}/{len(all_entries)}] processed...")
            continue

        # Classify
        status, ps, pl, as_, al, reason = classifier.classify_image(img, clip_cat)

        results.append(Result(
            product_id=pid, product_name=name, category=file_key,
            image_url=url, status=status, product_score=round(ps, 4),
            product_label=pl, accessory_score=round(as_, 4),
            accessory_label=al, reason=reason
        ))

        if status == "flag":
            flagged_by_category[file_key].append(product)

        if (i + 1) % 100 == 0:
            passed = sum(1 for r in results if r.status == "pass")
            flagged = sum(1 for r in results if r.status == "flag")
            errors = sum(1 for r in results if r.status == "error")
            print(f"  [{i+1}/{len(all_entries)}] pass={passed} flag={flagged} err={errors}")

    # Summary
    total = len(results)
    passed = sum(1 for r in results if r.status == "pass")
    flagged = sum(1 for r in results if r.status == "flag")
    errors = sum(1 for r in results if r.status == "error")

    print(f"\n{'='*60}")
    print(f"  CLASSIFICATION RESULTS")
    print(f"{'='*60}")
    print(f"  Total:   {total}")
    print(f"  Passed:  {passed} ({passed/total*100:.1f}%)")
    print(f"  Flagged: {flagged} ({flagged/total*100:.1f}%)")
    print(f"  Errors:  {errors} ({errors/total*100:.1f}%)")
    for cat, items in flagged_by_category.items():
        if items:
            print(f"  {cat}: {len(items)} flagged")
    print(f"{'='*60}\n")

    # Export CSV
    with open(RESULTS_FILE, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "product_id", "product_name", "category", "image_url",
            "status", "product_score", "product_label",
            "accessory_score", "accessory_label", "reason"
        ])
        writer.writeheader()
        for r in results:
            writer.writerow(asdict(r))
    print(f"Results exported to {RESULTS_FILE}")

    # Export flagged IDs per category for easy cleanup
    flagged_ids_file = Path("scripts/flagged-image-ids.json")
    flagged_ids = {}
    for r in results:
        if r.status == "flag":
            if r.category not in flagged_ids:
                flagged_ids[r.category] = []
            flagged_ids[r.category].append({
                "id": r.product_id,
                "name": r.product_name,
                "reason": r.reason,
                "image_url": r.image_url,
            })
    flagged_ids_file.write_text(json.dumps(flagged_ids, indent=2))
    print(f"Flagged IDs exported to {flagged_ids_file}")

    # Print top flagged
    if flagged > 0:
        print(f"\n  TOP FLAGGED (by highest accessory score):")
        flag_results = sorted(
            [r for r in results if r.status == "flag"],
            key=lambda r: r.accessory_score, reverse=True
        )
        for r in flag_results[:20]:
            print(f"    [{r.category}] {r.product_name}")
            print(f"      {r.reason}")
            print(f"      URL: {r.image_url[:80]}...")
            print()


if __name__ == "__main__":
    main()
