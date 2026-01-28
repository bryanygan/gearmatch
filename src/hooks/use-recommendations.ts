/**
 * Recommendation Hooks
 *
 * React hooks for integrating the scoring engine with quiz components.
 * Handles memoization and provides a clean interface for getting recommendations.
 */

import { useMemo } from "react";
import type { MouseProduct, AudioProduct } from "@/types/products";
import {
  getMouseRecommendations,
  getAudioRecommendations,
  type MouseQuizAnswers,
  type AudioQuizAnswers,
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
  // Use individual answer values as dependencies for better performance
  // (avoids JSON.stringify overhead on every render)
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
    answers?.["grip-style"],
    answers?.["weight-preference"],
    answers?.wireless,
    answers?.["primary-use"],
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
  // Use individual answer values as dependencies for better performance
  // (avoids JSON.stringify overhead on every render)
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
    answers?.["primary-use"],
    answers?.["form-factor"],
    answers?.["mic-needs"],
    answers?.["session-length"],
    answers?.budget,
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
export type AnyQuizAnswers = MouseQuizAnswers | AudioQuizAnswers;

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
