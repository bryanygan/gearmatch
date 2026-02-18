import React, { useMemo, useState, useEffect } from "react";
import RadialWedge from "./RadialWedge";
import RadialCenter from "./RadialCenter";
import { LOADOUT_CATEGORIES } from "@/data/loadout-categories";
import type { LoadoutCategory, LoadoutItem } from "@/types/loadout";

// ─── Layout constants ────────────────────────────────────────────────────────

const VIEW_SIZE = 600;
const CX = VIEW_SIZE / 2;
const CY = VIEW_SIZE / 2;
const OUTER_RADIUS = 265;
const INNER_RADIUS = 120;
const GAP_DEG = 4; // degrees of gap between wedges

/** Wedge arrangement: Mice top-right, Audio bottom-right, Keyboards bottom-left, Monitors top-left */
const WEDGE_LAYOUT: LoadoutCategory[] = [
  "mouse",
  "keyboard",
  "audio",
  "monitor",
];

// ─── Props ───────────────────────────────────────────────────────────────────

export interface RadialWheelProps {
  selectedCategory: LoadoutCategory | null;
  itemsByCategory: Record<LoadoutCategory, LoadoutItem[]>;
  totalPriceRange: [number, number];
  loadoutName: string | null;
  isModified: boolean;
  onSelectCategory: (category: LoadoutCategory) => void;
  onDeselectCategory: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RadialWheel({
  selectedCategory,
  itemsByCategory,
  totalPriceRange,
  loadoutName,
  isModified,
  onSelectCategory,
  onDeselectCategory,
}: RadialWheelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animations on next frame
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const wedges = useMemo(() => {
    return WEDGE_LAYOUT.map((catId, i) => {
      const meta = LOADOUT_CATEGORIES.find((c) => c.id === catId)!;
      const startAngle = i * 90 + GAP_DEG / 2;
      const endAngle = (i + 1) * 90 - GAP_DEG / 2;
      return { meta, startAngle, endAngle };
    });
  }, []);

  return (
    <div
      className={`relative w-[min(600px,100%)] aspect-square loadout-scanlines ${
        mounted ? "loadout-scale-in" : "opacity-0"
      }`}
    >
      <svg
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        className="relative z-0 w-full h-full"
        aria-label="Radial buy menu"
      >
        {/* Wedges — staggered entrance */}
        {wedges.map(({ meta, startAngle, endAngle }, i) => (
          <RadialWedge
            key={meta.id}
            category={meta}
            cx={CX}
            cy={CY}
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            startAngle={startAngle}
            endAngle={endAngle}
            isActive={selectedCategory === meta.id}
            isDimmed={
              selectedCategory !== null && selectedCategory !== meta.id
            }
            itemCount={itemsByCategory[meta.id].length}
            onSelect={onSelectCategory}
            entranceDelay={mounted ? i * 60 : undefined}
          />
        ))}

        {/* Center summary — enters after wedges */}
        <RadialCenter
          cx={CX}
          cy={CY}
          radius={INNER_RADIUS - 8}
          loadoutName={loadoutName}
          isModified={isModified}
          itemsByCategory={itemsByCategory}
          totalPriceRange={totalPriceRange}
          onDeselect={onDeselectCategory}
          entranceDelay={mounted ? WEDGE_LAYOUT.length * 60 + 200 : undefined}
        />
      </svg>
    </div>
  );
}
