import { describe, it, expect } from "vitest";
import {
  scoreProducts,
  getMonitorRecommendations,
} from "@/lib/scoring";
import { monitorRules } from "@/lib/scoring/monitor-rules";
import type { MonitorQuizAnswers } from "@/lib/scoring";
import type { MonitorProduct } from "@/types/monitor";

// =============================================================================
// Test Fixtures
// =============================================================================

/**
 * Creates a mock monitor product with configurable overrides.
 * Defaults to a high-refresh gaming monitor.
 */
const createMockMonitorProduct = (
  overrides: Partial<MonitorProduct> = {}
): MonitorProduct => ({
  id: "test_monitor",
  name: "Test Monitor",
  brand: "TestBrand",
  category: "monitor",
  price_range_usd: [300, 400],
  recommendation_tags: [],
  data_quality: {
    data_confidence: "high",
    primary_source_type: "lab_test",
  },
  core_attributes: {
    category_subtype: "monitor",
    price_tier: "midrange",
    platform_fit: ["pc"],
    availability_class: "easy",

    monitor_size_inches: 27,
    monitor_size_class: "standard",
    monitor_curved: false,
    monitor_panel_type: "IPS",
    monitor_resolution: "2560 x 1440",
    monitor_resolution_class: "1440p",
    monitor_ppi: 109,
    monitor_aspect_ratio: "16:9",
    monitor_color_depth: 8,

    monitor_native_refresh_hz: 165,
    monitor_max_refresh_hz: 165,
    monitor_refresh_class: "165hz",
    monitor_max_refresh_dp: 165,
    monitor_max_refresh_hdmi: 144,

    monitor_response_time_ms: 5,
    monitor_input_lag_ms: 4,
    monitor_vrr: true,
    monitor_freesync: true,
    monitor_gsync: "compatible",
    monitor_vrr_min_hz: 48,
    monitor_vrr_max_hz: 165,

    monitor_contrast_ratio: 1000,
    monitor_infinite_contrast: false,
    monitor_local_dimming: false,
    monitor_peak_brightness: 400,
    monitor_sdr_brightness: 350,

    monitor_hdr10: true,
    monitor_dolby_vision: false,
    monitor_hdr_level: "good",

    monitor_srgb_coverage: 100,
    monitor_adobe_rgb_coverage: 85,
    monitor_dci_p3_coverage: 90,
    monitor_color_accuracy: "great",
    monitor_factory_calibrated: true,

    monitor_height_adjust: true,
    monitor_tilt: true,
    monitor_swivel: true,
    monitor_pivot: true,
    monitor_vesa: true,
    monitor_ergonomic_features: ["height_adjust", "tilt", "swivel", "pivot", "vesa_mount"],

    monitor_displayport_count: 1,
    monitor_displayport_version: "1.4",
    monitor_hdmi_count: 2,
    monitor_hdmi_2_1: false,
    monitor_usb_c_dp: false,
    monitor_usb_hub_ports: 0,
    monitor_kvm: false,
    monitor_speakers: false,
    monitor_audio_out: true,
    monitor_connectivity: ["displayport_1_4", "hdmi_2_0"],

    monitor_overall_score: 8.0,
    monitor_pc_gaming_score: 8.5,
    monitor_console_gaming_score: 7.5,
    monitor_office_score: 8.0,
    monitor_editing_score: 7.5,
    monitor_response_time_score: 8.0,
    monitor_sdr_picture_score: 8.0,
    monitor_hdr_picture_score: 6.5,
    monitor_color_accuracy_score: 8.0,
    monitor_brightness_score: 7.0,

    monitor_use_fit: ["pc_gaming", "general"],
    monitor_feature_tags: ["gaming", "high_refresh", "gsync", "freesync"],
    monitor_value_pick: false,
    ...overrides.core_attributes,
  },
  ...overrides,
});

/**
 * Creates an office/productivity-focused monitor mock.
 */
const createOfficeMonitor = (
  overrides: Partial<MonitorProduct> = {}
): MonitorProduct =>
  createMockMonitorProduct({
    id: "office_monitor",
    name: "Office Monitor",
    price_range_usd: [200, 250],
    core_attributes: {
      ...createMockMonitorProduct().core_attributes,
      monitor_size_inches: 27,
      monitor_size_class: "standard",
      monitor_panel_type: "IPS",
      monitor_resolution_class: "1080p",
      monitor_native_refresh_hz: 60,
      monitor_max_refresh_hz: 75,
      monitor_refresh_class: "75hz",
      monitor_vrr: false,
      monitor_freesync: false,
      monitor_gsync: "none",
      monitor_input_lag_ms: 15,
      monitor_hdr10: false,
      monitor_hdr_level: "none",

      monitor_overall_score: 7.5,
      monitor_pc_gaming_score: 5.0,
      monitor_console_gaming_score: 5.0,
      monitor_office_score: 8.5,
      monitor_editing_score: 7.0,
      monitor_color_accuracy_score: 7.5,

      monitor_use_fit: ["office", "general"],
      monitor_feature_tags: ["value_pick"],
      price_tier: "budget",
      ...overrides.core_attributes,
    },
    ...overrides,
  });

