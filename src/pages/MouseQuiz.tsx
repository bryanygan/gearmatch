import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mouse,
  Hand,
  Zap,
  Target,
  Wifi,
  Cable,
  Feather,
  Weight,
  ArrowRight,
  Gamepad2,
  Swords,
  Map,
  Users,
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
  options: {
    id: string;
    icon: typeof Mouse;
    title: string;
    description: string;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: "hand-size",
    title: "What's your hand size?",
    subtitle: "Measure from the base of your palm to the tip of your middle finger",
    options: [
      {
        id: "small",
        icon: Hand,
        title: "Small",
        description: "Under 17cm / 6.7 inches",
      },
      {
        id: "medium",
        icon: Hand,
        title: "Medium",
        description: "17-19cm / 6.7-7.5 inches",
      },
      {
        id: "large",
        icon: Hand,
        title: "Large",
        description: "Over 19cm / 7.5 inches",
      },
    ],
  },
  {
    id: "grip-style",
    title: "How do you grip your mouse?",
    subtitle: "Your natural grip affects which shapes feel comfortable",
    options: [
      {
        id: "palm",
        icon: Hand,
        title: "Palm Grip",
        description: "Full hand rests on mouse",
      },
      {
        id: "claw",
        icon: Zap,
        title: "Claw Grip",
        description: "Fingertips arched, palm contact",
      },
      {
        id: "fingertip",
        icon: Target,
        title: "Fingertip Grip",
        description: "Only fingertips touch mouse",
      },
      {
        id: "relaxed-claw",
        icon: Hand,
        title: "Relaxed Claw",
        description: "Mix of palm and claw",
      },
    ],
  },
  {
    id: "weight-preference",
    title: "What weight do you prefer?",
    subtitle: "Lighter = faster flicks, heavier = more control",
    options: [
      {
        id: "ultralight",
        icon: Feather,
        title: "Ultralight",
        description: "Under 60g — max speed",
      },
      {
        id: "light",
        icon: Feather,
        title: "Light",
        description: "60-80g — balanced",
      },
      {
        id: "medium",
        icon: Weight,
        title: "Medium",
        description: "80-100g — controlled",
      },
      {
        id: "heavy",
        icon: Weight,
        title: "Heavy",
        description: "Over 100g — stable aim",
      },
    ],
  },
  {
    id: "wireless",
    title: "Wireless or wired?",
    subtitle: "Modern wireless has no lag — it's all about convenience vs charging",
    options: [
      {
        id: "wireless",
        icon: Wifi,
        title: "Wireless",
        description: "Freedom of movement, need to charge",
      },
      {
        id: "wired",
        icon: Cable,
        title: "Wired",
        description: "Always ready, cable drag",
      },
      {
        id: "either",
        icon: Mouse,
        title: "No Preference",
        description: "Either works for me",
      },
    ],
  },
  {
    id: "game-genre",
    title: "What do you mainly play?",
    subtitle: "Different games benefit from different mouse characteristics",
    options: [
      {
        id: "fps",
        icon: Target,
        title: "FPS / Shooters",
        description: "CS2, Valorant, Apex, COD",
      },
      {
        id: "moba-rts",
        icon: Map,
        title: "MOBA / RTS",
        description: "League, Dota, Starcraft",
      },
      {
        id: "mmo-rpg",
        icon: Swords,
        title: "MMO / RPG",
        description: "WoW, FFXIV, Diablo",
      },
      {
        id: "variety",
        icon: Gamepad2,
        title: "Variety / Casual",
        description: "A bit of everything",
      },
    ],
  },
];

const MouseQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep - 1];
  const isLastQuestion = currentStep === questions.length;
  const hasAnswer = answers[currentQuestion.id];

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // TODO: Navigate to results page with answers
      console.log("Quiz completed:", answers);
      navigate("/");
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
    <QuizLayout accentColor="primary">
      <div className="space-y-8">
        {/* Progress */}
        <QuizProgress
          currentStep={currentStep}
          totalSteps={questions.length}
          onBack={handleBack}
          accentColor="primary"
        />

        {/* Question header */}
        <div className="space-y-2 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Mouse className="h-4 w-4" />
            <span>Mouse Quiz</span>
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
          {currentQuestion.options.map((option) => (
            <QuizOptionCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              description={option.description}
              selected={answers[currentQuestion.id] === option.id}
              onClick={() => handleSelect(option.id)}
              accentColor="primary"
            />
          ))}
        </div>

        {/* Continue button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="hero"
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

export default MouseQuiz;
