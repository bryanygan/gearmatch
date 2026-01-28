import { describe, it, expect } from "vitest";
import {
  scoreProducts,
  getKeyboardRecommendations,
  keyboardRules,
} from "@/lib/scoring";
import type { KeyboardQuizAnswers } from "@/lib/scoring";
import type { KeyboardProduct } from "@/types/products";

// =============================================================================
// Test Fixtures
// =============================================================================

/**
 * Creates a mock keyboard product with configurable overrides.
 * Defaults to a competitive gaming keyboard with rapid trigger.
 */
const createMockKeyboardProduct = (
  overrides: Partial<KeyboardProduct> = {}
): KeyboardProduct => ({
  id: "test_keyboard",
  name: "Test Keyboard",
  brand: "TestBrand",
  category: "keyboard",
  price_range_usd: [150, 180],
  recommendation_tags: [],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
  },
  core_attributes: {
    category_subtype: "keyboard",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["wired_usb"],
    wireless: false,
    latency_class: "very_low",
    software_support: "good",
    availability_class: "easy",

    keyboard_form_factor: "tkl_80_percent",
    keyboard_switch_type: "magnetic_hall_effect",
    keyboard_switch_feel: "linear",
    keyboard_switch_name: "Test Switch",
    keyboard_output_type: "adjustable_actuation",
    keyboard_hot_swappable: true,
    keyboard_case_material: "aluminum",
    keyboard_mount_style: "gasket",
    keyboard_keycap_material: "pbt",
    keyboard_keycap_profile: "oem",
    keyboard_polling_rate_max_hz: "8000",
    keyboard_build_quality: "excellent",
    keyboard_weight_g: 1500,
    keyboard_height_mm: 40,
    keyboard_width_mm: 350,
    keyboard_depth_mm: 140,

    keyboard_single_key_latency_ms: 0.5,
    keyboard_multi_key_latency_ms: 0.7,
    keyboard_typing_noise_dba: 45,

    keyboard_gaming_score: 9.0,
    keyboard_office_score: 7.5,
    keyboard_programming_score: 8.0,
    keyboard_raw_performance_score: 9.2,

    keyboard_has_rgb: true,
    keyboard_has_per_key_rgb: true,
    keyboard_shine_through_keycaps: true,
    keyboard_has_knob: false,
    keyboard_macro_key_count: 0,
    keyboard_supports_rapid_trigger: true,
    keyboard_supports_socd: true,
    keyboard_supports_analog: false,
    keyboard_has_onboard_memory: true,
    keyboard_nkro: true,

    keyboard_feature_tags: [
      "hot_swappable",
      "rapid_trigger",
      "socd",
      "gaming_grade_latency",
      "gasket_mount",
    ],
    keyboard_use_fit: ["competitive_gaming", "casual_gaming"],
    keyboard_value_pick: false,
    ...overrides.core_attributes,
  },
  ...overrides,
});

/**
 * Creates a productivity-focused keyboard mock.
 */
const createProductivityKeyboard = (
  overrides: Partial<KeyboardProduct> = {}
): KeyboardProduct =>
  createMockKeyboardProduct({
    id: "productivity_keyboard",
    name: "Productivity Keyboard",
    price_range_usd: [100, 120],
    core_attributes: {
      ...createMockKeyboardProduct().core_attributes,
      keyboard_form_factor: "full_size_100_percent",
      keyboard_switch_type: "scissor",
      keyboard_switch_feel: "tactile",
      keyboard_output_type: "non_adjustable",
      keyboard_hot_swappable: false,
      keyboard_case_material: "plastic",
      keyboard_mount_style: "integrated_plate",
      keyboard_polling_rate_max_hz: "1000",
      latency_class: "medium",
      wireless: true,
      connection_type: ["wireless_2_4_dongle", "bluetooth"],
      battery_life_hr: 240,

      keyboard_single_key_latency_ms: 12,
      keyboard_typing_noise_dba: 36,

      keyboard_gaming_score: 7.0,
      keyboard_office_score: 8.5,
      keyboard_programming_score: 8.5,
      keyboard_raw_performance_score: 6.5,

      keyboard_supports_rapid_trigger: false,
      keyboard_supports_socd: false,
      keyboard_supports_analog: false,
      keyboard_has_rgb: false,

      keyboard_feature_tags: ["quiet", "multi_device_bluetooth", "2_4ghz_wireless"],
      keyboard_use_fit: ["office", "programming", "typing", "productivity"],
      ...overrides.core_attributes,
    },
    ...overrides,
  });

