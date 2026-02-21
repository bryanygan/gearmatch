import React, { useState } from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  X,
  Trash2,
  Share2,
  ExternalLink,
  ShoppingCart,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LOADOUT_CATEGORIES } from "@/data/loadout-categories";
import type { LoadoutCategory, LoadoutItem } from "@/types/loadout";
import type { Product } from "@/types/products";
import { encodeLoadoutUrl } from "@/utils/loadout-url";

// ─── Icon map ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<LoadoutCategory, LucideIcon> = {
  mouse: Mouse,
  audio: Headphones,
  keyboard: Keyboard,
  monitor: Monitor,
};

// ─── Retailer display names ──────────────────────────────────────────────────

const RETAILER_NAMES: Record<string, string> = {
  bestbuy: "Best Buy",
  bhphoto: "B&H Photo",
  microcenter: "Micro Center",
  newegg: "Newegg",
  walmart: "Walmart",
  target: "Target",
  linsoul: "Linsoul",
  hifigo: "HiFiGo",
  manufacturer: "Manufacturer",
};

function formatRetailerName(key: string): string {
  return (
    RETAILER_NAMES[key] ??
    key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (s) => s.toUpperCase())
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface LoadoutSummaryProps {
  itemsByCategory: Record<LoadoutCategory, LoadoutItem[]>;
  productMap: Map<string, Product>;
  totalPriceRange: [number, number];
  itemCount: number;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  loadoutItems: Map<string, LoadoutItem>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoadoutSummary({
  itemsByCategory,
  productMap,
  totalPriceRange,
  itemCount,
  onRemoveItem,
  onClearAll,
  loadoutItems,
}: LoadoutSummaryProps) {
  const categories = LOADOUT_CATEGORIES;

  const handleShare = async () => {
    const items = Array.from(loadoutItems.values());
    const url = `${window.location.origin}${encodeLoadoutUrl(items)}`;
    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, "", encodeLoadoutUrl(items));
      toast.success("Loadout link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
      {/* Category groups */}
      <div className="divide-y divide-slate-700/30">
        {categories.map((meta) => {
          const items = itemsByCategory[meta.id];
          const Icon = CATEGORY_ICONS[meta.id];
          const hasItems = items.length > 0;

          return (
            <div key={meta.id} className="px-4 py-3">
              {/* Category header */}
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="h-4 w-1 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <Icon
                  size={14}
                  style={{ color: hasItems ? meta.color : undefined }}
                  className={hasItems ? undefined : "text-slate-600"}
                />
                <span
                  className="font-mono text-xs font-bold uppercase tracking-wider"
                  style={{ color: hasItems ? meta.color : undefined }}
                >
                  {hasItems ? meta.label : (
                    <span className="text-slate-600">{meta.label}</span>
                  )}
                </span>
              </div>

              {/* Items or empty */}
              {hasItems ? (
                <div className="flex flex-col gap-1 pl-5">
                  {items.map((item) => {
                    const product = productMap.get(item.productId);
                    if (!product) return null;
                    const [min, max] = product.price_range_usd;
                    const price = min === max ? `$${min}` : `$${min}–$${max}`;
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-800/40"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-sm text-slate-200">
                            {product.name}
                          </span>
                          <span className="ml-2 text-xs text-slate-500">
                            {product.brand}
                          </span>
                          <span className="ml-2 text-xs font-mono font-bold text-emerald-400">
                            {price}
                          </span>
                        </div>
                        <RetailerLinks product={product} />
                        <button
                          onClick={() => onRemoveItem(item.productId)}
                          className="shrink-0 rounded p-0.5 text-slate-500 hover:bg-slate-700 hover:text-slate-300 transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="pl-5 text-xs text-slate-600">
                  No {meta.id === "audio" ? "audio gear" : meta.id} selected
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer — totals and actions */}
      <div className="border-t border-slate-700/50 px-4 py-3">
        {/* Totals */}
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-xs text-slate-400">
            {itemCount} {itemCount === 1 ? "item" : "items"} in loadout
          </span>
          {itemCount > 0 && (
            <span className="text-sm font-mono font-bold text-emerald-400">
              ${totalPriceRange[0].toLocaleString()}–${totalPriceRange[1].toLocaleString()}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Clear loadout */}
          <ClearLoadoutButton
            disabled={itemCount === 0}
            onConfirm={onClearAll}
          />

          {/* Share */}
          <Button
            variant="outline"
            size="sm"
            disabled={itemCount === 0}
            onClick={handleShare}
            className="gap-1.5 border-slate-600 text-slate-300"
          >
            <Share2 size={14} />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Clear loadout with AlertDialog confirmation ─────────────────────────────

function ClearLoadoutButton({
  disabled,
  onConfirm,
}: {
  disabled: boolean;
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="gap-1.5 border-red-900/50 text-red-400 hover:bg-red-950/30 hover:text-red-300"
        >
          <Trash2 size={14} />
          Clear
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Loadout</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all items from your loadout. Continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Retailer links popover ─────────────────────────────────────────────────

function RetailerLinks({ product }: { product: Product }) {
  const retailers = product.retailer_urls;
  const hasRetailers = retailers && Object.keys(retailers).length > 0;
  const hasPrimaryUrl = !!product.product_url;

  // No links at all — render nothing
  if (!hasPrimaryUrl && !hasRetailers) return null;

  // Only primary URL, no retailer_urls — single icon link (no popover)
  if (hasPrimaryUrl && !hasRetailers) {
    return (
      <a
        href={product.product_url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-700 hover:text-slate-300 transition-colors"
        aria-label={`View ${product.name}`}
      >
        <ExternalLink size={13} />
      </a>
    );
  }

  // Has retailer links — show popover with all options
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="shrink-0 inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-slate-500 hover:bg-slate-700 hover:text-slate-300 transition-colors"
          aria-label={`Buy ${product.name} — choose retailer`}
        >
          <ShoppingCart size={13} />
          <ChevronDown size={10} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="w-48 p-1.5 border-slate-700 bg-slate-900"
      >
        <p className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
          Buy from
        </p>
        {hasPrimaryUrl && (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <ExternalLink size={11} className="shrink-0 text-slate-500" />
            Search
          </a>
        )}
        {retailers &&
          Object.entries(retailers).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <ExternalLink size={11} className="shrink-0 text-slate-500" />
              {formatRetailerName(key)}
            </a>
          ))}
      </PopoverContent>
    </Popover>
  );
}
