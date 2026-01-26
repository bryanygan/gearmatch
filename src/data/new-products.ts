/**
 * New Mouse Products - Cleaned to match existing types
 * 
 * Add these to src/data/sample-products.ts
 * Then export them from the sampleMouseProducts array
 */

import type { MouseProduct } from "@/types/products";

// =============================================================================
// Ultralight Competitive Mice
// =============================================================================

export const hitscanHyperlight: MouseProduct = {
  id: "hitscan_hyperlight",
  name: "Hitscan Hyperlight",
  brand: "Hitscan",
  category: "mouse",
  price_range_usd: [70, 120],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "ultralight",
    "competitive_fps",
    "fingertip_claw",
    "small_mouse",
    "value_pick",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "upper_midrange", // $70-120 is upper_midrange, not midrange
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"], // Fixed: was "wireless_2_4ghz"
    wireless: true,
    battery_life_hr: 75, // Simplified: use 1kHz estimate as baseline
    latency_class: "very_low", // Fixed: "excellent" not in enum
    software_support: "basic", // Fixed: "ok" not in enum
    availability_class: "sometimes", // Direct-to-consumer = harder to find

    mouse_handedness: "ambi",
    mouse_weight_g: 41.6,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 118,
    mouse_width_mm: 62,
    mouse_height_mm: 39,
    mouse_size_class: "small",
    mouse_shape_profile: "mid_hump",
    mouse_grip_fit: ["claw", "fingertip"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 6,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "8000", // Has 8k option
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 1.9, // Simplified: use 1kHz baseline
    mouse_sensor_latency_ms: 3.4,
    mouse_build_quality: "great", // Fixed: "excellent" not in enum
    mouse_feet_quality: "great",
    mouse_coating: "matte",
    mouse_feel_tags: ["small_hands_friendly"],
    mouse_value_pick: true,
  },
};

export const endgameGearOp1_8kV2: MouseProduct = {
  id: "endgame_gear_op1_8k_v2",
  name: "Endgame Gear OP1 8k v2",
  brand: "Endgame Gear",
  category: "mouse",
  price_range_usd: [80, 110],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "competitive_fps",
    "wired",
    "ultralight",
    "8k_polling",
    "esports_grade_latency",
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
    connection_type: ["wired_usb"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low", // Best-in-class = very_low in our system
    software_support: "good",
    availability_class: "easy",

    mouse_handedness: "ambi",
    mouse_weight_g: 46.6,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 118,
    mouse_width_mm: 61,
    mouse_height_mm: 37,
    mouse_size_class: "small",
    mouse_shape_profile: "low_hump", // "rear_low_hump" → closest is "low_hump"
    mouse_grip_fit: ["claw", "fingertip", "palm"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 6,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "8000",
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 0.6,
    mouse_sensor_latency_ms: 1.0,
    mouse_build_quality: "great",
    mouse_feet_quality: "great",
    mouse_coating: "matte",
    mouse_feel_tags: ["small_hands_friendly"],
    mouse_value_pick: true,
  },
};

export const scyroxV8: MouseProduct = {
  id: "scyrox_v8",
  name: "Scyrox V8",
  brand: "Scyrox",
  category: "mouse",
  price_range_usd: [70, 100],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "competitive_fps",
    "ultralight",
    "wireless_gaming",
    "value_pick",
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
    battery_life_hr: undefined, // Not officially specified
    latency_class: "very_low",
    software_support: "basic",
    availability_class: "sometimes",

    mouse_handedness: "ambi",
    mouse_weight_g: 40.2,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 118,
    mouse_width_mm: 63,
    mouse_height_mm: 38,
    mouse_size_class: "small",
    mouse_shape_profile: "rear_hump",
    mouse_grip_fit: ["claw", "fingertip", "palm"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 6,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "8000",
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 1.3,
    mouse_sensor_latency_ms: 2.8,
    mouse_build_quality: "great",
    mouse_feet_quality: "great",
    mouse_coating: "matte",
    mouse_feel_tags: ["small_hands_friendly"],
    mouse_value_pick: true,
  },
};

export const mchoseL7Ultra: MouseProduct = {
  id: "mchose_l7_ultra",
  name: "MCHOSE L7 Ultra",
  brand: "MCHOSE",
  category: "mouse",
  price_range_usd: [45, 70],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "competitive_fps",
    "ultralight",
    "safe_shape",
    "value_pick",
    "wireless_gaming",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "midrange", // $45-70 fits midrange
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_usb"],
    wireless: true,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "good",
    availability_class: "easy",

    mouse_handedness: "ambi",
    mouse_weight_g: 45.9,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 115,
    mouse_width_mm: 61,
    mouse_height_mm: 37,
    mouse_size_class: "small",
    mouse_shape_profile: "rear_hump",
    mouse_grip_fit: ["claw", "fingertip"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 6,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "8000",
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 1.4,
    mouse_sensor_latency_ms: 1.3,
    mouse_build_quality: "good",
    mouse_feet_quality: "good",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape", "small_hands_friendly"],
    mouse_value_pick: true,
  },
};

// =============================================================================
// Ergo / Feature-Rich Mice
// =============================================================================

export const logitechG502XPlus: MouseProduct = {
  id: "logitech_g502_x_plus",
  name: "Logitech G502 X PLUS",
  brand: "Logitech",
  category: "mouse",
  price_range_usd: [110, 160],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "wireless_gaming",
    "ergo",
    "productivity",
    "mmo_buttons",
    "feature_rich",
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
    battery_life_hr: 130, // RGB off
    latency_class: "very_low",
    software_support: "good",
    availability_class: "easy",

    mouse_handedness: "right",
    mouse_weight_g: 103.7,
    mouse_weight_class: "heavy",
    mouse_length_mm: 130,
    mouse_width_mm: 78,
    mouse_height_mm: 41,
    mouse_size_class: "large",
    mouse_shape_profile: "high_hump",
    mouse_grip_fit: ["palm", "claw", "fingertip"],
    mouse_game_fit: ["fps", "mmo", "general", "productivity"],
    mouse_button_count: 12,
    mouse_button_count_class: "high",
    mouse_scroll_features: ["tilt_left_right", "free_scroll", "infinite_scroll"],
    mouse_polling_rate_max_hz: "1000",
    mouse_sensor_class: "flagship",
    mouse_click_latency_ms: 2.7,
    mouse_sensor_latency_ms: 4.5,
    mouse_build_quality: "great",
    mouse_feet_quality: "great",
    mouse_coating: "mixed",
    mouse_feel_tags: ["large_hands_friendly"],
    mouse_value_pick: false,
  },
};

