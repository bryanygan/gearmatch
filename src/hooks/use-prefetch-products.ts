import { useEffect } from "react";

type ProductCategory = "mouse" | "audio" | "keyboard" | "monitor";

const prefetchMap: Record<ProductCategory, () => Promise<unknown>> = {
  mouse: () => import("@/data/products/mice.json"),
  audio: () => import("@/data/products/audio.json"),
  keyboard: () => import("@/data/products/keyboards.json"),
  monitor: () => import("@/data/products/monitors.json"),
};

/**
 * Prefetches product data for a given category.
 * Call this on quiz pages so the dynamic import is cached
 * before the user reaches the results page.
 */
export function usePrefetchProducts(category: ProductCategory) {
  useEffect(() => {
    prefetchMap[category]();
  }, [category]);
}
