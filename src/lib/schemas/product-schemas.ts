/**
 * Product Data Validation Schemas
 *
 * Zod schemas mirroring every product type in src/types/products.ts and src/types/monitor.ts.
 * Used by the conversion script to validate JSON output; importable for future CI/admin use.
 */

import { z } from "zod";

// =============================================================================
// Shared Enum Schemas
// =============================================================================

const priceTierSchema = z.enum([
  "budget",
  "lower_midrange",
  "midrange",
  "upper_midrange",
  "premium",
  "flagship",
]);

const platformFitSchema = z.enum([
  "pc",
  "playstation",
  "xbox",
  "switch",
  "mobile",
  "mac",
]);

const connectionTypeSchema = z.enum([
  "wired_usb",
  "wired_3_5mm",
  "wired_usb_c",
  "wireless_2_4_dongle",
  "bluetooth",
]);

const latencyClassSchema = z.enum(["very_low", "low", "medium", "high"]);

const softwareSupportSchema = z.enum(["none", "basic", "good", "great"]);

const availabilitySchema = z.enum([
  "easy",
  "sometimes",
  "hard",
  "limited_release",
]);

const dataConfidenceSchema = z.enum(["low", "medium", "high"]);

const primarySourceTypeSchema = z.enum([
  "lab_test",
  "community_poll",
  "expert_judgment",
  "manufacturer",
  "mixed",
]);

// =============================================================================
// Data Quality Schema
// =============================================================================

const dataQualitySchema = z.object({
  data_confidence: dataConfidenceSchema,
  primary_source_type: primarySourceTypeSchema,
  source_name: z.string().optional(),
  last_verified: z.string().optional(),
  notes: z.string().optional(),
});

// =============================================================================
// Base Product Shape (reusable, not standalone)
// =============================================================================

const baseProductShape = {
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.enum(["mouse", "audio", "keyboard", "monitor"]),
  price_range_usd: z.tuple([z.number(), z.number()]),
  image_url: z.string().optional(),
  product_url: z.string().optional(),
  manufacturer_url: z.string().optional(),
  retailer_urls: z.record(z.string(), z.string()).optional(),
  recommendation_tags: z.array(z.string()),
  data_quality: dataQualitySchema,
  rtings_scores: z.record(z.string(), z.number()).optional(),
};

// =============================================================================
// Mouse Schemas
// =============================================================================

const mouseHandednessSchema = z.enum([
  "right",
  "ambi",
  "left",
  "ergo_right",
  "ergo_left",
]);

const mouseWeightClassSchema = z.enum([
  "ultralight",
  "light",
  "mid",
  "medium",
  "heavy",
]);

const mouseSizeClassSchema = z.enum(["small", "medium", "large"]);

const mouseShapeProfileSchema = z.enum([
  "low_hump",
  "mid_hump",
  "high_hump",
  "rear_hump",
  "center_hump",
  "ergo_hump",
]);

const mouseGripFitSchema = z.enum(["palm", "claw", "fingertip"]);

const mouseGameFitSchema = z.enum([
  "fps",
  "moba",
  "mmo",
  "general",
  "productivity",
]);

const mousePollingRateSchema = z.enum([
  "125",
  "500",
  "1000",
  "2000",
  "4000",
  "8000",
]);

const mouseSensorClassSchema = z.enum([
  "basic",
  "budget_ok",
  "good",
  "great",
  "flagship",
]);

const mouseBuildQualitySchema = z.enum(["ok", "good", "great"]);

const mouseFeetQualitySchema = z.enum(["basic", "ok", "good", "great"]);

const mouseCoatingSchema = z.enum([
  "matte",
  "glossy",
  "rubberized",
  "mixed",
]);

const mouseFeelTagSchema = z.enum([
  "safe_shape",
  "niche_shape",
  "grippy",
  "slippery",
  "large_hands_friendly",
  "small_hands_friendly",
  "thumb_rest",
  "feature_rich",
  "multi_device",
  "productivity",
  "works_on_glass",
  "premium_feel",
  "moddable",
  "portable",
  "silent_clicks",
  "ergonomic",
  "vertical",
  "honeycomb",
  "mmo_buttons",
  "esports_shape",
  "adjustable_weight",
  "trackball",
  "stationary",
  "mac_optimized",
  "touch_gestures",
  "basic",
  "hot_swap_switches",
  "ergo_right",
  "mmo_friendly",
  "casual",
  "light_clicks",
  "fast",
  "competitive",
  "ultralight",
  "no_software",
  "driverless",
  "fingertip_only",
  "rgb",
  "versatile",
  "free_scroll",
]);

