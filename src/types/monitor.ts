/**
 * Monitor-Specific Type Definitions
 *
 * TypeScript interfaces for the GearMatch monitor recommendation system.
 */

import type { Product, PriceTier, PlatformFit, Availability } from "./products";

// =============================================================================
// Monitor-Specific Enum Types
// =============================================================================

/** Monitor panel technology */
export type MonitorPanelType =
  | "IPS"
  | "VA"
  | "TN"
  | "OLED"
  | "QD-OLED"
  | "Mini-LED";

/** Monitor size classification */
export type MonitorSizeClass =
  | "compact"      // 24-25"
  | "standard"     // 27"
  | "large"        // 32"
  | "ultrawide"    // 34"+ ultrawide
  | "super_ultrawide"; // 49"+ super ultrawide

/** Monitor resolution classification */
export type MonitorResolutionClass =
  | "1080p"   // 1920x1080
  | "1440p"   // 2560x1440
  | "4k"      // 3840x2160
  | "5k"      // 5120x2880
  | "8k";     // 7680x4320

/** Monitor refresh rate classification */
export type MonitorRefreshClass =
  | "60hz"
  | "75hz"
  | "120hz"
  | "144hz"
  | "165hz"
  | "240hz"
  | "360hz_plus";

/** Monitor aspect ratio */
export type MonitorAspectRatio =
  | "16:9"
  | "21:9"
  | "32:9"
  | "16:10"
  | "3:2";

/** Monitor primary use fit */
export type MonitorUseFit =
  | "pc_gaming"
  | "console_gaming"
  | "content_creation"
  | "office"
  | "general";

/** HDR capability level based on brightness and local dimming */
export type MonitorHDRLevel =
  | "none"       // No HDR support
  | "basic"      // HDR10 but low brightness (<400 nits)
  | "good"       // HDR10 with 400-600 nits
  | "great"      // HDR with 600-1000 nits or local dimming
  | "excellent"; // HDR with 1000+ nits, OLED, or high-quality local dimming

/** Color accuracy tier based on gamut coverage and dE values */
export type MonitorColorAccuracyTier =
  | "basic"        // <95% sRGB
  | "good"         // 95-99% sRGB
  | "great"        // 100% sRGB, good Adobe RGB
  | "professional"; // Wide gamut, factory calibrated, low dE

/** G-SYNC support level */
export type MonitorGSyncSupport =
  | "none"
  | "compatible"
  | "certified";

/** Monitor ergonomic features */
export type MonitorErgonomicFeature =
  | "height_adjust"
  | "tilt"
  | "swivel"
  | "pivot"
  | "vesa_mount";

/** Monitor connectivity types */
export type MonitorConnectivity =
  | "displayport_1_2"
  | "displayport_1_4"
  | "displayport_2_1"
  | "hdmi_2_0"
  | "hdmi_2_1"
  | "usb_c"
  | "thunderbolt";

/** Monitor feature tags for filtering and recommendations */
export type MonitorFeatureTag =
  | "gaming"
  | "esports"
  | "content_creation"
  | "color_accurate"
  | "hdr"
  | "curved"
  | "ultrawide"
  | "fast_response"
  | "high_refresh"
  | "4k"
  | "oled"
  | "value_pick"
  | "usb_c_hub"
  | "kvm"
  | "speakers"
  | "gsync"
  | "freesync"
  | "low_input_lag"
  | "professional"
  | "portable";

// =============================================================================
// Monitor Core Attributes Interface
// =============================================================================

/**
 * Core attributes specific to monitor products.
 * These are used for scoring and matching against quiz answers.
 */
export interface MonitorCoreAttributes {
  /** Internal subtype identifier */
  category_subtype: "monitor";
  /** Price bucket for filtering */
  price_tier: PriceTier;
  /** Platforms where the monitor works well */
  platform_fit: PlatformFit[];
  /** Purchase availability */
  availability_class: Availability;

  // === Physical Properties ===
  /** Screen diagonal in inches */
  monitor_size_inches: number;
  /** Size classification */
  monitor_size_class: MonitorSizeClass;
  /** Is the screen curved */
  monitor_curved: boolean;
  /** Curve radius in mm (if curved) */
  monitor_curve_radius_mm?: number;

  // === Display Properties ===
  /** Panel technology */
  monitor_panel_type: MonitorPanelType;
  /** Native resolution string (e.g., "2560 x 1440") */
  monitor_resolution: string;
  /** Resolution classification */
  monitor_resolution_class: MonitorResolutionClass;
  /** Pixel density (PPI) */
  monitor_ppi: number;
  /** Aspect ratio */
  monitor_aspect_ratio: MonitorAspectRatio;
  /** Color depth in bits */
  monitor_color_depth: number;

  // === Refresh Rate ===
  /** Native refresh rate in Hz */
  monitor_native_refresh_hz: number;
  /** Maximum refresh rate in Hz */
  monitor_max_refresh_hz: number;
  /** Refresh rate classification */
  monitor_refresh_class: MonitorRefreshClass;
  /** Max refresh rate over DisplayPort */
  monitor_max_refresh_dp?: number;
  /** Max refresh rate over HDMI */
  monitor_max_refresh_hdmi?: number;