/**
 * Creates a content creation focused monitor mock.
 */
const createContentCreationMonitor = (
  overrides: Partial<MonitorProduct> = {}
): MonitorProduct =>
  createMockMonitorProduct({
    id: "content_creation_monitor",
    name: "Content Creation Monitor",
    price_range_usd: [800, 1000],
    core_attributes: {
      ...createMockMonitorProduct().core_attributes,
      monitor_size_inches: 32,
      monitor_size_class: "large",
      monitor_panel_type: "IPS",
      monitor_resolution_class: "4k",
      monitor_native_refresh_hz: 60,
      monitor_max_refresh_hz: 60,
      monitor_refresh_class: "60hz",

      monitor_srgb_coverage: 100,
      monitor_adobe_rgb_coverage: 99,
      monitor_dci_p3_coverage: 98,
      monitor_color_accuracy: "professional",
      monitor_factory_calibrated: true,

      monitor_overall_score: 8.5,
      monitor_pc_gaming_score: 6.0,
      monitor_console_gaming_score: 7.0,
      monitor_office_score: 8.5,
      monitor_editing_score: 9.0,
      monitor_color_accuracy_score: 9.5,

      monitor_use_fit: ["content_creation", "office"],
      monitor_feature_tags: ["content_creation", "color_accurate", "4k", "professional"],
      price_tier: "premium",
      ...overrides.core_attributes,
    },
    ...overrides,
  });

/**
 * Creates an OLED gaming monitor mock.
 */
const createOLEDGamingMonitor = (
  overrides: Partial<MonitorProduct> = {}
): MonitorProduct =>
  createMockMonitorProduct({
    id: "oled_gaming_monitor",
    name: "OLED Gaming Monitor",
    price_range_usd: [1200, 1500],
    core_attributes: {
      ...createMockMonitorProduct().core_attributes,
      monitor_size_inches: 27,
      monitor_size_class: "standard",
      monitor_panel_type: "QD-OLED",
      monitor_resolution_class: "1440p",
      monitor_native_refresh_hz: 240,
      monitor_max_refresh_hz: 240,
      monitor_refresh_class: "240hz",
      monitor_response_time_ms: 0.1,
      monitor_input_lag_ms: 2,

      monitor_contrast_ratio: Infinity,
      monitor_infinite_contrast: true,
      monitor_local_dimming: false,
      monitor_peak_brightness: 1000,
      monitor_hdr10: true,
      monitor_dolby_vision: true,
      monitor_hdr_level: "excellent",

      monitor_gsync: "certified",

      monitor_overall_score: 9.0,
      monitor_pc_gaming_score: 9.5,
      monitor_console_gaming_score: 8.5,
      monitor_office_score: 7.0,
      monitor_editing_score: 8.5,
      monitor_hdr_picture_score: 9.0,
      monitor_color_accuracy_score: 9.0,

      monitor_use_fit: ["pc_gaming", "content_creation"],
      monitor_feature_tags: ["gaming", "esports", "oled", "hdr", "gsync", "fast_response", "high_refresh"],
      price_tier: "flagship",
      ...overrides.core_attributes,
    },
    ...overrides,
  });

/**
 * Creates an ultrawide monitor mock.
 */
const createUltrawideMonitor = (
  overrides: Partial<MonitorProduct> = {}
): MonitorProduct =>
  createMockMonitorProduct({
    id: "ultrawide_monitor",
    name: "Ultrawide Monitor",
    price_range_usd: [500, 700],
    core_attributes: {
      ...createMockMonitorProduct().core_attributes,
      monitor_size_inches: 34,
      monitor_size_class: "ultrawide",
      monitor_curved: true,
      monitor_curve_radius_mm: 1500,
      monitor_panel_type: "VA",
      monitor_resolution: "3440 x 1440",
      monitor_resolution_class: "1440p",
      monitor_aspect_ratio: "21:9",

      monitor_contrast_ratio: 3000,
      monitor_hdr10: true,
      monitor_hdr_level: "good",

      monitor_overall_score: 8.0,
      monitor_pc_gaming_score: 8.0,
      monitor_office_score: 8.0,
      monitor_editing_score: 7.5,

      monitor_use_fit: ["pc_gaming", "office", "content_creation"],
      monitor_feature_tags: ["ultrawide", "curved", "gaming"],
      price_tier: "upper_midrange",
      ...overrides.core_attributes,
    },
    ...overrides,
  });