const mouseScrollFeatureSchema = z.enum([
  "tilt_left_right",
  "tilt",
  "free_scroll",
  "infinite_scroll",
  "optical_scroll",
  "smart_reel",
  "thumb_wheel",
  "touch_scroll",
]);

const mouseButtonCountClassSchema = z.enum([
  "low",
  "medium",
  "high",
  "mmo_grid",
]);

const mouseCoreAttributesSchema = z.object({
  category_subtype: z.literal("mouse"),
  price_tier: priceTierSchema,
  platform_fit: z.array(platformFitSchema),
  connection_type: z.array(connectionTypeSchema),
  wireless: z.boolean(),
  battery_life_hr: z.number().optional(),
  latency_class: latencyClassSchema,
  software_support: softwareSupportSchema,
  availability_class: availabilitySchema,
  mouse_handedness: mouseHandednessSchema,
  mouse_weight_g: z.number(),
  mouse_weight_class: mouseWeightClassSchema,
  mouse_length_mm: z.number(),
  mouse_width_mm: z.number(),
  mouse_height_mm: z.number(),
  mouse_size_class: mouseSizeClassSchema,
  mouse_shape_profile: mouseShapeProfileSchema,
  mouse_grip_fit: z.array(mouseGripFitSchema),
  mouse_game_fit: z.array(mouseGameFitSchema),
  mouse_button_count: z.number(),
  mouse_button_count_class: mouseButtonCountClassSchema,
  mouse_scroll_features: z.array(mouseScrollFeatureSchema),
  mouse_polling_rate_max_hz: mousePollingRateSchema,
  mouse_sensor_class: mouseSensorClassSchema,
  mouse_click_latency_ms: z.number().optional(),
  mouse_sensor_latency_ms: z.number().optional(),
  mouse_build_quality: mouseBuildQualitySchema,
  mouse_feet_quality: mouseFeetQualitySchema,
  mouse_coating: mouseCoatingSchema,
  mouse_feel_tags: z.array(mouseFeelTagSchema),
  mouse_value_pick: z.boolean(),
});

export const mouseProductSchema = z.object({
  ...baseProductShape,
  category: z.literal("mouse"),
  core_attributes: mouseCoreAttributesSchema,
});

// =============================================================================
// Audio Schemas
// =============================================================================

const audioTypeSchema = z.enum(["headset", "headphone", "iem", "earbud"]);

const audioMicTypeSchema = z.enum([
  "none",
  "integrated",
  "detachable_boom",
  "fixed_boom",
  "inline",
]);

const audioMicQualitySchema = z.enum(["poor", "ok", "good", "great"]);

const audioSoundSignatureSchema = z.enum([
  "neutral",
  "warm",
  "bright",
  "v_shaped",
  "bassy",
  "mid_forward",
]);

const audioPerformanceRatingSchema = z.enum(["poor", "ok", "good", "great"]);

const audioImmersionSchema = z.enum(["ok", "good", "great"]);

const audioIsolationSchema = z.enum(["low", "medium", "high"]);

const audioComfortSchema = z.enum(["poor", "ok", "good", "great"]);

const audioNeedsAmpSchema = z.enum(["no", "maybe", "yes"]);

const audioDriverTypeSchema = z.enum([
  "dynamic",
  "planar",
  "balanced_armature",
  "hybrid",
  "electrostatic",
  "unknown",
]);

const audioWirelessCodecSchema = z.enum([
  "sbc",
  "aac",
  "aptx",
  "aptx_adaptive",
  "aptx_ll",
  "ldac",
  "lc3",
]);

const audioVirtualSurroundSchema = z.enum([
  "none",
  "dolby_atmos",
  "dts_headphone_x",
  "sonic",
  "steelseries_spatial",
  "vendor_specific",
]);

const audioRepairabilitySchema = z.enum(["poor", "ok", "good", "great"]);

