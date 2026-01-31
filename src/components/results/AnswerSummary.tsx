import type { MouseQuizAnswers, AudioQuizAnswers, KeyboardQuizAnswers, MonitorQuizAnswers } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface AnswerSummaryProps {
  answers: MouseQuizAnswers | AudioQuizAnswers | KeyboardQuizAnswers | MonitorQuizAnswers;
  category: "mouse" | "audio" | "keyboard" | "monitor";
}

// Display label mappings for mouse quiz answers
const mouseAnswerLabels: Record<keyof MouseQuizAnswers, Record<string, string>> = {
  "hand-size": {
    small: "Small hands",
    medium: "Medium hands",
    large: "Large hands",
  },
  "grip-style": {
    palm: "Palm grip",
    claw: "Claw grip",
    fingertip: "Fingertip grip",
    "relaxed-claw": "Relaxed claw",
  },
  "weight-preference": {
    ultralight: "Ultralight (<60g)",
    light: "Light (60-80g)",
    medium: "Medium (80-100g)",
    heavy: "Heavy (100g+)",
  },
  wireless: {
    wireless: "Wireless",
    wired: "Wired",
    either: "Any connection",
  },
  "primary-use": {
    precision: "Precision/Gaming",
    productivity: "Productivity",
    creative: "Creative work",
    mixed: "Mixed use",
  },
};

// Display label mappings for audio quiz answers
const audioAnswerLabels: Record<keyof AudioQuizAnswers, Record<string, string>> = {
  "primary-use": {
    competitive: "Precision audio",
    immersive: "Immersive",
    mixed: "Mixed use",
    streaming: "Streaming",
  },
  "form-factor": {
    "over-ear": "Over-ear headset",
    "over-ear-headphone": "Over-ear headphones",
    iem: "IEMs",
    "open-back": "Open-back",
  },
  "mic-needs": {
    essential: "Mic essential",
    "nice-to-have": "Mic nice to have",
    "not-needed": "No mic needed",
  },
  "session-length": {
    short: "Short sessions",
    medium: "Medium sessions",
    long: "Long sessions",
    "all-day": "All-day comfort",
  },
  budget: {
    budget: "Budget (<$75)",
    "mid-range": "Mid-range ($75-150)",
    premium: "Premium ($150-300)",
    "no-limit": "No limit ($300+)",
  },
};

// Display label mappings for keyboard quiz answers
const keyboardAnswerLabels: Record<keyof KeyboardQuizAnswers, Record<string, string>> = {
  "primary-use": {
    "competitive-gaming": "Competitive Gaming",
    "casual-gaming": "Casual Gaming",
    productivity: "Productivity",
    programming: "Programming",
  },
  "form-factor": {
    "full-size": "Full-Size",
    tkl: "TKL (80%)",
    "75-percent": "75%",
    "60-65-percent": "60-65%",
  },
  "switch-type": {
    linear: "Linear",
    tactile: "Tactile",
    clicky: "Clicky",
    "no-preference": "Any switch",
  },
  "gaming-features": {
    essential: "Gaming essential",
    "nice-to-have": "Gaming preferred",
    "not-important": "Gaming optional",
  },
  connectivity: {
    "wireless-essential": "Wireless essential",
    "wireless-preferred": "Wireless preferred",
    "wired-preferred": "Wired preferred",
    "no-preference": "Any connection",
  },
  "priority-feature": {
    performance: "Performance focus",
    "typing-feel": "Typing feel",
    customization: "Customization",
    quiet: "Quiet operation",
  },
  budget: {
    budget: "Budget (<$100)",
    "mid-range": "Mid-range ($100-175)",
    premium: "Premium ($175-250)",
    enthusiast: "Enthusiast ($250+)",
  },
};

// Display label mappings for monitor quiz answers
const monitorAnswerLabels: Record<keyof MonitorQuizAnswers, Record<string, string>> = {
  "primary-use": {
    gaming: "Gaming",
    "content-creation": "Content Creation",
    office: "Office/Productivity",
    mixed: "Mixed Use",
  },
  "size-preference": {
    compact: "24-25\"",
    standard: "27\"",
    large: "32\"",
    ultrawide: "Ultrawide 34\"+",
    any: "Any size",
  },
  resolution: {
    "1080p": "1080p",
    "1440p": "1440p",
    "4k": "4K",
    any: "Any resolution",
  },
  "refresh-rate": {
    basic: "60-75Hz",
    standard: "120-165Hz",
    high: "240Hz+",
    any: "Any refresh",
  },
  "panel-type": {
    ips: "IPS",
    va: "VA",
    oled: "OLED",
    any: "Any panel",
  },
  budget: {
    budget: "<$300",
    "mid-range": "$300-600",
    premium: "$600-1000",
    enthusiast: "$1000+",
  },
  curved: {
    flat: "Flat",
    curved: "Curved",
    either: "Either",
  },
  "color-accuracy": {
    basic: "Basic color",
    standard: "Standard color",
    professional: "Professional color",
  },
  "hdr-needs": {
    "not-needed": "No HDR",
    "nice-to-have": "HDR preferred",
    important: "HDR important",
  },
  features: {
    "usb-c": "USB-C",
    "ergonomic-stand": "Ergonomic stand",
    speakers: "Built-in speakers",
    any: "Any features",
  },
};

