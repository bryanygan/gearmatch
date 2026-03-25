import { usePageTitle } from "@/hooks/usePageTitle";
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import { Keyboard, Mouse, Headphones, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ResultsLayout,
  RecommendationCard,
  AnswerSummary,
  ResultsSkeleton,
  NoResultsMessage,
} from "@/components/results";
import ResultsViewToggle from "@/components/results/ResultsViewToggle";
import CompareModal from "@/components/results/CompareModal";
import { useKeyboardRecommendations } from "@/hooks/use-recommendations";
import {
  validateKeyboardAnswers,
  searchParamsToObject,
} from "@/lib/validation";
import { toast } from "sonner";

const KeyboardResults = () => {
  usePageTitle("Keyboard Results");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // State for "Show More" functionality - start with 2 visible alternates
  const [visibleAlternatesCount, setVisibleAlternatesCount] = useState(2);
  const ALTERNATES_PER_PAGE = 10;
  const [view, setView] = useState<"grid" | "list">("grid");
  const [compareList, setCompareList] = useState<string[]>([]);
  const [excludeIds, setExcludeIds] = useState<string[]>(() => {
    return searchParams.get("exclude")?.split(",").filter(Boolean) ?? [];
  });
  const [showFilteredOut, setShowFilteredOut] = useState(false);

  // Track if initial animation has played - only animate once per quiz completion
  const hasAnimatedRef = useRef(false);

  // Get and validate answers from URL params first, then fall back to navigation state
  const answers = useMemo(() => {
    // Try to get answers from URL params
    const urlAnswers = searchParamsToObject(searchParams);

    // If URL has answers, validate them
    if (Object.keys(urlAnswers).length > 0) {
      return validateKeyboardAnswers(urlAnswers);
    }

    // Fall back to navigation state (also validate)
    if (location.state?.answers) {
      return validateKeyboardAnswers(location.state.answers);
    }

    return null;
  }, [searchParams, location.state]);

  // Generate recommendations
  const { recommendations, isLoading, error } = useKeyboardRecommendations(
    answers ?? null
  );

  // Redirect to quiz if no answers
  useEffect(() => {
    if (!answers) {
      navigate("/quiz/keyboard", { replace: true });
    }
  }, [answers, navigate]);

  const handleRetakeQuiz = () => {
    navigate("/quiz/keyboard");
  };

  // Don't render until we have answers
  if (!answers) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <ResultsLayout category="keyboard" onRetakeQuiz={handleRetakeQuiz}>
        <ResultsSkeleton accentColor="secondary" />
      </ResultsLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <ResultsLayout category="keyboard" onRetakeQuiz={handleRetakeQuiz}>
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
      <ResultsLayout category="keyboard" onRetakeQuiz={handleRetakeQuiz}>
        <div className="py-12">
          <NoResultsMessage category="keyboard" onRetakeQuiz={handleRetakeQuiz} />
        </div>
      </ResultsLayout>
    );
  }

  const { topPicks: rawTopPicks, alternates: rawAlternates, filteredOut: rawFilteredOut = [], totalEvaluated } = recommendations;
  const topPicks = rawTopPicks.filter(sp => !excludeIds.includes(sp.product.id));
  const alternates = rawAlternates.filter(sp => !excludeIds.includes(sp.product.id));

  const handleExclude = (productId: string) => {
    setExcludeIds(prev => [...prev, productId]);
    toast.info("Product excluded from results");
  };
  const handleCompareToggle = (productId: string) => {
    setCompareList(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : prev.length < 2 ? [...prev, productId] : prev
    );
  };

  // Determine if this is the first render with results - animate only once
  const shouldAnimateInitial = !hasAnimatedRef.current;
  if (shouldAnimateInitial) {
    hasAnimatedRef.current = true;
  }

  const visibleAlternates = alternates.slice(0, visibleAlternatesCount);
  const hasMoreAlternates = visibleAlternatesCount < alternates.length;
  const remainingAlternates = alternates.length - visibleAlternatesCount;

  const handleShowMore = () => {
    setVisibleAlternatesCount((prev) =>
      Math.min(prev + ALTERNATES_PER_PAGE, alternates.length)
    );
  };

  return (
    <ResultsLayout category="keyboard" onRetakeQuiz={handleRetakeQuiz}>
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground">
              <Keyboard className="h-4 w-4" />
              <span>
                {totalEvaluated} keyboards evaluated
              </span>
            </div>
            <ResultsViewToggle view={view} onToggle={() => setView(v => v === "grid" ? "list" : "grid")} />
          </div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Your Curated Keyboard Matches
          </h1>
          <div className="mx-auto max-w-2xl">
            <AnswerSummary answers={answers} category="keyboard" quizPath="/quiz/keyboard" searchParams={searchParams} />
          </div>
        </div>

        {/* Top picks */}
        {topPicks.length > 0 && (
          <div className={cn(view === "list" ? "space-y-2" : "space-y-6")}>
            {view === "list" ? (
              topPicks.map((scored, index) => (
                <RecommendationCard
                  key={scored.product.id}
                  scoredProduct={scored}
                  rank={index + 1}
                  isTopPick={true}
                  accentColor="secondary"
                  compact={true}
                  onExclude={() => handleExclude(scored.product.id)}
                  onCompareToggle={() => handleCompareToggle(scored.product.id)}
                  isCompareSelected={compareList.includes(scored.product.id)}
                  compareDisabled={compareList.length >= 2 && !compareList.includes(scored.product.id)}
                />
              ))
            ) : (
              <>
                <div className={shouldAnimateInitial ? "animate-in fade-in slide-in-from-bottom-4 duration-500" : undefined}>
                  <RecommendationCard
                    scoredProduct={topPicks[0]}
                    rank={1}
                    isTopPick={true}
                    accentColor="secondary"
                    onExclude={() => handleExclude(topPicks[0].product.id)}
                    onCompareToggle={() => handleCompareToggle(topPicks[0].product.id)}
                    isCompareSelected={compareList.includes(topPicks[0].product.id)}
                    compareDisabled={compareList.length >= 2 && !compareList.includes(topPicks[0].product.id)}
                  />
                </div>
                {topPicks.length > 1 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {topPicks.slice(1).map((scored, index) => (
                      <div
                        key={scored.product.id}
                        className={shouldAnimateInitial ? "animate-in fade-in slide-in-from-bottom-4 duration-500" : undefined}
                        style={shouldAnimateInitial ? { animationDelay: `${(index + 1) * 100}ms` } : undefined}
                      >
                        <RecommendationCard
                          scoredProduct={scored}
                          rank={index + 2}
                          isTopPick={true}
                          accentColor="secondary"
                          onExclude={() => handleExclude(scored.product.id)}
                          onCompareToggle={() => handleCompareToggle(scored.product.id)}
                          isCompareSelected={compareList.includes(scored.product.id)}
                          compareDisabled={compareList.length >= 2 && !compareList.includes(scored.product.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Alternates section */}
        {alternates.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-muted-foreground">
              Also Consider
            </h2>
            <div className={cn(view === "list" ? "space-y-2" : "grid gap-4 sm:grid-cols-2")}>
              {visibleAlternates.map((scored, index) => {
                const shouldAnimate = shouldAnimateInitial && index < 2;
                return view === "list" ? (
                  <RecommendationCard
                    key={scored.product.id}
                    scoredProduct={scored}
                    rank={topPicks.length + index + 1}
                    isTopPick={false}
                    accentColor="secondary"
                    compact={true}
                    onExclude={() => handleExclude(scored.product.id)}
                    onCompareToggle={() => handleCompareToggle(scored.product.id)}
                    isCompareSelected={compareList.includes(scored.product.id)}
                    compareDisabled={compareList.length >= 2 && !compareList.includes(scored.product.id)}
                  />
                ) : (
                  <div
                    key={scored.product.id}
                    className={shouldAnimate ? "animate-in fade-in slide-in-from-bottom-4 duration-500" : undefined}
                    style={shouldAnimate ? { animationDelay: `${(topPicks.length + index) * 100}ms` } : undefined}
                  >
                    <RecommendationCard
                      scoredProduct={scored}
                      rank={topPicks.length + index + 1}
                      isTopPick={false}
                      accentColor="secondary"
                      onExclude={() => handleExclude(scored.product.id)}
                      onCompareToggle={() => handleCompareToggle(scored.product.id)}
                      isCompareSelected={compareList.includes(scored.product.id)}
                      compareDisabled={compareList.length >= 2 && !compareList.includes(scored.product.id)}
                    />
                  </div>
                );
              })}
            </div>
            {hasMoreAlternates && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleShowMore}
                  className="gap-2"
                >
                  <ChevronDown className="h-4 w-4" />
                  Show {Math.min(ALTERNATES_PER_PAGE, remainingAlternates)} More
                  <span className="text-muted-foreground">
                    ({remainingAlternates} remaining)
                  </span>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Outside filters section */}
        {rawFilteredOut.length > 0 && (
          <div className="space-y-4 border-t border-border/30 pt-6">
            <button
              onClick={() => setShowFilteredOut(prev => !prev)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", showFilteredOut && "rotate-180")} />
              Show products outside your filters ({rawFilteredOut.length})
            </button>
            {showFilteredOut && (
              <div className={cn(view === "list" ? "space-y-2" : "grid gap-4 sm:grid-cols-2", "opacity-70")}>
                {rawFilteredOut.slice(0, 10).map((scored, index) => (
                  <div key={scored.product.id} className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Outside your filters</span>
                    </div>
                    <RecommendationCard
                      scoredProduct={scored}
                      rank={topPicks.length + alternates.length + index + 1}
                      isTopPick={false}
                      accentColor="secondary"
                      compact={view === "list"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex flex-col items-center gap-4 border-t border-border/50 pt-8 sm:flex-row sm:justify-center">
          <Button variant="hero" asChild className="gap-2">
            <Link to="/quiz/mouse">
              <Mouse className="h-4 w-4" />
              Try Mouse Quiz
            </Link>
          </Button>
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

      {compareList.length === 2 && (() => {
        const allProducts = [...topPicks, ...alternates];
        const p1 = allProducts.find(sp => sp.product.id === compareList[0]);
        const p2 = allProducts.find(sp => sp.product.id === compareList[1]);
        if (!p1 || !p2) return null;
        return (
          <CompareModal
            products={[p1.product, p2.product]}
            scores={[p1.score, p2.score]}
            open={true}
            onClose={() => setCompareList([])}
          />
        );
      })()}
    </ResultsLayout>
  );
};

export default KeyboardResults;
