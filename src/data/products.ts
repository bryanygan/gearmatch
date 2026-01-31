/**
 * Product Store
 *
 * Central data store for all GearMatch products with helper functions
 * for querying and filtering products by various criteria.
 */

import type {
  Product,
  MouseProduct,
  AudioProduct,
  KeyboardProduct,
  AnyProduct,
  PriceTier,
} from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import { allMouseProducts } from "./products/mice";
import { allAudioProducts } from "./products/audio";
import { allKeyboardProducts } from "./products/keyboards";
import { allMonitorProducts } from "./products/monitors";

// Re-export type guards for convenience
export { isMouseProduct, isAudioProduct, isKeyboardProduct } from "@/types/products";
export { isMonitorProduct } from "@/types/monitor";

// =============================================================================
// Product Data Arrays
// =============================================================================

/**
 * Array of all mouse products in the system.
 *
 * @see MouseProduct for the required data structure
 * @see src/data/products/mice.ts for product definitions
 */
export const mouseProducts: MouseProduct[] = [
  ...allMouseProducts,
];

/**
 * Array of all audio products in the system.
 *
 * @see AudioProduct for the required data structure
 * @see src/data/products/audio.ts for product definitions
 */
export const audioProducts: AudioProduct[] = [
  ...allAudioProducts,
];

/**
 * Array of all keyboard products in the system.
 *
 * @see KeyboardProduct for the required data structure
 * @see src/data/products/keyboards.ts for product definitions
 */
export const keyboardProducts: KeyboardProduct[] = [
  ...allKeyboardProducts,
];

/**
 * Array of all monitor products in the system.
 *
 * @see MonitorProduct for the required data structure
 * @see src/data/products/monitors.ts for product definitions
 */
export const monitorProducts: MonitorProduct[] = [
  ...allMonitorProducts,
];

/**
 * Combined array of all products in the system.
 * Useful for cross-category operations and global search.
 */
