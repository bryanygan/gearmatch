import { memo } from "react";
import { cn } from "@/lib/utils";
import { Zap, Target, Wrench, Clock } from "lucide-react";
import type { QuizMode, QuizAccentColor } from "@/lib/quiz/types";
import { QUIZ_MODE_CONFIG } from "@/lib/quiz/types";

interface QuizModeSelectorProps {
  selectedMode: QuizMode;
  onSelectMode: (mode: QuizMode) => void;
  accentColor?: QuizAccentColor;
}

const modeIcons = {
  quick: Zap,
  personalized: Target,
  expert: Wrench,
} as const;

const QuizModeSelector = memo(function QuizModeSelector({
  selectedMode,
  onSelectMode,
  accentColor = "primary",
}: QuizModeSelectorProps) {
  const accentClasses = {
    primary: {
      border: "border-primary",
      bg: "bg-primary/10",
      glow: "shadow-primary/20",
      iconBg: "bg-primary/20",
      iconText: "text-primary",
      fill: "bg-primary",
      badge: "bg-primary/10 text-primary",
    },
    accent: {
      border: "border-accent",
      bg: "bg-accent/10",
      glow: "shadow-accent/20",
      iconBg: "bg-accent/20",
      iconText: "text-accent",
      fill: "bg-accent",
      badge: "bg-accent/10 text-accent",
    },
    secondary: {
      border: "border-foreground",
      bg: "bg-secondary",
      glow: "shadow-foreground/10",
      iconBg: "bg-secondary",
      iconText: "text-foreground",
      fill: "bg-foreground",
      badge: "bg-secondary text-foreground",
    },
  };

  const accent = accentClasses[accentColor];

  const modes = Object.keys(QUIZ_MODE_CONFIG) as QuizMode[];

  return (
    <div className="space-y-4" role="radiogroup" aria-label="Quiz detail level">
      <div className="text-center">
        <h2 className="font-display text-xl font-bold md:text-2xl">
          How detailed would you like to go?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          More questions = more personalized recommendations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {modes.map((mode) => {
          const config = QUIZ_MODE_CONFIG[mode];
          const Icon = modeIcons[mode];
          const isSelected = selectedMode === mode;
          const isRecommended = mode === "personalized";

          return (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectMode(mode)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
                isSelected
                  ? `${accent.border} ${accent.bg} shadow-lg ${accent.glow}`
                  : "border-border bg-card hover:border-muted-foreground/50"
              )}
            >
              {/* Recommended badge */}
              {isRecommended && (
                <div
                  className={cn(
                    "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-medium",
                    accent.badge
                  )}
                >
                  Recommended
                </div>
              )}

              {/* Selection indicator */}
              <div
                className={cn(
                  "absolute right-3 top-3 h-5 w-5 rounded-full border-2 transition-all duration-200",
                  isSelected
                    ? `${accent.border} ${accent.bg}`
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && (
                  <div
                    className={cn("absolute inset-1 rounded-full", accent.fill)}
                  />
                )}
              </div>

              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-200",
                  isSelected ? accent.iconBg : "bg-secondary"
                )}
              >
                <Icon
                  className={cn(
                    "h-7 w-7 transition-colors duration-200",
                    isSelected ? accent.iconText : "text-muted-foreground"
                  )}
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h4
                  className={cn(
                    "font-display text-base font-semibold transition-colors duration-200",
                    isSelected ? "text-foreground" : "text-foreground/90"
                  )}
                >
                  {config.label}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {config.description}
                </p>
              </div>

              {/* Time estimate */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>~{config.estimatedMinutes} min</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default QuizModeSelector;
