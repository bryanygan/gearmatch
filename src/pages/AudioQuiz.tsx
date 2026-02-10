import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  usePrefetchProducts("audio");

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
    />
  );
};

export default AudioQuiz;
