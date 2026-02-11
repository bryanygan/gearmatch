import { useNavigate } from "react-router-dom";
import QuizContainer from "@/components/quiz/QuizContainer";
import { mouseQuestions, type ExtendedMouseQuizAnswers } from "@/lib/quiz/questions";
import { usePrefetchProducts } from "@/hooks/use-prefetch-products";

/**
 * Mouse Quiz Page
 *
 * Uses the QuizContainer with mouse-specific questions.
 * Supports Quick/Personalized/Expert modes with conditional questions.
 */
const MouseQuiz = () => {
  const navigate = useNavigate();
  usePrefetchProducts("mouse");

  const handleComplete = (answers: ExtendedMouseQuizAnswers) => {
    // Encode answers to URL parameters
    const params = new URLSearchParams();
    Object.entries(answers).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    navigate(`/quiz/mouse/results?${params.toString()}`);
  };

  return (
    <QuizContainer<ExtendedMouseQuizAnswers>
      questions={mouseQuestions}
      category="mouse"
      accentColor="primary"
      onComplete={handleComplete}
    />
  );
};

export default MouseQuiz;
