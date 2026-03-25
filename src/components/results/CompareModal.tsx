import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MouseProduct, AudioProduct, KeyboardProduct, MonitorProduct } from "@/types/products";
import { cn } from "@/lib/utils";

type AnyProduct = MouseProduct | AudioProduct | KeyboardProduct | MonitorProduct;

interface CompareModalProps {
  products: AnyProduct[];
  scores: number[];
  open: boolean;
  onClose: () => void;
}

interface SpecRow {
  label: string;
  values: string[];
  higherIsBetter?: boolean;
  lowerIsBetter?: boolean;
}

function formatMouse(products: MouseProduct[]): SpecRow[] {
  return [
    {
      label: "Weight",
      values: products.map(p => `${p.core_attributes.mouse_weight_g}g`),
      lowerIsBetter: true,
    },
    {
      label: "Connection",
      values: products.map(p => p.core_attributes.wireless ? "Wireless" : "Wired"),
    },
    {
      label: "Grip",
      values: products.map(p => p.core_attributes.mouse_grip_fit.join(", ")),
    },
    {
      label: "Size",
      values: products.map(p => p.core_attributes.mouse_size_class.charAt(0).toUpperCase() + p.core_attributes.mouse_size_class.slice(1)),
    },
    {
      label: "Polling Rate",
      values: products.map(p => `${p.core_attributes.mouse_polling_rate_max_hz}Hz`),
      higherIsBetter: true,
    },
    {
      label: "Sensor",
      values: products.map(p => p.core_attributes.mouse_sensor_class),
    },
    {
      label: "Price",
      values: products.map(p => {
        const [min, max] = p.price_range_usd;
        return min === 0 && max === 0 ? "N/A" : min === max ? `$${min}` : `$${min}-$${max}`;
      }),
      lowerIsBetter: true,
    },
  ];
}

function formatAudio(products: AudioProduct[]): SpecRow[] {
  return [
    {
      label: "Connection",
      values: products.map(p => p.core_attributes.wireless ? "Wireless" : "Wired"),
    },
    {
      label: "Driver Type",
      values: products.map(p => p.core_attributes.audio_driver_type),
    },
    {
      label: "Open/Closed",
      values: products.map(p => p.core_attributes.audio_open_back ? "Open-back" : "Closed-back"),
    },
    {
      label: "Microphone",
      values: products.map(p => p.core_attributes.audio_has_mic ? "Yes" : "No"),
    },
    {
      label: "Comfort",
      values: products.map(p => p.core_attributes.audio_comfort.charAt(0).toUpperCase() + p.core_attributes.audio_comfort.slice(1)),
    },
    {
      label: "Isolation",
      values: products.map(p => p.core_attributes.audio_isolation.charAt(0).toUpperCase() + p.core_attributes.audio_isolation.slice(1)),
    },
    {
      label: "Price",
      values: products.map(p => {
        const [min, max] = p.price_range_usd;
        return min === 0 && max === 0 ? "N/A" : min === max ? `$${min}` : `$${min}-$${max}`;
      }),
      lowerIsBetter: true,
    },
  ];
}

function formatKeyboard(products: KeyboardProduct[]): SpecRow[] {
  return [
    {
      label: "Form Factor",
      values: products.map(p => {
        const ffMap: Record<string, string> = {
          "60_percent": "60%", "65_percent": "65%", "75_percent": "75%",
          "tkl_80_percent": "TKL", "full_size_100_percent": "Full-Size",
          "96_percent": "96%", "alice": "Alice", "ortholinear": "Ortho", "split": "Split",
        };
        return ffMap[p.core_attributes.keyboard_form_factor] ?? p.core_attributes.keyboard_form_factor;
      }),
    },
    {
      label: "Switch Type",
      values: products.map(p => (p.core_attributes.keyboard_switch_feel ?? "Unknown").charAt(0).toUpperCase() + (p.core_attributes.keyboard_switch_feel ?? "Unknown").slice(1)),
    },
    {
      label: "Wireless",
      values: products.map(p => p.core_attributes.wireless ? "Yes" : "No"),
    },
    {
      label: "Rapid Trigger",
      values: products.map(p => p.core_attributes.keyboard_supports_rapid_trigger ? "Yes" : "No"),
    },
    {
      label: "Polling Rate",
      values: products.map(p => `${p.core_attributes.keyboard_polling_rate_max_hz}Hz`),
      higherIsBetter: true,
    },
    {
      label: "Price",
      values: products.map(p => {
        const [min, max] = p.price_range_usd;
        return min === 0 && max === 0 ? "N/A" : min === max ? `$${min}` : `$${min}-$${max}`;
      }),
      lowerIsBetter: true,
    },
  ];
}

