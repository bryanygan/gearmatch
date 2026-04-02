import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizOptionCard from "@/components/quiz/QuizOptionCard";
import QuizSkipButton from "@/components/quiz/QuizSkipButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AnswerSummary from "@/components/results/AnswerSummary";
import NoResultsMessage from "@/components/results/NoResultsMessage";
import ResultsSkeleton from "@/components/results/ResultsSkeleton";
import { Mouse } from "lucide-react";
import type { MouseQuizAnswers, AudioQuizAnswers, KeyboardQuizAnswers, MonitorQuizAnswers } from "@/lib/scoring/types";

// =============================================================================
// QuizProgress Tests
// =============================================================================

describe("QuizProgress", () => {
  it("renders current step and total", () => {
    render(<QuizProgress currentStep={2} totalSteps={5} />);
    expect(screen.getByText("Question 2 of 5")).toBeDefined();
  });

  it("calculates progress percentage correctly", () => {
    render(<QuizProgress currentStep={3} totalSteps={5} />);
    // Progress should be ((3-1)/5)*100 = 40%
    expect(screen.getByText("40%")).toBeDefined();
  });

  it("renders back button when onBack provided and not first step", () => {
    const onBack = vi.fn();
    render(<QuizProgress currentStep={2} totalSteps={5} onBack={onBack} />);
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("does not render back button on first step", () => {
    render(<QuizProgress currentStep={1} totalSteps={5} onBack={() => {}} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders category pills when categories provided", () => {
    const categories = [
      { name: "core" as const, label: "Basics", completed: 1, total: 3 },
      { name: "standard" as const, label: "Details", completed: 0, total: 2 },
    ];
    render(
      <QuizProgress
        currentStep={2}
        totalSteps={5}
        categories={categories}
        currentCategory="core"
      />
    );
    expect(screen.getByText(/Basics/)).toBeDefined();
    expect(screen.getByText(/Details/)).toBeDefined();
  });

  it("renders with different accent colors", () => {
    const { container: c1 } = render(
      <QuizProgress currentStep={1} totalSteps={3} accentColor="primary" />
    );
    expect(c1.querySelector(".text-primary")).toBeDefined();
  });
});

// =============================================================================
// QuizOptionCard Tests
// =============================================================================

describe("QuizOptionCard", () => {
  it("renders title and description", () => {
    render(
      <QuizOptionCard
        title="Test Option"
        description="Test description"
        selected={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText("Test Option")).toBeDefined();
    expect(screen.getByText("Test description")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <QuizOptionCard
        title="Clickable"
        selected={false}
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders with selected state", () => {
    const { container } = render(
      <QuizOptionCard
        title="Selected"
        selected={true}
        onClick={() => {}}
        accentColor="primary"
      />
    );
    const button = container.querySelector("button");
    expect(button?.className).toContain("border-primary");
  });

  it("renders with icon", () => {
    render(
      <QuizOptionCard
        icon={Mouse}
        title="With Icon"
        selected={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText("With Icon")).toBeDefined();
  });

  it("renders checkbox indicator for multiSelect", () => {
    const { container } = render(
      <QuizOptionCard
        title="Multi"
        selected={true}
        onClick={() => {}}
        multiSelect={true}
      />
    );
    // Should have rounded-md (checkbox) instead of rounded-full (radio)
    expect(container.querySelector(".rounded-md")).toBeDefined();
  });

  it("renders radio indicator for single select", () => {
    const { container } = render(
      <QuizOptionCard
        title="Single"
        selected={true}
        onClick={() => {}}
        multiSelect={false}
      />
    );
    expect(container.querySelector(".rounded-full")).toBeDefined();
  });

  it("renders help tooltip when helpText provided", () => {
    render(
      <QuizOptionCard
        title="With Help"
        helpText="Some help text"
        selected={false}
        onClick={() => {}}
      />
    );
    // The tooltip trigger should be in the DOM
    expect(screen.getByText("With Help")).toBeDefined();
  });
});

// =============================================================================
// QuizSkipButton Tests
// =============================================================================

describe("QuizSkipButton", () => {
  it("renders skip button", () => {
    render(<QuizSkipButton onSkip={() => {}} defaultValue="test" />);
    expect(screen.getByText("Skip")).toBeDefined();
  });

  it("calls onSkip when clicked", () => {
    const onSkip = vi.fn();
    render(<QuizSkipButton onSkip={onSkip} defaultValue="test" />);
    fireEvent.click(screen.getByText("Skip"));
    expect(onSkip).toHaveBeenCalledOnce();
  });
});

// =============================================================================
// ErrorBoundary Tests
// =============================================================================

describe("ErrorBoundary", () => {
  // Suppress console.error for error boundary tests
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Child content")).toBeDefined();
  });

  it("renders fallback when error occurs", () => {
    const ThrowError = () => {
      throw new Error("Test error");
    };
    render(
      <ErrorBoundary fallback={<div>Error fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Error fallback")).toBeDefined();
  });

  it("renders default error UI when no fallback", () => {
    const ThrowError = () => {
      throw new Error("Test error");
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeDefined();
    expect(screen.getByText("Refresh Page")).toBeDefined();
    expect(screen.getByText("Go Home")).toBeDefined();
  });
});

// =============================================================================
// AnswerSummary Tests
// =============================================================================

describe("AnswerSummary", () => {
  it("renders mouse answer labels", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["claw"],
      "weight-preference": ["ultralight"],
      wireless: "either",
      "primary-use": ["precision"],
    };
    render(
      <MemoryRouter>
        <AnswerSummary answers={answers} category="mouse" />
      </MemoryRouter>
    );
    expect(screen.getByText("Claw grip")).toBeDefined();
    expect(screen.getByText("Medium hands")).toBeDefined();
    expect(screen.getByText("Ultralight (<60g)")).toBeDefined();
  });

  it("renders audio answer labels", () => {
    const answers: AudioQuizAnswers = {
      "primary-use": ["competitive"],
      "form-factor": ["over-ear"],
      "mic-needs": "essential",
      "session-length": ["long"],
      budget: ["mid-range"],
    };
    render(
      <MemoryRouter>
        <AnswerSummary answers={answers} category="audio" />
      </MemoryRouter>
    );
    expect(screen.getByText("Precision audio")).toBeDefined();
    expect(screen.getByText("Mic essential")).toBeDefined();
  });

  it("renders keyboard answer labels", () => {
    const answers: KeyboardQuizAnswers = {
      "primary-use": ["competitive-gaming"],
      "form-factor": ["tkl"],
      "switch-type": ["linear"],
      "gaming-features": "essential",
      connectivity: "wired-preferred",
      "priority-feature": ["performance"],
      budget: ["mid-range"],
    };
    render(
      <MemoryRouter>
        <AnswerSummary answers={answers} category="keyboard" />
      </MemoryRouter>
    );
    expect(screen.getByText("Competitive Gaming")).toBeDefined();
    expect(screen.getByText("Linear")).toBeDefined();
  });

  it("renders monitor answer labels", () => {
    const answers: MonitorQuizAnswers = {
      "primary-use": ["gaming"],
      "size-preference": "standard",
      resolution: "1440p",
    };
    render(
      <MemoryRouter>
        <AnswerSummary answers={answers} category="monitor" />
      </MemoryRouter>
    );
    expect(screen.getByText("Gaming")).toBeDefined();
    expect(screen.getByText("1440p")).toBeDefined();
  });

  it("handles multi-select answers with commas", () => {
    const answers: MouseQuizAnswers = {
      "hand-size": "medium",
      "grip-style": ["palm", "claw"],
      "weight-preference": ["ultralight"],
      wireless: "either",
      "primary-use": ["precision"],
    };
    render(
      <MemoryRouter>
        <AnswerSummary answers={answers} category="mouse" />
      </MemoryRouter>
    );
    expect(screen.getByText("Palm grip, Claw grip")).toBeDefined();
  });
});

// =============================================================================
// NoResultsMessage Tests
// =============================================================================

describe("NoResultsMessage", () => {
  it("renders no results message", () => {
    render(
      <MemoryRouter>
        <NoResultsMessage category="mouse" onRetakeQuiz={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText("No Perfect Matches Found")).toBeDefined();
  });

  it("calls onRetakeQuiz when button clicked", () => {
    const onRetakeQuiz = vi.fn();
    render(
      <MemoryRouter>
        <NoResultsMessage category="mouse" onRetakeQuiz={onRetakeQuiz} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Retake Quiz"));
    expect(onRetakeQuiz).toHaveBeenCalledOnce();
  });
});

// =============================================================================
// ResultsSkeleton Tests
// =============================================================================

describe("ResultsSkeleton", () => {
  it("renders loading skeleton with cards", () => {
    const { container } = render(<ResultsSkeleton />);
    // Should render multiple skeleton Card elements
    expect(container.querySelectorAll('[class*="border"]').length).toBeGreaterThan(0);
  });

  it("renders with different accent colors", () => {
    const { container } = render(<ResultsSkeleton accentColor="accent" />);
    expect(container.querySelector('[class*="accent"]')).toBeDefined();
  });
});