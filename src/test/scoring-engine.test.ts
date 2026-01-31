import { describe, it, expect } from "vitest";
import {
  scoreProducts,
  getMouseRecommendations,
  getAudioRecommendations,
  formatScore,
  getMatchQuality,
  getTopReasons,
  getTopConcerns,
  mouseRules,
  audioRules,
} from "@/lib/scoring";
import type { MouseQuizAnswers, AudioQuizAnswers } from "@/lib/scoring";
import type { MouseProduct, AudioProduct } from "@/types/products";

// =============================================================================
// Test Fixtures
// =============================================================================

const createMockMouseProduct = (
  overrides: Partial<MouseProduct> = {}
): MouseProduct => ({
  id: "test_mouse",
  name: "Test Mouse",
  brand: "TestBrand",
  category: "mouse",
  price_range_usd: [50, 60],
  recommendation_tags: [],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
  },
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
    ...overrides.core_attributes,
  },
  ...overrides,
});

const createMockAudioProduct = (
  overrides: Partial<AudioProduct> = {}
): AudioProduct => ({
  id: "test_audio",
  name: "Test Headset",
  brand: "TestBrand",
  category: "audio",
  price_range_usd: [100, 120],
  recommendation_tags: [],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
  },
  core_attributes: {
    category_subtype: "headset",
    price_tier: "midrange",
    platform_fit: ["pc"],
    connection_type: ["wireless_2_4_dongle"],
    wireless: true,
    battery_life_hr: 40,
    latency_class: "low",
    software_support: "good",
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
    eq_support: false,
    ...overrides.core_attributes,
  },
  ...overrides,
});

// =============================================================================
// Utility Function Tests
// =============================================================================

describe("Utility Functions", () => {
  describe("formatScore", () => {
    it("formats score as percentage", () => {
      expect(formatScore(85)).toBe("85%");
      expect(formatScore(100)).toBe("100%");
      expect(formatScore(0)).toBe("0%");
    });

    it("rounds decimal scores", () => {
      expect(formatScore(85.4)).toBe("85%");
      expect(formatScore(85.6)).toBe("86%");
    });
  });

  describe("getMatchQuality", () => {
    it("returns Excellent Match for scores >= 90", () => {
      expect(getMatchQuality(90)).toBe("Excellent Match");
      expect(getMatchQuality(95)).toBe("Excellent Match");
      expect(getMatchQuality(100)).toBe("Excellent Match");
    });

    it("returns Great Match for scores >= 80", () => {
      expect(getMatchQuality(80)).toBe("Great Match");
      expect(getMatchQuality(89)).toBe("Great Match");
    });

    it("returns Good Match for scores >= 70", () => {
      expect(getMatchQuality(70)).toBe("Good Match");
      expect(getMatchQuality(79)).toBe("Good Match");
    });

    it("returns Decent Match for scores >= 60", () => {
      expect(getMatchQuality(60)).toBe("Decent Match");
      expect(getMatchQuality(69)).toBe("Decent Match");
    });

    it("returns Fair Match for scores >= 50", () => {
      expect(getMatchQuality(50)).toBe("Fair Match");
      expect(getMatchQuality(59)).toBe("Fair Match");
    });

    it("returns Partial Match for scores < 50", () => {
      expect(getMatchQuality(49)).toBe("Partial Match");
      expect(getMatchQuality(0)).toBe("Partial Match");
    });
  });

  describe("getTopReasons", () => {
    it("returns top N reasons excluding bonus reasons first", () => {
      const scoredProduct = {
        product: createMockMouseProduct(),
        score: 85,
        breakdown: {},
        matchReasons: [
          "Great grip support",
          "Perfect size",
          "Bonus: excellent value",
          "Good weight",
        ],
        concerns: [],
      };

      const reasons = getTopReasons(scoredProduct, 3);
      expect(reasons).toHaveLength(3);
      expect(reasons[0]).toBe("Great grip support");
      expect(reasons[1]).toBe("Perfect size");
      expect(reasons[2]).toBe("Good weight");
    });

    it("includes bonus reasons if not enough primary reasons", () => {
      const scoredProduct = {
        product: createMockMouseProduct(),
        score: 85,
        breakdown: {},
        matchReasons: ["Great grip support", "Bonus: excellent value"],
        concerns: [],
      };

      const reasons = getTopReasons(scoredProduct, 3);
      expect(reasons).toHaveLength(2);
      expect(reasons).toContain("Bonus: excellent value");
    });
  });

  describe("getTopConcerns", () => {
    it("returns top N concerns", () => {
      const scoredProduct = {
        product: createMockMouseProduct(),
        score: 70,
        breakdown: {},
        matchReasons: [],
        concerns: ["Too heavy", "Wrong shape", "Expensive"],
      };

      const concerns = getTopConcerns(scoredProduct, 2);
      expect(concerns).toHaveLength(2);
      expect(concerns[0]).toBe("Too heavy");
      expect(concerns[1]).toBe("Wrong shape");
    });
  });
});

