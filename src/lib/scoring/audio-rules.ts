/**
 * Audio Scoring Rules
 *
 * Scoring rules for matching audio products against quiz answers.
 * Each rule evaluates a specific aspect of the match and returns points.
 */

import type { AudioProduct, AudioType, PriceTier } from "@/types/products";
import type { AudioQuizAnswers, ScoringRule, RuleResult } from "./types";

// =============================================================================
// Rule 1: Form Factor (weight: 0.25, max: 25 points)
// =============================================================================

/**
 * Evaluates how well the audio product form factor matches user preference.
 */
/**
 * Helper to evaluate a single form factor preference.
 */
function evaluateSingleFormFactor(
  preference: string,
  product: AudioProduct
): { points: number; reason?: string; concern?: string } {
  const audioType = product.core_attributes.audio_type;
  const isOpenBack = product.core_attributes.audio_open_back;
  const hasMic = product.core_attributes.audio_has_mic;

  switch (preference) {
    case "over-ear":
      if (audioType === "headset" && !isOpenBack) {
        return { points: 25, reason: "Over-ear headset with closed-back design" };
      }
      if (audioType === "headphone" && !isOpenBack && hasMic) {
        return { points: 22, reason: "Over-ear headphone with microphone" };
      }
      if (audioType === "headphone" && !isOpenBack) {
        return { points: 15, reason: "Over-ear closed-back headphone", concern: "No built-in microphone" };
      }
      if (audioType === "headset" && isOpenBack) {
        return { points: 12, reason: "Over-ear headset (open-back)", concern: "Open-back design leaks sound" };
      }
      break;

    case "over-ear-headphone":
      if (audioType === "headphone" && !isOpenBack) {
        return { points: 25, reason: "Over-ear closed-back headphone for focused listening" };
      }
      if (audioType === "headphone" && isOpenBack) {
        return { points: 20, reason: "Over-ear headphone with open-back design for wider soundstage" };
      }
      if (audioType === "headset") {
        return { points: 15, reason: "Gaming headset (has microphone you may not need)" };
      }
      break;

    case "iem":
      if (audioType === "iem") {
        return { points: 25, reason: "In-ear monitors for portable, detailed audio" };
      }
      if (audioType === "earbud") {
        return { points: 20, reason: "Earbuds for comfortable, portable listening" };
      }
      return { points: 3, concern: "Over-ear form factor doesn't match your IEM/earbud preference" };

    case "open-back":
      if (isOpenBack) {
        const typeDesc = audioType === "headset" ? "headset" : "headphone";
        return { points: 25, reason: `Open-back ${typeDesc} for natural, wide soundstage` };
      }
      return { points: 8, concern: "Closed-back design doesn't provide the open soundstage you prefer" };
  }

  return { points: 5, concern: `${audioType} form factor differs from your preference` };
}

export const formFactorRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Form Factor",
  weight: 0.2, // Reduced from 0.25 to accommodate new rules
  maxPoints: 25,
  evaluate: (answers, product): RuleResult => {
    const preferences = answers["form-factor"];

    // Evaluate each selected preference and take the best score
    const results = preferences.map((pref) => evaluateSingleFormFactor(pref, product));
    const bestResult = results.reduce((best, current) =>
      current.points > best.points ? current : best
    );

    return bestResult;
  },
};

// =============================================================================
// Rule 2: Primary Use (weight: 0.20, max: 20 points)
// =============================================================================

/**
 * Evaluates how well the audio product fits the user's primary use case.
 */
/**
 * Helper to evaluate a single primary use case for audio.
 */
