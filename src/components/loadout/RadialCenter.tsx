import React from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LoadoutCategory, LoadoutItem } from "@/types/loadout";

// ─── Icon map ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<LoadoutCategory, LucideIcon> = {
  mouse: Mouse,
  audio: Headphones,
  keyboard: Keyboard,
  monitor: Monitor,
};

const CATEGORY_COLORS: Record<LoadoutCategory, string> = {
  mouse: "#10B981",
  audio: "#F43F5E",
  keyboard: "#06B6D4",
  monitor: "#8B5CF6",
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface RadialCenterProps {
  cx: number;
  cy: number;
  radius: number;
  loadoutName: string | null;
  isModified: boolean;
  itemsByCategory: Record<LoadoutCategory, LoadoutItem[]>;
  totalPriceRange: [number, number];
  onDeselect: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

const RadialCenter = React.memo(function RadialCenter({
  cx,
  cy,
  radius,
  loadoutName,
  isModified,
  itemsByCategory,
  totalPriceRange,
  onDeselect,
}: RadialCenterProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDeselect();
    }
  };

  const categories = (
    Object.keys(itemsByCategory) as LoadoutCategory[]
  ).filter((c) => itemsByCategory[c].length > 0);

  const totalItems = Object.values(itemsByCategory).reduce(
    (sum, items) => sum + items.length,
    0,
  );

  return (
    <foreignObject
      x={cx - radius}
      y={cy - radius}
      width={radius * 2}
      height={radius * 2}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onDeselect}
        onKeyDown={handleKeyDown}
        aria-label="Loadout summary — click to deselect category"
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-slate-700/50 bg-slate-950/90 backdrop-blur-sm transition-all duration-200 hover:border-slate-600/60"
      >
        <div className="flex flex-col items-center gap-1.5 px-2 text-center">
          {/* Loadout name or default title */}
          {loadoutName ? (
            <div className="flex flex-col items-center gap-1">
              <Badge
                variant="secondary"
                className={
                  isModified
                    ? "bg-amber-900/40 px-1.5 py-0 text-[9px] font-medium text-amber-400 border border-amber-700/40"
                    : "bg-slate-800 px-1.5 py-0 text-[9px] font-medium text-slate-300 border border-slate-700"
                }
              >
                {isModified ? "Modified" : "Curated"}
              </Badge>
              <span className="text-xs font-bold text-slate-100 leading-tight">
                {loadoutName}
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {totalItems === 0 ? "Your Loadout" : `${totalItems} items`}
            </span>
          )}

          {/* Category mini-icons with counts */}
          {categories.length > 0 && (
            <div className="flex items-center gap-1.5">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat];
                const count = itemsByCategory[cat].length;
                return (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="flex items-center gap-0.5 border-slate-700 px-1 py-0 text-[9px]"
                    style={{ color: CATEGORY_COLORS[cat] }}
                  >
                    <Icon size={10} />
                    {count}
                  </Badge>
                );
              })}
            </div>
          )}

          {/* Total price */}
          {totalItems > 0 && (
            <span className="text-xs font-bold font-mono text-emerald-400">
              ${totalPriceRange[0]}–${totalPriceRange[1]}
            </span>
          )}
        </div>
      </div>
    </foreignObject>
  );
});

RadialCenter.displayName = "RadialCenter";
export default RadialCenter;
