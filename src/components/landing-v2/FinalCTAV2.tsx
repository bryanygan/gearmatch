import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";

const FinalCTAV2 = () => {
  const { ref, revealed } = useReveal(0.15);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: "var(--v2-bg)" }}
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 255, 157, 0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 v2-dot-grid opacity-15" />

      {/* Pulsing border frame */}
      <div
        className="absolute inset-8 md:inset-16 pointer-events-none"
        style={{
          border: "1px solid var(--v2-border)",
          opacity: 0.3,
        }}
      >
        {/* Corner accents */}
        <div
          className="absolute -top-px -left-px w-8 h-8"
          style={{
            borderTop: "2px solid var(--v2-primary)",
            borderLeft: "2px solid var(--v2-primary)",
          }}
        />
        <div
          className="absolute -top-px -right-px w-8 h-8"
          style={{
            borderTop: "2px solid var(--v2-primary)",
            borderRight: "2px solid var(--v2-primary)",
          }}
        />
        <div
          className="absolute -bottom-px -left-px w-8 h-8"
          style={{
            borderBottom: "2px solid var(--v2-primary)",
            borderLeft: "2px solid var(--v2-primary)",
          }}
        />
        <div
          className="absolute -bottom-px -right-px w-8 h-8"
          style={{
            borderBottom: "2px solid var(--v2-primary)",
            borderRight: "2px solid var(--v2-primary)",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="v2-particle"
          style={{
            left: `${20 + i * 20}%`,
            bottom: "30%",
            animationDelay: `${i * 2}s`,
            animationDuration: `${7 + i}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* System label */}
          <div
            className={`v2-reveal ${revealed ? "v2-revealed" : ""}`}
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "var(--v2-primary)",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            [ Initialize Matching Sequence ]
          </div>

          {/* Headline */}
          <h2
            className={`v2-glitch v2-reveal v2-reveal-d1 ${
              revealed ? "v2-revealed" : ""
            }`}
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(28px, 5vw, 56px)",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            READY TO FIND GEAR
            <br />
            THAT{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--v2-primary), var(--v2-accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ACTUALLY FITS?
            </span>
          </h2>

          {/* Description */}
          <p
            className={`v2-reveal v2-reveal-d2 ${
              revealed ? "v2-revealed" : ""
            }`}
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "18px",
              color: "var(--v2-text-muted)",
              maxWidth: "480px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            2-3 minutes. Zero spam. Just personalized picks based on how you
            actually play.
          </p>

          {/* CTA Buttons - 2x2 Grid */}
          <div
            className={`grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-10 v2-reveal v2-reveal-d3 ${
              revealed ? "v2-revealed" : ""
            }`}
          >
            <Link
              to="/quiz/mouse"
              className="v2-btn v2-btn-primary v2-btn-lg"
              style={{ textDecoration: "none", justifyContent: "center" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="hidden sm:block"
                aria-hidden="true"
              >
                <path d="M12 2a8 8 0 0 0-8 8v4a8 8 0 0 0 16 0v-4a8 8 0 0 0-8-8z" />
                <line x1="12" y1="6" x2="12" y2="10" />
              </svg>
              Find Your Mouse
            </Link>
            <Link
              to="/quiz/audio"
              className="v2-btn v2-btn-secondary v2-btn-lg"
              style={{ textDecoration: "none", justifyContent: "center" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="hidden sm:block"
                aria-hidden="true"
              >
                <path d="M3 18v-6a9 9 0 0118 0v6" />
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
              </svg>
              Audio Picks
            </Link>
            <Link
              to="/quiz/keyboard"
              className="v2-btn v2-btn-white v2-btn-lg"
              style={{ textDecoration: "none", justifyContent: "center" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="hidden sm:block"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
              </svg>
              Keyboard Match
            </Link>
            <Link
              to="/quiz/monitor"
              className="v2-btn v2-btn-tertiary v2-btn-lg"
              style={{ textDecoration: "none", justifyContent: "center" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="hidden sm:block"
                aria-hidden="true"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              Monitor Finder
            </Link>
          </div>

          {/* Bottom note */}
          <p
            className={`v2-reveal v2-reveal-d4 ${
              revealed ? "v2-revealed" : ""
            }`}
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: "11px",
              color: "var(--v2-text-dim)",
              letterSpacing: "0.08em",
            }}
          >
            FREE TO USE &nbsp;•&nbsp; NO ACCOUNT REQUIRED &nbsp;•&nbsp; NO SPONSORED RECOMMENDATIONS
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTAV2;
