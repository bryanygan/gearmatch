import type { AudioProduct } from "@/types/products";

// =============================================================================
// SIMGOT SuperMix 4 - $170 Hybrid (1DD+1BA+1Planar+1PZT)
// =============================================================================

export const simgotSupermix4: AudioProduct = {
  id: "simgot_supermix_4",
  name: "SIMGOT SuperMix 4",
  brand: "SIMGOT",
  category: "audio",
  price_range_usd: [170, 170],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "music_first",
    "detailed",
    "analytical",
    "wide_soundstage",
    "hybrid_drivers",
  ],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "Linsoul reviews",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "premium", // $170
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "easy",
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // Reviews: "analytical", "balanced", "detailed"
    audio_competitive_fps: "good", // Wide soundstage, good imaging per reviews
    audio_immersion: "great", // "Hyperdefined bass", engaging presentation
    audio_comfort: "good", // Some report fatigue at high volume, otherwise comfortable

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "maybe", // Reviews say needs DAC to shine, low impedance but benefits from power
    audio_impedance_ohm: 7.2,
    audio_sensitivity_db: 120,
    audio_driver_type: "hybrid", // 1DD + 1BA + 1Planar + 1PZT
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin cable
    audio_value_pick: false, // Good but not exceptional value at $170
  },
};

// =============================================================================
// Kiwi Ears Aether - $170 Single Planar (15.3mm)
// =============================================================================

export const kiwiEarsAether: AudioProduct = {
  id: "kiwi_ears_aether",
  name: "Kiwi Ears Aether",
  brand: "Kiwi Ears",
  category: "audio",
  price_range_usd: [170, 170],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "music_first",
    "wide_soundstage",
    "planar_driver",
    "open_back_like",
    "audiophile_entry",
    "value_pick",
  ],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "Linsoul reviews + Head-Fi",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "premium",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "easy",
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false, // Vented but still IEM
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "v_shaped", // Reviews: "V-shape", bass punch + sparkly treble
    audio_competitive_fps: "good", // "Brutal soundstage", good imaging, planar speed
    audio_immersion: "great", // "Subwoofer-like bass", wide soundstage, speaker-like
    audio_comfort: "great", // "Fits comfortably in small-to-average ears"

    audio_isolation: "low", // Enhanced ventilation = open-back-like = less isolation
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 14Ω, 105dB - easy to drive
    audio_impedance_ohm: 14,
    audio_sensitivity_db: 105,
    audio_driver_type: "planar", // 15.3mm planar
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin
    audio_value_pick: true, // 100% positive reviews, "benchmark for planar IEMs"
  },
};

// =============================================================================
// SIMGOT EW300 - $80 Tribrid (1DD+1Planar+1PZT)
// =============================================================================

export const simgotEw300: AudioProduct = {
  id: "simgot_ew300",
  name: "SIMGOT EW300",
  brand: "SIMGOT",
  category: "audio",
  price_range_usd: [80, 91], // Standard $80, HBB/DSP editions ~$91
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "competitive_fps",
    "gaming",
    "balanced",
    "tunable",
    "value_pick",
  ],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "Linsoul reviews",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "midrange", // $80
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "easy",
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false, // Standard edition; DSP edition has mic
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // Balanced, tunable with nozzle swaps
    audio_competitive_fps: "great", // Gaming nozzle specifically tuned for footsteps/gunfire
    audio_immersion: "good", // Good bass with music nozzle
    audio_comfort: "great", // Metal CNC body, ergonomic design, over-ear

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 28Ω, 119-121dB sensitivity
    audio_impedance_ohm: 28,
    audio_sensitivity_db: 121,
    audio_driver_type: "hybrid", // 1DD + 1Planar + 1PZT
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin + swappable nozzles
    audio_value_pick: true, // Great price for tribrid with gaming tuning
  },
};

// =============================================================================
// TRUTHEAR HEXA - $90 Hybrid (1DD+3BA)
// =============================================================================

