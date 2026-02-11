import { useNavigate } from "react-router-dom";
import QuizContainer from "@/components/quiz/QuizContainer";
import { keyboardQuestions, type ExtendedKeyboardQuizAnswers } from "@/lib/quiz/questions";
import { usePrefetchProducts } from "@/hooks/use-prefetch-products";

/**
 * Keyboard Quiz Page
 *
 * Uses the QuizContainer with keyboard-specific questions.
 * Supports Quick/Personalized/Expert modes with conditional questions.
 */
const KeyboardQuiz = () => {
  const navigate = useNavigate();
  usePrefetchProducts("keyboard");

  const handleComplete = (answers: ExtendedKeyboardQuizAnswers) => {
    // Encode answers to URL parameters
    const params = new URLSearchParams();
    Object.entries(answers).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    navigate(`/quiz/keyboard/results?${params.toString()}`);
  };

  return (
    <QuizContainer<ExtendedKeyboardQuizAnswers>
      questions={keyboardQuestions}
      category="keyboard"
      accentColor="secondary"
      onComplete={handleComplete}
    />
  );
};

export default KeyboardQuiz;