function evaluateSingleAudioPrimaryUse(
  primaryUse: string,
  product: AudioProduct
): { points: number; reason?: string; concern?: string } {
  const competitiveRating = product.core_attributes.audio_competitive_fps;
  const immersionRating = product.core_attributes.audio_immersion;
  const micQuality = product.core_attributes.audio_mic_quality;
  const soundSig = product.core_attributes.audio_sound_signature;

  const ratingScore: Record<string, number> = {
    great: 20,
    good: 15,
    ok: 10,
    poor: 5,
  };

  switch (primaryUse) {
    case "competitive": {
      const score = ratingScore[competitiveRating] || 10;
      if (competitiveRating === "great") {
        return { points: 20, reason: "Excellent positional audio and imaging for competitive play" };
      }
      if (competitiveRating === "good") {
        return { points: 15, reason: "Good competitive audio with clear positioning" };
      }
      return {
        points: score,
        concern: competitiveRating === "ok"
          ? "Adequate but not optimized for competitive audio"
          : "May lack precision needed for competitive play",
      };
    }

    case "immersive": {
      const score = ratingScore[immersionRating] || 10;
      const sigBonus = soundSig === "warm" || soundSig === "bassy" || soundSig === "v_shaped" ? 2 : 0;
      const finalScore = Math.min(score + sigBonus, 20);

      if (immersionRating === "great") {
        return {
          points: finalScore,
          reason: sigBonus > 0
            ? `Excellent immersion with ${soundSig} sound signature`
            : "Excellent immersive audio quality with engaging presentation",
        };
      }
      if (immersionRating === "good") {
        return { points: finalScore, reason: "Good immersive audio for engaging experiences" };
      }
      return { points: score, concern: "May not provide the immersive experience you're looking for" };
    }

    case "mixed": {
      const compScore = ratingScore[competitiveRating] || 10;
      const immScore = ratingScore[immersionRating] || 10;
      const avgScore = Math.round((compScore + immScore) / 2);

      if (competitiveRating === "good" && immersionRating === "good") {
        return { points: 18, reason: "Well-balanced for both competitive and immersive use" };
      }
      if ((competitiveRating === "great" && immersionRating !== "poor") ||
          (immersionRating === "great" && competitiveRating !== "poor")) {
        return {
          points: 16,
          reason: competitiveRating === "great"
            ? "Excellent competitive audio, good for immersion too"
            : "Excellent immersion, capable for competitive use",
        };
      }
      return {
        points: avgScore,
        reason: "Usable for mixed purposes",
        concern: avgScore < 12 ? "May not excel at either competitive or immersive use" : undefined,
      };
    }

    case "streaming": {
      const micScore: Record<string, number> = { great: 20, good: 16, ok: 10, poor: 5 };
      const score = micQuality ? micScore[micQuality] || 8 : 5;

      if (micQuality === "great") {
        return { points: 20, reason: "Excellent microphone quality for streaming and content creation" };
      }
      if (micQuality === "good") {
        return { points: 16, reason: "Good microphone for streaming" };
      }
      if (!product.core_attributes.audio_has_mic) {
        return { points: 3, concern: "No microphone included - you'll need a separate mic for streaming" };
      }
      return { points: score, concern: "Microphone quality may not meet streaming standards" };
    }
  }

  return { points: 10 };
}

export const primaryUseRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Primary Use",
  weight: 0.15, // Reduced from 0.20 to accommodate new rules
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const primaryUses = answers["primary-use"];

    // Evaluate each selected use case and take the best score
    const results = primaryUses.map((use) => evaluateSingleAudioPrimaryUse(use, product));
    const bestResult = results.reduce((best, current) =>
      current.points > best.points ? current : best
    );

    // Bonus for products that satisfy multiple selected uses well
    const goodMatches = results.filter((r) => r.points >= 15).length;
    if (goodMatches > 1 && bestResult.points < 20) {
      return {
        points: Math.min(bestResult.points + 2, 20),
        reason: bestResult.reason
          ? `${bestResult.reason} (versatile for multiple uses)`
          : "Versatile for multiple use cases",
      };
    }

    return bestResult;
  },
};

// =============================================================================
// Rule 3: Microphone (weight: 0.20, max: 20 points)
// =============================================================================

