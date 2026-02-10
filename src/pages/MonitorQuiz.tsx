import { useNavigate } from "react-router-dom";
import QuizContainer from "@/components/quiz/QuizContainer";
import { monitorQuestions, type ExtendedMonitorQuizAnswers } from "@/lib/quiz/questions";
import { usePrefetchProducts } from "@/hooks/use-prefetch-products";

/**
 * Monitor Quiz Page
 *
 * Uses the QuizContainer with monitor-specific questions.
 * Supports Quick/Personalized/Expert modes with conditional questions.
 */
const MonitorQuiz = () => {
  const navigate = useNavigate();
  usePrefetchProducts("monitor");

  const handleComplete = (answers: ExtendedMonitorQuizAnswers) => {
    // Encode answers to URL parameters
    const params = new URLSearchParams();
    Object.entries(answers).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    navigate(`/quiz/monitor/results?${params.toString()}`);
  };

  return (
    <QuizContainer<ExtendedMonitorQuizAnswers>
      questions={monitorQuestions}
      category="monitor"
      accentColor="tertiary"
      onComplete={handleComplete}
    />
  );
};

export default MonitorQuiz;
