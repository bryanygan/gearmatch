/**
 * Loadout Zod Schemas
 *
 * Runtime validation schemas that mirror the TypeScript types in @/types/loadout.
 */

import { z } from "zod";

export const LoadoutCategorySchema = z.enum([
  "mouse",
  "audio",
  "keyboard",
  "monitor",
]);

export const LoadoutItemSchema = z.object({
  productId: z.string(),
  category: LoadoutCategorySchema,
  addedAt: z.number(),
});

export const LoadoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  items: z.array(LoadoutItemSchema),
  totalPriceRange: z.tuple([z.number(), z.number()]),
  createdAt: z.number(),
  updatedAt: z.number(),
  tags: z.array(z.string()).optional(),
  curatedBy: z.enum(["gearmatch", "community"]).optional(),
});

export const LoadoutCategoryMetaSchema = z.object({
  id: LoadoutCategorySchema,
  label: z.string(),
  icon: z.string(),
  color: z.string(),
  description: z.string(),
});
