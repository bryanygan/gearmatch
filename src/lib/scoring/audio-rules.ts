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
export const formFactorRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Form Factor",
  weight: 0.25,
  maxPoints: 25,
  evaluate: (answers, product): RuleResult => {
    const preference = answers["form-factor"];
    const audioType = product.core_attributes.audio_type;
    const isOpenBack = product.core_attributes.audio_open_back;
    const hasMic = product.core_attributes.audio_has_mic;

    // Map preferences to product types
    switch (preference) {
      case "over-ear":
        // Wants over-ear headset (with mic expected, closed back)
        if (audioType === "headset" && !isOpenBack) {
          return {
            points: 25,
            reason: "Over-ear headset with closed-back design",
          };
        }
        if (audioType === "headphone" && !isOpenBack && hasMic) {
          return {
            points: 22,
            reason: "Over-ear headphone with microphone",
          };
        }
        if (audioType === "headphone" && !isOpenBack) {
          return {
            points: 15,
            reason: "Over-ear closed-back headphone",
            concern: "No built-in microphone",
          };
        }
        if (audioType === "headset" && isOpenBack) {
          return {
            points: 12,
            reason: "Over-ear headset (open-back)",
            concern: "Open-back design leaks sound and offers less isolation",
          };
        }
        break;

      case "over-ear-headphone":
        // Wants headphones (no mic expected)
        if (audioType === "headphone" && !isOpenBack) {
          return {
            points: 25,
            reason: "Over-ear closed-back headphone for focused listening",
          };
        }
        if (audioType === "headphone" && isOpenBack) {
          return {
            points: 20,
            reason: "Over-ear headphone with open-back design for wider soundstage",
          };
        }
        if (audioType === "headset") {
          return {
            points: 15,
            reason: "Gaming headset (has microphone you may not need)",
            concern: "Includes mic you didn't ask for - consider headphones instead",
          };
        }
        break;

      case "iem":
        // Wants IEMs or earbuds
        if (audioType === "iem") {
          return {
            points: 25,
            reason: "In-ear monitors for portable, detailed audio",
          };
        }
        if (audioType === "earbud") {
          return {
            points: 20,
            reason: "Earbuds for comfortable, portable listening",
          };
        }
        // Over-ear types don't match at all
        return {
          points: 3,
          concern: "Over-ear form factor doesn't match your IEM/earbud preference",
        };

      case "open-back":
        // Wants open-back for soundstage
        if (isOpenBack) {
          const typeDesc =
            audioType === "headset" ? "headset" : "headphone";
          return {
            points: 25,
            reason: `Open-back ${typeDesc} for natural, wide soundstage`,
          };
        }
        return {
          points: 8,
          concern: "Closed-back design doesn't provide the open soundstage you prefer",
        };
    }

    // Default fallback for unmatched combinations
    return {
      points: 5,
      concern: `${audioType} form factor differs from your ${preference} preference`,
    };
  },
};

// =============================================================================
// Rule 2: Primary Use (weight: 0.20, max: 20 points)
// =============================================================================

/**
 * Evaluates how well the audio product fits the user's primary use case.
 */