function formatMonitor(products: MonitorProduct[]): SpecRow[] {
  return [
    {
      label: "Size",
      values: products.map(p => `${p.core_attributes.monitor_size_inches}"`),
    },
    {
      label: "Resolution",
      values: products.map(p => p.core_attributes.monitor_resolution_class.toUpperCase()),
    },
    {
      label: "Panel Type",
      values: products.map(p => p.core_attributes.monitor_panel_type),
    },
    {
      label: "Refresh Rate",
      values: products.map(p => `${p.core_attributes.monitor_max_refresh_hz}Hz`),
      higherIsBetter: true,
    },
    {
      label: "Response Time",
      values: products.map(p => p.core_attributes.monitor_response_time_ms != null ? `${p.core_attributes.monitor_response_time_ms}ms` : "N/A"),
      lowerIsBetter: true,
    },
    {
      label: "Input Lag",
      values: products.map(p => p.core_attributes.monitor_input_lag_ms != null ? `${p.core_attributes.monitor_input_lag_ms}ms` : "N/A"),
      lowerIsBetter: true,
    },
    {
      label: "Price",
      values: products.map(p => {
        const [min, max] = p.price_range_usd;
        return min === 0 && max === 0 ? "N/A" : min === max ? `$${min}` : `$${min}-$${max}`;
      }),
      lowerIsBetter: true,
    },
  ];
}

function getSpecRows(products: AnyProduct[]): SpecRow[] {
  if (products.length === 0) return [];
  const cat = products[0].category;
  if (cat === "mouse") return formatMouse(products as MouseProduct[]);
  if (cat === "audio") return formatAudio(products as AudioProduct[]);
  if (cat === "keyboard") return formatKeyboard(products as KeyboardProduct[]);
  return formatMonitor(products as MonitorProduct[]);
}

function getBetterIndex(row: SpecRow): number | null {
  if (row.values.length !== 2) return null;
  if (!row.higherIsBetter && !row.lowerIsBetter) return null;

  const parseNum = (s: string) => {
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? null : n;
  };

  const a = parseNum(row.values[0]);
  const b = parseNum(row.values[1]);
  if (a === null || b === null) return null;
  if (a === b) return null;

  if (row.higherIsBetter) return a > b ? 0 : 1;
  if (row.lowerIsBetter) return a < b ? 0 : 1;
  return null;
}

const CompareModal = ({ products, scores, open, onClose }: CompareModalProps) => {
  const rows = getSpecRows(products);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Side-by-Side Comparison</DialogTitle>
        </DialogHeader>

        {/* Product headers */}
        <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Spec</div>
          {products.map((p, i) => (
            <div key={p.id} className="space-y-0.5">
              <p className="font-semibold text-sm leading-tight">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.brand}</p>
              <p className="text-sm font-bold">{scores[i]}% match</p>
            </div>
          ))}
        </div>

        {/* Spec rows */}
        <div className="space-y-1 max-h-[50vh] overflow-y-auto">
          {rows.map((row) => {
            const betterIdx = getBetterIndex(row);
            return (
              <div key={row.label} className="grid grid-cols-3 gap-4 rounded-md px-2 py-1.5 hover:bg-secondary/50 transition-colors">
                <div className="text-xs text-muted-foreground self-center">{row.label}</div>
                {row.values.map((val, i) => (
                  <div
                    key={i}
                    className={cn(
                      "text-sm self-center rounded px-1",
                      betterIdx === i && "bg-green-500/10 text-green-600 font-medium"
                    )}
                  >
                    {val}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
