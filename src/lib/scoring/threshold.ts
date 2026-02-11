/**
 * Threshold & Split Helper
 *
 * Shared logic for applying a minimum score threshold and splitting
 * scored products into top picks and alternates. Used by the scoring
 * engine, web worker, and pre-filtered recommendations hook.
 */

import type { Product } from "@/types/products";
import type { ScoredProduct } from "./types";

const DEFAULT_FALLBACK_COUNT = 5;
const DEFAULT_FALLBACK_CONCERN =
  "Lower match score - may not be an ideal fit";

/**
 * Apply a minimum score threshold and split into top picks / alternates.
 *
 * If no products meet minScore, takes the top `fallbackCount` and prepends
 * a concern message. Then splits into topPicks and remaining alternates.
 */
export function applyThresholdAndSplit<T extends Product>(
  scored: ScoredProduct<T>[],
  minScore: number,
  topPickCount: number,
  fallbackCount = DEFAULT_FALLBACK_COUNT,
  fallbackConcern = DEFAULT_FALLBACK_CONCERN
): { topPicks: ScoredProduct<T>[]; alternates: ScoredProduct<T>[] } {
  let qualifying = scored.filter((sp) => sp.score >= minScore);

  if (qualifying.length === 0 && scored.length > 0) {
    qualifying = scored.slice(0, fallbackCount);
    qualifying.forEach((sp) => {
      if (!sp.concerns.includes(fallbackConcern)) {
        sp.concerns.unshift(fallbackConcern);
      }
    });
  }

  return {
    topPicks: qualifying.slice(0, topPickCount),
    alternates: qualifying.slice(topPickCount),
  };
}