export const primaryUseRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Primary Use",
  weight: 0.2,
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const primaryUse = answers["primary-use"];
    const competitiveRating = product.core_attributes.audio_competitive_fps;
    const immersionRating = product.core_attributes.audio_immersion;
    const micQuality = product.core_attributes.audio_mic_quality;
    const soundSig = product.core_attributes.audio_sound_signature;

    // Rating to score mapping
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
          return {
            points: 20,
            reason: "Excellent positional audio and imaging for competitive play",
          };
        }
        if (competitiveRating === "good") {
          return {
            points: 15,
            reason: "Good competitive audio with clear positioning",
          };
        }
        return {
          points: score,
          concern:
            competitiveRating === "ok"
              ? "Adequate but not optimized for competitive audio"
              : "May lack precision needed for competitive play",
        };
      }

      case "immersive": {
        const score = ratingScore[immersionRating] || 10;
        // Bonus for warm/bassy signatures in immersive use
        const sigBonus =
          soundSig === "warm" || soundSig === "bassy" || soundSig === "v_shaped"
            ? 2
            : 0;
        const finalScore = Math.min(score + sigBonus, 20);

        if (immersionRating === "great") {
          return {
            points: finalScore,
            reason:
              sigBonus > 0
                ? `Excellent immersion with ${soundSig} sound signature`
                : "Excellent immersive audio quality with engaging presentation",
          };
        }
        if (immersionRating === "good") {
          return {
            points: finalScore,
            reason: "Good immersive audio for engaging experiences",
          };
        }
        return {
          points: score,
          concern: "May not provide the immersive experience you're looking for",
        };
      }

      case "mixed": {
        // Average of competitive and immersion ratings
        const compScore = ratingScore[competitiveRating] || 10;
        const immScore = ratingScore[immersionRating] || 10;
        const avgScore = Math.round((compScore + immScore) / 2);

        if (competitiveRating === "good" && immersionRating === "good") {
          return {
            points: 18,
            reason: "Well-balanced for both competitive and immersive use",
          };
        }
        if (
          (competitiveRating === "great" && immersionRating !== "poor") ||
          (immersionRating === "great" && competitiveRating !== "poor")
        ) {
          return {
            points: 16,
            reason:
              competitiveRating === "great"
                ? "Excellent competitive audio, good for immersion too"
                : "Excellent immersion, capable for competitive use",
          };
        }
        return {
          points: avgScore,
          reason: "Usable for mixed purposes",
          concern:
            avgScore < 12 ? "May not excel at either competitive or immersive use" : undefined,
        };
      }

      case "streaming": {
        // Streaming prioritizes mic quality
        const micScore: Record<string, number> = {
          great: 20,
          good: 16,
          ok: 10,
          poor: 5,
        };
        const score = micQuality ? micScore[micQuality] || 8 : 5;

        if (micQuality === "great") {
          return {
            points: 20,
            reason: "Excellent microphone quality for streaming and content creation",
          };
        }
        if (micQuality === "good") {
          return {
            points: 16,
            reason: "Good microphone for streaming",
          };
        }
        if (!product.core_attributes.audio_has_mic) {
          return {
            points: 3,
            concern: "No microphone included - you'll need a separate mic for streaming",
          };
        }
        return {
          points: score,
          concern: "Microphone quality may not meet streaming standards",
        };
      }
    }

    return { points: 10 };
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
  weight: 0.2,
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
export const comfortSessionRule: ScoringRule<AudioQuizAnswers, AudioProduct> = {
  name: "Comfort & Session",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const sessionLength = answers["session-length"];
    const comfort = product.core_attributes.audio_comfort;
    const weight = product.core_attributes.audio_weight_g;

    // Comfort requirements by session length
    const comfortRequirements: Record<
      string,
      { ideal: string[]; acceptable: string[] }
    > = {
      short: {
        ideal: ["great", "good", "ok"],
        acceptable: ["poor"],
      },
      medium: {
        ideal: ["great", "good"],
        acceptable: ["ok"],
      },
      long: {
        ideal: ["great"],
        acceptable: ["good"],
      },
      "all-day": {
        ideal: ["great"],
        acceptable: [],
      },
    };

    const reqs = comfortRequirements[sessionLength];
    const isIdeal = reqs.ideal.includes(comfort);
    const isAcceptable = reqs.acceptable.includes(comfort);

    // Weight consideration for long sessions
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
        reason = `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort level suits ${sessionLength} sessions`;
      }

      return { points, reason };
    }

    if (isAcceptable) {
      const concern =
        sessionLength === "long" || sessionLength === "all-day"
          ? `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort may cause fatigue in very long sessions`
          : undefined;

      return {
        points: 9,
        reason: `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort is workable for ${sessionLength} sessions`,
        concern,
      };
    }

    // Not meeting comfort requirements
    if (sessionLength === "all-day" && comfort !== "great") {
      return {
        points: comfort === "good" ? 7 : 4,
        concern: `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort may not hold up for all-day use${isHeavy ? ` (${weight}g may feel heavy)` : ""}`,
      };
    }

    return {
      points: 5,
      concern: `${comfort.charAt(0).toUpperCase() + comfort.slice(1)} comfort rating may not suit ${sessionLength} sessions`,
    };
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
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const budget = answers.budget;
    const priceTier = product.core_attributes.price_tier;
    const priceRange = product.price_range_usd;

    // Map budget preferences to acceptable price tiers
    const budgetTierMap: Record<string, { ideal: PriceTier[]; acceptable: PriceTier[] }> = {
      budget: {
        ideal: ["budget"],
        acceptable: ["midrange"],
      },
      "mid-range": {
        ideal: ["midrange", "upper_midrange"],
        acceptable: ["budget", "premium"],
      },
      premium: {
        ideal: ["upper_midrange", "premium"],
        acceptable: ["midrange", "flagship"],
      },
      "no-limit": {
        ideal: ["premium", "flagship"],
        acceptable: ["upper_midrange", "midrange", "budget"],
      },
    };

    const mapping = budgetTierMap[budget];
    const isIdeal = mapping.ideal.includes(priceTier);
    const isAcceptable = mapping.acceptable.includes(priceTier);

    const priceDisplay =
      priceRange[0] === priceRange[1]
        ? `$${priceRange[0]}`
        : `$${priceRange[0]}-${priceRange[1]}`;

    if (isIdeal) {
      if (budget === "no-limit" && (priceTier === "flagship" || priceTier === "premium")) {
        return {
          points: 15,
          reason: `Premium option at ${priceDisplay} with top-tier features`,
        };
      }
      if (budget === "budget" && priceTier === "budget") {
        return {
          points: 15,
          reason: `Budget-friendly at ${priceDisplay}`,
        };
      }
      return {
        points: 15,
        reason: `Good value at ${priceDisplay} matching your ${budget} budget`,
      };
    }

    if (isAcceptable) {
      if (budget === "budget" && priceTier === "midrange") {
        return {
          points: 10,
          reason: `Mid-range pricing at ${priceDisplay}`,
          concern: "Slightly above budget tier but may offer better value",
        };
      }
      if (budget === "no-limit") {
        // No-limit users get decent points for any tier
        return {
          points: 12,
          reason: `Priced at ${priceDisplay}`,
        };
      }
      return {
        points: 10,
        reason: `${priceDisplay} is ${priceTier === "budget" ? "under" : "near"} your ${budget} budget`,
      };
    }

    // Outside budget
    if (budget === "budget" && (priceTier === "premium" || priceTier === "flagship")) {
      return {
        points: 3,
        concern: `${priceDisplay} significantly exceeds your budget preference`,
      };
    }

    return {
      points: 5,
      concern: `${priceDisplay} (${priceTier}) may not align with your ${budget} budget`,
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
// Export All Audio Rules
// =============================================================================

/**
 * Complete set of audio scoring rules in evaluation order.
 */
export const audioRules: ScoringRule<AudioQuizAnswers, AudioProduct>[] = [
  formFactorRule,
  primaryUseRule,
  microphoneRule,
  comfortSessionRule,
  budgetRule,
  audioBonusPointsRule,
];
