import React, { useState, useMemo, useCallback } from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductListItem from "./ProductListItem";
import CuratedLoadoutBrowser from "./CuratedLoadoutBrowser";
import type { LoadoutState } from "@/hooks/useLoadoutState";
import { useProductsByLoadoutCategory } from "@/hooks/useLoadoutState";
import type { LoadoutCategory } from "@/types/loadout";
import type { Product } from "@/types/products";
import { LOADOUT_CATEGORIES } from "@/data/loadout-categories";

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
};

// ─── Sort helpers (mirrored from ProductListPanel) ───────────────────────────

type SortKey = "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
];

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
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface MobileBuyMenuProps {
  state: LoadoutState;
  initialCategory?: LoadoutCategory | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MobileBuyMenu({ state, initialCategory }: MobileBuyMenuProps) {
  const [activeTab, setActiveTab] = useState<LoadoutCategory>(initialCategory ?? "mouse");
  const [sortKey, setSortKey] = useState<SortKey>("price-asc");

  const { data: products, isLoading } =
    useProductsByLoadoutCategory(activeTab);

  const meta = LOADOUT_CATEGORIES.find((c) => c.id === activeTab);
  const accentColor = meta?.color ?? "#10B981";
  const Icon = meta ? (ICON_MAP[meta.icon] ?? Mouse) : Mouse;

  const sorted = useMemo(() => {
    if (!products) return [];
    return sortProducts(products, sortKey);
  }, [products, sortKey]);

  const selectedProductIds = useMemo(
    () => new Set(state.loadoutItems.keys()),
    [state.loadoutItems],
  );

  const allSelected =
    !isLoading &&
    sorted.length > 0 &&
    sorted.every((p) => selectedProductIds.has(p.id));

  const handleToggle = useCallback(
    (productId: string) => state.toggleItem(productId, activeTab),
    [state.toggleItem, activeTab],
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Curated loadouts browser */}
      <CuratedLoadoutBrowser
        currentItemCount={state.itemCount}
        onLoadLoadout={state.loadCuratedLoadout}
      />

      {/* Category tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as LoadoutCategory)}
      >
        <TabsList className="grid h-auto w-full grid-cols-4 gap-1 rounded-xl border border-slate-700/50 bg-slate-900/80 p-1 backdrop-blur-sm">
          {LOADOUT_CATEGORIES.map((cat) => {
            const CatIcon = ICON_MAP[cat.icon] ?? Mouse;
            const count = state.itemsByCategory[cat.id].length;
            const isActive = activeTab === cat.id;

            return (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="relative flex min-h-[56px] flex-col items-center gap-1 rounded-lg border border-transparent py-2.5 text-slate-400 transition-all duration-200 data-[state=active]:bg-slate-800/80 data-[state=active]:text-slate-100 data-[state=active]:shadow-none"
                style={
                  isActive
                    ? {
                        borderColor: `${cat.color}40`,
                        boxShadow: `0 0 16px ${cat.color}20, inset 0 1px 0 ${cat.color}15`,
                      }
                    : undefined
                }
              >
                <CatIcon
                  size={20}
                  style={{ color: isActive ? cat.color : undefined }}
                  className={isActive ? undefined : "text-slate-500"}
                />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider">
                  {cat.label}
                </span>

                {/* Item count badge */}
                {count > 0 && (
                  <Badge
                    className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full border-0 px-1 py-0 text-[9px] font-bold text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    {count}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Sort bar */}
      {sorted.length > 0 && (
        <Select
          value={sortKey}
          onValueChange={(v) => setSortKey(v as SortKey)}
        >
          <SelectTrigger className="h-9 w-full border-slate-700 bg-slate-800/60 text-xs text-slate-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Product list */}
      <div className="flex flex-col gap-2">
        {/* Loading */}
        {isLoading && (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading…
          </div>
        )}

        {/* Coming Soon — no products */}
        {!isLoading && sorted.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <Icon
              size={48}
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
          <div className="flex flex-col items-center gap-2 py-8">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Check
                size={24}
                style={{ color: accentColor }}
              />
            </div>
            <p className="text-sm font-medium text-slate-400">
              All items added
            </p>
          </div>
        )}

        {/* Product rows */}
        {sorted.map((product: Product) => (
          <ProductListItem
            key={product.id}
            product={product}
            isSelected={selectedProductIds.has(product.id)}
            accentColor={accentColor}
            onToggle={handleToggle}
          />
        ))}

        {/* Bottom spacer for sticky bar */}
        {state.itemCount > 0 && <div className="h-20" />}
      </div>
    </div>
  );
}
