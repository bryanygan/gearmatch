import { describe, it, expect } from "vitest";
import {
  validateMouseAnswers,
  validateAudioAnswers,
  validateKeyboardAnswers,
  validateMonitorAnswers,
  searchParamsToObject,
  mouseAnswersSchema,
  audioAnswersSchema,
  keyboardAnswersSchema,
  monitorAnswersSchema,
} from "@/lib/validation/quiz-schemas";

// =============================================================================
// Mouse Validation Tests
// =============================================================================

describe("validateMouseAnswers", () => {
  const validMouseAnswers = {
    "hand-size": "medium",
    "grip-style": ["claw"],
    "weight-preference": ["ultralight"],
    wireless: "either",
    "primary-use": ["precision"],
  };

  it("validates correct mouse answers", () => {
    const result = validateMouseAnswers(validMouseAnswers);
    expect(result).not.toBeNull();
    expect(result!["hand-size"]).toBe("medium");
  });

  it("validates mouse answers with all optional fields", () => {
    const result = validateMouseAnswers({
      ...validMouseAnswers,
      handedness: "right",
      "shape-profile": ["low_hump"],
      "gaming-genre": ["fps"],
      "button-needs": ["standard"],
    });
    expect(result).not.toBeNull();
    expect(result!.handedness).toBe("right");
  });

  it("rejects invalid hand-size", () => {
    expect(validateMouseAnswers({ ...validMouseAnswers, "hand-size": "huge" })).toBeNull();
  });

  it("rejects empty grip-style array", () => {
    expect(validateMouseAnswers({ ...validMouseAnswers, "grip-style": [] })).toBeNull();
  });

  it("rejects invalid grip-style value", () => {
    expect(validateMouseAnswers({ ...validMouseAnswers, "grip-style": ["invalid"] })).toBeNull();
  });

  it("rejects missing required fields", () => {
    const { wireless, ...incomplete } = validMouseAnswers;
    expect(validateMouseAnswers(incomplete)).toBeNull();
  });

  it("rejects null input", () => {
    expect(validateMouseAnswers(null)).toBeNull();
  });

  it("rejects undefined input", () => {
    expect(validateMouseAnswers(undefined)).toBeNull();
  });

  it("rejects number input", () => {
    expect(validateMouseAnswers(42)).toBeNull();
  });

  it("validates all grip-style options", () => {
    for (const grip of ["palm", "claw", "fingertip", "relaxed-claw"]) {
      const result = validateMouseAnswers({
        ...validMouseAnswers,
        "grip-style": [grip],
      });
      expect(result).not.toBeNull();
    }
  });

  it("validates all wireless options", () => {
    for (const w of ["wireless", "wired", "either"]) {
      const result = validateMouseAnswers({ ...validMouseAnswers, wireless: w });
      expect(result).not.toBeNull();
    }
  });

  it("validates multi-select primary-use", () => {
    const result = validateMouseAnswers({
      ...validMouseAnswers,
      "primary-use": ["precision", "productivity", "creative", "mixed"],
    });
    expect(result).not.toBeNull();
    expect(result!["primary-use"]).toHaveLength(4);
  });
});

// =============================================================================
// Audio Validation Tests
// =============================================================================

describe("validateAudioAnswers", () => {
  const validAudioAnswers = {
    "primary-use": ["competitive"],
    "form-factor": ["over-ear"],
    "mic-needs": "essential",
    "session-length": ["long"],
    budget: ["mid-range"],
  };

  it("validates correct audio answers", () => {
    const result = validateAudioAnswers(validAudioAnswers);
    expect(result).not.toBeNull();
  });

  it("validates audio answers with optional fields", () => {
    const result = validateAudioAnswers({
      ...validAudioAnswers,
      "sound-signature": ["neutral", "warm"],
      "wireless-preference": "wireless-preferred",
      "noise-environment": "moderate",
    });
    expect(result).not.toBeNull();
  });

  it("rejects invalid mic-needs", () => {
    expect(validateAudioAnswers({ ...validAudioAnswers, "mic-needs": "always" })).toBeNull();
  });

  it("rejects empty primary-use", () => {
    expect(validateAudioAnswers({ ...validAudioAnswers, "primary-use": [] })).toBeNull();
  });

  it("validates all form-factor options", () => {
    for (const ff of ["over-ear", "over-ear-headphone", "iem", "open-back"]) {
      const result = validateAudioAnswers({
        ...validAudioAnswers,
        "form-factor": [ff],
      });
      expect(result).not.toBeNull();
    }
  });

  it("validates all budget options", () => {
    for (const b of ["budget", "mid-range", "premium", "no-limit"]) {
      const result = validateAudioAnswers({ ...validAudioAnswers, budget: [b] });
      expect(result).not.toBeNull();
    }
  });
});

