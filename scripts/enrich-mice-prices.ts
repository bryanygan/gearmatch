import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ──────────────────────────────────────────────────────────
const KEYS_PATH = join(__dirname, "../.claude/pricesapikeys.txt");
const API_KEYS = readFileSync(KEYS_PATH, "utf-8")
  .trim()
  .split("\n")
  .map((k) => k.trim())
  .filter(Boolean);

if (API_KEYS.length === 0) {
  console.error("No PricesAPI keys found in .claude/pricesapikeys.txt");
  process.exit(1);
}

const API_BASE = "https://api.pricesapi.io/api/v1";
const RATE_LIMIT_MS = 3000; // With 5 keys at 10 req/min each, 3s per call is safe
const AFFILIATE_TAG = "gearmatch-20";

const MAJOR_RETAILERS = new Set([
  "best buy", "newegg.com", "walmart", "micro center",
  "b&h photo", "b&h", "bhphotovideo", "target",
]);

const RETAILER_KEY_MAP: Record<string, string> = {
  "best buy": "bestbuy",
  "newegg.com": "newegg",
  walmart: "walmart",
  "micro center": "microcenter",
  "b&h photo": "bhphoto",
  "b&h": "bhphoto",
  bhphotovideo: "bhphoto",
  target: "target",
};

// ─── Types ───────────────────────────────────────────────────────────
interface Product {
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
    source_name?: string;
    last_verified?: string;
    notes?: string;
  };
  core_attributes: {
    price_tier: string;
    [key: string]: unknown;
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
  stock: string;
  url: string;
}

interface Progress {
  lastProcessedIndex: number;
  results: Record<string, {
    oldPrice: [number, number];
    newPrice: [number, number];
    retailerUrls: Record<string, string>;
    offersFound: number;
  }>;
  failures: string[];
  apiCallsUsed: number;
  keyUsage: Record<string, number>;
}

// ─── Key Rotation ────────────────────────────────────────────────────
let currentKeyIndex = 0;
const keyCallCounts: Record<string, number> = {};
API_KEYS.forEach((k) => (keyCallCounts[k] = 0));

function getNextKey(): string {
  const key = API_KEYS[currentKeyIndex % API_KEYS.length];
  currentKeyIndex++;
  keyCallCounts[key]++;
  return key;
}

// ─── Helpers ─────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function apiCall<T>(endpoint: string): Promise<T | null> {
  const key = getNextKey();
  const url = `${API_BASE}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${key}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (res.status === 429) {
      console.log("  Rate limited, waiting 30s...");
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
  return lower.includes(brandLower) || lower === `${brandLower} store`;
}

function filterRelevantOffers(offers: Offer[]): Offer[] {
  return offers.filter((o) => {
    const lower = o.seller.toLowerCase();
    if (lower.startsWith("ebay")) return false;
    if (lower.includes("aliexpress")) return false;
    if (lower.includes("alibaba")) return false;
    if (lower.includes("poshmark")) return false;
    if (lower.includes("tiktok")) return false;
    if (lower.includes("mercari")) return false;
    if (o.currency !== "USD") return false;
    if (o.stock && !o.stock.toLowerCase().includes("in stock")) return false;
    if (o.price < 5 || o.price > 5000) return false;
    return true;
  });
}

function derivePriceTier(price: number): string {
  if (price <= 25) return "budget";
  if (price <= 45) return "lower_midrange";
  if (price <= 70) return "midrange";
  if (price <= 100) return "upper_midrange";
  if (price <= 160) return "premium";
  return "flagship";
}

function buildAmazonUrl(brand: string, name: string): string {
  const query = name.toLowerCase().startsWith(brand.toLowerCase()) ? name : `${brand} ${name}`;
  return `https://www.amazon.com/s?k=${encodeURIComponent(query).replace(/%20/g, "+")}&tag=${AFFILIATE_TAG}`;
}

function currentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function loadProgress(path: string): Progress {
  if (existsSync(path)) return JSON.parse(readFileSync(path, "utf-8"));
  return { lastProcessedIndex: -1, results: {}, failures: [], apiCallsUsed: 0, keyUsage: {} };
}

