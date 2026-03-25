/**
 * Universal Quality / Availability Scoring Rule
 *
 * A small additive bonus (~5% weight) applied to all categories that
 * gently surfaces products with:
 *  - Better availability (easy > sometimes > hard/limited)
 *  - Higher data confidence (well-reviewed / verified products score higher)
 *  - High RTINGS scores where available
 *  - value_pick / budget_value flags set by our curators
 *
 * Weight is intentionally low so it never overrides user-preference matching.
 * It acts as a tiebreaker and mild promotion of quality/accessible products.
 */

import type { Product } from "@/types/products";
import type { ScoringRule, RuleResult } from "./types";

// Points breakdown (max 20):
//   availability:       0 / 5 / 10
//   data_confidence:    0 / 3 / 5
//   rtings_score:       0–3 (scaled from best rtings score for the product)
//   value_pick flag:    2

const MAX_POINTS = 20;

function evaluateQuality<TAnswers>(
  _answers: TAnswers,
  product: Product
): RuleResult {
  let points = 0;
  const reasons: string[] = [];

  // ── Availability ────────────────────────────────────────────────
  const avail = product.core_attributes.availability_class;
  if (avail === "easy") {
    points += 10;
    reasons.push("Widely available");
  } else if (avail === "sometimes") {
    points += 5;
  }
  // "hard" / "limited_release" get 0

  // ── Data confidence (proxy for how well-reviewed the product is) ─
  const confidence = product.data_quality.data_confidence;
  if (confidence === "high") {
    points += 5;
  } else if (confidence === "medium") {
    points += 3;
  }

  // ── RTINGS score (best single score for the product) ────────────
  if (product.rtings_scores) {
    const scores = Object.values(product.rtings_scores).filter(
      (v) => typeof v === "number"
    ) as number[];
    if (scores.length > 0) {
      const best = Math.max(...scores);
      // Scale: score >= 9.0 → 3pts, >= 8.0 → 2pts, >= 7.0 → 1pt
      if (best >= 9.0) points += 3;
      else if (best >= 8.0) points += 2;
      else if (best >= 7.0) points += 1;
    }
  }

  // ── Value pick flag ──────────────────────────────────────────────
  const tags = product.recommendation_tags ?? [];
  const ca = product.core_attributes as Record<string, unknown>;
  const isValuePick =
    tags.includes("value_pick") ||
    tags.includes("budget_value") ||
    ca.mouse_value_pick === true ||
    ca.audio_value_pick === true ||
    ca.keyboard_value_pick === true;

  if (isValuePick) {
    points += 2;
    reasons.push("Highly rated for value");
  }

  const cappedPoints = Math.min(points, MAX_POINTS);

  return {
    points: cappedPoints,
    reason: reasons.length > 0 ? reasons.join(" · ") : undefined,
  };
}

/**
 * Creates a quality/availability bonus rule for any product category.
 * Weight should be kept ≤ 0.06 to act as a gentle tiebreaker.
 */
export function makeQualityRule<TAnswers, TProduct extends Product>(
  weight = 0.05
): ScoringRule<TAnswers, TProduct> {
  return {
    name: "quality_availability",
    weight,
    maxPoints: MAX_POINTS,
    evaluate: (answers, product) =>
      evaluateQuality(answers, product as unknown as Product),
  };
}
