import { useState, useCallback } from "react";
import type { MouseQuizAnswers, AudioQuizAnswers, KeyboardQuizAnswers, MonitorQuizAnswers } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { Pencil, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AnswerSummaryProps {
  answers: MouseQuizAnswers | AudioQuizAnswers | KeyboardQuizAnswers | MonitorQuizAnswers;
  category: "mouse" | "audio" | "keyboard" | "monitor";
  quizPath?: string;
  searchParams?: URLSearchParams;
}

// Each entry: { key, label, options: [{value, label}] }
interface AnswerPill {
  key: string;
  label: string;
  currentValue: string;
  options: { value: string; label: string }[];
}

// ─── Option definitions per category ─────────────────────────────────────────

const mouseOptionDefs: Record<string, { label: string; options: { value: string; label: string }[] }> = {
  "hand-size": {
    label: "Hand Size",
    options: [
      { value: "small", label: "Small hands" },
      { value: "medium", label: "Medium hands" },
      { value: "large", label: "Large hands" },
    ],
  },
  "grip-style": {
    label: "Grip Style",
    options: [
      { value: "palm", label: "Palm grip" },
      { value: "claw", label: "Claw grip" },
      { value: "fingertip", label: "Fingertip grip" },
      { value: "relaxed-claw", label: "Relaxed claw" },
    ],
  },
  "weight-preference": {
    label: "Weight",
    options: [
      { value: "ultralight", label: "Ultralight (<60g)" },
      { value: "light", label: "Light (60-80g)" },
      { value: "medium", label: "Medium (80-100g)" },
      { value: "heavy", label: "Heavy (100g+)" },
    ],
  },
  wireless: {
    label: "Connection",
    options: [
      { value: "wireless", label: "Wireless" },
      { value: "wired", label: "Wired" },
      { value: "either", label: "Any connection" },
    ],
  },
  "primary-use": {
    label: "Primary Use",
    options: [
      { value: "precision", label: "Precision/Gaming" },
      { value: "productivity", label: "Productivity" },
      { value: "creative", label: "Creative work" },
      { value: "mixed", label: "Mixed use" },
    ],
  },
};

const audioOptionDefs: Record<string, { label: string; options: { value: string; label: string }[] }> = {
  "primary-use": {
    label: "Primary Use",
    options: [
      { value: "competitive", label: "Precision audio" },
      { value: "immersive", label: "Immersive" },
      { value: "mixed", label: "Mixed use" },
      { value: "streaming", label: "Streaming" },
    ],
  },
  "form-factor": {
    label: "Form Factor",
    options: [
      { value: "over-ear", label: "Over-ear headset" },
      { value: "over-ear-headphone", label: "Over-ear headphones" },
      { value: "iem", label: "IEMs" },
      { value: "open-back", label: "Open-back" },
    ],
  },
  "mic-needs": {
    label: "Microphone",
    options: [
      { value: "essential", label: "Mic essential" },
      { value: "nice-to-have", label: "Mic nice to have" },
      { value: "not-needed", label: "No mic needed" },
    ],
  },
  "session-length": {
    label: "Session Length",
    options: [
      { value: "short", label: "Short sessions" },
      { value: "medium", label: "Medium sessions" },
      { value: "long", label: "Long sessions" },
      { value: "all-day", label: "All-day comfort" },
    ],
  },
  budget: {
    label: "Budget",
    options: [
      { value: "budget", label: "Budget (<$75)" },
      { value: "mid-range", label: "Mid-range ($75-150)" },
      { value: "premium", label: "Premium ($150-300)" },
      { value: "no-limit", label: "No limit ($300+)" },
    ],
  },
};

const keyboardOptionDefs: Record<string, { label: string; options: { value: string; label: string }[] }> = {
  "primary-use": {
    label: "Primary Use",
    options: [
      { value: "competitive-gaming", label: "Competitive Gaming" },
      { value: "casual-gaming", label: "Casual Gaming" },
      { value: "productivity", label: "Productivity" },
      { value: "programming", label: "Programming" },
    ],
  },
  "form-factor": {
    label: "Form Factor",
    options: [
      { value: "full-size", label: "Full-Size" },
      { value: "tkl", label: "TKL (80%)" },
      { value: "75-percent", label: "75%" },
      { value: "60-65-percent", label: "60-65%" },
    ],
  },
  "switch-type": {
    label: "Switch Type",
    options: [
      { value: "linear", label: "Linear" },
      { value: "tactile", label: "Tactile" },
      { value: "clicky", label: "Clicky" },
      { value: "no-preference", label: "Any switch" },
    ],
  },
  connectivity: {
    label: "Connectivity",
    options: [
      { value: "wireless-essential", label: "Wireless essential" },
      { value: "wireless-preferred", label: "Wireless preferred" },
      { value: "wired-preferred", label: "Wired preferred" },
      { value: "no-preference", label: "Any connection" },
    ],
  },
  budget: {
    label: "Budget",
    options: [
      { value: "budget", label: "Budget (<$100)" },
      { value: "mid-range", label: "Mid-range ($100-175)" },
      { value: "premium", label: "Premium ($175-250)" },
      { value: "enthusiast", label: "Enthusiast ($250+)" },
    ],
  },
};

const monitorOptionDefs: Record<string, { label: string; options: { value: string; label: string }[] }> = {
  "primary-use": {
    label: "Primary Use",
    options: [
      { value: "gaming", label: "Gaming" },
      { value: "content-creation", label: "Content Creation" },
      { value: "office", label: "Office/Productivity" },
      { value: "mixed", label: "Mixed Use" },
    ],
  },
  "size-preference": {
    label: "Size",
    options: [
      { value: "compact", label: "24-25\"" },
      { value: "standard", label: "27\"" },
      { value: "large", label: "32\"" },
      { value: "ultrawide", label: "Ultrawide 34\"+" },
      { value: "any", label: "Any size" },
    ],
  },
  resolution: {
    label: "Resolution",
    options: [
      { value: "1080p", label: "1080p" },
      { value: "1440p", label: "1440p" },
      { value: "4k", label: "4K" },
      { value: "any", label: "Any resolution" },
    ],
  },
  "refresh-rate": {
    label: "Refresh Rate",
    options: [
      { value: "basic", label: "60-75Hz" },
      { value: "standard", label: "120-165Hz" },
      { value: "high", label: "240Hz+" },
      { value: "any", label: "Any refresh" },
    ],
  },
  "panel-type": {
    label: "Panel Type",
    options: [
      { value: "ips", label: "IPS" },
      { value: "va", label: "VA" },
      { value: "oled", label: "OLED" },
      { value: "any", label: "Any panel" },
    ],
  },
  budget: {
    label: "Budget",
    options: [
      { value: "budget", label: "<$300" },
      { value: "mid-range", label: "$300-600" },
      { value: "premium", label: "$600-1000" },
      { value: "enthusiast", label: "$1000+" },
    ],
  },
};

const categoryOptionDefs = {
  mouse: mouseOptionDefs,
  audio: audioOptionDefs,
  keyboard: keyboardOptionDefs,
  monitor: monitorOptionDefs,
};

// ─── Keys to display per category (in display order) ────────────────────────

const categoryDisplayKeys: Record<string, string[]> = {
  mouse: ["grip-style", "hand-size", "weight-preference", "wireless", "primary-use"],
  audio: ["primary-use", "form-factor", "mic-needs", "session-length", "budget"],
  keyboard: ["primary-use", "form-factor", "switch-type", "connectivity", "budget"],
  monitor: ["primary-use", "size-preference", "resolution", "refresh-rate", "panel-type", "budget"],
};

// ─── Component ──────────────────────────────────────────────────────────────

const AnswerSummary = ({ answers, category }: AnswerSummaryProps) => {
  const [, setSearchParams] = useSearchParams();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [flashKey, setFlashKey] = useState<string | null>(null);

  const accentColor = category === "mouse" ? "primary" : category === "audio" ? "accent" : category === "monitor" ? "tertiary" : "secondary";
  const optionDefs = categoryOptionDefs[category];
  const displayKeys = categoryDisplayKeys[category];

  const pills: AnswerPill[] = displayKeys
    .filter((key) => {
      const val = (answers as unknown as Record<string, unknown>)[key];
      return val !== undefined && val !== "";
    })
    .map((key) => {
      const def = optionDefs[key];
      const rawVal = (answers as unknown as Record<string, unknown>)[key];
      const currentValue = Array.isArray(rawVal) ? rawVal.join(",") : String(rawVal);
      const label = def
        ? (Array.isArray(rawVal)
            ? rawVal.map((v) => def.options.find((o) => o.value === v)?.label || v).join(", ")
            : def.options.find((o) => o.value === currentValue)?.label || currentValue)
        : currentValue;
      return {
        key,
        label,
        currentValue,
        options: def?.options || [],
      };
    });

  const handleSelect = useCallback((key: string, newValue: string, newLabel: string) => {
    setOpenKey(null);
    setFlashKey(key);
    setTimeout(() => setFlashKey(null), 1200);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, newValue);
      return next;
    });
    toast.success(`Updated to "${newLabel}" — recalculated matches!`, { duration: 2500 });
  }, [setSearchParams]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {pills.map((pill, index) => (
        <span key={pill.key} className="flex items-center gap-2">
          <Popover open={openKey === pill.key} onOpenChange={(open) => setOpenKey(open ? pill.key : null)}>
            <PopoverTrigger asChild>
              <button
                type="button"
                title={`Click to change: ${pill.label}`}
                className={cn(
                  "group flex items-center rounded-full px-3 py-1 text-sm cursor-pointer hover:ring-1 hover:ring-current transition-all",
                  accentColor === "primary" && "bg-primary/10 text-primary",
                  accentColor === "accent" && "bg-accent/10 text-accent",
                  accentColor === "secondary" && "bg-secondary text-foreground",
                  accentColor === "tertiary" && "bg-violet-500/10 text-violet-600 dark:text-violet-400",
                  flashKey === pill.key && "animate-pulse ring-1 ring-current"
                )}
              >
                {pill.label}
                <Pencil className="h-3 w-3 ml-1 opacity-40 group-hover:opacity-70 transition-opacity duration-150" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-56 p-1.5"
              style={{ background: "var(--v2-bg-card)", borderColor: "var(--v2-border-bright)" }}
            >
              {pill.options.map((opt) => {
                const isActive = pill.currentValue === opt.value || pill.currentValue.split(",").includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(pill.key, opt.value, opt.label)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? cn(
                            accentColor === "primary" && "bg-primary/15 text-primary",
                            accentColor === "accent" && "bg-accent/15 text-accent",
                            accentColor === "secondary" && "bg-secondary text-foreground",
                            accentColor === "tertiary" && "bg-violet-500/15 text-violet-400"
                          )
                        : "text-slate-300 hover:bg-slate-800"
                    )}
                  >
                    {opt.label}
                    {isActive && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </PopoverContent>
          </Popover>
          {index < pills.length - 1 && (
            <span className="text-muted-foreground">•</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default AnswerSummary;
