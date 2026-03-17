import { describe, it, expect } from "vitest";
import {
  gripFitRule,
  sizeHandMatchRule,
  weightPreferenceRule,
  connectionTypeRule,
  useCaseFitRule,
  bonusPointsRule,
  handednessRule,
  shapeProfileRule,
  gamingGenreRule,
  buttonNeedsRule,
  mouseRules,
} from "@/lib/scoring/mouse-rules";
import type { MouseQuizAnswers } from "@/lib/scoring/types";
import type { MouseProduct } from "@/types/products";

// =============================================================================
// Test Fixtures
// =============================================================================

const createMockMouseProduct = (
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
    mouse_click_latency_ms: 2,
    mouse_sensor_latency_ms: 1,
    mouse_build_quality: "good",
    mouse_feet_quality: "good",
    mouse_coating: "matte",
    mouse_feel_tags: ["safe_shape"],
    mouse_value_pick: false,
    ...overrides,
  },
});

const baseAnswers: MouseQuizAnswers = {
  "hand-size": "medium",
  "grip-style": ["claw"],
  "weight-preference": ["ultralight"],
  wireless: "wireless",
  "primary-use": ["precision"],
};

// =============================================================================
// Grip Fit Rule Tests
// =============================================================================

describe("gripFitRule", () => {
  it("gives 25 points for direct grip + safe shape", () => {
    const product = createMockMouseProduct({ mouse_grip_fit: ["claw"], mouse_feel_tags: ["safe_shape"] });
    const result = gripFitRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(25);
  });

  it("gives 22 points for direct grip without safe shape", () => {
    const product = createMockMouseProduct({ mouse_grip_fit: ["claw"], mouse_feel_tags: [] });
    const result = gripFitRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(22);
  });

  it("gives 10 points for adjacent grip", () => {
    const answers = { ...baseAnswers, "grip-style": ["palm"] as MouseQuizAnswers["grip-style"] };
    const product = createMockMouseProduct({ mouse_grip_fit: ["claw"], mouse_feel_tags: [] });
    const result = gripFitRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 3 points for no matching or adjacent grip", () => {
    const answers = { ...baseAnswers, "grip-style": ["palm"] as MouseQuizAnswers["grip-style"] };
    const product = createMockMouseProduct({ mouse_grip_fit: ["fingertip"], mouse_feel_tags: [] });
    const result = gripFitRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("handles relaxed-claw with both claw and palm support", () => {
    const answers = { ...baseAnswers, "grip-style": ["relaxed-claw"] as MouseQuizAnswers["grip-style"] };
    const product = createMockMouseProduct({ mouse_grip_fit: ["claw", "palm"] });
    const result = gripFitRule.evaluate(answers, product);
    expect(result.points).toBe(25);
  });

  it("handles relaxed-claw with only claw support", () => {
    const answers = { ...baseAnswers, "grip-style": ["relaxed-claw"] as MouseQuizAnswers["grip-style"] };
    const product = createMockMouseProduct({ mouse_grip_fit: ["claw"], mouse_feel_tags: [] });
    const result = gripFitRule.evaluate(answers, product);
    expect(result.points).toBe(18);
  });

  it("multi-grip selection takes best score", () => {
    const answers = { ...baseAnswers, "grip-style": ["palm", "claw"] as MouseQuizAnswers["grip-style"] };
    const product = createMockMouseProduct({ mouse_grip_fit: ["claw"], mouse_feel_tags: ["safe_shape"] });
    const result = gripFitRule.evaluate(answers, product);
    expect(result.points).toBeGreaterThanOrEqual(22);
  });
});

// =============================================================================
// Size & Hand Match Rule Tests
// =============================================================================

describe("sizeHandMatchRule", () => {
  it("gives 18+ for ideal size match", () => {
    const answers = { ...baseAnswers, "hand-size": "medium" as const };
    const product = createMockMouseProduct({ mouse_size_class: "medium" });
    const result = sizeHandMatchRule.evaluate(answers, product);
    expect(result.points).toBeGreaterThanOrEqual(18);
  });

  it("gives 20 for ideal + hand-friendly tag", () => {
    const answers = { ...baseAnswers, "hand-size": "small" as const };
    const product = createMockMouseProduct({
      mouse_size_class: "small",
      mouse_feel_tags: ["small_hands_friendly"],
    });
    const result = sizeHandMatchRule.evaluate(answers, product);
    expect(result.points).toBe(20);
  });

  it("gives 12 for acceptable size without tag", () => {
    const answers = { ...baseAnswers, "hand-size": "small" as const };
    const product = createMockMouseProduct({ mouse_size_class: "medium", mouse_feel_tags: [] });
    const result = sizeHandMatchRule.evaluate(answers, product);
    expect(result.points).toBe(12);
  });

  it("gives low points for wrong size with no tag", () => {
    const answers = { ...baseAnswers, "hand-size": "small" as const };
    const product = createMockMouseProduct({ mouse_size_class: "large", mouse_feel_tags: [] });
    const result = sizeHandMatchRule.evaluate(answers, product);
    expect(result.points).toBe(4);
  });
});

// =============================================================================
// Weight Preference Rule Tests
// =============================================================================

describe("weightPreferenceRule", () => {
  it("gives 20 for ultralight preference + ultra-low weight mouse", () => {
    const product = createMockMouseProduct({ mouse_weight_g: 50, mouse_weight_class: "ultralight" });
    const result = weightPreferenceRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(20);
  });

  it("gives 18 for ideal weight class match", () => {
    const answers = { ...baseAnswers, "weight-preference": ["light"] as MouseQuizAnswers["weight-preference"] };
    const product = createMockMouseProduct({ mouse_weight_g: 65, mouse_weight_class: "ultralight" });
    const result = weightPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(18);
  });

  it("gives 12 for acceptable weight", () => {
    const product = createMockMouseProduct({ mouse_weight_g: 75, mouse_weight_class: "light" });
    const result = weightPreferenceRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(12);
  });

  it("gives 4 for mismatched weight", () => {
    const product = createMockMouseProduct({ mouse_weight_g: 110, mouse_weight_class: "heavy" });
    const result = weightPreferenceRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(4);
  });

  it("multi-weight preference checks all options", () => {
    const answers = {
      ...baseAnswers,
      "weight-preference": ["ultralight", "light"] as MouseQuizAnswers["weight-preference"],
    };
    const product = createMockMouseProduct({ mouse_weight_g: 70, mouse_weight_class: "light" });
    const result = weightPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(18);
  });
});

// =============================================================================
// Connection Type Rule Tests
// =============================================================================

describe("connectionTypeRule", () => {
  it("gives 15 for wireless preference with wireless mouse", () => {
    const product = createMockMouseProduct({ wireless: true, battery_life_hr: 80 });
    const result = connectionTypeRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(15);
  });

  it("gives 0 for wireless preference with wired-only mouse", () => {
    const product = createMockMouseProduct({ wireless: false, connection_type: ["wired_usb"] });
    const result = connectionTypeRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(0);
  });

  it("gives 15 for wired preference with wired-only mouse", () => {
    const answers = { ...baseAnswers, wireless: "wired" as const };
    const product = createMockMouseProduct({
      wireless: false,
      connection_type: ["wired_usb"],
    });
    const result = connectionTypeRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });

  it("gives 15 for either preference with versatile mouse", () => {
    const answers = { ...baseAnswers, wireless: "either" as const };
    const product = createMockMouseProduct({
      wireless: true,
      connection_type: ["wireless_2_4_dongle", "wired_usb"],
    });
    const result = connectionTypeRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });

  it("gives 13 for either preference with single connection type", () => {
    const answers = { ...baseAnswers, wireless: "either" as const };
    const product = createMockMouseProduct({
      wireless: true,
      connection_type: ["wireless_2_4_dongle"],
    });
    const result = connectionTypeRule.evaluate(answers, product);
    expect(result.points).toBe(13);
  });
});

// =============================================================================
// Handedness Rule Tests
// =============================================================================

describe("handednessRule", () => {
  it("gives 10 for right-hand user with right-handed mouse", () => {
    const answers = { ...baseAnswers, handedness: "right" as const };
    const product = createMockMouseProduct({ mouse_handedness: "right" });
    const result = handednessRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 10 for right-hand user with ambi mouse", () => {
    const answers = { ...baseAnswers, handedness: "right" as const };
    const product = createMockMouseProduct({ mouse_handedness: "ambi" });
    const result = handednessRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 2 for right-hand user with left-handed mouse", () => {
    const answers = { ...baseAnswers, handedness: "right" as const };
    const product = createMockMouseProduct({ mouse_handedness: "ergo_left" });
    const result = handednessRule.evaluate(answers, product);
    expect(result.points).toBe(2);
  });

  it("gives 10 for left-hand user with ambi mouse", () => {
    const answers = { ...baseAnswers, handedness: "left" as const };
    const product = createMockMouseProduct({ mouse_handedness: "ambi" });
    const result = handednessRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 10 for ambidextrous user with ambi mouse", () => {
    const answers = { ...baseAnswers, handedness: "ambidextrous" as const };
    const product = createMockMouseProduct({ mouse_handedness: "ambi" });
    const result = handednessRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 8 when handedness not specified", () => {
    const result = handednessRule.evaluate(baseAnswers, createMockMouseProduct());
    expect(result.points).toBe(8);
  });
});

// =============================================================================
// Shape Profile Rule Tests
// =============================================================================

describe("shapeProfileRule", () => {
  it("gives 5 for matching shape profile", () => {
    const answers = { ...baseAnswers, "shape-profile": ["low_hump"] as MouseQuizAnswers["shape-profile"] };
    const product = createMockMouseProduct({ mouse_shape_profile: "low_hump" });
    const result = shapeProfileRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });

  it("gives 4 when 'any' is selected", () => {
    const answers = { ...baseAnswers, "shape-profile": ["any"] as MouseQuizAnswers["shape-profile"] };
    const result = shapeProfileRule.evaluate(answers, createMockMouseProduct());
    expect(result.points).toBe(4);
  });

  it("gives 3 for similar shape profiles", () => {
    const answers = { ...baseAnswers, "shape-profile": ["ergo_hump"] as MouseQuizAnswers["shape-profile"] };
    const product = createMockMouseProduct({ mouse_shape_profile: "rear_hump" });
    const result = shapeProfileRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("gives 1 for non-matching shape", () => {
    const answers = { ...baseAnswers, "shape-profile": ["ergo_hump"] as MouseQuizAnswers["shape-profile"] };
    const product = createMockMouseProduct({ mouse_shape_profile: "low_hump" });
    const result = shapeProfileRule.evaluate(answers, product);
    expect(result.points).toBe(1);
  });

  it("gives 4 when not specified", () => {
    const result = shapeProfileRule.evaluate(baseAnswers, createMockMouseProduct());
    expect(result.points).toBe(4);
  });
});

// =============================================================================
// Gaming Genre Rule Tests
// =============================================================================

describe("gamingGenreRule", () => {
  it("gives 5 for FPS genre with FPS-fit mouse", () => {
    const answers = { ...baseAnswers, "gaming-genre": ["fps"] as MouseQuizAnswers["gaming-genre"] };
    const product = createMockMouseProduct({ mouse_game_fit: ["fps"] });
    const result = gamingGenreRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });

  it("gives 5 for MMO genre with MMO grid mouse", () => {
    const answers = { ...baseAnswers, "gaming-genre": ["mmo"] as MouseQuizAnswers["gaming-genre"] };
    const product = createMockMouseProduct({
      mouse_game_fit: ["mmo"],
      mouse_button_count_class: "mmo_grid",
    });
    const result = gamingGenreRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });

  it("gives 3 when not specified", () => {
    const result = gamingGenreRule.evaluate(baseAnswers, createMockMouseProduct());
    expect(result.points).toBe(3);
  });

  it("gives 2 for mismatched genre", () => {
    const answers = { ...baseAnswers, "gaming-genre": ["mmo"] as MouseQuizAnswers["gaming-genre"] };
    const product = createMockMouseProduct({
      mouse_game_fit: ["fps"],
      mouse_button_count_class: "low",
    });
    const result = gamingGenreRule.evaluate(answers, product);
    expect(result.points).toBeLessThanOrEqual(3);
  });
});

// =============================================================================
// Button Needs Rule Tests
// =============================================================================

describe("buttonNeedsRule", () => {
  it("gives 5 for matching button preference", () => {
    const answers = { ...baseAnswers, "button-needs": ["standard"] as MouseQuizAnswers["button-needs"] };
    const product = createMockMouseProduct({ mouse_button_count_class: "medium" });
    const result = buttonNeedsRule.evaluate(answers, product);
    expect(result.points).toBe(5);
  });

  it("gives 3 for adjacent button count", () => {
    const answers = { ...baseAnswers, "button-needs": ["standard"] as MouseQuizAnswers["button-needs"] };
    const product = createMockMouseProduct({ mouse_button_count_class: "low" });
    const result = buttonNeedsRule.evaluate(answers, product);
    expect(result.points).toBe(3);
  });

  it("gives 1 for mismatched button needs", () => {
    const answers = { ...baseAnswers, "button-needs": ["mmo_grid"] as MouseQuizAnswers["button-needs"] };
    const product = createMockMouseProduct({ mouse_button_count_class: "low" });
    const result = buttonNeedsRule.evaluate(answers, product);
    expect(result.points).toBe(1);
  });

  it("gives 3 when not specified", () => {
    const result = buttonNeedsRule.evaluate(baseAnswers, createMockMouseProduct());
    expect(result.points).toBe(3);
  });
});

// =============================================================================
// Bonus Points Rule Tests
// =============================================================================

describe("bonusPointsRule", () => {
  it("gives 2 for value pick", () => {
    const product = createMockMouseProduct({ mouse_value_pick: true, mouse_sensor_class: "good", mouse_build_quality: "ok" });
    const result = bonusPointsRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(2);
  });

  it("gives 2 for flagship sensor", () => {
    const product = createMockMouseProduct({ mouse_sensor_class: "flagship", mouse_value_pick: false, mouse_build_quality: "ok" });
    const result = bonusPointsRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(2);
  });

  it("gives 1 for great build quality", () => {
    const product = createMockMouseProduct({ mouse_build_quality: "great", mouse_value_pick: false, mouse_sensor_class: "good" });
    const result = bonusPointsRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(1);
  });

  it("caps at 5 points", () => {
    const product = createMockMouseProduct({
      mouse_value_pick: true,
      mouse_sensor_class: "flagship",
      mouse_build_quality: "great",
    });
    const result = bonusPointsRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(5);
  });

  it("gives 0 for no bonus qualities", () => {
    const product = createMockMouseProduct({
      mouse_value_pick: false,
      mouse_sensor_class: "good",
      mouse_build_quality: "ok",
    });
    const result = bonusPointsRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(0);
  });
});

// =============================================================================
// All Rules Weight Sum
// =============================================================================

describe("mouseRules", () => {
  it("includes all 10 rules", () => {
    expect(mouseRules).toHaveLength(10);
  });

  it("all rules have valid weights", () => {
    for (const rule of mouseRules) {
      expect(rule.weight).toBeGreaterThan(0);
      expect(rule.weight).toBeLessThanOrEqual(1);
    }
  });

  it("all rules have valid maxPoints", () => {
    for (const rule of mouseRules) {
      expect(rule.maxPoints).toBeGreaterThan(0);
    }
  });

  it("weights sum to approximately 1", () => {
    const totalWeight = mouseRules.reduce((sum, r) => sum + r.weight, 0);
    expect(totalWeight).toBeGreaterThan(0.9);
    expect(totalWeight).toBeLessThan(1.15);
  });
});
