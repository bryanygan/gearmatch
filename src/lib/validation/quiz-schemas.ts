/**
 * Quiz Answer Validation Schemas
 *
 * Runtime validation for quiz answers using Zod.
 * These schemas ensure URL parameters and state contain valid values
 * before processing by the scoring engine.
 */

import { z } from "zod";

// =============================================================================
// Mouse Quiz Answer Schema
// =============================================================================

export const mouseAnswersSchema = z.object({
  "hand-size": z.enum(["small", "medium", "large"]),
  "grip-style": z.array(z.enum(["palm", "claw", "fingertip", "relaxed-claw"])).min(1),
  "weight-preference": z.array(z.enum(["ultralight", "light", "medium", "heavy"])).min(1),
  wireless: z.enum(["wireless", "wired", "either"]),
  "primary-use": z.array(z.enum(["precision", "productivity", "creative", "mixed"])).min(1),
  // Enhanced quiz fields (optional for backwards compatibility)
  handedness: z.enum(["right", "left", "ambidextrous"]).optional(),
  "shape-profile": z.array(z.enum(["low_hump", "rear_hump", "center_hump", "ergo_hump", "any"])).optional(),
  "gaming-genre": z.array(z.enum(["fps", "moba", "mmo", "general"])).optional(),
  "button-needs": z.enum(["minimal", "standard", "many", "mmo_grid"]).optional(),
});

export type ValidatedMouseAnswers = z.infer<typeof mouseAnswersSchema>;

// =============================================================================
// Audio Quiz Answer Schema
// =============================================================================

export const audioAnswersSchema = z.object({
  "primary-use": z.array(z.enum(["competitive", "immersive", "mixed", "streaming"])).min(1),
  "form-factor": z.array(z.enum(["over-ear", "over-ear-headphone", "iem", "open-back"])).min(1),
  "mic-needs": z.enum(["essential", "nice-to-have", "not-needed"]),
  "session-length": z.array(z.enum(["short", "medium", "long", "all-day"])).min(1),
  budget: z.array(z.enum(["budget", "mid-range", "premium", "no-limit"])).min(1),
  // Enhanced quiz fields (optional for backwards compatibility)
  "sound-signature": z.array(z.enum(["neutral", "warm", "v_shaped", "bright"])).optional(),
  "wireless-preference": z.enum(["wireless-required", "wireless-preferred", "wired-preferred", "either"]).optional(),
  "noise-environment": z.enum(["quiet", "moderate", "noisy"]).optional(),
});

export type ValidatedAudioAnswers = z.infer<typeof audioAnswersSchema>;

// =============================================================================
// Keyboard Quiz Answer Schema
// =============================================================================

export const keyboardAnswersSchema = z.object({
  "primary-use": z.array(z.enum([
    "competitive-gaming",
    "casual-gaming",
    "productivity",
    "programming",
  ])).min(1),
  "form-factor": z.array(z.enum(["full-size", "tkl", "75-percent", "60-65-percent"])).min(1),
  "switch-type": z.array(z.enum(["linear", "tactile", "clicky", "no-preference"])).min(1),
  "gaming-features": z.enum(["essential", "nice-to-have", "not-important"]),
  connectivity: z.enum([
    "wireless-essential",
    "wireless-preferred",
    "wired-preferred",
    "no-preference",
  ]),
  "priority-feature": z.array(z.enum([
    "performance",
    "typing-feel",
    "customization",
    "quiet",
  ])).min(1),
  budget: z.array(z.enum(["budget", "mid-range", "premium", "enthusiast"])).min(1),
  // Enhanced quiz fields (optional for backwards compatibility)
  "switch-technology": z.array(z.enum(["mechanical", "magnetic", "optical", "any"])).optional(),
  "media-controls": z.enum(["essential", "nice-to-have", "not-needed"]).optional(),
  "keycap-material": z.enum(["pbt", "abs", "any"]).optional(),
});

export type ValidatedKeyboardAnswers = z.infer<typeof keyboardAnswersSchema>;

// =============================================================================
// Validation Helper Functions
// =============================================================================

/**
 * Validates mouse quiz answers from URL parameters or state.
 * Returns validated answers or null if validation fails.
 */
export function validateMouseAnswers(
  data: unknown
): ValidatedMouseAnswers | null {
  const result = mouseAnswersSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.warn("Invalid mouse quiz answers:", result.error.issues);
  return null;
}

/**
 * Validates audio quiz answers from URL parameters or state.
 * Returns validated answers or null if validation fails.
 */
export function validateAudioAnswers(
  data: unknown
): ValidatedAudioAnswers | null {
  const result = audioAnswersSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.warn("Invalid audio quiz answers:", result.error.issues);
  return null;
}

/**
 * Validates keyboard quiz answers from URL parameters or state.
 * Returns validated answers or null if validation fails.
 */
export function validateKeyboardAnswers(
  data: unknown
): ValidatedKeyboardAnswers | null {
  const result = keyboardAnswersSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.warn("Invalid keyboard quiz answers:", result.error.issues);
  return null;
}

/**
 * Keys that should be parsed as arrays (multi-select questions).
 */
const MULTI_SELECT_KEYS = new Set([
  // Mouse - core
  "grip-style",
  "weight-preference",
  "primary-use",
  // Mouse - enhanced
  "shape-profile",
  "gaming-genre",
  // Audio - core
  "form-factor",
  "session-length",
  "budget",
  // Audio - enhanced
  "sound-signature",
  // Keyboard - core
  "switch-type",
  "priority-feature",
  // Keyboard - enhanced
  "switch-technology",
]);

/**
 * Converts URLSearchParams to a plain object for validation.
 * Multi-select fields are parsed from comma-separated values into arrays.
 */
export function searchParamsToObject(
  params: URLSearchParams
): Record<string, string | string[]> {
  const obj: Record<string, string | string[]> = {};
  params.forEach((value, key) => {
    if (MULTI_SELECT_KEYS.has(key)) {
      obj[key] = value.split(",").filter(Boolean);
    } else {
      obj[key] = value;
    }
  });
  return obj;
}
