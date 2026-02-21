import React, { useState, useMemo, useCallback } from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  Check,
  type LucideIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductListItem from "./ProductListItem";
import { cn } from "@/lib/utils";
import type { LoadoutCategory } from "@/types/loadout";
import type { LoadoutCategoryMeta } from "@/types/loadout";
import type { Product } from "@/types/products";
import { LOADOUT_CATEGORIES } from "@/data/loadout-categories";
import { useProductsByLoadoutCategory } from "@/hooks/useLoadoutState";

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
};

// ─── Sort options ────────────────────────────────────────────────────────────

type SortKey = string; // "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rtings-<key>"

const BASE_SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
];

/** RTINGS usage-score keys and display labels per product category */
const RTINGS_SORT_KEYS: Record<string, { key: string; label: string }[]> = {
  mouse: [
    { key: "video_games_fps", label: "RTINGS: FPS" },
    { key: "video_games_mmo", label: "RTINGS: MMO" },
    { key: "work", label: "RTINGS: Work" },
    { key: "raw_performance", label: "RTINGS: Raw Performance" },
  ],
  audio: [
    { key: "wireless_gaming", label: "RTINGS: Wireless Gaming" },
    { key: "wired_gaming", label: "RTINGS: Wired Gaming" },
    { key: "office", label: "RTINGS: Office" },
    { key: "sports_fitness", label: "RTINGS: Sports & Fitness" },
    { key: "travel", label: "RTINGS: Travel" },
  ],
  keyboard: [
    { key: "gaming", label: "RTINGS: Gaming" },
    { key: "office", label: "RTINGS: Office" },
    { key: "programming", label: "RTINGS: Programming" },
    { key: "raw_performance", label: "RTINGS: Raw Performance" },
  ],
  monitor: [
    { key: "pc_gaming", label: "RTINGS: PC Gaming" },
    { key: "console_gaming", label: "RTINGS: Console Gaming" },
    { key: "office", label: "RTINGS: Office" },
    { key: "editing", label: "RTINGS: Editing" },
  ],
};

function getSortOptions(category: string): { value: SortKey; label: string }[] {
  const rtingsKeys = RTINGS_SORT_KEYS[category] ?? [];
  const rtingsOptions = rtingsKeys.map((r) => ({
    value: `rtings-${r.key}`,
    label: r.label,
  }));
  return [...BASE_SORT_OPTIONS, ...rtingsOptions];
}

function avgPrice(p: Product): number {
  return (p.price_range_usd[0] + p.price_range_usd[1]) / 2;
}

function sortProducts(products: Product[], key: SortKey): Product[] {
  const sorted = [...products];
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => avgPrice(a) - avgPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => avgPrice(b) - avgPrice(a));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default: {
      // RTINGS sort: "rtings-<scoreKey>" → sort descending by that score
      if (key.startsWith("rtings-")) {
        const scoreKey = key.slice(7); // strip "rtings-"
        return sorted.sort((a, b) => {
          const sa = a.rtings_scores?.[scoreKey] ?? -1;
          const sb = b.rtings_scores?.[scoreKey] ?? -1;
          return sb - sa; // highest score first, products without scores go to bottom
        });
      }
      return sorted;
    }
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ProductListPanelProps {
  category: LoadoutCategory;
  selectedProductIds: Set<string>;
  onToggleItem: (productId: string, category: LoadoutCategory) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductListPanel({
  category,
  selectedProductIds,
  onToggleItem,
}: ProductListPanelProps) {
  const [sortKey, setSortKey] = useState<SortKey>("price-asc");
  const meta: LoadoutCategoryMeta | undefined = LOADOUT_CATEGORIES.find(
    (c) => c.id === category,
  );
  const { data: products, isLoading } = useProductsByLoadoutCategory(category);
  const Icon = meta ? (ICON_MAP[meta.icon] ?? Mouse) : Mouse;
  const accentColor = meta?.color ?? "#10B981";

  const sortOptions = useMemo(() => getSortOptions(category), [category]);

  const sorted = useMemo(() => {
    if (!products) return [];
    return sortProducts(products, sortKey);
  }, [products, sortKey]);

  const allSelected =
    !isLoading &&
    sorted.length > 0 &&
    sorted.every((p) => selectedProductIds.has(p.id));

  const handleToggle = useCallback(
    (productId: string) => onToggleItem(productId, category),
    [onToggleItem, category],
  );

  return (
    <div
      className={cn(
        "flex h-full w-80 flex-col overflow-hidden rounded-xl",
        "border border-slate-700/50 bg-slate-900/80 backdrop-blur-md",
        "animate-in slide-in-from-right-4 duration-200 ease-out",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-700/50 px-4 py-3">
        <div
          className="h-full w-1 self-stretch rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <Icon size={18} style={{ color: accentColor }} />
        <span
          className="font-mono text-sm font-bold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          {meta?.label ?? category}
        </span>
      </div>

      {/* Sort bar */}
      {sorted.length > 0 && (
        <div className="border-b border-slate-700/30 px-3 py-2">
          <Select
            value={sortKey}
            onValueChange={(v) => setSortKey(v as SortKey)}
          >
            <SelectTrigger className="h-7 w-full border-slate-700 bg-slate-800/60 text-xs text-slate-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Product list */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {/* Loading */}
          {isLoading && (
            <div className="py-8 text-center text-sm text-slate-500">
              Loading…
            </div>
          )}

          {/* Coming Soon — no products in data */}
          {!isLoading && sorted.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-12">
              <Icon
                size={40}
                style={{ color: accentColor, opacity: 0.3 }}
              />
              <div className="text-center">
                <p className="font-mono text-sm font-bold uppercase tracking-wider text-slate-400">
                  Coming Soon
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Products for this category are on the way.
                </p>
              </div>
            </div>
          )}

          {/* All items already selected */}
          {!isLoading && allSelected && (
            <div className="flex flex-col items-center gap-2 py-6">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Check
                  size={20}
                  style={{ color: accentColor }}
                  className="animate-in zoom-in-50 duration-300"
                />
              </div>
              <p className="text-xs font-medium text-slate-400">
                All items added
              </p>
            </div>
          )}

          {/* Product rows — staggered entrance */}
          {sorted.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="loadout-stagger-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <ProductListItem
                product={product}
                isSelected={selectedProductIds.has(product.id)}
                accentColor={accentColor}
                onToggle={handleToggle}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