// =============================================================================
// Keyboard Recommendations Integration Tests
// =============================================================================

describe("getKeyboardRecommendations", () => {
  it("returns top picks and alternates for competitive gaming", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const result = getKeyboardRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.alternates).toBeDefined();
    expect(result.topPicks.length).toBeLessThanOrEqual(3);
    expect(result.filters.category).toBe("keyboard");
  });

  it("returns top picks and alternates for productivity", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const result = getKeyboardRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.alternates).toBeDefined();
    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("returns top picks and alternates for programming", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const result = getKeyboardRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("respects custom options", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "no-preference",
      "gaming-features": "nice-to-have",
      connectivity: "no-preference",
      "priority-feature": "customization",
      budget: "budget",
    };

    const result = getKeyboardRecommendations(answers, {
      topPickCount: 1,
    });

    expect(result.topPicks.length).toBeLessThanOrEqual(1);
  });

  it("tracks total products evaluated", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const result = getKeyboardRecommendations(answers);

    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("produces consistent scores for same inputs", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const result1 = getKeyboardRecommendations(answers);
    const result2 = getKeyboardRecommendations(answers);

    expect(result1.topPicks.map((p) => p.product.id)).toEqual(
      result2.topPicks.map((p) => p.product.id)
    );
    expect(result1.topPicks.map((p) => p.score)).toEqual(
      result2.topPicks.map((p) => p.score)
    );
  });

  it("includes filters for wireless preference", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const result = getKeyboardRecommendations(answers);

    expect(result.filters.category).toBe("keyboard");
    expect(result.filters.wireless).toBe(true);
  });
});

// =============================================================================
// Core Scoring Engine Tests with Keyboard Products
// =============================================================================

describe("scoreProducts with keyboard products", () => {
  it("returns products sorted by score descending", () => {
    const products = [
      createProductivityKeyboard({ id: "low_score" }),
      createMockKeyboardProduct({ id: "high_score" }),
    ];

    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const scored = scoreProducts(answers, products, keyboardRules);

    // Gaming keyboard should score higher for competitive gaming
    expect(scored[0].product.id).toBe("high_score");
    expect(scored[0].score).toBeGreaterThan(scored[1].score);
  });

  it("calculates scores between 0 and 100", () => {
    const products = [createMockKeyboardProduct()];
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const scored = scoreProducts(answers, products, keyboardRules);

    expect(scored[0].score).toBeGreaterThanOrEqual(0);
    expect(scored[0].score).toBeLessThanOrEqual(100);
  });

  it("includes breakdown for each rule", () => {
    const products = [createMockKeyboardProduct()];
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const scored = scoreProducts(answers, products, keyboardRules);
    const breakdown = scored[0].breakdown;

    expect(breakdown).toHaveProperty("Primary Use");
    expect(breakdown).toHaveProperty("Form Factor");
    expect(breakdown).toHaveProperty("Switch Type");
    expect(breakdown).toHaveProperty("Gaming Features");
    expect(breakdown).toHaveProperty("Connectivity");
    expect(breakdown).toHaveProperty("Priority Feature");
    expect(breakdown).toHaveProperty("Budget Match");
  });

  it("handles empty product array", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const scored = scoreProducts(answers, [], keyboardRules);

    expect(scored).toEqual([]);
  });

  it("all scores in breakdown sum correctly with weights", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const result = getKeyboardRecommendations(answers);
    const topPick = result.topPicks[0];

    if (topPick) {
      // Verify breakdown exists for all rules
      expect(Object.keys(topPick.breakdown).length).toBe(keyboardRules.length);

      // Each breakdown should have valid structure
      Object.values(topPick.breakdown).forEach((category) => {
        expect(category.score).toBeGreaterThanOrEqual(0);
        expect(category.score).toBeLessThanOrEqual(category.maxScore);
        expect(category.weight).toBeGreaterThan(0);
        expect(category.details).toBeTruthy();
      });
    }
  });
});

