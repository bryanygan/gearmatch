import { useEffect } from "react";

type ProductCategory = "mouse" | "audio" | "keyboard" | "monitor";

const prefetchMap: Record<ProductCategory, () => Promise<unknown>> = {
  mouse: () => import("@/data/products/mice"),
  audio: () => import("@/data/products/audio"),
  keyboard: () => import("@/data/products/keyboards"),
  monitor: () => import("@/data/products/monitors"),
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
