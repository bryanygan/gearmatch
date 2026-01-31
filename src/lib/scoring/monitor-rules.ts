/**
 * Monitor Scoring Rules
 *
 * Scoring rules for matching monitor products against quiz answers.
 * Each rule evaluates a specific aspect of the match and returns points.
 */

import type { MonitorProduct, MonitorSizeClass, MonitorResolutionClass, MonitorPanelType } from "@/types/monitor";
import type { MonitorQuizAnswers, ScoringRule, RuleResult } from "./types";

// =============================================================================
// Rule 1: Primary Use Fit (weight: 0.25, max: 25 points)
// =============================================================================

/**
 * Evaluates how well the monitor fits the user's primary use case.
 * Uses RTINGS scores for different use cases.
 */
export const primaryUseFitRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Primary Use Fit",
  weight: 0.25,
  maxPoints: 25,
  evaluate: (answers, product): RuleResult => {
    const uses = answers["primary-use"];
    const attrs = product.core_attributes;

    let totalScore = 0;
    let matchCount = 0;
    const reasons: string[] = [];
    const concerns: string[] = [];

    for (const use of uses) {
      let useScore = 0;

      switch (use) {
        case "gaming": {
          const gamingScore = attrs.monitor_pc_gaming_score || attrs.monitor_console_gaming_score || 0;
          if (gamingScore >= 8.5) {
            useScore = 25;
            reasons.push("Excellent gaming performance");
          } else if (gamingScore >= 7.5) {
            useScore = 20;
            reasons.push("Great gaming performance");
          } else if (gamingScore >= 6.5) {
            useScore = 15;
          } else {
            useScore = 8;
            concerns.push("Gaming performance may be limited");
          }
          break;
        }
        case "content-creation": {
          const editingScore = attrs.monitor_editing_score || 0;
          const colorScore = attrs.monitor_color_accuracy_score || 0;
          const avgScore = (editingScore + colorScore) / 2;
          if (avgScore >= 8.5) {
            useScore = 25;
            reasons.push("Excellent for content creation");
          } else if (avgScore >= 7.5) {
            useScore = 20;
            reasons.push("Great color accuracy for editing");
          } else if (avgScore >= 6.5) {
            useScore = 15;
          } else {
            useScore = 8;
            concerns.push("Color accuracy may be limited for professional work");
          }
          break;
        }
        case "office": {
          const officeScore = attrs.monitor_office_score || 0;
          if (officeScore >= 8) {
            useScore = 25;
            reasons.push("Excellent for office work");
          } else if (officeScore >= 7) {
            useScore = 20;
            reasons.push("Great for productivity");
          } else if (officeScore >= 6) {
            useScore = 15;
          } else {
            useScore = 10;
          }
          break;
        }
        case "mixed": {
          const overallScore = attrs.monitor_overall_score || 0;
          const gamingScore = attrs.monitor_pc_gaming_score || 0;
          const officeScore = attrs.monitor_office_score || 0;
          const editingScore = attrs.monitor_editing_score || 0;
          const avgScore = (overallScore + gamingScore + officeScore + editingScore) / 4;

          if (avgScore >= 8) {
            useScore = 25;
            reasons.push("Versatile across use cases");
          } else if (avgScore >= 7) {
            useScore = 20;
            reasons.push("Good all-around performance");
          } else if (avgScore >= 6) {
            useScore = 15;
          } else {
            useScore = 10;
          }
          break;
        }
      }

      totalScore += useScore;
      matchCount++;
    }

    const avgScore = matchCount > 0 ? Math.round(totalScore / matchCount) : 10;
    const finalScore = Math.min(avgScore, 25);

    return {
      points: finalScore,
      reason: reasons[0],
      concern: concerns[0],
    };
  },
};

// =============================================================================
// Rule 2: Size Match (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates how well the monitor size matches the user's preference.
 */
