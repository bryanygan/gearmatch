import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ───────────────────────────────────────────────────────────
const RATE_LIMIT_MS = 1200;
const FUZZY_MATCH_THRESHOLD = 0.65;

const CATEGORY_FILES: Record<string, string> = {
  mice: "mice.json",
  audio: "audio.json",
  keyboards: "keyboards.json",
  monitors: "monitors.json",
};

// Brand → Shopify store domain mapping
const SHOPIFY_STORES: Record<string, string> = {
  JLab: "www.jlab.com",
  Skullcandy: "www.skullcandy.com",
  Nothing: "www.nothing.tech",
  TREBLAB: "www.treblab.com",
  Pulsar: "www.pulsar.gg",
  Keychron: "www.keychron.com",
  Wooting: "wooting.io",
  NuPhy: "www.nuphy.com",
  Finalmouse: "finalmouse.com",
  MonsGeek: "www.monsgeek.com",
};

// Known non-standard RTINGS brand slugs (brand name → RTINGS URL slug)
const RTINGS_BRAND_SLUGS: Record<string, string> = {
  "Turtle Beach": "turtle-beach",
  "Drop/Sennheiser/EPOS": "sennheiser",
  "Bang & Olufsen": "bang-olufsen",
  "Bowers & Wilkins": "bowers-wilkins",
  "Kiwi Ears": "kiwi-ears",
};

// RTINGS uses /headphones/ for audio products
const RTINGS_CATEGORIES: Record<string, string> = {
  audio: "headphones",
  mice: "mouse",
  keyboards: "keyboard",
  monitors: "monitor",
};

// ─── Types ────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image_url?: string;
  retailer_urls?: Record<string, string>;
  manufacturer_url?: string;
  data_quality?: { source_name?: string };
  [key: string]: unknown;
}

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  images: Array<{ src: string }>;
  product_type?: string;
  vendor?: string;
}

interface ImageResult {
  image_url: string;
  source: string;
  rtings_backup?: string;
  retailer_urls_found?: Record<string, string>;
}

interface ImageFetchProgress {
  completedBrands: string[];
  results: Record<string, ImageResult>;
  remaining: string[];
}

interface FetchReport {
  timestamp: string;
  totalMissingBefore: number;
  totalRtingsReplaced: number;
  foundViaShopify: number;
  foundViaRetailer: number;
  foundViaRtings: number;
  stillMissing: number;
  remainingProducts: Array<{ id: string; name: string; brand: string }>;
}

// ─── CLI Parsing ──────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const verbose = args.includes("--verbose");
const categoryFilter = args.find(
  (a) => !a.startsWith("--") && CATEGORY_FILES[a]
);
const categories = categoryFilter
  ? [categoryFilter]
  : Object.keys(CATEGORY_FILES);

// ─── Helpers ──────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function log(msg: string) {
  console.log(msg);
}

