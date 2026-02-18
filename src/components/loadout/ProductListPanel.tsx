import React from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const meta: LoadoutCategoryMeta | undefined = LOADOUT_CATEGORIES.find(
    (c) => c.id === category,
  );
  const { data: products, isLoading } = useProductsByLoadoutCategory(category);
  const Icon = meta ? (ICON_MAP[meta.icon] ?? Mouse) : Mouse;
  const accentColor = meta?.color ?? "#10B981";

  const sorted = React.useMemo(() => {
    if (!products) return [];
    return [...products].sort(
      (a, b) => a.price_range_usd[0] - b.price_range_usd[0],
    );
  }, [products]);

  const handleToggle = React.useCallback(
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

      {/* Product list */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {isLoading && (
            <div className="py-8 text-center text-sm text-slate-500">
              Loading…
            </div>
          )}

          {!isLoading && sorted.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">
              No products available
            </div>
          )}

          {sorted.map((product: Product) => (
            <ProductListItem
              key={product.id}
              product={product}
              isSelected={selectedProductIds.has(product.id)}
              accentColor={accentColor}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
