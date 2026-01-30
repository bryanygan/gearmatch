/**
 * Mouse Quiz Questions
 *
 * Enhanced question definitions for the mouse quiz with conditional logic
 * and categorization for quiz modes.
 */

import {
  Mouse,
  Hand,
  Zap,
  Target,
  Wifi,
  Cable,
  Feather,
  Weight,
  Gamepad2,
  Swords,
  Map,
  Users,
  Grip,
  Square,
  Circle,
} from "lucide-react";
import type { EnhancedQuizQuestion } from "../types";
import type { MouseQuizAnswers } from "@/lib/scoring/types";

/**
 * Extended mouse quiz answers including new optional fields.
 */
export interface ExtendedMouseQuizAnswers extends MouseQuizAnswers {
  handedness?: "right" | "left" | "ambidextrous";
  "shape-profile"?: ("low_hump" | "rear_hump" | "center_hump" | "ergo_hump" | "any")[];
  "gaming-genre"?: ("fps" | "moba" | "mmo" | "general")[];
  "button-needs"?: ("minimal" | "standard" | "many" | "mmo_grid")[];
}

/**
 * All mouse quiz questions with enhanced schema.
 */
export const mouseQuestions: EnhancedQuizQuestion<ExtendedMouseQuizAnswers>[] = [
  // ===========================================================================
  // CORE Questions (Quick mode)
  // ===========================================================================
  {
    id: "hand-size",
    title: "What's your hand size?",
    subtitle: "Measure from the base of your palm to the tip of your middle finger",
    helpText:
      "Most adults have medium hands (17-19cm). This helps us recommend mice that will fit comfortably in your hand.",
    category: "core",
    importance: 9,
    options: [
      {
        id: "small",
        icon: Hand,
        title: "Small",
        description: "Under 17cm / 6.7 inches",
      },
      {
        id: "medium",
        icon: Hand,
        title: "Medium",
        description: "17-19cm / 6.7-7.5 inches",
      },
      {
        id: "large",
        icon: Hand,
        title: "Large",
        description: "Over 19cm / 7.5 inches",
      },
    ],
  },
  {
    id: "grip-style",
    title: "How do you grip your mouse?",
    subtitle: "Select all grips you use",
    helpText:
      "Your grip style affects which mouse shapes will feel natural. Many people use a combination of grips.",
    category: "core",
    importance: 10,
    multiSelect: true,
    options: [
      {
        id: "palm",
        icon: Hand,
        title: "Palm Grip",
        description: "Full hand rests on mouse",
      },
      {
        id: "claw",
        icon: Zap,
        title: "Claw Grip",
        description: "Fingertips arched, palm contact",
      },
      {
        id: "fingertip",
        icon: Target,
        title: "Fingertip Grip",
        description: "Only fingertips touch mouse",
      },
      {
        id: "relaxed-claw",
        icon: Hand,
        title: "Relaxed Claw",
        description: "Mix of palm and claw",
      },
    ],
  },
  {
    id: "wireless",
    title: "Wireless or wired?",
    subtitle: "Modern wireless has no lag — it's all about convenience vs charging",
    helpText:
      "Top wireless mice now match or beat wired latency. Choose based on your desk setup preference.",
    category: "core",
    importance: 7,
    options: [
      {
        id: "wireless",
        icon: Wifi,
        title: "Wireless",
        description: "Freedom of movement, need to charge",
      },
      {
        id: "wired",
        icon: Cable,
        title: "Wired",
        description: "Always ready, cable drag",
      },
      {
        id: "either",
        icon: Mouse,
        title: "No Preference",
        description: "Either works for me",
      },
    ],
  },

  // ===========================================================================
  // STANDARD Questions (Personalized mode)
  // ===========================================================================
  {
    id: "weight-preference",
    title: "What weight do you prefer?",
    subtitle: "Select all weights you'd consider",
    helpText:
      "Lighter mice allow faster movements, heavier mice offer more control. Your preference may depend on your sensitivity settings.",
    category: "standard",
    importance: 8,
    multiSelect: true,
    defaultValue: ["light", "medium"],
    options: [
      {
        id: "ultralight",
        icon: Feather,
        title: "Ultralight",
        description: "Under 60g — max speed",
      },
      {
        id: "light",
        icon: Feather,
        title: "Light",
        description: "60-80g — balanced",
      },
      {
        id: "medium",
        icon: Weight,
        title: "Medium",
        description: "80-100g — controlled",
      },
      {
        id: "heavy",
        icon: Weight,
        title: "Heavy",
        description: "Over 100g — stable aim",
      },
    ],
  },
  {
    id: "primary-use",
    title: "What's your primary use?",
    subtitle: "Select all that apply",
    helpText:
      "Different use cases benefit from different features. Gaming mice prioritize sensors, productivity mice prioritize comfort.",
    category: "standard",
    importance: 6,
    multiSelect: true,
    defaultValue: ["mixed"],
    options: [
      {
        id: "precision",
        icon: Target,
        title: "Precision Work",
        description: "Gaming, design, editing",
      },
      {
        id: "productivity",
        icon: Map,
        title: "Productivity",
        description: "Office work, browsing, coding",
      },
      {
        id: "creative",
        icon: Swords,
        title: "Creative Work",
        description: "Photo/video editing, 3D modeling",
      },
      {
        id: "mixed",
        icon: Gamepad2,
        title: "Mixed Use",
        description: "A bit of everything",
      },
    ],
  },
  {
    id: "handedness",
    title: "Which hand do you use for your mouse?",
    subtitle: "This affects ergonomic mouse options",
    helpText:
      "Left-handed users may prefer ambidextrous or left-handed ergonomic mice. Most ergonomic mice are right-handed only.",
    category: "standard",
    importance: 8,
    defaultValue: "right",
    options: [
      {
        id: "right",
        icon: Hand,
        title: "Right-handed",
        description: "Right hand on mouse (most common)",
      },
      {
        id: "left",
        icon: Hand,
        title: "Left-handed",
        description: "Left hand on mouse",
      },
      {
        id: "ambidextrous",
        icon: Hand,
        title: "Either/Both",
        description: "Comfortable with either hand",
      },
    ],
  },

  // ===========================================================================
  // ADVANCED Questions (Expert mode)
  // ===========================================================================
  {
    id: "shape-profile",
    title: "What mouse shape profile do you prefer?",
    subtitle: "Based on where the hump (highest point) sits",
    helpText:
      "Low humps suit fingertip/claw grips. High rear humps provide palm support. Ergonomic shapes offer wrist comfort.",
    category: "advanced",
    importance: 7,
    multiSelect: true,
    defaultValue: ["any"],
    showWhen: (answers) => {
      // Only show if grip style is answered
      const grips = answers["grip-style"];
      return Array.isArray(grips) && grips.length > 0;
    },
    options: [
      {
        id: "low_hump",
        icon: Square,
        title: "Low / Flat",
        description: "Minimal hump, fingertip friendly",
      },
      {
        id: "rear_hump",
        icon: Grip,
        title: "Rear Hump",
        description: "Support at the back for palm",
      },
      {
        id: "center_hump",
        icon: Grip,
        title: "Center Hump",
        description: "Balanced support, versatile",
      },
      {
        id: "ergo_hump",
        icon: Hand,
        title: "Ergonomic",
        description: "Contoured for natural hand position",
      },
      {
        id: "any",
        icon: Circle,
        title: "No Preference",
        description: "Open to any shape",
      },
    ],
  },
  {
    id: "gaming-genre",
    title: "What games do you mainly play?",
    subtitle: "Select all that apply",
    helpText:
      "FPS players need precision and light weight. MMO players need extra buttons. MOBA players need quick clicks.",
    category: "advanced",
    importance: 5,
    multiSelect: true,
    defaultValue: ["general"],
    showWhen: (answers) => {
      // Only show for gaming/precision users
      const uses = answers["primary-use"];
      return (
        Array.isArray(uses) && (uses.includes("precision") || uses.includes("mixed"))
      );
    },
    options: [
      {
        id: "fps",
        icon: Target,
        title: "FPS / Shooters",
        description: "CS2, Valorant, Apex, etc.",
      },
      {
        id: "moba",
        icon: Gamepad2,
        title: "MOBA / RTS",
        description: "LoL, Dota 2, StarCraft, etc.",
      },
      {
        id: "mmo",
        icon: Users,
        title: "MMO / RPG",
        description: "WoW, FFXIV, etc.",
      },
      {
        id: "general",
        icon: Gamepad2,
        title: "Various / Casual",
        description: "Mix of genres",
      },
    ],
  },
  {
    id: "button-needs",
    title: "How many buttons do you need?",
    subtitle: "Select all that you'd consider",
    helpText:
      "Minimal: just clicks and scroll. Standard: 2 side buttons. Many: programmable buttons. MMO Grid: 12+ thumb buttons.",
    category: "advanced",
    importance: 4,
    multiSelect: true,
    defaultValue: ["standard"],
    options: [
      {
        id: "minimal",
        icon: Mouse,
        title: "Minimal (2-3)",
        description: "Just the basics, fewer distractions",
      },
      {
        id: "standard",
        icon: Mouse,
        title: "Standard (4-6)",
        description: "Side buttons for back/forward",
      },
      {
        id: "many",
        icon: Mouse,
        title: "Many (7+)",
        description: "Extra programmable buttons",
      },
      {
        id: "mmo_grid",
        icon: Users,
        title: "MMO Grid (12+)",
        description: "Thumb grid for ability hotkeys",
      },
    ],
  },
];
