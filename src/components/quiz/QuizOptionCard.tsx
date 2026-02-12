import { memo } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import QuizHelpTooltip from "./QuizHelpTooltip";

interface QuizOptionCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  accentColor?: "primary" | "accent" | "secondary" | "tertiary";
  multiSelect?: boolean;
  /** Optional help text shown in tooltip */
  helpText?: string;
}

const QuizOptionCard = memo(function QuizOptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  accentColor = "primary",
  multiSelect = false,
  helpText,
}: QuizOptionCardProps) {
  const accentClasses = {
    primary: {
      border: "border-primary",
      bg: "bg-primary/10",
      glow: "shadow-primary/20",
      iconBg: "bg-primary/20",
      iconText: "text-primary",
      fill: "bg-primary",
    },
    accent: {
      border: "border-accent",
      bg: "bg-accent/10",
      glow: "shadow-accent/20",
      iconBg: "bg-accent/20",
      iconText: "text-accent",
      fill: "bg-accent",
    },
    secondary: {
      border: "border-foreground",
      bg: "bg-secondary",
      glow: "shadow-foreground/10",
      iconBg: "bg-secondary",
      iconText: "text-foreground",
      fill: "bg-foreground",
    },
    tertiary: {
      border: "border-violet-500",
      bg: "bg-violet-500/10",
      glow: "shadow-violet-500/20",
      iconBg: "bg-violet-500/20",
      iconText: "text-violet-600 dark:text-violet-400",
      fill: "bg-violet-600",
    },
  };

  const accent = accentClasses[accentColor];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-2 md:gap-3 rounded-xl border-2 p-3 md:p-5 text-center transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        selected
          ? `${accent.border} ${accent.bg} shadow-lg ${accent.glow}`
          : "border-border bg-card hover:border-muted-foreground/50"
      )}
    >
      {/* Help tooltip (top left) */}
      {helpText && (
        <div
          className="absolute left-3 top-3"
          onClick={(e) => e.stopPropagation()}
        >
          <QuizHelpTooltip content={helpText} />
        </div>
      )}

      {/* Selection indicator - checkbox for multiSelect, radio for single */}
      <div
        className={cn(
          "absolute right-3 top-3 h-5 w-5 border-2 transition-all duration-200",
          multiSelect ? "rounded-md" : "rounded-full",
          selected
            ? `${accent.border} ${accent.bg}`
            : "border-muted-foreground/30"
        )}
      >
        {selected && (
          multiSelect ? (
            <svg
              className={cn("absolute inset-0.5 h-3.5 w-3.5", accent.iconText)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div
              className={cn("absolute inset-1 rounded-full", accent.fill)}
            />
          )
        )}
      </div>

      {Icon && (
        <div
          className={cn(
            "flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl transition-colors duration-200",
            selected ? accent.iconBg : "bg-secondary"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 md:h-7 md:w-7 transition-colors duration-200",
              selected ? accent.iconText : "text-muted-foreground"
            )}
          />
        </div>
      )}

      <div className="space-y-1">
        <h4
          className={cn(
            "font-display text-base font-semibold transition-colors duration-200",
            selected ? "text-foreground" : "text-foreground/90"
          )}
        >
          {title}
        </h4>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </button>
  );
});

export default QuizOptionCard;
