import React from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/products";

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ProductListItemProps {
  product: Product;
  isSelected: boolean;
  accentColor: string;
  onToggle: (productId: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

const ProductListItem = React.memo(function ProductListItem({
  product,
  isSelected,
  accentColor,
  onToggle,
}: ProductListItemProps) {
  const [min, max] = product.price_range_usd;
  const priceLabel = min === max ? `$${min}` : `$${min}–$${max}`;

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-150",
        isSelected
          ? "border-l-2 bg-slate-800/60"
          : "border-transparent bg-slate-900/40 hover:bg-slate-800/40",
      )}
      style={
        isSelected
          ? { borderLeftColor: accentColor }
          : undefined
      }
    >
      {/* Product info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-100">
          {product.name}
        </p>
        <p className="text-xs text-slate-400">{product.brand}</p>
        <p className="mt-0.5 text-xs font-mono font-bold text-emerald-400">
          {priceLabel}
        </p>
      </div>

      {/* Toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-8 w-8 shrink-0 rounded-full transition-all duration-150",
          isSelected
            ? "border-transparent text-white"
            : "border-slate-600 text-slate-400 hover:border-slate-500",
        )}
        style={
          isSelected
            ? { backgroundColor: accentColor }
            : undefined
        }
        onClick={() => onToggle(product.id)}
        aria-label={
          isSelected
            ? `Remove ${product.name} from loadout`
            : `Add ${product.name} to loadout`
        }
      >
        {isSelected ? <Check size={14} /> : <Plus size={14} />}
      </Button>
    </div>
  );
});

ProductListItem.displayName = "ProductListItem";
export default ProductListItem;
