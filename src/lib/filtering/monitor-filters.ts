import type { MonitorProduct } from "@/types/monitor";
import type { MonitorQuizAnswers } from "@/lib/scoring/types";
import type { PreFilter } from "./types";

/**
 * Eliminate monitors outside the user's resolution preference.
 * Allows one step up to avoid being too aggressive.
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
      return ["1080p", "1440p", "4k"].includes(res);
    case "4k":
      return ["4k", "5k"].includes(res);
    default:
      return true; // "any" keeps all
  }
};

/**
 * Eliminate non-ultrawide monitors when user specifically wants ultrawide.
 */
export const sizeFilter: PreFilter<MonitorQuizAnswers, MonitorProduct> = (
  answers,
  product
) => {
  if (answers["size-preference"] === "ultrawide") {
    return ["ultrawide", "super_ultrawide"].includes(
      product.core_attributes.monitor_size_class
    );
  }
  return true;
};

export const monitorPreFilters: PreFilter<
  MonitorQuizAnswers,
  MonitorProduct
>[] = [resolutionFilter, sizeFilter];
