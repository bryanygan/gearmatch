import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { walmartApiCall } from "./walmart-auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ──────────────────────────────────────────────────────────
const CONSUMER_ID = process.env.WALMART_CONSUMER_ID_PROD;
const KEY_PATH = process.env.WALMART_KEY_FILE_PROD || "~/.ssh/walmart_production";

if (!CONSUMER_ID) {
  console.error("WALMART_CONSUMER_ID_PROD environment variable required");
  process.exit(1);
}

const RATE_LIMIT_MS = 2000; // ~30 calls per minute, well within limits
const DAILY_LIMIT = 5000;

// ─── Types ───────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  brand: string;
  image_url?: string;
  retailer_urls?: Record<string, string>;
  core_attributes: { [key: string]: unknown };
  [key: string]: unknown;
}

interface WalmartSearchResult {
  query: string;
  sort: string;
  responseGroup: string;
  totalResults: number;
  start: number;
  numItems: number;
  items: WalmartItem[];
}

interface WalmartItem {
  itemId: number;
  name: string;
  brandName: string;
  salePrice?: number;
  msrp?: number;
  largeImage?: string;
  thumbnailImage?: string;
  mediumImage?: string;
  imageEntities?: Array<{ thumbnailImage: string; mediumImage: string; largeImage: string }>;
  shortDescription?: string;
  longDescription?: string;
  productTrackingUrl?: string;
  affiliateAddToCartUrl?: string;
  availableOnline?: boolean;
  stock?: string;
  marketplace?: boolean;
  customerRating?: number;
  numReviews?: number;
  categoryPath?: string;
  categoryNode?: string;
  isTwoDayShippingEligible?: boolean;
}

