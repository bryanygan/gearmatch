import { describe, it, expect } from "vitest";
import {
  validateMouseAnswers,
  validateAudioAnswers,
  searchParamsToObject,
  mouseAnswersSchema,
  audioAnswersSchema,
} from "@/lib/validation";

// =============================================================================
// Mouse Answer Validation Tests
// =============================================================================

describe("Mouse Answer Validation", () => {
  const validMouseAnswers = {
    "hand-size": "medium",
    "grip-style": "claw",
    "weight-preference": "ultralight",
    wireless: "wireless",
    "primary-use": "precision",
  };

  it("validates correct mouse answers", () => {
    const result = validateMouseAnswers(validMouseAnswers);
    expect(result).toEqual(validMouseAnswers);
  });

  it("returns null for missing required field", () => {
    const incomplete = {
      "hand-size": "medium",
      "grip-style": "claw",
      // missing weight-preference, wireless, primary-use
    };
    const result = validateMouseAnswers(incomplete);
    expect(result).toBeNull();
  });

  it("returns null for invalid enum value", () => {
    const invalid = {
      ...validMouseAnswers,
      "hand-size": "extra-large", // not a valid option
    };
    const result = validateMouseAnswers(invalid);
    expect(result).toBeNull();
  });

  it("returns null for wrong type", () => {
    const wrongType = {
      ...validMouseAnswers,
      "hand-size": 123, // should be string
    };
    const result = validateMouseAnswers(wrongType);
    expect(result).toBeNull();
  });

  it("returns null for empty object", () => {
    const result = validateMouseAnswers({});
    expect(result).toBeNull();
  });

  it("returns null for null input", () => {
    const result = validateMouseAnswers(null);
    expect(result).toBeNull();
  });

  it("returns null for undefined input", () => {
    const result = validateMouseAnswers(undefined);
    expect(result).toBeNull();
  });

  it("validates all valid hand-size options", () => {
    const sizes = ["small", "medium", "large"];
    for (const size of sizes) {
      const answers = { ...validMouseAnswers, "hand-size": size };
      expect(validateMouseAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid grip-style options", () => {
    const grips = ["palm", "claw", "fingertip", "relaxed-claw"];
    for (const grip of grips) {
      const answers = { ...validMouseAnswers, "grip-style": grip };
      expect(validateMouseAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid weight-preference options", () => {
    const weights = ["ultralight", "light", "medium", "heavy"];
    for (const weight of weights) {
      const answers = { ...validMouseAnswers, "weight-preference": weight };
      expect(validateMouseAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid wireless options", () => {
    const options = ["wireless", "wired", "either"];
    for (const opt of options) {
      const answers = { ...validMouseAnswers, wireless: opt };
      expect(validateMouseAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid primary-use options", () => {
    const uses = ["precision", "productivity", "creative", "mixed"];
    for (const use of uses) {
      const answers = { ...validMouseAnswers, "primary-use": use };
      expect(validateMouseAnswers(answers)).not.toBeNull();
    }
  });
});

// =============================================================================
// Audio Answer Validation Tests
// =============================================================================

describe("Audio Answer Validation", () => {
  const validAudioAnswers = {
    "primary-use": "competitive",
    "form-factor": "over-ear",
    "mic-needs": "essential",
    "session-length": "long",
    budget: "mid-range",
  };

  it("validates correct audio answers", () => {
    const result = validateAudioAnswers(validAudioAnswers);
    expect(result).toEqual(validAudioAnswers);
  });

  it("returns null for missing required field", () => {
    const incomplete = {
      "primary-use": "competitive",
      "form-factor": "over-ear",
      // missing mic-needs, session-length, budget
    };
    const result = validateAudioAnswers(incomplete);
    expect(result).toBeNull();
  });

  it("returns null for invalid enum value", () => {
    const invalid = {
      ...validAudioAnswers,
      budget: "unlimited", // not a valid option
    };
    const result = validateAudioAnswers(invalid);
    expect(result).toBeNull();
  });

  it("validates all valid primary-use options", () => {
    const uses = ["competitive", "immersive", "mixed", "streaming"];
    for (const use of uses) {
      const answers = { ...validAudioAnswers, "primary-use": use };
      expect(validateAudioAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid form-factor options", () => {
    const factors = ["over-ear", "over-ear-headphone", "iem", "open-back"];
    for (const factor of factors) {
      const answers = { ...validAudioAnswers, "form-factor": factor };
      expect(validateAudioAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid mic-needs options", () => {
    const needs = ["essential", "nice-to-have", "not-needed"];
    for (const need of needs) {
      const answers = { ...validAudioAnswers, "mic-needs": need };
      expect(validateAudioAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid session-length options", () => {
    const lengths = ["short", "medium", "long", "all-day"];
    for (const length of lengths) {
      const answers = { ...validAudioAnswers, "session-length": length };
      expect(validateAudioAnswers(answers)).not.toBeNull();
    }
  });

  it("validates all valid budget options", () => {
    const budgets = ["budget", "mid-range", "premium", "no-limit"];
    for (const budget of budgets) {
      const answers = { ...validAudioAnswers, budget };
      expect(validateAudioAnswers(answers)).not.toBeNull();
    }
  });
});

// =============================================================================
// URL Search Params Helper Tests
// =============================================================================

describe("searchParamsToObject", () => {
  it("converts URLSearchParams to object", () => {
    const params = new URLSearchParams(
      "hand-size=medium&grip-style=claw&weight-preference=light"
    );
    const result = searchParamsToObject(params);

    expect(result).toEqual({
      "hand-size": "medium",
      "grip-style": "claw",
      "weight-preference": "light",
    });
  });

  it("handles empty params", () => {
    const params = new URLSearchParams("");
    const result = searchParamsToObject(params);
    expect(result).toEqual({});
  });

  it("handles special characters in values", () => {
    const params = new URLSearchParams("key=value%20with%20spaces");
    const result = searchParamsToObject(params);
    expect(result).toEqual({ key: "value with spaces" });
  });
});

// =============================================================================
// Schema Export Tests
// =============================================================================

describe("Schema Exports", () => {
  it("exports mouseAnswersSchema", () => {
    expect(mouseAnswersSchema).toBeDefined();
    expect(mouseAnswersSchema.safeParse).toBeTypeOf("function");
  });

  it("exports audioAnswersSchema", () => {
    expect(audioAnswersSchema).toBeDefined();
    expect(audioAnswersSchema.safeParse).toBeTypeOf("function");
  });
});

// =============================================================================
// Security-Focused Tests
// =============================================================================

describe("Security: Malformed Input Handling", () => {
  it("rejects prototype pollution attempts", () => {
    const malicious = {
      "hand-size": "medium",
      "grip-style": "claw",
      "weight-preference": "ultralight",
      wireless: "wireless",
      "primary-use": "precision",
      __proto__: { isAdmin: true },
      constructor: { prototype: { isAdmin: true } },
    };

    // Zod should strip extra properties and only return valid fields
    const result = validateMouseAnswers(malicious);
    expect(result).toEqual({
      "hand-size": "medium",
      "grip-style": "claw",
      "weight-preference": "ultralight",
      wireless: "wireless",
      "primary-use": "precision",
    });
  });

  it("rejects XSS attempts in values", () => {
    const malicious = {
      "hand-size": "<script>alert('xss')</script>",
      "grip-style": "claw",
      "weight-preference": "ultralight",
      wireless: "wireless",
      "primary-use": "precision",
    };

    const result = validateMouseAnswers(malicious);
    expect(result).toBeNull();
  });

  it("rejects SQL injection attempts in values", () => {
    const malicious = {
      "hand-size": "'; DROP TABLE users; --",
      "grip-style": "claw",
      "weight-preference": "ultralight",
      wireless: "wireless",
      "primary-use": "precision",
    };

    const result = validateMouseAnswers(malicious);
    expect(result).toBeNull();
  });

  it("handles very long strings gracefully", () => {
    const longString = "a".repeat(10000);
    const malicious = {
      "hand-size": longString,
      "grip-style": "claw",
      "weight-preference": "ultralight",
      wireless: "wireless",
      "primary-use": "precision",
    };

    const result = validateMouseAnswers(malicious);
    expect(result).toBeNull();
  });

  it("handles array values instead of strings", () => {
    const malicious = {
      "hand-size": ["medium", "large"],
      "grip-style": "claw",
      "weight-preference": "ultralight",
      wireless: "wireless",
      "primary-use": "precision",
    };

    const result = validateMouseAnswers(malicious);
    expect(result).toBeNull();
  });
});
