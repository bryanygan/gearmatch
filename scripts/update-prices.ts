import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ───────────────────────────────────────────────────────────
const API_KEY = process.env.PRICES_API_KEY;
if (!API_KEY) {
  console.error("Error: PRICES_API_KEY environment variable is required");
  process.exit(1);
}
const API_BASE = "https://api.pricesapi.io/api/v1";
const RATE_LIMIT_MS = 6500; // 10 req/min → 6s min, use 6.5s for safety
const AFFILIATE_TAG = "gearmatch-20";

const CATEGORY_FILES: Record<string, string> = {
  mice: "mice.json",
  audio: "audio.json",
  keyboards: "keyboards.json",
  monitors: "monitors.json",
};

const CATEGORY_EMOJI: Record<string, string> = {
  mice: "🐭",
  audio: "🎧",
  keyboards: "⌨️",
  monitors: "🖥️",
};

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

function filterRelevantOffers(offers: Offer[]): Offer[] {
  return offers.filter((o) => {
    const lower = o.seller.toLowerCase();
    if (lower.startsWith("ebay")) return false;
    if (lower.includes("aliexpress")) return false;
    if (lower.includes("alibaba")) return false;
    if (lower.includes("poshmark")) return false;
    if (lower.includes("tiktok")) return false;
    if (lower.includes("mercari")) return false;
    if (lower.includes("doordash")) return false;
    if (lower.includes("uber eats")) return false;
    if (o.currency !== "USD") return false;
    if (o.stock && !o.stock.toLowerCase().includes("in stock")) return false;
    if (o.price < 5 || o.price > 5000) return false;
    return true;
  });
}

function buildAmazonUrl(brand: string, name: string): string {
  const query = name.toLowerCase().startsWith(brand.toLowerCase())
    ? name
    : `${brand} ${name}`;
  const encoded = encodeURIComponent(query).replace(/%20/g, "+");
  return `https://www.amazon.com/s?k=${encoded}&tag=${AFFILIATE_TAG}`;
}

function loadProgress(path: string): Progress {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, "utf-8"));
  }
  return { lastProcessedIndex: -1, results: {}, failures: [], apiCallsUsed: 0 };
}

function saveProgress(path: string, progress: Progress) {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(path, JSON.stringify(progress, null, 2));
}

function addFailure(progress: Progress, id: string) {
  if (!progress.failures.includes(id)) {
    progress.failures.push(id);
  }
}

function currentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  const category = process.argv[2];
  if (!category || !CATEGORY_FILES[category]) {
    console.error(`Usage: npx tsx update-prices.ts <category> [startIndex] [--dry-run] [--limit=N]`);
    console.error(`Categories: ${Object.keys(CATEGORY_FILES).join(", ")}`);
    process.exit(1);
  }

  const startIndex = parseInt(process.argv[3] || "0", 10);
  const dryRun = process.argv.includes("--dry-run");
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

  const dataPath = join(__dirname, "../src/data/products/", CATEGORY_FILES[category]);
  const progressPath = join(__dirname, `output/${category}-price-progress.json`);
  const emoji = CATEGORY_EMOJI[category] || "📦";

  const products: Product[] = JSON.parse(readFileSync(dataPath, "utf-8"));
  const progress = loadProgress(progressPath);

  const resumeIndex =
    startIndex > 0 ? startIndex : Math.max(0, progress.lastProcessedIndex + 1);

  console.log(`\n${emoji} Updating ${category} prices (${products.length} products)`);
  console.log(`   Starting from index ${resumeIndex}, API calls used: ${progress.apiCallsUsed}`);
  if (dryRun) console.log("   🔍 DRY RUN — no files will be modified\n");
  else console.log("");

  let updated = 0;
  let unchanged = 0;
  let failed = 0;
  const currentRunIds = new Set<string>();

  const endIndex = Math.min(products.length, resumeIndex + limit);

  for (let i = resumeIndex; i < endIndex; i++) {
    const product = products[i];
    const searchQuery = product.name.toLowerCase().startsWith(product.brand.toLowerCase())
      ? product.name
      : `${product.brand} ${product.name}`;

    console.log(`[${i + 1}/${products.length}] ${product.name} (${product.brand})`);

    // Step 1: Search for product
    const searchData = await apiCall<{
      results: SearchResult[];
      total: number;
    }>(`/products/search?q=${encodeURIComponent(searchQuery)}&limit=3`);
    progress.apiCallsUsed++;

    if (!searchData || searchData.results.length === 0) {
      console.log("  ❌ No search results");
      addFailure(progress, product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    const productId = searchData.results[0].id;
    console.log(`  📦 Found: "${searchData.results[0].title}" (${searchData.results[0].offerCount} offers)`);

    await sleep(RATE_LIMIT_MS);

    // Step 2: Get offers
    const offersData = await apiCall<{
      offers: Offer[];
      offerCount: number;
    }>(`/products/${productId}/offers?country=us`);
    progress.apiCallsUsed++;

    if (!offersData || !offersData.offers || offersData.offers.length === 0) {
      console.log("  ❌ No offers found");
      addFailure(progress, product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    const relevant = filterRelevantOffers(offersData.offers);
    if (relevant.length === 0) {
      console.log("  ❌ No relevant retailer offers after filtering");
      addFailure(progress, product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    // Build retailer URLs + collect major retailer prices
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

    // Price range: prefer major retailers, fallback with outlier removal
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
    const oldPrice = product.price_range_usd;

    const priceChanged = oldPrice[0] !== newPrice[0] || oldPrice[1] !== newPrice[1];
    if (priceChanged) {
      console.log(`  💰 Price: [${oldPrice[0]}, ${oldPrice[1]}] → [${newPrice[0]}, ${newPrice[1]}]`);
      updated++;
    } else {
      console.log(`  ✅ Price unchanged: [${newPrice[0]}, ${newPrice[1]}]`);
      unchanged++;
    }

    const retailerCount = Object.keys(retailerUrls).length;
    if (retailerCount > 0) {
      console.log(`  🔗 Retailers: ${Object.keys(retailerUrls).join(", ")}`);
    }

    if (!dryRun) {
      product.price_range_usd = newPrice;
      product.product_url = buildAmazonUrl(product.brand, product.name);
      if (retailerCount > 0) {
        product.retailer_urls = retailerUrls;
      }
      product.data_quality.last_verified = currentYearMonth();
    }

    currentRunIds.add(product.id);
    progress.results[product.id] = {
      oldPrice,
      newPrice,
      retailerUrls,
      offersFound: relevant.length,
    };
    progress.lastProcessedIndex = i;
    saveProgress(progressPath, progress);

    await sleep(RATE_LIMIT_MS);
  }

  // Write updated JSON
  if (!dryRun) {
    writeFileSync(dataPath, JSON.stringify(products, null, 2) + "\n");
    console.log(`\n✅ Wrote updated ${CATEGORY_FILES[category]}`);
  }

  // Revert >50% changes (only for products processed in this run)
  if (!dryRun && currentRunIds.size > 0) {
    const productsPost: Product[] = JSON.parse(readFileSync(dataPath, "utf-8"));
    let reverted = 0;
    for (const pid of currentRunIds) {
      const r = progress.results[pid];
      if (!r) continue;
      const oldMid = (r.oldPrice[0] + r.oldPrice[1]) / 2;
      const newMid = (r.newPrice[0] + r.newPrice[1]) / 2;
      const change = oldMid > 0 ? Math.abs(newMid - oldMid) / oldMid * 100 : 0;
      if (change > 50) {
        const p = productsPost.find((x) => x.id === pid);
        if (p) {
          p.price_range_usd = r.oldPrice;
          if (p.retailer_urls) delete p.retailer_urls;
          reverted++;
          delete progress.results[pid];
          console.log(`  ⚠️  Reverted ${pid}: [${r.newPrice}] → [${r.oldPrice}] (${Math.round(change)}% change)`);
        }
      }
    }
    if (reverted > 0) {
      writeFileSync(dataPath, JSON.stringify(productsPost, null, 2) + "\n");
      saveProgress(progressPath, progress);
      console.log(`  Reverted ${reverted} products with >50% price change`);
    }
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
