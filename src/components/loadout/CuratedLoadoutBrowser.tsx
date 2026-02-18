import React, { useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CuratedLoadoutCard from "./CuratedLoadoutCard";
import { CURATED_LOADOUTS } from "@/data/curated-loadouts";

// ─── Props ───────────────────────────────────────────────────────────────────

export interface CuratedLoadoutBrowserProps {
  currentItemCount: number;
  onLoadLoadout: (loadoutId: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CuratedLoadoutBrowser({
  currentItemCount,
  onLoadLoadout,
}: CuratedLoadoutBrowserProps) {
  const [pendingLoadoutId, setPendingLoadoutId] = useState<string | null>(null);

  const handleLoad = useCallback(
    (loadoutId: string) => {
      if (currentItemCount > 0) {
        // Show confirmation dialog
        setPendingLoadoutId(loadoutId);
      } else {
        onLoadLoadout(loadoutId);
      }
    },
    [currentItemCount, onLoadLoadout],
  );

  const confirmLoad = useCallback(() => {
    if (pendingLoadoutId) {
      onLoadLoadout(pendingLoadoutId);
      setPendingLoadoutId(null);
    }
  }, [pendingLoadoutId, onLoadLoadout]);

  return (
    <div className="w-full max-w-3xl">
      {/* Header */}
      <div className="mb-3 md:mb-4 text-center">
        <h2 className="font-mono text-lg md:text-2xl font-bold uppercase tracking-wider text-slate-100">
          Curated{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Loadouts
          </span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-slate-400">
          Pre-built setups to get you started. Load one and customize it.
        </p>
      </div>

      {/* Desktop carousel */}
      <div className="hidden md:block px-12">
        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {CURATED_LOADOUTS.map((loadout) => (
              <CarouselItem
                key={loadout.id}
                className="basis-auto pl-3"
              >
                <CuratedLoadoutCard loadout={loadout} onLoad={handleLoad} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white" />
          <CarouselNext className="border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white" />
        </Carousel>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2">
          {CURATED_LOADOUTS.map((loadout) => (
            <CuratedLoadoutCard key={loadout.id} loadout={loadout} onLoad={handleLoad} />
          ))}
        </div>
      </div>

      {/* Replace confirmation dialog */}
      <AlertDialog
        open={pendingLoadoutId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingLoadoutId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Current Loadout</AlertDialogTitle>
            <AlertDialogDescription>
              Loading this loadout will replace your current selections.
              Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLoad}>
              Load Loadout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