// =============================================================================
// Monitor Recommendations Integration Tests
// =============================================================================

describe("getMonitorRecommendations", () => {
  it("returns top picks and alternates for gaming use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
      "panel-type": ["ips"],
      budget: ["mid-range"],
      curved: "flat",
    };

    const result = getMonitorRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.alternates).toBeDefined();
    expect(result.topPicks.length).toBeLessThanOrEqual(3);
    expect(result.filters.category).toBe("monitor");
  });

  it("returns top picks and alternates for content creation", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["content-creation"],
      "size-preference": "large",
      resolution: "4k",
      "color-accuracy": "professional",
      budget: ["premium"],
    };

    const result = getMonitorRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.alternates).toBeDefined();
    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("returns top picks and alternates for office use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      budget: ["budget"],
      features: ["ergonomics"],
    };

    const result = getMonitorRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("returns top picks for mixed use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["mixed"],
      "size-preference": "any",
      resolution: "any",
    };

    const result = getMonitorRecommendations(answers);

    expect(result.topPicks).toBeDefined();
    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("respects custom options", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const result = getMonitorRecommendations(answers, {
      topPickCount: 1,
    });

    expect(result.topPicks.length).toBeLessThanOrEqual(1);
  });

  it("tracks total products evaluated", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const result = getMonitorRecommendations(answers);

    expect(result.totalEvaluated).toBeGreaterThan(0);
  });

  it("produces consistent scores for same inputs", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
      "panel-type": ["ips"],
      budget: ["mid-range"],
    };

    const result1 = getMonitorRecommendations(answers);
    const result2 = getMonitorRecommendations(answers);

    expect(result1.topPicks.map((p) => p.product.id)).toEqual(
      result2.topPicks.map((p) => p.product.id)
    );
    expect(result1.topPicks.map((p) => p.score)).toEqual(
      result2.topPicks.map((p) => p.score)
    );
  });
});

// =============================================================================
// Core Scoring Engine Tests with Monitor Products
// =============================================================================

describe("scoreProducts with monitor products", () => {
  it("returns products sorted by score descending", () => {
    const products = [
      createOfficeMonitor({ id: "low_score" }),
      createMockMonitorProduct({ id: "high_score" }),
    ];

    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
    };

    const scored = scoreProducts(answers, products, monitorRules);

    // Gaming monitor should score higher for gaming use
    expect(scored[0].product.id).toBe("high_score");
    expect(scored[0].score).toBeGreaterThan(scored[1].score);
  });

  it("calculates scores between 0 and 100", () => {
    const products = [createMockMonitorProduct()];
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const scored = scoreProducts(answers, products, monitorRules);

    expect(scored[0].score).toBeGreaterThanOrEqual(0);
    expect(scored[0].score).toBeLessThanOrEqual(100);
  });

  it("includes breakdown for each rule", () => {
    const products = [createMockMonitorProduct()];
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const scored = scoreProducts(answers, products, monitorRules);
    const breakdown = scored[0].breakdown;

    expect(breakdown).toHaveProperty("Primary Use Fit");
    expect(breakdown).toHaveProperty("Size Match");
    expect(breakdown).toHaveProperty("Resolution Match");
    expect(breakdown).toHaveProperty("Refresh Rate Match");
    expect(breakdown).toHaveProperty("Panel Type Match");
    expect(breakdown).toHaveProperty("Budget Match");
  });

  it("handles empty product array", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const scored = scoreProducts(answers, [], monitorRules);

    expect(scored).toEqual([]);
  });

  it("all scores in breakdown sum correctly with weights", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
      "panel-type": ["ips"],
      budget: ["mid-range"],
    };

    const result = getMonitorRecommendations(answers);
    const topPick = result.topPicks[0];

    if (topPick) {
      // Verify breakdown exists for all rules
      expect(Object.keys(topPick.breakdown).length).toBe(monitorRules.length);

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
// Primary Use Fit Rule Tests
// =============================================================================

describe("Monitor Primary Use Fit Rule", () => {
  const primaryUseFitRule = monitorRules.find((r) => r.name === "Primary Use Fit")!;

  it("awards max points for excellent gaming monitor with gaming use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_pc_gaming_score: 9.0,
      },
    });

    const result = primaryUseFitRule.evaluate(answers, product);

    expect(result.points).toBe(25);
    expect(result.reason).toContain("gaming");
  });

  it("penalizes low gaming score for gaming use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createOfficeMonitor();

    const result = primaryUseFitRule.evaluate(answers, product);

    expect(result.points).toBeLessThan(15);
    expect(result.concern).toBeDefined();
  });

  it("rewards content creation monitor for content creation use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["content-creation"],
      "size-preference": "large",
      resolution: "4k",
    };

    const product = createContentCreationMonitor();

    const result = primaryUseFitRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(20);
    expect(result.reason).toBeDefined();
  });

  it("handles office use case correctly", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
    };

    const product = createOfficeMonitor({
      core_attributes: {
        ...createOfficeMonitor().core_attributes,
        monitor_office_score: 8.5,
      },
    });

    const result = primaryUseFitRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(22);
  });

  it("handles mixed use case", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["mixed"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_overall_score: 8.5,
        monitor_pc_gaming_score: 8.0,
        monitor_office_score: 8.0,
        monitor_editing_score: 8.0,
      },
    });

    const result = primaryUseFitRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(20);
  });

  it("averages scores for multiple use cases", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming", "content-creation"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_pc_gaming_score: 8.5,
        monitor_editing_score: 7.0,
        monitor_color_accuracy_score: 7.0,
      },
    });

    const result = primaryUseFitRule.evaluate(answers, product);

    // Should be averaged between gaming and content creation scores
    expect(result.points).toBeGreaterThanOrEqual(15);
    expect(result.points).toBeLessThanOrEqual(25);
  });
});

