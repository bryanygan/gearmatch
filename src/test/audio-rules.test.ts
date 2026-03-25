import { describe, it, expect } from "vitest";
import {
  formFactorRule,
  primaryUseRule,
  microphoneRule,
  comfortSessionRule,
  budgetRule,
  audioBonusPointsRule,
  soundSignatureRule,
  wirelessPreferenceRule,
  noiseEnvironmentRule,
  audioRules,
} from "@/lib/scoring/audio-rules";
import type { AudioQuizAnswers } from "@/lib/scoring/types";
import type { AudioProduct } from "@/types/products";

// =============================================================================
// Test Fixtures
// =============================================================================

const createMockAudioProduct = (
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
    ...overrides,
  },
});

const baseAnswers: AudioQuizAnswers = {
  "primary-use": ["competitive"],
  "form-factor": ["over-ear"],
  "mic-needs": "essential",
  "session-length": ["long"],
  budget: ["mid-range"],
};

// =============================================================================
// Form Factor Rule Tests
// =============================================================================

describe("formFactorRule", () => {
  it("gives 25 for over-ear preference with closed headset", () => {
    const product = createMockAudioProduct({ audio_type: "headset", audio_open_back: false });
    const result = formFactorRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(25);
  });

  it("gives 25 for IEM preference with IEM product", () => {
    const answers = { ...baseAnswers, "form-factor": ["iem"] as AudioQuizAnswers["form-factor"] };
    const product = createMockAudioProduct({ audio_type: "iem" });
    const result = formFactorRule.evaluate(answers, product);
    expect(result.points).toBe(25);
  });

  it("gives low points for IEM preference with over-ear product", () => {
    const answers = { ...baseAnswers, "form-factor": ["iem"] as AudioQuizAnswers["form-factor"] };
    const product = createMockAudioProduct({ audio_type: "headset" });
    const result = formFactorRule.evaluate(answers, product);
    expect(result.points).toBeLessThan(10);
  });

  it("gives 25 for open-back preference with open-back product", () => {
    const answers = { ...baseAnswers, "form-factor": ["open-back"] as AudioQuizAnswers["form-factor"] };
    const product = createMockAudioProduct({ audio_open_back: true });
    const result = formFactorRule.evaluate(answers, product);
    expect(result.points).toBe(25);
  });

  it("handles multi-select form factors", () => {
    const answers = { ...baseAnswers, "form-factor": ["iem", "over-ear"] as AudioQuizAnswers["form-factor"] };
    const product = createMockAudioProduct({ audio_type: "headset", audio_open_back: false });
    const result = formFactorRule.evaluate(answers, product);
    expect(result.points).toBe(25); // Takes best match
  });
});

// =============================================================================
// Primary Use Rule Tests
// =============================================================================

describe("primaryUseRule", () => {
  it("gives 20 for competitive use with great competitive rating", () => {
    const product = createMockAudioProduct({ audio_competitive_fps: "great" });
    const result = primaryUseRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(20);
  });

  it("gives 15 for competitive use with good competitive rating", () => {
    const product = createMockAudioProduct({ audio_competitive_fps: "good" });
    const result = primaryUseRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(15);
  });

  it("handles streaming use case prioritizing mic quality", () => {
    const answers = { ...baseAnswers, "primary-use": ["streaming"] as AudioQuizAnswers["primary-use"] };
    const product = createMockAudioProduct({ audio_mic_quality: "great", audio_has_mic: true });
    const result = primaryUseRule.evaluate(answers, product);
    expect(result.points).toBe(20);
  });

  it("handles immersive use with warm sound signature", () => {
    const answers = { ...baseAnswers, "primary-use": ["immersive"] as AudioQuizAnswers["primary-use"] };
    const product = createMockAudioProduct({
      audio_immersion: "great",
      audio_sound_signature: "warm",
    });
    const result = primaryUseRule.evaluate(answers, product);
    expect(result.points).toBeGreaterThanOrEqual(20);
  });

  it("handles mixed use averaging competitive and immersion", () => {
    const answers = { ...baseAnswers, "primary-use": ["mixed"] as AudioQuizAnswers["primary-use"] };
    const product = createMockAudioProduct({
      audio_competitive_fps: "good",
      audio_immersion: "good",
    });
    const result = primaryUseRule.evaluate(answers, product);
    expect(result.points).toBe(18);
  });
});

