/**
 * Scoring Engine Public Exports
 *
 * Re-exports all public types and functions from the scoring system.
 */

// Types
export type {
  MouseQuizAnswers,
  AudioQuizAnswers,
  KeyboardQuizAnswers,
  MonitorQuizAnswers,
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
  KeyboardRecommendationResult,
  MonitorRecommendationResult,
  ScoredMouseProduct,
  ScoredAudioProduct,
  ScoredKeyboardProduct,
  ScoredMonitorProduct,
} from "./types";

// Constants
export { DEFAULT_RECOMMENDATION_OPTIONS } from "./types";

// Core scoring engine
export {
  scoreProducts,
  getMouseRecommendations,
  getAudioRecommendations,
  getKeyboardRecommendations,
  getMonitorRecommendations,
  formatScore,
  getMatchQuality,
  getTopReasons,
  getTopConcerns,
} from "./engine";

// Individual rules (for testing or customization)
export { mouseRules } from "./mouse-rules";
export { audioRules } from "./audio-rules";
export { keyboardRules } from "./keyboard-rules";
export { monitorRules } from "./monitor-rules";

// Worker-based scoring (opt-in via USE_WORKER_SCORING flag)
export {
  getMouseRecommendationsWorker,
  getAudioRecommendationsWorker,
  getKeyboardRecommendationsWorker,
  getMonitorRecommendationsWorker,
  terminateScoringWorker,
} from "./worker";
