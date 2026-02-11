/**
 * Scoring Web Worker
 *
 * Runs scoring engine off the main thread. Loads product data internally
 * to avoid serializing large product arrays over postMessage.
 */

import { scoreProducts } from "../engine";
import { applyThresholdAndSplit } from "../threshold";
import { mouseRules } from "../mouse-rules";
import { audioRules } from "../audio-rules";
import { keyboardRules } from "../keyboard-rules";
import { monitorRules } from "../monitor-rules";
import { applyPreFilters } from "@/lib/filtering/apply-filters";
import { mousePreFilters } from "@/lib/filtering/mouse-filters";
import { audioPreFilters } from "@/lib/filtering/audio-filters";
import { keyboardPreFilters } from "@/lib/filtering/keyboard-filters";
import { monitorPreFilters } from "@/lib/filtering/monitor-filters";

export type WorkerRequest = {
  id: number;
  type: "score";
  category: "mouse" | "audio" | "keyboard" | "monitor";
  answers: Record<string, unknown>;
  options?: { minScore?: number; topPickCount?: number };
};

export type WorkerResponse = {
  id: number;
  type: "result" | "error";
  data?: unknown;
  error?: string;
};

const CONFIGS = {
  mouse: {
    load: () => import("@/data/products/mice.json").then((m) => m.default),
    rules: mouseRules,
    filters: mousePreFilters,
  },
  audio: {
    load: () => import("@/data/products/audio.json").then((m) => m.default),
    rules: audioRules,
    filters: audioPreFilters,
  },
  keyboard: {
    load: () => import("@/data/products/keyboards.json").then((m) => m.default),
    rules: keyboardRules,
    filters: keyboardPreFilters,
  },
  monitor: {
    load: () => import("@/data/products/monitors.json").then((m) => m.default),
    rules: monitorRules,
    filters: monitorPreFilters,
  },
} as const;

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { id, category, answers, options = {} } = event.data;
  const { minScore = 50, topPickCount = 3 } = options;

  try {
    const config = CONFIGS[category as keyof typeof CONFIGS];
    if (!config) {
      (self as unknown as Worker).postMessage({
        id,
        type: "error",
        error: `Invalid category: ${category}`,
      } satisfies WorkerResponse);
      return;
    }
    const allProducts = await config.load();

    // Pre-filter
    const { filtered: products } = applyPreFilters(
      answers as any,
      allProducts as any,
      config.filters as any
    );

    // Score
    const scoredProducts = scoreProducts(
      answers as any,
      products as any,
      config.rules as any
    );

    // Apply minimum score + split
    const { topPicks, alternates } = applyThresholdAndSplit(scoredProducts, minScore, topPickCount);

    const wireless =
      category === "mouse" ? (answers.wireless === "wireless" ? true : undefined) :
      category === "keyboard" ? (answers.connectivity === "wireless-essential" ? true : undefined) :
      undefined;

    const result = {
      topPicks,
      alternates,
      filters: { category, wireless },
      totalEvaluated: allProducts.length,
    };

    (self as unknown as Worker).postMessage({
      id,
      type: "result",
      data: result,
    } satisfies WorkerResponse);
  } catch (err) {
    (self as unknown as Worker).postMessage({
      id,
      type: "error",
      error: err instanceof Error ? err.message : String(err),
    } satisfies WorkerResponse);
  }
};