export const sizeMatchRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Size Match",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const preference = answers["size-preference"];
    const monitorSizeClass = product.core_attributes.monitor_size_class;
    const sizeInches = product.core_attributes.monitor_size_inches;

    if (preference === "any") {
      return { points: 12, reason: "Size fits your flexible preference" };
    }

    const sizeMap: Record<string, MonitorSizeClass[]> = {
      compact: ["compact"],
      standard: ["standard"],
      large: ["large"],
      ultrawide: ["ultrawide", "super_ultrawide"],
    };

    const idealSizes = sizeMap[preference] || [];
    const isIdeal = idealSizes.includes(monitorSizeClass);

    // Adjacent size classes
    const adjacentMap: Record<string, MonitorSizeClass[]> = {
      compact: ["standard"],
      standard: ["compact", "large"],
      large: ["standard", "ultrawide"],
      ultrawide: ["large", "super_ultrawide"],
    };

    const adjacentSizes = adjacentMap[preference] || [];
    const isAdjacent = adjacentSizes.includes(monitorSizeClass);

    if (isIdeal) {
      return {
        points: 15,
        reason: `${sizeInches}" is ideal for your ${preference} preference`,
      };
    }

    if (isAdjacent) {
      return {
        points: 10,
        reason: `${sizeInches}" is close to your ${preference} preference`,
        concern: `Slightly ${sizeInches < 27 ? "smaller" : "larger"} than ideal`,
      };
    }

    return {
      points: 5,
      concern: `${sizeInches}" may be ${sizeInches < 27 ? "smaller" : "larger"} than preferred`,
    };
  },
};

// =============================================================================
// Rule 3: Resolution Match (weight: 0.15, max: 15 points)
// =============================================================================

/**
 * Evaluates how well the resolution matches the user's preference.
 * Also considers size/resolution pairing (e.g., 4K on 32"+).
 */
export const resolutionMatchRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Resolution Match",
  weight: 0.15,
  maxPoints: 15,
  evaluate: (answers, product): RuleResult => {
    const preference = answers.resolution;
    const resClass = product.core_attributes.monitor_resolution_class;
    const sizeInches = product.core_attributes.monitor_size_inches;

    if (preference === "any") {
      return { points: 12, reason: "Resolution meets your flexible preference" };
    }

    const resolutionMatch = preference === resClass;

    // Check if size/resolution pairing is ideal
    const idealPairings: Record<MonitorResolutionClass, number[]> = {
      "1080p": [24, 25, 27],
      "1440p": [27, 28, 32],
      "4k": [27, 28, 32, 34, 38, 42, 48],
      "5k": [27, 32],
      "8k": [32, 65],
    };

    const isIdealPairing = idealPairings[resClass]?.some(
      (size) => Math.abs(sizeInches - size) <= 2
    );

    if (resolutionMatch) {
      if (isIdealPairing) {
        return {
          points: 15,
          reason: `${resClass} resolution at ${sizeInches}" is an excellent combination`,
        };
      }
      return {
        points: 13,
        reason: `${resClass} resolution as requested`,
      };
    }

    // Adjacent resolutions
    const adjacent: Record<string, MonitorResolutionClass[]> = {
      "1080p": ["1440p"],
      "1440p": ["1080p", "4k"],
      "4k": ["1440p", "5k"],
    };

    const isAdjacent = adjacent[preference]?.includes(resClass);
    if (isAdjacent) {
      const isHigher = resClass === "4k" || (resClass === "1440p" && preference === "1080p");
      return {
        points: 9,
        reason: isHigher ? `Higher ${resClass} resolution available` : undefined,
        concern: !isHigher ? `Lower ${resClass} resolution than preferred` : undefined,
      };
    }

    return {
      points: 5,
      concern: `${resClass} differs from your ${preference} preference`,
    };
  },
};

// =============================================================================
// Rule 4: Refresh Rate Match (weight: 0.12, max: 12 points)
// =============================================================================

/**
 * Evaluates refresh rate for gaming use cases.
 */