/**
 * Evaluates if the audio product meets microphone requirements.
 */
export const microphoneRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Microphone",
  weight: 0.15, // Reduced from 0.20 to accommodate new rules
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const micNeed = answers["mic-needs"];
    const hasMic = product.core_attributes.audio_has_mic;
    const micQuality = product.core_attributes.audio_mic_quality;
    const micType = product.core_attributes.audio_mic_type;

    switch (micNeed) {
      case "essential":
        if (!hasMic) {
          return {
            points: 0,
            concern: "No microphone - you'll need a separate mic",
          };
        }
        if (micQuality === "great") {
          const typeDesc =
            micType === "detachable_boom"
              ? "with detachable boom mic"
              : micType === "fixed_boom"
                ? "with boom mic"
                : "";
          return {
            points: 20,
            reason: `Excellent microphone quality ${typeDesc}`.trim(),
          };
        }
        if (micQuality === "good") {
          return {
            points: 16,
            reason: "Good microphone for voice chat and calls",
          };
        }
        if (micQuality === "ok") {
          return {
            points: 10,
            reason: "Includes microphone for basic voice chat",
            concern: "Microphone quality is adequate but not exceptional",
          };
        }
        return {
          points: 6,
          concern: "Microphone quality may not meet your needs",
        };

      case "nice-to-have":
        if (hasMic) {
          if (micQuality === "great" || micQuality === "good") {
            return {
              points: 20,
              reason: `Bonus: includes ${micQuality} quality microphone`,
            };
          }
          return {
            points: 15,
            reason: "Includes microphone for convenience",
          };
        }
        // No mic but user said nice-to-have, not essential
        return {
          points: 12,
          reason: "No built-in mic, but you indicated it's not essential",
        };

      case "not-needed":
        // Full points either way, slight preference for no mic (cleaner design)
        if (!hasMic) {
          return {
            points: 20,
            reason: "No microphone - clean design focused on audio quality",
          };
        }
        return {
          points: 18,
          reason: "Includes microphone (can be removed/ignored)",
        };
    }

    return { points: 10 };
  },
};

// =============================================================================
// Rule 4: Comfort/Session Length (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates if the audio product meets comfort requirements for session length.
 */
/**
 * Helper to evaluate comfort for a single session length.
 */
function evaluateSingleSessionComfort(
  sessionLength: string,
  product: AudioProduct
): { points: number; reason?: string; concern?: string } {
  const comfort = product.core_attributes.audio_comfort;
  const weight = product.core_attributes.audio_weight_g;

  const comfortRequirements: Record<string, { ideal: string[]; acceptable: string[] }> = {
    short: { ideal: ["great", "good", "ok"], acceptable: ["poor"] },
    medium: { ideal: ["great", "good"], acceptable: ["ok"] },
    long: { ideal: ["great"], acceptable: ["good"] },
    "all-day": { ideal: ["great"], acceptable: [] },
  };

  const reqs = comfortRequirements[sessionLength];
  if (!reqs) return { points: 10 };

  const isIdeal = reqs.ideal.includes(comfort);
  const isAcceptable = reqs.acceptable.includes(comfort);
  const isLightweight = weight && weight < 300;
  const isHeavy = weight && weight > 400;

  if (isIdeal) {
    let points = comfort === "great" ? 15 : comfort === "good" ? 13 : 11;
    let reason = "";

    if (sessionLength === "all-day" && comfort === "great") {
      reason = isLightweight
        ? `Exceptional comfort for all-day use at only ${weight}g`
        : "Exceptional comfort designed for extended all-day sessions";
      points = 15;
    } else if (sessionLength === "long" && comfort === "great") {
      reason = "Excellent comfort for long sessions";
    } else {
      reason = `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort suits ${sessionLength} sessions`;
    }

    return { points, reason };
  }

  if (isAcceptable) {
    const concern = sessionLength === "long" || sessionLength === "all-day"
      ? `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort may cause fatigue in very long sessions`
      : undefined;

    return {
      points: 9,
      reason: `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort is workable for ${sessionLength} sessions`,
      concern,
    };
  }

  if (sessionLength === "all-day" && comfort !== "great") {
    return {
      points: comfort === "good" ? 7 : 4,
      concern: `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort may not hold up for all-day use${isHeavy ? ` (${weight}g may feel heavy)` : ""}`,
    };
  }

  return {
    points: 5,
    concern: `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort may not suit ${sessionLength} sessions`,
  };
}

