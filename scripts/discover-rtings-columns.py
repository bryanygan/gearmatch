"""
Discover RTINGS table column headers for each product category.
Logs into RTINGS Insider and extracts the usage-score column names
from each category's table tool page.

Usage:
    python scripts/discover-rtings-columns.py

Requires RTINGS_EMAIL and RTINGS_PASSWORD in .env
"""

import asyncio
import os
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Playwright not installed. Run: pip install playwright && playwright install chromium")
    sys.exit(1)

# Load .env from project root
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
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

# RTINGS table tool URLs — request ALL usage columns to discover what's available
CATEGORY_URLS = {
    "mouse": "https://www.rtings.com/mouse/tools/table",
    "headphones": "https://www.rtings.com/headphones/tools/table",
    "keyboard": "https://www.rtings.com/keyboard/tools/table",
    "monitor": "https://www.rtings.com/monitor/tools/table",
}


async def login(page):
    """Log into RTINGS Insider."""
    print("Logging into RTINGS...")
    await page.goto("https://www.rtings.com/login", wait_until="networkidle")
    await page.wait_for_timeout(2000)

    # Debug: dump form inputs to find the correct selectors
    inputs = await page.evaluate("""() => {
        const results = [];
        document.querySelectorAll('input').forEach(el => {
            results.push({
                type: el.type,
                name: el.name,
                id: el.id,
                placeholder: el.placeholder,
                className: el.className.substring(0, 60),
            });
        });
        return results;
    }""")
    print(f"  Found {len(inputs)} input fields:")
    for inp in inputs:
        print(f"    type={inp['type']} name={inp['name']} id={inp['id']} placeholder={inp['placeholder']}")

    # Try multiple selector strategies
    email_selectors = [
        'input[name="email"]',
        'input[type="email"]',
        'input[name="username"]',
        'input[placeholder*="email" i]',
        'input[placeholder*="Email"]',
        '#email',
        'input[autocomplete="email"]',
    ]
    password_selectors = [
        'input[name="password"]',
        'input[type="password"]',
        '#password',
    ]
    submit_selectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button:has-text("Log in")',
        'button:has-text("Sign in")',
        'button:has-text("Login")',
    ]

    email_input = None
    for sel in email_selectors:
        email_input = await page.query_selector(sel)
        if email_input:
            print(f"  Email input found with: {sel}")
            break

    password_input = None
    for sel in password_selectors:
        password_input = await page.query_selector(sel)
        if password_input:
            print(f"  Password input found with: {sel}")
            break

    if not email_input or not password_input:
        print("  ERROR: Could not find login form inputs")
        print(f"  Page URL: {page.url}")
        # Save page HTML for debugging
        html = await page.content()
        Path("scripts/output").mkdir(parents=True, exist_ok=True)
        Path("scripts/output/login-page.html").write_text(html[:50000], encoding="utf-8")
        print("  Saved login page HTML to scripts/output/login-page.html")
        return False

    await email_input.fill(EMAIL)
    await password_input.fill(PASSWORD)

    submit_btn = None
    for sel in submit_selectors:
        submit_btn = await page.query_selector(sel)
        if submit_btn:
            print(f"  Submit button found with: {sel}")
            break

    if submit_btn:
        await submit_btn.click()
    else:
        # Fallback: press Enter
        await password_input.press("Enter")

    await page.wait_for_timeout(4000)

    # Verify login
    content = await page.content()
    if "logout" in content.lower() or "account" in content.lower() or "insider" in content.lower():
        print("  Login successful!\n")
        return True
    else:
        print("  WARNING: Login may have failed — continuing anyway\n")
        return True


