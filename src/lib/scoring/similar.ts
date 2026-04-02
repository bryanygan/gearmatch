/**
 * Similar Products Scoring
 *
 * Derives quiz-like answers from a source product's attributes,
 * then uses the existing scoring engine to find similar products.
 */

import type { MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import type { Product } from "@/types/products";
import type {
  MouseQuizAnswers,
  AudioQuizAnswers,
  KeyboardQuizAnswers,
  MonitorQuizAnswers,
  RecommendationResult,
} from "./types";
import {
  getMouseRecommendations,
  getAudioRecommendations,
  getKeyboardRecommendations,
  getMonitorRecommendations,
} from "./engine";
import {
  getMouseProducts,
  getAudioProducts,
  getKeyboardProducts,
  getMonitorProducts,
} from "@/data/products";

export type SimilarCategory = "mouse" | "audio" | "keyboard" | "monitor";

export interface SimilarProductsResult {
  sourceProduct: Product;
  recommendations: RecommendationResult<Product>;
}

// =============================================================================
// Derive quiz answers from product attributes
// =============================================================================

function deriveMouseAnswers(product: MouseProduct): MouseQuizAnswers {
  const m = product.core_attributes;

  const weightMap: Record<string, "ultralight" | "light" | "medium" | "heavy"> = {
    ultralight: "ultralight",
    light: "light",
    mid: "medium",
    medium: "medium",
    heavy: "heavy",
  };

  return {
    "hand-size": m.mouse_size_class,
    "grip-style": m.mouse_grip_fit.length > 0
      ? m.mouse_grip_fit.filter((g): g is "palm" | "claw" | "fingertip" | "relaxed-claw" =>
          ["palm", "claw", "fingertip", "relaxed-claw"].includes(g))
      : ["claw"],
    "weight-preference": [weightMap[m.mouse_weight_class] ?? "medium"],
    wireless: m.wireless ? "wireless" : "wired",
    "primary-use": m.mouse_game_fit.includes("fps") ? ["precision"] : ["mixed"],
  };
}

function deriveAudioAnswers(product: AudioProduct): AudioQuizAnswers {
  const a = product.core_attributes;

  const priceBudgetMap: Record<string, "budget" | "mid-range" | "premium" | "no-limit"> = {
    budget: "budget",
    lower_midrange: "mid-range",
    midrange: "mid-range",
    upper_midrange: "premium",
    premium: "no-limit",
    flagship: "no-limit",
  };

  const formFactor: "over-ear" | "over-ear-headphone" | "iem" | "open-back" =
    a.category_subtype === "iem" || a.category_subtype === "earbud"
      ? "iem"
      : a.audio_open_back
        ? "open-back"
        : a.category_subtype === "headphone"
          ? "over-ear-headphone"
          : "over-ear";
  const sessionLength = a.audio_comfort === "great" ? "all-day"
    : a.audio_comfort === "good" ? "long"
    : "medium";

  return {
    "primary-use": product.recommendation_tags.includes("competitive")
      ? ["competitive"] : ["mixed"],
    "form-factor": [formFactor],
    "mic-needs": a.audio_has_mic ? "nice-to-have" : "not-needed",
    "session-length": [sessionLength as "medium" | "long" | "all-day"],
    budget: [priceBudgetMap[a.price_tier] ?? "mid-range"],
  };
}

function deriveKeyboardAnswers(product: KeyboardProduct): KeyboardQuizAnswers {
  const k = product.core_attributes;

  const ffMap: Record<string, "full-size" | "tkl" | "75-percent" | "60-65-percent"> = {
    "60_percent": "60-65-percent",
    "65_percent": "60-65-percent",
    "75_percent": "75-percent",
    "tkl_80_percent": "tkl",
    "full_size_100_percent": "full-size",
    "96_percent": "full-size",
    alice: "full-size",
    ortholinear: "full-size",
    split: "full-size",
  };

  const priceBudgetMap: Record<string, "budget" | "mid-range" | "premium" | "enthusiast"> = {
    budget: "budget",
    lower_midrange: "mid-range",
    midrange: "mid-range",
    upper_midrange: "premium",
    premium: "enthusiast",
    flagship: "enthusiast",
  };

  return {
    "primary-use": product.recommendation_tags.includes("competitive")
      ? ["competitive-gaming"] : ["productivity"],
    "form-factor": [ffMap[k.keyboard_form_factor] ?? "full-size"],
    "switch-type": k.keyboard_switch_feel
      ? [k.keyboard_switch_feel as "linear" | "tactile" | "clicky"]
      : ["no-preference"],
    "gaming-features": k.keyboard_supports_rapid_trigger ? "essential" : "nice-to-have",
    connectivity: k.wireless ? "wireless-preferred" : "wired-preferred",
    "priority-feature": ["performance"],
    budget: [priceBudgetMap[k.price_tier] ?? "mid-range"],
  };
}

function deriveMonitorAnswers(product: MonitorProduct): MonitorQuizAnswers {
  const mn = product.core_attributes;

  const sizeMap: Record<string, "compact" | "standard" | "large" | "ultrawide" | "any"> = {
    compact: "compact",
    standard: "standard",
    large: "large",
    ultrawide: "ultrawide",
    super_ultrawide: "ultrawide",
  };

  const rrVal = mn.monitor_max_refresh_hz < 100 ? "basic"
    : mn.monitor_max_refresh_hz < 200 ? "standard"
    : "high";

  const ptMap: Record<string, "ips" | "va" | "oled"> = {
    IPS: "ips", VA: "va", OLED: "oled", "QD-OLED": "oled", TN: "ips", "Mini-LED": "ips",
  };

  return {
    "primary-use": product.recommendation_tags.includes("gaming") ? ["gaming"] : ["mixed"],
    "size-preference": sizeMap[mn.monitor_size_class] ?? "any",
    resolution: (["1080p", "1440p", "4k"] as const).includes(
      mn.monitor_resolution_class as "1080p" | "1440p" | "4k"
    )
      ? (mn.monitor_resolution_class as "1080p" | "1440p" | "4k")
      : "any",
    "refresh-rate": rrVal as "basic" | "standard" | "high",
    "panel-type": [ptMap[mn.monitor_panel_type] ?? "ips"],
  };
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Find products similar to a given source product.
 * Derives quiz answers from the source product's attributes, runs the
 * existing scoring engine, and excludes the source product from results.
 */
export async function getSimilarProducts(
  category: SimilarCategory,
  productId: string
): Promise<SimilarProductsResult | null> {
  let sourceProduct: Product | undefined;
  let recommendations: RecommendationResult<Product>;

  switch (category) {
    case "mouse": {
      const products = await getMouseProducts();
      const source = products.find((p) => p.id === productId);
      if (!source) return null;
      sourceProduct = source;
      const answers = deriveMouseAnswers(source);
      const result = await getMouseRecommendations(answers);
      // Remove source product from results
      recommendations = {
        ...result,
        topPicks: result.topPicks.filter((sp) => sp.product.id !== productId),
        alternates: result.alternates.filter((sp) => sp.product.id !== productId),
        filteredOut: result.filteredOut?.filter((sp) => sp.product.id !== productId),
      };
      break;
    }
    case "audio": {
      const products = await getAudioProducts();
      const source = products.find((p) => p.id === productId);
      if (!source) return null;
      sourceProduct = source;
      const answers = deriveAudioAnswers(source);
      const result = await getAudioRecommendations(answers);
      recommendations = {
        ...result,
        topPicks: result.topPicks.filter((sp) => sp.product.id !== productId),
        alternates: result.alternates.filter((sp) => sp.product.id !== productId),
        filteredOut: result.filteredOut?.filter((sp) => sp.product.id !== productId),
      };
      break;
    }
    case "keyboard": {
      const products = await getKeyboardProducts();
      const source = products.find((p) => p.id === productId);
      if (!source) return null;
      sourceProduct = source;
      const answers = deriveKeyboardAnswers(source);
      const result = await getKeyboardRecommendations(answers);
      recommendations = {
        ...result,
        topPicks: result.topPicks.filter((sp) => sp.product.id !== productId),
        alternates: result.alternates.filter((sp) => sp.product.id !== productId),
        filteredOut: result.filteredOut?.filter((sp) => sp.product.id !== productId),
      };
      break;
    }
    case "monitor": {
      const products = await getMonitorProducts();
      const source = products.find((p) => p.id === productId);
      if (!source) return null;
      sourceProduct = source;
      const answers = deriveMonitorAnswers(source);
      const result = await getMonitorRecommendations(answers);
      recommendations = {
        ...result,
        topPicks: result.topPicks.filter((sp) => sp.product.id !== productId),
        alternates: result.alternates.filter((sp) => sp.product.id !== productId),
        filteredOut: result.filteredOut?.filter((sp) => sp.product.id !== productId),
      };
      break;
    }
    default:
      return null;
  }

  return { sourceProduct, recommendations };
}