// =============================================================================
// Keyboard Validation Tests
// =============================================================================

describe("validateKeyboardAnswers", () => {
  const validKeyboardAnswers = {
    "primary-use": ["competitive-gaming"],
    "form-factor": ["tkl"],
    "switch-type": ["linear"],
    "gaming-features": "essential",
    connectivity: "wireless-preferred",
    "priority-feature": ["performance"],
    budget: ["mid-range"],
  };

  it("validates correct keyboard answers", () => {
    const result = validateKeyboardAnswers(validKeyboardAnswers);
    expect(result).not.toBeNull();
  });

  it("validates keyboard answers with optional fields", () => {
    const result = validateKeyboardAnswers({
      ...validKeyboardAnswers,
      "switch-technology": ["magnetic"],
      "media-controls": "essential",
      "keycap-material": "pbt",
    });
    expect(result).not.toBeNull();
  });

  it("rejects invalid gaming-features", () => {
    expect(validateKeyboardAnswers({ ...validKeyboardAnswers, "gaming-features": "mandatory" })).toBeNull();
  });

  it("rejects invalid connectivity", () => {
    expect(validateKeyboardAnswers({ ...validKeyboardAnswers, connectivity: "bluetooth" })).toBeNull();
  });

  it("validates all primary-use options", () => {
    for (const use of ["competitive-gaming", "casual-gaming", "productivity", "programming"]) {
      const result = validateKeyboardAnswers({
        ...validKeyboardAnswers,
        "primary-use": [use],
      });
      expect(result).not.toBeNull();
    }
  });

  it("validates all form-factor options", () => {
    for (const ff of ["full-size", "tkl", "75-percent", "60-65-percent"]) {
      const result = validateKeyboardAnswers({
        ...validKeyboardAnswers,
        "form-factor": [ff],
      });
      expect(result).not.toBeNull();
    }
  });

  it("validates multi-select switch-type", () => {
    const result = validateKeyboardAnswers({
      ...validKeyboardAnswers,
      "switch-type": ["linear", "tactile"],
    });
    expect(result).not.toBeNull();
    expect(result!["switch-type"]).toHaveLength(2);
  });
});

// =============================================================================
// Monitor Validation Tests
// =============================================================================

describe("validateMonitorAnswers", () => {
  const validMonitorAnswers = {
    "primary-use": ["gaming"],
    "size-preference": "standard",
    resolution: "1440p",
  };

  it("validates correct monitor answers (core only)", () => {
    const result = validateMonitorAnswers(validMonitorAnswers);
    expect(result).not.toBeNull();
  });

  it("validates monitor answers with all optional fields", () => {
    const result = validateMonitorAnswers({
      ...validMonitorAnswers,
      "refresh-rate": "high",
      "panel-type": ["oled"],
      budget: ["premium"],
      curved: "flat",
      "color-accuracy": "professional",
      "hdr-needs": "important",
      features: ["usb-c", "ergonomics"],
    });
    expect(result).not.toBeNull();
  });

  it("rejects invalid resolution", () => {
    expect(validateMonitorAnswers({ ...validMonitorAnswers, resolution: "720p" })).toBeNull();
  });

  it("rejects invalid size-preference", () => {
    expect(validateMonitorAnswers({ ...validMonitorAnswers, "size-preference": "tiny" })).toBeNull();
  });

  it("validates all resolution options", () => {
    for (const res of ["1080p", "1440p", "4k", "any"]) {
      const result = validateMonitorAnswers({ ...validMonitorAnswers, resolution: res });
      expect(result).not.toBeNull();
    }
  });

  it("validates all curved options", () => {
    for (const c of ["flat", "curved", "either"]) {
      const result = validateMonitorAnswers({ ...validMonitorAnswers, curved: c });
      expect(result).not.toBeNull();
    }
  });

  it("validates multi-select primary-use", () => {
    const result = validateMonitorAnswers({
      ...validMonitorAnswers,
      "primary-use": ["gaming", "content-creation", "office", "mixed"],
    });
    expect(result).not.toBeNull();
    expect(result!["primary-use"]).toHaveLength(4);
  });
});

