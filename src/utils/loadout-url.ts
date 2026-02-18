/**
 * Loadout URL encoding / decoding utilities.
 *
 * URL format: /loadout?items=product_id_1,product_id_2,product_id_3
 */

import type { LoadoutItem } from "@/types/loadout";

/**
 * Encode a list of loadout items into a URL path + query string.
 * Returns an empty string if the loadout has no items.
 */
export function encodeLoadoutUrl(items: LoadoutItem[]): string {
  if (items.length === 0) return "/loadout";
  const uniqueIds = [...new Set(items.map((i) => i.productId))];
  return `/loadout?items=${uniqueIds.join(",")}`;
}

/**
 * Decode the `items` search param into an array of product IDs.
 * Filters out empty strings and duplicates.
 */
export function decodeLoadoutUrl(searchParams: URLSearchParams): string[] {
  const raw = searchParams.get("items");
  if (!raw) return [];
  const ids = raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return [...new Set(ids)];
}
