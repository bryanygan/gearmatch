/**
 * Scoring Engine
 *
 * Core engine that scores products against quiz answers and returns
 * ranked recommendations with explanations.
 */

import type { Product, MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import { getMouseProducts, getAudioProducts, getKeyboardProducts, getMonitorProducts } from "@/data/products";
import { mouseRules } from "./mouse-rules";
import { audioRules } from "./audio-rules";
import { keyboardRules } from "./keyboard-rules";
import { monitorRules } from "./monitor-rules";
import { applyPreFilters } from "@/lib/filtering/apply-filters";
import { mousePreFilters } from "@/lib/filtering/mouse-filters";
import { audioPreFilters } from "@/lib/filtering/audio-filters";
import { keyboardPreFilters } from "@/lib/filtering/keyboard-filters";
import { monitorPreFilters } from "@/lib/filtering/monitor-filters";
import { applyThresholdAndSplit } from "./threshold";
import type {
  MouseQuizAnswers,
  AudioQuizAnswers,
  KeyboardQuizAnswers,
  MonitorQuizAnswers,
  ScoringRule,
  ScoredProduct,
  ScoreBreakdown,
  RecommendationResult,
  RecommendationOptions,
} from "./types";

// =============================================================================
// Core Scoring Function
// =============================================================================

/**
 * Score all products against quiz answers using provided rules.
 * Returns scored products sorted by score (highest first).
 *
 * @param answers - Quiz answers to match against
 * @param products - Products to score
 * @param rules - Scoring rules to apply
 * @returns Array of scored products, sorted by score descending
 */
export function scoreProducts<TAnswers, TProduct extends Product>(
  answers: TAnswers,
  products: TProduct[],
  rules: ScoringRule<TAnswers, TProduct>[]
): ScoredProduct<TProduct>[] {
  const scoredProducts = products.map((product) =>
    scoreProduct(answers, product, rules)
  );

  // Sort by score descending
  return scoredProducts.sort((a, b) => b.score - a.score);
}

/**
 * Score a single product against quiz answers.
 *
 * @param answers - Quiz answers to match against
 * @param product - Product to score
 * @param rules - Scoring rules to apply
 * @returns Scored product with breakdown and explanations
 */
function scoreProduct<TAnswers, TProduct extends Product>(
  answers: TAnswers,
  product: TProduct,
  rules: ScoringRule<TAnswers, TProduct>[]
): ScoredProduct<TProduct> {
  const breakdown: ScoreBreakdown = {};
  const matchReasons: string[] = [];
  const concerns: string[] = [];

  // Calculate total possible weighted points for normalization
  const totalWeight = rules.reduce((sum, rule) => sum + rule.weight, 0);

  // Evaluate each rule
  let weightedSum = 0;

  for (const rule of rules) {
    const result = rule.evaluate(answers, product);

    // Calculate weighted contribution
    const normalizedWeight = rule.weight / totalWeight;
    const percentageScore = (result.points / rule.maxPoints) * 100;
    const weightedContribution = percentageScore * normalizedWeight;

    weightedSum += weightedContribution;

    // Record breakdown
    breakdown[rule.name] = {
      score: result.points,
      maxScore: rule.maxPoints,
      weight: rule.weight,
      details: result.reason || result.concern || "Evaluated",
    };

    // Collect reasons and concerns
    if (result.reason) {
      matchReasons.push(result.reason);
    }
    if (result.concern) {
      concerns.push(result.concern);
    }
  }

  // Apply calibration curve to raw weighted sum before rounding.
  // This stretches the display score so genuinely strong matches
  // reach 100% while poor matches remain low.
  let score = Math.round(calibrateScore(weightedSum));

  // A product with concerns is not a perfect match — cap at 97 so
  // 100% is reserved for products with zero tradeoffs.
  if (concerns.length > 0 && score >= 98) {
    score = Math.max(95, 98 - concerns.length);
  }

  return {
    product,
    score,
    breakdown,
    matchReasons,
    concerns,
  };
}

// =============================================================================
// Score Calibration
// =============================================================================

/**
 * Map a raw 0-100 weighted score to a user-facing display score.
 *
 * Rationale: the scoring rules reward "good enough" answers with partial
 * points, so even a product that perfectly matches the user's stated
 * preferences rarely breaks 90 on the raw scale. This curve stretches
 * strong matches upward so that near-perfect fits read as 100%, while
 * leaving poor and moderate matches roughly unchanged.
 *
 * Segments (raw → display):
 *   0  – 60  → 0  – 60   (unchanged — bad matches stay bad)
 *   60 – 75  → 60 – 80   (moderate matches shown more positively)
 *   75 – 88  → 80 – 99   (good matches shown as very good / excellent)
 *   88 – 100 → 100        (near-perfect matches shown as perfect)
 */
export function calibrateScore(raw: number): number {
  if (raw >= 88) return 100;
  if (raw >= 75) {
    // linear map 75–88 → 80–99
    return 80 + ((raw - 75) / 13) * 19;
  }
  if (raw >= 60) {
    // linear map 60–75 → 60–80
    return 60 + ((raw - 60) / 15) * 20;
  }
  return raw;
}

// =============================================================================
// Mouse Recommendations
// =============================================================================

/**
 * Get mouse recommendations based on quiz answers.
 *
 * @param answers - Mouse quiz answers
 * @param options - Optional configuration
 * @returns Recommendation result with top picks and alternates
 */
export async function getMouseRecommendations(
  answers: MouseQuizAnswers,
  options: RecommendationOptions = {}
): Promise<RecommendationResult<MouseProduct>> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all mouse products
  const allProducts = await getMouseProducts();

  // Pre-filter: eliminate obvious mismatches
  const { filtered: products, eliminatedProducts } = applyPreFilters(answers, allProducts, mousePreFilters);

  // Score remaining products
  const scoredProducts = scoreProducts(answers, products, mouseRules);
  const { topPicks, alternates } = applyThresholdAndSplit(scoredProducts, minScore, topPickCount);

  // Score eliminated products so they can be shown in "outside your filters" section
  const filteredOut = scoreProducts(answers, eliminatedProducts, mouseRules);

  return {
    topPicks,
    alternates,
    filteredOut,
    filters: {
      category: "mouse",
      wireless: answers.wireless === "wireless" ? true : undefined,
    },
    totalEvaluated: allProducts.length,
  };
}

