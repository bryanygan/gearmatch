import { useState, useCallback, useMemo } from "react";
import { ArrowRight, Mouse, Headphones, Keyboard, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizLayout from "./QuizLayout";
import QuizProgress from "./QuizProgress";
import QuizOptionCard from "./QuizOptionCard";
import QuizModeSelector from "./QuizModeSelector";
import QuizSkipButton from "./QuizSkipButton";
import QuizHelpTooltip from "./QuizHelpTooltip";
import { QuizEngine } from "@/lib/quiz/engine";
import { cn } from "@/lib/utils";
import type {
  EnhancedQuizQuestion,
  QuizMode,
  QuizAccentColor,
  QuizCategory,
} from "@/lib/quiz/types";

interface QuizContainerProps<TAnswers extends object> {
  /** All quiz questions (will be filtered by mode) */
  questions: EnhancedQuizQuestion<TAnswers>[];
  /** Product category for branding */
  category: QuizCategory;
  /** Accent color for theming */
  accentColor: QuizAccentColor;
  /** Callback when quiz is complete with final answers */
  onComplete: (answers: TAnswers) => void;
  /** Default quiz mode (default: "personalized") */
  defaultMode?: QuizMode;
  /** Whether to show mode selection screen (default: true) */
  showModeSelection?: boolean;
}

const categoryIcons = {
  mouse: Mouse,
  audio: Headphones,
  keyboard: Keyboard,
  monitor: Monitor,
} as const;

const categoryLabels = {
  mouse: "Mouse Quiz",
  audio: "Audio Quiz",
  keyboard: "Keyboard Quiz",
  monitor: "Monitor Quiz",
} as const;

/**
 * QuizContainer is the main quiz component that handles:
 * - Mode selection (Quick/Personalized/Expert)
 * - Question rendering with the quiz engine
 * - Navigation (next/back/skip)
 * - Progress display with categories
 */
function QuizContainer<TAnswers extends object>({
  questions,
  category,
  accentColor,
  onComplete,
  defaultMode = "personalized",
  showModeSelection = true,
}: QuizContainerProps<TAnswers>) {
  // State
  const [showModeSelect, setShowModeSelect] = useState(showModeSelection);
  const [selectedMode, setSelectedMode] = useState<QuizMode>(defaultMode);

  // Create engine instance (recreated when mode changes)
  const engine = useMemo(
    () => new QuizEngine<TAnswers>(questions, selectedMode),
    [questions, selectedMode]
  );

  // Force re-render when engine state changes
  const [, forceUpdate] = useState({});
  const triggerUpdate = useCallback(() => forceUpdate({}), []);

  // Get current state from engine
  const currentQuestion = engine.getCurrentQuestion();
  const progress = engine.getProgress();
  const isLastQuestion = engine.isComplete();

  // Check if current question has an answer
  const currentAnswer = currentQuestion
    ? engine.getAnswer(currentQuestion.id)
    : undefined;
  const hasAnswer = currentQuestion?.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : Boolean(currentAnswer);

  // Handlers
  const handleModeConfirm = () => {
    engine.setMode(selectedMode);
    setShowModeSelect(false);
    triggerUpdate();
  };

  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.multiSelect) {
      const current = engine.getAnswer(currentQuestion.id);
      const currentArray = Array.isArray(current) ? current : [];
      const isSelected = currentArray.includes(optionId);
      const newValue = isSelected
        ? currentArray.filter((id) => id !== optionId)
        : [...currentArray, optionId];
      engine.setAnswer(currentQuestion.id, newValue);
    } else {
      engine.setAnswer(currentQuestion.id, optionId);
    }
    triggerUpdate();
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const answers = engine.getFinalAnswers();
      onComplete(answers);
    } else {
      engine.next();
      triggerUpdate();
    }
  };

  const handleBack = () => {
    engine.back();
    triggerUpdate();
  };

  const handleSkip = () => {
    if (!currentQuestion) return;
    engine.skipQuestion(currentQuestion.id);
    if (!isLastQuestion) {
      engine.next();
      triggerUpdate();
    } else {
      const answers = engine.getFinalAnswers();
      onComplete(answers);
    }
  };

  // Icon for category badge
  const CategoryIcon = categoryIcons[category];

  // Mode selection screen
  if (showModeSelect) {
    return (
      <QuizLayout accentColor={accentColor}>
        <div className="flex flex-1 flex-col justify-center gap-4 md:gap-6">
          {/* Category badge */}
          <div className="text-center">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm",
                accentColor === "primary" && "bg-primary/10 text-primary",
                accentColor === "accent" && "bg-accent/10 text-accent",
                accentColor === "secondary" && "bg-secondary/50 text-foreground",
                accentColor === "tertiary" && "bg-violet-500/10 text-violet-600 dark:text-violet-400"
              )}
            >
              <CategoryIcon className="h-4 w-4" />
              <span>{categoryLabels[category]}</span>
            </div>
          </div>

          {/* Mode selector */}
          <div>
            <QuizModeSelector
              selectedMode={selectedMode}
              onSelectMode={setSelectedMode}
              accentColor={accentColor}
            />
          </div>

          {/* Start button */}
          <div className="flex justify-center">
            <Button
              variant={accentColor === "primary" ? "hero" : accentColor === "tertiary" ? "default" : accentColor}
              size="xl"
              onClick={handleModeConfirm}
              className={cn(
                "min-w-[200px] gap-2",
                accentColor === "tertiary" && "bg-violet-600 text-white hover:bg-violet-700"
              )}
            >
              Start Quiz
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </QuizLayout>
    );
  }

  // No current question (shouldn't happen)
  if (!currentQuestion) {
    return null;
  }

  // Main quiz screen
  return (
    <QuizLayout accentColor={accentColor}>
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Progress */}
        <QuizProgress
          currentStep={progress.current}
          totalSteps={progress.total}
          onBack={handleBack}
          accentColor={accentColor}
          categories={progress.categories}
          currentCategory={currentQuestion.category}
        />

        {/* Question header */}
        <div className="space-y-1 text-center">
          <div
            className={cn(
              "mb-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm",
              accentColor === "primary" && "bg-primary/10 text-primary",
              accentColor === "accent" && "bg-accent/10 text-accent",
              accentColor === "secondary" && "bg-secondary/50 text-foreground",
              accentColor === "tertiary" && "bg-violet-500/10 text-violet-600 dark:text-violet-400"
            )}
          >
            <CategoryIcon className="h-4 w-4" />
            <span>{categoryLabels[category]}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-display text-xl font-bold md:text-3xl">
              {currentQuestion.title}
            </h1>
            {currentQuestion.helpText && (
              <QuizHelpTooltip content={currentQuestion.helpText} />
            )}
          </div>
          <p className="text-sm text-muted-foreground md:text-base">{currentQuestion.subtitle}</p>
        </div>

        {/* Options grid */}
        <div
          className={cn(
            "grid gap-3 md:gap-4",
            currentQuestion.options.length <= 2 && "grid-cols-2",
            currentQuestion.options.length === 3 && "grid-cols-3",
            currentQuestion.options.length === 4 && "grid-cols-2",
            currentQuestion.options.length >= 5 && "grid-cols-3",
          )}
        >
          {currentQuestion.options.map((option) => {
            const isSelected = currentQuestion.multiSelect
              ? Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
              : currentAnswer === option.id;
            return (
              <QuizOptionCard
                key={option.id}
                icon={option.icon}
                title={option.title}
                description={option.description}
                helpText={option.helpText}
                selected={isSelected}
                onClick={() => handleSelect(option.id)}
                accentColor={accentColor}
                multiSelect={currentQuestion.multiSelect}
              />
            );
          })}
        </div>

        {/* Actions row — skip + continue on same line */}
        <div className="flex items-center justify-center gap-4">
          {currentQuestion.defaultValue !== undefined && currentQuestion.category !== "core" && (
            <QuizSkipButton
              onSkip={handleSkip}
              defaultValue={currentQuestion.defaultValue}
              accentColor={accentColor}
            />
          )}
          <Button
            variant={accentColor === "primary" ? "hero" : accentColor === "tertiary" ? "default" : accentColor}
            size="xl"
            onClick={handleNext}
            disabled={!hasAnswer}
            className={cn(
              "min-w-[200px] gap-2",
              accentColor === "tertiary" && "bg-violet-600 text-white hover:bg-violet-700"
            )}
          >
            {isLastQuestion ? "See My Matches" : "Continue"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
}

export default QuizContainer;
