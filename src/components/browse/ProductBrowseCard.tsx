import { ExternalLink, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/utils/sanitize-url";
import type { MouseProduct, AudioProduct, KeyboardProduct, MonitorProduct } from "@/types/products";

type AnyProduct = MouseProduct | AudioProduct | KeyboardProduct | MonitorProduct;

interface ProductBrowseCardProps {
  product: AnyProduct;
}

function getSpecTags(product: AnyProduct): string[] {
  if (product.category === "mouse") {
    const m = (product as MouseProduct).core_attributes;
    return [
      `${m.mouse_weight_g}g`,
      m.wireless ? "Wireless" : "Wired",
      m.mouse_size_class.charAt(0).toUpperCase() + m.mouse_size_class.slice(1),
    ];
  }
  if (product.category === "audio") {
    const a = (product as AudioProduct).core_attributes;
    return [
      a.wireless ? "Wireless" : "Wired",
      a.audio_has_mic ? "Mic" : "No Mic",
      a.audio_comfort.charAt(0).toUpperCase() + a.audio_comfort.slice(1) + " Comfort",
    ];
  }
  if (product.category === "keyboard") {
    const k = (product as KeyboardProduct).core_attributes;
    const ffMap: Record<string, string> = {
      "60_percent": "60%", "65_percent": "65%", "75_percent": "75%",
      "tkl_80_percent": "TKL", "full_size_100_percent": "Full-Size",
    };
    return [
      ffMap[k.keyboard_form_factor] ?? k.keyboard_form_factor,
      (k.keyboard_switch_feel ?? "").charAt(0).toUpperCase() + (k.keyboard_switch_feel ?? "").slice(1),
      k.wireless ? "Wireless" : "Wired",
    ].filter(Boolean);
  }
  // monitor
  const mn = (product as MonitorProduct).core_attributes;
  return [
    `${mn.monitor_size_inches}"`,
    mn.monitor_resolution_class.toUpperCase(),
    `${mn.monitor_max_refresh_hz}Hz`,
    mn.monitor_panel_type,
  ];
}

function formatPrice(range: [number, number]): string {
  if (range[0] === 0 && range[1] === 0) return "Check retailer";
  if (range[0] === range[1]) return `$${range[0]}`;
  return `$${range[0]} – $${range[1]}`;
}

const categoryColors: Record<string, string> = {
  mouse: "bg-primary/10 text-primary",
  audio: "bg-accent/10 text-accent",
  keyboard: "bg-secondary text-foreground",
  monitor: "bg-violet-500/10 text-violet-600",
};

const ProductBrowseCard = ({ product }: ProductBrowseCardProps) => {
  const specTags = getSpecTags(product);
  const primaryUrl = sanitizeUrl(product.product_url);
  const isAmazon = primaryUrl ? (() => {
    try { return new URL(primaryUrl).hostname.includes("amazon."); }
    catch { return false; }
  })() : false;

  return (
    <Card className="flex flex-col border border-border/50 hover:border-border transition-all hover:shadow-md">
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category + confidence */}
        <div className="flex items-center justify-between">
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", categoryColors[product.category])}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          {product.data_quality.data_confidence === "high" && (
            <span className="text-[10px] text-green-600">Verified</span>
          )}
        </div>

        {/* Name + brand */}
        <div>
          <h3 className="font-display text-base font-semibold leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
        </div>

        {/* Spec tags */}
        <div className="flex flex-wrap gap-1.5">
          {specTags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + buy */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/30">
          <span className="text-sm font-medium">{formatPrice(product.price_range_usd)}</span>
          {primaryUrl && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buy ${product.name}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                isAmazon
                  ? "bg-[#FF9900] text-white hover:bg-[#E68A00]"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {isAmazon ? <ShoppingBag className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
              {isAmazon ? "Amazon" : "Buy"}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductBrowseCard;
