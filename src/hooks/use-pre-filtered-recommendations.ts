/**
 * Pre-Filtered Recommendations Hook
 *
 * Integration hook that optionally pre-filters products via the API
 * before running client-side scoring. Gated behind a feature flag
 * with graceful fallback to the full client-side flow.
 */

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/client";
import {
  getMouseProducts,
  getAudioProducts,
  getKeyboardProducts,
  getMonitorProducts,
} from "@/data/products";
import { scoreProducts } from "@/lib/scoring/engine";
import { applyThresholdAndSplit } from "@/lib/scoring/threshold";
import { mouseRules } from "@/lib/scoring/mouse-rules";
import { audioRules } from "@/lib/scoring/audio-rules";
import { keyboardRules } from "@/lib/scoring/keyboard-rules";
import { monitorRules } from "@/lib/scoring/monitor-rules";
import type { Product, MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import type {
  MouseQuizAnswers,
  AudioQuizAnswers,
  KeyboardQuizAnswers,
  MonitorQuizAnswers,
  RecommendationResult,
  RecommendationOptions,
  ScoringRule,
} from "@/lib/scoring/types";
import type { FilterRequest } from "@/lib/api/types";

// Feature flag — set to true to enable API pre-filtering
const USE_API_PREFILTER = false;

type CategoryConfig = {
  category: FilterRequest["category"];
  getProducts: () => Promise<Product[]>;
  rules: ScoringRule<unknown, Product>[];
};

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  mouse: {
    category: "mouse",
    getProducts: getMouseProducts as () => Promise<Product[]>,
    rules: mouseRules as unknown as ScoringRule<unknown, Product>[],
  },
  audio: {
    category: "audio",
    getProducts: getAudioProducts as () => Promise<Product[]>,
    rules: audioRules as unknown as ScoringRule<unknown, Product>[],
  },
  keyboard: {
    category: "keyboard",
    getProducts: getKeyboardProducts as () => Promise<Product[]>,
    rules: keyboardRules as unknown as ScoringRule<unknown, Product>[],
  },
  monitor: {
    category: "monitor",
    getProducts: getMonitorProducts as () => Promise<Product[]>,
    rules: monitorRules as unknown as ScoringRule<unknown, Product>[],
  },
};

type AnyQuizAnswers =
  | MouseQuizAnswers
  | AudioQuizAnswers
  | KeyboardQuizAnswers
  | MonitorQuizAnswers;

async function getPreFilteredRecommendations<T extends Product>(
  category: FilterRequest["category"],
  answers: AnyQuizAnswers,
  options: RecommendationOptions = {}
): Promise<RecommendationResult<T>> {
  const config = CATEGORY_CONFIGS[category];
  const { minScore = 50, topPickCount = 3 } = options;

  let products = (await config.getProducts()) as T[];
  const totalEvaluated = products.length;

  // Attempt API pre-filter if feature flag is enabled
  if (USE_API_PREFILTER) {
    try {
      const filterResponse = await productsApi.filter({
        category,
        answers: answers as Record<string, unknown>,
      });

      const candidateSet = new Set(filterResponse.candidateIds);
      products = products.filter((p) => candidateSet.has(p.id));
    } catch {
      // Graceful fallback: use all products if API fails
    }
  }

  // Score products client-side using existing engine
  const scoredProducts = scoreProducts(
    answers,
    products,
    config.rules as ScoringRule<AnyQuizAnswers, T>[]
  );

  const { topPicks, alternates } = applyThresholdAndSplit(scoredProducts, minScore, topPickCount);

  return {
    topPicks,
    alternates,
    filters: { category },
    totalEvaluated,
  };
}

interface UsePreFilteredResult<T extends Product> {
  recommendations: RecommendationResult<T> | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePreFilteredMouseRecommendations(
  answers: MouseQuizAnswers | null,
  options?: RecommendationOptions
): UsePreFilteredResult<MouseProduct> {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pre-filtered", "mouse", answers, options],
    queryFn: () =>
      getPreFilteredRecommendations<MouseProduct>("mouse", answers!, options),
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

export function usePreFilteredAudioRecommendations(
  answers: AudioQuizAnswers | null,
  options?: RecommendationOptions
): UsePreFilteredResult<AudioProduct> {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pre-filtered", "audio", answers, options],
    queryFn: () =>
      getPreFilteredRecommendations<AudioProduct>("audio", answers!, options),
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

export function usePreFilteredKeyboardRecommendations(
  answers: KeyboardQuizAnswers | null,
  options?: RecommendationOptions
): UsePreFilteredResult<KeyboardProduct> {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pre-filtered", "keyboard", answers, options],
    queryFn: () =>
      getPreFilteredRecommendations<KeyboardProduct>(
        "keyboard",
        answers!,
        options
      ),
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

export function usePreFilteredMonitorRecommendations(
  answers: MonitorQuizAnswers | null,
  options?: RecommendationOptions
): UsePreFilteredResult<MonitorProduct> {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pre-filtered", "monitor", answers, options],
    queryFn: () =>
      getPreFilteredRecommendations<MonitorProduct>(
        "monitor",
        answers!,
        options
      ),
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
