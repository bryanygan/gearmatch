import type { AudioProduct } from "@/types/products";
import type { AudioQuizAnswers } from "@/lib/scoring/types";
import type { PreFilter } from "./types";

/**
 * Eliminate audio products without a mic when user says mic is essential.
 */
export const micFilter: PreFilter<AudioQuizAnswers, AudioProduct> = (
  answers,
  product
) => {
  if (answers["mic-needs"] === "essential") {
    return product.core_attributes.audio_has_mic === true;
  }
  return true;
};

/**
 * Eliminate wired-only products when user requires wireless.
 */
export const wirelessFilter: PreFilter<AudioQuizAnswers, AudioProduct> = (
  answers,
  product
) => {
  if (answers["wireless-preference"] === "wireless-required") {
    return product.core_attributes.wireless === true;
  }
  return true;
};

// Note: Server-side filterAudio also applies budget/price_tier filtering.
// Client pre-filters intentionally omit budget — it's a soft preference
// handled by the scoring engine's weighted rules, not a hard constraint.
export const audioPreFilters: PreFilter<AudioQuizAnswers, AudioProduct>[] = [
  micFilter,
  wirelessFilter,
];
