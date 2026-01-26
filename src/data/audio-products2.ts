import type { AudioProduct } from "@/types/products";

// =============================================================================
// Budget Tier ($20-50)
// =============================================================================

export const moondropChu2: AudioProduct = {
  id: "moondrop_chu_2",
  name: "Moondrop Chu II",
  brand: "Moondrop",
  category: "audio",
  price_range_usd: [23, 23],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["budget_king", "neutral", "value_pick", "beginner_friendly"],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "community_poll",
    source_name: "HiFiGo + community consensus",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "budget",
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
    audio_sound_signature: "neutral", // VDSF target tuning
    audio_competitive_fps: "good", // Good imaging, low distortion
    audio_immersion: "good", // Punchier bass than OG Chu
    audio_comfort: "great", // Lightweight, ergonomic

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 18Ω, 119dB
    audio_impedance_ohm: 18,
    audio_sensitivity_db: 119,
    audio_driver_type: "dynamic", // Al-Mg composite diaphragm
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin, replaceable nozzle
    audio_value_pick: true,
  },
};

export const salnotes7hzZero2: AudioProduct = {
  id: "7hz_zero_2",
  name: "7Hz x Crinacle Zero:2",
  brand: "7Hz",
  category: "audio",
  price_range_usd: [25, 25],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["budget_king", "harman_tuned", "value_pick", "beginner_friendly"],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "budget",
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
    audio_has_mic: false, // No mic version
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // Crinacle collaboration, Harman-ish
    audio_competitive_fps: "good",
    audio_immersion: "good",
    audio_comfort: "good",

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no",
    audio_impedance_ohm: undefined,
    audio_sensitivity_db: undefined,
    audio_driver_type: "dynamic", // 10mm DD
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "ok", // OFC cable included
    audio_value_pick: true,
  },
};

export const kefineKlean: AudioProduct = {
  id: "kefine_klean",
  name: "KEFINE Klean",
  brand: "KEFINE",
  category: "audio",
  price_range_usd: [44, 49],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["budget", "tunable", "dlc_driver", "value_pick"],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "budget",
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
    audio_sound_signature: "neutral", // Two nozzles: silver (brighter) / black (warmer)
    audio_competitive_fps: "good", // DLC driver = fast transients
    audio_immersion: "good",
    audio_comfort: "great", // Injection molded, ergonomic

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no",
    audio_impedance_ohm: undefined,
    audio_sensitivity_db: undefined,
    audio_driver_type: "dynamic", // 10mm DLC diaphragm
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // Detachable 0.78mm 2-pin
    audio_value_pick: true,
  },
};

// =============================================================================
// Mid Tier ($69-120)
// =============================================================================

export const juzearDefiant: AudioProduct = {
  id: "juzear_defiant",
  name: "JUZEAR x Z Reviews Defiant",
  brand: "JUZEAR",
  category: "audio",
  price_range_usd: [90, 100],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["fun_tuning", "reviewer_collab", "hybrid", "all_rounder"],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "midrange",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // Includes 3.5mm + 4.4mm plugs
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
    audio_sound_signature: "warm", // "Impactful bass", "immersive mids", "smooth treble"
    audio_competitive_fps: "good", // Good imaging from 3-way crossover
    audio_immersion: "great", // Bass-focused, engaging
    audio_comfort: "great", // DLP 3D printed shells, pressure relief vents

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 32Ω, 109dB
    audio_impedance_ohm: 32,
    audio_sensitivity_db: 109,
    audio_driver_type: "hybrid", // 1DD + 3BA
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin, premium FLARE cable
    audio_value_pick: true,
  },
};

export const letshuoerS08: AudioProduct = {
  id: "letshuoer_s08",
  name: "LETSHUOER S08",
  brand: "LETSHUOER",
  category: "audio",
  price_range_usd: [99, 99],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["planar", "warm_bass", "value_pick"],
  data_quality: {
    data_confidence: "low", // Only 3 reviews
    primary_source_type: "community_poll",
    source_name: "Linsoul",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "midrange",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // Includes 3.5mm + 4.4mm plugs
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "sometimes", // Pre-order
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "warm", // "More mid-bass than most planars", "dark tuning"
    audio_competitive_fps: "good", // Planar speed, good imaging
    audio_immersion: "great", // Enhanced bass for a planar
    audio_comfort: "good", // CNC aluminum shell

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 26Ω, 105dB
    audio_impedance_ohm: 26,
    audio_sensitivity_db: 105,
    audio_driver_type: "planar", // 13mm planar, dual voice coil
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin
    audio_value_pick: true, // "Best price-to-performance planar"
  },
};

