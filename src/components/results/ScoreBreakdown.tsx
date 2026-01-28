import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ScoreBreakdown as ScoreBreakdownType } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
  accentColor: "primary" | "accent" | "secondary";
}

// Display names for scoring categories
const categoryDisplayNames: Record<string, string> = {
  // Mouse categories
  gripFit: "Grip Fit",
  sizeMatch: "Size Match",
  weightMatch: "Weight Match",
  connectionMatch: "Connection",
  useCaseMatch: "Use Case",
  bonus: "Bonus Features",
  // Audio categories
  formFactorMatch: "Form Factor",
  primaryUseMatch: "Primary Use",
  microphoneMatch: "Microphone",
  comfortMatch: "Comfort",
  budgetMatch: "Budget",
  // Keyboard categories
  formFactor: "Form Factor",
  primaryUse: "Primary Use",
  switchType: "Switch Type",
  gamingFeatures: "Gaming Features",
  connectivity: "Connectivity",
  priorityFeature: "Priority Feature",
  budget: "Budget",
};

function getCategoryName(key: string): string {
  return categoryDisplayNames[key] || key;
}

function getScoreColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 60) return "bg-primary";
  if (percentage >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

const ScoreBreakdown = ({ breakdown, accentColor }: ScoreBreakdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = Object.entries(breakdown);

  return (
    <div className="mt-4 border-t border-border/50 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between text-sm transition-colors",
          "text-muted-foreground hover:text-foreground"
        )}
      >
        <span>Score breakdown</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {categories.map(([key, data]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {getCategoryName(key)}
                </span>
                <span className="font-medium">
                  {data.score}/{data.maxScore}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    getScoreColor(data.score, data.maxScore)
                  )}
                  style={{
                    width: `${(data.score / data.maxScore) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{data.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBreakdown;