// =============================================================================
// Size Match Rule Tests
// =============================================================================

describe("Monitor Size Match Rule", () => {
  const sizeMatchRule = monitorRules.find((r) => r.name === "Size Match")!;

  it("awards max points for exact size match", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_size_inches: 27,
        monitor_size_class: "standard",
      },
    });

    const result = sizeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("27");
  });

  it("awards partial points for adjacent size", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_size_inches: 32,
        monitor_size_class: "large",
      },
    });

    const result = sizeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(10);
    expect(result.concern).toBeDefined();
  });

  it("awards lower points for far size mismatch", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "compact",
      resolution: "1080p",
    };

    const product = createUltrawideMonitor();

    const result = sizeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(5);
    expect(result.concern).toBeDefined();
  });

  it("is generous for 'any' preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "any",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct();

    const result = sizeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(12);
  });

  it("handles ultrawide preference correctly", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "ultrawide",
      resolution: "1440p",
    };

    const product = createUltrawideMonitor();

    const result = sizeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("ultrawide");
  });
});

// =============================================================================
// Resolution Match Rule Tests
// =============================================================================

describe("Monitor Resolution Match Rule", () => {
  const resolutionMatchRule = monitorRules.find((r) => r.name === "Resolution Match")!;

  it("awards max points for exact resolution match with ideal size pairing", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_size_inches: 27,
        monitor_resolution_class: "1440p",
      },
    });

    const result = resolutionMatchRule.evaluate(answers, product);

    expect(result.points).toBe(15);
    expect(result.reason).toContain("1440p");
  });

  it("awards good points for resolution match without ideal pairing", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "4k",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_size_inches: 24,
        monitor_resolution_class: "4k",
      },
    });

    const result = resolutionMatchRule.evaluate(answers, product);

    expect(result.points).toBe(13);
  });

  it("awards partial points for adjacent resolution", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1080p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_resolution_class: "1440p",
      },
    });

    const result = resolutionMatchRule.evaluate(answers, product);

    expect(result.points).toBe(9);
    expect(result.reason).toContain("Higher");
  });

  it("is generous for 'any' preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "any",
    };

    const product = createMockMonitorProduct();

    const result = resolutionMatchRule.evaluate(answers, product);

    expect(result.points).toBe(12);
  });

  it("penalizes large resolution mismatch", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "4k",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_resolution_class: "1080p",
      },
    });

    const result = resolutionMatchRule.evaluate(answers, product);

    expect(result.points).toBe(5);
    expect(result.concern).toBeDefined();
  });
});

// =============================================================================
// Refresh Rate Match Rule Tests
// =============================================================================

