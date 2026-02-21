/**
 * Loadout Type Definitions
 *
 * Types for the "Loadout" feature — a CS:GO-style radial buy menu
 * that lets users build and share peripheral loadouts.
 */

/** Product category within a loadout */
export type LoadoutCategory = 'mouse' | 'audio' | 'keyboard' | 'monitor';

/** A single item in a loadout, referencing a product by ID */
export interface LoadoutItem {
  productId: string;
  category: LoadoutCategory;
  addedAt: number;
}

/** A complete loadout containing one or more items per category */
export interface Loadout {
  id: string;
  name: string;
  description?: string;
  items: LoadoutItem[];
  totalPriceRange: [number, number];
  createdAt: number;
  updatedAt: number;
  tags?: string[];
  curatedBy?: 'gearmatch' | 'community';
}

/** UI metadata for a loadout category (icon name, color, etc.) */
export interface LoadoutCategoryMeta {
  id: LoadoutCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}
