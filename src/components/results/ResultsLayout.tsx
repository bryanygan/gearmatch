import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { RotateCcw, Mouse, Headphones, Keyboard, Monitor, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Results link copied!");
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast.success("Results link copied!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };
  const accentColor = config.accent;
  const CategoryIcon = config.icon;
  const categoryLabel = config.label;

  return (
    <div className="min-h-screen" style={{ background: "var(--v2-bg)", color: "var(--v2-text)" }}>
      {/* Header */}
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{
          background: "rgba(7, 7, 13, 0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0, 255, 157, 0.12)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/gearmatchlogo.svg"
                alt="GearMatch logo"
                className="w-8 h-8 object-contain"
              />
              <span
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: "18px",
                  letterSpacing: "0.08em",
                  color: "var(--v2-text)",
                }}
              >
                GEARMATCH
              </span>
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

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
              aria-label="Share results"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
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