function saveProgress(path: string, progress: Progress) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(progress, null, 2));
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const onlyNew = process.argv.includes("--new-only");
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;
  const startArg = process.argv.find((a) => a.startsWith("--start="));
  const startIndex = startArg ? parseInt(startArg.split("=")[1], 10) : 0;

  const dataPath = join(__dirname, "../src/data/products/mice.json");
  const progressPath = join(__dirname, "output/mice-enrich-price-progress.json");

  const products: Product[] = JSON.parse(readFileSync(dataPath, "utf-8"));
  const progress = loadProgress(progressPath);

  // Filter to only unpriced mice if --new-only
  let toProcess = products.map((p, i) => ({ product: p, originalIndex: i }));
  if (onlyNew) {
    toProcess = toProcess.filter(
      (e) => e.product.price_range_usd[0] === 0 && e.product.price_range_usd[1] === 0
    );
  }

  const resumeIndex = startIndex > 0 ? startIndex : Math.max(0, progress.lastProcessedIndex + 1);
  const endIndex = Math.min(toProcess.length, resumeIndex + limit);

  console.log(`\n=== PricesAPI Enrichment (Mice) ===`);
  console.log(`Total mice: ${products.length}`);
  console.log(`To process: ${toProcess.length}${onlyNew ? " (new only)" : ""}`);
  console.log(`Processing: index ${resumeIndex} to ${endIndex - 1}`);
  console.log(`API keys: ${API_KEYS.length} (rotating)`);
  console.log(`Rate limit: ${RATE_LIMIT_MS}ms between calls`);
  if (dryRun) console.log("DRY RUN - no files modified\n");
  else console.log("");

  let updated = 0;
  let failed = 0;

  for (let i = resumeIndex; i < endIndex; i++) {
    const { product, originalIndex } = toProcess[i];
    const searchQuery = product.name.toLowerCase().startsWith(product.brand.toLowerCase())
      ? product.name
      : `${product.brand} ${product.name}`;

    console.log(`[${i + 1}/${toProcess.length}] ${product.name}`);

    // Step 1: Search
    const searchData = await apiCall<{ results: SearchResult[]; total: number }>(
      `/products/search?q=${encodeURIComponent(searchQuery)}&limit=3`
    );
    progress.apiCallsUsed++;

    if (!searchData || searchData.results.length === 0) {
      console.log("  No results");
      if (!progress.failures.includes(product.id)) progress.failures.push(product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    const productId = searchData.results[0].id;
    console.log(`  Found: "${searchData.results[0].title}" (${searchData.results[0].offerCount} offers)`);

    await sleep(RATE_LIMIT_MS);

    // Step 2: Get offers
    const offersData = await apiCall<{ offers: Offer[]; offerCount: number }>(
      `/products/${productId}/offers?country=us`
    );
    progress.apiCallsUsed++;

    if (!offersData?.offers?.length) {
      console.log("  No offers");
      if (!progress.failures.includes(product.id)) progress.failures.push(product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    const relevant = filterRelevantOffers(offersData.offers);
    if (relevant.length === 0) {
      console.log("  No relevant offers after filtering");
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    // Build retailer URLs + prices
    const retailerUrls: Record<string, string> = {};
    const majorPrices: number[] = [];

    for (const offer of relevant) {
      if (isManufacturerStore(offer.seller, product.brand)) {
        if (!retailerUrls.manufacturer) {
          retailerUrls.manufacturer = offer.url;
          majorPrices.push(offer.price);
        }
        continue;
      }
      const key = getRetailerKey(offer.seller);
      if (key && !retailerUrls[key]) {
        if (key === "walmart" && !isFirstPartyWalmart(offer.seller)) continue;
        retailerUrls[key] = offer.url;
        majorPrices.push(offer.price);
      }
    }

    let pricesToUse: number[];
    if (majorPrices.length >= 2) {
      pricesToUse = majorPrices;
    } else {
      const allPrices = relevant.map((o) => o.price).sort((a, b) => a - b);
      const median = allPrices[Math.floor(allPrices.length / 2)];
      pricesToUse = allPrices.filter((p) => p >= median * 0.5 && p <= median * 2);
      if (pricesToUse.length === 0) pricesToUse = [median];
    }

    const newPrice: [number, number] = [
      Math.round(Math.min(...pricesToUse)),
      Math.round(Math.max(...pricesToUse)),
    ];

    console.log(`  Price: [${newPrice[0]}, ${newPrice[1]}] | Retailers: ${Object.keys(retailerUrls).join(", ") || "none"}`);

    if (!dryRun) {
      const p = products[originalIndex];
      p.price_range_usd = newPrice;
      p.product_url = buildAmazonUrl(p.brand, p.name);
      if (Object.keys(retailerUrls).length > 0) {
        p.retailer_urls = { ...(p.retailer_urls || {}), ...retailerUrls };
      }
      p.core_attributes.price_tier = derivePriceTier((newPrice[0] + newPrice[1]) / 2);
      p.data_quality.last_verified = currentYearMonth();
    }

    progress.results[product.id] = {
      oldPrice: product.price_range_usd as [number, number],
      newPrice,
      retailerUrls,
      offersFound: relevant.length,
    };
    progress.lastProcessedIndex = i;
    progress.keyUsage = { ...keyCallCounts };
    saveProgress(progressPath, progress);
    updated++;

    await sleep(RATE_LIMIT_MS);
  }

  if (!dryRun) {
    writeFileSync(dataPath, JSON.stringify(products, null, 2) + "\n");
    console.log(`\nWrote updated mice.json`);
  }

  console.log(`\n=== Summary ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total API calls: ${progress.apiCallsUsed}`);
  console.log(`Key usage:`, keyCallCounts);
}

main().catch(console.error);
