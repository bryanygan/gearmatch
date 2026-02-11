/**
 * POST /api/products/filter
 *
 * Smart pre-filtering endpoint. Accepts quiz answers and returns
 * candidate product IDs after applying hard filters, reducing the
 * number of products the client needs to score.
 */

import { z } from "zod";
import {
  mouseAnswersSchema,
  audioAnswersSchema,
  keyboardAnswersSchema,
  monitorAnswersSchema,
} from "../../../src/lib/validation/quiz-schemas";

interface Env {
  ASSETS: Fetcher;
}

interface ProductRecord {
  id: string;
  core_attributes: Record<string, unknown>;
  [key: string]: unknown;
}

const CATEGORY_SCHEMAS = {
  mouse: mouseAnswersSchema,
  audio: audioAnswersSchema,
  keyboard: keyboardAnswersSchema,
  monitor: monitorAnswersSchema,
} as const;

type FilterCategory = keyof typeof CATEGORY_SCHEMAS;

const CATEGORY_FILE_MAP: Record<FilterCategory, string> = {
  mouse: "mice.json",
  audio: "audio.json",
  keyboard: "keyboards.json",
  monitor: "monitors.json",
};

const filterRequestSchema = z.object({
  category: z.enum(["mouse", "audio", "keyboard", "monitor"]),
  answers: z.record(z.unknown()),
  maxCandidates: z.number().int().min(1).max(500).optional(),
});

// Price tiers ordered from cheapest to most expensive
const PRICE_TIER_ORDER = [
  "budget",
  "lower_midrange",
  "midrange",
  "upper_midrange",
  "premium",
  "flagship",
] as const;

// Map quiz budget values to max allowed price tier index
function getMaxPriceTierIndex(budgetValues: string[]): number | null {
  if (budgetValues.includes("no-limit") || budgetValues.includes("enthusiast")) {
    return null; // No price filter
  }
  if (budgetValues.includes("premium")) {
    return 4; // up to "premium"
  }
  if (budgetValues.includes("mid-range")) {
    return 3; // up to "upper_midrange"
  }
  if (budgetValues.includes("budget")) {
    return 1; // up to "lower_midrange"
  }
  return null;
}

// Monitor size classes ordered for "within 1 step" filtering
const SIZE_CLASS_ORDER = ["compact", "standard", "large", "ultrawide", "super_ultrawide"];

// Monitor resolution classes ordered for "within 1 step" filtering
const RESOLUTION_CLASS_ORDER = ["1080p", "1440p", "4k", "5k", "8k"];

function getNeighborValues(ordered: string[], target: string): Set<string> {
  const idx = ordered.indexOf(target);
  if (idx === -1) return new Set(ordered); // If not found, allow all
  const result = new Set<string>();
  if (idx > 0) result.add(ordered[idx - 1]);
  result.add(ordered[idx]);
  if (idx < ordered.length - 1) result.add(ordered[idx + 1]);
  return result;
}

// Category-specific hard filters
function filterMouse(products: ProductRecord[], answers: Record<string, unknown>): ProductRecord[] {
  return products.filter((p) => {
    const attrs = p.core_attributes;

    // Wireless filter
    if (answers.wireless === "wireless" && attrs.wireless !== true) return false;
    if (answers.wireless === "wired" && attrs.wireless !== false) return false;

    // Handedness filter: left-handed users need left or ambi mice
    if (answers.handedness === "left") {
      const handedness = attrs.mouse_handedness as string;
      if (handedness !== "left" && handedness !== "ambi") return false;
    }

    return true;
  });
}

function filterAudio(products: ProductRecord[], answers: Record<string, unknown>): ProductRecord[] {
  return products.filter((p) => {
    const attrs = p.core_attributes;

    // Mic filter: if essential, must have mic
    if (answers["mic-needs"] === "essential" && attrs.audio_has_mic !== true) return false;

    // Wireless filter
    if (answers["wireless-preference"] === "wireless-required" && attrs.wireless !== true) return false;

    // Budget filter
    const budget = answers.budget;
    if (Array.isArray(budget)) {
      const maxIdx = getMaxPriceTierIndex(budget as string[]);
      if (maxIdx !== null) {
        const priceTier = attrs.price_tier as string;
        const tierIdx = PRICE_TIER_ORDER.indexOf(priceTier as typeof PRICE_TIER_ORDER[number]);
        if (tierIdx === -1) return false;
        if (tierIdx > maxIdx) return false;
      }
    }

    return true;
  });
}

