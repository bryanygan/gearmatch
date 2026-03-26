import { useMemo } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  usePageTitle("Mouse Quiz");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  usePrefetchProducts("mouse");

  const initialAnswers = useMemo(() => {
    if (searchParams.get("edit") !== "1") return undefined;
    const answers: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      if (key !== "edit") {
        answers[key] = value.includes(",") ? value.split(",") : value;
      }
    });
    return Object.keys(answers).length > 0 ? answers : undefined;
  }, [searchParams]);

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
      initialAnswers={initialAnswers}
    />
  );
};

export default MouseQuiz;
