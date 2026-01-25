import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Crosshair } from "lucide-react";

interface QuizLayoutProps {
  children: ReactNode;
  accentColor?: "primary" | "accent";
}

const QuizLayout = ({ children, accentColor = "primary" }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                accentColor === "primary" ? "bg-primary/20" : "bg-accent/20"
              )}
            >
              <Crosshair
                className={cn(
                  "h-5 w-5",
                  accentColor === "primary" ? "text-primary" : "text-accent"
                )}
              />
            </div>
            <span className="font-display text-lg font-bold">GearMatch</span>
          </Link>

          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Exit Quiz
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-6 pb-12 pt-28">{children}</main>

      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-10 blur-3xl",
            accentColor === "primary" ? "bg-primary" : "bg-accent"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-10 blur-3xl",
            accentColor === "primary" ? "bg-primary" : "bg-accent"
          )}
        />
      </div>
    </div>
  );
};

export default QuizLayout;
