/**
 * Audio Quiz Questions
 *
 * Enhanced question definitions for the audio quiz with conditional logic
 * and categorization for quiz modes.
 */

import {
  Headphones,
  Mic,
  Music,
  Volume2,
  Ear,
  Clock,
  Target,
  Sparkles,
  Podcast,
  Gamepad2,
  Coins,
  Wifi,
  Cable,
  Building,
  Home,
  AudioWaveform,
} from "lucide-react";
import type { EnhancedQuizQuestion } from "../types";
import type { AudioQuizAnswers } from "@/lib/scoring/types";

/**
 * Extended audio quiz answers including new optional fields.
 */
export interface ExtendedAudioQuizAnswers extends AudioQuizAnswers {
  "sound-signature"?: ("neutral" | "warm" | "v_shaped" | "bright")[];
  "wireless-preference"?: "wireless-required" | "wireless-preferred" | "wired-preferred" | "either";
  "noise-environment"?: "quiet" | "moderate" | "noisy";
}

/**
 * All audio quiz questions with enhanced schema.
 */
export const audioQuestions: EnhancedQuizQuestion<ExtendedAudioQuizAnswers>[] = [
  // ===========================================================================
  // CORE Questions (Quick mode)
  // ===========================================================================
  {
    id: "primary-use",
    title: "What's your main use case?",
    subtitle: "Select all that apply",
    helpText:
      "Different use cases have different audio priorities. Competitive gaming needs clarity, immersive listening needs depth.",
    category: "core",
    importance: 10,
    multiSelect: true,
    options: [
      {
        id: "competitive",
        icon: Target,
        title: "Precision Audio",
        description: "Clear audio cues and detail",
      },
      {
        id: "immersive",
        icon: Sparkles,
        title: "Immersive Listening",
        description: "Rich audio, deep bass",
      },
      {
        id: "mixed",
        icon: Music,
        title: "Mixed Use",
        description: "Best of both worlds",
      },
      {
        id: "streaming",
        icon: Podcast,
        title: "Streaming / Content",
        description: "Need great mic quality",
      },
    ],
  },
  {
    id: "form-factor",
    title: "What form factor do you prefer?",
    subtitle: "Select all you'd consider",
    helpText:
      "Over-ear headsets include mics. Headphones focus on audio quality. IEMs are compact and portable.",
    category: "core",
    importance: 9,
    multiSelect: true,
    options: [
      {
        id: "over-ear",
        icon: Headphones,
        title: "Over-Ear Headset",
        description: "Full-size, built-in mic",
      },
      {
        id: "over-ear-headphone",
        icon: Music,
        title: "Over-Ear Headphones",
        description: "Audiophile quality, no mic",
      },
      {
        id: "iem",
        icon: Ear,
        title: "IEMs / Earbuds",
        description: "Compact, in-ear monitors",
      },
      {
        id: "open-back",
        icon: Volume2,
        title: "Open-Back",
        description: "Wider soundstage, less isolation",
      },
    ],
  },
  {
    id: "mic-needs",
    title: "How important is the microphone?",
    subtitle: "For streaming and comms, mic quality matters a lot",
    helpText:
      "If you stream or do voice calls daily, mic quality is essential. If you have a separate mic, you can focus on audio quality.",
    category: "core",
    importance: 7,
    options: [
      {
        id: "essential",
        icon: Mic,
        title: "Essential",
        description: "I stream or do voice comms daily",
      },
      {
        id: "nice-to-have",
        icon: Mic,
        title: "Nice to Have",
        description: "Casual voice chat is fine",
      },
      {
        id: "not-needed",
        icon: Headphones,
        title: "Not Needed",
        description: "I have a separate mic setup",
      },
    ],
  },

  // ===========================================================================
  // STANDARD Questions (Personalized mode)
  // ===========================================================================
  {
    id: "session-length",
    title: "How long are your listening sessions?",
    subtitle: "Select all that apply",
    helpText:
      "Longer sessions need more comfortable headphones. Weight and padding become more important for all-day use.",
    category: "standard",
    importance: 6,
    multiSelect: true,
    defaultValue: ["medium"],
    options: [
      {
        id: "short",
        icon: Clock,
        title: "1-2 Hours",
        description: "Quick sessions",
      },
      {
        id: "medium",
        icon: Clock,
        title: "3-5 Hours",
        description: "Regular sessions",
      },
      {
        id: "long",
        icon: Clock,
        title: "6+ Hours",
        description: "Marathon sessions",
      },
      {
        id: "all-day",
        icon: Gamepad2,
        title: "All Day",
        description: "Work and play",
      },
    ],
  },
  {
    id: "budget",
    title: "What's your budget range?",
    subtitle: "Select all ranges you'd consider",
    helpText:
      "Higher budgets unlock better drivers, materials, and features. But great options exist at every price point.",
    category: "standard",
    importance: 5,
    multiSelect: true,
    defaultValue: ["mid-range"],
    options: [
      {
        id: "budget",
        icon: Coins,
        title: "Budget Friendly",
        description: "Under $75",
      },
      {
        id: "mid-range",
        icon: Coins,
        title: "Mid-Range",
        description: "$75 - $150",
      },
      {
        id: "premium",
        icon: Coins,
        title: "Premium",
        description: "$150 - $300",
      },
      {
        id: "no-limit",
        icon: Sparkles,
        title: "Best of the Best",
        description: "$300+",
      },
    ],
  },
  {
    id: "sound-signature",
    title: "What sound signature do you prefer?",
    subtitle: "How do you like your audio tuned?",
    helpText:
      "Neutral is accurate and balanced. Warm emphasizes bass. V-shaped boosts bass and treble. Bright emphasizes highs.",
    category: "standard",
    importance: 8,
    multiSelect: true,
    defaultValue: ["neutral"],
    options: [
      {
        id: "neutral",
        icon: AudioWaveform,
        title: "Neutral / Balanced",
        description: "Accurate, flat response",
      },
      {
        id: "warm",
        icon: Volume2,
        title: "Warm",
        description: "Enhanced bass, smooth highs",
      },
      {
        id: "v_shaped",
        icon: Sparkles,
        title: "V-Shaped / Fun",
        description: "Boosted bass and treble",
      },
      {
        id: "bright",
        icon: Music,
        title: "Bright / Detailed",
        description: "Enhanced treble detail",
      },
    ],
  },
  {
    id: "wireless-preference",
    title: "Do you need wireless connectivity?",
    subtitle: "Wireless offers freedom, wired offers simplicity",
    helpText:
      "Wireless headphones use 2.4GHz dongles (low latency) or Bluetooth. Wired never needs charging.",
    category: "standard",
    importance: 6,
    defaultValue: "either",
    options: [
      {
        id: "wireless-required",
        icon: Wifi,
        title: "Wireless Only",
        description: "Must be wireless, hate cables",
      },
      {
        id: "wireless-preferred",
        icon: Wifi,
        title: "Prefer Wireless",
        description: "But wired is OK",
      },
      {
        id: "wired-preferred",
        icon: Cable,
        title: "Prefer Wired",
        description: "Reliability, no charging",
      },
      {
        id: "either",
        icon: Headphones,
        title: "No Preference",
        description: "Either works for me",
      },
    ],
  },

  // ===========================================================================
  // ADVANCED Questions (Expert mode)
  // ===========================================================================
  {
    id: "noise-environment",
    title: "What's your listening environment?",
    subtitle: "This helps with isolation and open-back recommendations",
    helpText:
      "Open-back headphones sound great but leak audio. Noisy environments need good isolation or ANC.",
    category: "advanced",
    importance: 5,
    defaultValue: "quiet",
    showWhen: (answers) => {
      // Don't show for IEM-only users (they already get good isolation)
      const formFactors = answers["form-factor"];
      if (!Array.isArray(formFactors)) return true;
      return !formFactors.every((f) => f === "iem");
    },
    options: [
      {
        id: "quiet",
        icon: Home,
        title: "Quiet / Home Office",
        description: "Minimal background noise",
      },
      {
        id: "moderate",
        icon: Building,
        title: "Moderate / Shared Space",
        description: "Some ambient noise around",
      },
      {
        id: "noisy",
        icon: Volume2,
        title: "Noisy / Office",
        description: "Need good isolation",
      },
    ],
  },
];
