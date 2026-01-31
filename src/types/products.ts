/**
 * Product Data Layer Type Definitions
 *
 * Comprehensive TypeScript interfaces for the GearMatch peripheral recommendation system.
 * These types support mice, audio equipment, keyboards, and monitors.
 */

// Re-export monitor types
export * from "./monitor";

// =============================================================================
// Shared Enum Types
// =============================================================================

/** Price bucket for UX filters and value-pick logic */
export type PriceTier =
  | "budget"
  | "lower_midrange"
  | "midrange"
  | "upper_midrange"
  | "premium"
  | "flagship";

/** Platforms where the product works well out-of-the-box */
export type PlatformFit = "pc" | "playstation" | "xbox" | "switch" | "mobile" | "mac";

/** Supported connection methods */
export type ConnectionType =
  | "wired_usb"
  | "wired_3_5mm"
  | "wired_usb_c"
  | "wireless_2_4_dongle"
  | "bluetooth";

/** Overall latency experience classification */
export type LatencyClass = "very_low" | "low" | "medium" | "high";

/** Companion software usefulness rating */
export type SoftwareSupport = "none" | "basic" | "good" | "great";

/** Product availability at normal pricing */
export type Availability = "easy" | "sometimes" | "hard" | "limited_release";

/** Confidence level for product data accuracy */
export type DataConfidence = "low" | "medium" | "high";

/** Primary origin of product attribute claims */
export type PrimarySourceType =
  | "lab_test"
  | "community_poll"
  | "expert_judgment"
  | "manufacturer"
  | "mixed";

// =============================================================================
// Mouse-Specific Types
// =============================================================================

/** Ergonomic handedness of the mouse */
export type MouseHandedness = "right" | "ambi" | "left" | "ergo_right" | "ergo_left";

/** Weight classification bucket */
export type MouseWeightClass = "ultralight" | "light" | "mid" | "medium" | "heavy";

/** Size classification based on dimensions and feel */
export type MouseSizeClass = "small" | "medium" | "large";

/** General hump height/placement profile */
export type MouseShapeProfile =
  | "low_hump"
  | "mid_hump"
  | "high_hump"
  | "rear_hump"
  | "center_hump"
  | "ergo_hump";

/** Grip styles the shape supports well */
export type MouseGripFit = "palm" | "claw" | "fingertip";

/** Use cases where the mouse excels */
export type MouseGameFit = "fps" | "moba" | "mmo" | "general" | "productivity";

/** Maximum supported polling rate */
export type MousePollingRate = "125" | "500" | "1000" | "2000" | "4000" | "8000";

/** Sensor quality classification */
export type MouseSensorClass = "basic" | "budget_ok" | "good" | "great" | "flagship";

/** Build quality rating */
export type MouseBuildQuality = "ok" | "good" | "great";

/** Stock mouse feet glide quality */
export type MouseFeetQuality = "basic" | "ok" | "good" | "great";

/** Primary surface finish */
export type MouseCoating = "matte" | "glossy" | "rubberized" | "mixed";

/** Subjective feel descriptors for recommendations */
export type MouseFeelTag =
  | "safe_shape"
  | "niche_shape"
  | "grippy"
  | "slippery"
  | "large_hands_friendly"
  | "small_hands_friendly"
  | "thumb_rest"
  | "feature_rich"
  | "multi_device"
  | "productivity"
  | "works_on_glass"
  | "premium_feel"
  | "moddable"
  | "portable"
  | "silent_clicks"
  | "ergonomic"
  | "vertical"
  | "honeycomb"
  | "mmo_buttons"
  | "esports_shape"
  | "adjustable_weight"
  | "trackball"
  | "stationary"
  | "mac_optimized"
  | "touch_gestures"
  | "basic"
  | "hot_swap_switches"
  | "ergo_right"
  | "mmo_friendly"
  | "casual"
  | "light_clicks"
  | "fast"
  | "competitive"
  | "ultralight"
  | "no_software"
  | "driverless"
  | "fingertip_only"
  | "rgb"
  | "versatile"
  | "free_scroll";

/** Scroll wheel feature tags */
export type MouseScrollFeature =
  | "tilt_left_right"
  | "tilt"
  | "free_scroll"
  | "infinite_scroll"
  | "optical_scroll"
  | "smart_reel"
  | "thumb_wheel"
  | "touch_scroll";

/** Button count classification */
export type MouseButtonCountClass = "low" | "medium" | "high" | "mmo_grid";

// =============================================================================
// Audio-Specific Types
// =============================================================================

