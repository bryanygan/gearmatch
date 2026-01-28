/**
 * Keyboard Scoring Rules
 *
 * Scoring rules for matching keyboard products against quiz answers.
 * Each rule evaluates a specific aspect of the match and returns points.
 */

import type { KeyboardProduct } from "@/types/products";
import type { KeyboardQuizAnswers, ScoringRule, RuleResult } from "./types";

// =============================================================================
// Rule 1: Primary Use Match (weight: 0.25, max: 25 points)
// =============================================================================

/**
 * Evaluates how well the keyboard matches the user's primary use case.
 */
export const primaryUseRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Primary Use",
  weight: 0.25,
  maxPoints: 25,
  evaluate: (answers, product): RuleResult => {
    const use = answers["primary-use"];
    const useFit = product.core_attributes.keyboard_use_fit;
    const features = product.core_attributes.keyboard_feature_tags;
    const gamingScore = product.core_attributes.keyboard_gaming_score;
    const officeScore = product.core_attributes.keyboard_office_score;
    const programmingScore = product.core_attributes.keyboard_programming_score;

    if (use === "competitive-gaming") {
      // Need rapid trigger, low latency, good gaming features
      const hasRapidTrigger = product.core_attributes.keyboard_supports_rapid_trigger;
      const hasLowLatency = product.core_attributes.latency_class === "very_low";
      const hasGamingFeatures = features.includes("gaming_grade_latency");

      if (hasRapidTrigger && hasLowLatency) {
        return {
          points: 25,
          reason: "Rapid Trigger and ultra-low latency for competitive gaming",
        };
      }
      if (hasLowLatency && (gamingScore ?? 0) >= 8.5) {
        return {
          points: 22,
          reason: "Excellent gaming performance with low latency",
        };
      }
      if (useFit.includes("competitive_gaming")) {
        return {
          points: 18,
          reason: "Designed for competitive gaming",
        };
      }
      if (useFit.includes("casual_gaming")) {
        return {
          points: 12,
          concern: "Better suited for casual gaming than competitive",
        };
      }
      return {
        points: 5,
        concern: "Not optimized for competitive gaming",
      };
    }

    if (use === "casual-gaming") {
      if (useFit.includes("casual_gaming") || useFit.includes("competitive_gaming")) {
        const hasRGB = product.core_attributes.keyboard_has_rgb;
        if ((gamingScore ?? 0) >= 8 && hasRGB) {
          return {
            points: 25,
            reason: "Great gaming performance with RGB customization",
          };
        }
        return {
          points: 22,
          reason: "Well-suited for gaming",
        };
      }
      if ((gamingScore ?? 0) >= 7) {
        return {
          points: 15,
          reason: "Capable gaming performance",
        };
      }
      return {
        points: 8,
        concern: "Not primarily designed for gaming",
      };
    }

    if (use === "productivity") {
      if (useFit.includes("office") || useFit.includes("productivity")) {
        const isQuiet = features.includes("quiet") ||
          (product.core_attributes.keyboard_typing_noise_dba ?? 100) < 45;
        if ((officeScore ?? 0) >= 8 && isQuiet) {
          return {
            points: 25,
            reason: "Excellent for office use with quiet operation",
          };
        }
        return {
          points: 22,
          reason: "Well-suited for productivity work",
        };
      }
      if ((officeScore ?? 0) >= 7.5) {
        return {
          points: 18,
          reason: "Good productivity keyboard",
        };
      }
      return {
        points: 10,
        concern: "May not be ideal for office/productivity use",
      };
    }

    if (use === "programming") {
      if (useFit.includes("programming") || useFit.includes("typing")) {
        const hasGoodTyping = features.includes("gasket_mount") || features.includes("premium");
        if ((programmingScore ?? 0) >= 8 && hasGoodTyping) {
          return {
            points: 25,
            reason: "Excellent typing experience for programming",
          };
        }
        return {
          points: 22,
          reason: "Well-suited for programming and typing",
        };
      }
      if ((programmingScore ?? 0) >= 7.5) {
        return {
          points: 18,
          reason: "Good for programming work",
        };
      }
      return {
        points: 10,
        concern: "May not provide ideal typing experience for programming",
      };
    }

    return { points: 10 };
  },
};

