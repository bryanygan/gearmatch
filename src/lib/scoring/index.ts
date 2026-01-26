/**
 * Scoring Engine Public Exports
 *
 * Re-exports all public types and functions from the scoring system.
 */

// Types
export type {
  MouseQuizAnswers,
  AudioQuizAnswers,
  ScoredProduct,
  ScoreBreakdown,
  ScoreCategoryBreakdown,
  RuleResult,
  ScoringRule,
  RecommendationResult,
  RecommendationOptions,
  AppliedFilters,
  MouseRecommendationResult,
  AudioRecommendationResult,
  ScoredMouseProduct,
  ScoredAudioProduct,
} from "./types";

// Constants
export { DEFAULT_RECOMMENDATION_OPTIONS } from "./types";

// Core scoring engine
export {
  scoreProducts,
  getMouseRecommendations,
  getAudioRecommendations,
  formatScore,
  getMatchQuality,
  getTopReasons,
  getTopConcerns,
} from "./engine";

// Individual rules (for testing or customization)
export { mouseRules } from "./mouse-rules";
export { audioRules } from "./audio-rules";
