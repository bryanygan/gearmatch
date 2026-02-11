/**
 * Web Worker Client
 *
 * Main-thread wrapper that provides the same async interface as the
 * scoring engine, but delegates computation to a Web Worker.
 */

import type { MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import type {
  RecommendationResult,
  RecommendationOptions,
  MouseQuizAnswers,
  AudioQuizAnswers,
  KeyboardQuizAnswers,
  MonitorQuizAnswers,
} from "../types";
import type { WorkerRequest, WorkerResponse } from "./scoring.worker";

let worker: Worker | null = null;
let requestId = 0;
const pending = new Map<
  number,
  { resolve: (value: unknown) => void; reject: (error: Error) => void }
>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(
      new URL("./scoring.worker.ts", import.meta.url),
      { type: "module" }
    );
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { id, type, data, error } = event.data;
      const handler = pending.get(id);
      if (!handler) return;
      pending.delete(id);
      if (type === "error") {
        handler.reject(new Error(error ?? "Worker error"));
      } else {
        handler.resolve(data);
      }
    };
    worker.onerror = (err) => {
      for (const [id, handler] of pending) {
        handler.reject(new Error(`Worker error: ${err.message}`));
        pending.delete(id);
      }
      worker = null;
    };
  }
  return worker;
}

function postToWorker<T>(
  category: WorkerRequest["category"],
  answers: unknown,
  options?: RecommendationOptions
): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = ++requestId;
    pending.set(id, {
      resolve: resolve as (value: unknown) => void,
      reject,
    });
    getWorker().postMessage({
      id,
      type: "score",
      category,
      answers,
      options,
    } satisfies WorkerRequest);
  });
}

export function getMouseRecommendationsWorker(
  answers: MouseQuizAnswers,
  options?: RecommendationOptions
): Promise<RecommendationResult<MouseProduct>> {
  return postToWorker("mouse", answers, options);
}

export function getAudioRecommendationsWorker(
  answers: AudioQuizAnswers,
  options?: RecommendationOptions
): Promise<RecommendationResult<AudioProduct>> {
  return postToWorker("audio", answers, options);
}

export function getKeyboardRecommendationsWorker(
  answers: KeyboardQuizAnswers,
  options?: RecommendationOptions
): Promise<RecommendationResult<KeyboardProduct>> {
  return postToWorker("keyboard", answers, options);
}

export function getMonitorRecommendationsWorker(
  answers: MonitorQuizAnswers,
  options?: RecommendationOptions
): Promise<RecommendationResult<MonitorProduct>> {
  return postToWorker("monitor", answers, options);
}

export function terminateScoringWorker(): void {
  if (worker) {
    worker.terminate();
    worker = null;
    for (const [id, handler] of pending) {
      handler.reject(new Error("Worker terminated"));
      pending.delete(id);
    }
  }
}