export const refreshRateMatchRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Refresh Rate Match",
  weight: 0.12,
  maxPoints: 12,
  evaluate: (answers, product): RuleResult => {
    const preference = answers["refresh-rate"];
    const uses = answers["primary-use"];
    const maxHz = product.core_attributes.monitor_max_refresh_hz;

    // Skip if not gaming and no preference
    const isGaming = uses.includes("gaming") || uses.includes("mixed");
    if (!isGaming && (!preference || preference === "any")) {
      return { points: 10, reason: "Refresh rate adequate for your use case" };
    }

    if (preference === "any" || !preference) {
      // For gamers with no preference, reward higher refresh
      if (maxHz >= 144) {
        return { points: 12, reason: `Smooth ${maxHz}Hz for responsive gaming` };
      }
      return { points: 8 };
    }

    const refreshMap: Record<string, { min: number; ideal: number }> = {
      basic: { min: 60, ideal: 75 },
      standard: { min: 120, ideal: 165 },
      high: { min: 240, ideal: 360 },
    };

    const target = refreshMap[preference];
    if (!target) {
      return { points: 10 };
    }

    if (maxHz >= target.ideal) {
      return {
        points: 12,
        reason: `${maxHz}Hz exceeds your ${preference} refresh rate needs`,
      };
    }

    if (maxHz >= target.min) {
      return {
        points: 10,
        reason: `${maxHz}Hz meets your ${preference} refresh rate needs`,
      };
    }

    return {
      points: 5,
      concern: `${maxHz}Hz may feel less smooth for ${preference} use`,
    };
  },
};

// =============================================================================
// Rule 5: Panel Type Match (weight: 0.08, max: 8 points)
// =============================================================================

/**
 * Evaluates panel type preference.
 */
export const panelTypeMatchRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Panel Type Match",
  weight: 0.08,
  maxPoints: 8,
  evaluate: (answers, product): RuleResult => {
    const preferences = answers["panel-type"];
    const panelType = product.core_attributes.monitor_panel_type;

    if (!preferences || preferences.includes("any")) {
      return { points: 6, reason: "Panel type fits your needs" };
    }

    const panelLower = panelType.toLowerCase();

    for (const pref of preferences) {
      switch (pref) {
        case "ips":
          if (panelLower === "ips") {
            return { points: 8, reason: "IPS panel with great colors and viewing angles" };
          }
          break;
        case "va":
          if (panelLower === "va") {
            return { points: 8, reason: "VA panel with deep blacks and high contrast" };
          }
          break;
        case "oled":
          if (panelLower === "oled" || panelLower === "qd-oled") {
            return { points: 8, reason: "OLED panel with perfect blacks and instant response" };
          }
          break;
      }
    }

    // Partial match for similar technologies
    if (preferences.includes("oled") && (panelLower === "mini-led")) {
      return {
        points: 5,
        reason: "Mini-LED offers HDR quality approaching OLED",
        concern: "Not a true OLED panel",
      };
    }

    return {
      points: 4,
      concern: `${panelType} differs from your preferred panel type`,
    };
  },
};

// =============================================================================
// Rule 6: Budget Match (weight: 0.08, max: 8 points)
// =============================================================================

/**
 * Evaluates how well the price tier matches the user's budget.
 */
export const budgetMatchRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Budget Match",
  weight: 0.08,
  maxPoints: 8,
  evaluate: (answers, product): RuleResult => {
    const budgetPrefs = answers.budget;
    const priceTier = product.core_attributes.price_tier;

    if (!budgetPrefs || budgetPrefs.length === 0) {
      return { points: 6 };
    }

    // Map quiz budget options to price tiers
    const budgetToTiers: Record<string, string[]> = {
      budget: ["budget", "lower_midrange"],
      "mid-range": ["lower_midrange", "midrange", "upper_midrange"],
      premium: ["upper_midrange", "premium"],
      enthusiast: ["premium", "flagship"],
    };

    for (const budgetPref of budgetPrefs) {
      const matchingTiers = budgetToTiers[budgetPref] || [];
      if (matchingTiers.includes(priceTier)) {
        return {
          points: 8,
          reason: `Price fits your ${budgetPref} budget`,
        };
      }
    }

    // Check if close to budget
    const allMatchingTiers = budgetPrefs.flatMap((b) => budgetToTiers[b] || []);
    const tierOrder = ["budget", "lower_midrange", "midrange", "upper_midrange", "premium", "flagship"];
    const productTierIndex = tierOrder.indexOf(priceTier);
    const isAboveBudget = budgetPrefs.includes("budget") && productTierIndex >= 3;

    if (isAboveBudget) {
      return {
        points: 3,
        concern: "May exceed your budget",
      };
    }

    return {
      points: 5,
      concern: "Price may not align with your budget preference",
    };
  },
};