export const comfortSessionRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Comfort & Session",
  weight: 0.1, // Reduced from 0.15 to accommodate new rules
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const sessionLengths = answers["session-length"];

    // Find the longest session length selected (most demanding)
    const lengthOrder = ["short", "medium", "long", "all-day"];
    const longestSession = sessionLengths.reduce((longest, current) => {
      const currentIndex = lengthOrder.indexOf(current);
      const longestIndex = lengthOrder.indexOf(longest);
      return currentIndex > longestIndex ? current : longest;
    }, sessionLengths[0]);

    // Evaluate based on longest session (most demanding requirement)
    return evaluateSingleSessionComfort(longestSession, product);
  },
};

// =============================================================================
// Rule 5: Budget (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates if the audio product fits the user's budget tier.
 */
export const budgetRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Budget",
  weight: 0.1, // Reduced from 0.15 to accommodate new rules
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const budgetPrefs = answers.budget;
    const priceTier = product.core_attributes.price_tier;
    const priceRange = product.price_range_usd;

    // Map budget preferences to acceptable price tiers
    const budgetTierMap: Record<string, { ideal: PriceTier[]; acceptable: PriceTier[] }> = {
      budget: { ideal: ["budget"], acceptable: ["midrange"] },
      "mid-range": { ideal: ["midrange", "upper_midrange"], acceptable: ["budget", "premium"] },
      premium: { ideal: ["upper_midrange", "premium"], acceptable: ["midrange", "flagship"] },
      "no-limit": { ideal: ["premium", "flagship"], acceptable: ["upper_midrange", "midrange", "budget"] },
    };

    const priceDisplay =
      priceRange[0] === priceRange[1]
        ? `$${priceRange[0]}`
        : `$${priceRange[0]}-${priceRange[1]}`;

    // Check if product is ideal for any selected budget
    for (const budget of budgetPrefs) {
      const mapping = budgetTierMap[budget];
      if (mapping.ideal.includes(priceTier)) {
        if (budget === "no-limit" && (priceTier === "flagship" || priceTier === "premium")) {
          return { points: 15, reason: `Premium option at ${priceDisplay} with top-tier features` };
        }
        if (budget === "budget" && priceTier === "budget") {
          return { points: 15, reason: `Budget-friendly at ${priceDisplay}` };
        }
        return { points: 15, reason: `Good value at ${priceDisplay} matching your budget` };
      }
    }

    // Check if product is acceptable for any selected budget
    for (const budget of budgetPrefs) {
      const mapping = budgetTierMap[budget];
      if (mapping.acceptable.includes(priceTier)) {
        if (budget === "budget" && priceTier === "midrange") {
          return {
            points: 10,
            reason: `Mid-range pricing at ${priceDisplay}`,
            concern: "Slightly above budget tier but may offer better value",
          };
        }
        if (budget === "no-limit") {
          return { points: 12, reason: `Priced at ${priceDisplay}` };
        }
        return {
          points: 10,
          reason: `${priceDisplay} is near your budget preferences`,
        };
      }
    }

    // Outside all selected budgets
    const hasOnlyBudget = budgetPrefs.length === 1 && budgetPrefs[0] === "budget";
    if (hasOnlyBudget && (priceTier === "premium" || priceTier === "flagship")) {
      return {
        points: 3,
        concern: `${priceDisplay} significantly exceeds your budget preference`,
      };
    }

    return {
      points: 5,
      concern: `${priceDisplay} (${priceTier}) may not align with your budget preferences`,
    };
  },
};