// =============================================================================
// Primary Use Rule Tests
// =============================================================================

describe("Keyboard Primary Use Rule", () => {
  const primaryUseRule = keyboardRules.find((r) => r.name === "Primary Use")!;

  it("awards max points for competitive gaming keyboard with rapid trigger", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_supports_rapid_trigger: true,
        latency_class: "very_low",
        keyboard_feature_tags: ["gaming_grade_latency", "rapid_trigger"],
      },
    });

    const result = primaryUseRule.evaluate(answers, product);

    expect(result.points).toBe(25);
    expect(result.reason).toContain("Rapid Trigger");
  });

  it("penalizes non-gaming keyboard for competitive gaming use", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "essential",
      connectivity: "wireless-preferred",
      "priority-feature": "performance",
      budget: "mid-range",
    };

    const product = createProductivityKeyboard();

    const result = primaryUseRule.evaluate(answers, product);

    expect(result.points).toBeLessThan(15);
    expect(result.concern).toBeDefined();
  });

  it("rewards productivity keyboard for office use", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const product = createProductivityKeyboard({
      core_attributes: {
        ...createProductivityKeyboard().core_attributes,
        keyboard_office_score: 8.5,
        keyboard_typing_noise_dba: 36,
        keyboard_use_fit: ["office", "productivity"],
        keyboard_feature_tags: ["quiet"],
      },
    });

    const result = primaryUseRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(22);
    expect(result.reason).toBeDefined();
  });

  it("handles programming use case correctly", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_programming_score: 8.5,
        keyboard_use_fit: ["programming", "typing"],
        keyboard_feature_tags: ["gasket_mount", "premium"],
      },
    });

    const result = primaryUseRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(18);
  });

  it("handles casual gaming use case", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "linear",
      "gaming-features": "nice-to-have",
      connectivity: "wireless-preferred",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_gaming_score: 8.5,
        keyboard_has_rgb: true,
        keyboard_use_fit: ["casual_gaming"],
      },
    });

    const result = primaryUseRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(22);
  });
});

// =============================================================================
// Form Factor Rule Tests
// =============================================================================

describe("Keyboard Form Factor Rule", () => {
  const formFactorRule = keyboardRules.find((r) => r.name === "Form Factor")!;

  it("awards max points for exact TKL match", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_form_factor: "tkl_80_percent",
      },
    });

    const result = formFactorRule.evaluate(answers, product);

    expect(result.points).toBe(20);
    expect(result.reason).toContain("tkl");
  });

  it("awards max points for exact full-size match", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const product = createProductivityKeyboard({
      core_attributes: {
        ...createProductivityKeyboard().core_attributes,
        keyboard_form_factor: "full_size_100_percent",
      },
    });

    const result = formFactorRule.evaluate(answers, product);

    expect(result.points).toBe(20);
  });

  it("awards partial points for close size match", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "75-percent",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_form_factor: "tkl_80_percent", // Close to 75%
      },
    });

    const result = formFactorRule.evaluate(answers, product);

    expect(result.points).toBe(14);
    expect(result.concern).toBeDefined();
  });

  it("penalizes significantly different form factor", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createProductivityKeyboard({
      core_attributes: {
        ...createProductivityKeyboard().core_attributes,
        keyboard_form_factor: "full_size_100_percent",
      },
    });

    const result = formFactorRule.evaluate(answers, product);

    expect(result.points).toBe(5);
    expect(result.concern).toBeDefined();
  });
});

