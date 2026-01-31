/**
 * Recommendation Hooks
 *
 * React hooks for integrating the scoring engine with quiz components.
 * Handles memoization and provides a clean interface for getting recommendations.
 */

import { useMemo } from "react";
import type { MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import {
  getMouseRecommendations,
  getAudioRecommendations,
  getKeyboardRecommendations,
  getMonitorRecommendations,
  type MouseQuizAnswers,
  type AudioQuizAnswers,
  type KeyboardQuizAnswers,
  type MonitorQuizAnswers,
  type RecommendationResult,
  type RecommendationOptions,
} from "@/lib/scoring";

// =============================================================================
// Mouse Recommendations Hook
// =============================================================================

/**
 * Hook return type for mouse recommendations.
 */
export interface UseMouseRecommendationsResult {
  /** Recommendation results, null if no answers provided */
  recommendations: RecommendationResult<MouseProduct> | null;
  /** Always false (sync operation), included for API consistency */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get mouse recommendations based on quiz answers.
 * Memoizes results based on answer changes.
 *
 * @param answers - Mouse quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 *
 * @example
 * ```tsx
 * const { recommendations, error } = useMouseRecommendations(quizAnswers);
 *
 * if (error) return <ErrorMessage error={error} />;
 * if (!recommendations) return <QuizInProgress />;
 *
 * return <RecommendationList picks={recommendations.topPicks} />;
 * ```
 */
export function useMouseRecommendations(
  answers: MouseQuizAnswers | null,
  options?: RecommendationOptions
): UseMouseRecommendationsResult {
  // Stringify array values for stable dependency comparison
  const gripStyleKey = answers?.["grip-style"]?.join(",") ?? "";
  const weightPrefKey = answers?.["weight-preference"]?.join(",") ?? "";
  const primaryUseKey = answers?.["primary-use"]?.join(",") ?? "";

  const result = useMemo(() => {
    if (!answers) {
      return { recommendations: null, error: null };
    }

    try {
      const recommendations = getMouseRecommendations(answers, options);
      return { recommendations, error: null };
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Failed to generate recommendations");
      return { recommendations: null, error };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    answers?.["hand-size"],
    gripStyleKey,
    weightPrefKey,
    answers?.wireless,
    primaryUseKey,
    options?.minScore,
    options?.topPickCount,
  ]);

  return {
    recommendations: result.recommendations,
    isLoading: false, // Sync operation, never loading
    error: result.error,
  };
}

// =============================================================================
// Audio Recommendations Hook
// =============================================================================

/**
 * Hook return type for audio recommendations.
 */
export interface UseAudioRecommendationsResult {
  /** Recommendation results, null if no answers provided */
  recommendations: RecommendationResult<AudioProduct> | null;
  /** Always false (sync operation), included for API consistency */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get audio recommendations based on quiz answers.
 * Memoizes results based on answer changes.
 *
 * @param answers - Audio quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 *
 * @example
 * ```tsx
 * const { recommendations, error } = useAudioRecommendations(quizAnswers);
 *
 * if (error) return <ErrorMessage error={error} />;
 * if (!recommendations) return <QuizInProgress />;
 *
 * return <RecommendationList picks={recommendations.topPicks} />;
 * ```
 */
export function useAudioRecommendations(
  answers: AudioQuizAnswers | null,
  options?: RecommendationOptions
): UseAudioRecommendationsResult {
  // Stringify array values for stable dependency comparison
  const primaryUseKey = answers?.["primary-use"]?.join(",") ?? "";
  const formFactorKey = answers?.["form-factor"]?.join(",") ?? "";
  const sessionLengthKey = answers?.["session-length"]?.join(",") ?? "";
  const budgetKey = answers?.budget?.join(",") ?? "";

  const result = useMemo(() => {
    if (!answers) {
      return { recommendations: null, error: null };
    }

    try {
      const recommendations = getAudioRecommendations(answers, options);
      return { recommendations, error: null };
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Failed to generate recommendations");
      return { recommendations: null, error };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    primaryUseKey,
    formFactorKey,
    answers?.["mic-needs"],
    sessionLengthKey,
    budgetKey,
    options?.minScore,
    options?.topPickCount,
  ]);

  return {
    recommendations: result.recommendations,
    isLoading: false, // Sync operation, never loading
    error: result.error,
  };
}

// =============================================================================
// Utility Type Guards
// =============================================================================

/**
 * Union type for any quiz answers.
 */
export type AnyQuizAnswers = MouseQuizAnswers | AudioQuizAnswers | KeyboardQuizAnswers | MonitorQuizAnswers;

/**
 * Type guard to check if answers are for mouse quiz.
 */
export function isMouseQuizAnswers(
  answers: AnyQuizAnswers
): answers is MouseQuizAnswers {
  return "hand-size" in answers && "grip-style" in answers;
}

/**
 * Type guard to check if answers are for audio quiz.
 */
export function isAudioQuizAnswers(
  answers: AnyQuizAnswers
): answers is AudioQuizAnswers {
  return "form-factor" in answers && "mic-needs" in answers;
}

/**
 * Type guard to check if answers are for keyboard quiz.
 */
export function isKeyboardQuizAnswers(
  answers: AnyQuizAnswers
): answers is KeyboardQuizAnswers {
  return "switch-type" in answers && "gaming-features" in answers;
}

/**
 * Type guard to check if answers are for monitor quiz.
 */
export function isMonitorQuizAnswers(
  answers: AnyQuizAnswers
): answers is MonitorQuizAnswers {
  return "size-preference" in answers && "resolution" in answers;
}

// =============================================================================
// Keyboard Recommendations Hook
// =============================================================================

/**
 * Hook return type for keyboard recommendations.
 */
export interface UseKeyboardRecommendationsResult {
  /** Recommendation results, null if no answers provided */
  recommendations: RecommendationResult<KeyboardProduct> | null;
  /** Always false (sync operation), included for API consistency */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get keyboard recommendations based on quiz answers.
 * Memoizes results based on answer changes.
 *
 * @param answers - Keyboard quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 *
 * @example
 * ```tsx
 * const { recommendations, error } = useKeyboardRecommendations(quizAnswers);
 *
 * if (error) return <ErrorMessage error={error} />;
 * if (!recommendations) return <QuizInProgress />;
 *
 * return <RecommendationList picks={recommendations.topPicks} />;
 * ```
 */
export function useKeyboardRecommendations(
  answers: KeyboardQuizAnswers | null,
  options?: RecommendationOptions
): UseKeyboardRecommendationsResult {
  // Stringify array values for stable dependency comparison
  const primaryUseKey = answers?.["primary-use"]?.join(",") ?? "";
  const formFactorKey = answers?.["form-factor"]?.join(",") ?? "";
  const switchTypeKey = answers?.["switch-type"]?.join(",") ?? "";
  const priorityFeatureKey = answers?.["priority-feature"]?.join(",") ?? "";
  const budgetKey = answers?.budget?.join(",") ?? "";

  const result = useMemo(() => {
    if (!answers) {
      return { recommendations: null, error: null };
    }

    try {
      const recommendations = getKeyboardRecommendations(answers, options);
      return { recommendations, error: null };
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Failed to generate recommendations");
      return { recommendations: null, error };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    primaryUseKey,
    formFactorKey,
    switchTypeKey,
    answers?.["gaming-features"],
    answers?.connectivity,
    priorityFeatureKey,
    budgetKey,
    options?.minScore,
    options?.topPickCount,
  ]);

  return {
    recommendations: result.recommendations,
    isLoading: false, // Sync operation, never loading
    error: result.error,
  };
}

// =============================================================================
// Monitor Recommendations Hook
// =============================================================================

/**
 * Hook return type for monitor recommendations.
 */
export interface UseMonitorRecommendationsResult {
  /** Recommendation results, null if no answers provided */
  recommendations: RecommendationResult<MonitorProduct> | null;
  /** Always false (sync operation), included for API consistency */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get monitor recommendations based on quiz answers.
 * Memoizes results based on answer changes.
 *
 * @param answers - Monitor quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 *
 * @example
 * ```tsx
 * const { recommendations, error } = useMonitorRecommendations(quizAnswers);
 *
 * if (error) return <ErrorMessage error={error} />;
 * if (!recommendations) return <QuizInProgress />;
 *
 * return <RecommendationList picks={recommendations.topPicks} />;
 * ```
 */
export function useMonitorRecommendations(
  answers: MonitorQuizAnswers | null,
  options?: RecommendationOptions
): UseMonitorRecommendationsResult {
  // Stringify array values for stable dependency comparison
  const primaryUseKey = answers?.["primary-use"]?.join(",") ?? "";
  const panelTypeKey = answers?.["panel-type"]?.join(",") ?? "";
  const budgetKey = answers?.budget?.join(",") ?? "";
  const featuresKey = answers?.features?.join(",") ?? "";

  const result = useMemo(() => {
    if (!answers) {
      return { recommendations: null, error: null };
    }

    try {
      const recommendations = getMonitorRecommendations(answers, options);
      return { recommendations, error: null };
    } catch (e) {
      const error = e instanceof Error ? e : new Error("Failed to generate recommendations");
      return { recommendations: null, error };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    primaryUseKey,
    answers?.["size-preference"],
    answers?.resolution,
    answers?.["refresh-rate"],
    panelTypeKey,
    budgetKey,
    answers?.curved,
    answers?.["color-accuracy"],
    answers?.["hdr-needs"],
    featuresKey,
    options?.minScore,
    options?.topPickCount,
  ]);

  return {
    recommendations: result.recommendations,
    isLoading: false, // Sync operation, never loading
    error: result.error,
  };
}
