import { describe, it, expect } from "vitest";
import { QuizEngine } from "@/lib/quiz/engine";
import type { EnhancedQuizQuestion, QuizMode } from "@/lib/quiz/types";
import { QUIZ_MODE_CONFIG } from "@/lib/quiz/types";
import { Mouse, Hand, Zap, Target, Wifi } from "lucide-react";

// =============================================================================
// Test Fixtures
// =============================================================================

interface TestAnswers {
  "question-1": string;
  "question-2": string;
  "question-3": string;
  "question-4": string;
  "question-5": string;
}

const createTestQuestions = (): EnhancedQuizQuestion<TestAnswers>[] => [
  {
    id: "question-1",
    title: "Core Question 1",
    subtitle: "Test subtitle",
    category: "core",
    importance: 10,
    defaultValue: "default-1",
    options: [
      { id: "a", icon: Mouse, title: "Option A", description: "Desc A" },
      { id: "b", icon: Hand, title: "Option B", description: "Desc B" },
    ],
  },
  {
    id: "question-2",
    title: "Core Question 2",
    subtitle: "Test subtitle",
    category: "core",
    importance: 9,
    options: [
      { id: "x", icon: Zap, title: "Option X", description: "Desc X" },
      { id: "y", icon: Target, title: "Option Y", description: "Desc Y" },
    ],
  },
  {
    id: "question-3",
    title: "Standard Question",
    subtitle: "Test subtitle",
    category: "standard",
    importance: 7,
    defaultValue: "default-3",
    options: [
      { id: "m", icon: Mouse, title: "Option M", description: "Desc M" },
      { id: "n", icon: Hand, title: "Option N", description: "Desc N" },
    ],
  },
  {
    id: "question-4",
    title: "Conditional Question",
    subtitle: "Test subtitle",
    category: "standard",
    importance: 6,
    defaultValue: "default-4",
    showWhen: (answers) => answers["question-1"] === "a",
    options: [
      { id: "p", icon: Zap, title: "Option P", description: "Desc P" },
      { id: "q", icon: Target, title: "Option Q", description: "Desc Q" },
    ],
  },
  {
    id: "question-5",
    title: "Advanced Question",
    subtitle: "Test subtitle",
    category: "advanced",
    importance: 3,
    defaultValue: "default-5",
    options: [
      { id: "r", icon: Wifi, title: "Option R", description: "Desc R" },
      { id: "s", icon: Mouse, title: "Option S", description: "Desc S" },
    ],
  },
];

// =============================================================================
// Quiz Mode Config Tests
// =============================================================================

describe("QUIZ_MODE_CONFIG", () => {
  it("quick mode only includes core category", () => {
    expect(QUIZ_MODE_CONFIG.quick.categories).toEqual(["core"]);
  });

  it("personalized mode includes core and standard", () => {
    expect(QUIZ_MODE_CONFIG.personalized.categories).toEqual(["core", "standard"]);
  });

  it("expert mode includes all categories", () => {
    expect(QUIZ_MODE_CONFIG.expert.categories).toEqual(["core", "standard", "advanced"]);
  });

  it("each mode has a label and description", () => {
    for (const mode of ["quick", "personalized", "expert"] as QuizMode[]) {
      expect(QUIZ_MODE_CONFIG[mode].label).toBeTruthy();
      expect(QUIZ_MODE_CONFIG[mode].description).toBeTruthy();
      expect(QUIZ_MODE_CONFIG[mode].estimatedMinutes).toBeGreaterThan(0);
    }
  });
});

// =============================================================================
// QuizEngine Constructor Tests
// =============================================================================

describe("QuizEngine Constructor", () => {
  it("initializes with default mode (personalized)", () => {
    const engine = new QuizEngine(createTestQuestions());
    expect(engine.getMode()).toBe("personalized");
  });

  it("initializes with specified mode", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    expect(engine.getMode()).toBe("quick");
  });

  it("initializes with pre-filled answers", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized", {
      "question-1": "a",
    });
    expect(engine.getAnswer("question-1")).toBe("a");
  });

  it("starts at question index 0", () => {
    const engine = new QuizEngine(createTestQuestions());
    const question = engine.getCurrentQuestion();
    expect(question?.id).toBe("question-1");
  });
});

// =============================================================================
// Question Visibility Tests
// =============================================================================

