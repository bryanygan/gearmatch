import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import RadialWheel from "./RadialWheel";
import ProductListPanel from "./ProductListPanel";
import LoadoutSummary from "./LoadoutSummary";
import { useLoadoutState } from "@/hooks/useLoadoutState";
import { CURATED_LOADOUTS } from "@/data/curated-loadouts";
import { decodeLoadoutUrl } from "@/utils/loadout-url";
import { cn } from "@/lib/utils";

export default function RadialBuyMenu() {
  const [searchParams] = useSearchParams();

  // Decode URL params once (stable ref via useMemo)
  const urlProductIds = useMemo(
    () => decodeLoadoutUrl(searchParams),
    [searchParams],
  );

  const state = useLoadoutState(
    urlProductIds.length > 0 ? urlProductIds : undefined,
  );

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
    <div className="flex flex-col items-center gap-8">
      {/* Wheel + panel row */}
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

      {/* Loadout summary */}
      <LoadoutSummary
        itemsByCategory={state.itemsByCategory}
        productMap={state.productMap}
        totalPriceRange={state.totalPriceRange}
        itemCount={state.itemCount}
        onRemoveItem={state.removeItem}
        onClearAll={state.clearAll}
        loadoutItems={state.loadoutItems}
      />
    </div>
  );
}
