/**
 * Sample Product Data
 *
 * Example products for testing the recommendation system.
 * These demonstrate the full data structure and can be used
 * for development and testing before production data is added.
 */

import type { MouseProduct, AudioProduct } from "@/types/products";

// =============================================================================
// Sample Mouse Products
// =============================================================================

/**
 * Razer Viper V3 Pro - Premium competitive wireless mouse
 * Data sourced from RTINGS lab testing
 */
export const razerViperV3Pro: MouseProduct = {
  id: "razer_viper_v3_pro",
  name: "Razer Viper V3 Pro",
  brand: "Razer",
  category: "mouse",
  price_range_usd: [150, 180],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "top_tier_competitive_fps",
    "ultralight",
    "safe_shape",
    "esports_grade_latency",
    "8k_polling",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "premium",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle", "wired_usb"],
    wireless: true,
    battery_life_hr: 95,
    latency_class: "very_low",
    software_support: "great",
    availability_class: "easy",

    mouse_handedness: "ambi",
    mouse_weight_g: 53.8,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 127.1,
    mouse_width_mm: 63.9,
    mouse_height_mm: 39.9,
    mouse_size_class: "medium",
    mouse_shape_profile: "low_hump",
    mouse_grip_fit: ["claw", "palm", "fingertip"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 5,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "8000",
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 1.0,
    mouse_sensor_latency_ms: 0.5,
    mouse_build_quality: "great",
    mouse_feet_quality: "great",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape", "small_hands_friendly", "large_hands_friendly"],
    mouse_value_pick: false,
  },
};

/**
 * Logitech G Pro X Superlight 2 - Premium esports wireless mouse
 * Data based on RTINGS and community consensus
 */
export const logitechGProXSuperlight2: MouseProduct = {
  id: "logitech_g_pro_x_superlight_2",
  name: "Logitech G Pro X Superlight 2",
  brand: "Logitech",
  category: "mouse",
  price_range_usd: [150, 160],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "top_tier_competitive_fps",
    "ultralight",
    "safe_shape",
    "esports_proven",
    "8k_polling",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "premium",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle", "wired_usb"],
    wireless: true,
    battery_life_hr: 95,
    latency_class: "very_low",
    software_support: "great",
    availability_class: "easy",

    mouse_handedness: "ambi",
    mouse_weight_g: 60,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 125,
    mouse_width_mm: 63.5,
    mouse_height_mm: 40,
    mouse_size_class: "medium",
    mouse_shape_profile: "low_hump",
    mouse_grip_fit: ["claw", "palm", "fingertip"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 5,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "8000",
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 1.2,
    mouse_sensor_latency_ms: 0.6,
    mouse_build_quality: "great",
    mouse_feet_quality: "great",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape", "large_hands_friendly"],
    mouse_value_pick: false,
  },
};

/**
 * Pulsar X2 - Mid-range competitive wireless mouse
 * Popular budget-friendly esports option
 */
export const pulsarX2: MouseProduct = {
  id: "pulsar_x2",
  name: "Pulsar X2",
  brand: "Pulsar",
  category: "mouse",
  price_range_usd: [90, 110],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "competitive_fps",
    "ultralight",
    "safe_shape",
    "value_pick",
    "small_medium_hands",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "upper_midrange",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle", "wired_usb"],
    wireless: true,
    battery_life_hr: 70,
    latency_class: "very_low",
    software_support: "good",
    availability_class: "easy",

    mouse_handedness: "ambi",
    mouse_weight_g: 52,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 120,
    mouse_width_mm: 63,
    mouse_height_mm: 38,
    mouse_size_class: "small",
    mouse_shape_profile: "mid_hump",
    mouse_grip_fit: ["claw", "fingertip"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 5,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "4000",
    mouse_sensor_class: "great",
    mouse_click_latency_ms: 1.5,
    mouse_sensor_latency_ms: 0.8,
    mouse_build_quality: "good",
    mouse_feet_quality: "great",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape", "small_hands_friendly"],
    mouse_value_pick: true,
  },
};

// =============================================================================
// Sample Audio Products
// =============================================================================

/**
 * SteelSeries Arctis Nova 7 Wireless - Premium wireless gaming headset
 * Data sourced from RTINGS lab testing
 */
