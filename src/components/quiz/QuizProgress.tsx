import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  accentColor?: "primary" | "accent" | "secondary";
}

const QuizProgress = ({
  currentStep,
  totalSteps,
  onBack,
  accentColor = "primary",
}: QuizProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center gap-4">
      {onBack && currentStep > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentStep} of {totalSteps}
          </span>
          <span
            className={cn(
              "font-medium",
              accentColor === "primary" && "text-primary",
              accentColor === "accent" && "text-accent",
              accentColor === "secondary" && "text-foreground"
            )}
          >
            {Math.round(progress)}%
          </span>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out",
              accentColor === "primary" && "bg-primary",
              accentColor === "accent" && "bg-accent",
              accentColor === "secondary" && "bg-foreground"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
