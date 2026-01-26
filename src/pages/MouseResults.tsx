import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mouse, Headphones, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResultsLayout,
  RecommendationCard,
  AnswerSummary,
  ResultsSkeleton,
  NoResultsMessage,
} from "@/components/results";
import { useMouseRecommendations } from "@/hooks/use-recommendations";
import type { MouseQuizAnswers } from "@/lib/scoring";

const MouseResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get answers from navigation state
  const answers = location.state?.answers as MouseQuizAnswers | undefined;

  // Generate recommendations
  const { recommendations, isLoading, error } = useMouseRecommendations(
    answers ?? null
  );

  // Redirect to quiz if no answers
  useEffect(() => {
    if (!answers) {
      navigate("/quiz/mouse", { replace: true });
    }
  }, [answers, navigate]);

  const handleRetakeQuiz = () => {
    navigate("/quiz/mouse");
  };

  // Don't render until we have answers
  if (!answers) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <ResultsLayout category="mouse" onRetakeQuiz={handleRetakeQuiz}>
        <ResultsSkeleton accentColor="primary" />
      </ResultsLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <ResultsLayout category="mouse" onRetakeQuiz={handleRetakeQuiz}>
        <div className="py-12 text-center">
          <p className="text-red-500">
            Something went wrong: {error.message}
          </p>
          <Button
            variant="outline"
            onClick={handleRetakeQuiz}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </ResultsLayout>
    );
  }

  // No results
  if (!recommendations || recommendations.topPicks.length === 0) {
    return (
      <ResultsLayout category="mouse" onRetakeQuiz={handleRetakeQuiz}>
        <div className="py-12">
          <NoResultsMessage category="mouse" onRetakeQuiz={handleRetakeQuiz} />
        </div>
      </ResultsLayout>
    );
  }

  const { topPicks, alternates, totalEvaluated } = recommendations;

  return (
    <ResultsLayout category="mouse" onRetakeQuiz={handleRetakeQuiz}>
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Mouse className="h-4 w-4" />
            <span>
              {totalEvaluated} mice evaluated
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Your Perfect Mouse Matches
          </h1>
          <div className="mx-auto max-w-2xl">
            <AnswerSummary answers={answers} category="mouse" />
          </div>
        </div>

        {/* Top pick (featured) */}
        {topPicks.length > 0 && (
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "0ms" }}
          >
            <RecommendationCard
              scoredProduct={topPicks[0]}
              rank={1}
              isTopPick={true}
              accentColor="primary"
            />
          </div>
        )}

        {/* #2 and #3 picks */}
        {topPicks.length > 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {topPicks.slice(1).map((scored, index) => (
              <div
                key={scored.product.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <RecommendationCard
                  scoredProduct={scored}
                  rank={index + 2}
                  isTopPick={true}
                  accentColor="primary"
                />
              </div>
            ))}
          </div>
        )}

        {/* Alternates section */}
        {alternates.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-muted-foreground">
              Also Consider
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {alternates.map((scored, index) => (
                <div
                  key={scored.product.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{
                    animationDelay: `${(topPicks.length + index) * 100}ms`,
                  }}
                >
                  <RecommendationCard
                    scoredProduct={scored}
                    rank={topPicks.length + index + 1}
                    isTopPick={false}
                    accentColor="primary"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex flex-col items-center gap-4 border-t border-border/50 pt-8 sm:flex-row sm:justify-center">
          <Button variant="accent" asChild className="gap-2">
            <Link to="/quiz/audio">
              <Headphones className="h-4 w-4" />
              Try Audio Quiz
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </ResultsLayout>
  );
};

export default MouseResults;