const audioCoreAttributesSchema = z.object({
  category_subtype: audioTypeSchema,
  price_tier: priceTierSchema,
  platform_fit: z.array(platformFitSchema),
  connection_type: z.array(connectionTypeSchema),
  wireless: z.boolean(),
  battery_life_hr: z.number().optional(),
  latency_class: latencyClassSchema,
  software_support: softwareSupportSchema,
  eq_support: z.boolean(),
  availability_class: availabilitySchema,
  audio_type: audioTypeSchema,
  audio_open_back: z.boolean(),
  audio_has_mic: z.boolean(),
  audio_mic_type: audioMicTypeSchema,
  audio_mic_quality: audioMicQualitySchema.optional(),
  audio_sound_signature: audioSoundSignatureSchema,
  audio_competitive_fps: audioPerformanceRatingSchema,
  audio_immersion: audioImmersionSchema,
  audio_isolation: audioIsolationSchema,
  audio_anc: z.boolean(),
  audio_comfort: audioComfortSchema,
  audio_weight_g: z.number().optional(),
  audio_needs_amp: audioNeedsAmpSchema,
  audio_impedance_ohm: z.number().optional(),
  audio_sensitivity_db: z.number().optional(),
  audio_driver_type: audioDriverTypeSchema,
  audio_wireless_codec_support: z.array(audioWirelessCodecSchema).optional(),
  audio_virtual_surround: z.array(audioVirtualSurroundSchema),
  audio_repairability: audioRepairabilitySchema,
  audio_value_pick: z.boolean(),
});

export const audioProductSchema = z.object({
  ...baseProductShape,
  category: z.literal("audio"),
  core_attributes: audioCoreAttributesSchema,
});

// =============================================================================
// Keyboard Schemas
// =============================================================================

const keyboardFormFactorSchema = z.enum([
  "60_percent",
  "65_percent",
  "75_percent",
  "tkl_80_percent",
  "96_percent",
  "full_size_100_percent",
  "alice",
  "ortholinear",
  "split",
]);

const keyboardSwitchTypeSchema = z.enum([
  "mechanical",
  "magnetic_hall_effect",
  "magnetic_tmr",
  "optical",
  "scissor",
  "membrane",
  "rubber_dome",
]);

const keyboardSwitchFeelSchema = z.enum(["linear", "tactile", "clicky"]);

const keyboardOutputTypeSchema = z.enum([
  "non_adjustable",
  "adjustable_actuation",
  "analog",
]);

const keyboardCaseMaterialSchema = z.enum([
  "plastic",
  "aluminum",
  "zinc_alloy",
  "polycarbonate",
  "mixed",
]);

const keyboardMountStyleSchema = z.enum([
  "tray",
  "gasket",
  "double_gasket",
  "top_mount",
  "integrated_plate",
  "plate",
  "unknown",
]);

const keyboardKeycapMaterialSchema = z.enum([
  "pbt",
  "abs",
  "pom",
  "unknown",
]);

const keyboardKeycapProfileSchema = z.enum([
  "oem",
  "cherry",
  "ksa",
  "xda",
  "dsa",
  "sa",
  "mt3",
  "low_profile",
  "unknown",
]);

const keyboardPollingRateSchema = z.enum([
  "125",
  "500",
  "1000",
  "2000",
  "4000",
  "8000",
]);

const keyboardBuildQualitySchema = z.enum(["ok", "good", "great", "excellent"]);

const keyboardFeatureTagSchema = z.enum([
  "hot_swappable",
  "rapid_trigger",
  "socd",
  "analog_output",
  "adjustable_actuation",
  "rgb_per_key",
  "rgb_underglow",
  "shine_through_keycaps",
  "knob",
  "macro_keys",
  "volume_wheel",
  "low_profile",
  "gasket_mount",
  "pre_lubed",
  "qmk_via",
  "onboard_memory",
  "dks",
  "mod_tap",
  "multi_device_bluetooth",
  "2_4ghz_wireless",
  "usb_c",
  "gaming_grade_latency",
  "quiet",
  "split",
  "ergonomic",
  "value_pick",
  "premium",
  "enthusiast",
]);

const keyboardUseFitSchema = z.enum([
  "competitive_gaming",
  "casual_gaming",
  "office",
  "programming",
  "typing",
  "productivity",
  "portable",
]);

