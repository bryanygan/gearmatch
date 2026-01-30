/**
 * Quiz Engine
 *
 * Core engine for managing quiz state, conditional question flow,
 * and answer collection with smart defaults.
 */

import type {
  EnhancedQuizQuestion,
  QuizState,
  QuizProgress,
  QuizMode,
  CategoryProgress,
  QuestionCategory,
} from "./types";
import { QUIZ_MODE_CONFIG } from "./types";

/**
 * QuizEngine manages quiz state and provides methods for navigation,
 * conditional question filtering, and answer management.
 *
 * @template TAnswers - The type of answers object for this quiz
 */
export class QuizEngine<TAnswers extends object> {
  private questions: EnhancedQuizQuestion<TAnswers>[];
  private state: QuizState<TAnswers>;

  /**
   * Create a new QuizEngine instance.
   *
   * @param questions - Array of all possible questions
   * @param mode - Initial quiz mode (default: "personalized")
   * @param initialAnswers - Optional pre-filled answers
   */
  constructor(
    questions: EnhancedQuizQuestion<TAnswers>[],
    mode: QuizMode = "personalized",
    initialAnswers?: Partial<TAnswers>
  ) {
    this.questions = questions;
    this.state = {
      mode,
      currentQuestionIndex: 0,
      answers: initialAnswers ?? ({} as Partial<TAnswers>),
      skippedQuestions: [],
    };
  }

  // ===========================================================================
  // Question Visibility
  // ===========================================================================

  /**
   * Get all visible questions based on current mode and conditional logic.
   * Questions are filtered by:
   * 1. Category matching the current mode
   * 2. showWhen condition (if present)
   */
  getVisibleQuestions(): EnhancedQuizQuestion<TAnswers>[] {
    const allowedCategories = QUIZ_MODE_CONFIG[this.state.mode].categories;

    return this.questions.filter((q) => {
      // Check category
      if (!allowedCategories.includes(q.category)) {
        return false;
      }

      // Check conditional display
      if (q.showWhen && !q.showWhen(this.state.answers)) {
        return false;
      }

      return true;
    });
  }

  /**
   * Get the current question based on visible questions and index.
   * Returns null if quiz is complete or no questions available.
   */
  getCurrentQuestion(): EnhancedQuizQuestion<TAnswers> | null {
    const visible = this.getVisibleQuestions();
    return visible[this.state.currentQuestionIndex] ?? null;
  }

  /**
   * Check if a specific question is currently visible.
   */
  isQuestionVisible(questionId: string): boolean {
    return this.getVisibleQuestions().some((q) => q.id === questionId);
  }

  // ===========================================================================
  // Progress
  // ===========================================================================

  /**
   * Get current quiz progress including category breakdown.
   */
  getProgress(): QuizProgress {
    const visible = this.getVisibleQuestions();
    const current = this.state.currentQuestionIndex + 1;
    const total = visible.length;

    // Calculate progress by category
    const categoryLabels: Record<QuestionCategory, string> = {
      core: "Basics",
      standard: "Details",
      advanced: "Advanced",
    };

    const categories: CategoryProgress[] = [];
    const allowedCategories = QUIZ_MODE_CONFIG[this.state.mode].categories;

    for (const cat of allowedCategories) {
      const catQuestions = visible.filter((q) => q.category === cat);
      const answeredCount = catQuestions.filter(
        (q) => q.id in this.state.answers || this.state.skippedQuestions.includes(q.id)
      ).length;

      categories.push({
        name: cat,
        label: categoryLabels[cat],
        completed: answeredCount,
        total: catQuestions.length,
      });
    }

    return {
      current,
      total,
      percentage: total > 0 ? (current / total) * 100 : 0,
      categories,
    };
  }

  /**
   * Check if all core questions have been answered.
   * Useful for "early exit" prompts.
   */
  coreQuestionsComplete(): boolean {
    const coreQuestions = this.questions.filter((q) => q.category === "core");
    return coreQuestions.every(
      (q) =>
        q.id in this.state.answers ||
        this.state.skippedQuestions.includes(q.id) ||
        (q.showWhen && !q.showWhen(this.state.answers))
    );
  }

  // ===========================================================================
  // Answer Management
  // ===========================================================================

  /**
   * Set an answer for a question.
   *
   * @param questionId - The question ID (answer key)
   * @param value - The answer value (string or string array for multi-select)
   */
  setAnswer(questionId: string, value: string | string[]): void {
    this.state.answers[questionId as keyof TAnswers] = value as TAnswers[keyof TAnswers];
    // Remove from skipped if previously skipped
    this.state.skippedQuestions = this.state.skippedQuestions.filter(
      (id) => id !== questionId
    );
  }

  /**
   * Get the current answer for a question.
   */
  getAnswer(questionId: string): string | string[] | undefined {
    return this.state.answers[questionId as keyof TAnswers] as
      | string
      | string[]
      | undefined;
  }