function vlog(msg: string) {
  if (verbose) console.log(`  [v] ${msg}`);
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWords(s: string): string[] {
  return normalize(s).split(" ").filter(Boolean);
}

// Words that are common/generic and shouldn't drive matching alone
const GENERIC_WORDS = new Set([
  "wireless", "wired", "gaming", "headset", "headphone", "headphones",
  "earbuds", "earphone", "pro", "plus", "true", "truly", "gen",
  "edition", "bluetooth", "over", "ear", "in", "on", "the", "with",
  "active", "noise", "cancellation", "cancelling",
]);

/** Check if a word contains a number or model identifier */
function isModelWord(w: string): boolean {
  return /\d/.test(w) || w.length <= 3;
}

/** Check if two words are a meaningful match (not trivial substring overlap) */
function wordsMatch(pw: string, cw: string): boolean {
  if (pw === cw) return true;
  // For short words (1-2 chars), require exact match only
  if (pw.length <= 2 || cw.length <= 2) return pw === cw;
  // For longer words, allow substring if the overlap is significant (>60% of smaller word)
  const minLen = Math.min(pw.length, cw.length);
  if (cw.includes(pw) && pw.length >= minLen * 0.6) return true;
  if (pw.includes(cw) && cw.length >= minLen * 0.6) return true;
  return false;
}

/** Fuzzy match two strings by word overlap. Returns score 0-1. */
function fuzzyMatch(productName: string, candidate: string): number {
  const pWords = getWords(productName);
  const cWords = getWords(candidate);

  if (pWords.length === 0 || cWords.length === 0) return 0;

  let matched = 0;
  let modelMatched = 0;
  let modelTotal = 0;

  for (const pw of pWords) {
    const isModel = isModelWord(pw) && !GENERIC_WORDS.has(pw);
    if (isModel) modelTotal++;

    if (cWords.some((cw) => wordsMatch(pw, cw))) {
      matched++;
      if (isModel) modelMatched++;
    }
  }

  const baseScore = matched / pWords.length;

  // If there are model-identifying words (numbers, short codes), they MUST match
  // Otherwise penalize heavily — e.g. "G432" shouldn't match "G Pro X 2"
  if (modelTotal > 0 && modelMatched === 0) {
    return baseScore * 0.3;
  }

  return baseScore;
}

/** Match a slug like "arctis-nova-7-wireless-7-7p-7x" against a product name */
function matchSlugToProduct(product: Product, slug: string): number {
  const nameWithoutBrand = product.name
    .replace(new RegExp(`^${product.brand}\\s+`, "i"), "")
    .toLowerCase();
  const slugWords = slug.replace(/-/g, " ");

  // Match product name words against slug
  return fuzzyMatch(nameWithoutBrand, slugWords);
}

// ── og:image extraction ─────────────────────────────────────────────

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

/**
 * Fetch a page and extract the og:image meta tag.
 * Handles both `property="og:image" content="..."` and `content="..." property="og:image"` attribute orders.
 * Resolves relative URLs to absolute.
 */
async function extractOgImage(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });

    if (!res.ok) {
      vlog(`og:image fetch HTTP ${res.status} for ${pageUrl}`);
      return null;
    }

    const html = await res.text();

    // Try both attribute orders
    const ogMatch =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/) ||
      html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/);

    if (!ogMatch?.[1]) return null;

    let imgUrl = ogMatch[1];

    // Resolve relative URLs
    if (imgUrl.startsWith("//")) {
      imgUrl = "https:" + imgUrl;
    } else if (imgUrl.startsWith("/")) {
      const base = new URL(pageUrl);
      imgUrl = `${base.protocol}//${base.host}${imgUrl}`;
    }

    // Filter out obviously bad images (placeholder, default, tiny)
    if (
      imgUrl.includes("placeholder") ||
      imgUrl.includes("default-og") ||
      imgUrl.includes("logo-og")
    ) {
      vlog(`Skipping generic og:image: ${imgUrl}`);
      return null;
    }

    return imgUrl;
  } catch (e) {
    vlog(`Error fetching og:image from ${pageUrl}: ${e}`);
    return null;
  }
}

// ── Walmart search ──────────────────────────────────────────────────

/**
 * Search Walmart for a product and extract the first result's URL and og:image.
 * Returns product page URL and image URL, or null.
 */
