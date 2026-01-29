import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Headphones,
  Mic,
  Music,
  Volume2,
  Ear,
  Clock,
  ArrowRight,
  Target,
  Sparkles,
  Podcast,
  Gamepad2,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizOptionCard from "@/components/quiz/QuizOptionCard";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  multiSelect?: boolean;
  options: {
    id: string;
    icon: typeof Headphones;
    title: string;
    description: string;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: "primary-use",
    title: "What's your main use case?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      {
        id: "competitive",
        icon: Target,
        title: "Precision Audio",
        description: "Clear audio cues and detail",
      },
      {
        id: "immersive",
        icon: Sparkles,
        title: "Immersive Listening",
        description: "Rich audio, deep bass",
      },
      {
        id: "mixed",
        icon: Music,
        title: "Mixed Use",
        description: "Best of both worlds",
      },
      {
        id: "streaming",
        icon: Podcast,
        title: "Streaming / Content",
        description: "Need great mic quality",
      },
    ],
  },
  {
    id: "form-factor",
    title: "What form factor do you prefer?",
    subtitle: "Select all you'd consider",
    multiSelect: true,
    options: [
      {
        id: "over-ear",
        icon: Headphones,
        title: "Over-Ear Headset",
        description: "Full-size, built-in mic",
      },
      {
        id: "over-ear-headphone",
        icon: Music,
        title: "Over-Ear Headphones",
        description: "Audiophile quality, no mic",
      },
      {
        id: "iem",
        icon: Ear,
        title: "IEMs / Earbuds",
        description: "Compact, in-ear monitors",
      },
      {
        id: "open-back",
        icon: Volume2,
        title: "Open-Back",
        description: "Wider soundstage, less isolation",
      },
    ],
  },
  {
    id: "mic-needs",
    title: "How important is the microphone?",
    subtitle: "For streaming and comms, mic quality matters a lot",
    options: [
      {
        id: "essential",
        icon: Mic,
        title: "Essential",
        description: "I stream or do voice comms daily",
      },
      {
        id: "nice-to-have",
        icon: Mic,
        title: "Nice to Have",
        description: "Casual voice chat is fine",
      },
      {
        id: "not-needed",
        icon: Headphones,
        title: "Not Needed",
        description: "I have a separate mic setup",
      },
    ],
  },
  {
    id: "session-length",
    title: "How long are your listening sessions?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      {
        id: "short",
        icon: Clock,
        title: "1-2 Hours",
        description: "Quick sessions",
      },
      {
        id: "medium",
        icon: Clock,
        title: "3-5 Hours",
        description: "Regular sessions",
      },
      {
        id: "long",
        icon: Clock,
        title: "6+ Hours",
        description: "Marathon sessions",
      },
      {
        id: "all-day",
        icon: Gamepad2,
        title: "All Day",
        description: "Work and play",
      },
    ],
  },
  {
    id: "budget",
    title: "What's your budget range?",
    subtitle: "Select all ranges you'd consider",
    multiSelect: true,
    options: [
      {
        id: "budget",
        icon: Coins,
        title: "Budget Friendly",
        description: "Under $75",
      },
      {
        id: "mid-range",
        icon: Coins,
        title: "Mid-Range",
        description: "$75 - $150",
      },
      {
        id: "premium",
        icon: Coins,
        title: "Premium",
        description: "$150 - $300",
      },
      {
        id: "no-limit",
        icon: Sparkles,
        title: "Best of the Best",
        description: "$300+",
      },
    ],
  },
];

const AudioQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const currentQuestion = questions[currentStep - 1];
  const isLastQuestion = currentStep === questions.length;
  const currentAnswer = answers[currentQuestion.id];
  const hasAnswer = currentQuestion.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : Boolean(currentAnswer);

  const handleSelect = (optionId: string) => {
    if (currentQuestion.multiSelect) {
      setAnswers((prev) => {
        const current = prev[currentQuestion.id];
        const currentArray = Array.isArray(current) ? current : [];
        const isSelected = currentArray.includes(optionId);
        return {
          ...prev,
          [currentQuestion.id]: isSelected
            ? currentArray.filter((id) => id !== optionId)
            : [...currentArray, optionId],
        };
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to results page with answers encoded in URL
      const params = new URLSearchParams();
      Object.entries(answers).forEach(([key, value]) => {
        params.set(key, Array.isArray(value) ? value.join(",") : value);
      });
      navigate(`/quiz/audio/results?${params.toString()}`);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <QuizLayout accentColor="accent">
      <div className="space-y-8">
        {/* Progress */}
        <QuizProgress
          currentStep={currentStep}
          totalSteps={questions.length}
          onBack={handleBack}
          accentColor="accent"
        />

        {/* Question header */}
        <div className="space-y-2 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
            <Headphones className="h-4 w-4" />
            <span>Audio Quiz</span>
          </div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            {currentQuestion.title}
          </h1>
          <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
        </div>

        {/* Options grid */}
        <div
          className={cn(
            "grid gap-4",
            currentQuestion.options.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {currentQuestion.options.map((option) => {
            const currentAnswer = answers[currentQuestion.id];
            const isSelected = currentQuestion.multiSelect
              ? Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
              : currentAnswer === option.id;
            return (
              <QuizOptionCard
                key={option.id}
                icon={option.icon}
                title={option.title}
                description={option.description}
                selected={isSelected}
                onClick={() => handleSelect(option.id)}
                accentColor="accent"
                multiSelect={currentQuestion.multiSelect}
              />
            );
          })}
        </div>

        {/* Continue button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="accent"
            size="xl"
            onClick={handleNext}
            disabled={!hasAnswer}
            className="min-w-[200px] gap-2"
          >
            {isLastQuestion ? "See My Matches" : "Continue"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
};

export default AudioQuiz;
