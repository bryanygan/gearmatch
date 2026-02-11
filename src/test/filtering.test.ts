import { describe, it, expect } from "vitest";
import { applyPreFilters } from "@/lib/filtering/apply-filters";
import {
  wirelessFilter as mouseWirelessFilter,
  handednessFilter,
  mousePreFilters,
} from "@/lib/filtering/mouse-filters";
import {
  micFilter,
  wirelessFilter as audioWirelessFilter,
  audioPreFilters,
} from "@/lib/filtering/audio-filters";
import { connectivityFilter, keyboardPreFilters } from "@/lib/filtering/keyboard-filters";
import {
  resolutionFilter,
  sizeFilter,
  monitorPreFilters,
} from "@/lib/filtering/monitor-filters";
import type { MouseProduct, AudioProduct, KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";
import type { MouseQuizAnswers, AudioQuizAnswers, KeyboardQuizAnswers, MonitorQuizAnswers } from "@/lib/scoring/types";

// =============================================================================
// Test Fixtures
// =============================================================================

const createMockMouse = (
  overrides: Partial<MouseProduct["core_attributes"]> = {}
): MouseProduct => ({
  id: "test_mouse",
  name: "Test Mouse",
  brand: "TestBrand",
  category: "mouse",
  price_range_usd: [50, 60],
  recommendation_tags: [],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test" },
  core_attributes: {
    category_subtype: "mouse",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"],
    wireless: true,
    battery_life_hr: 70,
    latency_class: "low",
    software_support: "good",
    availability_class: "easy",
    mouse_handedness: "ambi",
    mouse_weight_g: 60,
    mouse_weight_class: "ultralight",
    mouse_length_mm: 125,
    mouse_width_mm: 65,
    mouse_height_mm: 40,
    mouse_size_class: "medium",
    mouse_shape_profile: "low_hump",
    mouse_grip_fit: ["claw", "palm"],
    mouse_game_fit: ["fps", "general"],
    mouse_button_count: 5,
    mouse_button_count_class: "low",
    mouse_scroll_features: [],
    mouse_polling_rate_max_hz: "1000",
    mouse_sensor_class: "great",
    mouse_build_quality: "good",
    mouse_feet_quality: "good",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape"],
    mouse_value_pick: false,
    ...overrides,
  },
});

const createMockAudio = (
  overrides: Partial<AudioProduct["core_attributes"]> = {}
): AudioProduct => ({
  id: "test_audio",
  name: "Test Headset",
  brand: "TestBrand",
  category: "audio",
  price_range_usd: [100, 120],
  recommendation_tags: [],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test" },
  core_attributes: {
    category_subtype: "headset",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"],
    wireless: true,
    battery_life_hr: 40,
    latency_class: "low",
    software_support: "good",
    eq_support: false,
    availability_class: "easy",
    audio_type: "headset",
    audio_driver_type: "dynamic",
    audio_open_back: false,
    audio_has_mic: true,
    audio_mic_type: "fixed_boom",
    audio_mic_quality: "good",
    audio_sound_signature: "neutral",
    audio_competitive_fps: "good",
    audio_immersion: "good",
    audio_isolation: "medium",
    audio_anc: false,
    audio_weight_g: 300,
    audio_comfort: "good",
    audio_needs_amp: "no",
    audio_virtual_surround: [],
    audio_repairability: "ok",
    audio_value_pick: false,
    ...overrides,
  },
});

const createMockKeyboard = (
  overrides: Partial<KeyboardProduct["core_attributes"]> = {}
): KeyboardProduct => ({
  id: "test_keyboard",
  name: "Test Keyboard",
  brand: "TestBrand",
  category: "keyboard",
  price_range_usd: [100, 130],
  recommendation_tags: [],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test" },
  core_attributes: {
    category_subtype: "keyboard",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"],
    wireless: true,
    battery_life_hr: 200,
    latency_class: "low",
    software_support: "good",
    availability_class: "easy",
    keyboard_form_factor: "tkl_80_percent",
    keyboard_switch_type: "mechanical",
    keyboard_switch_feel: "linear",
    keyboard_output_type: "non_adjustable",
    keyboard_hot_swappable: true,
    keyboard_case_material: "plastic",
    keyboard_mount_style: "gasket",
    keyboard_keycap_material: "pbt",
    keyboard_keycap_profile: "cherry",
    keyboard_polling_rate_max_hz: "1000",
    keyboard_build_quality: "good",
    keyboard_has_rgb: true,
    keyboard_has_per_key_rgb: true,
    keyboard_shine_through_keycaps: true,
    keyboard_has_knob: false,
    keyboard_macro_key_count: 0,
    keyboard_supports_rapid_trigger: false,
    keyboard_supports_socd: false,
    keyboard_supports_analog: false,
    keyboard_has_onboard_memory: true,
    keyboard_nkro: true,
    keyboard_feature_tags: ["hot_swappable"],
    keyboard_use_fit: ["casual_gaming", "office"],
    keyboard_value_pick: false,
    ...overrides,
  },
});

const createMockMonitor = (
  overrides: Partial<MonitorProduct["core_attributes"]> = {}
): MonitorProduct => ({
  id: "test_monitor",
  name: "Test Monitor",
  brand: "TestBrand",
  category: "monitor",
  price_range_usd: [300, 400],
  recommendation_tags: [],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test" },
  core_attributes: {
    category_subtype: "monitor",
    price_tier: "midrange",
    platform_fit: ["pc"],
    availability_class: "easy",
    monitor_panel_type: "IPS",
    monitor_size_inches: 27,
    monitor_size_class: "standard",
    monitor_resolution: "2560x1440",
    monitor_resolution_class: "1440p",
    monitor_refresh_rate_hz: 165,
    monitor_refresh_class: "165hz",
    monitor_response_time_ms: 1,
    monitor_aspect_ratio: "16:9",
    monitor_curved: false,
    monitor_curve_radius_mm: undefined,
    monitor_hdr_level: "basic",
    monitor_peak_brightness_nits: 400,
    monitor_color_accuracy_tier: "good",
    monitor_srgb_coverage: 99,
    monitor_adobe_rgb_coverage: undefined,
    monitor_dci_p3_coverage: undefined,
    monitor_gsync_support: "gsync_compatible",
    monitor_freesync_support: "freesync_premium",
    monitor_vesa_mount: true,
    monitor_height_adjustable: true,
    monitor_pivot: true,
    monitor_speakers: false,
    monitor_usb_c: false,
    monitor_usb_c_power_delivery_w: undefined,
    monitor_kvm_switch: false,
    monitor_input_lag_ms: undefined,
    monitor_use_fit: ["pc_gaming", "general"],
    monitor_pc_gaming_score: 7.5,
    monitor_console_gaming_score: undefined,
    monitor_editing_score: undefined,
    monitor_office_score: 7.0,
    monitor_overall_score: 7.5,
    monitor_value_pick: false,
    ...overrides,
  },
});

const baseMouseAnswers: MouseQuizAnswers = {
  "hand-size": "medium",
  "grip-style": ["claw"],
  "weight-preference": ["light"],
  wireless: "either",
  "primary-use": ["precision"],
};

const baseAudioAnswers: AudioQuizAnswers = {
  "primary-use": ["competitive"],
  "form-factor": ["over-ear"],
  "mic-needs": "nice-to-have",
  "session-length": ["medium"],
  budget: ["mid-range"],
};

const baseKeyboardAnswers: KeyboardQuizAnswers = {
  "primary-use": ["casual-gaming"],
  "form-factor": ["tkl"],
  "switch-type": ["linear"],
  "gaming-features": "nice-to-have",
  connectivity: "no-preference",
  "priority-feature": ["typing-feel"],
  budget: ["mid-range"],
};

const baseMonitorAnswers: MonitorQuizAnswers = {
  "primary-use": ["gaming"],
  "size-preference": "standard",
  resolution: "1440p",
};

// =============================================================================
// Mouse Filter Tests
// =============================================================================

describe("Mouse Pre-Filters", () => {
  describe("wirelessFilter", () => {
    it("keeps wireless mice when user wants wireless", () => {
      const answers = { ...baseMouseAnswers, wireless: "wireless" as const };
      const wireless = createMockMouse({ wireless: true });
      const wired = createMockMouse({ wireless: false });
      expect(mouseWirelessFilter(answers, wireless)).toBe(true);
      expect(mouseWirelessFilter(answers, wired)).toBe(false);
    });

    it("keeps wired mice when user wants wired", () => {
      const answers = { ...baseMouseAnswers, wireless: "wired" as const };
      const wireless = createMockMouse({ wireless: true });
      const wired = createMockMouse({ wireless: false });
      expect(mouseWirelessFilter(answers, wireless)).toBe(false);
      expect(mouseWirelessFilter(answers, wired)).toBe(true);
    });

    it('keeps all mice when user selects "either"', () => {
      const answers = { ...baseMouseAnswers, wireless: "either" as const };
      expect(mouseWirelessFilter(answers, createMockMouse({ wireless: true }))).toBe(true);
      expect(mouseWirelessFilter(answers, createMockMouse({ wireless: false }))).toBe(true);
    });
  });

  describe("handednessFilter", () => {
    it("keeps left and ambi mice for left-handed users", () => {
      const answers = { ...baseMouseAnswers, handedness: "left" as const };
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "left" }))).toBe(true);
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "ambi" }))).toBe(true);
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "ergo_left" }))).toBe(true);
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "right" }))).toBe(false);
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "ergo_right" }))).toBe(false);
    });

    it("keeps only ambi mice for ambidextrous users", () => {
      const answers = { ...baseMouseAnswers, handedness: "ambidextrous" as const };
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "ambi" }))).toBe(true);
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "right" }))).toBe(false);
    });

    it("keeps all mice when handedness is not specified", () => {
      const answers = { ...baseMouseAnswers };
      delete answers.handedness;
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "right" }))).toBe(true);
      expect(handednessFilter(answers, createMockMouse({ mouse_handedness: "left" }))).toBe(true);
    });
  });
});

