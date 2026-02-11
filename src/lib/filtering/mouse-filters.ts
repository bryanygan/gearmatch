import type { MouseProduct } from "@/types/products";
import type { MouseQuizAnswers } from "@/lib/scoring/types";
import type { PreFilter } from "./types";

/**
 * Eliminate products that don't match wireless/wired preference.
 */
export const wirelessFilter: PreFilter<MouseQuizAnswers, MouseProduct> = (
  answers,
  product
) => {
  if (answers.wireless === "wireless") {
    return product.core_attributes.wireless === true;
  }
  if (answers.wireless === "wired") {
    return product.core_attributes.wireless === false;
  }
  return true; // "either" keeps all
};

/**
 * Eliminate mice that don't match handedness preference.
 */
export const handednessFilter: PreFilter<MouseQuizAnswers, MouseProduct> = (
  answers,
  product
) => {
  if (!answers.handedness) return true; // optional field
  const hand = product.core_attributes.mouse_handedness;
  if (answers.handedness === "left") {
    return ["left", "ambi", "ergo_left"].includes(hand);
  }
  if (answers.handedness === "right") {
    return ["right", "ambi", "ergo_right"].includes(hand);
  }
  if (answers.handedness === "ambidextrous") {
    return hand === "ambi";
  }
  return true;
};

export const mousePreFilters: PreFilter<MouseQuizAnswers, MouseProduct>[] = [
  wirelessFilter,
  handednessFilter,
];
