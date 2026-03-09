import { describe, it, expect } from "vitest";
import {
  primaryUseRule as kbPrimaryUseRule,
  formFactorRule as kbFormFactorRule,
  switchTypeRule,
  gamingFeaturesRule,
  connectivityRule,
  budgetMatchRule as kbBudgetMatchRule,
  switchTechnologyRule,
  mediaControlsRule,
  keycapMaterialRule,
  keyboardRules,
} from "@/lib/scoring/keyboard-rules";
import {
  primaryUseFitRule,
  sizeMatchRule,
  resolutionMatchRule,
  refreshRateMatchRule,
  panelTypeMatchRule,
  budgetMatchRule as monBudgetMatchRule,
  curvedPreferenceRule,
  monitorRules,
} from "@/lib/scoring/monitor-rules";
import type { KeyboardQuizAnswers, MonitorQuizAnswers } from "@/lib/scoring/types";
import type { KeyboardProduct } from "@/types/products";
import type { MonitorProduct } from "@/types/monitor";

// =============================================================================
// Keyboard Test Fixtures
// =============================================================================

const createMockKeyboard = (
  overrides: Partial<KeyboardProduct["core_attributes"]> = {}
): KeyboardProduct => ({
  id: "test_kb",
  name: "Test Keyboard",
  brand: "TestBrand",
  category: "keyboard",
  price_range_usd: [150, 170],
  recommendation_tags: [],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test" },
  core_attributes: {
    category_subtype: "keyboard",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["wired_usb"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "low",
    software_support: "good",
    availability_class: "easy",
    keyboard_form_factor: "tkl_80_percent",
    keyboard_switch_type: "mechanical",
    keyboard_switch_feel: "linear",
    keyboard_switch_brand: "Cherry",
    keyboard_switch_model: "MX Red",
    keyboard_hot_swappable: true,
    keyboard_supports_rapid_trigger: false,
    keyboard_supports_socd: false,
    keyboard_supports_analog: false,
    keyboard_polling_rate_max_hz: "1000",
    keyboard_single_key_latency_ms: 5,
    keyboard_keycap_material: "pbt",
    keyboard_mount_style: "gasket",
    keyboard_typing_noise_dba: 45,
    keyboard_has_knob: false,
    keyboard_has_rgb: true,
    keyboard_feature_tags: ["gasket_mount"],
    keyboard_use_fit: ["casual_gaming", "typing"],
    keyboard_gaming_score: 7.5,
    keyboard_office_score: 8,
    keyboard_programming_score: 8,
    keyboard_build_quality: "good",
    keyboard_value_pick: false,
    ...overrides,
  },
});

const baseKbAnswers: KeyboardQuizAnswers = {
  "primary-use": ["competitive-gaming"],
  "form-factor": ["tkl"],
  "switch-type": ["linear"],
  "gaming-features": "essential",
  connectivity: "wired-preferred",
  "priority-feature": ["performance"],
  budget: ["mid-range"],
};

// =============================================================================
// Monitor Test Fixtures
// =============================================================================

const createMockMonitor = (
  overrides: Partial<MonitorProduct["core_attributes"]> = {}
): MonitorProduct => ({
  id: "test_monitor",
  name: "Test Monitor",
  brand: "TestBrand",
  category: "monitor",
  price_range_usd: [400, 450],
  recommendation_tags: [],
  data_quality: { data_confidence: "high", primary_source_type: "lab_test" },
  core_attributes: {
    category_subtype: "monitor",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["displayport", "hdmi"],
    wireless: false,
    battery_life_hr: undefined,
    latency_class: "low",
    software_support: "good",
    availability_class: "easy",
    monitor_size_inches: 27,
    monitor_size_class: "standard",
    monitor_resolution_class: "1440p",
    monitor_native_resolution: "2560x1440",
    monitor_panel_type: "IPS",
    monitor_max_refresh_hz: 165,
    monitor_response_time_ms: 1,
    monitor_curved: false,
    monitor_curve_radius: undefined,
    monitor_aspect_ratio: "16:9",
    monitor_hdr10: true,
    monitor_hdr_level: "basic",
    monitor_hdr_picture_score: 6,
    monitor_vrr: true,
    monitor_freesync: true,
    monitor_gsync: "compatible",
    monitor_input_lag_ms: 4,
    monitor_speakers: false,
    monitor_usb_c_dp: false,
    monitor_usb_c_pd_watts: undefined,
    monitor_usb_hub_ports: 0,
    monitor_ergonomic_features: ["height", "tilt", "swivel", "pivot"],
    monitor_srgb_coverage: 99,
    monitor_adobe_rgb_coverage: 80,
    monitor_dci_p3_coverage: 90,
    monitor_color_accuracy: "great",
    monitor_color_accuracy_score: 8,
    monitor_overall_score: 8,
    monitor_pc_gaming_score: 8.5,
    monitor_console_gaming_score: 7.5,
    monitor_editing_score: 7.5,
    monitor_office_score: 8,
    monitor_value_pick: false,
    ...overrides,
  },
});

const baseMonitorAnswers: MonitorQuizAnswers = {
  "primary-use": ["gaming"],
  "size-preference": "standard",
  resolution: "1440p",
};

// =============================================================================
// Keyboard Primary Use Rule Tests
// =============================================================================

describe("Keyboard primaryUseRule", () => {
  it("gives 25 for competitive gaming with rapid trigger + low latency", () => {
    const product = createMockKeyboard({
      keyboard_supports_rapid_trigger: true,
      latency_class: "very_low",
      keyboard_single_key_latency_ms: 0.5,
    });
    const result = kbPrimaryUseRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(25);
  });

  it("gives 25 for productivity with office-fit + quiet", () => {
    const answers = { ...baseKbAnswers, "primary-use": ["productivity"] as KeyboardQuizAnswers["primary-use"] };
    const product = createMockKeyboard({
      keyboard_use_fit: ["office", "productivity"],
      keyboard_office_score: 9,
      keyboard_typing_noise_dba: 40,
      keyboard_feature_tags: ["quiet"],
    });
    const result = kbPrimaryUseRule.evaluate(answers, product);
    expect(result.points).toBe(25);
  });

  it("gives 5 for competitive gaming with non-gaming keyboard", () => {
    const product = createMockKeyboard({
      keyboard_use_fit: ["office"],
      keyboard_gaming_score: 5,
      keyboard_supports_rapid_trigger: false,
      latency_class: "high",
    });
    const result = kbPrimaryUseRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(5);
  });
});

// =============================================================================
// Keyboard Form Factor Rule Tests
// =============================================================================

describe("Keyboard formFactorRule", () => {
  it("gives 20 for matching TKL preference", () => {
    const product = createMockKeyboard({ keyboard_form_factor: "tkl_80_percent" });
    const result = kbFormFactorRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(20);
  });

  it("gives 14 for acceptable adjacent form factor", () => {
    const product = createMockKeyboard({ keyboard_form_factor: "75_percent" });
    const result = kbFormFactorRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(14);
  });

  it("gives 5 for mismatched form factor", () => {
    const answers = { ...baseKbAnswers, "form-factor": ["60-65-percent"] as KeyboardQuizAnswers["form-factor"] };
    const product = createMockKeyboard({ keyboard_form_factor: "full_size_100_percent" });
    const result = kbFormFactorRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });
});

// =============================================================================
// Keyboard Switch Type Rule Tests
// =============================================================================

describe("switchTypeRule", () => {
  it("gives 15 for matching switch + hot-swap", () => {
    const product = createMockKeyboard({ keyboard_switch_feel: "linear", keyboard_hot_swappable: true });
    const result = switchTypeRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(15);
  });

  it("gives 14 for matching switch without hot-swap", () => {
    const product = createMockKeyboard({ keyboard_switch_feel: "linear", keyboard_hot_swappable: false });
    const result = switchTypeRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(14);
  });

  it("gives 10 for non-matching switch with hot-swap", () => {
    const product = createMockKeyboard({ keyboard_switch_feel: "tactile", keyboard_hot_swappable: true });
    const result = switchTypeRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(10);
  });

  it("gives 15 for no-preference with hot-swap", () => {
    const answers = { ...baseKbAnswers, "switch-type": ["no-preference"] as KeyboardQuizAnswers["switch-type"] };
    const product = createMockKeyboard({ keyboard_hot_swappable: true });
    const result = switchTypeRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });
});

// =============================================================================
// Keyboard Gaming Features Rule Tests
// =============================================================================

describe("gamingFeaturesRule", () => {
  it("gives high score for essential with full gaming features", () => {
    const product = createMockKeyboard({
      keyboard_supports_rapid_trigger: true,
      keyboard_supports_socd: true,
      keyboard_polling_rate_max_hz: "8000",
      keyboard_single_key_latency_ms: 0.5,
    });
    const result = gamingFeaturesRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBeGreaterThanOrEqual(12);
  });

  it("gives 12 for not-important", () => {
    const answers = { ...baseKbAnswers, "gaming-features": "not-important" as const };
    const result = gamingFeaturesRule.evaluate(answers, createMockKeyboard());
    expect(result.points).toBe(12);
  });
});

// =============================================================================
// Keyboard Connectivity Rule Tests
// =============================================================================

describe("connectivityRule", () => {
  it("gives 15 for wired-preferred with wired keyboard", () => {
    const product = createMockKeyboard({ wireless: false });
    const result = connectivityRule.evaluate(baseKbAnswers, product);
    expect(result.points).toBe(15);
  });

  it("gives 2 for wireless-essential with wired keyboard", () => {
    const answers = { ...baseKbAnswers, connectivity: "wireless-essential" as const };
    const product = createMockKeyboard({ wireless: false });
    const result = connectivityRule.evaluate(answers, product);
    expect(result.points).toBe(2);
  });

  it("gives 15 for wireless-essential with full wireless", () => {
    const answers = { ...baseKbAnswers, connectivity: "wireless-essential" as const };
    const product = createMockKeyboard({
      wireless: true,
      connection_type: ["wireless_2_4_dongle", "bluetooth"],
      keyboard_feature_tags: ["multi_device_bluetooth"],
    });
    const result = connectivityRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });
});

// =============================================================================
// Keyboard Switch Technology Rule Tests
// =============================================================================

describe("switchTechnologyRule", () => {
  it("gives 6 for matching magnetic with rapid trigger", () => {
    const answers = { ...baseKbAnswers, "switch-technology": ["magnetic"] as KeyboardQuizAnswers["switch-technology"] };
    const product = createMockKeyboard({
      keyboard_switch_type: "magnetic_hall_effect",
      keyboard_supports_rapid_trigger: true,
    });
    const result = switchTechnologyRule.evaluate(answers, product);
    expect(result.points).toBe(6);
  });

  it("gives 5 when any or not specified", () => {
    const result = switchTechnologyRule.evaluate(baseKbAnswers, createMockKeyboard());
    expect(result.points).toBe(5);
  });

  it("gives 2 for mismatched technology", () => {
    const answers = { ...baseKbAnswers, "switch-technology": ["magnetic"] as KeyboardQuizAnswers["switch-technology"] };
    const product = createMockKeyboard({ keyboard_switch_type: "mechanical" });
    const result = switchTechnologyRule.evaluate(answers, product);
    expect(result.points).toBe(2);
  });
});

// =============================================================================
// Keyboard Media Controls Rule Tests
// =============================================================================

describe("mediaControlsRule", () => {
  it("gives 3 for essential with knob", () => {
    const answers = { ...baseKbAnswers, "media-controls": "essential" as const };
    const product = createMockKeyboard({ keyboard_has_knob: true });
    const result = mediaControlsRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("gives 0 for essential without media controls", () => {
    const answers = { ...baseKbAnswers, "media-controls": "essential" as const };
    const product = createMockKeyboard({ keyboard_has_knob: false, keyboard_feature_tags: [] });
    const result = mediaControlsRule.evaluate(answers, product);
    expect(result.points).toBe(0);
  });

  it("gives 3 for not-needed regardless", () => {
    const answers = { ...baseKbAnswers, "media-controls": "not-needed" as const };
    const result = mediaControlsRule.evaluate(answers, createMockKeyboard());
    expect(result.points).toBe(3);
  });
});

// =============================================================================
// Keyboard Keycap Material Rule Tests
// =============================================================================

describe("keycapMaterialRule", () => {
  it("gives 3 for matching PBT", () => {
    const answers = { ...baseKbAnswers, "keycap-material": "pbt" as const };
    const product = createMockKeyboard({ keyboard_keycap_material: "pbt" });
    const result = keycapMaterialRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("gives 2 when any is selected", () => {
    const answers = { ...baseKbAnswers, "keycap-material": "any" as const };
    const result = keycapMaterialRule.evaluate(answers, createMockKeyboard());
    expect(result.points).toBe(2);
  });

  it("gives 1 for mismatched material without hot-swap", () => {
    const answers = { ...baseKbAnswers, "keycap-material": "pbt" as const };
    const product = createMockKeyboard({ keyboard_keycap_material: "abs", keyboard_hot_swappable: false });
    const result = keycapMaterialRule.evaluate(answers, product);
    expect(result.points).toBe(1);
  });
});

// =============================================================================
// keyboardRules structure
// =============================================================================

describe("keyboardRules", () => {
  it("includes all 10 rules", () => {
    expect(keyboardRules).toHaveLength(10);
  });

  it("all rules have valid structure", () => {
    for (const rule of keyboardRules) {
      expect(rule.weight).toBeGreaterThan(0);
      expect(rule.maxPoints).toBeGreaterThan(0);
      expect(rule.name).toBeTruthy();
      expect(typeof rule.evaluate).toBe("function");
    }
  });
});

// =============================================================================
// Monitor Primary Use Fit Rule Tests
// =============================================================================

describe("Monitor primaryUseFitRule", () => {
  it("gives 25 for gaming with excellent gaming score", () => {
    const product = createMockMonitor({ monitor_pc_gaming_score: 9 });
    const result = primaryUseFitRule.evaluate(baseMonitorAnswers, product);
    expect(result.points).toBe(25);
  });

  it("gives 20 for gaming with good gaming score", () => {
    const product = createMockMonitor({ monitor_pc_gaming_score: 8 });
    const result = primaryUseFitRule.evaluate(baseMonitorAnswers, product);
    expect(result.points).toBe(20);
  });

  it("gives 25 for office with excellent office score", () => {
    const answers = { ...baseMonitorAnswers, "primary-use": ["office"] as MonitorQuizAnswers["primary-use"] };
    const product = createMockMonitor({ monitor_office_score: 8.5 });
    const result = primaryUseFitRule.evaluate(answers, product);
    expect(result.points).toBe(25);
  });
});

// =============================================================================
// Monitor Size Match Rule Tests
// =============================================================================

describe("Monitor sizeMatchRule", () => {
  it("gives 15 for matching size preference", () => {
    const product = createMockMonitor({ monitor_size_class: "standard", monitor_size_inches: 27 });
    const result = sizeMatchRule.evaluate(baseMonitorAnswers, product);
    expect(result.points).toBe(15);
  });

  it("gives 12 for 'any' size preference", () => {
    const answers = { ...baseMonitorAnswers, "size-preference": "any" as const };
    const result = sizeMatchRule.evaluate(answers, createMockMonitor());
    expect(result.points).toBe(12);
  });

  it("gives 10 for adjacent size", () => {
    const answers = { ...baseMonitorAnswers, "size-preference": "large" as const };
    const product = createMockMonitor({ monitor_size_class: "standard" });
    const result = sizeMatchRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 5 for mismatched size", () => {
    const answers = { ...baseMonitorAnswers, "size-preference": "compact" as const };
    const product = createMockMonitor({ monitor_size_class: "ultrawide", monitor_size_inches: 34 });
    const result = sizeMatchRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });
});

// =============================================================================
// Monitor Resolution Match Rule Tests
// =============================================================================

describe("Monitor resolutionMatchRule", () => {
  it("gives 15 for matching resolution at ideal size", () => {
    const product = createMockMonitor({
      monitor_resolution_class: "1440p",
      monitor_size_inches: 27,
    });
    const result = resolutionMatchRule.evaluate(baseMonitorAnswers, product);
    expect(result.points).toBe(15);
  });

  it("gives 12 for 'any' preference", () => {
    const answers = { ...baseMonitorAnswers, resolution: "any" as const };
    const result = resolutionMatchRule.evaluate(answers, createMockMonitor());
    expect(result.points).toBe(12);
  });

  it("gives 9 for adjacent resolution", () => {
    const product = createMockMonitor({ monitor_resolution_class: "4k" });
    const result = resolutionMatchRule.evaluate(baseMonitorAnswers, product);
    expect(result.points).toBe(9);
  });
});

// =============================================================================
// Monitor Refresh Rate Rule Tests
// =============================================================================

describe("Monitor refreshRateMatchRule", () => {
  it("gives 12 for high refresh preference met", () => {
    const answers = { ...baseMonitorAnswers, "refresh-rate": "high" as const };
    const product = createMockMonitor({ monitor_max_refresh_hz: 360 });
    const result = refreshRateMatchRule.evaluate(answers, product);
    expect(result.points).toBe(12);
  });

  it("gives 5 for high refresh preference with 60Hz", () => {
    const answers = { ...baseMonitorAnswers, "refresh-rate": "high" as const };
    const product = createMockMonitor({ monitor_max_refresh_hz: 60 });
    const result = refreshRateMatchRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });
});

// =============================================================================
// Monitor Panel Type Rule Tests
// =============================================================================

describe("Monitor panelTypeMatchRule", () => {
  it("gives 8 for matching IPS preference", () => {
    const answers = { ...baseMonitorAnswers, "panel-type": ["ips"] as MonitorQuizAnswers["panel-type"] };
    const product = createMockMonitor({ monitor_panel_type: "IPS" });
    const result = panelTypeMatchRule.evaluate(answers, product);
    expect(result.points).toBe(8);
  });

  it("gives 8 for OLED preference with QD-OLED", () => {
    const answers = { ...baseMonitorAnswers, "panel-type": ["oled"] as MonitorQuizAnswers["panel-type"] };
    const product = createMockMonitor({ monitor_panel_type: "QD-OLED" });
    const result = panelTypeMatchRule.evaluate(answers, product);
    expect(result.points).toBe(8);
  });

  it("gives 6 for 'any' panel preference", () => {
    const answers = { ...baseMonitorAnswers, "panel-type": ["any"] as MonitorQuizAnswers["panel-type"] };
    const result = panelTypeMatchRule.evaluate(answers, createMockMonitor());
    expect(result.points).toBe(6);
  });
});

// =============================================================================
// Monitor Curved Preference Rule Tests
// =============================================================================

describe("Monitor curvedPreferenceRule", () => {
  it("gives 3 for flat preference with flat screen", () => {
    const answers = { ...baseMonitorAnswers, curved: "flat" as const };
    const product = createMockMonitor({ monitor_curved: false });
    const result = curvedPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("gives 3 for curved preference with curved screen", () => {
    const answers = { ...baseMonitorAnswers, curved: "curved" as const };
    const product = createMockMonitor({ monitor_curved: true });
    const result = curvedPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("gives 1 for mismatch", () => {
    const answers = { ...baseMonitorAnswers, curved: "curved" as const };
    const product = createMockMonitor({ monitor_curved: false });
    const result = curvedPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(1);
  });

  it("gives 2 for either preference", () => {
    const answers = { ...baseMonitorAnswers, curved: "either" as const };
    const result = curvedPreferenceRule.evaluate(answers, createMockMonitor());
    expect(result.points).toBe(2);
  });
});

// =============================================================================
// monitorRules structure
// =============================================================================

describe("monitorRules", () => {
  it("includes all 11 rules", () => {
    expect(monitorRules).toHaveLength(11);
  });

  it("all rules have valid structure", () => {
    for (const rule of monitorRules) {
      expect(rule.weight).toBeGreaterThan(0);
      expect(rule.maxPoints).toBeGreaterThan(0);
      expect(rule.name).toBeTruthy();
      expect(typeof rule.evaluate).toBe("function");
    }
  });
});