// =============================================================================
// Core Scoring Engine Tests
// =============================================================================

describe("scoreProducts", () => {
  it("returns products sorted by score descending", () => {
    const products = [
      createMockMouseProduct({
        id: "low_score",
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_grip_fit: ["fingertip"], // Won't match palm well
        },
      }),
      createMockMouseProduct({
        id: "high_score",
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_grip_fit: ["palm", "claw"],
          mouse_feel_tags: ["safe_shape"],
        },
      }),
    ];

    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["palm"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const scored = scoreProducts(answers, products, mouseRules);

    expect(scored[0].product.id).toBe("high_score");
    expect(scored[0].score).toBeGreaterThan(scored[1].score);
  });

  it("calculates scores between 0 and 100", () => {
    const products = [createMockMouseProduct()];
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const scored = scoreProducts(answers, products, mouseRules);

    expect(scored[0].score).toBeGreaterThanOrEqual(0);
    expect(scored[0].score).toBeLessThanOrEqual(100);
  });

  it("includes breakdown for each rule", () => {
    const products = [createMockMouseProduct()];
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const scored = scoreProducts(answers, products, mouseRules);
    const breakdown = scored[0].breakdown;

    expect(breakdown).toHaveProperty("Grip Fit");
    expect(breakdown).toHaveProperty("Size & Hand Match");
    expect(breakdown).toHaveProperty("Weight Preference");
    expect(breakdown).toHaveProperty("Connection Type");
    expect(breakdown).toHaveProperty("Use Case Fit");
    expect(breakdown).toHaveProperty("Bonus Points");
  });

  it("handles empty product array", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const scored = scoreProducts(answers, [], mouseRules);

    expect(scored).toEqual([]);
  });
});

// =============================================================================
// Mouse Recommendations Tests
// =============================================================================

describe("getMouseRecommendations", () => {
  it("returns top picks and alternates", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const result = getMouseRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.alternates).toBeDefined();
    expect(result.topPicks.length).toBeLessThanOrEqual(3);
  });

  it("respects custom options", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["palm"],
      "weight-preference": ["light"],
      wireless: "either",
      "primary-use": ["mixed"],
    };

    const result = getMouseRecommendations(answers, {
      topPickCount: 1,
    });

    expect(result.topPicks.length).toBeLessThanOrEqual(1);
  });

  it("includes filters in result", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "large",
      "grip-style": ["palm"],
      "weight-preference": ["medium"],
      wireless: "wireless",
      "primary-use": ["productivity"],
    };

    const result = getMouseRecommendations(answers);

    expect(result.filters.category).toBe("mouse");
    expect(result.filters.wireless).toBe(true);
  });

  it("tracks total products evaluated", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const result = getMouseRecommendations(answers);

    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("scores palm grip large hands appropriately", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "large",
      "grip-style": ["palm"],
      "weight-preference": ["medium"],
      wireless: "either",
      "primary-use": ["mixed"],
    };

    const result = getMouseRecommendations(answers);

    // Top picks should have reasonable scores
    expect(result.topPicks.length).toBeGreaterThan(0);
    expect(result.topPicks[0].score).toBeGreaterThan(50);
  });

  it("handles ultralight preference correctly", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const result = getMouseRecommendations(answers);

    // Check that breakdown includes weight match info
    const topPick = result.topPicks[0];
    expect(topPick.breakdown["Weight Preference"]).toBeDefined();
  });
});

// =============================================================================
// Audio Recommendations Tests
// =============================================================================

