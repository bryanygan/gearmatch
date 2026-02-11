/**
 * Recommendation Hooks
 *
 * React hooks for integrating the scoring engine with quiz components.
 * Uses React Query for async data fetching and caching.
 */

import { useQuery } from "@tanstack/react-query";
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

// Feature flag — set to true to use Web Worker scoring
const USE_WORKER_SCORING = false;

// =============================================================================
// Mouse Recommendations Hook
// =============================================================================

/**
 * Hook return type for mouse recommendations.
 */
export interface UseMouseRecommendationsResult {
  /** Recommendation results, null if no answers provided */
  recommendations: RecommendationResult<MouseProduct> | null;
  /** True while recommendations are being computed */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get mouse recommendations based on quiz answers.
 * Uses React Query for async caching.
 *
 * @param answers - Mouse quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 */
export function useMouseRecommendations(
  answers: MouseQuizAnswers | null,
  options?: RecommendationOptions
): UseMouseRecommendationsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", "mouse", answers, options],
    queryFn: async () => {
      if (USE_WORKER_SCORING) {
        const { getMouseRecommendationsWorker } = await import("@/lib/scoring/worker");
        return getMouseRecommendationsWorker(answers!, options);
      }
      return getMouseRecommendations(answers!, options);
    },
    enabled: answers !== null,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  return {
    recommendations: data ?? null,
    isLoading,
    error: error as Error | null,
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
  /** True while recommendations are being computed */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get audio recommendations based on quiz answers.
 * Uses React Query for async caching.
 *
 * @param answers - Audio quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 */
export function useAudioRecommendations(
  answers: AudioQuizAnswers | null,
  options?: RecommendationOptions
): UseAudioRecommendationsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", "audio", answers, options],
    queryFn: async () => {
      if (USE_WORKER_SCORING) {
        const { getAudioRecommendationsWorker } = await import("@/lib/scoring/worker");
        return getAudioRecommendationsWorker(answers!, options);
      }
      return getAudioRecommendations(answers!, options);
    },
    enabled: answers !== null,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  return {
    recommendations: data ?? null,
    isLoading,
    error: error as Error | null,
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
  /** True while recommendations are being computed */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get keyboard recommendations based on quiz answers.
 * Uses React Query for async caching.
 *
 * @param answers - Keyboard quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 */
export function useKeyboardRecommendations(
  answers: KeyboardQuizAnswers | null,
  options?: RecommendationOptions
): UseKeyboardRecommendationsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", "keyboard", answers, options],
    queryFn: async () => {
      if (USE_WORKER_SCORING) {
        const { getKeyboardRecommendationsWorker } = await import("@/lib/scoring/worker");
        return getKeyboardRecommendationsWorker(answers!, options);
      }
      return getKeyboardRecommendations(answers!, options);
    },
    enabled: answers !== null,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  return {
    recommendations: data ?? null,
    isLoading,
    error: error as Error | null,
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
  /** True while recommendations are being computed */
  isLoading: boolean;
  /** Error if recommendation generation failed */
  error: Error | null;
}

/**
 * Hook to get monitor recommendations based on quiz answers.
 * Uses React Query for async caching.
 *
 * @param answers - Monitor quiz answers, or null if quiz not completed
 * @param options - Optional recommendation configuration
 * @returns Recommendations result with loading and error states
 */
export function useMonitorRecommendations(
  answers: MonitorQuizAnswers | null,
  options?: RecommendationOptions
): UseMonitorRecommendationsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", "monitor", answers, options],
    queryFn: async () => {
      if (USE_WORKER_SCORING) {
        const { getMonitorRecommendationsWorker } = await import("@/lib/scoring/worker");
        return getMonitorRecommendationsWorker(answers!, options);
      }
      return getMonitorRecommendations(answers!, options);
    },
    enabled: answers !== null,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  return {
    recommendations: data ?? null,
    isLoading,
    error: error as Error | null,
  };
}
