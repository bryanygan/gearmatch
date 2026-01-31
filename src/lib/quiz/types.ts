/**
 * Quiz Engine Type Definitions
 *
 * Core interfaces for the enhanced quiz system with conditional questions,
 * quiz modes, and progressive disclosure.
 */

import type { LucideIcon } from "lucide-react";

// =============================================================================
// Question Categories & Quiz Modes
// =============================================================================

/**
 * Question category determines visibility in different quiz modes.
 * - core: Always shown (Quick mode minimum)
 * - standard: Shown in Personalized and Expert modes
 * - advanced: Only shown in Expert mode
 */
export type QuestionCategory = "core" | "standard" | "advanced";

/**
 * Quiz modes with different question depths.
 * - quick: Core questions only (~1 minute)
 * - personalized: Core + standard questions (~2 minutes)
 * - expert: All questions (~4 minutes)
 */
export type QuizMode = "quick" | "personalized" | "expert";

/**
 * Configuration for each quiz mode.
 */
export interface QuizModeConfig {
  categories: QuestionCategory[];
  label: string;
  description: string;
  estimatedMinutes: number;
}

/**
 * Quiz mode configurations with allowed question categories.
 */
export const QUIZ_MODE_CONFIG: Record<QuizMode, QuizModeConfig> = {
  quick: {
    categories: ["core"],
    label: "Quick Match",
    description: "Essential questions for solid recommendations",
    estimatedMinutes: 1,
  },
  personalized: {
    categories: ["core", "standard"],
    label: "Personalized",
    description: "More questions for tailored results",
    estimatedMinutes: 2,
  },
  expert: {
    categories: ["core", "standard", "advanced"],
    label: "Expert",
    description: "All questions for maximum precision",
    estimatedMinutes: 4,
  },
};

// =============================================================================
// Question Schema
// =============================================================================

/**
 * A single option within a quiz question.
 */
export interface QuizOption {
  /** Unique identifier for this option */
  id: string;
  /** Lucide icon to display */
  icon: LucideIcon;
  /** Display title */
  title: string;
  /** Brief description */
  description: string;
  /** Optional tooltip text for more details */
  helpText?: string;
}

/**
 * Enhanced quiz question with conditional display and categorization.
 * @template TAnswers - The type of answers object for this quiz
 */
export interface EnhancedQuizQuestion<TAnswers = Record<string, unknown>> {
  /** Unique identifier matching the answer key */
  id: string;
  /** Question title displayed to user */
  title: string;
  /** Subtitle/instruction text */
  subtitle: string;
  /** Optional tooltip explaining why this question matters */
  helpText?: string;
  /** Whether multiple options can be selected */
  multiSelect?: boolean;
  /** Question category for mode filtering */
  category: QuestionCategory;
  /** Importance level (1-10) for scoring hints */
  importance: number;
  /** Conditional display function - return false to hide question */
  showWhen?: (answers: Partial<TAnswers>) => boolean;
  /** Default value to use when question is skipped */
  defaultValue?: string | string[];
  /** Available options */
  options: QuizOption[];
}

// =============================================================================
// Quiz State
// =============================================================================

/**
 * Current state of a quiz session.
 * @template TAnswers - The type of answers object for this quiz
 */
export interface QuizState<TAnswers> {
  /** Selected quiz mode */
  mode: QuizMode;
  /** Index of current question in visible questions list */
  currentQuestionIndex: number;
  /** User's answers so far */
  answers: Partial<TAnswers>;
  /** IDs of questions that were skipped */
  skippedQuestions: string[];
}

/**
 * Progress information for display.
 */
export interface QuizProgress {
  /** Current question number (1-indexed) */
  current: number;
  /** Total visible questions */
  total: number;
  /** Percentage complete (0-100) */
  percentage: number;
  /** Progress by category */
  categories?: CategoryProgress[];
}

/**
 * Progress for a single category.
 */
export interface CategoryProgress {
  /** Category name */
  name: QuestionCategory;
  /** Display label */
  label: string;
  /** Questions answered in this category */
  completed: number;
  /** Total questions in this category */
  total: number;
}

// =============================================================================
// Quiz Category (Product Category)
// =============================================================================

/**
 * Product category that the quiz is for.
 */
export type QuizCategory = "mouse" | "audio" | "keyboard" | "monitor";

/**
 * Accent color for quiz UI theming.
 */
export type QuizAccentColor = "primary" | "accent" | "secondary" | "tertiary";

/**
 * Maps quiz category to accent color.
 */
export const QUIZ_ACCENT_COLORS: Record<QuizCategory, QuizAccentColor> = {
  mouse: "primary",
  audio: "accent",
  keyboard: "secondary",
  monitor: "tertiary",
};