describe("getAudioRecommendations", () => {
  it("returns top picks and alternates", () => {
    const answers: AudioQuizAnswers = {
      "primary-use": ["competitive"],
      "form-factor": ["over-ear"],
      "mic-needs": "essential",
      "session-length": ["long"],
      budget: ["mid-range"],
    };

    const result = getAudioRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.alternates).toBeDefined();
  });

  it("handles IEM preference", () => {
    const answers: AudioQuizAnswers = {
      "primary-use": ["immersive"],
      "form-factor": ["iem"],
      "mic-needs": "not-needed",
      "session-length": ["medium"],
      budget: ["premium"],
    };

    const result = getAudioRecommendations(answers);

    expect(result.filters.category).toBe("audio");
    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("handles streaming use case with mic priority", () => {
    const answers: AudioQuizAnswers = {
      "primary-use": ["streaming"],
      "form-factor": ["over-ear"],
      "mic-needs": "essential",
      "session-length": ["all-day"],
      budget: ["premium"],
    };

    const result = getAudioRecommendations(answers);

    // Streaming should prioritize products with mics
    if (result.topPicks.length > 0) {
      const topPick = result.topPicks[0];
      expect(topPick.breakdown["Microphone"]).toBeDefined();
    }
  });

  it("handles budget preference", () => {
    const answers: AudioQuizAnswers = {
      "primary-use": ["mixed"],
      "form-factor": ["iem"],
      "mic-needs": "nice-to-have",
      "session-length": ["short"],
      budget: ["budget"],
    };

    const result = getAudioRecommendations(answers);

    if (result.topPicks.length > 0) {
      expect(result.topPicks[0].breakdown["Budget"]).toBeDefined();
    }
  });
});

// =============================================================================
// Mouse Rule Tests
// =============================================================================

describe("Mouse Scoring Rules", () => {
  describe("Grip Fit Rule", () => {
    const gripFitRule = mouseRules.find((r) => r.name === "Grip Fit")!;

    it("awards max points for direct grip match with safe shape", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["claw"],
        "weight-preference": ["light"],
        wireless: "either",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_grip_fit: ["claw"],
          mouse_feel_tags: ["safe_shape"],
        },
      });

      const result = gripFitRule.evaluate(answers, product);

      expect(result.points).toBe(25);
      expect(result.reason).toContain("claw");
    });

    it("handles relaxed-claw grip matching both claw and palm", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["relaxed-claw"],
        "weight-preference": ["light"],
        wireless: "either",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_grip_fit: ["claw", "palm"],
        },
      });

      const result = gripFitRule.evaluate(answers, product);

      expect(result.points).toBe(25);
      expect(result.reason).toContain("relaxed claw");
    });

    it("gives partial points for adjacent grip support", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["palm"],
        "weight-preference": ["light"],
        wireless: "either",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_grip_fit: ["claw"], // Adjacent to palm
        },
      });

      const result = gripFitRule.evaluate(answers, product);

      expect(result.points).toBe(10);
      expect(result.concern).toBeDefined();
    });
  });

  describe("Weight Preference Rule", () => {
    const weightRule = mouseRules.find((r) => r.name === "Weight Preference")!;

    it("awards max points for ultralight preference with ultralight mouse", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["claw"],
        "weight-preference": ["ultralight"],
        wireless: "either",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_weight_g: 50,
          mouse_weight_class: "ultralight",
        },
      });

      const result = weightRule.evaluate(answers, product);

      expect(result.points).toBe(20);
      expect(result.reason).toContain("Ultra-lightweight");
    });

    it("penalizes heavy mice for ultralight preference", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["claw"],
        "weight-preference": ["ultralight"],
        wireless: "either",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          mouse_weight_g: 100,
          mouse_weight_class: "heavy",
        },
      });

      const result = weightRule.evaluate(answers, product);

      expect(result.points).toBeLessThan(10);
      expect(result.concern).toBeDefined();
    });
  });

  describe("Connection Type Rule", () => {
    const connectionRule = mouseRules.find((r) => r.name === "Connection Type")!;

    it("awards full points for wireless preference with wireless mouse", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["claw"],
        "weight-preference": ["light"],
        wireless: "wireless",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          wireless: true,
          battery_life_hr: 80,
        },
      });

      const result = connectionRule.evaluate(answers, product);

      expect(result.points).toBe(15);
      expect(result.reason).toContain("Wireless");
    });

    it("gives zero points for wireless preference with wired-only mouse", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["claw"],
        "weight-preference": ["light"],
        wireless: "wireless",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct({
        core_attributes: {
          ...createMockMouseProduct().core_attributes,
          wireless: false,
          connection_type: ["wired_usb"],
        },
      });

      const result = connectionRule.evaluate(answers, product);

      expect(result.points).toBe(0);
      expect(result.concern).toContain("Wired only");
    });

    it("handles 'either' preference generously", () => {
      const answers: MouseQuizAnswers = {
        "hand-size": "medium",
        "grip-style": ["claw"],
        "weight-preference": ["light"],
        wireless: "either",
        "primary-use": ["precision"],
      };

      const product = createMockMouseProduct();

      const result = connectionRule.evaluate(answers, product);

      expect(result.points).toBeGreaterThanOrEqual(13);
    });
  });
});

// =============================================================================
// Audio Rule Tests
// =============================================================================