export const dunuKima2: AudioProduct = {
  id: "dunu_kima_2",
  name: "DUNU Kima 2",
  brand: "DUNU",
  category: "audio",
  price_range_usd: [110, 120],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["single_dd", "dlc_driver", "premium_build", "modular_cable"],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "upper_midrange",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // Q-Lock Mini: 3.5mm + 4.4mm included
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
    audio_sound_signature: "neutral", // "Clean", "musical", evolved from VERNUS
    audio_competitive_fps: "good", // DLC = fast, good imaging
    audio_immersion: "good", // Clean, refined presentation
    audio_comfort: "great", // Stainless steel, ergonomic

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 20Ω, 108dB/mW
    audio_impedance_ohm: 20,
    audio_sensitivity_db: 108,
    audio_driver_type: "dynamic", // DLC composite dome DD
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "great", // 0.78mm 2-pin + Q-Lock Mini modular plugs
    audio_value_pick: false,
  },
};

// =============================================================================
// Upper Mid Tier ($150-230)
// =============================================================================

export const letshuoerS12Pro: AudioProduct = {
  id: "letshuoer_s12_pro",
  name: "LETSHUOER S12 PRO",
  brand: "LETSHUOER",
  category: "audio",
  price_range_usd: [169, 169],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["planar", "easy_to_drive", "modular_cable", "audiophile_entry"],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "community_poll",
    source_name: "Linsoul + community",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "premium",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // 2.5/3.5/4.4mm swappable
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
    audio_sound_signature: "neutral", // "Great details", "punchy bass", "clear treble"
    audio_competitive_fps: "great", // Planar speed + imaging
    audio_immersion: "great", // "Fantastic soundstage"
    audio_comfort: "great", // Aluminum, ergonomic, vented

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 16Ω, 102dB - easy to drive
    audio_impedance_ohm: 16,
    audio_sensitivity_db: 102,
    audio_driver_type: "planar", // 14.8mm planar
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "great", // 0.78mm 2-pin + swappable jacks
    audio_value_pick: true, // 100% positive reviews
  },
};

export const afulPerformer7: AudioProduct = {
  id: "aful_performer_7",
  name: "AFUL Performer 5+2 / Performer 7",
  brand: "AFUL",
  category: "audio",
  price_range_usd: [216, 240],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["tribrid", "technical", "wide_frequency", "audiophile"],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
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
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // Balanced, technical
    audio_competitive_fps: "great", // Wide frequency, excellent separation
    audio_immersion: "great", // Enhanced bass + treble from tribrid config
    audio_comfort: "good",

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 15Ω, 109dB - easy to drive
    audio_impedance_ohm: 15,
    audio_sensitivity_db: 109,
    audio_driver_type: "hybrid", // 2DD + 4BA + 1 Micro Planar
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin
    audio_value_pick: false,
  },
};

export const ziigaatOdyssey: AudioProduct = {
  id: "ziigaat_odyssey",
  name: "ZiiGaat Odyssey",
  brand: "ZiiGaat",
  category: "audio",
  price_range_usd: [229, 229],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["smooth", "musical", "knowles_drivers", "all_rounder", "gaming"],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "community_poll",
    source_name: "Linsoul",
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
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "warm", // "Smooth", "non-fatiguing", bass-focused
    audio_competitive_fps: "great", // "Great for comp gaming", excellent imaging
    audio_immersion: "great", // "Subwoofer-like bass", "immersive"
    audio_comfort: "good", // Some find tips uncomfortable, shells are good

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 18Ω, 104dB
    audio_impedance_ohm: 18,
    audio_sensitivity_db: 104,
    audio_driver_type: "hybrid", // 1DD (Topology) + 3BA (Knowles)
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin
    audio_value_pick: true, // "All-time favourite", "lifetime companion"
  },
};

// =============================================================================
// Premium Tier ($300-500)
// =============================================================================

export const softearsVolumeS: AudioProduct = {
  id: "softears_volume_s",
  name: "Softears VolumeS",
  brand: "Softears",
  category: "audio",
  price_range_usd: [319, 319],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["dual_tuning", "classical", "pop", "premium_build", "audiophile"],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "premium",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // 3.5mm + 4.4mm included
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
    audio_sound_signature: "neutral", // Two modes: Classical (natural) / POP (HRTF)
    audio_competitive_fps: "good",
    audio_immersion: "great", // Passive DD adds bass richness
    audio_comfort: "great", // 3D printed shells, pressure relief

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "maybe", // 9.8Ω/31.2Ω depending on mode
    audio_impedance_ohm: 9.8, // Low impedance mode
    audio_sensitivity_db: 124,
    audio_driver_type: "hybrid", // 1DD + 1 Passive DD + 2BA
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin
    audio_value_pick: false,
  },
};