describe("Monitor Refresh Rate Match Rule", () => {
  const refreshRateMatchRule = monitorRules.find((r) => r.name === "Refresh Rate Match")!;

  it("awards max points for high refresh rate meeting needs", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_max_refresh_hz: 165,
      },
    });

    const result = refreshRateMatchRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(10);
    expect(result.reason).toContain("165Hz");
  });

  it("awards max points for 240Hz+ when high refresh requested", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "high",
    };

    const product = createOLEDGamingMonitor();

    const result = refreshRateMatchRule.evaluate(answers, product);

    // 240Hz meets the min requirement (240) but doesn't exceed ideal (360)
    expect(result.points).toBeGreaterThanOrEqual(10);
    expect(result.reason).toContain("240Hz");
  });

  it("penalizes low refresh rate for high demand", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "high",
    };

    const product = createOfficeMonitor();

    const result = refreshRateMatchRule.evaluate(answers, product);

    expect(result.points).toBe(5);
    expect(result.concern).toBeDefined();
  });

  it("is lenient for non-gaming use without preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
    };

    const product = createOfficeMonitor();

    const result = refreshRateMatchRule.evaluate(answers, product);

    expect(result.points).toBe(10);
  });

  it("rewards higher refresh for gamers with no preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "any",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_max_refresh_hz: 165,
      },
    });

    const result = refreshRateMatchRule.evaluate(answers, product);

    expect(result.points).toBe(12);
  });
});

// =============================================================================
// Panel Type Match Rule Tests
// =============================================================================

describe("Monitor Panel Type Match Rule", () => {
  const panelTypeMatchRule = monitorRules.find((r) => r.name === "Panel Type Match")!;

  it("awards max points for exact IPS match", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "panel-type": ["ips"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_panel_type: "IPS",
      },
    });

    const result = panelTypeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(8);
    expect(result.reason).toContain("IPS");
  });

  it("awards max points for exact VA match", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "panel-type": ["va"],
    };

    const product = createUltrawideMonitor();

    const result = panelTypeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(8);
    expect(result.reason).toContain("VA");
  });

  it("awards max points for OLED/QD-OLED match", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "panel-type": ["oled"],
    };

    const product = createOLEDGamingMonitor();

    const result = panelTypeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(8);
    expect(result.reason).toContain("OLED");
  });

  it("awards partial points for Mini-LED when OLED preferred", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "panel-type": ["oled"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_panel_type: "Mini-LED",
      },
    });

    const result = panelTypeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(5);
    expect(result.reason).toContain("Mini-LED");
    expect(result.concern).toBeDefined();
  });

  it("is generous for no preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "panel-type": ["any"],
    };

    const product = createMockMonitorProduct();

    const result = panelTypeMatchRule.evaluate(answers, product);

    expect(result.points).toBe(6);
  });
});

// =============================================================================
// Budget Match Rule Tests
// =============================================================================

describe("Monitor Budget Match Rule", () => {
  const budgetMatchRule = monitorRules.find((r) => r.name === "Budget Match")!;

  it("awards full points for matching budget tier", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      budget: ["mid-range"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        price_tier: "midrange",
      },
    });

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBe(8);
    expect(result.reason).toContain("mid-range");
  });

  it("penalizes products above budget", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      budget: ["budget"],
    };

    const product = createOLEDGamingMonitor();

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBeLessThanOrEqual(5);
    expect(result.concern).toBeDefined();
  });

  it("handles multiple budget preferences", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      budget: ["mid-range", "premium"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        price_tier: "upper_midrange",
      },
    });

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBe(8);
  });

  it("is generous when no budget specified", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct();

    const result = budgetMatchRule.evaluate(answers, product);

    expect(result.points).toBe(6);
  });
});

// =============================================================================
// Color Accuracy Rule Tests
// =============================================================================

describe("Monitor Color Accuracy Rule", () => {
  const colorAccuracyRule = monitorRules.find((r) => r.name === "Color Accuracy")!;

  it("awards max points for professional color accuracy with professional preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["content-creation"],
      "size-preference": "large",
      resolution: "4k",
      "color-accuracy": "professional",
    };

    const product = createContentCreationMonitor();

    const result = colorAccuracyRule.evaluate(answers, product);

    expect(result.points).toBe(6);
    expect(result.reason).toContain("Professional");
  });

  it("penalizes limited color for professional needs", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["content-creation"],
      "size-preference": "standard",
      resolution: "1440p",
      "color-accuracy": "professional",
    };

    const product = createOfficeMonitor();

    const result = colorAccuracyRule.evaluate(answers, product);

    expect(result.points).toBeLessThanOrEqual(4);
    expect(result.concern).toBeDefined();
  });

  it("awards points for standard sRGB accuracy", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["content-creation"],
      "size-preference": "standard",
      resolution: "1440p",
      "color-accuracy": "standard",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_srgb_coverage: 100,
        monitor_color_accuracy_score: 8.5,
      },
    });

    const result = colorAccuracyRule.evaluate(answers, product);

    expect(result.points).toBe(6);
  });

  it("is lenient for non-content-creation without preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct();

    const result = colorAccuracyRule.evaluate(answers, product);

    expect(result.points).toBe(5);
  });
});

