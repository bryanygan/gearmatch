import { memo, type ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuizHelpTooltipProps {
  content: string;
  children?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

/**
 * Help tooltip component for quiz questions and options.
 * Displays an info icon that shows help text on hover/focus.
 */
const QuizHelpTooltip = memo(function QuizHelpTooltip({
  content,
  children,
  side = "top",
}: QuizHelpTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children ?? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="More information"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs text-sm">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default QuizHelpTooltip;
