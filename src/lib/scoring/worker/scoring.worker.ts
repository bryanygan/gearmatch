/**
 * Scoring Web Worker
 *
 * Runs scoring engine off the main thread. Loads product data internally
 * to avoid serializing large product arrays over postMessage.
 */

import { scoreProducts } from "../engine";
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
    const config = CONFIGS[category];
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
    let qualifying = scoredProducts.filter((sp) => sp.score >= minScore);
    if (qualifying.length === 0 && scoredProducts.length > 0) {
      qualifying = scoredProducts.slice(0, 5);
      qualifying.forEach((sp) => {
        if (
          !sp.concerns.includes(
            "Lower match score - may not be an ideal fit"
          )
        ) {
          sp.concerns.unshift("Lower match score - may not be an ideal fit");
        }
      });
    }

    const topPicks = qualifying.slice(0, topPickCount);
    const alternates = qualifying.slice(topPickCount);

    const result = {
      topPicks,
      alternates,
      filters: { category },
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
