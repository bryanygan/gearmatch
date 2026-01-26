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
  AnyProduct,
  PriceTier,
} from "@/types/products";
import {
  sampleMouseProducts,
  sampleAudioProducts,
} from "./sample-products";

// Re-export type guards for convenience
export { isMouseProduct, isAudioProduct } from "@/types/products";

// =============================================================================
// Product Data Arrays
// =============================================================================

/**
 * Array of all mouse products in the system.
 * Currently populated with sample products for testing.
 * Production data will replace/supplement these.
 *
 * @see MouseProduct for the required data structure
 * @see src/data/sample-products.ts for sample product definitions
 */
export const mouseProducts: MouseProduct[] = [
  ...sampleMouseProducts,
];

/**
 * Array of all audio products in the system.
 * Currently populated with sample products for testing.
 * Production data will replace/supplement these.
 *
 * @see AudioProduct for the required data structure
 * @see src/data/sample-products.ts for sample product definitions
 */
export const audioProducts: AudioProduct[] = [
  ...sampleAudioProducts,
];

/**
 * Combined array of all products in the system.
 * Useful for cross-category operations and global search.
 */
export const allProducts: AnyProduct[] = [
  ...mouseProducts,
  ...audioProducts,
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
 * @param category - The category to filter by ("mouse" or "audio")
 * @returns Array of products in the specified category
 *
 * @example
 * ```ts
 * const mice = getProductsByCategory("mouse");
 * const audioGear = getProductsByCategory("audio");
 * ```
 */
export function getProductsByCategory(
  category: "mouse" | "audio"
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
} {
  return {
    total: allProducts.length,
    mouse: mouseProducts.length,
    audio: audioProducts.length,
  };
}
