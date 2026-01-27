/**
 * Mouse Scoring Rules
 *
 * Scoring rules for matching mouse products against quiz answers.
 * Each rule evaluates a specific aspect of the match and returns points.
 */

import type { MouseProduct, MouseGripFit, MouseSizeClass } from "@/types/products";
import type { MouseQuizAnswers, ScoringRule, RuleResult } from "./types";

// =============================================================================
// Rule 1: Grip Fit (weight: 0.25, max: 25 points)
// =============================================================================

/**
 * Evaluates how well the mouse shape supports the user's grip style.
 */
export const gripFitRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Grip Fit",
  weight: 0.25,
  maxPoints: 25,
  evaluate: (answers, product): RuleResult => {
    const userGrip = answers["grip-style"];
    const supportedGrips = product.core_attributes.mouse_grip_fit;

    // Handle relaxed-claw: matches both claw and palm grips
    if (userGrip === "relaxed-claw") {
      const matchesClaw = supportedGrips.includes("claw");
      const matchesPalm = supportedGrips.includes("palm");

      if (matchesClaw && matchesPalm) {
        return {
          points: 25,
          reason: "Excellent for relaxed claw grip with support for both claw and palm positions",
        };
      }
      if (matchesClaw || matchesPalm) {
        return {
          points: 18,
          reason: matchesClaw
            ? "Good claw grip support for your relaxed claw style"
            : "Good palm support for your relaxed claw style",
          concern: matchesClaw
            ? "May lack palm support for full relaxed claw comfort"
            : "May lack claw support for full relaxed claw comfort",
        };
      }
      return {
        points: 5,
        concern: "Shape may not be ideal for relaxed claw grip",
      };
    }

    // Direct grip match
    const gripKey = userGrip as MouseGripFit;
    if (supportedGrips.includes(gripKey)) {
      // Check if it's a safe shape for extra confidence
      const isSafeShape = product.core_attributes.mouse_feel_tags.includes("safe_shape");
      if (isSafeShape) {
        return {
          points: 25,
          reason: `Great ${userGrip} grip support with a safe, versatile shape`,
        };
      }
      return {
        points: 22,
        reason: `Supports ${userGrip} grip well`,
      };
    }

    // Partial credit for adjacent grips
    const adjacentGrips: Record<MouseGripFit, MouseGripFit[]> = {
      palm: ["claw"],
      claw: ["palm", "fingertip"],
      fingertip: ["claw"],
    };

    const adjacent = adjacentGrips[gripKey] || [];
    const hasAdjacentSupport = adjacent.some((g) => supportedGrips.includes(g));

    if (hasAdjacentSupport) {
      return {
        points: 10,
        concern: `Designed for ${supportedGrips.join("/")} grip, may require adjustment for ${userGrip}`,
      };
    }

    return {
      points: 3,
      concern: `Shape is optimized for ${supportedGrips.join("/")} grip, not ideal for ${userGrip}`,
    };
  },
};

// =============================================================================
// Rule 2: Size/Hand Match (weight: 0.20, max: 20 points)
// =============================================================================

/**
 * Evaluates how well the mouse size matches the user's hand size.
 */
export const sizeHandMatchRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Size & Hand Match",
  weight: 0.2,
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const handSize = answers["hand-size"];
    const mouseSize = product.core_attributes.mouse_size_class;
    const feelTags = product.core_attributes.mouse_feel_tags;

    // Define ideal and acceptable sizes for each hand size
    const sizePreferences: Record<
      string,
      { ideal: MouseSizeClass[]; acceptable: MouseSizeClass[] }
    > = {
      small: {
        ideal: ["small"],
        acceptable: ["medium"],
      },
      medium: {
        ideal: ["medium"],
        acceptable: ["small", "large"],
      },
      large: {
        ideal: ["large"],
        acceptable: ["medium"],
      },
    };

    const prefs = sizePreferences[handSize];
    const isIdeal = prefs.ideal.includes(mouseSize);
    const isAcceptable = prefs.acceptable.includes(mouseSize);

    // Check for hand-size-friendly tags
    const smallFriendly = feelTags.includes("small_hands_friendly");
    const largeFriendly = feelTags.includes("large_hands_friendly");
    const hasMatchingTag =
      (handSize === "small" && smallFriendly) ||
      (handSize === "large" && largeFriendly);

    if (isIdeal) {
      if (hasMatchingTag) {
        return {
          points: 20,
          reason: `Perfect size for ${handSize} hands with confirmed fit`,
        };
      }
      return {
        points: 18,
        reason: `${mouseSize.charAt(0).toUpperCase() + mouseSize.slice(1)} size works great for ${handSize} hands`,
      };
    }

    if (isAcceptable) {
      // Bonus if it has the matching hand-friendly tag
      if (hasMatchingTag) {
        return {
          points: 16,
          reason: `${mouseSize.charAt(0).toUpperCase() + mouseSize.slice(1)} mouse that's confirmed ${handSize}-hands friendly`,
        };
      }
      return {
        points: 12,
        reason: `${mouseSize.charAt(0).toUpperCase() + mouseSize.slice(1)} size is workable for ${handSize} hands`,
        concern: `Might feel slightly ${handSize === "small" ? "large" : "small"} for your hands`,
      };
    }

    // Check if hand-friendly tag saves it
    if (hasMatchingTag) {
      return {
        points: 10,
        reason: `Despite ${mouseSize} size, designed to work with ${handSize} hands`,
        concern: "Size is not typical for your hand size but may still work",
      };
    }

    return {
      points: 4,
      concern: `${mouseSize.charAt(0).toUpperCase() + mouseSize.slice(1)} mouse may be ${
        handSize === "small" ? "too large" : "too small"
      } for ${handSize} hands`,
    };
  },
};