/** Primary audio product type */
export type AudioType = "headset" | "headphone" | "iem" | "earbud";

/** Microphone type classification */
export type AudioMicType =
  | "none"
  | "integrated"
  | "detachable_boom"
  | "fixed_boom"
  | "inline";

/** Microphone quality for voice chat */
export type AudioMicQuality = "poor" | "ok" | "good" | "great";

/** Coarse tuning/sound description */
export type AudioSoundSignature =
  | "neutral"
  | "warm"
  | "bright"
  | "v_shaped"
  | "bassy"
  | "mid_forward";

/** Performance rating for audio features */
export type AudioPerformanceRating = "poor" | "ok" | "good" | "great";

/** Immersion quality rating */
export type AudioImmersion = "ok" | "good" | "great";

/** Passive/effective noise isolation level */
export type AudioIsolation = "low" | "medium" | "high";

/** Overall comfort for longer sessions */
export type AudioComfort = "poor" | "ok" | "good" | "great";

/** Whether a DAC/amp is beneficial */
export type AudioNeedsAmp = "no" | "maybe" | "yes";

/** Primary driver technology */
export type AudioDriverType =
  | "dynamic"
  | "planar"
  | "balanced_armature"
  | "hybrid"
  | "electrostatic"
  | "unknown";

/** Bluetooth codec support */
export type AudioWirelessCodec =
  | "sbc"
  | "aac"
  | "aptx"
  | "aptx_adaptive"
  | "aptx_ll"
  | "ldac"
  | "lc3";

/** Virtual surround/spatial audio support */
export type AudioVirtualSurround =
  | "none"
  | "dolby_atmos"
  | "dts_headphone_x"
  | "sonic"
  | "steelseries_spatial"
  | "vendor_specific";

/** Repairability rating for parts replacement */
export type AudioRepairability = "poor" | "ok" | "good" | "great";

// =============================================================================
// Keyboard-Specific Types
// =============================================================================

/** Keyboard form factor/size */
export type KeyboardFormFactor =
  | "60_percent"
  | "65_percent"
  | "75_percent"
  | "tkl_80_percent"
  | "96_percent"
  | "full_size_100_percent"
  | "alice"
  | "ortholinear"
  | "split";

/** Keyboard switch type */
export type KeyboardSwitchType =
  | "mechanical"
  | "magnetic_hall_effect"
  | "magnetic_tmr"
  | "optical"
  | "scissor"
  | "membrane"
  | "rubber_dome";

/** Keyboard switch feel */
export type KeyboardSwitchFeel = "linear" | "tactile" | "clicky";

/** Keyboard output type / actuation capability */
export type KeyboardOutputType =
  | "non_adjustable"
  | "adjustable_actuation"
  | "analog";

/** Keyboard case material */
export type KeyboardCaseMaterial =
  | "plastic"
  | "aluminum"
  | "zinc_alloy"
  | "polycarbonate"
  | "mixed";

/** Keyboard mounting style */
export type KeyboardMountStyle =
  | "tray"
  | "gasket"
  | "double_gasket"
  | "top_mount"
  | "integrated_plate"
  | "plate"
  | "unknown";

/** Keyboard keycap material */
export type KeyboardKeycapMaterial = "pbt" | "abs" | "pom" | "unknown";

/** Keyboard keycap profile */
export type KeyboardKeycapProfile =
  | "oem"
  | "cherry"
  | "ksa"
  | "xda"
  | "dsa"
  | "sa"
  | "mt3"
  | "low_profile"
  | "unknown";

/** Keyboard polling rate */
export type KeyboardPollingRate = "125" | "500" | "1000" | "2000" | "4000" | "8000";

/** Keyboard build quality rating */
export type KeyboardBuildQuality = "ok" | "good" | "great" | "excellent";

/** Keyboard feature tags */
export type KeyboardFeatureTag =
  | "hot_swappable"
  | "rapid_trigger"
  | "socd"
  | "analog_output"
  | "adjustable_actuation"
  | "rgb_per_key"
  | "rgb_underglow"
  | "shine_through_keycaps"
  | "knob"
  | "macro_keys"
  | "volume_wheel"
  | "low_profile"
  | "gasket_mount"
  | "pre_lubed"
  | "qmk_via"
  | "onboard_memory"
  | "dks"
  | "mod_tap"
  | "multi_device_bluetooth"
  | "2_4ghz_wireless"
  | "usb_c"
  | "gaming_grade_latency"
  | "quiet"
  | "split"
  | "ergonomic"
  | "value_pick"
  | "premium"
  | "enthusiast";

