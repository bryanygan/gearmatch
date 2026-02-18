import React, { useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoadoutState } from "@/hooks/useLoadoutState";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { decodeLoadoutUrl } from "@/utils/loadout-url";
import type { LoadoutCategory } from "@/types/loadout";
import RadialBuyMenu from "./RadialBuyMenu";
import MobileBuyMenu from "./MobileBuyMenu";
import MobileLoadoutBar from "./MobileLoadoutBar";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VALID_CATEGORIES: readonly LoadoutCategory[] = [
  "mouse",
  "audio",
  "keyboard",
  "monitor",
];

function parseCategory(raw: string | null): LoadoutCategory | null {
  if (!raw) return null;
  return VALID_CATEGORIES.includes(raw as LoadoutCategory)
    ? (raw as LoadoutCategory)
    : null;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Responsive wrapper that renders the desktop radial buy menu or
 * the mobile tab-based layout depending on viewport width.
 *
 * Both layouts share the same `useLoadoutState` instance so selections
 * persist across orientation changes (tablet rotation, etc.).
 *
 * URL param priority: ?items= > ?loadout= > ?category= > localStorage
 */
export default function LoadoutPageWrapper() {
  const [searchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 900px)");

  // ── Decode URL params ───────────────────────────────────────────────────
  const urlProductIds = useMemo(
    () => decodeLoadoutUrl(searchParams),
    [searchParams],
  );

  const urlLoadout = searchParams.get("loadout");
  const urlCategory = parseCategory(searchParams.get("category"));

  // ── Shared state ────────────────────────────────────────────────────────
  const state = useLoadoutState(
    urlProductIds.length > 0 ? urlProductIds : undefined,
  );

  // ── Apply ?loadout= and ?category= on mount (once) ─────────────────────
  const hasHandledParams = useRef(false);
  useEffect(() => {
    if (hasHandledParams.current) return;
    hasHandledParams.current = true;

    // items already hydrated via useLoadoutState — skip other params
    if (urlProductIds.length > 0) return;

    if (urlLoadout) {
      state.loadCuratedLoadout(urlLoadout);
      return;
    }

    if (urlCategory) {
      state.selectCategory(urlCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────

  if (isDesktop) {
    return <RadialBuyMenu state={state} />;
  }

  return (
    <>
      <MobileBuyMenu state={state} initialCategory={urlCategory} />
      <MobileLoadoutBar state={state} />
    </>
  );
}