// =============================================================================
// Rule 2: Form Factor Match (weight: 0.20, max: 20 points)
// =============================================================================

/**
 * Evaluates how well the keyboard form factor matches user preference.
 */
export const formFactorRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Form Factor",
  weight: 0.2,
  maxPoints: 20,
  evaluate: (answers, product): RuleResult => {
    const preference = answers["form-factor"];
    const formFactor = product.core_attributes.keyboard_form_factor;

    const matches: Record<string, string[]> = {
      "full-size": ["full_size_100_percent"],
      "tkl": ["tkl_80_percent"],
      "75-percent": ["75_percent", "96_percent"],
      "60-65-percent": ["60_percent", "65_percent"],
    };

    const acceptable: Record<string, string[]> = {
      "full-size": ["96_percent"],
      "tkl": ["75_percent", "96_percent"],
      "75-percent": ["tkl_80_percent", "65_percent"],
      "60-65-percent": ["75_percent"],
    };

    if (matches[preference]?.includes(formFactor)) {
      return {
        points: 20,
        reason: `Perfect ${formFactor.replace(/_/g, " ").replace("percent", "%")} layout match`,
      };
    }

    if (acceptable[preference]?.includes(formFactor)) {
      return {
        points: 14,
        reason: `Close size match with ${formFactor.replace(/_/g, " ").replace("percent", "%")} layout`,
        concern: "Slightly different layout than preferred",
      };
    }

    return {
      points: 5,
      concern: `Layout (${formFactor.replace(/_/g, " ")}) differs from your ${preference} preference`,
    };
  },
};

// =============================================================================
// Rule 3: Switch Type Match (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates how well the switch type matches user preference.
 */
export const switchTypeRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Switch Type",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const preference = answers["switch-type"];
    const switchFeel = product.core_attributes.keyboard_switch_feel;
    const isHotSwap = product.core_attributes.keyboard_hot_swappable;

    if (preference === "no-preference") {
      if (isHotSwap) {
        return {
          points: 15,
          reason: "Hot-swappable switches let you try different types",
        };
      }
      return {
        points: 12,
        reason: "Comes with quality switches",
      };
    }

    if (preference === switchFeel) {
      if (isHotSwap) {
        return {
          points: 15,
          reason: `${switchFeel.charAt(0).toUpperCase() + switchFeel.slice(1)} switches with hot-swap flexibility`,
        };
      }
      return {
        points: 14,
        reason: `Matches your ${switchFeel} switch preference`,
      };
    }

    // Hot-swappable keyboards get partial credit since user can change switches
    if (isHotSwap) {
      return {
        points: 10,
        reason: "Hot-swappable — can install your preferred switch type",
        concern: `Stock switches are ${switchFeel}, not ${preference}`,
      };
    }

    return {
      points: 4,
      concern: `Has ${switchFeel} switches, you preferred ${preference}`,
    };
  },
};

// =============================================================================
// Rule 4: Gaming Features (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates gaming-specific features based on user needs.
 */
export const gamingFeaturesRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Gaming Features",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const need = answers["gaming-features"];
    const hasRapidTrigger = product.core_attributes.keyboard_supports_rapid_trigger;
    const hasSOCD = product.core_attributes.keyboard_supports_socd;
    const hasAnalog = product.core_attributes.keyboard_supports_analog;
    const pollingRate = parseInt(product.core_attributes.keyboard_polling_rate_max_hz);
    const latency = product.core_attributes.keyboard_single_key_latency_ms ?? 10;

    if (need === "essential") {
      let score = 0;
      const reasons: string[] = [];
      const concerns: string[] = [];

      if (hasRapidTrigger) {
        score += 5;
        reasons.push("Rapid Trigger");
      } else {
        concerns.push("No Rapid Trigger");
      }

      if (pollingRate >= 8000) {
        score += 4;
        reasons.push("8K polling");
      } else if (pollingRate >= 4000) {
        score += 2;
        reasons.push(`${pollingRate}Hz polling`);
      }

      if (latency <= 1) {
        score += 3;
        reasons.push("Sub-1ms latency");
      } else if (latency <= 3) {
        score += 2;
      }

      if (hasSOCD) {
        score += 2;
        reasons.push("SOCD support");
      }

      if (hasAnalog) {
        score += 1;
        reasons.push("Analog input");
      }

      return {
        points: Math.min(score, 15),
        reason: reasons.length > 0 ? reasons.join(", ") : undefined,
        concern: concerns.length > 0 && score < 10 ? concerns.join(", ") : undefined,
      };
    }

    if (need === "nice-to-have") {
      let score = 8; // Base score for any keyboard
      const reasons: string[] = [];

      if (hasRapidTrigger) {
        score += 4;
        reasons.push("Has Rapid Trigger");
      }
      if (pollingRate >= 1000) {
        score += 2;
        reasons.push("Good polling rate");
      }
      if (latency <= 5) {
        score += 1;
      }

      return {
        points: Math.min(score, 15),
        reason: reasons.length > 0 ? reasons.join(", ") : "Solid gaming performance",
      };
    }

    // not-important
    return {
      points: 12,
      reason: "Gaming features not a priority",
    };
  },
};

