import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Keyboard,
  Gamepad2,
  Briefcase,
  Code,
  Zap,
  Wifi,
  Cable,
  Coins,
  ArrowRight,
  LayoutGrid,
  Minimize2,
  Maximize2,
  Box,
  Target,
  Volume2,
  Sparkles,
  Settings,
  Feather,
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
    icon: typeof Keyboard;
    title: string;
    description: string;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: "primary-use",
    title: "What's your primary use case?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      {
        id: "competitive-gaming",
        icon: Target,
        title: "Competitive Gaming",
        description: "FPS, fighting games, esports",
      },
      {
        id: "casual-gaming",
        icon: Gamepad2,
        title: "Casual Gaming",
        description: "RPGs, story games, variety",
      },
      {
        id: "productivity",
        icon: Briefcase,
        title: "Productivity / Office",
        description: "Documents, email, browsing",
      },
      {
        id: "programming",
        icon: Code,
        title: "Programming / Typing",
        description: "Coding, writing, heavy typing",
      },
    ],
  },
  {
    id: "form-factor",
    title: "What size keyboard do you prefer?",
    subtitle: "Select all sizes you'd consider",
    multiSelect: true,
    options: [
      {
        id: "full-size",
        icon: Maximize2,
        title: "Full-Size (100%)",
        description: "Numpad + all keys",
      },
      {
        id: "tkl",
        icon: LayoutGrid,
        title: "TKL (80%)",
        description: "No numpad, keeps nav cluster",
      },
      {
        id: "75-percent",
        icon: Box,
        title: "75% / Compact",
        description: "Function row, minimal footprint",
      },
      {
        id: "60-65-percent",
        icon: Minimize2,
        title: "60-65%",
        description: "Ultra compact, layers for functions",
      },
    ],
  },
  {
    id: "switch-type",
    title: "What switch feel do you prefer?",
    subtitle: "Select all that interest you",
    multiSelect: true,
    options: [
      {
        id: "linear",
        icon: Zap,
        title: "Linear",
        description: "Smooth, no bump — fast for gaming",
      },
      {
        id: "tactile",
        icon: Keyboard,
        title: "Tactile",
        description: "Bump feedback — great for typing",
      },
      {
        id: "clicky",
        icon: Volume2,
        title: "Clicky",
        description: "Bump + click sound — satisfying",
      },
      {
        id: "no-preference",
        icon: Settings,
        title: "No Preference",
        description: "I'm open to anything",
      },
    ],
  },
  {
    id: "gaming-features",
    title: "How important are gaming features?",
    subtitle: "Rapid Trigger, adjustable actuation, and low latency for competitive play",
    options: [
      {
        id: "essential",
        icon: Target,
        title: "Essential",
        description: "Need rapid trigger, 8K polling, lowest latency",
      },
      {
        id: "nice-to-have",
        icon: Gamepad2,
        title: "Nice to Have",
        description: "Good performance matters, but not extreme",
      },
      {
        id: "not-important",
        icon: Briefcase,
        title: "Not Important",
        description: "Typing feel and features matter more",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Wireless or wired?",
    subtitle: "Wireless = freedom & multi-device, Wired = no charging",
    options: [
      {
        id: "wireless-essential",
        icon: Wifi,
        title: "Wireless Essential",
        description: "Must be wireless, hate cables",
      },
      {
        id: "wireless-preferred",
        icon: Wifi,
        title: "Wireless Preferred",
        description: "Prefer wireless, but wired is OK",
      },
      {
        id: "wired-preferred",
        icon: Cable,
        title: "Wired Preferred",
        description: "Reliability, no battery anxiety",
      },
      {
        id: "no-preference",
        icon: Keyboard,
        title: "No Preference",
        description: "Either works for me",
      },
    ],
  },
  {
    id: "priority-feature",
    title: "What's most important to you?",
    subtitle: "Select all that matter to you",
    multiSelect: true,
    options: [
      {
        id: "performance",
        icon: Zap,
        title: "Raw Performance",
        description: "Lowest latency, fastest inputs",
      },
      {
        id: "typing-feel",
        icon: Feather,
        title: "Typing Feel",
        description: "Premium switches, gasket mount",
      },
      {
        id: "customization",
        icon: Settings,
        title: "Customization",
        description: "Hot-swap, RGB, QMK/VIA",
      },
      {
        id: "quiet",
        icon: Volume2,
        title: "Quiet Operation",
        description: "Silent for office or shared spaces",
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
        title: "Budget",
        description: "Under $100",
      },
      {
        id: "mid-range",
        icon: Coins,
        title: "Mid-Range",
        description: "$100 - $175",
      },
      {
        id: "premium",
        icon: Sparkles,
        title: "Premium",
        description: "$175 - $250",
      },
      {
        id: "enthusiast",
        icon: Sparkles,
        title: "Enthusiast",
        description: "$250+",
      },
    ],
  },
];

const KeyboardQuiz = () => {
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
      navigate(`/quiz/keyboard/results?${params.toString()}`);
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
    <QuizLayout accentColor="secondary">
      <div className="space-y-8">
        {/* Progress */}
        <QuizProgress
          currentStep={currentStep}
          totalSteps={questions.length}
          onBack={handleBack}
          accentColor="secondary"
        />

        {/* Question header */}
        <div className="space-y-2 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 text-sm text-foreground">
            <Keyboard className="h-4 w-4" />
            <span>Keyboard Quiz</span>
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
                accentColor="secondary"
                multiSelect={currentQuestion.multiSelect}
              />
            );
          })}
        </div>

        {/* Continue button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
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

export default KeyboardQuiz;