export const allProducts: AnyProduct[] = [
  ...mouseProducts,
  ...audioProducts,
  ...keyboardProducts,
  ...monitorProducts,
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Retrieves a product by its unique identifier.
 *
 * @param id - The product ID to search for
 * @returns The matching product, or undefined if not found
 *
 * @example
 * ```ts
 * const product = getProductById("razer_viper_v3_pro");
 * if (product) {
 *   console.log(product.name); // "Razer Viper V3 Pro"
 * }
 * ```
 */
export function getProductById(id: string): AnyProduct | undefined {
  return allProducts.find((product) => product.id === id);
}

/**
 * Retrieves all products in a specific category.
 *
 * @param category - The category to filter by ("mouse", "audio", or "keyboard")
 * @returns Array of products in the specified category
 *
 * @example
 * ```ts
 * const mice = getProductsByCategory("mouse");
 * const audioGear = getProductsByCategory("audio");
 * const keyboards = getProductsByCategory("keyboard");
 * ```
 */
export function getProductsByCategory(
  category: "mouse" | "audio" | "keyboard" | "monitor"
): AnyProduct[] {
  return allProducts.filter((product) => product.category === category);
}

/**
 * Retrieves all products in a specific price tier.
 *
 * @param tier - The price tier to filter by
 * @returns Array of products in the specified price tier
 *
 * @example
 * ```ts
 * const budgetOptions = getProductsByPriceTier("budget");
 * const premiumOptions = getProductsByPriceTier("premium");
 * ```
 */
export function getProductsByPriceTier(tier: PriceTier): AnyProduct[] {
  return allProducts.filter(
    (product) => product.core_attributes.price_tier === tier
  );
}

/**
 * Retrieves all mouse products with proper typing.
 * Convenience wrapper that ensures type safety.
 *
 * @returns Array of all MouseProduct items
 *
 * @example
 * ```ts
 * const mice = getMouseProducts();
 * mice.forEach(mouse => {
 *   // TypeScript knows this is a MouseProduct
 *   console.log(mouse.core_attributes.mouse_weight_g);
 * });
 * ```
 */
export function getMouseProducts(): MouseProduct[] {
  return mouseProducts;
}

/**
 * Retrieves all audio products with proper typing.
 * Convenience wrapper that ensures type safety.
 *
 * @returns Array of all AudioProduct items
 *
 * @example
 * ```ts
 * const audio = getAudioProducts();
 * audio.forEach(item => {
 *   // TypeScript knows this is an AudioProduct
 *   console.log(item.core_attributes.audio_sound_signature);
 * });
 * ```
 */
export function getAudioProducts(): AudioProduct[] {
  return audioProducts;
}

/**
 * Retrieves all keyboard products with proper typing.
 * Convenience wrapper that ensures type safety.
 *
 * @returns Array of all KeyboardProduct items
 *
 * @example
 * ```ts
 * const keyboards = getKeyboardProducts();
 * keyboards.forEach(kb => {
 *   // TypeScript knows this is a KeyboardProduct
 *   console.log(kb.core_attributes.keyboard_form_factor);
 * });
 * ```
 */
export function getKeyboardProducts(): KeyboardProduct[] {
  return keyboardProducts;
}

/**
 * Retrieves all monitor products with proper typing.
 * Convenience wrapper that ensures type safety.
 *
 * @returns Array of all MonitorProduct items
 *
 * @example
 * ```ts
 * const monitors = getMonitorProducts();
 * monitors.forEach(monitor => {
 *   // TypeScript knows this is a MonitorProduct
 *   console.log(monitor.core_attributes.monitor_panel_type);
 * });
 * ```
 */
export function getMonitorProducts(): MonitorProduct[] {
  return monitorProducts;
}

/**
 * Retrieves products by brand name (case-insensitive).
 *
 * @param brand - The brand name to search for
 * @returns Array of products from the specified brand
 *
 * @example
 * ```ts
 * const razerProducts = getProductsByBrand("Razer");
 * const steelseriesProducts = getProductsByBrand("SteelSeries");
 * ```
 */
export function getProductsByBrand(brand: string): AnyProduct[] {
  const normalizedBrand = brand.toLowerCase();
  return allProducts.filter(
    (product) => product.brand.toLowerCase() === normalizedBrand
  );
}

/**
 * Retrieves products that match any of the specified recommendation tags.
 *
 * @param tags - Array of tags to match against
 * @returns Array of products that have at least one matching tag
 *
 * @example
 * ```ts
 * const competitiveGear = getProductsByTags(["top_tier_competitive_fps", "esports_grade"]);
 * ```
 */
export function getProductsByTags(tags: string[]): AnyProduct[] {
  return allProducts.filter((product) =>
    product.recommendation_tags.some((tag) => tags.includes(tag))
  );
}

/**
 * Retrieves products within a specific price range.
 *
 * @param minPrice - Minimum price in USD
 * @param maxPrice - Maximum price in USD
 * @returns Array of products within the price range
 *
 * @example
 * ```ts
 * const midRangeProducts = getProductsByPriceRange(50, 150);
 * ```
 */
export function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number
): AnyProduct[] {
  return allProducts.filter((product) => {
    const [productMin, productMax] = product.price_range_usd;
    // Product overlaps with the requested range
    return productMin <= maxPrice && productMax >= minPrice;
  });
}

/**
 * Retrieves wireless products only.
 *
 * @returns Array of products with wireless capability as primary mode
 *
 * @example
 * ```ts
 * const wirelessProducts = getWirelessProducts();
 * ```
 */
export function getWirelessProducts(): AnyProduct[] {
  return allProducts.filter((product) => product.core_attributes.wireless);
}

/**
 * Retrieves products marked as value picks.
 *
 * @returns Array of products considered excellent value
 *
 * @example
 * ```ts
 * const valuePicks = getValuePicks();
 * ```
 */
export function getValuePicks(): AnyProduct[] {
  return allProducts.filter((product) => {
    if (product.category === "mouse") {
      return (product as MouseProduct).core_attributes.mouse_value_pick;
    }
    if (product.category === "audio") {
      return (product as AudioProduct).core_attributes.audio_value_pick;
    }
    if (product.category === "keyboard") {
      return (product as KeyboardProduct).core_attributes.keyboard_value_pick;
    }
    if (product.category === "monitor") {
      return (product as MonitorProduct).core_attributes.monitor_value_pick;
    }
    return false;
  });
}

/**
 * Gets the total count of products in the system.
 *
 * @returns Object with counts by category and total
 *
 * @example
 * ```ts
 * const counts = getProductCounts();
 * console.log(`Total: ${counts.total}, Mice: ${counts.mouse}, Audio: ${counts.audio}`);
 * ```
 */
export function getProductCounts(): {
  total: number;
  mouse: number;
  audio: number;
  keyboard: number;
  monitor: number;
} {
  return {
    total: allProducts.length,
    mouse: mouseProducts.length,
    audio: audioProducts.length,
    keyboard: keyboardProducts.length,
    monitor: monitorProducts.length,
  };
}
