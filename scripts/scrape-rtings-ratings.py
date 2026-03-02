"""
Scrape RTINGS usage-based ratings for all GearMatch products.

Uses the RTINGS internal API (discovered via table tool page) to fetch
all product ratings at once. Logs into RTINGS Insider to access paywalled
scores, then fuzzy-matches product names and writes `rtings_scores` into
each product's JSON entry.

Usage:
    python scripts/scrape-rtings-ratings.py

Requires RTINGS_EMAIL and RTINGS_PASSWORD in .env
"""

import asyncio
import json
import os
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Playwright not installed. Run: pip install playwright && playwright install chromium")
    sys.exit(1)

# ─── Config ───────────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "src" / "data" / "products"
OUTPUT_DIR = PROJECT_ROOT / "scripts" / "output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load .env
ENV_PATH = PROJECT_ROOT / ".env"
if ENV_PATH.exists():
    for line in ENV_PATH.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip())

EMAIL = os.environ.get("RTINGS_EMAIL", "")
PASSWORD = os.environ.get("RTINGS_PASSWORD", "")

if not EMAIL or not PASSWORD:
    print("ERROR: Set RTINGS_EMAIL and RTINGS_PASSWORD in .env")
    sys.exit(1)

# ─── Category config ─────────────────────────────────────────────────────────
# Usage IDs confirmed from RTINGS API table_tool__column_options and presets

CATEGORIES = {
    "mouse": {
        "json_file": "mice.json",
        # URL with explicit columns triggers the API calls we intercept
        "url": "https://www.rtings.com/mouse/tools/table?c=general:product,usage:8876,usage:8878,usage:8879,usage:22560,general:price&f=general:test_bench=recent&s=small",
        "usage_ids": {
            "8876": "work",
            "8878": "video_games_fps",
            "8879": "video_games_mmo",
            "22560": "raw_performance",
        },
        "column_labels": {
            "work": "Work",
            "video_games_fps": "Video Games (FPS)",
            "video_games_mmo": "Video Games (MMO)",
            "raw_performance": "Raw Performance",
        },
    },
    "audio": {
        "json_file": "audio.json",
        "url": "https://www.rtings.com/headphones/tools/table?c=general:product,usage:18,usage:16,usage:17,usage:8865,usage:8864,general:price&f=general:test_bench=recent&s=small",
        "usage_ids": {
            "18": "sports_fitness",
            "16": "travel",
            "17": "office",
            "8865": "wireless_gaming",
            "8864": "wired_gaming",
        },
        "column_labels": {
            "sports_fitness": "Sports & Fitness",
            "travel": "Travel",
            "office": "Office",
            "wireless_gaming": "Wireless Gaming",
            "wired_gaming": "Wired Gaming",
        },
    },
    "keyboard": {
        "json_file": "keyboards.json",
        "url": "https://www.rtings.com/keyboard/tools/table?c=general:product,usage:9048,usage:9050,usage:9051,usage:25282,general:price&f=general:test_bench=recent&s=small",
        "usage_ids": {
            "9048": "gaming",
            "9050": "office",
            "9051": "programming",
            "25282": "raw_performance",
        },
        "column_labels": {
            "gaming": "Gaming",
            "office": "Office",
            "programming": "Programming",
            "raw_performance": "Raw Performance",
        },
    },
    "monitor": {
        "json_file": "monitors.json",
        "url": "https://www.rtings.com/monitor/tools/table?c=general:product,usage:4112,usage:17021,usage:4113,usage:4114,general:price&f=general:test_bench=recent&s=small",
        "usage_ids": {
            "4112": "pc_gaming",
            "17021": "console_gaming",
            "4113": "office",
            "4114": "editing",
        },
        "column_labels": {
            "pc_gaming": "PC Gaming",
            "console_gaming": "Console Gaming",
            "office": "Office",
            "editing": "Editing",
        },
    },
}


# ─── Helpers ──────────────────────────────────────────────────────────────────


def log(msg: str):
    print(msg, flush=True)


def normalize_name(name: str) -> str:
    """Normalize product name for matching."""
    name = name.lower().strip()
    # Remove bracket content like [7, 7P, 7X] or [PC, PS, Xbox]
    name = re.sub(r"\s*\[.*?\]", "", name)
    # Remove common suffixes that don't affect identity
    for remove in [" truly wireless", " wireless", " wired"]:
        name = name.replace(remove, "")
    name = re.sub(r"\s+", " ", name).strip()
    return name


def extract_model_numbers(name: str) -> set[str]:
    """Extract model numbers/identifiers from a product name."""
    # Find alphanumeric model identifiers (e.g., "MM720", "HD 560S", "V3", "XM1r")
    return set(re.findall(r"[A-Z]*\d+[A-Z]*\w*", name, re.IGNORECASE))


