/**
 * Consolidated Audio Products
 * All headphones, headsets, earbuds, IEMs, and TWS products
 */

import type { AudioProduct } from "@/types/products";

// =============================================================================
// GAMING HEADSETS
// =============================================================================

export const steelseriesArctisNova7: AudioProduct = {
  id: "steelseries_arctis_nova_7",
  name: "SteelSeries Arctis Nova 7 Wireless",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [140, 180],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+7+Wireless&tag=gearmatch-20",
  recommendation_tags: ["great_for_long_sessions", "dual_wireless_bluetooth_plus_dongle", "strong_bass_presence", "not_for_travel_noise", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 33,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 325, audio_needs_amp: "no",
    audio_impedance_ohm: 36, audio_sensitivity_db: 98, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["steelseries_spatial", "dolby_atmos"],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const hyperxCloudIIIWireless: AudioProduct = {
  id: "hyperx_cloud_iii_wireless",
  name: "HyperX Cloud III Wireless",
  brand: "HyperX",
  category: "audio",
  price_range_usd: [150, 170],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=HyperX+Cloud+III+Wireless&tag=gearmatch-20",
  recommendation_tags: ["great_mic_quality", "comfortable_fit", "durable_build", "good_isolation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 120,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: 340, audio_needs_amp: "no",
    audio_impedance_ohm: 64, audio_sensitivity_db: 104, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const razerBlackSharkV3Pro: AudioProduct = {
  id: "razer_blackshark_v3_pro",
  name: "Razer BlackShark V3 Pro",
  brand: "Razer",
  category: "audio",
  price_range_usd: [180, 220],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Razer+BlackShark+V3+Pro&tag=gearmatch-20",
  recommendation_tags: ["competitive_fps", "wireless_gaming", "great_mic", "multiplatform", "long_battery"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_usb", "wired_3_5mm"], wireless: true, battery_life_hr: 69.7,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "v_shaped", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 117.2, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const audezeMaxwell: AudioProduct = {
  id: "audeze_maxwell",
  name: "Audeze Maxwell",
  brand: "Audeze",
  category: "audio",
  price_range_usd: [280, 350],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Audeze+Maxwell&tag=gearmatch-20",
  recommendation_tags: ["audiophile_gaming", "planar_magnetic", "wireless_gaming", "great_mic", "music_first"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_usb", "wired_3_5mm"], wireless: true, battery_life_hr: 77.4,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 485, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "planar",
    audio_wireless_codec_support: ["sbc", "aac", "ldac", "lc3"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const steelseriesArctis7Wireless2017: AudioProduct = {
  id: "steelseries_arctis_7_wireless_2017",
  name: "SteelSeries Arctis 7 Wireless 2017",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [100, 150],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+7+Wireless+2017&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "long_battery", "ski_band", "retractable_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 24,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 408, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const razerKairaProWireless: AudioProduct = {
  id: "razer_kaira_pro_wireless",
  name: "Razer Kaira Pro Wireless",
  brand: "Razer",
  category: "audio",
  price_range_usd: [100, 150],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Razer+Kaira+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "xbox", "playstation", "bluetooth", "rgb"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "xbox", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 19.3,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 331, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelseriesArctisNova3: AudioProduct = {
  id: "steelseries_arctis_nova_3",
  name: "SteelSeries Arctis Nova 3",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [70, 100],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+3&tag=gearmatch-20",
  recommendation_tags: ["wired_gaming", "budget", "rgb", "usb_audio", "steelseries"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_usb", "wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 254, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const astroA50Gen4: AudioProduct = {
  id: "astro_a50_gen_4",
  name: "Astro A50 Gen 4",
  brand: "Astro",
  category: "audio",
  price_range_usd: [250, 300],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Astro+A50+Gen+4&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "premium", "dock", "dolby_atmos", "semi_open"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 17.5,
    latency_class: "very_low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: true, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const astroA50X: AudioProduct = {
  id: "astro_a50_x",
  name: "Astro A50 X",
  brand: "Astro",
  category: "audio",
  price_range_usd: [350, 400],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Astro+A50+X&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "premium", "playsync", "hdmi_passthrough", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 26.4,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: true, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const turtleBeachStealth600Gen3: AudioProduct = {
  id: "turtle_beach_stealth_600_gen3",
  name: "Turtle Beach Stealth 600 (Gen 3)",
  brand: "Turtle Beach",
  category: "audio",
  price_range_usd: [100, 100],
  image_url: "https://m.media-amazon.com/images/I/71g7q9lnzTL._AC_SL1500_.jpg",
  product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+600+(Gen+3)&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless_gaming", "multiplatform", "long_battery", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox", "switch"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 85.7,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 300, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const logitechG435Lightspeed: AudioProduct = {
  id: "logitech_g435_lightspeed",
  name: "Logitech G435 LIGHTSPEED Wireless",
  brand: "Logitech",
  category: "audio",
  price_range_usd: [60, 60],
  image_url: "https://m.media-amazon.com/images/I/71wEqNKKfKL._AC_SL1500_.jpg",
  product_url: "https://www.amazon.com/s?k=Logitech+G435+LIGHTSPEED+Wireless&tag=gearmatch-20",
  recommendation_tags: ["budget_gaming", "wireless_gaming", "lightweight", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation", "switch"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 19.8,
    latency_class: "low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 165, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const logitechG432: AudioProduct = {
  id: "logitech_g432",
  name: "Logitech G432",
  brand: "Logitech",
  category: "audio",
  price_range_usd: [50, 50],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Logitech+G432&tag=gearmatch-20",
  recommendation_tags: ["gaming", "budget_gaming", "voice_chat", "multiplatform", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_3_5mm", "wired_usb"], wireless: false, battery_life_hr: undefined,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 304, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const hyperxCloudIII: AudioProduct = {
  id: "hyperx_cloud_iii",
  name: "HyperX Cloud III",
  brand: "HyperX",
  category: "audio",
  price_range_usd: [100, 100],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=HyperX+Cloud+III&tag=gearmatch-20",
  recommendation_tags: ["pc_gaming", "playstation", "competitive_gaming", "voice_chat", "great_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wired_usb_c", "wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: 295, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 118, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const astroA10: AudioProduct = {
  id: "astro_a10",
  name: "Astro A10",
  brand: "Astro",
  category: "audio",
  price_range_usd: [60, 60],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Astro+A10&tag=gearmatch-20",
  recommendation_tags: ["budget_gaming", "console_gaming", "voice_chat", "beginners", "great_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 104, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const turtleBeachRecon50: AudioProduct = {
  id: "turtle_beach_recon_50x_50p",
  name: "Turtle Beach Recon 50X/50P",
  brand: "Turtle Beach",
  category: "audio",
  price_range_usd: [25, 25],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Turtle+Beach+Recon+50X%2F50P&tag=gearmatch-20",
  recommendation_tags: ["ultra_budget_gaming", "casual_gaming", "beginners", "great_mic", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 181, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 98, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const jabraEvolve285Wireless: AudioProduct = {
  id: "jabra_evolve2_85_wireless",
  name: "Jabra Evolve2 85 Wireless",
  brand: "Jabra",
  category: "audio",
  price_range_usd: [449, 449],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Jabra+Evolve2+85+Wireless&tag=gearmatch-20",
  recommendation_tags: ["professional_office", "conference_calls", "remote_work", "travel", "anc", "boom_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 31.7,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 286, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 117, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const dropSennheiserPC38X: AudioProduct = {
  id: "drop_sennheiser_epos_pc38x",
  name: "Drop + Sennheiser/EPOS PC38X",
  brand: "Drop/Sennheiser/EPOS",
  category: "audio",
  price_range_usd: [130, 170],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Drop+%2B+Sennheiser%2FEPOS+PC38X&tag=gearmatch-20",
  recommendation_tags: ["gaming", "pc_gaming", "xbox_series", "ps5", "open_back", "competitive_fps", "mic_quality"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "sometimes",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 249, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 113.6, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelSeriesTusq: AudioProduct = {
  id: "steelseries_tusq",
  name: "SteelSeries TUSQ",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [40, 40],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=SteelSeries+TUSQ&tag=gearmatch-20",
  recommendation_tags: ["gaming", "competitive_gaming", "iem", "detachable_mic", "budget"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "budget", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 23, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const steelSeriesArctisGameBuds: AudioProduct = {
  id: "steelseries_arctis_gamebuds",
  name: "SteelSeries Arctis GameBuds",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [160, 160],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+GameBuds&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "playstation", "pc_gaming", "sports_gaming", "multi_use", "anc"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["bluetooth", "wireless_2_4_dongle"], wireless: true, battery_life_hr: 8.25,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 102.1, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// AUDIOPHILE HEADPHONES (Open-Back & Closed-Back)
// =============================================================================

export const sennheiserHD560S: AudioProduct = {
  id: "sennheiser_hd560s",
  name: "Sennheiser HD 560S",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [150, 200],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Sennheiser+HD+560S&tag=gearmatch-20",
  recommendation_tags: ["audiophile_entry", "wide_soundstage", "excellent_imaging", "no_mic_included", "needs_quiet_environment"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 240, audio_needs_amp: "maybe",
    audio_impedance_ohm: 120, audio_sensitivity_db: 110, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const sennheiserHd800s: AudioProduct = {
  id: "sennheiser_hd_800_s",
  name: "Sennheiser HD 800 S",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [1600, 1800],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Sennheiser+HD+800+S&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "open_back", "reference", "studio", "critical_listening", "flagship"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "great",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 372, audio_needs_amp: "yes",
    audio_impedance_ohm: 300, audio_sensitivity_db: 102, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const sennheiserHD490PRO: AudioProduct = {
  id: "sennheiser_hd_490_pro",
  name: "Sennheiser HD 490 PRO",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [350, 400],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Sennheiser+HD+490+PRO&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "studio_monitor", "critical_listening", "open_back", "swappable_pads"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 263, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 108.1, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const philipsShp9500: AudioProduct = {
  id: "philips_shp9500",
  name: "Philips SHP9500",
  brand: "Philips",
  category: "audio",
  price_range_usd: [80, 80],
  image_url: "https://m.media-amazon.com/images/I/71wAp8kBi5L._AC_SL1500_.jpg",
  product_url: "https://www.amazon.com/s?k=Philips+SHP9500&tag=gearmatch-20",
  recommendation_tags: ["audiophile_entry", "open_back", "critical_listening", "gaming", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "budget", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 320, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 111.9, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const focalStellia: AudioProduct = {
  id: "focal_stellia",
  name: "Focal Stellia",
  brand: "Focal",
  category: "audio",
  price_range_usd: [2900, 3000],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Focal+Stellia&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "closed_back", "premium", "beryllium_driver", "xlr_cable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 444, audio_needs_amp: "maybe",
    audio_impedance_ohm: 35, audio_sensitivity_db: 106, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const audezeLcdX: AudioProduct = {
  id: "audeze_lcd_x",
  name: "Audeze LCD-X",
  brand: "Audeze",
  category: "audio",
  price_range_usd: [1100, 1200],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Audeze+LCD-X&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "open_back", "planar_magnetic", "studio", "warm"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 603, audio_needs_amp: "no",
    audio_impedance_ohm: 20, audio_sensitivity_db: 114, audio_driver_type: "planar",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const hifimanAryaStealthMagnet: AudioProduct = {
  id: "hifiman_arya_stealth_magnet",
  name: "HiFiMan Arya Stealth Magnet Version",
  brand: "HiFiMan",
  category: "audio",
  price_range_usd: [1100, 1300],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=HiFiMan+Arya+Stealth+Magnet+Version&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "open_back", "planar_magnetic", "bright", "stealth_magnet"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: true, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "bright", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 431, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 107, audio_driver_type: "planar",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const audioTechnicaAthM20x: AudioProduct = {
  id: "audio_technica_ath_m20x",
  name: "Audio-Technica ATH-M20x",
  brand: "Audio-Technica",
  category: "audio",
  price_range_usd: [50, 50],
  image_url: "https://m.media-amazon.com/images/I/71dVWwxXJNL._AC_SL1500_.jpg",
  product_url: "https://www.amazon.com/s?k=Audio-Technica+ATH-M20x&tag=gearmatch-20",
  recommendation_tags: ["studio_monitor", "budget", "neutral", "gaming", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "budget", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 190, audio_needs_amp: "no",
    audio_impedance_ohm: 47, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const sonyMdr7506: AudioProduct = {
  id: "sony_mdr_7506",
  name: "Sony MDR-7506",
  brand: "Sony",
  category: "audio",
  price_range_usd: [100, 100],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Sony+MDR-7506&tag=gearmatch-20",
  recommendation_tags: ["studio_monitoring", "critical_listening", "podcasting", "gaming", "industry_standard", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "bright", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 209, audio_needs_amp: "no",
    audio_impedance_ohm: 63, audio_sensitivity_db: 111, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const beyerdynamicDt770Pro250: AudioProduct = {
  id: "beyerdynamic_dt_770_pro_250",
  name: "Beyerdynamic DT 770 PRO",
  brand: "Beyerdynamic",
  category: "audio",
  price_range_usd: [160, 160],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Beyerdynamic+DT+770+PRO&tag=gearmatch-20",
  recommendation_tags: ["studio_monitoring", "mixing", "critical_listening", "gaming", "professional"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "bright", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 272, audio_needs_amp: "yes",
    audio_impedance_ohm: 250, audio_sensitivity_db: 102, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const beyerdynamicDt1770Pro: AudioProduct = {
  id: "beyerdynamic_dt_1770_pro",
  name: "Beyerdynamic DT 1770 PRO",
  brand: "Beyerdynamic",
  category: "audio",
  price_range_usd: [500, 500],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Beyerdynamic+DT+1770+PRO&tag=gearmatch-20",
  recommendation_tags: ["studio_monitoring", "mixing", "mastering", "critical_listening", "professional"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 408, audio_needs_amp: "yes",
    audio_impedance_ohm: 250, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "great", audio_value_pick: false,
  },
};

export const focalBathysWireless: AudioProduct = {
  id: "focal_bathys_wireless",
  name: "Focal Bathys Wireless",
  brand: "Focal",
  category: "audio",
  price_range_usd: [600, 800],
  image_url: undefined,
  product_url: "https://www.amazon.com/s?k=Focal+Bathys+Wireless&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "critical_listening", "closed_back", "usb_c_audio", "premium_anc", "travel"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 29.1,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "sometimes",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 358, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// WIRELESS ANC HEADPHONES
// =============================================================================

export const sonyWh1000xm6: AudioProduct = {
  id: "sony_wh_1000xm6", name: "Sony WH-1000XM6", brand: "Sony", category: "audio",
  price_range_usd: [400, 400], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+WH-1000XM6&tag=gearmatch-20",
  recommendation_tags: ["anc_flagship", "travel", "office", "wireless", "ldac", "lc3", "multipoint"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 31.75,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 254, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 119.5, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac", "lc3"], audio_virtual_surround: ["vendor_specific", "dolby_atmos"],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const sonyWH1000XM4: AudioProduct = {
  id: "sony_wh_1000xm4", name: "Sony WH-1000XM4 Wireless", brand: "Sony", category: "audio",
  price_range_usd: [200, 280], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+WH-1000XM4+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "music_first", "wireless_bluetooth", "ldac"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc", "mobile", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 37.7,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 272, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 115.1, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseQcUltra2ndGen: AudioProduct = {
  id: "bose_qc_ultra_headphones_2nd_gen", name: "Bose QuietComfort Ultra Headphones (2nd Gen)", brand: "Bose", category: "audio",
  price_range_usd: [430, 430], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+Ultra+Headphones+(2nd+Gen)&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "flagship", "work", "commute", "aptx_adaptive"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 37,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 263, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseQcHeadphonesWireless: AudioProduct = {
  id: "bose_qc_headphones_wireless", name: "Bose QuietComfort Headphones Wireless", brand: "Bose", category: "audio",
  price_range_usd: [249, 249], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+Headphones+Wireless&tag=gearmatch-20",
  recommendation_tags: ["anc", "travel", "commute", "office", "casual_listening", "bose"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 26.1,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 236, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 114.5, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const bowersWilkinsPx7S2Wireless: AudioProduct = {
  id: "bowers_wilkins_px7_s2_wireless", name: "Bowers & Wilkins Px7 S2 Wireless", brand: "Bowers & Wilkins", category: "audio",
  price_range_usd: [350, 400], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bowers+%26+Wilkins+Px7+S2+Wireless&tag=gearmatch-20",
  recommendation_tags: ["anc", "travel", "premium", "aptx_adaptive", "usb_c_audio"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 37.5,
    latency_class: "high", software_support: "basic", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 308, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const ankerSoundcoreLifeQ30: AudioProduct = {
  id: "anker_soundcore_life_q30", name: "Anker Soundcore Life Q30 Wireless", brand: "Anker", category: "audio",
  price_range_usd: [60, 80], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+Life+Q30+Wireless&tag=gearmatch-20",
  recommendation_tags: ["budget_anc", "travel", "commute", "value_pick", "wireless_bluetooth"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 44.3,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 263, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 110.8, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const ankerSpaceQ45: AudioProduct = {
  id: "anker_soundcore_space_q45", name: "Anker Soundcore Space Q45", brand: "Anker", category: "audio",
  price_range_usd: [100, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+Space+Q45&tag=gearmatch-20",
  recommendation_tags: ["budget_anc", "travel", "office", "ldac", "multipoint", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 27.8,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 295, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 119.5, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const ankerLifeQ20_2024: AudioProduct = {
  id: "anker_soundcore_life_q20_2024", name: "Anker Soundcore Life Q20 2024", brand: "Anker", category: "audio",
  price_range_usd: [50, 50], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+Life+Q20+2024&tag=gearmatch-20",
  recommendation_tags: ["ultra_budget_anc", "travel", "office", "multipoint", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 49,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "v_shaped", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 254, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 118.8, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const sennheiserHDB630: AudioProduct = {
  id: "sennheiser_hdb_630", name: "Sennheiser HDB 630", brand: "Sennheiser", category: "audio",
  price_range_usd: [350, 450], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sennheiser+HDB+630&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "premium_anc", "travel", "music_first", "balanced_signature"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile", "playstation"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 54.2,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 318, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyUltWear: AudioProduct = {
  id: "sony_ult_wear", name: "Sony ULT WEAR", brand: "Sony", category: "audio",
  price_range_usd: [200, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+ULT+WEAR&tag=gearmatch-20",
  recommendation_tags: ["bass_lovers", "anc", "travel", "commute", "casual_listening", "ldac"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 44.1,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 254, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 117, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const treblabZ7ProWireless: AudioProduct = {
  id: "treblab_z7_pro_wireless", name: "TREBLAB Z7 Pro Wireless", brand: "TREBLAB", category: "audio",
  price_range_usd: [100, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=TREBLAB+Z7+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["anc", "commute", "travel", "sports", "casual_listening", "ipx4"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 37.9,
    latency_class: "high", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "v_shaped", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 245, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const beatsStudioProWireless: AudioProduct = {
  id: "beats_studio_pro_wireless", name: "Beats Studio Pro Wireless", brand: "Beats", category: "audio",
  price_range_usd: [350, 350], image_url: undefined, product_url: "https://www.amazon.com/s?k=Beats+Studio+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["anc", "travel", "commute", "apple_ecosystem", "casual_listening", "vendor_specific"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["mobile", "pc", "playstation"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 28.5,
    latency_class: "high", software_support: "basic", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "ok", audio_weight_g: 272, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 104.7, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const beatsSolo4: AudioProduct = {
  id: "beats_solo_4", name: "Beats Solo 4", brand: "Beats", category: "audio",
  price_range_usd: [150, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Beats+Solo+4&tag=gearmatch-20",
  recommendation_tags: ["on_ear", "beats", "usb_c_audio", "stylish", "portable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["pc", "mobile", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 48.1,
    latency_class: "high", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "bright", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 218, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 119, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific", "dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const jblTune520bt: AudioProduct = {
  id: "jbl_tune_520bt", name: "JBL Tune 520BT", brand: "JBL", category: "audio",
  price_range_usd: [50, 50], image_url: undefined, product_url: "https://www.amazon.com/s?k=JBL+Tune+520BT&tag=gearmatch-20",
  recommendation_tags: ["budget", "on_ear", "wireless", "casual_listening", "commute"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 65.2,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 159, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const jblTune760NC: AudioProduct = {
  id: "jbl_tune_760nc", name: "JBL Tune 760NC Wireless", brand: "JBL", category: "audio",
  price_range_usd: [80, 130], image_url: undefined, product_url: "https://www.amazon.com/s?k=JBL+Tune+760NC+Wireless&tag=gearmatch-20",
  recommendation_tags: ["budget_anc", "budget_wireless", "over_ear_under_100", "casual_listening"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "budget", platform_fit: ["pc", "mobile", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 40.9,
    latency_class: "high", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "ok", audio_weight_g: 227, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyWHCH520: AudioProduct = {
  id: "sony_wh_ch520", name: "Sony WH-CH520 Wireless", brand: "Sony", category: "audio",
  price_range_usd: [40, 60], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+WH-CH520+Wireless&tag=gearmatch-20",
  recommendation_tags: ["budget", "budget_wireless", "under_50", "wireless_under_100", "sony", "casual_listening"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "budget", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 52.8,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 145, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// TRUE WIRELESS (TWS) EARBUDS
// =============================================================================

export const appleAirpodsPro3: AudioProduct = {
  id: "apple_airpods_pro_3", name: "Apple AirPods Pro 3", brand: "Apple", category: "audio",
  price_range_usd: [250, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Apple+AirPods+Pro+3&tag=gearmatch-20",
  recommendation_tags: ["tws", "anc", "ios", "apple_ecosystem", "vendor_specific", "hearing_aid", "heart_rate"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 9,
    latency_class: "high", software_support: "great", eq_support: false, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const appleAirpods4Anc: AudioProduct = {
  id: "apple_airpods_4_anc", name: "Apple AirPods 4 with Active Noise Cancellation", brand: "Apple", category: "audio",
  price_range_usd: [179, 179], image_url: undefined, product_url: "https://www.amazon.com/s?k=Apple+AirPods+4+with+Active+Noise+Cancellation&tag=gearmatch-20",
  recommendation_tags: ["tws", "anc", "open_fit", "casual_listening", "sports", "phone_calls", "apple_ecosystem"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 4.5,
    latency_class: "high", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "earbud", audio_open_back: true, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "great", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const sonyWf1000xm5: AudioProduct = {
  id: "sony_wf_1000xm5", name: "Sony WF-1000XM5", brand: "Sony", category: "audio",
  price_range_usd: [280, 280], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+WF-1000XM5&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc", "travel", "ldac", "sony"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 8.75,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 12, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac", "lc3"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const samsungGalaxyBuds3Pro: AudioProduct = {
  id: "samsung_galaxy_buds3_pro", name: "Samsung Galaxy Buds3 Pro", brand: "Samsung", category: "audio",
  price_range_usd: [250, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Samsung+Galaxy+Buds3+Pro&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc", "travel", "sports", "phone_calls", "samsung", "auracast"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 6,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "hybrid",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const boseQcUltraEarbuds2ndGen: AudioProduct = {
  id: "bose_qc_ultra_earbuds_2nd_gen", name: "Bose QuietComfort Ultra Earbuds (2nd Gen)", brand: "Bose", category: "audio",
  price_range_usd: [299, 299], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+Ultra+Earbuds+(2nd+Gen)&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc", "travel", "commute", "office", "sports", "aptx_adaptive"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "flagship", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 6.5,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const boseQcUltraEarbuds1stGen: AudioProduct = {
  id: "bose_qc_ultra_earbuds_1st_gen", name: "Bose QuietComfort Ultra Earbuds Truly Wireless", brand: "Bose", category: "audio",
  price_range_usd: [249, 249], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+Ultra+Earbuds+Truly+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc", "travel", "commute", "sports", "aptx_adaptive", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const sennheiserMomentumTW4: AudioProduct = {
  id: "sennheiser_momentum_tw4", name: "Sennheiser MOMENTUM True Wireless 4", brand: "Sennheiser", category: "audio",
  price_range_usd: [280, 330], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sennheiser+MOMENTUM+True+Wireless+4&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc", "music_first", "warm_signature", "auracast"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.3,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "great",
    audio_isolation: "high", audio_anc: true, audio_comfort: "ok", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const technicsEahAz100: AudioProduct = {
  id: "technics_eah_az100", name: "Technics EAH-AZ100", brand: "Technics", category: "audio",
  price_range_usd: [300, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Technics+EAH-AZ100&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc", "travel", "multipoint", "ldac", "dolby_atmos"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 12.2,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 12, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 102.2, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac", "lc3"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const technicsEAHAZ80: AudioProduct = {
  id: "technics_eah_az80", name: "Technics EAH-AZ80", brand: "Technics", category: "audio",
  price_range_usd: [200, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Technics+EAH-AZ80&tag=gearmatch-20",
  recommendation_tags: ["premium_tws", "anc_earbuds", "running", "phone_calls", "small_ear", "office", "airpods_alternative", "ldac"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.3,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const nothingEar: AudioProduct = {
  id: "nothing_ear_2024", name: "Nothing Ear", brand: "Nothing", category: "audio",
  price_range_usd: [150, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Nothing+Ear&tag=gearmatch-20",
  recommendation_tags: ["tws", "anc", "android", "ios", "transparent_design", "pinch_controls"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.5,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const nothingEarA: AudioProduct = {
  id: "nothing_ear_a", name: "Nothing Ear (a)", brand: "Nothing", category: "audio",
  price_range_usd: [99, 99], image_url: undefined, product_url: "https://www.amazon.com/s?k=Nothing+Ear+(a)&tag=gearmatch-20",
  recommendation_tags: ["budget_anc_tws", "sports", "casual_listening", "commute", "ldac", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 5.5,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const ankerSpaceA40: AudioProduct = {
  id: "anker_soundcore_space_a40", name: "Anker Soundcore Space A40", brand: "Anker", category: "audio",
  price_range_usd: [50, 80], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+Space+A40&tag=gearmatch-20",
  recommendation_tags: ["budget_anc_tws", "ldac", "multipoint", "adaptive_anc", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 8.1,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const ankerSoundcoreLiberty4Nc: AudioProduct = {
  id: "anker_soundcore_liberty_4_nc", name: "Anker Soundcore Liberty 4 NC Truly Wireless", brand: "Anker", category: "audio",
  price_range_usd: [80, 80], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+Liberty+4+NC+Truly+Wireless&tag=gearmatch-20",
  recommendation_tags: ["budget_anc_tws", "travel", "commute", "sports", "bass", "ldac", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 9,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "bassy", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "ok", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const jblVibeBuds: AudioProduct = {
  id: "jbl_vibe_buds", name: "JBL Vibe Buds", brand: "JBL", category: "audio",
  price_range_usd: [30, 50], image_url: undefined, product_url: "https://www.amazon.com/s?k=JBL+Vibe+Buds&tag=gearmatch-20",
  recommendation_tags: ["budget_tws", "bass", "workout", "android", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 8.8,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const skullcandyDime3: AudioProduct = {
  id: "skullcandy_dime_3", name: "Skullcandy Dime 3 True Wireless", brand: "Skullcandy", category: "audio",
  price_range_usd: [30, 30], image_url: undefined, product_url: "https://www.amazon.com/s?k=Skullcandy+Dime+3+True+Wireless&tag=gearmatch-20",
  recommendation_tags: ["ultra_budget", "tws", "casual", "fitness", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 8.4,
    latency_class: "high", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 8, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const skullcandyPushActive: AudioProduct = {
  id: "skullcandy_push_active", name: "Skullcandy Push Active True Wireless", brand: "Skullcandy", category: "audio",
  price_range_usd: [50, 70], image_url: undefined, product_url: "https://www.amazon.com/s?k=Skullcandy+Push+Active+True+Wireless&tag=gearmatch-20",
  recommendation_tags: ["sports", "running", "budget_tws", "water_resistant", "voice_control"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 9.5,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 18, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const jlabGoAirPop: AudioProduct = {
  id: "jlab_go_air_pop", name: "JLab Audio GO Air POP True Wireless", brand: "JLab", category: "audio",
  price_range_usd: [20, 30], image_url: undefined, product_url: "https://www.amazon.com/s?k=JLab+Audio+GO+Air+POP+True+Wireless&tag=gearmatch-20",
  recommendation_tags: ["ultra_budget", "earbuds_under_50", "wireless_earbuds_under_50", "bass", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 9.1,
    latency_class: "high", software_support: "none", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const ankerSoundcoreP25i: AudioProduct = {
  id: "anker_soundcore_p25i", name: "Anker Soundcore P25i", brand: "Anker", category: "audio",
  price_range_usd: [25, 25], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+P25i&tag=gearmatch-20",
  recommendation_tags: ["ultra_budget", "sports", "budget_listening", "casual", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 9,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "ok", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const tozoT6TrulyWireless: AudioProduct = {
  id: "tozo_t6_truly_wireless", name: "TOZO T6 Truly Wireless", brand: "TOZO", category: "audio",
  price_range_usd: [30, 30], image_url: undefined, product_url: "https://www.amazon.com/s?k=TOZO+T6+Truly+Wireless&tag=gearmatch-20",
  recommendation_tags: ["ultra_budget", "sports", "gym", "casual_listening", "ipx8", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 5.3,
    latency_class: "high", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: false, audio_comfort: "ok", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: 16, audio_sensitivity_db: 102, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const beatsPowerbeatsPro2: AudioProduct = {
  id: "beats_powerbeats_pro_2", name: "Beats Powerbeats Pro 2", brand: "Beats", category: "audio",
  price_range_usd: [200, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Beats+Powerbeats+Pro+2&tag=gearmatch-20",
  recommendation_tags: ["sports_fitness", "running", "iphone_earbuds", "beats", "anc_earbuds", "stable_fit"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.1,
    latency_class: "high", software_support: "good", eq_support: false, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 18, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const beatsFlexWireless: AudioProduct = {
  id: "beats_flex_wireless", name: "Beats Flex Wireless", brand: "Beats", category: "audio",
  price_range_usd: [50, 50], image_url: undefined, product_url: "https://www.amazon.com/s?k=Beats+Flex+Wireless&tag=gearmatch-20",
  recommendation_tags: ["budget", "neckband", "apple_ecosystem", "fitness", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 11,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 30, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const boseUltraOpenEarbuds: AudioProduct = {
  id: "bose_ultra_open_earbuds", name: "Bose Ultra Open Earbuds", brand: "Bose", category: "audio",
  price_range_usd: [250, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+Ultra+Open+Earbuds&tag=gearmatch-20",
  recommendation_tags: ["sports_fitness", "open_fit", "situational_awareness", "running", "small_ear", "bose"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 9.5,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: true, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "bright", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx_adaptive"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const ankerSoundcoreC30i: AudioProduct = {
  id: "anker_soundcore_c30i", name: "Anker Soundcore C30i", brand: "Anker", category: "audio",
  price_range_usd: [50, 50], image_url: undefined, product_url: "https://www.amazon.com/s?k=Anker+Soundcore+C30i&tag=gearmatch-20",
  recommendation_tags: ["sports", "running", "open_ear", "situational_awareness"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "budget", platform_fit: ["mobile", "pc"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 14.2,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: true, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "bright", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// IEMs - Budget Tier ($20-50)
// =============================================================================

export const moondropChu2: AudioProduct = {
  id: "moondrop_chu_2", name: "Moondrop Chu II", brand: "Moondrop", category: "audio",
  price_range_usd: [23, 23], image_url: undefined, product_url: "https://www.amazon.com/s?k=Moondrop+Chu+II&tag=gearmatch-20",
  recommendation_tags: ["budget_king", "neutral", "value_pick", "beginner_friendly"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "HiFiGo + community consensus", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "budget", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 18, audio_sensitivity_db: 119, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const salnotes7hzZero2: AudioProduct = {
  id: "7hz_zero_2", name: "7Hz x Crinacle Zero:2", brand: "7Hz", category: "audio",
  price_range_usd: [25, 25], image_url: undefined, product_url: "https://www.amazon.com/s?k=7Hz+x+Crinacle+Zero%3A2&tag=gearmatch-20",
  recommendation_tags: ["budget_king", "harman_tuned", "value_pick", "beginner_friendly"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "budget", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const kefineKlean: AudioProduct = {
  id: "kefine_klean", name: "KEFINE Klean", brand: "KEFINE", category: "audio",
  price_range_usd: [44, 49], image_url: undefined, product_url: "https://www.amazon.com/s?k=KEFINE+Klean&tag=gearmatch-20",
  recommendation_tags: ["budget", "tunable", "dlc_driver", "value_pick"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "budget", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

// =============================================================================
// IEMs - Mid Tier ($69-120)
// =============================================================================

export const arttiT10: AudioProduct = {
  id: "artti_t10", name: "ARTTI T10", brand: "ARTTI", category: "audio",
  price_range_usd: [69, 72], image_url: undefined, product_url: "https://www.amazon.com/s?k=ARTTI+T10&tag=gearmatch-20",
  recommendation_tags: ["budget_planar", "detailed", "analytical", "value_pick"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "Amazon reviews", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: undefined, audio_needs_amp: "maybe",
    audio_impedance_ohm: 16.5, audio_sensitivity_db: 96, audio_driver_type: "planar",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const simgotEw300: AudioProduct = {
  id: "simgot_ew300", name: "SIMGOT EW300", brand: "SIMGOT", category: "audio",
  price_range_usd: [80, 91], image_url: undefined, product_url: "https://www.amazon.com/s?k=SIMGOT+EW300&tag=gearmatch-20",
  recommendation_tags: ["competitive_fps", "gaming", "balanced", "tunable", "value_pick"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "Linsoul reviews", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 28, audio_sensitivity_db: 121, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const truthearHexa: AudioProduct = {
  id: "truthear_hexa", name: "TRUTHEAR HEXA", brand: "TRUTHEAR", category: "audio",
  price_range_usd: [90, 90], image_url: undefined, product_url: "https://www.amazon.com/s?k=TRUTHEAR+HEXA&tag=gearmatch-20",
  recommendation_tags: ["music_first", "neutral", "technical", "tip_rolling", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "TRUTHEAR official + community consensus", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 20.5, audio_sensitivity_db: 120, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const juzearDefiant: AudioProduct = {
  id: "juzear_defiant", name: "JUZEAR x Z Reviews Defiant", brand: "JUZEAR", category: "audio",
  price_range_usd: [90, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=JUZEAR+x+Z+Reviews+Defiant&tag=gearmatch-20",
  recommendation_tags: ["fun_tuning", "reviewer_collab", "hybrid", "all_rounder"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 109, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const letshuoerS08: AudioProduct = {
  id: "letshuoer_s08", name: "LETSHUOER S08", brand: "LETSHUOER", category: "audio",
  price_range_usd: [99, 99], image_url: undefined, product_url: "https://www.amazon.com/s?k=LETSHUOER+S08&tag=gearmatch-20",
  recommendation_tags: ["planar", "warm_bass", "value_pick"],
  data_quality: { data_confidence: "low", primary_source_type: "community_poll", source_name: "Linsoul", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "sometimes", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 26, audio_sensitivity_db: 105, audio_driver_type: "planar",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const afulExplorer: AudioProduct = {
  id: "aful_explorer", name: "AFUL Explorer", brand: "AFUL", category: "audio",
  price_range_usd: [108, 120], image_url: undefined, product_url: "https://www.amazon.com/s?k=AFUL+Explorer&tag=gearmatch-20",
  recommendation_tags: ["music_first", "warm_sound", "comfortable", "value_pick", "easy_to_drive"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "Amazon reviews", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "upper_midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 26, audio_sensitivity_db: 108, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const dunuKima2: AudioProduct = {
  id: "dunu_kima_2", name: "DUNU Kima 2", brand: "DUNU", category: "audio",
  price_range_usd: [110, 120], image_url: undefined, product_url: "https://www.amazon.com/s?k=DUNU+Kima+2&tag=gearmatch-20",
  recommendation_tags: ["single_dd", "dlc_driver", "premium_build", "modular_cable"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "upper_midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 20, audio_sensitivity_db: 108, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "great", audio_value_pick: false,
  },
};

// =============================================================================
// IEMs - Upper Mid Tier ($150-230)
// =============================================================================

export const letshuoerS12Pro: AudioProduct = {
  id: "letshuoer_s12_pro", name: "LETSHUOER S12 PRO", brand: "LETSHUOER", category: "audio",
  price_range_usd: [169, 169], image_url: undefined, product_url: "https://www.amazon.com/s?k=LETSHUOER+S12+PRO&tag=gearmatch-20",
  recommendation_tags: ["planar", "easy_to_drive", "modular_cable", "audiophile_entry"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "Linsoul + community", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 16, audio_sensitivity_db: 102, audio_driver_type: "planar",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "great", audio_value_pick: true,
  },
};

export const simgotSupermix4: AudioProduct = {
  id: "simgot_supermix_4", name: "SIMGOT SuperMix 4", brand: "SIMGOT", category: "audio",
  price_range_usd: [170, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=SIMGOT+SuperMix+4&tag=gearmatch-20",
  recommendation_tags: ["music_first", "detailed", "analytical", "wide_soundstage", "hybrid_drivers"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "Linsoul reviews", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: undefined, audio_needs_amp: "maybe",
    audio_impedance_ohm: 7.2, audio_sensitivity_db: 120, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const kiwiEarsAether: AudioProduct = {
  id: "kiwi_ears_aether", name: "Kiwi Ears Aether", brand: "Kiwi Ears", category: "audio",
  price_range_usd: [170, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=Kiwi+Ears+Aether&tag=gearmatch-20",
  recommendation_tags: ["music_first", "wide_soundstage", "planar_driver", "open_back_like", "audiophile_entry", "value_pick"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "Linsoul reviews + Head-Fi", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 14, audio_sensitivity_db: 105, audio_driver_type: "planar",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const mezeAlba: AudioProduct = {
  id: "meze_alba", name: "Meze ALBA", brand: "Meze", category: "audio",
  price_range_usd: [199, 199], image_url: undefined, product_url: "https://www.amazon.com/s?k=Meze+ALBA&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "critical_listening", "music_production", "wired_gaming", "iem"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "midrange", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm", "wired_usb_c"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: 18, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 119.4, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

export const afulPerformer7: AudioProduct = {
  id: "aful_performer_7", name: "AFUL Performer 5+2 / Performer 7", brand: "AFUL", category: "audio",
  price_range_usd: [216, 240], image_url: undefined, product_url: "https://www.amazon.com/s?k=AFUL+Performer+5%2B2+%2F+Performer+7&tag=gearmatch-20",
  recommendation_tags: ["tribrid", "technical", "wide_frequency", "audiophile"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 15, audio_sensitivity_db: 109, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const ziigaatOdyssey: AudioProduct = {
  id: "ziigaat_odyssey", name: "ZiiGaat Odyssey", brand: "ZiiGaat", category: "audio",
  price_range_usd: [229, 229], image_url: undefined, product_url: "https://www.amazon.com/s?k=ZiiGaat+Odyssey&tag=gearmatch-20",
  recommendation_tags: ["smooth", "musical", "knowles_drivers", "all_rounder", "gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "Linsoul", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "warm", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 18, audio_sensitivity_db: 104, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

// =============================================================================
// IEMs - Premium/Flagship Tier ($300-500)
// =============================================================================

export const softearsVolumeS: AudioProduct = {
  id: "softears_volume_s", name: "Softears VolumeS", brand: "Softears", category: "audio",
  price_range_usd: [319, 319], image_url: undefined, product_url: "https://www.amazon.com/s?k=Softears+VolumeS&tag=gearmatch-20",
  recommendation_tags: ["dual_tuning", "classical", "pop", "premium_build", "audiophile"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "maybe",
    audio_impedance_ohm: 9.8, audio_sensitivity_db: 124, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const moondropCrinacleDusk: AudioProduct = {
  id: "moondrop_crinacle_dusk", name: "MOONDROP x Crinacle DUSK", brand: "MOONDROP", category: "audio",
  price_range_usd: [320, 320], image_url: undefined, product_url: "https://www.amazon.com/s?k=MOONDROP+x+Crinacle+DUSK&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "critical_listening", "warm_signature", "android", "iem", "hybrid_driver"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm", "wired_usb_c"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "good", availability_class: "easy", eq_support: true,
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "inline",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 32, audio_needs_amp: "no",
    audio_impedance_ohm: 32, audio_sensitivity_db: 118.4, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const xennsMangirdTeaPro: AudioProduct = {
  id: "xenns_mangird_tea_pro", name: "XENNS Mangird Tea Pro", brand: "XENNS", category: "audio",
  price_range_usd: [359, 359], image_url: undefined, product_url: "https://www.amazon.com/s?k=XENNS+Mangird+Tea+Pro&tag=gearmatch-20",
  recommendation_tags: ["hybrid", "knowles_drivers", "bass_enhanced", "audiophile"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "Linsoul", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "sometimes", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 13, audio_sensitivity_db: 104, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const xennsMangirdTopPro: AudioProduct = {
  id: "xenns_mangird_top_pro", name: "XENNS Mangird Top Pro", brand: "XENNS", category: "audio",
  price_range_usd: [499, 499], image_url: undefined, product_url: "https://www.amazon.com/s?k=XENNS+Mangird+Top+Pro&tag=gearmatch-20",
  recommendation_tags: ["flagship", "10_driver", "knowles_sonion", "audiophile"],
  data_quality: { data_confidence: "high", primary_source_type: "community_poll", source_name: "Linsoul", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "sometimes", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: undefined, audio_needs_amp: "no",
    audio_impedance_ohm: 16, audio_sensitivity_db: 103, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const dunuDk3001bd: AudioProduct = {
  id: "dunu_dk3001bd", name: "DUNU DK3001BD", brand: "DUNU", category: "audio",
  price_range_usd: [500, 500], image_url: undefined, product_url: "https://www.amazon.com/s?k=DUNU+DK3001BD&tag=gearmatch-20",
  recommendation_tags: ["tribrid", "micro_planar", "flagship", "audiophile"],
  data_quality: { data_confidence: "medium", primary_source_type: "community_poll", source_name: "HiFiGo", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "none", availability_class: "easy", eq_support: false,
    audio_type: "iem", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: 8.1, audio_needs_amp: "no",
    audio_impedance_ohm: 26, audio_sensitivity_db: 108, audio_driver_type: "hybrid",
    audio_wireless_codec_support: undefined, audio_virtual_surround: [],
    audio_repairability: "great", audio_value_pick: false,
  },
};

// =============================================================================
// Batch 1 - Gaming Headsets (RTINGS 2026-01)
// =============================================================================

export const steelseriesArctis7PlusWireless: AudioProduct = {
  id: "steelseries_arctis_7_plus_wireless", name: "SteelSeries Arctis 7+ Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [150, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+7%2B+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "long_battery", "sonar", "chat_mix", "ski_band"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 60.7,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 358, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const razerBarracudaProWireless: AudioProduct = {
  id: "razer_barracuda_pro_wireless", name: "Razer Barracuda Pro Wireless", brand: "Razer", category: "audio",
  price_range_usd: [250, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+Barracuda+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "anc", "vendor_specific", "hybrid", "travel"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 34.4,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 340, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const logitechG735Wireless: AudioProduct = {
  id: "logitech_g735_wireless", name: "Logitech G735 Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [200, 230], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G735+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "rgb", "small_heads", "bluetooth", "blue_voice"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 28.8,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 268, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos", "vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const razerBlackSharkV2HyperSpeedWireless: AudioProduct = {
  id: "razer_blackshark_v2_hyperspeed_wireless", name: "Razer BlackShark V2 HyperSpeed Wireless", brand: "Razer", category: "audio",
  price_range_usd: [150, 180], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+BlackShark+V2+HyperSpeed+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "long_battery", "bluetooth", "vendor_specific", "lightweight"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_usb"], wireless: true, battery_life_hr: 81.25,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "bright", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 281, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const hyperxCloudFlightS: AudioProduct = {
  id: "hyperx_cloud_flight_s", name: "HyperX Cloud Flight S", brand: "HyperX", category: "audio",
  price_range_usd: [130, 160], image_url: undefined, product_url: "https://www.amazon.com/s?k=HyperX+Cloud+Flight+S&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "qi_charging", "programmable_buttons", "long_battery"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 33.3,
    latency_class: "very_low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "great", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 308, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelseriesArctis7XWireless: AudioProduct = {
  id: "steelseries_arctis_7x_wireless", name: "SteelSeries Arctis 7X Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [140, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+7X+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "xbox", "playstation", "multi_platform", "ski_band"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 23.7,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 354, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos", "vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelseriesArctisNovaElite: AudioProduct = {
  id: "steelseries_arctis_nova_elite", name: "SteelSeries Arctis Nova Elite", brand: "SteelSeries", category: "audio",
  price_range_usd: [350, 400], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+Elite&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "premium", "anc", "gamehub", "hot_swap_battery", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "flagship", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 37,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 381, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 113.7, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos", "vendor_specific"],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const steelseriesArctisProWireless: AudioProduct = {
  id: "steelseries_arctis_pro_wireless", name: "SteelSeries Arctis Pro Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [300, 350], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "premium", "dual_battery", "bluetooth", "dock"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 30.6,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 113.2, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const astroA50Gen3: AudioProduct = {
  id: "astro_a50_gen_3", name: "Astro A50 Gen 3", brand: "Astro", category: "audio",
  price_range_usd: [200, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Astro+A50+Gen+3&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "dock", "dolby_7_1", "premium_build"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 13,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// Batch 3 - Gaming Headsets (RTINGS 2026-01)
// =============================================================================

export const astroA20Wireless: AudioProduct = {
  id: "astro_a20_wireless", name: "Astro A20 Wireless", brand: "Astro", category: "audio",
  price_range_usd: [100, 120], image_url: undefined, product_url: "https://www.amazon.com/s?k=Astro+A20+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "console", "budget_gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 14,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos", "vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const steelseriesArctis9xWireless: AudioProduct = {
  id: "steelseries_arctis_9x_wireless", name: "SteelSeries Arctis 9X Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [180, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+9X+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "xbox", "bluetooth"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 28,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 372, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelseriesArctis7pWireless: AudioProduct = {
  id: "steelseries_arctis_7p_wireless", name: "SteelSeries Arctis 7P Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [140, 160], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+7P+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "playstation", "pc"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 24,
    latency_class: "very_low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 354, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const audezePenroseWireless: AudioProduct = {
  id: "audeze_penrose_wireless", name: "Audeze Penrose Wireless", brand: "Audeze", category: "audio",
  price_range_usd: [250, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Audeze+Penrose+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "planar_magnetic", "audiophile_gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 13,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 372, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "planar",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const hyperxCloudAlphaWireless: AudioProduct = {
  id: "hyperx_cloud_alpha_wireless", name: "HyperX Cloud Alpha Wireless", brand: "HyperX", category: "audio",
  price_range_usd: [170, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=HyperX+Cloud+Alpha+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "long_battery", "pc", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 346,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: 327, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const razerBlacksharkV2ProWireless2023: AudioProduct = {
  id: "razer_blackshark_v2_pro_wireless_2023", name: "Razer BlackShark V2 Pro Wireless 2023", brand: "Razer", category: "audio",
  price_range_usd: [180, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+BlackShark+V2+Pro+Wireless+2023&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "bluetooth", "pc", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 69,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 331, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const logitechG733LightspeedWireless: AudioProduct = {
  id: "logitech_g733_lightspeed_wireless", name: "Logitech G733 LIGHTSPEED Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [120, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G733+LIGHTSPEED+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "rgb", "pc", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 21,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 281, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const astroA30Wireless: AudioProduct = {
  id: "astro_a30_wireless", name: "Astro A30 Wireless", brand: "Astro", category: "audio",
  price_range_usd: [200, 230], image_url: undefined, product_url: "https://www.amazon.com/s?k=Astro+A30+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "bluetooth", "stylish", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 41,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "ok", audio_sound_signature: "v_shaped", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 345, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelseriesArctis9Wireless: AudioProduct = {
  id: "steelseries_arctis_9_wireless", name: "SteelSeries Arctis 9 Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [180, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+9+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "bluetooth", "pc", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 20,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 376, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// Batch 5 - Gaming Headsets (RTINGS 2026-01)
// =============================================================================

export const turtleBeachStealth500: AudioProduct = {
  id: "turtle_beach_stealth_500", name: "Turtle Beach Stealth 500", brand: "Turtle Beach", category: "audio",
  price_range_usd: [60, 80], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+500&tag=gearmatch-20",
  recommendation_tags: ["budget_gaming", "wireless", "long_battery", "pc_gaming", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "switch"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 37.5,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "bright", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 227, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

export const turtleBeachElite800Wireless: AudioProduct = {
  id: "turtle_beach_elite_800_wireless", name: "Turtle Beach Elite 800 Wireless", brand: "Turtle Beach", category: "audio",
  price_range_usd: [200, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Elite+800+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "anc", "playstation", "charging_dock"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 10.8,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "sometimes",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "ok", audio_weight_g: 372, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const lucidsoundLs31Wireless: AudioProduct = {
  id: "lucidsound_ls31_wireless", name: "LucidSound LS31 Wireless", brand: "LucidSound", category: "audio",
  price_range_usd: [100, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=LucidSound+LS31+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "dual_mic", "channel_mixing", "detachable_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 16.9,
    latency_class: "low", software_support: "none", eq_support: false, availability_class: "sometimes",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const hyperxCloudFlight: AudioProduct = {
  id: "hyperx_cloud_flight", name: "HyperX Cloud Flight", brand: "HyperX", category: "audio",
  price_range_usd: [100, 140], image_url: undefined, product_url: "https://www.amazon.com/s?k=HyperX+Cloud+Flight&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "long_battery", "detachable_mic", "playstation", "pc_gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 29.6,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 272, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const roccatElo71AirWireless: AudioProduct = {
  id: "roccat_elo_7_1_air_wireless", name: "ROCCAT Elo 7.1 Air Wireless", brand: "ROCCAT", category: "audio",
  price_range_usd: [80, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=ROCCAT+Elo+7.1+Air+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "rgb", "virtual_surround", "detachable_mic", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 16,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 349, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const steelseriesArctis72019Wireless: AudioProduct = {
  id: "steelseries_arctis_7_2019_wireless", name: "SteelSeries Arctis 7 2019 Edition Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [130, 160], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+7+2019+Edition+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "long_battery", "ski_band", "playstation", "pc_gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 25,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 349, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const turtleBeachStealthProWireless: AudioProduct = {
  id: "turtle_beach_stealth_pro_wireless", name: "Turtle Beach Stealth Pro Wireless", brand: "Turtle Beach", category: "audio",
  price_range_usd: [300, 350], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_gaming", "wireless", "anc", "dual_battery", "xbox", "playstation", "fps"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox", "switch"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 16.6,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "great", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 417, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos", "dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const corsairVoidProRgbWireless: AudioProduct = {
  id: "corsair_void_pro_rgb_wireless", name: "Corsair Void PRO RGB Wireless", brand: "Corsair", category: "audio",
  price_range_usd: [70, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+Void+PRO+RGB+Wireless&tag=gearmatch-20",
  recommendation_tags: ["gaming", "wireless", "rgb", "budget", "playstation", "pc_gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 12.4,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 408, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// Batch 2 - Gaming Headsets (Converted from old format)
// =============================================================================

export const steelseriesArctisNovaProWireless: AudioProduct = {
  id: "steelseries_arctis_nova_pro_wireless", name: "SteelSeries Arctis Nova Pro Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [350, 350], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_gaming", "wireless", "anc", "dual_battery", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox", "switch"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 50,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 340, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 115.1, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos", "vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const fractalScape: AudioProduct = {
  id: "fractal_scape", name: "Fractal Scape", brand: "Fractal", category: "audio",
  price_range_usd: [180, 180], image_url: undefined, product_url: "https://www.amazon.com/s?k=Fractal+Scape&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "great_mic", "scandinavian_design", "long_battery"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "switch"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_usb_c"], wireless: true, battery_life_hr: 46.1,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 340, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const logitechG933Wireless: AudioProduct = {
  id: "logitech_g933_wireless", name: "Logitech G933 Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [150, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G933+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "programmable", "rgb", "surround_sound"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 12.5,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos", "dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const logitechG930Wireless: AudioProduct = {
  id: "logitech_g930_wireless", name: "Logitech G930 Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [100, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G930+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "classic", "7_1_surround"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 10,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "sometimes",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 318, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const corsairHs70Wireless: AudioProduct = {
  id: "corsair_hs70_wireless", name: "Corsair HS70 Wireless", brand: "Corsair", category: "audio",
  price_range_usd: [100, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+HS70+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "neutral_sound", "metal_build", "value"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 15,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const plantronicsRig800lxWireless: AudioProduct = {
  id: "plantronics_rig_800lx_wireless", name: "Plantronics RIG 800LX Wireless", brand: "Plantronics", category: "audio",
  price_range_usd: [120, 120], image_url: undefined, product_url: "https://www.amazon.com/s?k=Plantronics+RIG+800LX+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "long_battery", "very_low_latency", "lightweight"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 24.7,
    latency_class: "very_low", software_support: "none", eq_support: false, availability_class: "sometimes",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 318, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const logitechG533Wireless: AudioProduct = {
  id: "logitech_g533_wireless", name: "Logitech G533 Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [100, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G533+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "dts_7_1", "retractable_mic", "long_range"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 17,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const hyperxCloudIIWireless2020: AudioProduct = {
  id: "hyperx_cloud_ii_wireless_2020", name: "HyperX Cloud II Wireless 2020", brand: "HyperX", category: "audio",
  price_range_usd: [150, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=HyperX+Cloud+II+Wireless+2020&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "great_mic", "long_battery", "comfortable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "switch"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 30.7,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 313, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const steelseriesArctis7pPlusWireless: AudioProduct = {
  id: "steelseries_arctis_7p_plus_wireless", name: "SteelSeries Arctis 7P+ Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [170, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+7P%2B+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "playstation", "long_battery", "tempest_3d"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 59.2,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 354, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// Batch 4 - Gaming Headsets (Converted from old format)
// =============================================================================

export const logitechG935Wireless: AudioProduct = {
  id: "logitech_g935_wireless", name: "Logitech G935 Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [130, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G935+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "dts_surround", "rgb"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 13,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 385, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const turtleBeachStealth600: AudioProduct = {
  id: "turtle_beach_stealth_600", name: "Turtle Beach Stealth 600", brand: "Turtle Beach", category: "audio",
  price_range_usd: [80, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+600&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "budget", "playstation", "value"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 16,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 272, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const steelseriesArctis1Wireless: AudioProduct = {
  id: "steelseries_arctis_1_wireless", name: "SteelSeries Arctis 1 Wireless", brand: "SteelSeries", category: "audio",
  price_range_usd: [80, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+1+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "budget", "multi_platform", "value"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 25,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 272, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const razerNariUltimateWireless: AudioProduct = {
  id: "razer_nari_ultimate_wireless", name: "Razer Nari Ultimate Wireless", brand: "Razer", category: "audio",
  price_range_usd: [150, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+Nari+Ultimate+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "haptic_feedback", "vendor_specific"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 5,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 408, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const razerKrakenV3ProWireless: AudioProduct = {
  id: "razer_kraken_v3_pro_wireless", name: "Razer Kraken V3 Pro Wireless", brand: "Razer", category: "audio",
  price_range_usd: [180, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+Kraken+V3+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "haptic_feedback", "vendor_specific", "long_battery"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 46,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const razerBarracudaWireless: AudioProduct = {
  id: "razer_barracuda_wireless", name: "Razer Barracuda Wireless", brand: "Razer", category: "audio",
  price_range_usd: [140, 160], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+Barracuda+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "bluetooth", "hybrid", "vendor_specific"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 46,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 299, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const corsairHs80MaxWireless: AudioProduct = {
  id: "corsair_hs80_max_wireless", name: "Corsair HS80 MAX Wireless", brand: "Corsair", category: "audio",
  price_range_usd: [150, 180], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+HS80+MAX+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "bluetooth", "long_battery", "dolby_atmos"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 61,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 363, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const logitechG535LightspeedWireless: AudioProduct = {
  id: "logitech_g535_lightspeed_wireless", name: "Logitech G535 LIGHTSPEED Wireless", brand: "Logitech", category: "audio",
  price_range_usd: [80, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Logitech+G535+LIGHTSPEED+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "budget", "lightweight", "long_battery"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 35,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 227, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const steelseriesArctisNova5: AudioProduct = {
  id: "steelseries_arctis_nova_5", name: "SteelSeries Arctis Nova 5", brand: "SteelSeries", category: "audio",
  price_range_usd: [110, 130], image_url: undefined, product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+5&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "bluetooth", "multi_platform", "great_mic", "value"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 48,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 263, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// Batch 6 - Gaming Headsets (Converted from old format)
// =============================================================================

export const razerBarracudaXWireless2021: AudioProduct = {
  id: "razer_barracuda_x_wireless_2021", name: "Razer Barracuda X Wireless 2021", brand: "Razer", category: "audio",
  price_range_usd: [100, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+Barracuda+X+Wireless+2021&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "budget", "lightweight", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 24.7,
    latency_class: "low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 268, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const turtleBeachStealth700Wireless: AudioProduct = {
  id: "turtle_beach_stealth_700_wireless", name: "Turtle Beach Stealth 700 Wireless", brand: "Turtle Beach", category: "audio",
  price_range_usd: [150, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+700+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "anc", "bluetooth", "dolby_atmos"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 10.8,
    latency_class: "medium", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: true, audio_comfort: "good", audio_weight_g: 272, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const bangOlufsenBeoplayPortal: AudioProduct = {
  id: "bang_olufsen_beoplay_portal", name: "Bang & Olufsen Beoplay Portal", brand: "Bang & Olufsen", category: "audio",
  price_range_usd: [500, 500], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bang+%26+Olufsen+Beoplay+Portal&tag=gearmatch-20",
  recommendation_tags: ["premium_gaming", "anc", "xbox_wireless", "audiophile"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "flagship", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 11.5,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 281, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const corsairHs80RgbWireless: AudioProduct = {
  id: "corsair_hs80_rgb_wireless", name: "Corsair HS80 RGB Wireless", brand: "Corsair", category: "audio",
  price_range_usd: [150, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+HS80+RGB+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "ski_band", "great_mic", "dolby_atmos"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_usb_c"], wireless: true, battery_life_hr: 13.1,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 367, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyInzoneH9Wireless: AudioProduct = {
  id: "sony_inzone_h9_wireless", name: "Sony INZONE H9 Wireless", brand: "Sony", category: "audio",
  price_range_usd: [300, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+INZONE+H9+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_gaming", "anc", "tempest_3d", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 22.4,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 327, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const turtleBeachStealth600Gen2: AudioProduct = {
  id: "turtle_beach_stealth_600_gen_2", name: "Turtle Beach Stealth 600 Gen 2", brand: "Turtle Beach", category: "audio",
  price_range_usd: [100, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+600+Gen+2&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "budget", "long_battery", "console"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "budget", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 23.7,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 290, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const astroA20Gen2Wireless: AudioProduct = {
  id: "astro_a20_gen_2_wireless", name: "Astro A20 Gen 2 Wireless", brand: "Astro", category: "audio",
  price_range_usd: [120, 120], image_url: undefined, product_url: "https://www.amazon.com/s?k=Astro+A20+Gen+2+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "console", "low_latency"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 19.7,
    latency_class: "low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "ok", audio_sound_signature: "v_shaped", audio_competitive_fps: "good", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 318, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyInzoneBuds: AudioProduct = {
  id: "sony_inzone_buds", name: "Sony INZONE Buds", brand: "Sony", category: "audio",
  price_range_usd: [200, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+INZONE+Buds&tag=gearmatch-20",
  recommendation_tags: ["gaming_earbuds", "anc", "low_latency", "playstation"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 12,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: [], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const sonyPulseElite: AudioProduct = {
  id: "sony_pulse_elite", name: "Sony PULSE Elite", brand: "Sony", category: "audio",
  price_range_usd: [150, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+PULSE+Elite&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "planar_magnetic", "tempest_3d", "playstation", "great_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 53,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 340, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "planar",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// BATCH 7 - New Audio Products from RTINGS Reviews
// =============================================================================

export const corsairHs75XbWireless: AudioProduct = {
  id: "corsair_hs75_xb_wireless", name: "Corsair HS75 XB WIRELESS", brand: "Corsair", category: "audio",
  price_range_usd: [120, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+HS75+XB+WIRELESS&tag=gearmatch-20",
  recommendation_tags: ["xbox_gaming", "wireless_gaming", "comfortable", "dolby_atmos", "good_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["xbox", "pc"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 21.6,
    latency_class: "medium", software_support: "basic", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 377, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const roccatSynProAirWireless: AudioProduct = {
  id: "roccat_syn_pro_air_wireless", name: "ROCCAT Syn Pro Air Wireless", brand: "ROCCAT", category: "audio",
  price_range_usd: [130, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=ROCCAT+Syn+Pro+Air+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "pc_gaming", "playstation_compatible", "comfortable", "rgb"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "wired_usb"], wireless: true, battery_life_hr: 24,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "v_shaped", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "great", audio_weight_g: 370, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const wyzeWirelessGamingHeadset: AudioProduct = {
  id: "wyze_wireless_gaming_headset", name: "Wyze Wireless Gaming Headset", brand: "Wyze", category: "audio",
  price_range_usd: [50, 70], image_url: undefined, product_url: "https://www.amazon.com/s?k=Wyze+Wireless+Gaming+Headset&tag=gearmatch-20",
  recommendation_tags: ["budget_friendly", "value_pick", "wireless_gaming", "bluetooth", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 32,
    latency_class: "low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 300, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const razerBlackSharkV2ProWireless2020: AudioProduct = {
  id: "razer_blackshark_v2_pro_wireless_2020", name: "Razer BlackShark V2 Pro Wireless 2020", brand: "Razer", category: "audio",
  price_range_usd: [150, 180], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+BlackShark+V2+Pro+Wireless+2020&tag=gearmatch-20",
  recommendation_tags: ["competitive_fps", "wireless_gaming", "great_mic", "comfortable", "esports"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 24,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "great", audio_weight_g: 320, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const turtleBeachStealth700Gen2Wireless: AudioProduct = {
  id: "turtle_beach_stealth_700_gen_2_wireless", name: "Turtle Beach Stealth 700 Gen 2 Wireless", brand: "Turtle Beach", category: "audio",
  price_range_usd: [130, 150], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Stealth+700+Gen+2+Wireless&tag=gearmatch-20",
  recommendation_tags: ["xbox_gaming", "wireless_gaming", "bluetooth", "multi_device", "comfortable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["xbox", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 20,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "v_shaped", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 365, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const corsairVirtuosoRgbWirelessSe: AudioProduct = {
  id: "corsair_virtuoso_rgb_wireless_se", name: "Corsair Virtuoso RGB Wireless SE", brand: "Corsair", category: "audio",
  price_range_usd: [150, 180], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+Virtuoso+RGB+Wireless+SE&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "premium_build", "great_mic", "multi_platform", "rgb"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 13.3,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 390, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const corsairVirtuosoRgbWirelessXt: AudioProduct = {
  id: "corsair_virtuoso_rgb_wireless_xt", name: "Corsair VIRTUOSO RGB Wireless XT", brand: "Corsair", category: "audio",
  price_range_usd: [230, 270], image_url: undefined, product_url: "https://www.amazon.com/s?k=Corsair+VIRTUOSO+RGB+Wireless+XT&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "bluetooth", "premium_build", "great_mic", "dolby_atmos", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 18.3,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 386, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aptx"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyInzoneH7Wireless: AudioProduct = {
  id: "sony_inzone_h7_wireless", name: "Sony INZONE H7 Wireless", brand: "Sony", category: "audio",
  price_range_usd: [180, 230], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+INZONE+H7+Wireless&tag=gearmatch-20",
  recommendation_tags: ["playstation_gaming", "wireless_gaming", "bluetooth", "long_battery", "multi_device"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 49.8,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "v_shaped", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 322, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyPulse3dWireless: AudioProduct = {
  id: "sony_pulse_3d_wireless", name: "Sony PULSE 3D Wireless", brand: "Sony", category: "audio",
  price_range_usd: [80, 100], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+PULSE+3D+Wireless&tag=gearmatch-20",
  recommendation_tags: ["playstation_gaming", "ps5", "value_pick", "wireless_gaming", "3d_audio", "lightweight"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 13.4,
    latency_class: "low", software_support: "basic", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 295, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const nobleFokusApollo: AudioProduct = {
  id: "noble_fokus_apollo", name: "Noble FoKus Apollo", brand: "Noble", category: "audio",
  price_range_usd: [399, 450], image_url: undefined, product_url: "https://www.amazon.com/s?k=Noble+FoKus+Apollo&tag=gearmatch-20",
  recommendation_tags: ["audiophile", "premium_build", "great_anc", "bluetooth", "boom_mic", "long_battery", "office"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 46.2,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 336, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 110, audio_driver_type: "hybrid",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "ldac"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseQc35IiGamingHeadset: AudioProduct = {
  id: "bose_qc35_ii_gaming_headset", name: "Bose QuietComfort 35 II Gaming Headset", brand: "Bose", category: "audio",
  price_range_usd: [200, 280], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+35+II+Gaming+Headset&tag=gearmatch-20",
  recommendation_tags: ["great_anc", "comfortable", "wired_gaming", "neutral_sound", "office", "travel"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 35.2,
    latency_class: "medium", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 249, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const xboxWirelessHeadset: AudioProduct = {
  id: "xbox_wireless_headset", name: "Xbox Wireless Headset", brand: "Xbox", category: "audio",
  price_range_usd: [90, 110], image_url: undefined, product_url: "https://www.amazon.com/s?k=Xbox+Wireless+Headset&tag=gearmatch-20",
  recommendation_tags: ["xbox_gaming", "wireless_gaming", "bluetooth", "value_pick", "good_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["xbox", "pc", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_usb_c"], wireless: true, battery_life_hr: 19.1,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 313, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["dolby_atmos", "dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const asusRogCetraTwsSpeedNova: AudioProduct = {
  id: "asus_rog_cetra_tws_speednova", name: "ASUS ROG Cetra True Wireless SpeedNova", brand: "ASUS", category: "audio",
  price_range_usd: [150, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=ASUS+ROG+Cetra+True+Wireless+SpeedNova&tag=gearmatch-20",
  recommendation_tags: ["tws_gaming", "wireless_gaming", "anc", "rgb", "long_battery", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 8,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "v_shaped", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const eposGtw270HybridTrulyWireless: AudioProduct = {
  id: "epos_gtw_270_hybrid_truly_wireless", name: "EPOS GTW 270 Hybrid Truly Wireless", brand: "EPOS", category: "audio",
  price_range_usd: [150, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=EPOS+GTW+270+Hybrid+Truly+Wireless&tag=gearmatch-20",
  recommendation_tags: ["tws_gaming", "low_latency", "aptx_ll", "portable", "sports"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 3.2,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "sometimes",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: false, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_ll"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const jblQuantum800Wireless: AudioProduct = {
  id: "jbl_quantum_800_wireless", name: "JBL Quantum 800 Wireless", brand: "JBL", category: "audio",
  price_range_usd: [150, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=JBL+Quantum+800+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "anc", "rgb", "bluetooth", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 8,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 408, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["vendor_specific", "dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const razerHammerheadProHyperspeedTws: AudioProduct = {
  id: "razer_hammerhead_pro_hyperspeed_tws", name: "Razer Hammerhead Pro HyperSpeed True Wireless", brand: "Razer", category: "audio",
  price_range_usd: [150, 180], image_url: undefined, product_url: "https://www.amazon.com/s?k=Razer+Hammerhead+Pro+HyperSpeed+True+Wireless&tag=gearmatch-20",
  recommendation_tags: ["tws_gaming", "wireless_gaming", "anc", "rgb", "balanced_sound", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "playstation", "switch", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 5.1,
    latency_class: "low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["none"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const turtleBeachEliteAtlasAeroWireless: AudioProduct = {
  id: "turtle_beach_elite_atlas_aero_wireless", name: "Turtle Beach Elite Atlas Aero Wireless", brand: "Turtle Beach", category: "audio",
  price_range_usd: [130, 170], image_url: undefined, product_url: "https://www.amazon.com/s?k=Turtle+Beach+Elite+Atlas+Aero+Wireless&tag=gearmatch-20",
  recommendation_tags: ["pc_gaming", "wireless_gaming", "long_battery", "good_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle", "wired_3_5mm"], wireless: true, battery_life_hr: 30.1,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "sometimes",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 395, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const jabraEvolve265Wireless: AudioProduct = {
  id: "jabra_evolve2_65_wireless", name: "Jabra Evolve2 65 Wireless", brand: "Jabra", category: "audio",
  price_range_usd: [200, 280], image_url: undefined, product_url: "https://www.amazon.com/s?k=Jabra+Evolve2+65+Wireless&tag=gearmatch-20",
  recommendation_tags: ["office", "business", "long_battery", "great_mic", "bluetooth", "comfortable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 60.8,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 181, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseQuietcomfort35IiWireless2018: AudioProduct = {
  id: "bose_quietcomfort_35_ii_wireless_2018", name: "Bose QuietComfort 35 II/QC35 II Wireless 2018", brand: "Bose", category: "audio",
  price_range_usd: [250, 350], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+35+II%2FQC35+II+Wireless+2018&tag=gearmatch-20",
  recommendation_tags: ["travel", "commute", "anc", "comfortable", "bluetooth", "neutral_sound"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 20,
    latency_class: "high", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 236, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseQuietcomfort45Wireless: AudioProduct = {
  id: "bose_quietcomfort_45_wireless", name: "Bose QuietComfort 45/QC45 Wireless", brand: "Bose", category: "audio",
  price_range_usd: [250, 330], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+45%2FQC45+Wireless&tag=gearmatch-20",
  recommendation_tags: ["travel", "commute", "anc", "comfortable", "long_battery", "bluetooth"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 21,
    latency_class: "high", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "v_shaped", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 236, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 114, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyPulseExploreTrulyWireless: AudioProduct = {
  id: "sony_pulse_explore_truly_wireless", name: "Sony PULSE Explore Truly Wireless", brand: "Sony", category: "audio",
  price_range_usd: [180, 220], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sony+PULSE+Explore+Truly+Wireless&tag=gearmatch-20",
  recommendation_tags: ["playstation_gaming", "ps5", "planar_magnetic", "truly_wireless", "sports"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["playstation", "pc", "mobile"],
    connection_type: ["wireless_2_4_dongle", "bluetooth"], wireless: true, battery_life_hr: 5,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "easy",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "poor", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "planar",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const jabraElite10Gen2: AudioProduct = {
  id: "jabra_elite_10_gen_2", name: "Jabra Elite 10 Gen 2", brand: "Jabra", category: "audio",
  price_range_usd: [250, 300], image_url: undefined, product_url: "https://www.amazon.com/s?k=Jabra+Elite+10+Gen+2&tag=gearmatch-20",
  recommendation_tags: ["travel", "anc", "truly_wireless", "dolby_atmos", "comfortable", "sports"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_usb_c", "wired_3_5mm"], wireless: true, battery_life_hr: 8,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const jabraElite8ActiveGen2: AudioProduct = {
  id: "jabra_elite_8_active_gen_2", name: "Jabra Elite 8 Active Gen 2", brand: "Jabra", category: "audio",
  price_range_usd: [200, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Jabra+Elite+8+Active+Gen+2&tag=gearmatch-20",
  recommendation_tags: ["sports", "fitness", "anc", "truly_wireless", "water_resistant", "travel"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "premium", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_usb_c", "wired_3_5mm"], wireless: true, battery_life_hr: 8,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 9, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const sennheiserRs165RfWireless: AudioProduct = {
  id: "sennheiser_rs_165_rf_wireless", name: "Sennheiser RS 165 RF Wireless", brand: "Sennheiser", category: "audio",
  price_range_usd: [150, 200], image_url: undefined, product_url: "https://www.amazon.com/s?k=Sennheiser+RS+165+RF+Wireless&tag=gearmatch-20",
  recommendation_tags: ["home_theater", "tv_listening", "wireless", "long_battery", "comfortable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"], wireless: true, battery_life_hr: 24,
    latency_class: "low", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: false, audio_mic_type: "none",
    audio_mic_quality: undefined, audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 295, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["none"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const astroA40TrHeadsetMixampPro2019: AudioProduct = {
  id: "astro_a40_tr_headset_mixamp_pro_2019", name: "Astro A40 TR Headset + MixAmp Pro 2019", brand: "Astro", category: "audio",
  price_range_usd: [200, 250], image_url: undefined, product_url: "https://www.amazon.com/s?k=Astro+A40+TR+Headset+%2B+MixAmp+Pro+2019&tag=gearmatch-20",
  recommendation_tags: ["pc_gaming", "xbox_gaming", "open_back", "great_mic", "esports", "mixamp"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "xbox", "playstation"],
    connection_type: ["wired_usb", "wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: true, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 372, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 110, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseQuietcomfortUltraHeadphonesWireless: AudioProduct = {
  id: "bose_quietcomfort_ultra_headphones_wireless", name: "Bose QuietComfort Ultra Headphones Wireless", brand: "Bose", category: "audio",
  price_range_usd: [350, 430], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+Ultra+Headphones+Wireless&tag=gearmatch-20",
  recommendation_tags: ["travel", "anc", "premium_build", "comfortable", "immersive_audio", "bluetooth"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 30,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 254, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx_adaptive"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const bowersWilkinsPi7TrueWireless: AudioProduct = {
  id: "bowers_wilkins_pi7_true_wireless", name: "Bowers & Wilkins Pi7 True Wireless", brand: "Bowers & Wilkins", category: "audio",
  price_range_usd: [300, 400], image_url: undefined, product_url: "https://www.amazon.com/s?k=Bowers+%26+Wilkins+Pi7+True+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_build", "anc", "truly_wireless", "audiophile", "aptx"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "iem", price_tier: "flagship", platform_fit: ["pc", "mobile"],
    connection_type: ["bluetooth", "wired_usb_c", "wired_3_5mm"], wireless: true, battery_life_hr: 2.4,
    latency_class: "low", software_support: "basic", eq_support: false, availability_class: "sometimes",
    audio_type: "iem", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "bassy", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "hybrid",
    audio_wireless_codec_support: ["sbc", "aac", "aptx"], audio_virtual_surround: ["none"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

// =============================================================================
// SONY HEADPHONES
// =============================================================================

export const sonyWH1000XM5: AudioProduct = {
  id: "sony_wh_1000xm5",
  name: "Sony WH-1000XM5 Wireless",
  brand: "Sony",
  category: "audio",
  price_range_usd: [350, 400],
  image_url: "https://i.rtings.com/assets/products/Nc33W9lA/sony-wh-1000xm5-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Sony+WH-1000XM5+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "office_work", "wireless", "long_battery"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 27,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 250, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 113, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sonyWH1000XM3: AudioProduct = {
  id: "sony_wh_1000xm3",
  name: "Sony WH-1000XM3 Wireless",
  brand: "Sony",
  category: "audio",
  price_range_usd: [200, 280],
  image_url: "https://i.rtings.com/assets/products/g5yfWfUG/sony-wh-1000xm3-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Sony+WH-1000XM3+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "office_work", "wireless", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 27,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 255, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac", "aptx"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// STEELSERIES HEADSETS
// =============================================================================

export const steelSeriesArctisNovaProWireless: AudioProduct = {
  id: "steelseries_arctis_nova_pro_wireless",
  name: "SteelSeries Arctis Nova Pro Wireless",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [300, 350],
  image_url: "https://i.rtings.com/assets/products/KDUQUrYp/steelseries-arctis-nova-pro-wireless-pc-ps-xbox/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+Pro+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless_gaming", "premium_gaming", "anc", "swappable_battery", "multi_platform"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wireless_2_4_dongle", "bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 25,
    latency_class: "low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 340, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 115.1, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: ["sonic"],
    audio_repairability: "good", audio_value_pick: false,
  },
};

export const steelSeriesArctisNovaPro: AudioProduct = {
  id: "steelseries_arctis_nova_pro_wired",
  name: "SteelSeries Arctis Nova Pro",
  brand: "SteelSeries",
  category: "audio",
  price_range_usd: [200, 250],
  image_url: "https://i.rtings.com/assets/products/iD9P4Isq/steelseries-arctis-nova-pro/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=SteelSeries+Arctis+Nova+Pro&tag=gearmatch-20",
  recommendation_tags: ["wired_gaming", "console_gaming", "game_dac", "customizable", "good_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["wired_usb", "wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "fixed_boom",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 310, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["steelseries_spatial"],
    audio_repairability: "good", audio_value_pick: false,
  },
};

// =============================================================================
// SENNHEISER HEADPHONES
// =============================================================================

export const sennheiserMomentum4Wireless: AudioProduct = {
  id: "sennheiser_momentum_4_wireless",
  name: "Sennheiser MOMENTUM 4 Wireless",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [300, 380],
  image_url: "https://i.rtings.com/assets/products/0DyKny4w/sennheiser-momentum-4-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Sennheiser+MOMENTUM+4+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "long_battery", "audiophile", "office_work"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 62.3,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 295, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 119.9, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sennheiserMomentum3Wireless: AudioProduct = {
  id: "sennheiser_momentum_3_wireless",
  name: "Sennheiser Momentum 3 Wireless",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [200, 300],
  image_url: "https://i.rtings.com/assets/products/99Eo84st/sennheiser-momentum-3-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Sennheiser+Momentum+3+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "multi_device", "audiophile", "retro_style"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 17.8,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 305, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_ll"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const sennheiserAccentumPlus: AudioProduct = {
  id: "sennheiser_accentum_plus",
  name: "Sennheiser ACCENTUM Plus",
  brand: "Sennheiser",
  category: "audio",
  price_range_usd: [180, 230],
  image_url: "https://i.rtings.com/assets/products/3ZaX4eI4/sennheiser-accentum-plus-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Sennheiser+ACCENTUM+Plus&tag=gearmatch-20",
  recommendation_tags: ["anc", "long_battery", "multi_device", "aptx_adaptive", "midrange_value"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb"], wireless: true, battery_life_hr: 56,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 227, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// JABRA HEADPHONES & EARBUDS
// =============================================================================

export const jabraElite85hWireless: AudioProduct = {
  id: "jabra_elite_85h_wireless",
  name: "Jabra Elite 85h Wireless",
  brand: "Jabra",
  category: "audio",
  price_range_usd: [200, 250],
  image_url: "https://i.rtings.com/assets/products/6bSxRpJe/jabra-elite-85h-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Jabra+Elite+85h+Wireless&tag=gearmatch-20",
  recommendation_tags: ["anc", "office_work", "travel", "long_battery", "good_mic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 34,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "great", audio_weight_g: 300, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const jabraElite7ProTrueWireless: AudioProduct = {
  id: "jabra_elite_7_pro_true_wireless",
  name: "Jabra Elite 7 Pro True Wireless",
  brand: "Jabra",
  category: "audio",
  price_range_usd: [150, 200],
  image_url: "https://i.rtings.com/assets/products/0uxtlTpz/jabra-elite-7-pro-true-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Jabra+Elite+7+Pro+True+Wireless&tag=gearmatch-20",
  recommendation_tags: ["true_wireless", "phone_calls", "commute", "sports", "anc"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "upper_midrange", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 8.4,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 11, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const jabraElite10: AudioProduct = {
  id: "jabra_elite_10",
  name: "Jabra Elite 10",
  brand: "Jabra",
  category: "audio",
  price_range_usd: [200, 250],
  image_url: "https://i.rtings.com/assets/products/81R24T2e/jabra-elite-10-true-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Jabra+Elite+10&tag=gearmatch-20",
  recommendation_tags: ["true_wireless", "premium_anc", "dolby_atmos", "multi_device", "ip57"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "premium", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.5,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "good",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 10, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const jabraElite8Active: AudioProduct = {
  id: "jabra_elite_8_active",
  name: "Jabra Elite 8 Active",
  brand: "Jabra",
  category: "audio",
  price_range_usd: [180, 230],
  image_url: "https://i.rtings.com/assets/products/habp4bbc/jabra-elite-8-active-true-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Jabra+Elite+8+Active&tag=gearmatch-20",
  recommendation_tags: ["sports", "true_wireless", "ip68", "multi_device", "shakegrip"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "upper_midrange", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 8.75,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "great", audio_weight_g: 10, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

export const jabraElite7Active: AudioProduct = {
  id: "jabra_elite_7_active",
  name: "Jabra Elite 7 Active",
  brand: "Jabra",
  category: "audio",
  price_range_usd: [130, 180],
  image_url: "https://i.rtings.com/assets/products/6RZRtNVr/jabra-elite-7-active-true-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Jabra+Elite+7+Active&tag=gearmatch-20",
  recommendation_tags: ["sports", "true_wireless", "ip57", "multi_device", "shakegrip"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "upper_midrange", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.9,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 11, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

// =============================================================================
// AUDEZE HEADPHONES
// =============================================================================

export const audezeMobius: AudioProduct = {
  id: "audeze_mobius",
  name: "Audeze Mobius",
  brand: "Audeze",
  category: "audio",
  price_range_usd: [300, 400],
  image_url: "https://i.rtings.com/assets/products/Gay7vPpl/audeze-mobius/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Audeze+Mobius&tag=gearmatch-20",
  recommendation_tags: ["audiophile_gaming", "planar_magnetic", "head_tracking", "3d_audio", "versatile"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "premium", platform_fit: ["pc", "playstation", "mobile"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 12,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "great",
    audio_isolation: "low", audio_anc: false, audio_comfort: "ok", audio_weight_g: 350, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "planar",
    audio_wireless_codec_support: ["sbc", "ldac"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// BOSE HEADPHONES
// =============================================================================

export const boseQuietComfort35: AudioProduct = {
  id: "bose_quietcomfort_35",
  name: "Bose QuietComfort 35/QC35 Wireless 2016",
  brand: "Bose",
  category: "audio",
  price_range_usd: [150, 250],
  image_url: "https://i.rtings.com/assets/products/NPHzpndA/bose-quietcomfort-35-qc35-wireless-2016/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Bose+QuietComfort+35%2FQC35+Wireless+2016&tag=gearmatch-20",
  recommendation_tags: ["anc", "travel", "comfortable", "multi_device", "classic"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 18.5,
    latency_class: "high", software_support: "good", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 234, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const bose700: AudioProduct = {
  id: "bose_700",
  name: "Bose 700 Headphones Wireless",
  brand: "Bose",
  category: "audio",
  price_range_usd: [300, 380],
  image_url: "https://i.rtings.com/assets/products/a1IJ399Y/bose-700-headphones-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Bose+700+Headphones+Wireless&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "office_work", "travel", "great_mic", "adjustable_anc"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 20.7,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "good", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 263, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: 103.4, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

export const boseSoundLink2: AudioProduct = {
  id: "bose_soundlink_2",
  name: "Bose SoundLink 2 Wireless",
  brand: "Bose",
  category: "audio",
  price_range_usd: [150, 200],
  image_url: "https://i.rtings.com/assets/products/WOqzLf2b/bose-soundlink-2-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Bose+SoundLink+2+Wireless&tag=gearmatch-20",
  recommendation_tags: ["wireless", "office_work", "multi_device", "lightweight", "comfortable"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 20.3,
    latency_class: "high", software_support: "none", eq_support: false, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 195, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// AUDIO-TECHNICA HEADPHONES
// =============================================================================

export const audioTechnicaATHM50xBT2: AudioProduct = {
  id: "audio_technica_ath_m50xbt2",
  name: "Audio-Technica ATH-M50xBT2 Wireless",
  brand: "Audio-Technica",
  category: "audio",
  price_range_usd: [180, 220],
  image_url: "https://i.rtings.com/assets/products/SI3jhZGc/audio-technica-ath-m50xbt2-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Audio-Technica+ATH-M50xBT2+Wireless&tag=gearmatch-20",
  recommendation_tags: ["studio_monitor", "neutral_sound", "long_battery", "multi_device", "audiophile"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 61.6,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "good", audio_weight_g: 307, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "ldac"], audio_virtual_surround: [],
    audio_repairability: "good", audio_value_pick: true,
  },
};

// =============================================================================
// BOWERS & WILKINS HEADPHONES
// =============================================================================

export const bowersWilkinsPx8: AudioProduct = {
  id: "bowers_wilkins_px8",
  name: "Bowers & Wilkins Px8 Wireless",
  brand: "Bowers & Wilkins",
  category: "audio",
  price_range_usd: [600, 700],
  image_url: "https://i.rtings.com/assets/products/3pwQPwqd/bowers-wilkins-px8-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Bowers+%26+Wilkins+Px8+Wireless&tag=gearmatch-20",
  recommendation_tags: ["luxury", "premium_anc", "audiophile", "nappa_leather", "multi_device"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "flagship", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_usb_c", "wired_3_5mm"], wireless: true, battery_life_hr: 38.1,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "great", audio_weight_g: 320, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// SAMSUNG EARBUDS
// =============================================================================

export const samsungGalaxyBudsPlus: AudioProduct = {
  id: "samsung_galaxy_buds_plus",
  name: "Samsung Galaxy Buds+",
  brand: "Samsung",
  category: "audio",
  price_range_usd: [80, 120],
  image_url: "https://i.rtings.com/assets/products/8Qdevw4f/samsung-galaxy-buds-plus-truly-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Samsung+Galaxy+Buds%2B&tag=gearmatch-20",
  recommendation_tags: ["true_wireless", "sports", "long_battery", "neutral_sound", "samsung_ecosystem"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "midrange", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 13.3,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 12, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: true,
  },
};

// =============================================================================
// TURTLE BEACH HEADSETS
// =============================================================================

export const turtleBeachElitePro2SuperAmp: AudioProduct = {
  id: "turtle_beach_elite_pro_2_superamp",
  name: "Turtle Beach Elite Pro 2 SuperAmp",
  brand: "Turtle Beach",
  category: "audio",
  price_range_usd: [180, 250],
  image_url: "https://i.rtings.com/assets/products/WcyRhiHV/turtle-beach-elite-pro-2-superamp/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Turtle+Beach+Elite+Pro+2+SuperAmp&tag=gearmatch-20",
  recommendation_tags: ["wired_gaming", "console_gaming", "superamp_dac", "great_mic", "premium_gaming"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "upper_midrange", platform_fit: ["pc", "playstation"],
    connection_type: ["wired_usb", "wired_3_5mm"], wireless: false, battery_life_hr: undefined,
    latency_class: "very_low", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "neutral", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 366, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: undefined, audio_virtual_surround: ["dts_headphone_x"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// CORSAIR HEADSETS
// =============================================================================

export const corsairHS70Bluetooth: AudioProduct = {
  id: "corsair_hs70_bluetooth",
  name: "Corsair HS70 Bluetooth",
  brand: "Corsair",
  category: "audio",
  price_range_usd: [80, 110],
  image_url: "https://i.rtings.com/assets/products/dFozQZhZ/corsair-hs70-bluetooth/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Corsair+HS70+Bluetooth&tag=gearmatch-20",
  recommendation_tags: ["wired_gaming", "bluetooth_hybrid", "long_battery", "icue_software", "console_compatible"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headset", price_tier: "midrange", platform_fit: ["pc", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_usb", "wired_3_5mm"], wireless: true, battery_life_hr: 24,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headset", audio_open_back: false, audio_has_mic: true, audio_mic_type: "detachable_boom",
    audio_mic_quality: "great", audio_sound_signature: "warm", audio_competitive_fps: "good", audio_immersion: "good",
    audio_isolation: "low", audio_anc: false, audio_comfort: "great", audio_weight_g: 290, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// SONOS HEADPHONES
// =============================================================================

export const sonosAce: AudioProduct = {
  id: "sonos_ace",
  name: "Sonos Ace",
  brand: "Sonos",
  category: "audio",
  price_range_usd: [400, 450],
  image_url: "https://i.rtings.com/assets/products/yiK0lqbe/sonos-ace-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Sonos+Ace&tag=gearmatch-20",
  recommendation_tags: ["premium_anc", "travel", "office_work", "tv_audio_swap", "sonos_ecosystem"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "premium", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm", "wired_usb_c"], wireless: true, battery_life_hr: 35.6,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 317, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac", "aptx", "aptx_adaptive"], audio_virtual_surround: ["dolby_atmos"],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// JBL HEADPHONES & EARBUDS
// =============================================================================

export const jblTune770NC: AudioProduct = {
  id: "jbl_tune_770nc",
  name: "JBL Tune 770NC",
  brand: "JBL",
  category: "audio",
  price_range_usd: [80, 130],
  image_url: "https://i.rtings.com/assets/products/1JJFqGOA/jbl-tune-770nc-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=JBL+Tune+770NC&tag=gearmatch-20",
  recommendation_tags: ["budget_anc", "long_battery", "foldable", "multi_device", "value_pick"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "midrange", platform_fit: ["pc", "mobile", "mac"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 47.5,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "ok", audio_weight_g: 252, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

export const jblClubProPlusTWS: AudioProduct = {
  id: "jbl_club_pro_plus_tws",
  name: "JBL CLUB PRO+ TWS",
  brand: "JBL",
  category: "audio",
  price_range_usd: [150, 200],
  image_url: "https://i.rtings.com/assets/products/Ya9ptWGE/jbl-club-pro-plus-tws-true-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=JBL+CLUB+PRO%2B+TWS&tag=gearmatch-20",
  recommendation_tags: ["true_wireless", "anc", "sports", "parametric_eq", "neutral_sound"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "earbud", price_tier: "upper_midrange", platform_fit: ["mobile"],
    connection_type: ["bluetooth"], wireless: true, battery_life_hr: 7.4,
    latency_class: "high", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "earbud", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "poor", audio_immersion: "ok",
    audio_isolation: "medium", audio_anc: true, audio_comfort: "good", audio_weight_g: 14, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc"], audio_virtual_surround: [],
    audio_repairability: "poor", audio_value_pick: false,
  },
};

// =============================================================================
// RAZER HEADPHONES
// =============================================================================

export const razerOpus2020: AudioProduct = {
  id: "razer_opus_2020",
  name: "Razer Opus Wireless 2020",
  brand: "Razer",
  category: "audio",
  price_range_usd: [150, 200],
  image_url: "https://i.rtings.com/assets/products/qVOIQOsV/razer-opus-wireless-2020/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=Razer+Opus+Wireless+2020&tag=gearmatch-20",
  recommendation_tags: ["anc", "travel", "office_work", "thx_certified", "neutral_sound"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 32.6,
    latency_class: "medium", software_support: "good", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "neutral", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "great", audio_weight_g: 270, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aptx"], audio_virtual_surround: ["vendor_specific"],
    audio_repairability: "ok", audio_value_pick: true,
  },
};

// =============================================================================
// AKG HEADPHONES
// =============================================================================

export const akgN700NCM2: AudioProduct = {
  id: "akg_n700nc_m2",
  name: "AKG N700NC M2",
  brand: "AKG",
  category: "audio",
  price_range_usd: [180, 250],
  image_url: "https://i.rtings.com/assets/products/zRugl9Ca/akg-n700nc-m2-wireless/design-medium.jpg?format=auto",
  product_url: "https://www.amazon.com/s?k=AKG+N700NC+M2&tag=gearmatch-20",
  recommendation_tags: ["anc", "travel", "office_work", "parametric_eq", "multi_device"],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test", source_name: "RTINGS", last_verified: "2026-01" },
  core_attributes: {
    category_subtype: "headphone", price_tier: "upper_midrange", platform_fit: ["pc", "mobile", "mac", "playstation", "xbox"],
    connection_type: ["bluetooth", "wired_3_5mm"], wireless: true, battery_life_hr: 20.7,
    latency_class: "medium", software_support: "great", eq_support: true, availability_class: "easy",
    audio_type: "headphone", audio_open_back: false, audio_has_mic: true, audio_mic_type: "integrated",
    audio_mic_quality: "ok", audio_sound_signature: "warm", audio_competitive_fps: "ok", audio_immersion: "ok",
    audio_isolation: "high", audio_anc: true, audio_comfort: "good", audio_weight_g: 280, audio_needs_amp: "no",
    audio_impedance_ohm: undefined, audio_sensitivity_db: undefined, audio_driver_type: "dynamic",
    audio_wireless_codec_support: ["sbc", "aac"], audio_virtual_surround: [],
    audio_repairability: "ok", audio_value_pick: false,
  },
};

// =============================================================================
// Export Array - All Audio Products
// =============================================================================

export const allAudioProducts: AudioProduct[] = [
  // Gaming Headsets
  steelseriesArctisNova7, hyperxCloudIIIWireless, razerBlackSharkV3Pro, audezeMaxwell,
  steelseriesArctis7Wireless2017, razerKairaProWireless, steelseriesArctisNova3,
  astroA50Gen4, astroA50X, turtleBeachStealth600Gen3, logitechG435Lightspeed,
  logitechG432, hyperxCloudIII, astroA10, turtleBeachRecon50, jabraEvolve285Wireless,
  dropSennheiserPC38X, steelSeriesTusq, steelSeriesArctisGameBuds,
  // Batch 1 - Gaming Headsets
  steelseriesArctis7PlusWireless, razerBarracudaProWireless, logitechG735Wireless,
  razerBlackSharkV2HyperSpeedWireless, hyperxCloudFlightS, steelseriesArctis7XWireless,
  steelseriesArctisNovaElite, steelseriesArctisProWireless, astroA50Gen3,
  // Batch 2 - Gaming Headsets
  steelseriesArctisNovaProWireless, fractalScape, logitechG933Wireless, logitechG930Wireless,
  corsairHs70Wireless, plantronicsRig800lxWireless, logitechG533Wireless,
  hyperxCloudIIWireless2020, steelseriesArctis7pPlusWireless,
  // Batch 3 - Gaming Headsets
  astroA20Wireless, steelseriesArctis9xWireless, steelseriesArctis7pWireless,
  audezePenroseWireless, hyperxCloudAlphaWireless, razerBlacksharkV2ProWireless2023,
  logitechG733LightspeedWireless, astroA30Wireless, steelseriesArctis9Wireless,
  // Batch 4 - Gaming Headsets
  logitechG935Wireless, turtleBeachStealth600, steelseriesArctis1Wireless,
  razerNariUltimateWireless, razerKrakenV3ProWireless, razerBarracudaWireless,
  corsairHs80MaxWireless, logitechG535LightspeedWireless, steelseriesArctisNova5,
  // Batch 5 - Gaming Headsets
  turtleBeachStealth500, turtleBeachElite800Wireless, lucidsoundLs31Wireless,
  hyperxCloudFlight, roccatElo71AirWireless, steelseriesArctis72019Wireless,
  turtleBeachStealthProWireless, corsairVoidProRgbWireless,
  // Batch 6 - Gaming Headsets
  razerBarracudaXWireless2021, turtleBeachStealth700Wireless, bangOlufsenBeoplayPortal,
  corsairHs80RgbWireless, sonyInzoneH9Wireless, turtleBeachStealth600Gen2,
  astroA20Gen2Wireless, sonyInzoneBuds, sonyPulseElite,
  // Audiophile Headphones
  sennheiserHD560S, sennheiserHd800s, sennheiserHD490PRO, philipsShp9500,
  focalStellia, audezeLcdX, hifimanAryaStealthMagnet, audioTechnicaAthM20x,
  sonyMdr7506, beyerdynamicDt770Pro250, beyerdynamicDt1770Pro, focalBathysWireless,
  // Wireless ANC Headphones
  sonyWh1000xm6, sonyWH1000XM4, boseQcUltra2ndGen, boseQcHeadphonesWireless,
  bowersWilkinsPx7S2Wireless, ankerSoundcoreLifeQ30, ankerSpaceQ45, ankerLifeQ20_2024,
  sennheiserHDB630, sonyUltWear, treblabZ7ProWireless, beatsStudioProWireless,
  beatsSolo4, jblTune520bt, jblTune760NC, sonyWHCH520,
  // TWS Earbuds
  appleAirpodsPro3, appleAirpods4Anc, sonyWf1000xm5, samsungGalaxyBuds3Pro,
  boseQcUltraEarbuds2ndGen, boseQcUltraEarbuds1stGen, sennheiserMomentumTW4,
  technicsEahAz100, technicsEAHAZ80, nothingEar, nothingEarA, ankerSpaceA40,
  ankerSoundcoreLiberty4Nc, jblVibeBuds, skullcandyDime3, skullcandyPushActive,
  jlabGoAirPop, ankerSoundcoreP25i, tozoT6TrulyWireless, beatsPowerbeatsPro2,
  beatsFlexWireless, boseUltraOpenEarbuds, ankerSoundcoreC30i,
  // IEMs
  moondropChu2, salnotes7hzZero2, kefineKlean, arttiT10, simgotEw300, truthearHexa,
  juzearDefiant, letshuoerS08, afulExplorer, dunuKima2, letshuoerS12Pro, simgotSupermix4,
  kiwiEarsAether, mezeAlba, afulPerformer7, ziigaatOdyssey, softearsVolumeS,
  moondropCrinacleDusk, xennsMangirdTeaPro, xennsMangirdTopPro, dunuDk3001bd,
  // Batch 7 - New Audio Products
  corsairHs75XbWireless, roccatSynProAirWireless, wyzeWirelessGamingHeadset,
  razerBlackSharkV2ProWireless2020, turtleBeachStealth700Gen2Wireless,
  corsairVirtuosoRgbWirelessSe, corsairVirtuosoRgbWirelessXt, sonyInzoneH7Wireless,
  sonyPulse3dWireless, nobleFokusApollo, boseQc35IiGamingHeadset, xboxWirelessHeadset,
  asusRogCetraTwsSpeedNova, eposGtw270HybridTrulyWireless, jblQuantum800Wireless,
  razerHammerheadProHyperspeedTws, turtleBeachEliteAtlasAeroWireless, jabraEvolve265Wireless,
  boseQuietcomfort35IiWireless2018, boseQuietcomfort45Wireless, sonyPulseExploreTrulyWireless,
  jabraElite10Gen2, jabraElite8ActiveGen2, sennheiserRs165RfWireless, astroA40TrHeadsetMixampPro2019,
  boseQuietcomfortUltraHeadphonesWireless, bowersWilkinsPi7TrueWireless,

    // Sony
  sonyWH1000XM5,
  sonyWH1000XM3,
  // SteelSeries
  steelSeriesArctisNovaProWireless,
  steelSeriesArctisNovaPro,
  // Sennheiser
  sennheiserMomentum4Wireless,
  sennheiserMomentum3Wireless,
  sennheiserAccentumPlus,
  // Jabra
  jabraElite85hWireless,
  jabraElite7ProTrueWireless,
  jabraElite10,
  jabraElite8Active,
  jabraElite7Active,
  // Audeze
  audezeMobius,
  // Bose
  boseQuietComfort35,
  bose700,
  boseSoundLink2,
  // Audio-Technica
  audioTechnicaATHM50xBT2,
  // Bowers & Wilkins
  bowersWilkinsPx8,
  // Samsung
  samsungGalaxyBudsPlus,
  // Turtle Beach
  turtleBeachElitePro2SuperAmp,
  // Corsair
  corsairHS70Bluetooth,
  // Sonos
  sonosAce,
  // JBL
  jblTune770NC,
  jblClubProPlusTWS,
  // AKG
  akgN700NCM2,
  // Razer
  razerOpus2020,

];