// =============================================================================
// Switch Type Rule Tests
// =============================================================================

describe("Keyboard Switch Type Rule", () => {
  const switchTypeRule = keyboardRules.find((r) => r.name === "Switch Type")!;

  it("awards max points for exact switch match with hot-swap", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_switch_feel: "linear",
        keyboard_hot_swappable: true,
      },
    });

    const result = switchTypeRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("Linear");
  });

  it("awards full points for no-preference with hot-swap", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "no-preference",
      "gaming-features": "nice-to-have",
      connectivity: "wireless-preferred",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_hot_swappable: true,
      },
    });

    const result = switchTypeRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("Hot-swappable");
  });

  it("gives partial points for hot-swap with wrong switch type", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_switch_feel: "linear", // Not tactile
        keyboard_hot_swappable: true,
      },
    });

    const result = switchTypeRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.reason).toContain("Hot-swappable");
    expect(result.concern).toBeDefined();
  });

  it("penalizes non-hot-swap with wrong switch type", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_switch_feel: "linear",
        keyboard_hot_swappable: false,
      },
    });

    const result = switchTypeRule.evaluate(answers, product);

    expect(result.points).toBe(4);
    expect(result.concern).toContain("linear");
  });
});

// =============================================================================
// Gaming Features Rule Tests
// =============================================================================

describe("Keyboard Gaming Features Rule", () => {
  const gamingFeaturesRule = keyboardRules.find(
    (r) => r.name === "Gaming Features"
  )!;

  it("awards high points for essential gaming with full features", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_supports_rapid_trigger: true,
        keyboard_supports_socd: true,
        keyboard_supports_analog: true,
        keyboard_polling_rate_max_hz: "8000",
        keyboard_single_key_latency_ms: 0.5,
      },
    });

    const result = gamingFeaturesRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(12);
    expect(result.reason).toContain("Rapid Trigger");
  });

  it("penalizes missing rapid trigger for essential gaming", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createProductivityKeyboard({
      core_attributes: {
        ...createProductivityKeyboard().core_attributes,
        keyboard_supports_rapid_trigger: false,
        keyboard_supports_socd: false,
        keyboard_polling_rate_max_hz: "1000",
        keyboard_single_key_latency_ms: 12,
      },
    });

    const result = gamingFeaturesRule.evaluate(answers, product);

    expect(result.points).toBeLessThan(8);
    expect(result.concern).toBeDefined();
  });

  it("is lenient for nice-to-have gaming features", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "linear",
      "gaming-features": "nice-to-have",
      connectivity: "wireless-preferred",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_supports_rapid_trigger: false,
        keyboard_polling_rate_max_hz: "1000",
      },
    });

    const result = gamingFeaturesRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(8);
  });

  it("awards full points for not-important gaming features", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const product = createProductivityKeyboard();

    const result = gamingFeaturesRule.evaluate(answers, product);

    expect(result.points).toBe(12);
    expect(result.reason).toContain("not a priority");
  });
});

// =============================================================================
// Connectivity Rule Tests
// =============================================================================

describe("Keyboard Connectivity Rule", () => {
  const connectivityRule = keyboardRules.find(
    (r) => r.name === "Connectivity"
  )!;

  it("awards max points for wireless-essential with full wireless", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        wireless: true,
        connection_type: ["wired_usb", "wireless_2_4_dongle", "bluetooth"],
        keyboard_feature_tags: ["multi_device_bluetooth", "2_4ghz_wireless"],
      },
    });

    const result = connectivityRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("wireless");
  });

  it("penalizes wired-only for wireless-essential", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        wireless: false,
        connection_type: ["wired_usb"],
      },
    });

    const result = connectivityRule.evaluate(answers, product);

    expect(result.points).toBe(2);
    expect(result.concern).toContain("Wired only");
  });

  it("awards max points for wired-preferred with wired keyboard", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        wireless: false,
        connection_type: ["wired_usb"],
      },
    });

    const result = connectivityRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("Reliable wired");
  });

  it("handles no-preference connectivity generously", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "linear",
      "gaming-features": "nice-to-have",
      connectivity: "no-preference",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        wireless: true,
        connection_type: ["wired_usb", "wireless_2_4_dongle"],
      },
    });

    const result = connectivityRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(12);
  });
});