/** Keyboard use case fit */
export type KeyboardUseFit =
  | "competitive_gaming"
  | "casual_gaming"
  | "office"
  | "programming"
  | "typing"
  | "productivity"
  | "portable";

// =============================================================================
// Data Quality Interface
// =============================================================================

/**
 * Metadata about data sourcing and confidence level.
 * Tracks where product data came from and when it was last verified.
 */
export interface DataQuality {
  /** How confident we are that attributes reflect reality */
  data_confidence: DataConfidence;
  /** Main origin of the product's attribute claims */
  primary_source_type: PrimarySourceType;
  /** Name of the primary data source (e.g., "RTINGS", "Head-Fi") */
  source_name?: string;
  /** ISO date string of last verification (YYYY-MM format) */
  last_verified?: string;
  /** Additional notes about data sourcing */
  notes?: string;
}

// =============================================================================
// Base Product Interface
// =============================================================================

/**
 * Base interface that all products extend.
 * Contains common fields shared across all product categories.
 */
export interface Product {
  /** Unique identifier for the product (snake_case) */
  id: string;
  /** Display name of the product */
  name: string;
  /** Brand/manufacturer name */
  brand: string;
  /** Product category */
  category: "mouse" | "audio" | "keyboard" | "monitor";
  /** Typical street price range in USD [min, max] */
  price_range_usd: [number, number];
  /** URL to product image (optional) */
  image_url?: string;
  /** URL to product page or affiliate link (optional) */
  product_url?: string;
  /** Tags used for recommendation filtering and explanations */
  recommendation_tags: string[];
  /** Data sourcing and confidence metadata */
  data_quality: DataQuality;
}

// =============================================================================
// Mouse Core Attributes Interface
// =============================================================================

/**
 * Core attributes specific to mouse products.
 * These are used for scoring and matching against quiz answers.
 */
export interface MouseCoreAttributes {
  /** Internal subtype identifier */
  category_subtype: "mouse";
  /** Price bucket for filtering */
  price_tier: PriceTier;
  /** Platforms where the mouse works well */
  platform_fit: PlatformFit[];
  /** Supported connection methods */
  connection_type: ConnectionType[];
  /** Whether wireless is a primary mode */
  wireless: boolean;
  /** Battery life in hours (only for wireless) */
  battery_life_hr?: number;
  /** Overall latency classification */
  latency_class: LatencyClass;
  /** Companion software usefulness */
  software_support: SoftwareSupport;
  /** Purchase availability */
  availability_class: Availability;

  // Mouse-specific attributes
  /** Ergonomic handedness */
  mouse_handedness: MouseHandedness;
  /** Weight in grams (including battery if applicable) */
  mouse_weight_g: number;
  /** Weight classification bucket */
  mouse_weight_class: MouseWeightClass;
  /** Length in millimeters */
  mouse_length_mm: number;
  /** Width in millimeters (widest point) */
  mouse_width_mm: number;
  /** Height in millimeters (tallest point) */
  mouse_height_mm: number;
  /** Size classification bucket */
  mouse_size_class: MouseSizeClass;
  /** Hump height/placement profile */
  mouse_shape_profile: MouseShapeProfile;
  /** Grip styles supported */
  mouse_grip_fit: MouseGripFit[];
  /** Use cases where mouse excels */
  mouse_game_fit: MouseGameFit[];
  /** Total programmable buttons */
  mouse_button_count: number;
  /** Button count classification */
  mouse_button_count_class: MouseButtonCountClass;
  /** Scroll wheel features */
  mouse_scroll_features: MouseScrollFeature[];
  /** Maximum polling rate */
  mouse_polling_rate_max_hz: MousePollingRate;
  /** Sensor quality tier */
  mouse_sensor_class: MouseSensorClass;
  /** Measured click latency in ms (if available) */
  mouse_click_latency_ms?: number;
  /** Measured sensor latency in ms (if available) */
  mouse_sensor_latency_ms?: number;
  /** Build quality rating */
  mouse_build_quality: MouseBuildQuality;
  /** Stock feet glide quality */
  mouse_feet_quality: MouseFeetQuality;
  /** Primary surface coating */
  mouse_coating: MouseCoating;
  /** Subjective feel tags */
  mouse_feel_tags: MouseFeelTag[];
  /** Whether this is considered excellent value */
  mouse_value_pick: boolean;
}

// =============================================================================
// Audio Core Attributes Interface
// =============================================================================