// =============================================================================
// Audio Recommendations
// =============================================================================

/**
 * Get audio recommendations based on quiz answers.
 *
 * @param answers - Audio quiz answers
 * @param options - Optional configuration
 * @returns Recommendation result with top picks and alternates
 */
export async function getAudioRecommendations(
  answers: AudioQuizAnswers,
  options: RecommendationOptions = {}
): Promise<RecommendationResult<AudioProduct>> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all audio products
  const allProducts = await getAudioProducts();

  // Pre-filter: eliminate obvious mismatches
  const { filtered: products, eliminatedProducts } = applyPreFilters(answers, allProducts, audioPreFilters);

  // Score remaining products
  const scoredProducts = scoreProducts(answers, products, audioRules);
  const { topPicks, alternates } = applyThresholdAndSplit(scoredProducts, minScore, topPickCount);

  const filteredOut = scoreProducts(answers, eliminatedProducts, audioRules);

  return {
    topPicks,
    alternates,
    filteredOut,
    filters: {
      category: "audio",
    },
    totalEvaluated: allProducts.length,
  };
}

// =============================================================================
// Keyboard Recommendations
// =============================================================================

/**
 * Get keyboard recommendations based on quiz answers.
 *
 * @param answers - Keyboard quiz answers
 * @param options - Optional configuration
 * @returns Recommendation result with top picks and alternates
 */
export async function getKeyboardRecommendations(
  answers: KeyboardQuizAnswers,
  options: RecommendationOptions = {}
): Promise<RecommendationResult<KeyboardProduct>> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all keyboard products
  const allProducts = await getKeyboardProducts();

  // Pre-filter: eliminate obvious mismatches
  const { filtered: products, eliminatedProducts } = applyPreFilters(answers, allProducts, keyboardPreFilters);

  // Score remaining products
  const scoredProducts = scoreProducts(answers, products, keyboardRules);
  const { topPicks, alternates } = applyThresholdAndSplit(scoredProducts, minScore, topPickCount);

  const filteredOut = scoreProducts(answers, eliminatedProducts, keyboardRules);

  return {
    topPicks,
    alternates,
    filteredOut,
    filters: {
      category: "keyboard",
      wireless: answers.connectivity === "wireless-essential" ? true : undefined,
    },
    totalEvaluated: allProducts.length,
  };
}

// =============================================================================
// Monitor Recommendations
// =============================================================================

/**
 * Get monitor recommendations based on quiz answers.
 *
 * @param answers - Monitor quiz answers
 * @param options - Optional configuration
 * @returns Recommendation result with top picks and alternates
 */
export async function getMonitorRecommendations(
  answers: MonitorQuizAnswers,
  options: RecommendationOptions = {}
): Promise<RecommendationResult<MonitorProduct>> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all monitor products
  const allProducts = await getMonitorProducts();

  // Pre-filter: eliminate obvious mismatches
  const { filtered: products, eliminatedProducts } = applyPreFilters(answers, allProducts, monitorPreFilters);

  // Score remaining products
  const scoredProducts = scoreProducts(answers, products, monitorRules);
  const { topPicks, alternates } = applyThresholdAndSplit(scoredProducts, minScore, topPickCount);

  const filteredOut = scoreProducts(answers, eliminatedProducts, monitorRules);

  return {
    topPicks,
    alternates,
    filteredOut,
    filters: {
      category: "monitor",
    },
    totalEvaluated: allProducts.length,
  };
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Format a score as a percentage string.
 *
 * @param score - Score value (0-100)
 * @returns Formatted percentage string
 */
export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

/**
 * Get a match quality label based on score.
 *
 * @param score - Score value (0-100)
 * @returns Human-readable match quality label
 */
export function getMatchQuality(score: number): string {
  if (score === 100) return "Perfect Match";
  if (score >= 95) return "Excellent Match";
  if (score >= 85) return "Great Match";
  if (score >= 75) return "Good Match";
  if (score >= 65) return "Decent Match";
  if (score >= 50) return "Fair Match";
  return "Partial Match";
}

/**
 * Get top N match reasons from a scored product.
 *
 * @param scoredProduct - Scored product to get reasons from
 * @param count - Number of reasons to return (default: 3)
 * @returns Array of top match reasons
 */
export function getTopReasons(
  scoredProduct: ScoredProduct,
  count: number = 3
): string[] {
  // Filter out bonus reasons for primary display
  const primaryReasons = scoredProduct.matchReasons.filter(
    (reason) => !reason.startsWith("Bonus:")
  );

  // If we have enough primary reasons, use those
  if (primaryReasons.length >= count) {
    return primaryReasons.slice(0, count);
  }

  // Include bonus reasons if needed
  return scoredProduct.matchReasons.slice(0, count);
}

/**
 * Get top N concerns from a scored product.
 *
 * @param scoredProduct - Scored product to get concerns from
 * @param count - Number of concerns to return (default: 2)
 * @returns Array of top concerns
 */
export function getTopConcerns(
  scoredProduct: ScoredProduct,
  count: number = 2
): string[] {
  return scoredProduct.concerns.slice(0, count);
}