const keyboardCoreAttributesSchema = z.object({
  category_subtype: z.literal("keyboard"),
  price_tier: priceTierSchema,
  platform_fit: z.array(platformFitSchema),
  connection_type: z.array(connectionTypeSchema),
  wireless: z.boolean(),
  battery_life_hr: z.number().optional(),
  latency_class: latencyClassSchema,
  software_support: softwareSupportSchema,
  availability_class: availabilitySchema,
  keyboard_form_factor: keyboardFormFactorSchema,
  keyboard_switch_type: keyboardSwitchTypeSchema,
  keyboard_switch_feel: keyboardSwitchFeelSchema,
  keyboard_switch_name: z.string().optional(),
  keyboard_output_type: keyboardOutputTypeSchema,
  keyboard_hot_swappable: z.boolean(),
  keyboard_case_material: keyboardCaseMaterialSchema,
  keyboard_mount_style: keyboardMountStyleSchema,
  keyboard_keycap_material: keyboardKeycapMaterialSchema,
  keyboard_keycap_profile: keyboardKeycapProfileSchema,
  keyboard_polling_rate_max_hz: keyboardPollingRateSchema,
  keyboard_build_quality: keyboardBuildQualitySchema,
  keyboard_weight_g: z.number().optional(),
  keyboard_height_mm: z.number().optional(),
  keyboard_width_mm: z.number().optional(),
  keyboard_depth_mm: z.number().optional(),
  keyboard_single_key_latency_ms: z.number().optional(),
  keyboard_multi_key_latency_ms: z.number().optional(),
  keyboard_typing_noise_dba: z.number().optional(),
  keyboard_gaming_score: z.number().optional(),
  keyboard_office_score: z.number().optional(),
  keyboard_programming_score: z.number().optional(),
  keyboard_raw_performance_score: z.number().optional(),
  keyboard_has_rgb: z.boolean(),
  keyboard_has_per_key_rgb: z.boolean(),
  keyboard_shine_through_keycaps: z.boolean(),
  keyboard_has_knob: z.boolean(),
  keyboard_macro_key_count: z.number(),
  keyboard_supports_rapid_trigger: z.boolean(),
  keyboard_supports_socd: z.boolean(),
  keyboard_supports_analog: z.boolean(),
  keyboard_has_onboard_memory: z.boolean(),
  keyboard_nkro: z.boolean(),
  keyboard_feature_tags: z.array(keyboardFeatureTagSchema),
  keyboard_use_fit: z.array(keyboardUseFitSchema),
  keyboard_value_pick: z.boolean(),
});

export const keyboardProductSchema = z.object({
  ...baseProductShape,
  category: z.literal("keyboard"),
  core_attributes: keyboardCoreAttributesSchema,
});

// =============================================================================
// Monitor Schemas
// =============================================================================

const monitorPanelTypeSchema = z.enum([
  "IPS",
  "VA",
  "TN",
  "OLED",
  "QD-OLED",
  "Mini-LED",
]);

const monitorSizeClassSchema = z.enum([
  "compact",
  "standard",
  "large",
  "ultrawide",
  "super_ultrawide",
]);

const monitorResolutionClassSchema = z.enum([
  "1080p",
  "1440p",
  "4k",
  "5k",
  "8k",
]);

const monitorRefreshClassSchema = z.enum([
  "60hz",
  "75hz",
  "120hz",
  "144hz",
  "165hz",
  "240hz",
  "360hz_plus",
]);

const monitorAspectRatioSchema = z.enum([
  "16:9",
  "21:9",
  "32:9",
  "16:10",
  "3:2",
]);

const monitorUseFitSchema = z.enum([
  "pc_gaming",
  "console_gaming",
  "content_creation",
  "office",
  "general",
]);

const monitorHDRLevelSchema = z.enum([
  "none",
  "basic",
  "good",
  "great",
  "excellent",
]);

const monitorColorAccuracyTierSchema = z.enum([
  "basic",
  "good",
  "great",
  "professional",
]);

const monitorGSyncSupportSchema = z.enum(["none", "compatible", "certified"]);

const monitorErgonomicFeatureSchema = z.enum([
  "height_adjust",
  "tilt",
  "swivel",
  "pivot",
  "vesa_mount",
]);

const monitorConnectivitySchema = z.enum([
  "displayport_1_2",
  "displayport_1_4",
  "displayport_2_1",
  "hdmi_2_0",
  "hdmi_2_1",
  "usb_c",
  "thunderbolt",
]);

const monitorFeatureTagSchema = z.enum([
  "gaming",
  "esports",
  "content_creation",
  "color_accurate",
  "hdr",
  "curved",
  "ultrawide",
  "fast_response",
  "high_refresh",
  "4k",
  "oled",
  "value_pick",
  "usb_c_hub",
  "kvm",
  "speakers",
  "gsync",
  "freesync",
  "low_input_lag",
  "professional",
  "portable",
]);