/**
 * Core attributes specific to audio products.
 * These are used for scoring and matching against quiz answers.
 */
export interface AudioCoreAttributes {
  /** Internal subtype (headset, headphone, iem, earbud) */
  category_subtype: AudioType;
  /** Price bucket for filtering */
  price_tier: PriceTier;
  /** Platforms where the audio product works well */
  platform_fit: PlatformFit[];
  /** Supported connection methods */
  connection_type: ConnectionType[];
  /** Whether wireless is a primary mode */
  wireless: boolean;
  /** Battery life in hours (only for wireless) */
  battery_life_hr?: number;
  /** Overall latency classification */
  latency_class: LatencyClass;
  /** Companion software usefulness */
  software_support: SoftwareSupport;
  /** Whether EQ is available via app/software */
  eq_support: boolean;
  /** Purchase availability */
  availability_class: Availability;

  // Audio-specific attributes
  /** Primary audio product type */
  audio_type: AudioType;
  /** Whether open-back design */
  audio_open_back: boolean;
  /** Whether a microphone is included */
  audio_has_mic: boolean;
  /** Type of microphone */
  audio_mic_type: AudioMicType;
  /** Microphone quality (if mic present) */
  audio_mic_quality?: AudioMicQuality;
  /** Sound signature/tuning */
  audio_sound_signature: AudioSoundSignature;
  /** Performance for competitive/positional audio */
  audio_competitive_fps: AudioPerformanceRating;
  /** Immersion quality (bass impact, stage, tone) */
  audio_immersion: AudioImmersion;
  /** Noise isolation level */
  audio_isolation: AudioIsolation;
  /** Whether ANC is present */
  audio_anc: boolean;
  /** Comfort for extended sessions */
  audio_comfort: AudioComfort;
  /** Weight in grams (optional for IEMs/earbuds) */
  audio_weight_g?: number;
  /** Whether a DAC/amp is beneficial */
  audio_needs_amp: AudioNeedsAmp;
  /** Impedance in ohms (if known) */
  audio_impedance_ohm?: number;
  /** Sensitivity in dB (if known) */
  audio_sensitivity_db?: number;
  /** Primary driver technology */
  audio_driver_type: AudioDriverType;
  /** Bluetooth codec support (if wireless) */
  audio_wireless_codec_support?: AudioWirelessCodec[];
  /** Virtual surround support */
  audio_virtual_surround: AudioVirtualSurround[];
  /** Repairability rating */
  audio_repairability: AudioRepairability;
  /** Whether this is considered excellent value */
  audio_value_pick: boolean;
}

// =============================================================================
// Keyboard Core Attributes Interface
// =============================================================================

/**
 * Core attributes specific to keyboard products.
 * These are used for scoring and matching against quiz answers.
 */
export interface KeyboardCoreAttributes {
  /** Internal subtype identifier */
  category_subtype: "keyboard";
  /** Price bucket for filtering */
  price_tier: PriceTier;
  /** Platforms where the keyboard works well */
  platform_fit: PlatformFit[];
  /** Supported connection methods */
  connection_type: ConnectionType[];
  /** Whether wireless is a primary mode */
  wireless: boolean;
  /** Battery life in hours (only for wireless) */
  battery_life_hr?: number;
  /** Overall latency classification */
  latency_class: LatencyClass;
  /** Companion software usefulness */
  software_support: SoftwareSupport;
  /** Purchase availability */
  availability_class: Availability;

  // Keyboard-specific attributes
  /** Form factor / size */
  keyboard_form_factor: KeyboardFormFactor;
  /** Switch type technology */
  keyboard_switch_type: KeyboardSwitchType;
  /** Switch feel (linear, tactile, clicky) */
  keyboard_switch_feel: KeyboardSwitchFeel;
  /** Stock switch name */
  keyboard_switch_name?: string;
  /** Output type (adjustable actuation, analog, etc.) */
  keyboard_output_type: KeyboardOutputType;
  /** Whether switches are hot-swappable */
  keyboard_hot_swappable: boolean;
  /** Case material */
  keyboard_case_material: KeyboardCaseMaterial;
  /** Mounting style */
  keyboard_mount_style: KeyboardMountStyle;
  /** Keycap material */
  keyboard_keycap_material: KeyboardKeycapMaterial;
  /** Keycap profile */
  keyboard_keycap_profile: KeyboardKeycapProfile;
  /** Maximum polling rate */
  keyboard_polling_rate_max_hz: KeyboardPollingRate;
  /** Build quality rating */
  keyboard_build_quality: KeyboardBuildQuality;
  /** Weight in grams */
  keyboard_weight_g?: number;
  /** Height in mm */
  keyboard_height_mm?: number;
  /** Width in mm */
  keyboard_width_mm?: number;
  /** Depth in mm */
  keyboard_depth_mm?: number;