// =============================================================================
// Rule 3: Weight Preference (weight: 0.20, max: 20 points)
// =============================================================================

/**
 * Evaluates how well the mouse weight matches user preference.
 */
export const weightPreferenceRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Weight Preference",
  weight: 0.2,
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const preference = answers["weight-preference"];
    const weightClass = product.core_attributes.mouse_weight_class;
    const actualWeight = product.core_attributes.mouse_weight_g;

    // Map user preferences to acceptable weight classes
    const weightMap: Record<string, { ideal: string[]; acceptable: string[] }> = {
      ultralight: {
        ideal: ["ultralight"],
        acceptable: ["light"],
      },
      light: {
        ideal: ["ultralight", "light"],
        acceptable: ["mid"],
      },
      medium: {
        ideal: ["light", "mid"],
        acceptable: ["ultralight", "heavy"],
      },
      heavy: {
        ideal: ["mid", "heavy"],
        acceptable: ["light"],
      },
    };

    const prefs = weightMap[preference];
    const isIdeal = prefs.ideal.includes(weightClass);
    const isAcceptable = prefs.acceptable.includes(weightClass);

    // Format weight for display
    const weightDisplay = actualWeight ? `${actualWeight}g` : weightClass;

    if (isIdeal) {
      if (preference === "ultralight" && actualWeight && actualWeight < 55) {
        return {
          points: 20,
          reason: `Ultra-lightweight at ${weightDisplay} for maximum speed and control`,
        };
      }
      return {
        points: 18,
        reason: `${weightClass.charAt(0).toUpperCase() + weightClass.slice(1)} weight (${weightDisplay}) matches your ${preference} preference`,
      };
    }

    if (isAcceptable) {
      return {
        points: 12,
        reason: `${weightClass.charAt(0).toUpperCase() + weightClass.slice(1)} weight (${weightDisplay}) is close to your ${preference} preference`,
        concern:
          preference === "ultralight"
            ? "Slightly heavier than ideal for ultralight preference"
            : undefined,
      };
    }

    return {
      points: 4,
      concern: `${weightClass.charAt(0).toUpperCase() + weightClass.slice(1)} weight (${weightDisplay}) differs from your ${preference} preference`,
    };
  },
};

// =============================================================================
// Rule 4: Connection Type (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates if the mouse meets connection type requirements.
 */
export const connectionTypeRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Connection Type",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const preference = answers.wireless;
    const isWireless = product.core_attributes.wireless;
    const connectionTypes = product.core_attributes.connection_type;
    const hasWired =
      connectionTypes.includes("wired_usb") ||
      connectionTypes.includes("wired_usb_c");
    const batteryLife = product.core_attributes.battery_life_hr;

    if (preference === "either") {
      // Full points for anything, slight preference for versatile options
      if (isWireless && hasWired) {
        return {
          points: 15,
          reason: "Flexible with both wireless and wired connectivity",
        };
      }
      return {
        points: 13,
        reason: isWireless ? "Wireless connectivity" : "Wired connectivity",
      };
    }

    if (preference === "wireless") {
      if (isWireless) {
        const batteryNote =
          batteryLife && batteryLife > 70
            ? ` with excellent ${batteryLife}hr battery life`
            : batteryLife
              ? ` with ${batteryLife}hr battery life`
              : "";
        return {
          points: 15,
          reason: `Wireless connectivity${batteryNote}`,
        };
      }
      return {
        points: 0,
        concern: "Wired only - does not meet your wireless preference",
      };
    }

    // preference === "wired"
    if (hasWired) {
      if (!isWireless) {
        return {
          points: 15,
          reason: "Dedicated wired mouse for consistent, low-latency performance",
        };
      }
      return {
        points: 13,
        reason: "Supports wired connection for low-latency performance",
      };
    }

    return {
      points: 5,
      concern: "Wireless-only - no dedicated wired mode",
    };
  },
};