function getMouseLabel(key: keyof MouseQuizAnswers, value: string | string[]): string {
  const labels = mouseAnswerLabels[key];
  if (Array.isArray(value)) {
    return value.map((v) => labels?.[v] || v).join(", ");
  }
  return labels?.[value] || value;
}

function getAudioLabel(key: keyof AudioQuizAnswers, value: string | string[]): string {
  const labels = audioAnswerLabels[key];
  if (Array.isArray(value)) {
    return value.map((v) => labels?.[v] || v).join(", ");
  }
  return labels?.[value] || value;
}

function getKeyboardLabel(key: keyof KeyboardQuizAnswers, value: string | string[]): string {
  const labels = keyboardAnswerLabels[key];
  if (Array.isArray(value)) {
    return value.map((v) => labels?.[v] || v).join(", ");
  }
  return labels?.[value] || value;
}

function getMonitorLabel(key: keyof MonitorQuizAnswers, value: string | string[]): string {
  const labels = monitorAnswerLabels[key];
  if (Array.isArray(value)) {
    return value.map((v) => labels?.[v] || v).join(", ");
  }
  return labels?.[value] || value;
}

const AnswerSummary = ({ answers, category }: AnswerSummaryProps) => {
  const accentColor = category === "mouse" ? "primary" : category === "audio" ? "accent" : category === "monitor" ? "tertiary" : "secondary";

  const labels: string[] = [];

  if (category === "mouse") {
    const mouseAnswers = answers as MouseQuizAnswers;
    // Order: grip, hands, weight, connection, use
    labels.push(getMouseLabel("grip-style", mouseAnswers["grip-style"]));
    labels.push(getMouseLabel("hand-size", mouseAnswers["hand-size"]));
    labels.push(getMouseLabel("weight-preference", mouseAnswers["weight-preference"]));
    labels.push(getMouseLabel("wireless", mouseAnswers["wireless"]));
    labels.push(getMouseLabel("primary-use", mouseAnswers["primary-use"]));
  } else if (category === "audio") {
    const audioAnswers = answers as AudioQuizAnswers;
    // Order: use, form, mic, session, budget
    labels.push(getAudioLabel("primary-use", audioAnswers["primary-use"]));
    labels.push(getAudioLabel("form-factor", audioAnswers["form-factor"]));
    labels.push(getAudioLabel("mic-needs", audioAnswers["mic-needs"]));
    labels.push(getAudioLabel("session-length", audioAnswers["session-length"]));
    labels.push(getAudioLabel("budget", audioAnswers["budget"]));
  } else if (category === "keyboard") {
    const keyboardAnswers = answers as KeyboardQuizAnswers;
    // Order: use, form, switch, connectivity, budget
    labels.push(getKeyboardLabel("primary-use", keyboardAnswers["primary-use"]));
    labels.push(getKeyboardLabel("form-factor", keyboardAnswers["form-factor"]));
    labels.push(getKeyboardLabel("switch-type", keyboardAnswers["switch-type"]));
    labels.push(getKeyboardLabel("connectivity", keyboardAnswers["connectivity"]));
    labels.push(getKeyboardLabel("budget", keyboardAnswers["budget"]));
  } else {
    const monitorAnswers = answers as MonitorQuizAnswers;
    // Order: use, size, resolution, refresh, panel, budget
    labels.push(getMonitorLabel("primary-use", monitorAnswers["primary-use"]));
    labels.push(getMonitorLabel("size-preference", monitorAnswers["size-preference"]));
    labels.push(getMonitorLabel("resolution", monitorAnswers["resolution"]));
    if (monitorAnswers["refresh-rate"]) {
      labels.push(getMonitorLabel("refresh-rate", monitorAnswers["refresh-rate"]));
    }
    if (monitorAnswers["panel-type"]) {
      labels.push(getMonitorLabel("panel-type", monitorAnswers["panel-type"]));
    }
    labels.push(getMonitorLabel("budget", monitorAnswers["budget"]));
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {labels.map((label, index) => (
        <span key={index} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-sm",
              accentColor === "primary" && "bg-primary/10 text-primary",
              accentColor === "accent" && "bg-accent/10 text-accent",
              accentColor === "secondary" && "bg-secondary text-foreground",
              accentColor === "tertiary" && "bg-violet-500/10 text-violet-600 dark:text-violet-400"
            )}
          >
            {label}
          </span>
          {index < labels.length - 1 && (
            <span className="text-muted-foreground">•</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default AnswerSummary;