function filterKeyboard(products: ProductRecord[], answers: Record<string, unknown>): ProductRecord[] {
  return products.filter((p) => {
    const attrs = p.core_attributes;

    // Wireless filter
    if (answers.connectivity === "wireless-essential" && attrs.wireless !== true) return false;

    // Budget filter
    const budget = answers.budget;
    if (Array.isArray(budget)) {
      const maxIdx = getMaxPriceTierIndex(budget as string[]);
      if (maxIdx !== null) {
        const priceTier = attrs.price_tier as string;
        const tierIdx = PRICE_TIER_ORDER.indexOf(priceTier as typeof PRICE_TIER_ORDER[number]);
        if (tierIdx === -1) return false;
        if (tierIdx > maxIdx) return false;
      }
    }

    return true;
  });
}

function filterMonitor(products: ProductRecord[], answers: Record<string, unknown>): ProductRecord[] {
  return products.filter((p) => {
    const attrs = p.core_attributes;

    // Size class filter (within 1 step)
    const sizePreference = answers["size-preference"] as string | undefined;
    if (sizePreference && sizePreference !== "any") {
      const allowed = getNeighborValues(SIZE_CLASS_ORDER, sizePreference);
      const productSize = attrs.monitor_size_class as string;
      if (!allowed.has(productSize)) return false;
    }

    // Resolution class filter (within 1 step)
    const resolution = answers.resolution as string | undefined;
    if (resolution && resolution !== "any") {
      const allowed = getNeighborValues(RESOLUTION_CLASS_ORDER, resolution);
      const productRes = attrs.monitor_resolution_class as string;
      if (!allowed.has(productRes)) return false;
    }

    // Budget filter
    const budget = answers.budget;
    if (Array.isArray(budget)) {
      const maxIdx = getMaxPriceTierIndex(budget as string[]);
      if (maxIdx !== null) {
        const priceTier = attrs.price_tier as string;
        const tierIdx = PRICE_TIER_ORDER.indexOf(priceTier as typeof PRICE_TIER_ORDER[number]);
        if (tierIdx === -1) return false;
        if (tierIdx > maxIdx) return false;
      }
    }

    return true;
  });
}

const CATEGORY_FILTERS: Record<FilterCategory, (products: ProductRecord[], answers: Record<string, unknown>) => ProductRecord[]> = {
  mouse: filterMouse,
  audio: filterAudio,
  keyboard: filterKeyboard,
  monitor: filterMonitor,
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  // Parse request body
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate outer structure
  const outerResult = filterRequestSchema.safeParse(body);
  if (!outerResult.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid request",
        details: outerResult.error.issues,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { category, answers, maxCandidates = 200 } = outerResult.data;

  // Validate answers against category-specific schema
  const schema = CATEGORY_SCHEMAS[category];
  const answersResult = schema.safeParse(answers);
  if (!answersResult.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid answers for category",
        category,
        details: answersResult.error.issues,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Fetch product data
  const file = CATEGORY_FILE_MAP[category];
  const assetResponse = await context.env.ASSETS.fetch(
    new URL(`/data/products/${file}`, context.request.url)
  );

  if (!assetResponse.ok) {
    return new Response(
      JSON.stringify({ error: "Product data not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  const allProducts: ProductRecord[] = await assetResponse.json();
  const totalProducts = allProducts.length;

  // Apply hard filters
  const filterFn = CATEGORY_FILTERS[category];
  const candidates = filterFn(allProducts, answersResult.data as Record<string, unknown>);

  // Cap at maxCandidates
  const cappedCandidates = candidates.slice(0, maxCandidates);

  return new Response(
    JSON.stringify({
      candidateIds: cappedCandidates.map((p) => p.id),
      totalProducts,
      totalCandidates: candidates.length,
      returnedCandidates: cappedCandidates.length,
      category,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
