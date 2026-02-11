import type { KeyboardProduct } from "@/types/products";
import type { KeyboardQuizAnswers } from "@/lib/scoring/types";
import type { PreFilter } from "./types";

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

export const keyboardPreFilters: PreFilter<
  KeyboardQuizAnswers,
  KeyboardProduct
>[] = [connectivityFilter];
