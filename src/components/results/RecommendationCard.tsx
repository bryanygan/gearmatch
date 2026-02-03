import { memo, useMemo } from "react";
import { Check, AlertTriangle, Trophy, Star, ExternalLink, Building2, ShoppingBag } from "lucide-react";
import type { ScoredProduct } from "@/lib/scoring";
import type { MouseProduct, AudioProduct, KeyboardProduct, MonitorProduct } from "@/types/products";
import { getMatchQuality, getTopReasons, getTopConcerns } from "@/lib/scoring";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScoreBreakdown from "./ScoreBreakdown";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  scoredProduct: ScoredProduct<MouseProduct | AudioProduct | KeyboardProduct | MonitorProduct>;
  rank: number;
  isTopPick: boolean;
  accentColor: "primary" | "accent" | "secondary" | "tertiary";
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

// Helper to get display-friendly spec tags for keyboard products
function getKeyboardSpecTags(product: KeyboardProduct): string[] {
  const tags: string[] = [];
  const attrs = product.core_attributes;

  // Form factor
  const formFactorLabels: Record<string, string> = {
    "full-size": "Full-Size",
    tkl: "TKL",
    "75-percent": "75%",
    "65-percent": "65%",
    "60-percent": "60%",
  };
  tags.push(formFactorLabels[attrs.keyboard_form_factor] || attrs.keyboard_form_factor);

  // Switch type/feel
  const feelLabels: Record<string, string> = {
    linear: "Linear",
    tactile: "Tactile",
    clicky: "Clicky",
  };
  if (attrs.keyboard_switch_feel) {
    tags.push(feelLabels[attrs.keyboard_switch_feel] || attrs.keyboard_switch_feel);
  }

  // Connection
  if (attrs.wireless) {
    tags.push("Wireless");
  } else {
    tags.push("Wired");
  }

  // Special features
  if (attrs.keyboard_supports_rapid_trigger) {
    tags.push("Rapid Trigger");
  }
  if (attrs.keyboard_hot_swappable) {
    tags.push("Hot-Swap");
  }

  return tags;
}

// Helper to get display-friendly spec tags for monitor products
function getMonitorSpecTags(product: MonitorProduct): string[] {
  const tags: string[] = [];
  const attrs = product.core_attributes;

  // Size
  tags.push(`${attrs.monitor_size_inches}"`);

  // Resolution
  const resLabels: Record<string, string> = {
    "1080p": "1080p",
    "1440p": "1440p",
    "4k": "4K",
    "5k": "5K",
  };
  tags.push(resLabels[attrs.monitor_resolution_class] || attrs.monitor_resolution_class);

  // Refresh rate
  tags.push(`${attrs.monitor_max_refresh_hz}Hz`);

  // Panel type
  const panelLabels: Record<string, string> = {
    IPS: "IPS",
    VA: "VA",
    TN: "TN",
    OLED: "OLED",
    "Mini-LED": "Mini-LED",
    "QD-OLED": "QD-OLED",
  };
  tags.push(panelLabels[attrs.monitor_panel_type] || attrs.monitor_panel_type);

  // Curved
  if (attrs.monitor_curved) {
    tags.push("Curved");
  }

  return tags;
}

function getSpecTags(
  product: MouseProduct | AudioProduct | KeyboardProduct | MonitorProduct
): string[] {
  if (product.category === "mouse") {
    return getMouseSpecTags(product as MouseProduct);
  }
  if (product.category === "audio") {
    return getAudioSpecTags(product as AudioProduct);
  }
  if (product.category === "keyboard") {
    return getKeyboardSpecTags(product as KeyboardProduct);
  }
  return getMonitorSpecTags(product as MonitorProduct);
}

function getScoreColorClass(score: number, accentColor: "primary" | "accent" | "secondary" | "tertiary"): string {
  if (score >= 90) return "text-green-400";
  if (score >= 80) {
    if (accentColor === "primary") return "text-primary";
    if (accentColor === "accent") return "text-accent";
    if (accentColor === "tertiary") return "text-violet-500";
    return "text-foreground";
  }
  if (score >= 70) return "text-yellow-400";
  if (score >= 60) return "text-muted-foreground";
  return "text-orange-400";
}