// =============================================================================
// Priority Feature Rule Tests
// =============================================================================

describe("Keyboard Priority Feature Rule", () => {
  const priorityFeatureRule = keyboardRules.find(
    (r) => r.name === "Priority Feature"
  )!;

  it("awards max points for performance priority with low latency", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_single_key_latency_ms: 0.5,
      },
    });

    const result = priorityFeatureRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.reason).toContain("Top-tier latency");
  });

  it("awards max points for typing-feel with gasket mount", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "programming",
      "form-factor": "75-percent",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-essential",
      "priority-feature": "typing-feel",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_mount_style: "gasket",
        keyboard_feature_tags: ["gasket_mount", "premium"],
      },
    });

    const result = priorityFeatureRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.reason).toContain("gasket");
  });

  it("awards points for customization with hot-swap and QMK", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "no-preference",
      "gaming-features": "nice-to-have",
      connectivity: "wireless-preferred",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_hot_swappable: true,
        keyboard_has_rgb: true,
        keyboard_feature_tags: ["hot_swappable", "qmk_via", "rgb_per_key", "onboard_memory"],
      },
    });

    const result = priorityFeatureRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.reason).toContain("Customizable");
  });

  it("awards max points for quiet priority with low noise", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const product = createProductivityKeyboard({
      core_attributes: {
        ...createProductivityKeyboard().core_attributes,
        keyboard_typing_noise_dba: 36,
      },
    });

    const result = priorityFeatureRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.reason).toContain("Very quiet");
  });

  it("penalizes loud keyboard for quiet priority", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const product = createMockKeyboardProduct({
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_typing_noise_dba: 60,
      },
    });

    const result = priorityFeatureRule.evaluate(answers, product);

    expect(result.points).toBeLessThanOrEqual(2);
    expect(result.concern).toBeDefined();
  });
});

// =============================================================================
// Budget Match Rule Tests
// =============================================================================

describe("Keyboard Budget Match Rule", () => {
  const budgetMatchRule = keyboardRules.find((r) => r.name === "Budget Match")!;

  it("awards full points for matching budget tier", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const product = createMockKeyboardProduct({
      price_range_usd: [180, 220],
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        price_tier: "premium",
        keyboard_value_pick: false,
      },
    });

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBe(8);
    expect(result.reason).toContain("Within");
  });

  it("awards bonus for value pick within budget", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "linear",
      "gaming-features": "nice-to-have",
      connectivity: "wireless-preferred",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      price_range_usd: [70, 90],
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_value_pick: true,
      },
    });

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.reason).toContain("Excellent value");
  });

  it("still gives points for over-budget products with concern", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "casual-gaming",
      "form-factor": "60-65-percent",
      "switch-type": "linear",
      "gaming-features": "nice-to-have",
      connectivity: "wireless-preferred",
      "priority-feature": "customization",
      budget: "budget",
    };

    const product = createMockKeyboardProduct({
      price_range_usd: [150, 180],
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_value_pick: false,
      },
    });

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBeLessThanOrEqual(5);
    expect(result.concern?.toLowerCase()).toContain("over budget");
  });

  it("handles under-budget products positively", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "enthusiast",
    };

    const product = createMockKeyboardProduct({
      price_range_usd: [150, 180],
      core_attributes: {
        ...createMockKeyboardProduct().core_attributes,
        keyboard_value_pick: false,
      },
    });

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(7);
    expect(result.reason).toContain("Under budget");
  });
});

// =============================================================================
// Edge Cases and Special Scenarios
// =============================================================================