// =============================================================================
// Rule 5: Use Case Fit (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates how well the mouse fits the user's primary use case.
 */
export const useCaseFitRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Use Case Fit",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const primaryUse = answers["primary-use"];
    const gameFit = product.core_attributes.mouse_game_fit;
    const buttonCount = product.core_attributes.mouse_button_count_class;

    // Map primary use to relevant game_fit values
    const useCaseMap: Record<string, { primary: string[]; secondary: string[] }> = {
      precision: {
        primary: ["fps"],
        secondary: ["general"],
      },
      productivity: {
        primary: ["productivity"],
        secondary: ["general"],
      },
      creative: {
        primary: ["productivity"],
        secondary: ["general"],
      },
      mixed: {
        primary: ["general"],
        secondary: ["fps", "productivity", "moba", "mmo"],
      },
    };

    const mapping = useCaseMap[primaryUse];
    const hasPrimaryFit = mapping.primary.some((fit) => gameFit.includes(fit as typeof gameFit[number]));
    const hasSecondaryFit = mapping.secondary.some((fit) => gameFit.includes(fit as typeof gameFit[number]));

    // Bonus considerations
    const hasScrollFeatures = product.core_attributes.mouse_scroll_features.length > 0;
    const hasHighButtonCount = buttonCount === "high" || buttonCount === "mmo_grid";

    if (hasPrimaryFit) {
      let points = 15;
      let reason = "";

      switch (primaryUse) {
        case "precision":
          reason = "Optimized for precision work with excellent sensor and control";
          break;
        case "productivity":
          reason = hasScrollFeatures
            ? "Great for productivity with enhanced scroll features"
            : "Designed for productivity workflows";
          if (hasHighButtonCount) {
            reason += " and extra programmable buttons";
          }
          break;
        case "creative":
          reason = "Suitable for creative work with precise control";
          if (hasScrollFeatures) {
            reason += " and useful scroll features";
          }
          break;
        case "mixed":
          points = 13; // Slightly lower for generic "general" match
          reason = "Versatile all-rounder for mixed use";
          if (gameFit.length >= 3) {
            points = 15;
            reason = "Highly versatile across multiple use cases";
          }
          break;
      }

      return { points, reason };
    }

    if (hasSecondaryFit) {
      return {
        points: 10,
        reason: `Works for ${primaryUse} use, though not specifically optimized for it`,
      };
    }

    // Check if button count helps for certain use cases
    if (
      (primaryUse === "productivity" || primaryUse === "creative") &&
      hasHighButtonCount
    ) {
      return {
        points: 8,
        reason: "Extra buttons useful for productivity shortcuts",
        concern: "Not specifically designed for productivity workflows",
      };
    }

    return {
      points: 5,
      concern: `Primarily designed for ${gameFit.join("/")} rather than ${primaryUse} use`,
    };
  },
};

// =============================================================================
// Rule 6: Bonus Points (weight: 0.05, max: 5 points)
// =============================================================================

/**
 * Awards bonus points for extra quality indicators.
 */
export const bonusPointsRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Bonus Points",
  weight: 0.05,
  maxPoints: 5,
  evaluate: (_answers, product): RuleResult => {
    let points = 0;
    const reasons: string[] = [];

    // +2 for value pick
    if (product.core_attributes.mouse_value_pick) {
      points += 2;
      reasons.push("excellent value");
    }

    // +2 for flagship/great sensor
    const sensorClass = product.core_attributes.mouse_sensor_class;
    if (sensorClass === "flagship" || sensorClass === "great") {
      points += 2;
      reasons.push(sensorClass === "flagship" ? "flagship sensor" : "great sensor");
    }

    // +1 for great build quality
    if (product.core_attributes.mouse_build_quality === "great") {
      points += 1;
      reasons.push("premium build quality");
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
// Export All Mouse Rules
// =============================================================================

/**
 * Complete set of mouse scoring rules in evaluation order.
 */
export const mouseRules: ScoringRule<MouseQuizAnswers, MouseProduct>[] = [
  gripFitRule,
  sizeHandMatchRule,
  weightPreferenceRule,
  connectionTypeRule,
  useCaseFitRule,
  bonusPointsRule,
];