async def discover_columns(page, category: str, url: str):
    """Navigate to a category table and extract column headers."""
    print(f"=== {category.upper()} ===")
    print(f"URL: {url}")

    await page.goto(url, wait_until="networkidle")
    await page.wait_for_timeout(2000)

    # Check for any URL changes (the page may add column params)
    current_url = page.url
    print(f"  Current URL: {current_url}")

    # Look for links to individual columns in the header (they often have usage IDs)
    col_links = await page.evaluate("""() => {
        const results = [];
        // Check all th elements for links or data attributes
        const ths = document.querySelectorAll('th');
        ths.forEach(th => {
            const text = th.textContent?.trim().split('\\n')[0] || '';
            const link = th.querySelector('a');
            const href = link?.href || '';
            const dataAttrs = {};
            for (const attr of th.attributes) {
                if (attr.name.startsWith('data-')) {
                    dataAttrs[attr.name] = attr.value;
                }
            }
            // Check for sort links which contain column IDs
            const sortLink = th.querySelector('[class*="sort"], [href*="usage"]');
            const sortHref = sortLink?.href || '';
            results.push({ text: text.substring(0, 40), href, sortHref, dataAttrs });
        });
        return results;
    }""")

    print(f"  Column links:")
    for cl in col_links:
        parts = [f"text='{cl['text']}'"]
        if cl['href']:
            parts.append(f"href='{cl['href']}'")
        if cl['sortHref']:
            parts.append(f"sort='{cl['sortHref']}'")
        if cl['dataAttrs']:
            parts.append(f"data={cl['dataAttrs']}")
        print(f"    {' | '.join(parts)}")

    # Try to find column headers in the table
    # RTINGS uses a sticky header row with column names
    headers = await page.evaluate("""() => {
        const results = [];

        // Method 1: Look for table header cells
        const ths = document.querySelectorAll('th');
        ths.forEach(th => {
            const text = th.textContent?.trim();
            if (text) results.push({ method: 'th', text });
        });

        // Method 2: Look for column header labels
        const headerLabels = document.querySelectorAll(
            '.table_header, .column-header, [class*="header"], [class*="column-name"]'
        );
        headerLabels.forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.length < 50) results.push({ method: 'header-class', text });
        });

        // Method 3: Look for usage column checkboxes/labels in the column selector
        const columnOptions = document.querySelectorAll(
            '.table_tool_column, [class*="column-option"], [class*="usage"]'
        );
        columnOptions.forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.length < 80) results.push({ method: 'column-option', text });
        });

        // Method 4: Check the URL for column config
        results.push({ method: 'url', text: window.location.href });

        return results;
    }""")

    if headers:
        seen = set()
        for h in headers:
            key = f"{h['method']}:{h['text'][:60]}"
            if key not in seen:
                seen.add(key)
                print(f"  [{h['method']}] {h['text'][:80]}")

    # Also try clicking the "Columns" button to see available usage columns
    try:
        col_btn = await page.query_selector('button:has-text("Columns"), [class*="column-select"]')
        if col_btn:
            await col_btn.click()
            await page.wait_for_timeout(1000)

            options = await page.evaluate("""() => {
                const results = [];
                // Look for column checkboxes or list items in any open dropdown/modal
                const items = document.querySelectorAll(
                    '.dropdown-menu li, .modal li, [class*="column"] label, [class*="column"] input'
                );
                items.forEach(el => {
                    const text = el.textContent?.trim() || el.getAttribute('value') || '';
                    if (text && text.length < 80) results.push(text);
                });
                return results;
            }""")
            if options:
                print(f"  Column options: {options}")
    except Exception:
        pass

    # Extract the first few products with their scores to verify column order
    products = await page.evaluate("""() => {
        const rows = [];
        const nameEls = document.querySelectorAll('.table_cell_product-name span');
        const allScores = document.querySelectorAll('.score_box-value');

        // Count usage score columns per row
        const firstRow = document.querySelector('tr');
        const usageCols = firstRow
            ? firstRow.querySelectorAll('.table_cell_usage_score').length
            : 0;

        let scoreIdx = 0;
        nameEls.forEach((nameEl, i) => {
            const name = nameEl.textContent?.trim() || '';
            const scores = [];
            for (let j = 0; j < usageCols; j++) {
                const scoreEl = allScores[scoreIdx + j];
                scores.push(scoreEl ? scoreEl.textContent?.trim() : '?');
            }
            scoreIdx += usageCols;
            if (i < 5) rows.push({ name, scores, numCols: usageCols });
        });
        return rows;
    }""")

    if products:
        num_cols = products[0].get("numCols", 0) if products else 0
        print(f"\n  Usage score columns per row: {num_cols}")
        print(f"  First 5 products:")
        for p in products[:5]:
            print(f"    {p['name']}: {p['scores']}")
    else:
        print("  No products found — page may need different navigation")

    print()


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        )
        page = await context.new_page()

        await login(page)

        for category, url in CATEGORY_URLS.items():
            await discover_columns(page, category, url)
            await page.wait_for_timeout(2000)

        print("\nDone! Check the output above to map column IDs to names.")
        print("Then update CATEGORY_COLUMNS in scrape-rtings-ratings.py")

        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