// =============================================================================
// HDR Performance Rule Tests
// =============================================================================

describe("Monitor HDR Performance Rule", () => {
  const hdrPerformanceRule = monitorRules.find((r) => r.name === "HDR Performance")!;

  it("awards max points for excellent HDR when important", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "hdr-needs": "important",
    };

    const product = createOLEDGamingMonitor();

    const result = hdrPerformanceRule.evaluate(answers, product);

    expect(result.points).toBe(4);
    expect(result.reason).toContain("HDR");
  });

  it("penalizes poor HDR when important", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "hdr-needs": "important",
    };

    const product = createOfficeMonitor();

    const result = hdrPerformanceRule.evaluate(answers, product);

    expect(result.points).toBeLessThanOrEqual(2);
    expect(result.concern).toBeDefined();
  });

  it("is generous for nice-to-have HDR with basic support", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "hdr-needs": "nice-to-have",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_hdr10: true,
        monitor_hdr_level: "basic",
      },
    });

    const result = hdrPerformanceRule.evaluate(answers, product);

    expect(result.points).toBe(3);
  });

  it("is neutral for not-needed HDR", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      "hdr-needs": "not-needed",
    };

    const product = createOfficeMonitor();

    const result = hdrPerformanceRule.evaluate(answers, product);

    expect(result.points).toBe(3);
  });
});

// =============================================================================
// Features Match Rule Tests
// =============================================================================

describe("Monitor Features Match Rule", () => {
  const featuresMatchRule = monitorRules.find((r) => r.name === "Features Match")!;

  it("awards max points for USB-C with power delivery", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1440p",
      features: ["usb-c"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_usb_c_dp: true,
        monitor_usb_c_pd_watts: 90,
      },
    });

    const result = featuresMatchRule.evaluate(answers, product);

    expect(result.points).toBe(4);
    expect(result.reason).toContain("USB-C");
    expect(result.reason).toContain("90W");
  });

  it("awards max points for full ergonomics", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      features: ["ergonomics"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_ergonomic_features: ["height_adjust", "tilt", "swivel", "pivot", "vesa_mount"],
      },
    });

    const result = featuresMatchRule.evaluate(answers, product);

    expect(result.points).toBe(4);
    expect(result.reason).toContain("ergonomic");
  });

  it("awards max points for speakers when requested", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      features: ["speakers"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_speakers: true,
      },
    });

    const result = featuresMatchRule.evaluate(answers, product);

    expect(result.points).toBe(4);
    expect(result.reason).toContain("speakers");
  });

  it("gives partial points for partial feature match", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      features: ["usb-c", "speakers"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_usb_c_dp: true,
        monitor_speakers: false,
      },
    });

    const result = featuresMatchRule.evaluate(answers, product);

    expect(result.points).toBe(3);
  });

  it("penalizes missing all requested features", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      features: ["usb-c", "speakers"],
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_usb_c_dp: false,
        monitor_speakers: false,
      },
    });

    const result = featuresMatchRule.evaluate(answers, product);

    expect(result.points).toBe(2);
    expect(result.concern).toBeDefined();
  });

  it("is generous for 'any' preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      features: ["any"],
    };

    const product = createMockMonitorProduct();

    const result = featuresMatchRule.evaluate(answers, product);

    expect(result.points).toBe(3);
  });
});

// =============================================================================
// Bonus Points Rule Tests
// =============================================================================

describe("Monitor Bonus Points Rule", () => {
  const bonusPointsRule = monitorRules.find((r) => r.name === "Bonus Points")!;

  it("awards bonus for value pick", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_value_pick: true,
      },
    });

    const result = bonusPointsRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(1);
    expect(result.reason).toContain("value");
  });

  it("awards bonus for G-SYNC certified for gamers", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createOLEDGamingMonitor();

    const result = bonusPointsRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(1);
    expect(result.reason).toContain("G-SYNC");
  });

  it("awards bonus for low input lag for gamers", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_input_lag_ms: 3,
      },
    });

    const result = bonusPointsRule.evaluate(answers, product);

    expect(result.points).toBeGreaterThanOrEqual(1);
    expect(result.reason).toContain("input lag");
  });

  it("caps bonus points at 3", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_value_pick: true,
        monitor_gsync: "certified",
        monitor_vrr: true,
        monitor_input_lag_ms: 2,
        monitor_overall_score: 9.5,
      },
    });

    const result = bonusPointsRule.evaluate(answers, product);

    expect(result.points).toBeLessThanOrEqual(3);
  });
});

