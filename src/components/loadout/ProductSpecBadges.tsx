import React from "react";
import { Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/products";
import type { LoadoutCategory } from "@/types/loadout";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format keyboard form-factor strings to readable labels */
const FORM_FACTOR_MAP: Record<string, string> = {
  "full_size_100_percent": "Full Size",
  "tkl_80_percent": "TKL 80%",
  "96_percent": "96%",
  "75_percent": "75%",
  "65_percent": "65%",
  "60_percent": "60%",
  "40_percent": "40%",
};

function formatFormFactor(raw: string): string {
  return FORM_FACTOR_MAP[raw] ?? raw.replace(/_percent/g, "%").replace(/_/g, " ");
}

/** Format snake_case tag → Title Case */
export function formatTag(tag: string): string {
  return tag
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Spec extraction per category ────────────────────────────────────────────

function getMouseSpecs(attrs: Record<string, unknown>): string[] {
  const specs: string[] = [];
  if (attrs.mouse_weight_g) specs.push(`${attrs.mouse_weight_g}g`);
  if (attrs.mouse_sensor_class) specs.push(formatTag(String(attrs.mouse_sensor_class)));
  if (attrs.wireless) specs.push("Wireless");
  if (attrs.mouse_polling_rate_max_hz)
    specs.push(`${attrs.mouse_polling_rate_max_hz}Hz`);
  if (Array.isArray(attrs.mouse_grip_fit) && attrs.mouse_grip_fit.length > 0)
    specs.push(attrs.mouse_grip_fit.map((g: string) => formatTag(g)).join(", "));
  return specs.slice(0, 3);
}

function getAudioSpecs(attrs: Record<string, unknown>): string[] {
  const specs: string[] = [];
  if (attrs.audio_type || attrs.category_subtype)
    specs.push(formatTag(String(attrs.audio_type ?? attrs.category_subtype)));
  if (attrs.wireless) specs.push("Wireless");
  if (attrs.audio_sound_signature) specs.push(formatTag(String(attrs.audio_sound_signature)));
  if (attrs.audio_mic_quality) specs.push(`Mic: ${formatTag(String(attrs.audio_mic_quality))}`);
  if (attrs.audio_comfort) specs.push(formatTag(String(attrs.audio_comfort)));
  return specs.slice(0, 3);
}

function getKeyboardSpecs(attrs: Record<string, unknown>): string[] {
  const specs: string[] = [];
  if (attrs.keyboard_form_factor)
    specs.push(formatFormFactor(String(attrs.keyboard_form_factor)));
  if (attrs.keyboard_switch_type) specs.push(formatTag(String(attrs.keyboard_switch_type)));
  if (attrs.wireless) specs.push("Wireless");
  if (attrs.keyboard_polling_rate_max_hz)
    specs.push(`${attrs.keyboard_polling_rate_max_hz}Hz`);
  if (attrs.keyboard_hot_swappable) specs.push("Hot-Swap");
  return specs.slice(0, 3);
}

function getMonitorSpecs(attrs: Record<string, unknown>): string[] {
  const specs: string[] = [];
  if (attrs.monitor_size_inches) specs.push(`${attrs.monitor_size_inches}"`);
  if (attrs.monitor_resolution_class)
    specs.push(formatTag(String(attrs.monitor_resolution_class)));
  if (attrs.monitor_native_refresh_hz)
    specs.push(`${attrs.monitor_native_refresh_hz}Hz`);
  if (attrs.monitor_panel_type) specs.push(String(attrs.monitor_panel_type).toUpperCase());
  if (attrs.monitor_response_time_ms)
    specs.push(`${attrs.monitor_response_time_ms}ms`);
  return specs.slice(0, 3);
}

const SPEC_GETTERS: Record<
  LoadoutCategory,
  (attrs: Record<string, unknown>) => string[]
> = {
  mouse: getMouseSpecs,
  audio: getAudioSpecs,
  keyboard: getKeyboardSpecs,
  monitor: getMonitorSpecs,
};

// ─── Component ───────────────────────────────────────────────────────────────

export interface ProductSpecBadgesProps {
  product: Product;
  accentColor: string;
}

export default function ProductSpecBadges({
  product,
  accentColor,
}: ProductSpecBadgesProps) {
  const category = product.category as LoadoutCategory;
  const attrs = (product as Record<string, unknown>)["core_attributes"] as
    | Record<string, unknown>
    | undefined;

  if (!attrs) return null;

  const getter = SPEC_GETTERS[category];
  if (!getter) return null;

  const specs = getter(attrs);
  if (specs.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 overflow-hidden">
      {specs.map((spec) =>
        spec === "Wireless" ? (
          <Badge
            key={spec}
            variant="outline"
            className="gap-0.5 border-slate-600 px-1.5 py-0 text-[10px] font-medium"
            style={{ color: accentColor }}
          >
            <Wifi size={9} />
            {spec}
          </Badge>
        ) : (
          <Badge
            key={spec}
            variant="outline"
            className="border-slate-600 px-1.5 py-0 text-[10px] font-medium text-slate-300"
          >
            {spec}
          </Badge>
        ),
      )}
    </div>
  );
}