// =============================================================================
// Audio Filter Tests
// =============================================================================

describe("Audio Pre-Filters", () => {
  describe("micFilter", () => {
    it("keeps only mic products when mic is essential", () => {
      const answers = { ...baseAudioAnswers, "mic-needs": "essential" as const };
      expect(micFilter(answers, createMockAudio({ audio_has_mic: true }))).toBe(true);
      expect(micFilter(answers, createMockAudio({ audio_has_mic: false }))).toBe(false);
    });

    it("keeps all products when mic is nice-to-have or not-needed", () => {
      const nice = { ...baseAudioAnswers, "mic-needs": "nice-to-have" as const };
      const notNeeded = { ...baseAudioAnswers, "mic-needs": "not-needed" as const };
      expect(micFilter(nice, createMockAudio({ audio_has_mic: false }))).toBe(true);
      expect(micFilter(notNeeded, createMockAudio({ audio_has_mic: false }))).toBe(true);
    });
  });

  describe("wirelessFilter", () => {
    it("keeps only wireless when wireless is required", () => {
      const answers = { ...baseAudioAnswers, "wireless-preference": "wireless-required" as const };
      expect(audioWirelessFilter(answers, createMockAudio({ wireless: true }))).toBe(true);
      expect(audioWirelessFilter(answers, createMockAudio({ wireless: false }))).toBe(false);
    });

    it("keeps all when wireless is preferred or either", () => {
      const preferred = { ...baseAudioAnswers, "wireless-preference": "wireless-preferred" as const };
      expect(audioWirelessFilter(preferred, createMockAudio({ wireless: false }))).toBe(true);
    });
  });
});