function formatPriceRange(range: [number, number]): string {
  if (range[0] === 0 && range[1] === 0) {
    return "For price, check retailer/resale market";
  }
  if (range[0] === range[1]) {
    return `$${range[0]}`;
  }
  return `$${range[0]} - $${range[1]}`;
}

const RecommendationCard = memo(function RecommendationCard({
  scoredProduct,
  rank,
  isTopPick,
  accentColor,
  onViewDetails,
}: RecommendationCardProps) {
  const { product, score, breakdown } = scoredProduct;

  // Memoize expensive calculations
  const matchQuality = useMemo(() => getMatchQuality(score), [score]);
  const topReasons = useMemo(
    () => getTopReasons(scoredProduct, 3),
    [scoredProduct]
  );
  const topConcerns = useMemo(
    () => getTopConcerns(scoredProduct, 2),
    [scoredProduct]
  );
  const specTags = useMemo(() => getSpecTags(product), [product]);

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
        isTopPick && accentColor === "secondary" && "border-border hover:border-foreground/30",
        isTopPick && accentColor === "tertiary" && "border-violet-500/30 hover:border-violet-500/50",
        !isTopPick && "border-border/50 hover:border-border",
        isFirstPick && accentColor === "primary" && "shadow-primary/10 shadow-lg",
        isFirstPick && accentColor === "accent" && "shadow-accent/10 shadow-lg",
        isFirstPick && accentColor === "secondary" && "shadow-foreground/5 shadow-lg",
        isFirstPick && accentColor === "tertiary" && "shadow-violet-500/10 shadow-lg"
      )}
    >
      {/* Glow effect for top pick */}
      {isFirstPick && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-5",
            accentColor === "primary" && "bg-primary",
            accentColor === "accent" && "bg-accent",
            accentColor === "secondary" && "bg-foreground",
            accentColor === "tertiary" && "bg-violet-500"
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
                    accentColor === "primary" && "bg-primary/20 text-primary hover:bg-primary/20",
                    accentColor === "accent" && "bg-accent/20 text-accent hover:bg-accent/20",
                    accentColor === "secondary" && "bg-secondary text-foreground hover:bg-secondary",
                    accentColor === "tertiary" && "bg-violet-500/20 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20"
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

        {/* Price range and action buttons */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            {formatPriceRange(product.price_range_usd)}
          </span>
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className={cn(
                "text-sm transition-colors",
                accentColor === "primary" && "text-primary hover:text-primary/80",
                accentColor === "accent" && "text-accent hover:text-accent/80",
                accentColor === "secondary" && "text-foreground hover:text-foreground/80",
                accentColor === "tertiary" && "text-violet-600 dark:text-violet-400 hover:text-violet-500"
              )}
            >
              View details
            </button>
          )}
        </div>

        {/* Retailer buttons */}
        {(product.product_url || product.manufacturer_url || product.retailer_urls) && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {/* Amazon button */}
            {product.product_url && (
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-[#FF9900] hover:bg-[#E68A00] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Amazon
              </a>
            )}
            
            {/* Manufacturer/Brand button */}
            {product.manufacturer_url && (
              <a
                href={product.manufacturer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                {product.brand}
              </a>
            )}
            
            {/* Additional retailer buttons (up to 2) */}
            {product.retailer_urls && Object.entries(product.retailer_urls).slice(0, 2).map(([retailer, url]) => {
              // Format retailer name (e.g., "hifigo" -> "HiFiGo", "linsoul" -> "Linsoul")
              const retailerName = retailer
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/^./, str => str.toUpperCase());
              return (
                <a
                  key={retailer}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {retailerName}
                </a>
              );
            })}
          </div>
        )}

        {/* Score breakdown (collapsible) */}
        {isTopPick && (
          <ScoreBreakdown breakdown={breakdown} accentColor={accentColor} />
        )}
      </div>
    </Card>
  );
});

export default RecommendationCard;
