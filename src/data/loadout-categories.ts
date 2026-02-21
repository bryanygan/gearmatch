/**
 * Loadout Category Metadata
 *
 * Visual and descriptive metadata for each loadout category,
 * used by the radial buy menu and category selectors.
 */

import type { LoadoutCategoryMeta } from "@/types/loadout";

export const LOADOUT_CATEGORIES: readonly LoadoutCategoryMeta[] = [
  {
    id: "mouse",
    label: "MICE",
    icon: "Mouse",
    color: "#10B981",
    description: "Gaming mice, ergonomic mice, and trackballs",
  },
  {
    id: "audio",
    label: "AUDIO GEAR",
    icon: "Headphones",
    color: "#F43F5E",
    description: "Headsets, headphones, IEMs, and earbuds",
  },
  {
    id: "keyboard",
    label: "KEYBOARDS",
    icon: "Keyboard",
    color: "#06B6D4",
    description: "Mechanical, magnetic, and membrane keyboards",
  },
  {
    id: "monitor",
    label: "MONITORS",
    icon: "Monitor",
    color: "#8B5CF6",
    description: "Gaming monitors, ultrawide displays, and OLED panels",
  },
] as const;

/** Look up category metadata by ID */
export function getCategoryMeta(
  categoryId: string,
): LoadoutCategoryMeta | undefined {
  return LOADOUT_CATEGORIES.find((c) => c.id === categoryId);
}