export const steelseriesArctisNova7: AudioProduct = {
  id: "steelseries_arctis_nova_7",
  name: "SteelSeries Arctis Nova 7 Wireless",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [140, 180],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "great_for_long_sessions",
    "dual_wireless_bluetooth_plus_dongle",
    "strong_bass_presence",
    "not_for_travel_noise",
    "multi_platform",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "headset",
    price_tier: "upper_midrange",
    platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"],
    wireless: true,
    battery_life_hr: 33,
    latency_class: "low",
    software_support: "great",
    eq_support: true,
    availability_class: "easy",

    audio_type: "headset",
    audio_open_back: false,
    audio_has_mic: true,
    audio_mic_type: "detachable_boom",
    audio_mic_quality: "good",
    audio_sound_signature: "warm",
    audio_competitive_fps: "good",
    audio_immersion: "good",
    audio_isolation: "low",
    audio_anc: false,
    audio_comfort: "great",
    audio_weight_g: 325,
    audio_needs_amp: "no",
    audio_impedance_ohm: 36,
    audio_sensitivity_db: 98,
    audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"],
    audio_virtual_surround: ["steelseries_spatial", "dolby_atmos"],
    audio_repairability: "good",
    audio_value_pick: true,
  },
};

/**
 * HyperX Cloud III Wireless - Mid-range wireless gaming headset
 * Solid all-rounder with good mic
 */
export const hyperxCloudIIIWireless: AudioProduct = {
  id: "hyperx_cloud_iii_wireless",
  name: "HyperX Cloud III Wireless",
  brand: "HyperX",
  category: "audio",
  price_range_usd: [150, 170],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "great_mic_quality",
    "comfortable_fit",
    "durable_build",
    "good_isolation",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "headset",
    price_tier: "upper_midrange",
    platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"],
    wireless: true,
    battery_life_hr: 120,
    latency_class: "low",
    software_support: "good",
    eq_support: true,
    availability_class: "easy",

    audio_type: "headset",
    audio_open_back: false,
    audio_has_mic: true,
    audio_mic_type: "detachable_boom",
    audio_mic_quality: "great",
    audio_sound_signature: "v_shaped",
    audio_competitive_fps: "good",
    audio_immersion: "good",
    audio_isolation: "medium",
    audio_anc: false,
    audio_comfort: "great",
    audio_weight_g: 340,
    audio_needs_amp: "no",
    audio_impedance_ohm: 64,
    audio_sensitivity_db: 104,
    audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok",
    audio_value_pick: false,
  },
};

/**
 * Sennheiser HD 560S - Mid-range open-back audiophile headphones
 * Great for music and immersive single-player gaming
 */
export const sennheiserHD560S: AudioProduct = {
  id: "sennheiser_hd560s",
  name: "Sennheiser HD 560S",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [150, 200],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "audiophile_entry",
    "wide_soundstage",
    "excellent_imaging",
    "no_mic_included",
    "needs_quiet_environment",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "headphone",
    price_tier: "upper_midrange",
    platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    eq_support: false,
    availability_class: "easy",

    audio_type: "headphone",
    audio_open_back: true,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral",
    audio_competitive_fps: "great",
    audio_immersion: "great",
    audio_isolation: "low",
    audio_anc: false,
    audio_comfort: "great",
    audio_weight_g: 240,
    audio_needs_amp: "maybe",
    audio_impedance_ohm: 120,
    audio_sensitivity_db: 110,
    audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good",
    audio_value_pick: true,
  },
};

// =============================================================================
// Sample Data Arrays for Testing
// =============================================================================

/**
 * All sample mouse products for testing
 */
export const sampleMouseProducts: MouseProduct[] = [
  razerViperV3Pro,
  logitechGProXSuperlight2,
  pulsarX2,
];

/**
 * All sample audio products for testing
 */
export const sampleAudioProducts: AudioProduct[] = [
  steelseriesArctisNova7,
  hyperxCloudIIIWireless,
  sennheiserHD560S,
];

/**
 * All sample products combined for testing
 */
export const allSampleProducts = [
  ...sampleMouseProducts,
  ...sampleAudioProducts,
];
