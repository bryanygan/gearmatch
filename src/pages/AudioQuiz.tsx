import { useMemo } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuizContainer from "@/components/quiz/QuizContainer";
import { audioQuestions, type ExtendedAudioQuizAnswers } from "@/lib/quiz/questions";
import { usePrefetchProducts } from "@/hooks/use-prefetch-products";

/**
 * Audio Quiz Page
 *
 * Uses the QuizContainer with audio-specific questions.
 * Supports Quick/Personalized/Expert modes with conditional questions.
 */
const AudioQuiz = () => {
  usePageTitle("Audio Quiz");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  usePrefetchProducts("audio");

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

  const handleComplete = (answers: ExtendedAudioQuizAnswers) => {
    // Encode answers to URL parameters
    const params = new URLSearchParams();
    Object.entries(answers).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    navigate(`/quiz/audio/results?${params.toString()}`);
  };

  return (
    <QuizContainer<ExtendedAudioQuizAnswers>
      questions={audioQuestions}
      category="audio"
      accentColor="accent"
      onComplete={handleComplete}
      initialAnswers={initialAnswers}
    />
  );
};

export default AudioQuiz;