// =============================================================================
// Keyboard Filter Tests
// =============================================================================

describe("Keyboard Pre-Filters", () => {
  describe("connectivityFilter", () => {
    it("keeps only wireless when wireless is essential", () => {
      const answers = { ...baseKeyboardAnswers, connectivity: "wireless-essential" as const };
      expect(connectivityFilter(answers, createMockKeyboard({ wireless: true }))).toBe(true);
      expect(connectivityFilter(answers, createMockKeyboard({ wireless: false }))).toBe(false);
    });

    it("keeps all when connectivity is not wireless-essential", () => {
      const answers = { ...baseKeyboardAnswers, connectivity: "wired-preferred" as const };
      expect(connectivityFilter(answers, createMockKeyboard({ wireless: false }))).toBe(true);
      expect(connectivityFilter(answers, createMockKeyboard({ wireless: true }))).toBe(true);
    });
  });
});

// =============================================================================
// Monitor Filter Tests
// =============================================================================

describe("Monitor Pre-Filters", () => {
  describe("resolutionFilter", () => {
    it("keeps 1080p and 1440p when user selects 1080p", () => {
      const answers = { ...baseMonitorAnswers, resolution: "1080p" as const };
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "1080p" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "1440p" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "4k" }))).toBe(false);
    });

    it("keeps 1080p, 1440p, and 4k when user selects 1440p", () => {
      const answers = { ...baseMonitorAnswers, resolution: "1440p" as const };
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "1080p" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "1440p" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "4k" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "5k" }))).toBe(false);
    });

    it("keeps only 4k and 5k when user selects 4k", () => {
      const answers = { ...baseMonitorAnswers, resolution: "4k" as const };
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "1440p" }))).toBe(false);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "4k" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "5k" }))).toBe(true);
    });

    it('keeps all when user selects "any"', () => {
      const answers = { ...baseMonitorAnswers, resolution: "any" as const };
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "1080p" }))).toBe(true);
      expect(resolutionFilter(answers, createMockMonitor({ monitor_resolution_class: "4k" }))).toBe(true);
    });
  });

  describe("sizeFilter", () => {
    it("keeps only ultrawide when user wants ultrawide", () => {
      const answers = { ...baseMonitorAnswers, "size-preference": "ultrawide" as const };
      expect(sizeFilter(answers, createMockMonitor({ monitor_size_class: "ultrawide" }))).toBe(true);
      expect(sizeFilter(answers, createMockMonitor({ monitor_size_class: "super_ultrawide" }))).toBe(true);
      expect(sizeFilter(answers, createMockMonitor({ monitor_size_class: "standard" }))).toBe(false);
    });

    it("keeps all when user selects standard", () => {
      const answers = { ...baseMonitorAnswers, "size-preference": "standard" as const };
      expect(sizeFilter(answers, createMockMonitor({ monitor_size_class: "standard" }))).toBe(true);
      expect(sizeFilter(answers, createMockMonitor({ monitor_size_class: "ultrawide" }))).toBe(true);
    });
  });
});

