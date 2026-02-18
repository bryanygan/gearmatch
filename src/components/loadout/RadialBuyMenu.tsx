import React, { useMemo } from "react";
import RadialWheel from "./RadialWheel";
import ProductListPanel from "./ProductListPanel";
import { useLoadoutState } from "@/hooks/useLoadoutState";
import { CURATED_LOADOUTS } from "@/data/curated-loadouts";
import { cn } from "@/lib/utils";

export default function RadialBuyMenu() {
  const state = useLoadoutState();

  const loadoutName = useMemo(() => {
    if (!state.activeCuratedLoadout) return null;
    const curated = CURATED_LOADOUTS.find(
      (l) => l.id === state.activeCuratedLoadout,
    );
    return curated?.name ?? null;
  }, [state.activeCuratedLoadout]);

  const selectedProductIds = useMemo(() => {
    return new Set(state.loadoutItems.keys());
  }, [state.loadoutItems]);

  return (
    <div
      className={cn(
        "flex items-start justify-center gap-6 transition-all duration-300",
        state.selectedCategory ? "justify-start" : "justify-center",
      )}
    >
      {/* Radial wheel */}
      <RadialWheel
        selectedCategory={state.selectedCategory}
        itemsByCategory={state.itemsByCategory}
        totalPriceRange={state.totalPriceRange}
        loadoutName={loadoutName}
        isModified={state.isModified}
        onSelectCategory={state.selectCategory}
        onDeselectCategory={state.deselectCategory}
      />

      {/* Product list panel — slides in when a category is active */}
      {state.selectedCategory && (
        <div className="h-[500px]">
          <ProductListPanel
            category={state.selectedCategory}
            selectedProductIds={selectedProductIds}
            onToggleItem={state.toggleItem}
          />
        </div>
      )}
    </div>
  );
}
