/**
 * Monitor Quiz Questions
 *
 * Enhanced question definitions for the monitor quiz with conditional logic
 * and categorization for quiz modes.
 */

import {
  Monitor,
  MonitorPlay,
  Gamepad2,
  Palette,
  Briefcase,
  Layers,
  Grid2x2,
  Grid3x3,
  LayoutGrid,
  Circle,
  Gauge,
  Zap,
  Sun,
  Moon,
  Sparkles,
  DollarSign,
  Crown,
  Square,
  PanelTopClose,
  Eye,
  Cable,
  Move,
  Volume2,
} from "lucide-react";
import type { EnhancedQuizQuestion } from "../types";
import type { MonitorQuizAnswers } from "@/lib/scoring/types";

/**
 * Extended monitor quiz answers including new optional fields.
 */
export interface ExtendedMonitorQuizAnswers extends MonitorQuizAnswers {
  "refresh-rate"?: "basic" | "standard" | "high" | "any";
  "panel-type"?: ("ips" | "va" | "oled" | "any")[];
  budget?: ("budget" | "mid-range" | "premium" | "enthusiast")[];
  curved?: "flat" | "curved" | "either";
  "color-accuracy"?: "basic" | "standard" | "professional";
  "hdr-needs"?: "not-needed" | "nice-to-have" | "important";
  features?: ("usb-c" | "ergonomics" | "speakers" | "any")[];
}

/**
 * All monitor quiz questions with enhanced schema.
 */