def fuzzy_match(rtings_name: str, gearmatch_names: list[str], threshold: float = 0.88) -> str | None:
    """Find best fuzzy match for RTINGS name among GearMatch product names."""
    norm_rtings = normalize_name(rtings_name)
    rtings_models = extract_model_numbers(rtings_name)
    best_score = 0.0
    best_match = None

    for gm_name in gearmatch_names:
        norm_gm = normalize_name(gm_name)

        # Exact normalized match
        if norm_rtings == norm_gm:
            return gm_name

        # Check if one fully contains the other (strong signal)
        if norm_rtings in norm_gm or norm_gm in norm_rtings:
            # But verify model numbers don't conflict
            gm_models = extract_model_numbers(gm_name)
            # If both have model numbers, they should overlap
            if rtings_models and gm_models:
                if rtings_models & gm_models:  # intersection exists
                    score = 0.95
                else:
                    score = 0.5  # containment but different models — skip
            else:
                score = 0.92
        else:
            score = SequenceMatcher(None, norm_rtings, norm_gm).ratio()

        if score > best_score:
            best_score = score
            best_match = gm_name

    return best_match if best_score >= threshold else None


# ─── Login ────────────────────────────────────────────────────────────────────


async def login(page) -> bool:
    """Log into RTINGS Insider."""
    log("Logging into RTINGS...")
    await page.goto("https://www.rtings.com/login", wait_until="networkidle")
    await page.wait_for_timeout(2000)

    email_input = await page.query_selector('input[placeholder*="email" i]')
    password_input = await page.query_selector('input[type="password"]')

    if not email_input or not password_input:
        log("  ERROR: Could not find login form inputs")
        return False

    await email_input.fill(EMAIL)
    await password_input.fill(PASSWORD)

    submit_btn = await page.query_selector('button[type="submit"]')
    if submit_btn:
        await submit_btn.click()
    else:
        await password_input.press("Enter")

    await page.wait_for_timeout(4000)

    content = await page.content()
    if "logout" in content.lower() or "insider" in content.lower():
        log("  Login successful!\n")
        return True
    log("  WARNING: Login may have failed — continuing anyway\n")
    return True


# ─── API-based scraping ──────────────────────────────────────────────────────


async def scrape_category_via_api(page, category_key: str, config: dict) -> list[dict]:
    """
    Navigate to RTINGS table page and intercept API responses to get ALL
    product ratings (not limited to visible rows).
    """
    usage_ids = config["usage_ids"]
    url = config["url"]

    # Capture API responses
    products_data = {}  # product_id -> {fullname, ...}
    ratings_data = []  # [{product_id, original_id (usage), score}, ...]

    async def capture_api(response):
        try:
            if "table_tool__products_list" in response.url:
                data = await response.json()
                for p in data.get("data", {}).get("products", []):
                    products_data[str(p["id"])] = p.get("fullname", "")
            elif "table_tool__ratings" in response.url:
                data = await response.json()
                for r in data.get("data", {}).get("ratings", []):
                    ratings_data.append({
                        "product_id": str(r["product_id"]),
                        "usage_id": str(r["original_id"]),
                        "score": r["score"],
                        "unblurred": r.get("unblurred", False),
                    })
            elif "table_tool__column_options" in response.url:
                # Verify usage IDs and log ALL available usages
                data = await response.json()
                usages = data.get("data", {}).get("silo", {}).get("test_bench", {}).get("usages", [])
                for u in usages:
                    uid = str(u.get("original_id", ""))
                    uname = u.get("name", "")
                    if uid in usage_ids:
                        log(f"    Confirmed: usage:{uid} = {uname} -> {usage_ids[uid]}")
                    else:
                        log(f"    Available: usage:{uid} = {uname}")
        except Exception:
            pass

    page.on("response", capture_api)

    log(f"  Navigating to {url}")
    await page.goto(url, wait_until="networkidle")
    await page.wait_for_timeout(5000)

    page.remove_listener("response", capture_api)

    log(f"  API data: {len(products_data)} products, {len(ratings_data)} ratings")

    if not products_data or not ratings_data:
        log("  WARNING: No API data captured — falling back to HTML scraping")
        return await scrape_category_html(page, category_key, config)

    # Build product scores from API data
    # Group ratings by product_id
    product_scores = {}  # product_id -> {usage_key: score}
    for r in ratings_data:
        pid = r["product_id"]
        uid = r["usage_id"]
        if uid in usage_ids and r["unblurred"]:
            if pid not in product_scores:
                product_scores[pid] = {}
            product_scores[pid][usage_ids[uid]] = r["score"]

    # Build final product list
    results = []
    for pid, scores in product_scores.items():
        name = products_data.get(pid, "")
        if not name:
            continue
        # Only include if we have at least half the expected scores
        if len(scores) >= len(usage_ids) // 2:
            results.append({"rtings_name": name, "scores": scores})

    log(f"  Products with scores: {len(results)}")
    return results