export const razerBasiliskV3: MouseProduct = {
  id: "razer_basilisk_v3",
  name: "Razer Basilisk V3",
  brand: "Razer",
  category: "mouse",
  price_range_usd: [40, 70],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "ergo",
    "productivity",
    "mmo_buttons",
    "wired",
    "feature_rich",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "midrange", // Often discounted into this range
    platform_fit: ["pc"],
    connection_type: ["wired_usb"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "good",
    availability_class: "easy",

    mouse_handedness: "right",
    mouse_weight_g: 99.9,
    mouse_weight_class: "mid",
    mouse_length_mm: 130,
    mouse_width_mm: 75,
    mouse_height_mm: 42,
    mouse_size_class: "large",
    mouse_shape_profile: "high_hump",
    mouse_grip_fit: ["palm", "claw", "fingertip"],
    mouse_game_fit: ["fps", "mmo", "general", "productivity"],
    mouse_button_count: 11,
    mouse_button_count_class: "high",
    mouse_scroll_features: ["tilt_left_right", "free_scroll", "infinite_scroll"],
    mouse_polling_rate_max_hz: "1000",
    mouse_sensor_class: "great",
    mouse_click_latency_ms: 2.9,
    mouse_sensor_latency_ms: 3.8,
    mouse_build_quality: "great",
    mouse_feet_quality: "great",
    mouse_coating: "mixed",
    mouse_feel_tags: ["large_hands_friendly", "safe_shape"],
    mouse_value_pick: false,
  },
};

// =============================================================================
// Budget / Value Mice
// =============================================================================

export const logitechG305: MouseProduct = {
  id: "logitech_g305",
  name: "Logitech G305 LIGHTSPEED",
  brand: "Logitech",
  category: "mouse",
  price_range_usd: [30, 55],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "wireless_gaming",
    "value_pick",
    "safe_shape",
    "budget_wireless",
  ],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
    source_name: "RTINGS",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "budget",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"],
    wireless: true,
    battery_life_hr: 250,
    latency_class: "low",
    software_support: "good",
    availability_class: "easy",

    mouse_handedness: "ambi",
    mouse_weight_g: 101.7, // With AA battery
    mouse_weight_class: "heavy",
    mouse_length_mm: 116,
    mouse_width_mm: 63,
    mouse_height_mm: 38,
    mouse_size_class: "small",
    mouse_shape_profile: "center_hump",
    mouse_grip_fit: ["palm", "claw", "fingertip"],
    mouse_game_fit: ["fps", "general", "productivity"],
    mouse_button_count: 6,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "1000",
    mouse_sensor_class: "great",
    mouse_click_latency_ms: 6.3,
    mouse_sensor_latency_ms: 4.5,
    mouse_build_quality: "great",
    mouse_feet_quality: "good",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape", "small_hands_friendly"],
    mouse_value_pick: true,
  },
};

// =============================================================================
// Export array for easy import
// =============================================================================

export const newMouseProducts: MouseProduct[] = [
  hitscanHyperlight,
  endgameGearOp1_8kV2,
  scyroxV8,
  mchoseL7Ultra,
  logitechG502XPlus,
  razerBasiliskV3,
  logitechG305,
];
