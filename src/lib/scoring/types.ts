/**
 * Scoring Engine Type Definitions
 *
 * Core interfaces for the GearMatch recommendation scoring system.
 * These types support scoring, ranking, and explaining product recommendations.
 */

import type { Product, MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";

// =============================================================================
// Quiz Answer Types
// =============================================================================

/**
 * Mouse quiz answer structure from MouseQuiz.tsx
 * Multi-select fields are arrays; single-select fields remain strings.
 * Optional fields are from the enhanced quiz (Phase 2 questions).
 */
export interface MouseQuizAnswers {
  "hand-size": "small" | "medium" | "large";
  "grip-style": ("palm" | "claw" | "fingertip" | "relaxed-claw")[];
  "weight-preference": ("ultralight" | "light" | "medium" | "heavy")[];
  wireless: "wireless" | "wired" | "either";
  "primary-use": ("precision" | "productivity" | "creative" | "mixed")[];
  // Enhanced quiz fields (optional for backwards compatibility)
  handedness?: "right" | "left" | "ambidextrous";
  "shape-profile"?: ("low_hump" | "rear_hump" | "center_hump" | "ergo_hump" | "any")[];
  "gaming-genre"?: ("fps" | "moba" | "mmo" | "general")[];
  "button-needs"?: "minimal" | "standard" | "many" | "mmo_grid";
}

/**
 * Audio quiz answer structure from AudioQuiz.tsx
 * Multi-select fields are arrays; single-select fields remain strings.
 * Optional fields are from the enhanced quiz (Phase 2 questions).
 */
export interface AudioQuizAnswers {
  "primary-use": ("competitive" | "immersive" | "mixed" | "streaming")[];
  "form-factor": ("over-ear" | "over-ear-headphone" | "iem" | "open-back")[];
  "mic-needs": "essential" | "nice-to-have" | "not-needed";
  "session-length": ("short" | "medium" | "long" | "all-day")[];
  budget: ("budget" | "mid-range" | "premium" | "no-limit")[];
  // Enhanced quiz fields (optional for backwards compatibility)
  "sound-signature"?: ("neutral" | "warm" | "v_shaped" | "bright")[];
  "wireless-preference"?: "wireless-required" | "wireless-preferred" | "wired-preferred" | "either";
  "noise-environment"?: "quiet" | "moderate" | "noisy";
}

/**
 * Keyboard quiz answer structure from KeyboardQuiz.tsx
 * Multi-select fields are arrays; single-select fields remain strings.
 * Optional fields are from the enhanced quiz (Phase 2 questions).
 */
export interface KeyboardQuizAnswers {
  "primary-use": ("competitive-gaming" | "casual-gaming" | "productivity" | "programming")[];
  "form-factor": ("full-size" | "tkl" | "75-percent" | "60-65-percent")[];
  "switch-type": ("linear" | "tactile" | "clicky" | "no-preference")[];
  "gaming-features": "essential" | "nice-to-have" | "not-important";
  connectivity: "wireless-essential" | "wireless-preferred" | "wired-preferred" | "no-preference";
  "priority-feature": ("performance" | "typing-feel" | "customization" | "quiet")[];
  budget: ("budget" | "mid-range" | "premium" | "enthusiast")[];
  // Enhanced quiz fields (optional for backwards compatibility)
  "switch-technology"?: ("mechanical" | "magnetic" | "optical" | "any")[];
  "media-controls"?: "essential" | "nice-to-have" | "not-needed";
  "keycap-material"?: "pbt" | "abs" | "any";
}

// =============================================================================
// Scoring Result Types
// =============================================================================

/**
 * Detailed breakdown of score for a single category/rule.
 */
export interface ScoreCategoryBreakdown {
  /** Points earned in this category */
  score: number;
  /** Maximum possible points */
  maxScore: number;
  /** Category weight (0-1) */
  weight: number;
  /** Human-readable explanation */
  details: string;
}

/**
 * Detailed breakdown of how the overall score was calculated.
 */
export interface ScoreBreakdown {
  [category: string]: ScoreCategoryBreakdown;
}

/**
 * Result of scoring a single product against quiz answers.
 */
export interface ScoredProduct<T extends Product = Product> {
  /** The product that was scored */
  product: T;
  /** Overall match score (0-100) */
  score: number;
  /** Detailed breakdown by scoring category */
  breakdown: ScoreBreakdown;
  /** Human-readable reasons why this product matched well */
  matchReasons: string[];
  /** Potential concerns or tradeoffs to consider */
  concerns: string[];
}

// =============================================================================
// Scoring Rule Types
// =============================================================================

/**
 * Result from evaluating a single scoring rule.
 */
export interface RuleResult {
  /** Points awarded by this rule */
  points: number;
  /** Why points were awarded (positive match explanation) */
  reason?: string;
  /** Any concern or tradeoff to note */
  concern?: string;
}

/**
 * Configuration for a scoring rule.
 * Rules evaluate products against quiz answers and return points.
 */
export interface ScoringRule<TAnswers, TProduct extends Product> {
  /** Human-readable name for this rule */
  name: string;
  /** Weight of this rule (0-1), how important it is in overall score */
  weight: number;
  /** Maximum points this rule can award */
  maxPoints: number;
  /** Evaluate a product against answers and return points + explanations */
  evaluate: (answers: TAnswers, product: TProduct) => RuleResult;
}

// =============================================================================
// Recommendation Result Types
// =============================================================================

/**
 * Filters that were applied during recommendation generation.
 */
export interface AppliedFilters {
  /** Product category that was filtered */
  category: "mouse" | "audio" | "keyboard";
  /** Price range filter if applied */
  priceRange?: [number, number];
  /** Wireless filter if applied */
  wireless?: boolean;
}

/**
 * Final recommendation output with ranked products.
 */
export interface RecommendationResult<T extends Product = Product> {
  /** Top 3-5 recommended products */
  topPicks: ScoredProduct<T>[];
  /** Other good matches that didn't make top picks */
  alternates: ScoredProduct<T>[];
  /** Filters that were applied */
  filters: AppliedFilters;
  /** Total number of products that were evaluated */
  totalEvaluated: number;
}

// =============================================================================
// Typed Recommendation Results
// =============================================================================

/**
 * Mouse-specific recommendation result.
 */
export type MouseRecommendationResult = RecommendationResult<MouseProduct>;

/**
 * Audio-specific recommendation result.
 */
export type AudioRecommendationResult = RecommendationResult<AudioProduct>;

/**
 * Mouse-specific scored product.
 */
export type ScoredMouseProduct = ScoredProduct<MouseProduct>;

/**
 * Audio-specific scored product.
 */
export type ScoredAudioProduct = ScoredProduct<AudioProduct>;

/**
 * Keyboard-specific recommendation result.
 */
export type KeyboardRecommendationResult = RecommendationResult<KeyboardProduct>;

/**
 * Keyboard-specific scored product.
 */
export type ScoredKeyboardProduct = ScoredProduct<KeyboardProduct>;

// =============================================================================
// Scoring Options
// =============================================================================

/**
 * Options for recommendation generation.
 */
export interface RecommendationOptions {
  /** Minimum score threshold (default: 50) */
  minScore?: number;
  /** Number of top picks vs alternates (default: 3) */
  topPickCount?: number;
}

/**
 * Default recommendation options.
 */
export const DEFAULT_RECOMMENDATION_OPTIONS: Required<RecommendationOptions> = {
  minScore: 50,
  topPickCount: 3,
};
