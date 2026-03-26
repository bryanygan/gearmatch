/**
 * Discontinued Product Pre-Filter
 *
 * Removes products tagged "discontinued" from all recommendation results.
 * To mark a product as discontinued, add "discontinued" to its
 * recommendation_tags array in the relevant JSON file — no schema change needed.
 *
 * Example:
 *   "recommendation_tags": ["gaming", "discontinued"]
 */

import type { Product } from "@/types/products";
import type { PreFilter } from "./types";

export const discontinuedFilter: PreFilter<unknown, Product> = (
  _answers,
  product
) => !(product.recommendation_tags ?? []).includes("discontinued");