async function searchWalmart(
  productName: string,
  brand: string
): Promise<{ productUrl: string; imageUrl: string } | null> {
  const query = `${brand} ${productName}`.replace(/\s+/g, " ").trim();
  const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(query)}`;
  vlog(`Walmart search: ${searchUrl}`);

  try {
    const res = await fetch(searchUrl, {
      headers: {
        ...FETCH_HEADERS,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(20000),
      redirect: "follow",
    });

    if (!res.ok) {
      vlog(`Walmart search HTTP ${res.status}`);
      return null;
    }

    const html = await res.text();

    // Extract first product link from search results
    // Walmart search results contain links like /ip/Product-Name/123456789
    const productLinkMatch = html.match(
      /href="(\/ip\/[^"]+\/\d+)"/
    );
    if (!productLinkMatch) {
      vlog(`No Walmart product links found in search results`);
      return null;
    }

    const productPath = productLinkMatch[1];
    const productUrl = `https://www.walmart.com${productPath}`;
    vlog(`Found Walmart product: ${productUrl}`);

    // Now fetch the product page for its og:image
    await sleep(RATE_LIMIT_MS);
    const imageUrl = await extractOgImage(productUrl);

    if (imageUrl) {
      return { productUrl, imageUrl };
    }

    // Even if no og:image, try to extract image from the search page itself
    // Walmart search pages embed product images in data attributes and img tags
    const imgMatch = html.match(
      /src="(https:\/\/i5\.walmartimages\.com\/[^"]+)"/
    );
    if (imgMatch) {
      return { productUrl, imageUrl: imgMatch[1] };
    }

    return null;
  } catch (e) {
    vlog(`Error searching Walmart: ${e}`);
    return null;
  }
}

// ── Shopify helpers ──────────────────────────────────────────────────

function bestShopifyMatch(
  product: Product,
  shopifyProducts: ShopifyProduct[]
): ShopifyProduct | null {
  let best: ShopifyProduct | null = null;
  let bestScore = 0;

  const searchName = product.name
    .toLowerCase()
    .startsWith(product.brand.toLowerCase())
    ? product.name
    : `${product.brand} ${product.name}`;

  for (const sp of shopifyProducts) {
    const score = fuzzyMatch(searchName, sp.title);
    if (score > bestScore) {
      bestScore = score;
      best = sp;
    }
  }

  if (bestScore >= FUZZY_MATCH_THRESHOLD && best && best.images.length > 0) {
    vlog(
      `Match: "${product.name}" -> "${best.title}" (score: ${bestScore.toFixed(2)})`
    );
    return best;
  }

  return null;
}

function getShopifyImageUrl(sp: ShopifyProduct): string | null {
  if (sp.images.length === 0) return null;
  return sp.images[0].src.replace(/\?.*$/, "");
}

async function fetchShopifyProducts(
  domain: string
): Promise<ShopifyProduct[]> {
  const allProducts: ShopifyProduct[] = [];
  let page = 1;
  const limit = 250;

  while (true) {
    const url = `https://${domain}/products.json?limit=${limit}&page=${page}`;
    vlog(`Fetching ${url}`);

    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(15000),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; GearMatch/1.0; image-fetch)",
        },
      });

      if (!res.ok) {
        vlog(`HTTP ${res.status} from ${domain}`);
        return allProducts;
      }

      const data = await res.json();
      const products = data.products as ShopifyProduct[];
      if (!products || products.length === 0) break;

      allProducts.push(...products);
      vlog(`  Page ${page}: ${products.length} products`);

      if (products.length < limit) break;
      page++;
      await sleep(RATE_LIMIT_MS);
    } catch (e) {
      vlog(`Error fetching ${domain}: ${e}`);
      return allProducts;
    }
  }

  return allProducts;
}

// ── RTINGS helpers ───────────────────────────────────────────────────

/** Generic page slugs to exclude when scraping RTINGS brand pages */
const RTINGS_GENERIC_SLUGS = new Set([
  "headphones",
  "by-feature",
  "wireless-earbuds",
  "by-usage",
  "by-type",
  "noise-cancelling-earbuds",
  "wireless-gaming-headsets",
  "pc-gaming-headsets",
  "bone-conduction-open-ear",
  "wired",
  "xbox-series-x",
  "music",
  "wireless-earbuds-android",
  "budget-cheap",
  "ps5",
  "over-ear-headphones-working-out",
  "earbuds-gaming",
  "wireless-earbuds-iphone",
  "gaming-headsets-under-50",
  "earbuds-small-ears",
  "earbuds-phone-calls",
  "cheap-earbuds",
  "budget-noise-cancelling-headphones",
  "studio",
  "brands",
  "dj",
  "cheap-wireless-earbuds",
  "sounding-wireless-earbuds",
  "wireless-bluetooth-earbuds-under-100",
  "by-enclosure",
  "earbuds-mic",
  "usb-c-headphones",
  "earbuds-bass",
  "by-price",
  "earbuds-under-50",
  "budget-wireless-headphones",
  "bass",
  "neckband",
  "gaming-headsets-under-100",
  "podcast",
  "airpods-alternatives",
  "noise-cancelling-headphones-under-100",
  "over-ear-headphones-under-100",
  "wireless-bluetooth-headphones-under-100",
  "wireless-bluetooth-earbuds-under-50",
  "noise-cancelling-headphones-under-200",
]);