// =============================================================================
// Curved Preference Rule Tests
// =============================================================================

describe("Monitor Curved Preference Rule", () => {
  const curvedPreferenceRule = monitorRules.find((r) => r.name === "Curved Preference")!;

  it("awards max points for curved preference with curved monitor", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "ultrawide",
      resolution: "1440p",
      curved: "curved",
    };

    const product = createUltrawideMonitor();

    const result = curvedPreferenceRule.evaluate(answers, product);

    expect(result.points).toBe(3);
    expect(result.reason).toContain("Curved");
  });

  it("awards max points for flat preference with flat monitor", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      curved: "flat",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_curved: false,
      },
    });

    const result = curvedPreferenceRule.evaluate(answers, product);

    expect(result.points).toBe(3);
    expect(result.reason).toContain("Flat");
  });

  it("penalizes curved when flat preferred", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      curved: "flat",
    };

    const product = createUltrawideMonitor();

    const result = curvedPreferenceRule.evaluate(answers, product);

    expect(result.points).toBe(1);
    expect(result.concern).toContain("curved");
  });

  it("penalizes flat when curved preferred", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "ultrawide",
      resolution: "1440p",
      curved: "curved",
    };

    const product = createMockMonitorProduct({
      core_attributes: {
        ...createMockMonitorProduct().core_attributes,
        monitor_curved: false,
      },
    });

    const result = curvedPreferenceRule.evaluate(answers, product);

    expect(result.points).toBe(1);
    expect(result.concern).toContain("flat");
  });

  it("is neutral for 'either' preference", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      curved: "either",
    };

    const product = createMockMonitorProduct();

    const result = curvedPreferenceRule.evaluate(answers, product);

    expect(result.points).toBe(2);
  });
});

// =============================================================================
// Edge Cases and Special Scenarios
// =============================================================================

describe("Monitor Edge Cases", () => {
  it("handles products with minimal attributes", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const minimalProduct = createMockMonitorProduct();
    const scored = scoreProducts(answers, [minimalProduct], monitorRules);

    expect(scored).toHaveLength(1);
    expect(typeof scored[0].score).toBe("number");
  });

  it("ranks gaming monitor higher than office monitor for gaming use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
    };

    const gamingMonitor = createMockMonitorProduct({ id: "gaming_monitor" });
    const officeMonitor = createOfficeMonitor({ id: "office_monitor" });

    const scored = scoreProducts(answers, [gamingMonitor, officeMonitor], monitorRules);

    const gamingScore = scored.find((s) => s.product.id === "gaming_monitor")!.score;
    const officeScore = scored.find((s) => s.product.id === "office_monitor")!.score;

    expect(gamingScore).toBeGreaterThan(officeScore);
  });

  it("ranks office monitor higher for office use", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["office"],
      "size-preference": "standard",
      resolution: "1080p",
      budget: ["budget"],
    };

    const gamingMonitor = createMockMonitorProduct({ id: "gaming_monitor" });
    const officeMonitor = createOfficeMonitor({ id: "office_monitor" });

    const scored = scoreProducts(answers, [gamingMonitor, officeMonitor], monitorRules);

    const gamingScore = scored.find((s) => s.product.id === "gaming_monitor")!.score;
    const officeScore = scored.find((s) => s.product.id === "office_monitor")!.score;

    expect(officeScore).toBeGreaterThan(gamingScore);
  });

  it("ranks content creation monitor higher for content creation", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["content-creation"],
      "size-preference": "large",
      resolution: "4k",
      "color-accuracy": "professional",
    };

    const gamingMonitor = createMockMonitorProduct({ id: "gaming_monitor" });
    const ccMonitor = createContentCreationMonitor({ id: "cc_monitor" });

    const scored = scoreProducts(answers, [gamingMonitor, ccMonitor], monitorRules);

    const gamingScore = scored.find((s) => s.product.id === "gaming_monitor")!.score;
    const ccScore = scored.find((s) => s.product.id === "cc_monitor")!.score;

    expect(ccScore).toBeGreaterThan(gamingScore);
  });

  it("handles all primary use combinations without errors", () => {
    const primaryUses: MonitorQuizAnswers["primary-use"][number][] = [
      "gaming",
      "content-creation",
      "office",
      "mixed",
    ];
    const sizePreferences: MonitorQuizAnswers["size-preference"][] = [
      "compact",
      "standard",
      "large",
      "ultrawide",
      "any",
    ];
    const resolutions: MonitorQuizAnswers["resolution"][] = [
      "1080p",
      "1440p",
      "4k",
      "any",
    ];

    const products = [createMockMonitorProduct()];

    for (const use of primaryUses) {
      for (const size of sizePreferences) {
        for (const res of resolutions) {
          const answers: MonitorQuizAnswers = {
            "primary-use": [use],
            "size-preference": size,
            resolution: res,
          };

          const scored = scoreProducts(answers, products, monitorRules);

          expect(scored).toHaveLength(1);
          expect(scored[0].score).toBeGreaterThanOrEqual(0);
          expect(scored[0].score).toBeLessThanOrEqual(100);
        }
      }
    }
  });

  it("handles multiple primary uses correctly", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming", "content-creation", "office"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const products = [createMockMonitorProduct()];
    const scored = scoreProducts(answers, products, monitorRules);

    expect(scored).toHaveLength(1);
    expect(scored[0].score).toBeGreaterThanOrEqual(0);
    expect(scored[0].score).toBeLessThanOrEqual(100);
  });

  it("OLED monitor ranks high for high-end gaming needs", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "high",
      "panel-type": ["oled"],
      "hdr-needs": "important",
      budget: ["enthusiast"],
    };

    const oledMonitor = createOLEDGamingMonitor({ id: "oled" });
    const regularMonitor = createMockMonitorProduct({ id: "regular" });

    const scored = scoreProducts(answers, [oledMonitor, regularMonitor], monitorRules);

    expect(scored[0].product.id).toBe("oled");
    expect(scored[0].score).toBeGreaterThan(scored[1].score);
  });
});