// =============================================================================
// applyPreFilters Tests
// =============================================================================

describe("applyPreFilters", () => {
  it("applies multiple filters correctly", () => {
    const answers: MouseQuizAnswers = {
      ...baseMouseAnswers,
      wireless: "wireless",
      handedness: "left",
    };
    const products = [
      createMockMouse({ wireless: true, mouse_handedness: "ambi" }),
      createMockMouse({ wireless: false, mouse_handedness: "ambi" }),
      createMockMouse({ wireless: true, mouse_handedness: "right" }),
      createMockMouse({ wireless: true, mouse_handedness: "left" }),
    ];

    const result = applyPreFilters(answers, products, mousePreFilters);
    expect(result.filtered).toHaveLength(2);
    expect(result.eliminated).toBe(2);
    expect(result.total).toBe(4);
  });

  it("returns all products when no filters match", () => {
    const answers = { ...baseMouseAnswers, wireless: "either" as const };
    delete answers.handedness;
    const products = [
      createMockMouse({ wireless: true }),
      createMockMouse({ wireless: false }),
    ];

    const result = applyPreFilters(answers, products, mousePreFilters);
    expect(result.filtered).toHaveLength(2);
    expect(result.eliminated).toBe(0);
  });

  it("does not modify the original array", () => {
    const answers = { ...baseMouseAnswers, wireless: "wireless" as const };
    const products = [
      createMockMouse({ wireless: true }),
      createMockMouse({ wireless: false }),
    ];
    const originalLength = products.length;

    applyPreFilters(answers, products, mousePreFilters);
    expect(products).toHaveLength(originalLength);
  });

  it("handles empty product array", () => {
    const answers = { ...baseMouseAnswers, wireless: "wireless" as const };
    const result = applyPreFilters(answers, [] as MouseProduct[], mousePreFilters);
    expect(result.filtered).toHaveLength(0);
    expect(result.eliminated).toBe(0);
    expect(result.total).toBe(0);
  });
});