// =============================================================================
// Microphone Rule Tests
// =============================================================================

describe("microphoneRule", () => {
  it("gives 0 for essential mic with no mic", () => {
    const product = createMockAudioProduct({ audio_has_mic: false, audio_mic_quality: undefined });
    const result = microphoneRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(0);
  });

  it("gives 20 for essential mic with great quality", () => {
    const product = createMockAudioProduct({ audio_mic_quality: "great" });
    const result = microphoneRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(20);
  });

  it("gives 20 for not-needed mic with no mic", () => {
    const answers = { ...baseAnswers, "mic-needs": "not-needed" as const };
    const product = createMockAudioProduct({ audio_has_mic: false });
    const result = microphoneRule.evaluate(answers, product);
    expect(result.points).toBe(20);
  });

  it("gives 12 for nice-to-have mic with no mic", () => {
    const answers = { ...baseAnswers, "mic-needs": "nice-to-have" as const };
    const product = createMockAudioProduct({ audio_has_mic: false });
    const result = microphoneRule.evaluate(answers, product);
    expect(result.points).toBe(12);
  });

  it("gives 20 for nice-to-have mic with great quality", () => {
    const answers = { ...baseAnswers, "mic-needs": "nice-to-have" as const };
    const product = createMockAudioProduct({ audio_has_mic: true, audio_mic_quality: "great" });
    const result = microphoneRule.evaluate(answers, product);
    expect(result.points).toBe(20);
  });
});

// =============================================================================
// Comfort & Session Rule Tests
// =============================================================================

describe("comfortSessionRule", () => {
  it("gives 15 for all-day session with great comfort", () => {
    const answers = { ...baseAnswers, "session-length": ["all-day"] as AudioQuizAnswers["session-length"] };
    const product = createMockAudioProduct({ audio_comfort: "great" });
    const result = comfortSessionRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });

  it("gives lower score for all-day session with ok comfort", () => {
    const answers = { ...baseAnswers, "session-length": ["all-day"] as AudioQuizAnswers["session-length"] };
    const product = createMockAudioProduct({ audio_comfort: "ok" });
    const result = comfortSessionRule.evaluate(answers, product);
    expect(result.points).toBeLessThan(10);
  });

  it("uses longest session for evaluation", () => {
    const answers = {
      ...baseAnswers,
      "session-length": ["short", "all-day"] as AudioQuizAnswers["session-length"],
    };
    const product = createMockAudioProduct({ audio_comfort: "good" });
    const result = comfortSessionRule.evaluate(answers, product);
    // Should evaluate based on "all-day" which is the most demanding
    expect(result.points).toBeLessThan(15);
  });

  it("gives high score for short session with any comfort", () => {
    const answers = { ...baseAnswers, "session-length": ["short"] as AudioQuizAnswers["session-length"] };
    const product = createMockAudioProduct({ audio_comfort: "ok" });
    const result = comfortSessionRule.evaluate(answers, product);
    expect(result.points).toBeGreaterThanOrEqual(11);
  });
});

// =============================================================================
// Budget Rule Tests
// =============================================================================

describe("budgetRule", () => {
  it("gives 15 for matching budget tier", () => {
    const product = createMockAudioProduct({ price_tier: "midrange" });
    const result = budgetRule.evaluate(baseAnswers, product);
    expect(result.points).toBe(15);
  });

  it("penalizes premium for budget preference", () => {
    const answers = { ...baseAnswers, budget: ["budget"] as AudioQuizAnswers["budget"] };
    const product = createMockAudioProduct({ price_tier: "premium" });
    const result = budgetRule.evaluate(answers, product);
    expect(result.points).toBeLessThan(5);
  });

  it("gives 15 for budget pick at budget tier", () => {
    const answers = { ...baseAnswers, budget: ["budget"] as AudioQuizAnswers["budget"] };
    const product = createMockAudioProduct({ price_tier: "budget" });
    (product as AudioProduct).price_range_usd = [30, 40];
    const result = budgetRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });

  it("handles no-limit budget", () => {
    const answers = { ...baseAnswers, budget: ["no-limit"] as AudioQuizAnswers["budget"] };
    const product = createMockAudioProduct({ price_tier: "flagship" });
    const result = budgetRule.evaluate(answers, product);
    expect(result.points).toBe(15);
  });
});

// =============================================================================
// Sound Signature Rule Tests
// =============================================================================

