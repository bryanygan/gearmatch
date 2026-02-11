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
 * Eliminate mice that don't match handedness when user specifies left-handed.
 */
export const handednessFilter: PreFilter<MouseQuizAnswers, MouseProduct> = (
  answers,
  product
) => {
  if (!answers.handedness) return true; // optional field
  if (answers.handedness === "left") {
    return ["left", "ambi", "ergo_left"].includes(
      product.core_attributes.mouse_handedness
    );
  }
  if (answers.handedness === "ambidextrous") {
    return product.core_attributes.mouse_handedness === "ambi";
  }
  return true; // "right" keeps all (most mice are right-handed)
};

export const mousePreFilters: PreFilter<MouseQuizAnswers, MouseProduct>[] = [
  wirelessFilter,
  handednessFilter,
];
