import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ───────────────────────────────────────────────────────────
const API_KEY = "pricesapi_xRKaoHUhhYqMxkCSyIAChMBpjI8wNP";
const API_BASE = "https://api.pricesapi.io/api/v1";
const MICE_PATH = join(__dirname, "../src/data/products/mice.json");
const PROGRESS_PATH = join(__dirname, "output/mice-price-progress.json");
const RATE_LIMIT_MS = 6500; // 10 req/min → 6s min, use 6.5s for safety
const AFFILIATE_TAG = "gearmatch-20";

// Major retailers we care about (lowercase for matching)
const MAJOR_RETAILERS = new Set([
  "best buy",
  "newegg.com",
  "walmart",
  "micro center",
  "b&h photo",
  "b&h",
  "bhphotovideo",
  "target",
]);

// Retailer URL keys for the retailer_urls object
const RETAILER_KEY_MAP: Record<string, string> = {
  "best buy": "bestbuy",
  "newegg.com": "newegg",
  "walmart": "walmart",
  "micro center": "microcenter",
  "b&h photo": "bhphoto",
  "b&h": "bhphoto",
  "bhphotovideo": "bhphoto",
  "target": "target",
};

// ─── Types ────────────────────────────────────────────────────────────
interface MouseProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price_range_usd: [number, number];
  product_url?: string;
  retailer_urls?: Record<string, string>;
  data_quality: {
    data_confidence: string;
    primary_source_type: string;
    source_name: string;
    last_verified?: string;
    notes?: string;
  };
  [key: string]: unknown;
}

interface SearchResult {
  id: string;
  title: string;
  image: string;
  offerCount: number;
}

interface Offer {
  seller: string;
  seller_url: string;
  price: number;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  stock: string;
  delivery_info: string | null;
  productTitle: string;
  url: string;
}

