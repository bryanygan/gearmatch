/**
 * Product Store
 *
 * Async product loaders that dynamically import category data on demand.
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
  const { allMouseProducts } = await import("./products/mice");
  return allMouseProducts;
}

/**
 * Dynamically loads all audio products.
 */
export async function getAudioProducts(): Promise<AudioProduct[]> {
  const { allAudioProducts } = await import("./products/audio");
  return allAudioProducts;
}

/**
 * Dynamically loads all keyboard products.
 */
export async function getKeyboardProducts(): Promise<KeyboardProduct[]> {
  const { allKeyboardProducts } = await import("./products/keyboards");
  return allKeyboardProducts;
}

/**
 * Dynamically loads all monitor products.
 */
export async function getMonitorProducts(): Promise<MonitorProduct[]> {
  const { allMonitorProducts } = await import("./products/monitors");
  return allMonitorProducts;
}
