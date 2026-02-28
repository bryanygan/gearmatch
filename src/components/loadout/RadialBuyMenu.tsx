import React, { useMemo } from "react";
import RadialWheel from "./RadialWheel";
import ProductListPanel from "./ProductListPanel";
import LoadoutSummary from "./LoadoutSummary";
import CuratedLoadoutBrowser from "./CuratedLoadoutBrowser";
import type { LoadoutState } from "@/hooks/useLoadoutState";
import { CURATED_LOADOUTS } from "@/data/curated-loadouts";

// ─── Props ───────────────────────────────────────────────────────────────────

export interface RadialBuyMenuProps {
  state: LoadoutState;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RadialBuyMenu({ state }: RadialBuyMenuProps) {
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
    <div className="flex w-full flex-col items-center gap-6">
      {/* Wheel + panel — CS:GO style layout */}
      <div className={`flex w-full items-center ${state.selectedCategory ? "" : "justify-center"}`}>
        {/* Radial wheel — centered when alone, fills remaining space when panel is open */}
        <div className={state.selectedCategory ? "flex-1 min-w-0 max-w-[800px]" : "w-full max-w-[700px]"}>
          <RadialWheel
            selectedCategory={state.selectedCategory}
            itemsByCategory={state.itemsByCategory}
            totalPriceRange={state.totalPriceRange}
            loadoutName={loadoutName}
            isModified={state.isModified}
            onSelectCategory={state.selectCategory}
            onDeselectCategory={state.deselectCategory}
          />
        </div>

        {/* Product list panel — sits right next to the wheel */}
        {state.selectedCategory && (
          <div
            key={state.selectedCategory}
            className="shrink-0 h-[min(600px,80vh)]"
          >
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

      {/* Curated loadout browser — below the main loadout area */}
      <CuratedLoadoutBrowser
        currentItemCount={state.itemCount}
        onLoadLoadout={state.loadCuratedLoadout}
      />
    </div>
  );
}