interface Progress {
  lastProcessedIndex: number;
  results: Record<
    string,
    {
      oldPrice: [number, number];
      newPrice: [number, number];
      retailerUrls: Record<string, string>;
      offersFound: number;
    }
  >;
  failures: string[];
  apiCallsUsed: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function apiCall<T>(endpoint: string): Promise<T | null> {
  const url = `${API_BASE}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (res.status === 429) {
      console.log("  ⏳ Rate limited, waiting 30s...");
      await sleep(30000);
      const retry = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!retry.ok) return null;
      const data = await retry.json();
      return data.success ? data.data : null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

function isMajorRetailer(seller: string): boolean {
  const lower = seller.toLowerCase();
  // Exact match or starts with major retailer name (excludes "Walmart - 3rd Party")
  for (const major of MAJOR_RETAILERS) {
    if (lower === major || lower.startsWith(major)) return true;
  }
  return false;
}

function isFirstPartyWalmart(seller: string): boolean {
  const lower = seller.toLowerCase();
  return lower === "walmart" || lower === "walmart.com";
}

function getRetailerKey(seller: string): string | null {
  const lower = seller.toLowerCase();
  for (const [pattern, key] of Object.entries(RETAILER_KEY_MAP)) {
    if (lower === pattern || lower.startsWith(pattern)) return key;
  }
  return null;
}

function isManufacturerStore(seller: string, brand: string): boolean {
  const lower = seller.toLowerCase();
  const brandLower = brand.toLowerCase();
  return (
    lower.includes(brandLower) ||
    lower.includes(`${brandLower}.com`) ||
    lower === `${brandLower} store`
  );
}

function filterRelevantOffers(offers: Offer[], brand: string): Offer[] {
  return offers.filter((o) => {
    const lower = o.seller.toLowerCase();
    // Skip eBay resellers, AliExpress, Poshmark, TikTok, Mercari, etc.
    if (lower.startsWith("ebay")) return false;
    if (lower.includes("aliexpress")) return false;
    if (lower.includes("alibaba")) return false;
    if (lower.includes("poshmark")) return false;
    if (lower.includes("tiktok")) return false;
    if (lower.includes("mercari")) return false;
    if (lower.includes("doordash")) return false;
    if (lower.includes("uber eats")) return false;
    // Must be USD
    if (o.currency !== "USD") return false;
    // Must be in stock
    if (o.stock && !o.stock.toLowerCase().includes("in stock")) return false;
    // Must have a reasonable price (not $0 or extreme)
    if (o.price < 5 || o.price > 2000) return false;
    return true;
  });
}

function buildAmazonUrl(brand: string, name: string): string {
  // Avoid duplicating brand if name already starts with it
  const query = name.toLowerCase().startsWith(brand.toLowerCase())
    ? name
    : `${brand} ${name}`;
  const encoded = encodeURIComponent(query).replace(/%20/g, "+");
  return `https://www.amazon.com/s?k=${encoded}&tag=${AFFILIATE_TAG}`;
}

function loadProgress(): Progress {
  if (existsSync(PROGRESS_PATH)) {
    return JSON.parse(readFileSync(PROGRESS_PATH, "utf-8"));
  }
  return { lastProcessedIndex: -1, results: {}, failures: [], apiCallsUsed: 0 };
}

function saveProgress(progress: Progress) {
  const dir = join(__dirname, "output");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2));
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  const startIndex = parseInt(process.argv[2] || "0", 10);
  const dryRun = process.argv.includes("--dry-run");
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

  const mice: MouseProduct[] = JSON.parse(readFileSync(MICE_PATH, "utf-8"));
  const progress = loadProgress();

  // Resume from progress if no explicit start index
  const resumeIndex =
    startIndex > 0 ? startIndex : Math.max(0, progress.lastProcessedIndex + 1);

  console.log(`\n🐭 Updating mice prices (${mice.length} products)`);
  console.log(
    `   Starting from index ${resumeIndex}, API calls used: ${progress.apiCallsUsed}`
  );
  if (dryRun) console.log("   🔍 DRY RUN — no files will be modified\n");
  else console.log("");

  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  const endIndex = Math.min(mice.length, resumeIndex + limit);

  for (let i = resumeIndex; i < endIndex; i++) {
    const mouse = mice[i];
    const searchQuery = `${mouse.brand} ${mouse.name}`;

    console.log(
      `[${i + 1}/${mice.length}] ${mouse.name} (${mouse.brand})`
    );

    // Step 1: Search for product
    const searchData = await apiCall<{
      results: SearchResult[];
      total: number;
    }>(`/products/search?q=${encodeURIComponent(searchQuery)}&limit=3`);
    progress.apiCallsUsed++;

    if (!searchData || searchData.results.length === 0) {
      console.log("  ❌ No search results");
      progress.failures.push(mouse.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    // Pick best match (first result)
    const productId = searchData.results[0].id;
    console.log(
      `  📦 Found: "${searchData.results[0].title}" (${searchData.results[0].offerCount} offers)`
    );

    await sleep(RATE_LIMIT_MS);

    // Step 2: Get offers
    const offersData = await apiCall<{
      offers: Offer[];
      offerCount: number;
    }>(`/products/${productId}/offers?country=us`);
    progress.apiCallsUsed++;

    if (!offersData || !offersData.offers || offersData.offers.length === 0) {
      console.log("  ❌ No offers found");
      progress.failures.push(mouse.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    // Filter to relevant offers
    const relevant = filterRelevantOffers(offersData.offers, mouse.brand);
    if (relevant.length === 0) {
      console.log("  ❌ No relevant retailer offers after filtering");
      progress.failures.push(mouse.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    // Build retailer URLs (major retailers + manufacturer)
    const retailerUrls: Record<string, string> = {};
    const majorPrices: number[] = [];

    for (const offer of relevant) {
      // Manufacturer store
      if (isManufacturerStore(offer.seller, mouse.brand)) {
        if (!retailerUrls.manufacturer) {
          retailerUrls.manufacturer = offer.url;
          majorPrices.push(offer.price);
        }
        continue;
      }
      // Major retailers
      const key = getRetailerKey(offer.seller);
      if (key && !retailerUrls[key]) {
        // Skip 3rd-party Walmart sellers
        if (key === "walmart" && !isFirstPartyWalmart(offer.seller)) continue;
        retailerUrls[key] = offer.url;
        majorPrices.push(offer.price);
      }
    }

    // Calculate price range from major retailers, fallback to filtered offers
    let pricesToUse: number[];
    if (majorPrices.length >= 2) {
      pricesToUse = majorPrices;
    } else {
      // Fallback: use all relevant offers with outlier removal
      const allPrices = relevant.map((o) => o.price).sort((a, b) => a - b);
      const median = allPrices[Math.floor(allPrices.length / 2)];
      // Remove prices below 50% or above 200% of median
      pricesToUse = allPrices.filter(
        (p) => p >= median * 0.5 && p <= median * 2
      );
      if (pricesToUse.length === 0) pricesToUse = [median];
    }

    const newPrice: [number, number] = [
      Math.round(Math.min(...pricesToUse)),
      Math.round(Math.max(...pricesToUse)),
    ];
    const oldPrice = mouse.price_range_usd;

    // Log changes
    const priceChanged =
      oldPrice[0] !== newPrice[0] || oldPrice[1] !== newPrice[1];
    if (priceChanged) {
      console.log(
        `  💰 Price: [${oldPrice[0]}, ${oldPrice[1]}] → [${newPrice[0]}, ${newPrice[1]}]`
      );
      updated++;
    } else {
      console.log(`  ✅ Price unchanged: [${newPrice[0]}, ${newPrice[1]}]`);
      unchanged++;
    }

    const retailerCount = Object.keys(retailerUrls).length;
    if (retailerCount > 0) {
      console.log(
        `  🔗 Retailers: ${Object.keys(retailerUrls).join(", ")}`
      );
    }

    // Update product data
    if (!dryRun) {
      mouse.price_range_usd = newPrice;
      mouse.product_url = buildAmazonUrl(mouse.brand, mouse.name);
      if (retailerCount > 0) {
        mouse.retailer_urls = retailerUrls;
      }
      mouse.data_quality.last_verified = "2026-02";
    }

    // Track progress
    progress.results[mouse.id] = {
      oldPrice,
      newPrice,
      retailerUrls,
      offersFound: relevant.length,
    };
    progress.lastProcessedIndex = i;
    saveProgress(progress);

    await sleep(RATE_LIMIT_MS);
  }

  // Write updated JSON
  if (!dryRun) {
    writeFileSync(MICE_PATH, JSON.stringify(mice, null, 2) + "\n");
    console.log(`\n✅ Wrote updated mice.json`);
  }

  // Summary
  console.log(`\n── Summary ──────────────────────────────`);
  console.log(`  Updated:   ${updated}`);
  console.log(`  Unchanged: ${unchanged}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  API calls: ${progress.apiCallsUsed}`);
  if (progress.failures.length > 0) {
    console.log(`  Failed IDs: ${progress.failures.join(", ")}`);
  }
  console.log("");
}

main().catch(console.error);
