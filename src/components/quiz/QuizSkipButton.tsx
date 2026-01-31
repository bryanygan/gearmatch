import { memo } from "react";
import { SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import QuizHelpTooltip from "./QuizHelpTooltip";

interface QuizSkipButtonProps {
  onSkip: () => void;
  defaultValue?: string | string[];
  accentColor?: "primary" | "accent" | "secondary" | "tertiary";
}

/**
 * Skip button for quiz questions.
 * Shows what default value will be applied when skipped.
 */
const QuizSkipButton = memo(function QuizSkipButton({
  onSkip,
  defaultValue,
  accentColor = "primary",
}: QuizSkipButtonProps) {
  const formatDefault = () => {
    if (!defaultValue) return "use recommended";
    if (Array.isArray(defaultValue)) {
      if (defaultValue.length === 0) return "use recommended";
      return `will use: ${defaultValue.join(", ")}`;
    }
    return `will use: ${defaultValue}`;
  };

  const tooltipContent = defaultValue
    ? `Skip this question. We'll use "${Array.isArray(defaultValue) ? defaultValue.join(", ") : defaultValue}" as the default.`
    : "Skip this question and use our recommended default.";

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={onSkip}
        className={cn(
          "group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all",
          "hover:bg-secondary hover:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          accentColor === "primary" && "focus:ring-primary",
          accentColor === "accent" && "focus:ring-accent",
          accentColor === "secondary" && "focus:ring-foreground",
          accentColor === "tertiary" && "focus:ring-violet-500"
        )}
      >
        <SkipForward className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        <span>Skip</span>
        {defaultValue && (
          <span className="text-xs opacity-70">({formatDefault()})</span>
        )}
      </button>
      <QuizHelpTooltip content={tooltipContent} side="right" />
    </div>
  );
});

export default QuizSkipButton;
