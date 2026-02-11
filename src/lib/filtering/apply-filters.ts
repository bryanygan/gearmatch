import type { Product } from "@/types/products";
import type { PreFilter, PreFilterResult } from "./types";

/**
 * Apply an array of pre-filters to products.
 * All filters must pass for a product to be kept.
 */
export function applyPreFilters<TAnswers, TProduct extends Product>(
  answers: TAnswers,
  products: TProduct[],
  filters: PreFilter<TAnswers, TProduct>[]
): PreFilterResult<TProduct> {
  const total = products.length;
  const filtered = products.filter((product) =>
    filters.every((filter) => filter(answers, product))
  );
  return {
    filtered,
    eliminated: total - filtered.length,
    total,
  };
}
