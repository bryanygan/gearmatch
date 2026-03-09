import { describe, it, expect } from "vitest";
import {
  isMouseQuizAnswers,
  isAudioQuizAnswers,
  isKeyboardQuizAnswers,
  isMonitorQuizAnswers,
} from "@/hooks/use-recommendations";
import type { MouseQuizAnswers, AudioQuizAnswers, KeyboardQuizAnswers, MonitorQuizAnswers } from "@/lib/scoring/types";

// =============================================================================
// Type Guard Tests
// =============================================================================

describe("Type Guards", () => {
  const mouseAnswers: MouseQuizAnswers = {
    "hand-size": "medium",
    "grip-style": ["claw"],
    "weight-preference": ["ultralight"],
    wireless: "wireless",
    "primary-use": ["precision"],
  };

  const audioAnswers: AudioQuizAnswers = {
    "primary-use": ["competitive"],
    "form-factor": ["over-ear"],
    "mic-needs": "essential",
    "session-length": ["long"],
    budget: ["mid-range"],
  };

  const keyboardAnswers: KeyboardQuizAnswers = {
    "primary-use": ["competitive-gaming"],
    "form-factor": ["tkl"],
    "switch-type": ["linear"],
    "gaming-features": "essential",
    connectivity: "wired-preferred",
    "priority-feature": ["performance"],
    budget: ["mid-range"],
  };

  const monitorAnswers: MonitorQuizAnswers = {
    "primary-use": ["gaming"],
    "size-preference": "standard",
    resolution: "1440p",
  };

  describe("isMouseQuizAnswers", () => {
    it("returns true for mouse answers", () => {
      expect(isMouseQuizAnswers(mouseAnswers)).toBe(true);
    });

    it("returns false for audio answers", () => {
      expect(isMouseQuizAnswers(audioAnswers)).toBe(false);
    });

    it("returns false for keyboard answers", () => {
      expect(isMouseQuizAnswers(keyboardAnswers)).toBe(false);
    });

    it("returns false for monitor answers", () => {
      expect(isMouseQuizAnswers(monitorAnswers)).toBe(false);
    });
  });

  describe("isAudioQuizAnswers", () => {
    it("returns true for audio answers", () => {
      expect(isAudioQuizAnswers(audioAnswers)).toBe(true);
    });

    it("returns false for mouse answers", () => {
      expect(isAudioQuizAnswers(mouseAnswers)).toBe(false);
    });

    it("returns false for keyboard answers", () => {
      expect(isAudioQuizAnswers(keyboardAnswers)).toBe(false);
    });
  });

  describe("isKeyboardQuizAnswers", () => {
    it("returns true for keyboard answers", () => {
      expect(isKeyboardQuizAnswers(keyboardAnswers)).toBe(true);
    });

    it("returns false for mouse answers", () => {
      expect(isKeyboardQuizAnswers(mouseAnswers)).toBe(false);
    });

    it("returns false for audio answers", () => {
      expect(isKeyboardQuizAnswers(audioAnswers)).toBe(false);
    });
  });

  describe("isMonitorQuizAnswers", () => {
    it("returns true for monitor answers", () => {
      expect(isMonitorQuizAnswers(monitorAnswers)).toBe(true);
    });

    it("returns false for mouse answers", () => {
      expect(isMonitorQuizAnswers(mouseAnswers)).toBe(false);
    });

    it("returns false for audio answers", () => {
      expect(isMonitorQuizAnswers(audioAnswers)).toBe(false);
    });
  });
});