  // Performance metrics
  /** Single-key latency in ms (best connection) */
  keyboard_single_key_latency_ms?: number;
  /** Multi-key latency in ms */
  keyboard_multi_key_latency_ms?: number;
  /** Typing noise in dBA */
  keyboard_typing_noise_dba?: number;

  // Scores from review (0-10 scale)
  /** Gaming score from review */
  keyboard_gaming_score?: number;
  /** Office/productivity score from review */
  keyboard_office_score?: number;
  /** Programming score from review */
  keyboard_programming_score?: number;
  /** Raw performance score from review */
  keyboard_raw_performance_score?: number;

  // Feature flags
  /** Has RGB backlighting */
  keyboard_has_rgb: boolean;
  /** Has per-key RGB */
  keyboard_has_per_key_rgb: boolean;
  /** Has shine-through keycaps */
  keyboard_shine_through_keycaps: boolean;
  /** Has knob/dial */
  keyboard_has_knob: boolean;
  /** Number of dedicated macro keys */
  keyboard_macro_key_count: number;
  /** Supports rapid trigger */
  keyboard_supports_rapid_trigger: boolean;
  /** Supports SOCD */
  keyboard_supports_socd: boolean;
  /** Supports analog output */
  keyboard_supports_analog: boolean;
  /** Has onboard memory for profiles */
  keyboard_has_onboard_memory: boolean;
  /** N-key rollover support */
  keyboard_nkro: boolean;

  /** Feature tags for recommendation filtering */
  keyboard_feature_tags: KeyboardFeatureTag[];
  /** Use case fit */
  keyboard_use_fit: KeyboardUseFit[];
  /** Whether this is considered excellent value */
  keyboard_value_pick: boolean;
}

// =============================================================================
// Complete Product Interfaces
// =============================================================================

/**
 * Complete mouse product interface.
 * Combines base product fields with mouse-specific core attributes.
 */
export interface MouseProduct extends Product {
  category: "mouse";
  core_attributes: MouseCoreAttributes;
}

/**
 * Complete audio product interface.
 * Combines base product fields with audio-specific core attributes.
 */
export interface AudioProduct extends Product {
  category: "audio";
  core_attributes: AudioCoreAttributes;
}

/**
 * Complete keyboard product interface.
 * Combines base product fields with keyboard-specific core attributes.
 */
export interface KeyboardProduct extends Product {
  category: "keyboard";
  core_attributes: KeyboardCoreAttributes;
}

// Import MonitorProduct for the union type
import type { MonitorProduct } from "./monitor";

/**
 * Union type for any product in the system.
 */
export type AnyProduct = MouseProduct | AudioProduct | KeyboardProduct | MonitorProduct;

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Type guard to check if a product is a MouseProduct.
 * Enables TypeScript narrowing for mouse-specific attribute access.
 *
 * @param product - The product to check
 * @returns True if the product is a MouseProduct
 *
 * @example
 * ```ts
 * if (isMouseProduct(product)) {
 *   console.log(product.core_attributes.mouse_weight_g);
 * }
 * ```
 */
export function isMouseProduct(product: Product): product is MouseProduct {
  return product.category === "mouse";
}

/**
 * Type guard to check if a product is an AudioProduct.
 * Enables TypeScript narrowing for audio-specific attribute access.
 *
 * @param product - The product to check
 * @returns True if the product is an AudioProduct
 *
 * @example
 * ```ts
 * if (isAudioProduct(product)) {
 *   console.log(product.core_attributes.audio_sound_signature);
 * }
 * ```
 */
export function isAudioProduct(product: Product): product is AudioProduct {
  return product.category === "audio";
}

/**
 * Type guard to check if a product is a KeyboardProduct.
 * Enables TypeScript narrowing for keyboard-specific attribute access.
 *
 * @param product - The product to check
 * @returns True if the product is a KeyboardProduct
 *
 * @example
 * ```ts
 * if (isKeyboardProduct(product)) {
 *   console.log(product.core_attributes.keyboard_form_factor);
 * }
 * ```
 */
export function isKeyboardProduct(product: Product): product is KeyboardProduct {
  return product.category === "keyboard";
}