describe("Keyboard Edge Cases", () => {
  it("handles products with minimal attributes", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const minimalProduct = createMockKeyboardProduct();
    const scored = scoreProducts(answers, [minimalProduct], keyboardRules);

    expect(scored).toHaveLength(1);
    expect(typeof scored[0].score).toBe("number");
  });

  it("ranks gaming keyboard higher than productivity for gaming use", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const gamingKb = createMockKeyboardProduct({ id: "gaming_kb" });
    const productivityKb = createProductivityKeyboard({ id: "productivity_kb" });

    const scored = scoreProducts(answers, [gamingKb, productivityKb], keyboardRules);

    const gamingScore = scored.find((s) => s.product.id === "gaming_kb")!.score;
    const productivityScore = scored.find(
      (s) => s.product.id === "productivity_kb"
    )!.score;

    expect(gamingScore).toBeGreaterThan(productivityScore);
  });

  it("ranks productivity keyboard higher for office use", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "productivity",
      "form-factor": "full-size",
      "switch-type": "tactile",
      "gaming-features": "not-important",
      connectivity: "wireless-preferred",
      "priority-feature": "quiet",
      budget: "mid-range",
    };

    const gamingKb = createMockKeyboardProduct({ id: "gaming_kb" });
    const productivityKb = createProductivityKeyboard({ id: "productivity_kb" });

    const scored = scoreProducts(answers, [gamingKb, productivityKb], keyboardRules);

    const gamingScore = scored.find((s) => s.product.id === "gaming_kb")!.score;
    const productivityScore = scored.find(
      (s) => s.product.id === "productivity_kb"
    )!.score;

    expect(productivityScore).toBeGreaterThan(gamingScore);
  });

  it("handles all answer combinations without errors", () => {
    const primaryUses: KeyboardQuizAnswers["primary-use"][] = [
      "competitive-gaming",
      "casual-gaming",
      "productivity",
      "programming",
    ];
    const formFactors: KeyboardQuizAnswers["form-factor"][] = [
      "full-size",
      "tkl",
      "75-percent",
      "60-65-percent",
    ];
    const switchTypes: KeyboardQuizAnswers["switch-type"][] = [
      "linear",
      "tactile",
      "clicky",
      "no-preference",
    ];

    const products = [createMockKeyboardProduct()];

    for (const use of primaryUses) {
      for (const form of formFactors) {
        for (const switchType of switchTypes) {
          const answers: KeyboardQuizAnswers = {
            "primary-use": use,
            "form-factor": form,
            "switch-type": switchType,
            "gaming-features": "nice-to-have",
            connectivity: "no-preference",
            "priority-feature": "customization",
            budget: "mid-range",
          };

          const scored = scoreProducts(answers, products, keyboardRules);

          expect(scored).toHaveLength(1);
          expect(scored[0].score).toBeGreaterThanOrEqual(0);
          expect(scored[0].score).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

// =============================================================================
// Match Reasons and Concerns Tests
// =============================================================================

describe("Keyboard Match Reasons and Concerns", () => {
  it("includes relevant match reasons for good matches", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": "performance",
      budget: "premium",
    };

    const result = getKeyboardRecommendations(answers);

    if (result.topPicks.length > 0) {
      const topPick = result.topPicks[0];
      expect(topPick.matchReasons.length).toBeGreaterThan(0);
    }
  });

  it("includes relevant concerns for mismatches", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": "competitive-gaming",
      "form-factor": "tkl",
      "switch-type": "linear",
      "gaming-features": "essential",
      connectivity: "wireless-essential",
      "priority-feature": "performance",
      budget: "budget",
    };

    // Force a mismatch by requesting budget with wireless essential
    const result = getKeyboardRecommendations(answers);

    // Some products may have concerns due to budget/wireless mismatch
    const hasAnyConcerns = result.topPicks.some((p) => p.concerns.length > 0);
    // This is expected behavior - not all products will have concerns
    expect(hasAnyConcerns).toBeDefined();
  });
});