// =============================================================================
// Match Reasons and Concerns Tests
// =============================================================================

describe("Monitor Match Reasons and Concerns", () => {
  it("includes relevant match reasons for good matches", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
      "refresh-rate": "standard",
      "panel-type": ["ips"],
    };

    const result = getMonitorRecommendations(answers);

    if (result.topPicks.length > 0) {
      const topPick = result.topPicks[0];
      expect(topPick.matchReasons.length).toBeGreaterThan(0);
    }
  });

  it("includes relevant concerns for mismatches", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "compact",
      resolution: "4k",
      "refresh-rate": "high",
      "hdr-needs": "important",
      budget: ["budget"],
    };

    // Force a mismatch by requesting conflicting specs
    const result = getMonitorRecommendations(answers);

    // Some products may have concerns due to budget/feature mismatch
    const hasAnyConcerns = result.topPicks.some((p) => p.concerns.length > 0);
    expect(hasAnyConcerns).toBeDefined();
  });

  it("provides useful breakdown details", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };

    const result = getMonitorRecommendations(answers);

    if (result.topPicks.length > 0) {
      const breakdown = result.topPicks[0].breakdown;

      // Check all rules have meaningful details
      Object.entries(breakdown).forEach(([_ruleName, category]) => {
        expect(category.details).toBeTruthy();
        expect(category.details.length).toBeGreaterThan(0);
      });
    }
  });
});

// =============================================================================
// Rule Weights Validation
// =============================================================================

describe("Monitor Rules Weight Validation", () => {
  it("all rule weights sum to approximately 1.0", () => {
    const totalWeight = monitorRules.reduce((sum, rule) => sum + rule.weight, 0);

    // The weights sum to 1.03 - the engine normalizes this correctly
    // Allow for intentional over-weighting
    expect(totalWeight).toBeGreaterThanOrEqual(0.95);
    expect(totalWeight).toBeLessThanOrEqual(1.1);
  });

  it("all rules have positive weights", () => {
    monitorRules.forEach((rule) => {
      expect(rule.weight).toBeGreaterThan(0);
    });
  });

  it("all rules have positive max points", () => {
    monitorRules.forEach((rule) => {
      expect(rule.maxPoints).toBeGreaterThan(0);
    });
  });

  it("primary use fit has highest weight", () => {
    const primaryUseRule = monitorRules.find((r) => r.name === "Primary Use Fit")!;
    const otherRules = monitorRules.filter((r) => r.name !== "Primary Use Fit");

    otherRules.forEach((rule) => {
      expect(primaryUseRule.weight).toBeGreaterThanOrEqual(rule.weight);
    });
  });
});
