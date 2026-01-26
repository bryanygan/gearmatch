import { Check, AlertTriangle, Trophy, Star } from "lucide-react";
import type { ScoredProduct } from "@/lib/scoring";
import type { MouseProduct, AudioProduct } from "@/types/products";
import { getMatchQuality, getTopReasons, getTopConcerns } from "@/lib/scoring";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScoreBreakdown from "./ScoreBreakdown";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  scoredProduct: ScoredProduct<MouseProduct | AudioProduct>;
  rank: number;
  isTopPick: boolean;
  accentColor: "primary" | "accent";
  onViewDetails?: () => void;
}

// Helper to get display-friendly spec tags for mouse products
function getMouseSpecTags(product: MouseProduct): string[] {
  const tags: string[] = [];
  const attrs = product.core_attributes;

  // Weight
  tags.push(`${attrs.mouse_weight_g}g`);

  // Connection
  if (attrs.wireless) {
    tags.push("Wireless");
  } else {
    tags.push("Wired");
  }

  // Grip styles
  const grips = attrs.mouse_grip_fit.map((g) => {
    if (g === "palm") return "Palm";
    if (g === "claw") return "Claw";
    if (g === "fingertip") return "Fingertip";
    return g;
  });
  if (grips.length > 0) {
    tags.push(grips.join("/"));
  }

  // Size class
  tags.push(
    attrs.mouse_size_class.charAt(0).toUpperCase() +
      attrs.mouse_size_class.slice(1)
  );

  return tags;
}

// Helper to get display-friendly spec tags for audio products
function getAudioSpecTags(product: AudioProduct): string[] {
  const tags: string[] = [];
  const attrs = product.core_attributes;

  // Battery life for wireless
  if (attrs.wireless && attrs.battery_life_hr) {
    tags.push(`${attrs.battery_life_hr}hr Battery`);
  }

  // Connection type
  if (attrs.wireless) {
    tags.push("Wireless");
  } else {
    tags.push("Wired");
  }

  // Open-back vs closed
  if (attrs.audio_open_back) {
    tags.push("Open-back");
  } else if (attrs.audio_type === "headset" || attrs.audio_type === "headphone") {
    tags.push("Closed-back");
  }

  // Mic type
  if (attrs.audio_has_mic) {
    if (attrs.audio_mic_type === "detachable_boom") {
      tags.push("Detachable Mic");
    } else if (attrs.audio_mic_type === "fixed_boom") {
      tags.push("Boom Mic");
    } else if (attrs.audio_mic_type === "inline") {
      tags.push("Inline Mic");
    }
  }

  // Comfort rating
  tags.push(`${attrs.audio_comfort.charAt(0).toUpperCase() + attrs.audio_comfort.slice(1)} Comfort`);

  return tags;
}

function getSpecTags(
  product: MouseProduct | AudioProduct
): string[] {
  if (product.category === "mouse") {
    return getMouseSpecTags(product as MouseProduct);
  }
  return getAudioSpecTags(product as AudioProduct);
}

function getScoreColorClass(score: number, accentColor: "primary" | "accent"): string {
  if (score >= 90) return "text-green-400";
  if (score >= 80) return accentColor === "primary" ? "text-primary" : "text-accent";
  if (score >= 70) return "text-yellow-400";
  if (score >= 60) return "text-muted-foreground";
  return "text-orange-400";
}

function formatPriceRange(range: [number, number]): string {
  if (range[0] === range[1]) {
    return `$${range[0]}`;
  }
  return `$${range[0]} - $${range[1]}`;
}

const RecommendationCard = ({
  scoredProduct,
  rank,
  isTopPick,
  accentColor,
  onViewDetails,
}: RecommendationCardProps) => {
  const { product, score, breakdown } = scoredProduct;
  const matchQuality = getMatchQuality(score);
  const topReasons = getTopReasons(scoredProduct, 3);
  const topConcerns = getTopConcerns(scoredProduct, 2);
  const specTags = getSpecTags(product);

  // Determine if this is the #1 pick
  const isFirstPick = rank === 1 && isTopPick;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isTopPick
          ? "border-2 hover:shadow-lg"
          : "border hover:shadow-md",
        isTopPick && accentColor === "primary" && "border-primary/30 hover:border-primary/50",
        isTopPick && accentColor === "accent" && "border-accent/30 hover:border-accent/50",
        !isTopPick && "border-border/50 hover:border-border",
        isFirstPick && accentColor === "primary" && "shadow-primary/10 shadow-lg",
        isFirstPick && accentColor === "accent" && "shadow-accent/10 shadow-lg"
      )}
    >
      {/* Glow effect for top pick */}
      {isFirstPick && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-5",
            accentColor === "primary" ? "bg-primary" : "bg-accent"
          )}
        />
      )}

      <div className={cn("p-6", isTopPick ? "space-y-4" : "space-y-3")}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            {/* Rank badge */}
            <div className="mb-2 flex items-center gap-2">
              {isTopPick ? (
                <Badge
                  className={cn(
                    "gap-1",
                    accentColor === "primary"
                      ? "bg-primary/20 text-primary hover:bg-primary/20"
                      : "bg-accent/20 text-accent hover:bg-accent/20"
                  )}
                >
                  {isFirstPick ? (
                    <>
                      <Trophy className="h-3 w-3" />
                      Best Match
                    </>
                  ) : (
                    <>
                      <Star className="h-3 w-3" />
                      #{rank} Pick
                    </>
                  )}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Also Consider
                </Badge>
              )}
            </div>

            {/* Product name and brand */}
            <h3
              className={cn(
                "font-display font-bold",
                isTopPick ? "text-xl" : "text-lg"
              )}
            >
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>

          {/* Score */}
          <div className="text-right">
            <div
              className={cn(
                "font-display font-bold",
                isTopPick ? "text-3xl" : "text-2xl",
                getScoreColorClass(score, accentColor)
              )}
            >
              {score}%
            </div>
            <p className="text-xs text-muted-foreground">{matchQuality}</p>
          </div>
        </div>

        {/* Spec tags */}
        <div className="flex flex-wrap gap-2">
          {specTags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Match reasons */}
        {topReasons.length > 0 && (
          <div className="space-y-1.5">
            {topReasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}

        {/* Concerns */}
        {topConcerns.length > 0 && (
          <div className="space-y-1.5">
            {topConcerns.map((concern, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
                <span>{concern}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price range */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            {formatPriceRange(product.price_range_usd)}
          </span>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className={cn(
                "text-sm transition-colors",
                accentColor === "primary"
                  ? "text-primary hover:text-primary/80"
                  : "text-accent hover:text-accent/80"
              )}
            >
              View details
            </button>
          )}
        </div>

        {/* Score breakdown (collapsible) */}
        {isTopPick && (
          <ScoreBreakdown breakdown={breakdown} accentColor={accentColor} />
        )}
      </div>
    </Card>
  );
};

export default RecommendationCard;
