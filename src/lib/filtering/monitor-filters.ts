import type { MonitorProduct } from "@/types/monitor";
import type { MonitorQuizAnswers } from "@/lib/scoring/types";
import type { PreFilter } from "./types";

/**
 * Eliminate monitors outside the user's resolution preference.
 * Allows one step up (not down) to avoid being too aggressive.
 */
export const resolutionFilter: PreFilter<
  MonitorQuizAnswers,
  MonitorProduct
> = (answers, product) => {
  const res = product.core_attributes.monitor_resolution_class;
  switch (answers.resolution) {
    case "1080p":
      return ["1080p", "1440p"].includes(res);
    case "1440p":
      return ["1440p", "4k"].includes(res);
    case "4k":
      return ["4k", "5k"].includes(res);
    default:
      return true; // "any" keeps all
  }
};

/**
 * Eliminate monitors outside the user's size preference (±1 step).
 * Matches server-side filterMonitor/getNeighborValues logic.
 */
const SIZE_CLASS_ORDER = ["compact", "standard", "large", "ultrawide", "super_ultrawide"];

function getNeighborValues(ordered: string[], target: string): Set<string> {
  const idx = ordered.indexOf(target);
  if (idx === -1) return new Set(ordered);
  const result = new Set<string>();
  if (idx > 0) result.add(ordered[idx - 1]);
  result.add(ordered[idx]);
  if (idx < ordered.length - 1) result.add(ordered[idx + 1]);
  return result;
}

export const sizeFilter: PreFilter<MonitorQuizAnswers, MonitorProduct> = (
  answers,
  product
) => {
  const pref = answers["size-preference"];
  if (!pref || pref === "any") return true;
  const allowed = getNeighborValues(SIZE_CLASS_ORDER, pref);
  return allowed.has(product.core_attributes.monitor_size_class);
};

// Note: Server-side filterMonitor also applies budget/price_tier filtering.
// Client pre-filters intentionally omit budget — it's a soft preference
// handled by the scoring engine's weighted rules, not a hard constraint.
export const monitorPreFilters: PreFilter<
  MonitorQuizAnswers,
  MonitorProduct
>[] = [resolutionFilter, sizeFilter];
