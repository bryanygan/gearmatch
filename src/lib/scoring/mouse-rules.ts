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
/**
 * Helper to evaluate a single grip style.
 */
function evaluateSingleGrip(
  userGrip: string,
  supportedGrips: MouseGripFit[],
  isSafeShape: boolean
): { points: number; reason?: string; concern?: string } {
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
}

export const gripFitRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Grip Fit",
  weight: 0.2, // Reduced from 0.25 to accommodate new rules
  maxPoints: 25,
  evaluate: (answers, product): RuleResult => {
    const userGrips = answers["grip-style"];
    const supportedGrips = product.core_attributes.mouse_grip_fit;
    const isSafeShape = product.core_attributes.mouse_feel_tags.includes("safe_shape");

    // Evaluate each selected grip and take the best score
    const results = userGrips.map((grip) => evaluateSingleGrip(grip, supportedGrips, isSafeShape));
    const bestResult = results.reduce((best, current) =>
      current.points > best.points ? current : best
    );

    // Bonus for products that support multiple selected grips well
    const goodMatches = results.filter((r) => r.points >= 18).length;
    if (goodMatches > 1 && bestResult.points < 25) {
      return {
        points: Math.min(bestResult.points + 3, 25),
        reason: bestResult.reason
          ? `${bestResult.reason} (versatile for multiple grips)`
          : "Versatile for multiple grip styles",
      };
    }

    return bestResult;
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
  weight: 0.17, // Reduced from 0.20 to accommodate new rules
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
  weight: 0.17, // Reduced from 0.20 to accommodate new rules
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const preferences = answers["weight-preference"];
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

    // Format weight for display
    const weightDisplay = actualWeight ? `${actualWeight}g` : weightClass;

    // Check if product matches any selected preference ideally
    for (const preference of preferences) {
      const prefs = weightMap[preference];
      if (prefs.ideal.includes(weightClass)) {
        if (preference === "ultralight" && actualWeight && actualWeight < 55) {
          return {
            points: 20,
            reason: `Ultra-lightweight at ${weightDisplay} for maximum speed and control`,
          };
        }
        return {
          points: 18,
          reason: `${weightClass.charAt(0).toUpperCase() + weightClass.slice(1)} weight (${weightDisplay}) matches your preference`,
        };
      }
    }

    // Check if product is acceptable for any selected preference
    for (const preference of preferences) {
      const prefs = weightMap[preference];
      if (prefs.acceptable.includes(weightClass)) {
        return {
          points: 12,
          reason: `${weightClass.charAt(0).toUpperCase() + weightClass.slice(1)} weight (${weightDisplay}) is close to your preferences`,
        };
      }
    }

    return {
      points: 4,
      concern: `${weightClass.charAt(0).toUpperCase() + weightClass.slice(1)} weight (${weightDisplay}) differs from your preferences`,
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
  weight: 0.13, // Reduced from 0.15 to accommodate new rules
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
/**
 * Helper to evaluate a single primary use case.
 */
function evaluateSingleUseCaseFit(
  primaryUse: string,
  product: MouseProduct
): { points: number; reason?: string; concern?: string } {
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
  if (!mapping) return { points: 5 };

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
        points = 13;
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

  if ((primaryUse === "productivity" || primaryUse === "creative") && hasHighButtonCount) {
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
}

export const useCaseFitRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Use Case Fit",
  weight: 0.08, // Reduced from 0.15 to accommodate new rules
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const primaryUses = answers["primary-use"];

    // Evaluate each selected use case and take the best score
    const results = primaryUses.map((use) => evaluateSingleUseCaseFit(use, product));
    const bestResult = results.reduce((best, current) =>
      current.points > best.points ? current : best
    );

    // Bonus for products that fit multiple selected use cases well
    const goodMatches = results.filter((r) => r.points >= 13).length;
    if (goodMatches > 1 && bestResult.points < 15) {
      return {
        points: Math.min(bestResult.points + 2, 15),
        reason: bestResult.reason
          ? `${bestResult.reason} (versatile for multiple uses)`
          : "Versatile for multiple use cases",
      };
    }

    return bestResult;
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
// Rule 7: Handedness (weight: 0.10, max: 10 points) - NEW
// =============================================================================

/**
 * Evaluates if the mouse shape matches the user's dominant hand.
 * Only applies when user has specified handedness preference.
 */
export const handednessRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Handedness",
  weight: 0.1,
  maxPoints: 10,
  evaluate: (answers, product): RuleResult => {
    const userHand = answers.handedness;
    // If not specified, treat as right-handed (most common)
    if (!userHand) {
      return { points: 8, reason: "Compatible with standard right-handed use" };
    }

    const mouseHand = product.core_attributes.mouse_handedness;

    // Perfect matches
    if (userHand === "right") {
      if (mouseHand === "right" || mouseHand === "ergo_right" || mouseHand === "ambi") {
        return { points: 10, reason: "Suitable for right-handed use" };
      }
      return {
        points: 2,
        concern: "Left-handed ergonomic design - not suitable for right hand",
      };
    }

    if (userHand === "left") {
      if (mouseHand === "left" || mouseHand === "ergo_left" || mouseHand === "ambi") {
        return { points: 10, reason: "Suitable for left-handed use" };
      }
      return {
        points: 2,
        concern: "Right-handed design - not suitable for left hand",
      };
    }

    // Ambidextrous user
    if (userHand === "ambidextrous") {
      if (mouseHand === "ambi") {
        return { points: 10, reason: "Symmetrical ambidextrous design" };
      }
      // Ergonomic still works, just not symmetric
      return {
        points: 7,
        reason: `${mouseHand.replace("_", " ")} design works but is not symmetric`,
      };
    }

    return { points: 5 };
  },
};

// =============================================================================
// Rule 8: Shape Profile (weight: 0.05, max: 5 points) - NEW
// =============================================================================

/**
 * Evaluates if the mouse shape profile matches user preference.
 * Only applies when user has specified shape preference in expert mode.
 */
export const shapeProfileRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Shape Profile",
  weight: 0.05,
  maxPoints: 5,
  evaluate: (answers, product): RuleResult => {
    const prefs = answers["shape-profile"];

    // If not specified or "any" selected, give base points
    if (!prefs || prefs.length === 0 || prefs.includes("any")) {
      return { points: 4, reason: "Shape profile not specified" };
    }

    const mouseProfile = product.core_attributes.mouse_shape_profile;

    // Check for direct match
    if (prefs.includes(mouseProfile as typeof prefs[number])) {
      const profileName = mouseProfile.replace(/_/g, " ");
      return {
        points: 5,
        reason: `${profileName.charAt(0).toUpperCase() + profileName.slice(1)} profile matches your preference`,
      };
    }

    // Partial credit for similar profiles
    const similarProfiles: Record<string, string[]> = {
      low_hump: ["mid_hump"],
      mid_hump: ["low_hump", "center_hump"],
      high_hump: ["rear_hump"],
      rear_hump: ["high_hump", "ergo_hump"],
      center_hump: ["mid_hump"],
      ergo_hump: ["rear_hump"],
    };

    const similarToPrefs = prefs.some((pref) =>
      similarProfiles[pref]?.includes(mouseProfile)
    );

    if (similarToPrefs) {
      return {
        points: 3,
        reason: `${mouseProfile.replace(/_/g, " ")} profile is similar to your preference`,
      };
    }

    return {
      points: 1,
      concern: `${mouseProfile.replace(/_/g, " ")} profile differs from your preferred shapes`,
    };
  },
};

// =============================================================================
// Rule 9: Gaming Genre (weight: 0.05, max: 5 points) - NEW
// =============================================================================

/**
 * Evaluates how well the mouse fits specific gaming genres.
 * Only applies when user has specified gaming genres in expert mode.
 */
export const gamingGenreRule: ScoringRule<MouseQuizAnswers, MouseProduct> = {
  name: "Gaming Genre",
  weight: 0.05,
  maxPoints: 5,
  evaluate: (answers, product): RuleResult => {
    const genres = answers["gaming-genre"];

    // If not specified, give base points
    if (!genres || genres.length === 0) {
      return { points: 3, reason: "Gaming genre not specified" };
    }

    const gameFit = product.core_attributes.mouse_game_fit;
    const buttonClass = product.core_attributes.mouse_button_count_class;

    // Check for direct matches
    const genreMatches = genres.filter((genre) => {
      if (genre === "general") return gameFit.includes("general");
      return gameFit.includes(genre as typeof gameFit[number]);
    });

    if (genreMatches.length > 0) {
      // Special handling for MMO
      if (genres.includes("mmo")) {
        if (buttonClass === "mmo_grid") {
          return {
            points: 5,
            reason: "MMO grid with 12+ buttons perfect for MMO gaming",
          };
        }
        if (buttonClass === "high") {
          return {
            points: 4,
            reason: "Good button count for MMO abilities",
          };
        }
        if (gameFit.includes("mmo")) {
          return { points: 4, reason: "Designed for MMO gaming" };
        }
      }

      // FPS gets bonus for lightweight and precision
      if (genres.includes("fps") && gameFit.includes("fps")) {
        return { points: 5, reason: "Optimized for FPS precision aiming" };
      }

      return {
        points: 4,
        reason: `Well-suited for ${genreMatches.join("/")} gaming`,
      };
    }

    // General fallback
    if (gameFit.includes("general")) {
      return {
        points: 3,
        reason: "Versatile mouse suitable for various games",
      };
    }

    return {
      points: 2,
      concern: `Optimized for ${gameFit.join("/")} rather than ${genres.join("/")}`,
    };
  },
};

// =============================================================================
// Export All Mouse Rules
// =============================================================================

/**
 * Complete set of mouse scoring rules in evaluation order.
 * Weights sum to 1.0:
 * - Grip Fit: 0.20
 * - Size/Hand: 0.17
 * - Weight: 0.17
 * - Connection: 0.13
 * - Use Case: 0.08
 * - Bonus: 0.05
 * - Handedness: 0.10 (NEW)
 * - Shape Profile: 0.05 (NEW)
 * - Gaming Genre: 0.05 (NEW)
 */
export const mouseRules: ScoringRule<MouseQuizAnswers, MouseProduct>[] = [
  gripFitRule,
  sizeHandMatchRule,
  weightPreferenceRule,
  connectionTypeRule,
  useCaseFitRule,
  bonusPointsRule,
  handednessRule,
  shapeProfileRule,
  gamingGenreRule,
];