  /**
   * Check if a question has been answered.
   */
  hasAnswer(questionId: string): boolean {
    const answer = this.getAnswer(questionId);
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer !== undefined && answer !== "";
  }

  /**
   * Skip a question, applying its default value if available.
   *
   * @param questionId - The question ID to skip
   */
  skipQuestion(questionId: string): void {
    const question = this.questions.find((q) => q.id === questionId);
    if (question?.defaultValue !== undefined) {
      this.state.answers[questionId as keyof TAnswers] =
        question.defaultValue as TAnswers[keyof TAnswers];
    }
    if (!this.state.skippedQuestions.includes(questionId)) {
      this.state.skippedQuestions.push(questionId);
    }
  }

  /**
   * Check if a question was skipped.
   */
  wasSkipped(questionId: string): boolean {
    return this.state.skippedQuestions.includes(questionId);
  }

  // ===========================================================================
  // Navigation
  // ===========================================================================

  /**
   * Move to the next question.
   *
   * @returns true if moved to next, false if already at end
   */
  next(): boolean {
    const visible = this.getVisibleQuestions();
    if (this.state.currentQuestionIndex < visible.length - 1) {
      this.state.currentQuestionIndex++;
      return true;
    }
    return false;
  }

  /**
   * Move to the previous question.
   *
   * @returns true if moved back, false if already at start
   */
  back(): boolean {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
      return true;
    }
    return false;
  }

  /**
   * Jump to a specific question by ID.
   *
   * @returns true if jumped successfully, false if question not visible
   */
  goToQuestion(questionId: string): boolean {
    const visible = this.getVisibleQuestions();
    const index = visible.findIndex((q) => q.id === questionId);
    if (index !== -1) {
      this.state.currentQuestionIndex = index;
      return true;
    }
    return false;
  }

  /**
   * Check if quiz is complete (at or past last question).
   */
  isComplete(): boolean {
    const visible = this.getVisibleQuestions();
    return this.state.currentQuestionIndex >= visible.length - 1;
  }

  /**
   * Check if we can go back.
   */
  canGoBack(): boolean {
    return this.state.currentQuestionIndex > 0;
  }

  // ===========================================================================
  // Mode Management
  // ===========================================================================

  /**
   * Get the current quiz mode.
   */
  getMode(): QuizMode {
    return this.state.mode;
  }

  /**
   * Change the quiz mode. This may affect visible questions.
   * Current question index is preserved if valid, otherwise reset to 0.
   */
  setMode(mode: QuizMode): void {
    const currentQuestion = this.getCurrentQuestion();
    this.state.mode = mode;

    // Try to stay on the same question if it's still visible
    if (currentQuestion && this.isQuestionVisible(currentQuestion.id)) {
      const visible = this.getVisibleQuestions();
      const newIndex = visible.findIndex((q) => q.id === currentQuestion.id);
      if (newIndex !== -1) {
        this.state.currentQuestionIndex = newIndex;
        return;
      }
    }

    // Reset to start if current question is no longer visible
    this.state.currentQuestionIndex = 0;
  }

  // ===========================================================================
  // Final Results
  // ===========================================================================

  /**
   * Get all answers with defaults applied for unanswered/skipped questions.
   * This is what should be passed to the scoring engine.
   */
  getFinalAnswers(): TAnswers {
    const answers = { ...this.state.answers } as TAnswers;

    // Apply defaults for ALL questions with defaults (not just visible ones)
    // This ensures quick mode still gets valid answers for scoring
    for (const q of this.questions) {
      if (!(q.id in answers) && q.defaultValue !== undefined) {
        (answers as Record<string, unknown>)[q.id] = q.defaultValue;
      }
    }

    return answers;
  }

  /**
   * Get the raw answers without defaults applied.
   */
  getRawAnswers(): Partial<TAnswers> {
    return { ...this.state.answers };
  }

  // ===========================================================================
  // State Serialization
  // ===========================================================================

  /**
   * Export the current state for persistence or URL serialization.
   */
  exportState(): QuizState<TAnswers> {
    return { ...this.state };
  }

  /**
   * Import state to restore a quiz session.
   */
  importState(state: Partial<QuizState<TAnswers>>): void {
    if (state.mode) this.state.mode = state.mode;
    if (state.currentQuestionIndex !== undefined) {
      this.state.currentQuestionIndex = state.currentQuestionIndex;
    }
    if (state.answers) {
      this.state.answers = { ...state.answers };
    }
    if (state.skippedQuestions) {
      this.state.skippedQuestions = [...state.skippedQuestions];
    }
  }

  /**
   * Reset the quiz to initial state.
   */
  reset(mode?: QuizMode): void {
    this.state = {
      mode: mode ?? this.state.mode,
      currentQuestionIndex: 0,
      answers: {} as Partial<TAnswers>,
      skippedQuestions: [],
    };
  }
}