// =============================================================================
// Rule 7: Color Accuracy (weight: 0.06, max: 6 points)
// =============================================================================

/**
 * Evaluates color accuracy for content creation use cases.
 */
export const colorAccuracyRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Color Accuracy",
  weight: 0.06,
  maxPoints: 6,
  evaluate: (answers, product): RuleResult => {
    const colorPref = answers["color-accuracy"];
    const uses = answers["primary-use"];
    const attrs = product.core_attributes;

    // Only relevant for content creation
    const needsColor = uses.includes("content-creation") || uses.includes("mixed");
    if (!needsColor && (!colorPref || colorPref === "basic")) {
      return { points: 5 };
    }

    const srgbCoverage = attrs.monitor_srgb_coverage || 0;
    const adobeRgb = attrs.monitor_adobe_rgb_coverage || 0;
    const dciP3 = attrs.monitor_dci_p3_coverage || 0;
    const colorScore = attrs.monitor_color_accuracy_score || 0;
    const accuracy = attrs.monitor_color_accuracy;

    if (colorPref === "professional") {
      if (accuracy === "professional" || (adobeRgb >= 90 && colorScore >= 8.5)) {
        return { points: 6, reason: "Professional-grade color accuracy" };
      }
      if (accuracy === "great" || (srgbCoverage >= 100 && colorScore >= 8)) {
        return { points: 4, reason: "Great color accuracy", concern: "May not meet professional standards" };
      }
      return { points: 2, concern: "Color accuracy may be insufficient for professional work" };
    }

    if (colorPref === "standard") {
      if (srgbCoverage >= 99 || colorScore >= 8) {
        return { points: 6, reason: "Accurate sRGB colors" };
      }
      if (srgbCoverage >= 95) {
        return { points: 4 };
      }
      return { points: 3, concern: "Color accuracy is limited" };
    }

    // Default scoring for content creation without preference
    if (needsColor) {
      if (colorScore >= 8) return { points: 6, reason: "Excellent color accuracy" };
      if (colorScore >= 7) return { points: 4 };
    }

    return { points: 4 };
  },
};

// =============================================================================
// Rule 8: HDR Performance (weight: 0.04, max: 4 points)
// =============================================================================

/**
 * Evaluates HDR capability for users who want HDR.
 */
export const hdrPerformanceRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "HDR Performance",
  weight: 0.04,
  maxPoints: 4,
  evaluate: (answers, product): RuleResult => {
    const hdrPref = answers["hdr-needs"];
    const attrs = product.core_attributes;

    if (hdrPref === "not-needed" || !hdrPref) {
      return { points: 3 };
    }

    const hdrLevel = attrs.monitor_hdr_level;
    const hdrScore = attrs.monitor_hdr_picture_score || 0;

    if (hdrPref === "important") {
      if (hdrLevel === "excellent" || hdrScore >= 8.5) {
        return { points: 4, reason: "Excellent HDR with true high brightness" };
      }
      if (hdrLevel === "great" || hdrScore >= 7) {
        return { points: 3, reason: "Good HDR performance" };
      }
      return { points: 1, concern: "HDR performance may be underwhelming" };
    }

    // nice-to-have
    if (attrs.monitor_hdr10) {
      if (hdrLevel === "excellent" || hdrLevel === "great") {
        return { points: 4, reason: "HDR support adds to the experience" };
      }
      return { points: 3, reason: "Basic HDR support available" };
    }

    return { points: 2, concern: "No HDR support" };
  },
};

// =============================================================================
// Rule 9: Features Match (weight: 0.04, max: 4 points)
// =============================================================================

/**
 * Evaluates connectivity and feature preferences.
 */
