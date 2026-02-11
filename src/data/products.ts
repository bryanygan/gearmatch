/**
 * Product Store
 *
 * Async product loaders that dynamically import category JSON data on demand.
 * Each category is loaded only when needed, enabling code splitting.
 */

import type { MouseProduct } from "@/types/products";
import type { AudioProduct } from "@/types/products";
import type { KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";

// Re-export type guards for convenience
export { isMouseProduct, isAudioProduct, isKeyboardProduct } from "@/types/products";
export { isMonitorProduct } from "@/types/monitor";

// =============================================================================
// Async Product Loaders
// =============================================================================

/**
 * Dynamically loads all mouse products.
 * The JS runtime caches import() calls, so repeated calls are instant.
 */
export async function getMouseProducts(): Promise<MouseProduct[]> {
  const data = await import("./products/mice.json");
  return data.default as MouseProduct[];
}

/**
 * Dynamically loads all audio products.
 */
export async function getAudioProducts(): Promise<AudioProduct[]> {
  const data = await import("./products/audio.json");
  return data.default as AudioProduct[];
}

/**
 * Dynamically loads all keyboard products.
 */
export async function getKeyboardProducts(): Promise<KeyboardProduct[]> {
  const data = await import("./products/keyboards.json");
  return data.default as KeyboardProduct[];
}

/**
 * Dynamically loads all monitor products.
 */
export async function getMonitorProducts(): Promise<MonitorProduct[]> {
  const data = await import("./products/monitors.json");
  return data.default as MonitorProduct[];
}