/**
 * Fetch the RTINGS brand listing page to discover product review slugs.
 * Returns an array of slug strings.
 */
async function fetchRtingsBrandSlugs(
  brandSlug: string,
  rtingsCategory: string
): Promise<string[]> {
  const url = `https://www.rtings.com/${rtingsCategory}/reviews/${brandSlug}`;
  vlog(`Fetching RTINGS brand page: ${url}`);

  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });

    if (!res.ok) {
      vlog(`RTINGS brand page HTTP ${res.status} for ${brandSlug}`);
      return [];
    }

    const html = await res.text();

    // Extract product slugs from review links
    const pattern = new RegExp(
      `/${rtingsCategory}/reviews/${brandSlug}/([a-z0-9-]+)`,
      "g"
    );
    const slugs: string[] = [];
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const slug = match[1];
      if (!RTINGS_GENERIC_SLUGS.has(slug)) {
        slugs.push(slug);
      }
    }

    return [...new Set(slugs)];
  } catch (e) {
    vlog(`Error fetching RTINGS brand page: ${e}`);
    return [];
  }
}

/**
 * Fetch the og:image from a RTINGS product review page.
 * Returns the image URL or null.
 */
async function fetchRtingsProductImage(
  brandSlug: string,
  productSlug: string,
  rtingsCategory: string
): Promise<string | null> {
  const url = `https://www.rtings.com/${rtingsCategory}/reviews/${brandSlug}/${productSlug}`;
  vlog(`Fetching RTINGS product: ${url}`);

  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });

    if (!res.ok) return null;

    const html = await res.text();
    const ogMatch = html.match(
      /<meta\s+property="og:image"\s+content="([^"]+)"/
    );
    const imgUrl = ogMatch?.[1];

    if (
      imgUrl &&
      imgUrl.includes("/assets/products/") &&
      !imgUrl.includes("default")
    ) {
      return imgUrl;
    }

    return null;
  } catch {
    return null;
  }
}

function loadProgress(path: string): ImageFetchProgress {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, "utf-8"));
  }
  return { completedBrands: [], results: {}, remaining: [] };
}

function saveProgress(path: string, progress: ImageFetchProgress) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(progress, null, 2));
}

/** Check if a source is from RTINGS */
function isRtingsSource(source: string): boolean {
  return source.startsWith("rtings:");
}

