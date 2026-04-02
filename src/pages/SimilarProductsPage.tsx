import { usePageTitle } from "@/hooks/usePageTitle";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronDown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ResultsLayout,
  RecommendationCard,
  ResultsSkeleton,
  NoResultsMessage,
} from "@/components/results";
import { getSimilarProducts, type SimilarCategory } from "@/lib/scoring/similar";

const VALID_CATEGORIES = new Set<SimilarCategory>(["mouse", "audio", "keyboard", "monitor"]);

const CATEGORY_LABELS: Record<SimilarCategory, string> = {
  mouse: "Mouse",
  audio: "Audio",
  keyboard: "Keyboard",
  monitor: "Monitor",
};

const SimilarProductsPage = () => {
  const { category, productId } = useParams<{ category: string; productId: string }>();
  const navigate = useNavigate();

  // Validate params
  const validCategory = VALID_CATEGORIES.has(category as SimilarCategory)
    ? (category as SimilarCategory)
    : null;

  usePageTitle(
    validCategory ? `Similar ${CATEGORY_LABELS[validCategory]} Products` : "Similar Products"
  );

  const [visibleAlternatesCount, setVisibleAlternatesCount] = useState(6);
  const ALTERNATES_PER_PAGE = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["similar", category, productId],
    queryFn: () => getSimilarProducts(validCategory!, productId!),
    enabled: !!validCategory && !!productId,
  });

  const handleGoBack = () => {
    // If there's browser history, go back; otherwise go to quiz results
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(validCategory ? `/quiz/${validCategory}/results` : "/");
    }
  };

  // Invalid category or missing productId
  if (!validCategory || !productId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold">Invalid product category</h1>
        <Button variant="outline" asChild className="mt-4">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const accentColor = ({
    mouse: "primary",
    audio: "accent",
    keyboard: "secondary",
    monitor: "tertiary",
  } as const)[validCategory];

  if (isLoading) {
    return (
      <ResultsLayout category={validCategory} onRetakeQuiz={() => navigate(`/quiz/${validCategory}`)}>
        <ResultsSkeleton accentColor={accentColor} />
      </ResultsLayout>
    );
  }

  if (error || !data) {
    return (
      <ResultsLayout category={validCategory} onRetakeQuiz={() => navigate(`/quiz/${validCategory}`)}>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {error ? "Something went wrong loading similar products." : "Product not found."}
          </p>
          <Button variant="outline" onClick={handleGoBack} className="mt-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </ResultsLayout>
    );
  }

  const { sourceProduct, recommendations } = data;
  const { topPicks, alternates = [], totalEvaluated } = recommendations;

  if (topPicks.length === 0 && alternates.length === 0) {
    return (
      <ResultsLayout category={validCategory} onRetakeQuiz={() => navigate(`/quiz/${validCategory}`)}>
        <div className="py-12">
          <NoResultsMessage category={validCategory} onRetakeQuiz={() => navigate(`/quiz/${validCategory}`)} />
        </div>
      </ResultsLayout>
    );
  }

  const visibleAlternates = alternates.slice(0, visibleAlternatesCount);
  const hasMoreAlternates = visibleAlternatesCount < alternates.length;
  const remainingAlternates = alternates.length - visibleAlternatesCount;

  const handleShowMore = () => {
    setVisibleAlternatesCount((prev) =>
      Math.min(prev + ALTERNATES_PER_PAGE, alternates.length)
    );
  };

  const formatPrice = (range: [number, number]) => {
    if (range[0] === 0 && range[1] === 0) return "Price varies";
    if (range[0] === range[1]) return `$${range[0]}`;
    return `$${range[0]} - $${range[1]}`;
  };

  return (
    <ResultsLayout category={validCategory} onRetakeQuiz={() => navigate(`/quiz/${validCategory}`)}>
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="gap-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to results
          </Button>

          <div className="text-center space-y-3">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Products Similar to {sourceProduct.name}
            </h1>
            <p className="text-muted-foreground">
              {totalEvaluated} {CATEGORY_LABELS[validCategory].toLowerCase()} products evaluated for similarity
            </p>
          </div>

          {/* Source product reference card */}
          <Card className={cn(
            "mx-auto max-w-lg border-2 p-4",
            accentColor === "primary" && "border-primary/30 bg-primary/5",
            accentColor === "accent" && "border-accent/30 bg-accent/5",
            accentColor === "secondary" && "border-border bg-secondary/30",
            accentColor === "tertiary" && "border-violet-500/30 bg-violet-500/5",
          )}>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <Badge variant="outline" className="mb-1 text-xs">Reference product</Badge>
                <h3 className="font-display font-bold truncate">{sourceProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{sourceProduct.brand}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {formatPrice(sourceProduct.price_range_usd)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Top similar picks */}
        {topPicks.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold text-center">
              Most Similar
            </h2>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <RecommendationCard
                scoredProduct={topPicks[0]}
                rank={1}
                isTopPick={true}
                accentColor={accentColor}
              />
            </div>
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
                      accentColor={accentColor}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* More alternatives */}
        {alternates.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-muted-foreground">
              Also Similar
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleAlternates.map((scored, index) => (
                <div
                  key={scored.product.id}
                  className={
                    index < 4
                      ? "animate-in fade-in slide-in-from-bottom-4 duration-500"
                      : undefined
                  }
                  style={
                    index < 4
                      ? { animationDelay: `${(topPicks.length + index) * 100}ms` }
                      : undefined
                  }
                >
                  <RecommendationCard
                    scoredProduct={scored}
                    rank={topPicks.length + index + 1}
                    isTopPick={false}
                    accentColor={accentColor}
                  />
                </div>
              ))}
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

        {/* Footer actions */}
        <div className="flex flex-col items-center gap-4 border-t border-border/50 pt-8 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={handleGoBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Results
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

export default SimilarProductsPage;