// =============================================================================
// Rule 5: Connectivity Match (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates connectivity options based on user preference.
 */
export const connectivityRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Connectivity",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const preference = answers.connectivity;
    const isWireless = product.core_attributes.wireless;
    const connections = product.core_attributes.connection_type;
    const features = product.core_attributes.keyboard_feature_tags;
    const hasBluetooth = connections.includes("bluetooth");
    const has24GHz = connections.includes("wireless_2_4_dongle");
    const hasMultiDevice = features.includes("multi_device_bluetooth");

    if (preference === "wireless-essential") {
      if (!isWireless) {
        return {
          points: 2,
          concern: "Wired only — no wireless option",
        };
      }
      if (has24GHz && hasBluetooth && hasMultiDevice) {
        return {
          points: 15,
          reason: "Full wireless with 2.4GHz, Bluetooth, and multi-device support",
        };
      }
      if (has24GHz && hasBluetooth) {
        return {
          points: 14,
          reason: "Dual wireless with 2.4GHz and Bluetooth",
        };
      }
      if (has24GHz || hasBluetooth) {
        return {
          points: 12,
          reason: `Wireless via ${has24GHz ? "2.4GHz receiver" : "Bluetooth"}`,
        };
      }
    }

    if (preference === "wireless-preferred") {
      if (isWireless) {
        if (has24GHz && hasBluetooth) {
          return {
            points: 15,
            reason: "Versatile wireless with 2.4GHz and Bluetooth options",
          };
        }
        return {
          points: 13,
          reason: "Wireless capable",
        };
      }
      return {
        points: 8,
        concern: "Wired only, but you preferred wireless",
      };
    }

    if (preference === "wired-preferred") {
      if (!isWireless) {
        return {
          points: 15,
          reason: "Reliable wired connection, no charging needed",
        };
      }
      // Wireless keyboards can still be used wired
      if (connections.includes("wired_usb")) {
        return {
          points: 13,
          reason: "Can be used wired, with wireless option available",
        };
      }
      return {
        points: 8,
        concern: "Primarily wireless keyboard",
      };
    }

    // no-preference
    if (isWireless && connections.includes("wired_usb")) {
      return {
        points: 15,
        reason: "Flexible wired/wireless connectivity",
      };
    }
    return {
      points: 12,
      reason: "Standard connectivity options",
    };
  },
};

// =============================================================================
// Rule 6: Priority Feature Match (weight: 0.10, max: 10 points)
// =============================================================================

/**
 * Evaluates the user's single most important feature priority.
 */
