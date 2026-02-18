import React from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Loadout, LoadoutCategory } from "@/types/loadout";
import { formatTag } from "./ProductSpecBadges";

// ─── Category icon/color map ─────────────────────────────────────────────────

const CATEGORY_META: Record<
  LoadoutCategory,
  { icon: LucideIcon; color: string }
> = {
  mouse: { icon: Mouse, color: "#10B981" },
  audio: { icon: Headphones, color: "#F43F5E" },
  keyboard: { icon: Keyboard, color: "#06B6D4" },
  monitor: { icon: Monitor, color: "#8B5CF6" },
};

const ALL_CATEGORIES: LoadoutCategory[] = [
  "mouse",
  "audio",
  "keyboard",
  "monitor",
];

// ─── Props ───────────────────────────────────────────────────────────────────

export interface CuratedLoadoutCardProps {
  loadout: Loadout;
  onLoad: (loadoutId: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CuratedLoadoutCard({
  loadout,
  onLoad,
}: CuratedLoadoutCardProps) {
  const categoriesWithItems = new Set(loadout.items.map((i) => i.category));

  return (
    <Card className="w-52 md:w-64 shrink-0 border-slate-700/50 bg-slate-900/80 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600/60 hover:shadow-lg hover:shadow-slate-900/50">
      <CardContent className="flex flex-col gap-3 p-4">
        {/* Name */}
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-100">
          {loadout.name}
        </h3>

        {/* Description */}
        {loadout.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
            {loadout.description}
          </p>
        )}

        {/* Tags */}
        {loadout.tags && loadout.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {loadout.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-700 px-1.5 py-0 text-[10px] font-medium text-slate-400"
              >
                {formatTag(tag)}
              </Badge>
            ))}
          </div>
        )}

        {/* Category preview icons */}
        <div className="flex items-center gap-2">
          {ALL_CATEGORIES.map((cat) => {
            const { icon: Icon, color } = CATEGORY_META[cat];
            const active = categoriesWithItems.has(cat);
            return (
              <div
                key={cat}
                className="flex h-7 w-7 items-center justify-center rounded"
                style={{
                  backgroundColor: active ? `${color}18` : "transparent",
                }}
              >
                <Icon
                  size={14}
                  style={{
                    color: active ? color : undefined,
                    opacity: active ? 1 : 0.25,
                  }}
                  className={active ? undefined : "text-slate-600"}
                />
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500">
            {loadout.items.length} items
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            ${loadout.totalPriceRange[0]}–${loadout.totalPriceRange[1]}
          </span>
        </div>

        {/* Load button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-slate-600 font-mono text-xs uppercase tracking-wider text-slate-200 hover:bg-slate-800 hover:text-white"
          onClick={() => onLoad(loadout.id)}
        >
          Load Loadout
        </Button>
      </CardContent>
    </Card>
  );
}