interface Progress {
  lastProcessedIndex: number;
  results: Record<string, {
    walmartItemId?: number;
    imageUrl?: string;
    trackingUrl?: string;
    rating?: number;
    numReviews?: number;
    salePrice?: number;
  }>;
  failures: string[];
  apiCallsUsed: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function normalizeForMatch(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

function fuzzyMatch(searchName: string, walmartName: string): boolean {
  const a = normalizeForMatch(searchName);
  const b = normalizeForMatch(walmartName);

  if (a === b) return true;
  if (b.includes(a) || a.includes(b)) return true;

  // Token overlap
  const tokensA = a.split(" ");
  const tokensB = b.split(" ");
  const common = tokensA.filter((t) => tokensB.includes(t));
  const overlap = (2 * common.length) / (tokensA.length + tokensB.length);
  return overlap >= 0.7;
}

function loadProgress(path: string): Progress {
  if (existsSync(path)) return JSON.parse(readFileSync(path, "utf-8"));
  return { lastProcessedIndex: -1, results: {}, failures: [], apiCallsUsed: 0 };
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
  const progressPath = join(__dirname, "output/mice-enrich-walmart-progress.json");

  const products: Product[] = JSON.parse(readFileSync(dataPath, "utf-8"));
  const progress = loadProgress(progressPath);

  // Filter to mice without images if --new-only
  let toProcess = products.map((p, i) => ({ product: p, originalIndex: i }));
  if (onlyNew) {
    toProcess = toProcess.filter((e) => !e.product.image_url);
  }

  const resumeIndex = startIndex > 0 ? startIndex : Math.max(0, progress.lastProcessedIndex + 1);
  const endIndex = Math.min(toProcess.length, resumeIndex + limit);
  const callBudget = DAILY_LIMIT - progress.apiCallsUsed;

  console.log(`\n=== Walmart API Enrichment (Mice) ===`);
  console.log(`Total mice: ${products.length}`);
  console.log(`To process: ${toProcess.length}${onlyNew ? " (no image)" : ""}`);
  console.log(`Processing: index ${resumeIndex} to ${endIndex - 1}`);
  console.log(`API calls used today: ${progress.apiCallsUsed} / ${DAILY_LIMIT}`);
  console.log(`Call budget remaining: ${callBudget}`);
  if (dryRun) console.log("DRY RUN\n");
  else console.log("");

  let enriched = 0;
  let failed = 0;

  for (let i = resumeIndex; i < endIndex; i++) {
    if (progress.apiCallsUsed >= DAILY_LIMIT) {
      console.log("\nDaily API limit reached. Resume tomorrow.");
      break;
    }

    const { product, originalIndex } = toProcess[i];
    const searchQuery = product.name.toLowerCase().startsWith(product.brand.toLowerCase())
      ? product.name
      : `${product.brand} ${product.name}`;

    console.log(`[${i + 1}/${toProcess.length}] ${product.name}`);

    // Search Walmart
    const searchResult = await walmartApiCall<WalmartSearchResult>(
      `/search?query=${encodeURIComponent(searchQuery)}&numItems=5&responseGroup=full`,
      CONSUMER_ID,
      KEY_PATH
    );
    progress.apiCallsUsed++;

    if (!searchResult?.items?.length) {
      console.log("  No Walmart results");
      if (!progress.failures.includes(product.id)) progress.failures.push(product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    // Find best matching item
    let bestItem: WalmartItem | null = null;
    for (const item of searchResult.items) {
      if (fuzzyMatch(searchQuery, item.name)) {
        // Prefer non-marketplace, in-stock items
        if (!bestItem || (!item.marketplace && bestItem.marketplace)) {
          bestItem = item;
        }
      }
    }

    if (!bestItem) {
      // Fallback: take first result if brand matches AND it's a mouse product
      const brandLower = product.brand.toLowerCase();
      bestItem = searchResult.items.find((it) => {
        if (it.brandName?.toLowerCase() !== brandLower) return false;
        // Must be a mouse-related product (check name and category)
        const nameLower = it.name.toLowerCase();
        const catLower = (it.categoryPath || "").toLowerCase();
        const isMouseProduct =
          nameLower.includes("mouse") ||
          nameLower.includes("gaming mice") ||
          catLower.includes("mouse") ||
          catLower.includes("mice") ||
          catLower.includes("gaming peripheral");
        return isMouseProduct;
      }) || null;
    }

    if (!bestItem) {
      console.log("  No matching item found");
      if (!progress.failures.includes(product.id)) progress.failures.push(product.id);
      failed++;
      progress.lastProcessedIndex = i;
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    console.log(`  Matched: "${bestItem.name}" ($${bestItem.salePrice || "N/A"}) [${bestItem.customerRating || "N/A"}/5, ${bestItem.numReviews || 0} reviews]`);

    // Extract useful data
    const imageUrl = bestItem.largeImage || bestItem.mediumImage || bestItem.thumbnailImage;
    const trackingUrl = bestItem.productTrackingUrl;
    const addToCartUrl = bestItem.affiliateAddToCartUrl;

    if (imageUrl) console.log(`  Image: ${imageUrl.substring(0, 80)}...`);
    if (trackingUrl) console.log(`  Affiliate link: found`);

    if (!dryRun) {
      const p = products[originalIndex];

      // Set image if not already set
      if (imageUrl && !p.image_url) {
        p.image_url = imageUrl;
      }

      // Add Walmart retailer URLs
      if (trackingUrl || addToCartUrl) {
        if (!p.retailer_urls) p.retailer_urls = {};
        if (trackingUrl) p.retailer_urls.walmart = trackingUrl;
      }
    }

    progress.results[product.id] = {
      walmartItemId: bestItem.itemId,
      imageUrl: imageUrl || undefined,
      trackingUrl: trackingUrl || undefined,
      rating: bestItem.customerRating || undefined,
      numReviews: bestItem.numReviews || undefined,
      salePrice: bestItem.salePrice || undefined,
    };
    progress.lastProcessedIndex = i;
    saveProgress(progressPath, progress);
    enriched++;

    await sleep(RATE_LIMIT_MS);
  }

  if (!dryRun) {
    writeFileSync(dataPath, JSON.stringify(products, null, 2) + "\n");
    console.log(`\nWrote updated mice.json`);
  }

  console.log(`\n=== Summary ===`);
  console.log(`Enriched: ${enriched}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total API calls used: ${progress.apiCallsUsed}`);
}

main().catch(console.error);
