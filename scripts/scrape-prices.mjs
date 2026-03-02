/**
 * Scrape current prices for products over $300 using PricesAPI.
 * Outputs results to scripts/price-results.json as it goes.
 *
 * Usage: node scripts/scrape-prices.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "src", "data", "products");
const OUTPUT = path.join(ROOT, "scripts", "price-results.json");
const PROGRESS_FILE = path.join(ROOT, "scripts", "price-progress.json");

const API_KEY = "pricesapi_COFj557hm1GzDHFGBGBlXjBBUJodWTWn";
const BASE = "https://api.pricesapi.io/api/v1";
const COUNTRY = "US";
const RATE_LIMIT_MS = 6500; // ~9.2 req/min, safely under 10/min

// ── helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function apiFetch(url) {
  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function searchProduct(name) {
  const q = encodeURIComponent(name);
  const data = await apiFetch(
    `${BASE}/products/search?q=${q}&limit=3&country=${COUNTRY}`
  );
  return data?.data?.results || [];
}

async function getOffers(productId) {
  const data = await apiFetch(
    `${BASE}/products/${productId}/offers?country=${COUNTRY}`
  );
  return data?.data?.offers || [];
}

// Pick the best search result — prefer exact-ish title match with most offers
function pickBestResult(results, productName) {
  if (!results.length) return null;
  const nameLower = productName.toLowerCase();
  // Score each result
  const scored = results.map((r) => {
    const titleLower = (r.title || "").toLowerCase();
    let score = r.offerCount || 0;
    // Boost if title contains key words from product name
    const words = nameLower.split(/\s+/).filter((w) => w.length > 2);
    const matchCount = words.filter((w) => titleLower.includes(w)).length;
    score += matchCount * 10;
    return { ...r, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

// Analyze offers to get a reasonable NEW price range
function analyzeOffers(offers) {
  if (!offers.length) return null;

  // Filter to USD offers that are in stock
  const usdOffers = offers.filter(
    (o) => o.currency === "USD" && o.price > 0
  );
  if (!usdOffers.length) return null;

  const allPrices = usdOffers.map((o) => o.price).sort((a, b) => a - b);

  // Separate "new" (major retailers) from secondary/used
  const majorRetailers = [
    "amazon", "bestbuy", "best buy", "walmart", "newegg", "b&h",
    "bhphotovideo", "adorama", "target", "costco", "microcenter",
    "micro center", "crutchfield", "dell", "hp", "lenovo", "samsung",
    "lg", "asus", "acer", "msi", "razer", "steelseries", "logitech",
    "corsair", "hyperx", "sony", "bose", "sennheiser", "beyerdynamic",
    "audeze", "focal", "bang & olufsen", "apple",
  ];

  const isUsed = (o) => {
    const t = (o.productTitle || "").toLowerCase();
    return (
      t.includes("used") ||
      t.includes("refurbished") ||
      t.includes("renewed") ||
      t.includes("open box") ||
      t.includes("pre-owned") ||
      t.includes("very good cond") ||
      t.includes("good cond")
    );
  };

  const newOffers = usdOffers.filter((o) => {
    if (isUsed(o)) return false;
    return true;
  });

  const newPrices = newOffers.map((o) => o.price).sort((a, b) => a - b);

  // Remove extreme outliers (> 2x median or < 0.3x median) from new prices
  let filteredPrices = newPrices;
  if (newPrices.length >= 3) {
    const median = newPrices[Math.floor(newPrices.length / 2)];
    filteredPrices = newPrices.filter(
      (p) => p >= median * 0.3 && p <= median * 2
    );
  }

  if (!filteredPrices.length) filteredPrices = allPrices;

  const min = Math.round(filteredPrices[0]);
  const max = Math.round(filteredPrices[filteredPrices.length - 1]);

  return {
    min,
    max,
    median: Math.round(filteredPrices[Math.floor(filteredPrices.length / 2)]),
    offerCount: allPrices.length,
    newOfferCount: newPrices.length,
    allPricesRange: [Math.round(allPrices[0]), Math.round(allPrices[allPrices.length - 1])],
    sampleSellers: newOffers.slice(0, 5).map((o) => ({
      seller: o.seller,
      price: o.price,
    })),
  };
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Load all products over $300
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  const products = [];

  for (const file of files) {
    const items = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
    for (const p of items) {
      const [min, max] = p.price_range_usd || [];
      if (max > 300 || min > 300) {
        products.push({
          id: p.id,
          name: p.name,
          category: p.category,
          file,
          currentRange: p.price_range_usd,
        });
      }
    }
  }

  console.log(`Found ${products.length} products over $300 to process.\n`);

  // Load progress if resuming
  let progress = {};
  if (fs.existsSync(PROGRESS_FILE)) {
    progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
    const done = Object.keys(progress).length;
    console.log(`Resuming — ${done} products already processed.\n`);
  }

  const results = { ...progress };
  let processed = Object.keys(progress).length;
  let errors = 0;

  for (const product of products) {
    // Skip if already done
    if (results[product.id]) {
      continue;
    }

    processed++;
    const pct = ((processed / products.length) * 100).toFixed(1);
    console.log(
      `[${processed}/${products.length}] (${pct}%) ${product.name} ...`
    );

    try {
      // Step 1: Search
      const searchResults = await searchProduct(product.name);
      await sleep(RATE_LIMIT_MS);

      if (!searchResults.length) {
        console.log(`  ⚠ No search results\n`);
        results[product.id] = {
          ...product,
          status: "not_found",
          scrapedRange: null,
        };
        saveProgress(results);
        continue;
      }

      const best = pickBestResult(searchResults, product.name);
      if (!best || (best.offerCount || 0) === 0) {
        console.log(`  ⚠ No offers available\n`);
        results[product.id] = {
          ...product,
          status: "no_offers",
          matchedTitle: best?.title,
          scrapedRange: null,
        };
        saveProgress(results);
        continue;
      }

      // Step 2: Get offers
      const offers = await getOffers(best.id);
      await sleep(RATE_LIMIT_MS);

      const analysis = analyzeOffers(offers);

      if (!analysis) {
        console.log(`  ⚠ No USD offers\n`);
        results[product.id] = {
          ...product,
          status: "no_usd_offers",
          matchedTitle: best.title,
          scrapedRange: null,
        };
        saveProgress(results);
        continue;
      }

      const rangeChanged =
        product.currentRange[0] !== analysis.min ||
        product.currentRange[1] !== analysis.max;

      console.log(
        `  ✓ ${analysis.offerCount} offers | ` +
          `Current: $${product.currentRange[0]}-$${product.currentRange[1]} → ` +
          `Scraped: $${analysis.min}-$${analysis.max} (median $${analysis.median})` +
          (rangeChanged ? " ← CHANGED" : "") +
          `\n`
      );

      results[product.id] = {
        ...product,
        status: "ok",
        matchedTitle: best.title,
        scrapedRange: [analysis.min, analysis.max],
        median: analysis.median,
        offerCount: analysis.offerCount,
        newOfferCount: analysis.newOfferCount,
        allPricesRange: analysis.allPricesRange,
        sampleSellers: analysis.sampleSellers,
        rangeChanged,
      };
      saveProgress(results);
    } catch (err) {
      errors++;
      console.log(`  ✗ Error: ${err.message}\n`);
      results[product.id] = {
        ...product,
        status: "error",
        error: err.message,
        scrapedRange: null,
      };
      saveProgress(results);

      // If rate limited, wait longer
      if (err.message.includes("429")) {
        console.log("  Rate limited — waiting 60s ...\n");
        await sleep(60000);
      }
    }
  }

  // Final save
  fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2));
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Done! ${processed} products processed, ${errors} errors.`);
  console.log(`Results saved to ${OUTPUT}`);

  // Print summary of changed ranges
  const changed = Object.values(results).filter((r) => r.rangeChanged);
  console.log(`\n${changed.length} products with changed price ranges:\n`);
  for (const r of changed) {
    console.log(
      `  ${r.name} (${r.category})` +
        `\n    Old: $${r.currentRange[0]} - $${r.currentRange[1]}` +
        `\n    New: $${r.scrapedRange[0]} - $${r.scrapedRange[1]} (median $${r.median})` +
        `\n`
    );
  }
}

function saveProgress(results) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(results, null, 2));
  fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
