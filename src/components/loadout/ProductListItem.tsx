import React, { useRef, useEffect, useState } from "react";
import {
  Check,
  Plus,
  ExternalLink,
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/products";
import type { LoadoutCategory } from "@/types/loadout";
import ProductSpecBadges, { formatTag } from "./ProductSpecBadges";

// ─── Icon map for placeholders ───────────────────────────────────────────────

const CATEGORY_ICON: Record<LoadoutCategory, LucideIcon> = {
  mouse: Mouse,
  audio: Headphones,
  keyboard: Keyboard,
  monitor: Monitor,
};

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
  const category = product.category as LoadoutCategory;
  const PlaceholderIcon = CATEGORY_ICON[category] ?? Mouse;

  const linkUrl = product.product_url;

  // Track selection transitions for flash animation
  const [justAdded, setJustAdded] = useState(false);
  const prevSelectedRef = useRef(isSelected);

  useEffect(() => {
    if (isSelected && !prevSelectedRef.current) {
      setJustAdded(true);
      const id = setTimeout(() => setJustAdded(false), 300);
      return () => clearTimeout(id);
    }
    prevSelectedRef.current = isSelected;
  }, [isSelected]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(product.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(product.id);
        }
      }}
      className={cn(
        "group flex cursor-pointer items-start gap-2.5 rounded-lg border px-2.5 py-2 transition-all duration-150",
        isSelected
          ? "border-l-2 bg-slate-800/60"
          : "border-transparent bg-slate-900/40 hover:bg-slate-800/40",
        justAdded && "loadout-item-flash",
      )}
      style={isSelected ? { borderLeftColor: accentColor } : undefined}
      aria-label={
        isSelected
          ? `Remove ${product.name} from loadout`
          : `Add ${product.name} to loadout`
      }
    >
      {/* Selection indicator */}
      <div
        className={cn(
          "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-150",
          isSelected
            ? "border-transparent text-white"
            : "border-slate-600 text-slate-500",
        )}
        style={isSelected ? { backgroundColor: accentColor } : undefined}
      >
        {isSelected ? (
          <Check size={12} className="loadout-check-in" />
        ) : (
          <Plus size={12} />
        )}
      </div>

      {/* Thumbnail / placeholder */}
      <ProductThumbnail
        product={product}
        accentColor={accentColor}
        PlaceholderIcon={PlaceholderIcon}
      />

      {/* Product info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <p className="truncate text-sm font-semibold text-slate-100">
            {product.name}
          </p>
          {linkUrl && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${product.name} product page`}
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        <p className="text-xs text-slate-400">{product.brand}</p>
        <p className="mt-0.5 text-xs font-mono font-bold text-emerald-400">
          {priceLabel}
        </p>

        {/* Spec badges */}
        <div className="mt-1">
          <ProductSpecBadges product={product} accentColor={accentColor} />
        </div>

        {/* Recommendation tags */}
        {product.recommendation_tags && product.recommendation_tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1 overflow-hidden">
            {product.recommendation_tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-transparent px-1.5 py-0 text-[9px] font-medium"
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}15`,
                }}
              >
                {formatTag(tag)}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ProductListItem.displayName = "ProductListItem";
export default ProductListItem;

// ─── Thumbnail sub-component ─────────────────────────────────────────────────

function ProductThumbnail({
  product,
  accentColor,
  PlaceholderIcon,
}: {
  product: Product;
  accentColor: string;
  PlaceholderIcon: LucideIcon;
}) {
  if (product.image_url) {
    return (
      <img
        src={product.image_url}
        alt={product.name}
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 rounded-md object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-md"
      style={{ backgroundColor: `${accentColor}18` }}
    >
      <PlaceholderIcon size={22} style={{ color: accentColor, opacity: 0.6 }} />
    </div>
  );
}