// =============================================================================
// Rule 6: Bonus Points (weight: 0.05, max: 5 points)
// =============================================================================

/**
 * Awards bonus points for extra quality indicators.
 */
export const audioBonusPointsRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Bonus Points",
  weight: 0.05,
  maxPoints: 5,
  evaluate: (_answers, product): RuleResult => {
    let points = 0;
    const reasons: string[] = [];

    // +2 for value pick
    if (product.core_attributes.audio_value_pick) {
      points += 2;
      reasons.push("excellent value");
    }

    // +2 for wireless with good battery life
    const batteryLife = product.core_attributes.battery_life_hr;
    if (product.core_attributes.wireless && batteryLife && batteryLife > 30) {
      points += 2;
      reasons.push(`${batteryLife}hr battery life`);
    }

    // +1 for EQ support
    if (product.core_attributes.eq_support) {
      points += 1;
      reasons.push("EQ customization");
    }

    // Cap at max points
    points = Math.min(points, 5);

    if (points > 0) {
      return {
        points,
        reason: `Bonus: ${reasons.join(", ")}`,
      };
    }

    return { points: 0 };
  },
};

// =============================================================================
// Rule 7: Sound Signature (weight: 0.10, max: 10 points) - NEW
// =============================================================================

/**
 * Evaluates how well the audio product's sound signature matches user preference.
 * Only applies when user has specified sound signature preference.
 */
export const soundSignatureRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Sound Signature",
  weight: 0.1,
  maxPoints: 10,
  evaluate: (answers, product): RuleResult => {
    const prefs = answers["sound-signature"];

    // If not specified, give base points
    if (!prefs || prefs.length === 0) {
      return { points: 7, reason: "Sound signature preference not specified" };
    }

    const productSig = product.core_attributes.audio_sound_signature;

    // Direct match
    if (prefs.includes(productSig as typeof prefs[number])) {
      const sigName = productSig.replace(/_/g, "-");
      return {
        points: 10,
        reason: `${sigName.charAt(0).toUpperCase() + sigName.slice(1)} sound signature matches your preference`,
      };
    }

    // Similar signatures
    const similarSignatures: Record<string, string[]> = {
      neutral: ["bright"], // Both are "accurate" focused
      warm: ["bassy", "v_shaped"],
      v_shaped: ["bassy", "warm"],
      bright: ["neutral"],
      bassy: ["warm", "v_shaped"],
      mid_forward: ["neutral"],
    };

    const isSimilar = prefs.some((pref) =>
      similarSignatures[pref]?.includes(productSig)
    );

    if (isSimilar) {
      return {
        points: 7,
        reason: `${productSig.replace(/_/g, "-")} sound signature is similar to your preferences`,
      };
    }

    return {
      points: 4,
      concern: `${productSig.replace(/_/g, "-")} sound signature differs from your preferences`,
    };
  },
};

// =============================================================================
// Rule 8: Wireless Preference (weight: 0.08, max: 8 points) - NEW
// =============================================================================

/**
 * Evaluates if the audio product meets wireless connectivity preferences.
 * Only applies when user has specified wireless preference.
 */