export const xennsMangirdTeaPro: AudioProduct = {
  id: "xenns_mangird_tea_pro",
  name: "XENNS Mangird Tea Pro",
  brand: "XENNS",
  category: "audio",
  price_range_usd: [359, 359],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["hybrid", "knowles_drivers", "bass_enhanced", "audiophile"],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "community_poll",
    source_name: "Linsoul",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "flagship",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // 3.5mm + 4.4mm dual-purpose cable
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "sometimes", // Pre-order
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "warm", // Enhanced sub-bass (+3dB at 20Hz), fuller mids
    audio_competitive_fps: "good",
    audio_immersion: "great", // "Stronger bass response", "hear all of the bassline"
    audio_comfort: "great", // Medical-grade UV resin, handcrafted

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 13Ω, 104dB
    audio_impedance_ohm: 13,
    audio_sensitivity_db: 104,
    audio_driver_type: "hybrid", // 2DD + 6BA (Knowles)
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin
    audio_value_pick: false,
  },
};

export const xennsMangirdTopPro: AudioProduct = {
  id: "xenns_mangird_top_pro",
  name: "XENNS Mangird Top Pro",
  brand: "XENNS",
  category: "audio",
  price_range_usd: [499, 499],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["flagship", "10_driver", "knowles_sonion", "audiophile"],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "community_poll",
    source_name: "Linsoul",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "flagship",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // 3.5mm + 4.4mm modular
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "very_low",
    software_support: "none",
    availability_class: "sometimes", // Pre-order
    eq_support: false,

    audio_type: "iem",
    audio_open_back: false,
    audio_has_mic: false,
    audio_mic_type: "none",
    audio_mic_quality: undefined,
    audio_sound_signature: "neutral", // "Balanced", premium Knowles + Sonion drivers
    audio_competitive_fps: "great", // Excellent imaging, wide soundstage
    audio_immersion: "great", // "Never heard anything like it"
    audio_comfort: "great",

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: undefined,
    audio_needs_amp: "no", // 16Ω, 103dB
    audio_impedance_ohm: 16,
    audio_sensitivity_db: 103,
    audio_driver_type: "hybrid", // 2DD + 8BA (Knowles + Sonion)
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "good", // 0.78mm 2-pin
    audio_value_pick: false, // Premium price
  },
};

export const dunuDk3001bd: AudioProduct = {
  id: "dunu_dk3001bd",
  name: "DUNU DK3001BD",
  brand: "DUNU",
  category: "audio",
  price_range_usd: [500, 500],
  image_url: undefined,
  product_url: undefined,
  recommendation_tags: ["tribrid", "micro_planar", "flagship", "audiophile"],
  data_quality: {
    data_confidence: "medium",
    primary_source_type: "community_poll",
    source_name: "HiFiGo",
    last_verified: "2026-01",
  },
  core_attributes: {
    category_subtype: "iem",
    price_tier: "flagship",
    platform_fit: ["pc", "mobile"],
    connection_type: ["wired_3_5mm"], // Q-Lock Mini: 3.5mm + 4.4mm
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
    audio_sound_signature: "neutral", // Balanced tribrid
    audio_competitive_fps: "great", // 4 micro planars for ultra-high freq
    audio_immersion: "great", // Bio-diaphragm DD for bass
    audio_comfort: "great", // Aerospace aluminum, ~8.1g per side

    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: 8.1,
    audio_needs_amp: "no", // 26Ω, 108dB/mW
    audio_impedance_ohm: 26,
    audio_sensitivity_db: 108,
    audio_driver_type: "hybrid", // 1DD + 4BA + 4 Micro Planar
    audio_wireless_codec_support: undefined,
    audio_virtual_surround: [],
    audio_repairability: "great", // MMCX or 2-pin + Q-Lock Mini modular
    audio_value_pick: false,
  },
};

// =============================================================================
// Export array
// =============================================================================

export const newAudioProducts: AudioProduct[] = [
  moondropChu2,
  salnotes7hzZero2,
  kefineKlean,
  juzearDefiant,
  letshuoerS08,
  dunuKima2,
  letshuoerS12Pro,
  afulPerformer7,
  ziigaatOdyssey,
  softearsVolumeS,
  xennsMangirdTeaPro,
  xennsMangirdTopPro,
  dunuDk3001bd,
];