async def scrape_category_html(page, category_key: str, config: dict) -> list[dict]:
    """Fallback: scrape from rendered HTML (limited to visible rows)."""
    columns = list(config["usage_ids"].values())

    table_html = await page.evaluate("""() => {
        const tbody = document.querySelector('tbody');
        return tbody ? tbody.innerHTML : document.body.innerHTML;
    }""")

    segments = re.split(r'table_cell_product-name">', table_html)
    products = []

    for seg in segments[1:]:
        name_match = re.search(r"<span>([^<]+)</span>", seg)
        if not name_match:
            continue
        name = name_match.group(1).strip()
        if not name:
            continue

        all_scores = re.findall(r'score_box-value">(\d+\.?\d*)</span>', seg)
        if len(all_scores) >= len(columns):
            scores = [float(s) for s in all_scores[:len(columns)]]
            if any(s > 0 for s in scores):
                score_dict = dict(zip(columns, scores))
                products.append({"rtings_name": name, "scores": score_dict})

    return products


# ─── Match and write ──────────────────────────────────────────────────────────


def match_and_update(category_key: str, config: dict, rtings_products: list[dict]) -> dict:
    """Match RTINGS products to GearMatch products and update JSON."""
    json_path = DATA_DIR / config["json_file"]
    with open(json_path, "r", encoding="utf-8") as f:
        gearmatch_products = json.load(f)

    gm_names = [p["name"] for p in gearmatch_products]
    gm_name_to_idx = {p["name"]: i for i, p in enumerate(gearmatch_products)}

    matched = 0
    unmatched = []
    match_log = []

    for rp in rtings_products:
        rtings_name = rp["rtings_name"]
        best_match = fuzzy_match(rtings_name, gm_names)

        if best_match:
            idx = gm_name_to_idx[best_match]
            gearmatch_products[idx]["rtings_scores"] = rp["scores"]
            matched += 1
            if normalize_name(rtings_name) != normalize_name(best_match):
                match_log.append(f"    '{rtings_name}' -> '{best_match}'")
        else:
            unmatched.append(rtings_name)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(gearmatch_products, f, indent=2, ensure_ascii=False)
        f.write("\n")

    with_scores = sum(1 for p in gearmatch_products if "rtings_scores" in p)

    log(f"  Matched: {matched}/{len(rtings_products)} RTINGS products")
    log(f"  Products with rtings_scores: {with_scores}/{len(gearmatch_products)}")

    if match_log:
        log(f"  Fuzzy matches ({len(match_log)}):")
        for m in match_log[:20]:
            log(m)
        if len(match_log) > 20:
            log(f"    ... and {len(match_log) - 20} more")

    if unmatched:
        log(f"  Unmatched ({len(unmatched)}):")
        for u in unmatched[:15]:
            log(f"    {u}")
        if len(unmatched) > 15:
            log(f"    ... and {len(unmatched) - 15} more")

    return {
        "category": category_key,
        "rtings_products": len(rtings_products),
        "matched": matched,
        "unmatched": len(unmatched),
        "total_gearmatch": len(gearmatch_products),
        "with_scores": with_scores,
        "unmatched_names": unmatched,
    }


# ─── Main ─────────────────────────────────────────────────────────────────────


async def main():
    log("=" * 60)
    log("RTINGS Ratings Scraper for GearMatch")
    log("=" * 60 + "\n")

    results = {}

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        )
        page = await context.new_page()

        success = await login(page)
        if not success:
            log("Login failed — aborting")
            await browser.close()
            return

        for category_key, config in CATEGORIES.items():
            log(f"\n{'─' * 40}")
            log(f"Scraping: {category_key.upper()}")
            log(f"{'─' * 40}")

            rtings_products = await scrape_category_via_api(page, category_key, config)

            if rtings_products:
                result = match_and_update(category_key, config, rtings_products)
                results[category_key] = result
            else:
                log(f"  WARNING: No products scraped for {category_key}")
                results[category_key] = {"error": "no products scraped"}

            await page.wait_for_timeout(2000)

        await browser.close()

    # Save results
    summary_path = OUTPUT_DIR / "rtings-scrape-results.json"
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    log(f"\n{'=' * 60}")
    log("SCRAPE COMPLETE")
    log(f"{'=' * 60}")
    for cat, r in results.items():
        if "error" in r:
            log(f"  {cat}: ERROR - {r['error']}")
        else:
            log(f"  {cat}: {r['matched']}/{r['rtings_products']} matched, "
                f"{r['with_scores']}/{r['total_gearmatch']} products have scores")
    log(f"\nResults saved to: {summary_path}")


if __name__ == "__main__":
    asyncio.run(main())
