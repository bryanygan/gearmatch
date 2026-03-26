import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ScoreBreakdown as ScoreBreakdownType } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import QuizHelpTooltip from "@/components/quiz/QuizHelpTooltip";

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
  accentColor: "primary" | "accent" | "secondary" | "tertiary";
}

// Tooltip explanations for scoring categories
const categoryTooltips: Record<string, string> = {
  gripFit: "How well the mouse shape supports your grip style",
  sizeMatch: "How well the mouse dimensions match your hand size",
  weightMatch: "How well the mouse weight matches your preference",
  connectionMatch: "Whether the mouse matches your wired/wireless preference",
  useCaseMatch: "How well suited the mouse is for your primary use case",
  bonus: "Extra points for features that complement your setup",
  bonusPoints: "Extra points for features that complement your setup",
  formFactorMatch: "Whether the size and form factor match your preference",
  formFactor: "Whether the size and form factor match your preference",
  primaryUseMatch: "How well suited this is for your primary use",
  primaryUse: "How well suited this is for your primary use",
  microphoneMatch: "How well the microphone matches your needs",
  comfortMatch: "Predicted comfort for your session length",
  budgetMatch: "How well the price fits your budget",
  budget: "How well the price fits your budget",
  switchType: "How well the switch type matches your preference",
  gamingFeatures: "How well gaming-specific features match your needs",
  connectivity: "Whether connectivity options match your preference",
  priorityFeature: "How well the keyboard's strengths match your priority",
  switchTechnology: "How well the switch technology matches your preference",
  resolutionMatch: "Whether the resolution matches your preference",
  refreshRateMatch: "Whether the refresh rate meets your needs",
  panelTypeMatch: "How well the panel technology fits your use case",
  colorAccuracy: "How well the color accuracy fits your needs",
  hdrPerformance: "How well HDR performance matches your requirements",
  featuresMatch: "How well extra features (USB-C, ergonomics, etc.) match",
  curvedPreference: "Whether flat/curved matches your preference",
  quality_availability: "Product availability and verification quality bonus",
};

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
  // Monitor categories
  primaryUseFit: "Primary Use Fit",
  resolutionMatch: "Resolution Match",
  refreshRateMatch: "Refresh Rate",
  panelTypeMatch: "Panel Type",
  colorAccuracy: "Color Accuracy",
  hdrPerformance: "HDR Performance",
  featuresMatch: "Features",
  curvedPreference: "Curved Preference",
  bonusPoints: "Bonus Points",
  quality_availability: "Quality & Availability",
  switchTechnology: "Switch Technology",
  mediaControls: "Media Controls",
  keycapMaterial: "Keycap Material",
};

function getCategoryName(key: string): string {
  return categoryDisplayNames[key] || key;
}

function getScoreColor(score: number, maxScore: number, key?: string): string {
  if (key === "bonus" || key === "bonusPoints") return "bg-green-500";
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 60) return "bg-primary";
  if (percentage >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

const ScoreBreakdown = ({ breakdown, accentColor: _accentColor }: ScoreBreakdownProps) => {
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
                <span className="flex items-center gap-1 text-muted-foreground">
                  {getCategoryName(key)}
                  {categoryTooltips[key] && (
                    <QuizHelpTooltip content={categoryTooltips[key]} side="right" />
                  )}
                </span>
                <span className="font-medium">
                  {data.score}/{data.maxScore}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    getScoreColor(data.score, data.maxScore, key)
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
