import type { Product } from "@/types/products";

/**
 * A pre-filter function. Returns true to KEEP the product, false to eliminate.
 */
export type PreFilter<TAnswers, TProduct extends Product> = (
  answers: TAnswers,
  product: TProduct
) => boolean;

/**
 * Result of applying pre-filters.
 */
export interface PreFilterResult<T extends Product> {
  filtered: T[];
  eliminated: number;
  total: number;
}
