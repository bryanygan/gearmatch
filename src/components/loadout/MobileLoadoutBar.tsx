import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import LoadoutSummary from "./LoadoutSummary";
import type { LoadoutState } from "@/hooks/useLoadoutState";
import { cn } from "@/lib/utils";

// ─── Props ───────────────────────────────────────────────────────────────────

export interface MobileLoadoutBarProps {
  state: LoadoutState;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MobileLoadoutBar({ state }: MobileLoadoutBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const visible = state.itemCount > 0;

  return (
    <>
      {/* Sticky bottom bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out",
          visible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex h-[60px] items-center justify-between border-t border-slate-700/50 bg-slate-950/90 px-4 backdrop-blur-md">
          {/* Totals */}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-slate-200">
              {state.itemCount} {state.itemCount === 1 ? "item" : "items"}
            </span>
            <span className="font-mono text-sm font-bold text-emerald-400">
              ${state.totalPriceRange[0]}–${state.totalPriceRange[1]}
            </span>
          </div>

          {/* View Loadout button */}
          <Button
            size="sm"
            className="gap-1.5 font-mono text-xs uppercase tracking-wider"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingBag size={14} />
            View Loadout
          </Button>
        </div>
      </div>

      {/* Vaul drawer with full LoadoutSummary */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[85vh] border-slate-700/50 bg-slate-950">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-mono text-base font-bold uppercase tracking-wider text-slate-100">
              Your Loadout
            </DrawerTitle>
            <DrawerDescription className="text-xs text-slate-400">
              {state.itemCount} {state.itemCount === 1 ? "item" : "items"}{" "}
              selected
            </DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-auto px-4 pb-6">
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