export const priorityFeatureRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Priority Feature",
  weight: 0.1,
  maxPoints: 10,
  evaluate: (answers, product): RuleResult => {
    const priority = answers["priority-feature"];
    const features = product.core_attributes.keyboard_feature_tags;
    const latency = product.core_attributes.keyboard_single_key_latency_ms ?? 10;
    const noise = product.core_attributes.keyboard_typing_noise_dba ?? 60;
    const isHotSwap = product.core_attributes.keyboard_hot_swappable;
    const hasRGB = product.core_attributes.keyboard_has_rgb;
    const hasQMK = features.includes("qmk_via");
    const mountStyle = product.core_attributes.keyboard_mount_style;

    if (priority === "performance") {
      if (latency <= 1) {
        return { points: 10, reason: "Top-tier latency performance" };
      }
      if (latency <= 3) {
        return { points: 8, reason: "Excellent performance" };
      }
      if (latency <= 5) {
        return { points: 6, reason: "Good performance" };
      }
      return { points: 3, concern: "Higher latency than performance-focused options" };
    }

    if (priority === "typing-feel") {
      const hasGasket = mountStyle === "gasket" || mountStyle === "double_gasket";
      const isPremium = features.includes("premium") || features.includes("enthusiast");

      if (hasGasket && isPremium) {
        return { points: 10, reason: "Premium gasket-mount typing experience" };
      }
      if (hasGasket) {
        return { points: 8, reason: "Gasket-mounted for better typing feel" };
      }
      if (isPremium) {
        return { points: 7, reason: "Premium build quality" };
      }
      return { points: 4, concern: "Standard typing feel, not premium-focused" };
    }

    if (priority === "customization") {
      let score = 0;
      const reasons: string[] = [];

      if (isHotSwap) { score += 4; reasons.push("hot-swap"); }
      if (hasRGB) { score += 2; reasons.push("RGB"); }
      if (hasQMK) { score += 3; reasons.push("QMK/VIA"); }
      if (features.includes("onboard_memory")) { score += 1; reasons.push("profiles"); }

      return {
        points: Math.min(score, 10),
        reason: reasons.length > 0 ? `Customizable: ${reasons.join(", ")}` : undefined,
        concern: score < 5 ? "Limited customization options" : undefined,
      };
    }

    if (priority === "quiet") {
      if (noise < 40) {
        return { points: 10, reason: "Very quiet operation" };
      }
      if (noise < 50) {
        return { points: 8, reason: "Quiet typing" };
      }
      if (noise < 55) {
        return { points: 5, reason: "Moderate noise level" };
      }
      return { points: 2, concern: "Louder than quiet-focused options" };
    }

    return { points: 5 };
  },
};

// =============================================================================
// Rule 7: Budget Match (weight: 0.10, max: 10 points — bonus, no penalty)
// =============================================================================

/**
 * Provides bonus points for products within budget, no penalty for over-budget.
 */
export const budgetMatchRule: ScoringRule<KeyboardQuizAnswers, KeyboardProduct> = {
  name: "Budget Match",
  weight: 0.1,
  maxPoints: 10,
  evaluate: (answers, product): RuleResult => {
    const budgetPref = answers.budget;
    const [minPrice, maxPrice] = product.price_range_usd;
    const avgPrice = (minPrice + maxPrice) / 2;
    const isValuePick = product.core_attributes.keyboard_value_pick;

    const budgetRanges: Record<string, [number, number]> = {
      budget: [0, 100],
      "mid-range": [100, 175],
      premium: [175, 250],
      enthusiast: [250, 1000],
    };

    const [budgetMin, budgetMax] = budgetRanges[budgetPref];
    const isInBudget = avgPrice >= budgetMin && avgPrice <= budgetMax;
    const isUnderBudget = avgPrice < budgetMin;
    const isOverBudget = avgPrice > budgetMax;

    if (isInBudget) {
      if (isValuePick) {
        return { points: 10, reason: "Excellent value within your budget" };
      }
      return { points: 8, reason: "Within your budget range" };
    }

    if (isUnderBudget) {
      if (isValuePick) {
        return { points: 9, reason: "Great value under your budget" };
      }
      return { points: 7, reason: "Under budget — savings available" };
    }

    // Over budget — still give some points, just note the concern
    const overAmount = avgPrice - budgetMax;
    if (overAmount <= 50) {
      return {
        points: 5,
        concern: `Slightly over budget (~$${Math.round(overAmount)} more)`,
      };
    }
    return {
      points: 3,
      concern: `Over budget (~$${Math.round(overAmount)} more)`,
    };
  },
};

// =============================================================================
// Combined Rules Export
// =============================================================================

/**
 * All keyboard scoring rules in evaluation order.
 */
export const keyboardRules: ScoringRule<KeyboardQuizAnswers, KeyboardProduct>[] = [
  primaryUseRule,
  formFactorRule,
  switchTypeRule,
  gamingFeaturesRule,
  connectivityRule,
  priorityFeatureRule,
  budgetMatchRule,
];