  // === Response & Gaming ===
  /** Total response time in ms */
  monitor_response_time_ms?: number;
  /** Input lag at max Hz in ms */
  monitor_input_lag_ms?: number;
  /** Variable refresh rate support */
  monitor_vrr: boolean;
  /** FreeSync support */
  monitor_freesync: boolean;
  /** G-SYNC support level */
  monitor_gsync: MonitorGSyncSupport;
  /** VRR minimum Hz */
  monitor_vrr_min_hz?: number;
  /** VRR maximum Hz */
  monitor_vrr_max_hz?: number;

  // === Picture Quality ===
  /** Native contrast ratio (e.g., 1000 or Infinity for OLED) */
  monitor_contrast_ratio?: number;
  /** Is contrast infinite (OLED) */
  monitor_infinite_contrast: boolean;
  /** Has local dimming */
  monitor_local_dimming: boolean;
  /** Peak brightness in cd/m² (small window) */
  monitor_peak_brightness?: number;
  /** SDR real scene brightness in cd/m² */
  monitor_sdr_brightness?: number;
  /** Minimum brightness in cd/m² */
  monitor_min_brightness?: number;

  // === HDR ===
  /** HDR10 support */
  monitor_hdr10: boolean;
  /** Dolby Vision support */
  monitor_dolby_vision: boolean;
  /** HDR capability level */
  monitor_hdr_level: MonitorHDRLevel;

  // === Color ===
  /** sRGB coverage percentage */
  monitor_srgb_coverage: number;
  /** Adobe RGB coverage percentage */
  monitor_adobe_rgb_coverage?: number;
  /** DCI-P3 coverage percentage */
  monitor_dci_p3_coverage?: number;
  /** Color accuracy tier */
  monitor_color_accuracy: MonitorColorAccuracyTier;
  /** Factory calibrated */
  monitor_factory_calibrated: boolean;

  // === Ergonomics ===
  /** Height adjustment available */
  monitor_height_adjust: boolean;
  /** Tilt adjustment available */
  monitor_tilt: boolean;
  /** Swivel adjustment available */
  monitor_swivel: boolean;
  /** Pivot/rotate adjustment available */
  monitor_pivot: boolean;
  /** VESA mount compatible */
  monitor_vesa: boolean;
  /** List of ergonomic features */
  monitor_ergonomic_features: MonitorErgonomicFeature[];

  // === Connectivity ===
  /** Number of DisplayPort connections */
  monitor_displayport_count: number;
  /** DisplayPort version (e.g., "1.4") */
  monitor_displayport_version?: string;
  /** Number of HDMI connections */
  monitor_hdmi_count: number;
  /** HDMI 2.1 support */
  monitor_hdmi_2_1: boolean;
  /** USB-C with DisplayPort Alt Mode */
  monitor_usb_c_dp: boolean;
  /** USB-C power delivery wattage */
  monitor_usb_c_pd_watts?: number;
  /** Number of USB-A hub ports */
  monitor_usb_hub_ports: number;
  /** KVM switch support */
  monitor_kvm: boolean;
  /** Built-in speakers */
  monitor_speakers: boolean;
  /** 3.5mm audio output */
  monitor_audio_out: boolean;
  /** Connectivity types available */
  monitor_connectivity: MonitorConnectivity[];

  // === RTINGS Scores (0-10 scale) ===
  /** Overall score */
  monitor_overall_score?: number;
  /** PC Gaming score */
  monitor_pc_gaming_score?: number;
  /** Console Gaming score */
  monitor_console_gaming_score?: number;
  /** Office use score */
  monitor_office_score?: number;
  /** Editing/Content Creation score */
  monitor_editing_score?: number;
  /** Response time score */
  monitor_response_time_score?: number;
  /** SDR Picture score */
  monitor_sdr_picture_score?: number;
  /** HDR Picture score */
  monitor_hdr_picture_score?: number;
  /** Color accuracy score */
  monitor_color_accuracy_score?: number;
  /** Brightness score */
  monitor_brightness_score?: number;

  // === Classification ===
  /** Primary use cases this monitor excels at */
  monitor_use_fit: MonitorUseFit[];
  /** Feature tags for recommendation filtering */
  monitor_feature_tags: MonitorFeatureTag[];
  /** Whether this is considered excellent value */
  monitor_value_pick: boolean;
}

// =============================================================================
// Monitor Product Interface
// =============================================================================

/**
 * Complete monitor product interface.
 * Combines base product fields with monitor-specific core attributes.
 */
export interface MonitorProduct extends Omit<Product, "category"> {
  category: "monitor";
  core_attributes: MonitorCoreAttributes;
}

// =============================================================================
// Type Guard
// =============================================================================

/**
 * Type guard to check if a product is a MonitorProduct.
 * Enables TypeScript narrowing for monitor-specific attribute access.
 *
 * @param product - The product to check
 * @returns True if the product is a MonitorProduct
 */
export function isMonitorProduct(product: { category: string }): product is MonitorProduct {
  return product.category === "monitor";
}
