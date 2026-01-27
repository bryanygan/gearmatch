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
  "grip-style": z.enum(["palm", "claw", "fingertip", "relaxed-claw"]),
  "weight-preference": z.enum(["ultralight", "light", "medium", "heavy"]),
  wireless: z.enum(["wireless", "wired", "either"]),
  "primary-use": z.enum(["precision", "productivity", "creative", "mixed"]),
});

export type ValidatedMouseAnswers = z.infer<typeof mouseAnswersSchema>;

// =============================================================================
// Audio Quiz Answer Schema
// =============================================================================

export const audioAnswersSchema = z.object({
  "primary-use": z.enum(["competitive", "immersive", "mixed", "streaming"]),
  "form-factor": z.enum(["over-ear", "over-ear-headphone", "iem", "open-back"]),
  "mic-needs": z.enum(["essential", "nice-to-have", "not-needed"]),
  "session-length": z.enum(["short", "medium", "long", "all-day"]),
  budget: z.enum(["budget", "mid-range", "premium", "no-limit"]),
});

export type ValidatedAudioAnswers = z.infer<typeof audioAnswersSchema>;

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
 * Converts URLSearchParams to a plain object for validation.
 */
export function searchParamsToObject(
  params: URLSearchParams
): Record<string, string> {
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
