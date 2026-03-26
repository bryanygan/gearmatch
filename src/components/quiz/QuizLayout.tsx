import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface QuizLayoutProps {
  children: ReactNode;
  accentColor?: "primary" | "accent" | "secondary" | "tertiary";
}

const QuizLayout = ({ children, accentColor = "primary" }: QuizLayoutProps) => {
  return (
    <div
      className="h-dvh flex flex-col overflow-hidden"
      style={{ background: "var(--v2-bg)", color: "var(--v2-text)" }}
    >
      {/* Header — matches NavbarV2 style */}
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{
          background: "rgba(7, 7, 13, 0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0, 255, 157, 0.12)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
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

          <Link
            to="/"
            className="transition-colors duration-200"
            style={{
              fontFamily: "var(--v2-font-ui)",
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--v2-text-muted)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--v2-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--v2-text-muted)")
            }
          >
            Exit Quiz
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex flex-1 flex-col min-h-0 overflow-y-auto w-full max-w-4xl px-6 pb-4 md:pb-6 pt-20">{children}</main>

      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-[0.07] blur-3xl",
            accentColor === "primary" && "bg-primary",
            accentColor === "accent" && "bg-accent",
            accentColor === "secondary" && "bg-muted-foreground",
            accentColor === "tertiary" && "bg-violet-500"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-[0.07] blur-3xl",
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

export default QuizLayout;
