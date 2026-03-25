import type { KeyboardProduct } from "@/types/products";
import type { KeyboardQuizAnswers } from "@/lib/scoring/types";
import type { PreFilter } from "./types";
import { discontinuedFilter } from "./discontinued-filter";

/**
 * Eliminate wired-only keyboards when user requires wireless.
 */
export const connectivityFilter: PreFilter<
  KeyboardQuizAnswers,
  KeyboardProduct
> = (answers, product) => {
  if (answers.connectivity === "wireless-essential") {
    return product.core_attributes.wireless === true;
  }
  return true;
};

// Note: Server-side filterKeyboard also applies budget/price_tier filtering.
// Client pre-filters intentionally omit budget — it's a soft preference
// handled by the scoring engine's weighted rules, not a hard constraint.
export const keyboardPreFilters: PreFilter<
  KeyboardQuizAnswers,
  KeyboardProduct
>[] = [
  discontinuedFilter as PreFilter<KeyboardQuizAnswers, KeyboardProduct>,
  connectivityFilter,
];