export const monitorQuestions: EnhancedQuizQuestion<ExtendedMonitorQuizAnswers>[] = [
  // ===========================================================================
  // CORE Questions (Quick mode)
  // ===========================================================================
  {
    id: "primary-use",
    title: "What will you primarily use this monitor for?",
    subtitle: "Select all that apply",
    helpText:
      "Different uses have very different requirements. Gaming needs fast response times, content creation needs color accuracy, and office work benefits from ergonomics and text clarity.",
    category: "core",
    importance: 10,
    multiSelect: true,
    options: [
      {
        id: "gaming",
        icon: Gamepad2,
        title: "Gaming",
        description: "PC or console gaming, competitive or casual",
      },
      {
        id: "content-creation",
        icon: Palette,
        title: "Content Creation",
        description: "Photo editing, video editing, design work",
      },
      {
        id: "office",
        icon: Briefcase,
        title: "Office/Productivity",
        description: "Documents, spreadsheets, web browsing",
      },
      {
        id: "mixed",
        icon: Layers,
        title: "Mixed/General",
        description: "A bit of everything",
      },
    ],
  },
  {
    id: "size-preference",
    title: "What screen size are you looking for?",
    subtitle: "Consider your desk space and viewing distance",
    helpText:
      "Larger screens offer more workspace but need more desk depth. 27\" is the most popular size for 1440p, while 32\"+ suits 4K resolution well. Ultrawide monitors (34\"+) provide immersive experiences.",
    category: "core",
    importance: 9,
    options: [
      {
        id: "compact",
        icon: Monitor,
        title: "24-25\"",
        description: "Compact, great for close viewing and esports",
      },
      {
        id: "standard",
        icon: Monitor,
        title: "27\"",
        description: "Most popular size, great balance",
      },
      {
        id: "large",
        icon: MonitorPlay,
        title: "32\"",
        description: "Larger workspace, ideal for 4K",
      },
      {
        id: "ultrawide",
        icon: MonitorPlay,
        title: "34\"+ Ultrawide",
        description: "Immersive, great for productivity",
      },
      {
        id: "any",
        icon: Circle,
        title: "No Preference",
        description: "Open to any size",
      },
    ],
  },
  {
    id: "resolution",
    title: "What resolution do you need?",
    subtitle: "Higher resolution means sharper images but requires more GPU power",
    helpText:
      "1080p is fine for 24\", 1440p is ideal for 27\", and 4K shines at 27\"+ for detailed work. Gaming at 4K requires a powerful GPU.",
    category: "core",
    importance: 8,
    options: [
      {
        id: "1080p",
        icon: Grid2x2,
        title: "1080p (Full HD)",
        description: "1920x1080 - Good for gaming, less GPU demand",
      },
      {
        id: "1440p",
        icon: Grid3x3,
        title: "1440p (QHD)",
        description: "2560x1440 - Sweet spot for gaming & work",
      },
      {
        id: "4k",
        icon: LayoutGrid,
        title: "4K (UHD)",
        description: "3840x2160 - Sharp text, ideal for content creation",
      },
      {
        id: "any",
        icon: Circle,
        title: "No Preference",
        description: "Open to any resolution",
      },
    ],
  },

  // ===========================================================================
  // STANDARD Questions (Personalized mode)
  // ===========================================================================
  {
    id: "refresh-rate",
    title: "How important is refresh rate?",
    subtitle: "Higher refresh rates mean smoother motion",
    helpText:
      "60Hz is fine for office work. 144Hz+ makes gaming feel smoother. 240Hz+ is for competitive esports where every millisecond counts.",
    category: "standard",
    importance: 8,
    showWhen: (answers) => {
      const uses = answers["primary-use"];
      return Array.isArray(uses) && (uses.includes("gaming") || uses.includes("mixed"));
    },
    defaultValue: "standard",
    options: [
      {
        id: "basic",
        icon: Gauge,
        title: "60-75Hz",
        description: "Fine for office work and casual use",
      },
      {
        id: "standard",
        icon: Gauge,
        title: "120-165Hz",
        description: "Smooth gaming experience",
      },
      {
        id: "high",
        icon: Zap,
        title: "240Hz+",
        description: "Competitive gaming advantage",
      },
      {
        id: "any",
        icon: Circle,
        title: "No Preference",
        description: "Whatever fits my budget",
      },
    ],
  },
  {
    id: "panel-type",
    title: "Do you have a panel type preference?",
    subtitle: "Each panel type has unique strengths",
    helpText:
      "IPS: best colors and viewing angles. VA: best contrast for dark scenes. OLED: perfect blacks, instant response, but can have burn-in risk. TN: fastest response, limited colors.",
    category: "standard",
    importance: 7,
    multiSelect: true,
    defaultValue: ["any"],
    options: [
      {
        id: "ips",
        icon: Palette,
        title: "IPS",
        description: "Great colors, wide viewing angles",
      },
      {
        id: "va",
        icon: Moon,
        title: "VA",
        description: "Deep blacks, high contrast",
      },
      {
        id: "oled",
        icon: Sparkles,
        title: "OLED/QD-OLED",
        description: "Perfect blacks, vibrant colors",
      },
      {
        id: "any",
        icon: Circle,
        title: "No Preference",
        description: "Best for my use case",
      },
    ],
  },
  {
    id: "budget",
    title: "What's your budget range?",
    subtitle: "Select all ranges you'd consider",
    helpText:
      "Budget monitors work well for basic tasks. Mid-range offers the best value. Premium gets you features like OLED, high refresh 4K, or professional color accuracy.",
    category: "standard",
    importance: 6,
    multiSelect: true,
    defaultValue: ["mid-range"],
    options: [
      {
        id: "budget",
        icon: DollarSign,
        title: "Under $300",
        description: "Basic features, good value",
      },
      {
        id: "mid-range",
        icon: DollarSign,
        title: "$300-600",
        description: "Great all-around options",
      },
      {
        id: "premium",
        icon: DollarSign,
        title: "$600-1000",
        description: "High-end features",
      },
      {
        id: "enthusiast",
        icon: Crown,
        title: "$1000+",
        description: "Best of the best",
      },
    ],
  },
  {
    id: "curved",
    title: "Curved or flat screen?",
    subtitle: "Curved screens can feel more immersive",
    helpText:
      "Curved screens reduce edge distortion on large/ultrawide monitors and can feel more immersive. Flat screens are better for color-critical work where geometry matters.",
    category: "standard",
    importance: 4,
    defaultValue: "either",
    options: [
      {
        id: "flat",
        icon: Square,
        title: "Flat",
        description: "Traditional, better for precision work",
      },
      {
        id: "curved",
        icon: PanelTopClose,
        title: "Curved",
        description: "Immersive, reduces edge distortion",
      },
      {
        id: "either",
        icon: Circle,
        title: "Either",
        description: "No preference",
      },
    ],
  },

  // ===========================================================================
  // ADVANCED Questions (Expert mode)
  // ===========================================================================
  {
    id: "color-accuracy",
    title: "How important is color accuracy?",
    subtitle: "Professional work may require calibrated displays",
    helpText:
      "Photo/video editing needs accurate colors. Gaming and office work are less demanding. Professional displays cover wide color gamuts like Adobe RGB and DCI-P3 with factory calibration.",
    category: "advanced",
    importance: 7,
    showWhen: (answers) => {
      const uses = answers["primary-use"];
      return Array.isArray(uses) && (uses.includes("content-creation") || uses.includes("mixed"));
    },
    defaultValue: "standard",
    options: [
      {
        id: "basic",
        icon: Palette,
        title: "Basic",
        description: "Good enough for general use",
      },
      {
        id: "standard",
        icon: Palette,
        title: "Good sRGB",
        description: "Accurate everyday colors",
      },
      {
        id: "professional",
        icon: Eye,
        title: "Professional",
        description: "Wide gamut, factory calibrated",
      },
    ],
  },
  {
    id: "hdr-needs",
    title: "How important is HDR?",
    subtitle: "HDR provides brighter highlights and deeper contrast",
    helpText:
      "True HDR requires high brightness (1000+ nits) and local dimming. Many budget 'HDR' monitors don't deliver a meaningful HDR experience. OLED offers excellent HDR naturally.",
    category: "advanced",
    importance: 5,
    showWhen: (answers) => {
      const uses = answers["primary-use"];
      return Array.isArray(uses) && (uses.includes("gaming") || uses.includes("content-creation"));
    },
    defaultValue: "nice-to-have",
    options: [
      {
        id: "not-needed",
        icon: Sun,
        title: "Not Important",
        description: "I don't need HDR",
      },
      {
        id: "nice-to-have",
        icon: Sun,
        title: "Nice to Have",
        description: "Would be a bonus",
      },
      {
        id: "important",
        icon: Sparkles,
        title: "Important",
        description: "I want real HDR performance",
      },
    ],
  },
  {
    id: "features",
    title: "What features matter to you?",
    subtitle: "Select all that are important",
    helpText:
      "USB-C simplifies laptop connections with a single cable. KVM switches between multiple computers. Ergonomic stands reduce neck strain with height, tilt, and swivel adjustments.",
    category: "advanced",
    importance: 5,
    multiSelect: true,
    defaultValue: ["any"],
    options: [
      {
        id: "usb-c",
        icon: Cable,
        title: "USB-C with Power Delivery",
        description: "Single-cable laptop connection",
      },
      {
        id: "ergonomics",
        icon: Move,
        title: "Full Ergonomic Stand",
        description: "Height, tilt, swivel, pivot",
      },
      {
        id: "speakers",
        icon: Volume2,
        title: "Built-in Speakers",
        description: "Convenient audio",
      },
      {
        id: "any",
        icon: Circle,
        title: "No Specific Needs",
        description: "Open to anything",
      },
    ],
  },
];
