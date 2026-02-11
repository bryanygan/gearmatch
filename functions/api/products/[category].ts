/**
 * GET /api/products/:category
 *
 * Paginated product listing by category.
 * Products are served from static JSON via the ASSETS binding.
 */

interface Env {
  ASSETS: Fetcher;
}

const VALID_CATEGORIES = ["mice", "keyboards", "audio", "monitors"] as const;
type ValidCategory = (typeof VALID_CATEGORIES)[number];

const CATEGORY_FILE_MAP: Record<ValidCategory, string> = {
  mice: "mice.json",
  keyboards: "keyboards.json",
  audio: "audio.json",
  monitors: "monitors.json",
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const category = context.params.category as string;

  // Validate category
  if (!VALID_CATEGORIES.includes(category as ValidCategory)) {
    return new Response(
      JSON.stringify({
        error: "Invalid category",
        validCategories: VALID_CATEGORIES,
      }),
      { status: 400 }
    );
  }

  // Parse and validate pagination params
  const url = new URL(context.request.url);
  const pageParam = url.searchParams.get("page");
  const limitParam = url.searchParams.get("limit");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  if (isNaN(page) || page < 1) {
    return new Response(
      JSON.stringify({ error: "page must be a positive integer" }),
      { status: 400 }
    );
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return new Response(
      JSON.stringify({ error: "limit must be between 1 and 100" }),
      { status: 400 }
    );
  }

  // Fetch product data from static assets
  const file = CATEGORY_FILE_MAP[category as ValidCategory];
  const assetResponse = await context.env.ASSETS.fetch(
    new URL(`/data/products/${file}`, context.request.url)
  );

  if (!assetResponse.ok) {
    return new Response(
      JSON.stringify({ error: "Product data not found" }),
      { status: 404 }
    );
  }

  let products: unknown[];
  try {
    products = await assetResponse.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to parse product data" }),
      { status: 500 }
    );
  }
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const offset = (page - 1) * limit;
  const paginatedProducts = products.slice(offset, offset + limit);

  return new Response(
    JSON.stringify({
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    })
  );
};