export const wirelessPreferenceRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Wireless Preference",
  weight: 0.08,
  maxPoints: 8,
  evaluate: (answers, product): RuleResult => {
    const pref = answers["wireless-preference"];

    // If not specified, give base points
    if (!pref) {
      return { points: 6, reason: "Wireless preference not specified" };
    }

    const isWireless = product.core_attributes.wireless;
    const connectionTypes = product.core_attributes.connection_type;
    const hasWired =
      connectionTypes.includes("wired_3_5mm") ||
      connectionTypes.includes("wired_usb") ||
      connectionTypes.includes("wired_usb_c");

    switch (pref) {
      case "wireless-required":
        if (isWireless) {
          return { points: 8, reason: "Wireless connectivity as required" };
        }
        return { points: 0, concern: "Wired only - does not meet wireless requirement" };

      case "wireless-preferred":
        if (isWireless) {
          return { points: 8, reason: "Wireless connectivity available" };
        }
        if (hasWired) {
          return { points: 5, reason: "Wired connection (wireless preferred but not required)" };
        }
        return { points: 3, concern: "Limited connectivity options" };

      case "wired-preferred":
        if (hasWired) {
          if (!isWireless) {
            return { points: 8, reason: "Dedicated wired connection for reliability" };
          }
          return { points: 7, reason: "Wired option available (also has wireless)" };
        }
        return { points: 3, concern: "Wireless only - no wired option" };

      case "either":
        return { points: 7, reason: isWireless ? "Wireless connectivity" : "Wired connectivity" };
    }

    return { points: 5 };
  },
};

// =============================================================================
// Rule 9: Noise Environment (weight: 0.07, max: 7 points) - NEW
// =============================================================================

/**
 * Evaluates if the audio product suits the user's noise environment.
 * Only applies when user has specified noise environment.
 */
export const noiseEnvironmentRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Noise Environment",
  weight: 0.07,
  maxPoints: 7,
  evaluate: (answers, product): RuleResult => {
    const env = answers["noise-environment"];

    // If not specified, give base points
    if (!env) {
      return { points: 5, reason: "Noise environment not specified" };
    }

    const isolation = product.core_attributes.audio_isolation;
    const hasANC = product.core_attributes.audio_anc;
    const isOpenBack = product.core_attributes.audio_open_back;

    switch (env) {
      case "quiet":
        // Open-back actually preferred in quiet environments
        if (isOpenBack) {
          return { points: 7, reason: "Open-back design ideal for quiet listening spaces" };
        }
        // Isolation doesn't matter much in quiet environments
        return { points: 6, reason: "Suitable for quiet environments" };

      case "moderate":
        if (hasANC) {
          return { points: 7, reason: "ANC helps in moderate noise environments" };
        }
        if (isolation === "high") {
          return { points: 6, reason: "Good passive isolation for moderate noise" };
        }
        if (isolation === "medium") {
          return { points: 5, reason: "Moderate isolation suits your environment" };
        }
        if (isOpenBack) {
          return {
            points: 3,
            concern: "Open-back design may let in ambient noise",
          };
        }
        return { points: 4 };

      case "noisy":
        if (hasANC) {
          return { points: 7, reason: "Active noise cancellation for noisy environments" };
        }
        if (isolation === "high") {
          return { points: 6, reason: "High passive isolation for noisy spaces" };
        }
        if (isolation === "medium") {
          return {
            points: 4,
            concern: "Medium isolation may not fully block noise",
          };
        }
        if (isOpenBack || isolation === "low") {
          return {
            points: 2,
            concern: "Low isolation not ideal for noisy environments",
          };
        }
        return { points: 3 };
    }

    return { points: 4 };
  },
};

// =============================================================================
// Export All Audio Rules
// =============================================================================

/**
 * Complete set of audio scoring rules in evaluation order.
 * Weights sum to 1.0:
 * - Form Factor: 0.20
 * - Primary Use: 0.15
 * - Microphone: 0.15
 * - Comfort/Session: 0.10
 * - Budget: 0.10
 * - Bonus: 0.05
 * - Sound Signature: 0.10 (NEW)
 * - Wireless Preference: 0.08 (NEW)
 * - Noise Environment: 0.07 (NEW)
 */
export const audioRules: ScoringRule<AudioQuizAnswers, AudioProduct>[] = [
  formFactorRule,
  primaryUseRule,
  microphoneRule,
  comfortSessionRule,
  budgetRule,
  audioBonusPointsRule,
  soundSignatureRule,
  wirelessPreferenceRule,
  noiseEnvironmentRule,
];