export const truthearHexa: AudioProduct = {
  id: "truthear_hexa",
  name: "TRUTHEAR HEXA",
  brand: "TRUTHEAR",
  category: "audio",
  price_range_usd: [90, 90],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "music_first",
    "neutral",
    "technical",
    "tip_rolling",
    "value_pick",
  ],
  data_quality: {
    data_confidence: "high", // Well-measured, popular reference
    primary_source_type: "community_poll",
    source_name: "TRUTHEAR official + community consensus",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "midrange",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "easy",
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // Harman-ish target, tip-dependent highs
    audio_competitive_fps: "good", // Good imaging, phase-coherent
    audio_immersion: "good", // Less bass than ZERO, but deeper extension

    audio_comfort: "great", // "Lightweight", "releases pain from long-term wearing"

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 20.5Ω, 120dB sensitivity
    audio_impedance_ohm: 20.5,
    audio_sensitivity_db: 120,
    audio_driver_type: "hybrid", // 1DD + 3BA
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin
    audio_value_pick: true, // Very popular "mature hybrid at acceptable price"
  },
};

// =============================================================================
// ARTTI T10 - $69 Single Planar (14.2mm)
// =============================================================================

export const arttiT10: AudioProduct = {
  id: "artti_t10",
  name: "ARTTI T10",
  brand: "ARTTI",
  category: "audio",
  price_range_usd: [69, 72],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "budget_planar",
    "detailed",
    "analytical",
    "value_pick",
  ],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "Amazon reviews",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "midrange", // $69
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "easy",
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // "Laid back", "not bright like other planars"
    audio_competitive_fps: "good", // "Sound separation is awesome and spacious"
    audio_immersion: "ok", // Bass is "tight and controlled" but not emphasized

    audio_comfort: "good", // Mixed - some love it, some find fit tricky

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "maybe", // 16.5Ω but 96dB sensitivity - benefits from amp
    audio_impedance_ohm: 16.5,
    audio_sensitivity_db: 96,
    audio_driver_type: "planar", // 14.2mm planar
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin
    audio_value_pick: true, // Planar at $69 is exceptional value
  },
};

export const afulExplorer: AudioProduct = {
  id: "aful_explorer",
  name: "AFUL Explorer",
  brand: "AFUL",
  category: "audio",
  price_range_usd: [108, 120], // Prime price ~$108, regular ~$120
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: [
    "music_first",
    "warm_sound",
    "comfortable",
    "value_pick",
    "easy_to_drive",
  ],
  data_quality: {
    data_confidence: "medium", // Amazon + community reviews, no RTINGS lab test
    primary_source_type: "community_poll",
    source_name: "Amazon reviews",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "upper_midrange", // $108-120
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // 3.5mm option (also has 4.4mm balanced variant)
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low", // Wired IEM
    software_support: "none",
    availability_class: "easy",

    // === CRITICAL FOR SCORING ===
    audio_type: "iem",
    audio_open_back: false, // IEMs are closed/sealed
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "warm", // Reviews: "warm", "bassy", "relaxed", "laid-back"
    audio_competitive_fps: "ok", // Intimate soundstage per reviews; bass may mask footsteps
    audio_immersion: "great", // Strong bass, warm mids - great for music/single-player
    audio_comfort: "great", // Small shell, vented, "great for small ears", "all-day listening"

    // === SECONDARY ===
    audio_isolation: "medium", // Vented design reduces isolation vs sealed IEMs
    audio_anc: false,
    audio_weight_g: undefined, // Not specified
    audio_needs_amp: "no", // 26Ω, 108dB - "easy to drive" from phones
    audio_impedance_ohm: 26,
    audio_sensitivity_db: 108,
    audio_driver_type: "hybrid", // 1DD + 2BA
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin cable
    audio_value_pick: true, // Strong community consensus on value
  },
};

// =============================================================================
// Export array
// =============================================================================

export const newAudioProducts: AudioProduct[] = [
  simgotSupermix4,
  kiwiEarsAether,
  simgotEw300,
  truthearHexa,
  arttiT10,
  afulExplorer,
];