describe("QuizEngine.getVisibleQuestions", () => {
  it("quick mode shows only core questions", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    const visible = engine.getVisibleQuestions();
    expect(visible.every((q) => q.category === "core")).toBe(true);
    expect(visible).toHaveLength(2);
  });

  it("personalized mode shows core and standard questions", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    const visible = engine.getVisibleQuestions();
    const categories = new Set(visible.map((q) => q.category));
    expect(categories.has("core")).toBe(true);
    expect(categories.has("advanced")).toBe(false);
  });

  it("expert mode shows all categories", () => {
    const engine = new QuizEngine(createTestQuestions(), "expert");
    const visible = engine.getVisibleQuestions();
    const categories = new Set(visible.map((q) => q.category));
    expect(categories.has("core")).toBe(true);
    expect(categories.has("standard")).toBe(true);
    expect(categories.has("advanced")).toBe(true);
  });

  it("filters by showWhen condition", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    // question-4 has showWhen that requires question-1 === "a"
    // Without answering question-1, it should be hidden
    const visible = engine.getVisibleQuestions();
    expect(visible.find((q) => q.id === "question-4")).toBeUndefined();

    // Answer question-1 with "a" to show question-4
    engine.setAnswer("question-1", "a");
    const visibleAfter = engine.getVisibleQuestions();
    expect(visibleAfter.find((q) => q.id === "question-4")).toBeDefined();
  });

  it("hides conditional question when condition is not met", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    engine.setAnswer("question-1", "b"); // Not "a"
    const visible = engine.getVisibleQuestions();
    expect(visible.find((q) => q.id === "question-4")).toBeUndefined();
  });
});

describe("QuizEngine.isQuestionVisible", () => {
  it("returns true for visible question", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    expect(engine.isQuestionVisible("question-1")).toBe(true);
  });

  it("returns false for hidden question", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    expect(engine.isQuestionVisible("question-5")).toBe(false);
  });
});

// =============================================================================
// Navigation Tests
// =============================================================================

describe("QuizEngine Navigation", () => {
  it("next() advances to next question", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    expect(engine.getCurrentQuestion()?.id).toBe("question-1");
    const moved = engine.next();
    expect(moved).toBe(true);
    expect(engine.getCurrentQuestion()?.id).toBe("question-2");
  });

  it("next() returns false at the end", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    engine.next(); // Move to question 2
    const moved = engine.next(); // Try to go past end
    expect(moved).toBe(false);
  });

  it("back() moves to previous question", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    engine.next();
    expect(engine.getCurrentQuestion()?.id).toBe("question-2");
    const moved = engine.back();
    expect(moved).toBe(true);
    expect(engine.getCurrentQuestion()?.id).toBe("question-1");
  });

  it("back() returns false at start", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    const moved = engine.back();
    expect(moved).toBe(false);
  });

  it("canGoBack() returns correct state", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    expect(engine.canGoBack()).toBe(false);
    engine.next();
    expect(engine.canGoBack()).toBe(true);
  });

  it("goToQuestion() jumps to specific question", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    const jumped = engine.goToQuestion("question-3");
    expect(jumped).toBe(true);
    expect(engine.getCurrentQuestion()?.id).toBe("question-3");
  });

  it("goToQuestion() returns false for non-visible question", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    const jumped = engine.goToQuestion("question-5"); // Advanced, not visible
    expect(jumped).toBe(false);
  });

  it("isComplete() returns true at last question", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    engine.next(); // Move to question 2 (last core question)
    expect(engine.isComplete()).toBe(true);
  });

  it("isComplete() returns false before last question", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    expect(engine.isComplete()).toBe(false);
  });
});

// =============================================================================
// Answer Management Tests
// =============================================================================

describe("QuizEngine Answer Management", () => {
  it("setAnswer stores and retrieves answer", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "a");
    expect(engine.getAnswer("question-1")).toBe("a");
  });

  it("setAnswer with array for multi-select", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", ["a", "b"]);
    expect(engine.getAnswer("question-1")).toEqual(["a", "b"]);
  });

  it("hasAnswer returns true when answered", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "a");
    expect(engine.hasAnswer("question-1")).toBe(true);
  });

  it("hasAnswer returns false when not answered", () => {
    const engine = new QuizEngine(createTestQuestions());
    expect(engine.hasAnswer("question-1")).toBe(false);
  });

  it("hasAnswer returns false for empty string", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "");
    expect(engine.hasAnswer("question-1")).toBe(false);
  });

  it("hasAnswer returns false for empty array", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", []);
    expect(engine.hasAnswer("question-1")).toBe(false);
  });

  it("skipQuestion applies default value", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.skipQuestion("question-1");
    expect(engine.getAnswer("question-1")).toBe("default-1");
    expect(engine.wasSkipped("question-1")).toBe(true);
  });

  it("skipQuestion does nothing for questions without defaults", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.skipQuestion("question-2");
    expect(engine.getAnswer("question-2")).toBeUndefined();
    expect(engine.wasSkipped("question-2")).toBe(true);
  });

  it("setAnswer removes from skipped list", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.skipQuestion("question-1");
    expect(engine.wasSkipped("question-1")).toBe(true);
    engine.setAnswer("question-1", "b");
    expect(engine.wasSkipped("question-1")).toBe(false);
  });
});

// =============================================================================
// Progress Tests
// =============================================================================

