import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryProgress } from "@/lib/quiz/types";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  accentColor?: "primary" | "accent" | "secondary" | "tertiary";
  /** Category progress for enhanced display */
  categories?: CategoryProgress[];
  /** Current category being answered */
  currentCategory?: string;
}

const QuizProgress = ({
  currentStep,
  totalSteps,
  onBack,
  accentColor = "primary",
  categories,
  currentCategory,
}: QuizProgressProps) => {
  // Progress is based on completed questions, so last question shows (n-1)/n
  // This reserves 100% for the results page
  const rawProgress = totalSteps > 0 ? ((currentStep - 1) / totalSteps) * 100 : 0;
  const progress = Math.min(100, Math.max(0, rawProgress));

  return (
    <div className="space-y-1.5">
      {/* Category pills (when categories provided) */}
      {categories && categories.length > 0 && (
        <div className="flex items-center justify-center gap-2 text-xs">
          {categories.map((cat, index) => {
            const isComplete = cat.completed === cat.total;
            const isCurrent = cat.name === currentCategory;

            return (
              <div key={cat.name} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-muted-foreground/40">→</span>
                )}
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 transition-colors",
                    isComplete && "bg-green-500/20 text-green-600 dark:text-green-400",
                    isCurrent && !isComplete && cn(
                      accentColor === "primary" && "bg-primary/20 text-primary",
                      accentColor === "accent" && "bg-accent/20 text-accent",
                      accentColor === "secondary" && "bg-secondary text-foreground",
                      accentColor === "tertiary" && "bg-violet-500/20 text-violet-600 dark:text-violet-400"
                    ),
                    !isComplete && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {cat.label}
                  <span className="ml-1 opacity-70">
                    ({cat.completed}/{cat.total})
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress bar row */}
      <div className="flex items-center gap-4">
        {onBack && currentStep > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0"
            aria-label="Go to previous question"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between text-sm" style={{ fontFamily: "var(--v2-font-ui)" }}>
            <span style={{ color: "var(--v2-text-muted)", letterSpacing: "0.04em" }}>
              Question {currentStep} of {totalSteps}
            </span>
            <span
              className={cn(
                "font-medium",
                accentColor === "primary" && "text-primary",
                accentColor === "accent" && "text-accent",
                accentColor === "secondary" && "text-foreground",
                accentColor === "tertiary" && "text-violet-600 dark:text-violet-400"
              )}
            >
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="relative h-2 w-full overflow-hidden rounded-full"
            style={{ background: "var(--v2-border)" }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Quiz progress: question ${currentStep} of ${totalSteps}`}
          >
            <div
              className={cn(
                "h-full transition-all duration-500 ease-out",
                accentColor === "primary" && "bg-primary",
                accentColor === "accent" && "bg-accent",
                accentColor === "secondary" && "bg-foreground",
                accentColor === "tertiary" && "bg-violet-600"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;