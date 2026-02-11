/**
 * Client-Side Search
 *
 * Fuse.js fuzzy search over product names, brands, and tags.
 * Index is built lazily when search is first opened.
 */

import Fuse from "fuse.js";
import type { Product } from "@/types/products";

export interface SearchableProduct {
  id: string;
  name: string;
  brand: string;
  category: Product["category"];
  tags: string;
  priceLow: number;
  priceHigh: number;
}

export interface SearchResult {
  product: SearchableProduct;
  /** 0 = perfect match, 1 = worst match */
  score: number;
}

export function toSearchable(product: Product): SearchableProduct {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    tags: product.recommendation_tags.join(" "),
    priceLow: product.price_range_usd[0],
    priceHigh: product.price_range_usd[1],
  };
}

const FUSE_OPTIONS: Fuse.IFuseOptions<SearchableProduct> = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "brand", weight: 0.3 },
    { name: "tags", weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<SearchableProduct> | null = null;
let allSearchableProducts: SearchableProduct[] = [];

export function initSearchIndex(products: Product[]): void {
  allSearchableProducts = products.map(toSearchable);
  fuseInstance = new Fuse(allSearchableProducts, FUSE_OPTIONS);
}

export function isSearchIndexReady(): boolean {
  return fuseInstance !== null;
}

export function searchProducts(
  query: string,
  options?: { category?: Product["category"]; limit?: number }
): SearchResult[] {
  if (!fuseInstance || query.length < 2) return [];

  let results = fuseInstance.search(query);

  if (options?.category) {
    results = results.filter((r) => r.item.category === options.category);
  }

  const limit = options?.limit ?? 20;
  results = results.slice(0, limit);

  return results.map((r) => ({
    product: r.item,
    score: r.score ?? 1,
  }));
}