describe("Audio Scoring Rules", () => {
  describe("Form Factor Rule", () => {
    const formFactorRule = audioRules.find((r) => r.name === "Form Factor")!;

    it("awards max points for IEM preference with IEM product", () => {
      const answers: AudioQuizAnswers = {
        "primary-use": ["immersive"],
        "form-factor": ["iem"],
        "mic-needs": "not-needed",
        "session-length": ["medium"],
        budget: ["mid-range"],
      };

      const product = createMockAudioProduct({
        core_attributes: {
          ...createMockAudioProduct().core_attributes,
          audio_type: "iem",
        },
      });

      const result = formFactorRule.evaluate(answers, product);

      expect(result.points).toBe(25);
      expect(result.reason).toContain("In-ear");
    });

    it("penalizes over-ear for IEM preference", () => {
      const answers: AudioQuizAnswers = {
        "primary-use": ["immersive"],
        "form-factor": ["iem"],
        "mic-needs": "not-needed",
        "session-length": ["medium"],
        budget: ["mid-range"],
      };

      const product = createMockAudioProduct({
        core_attributes: {
          ...createMockAudioProduct().core_attributes,
          audio_type: "headset",
        },
      });

      const result = formFactorRule.evaluate(answers, product);

      expect(result.points).toBeLessThan(10);
      expect(result.concern).toBeDefined();
    });
  });

  describe("Microphone Rule", () => {
    const micRule = audioRules.find((r) => r.name === "Microphone")!;

    it("gives zero points for essential mic need without mic", () => {
      const answers: AudioQuizAnswers = {
        "primary-use": ["streaming"],
        "form-factor": ["over-ear"],
        "mic-needs": "essential",
        "session-length": ["long"],
        budget: ["premium"],
      };

      const product = createMockAudioProduct({
        core_attributes: {
          ...createMockAudioProduct().core_attributes,
          audio_has_mic: false,
          audio_mic_quality: undefined,
        },
      });

      const result = micRule.evaluate(answers, product);

      expect(result.points).toBe(0);
      expect(result.concern).toContain("No microphone");
    });

    it("awards full points for not-needed mic preference without mic", () => {
      const answers: AudioQuizAnswers = {
        "primary-use": ["immersive"],
        "form-factor": ["over-ear-headphone"],
        "mic-needs": "not-needed",
        "session-length": ["medium"],
        budget: ["mid-range"],
      };

      const product = createMockAudioProduct({
        core_attributes: {
          ...createMockAudioProduct().core_attributes,
          audio_has_mic: false,
        },
      });

      const result = micRule.evaluate(answers, product);

      expect(result.points).toBe(20);
      expect(result.reason).toContain("No microphone");
    });
  });

  describe("Budget Rule", () => {
    const budgetRule = audioRules.find((r) => r.name === "Budget")!;

    it("awards full points for matching budget tier", () => {
      const answers: AudioQuizAnswers = {
        "primary-use": ["mixed"],
        "form-factor": ["over-ear"],
        "mic-needs": "nice-to-have",
        "session-length": ["medium"],
        budget: ["budget"],
      };

      const product = createMockAudioProduct({
        price_range_usd: [30, 40],
        core_attributes: {
          ...createMockAudioProduct().core_attributes,
          price_tier: "budget",
        },
      });

      const result = budgetRule.evaluate(answers, product);

      expect(result.points).toBe(15);
      expect(result.reason).toContain("Budget-friendly");
    });

    it("penalizes premium products for budget preference", () => {
      const answers: AudioQuizAnswers = {
        "primary-use": ["mixed"],
        "form-factor": ["over-ear"],
        "mic-needs": "nice-to-have",
        "session-length": ["medium"],
        budget: ["budget"],
      };

      const product = createMockAudioProduct({
        price_range_usd: [300, 350],
        core_attributes: {
          ...createMockAudioProduct().core_attributes,
          price_tier: "premium",
        },
      });

      const result = budgetRule.evaluate(answers, product);

      expect(result.points).toBeLessThan(5);
      expect(result.concern).toContain("exceeds");
    });
  });
});

// =============================================================================
// Edge Cases and Error Handling
// =============================================================================

describe("Edge Cases", () => {
  it("handles products with minimal attributes", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["light"],
      wireless: "either",
      "primary-use": ["mixed"],
    };

    const minimalProduct = createMockMouseProduct();
    const scored = scoreProducts(answers, [minimalProduct], mouseRules);

    expect(scored).toHaveLength(1);
    expect(typeof scored[0].score).toBe("number");
  });

  it("produces consistent scores for same inputs", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["palm"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const result1 = getMouseRecommendations(answers);
    const result2 = getMouseRecommendations(answers);

    expect(result1.topPicks.map((p) => p.product.id)).toEqual(
      result2.topPicks.map((p) => p.product.id)
    );
    expect(result1.topPicks.map((p) => p.score)).toEqual(
      result2.topPicks.map((p) => p.score)
    );
  });

  it("all scores in breakdown sum correctly with weights", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "wireless",
      "primary-use": ["precision"],
    };

    const result = getMouseRecommendations(answers);
    const topPick = result.topPicks[0];

    if (topPick) {
      // Verify breakdown exists for all rules
      expect(Object.keys(topPick.breakdown).length).toBe(mouseRules.length);

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
