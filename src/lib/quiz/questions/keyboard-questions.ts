/**
 * Keyboard Quiz Questions
 *
 * Enhanced question definitions for the keyboard quiz with conditional logic
 * and categorization for quiz modes.
 */

import {
  Keyboard,
  Gamepad2,
  Briefcase,
  Code,
  Zap,
  Wifi,
  Cable,
  Coins,
  LayoutGrid,
  Minimize2,
  Maximize2,
  Box,
  Target,
  Volume2,
  Sparkles,
  Settings,
  Feather,
  Magnet,
  CircleDot,
  SlidersHorizontal,
} from "lucide-react";
import type { EnhancedQuizQuestion } from "../types";
import type { KeyboardQuizAnswers } from "@/lib/scoring/types";

/**
 * Extended keyboard quiz answers including new optional fields.
 */
export interface ExtendedKeyboardQuizAnswers extends KeyboardQuizAnswers {
  "switch-technology"?: ("mechanical" | "magnetic" | "optical" | "any")[];
  "media-controls"?: "essential" | "nice-to-have" | "not-needed";
  "keycap-material"?: "pbt" | "abs" | "any";
}

/**
 * All keyboard quiz questions with enhanced schema.
 */
export const keyboardQuestions: EnhancedQuizQuestion<ExtendedKeyboardQuizAnswers>[] = [
  // ===========================================================================
  // CORE Questions (Quick mode)
  // ===========================================================================
  {
    id: "primary-use",
    title: "What's your primary use case?",
    subtitle: "Select all that apply",
    helpText:
      "Competitive gaming prioritizes speed and features like Rapid Trigger. Programming and typing prioritize feel and ergonomics.",
    category: "core",
    importance: 10,
    multiSelect: true,
    options: [
      {
        id: "competitive-gaming",
        icon: Target,
        title: "Competitive Gaming",
        description: "FPS, fighting games, esports",
      },
      {
        id: "casual-gaming",
        icon: Gamepad2,
        title: "Casual Gaming",
        description: "RPGs, story games, variety",
      },
      {
        id: "productivity",
        icon: Briefcase,
        title: "Productivity / Office",
        description: "Documents, email, browsing",
      },
      {
        id: "programming",
        icon: Code,
        title: "Programming / Typing",
        description: "Coding, writing, heavy typing",
      },
    ],
  },
  {
    id: "form-factor",
    title: "What size keyboard do you prefer?",
    subtitle: "Select all sizes you'd consider",
    helpText:
      "Full-size has everything. TKL removes numpad for more mouse space. 75% is compact but keeps function row. 60-65% is ultra-portable.",
    category: "core",
    importance: 9,
    multiSelect: true,
    options: [
      {
        id: "full-size",
        icon: Maximize2,
        title: "Full-Size (100%)",
        description: "Numpad + all keys",
      },
      {
        id: "tkl",
        icon: LayoutGrid,
        title: "TKL (80%)",
        description: "No numpad, keeps nav cluster",
      },
      {
        id: "75-percent",
        icon: Box,
        title: "75% / Compact",
        description: "Function row, minimal footprint",
      },
      {
        id: "60-65-percent",
        icon: Minimize2,
        title: "60-65%",
        description: "Ultra compact, layers for functions",
      },
    ],
  },
  {
    id: "switch-type",
    title: "What switch feel do you prefer?",
    subtitle: "Select all that interest you",
    helpText:
      "Linear switches are smooth for gaming. Tactile give feedback for typing. Clicky add an audible click. No preference shows all options.",
    category: "core",
    importance: 8,
    multiSelect: true,
    options: [
      {
        id: "linear",
        icon: Zap,
        title: "Linear",
        description: "Smooth, no bump — fast for gaming",
      },
      {
        id: "tactile",
        icon: Keyboard,
        title: "Tactile",
        description: "Bump feedback — great for typing",
      },
      {
        id: "clicky",
        icon: Volume2,
        title: "Clicky",
        description: "Bump + click sound — satisfying",
      },
      {
        id: "no-preference",
        icon: Settings,
        title: "No Preference",
        description: "I'm open to anything",
      },
    ],
  },

  // ===========================================================================
  // STANDARD Questions (Personalized mode)
  // ===========================================================================
  {
    id: "gaming-features",
    title: "How important are gaming features?",
    subtitle: "Rapid Trigger, adjustable actuation, and low latency for competitive play",
    helpText:
      "Rapid Trigger allows faster key releases in games like CS2 and Valorant. 8K polling provides smoother input. Essential for competitive FPS players.",
    category: "standard",
    importance: 7,
    defaultValue: "nice-to-have",
    options: [
      {
        id: "essential",
        icon: Target,
        title: "Essential",
        description: "Need rapid trigger, 8K polling, lowest latency",
      },
      {
        id: "nice-to-have",
        icon: Gamepad2,
        title: "Nice to Have",
        description: "Good performance matters, but not extreme",
      },
      {
        id: "not-important",
        icon: Briefcase,
        title: "Not Important",
        description: "Typing feel and features matter more",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Wireless or wired?",
    subtitle: "Wireless = freedom & multi-device, Wired = no charging",
    helpText:
      "Modern 2.4GHz wireless has near-zero latency. Bluetooth is convenient for multi-device. Wired is reliable and never needs charging.",
    category: "standard",
    importance: 6,
    defaultValue: "no-preference",
    options: [
      {
        id: "wireless-essential",
        icon: Wifi,
        title: "Wireless Essential",
        description: "Must be wireless, hate cables",
      },
      {
        id: "wireless-preferred",
        icon: Wifi,
        title: "Wireless Preferred",
        description: "Prefer wireless, but wired is OK",
      },
      {
        id: "wired-preferred",
        icon: Cable,
        title: "Wired Preferred",
        description: "Reliability, no battery anxiety",
      },
      {
        id: "no-preference",
        icon: Keyboard,
        title: "No Preference",
        description: "Either works for me",
      },
    ],
  },
  {
    id: "priority-feature",
    title: "What's most important to you?",
    subtitle: "Select all that matter to you",
    helpText:
      "Performance = lowest latency. Typing feel = premium switches and mounts. Customization = hot-swap and software. Quiet = for shared spaces.",
    category: "standard",
    importance: 5,
    multiSelect: true,
    defaultValue: ["typing-feel"],
    options: [
      {
        id: "performance",
        icon: Zap,
        title: "Raw Performance",
        description: "Lowest latency, fastest inputs",
      },
      {
        id: "typing-feel",
        icon: Feather,
        title: "Typing Feel",
        description: "Premium switches, gasket mount",
      },
      {
        id: "customization",
        icon: Settings,
        title: "Customization",
        description: "Hot-swap, RGB, QMK/VIA",
      },
      {
        id: "quiet",
        icon: Volume2,
        title: "Quiet Operation",
        description: "Silent for office or shared spaces",
      },
    ],
  },
  {
    id: "budget",
    title: "What's your budget range?",
    subtitle: "Select all ranges you'd consider",
    helpText:
      "Budget keyboards can still be great. Mid-range offers excellent value. Premium and enthusiast unlock premium materials and features.",
    category: "standard",
    importance: 5,
    multiSelect: true,
    defaultValue: ["mid-range"],
    options: [
      {
        id: "budget",
        icon: Coins,
        title: "Budget",
        description: "Under $100",
      },
      {
        id: "mid-range",
        icon: Coins,
        title: "Mid-Range",
        description: "$100 - $175",
      },
      {
        id: "premium",
        icon: Sparkles,
        title: "Premium",
        description: "$175 - $250",
      },
      {
        id: "enthusiast",
        icon: Sparkles,
        title: "Enthusiast",
        description: "$250+",
      },
    ],
  },
  {
    id: "switch-technology",
    title: "What switch technology interests you?",
    subtitle: "Different technologies offer different features",
    helpText:
      "Mechanical is proven and reliable. Magnetic (Hall Effect) enables Rapid Trigger and adjustable actuation. Optical offers fast actuation.",
    category: "standard",
    importance: 6,
    multiSelect: true,
    defaultValue: ["any"],
    showWhen: (answers) => {
      // Show for gamers or those who want performance
      const uses = answers["primary-use"];
      const priorities = answers["priority-feature"];
      const gaming = answers["gaming-features"];

      const isGamer =
        Array.isArray(uses) &&
        (uses.includes("competitive-gaming") || uses.includes("casual-gaming"));
      const wantsPerformance =
        Array.isArray(priorities) && priorities.includes("performance");
      const wantsGamingFeatures = gaming === "essential" || gaming === "nice-to-have";

      return isGamer || wantsPerformance || wantsGamingFeatures;
    },
    options: [
      {
        id: "mechanical",
        icon: Keyboard,
        title: "Mechanical",
        description: "Traditional, proven reliability",
      },
      {
        id: "magnetic",
        icon: Magnet,
        title: "Magnetic / Hall Effect",
        description: "Rapid Trigger, adjustable actuation",
      },
      {
        id: "optical",
        icon: CircleDot,
        title: "Optical",
        description: "Fast actuation, durable",
      },
      {
        id: "any",
        icon: Settings,
        title: "No Preference",
        description: "Open to any technology",
      },
    ],
  },

  // ===========================================================================
  // ADVANCED Questions (Expert mode)
  // ===========================================================================
  {
    id: "media-controls",
    title: "Do you want dedicated media controls?",
    subtitle: "Volume knobs and media keys for easy adjustment",
    helpText:
      "A volume knob is convenient for quick adjustments. Some keyboards also have play/pause and skip buttons.",
    category: "advanced",
    importance: 3,
    defaultValue: "nice-to-have",
    showWhen: (answers) => {
      // Don't show for 60-65% only users (most don't have room for knobs)
      const formFactors = answers["form-factor"];
      if (!Array.isArray(formFactors)) return true;
      return !formFactors.every((f) => f === "60-65-percent");
    },
    options: [
      {
        id: "essential",
        icon: SlidersHorizontal,
        title: "Essential",
        description: "Need a knob or media keys",
      },
      {
        id: "nice-to-have",
        icon: Volume2,
        title: "Nice to Have",
        description: "Would use it if available",
      },
      {
        id: "not-needed",
        icon: Keyboard,
        title: "Not Needed",
        description: "I use keyboard shortcuts",
      },
    ],
  },
  {
    id: "keycap-material",
    title: "Do you have a keycap material preference?",
    subtitle: "Affects durability, texture, and feel",
    helpText:
      "PBT keycaps are more durable and have a textured feel. ABS keycaps are smoother but can get shiny over time. Both can look and feel great.",
    category: "advanced",
    importance: 3,
    defaultValue: "any",
    showWhen: (answers) => {
      // Show for enthusiast budget or those who want typing feel
      const budgets = answers["budget"];
      const priorities = answers["priority-feature"];

      const isEnthusiast =
        Array.isArray(budgets) &&
        (budgets.includes("premium") || budgets.includes("enthusiast"));
      const wantsTypingFeel =
        Array.isArray(priorities) && priorities.includes("typing-feel");

      return isEnthusiast || wantsTypingFeel;
    },
    options: [
      {
        id: "pbt",
        icon: Keyboard,
        title: "PBT",
        description: "Durable, textured, won't shine",
      },
      {
        id: "abs",
        icon: Keyboard,
        title: "ABS",
        description: "Smooth feel, vivid colors",
      },
      {
        id: "any",
        icon: Settings,
        title: "No Preference",
        description: "Either is fine with me",
      },
    ],
  },
];
