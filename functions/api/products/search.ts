/**
 * GET /api/products/search
 *
 * Full-text search across products.
 * Searches name, brand, id, and recommendation_tags fields.
 */

interface Env {
  ASSETS: Fetcher;
}

interface ProductRecord {
  id: string;
  name: string;
  brand: string;
  recommendation_tags?: string[];
  [key: string]: unknown;
}

const VALID_CATEGORIES = ["mouse", "keyboard", "audio", "monitor"] as const;
type ValidCategory = (typeof VALID_CATEGORIES)[number];

const CATEGORY_FILE_MAP: Record<ValidCategory, string> = {
  mouse: "mice.json",
  keyboard: "keyboards.json",
  audio: "audio.json",
  monitor: "monitors.json",
};

async function fetchProducts(
  env: Env,
  requestUrl: string,
  category: ValidCategory
): Promise<ProductRecord[]> {
  const file = CATEGORY_FILE_MAP[category];
  const response = await env.ASSETS.fetch(
    new URL(`/data/products/${file}`, requestUrl)
  );
  if (!response.ok) return [];
  try {
    return await response.json() as ProductRecord[];
  } catch {
    return [];
  }
}

function matchesSearch(product: ProductRecord, terms: string[]): boolean {
  const searchable = [
    product.name,
    product.brand,
    product.id,
    ...(product.recommendation_tags || []),
  ]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => searchable.includes(term));
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const rawQuery = url.searchParams.get("q");
  const categoryParam = url.searchParams.get("category");
  const limitParam = url.searchParams.get("limit");

  // Validate query
  if (!rawQuery || rawQuery.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "q parameter is required" }),
      { status: 400 }
    );
  }

  const query = rawQuery.trim().slice(0, 100).toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return new Response(
      JSON.stringify({ error: "q parameter must contain searchable terms" }),
      { status: 400 }
    );
  }

  // Validate optional category
  if (categoryParam && !VALID_CATEGORIES.includes(categoryParam as ValidCategory)) {
    return new Response(
      JSON.stringify({
        error: "Invalid category",
        validCategories: VALID_CATEGORIES,
      }),
      { status: 400 }
    );
  }

  // Validate limit
  const limit = limitParam ? parseInt(limitParam, 10) : 20;
  if (isNaN(limit) || limit < 1 || limit > 50) {
    return new Response(
      JSON.stringify({ error: "limit must be between 1 and 50" }),
      { status: 400 }
    );
  }

  // Determine which categories to search
  const categoriesToSearch: ValidCategory[] = categoryParam
    ? [categoryParam as ValidCategory]
    : [...VALID_CATEGORIES];

  // Fetch and search products
  const allResults: ProductRecord[] = [];

  for (const cat of categoriesToSearch) {
    const products = await fetchProducts(context.env, context.request.url, cat);
    for (const product of products) {
      if (matchesSearch(product, terms)) {
        allResults.push(product);
        if (allResults.length >= limit) break;
      }
    }
    if (allResults.length >= limit) break;
  }

  return new Response(
    JSON.stringify({
      data: allResults.slice(0, limit),
      query,
      returnedResults: allResults.length,
      hasMore: allResults.length >= limit,
      category: categoryParam || null,
    })
  );
};
