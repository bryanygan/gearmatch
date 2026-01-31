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

  // Final score is already normalized to 0-100 scale via weighted sum
  const score = Math.round(weightedSum);

  return {
    product,
    score,
    breakdown,
    matchReasons,
    concerns,
  };
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
export function getMouseRecommendations(
  answers: MouseQuizAnswers,
  options: RecommendationOptions = {}
): RecommendationResult<MouseProduct> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all mouse products
  const products = getMouseProducts();

  // Score all products
  const scoredProducts = scoreProducts(answers, products, mouseRules);

  // Filter by minimum score, but keep at least some results
  let qualifyingProducts = scoredProducts.filter((sp) => sp.score >= minScore);

  // If no products meet minimum score, include best available with warnings
  if (qualifyingProducts.length === 0 && scoredProducts.length > 0) {
    // Take top 5 products even if below threshold
    qualifyingProducts = scoredProducts.slice(0, 5);
    // Add a concern about low match scores
    qualifyingProducts.forEach((sp) => {
      if (!sp.concerns.includes("Lower match score - may not be an ideal fit")) {
        sp.concerns.unshift("Lower match score - may not be an ideal fit");
      }
    });
  }

  // Split into top picks and all remaining alternates
  const topPicks = qualifyingProducts.slice(0, topPickCount);
  const alternates = qualifyingProducts.slice(topPickCount);

  return {
    topPicks,
    alternates,
    filters: {
      category: "mouse",
      wireless: answers.wireless === "wireless" ? true : undefined,
    },
    totalEvaluated: products.length,
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
export function getAudioRecommendations(
  answers: AudioQuizAnswers,
  options: RecommendationOptions = {}
): RecommendationResult<AudioProduct> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all audio products
  const products = getAudioProducts();

  // Score all products
  const scoredProducts = scoreProducts(answers, products, audioRules);

  // Filter by minimum score, but keep at least some results
  let qualifyingProducts = scoredProducts.filter((sp) => sp.score >= minScore);

  // If no products meet minimum score, include best available with warnings
  if (qualifyingProducts.length === 0 && scoredProducts.length > 0) {
    // Take top 5 products even if below threshold
    qualifyingProducts = scoredProducts.slice(0, 5);
    // Add a concern about low match scores
    qualifyingProducts.forEach((sp) => {
      if (!sp.concerns.includes("Lower match score - may not be an ideal fit")) {
        sp.concerns.unshift("Lower match score - may not be an ideal fit");
      }
    });
  }

  // Split into top picks and all remaining alternates
  const topPicks = qualifyingProducts.slice(0, topPickCount);
  const alternates = qualifyingProducts.slice(topPickCount);

  return {
    topPicks,
    alternates,
    filters: {
      category: "audio",
    },
    totalEvaluated: products.length,
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
export function getKeyboardRecommendations(
  answers: KeyboardQuizAnswers,
  options: RecommendationOptions = {}
): RecommendationResult<KeyboardProduct> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all keyboard products
  const products = getKeyboardProducts();

  // Score all products
  const scoredProducts = scoreProducts(answers, products, keyboardRules);

  // Filter by minimum score, but keep at least some results
  let qualifyingProducts = scoredProducts.filter((sp) => sp.score >= minScore);

  // If no products meet minimum score, include best available with warnings
  if (qualifyingProducts.length === 0 && scoredProducts.length > 0) {
    // Take top 5 products even if below threshold
    qualifyingProducts = scoredProducts.slice(0, 5);
    // Add a concern about low match scores
    qualifyingProducts.forEach((sp) => {
      if (!sp.concerns.includes("Lower match score - may not be an ideal fit")) {
        sp.concerns.unshift("Lower match score - may not be an ideal fit");
      }
    });
  }

  // Split into top picks and all remaining alternates
  const topPicks = qualifyingProducts.slice(0, topPickCount);
  const alternates = qualifyingProducts.slice(topPickCount);

  return {
    topPicks,
    alternates,
    filters: {
      category: "keyboard",
      wireless: answers.connectivity === "wireless-essential" ? true : undefined,
    },
    totalEvaluated: products.length,
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
export function getMonitorRecommendations(
  answers: MonitorQuizAnswers,
  options: RecommendationOptions = {}
): RecommendationResult<MonitorProduct> {
  const {
    minScore = 50,
    topPickCount = 3,
  } = options;

  // Get all monitor products
  const products = getMonitorProducts();

  // Score all products
  const scoredProducts = scoreProducts(answers, products, monitorRules);

  // Filter by minimum score, but keep at least some results
  let qualifyingProducts = scoredProducts.filter((sp) => sp.score >= minScore);

  // If no products meet minimum score, include best available with warnings
  if (qualifyingProducts.length === 0 && scoredProducts.length > 0) {
    // Take top 5 products even if below threshold
    qualifyingProducts = scoredProducts.slice(0, 5);
    // Add a concern about low match scores
    qualifyingProducts.forEach((sp) => {
      if (!sp.concerns.includes("Lower match score - may not be an ideal fit")) {
        sp.concerns.unshift("Lower match score - may not be an ideal fit");
      }
    });
  }

  // Split into top picks and all remaining alternates
  const topPicks = qualifyingProducts.slice(0, topPickCount);
  const alternates = qualifyingProducts.slice(topPickCount);

  return {
    topPicks,
    alternates,
    filters: {
      category: "monitor",
    },
    totalEvaluated: products.length,
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
  if (score >= 90) return "Excellent Match";
  if (score >= 80) return "Great Match";
  if (score >= 70) return "Good Match";
  if (score >= 60) return "Decent Match";
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
