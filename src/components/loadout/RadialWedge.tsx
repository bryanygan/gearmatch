import React, { useMemo, useCallback } from "react";
import {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { describeWedge, getWedgeCenter } from "@/utils/radial-math";
import { cn } from "@/lib/utils";
import type { LoadoutCategory } from "@/types/loadout";
import type { LoadoutCategoryMeta } from "@/types/loadout";

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Mouse,
  Headphones,
  Keyboard,
  Monitor,
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface RadialWedgeProps {
  category: LoadoutCategoryMeta;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  isActive: boolean;
  isDimmed: boolean;
  itemCount: number;
  onSelect: (category: LoadoutCategory) => void;
  entranceDelay?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

const RadialWedge = React.memo(function RadialWedge({
  category,
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  isActive,
  isDimmed,
  itemCount,
  onSelect,
  entranceDelay,
}: RadialWedgeProps) {
  const d = useMemo(
    () => describeWedge(cx, cy, innerRadius, outerRadius, startAngle, endAngle),
    [cx, cy, innerRadius, outerRadius, startAngle, endAngle],
  );

  const center = useMemo(
    () =>
      getWedgeCenter(cx, cy, innerRadius, outerRadius, startAngle, endAngle),
    [cx, cy, innerRadius, outerRadius, startAngle, endAngle],
  );

  const Icon = ICON_MAP[category.icon] ?? Mouse;

  const handleClick = useCallback(() => {
    onSelect(category.id);
  }, [onSelect, category.id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // Entrance animation style
  const entranceStyle: React.CSSProperties | undefined =
    entranceDelay !== undefined
      ? { animationDelay: `${entranceDelay}ms` }
      : undefined;

  // Glow filter for active state (pulsing) and hover
  const pathFilter = isActive
    ? `drop-shadow(0 0 12px ${category.color}66)`
    : undefined;

  return (
    <g
      className={cn(
        "cursor-pointer outline-none",
        entranceDelay !== undefined && "loadout-wedge-in",
        isDimmed && "opacity-40",
      )}
      style={{
        ...entranceStyle,
        transition: "opacity 200ms ease, filter 200ms ease",
        filter: isDimmed ? "saturate(0.5)" : undefined,
        transformBox: "fill-box" as string,
        transformOrigin: "center",
      }}
      role="button"
      tabIndex={0}
      aria-label={`${category.label} — ${itemCount} items selected`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Wedge shape */}
      <path
        d={d}
        fill={isActive ? `${category.color}22` : "rgba(15, 23, 42, 0.8)"}
        stroke={isActive ? category.color : "rgba(148, 163, 184, 0.25)"}
        strokeWidth={isActive ? 2 : 1}
        className={cn(
          "transition-all duration-150",
          isActive && "loadout-glow-pulse",
          !isDimmed && !isActive && "hover:fill-[rgba(30,41,59,0.9)]",
        )}
        style={{
          filter: pathFilter,
        }}
      />

      {/* Hover glow overlay */}
      {!isActive && !isDimmed && (
        <path
          d={d}
          fill="transparent"
          className="transition-all duration-150 [g:hover>&]:fill-[rgba(255,255,255,0.04)]"
          style={{
            pointerEvents: "none",
            filter: "none",
          }}
        />
      )}

      {/* Icon */}
      <foreignObject
        x={center.x - 16}
        y={center.y - 22}
        width={32}
        height={32}
        className="pointer-events-none"
      >
        <Icon
          size={28}
          color={isActive ? category.color : "rgba(226, 232, 240, 0.8)"}
          className="transition-colors duration-200"
        />
      </foreignObject>

      {/* Label */}
      <text
        x={center.x}
        y={center.y + 18}
        textAnchor="middle"
        className="pointer-events-none select-none font-mono text-[10px] font-bold uppercase tracking-widest"
        fill={isActive ? category.color : "rgba(203, 213, 225, 0.7)"}
      >
        {category.label}
      </text>

      {/* Item count badge */}
      {itemCount > 0 && (
        <>
          <circle
            cx={center.x + 20}
            cy={center.y - 24}
            r={9}
            fill={category.color}
          />
          <text
            x={center.x + 20}
            y={center.y - 20}
            textAnchor="middle"
            className="pointer-events-none select-none text-[10px] font-bold"
            fill="white"
          >
            {itemCount}
          </text>
        </>
      )}
    </g>
  );
});

RadialWedge.displayName = "RadialWedge";
export default RadialWedge;