/** Check if an image URL is from RTINGS */
function isRtingsImage(url: string): boolean {
  return url.includes("i.rtings.com") || url.includes("rtings.com/assets/");
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  log(`\nFetch Product Images`);
  log(`Categories: ${categories.join(", ")}`);
  if (dryRun) log("DRY RUN - no files will be modified\n");
  else log("");

  const progressPath = join(__dirname, "output/image-fetch-progress.json");
  const reportPath = join(__dirname, "output/image-fetch-report.json");
  const progress = loadProgress(progressPath);

  // Load all products across categories
  const productsByCategory: Record<string, Product[]> = {};
  const allProducts: Product[] = [];
  const missingByBrand: Record<string, Product[]> = {};
  let totalMissing = 0;
  let totalRtingsImages = 0;

  for (const cat of categories) {
    const dataPath = join(
      __dirname,
      "../src/data/products/",
      CATEGORY_FILES[cat]
    );
    const products: Product[] = JSON.parse(readFileSync(dataPath, "utf-8"));
    productsByCategory[cat] = products;
    allProducts.push(...products);

    const missing = products.filter(
      (p) => !p.image_url && !progress.results[p.id]
    );
    totalMissing += missing.length;

    for (const p of missing) {
      if (!missingByBrand[p.brand]) missingByBrand[p.brand] = [];
      missingByBrand[p.brand].push(p);
    }

    // Count products with RTINGS images (candidates for replacement)
    const rtings = products.filter(
      (p) => p.image_url && isRtingsImage(p.image_url)
    );
    totalRtingsImages += rtings.length;
  }

  log(`Total products missing images: ${totalMissing}`);
  log(`Products with RTINGS images (upgrade candidates): ${totalRtingsImages}`);
  log(
    `Brands with missing images: ${Object.keys(missingByBrand).length}\n`
  );

  let foundShopify = 0;
  let foundRetailer = 0;
  let foundRtings = 0;
  let rtingsReplaced = 0;
  const brandNames = Object.keys(missingByBrand).sort();

  // ── Phase 1: Shopify Store Scraping ────────────────────────────────
  log("=== Phase 1: Shopify Store Scraping ===\n");

  const shopifyBrands = brandNames.filter((b) => SHOPIFY_STORES[b]);
  let brandIndex = 0;

  for (const brand of shopifyBrands) {
    brandIndex++;
    const domain = SHOPIFY_STORES[brand];
    const products = missingByBrand[brand];

    if (progress.completedBrands.includes(`shopify:${brand}`)) {
      vlog(`Skipping ${brand} (already completed)`);
      continue;
    }

    log(
      `[${brandIndex}/${shopifyBrands.length}] Fetching ${domain}/products.json...`
    );

    const shopifyProducts = await fetchShopifyProducts(domain);

    if (shopifyProducts.length === 0) {
      log(`  -> No products found (may not be Shopify or blocked)`);
      progress.completedBrands.push(`shopify:${brand}`);
      saveProgress(progressPath, progress);
      await sleep(RATE_LIMIT_MS);
      continue;
    }

    let matched = 0;
    const matchedNames: string[] = [];

    for (const product of products) {
      if (progress.results[product.id]) continue;

      const match = bestShopifyMatch(product, shopifyProducts);
      if (match) {
        const imageUrl = getShopifyImageUrl(match);
        if (imageUrl) {
          progress.results[product.id] = {
            image_url: imageUrl,
            source: `shopify:${domain}`,
          };
          matched++;
          foundShopify++;
          matchedNames.push(product.id);
        }
      }
    }

    log(
      `  -> Found ${shopifyProducts.length} products, matched ${matched} to our DB`
    );
    if (matchedNames.length > 0) {
      log(`  -> Updated: ${matchedNames.join(", ")}`);
    }

    progress.completedBrands.push(`shopify:${brand}`);
    saveProgress(progressPath, progress);
    await sleep(RATE_LIMIT_MS);
  }

  // ── Phase 2: Retailer/Manufacturer Page Scraping ──────────────────
  log("\n=== Phase 2: Retailer/Manufacturer Page Scraping ===\n");

  // Collect ALL products that need a retailer image:
  // 1. Products with no image at all (and not yet resolved in progress)
  // 2. Products with RTINGS images (upgrade candidates)
  const retailerCandidates: Product[] = [];

  for (const product of allProducts) {
    const existingResult = progress.results[product.id];

    // Skip if we already have a non-RTINGS image from progress
    if (existingResult && !isRtingsSource(existingResult.source)) continue;

    // Include if: no image, OR has RTINGS image to replace
    const hasRtingsImage = product.image_url && isRtingsImage(product.image_url);
    const needsImage = !product.image_url && !existingResult;

    if (needsImage || hasRtingsImage) {
      retailerCandidates.push(product);
    }
  }

  log(
    `Retailer candidates: ${retailerCandidates.length} (${retailerCandidates.filter((p) => p.image_url && isRtingsImage(p.image_url)).length} RTINGS upgrades)\n`
  );

  // Check if phase 2 was already completed for each product
  const phase2Key = "retailer-scrape";
  let retailerIndex = 0;

  for (const product of retailerCandidates) {
    retailerIndex++;
    const progressKey = `${phase2Key}:${product.id}`;

    if (progress.completedBrands.includes(progressKey)) {
      vlog(`Skipping ${product.id} (retailer scrape already done)`);
      continue;
    }

    const hasRtingsImage = product.image_url && isRtingsImage(product.image_url);
    const label = hasRtingsImage ? "UPGRADE" : "NEW";

    if (retailerIndex % 20 === 1 || verbose) {
      log(
        `[${retailerIndex}/${retailerCandidates.length}] ${label}: ${product.brand} ${product.name}`
      );
    }

    let imageUrl: string | null = null;
    let imageSource = "";
    const retailerUrlsFound: Record<string, string> = {};

    // Step 1: Try manufacturer URL (from retailer_urls.manufacturer or manufacturer_url)
    const manufacturerUrl =
      (product.retailer_urls as Record<string, string> | undefined)
        ?.manufacturer || product.manufacturer_url;

    if (manufacturerUrl) {
      vlog(`Trying manufacturer: ${manufacturerUrl}`);
      imageUrl = await extractOgImage(manufacturerUrl as string);
      if (imageUrl) {
        imageSource = `manufacturer:${new URL(manufacturerUrl as string).hostname}`;
        retailerUrlsFound.manufacturer = manufacturerUrl as string;
        vlog(`  -> Manufacturer image: ${imageUrl}`);
      }
      await sleep(RATE_LIMIT_MS);
    }

    // Step 2: Try existing Walmart URL
    if (!imageUrl) {
      const walmartUrl = (
        product.retailer_urls as Record<string, string> | undefined
      )?.walmart;

      if (walmartUrl) {
        vlog(`Trying Walmart URL: ${walmartUrl}`);
        imageUrl = await extractOgImage(walmartUrl);
        if (imageUrl) {
          imageSource = "walmart:product-page";
          retailerUrlsFound.walmart = walmartUrl;
          vlog(`  -> Walmart image: ${imageUrl}`);
        }
        await sleep(RATE_LIMIT_MS);
      }
    }

    // Step 3: Search Walmart if no URL exists
    if (!imageUrl) {
      const walmartUrl = (
        product.retailer_urls as Record<string, string> | undefined
      )?.walmart;

      if (!walmartUrl) {
        vlog(`Searching Walmart for: ${product.brand} ${product.name}`);
        const walmartResult = await searchWalmart(
          product.name,
          product.brand
        );
        if (walmartResult) {
          imageUrl = walmartResult.imageUrl;
          imageSource = "walmart:search";
          retailerUrlsFound.walmart = walmartResult.productUrl;
          vlog(
            `  -> Walmart search found: ${walmartResult.productUrl} -> ${imageUrl}`
          );
        }
        await sleep(RATE_LIMIT_MS);
      }
    }

    // Save result if we found an image
    if (imageUrl) {
      const existing = progress.results[product.id];
      const rtingsBackup =
        existing?.image_url && isRtingsSource(existing.source)
          ? existing.image_url
          : product.image_url && isRtingsImage(product.image_url)
            ? product.image_url
            : undefined;

      progress.results[product.id] = {
        image_url: imageUrl,
        source: imageSource,
        ...(rtingsBackup ? { rtings_backup: rtingsBackup } : {}),
        ...(Object.keys(retailerUrlsFound).length > 0
          ? { retailer_urls_found: retailerUrlsFound }
          : {}),
      };

      foundRetailer++;
      if (hasRtingsImage) rtingsReplaced++;

      if (retailerIndex % 20 === 0 || verbose) {
        log(
          `  -> ${imageSource}: ${imageUrl.substring(0, 80)}...`
        );
      }
    }

    progress.completedBrands.push(progressKey);

    // Save progress every 10 products
    if (retailerIndex % 10 === 0) {
      saveProgress(progressPath, progress);
    }
  }

  saveProgress(progressPath, progress);
  log(
    `\nPhase 2 complete: ${foundRetailer} images found (${rtingsReplaced} RTINGS replaced)\n`
  );

  // ── Phase 3: RTINGS Image Scraping (last resort) ──────────────────
  log("=== Phase 3: RTINGS Image Scraping (last resort) ===\n");

  // Only process products that STILL don't have images after Phase 1+2
  const rtingsBrands: Array<{
    brand: string;
    brandSlug: string;
    rtingsCategory: string;
    products: Product[];
  }> = [];

  for (const brand of brandNames) {
    const products = missingByBrand[brand].filter(
      (p) =>
        !progress.results[p.id] &&
        p.data_quality?.source_name === "RTINGS"
    );
    if (products.length === 0) continue;

    // Determine the RTINGS category
    const catSet = new Set(products.map((p) => p.category));
    const rtingsCategory =
      RTINGS_CATEGORIES[catSet.values().next().value as string] || "headphones";

    // Build brand slug for RTINGS URL
    const brandSlug =
      RTINGS_BRAND_SLUGS[brand] ||
      brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    rtingsBrands.push({ brand, brandSlug, rtingsCategory, products });
  }

  log(`RTINGS brands to process: ${rtingsBrands.length}\n`);

  for (let i = 0; i < rtingsBrands.length; i++) {
    const { brand, brandSlug, rtingsCategory, products } = rtingsBrands[i];

    if (progress.completedBrands.includes(`rtings:${brand}`)) {
      vlog(`Skipping RTINGS ${brand} (already completed)`);
      continue;
    }

    log(
      `[${i + 1}/${rtingsBrands.length}] RTINGS: ${brand} (${products.length} products)`
    );

    // Step 1: Get all product slugs from brand listing page
    const slugs = await fetchRtingsBrandSlugs(brandSlug, rtingsCategory);
    await sleep(RATE_LIMIT_MS);

    if (slugs.length === 0) {
      log(`  -> No product slugs found on RTINGS brand page`);
      progress.completedBrands.push(`rtings:${brand}`);
      saveProgress(progressPath, progress);
      continue;
    }

    vlog(`Found ${slugs.length} RTINGS slugs: ${slugs.join(", ")}`);

    // Step 2: Match each product to its best RTINGS slug
    let matched = 0;
    const matchedNames: string[] = [];

    for (const product of products) {
      if (progress.results[product.id]) continue;

      // Find best matching slug
      let bestSlug: string | null = null;
      let bestScore = 0;

      for (const slug of slugs) {
        const score = matchSlugToProduct(product, slug);
        if (score > bestScore) {
          bestScore = score;
          bestSlug = slug;
        }
      }

      if (!bestSlug || bestScore < FUZZY_MATCH_THRESHOLD) {
        vlog(
          `No match for "${product.name}" (best: ${bestSlug} at ${bestScore.toFixed(2)})`
        );
        continue;
      }

      vlog(
        `Slug match: "${product.name}" -> "${bestSlug}" (score: ${bestScore.toFixed(2)})`
      );

      // Step 3: Fetch the product page for its og:image
      const imageUrl = await fetchRtingsProductImage(
        brandSlug,
        bestSlug,
        rtingsCategory
      );
      await sleep(RATE_LIMIT_MS);

      if (imageUrl) {
        progress.results[product.id] = {
          image_url: imageUrl,
          source: `rtings:${brandSlug}/${bestSlug}`,
        };
        matched++;
        foundRtings++;
        matchedNames.push(product.id);
        vlog(`  -> Image: ${imageUrl}`);
      } else {
        vlog(`  -> No og:image found on page`);
      }
    }

    log(`  -> Matched ${matched}/${products.length}`);
    if (matchedNames.length > 0) {
      log(`  -> Updated: ${matchedNames.join(", ")}`);
    }

    progress.completedBrands.push(`rtings:${brand}`);
    saveProgress(progressPath, progress);
  }

  // ── Phase 4: Collect Remaining ─────────────────────────────────────
  log("\n=== Phase 4: Remaining Products ===\n");

  const remaining: Array<{ id: string; name: string; brand: string }> = [];
  for (const brand of brandNames) {
    for (const product of missingByBrand[brand]) {
      if (!progress.results[product.id]) {
        remaining.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
        });
      }
    }
  }

  progress.remaining = remaining.map((r) => r.id);
  saveProgress(progressPath, progress);

  // ── Write updates to JSON files ────────────────────────────────────
  if (!dryRun) {
    log("=== Writing Updates ===\n");

    for (const cat of categories) {
      const dataPath = join(
        __dirname,
        "../src/data/products/",
        CATEGORY_FILES[cat]
      );
      const products = productsByCategory[cat];
      let newImages = 0;
      let replacedImages = 0;
      let retailerUrlUpdates = 0;

      for (const product of products) {
        const result = progress.results[product.id];
        if (!result) continue;

        // Update image_url: set new image or replace RTINGS image
        if (!product.image_url) {
          product.image_url = result.image_url;
          newImages++;
        } else if (
          isRtingsImage(product.image_url) &&
          !isRtingsSource(result.source)
        ) {
          product.image_url = result.image_url;
          replacedImages++;
        }

        // Update retailer_urls with any newly discovered URLs
        if (result.retailer_urls_found) {
          if (!product.retailer_urls) {
            product.retailer_urls = {};
          }
          for (const [key, url] of Object.entries(
            result.retailer_urls_found
          )) {
            if (!product.retailer_urls[key]) {
              product.retailer_urls[key] = url;
              retailerUrlUpdates++;
            }
          }
        }
      }

      const totalChanges = newImages + replacedImages + retailerUrlUpdates;
      if (totalChanges > 0) {
        writeFileSync(dataPath, JSON.stringify(products, null, 2) + "\n");
        log(
          `Wrote ${CATEGORY_FILES[cat]}: ${newImages} new images, ${replacedImages} RTINGS replaced, ${retailerUrlUpdates} retailer URLs added`
        );
      } else {
        log(`${CATEGORY_FILES[cat]}: no changes`);
      }
    }
  }

  // ── Report ─────────────────────────────────────────────────────────
  const report: FetchReport = {
    timestamp: new Date().toISOString(),
    totalMissingBefore: totalMissing,
    totalRtingsReplaced: rtingsReplaced,
    foundViaShopify: foundShopify,
    foundViaRetailer: foundRetailer,
    foundViaRtings: foundRtings,
    stillMissing: remaining.length,
    remainingProducts: remaining,
  };

  const dir = dirname(reportPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  log(`\n=== SUMMARY ===`);
  log(`Total missing before:   ${totalMissing}`);
  log(`Found via Shopify:      ${foundShopify}`);
  log(`Found via Retailer/Mfg: ${foundRetailer}`);
  log(`RTINGS images replaced: ${rtingsReplaced}`);
  log(`Found via RTINGS:       ${foundRtings}`);
  log(`Still missing:          ${remaining.length}`);
  log(`\nReport: ${reportPath}`);

  // Count final image sources
  const sourceCounts: Record<string, number> = {};
  for (const result of Object.values(progress.results)) {
    const sourceType = result.source.split(":")[0];
    sourceCounts[sourceType] = (sourceCounts[sourceType] || 0) + 1;
  }
  log(`\nImage sources in progress:`);
  for (const [source, count] of Object.entries(sourceCounts).sort(
    (a, b) => b[1] - a[1]
  )) {
    log(`  ${source}: ${count}`);
  }

  if (remaining.length > 0) {
    log(`\nRemaining by brand:`);
    const byBrand: Record<string, number> = {};
    for (const r of remaining) {
      byBrand[r.brand] = (byBrand[r.brand] || 0) + 1;
    }
    for (const [brand, count] of Object.entries(byBrand).sort(
      (a, b) => b[1] - a[1]
    )) {
      log(`  ${brand}: ${count}`);
    }
  }

  log("");
}

main().catch(console.error);
