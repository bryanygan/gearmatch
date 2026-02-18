import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoadoutState } from "@/hooks/useLoadoutState";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { decodeLoadoutUrl } from "@/utils/loadout-url";
import RadialBuyMenu from "./RadialBuyMenu";
import MobileBuyMenu from "./MobileBuyMenu";
import MobileLoadoutBar from "./MobileLoadoutBar";

/**
 * Responsive wrapper that renders the desktop radial buy menu or
 * the mobile tab-based layout depending on viewport width.
 *
 * Both layouts share the same `useLoadoutState` instance so selections
 * persist across orientation changes (tablet rotation, etc.).
 */
export default function LoadoutPageWrapper() {
  const [searchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 900px)");

  const urlProductIds = useMemo(
    () => decodeLoadoutUrl(searchParams),
    [searchParams],
  );

  const state = useLoadoutState(
    urlProductIds.length > 0 ? urlProductIds : undefined,
  );

  if (isDesktop) {
    return <RadialBuyMenu state={state} />;
  }

  return (
    <>
      <MobileBuyMenu state={state} />
      <MobileLoadoutBar state={state} />
    </>
  );
}
