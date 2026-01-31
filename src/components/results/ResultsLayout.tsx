import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Crosshair, RotateCcw, Mouse, Headphones, Keyboard, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultsLayoutProps {
  children: ReactNode;
  category: "mouse" | "audio" | "keyboard" | "monitor";
  onRetakeQuiz: () => void;
}

const categoryConfig = {
  mouse: { icon: Mouse, label: "Mouse", accent: "primary" as const },
  audio: { icon: Headphones, label: "Audio", accent: "accent" as const },
  keyboard: { icon: Keyboard, label: "Keyboard", accent: "secondary" as const },
  monitor: { icon: Monitor, label: "Monitor", accent: "tertiary" as const },
};

const ResultsLayout = ({
  children,
  category,
  onRetakeQuiz,
}: ResultsLayoutProps) => {
  const config = categoryConfig[category];
  const accentColor = config.accent;
  const CategoryIcon = config.icon;
  const categoryLabel = config.label;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  accentColor === "primary" && "bg-primary/20",
                  accentColor === "accent" && "bg-accent/20",
                  accentColor === "secondary" && "bg-secondary",
                  accentColor === "tertiary" && "bg-violet-500/20"
                )}
              >
                <Crosshair
                  className={cn(
                    "h-5 w-5",
                    accentColor === "primary" && "text-primary",
                    accentColor === "accent" && "text-accent",
                    accentColor === "secondary" && "text-foreground",
                    accentColor === "tertiary" && "text-violet-600 dark:text-violet-400"
                  )}
                />
              </div>
              <span className="font-display text-lg font-bold">GearMatch</span>
            </Link>

            {/* Category badge */}
            <div
              className={cn(
                "hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium sm:flex",
                accentColor === "primary" && "bg-primary/10 text-primary",
                accentColor === "accent" && "bg-accent/10 text-accent",
                accentColor === "secondary" && "bg-secondary text-foreground",
                accentColor === "tertiary" && "bg-violet-500/10 text-violet-600 dark:text-violet-400"
              )}
            >
              <CategoryIcon className="h-3.5 w-3.5" />
              <span>{categoryLabel} Results</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRetakeQuiz}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Retake Quiz</span>
            <span className="sm:hidden">Retake</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-24">{children}</main>

      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-10 blur-3xl",
            accentColor === "primary" && "bg-primary",
            accentColor === "accent" && "bg-accent",
            accentColor === "secondary" && "bg-muted-foreground",
            accentColor === "tertiary" && "bg-violet-500"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-10 blur-3xl",
            accentColor === "primary" && "bg-primary",
            accentColor === "accent" && "bg-accent",
            accentColor === "secondary" && "bg-muted-foreground",
            accentColor === "tertiary" && "bg-violet-500"
          )}
        />
      </div>
    </div>
  );
};

export default ResultsLayout;