export const featuresMatchRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Features Match",
  weight: 0.04,
  maxPoints: 4,
  evaluate: (answers, product): RuleResult => {
    const features = answers.features;
    const attrs = product.core_attributes;

    if (!features || features.includes("any")) {
      return { points: 3 };
    }

    let matchedFeatures = 0;
    const reasons: string[] = [];

    for (const feature of features) {
      switch (feature) {
        case "usb-c":
          if (attrs.monitor_usb_c_dp) {
            matchedFeatures++;
            if (attrs.monitor_usb_c_pd_watts && attrs.monitor_usb_c_pd_watts >= 60) {
              reasons.push(`USB-C with ${attrs.monitor_usb_c_pd_watts}W power delivery`);
            } else {
              reasons.push("USB-C connectivity");
            }
          }
          break;
        case "ergonomics": {
          const ergoFeatures = attrs.monitor_ergonomic_features.length;
          if (ergoFeatures >= 4) {
            matchedFeatures++;
            reasons.push("Full ergonomic adjustability");
          } else if (ergoFeatures >= 2) {
            matchedFeatures += 0.5;
          }
          break;
        }
        case "speakers":
          if (attrs.monitor_speakers) {
            matchedFeatures++;
            reasons.push("Built-in speakers");
          }
          break;
      }
    }

    const totalRequested = features.filter((f) => f !== "any").length;
    const matchRatio = totalRequested > 0 ? matchedFeatures / totalRequested : 1;

    if (matchRatio >= 1) {
      return { points: 4, reason: reasons.join(", ") };
    }
    if (matchRatio >= 0.5) {
      return { points: 3, reason: reasons[0] };
    }
    return { points: 2, concern: "Missing some requested features" };
  },
};

// =============================================================================
// Rule 10: Bonus Points (weight: 0.03, max: 3 points)
// =============================================================================

/**
 * Awards bonus points for value picks, VRR for gamers, etc.
 */
export const bonusPointsRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Bonus Points",
  weight: 0.03,
  maxPoints: 3,
  evaluate: (answers, product): RuleResult => {
    const uses = answers["primary-use"];
    const attrs = product.core_attributes;

    let bonusPoints = 0;
    const reasons: string[] = [];

    // Value pick bonus
    if (attrs.monitor_value_pick) {
      bonusPoints += 1;
      reasons.push("Excellent value");
    }

    // VRR bonus for gamers
    const isGaming = uses.includes("gaming") || uses.includes("mixed");
    if (isGaming && attrs.monitor_vrr) {
      if (attrs.monitor_gsync === "certified") {
        bonusPoints += 1;
        reasons.push("G-SYNC certified");
      } else if (attrs.monitor_freesync && attrs.monitor_gsync === "compatible") {
        bonusPoints += 0.5;
        reasons.push("VRR support");
      }
    }

    // High overall score bonus
    const overallScore = attrs.monitor_overall_score || 0;
    if (overallScore >= 8) {
      bonusPoints += 0.5;
    }

    // Low input lag bonus for gaming
    if (isGaming && attrs.monitor_input_lag_ms && attrs.monitor_input_lag_ms <= 5) {
      bonusPoints += 0.5;
      reasons.push("Very low input lag");
    }

    return {
      points: Math.min(Math.round(bonusPoints), 3),
      reason: reasons.length > 0 ? reasons.join(", ") : undefined,
    };
  },
};

// =============================================================================
// Curved Preference Rule (weight: 0.03, max: 3 points)
// =============================================================================

/**
 * Evaluates curved vs flat preference.
 */
export const curvedPreferenceRule: ScoringRule<MonitorQuizAnswers, MonitorProduct> = {
  name: "Curved Preference",
  weight: 0.03,
  maxPoints: 3,
  evaluate: (answers, product): RuleResult => {
    const preference = answers.curved;
    const isCurved = product.core_attributes.monitor_curved;

    if (!preference || preference === "either") {
      return { points: 2 };
    }

    if (preference === "curved" && isCurved) {
      return { points: 3, reason: "Curved screen for immersive experience" };
    }

    if (preference === "flat" && !isCurved) {
      return { points: 3, reason: "Flat screen as preferred" };
    }

    return {
      points: 1,
      concern: preference === "curved" ? "Screen is flat" : "Screen is curved",
    };
  },
};

// =============================================================================
// Export All Rules
// =============================================================================

export const monitorRules: ScoringRule<MonitorQuizAnswers, MonitorProduct>[] = [
  primaryUseFitRule,
  sizeMatchRule,
  resolutionMatchRule,
  refreshRateMatchRule,
  panelTypeMatchRule,
  budgetMatchRule,
  colorAccuracyRule,
  hdrPerformanceRule,
  featuresMatchRule,
  bonusPointsRule,
  curvedPreferenceRule,
];
