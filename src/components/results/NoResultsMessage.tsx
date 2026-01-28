import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NoResultsMessageProps {
  category: "mouse" | "audio" | "keyboard";
  onRetakeQuiz: () => void;
}

const NoResultsMessage = ({
  category,
  onRetakeQuiz,
}: NoResultsMessageProps) => {
  const accentColor = category === "mouse" ? "primary" : category === "audio" ? "accent" : "secondary";

  return (
    <Card className="mx-auto max-w-md border-2 border-dashed p-8 text-center">
      <div className="space-y-4">
        <div
          className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
            accentColor === "primary" && "bg-primary/10",
            accentColor === "accent" && "bg-accent/10",
            accentColor === "secondary" && "bg-secondary"
          )}
        >
          <AlertCircle
            className={cn(
              "h-8 w-8",
              accentColor === "primary" && "text-primary",
              accentColor === "accent" && "text-accent",
              accentColor === "secondary" && "text-foreground"
            )}
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold">
            No Perfect Matches Found
          </h3>
          <p className="text-sm text-muted-foreground">
            We couldn't find products that match your exact preferences. This
            might happen if you have very specific requirements or we need to
            add more products to our database.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <p className="text-sm text-muted-foreground">
            Try adjusting your preferences:
          </p>
          <ul className="space-y-1 text-left text-sm text-muted-foreground">
            <li>• Consider "No Preference" for connection type</li>
            <li>• Try a different {category === "keyboard" ? "form factor or switch type" : "weight or form factor"} preference</li>
            <li>• Expand your budget range</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
          <Button
            onClick={onRetakeQuiz}
            variant={accentColor === "primary" ? "hero" : accentColor === "accent" ? "accent" : "secondary"}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NoResultsMessage;