const monitorCoreAttributesSchema = z.object({
  category_subtype: z.literal("monitor"),
  price_tier: priceTierSchema,
  platform_fit: z.array(platformFitSchema),
  availability_class: availabilitySchema,
  monitor_size_inches: z.number(),
  monitor_size_class: monitorSizeClassSchema,
  monitor_curved: z.boolean(),
  monitor_curve_radius_mm: z.number().optional(),
  monitor_panel_type: monitorPanelTypeSchema,
  monitor_resolution: z.string(),
  monitor_resolution_class: monitorResolutionClassSchema,
  monitor_ppi: z.number(),
  monitor_aspect_ratio: monitorAspectRatioSchema,
  monitor_color_depth: z.number(),
  monitor_native_refresh_hz: z.number(),
  monitor_max_refresh_hz: z.number(),
  monitor_refresh_class: monitorRefreshClassSchema,
  monitor_max_refresh_dp: z.number().optional(),
  monitor_max_refresh_hdmi: z.number().optional(),
  monitor_response_time_ms: z.number().optional(),
  monitor_input_lag_ms: z.number().optional(),
  monitor_vrr: z.boolean(),
  monitor_freesync: z.boolean(),
  monitor_gsync: monitorGSyncSupportSchema,
  monitor_vrr_min_hz: z.number().optional(),
  monitor_vrr_max_hz: z.number().optional(),
  monitor_contrast_ratio: z.number().nullable().optional(),
  monitor_infinite_contrast: z.boolean(),
  monitor_local_dimming: z.boolean(),
  monitor_peak_brightness: z.number().optional(),
  monitor_sdr_brightness: z.number().optional(),
  monitor_min_brightness: z.number().optional(),
  monitor_hdr10: z.boolean(),
  monitor_dolby_vision: z.boolean(),
  monitor_hdr_level: monitorHDRLevelSchema,
  monitor_srgb_coverage: z.number(),
  monitor_adobe_rgb_coverage: z.number().optional(),
  monitor_dci_p3_coverage: z.number().optional(),
  monitor_color_accuracy: monitorColorAccuracyTierSchema,
  monitor_factory_calibrated: z.boolean(),
  monitor_height_adjust: z.boolean(),
  monitor_tilt: z.boolean(),
  monitor_swivel: z.boolean(),
  monitor_pivot: z.boolean(),
  monitor_vesa: z.boolean(),
  monitor_ergonomic_features: z.array(monitorErgonomicFeatureSchema),
  monitor_displayport_count: z.number(),
  monitor_displayport_version: z.string().optional(),
  monitor_hdmi_count: z.number(),
  monitor_hdmi_2_1: z.boolean(),
  monitor_usb_c_dp: z.boolean(),
  monitor_usb_c_pd_watts: z.number().optional(),
  monitor_usb_hub_ports: z.number(),
  monitor_kvm: z.boolean(),
  monitor_speakers: z.boolean(),
  monitor_audio_out: z.boolean(),
  monitor_connectivity: z.array(monitorConnectivitySchema),
  monitor_overall_score: z.number().optional(),
  monitor_pc_gaming_score: z.number().optional(),
  monitor_console_gaming_score: z.number().optional(),
  monitor_office_score: z.number().optional(),
  monitor_editing_score: z.number().optional(),
  monitor_response_time_score: z.number().optional(),
  monitor_sdr_picture_score: z.number().optional(),
  monitor_hdr_picture_score: z.number().optional(),
  monitor_color_accuracy_score: z.number().optional(),
  monitor_brightness_score: z.number().optional(),
  monitor_use_fit: z.array(monitorUseFitSchema),
  monitor_feature_tags: z.array(monitorFeatureTagSchema),
  monitor_value_pick: z.boolean(),
});

export const monitorProductSchema = z.object({
  ...baseProductShape,
  category: z.literal("monitor"),
  core_attributes: monitorCoreAttributesSchema,
});

// =============================================================================
// Array-level Schemas (validation entry points)
// =============================================================================

export const mouseProductArraySchema = z.array(mouseProductSchema);
export const audioProductArraySchema = z.array(audioProductSchema);
export const keyboardProductArraySchema = z.array(keyboardProductSchema);
export const monitorProductArraySchema = z.array(monitorProductSchema);