// =============================================================================
// searchParamsToObject Tests
// =============================================================================

describe("searchParamsToObject", () => {
  it("parses single-value params as strings", () => {
    const params = new URLSearchParams("hand-size=medium&wireless=either");
    const obj = searchParamsToObject(params);
    expect(obj["hand-size"]).toBe("medium");
    expect(obj.wireless).toBe("either");
  });

  it("parses multi-select params as arrays", () => {
    const params = new URLSearchParams("grip-style=palm,claw&weight-preference=ultralight,light");
    const obj = searchParamsToObject(params);
    expect(obj["grip-style"]).toEqual(["palm", "claw"]);
    expect(obj["weight-preference"]).toEqual(["ultralight", "light"]);
  });

  it("handles single value in multi-select field", () => {
    const params = new URLSearchParams("grip-style=claw");
    const obj = searchParamsToObject(params);
    expect(obj["grip-style"]).toEqual(["claw"]);
  });

  it("filters empty values from multi-select", () => {
    const params = new URLSearchParams("grip-style=palm,,claw,");
    const obj = searchParamsToObject(params);
    expect(obj["grip-style"]).toEqual(["palm", "claw"]);
  });

  it("handles empty URLSearchParams", () => {
    const params = new URLSearchParams("");
    const obj = searchParamsToObject(params);
    expect(Object.keys(obj)).toHaveLength(0);
  });

  it("parses keyboard multi-select fields correctly", () => {
    const params = new URLSearchParams("switch-type=linear,tactile&priority-feature=performance,quiet");
    const obj = searchParamsToObject(params);
    expect(obj["switch-type"]).toEqual(["linear", "tactile"]);
    expect(obj["priority-feature"]).toEqual(["performance", "quiet"]);
  });

  it("parses monitor multi-select fields correctly", () => {
    const params = new URLSearchParams("panel-type=ips,oled&features=usb-c,speakers");
    const obj = searchParamsToObject(params);
    expect(obj["panel-type"]).toEqual(["ips", "oled"]);
    expect(obj.features).toEqual(["usb-c", "speakers"]);
  });

  it("correctly round-trips through validation", () => {
    const params = new URLSearchParams(
      "hand-size=medium&grip-style=claw,palm&weight-preference=ultralight&wireless=either&primary-use=precision"
    );
    const obj = searchParamsToObject(params);
    const validated = validateMouseAnswers(obj);
    expect(validated).not.toBeNull();
    expect(validated!["grip-style"]).toEqual(["claw", "palm"]);
  });
});

// =============================================================================
// Schema Structure Tests
// =============================================================================

describe("Schema Structure", () => {
  it("mouseAnswersSchema has all required keys", () => {
    const shape = mouseAnswersSchema.shape;
    expect(shape).toHaveProperty("hand-size");
    expect(shape).toHaveProperty("grip-style");
    expect(shape).toHaveProperty("weight-preference");
    expect(shape).toHaveProperty("wireless");
    expect(shape).toHaveProperty("primary-use");
  });

  it("audioAnswersSchema has all required keys", () => {
    const shape = audioAnswersSchema.shape;
    expect(shape).toHaveProperty("primary-use");
    expect(shape).toHaveProperty("form-factor");
    expect(shape).toHaveProperty("mic-needs");
    expect(shape).toHaveProperty("session-length");
    expect(shape).toHaveProperty("budget");
  });

  it("keyboardAnswersSchema has all required keys", () => {
    const shape = keyboardAnswersSchema.shape;
    expect(shape).toHaveProperty("primary-use");
    expect(shape).toHaveProperty("form-factor");
    expect(shape).toHaveProperty("switch-type");
    expect(shape).toHaveProperty("gaming-features");
    expect(shape).toHaveProperty("connectivity");
    expect(shape).toHaveProperty("priority-feature");
    expect(shape).toHaveProperty("budget");
  });

  it("monitorAnswersSchema has all required keys", () => {
    const shape = monitorAnswersSchema.shape;
    expect(shape).toHaveProperty("primary-use");
    expect(shape).toHaveProperty("size-preference");
    expect(shape).toHaveProperty("resolution");
  });
});