describe("soundSignatureRule", () => {
  it("gives 10 for matching sound signature", () => {
    const answers = {
      ...baseAnswers,
      "sound-signature": ["neutral"] as AudioQuizAnswers["sound-signature"],
    };
    const product = createMockAudioProduct({ audio_sound_signature: "neutral" });
    const result = soundSignatureRule.evaluate(answers, product);
    expect(result.points).toBe(10);
  });

  it("gives 7 for similar sound signature", () => {
    const answers = {
      ...baseAnswers,
      "sound-signature": ["warm"] as AudioQuizAnswers["sound-signature"],
    };
    const product = createMockAudioProduct({ audio_sound_signature: "v_shaped" });
    const result = soundSignatureRule.evaluate(answers, product);
    expect(result.points).toBe(7);
  });

  it("gives 7 when not specified", () => {
    const result = soundSignatureRule.evaluate(baseAnswers, createMockAudioProduct());
    expect(result.points).toBe(7);
  });

  it("gives 4 for non-matching signature", () => {
    const answers = {
      ...baseAnswers,
      "sound-signature": ["neutral"] as AudioQuizAnswers["sound-signature"],
    };
    const product = createMockAudioProduct({ audio_sound_signature: "warm" });
    const result = soundSignatureRule.evaluate(answers, product);
    expect(result.points).toBe(4);
  });
});

// =============================================================================
// Wireless Preference Rule Tests
// =============================================================================

describe("wirelessPreferenceRule", () => {
  it("gives 8 for wireless required with wireless product", () => {
    const answers = {
      ...baseAnswers,
      "wireless-preference": "wireless-required" as const,
    };
    const product = createMockAudioProduct({ wireless: true });
    const result = wirelessPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(8);
  });

  it("gives 0 for wireless required with wired product", () => {
    const answers = {
      ...baseAnswers,
      "wireless-preference": "wireless-required" as const,
    };
    const product = createMockAudioProduct({
      wireless: false,
      connection_type: ["wired_3_5mm"],
    });
    const result = wirelessPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(0);
  });

  it("gives 8 for wired preferred with wired product", () => {
    const answers = {
      ...baseAnswers,
      "wireless-preference": "wired-preferred" as const,
    };
    const product = createMockAudioProduct({
      wireless: false,
      connection_type: ["wired_3_5mm"],
    });
    const result = wirelessPreferenceRule.evaluate(answers, product);
    expect(result.points).toBe(8);
  });

  it("gives 6 when not specified", () => {
    const result = wirelessPreferenceRule.evaluate(baseAnswers, createMockAudioProduct());
    expect(result.points).toBe(6);
  });
});

// =============================================================================
// Noise Environment Rule Tests
// =============================================================================

describe("noiseEnvironmentRule", () => {
  it("gives 7 for quiet env with open-back", () => {
    const answers = { ...baseAnswers, "noise-environment": "quiet" as const };
    const product = createMockAudioProduct({ audio_open_back: true });
    const result = noiseEnvironmentRule.evaluate(answers, product);
    expect(result.points).toBe(7);
  });

  it("gives 7 for noisy env with ANC", () => {
    const answers = { ...baseAnswers, "noise-environment": "noisy" as const };
    const product = createMockAudioProduct({ audio_anc: true });
    const result = noiseEnvironmentRule.evaluate(answers, product);
    expect(result.points).toBe(7);
  });

  it("gives low score for noisy env with open-back", () => {
    const answers = { ...baseAnswers, "noise-environment": "noisy" as const };
    const product = createMockAudioProduct({ audio_open_back: true, audio_isolation: "low" });
    const result = noiseEnvironmentRule.evaluate(answers, product);
    expect(result.points).toBeLessThanOrEqual(2);
  });

  it("gives 5 when not specified", () => {
    const result = noiseEnvironmentRule.evaluate(baseAnswers, createMockAudioProduct());
    expect(result.points).toBe(5);
  });
});

// =============================================================================
// audioRules structure
// =============================================================================

describe("audioRules", () => {
  it("includes all 10 rules", () => {
    expect(audioRules).toHaveLength(10);
  });

  it("all rules have valid weights and maxPoints", () => {
    for (const rule of audioRules) {
      expect(rule.weight).toBeGreaterThan(0);
      expect(rule.maxPoints).toBeGreaterThan(0);
      expect(rule.name).toBeTruthy();
    }
  });
});