describe("QuizEngine.getProgress", () => {
  it("returns correct progress at start", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    const progress = engine.getProgress();
    expect(progress.current).toBe(1);
    expect(progress.total).toBe(2);
    expect(progress.percentage).toBe(50); // 1/2
  });

  it("returns correct progress after navigation", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    engine.next();
    const progress = engine.getProgress();
    expect(progress.current).toBe(2);
    expect(progress.total).toBe(2);
    expect(progress.percentage).toBe(100);
  });

  it("includes category breakdown", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    const progress = engine.getProgress();
    expect(progress.categories).toBeDefined();
    expect(progress.categories!.length).toBeGreaterThan(0);
    expect(progress.categories![0]).toHaveProperty("name");
    expect(progress.categories![0]).toHaveProperty("label");
    expect(progress.categories![0]).toHaveProperty("completed");
    expect(progress.categories![0]).toHaveProperty("total");
  });

  it("handles zero visible questions gracefully", () => {
    // Create engine with no questions
    const engine = new QuizEngine([], "quick");
    const progress = engine.getProgress();
    expect(progress.current).toBe(0);
    expect(progress.total).toBe(0);
    expect(progress.percentage).toBe(0);
  });
});

describe("QuizEngine.coreQuestionsComplete", () => {
  it("returns false when core questions unanswered", () => {
    const engine = new QuizEngine(createTestQuestions());
    expect(engine.coreQuestionsComplete()).toBe(false);
  });

  it("returns true when all core questions answered", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "a");
    engine.setAnswer("question-2", "x");
    expect(engine.coreQuestionsComplete()).toBe(true);
  });

  it("counts skipped questions as complete", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "a");
    engine.skipQuestion("question-2");
    expect(engine.coreQuestionsComplete()).toBe(true);
  });
});

// =============================================================================
// Mode Management Tests
// =============================================================================

describe("QuizEngine Mode Management", () => {
  it("setMode changes the mode", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    engine.setMode("expert");
    expect(engine.getMode()).toBe("expert");
  });

  it("setMode affects visible questions", () => {
    const engine = new QuizEngine(createTestQuestions(), "quick");
    const quickVisible = engine.getVisibleQuestions().length;
    engine.setMode("expert");
    const expertVisible = engine.getVisibleQuestions().length;
    expect(expertVisible).toBeGreaterThan(quickVisible);
  });

  it("setMode preserves current question when still visible", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    engine.next(); // Move to question-2
    expect(engine.getCurrentQuestion()?.id).toBe("question-2");
    engine.setMode("expert"); // question-2 should still be visible
    expect(engine.getCurrentQuestion()?.id).toBe("question-2");
  });

  it("setMode resets to 0 when current question is no longer visible", () => {
    const engine = new QuizEngine(createTestQuestions(), "personalized");
    engine.goToQuestion("question-3"); // Standard question
    engine.setMode("quick"); // Standard questions hidden
    expect(engine.getCurrentQuestion()?.id).toBe("question-1");
  });
});

// =============================================================================
// Final Answers Tests
// =============================================================================

describe("QuizEngine.getFinalAnswers", () => {
  it("includes answered questions", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "a");
    const final = engine.getFinalAnswers();
    expect(final["question-1"]).toBe("a");
  });

  it("applies defaults for unanswered questions", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-2", "x");
    const final = engine.getFinalAnswers();
    expect(final["question-1"]).toBe("default-1"); // Has default
    expect(final["question-3"]).toBe("default-3"); // Has default
    expect(final["question-5"]).toBe("default-5"); // Has default
  });

  it("does not override answered questions with defaults", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "b"); // Not the default
    const final = engine.getFinalAnswers();
    expect(final["question-1"]).toBe("b");
  });

  it("getRawAnswers does not include defaults", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.setAnswer("question-1", "a");
    const raw = engine.getRawAnswers();
    expect(raw["question-1"]).toBe("a");
    expect(raw["question-3"]).toBeUndefined();
  });
});

// =============================================================================
// State Serialization Tests
// =============================================================================

describe("QuizEngine State Serialization", () => {
  it("exportState returns current state", () => {
    const engine = new QuizEngine(createTestQuestions(), "expert");
    engine.setAnswer("question-1", "a");
    engine.next();
    const state = engine.exportState();
    expect(state.mode).toBe("expert");
    expect(state.currentQuestionIndex).toBe(1);
    expect(state.answers["question-1" as keyof TestAnswers]).toBe("a");
  });

  it("importState restores state", () => {
    const engine = new QuizEngine(createTestQuestions());
    engine.importState({
      mode: "expert",
      currentQuestionIndex: 2,
      answers: { "question-1": "b" } as Partial<TestAnswers>,
      skippedQuestions: ["question-3"],
    });
    expect(engine.getMode()).toBe("expert");
    expect(engine.getAnswer("question-1")).toBe("b");
    expect(engine.wasSkipped("question-3")).toBe(true);
  });

  it("reset clears all state", () => {
    const engine = new QuizEngine(createTestQuestions(), "expert");
    engine.setAnswer("question-1", "a");
    engine.next();
    engine.reset();
    expect(engine.getAnswer("question-1")).toBeUndefined();
    expect(engine.getCurrentQuestion()?.id).toBe("question-1");
    expect(engine.getMode()).toBe("expert"); // Preserves mode
  });

  it("reset with mode changes mode", () => {
    const engine = new QuizEngine(createTestQuestions(), "expert");
    engine.reset("quick");
    expect(engine.getMode()).toBe("quick");
  });
});
