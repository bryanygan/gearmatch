import { useReveal } from "./useReveal";

const steps = [
  {
    num: "01",
    title: "Tell Us How You Play",
    description:
      "Quick questions about your grip style, hand size, game genres, and what drives you crazy about your current gear. Takes about 2 minutes.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    color: "var(--v2-primary)",
  },
  {
    num: "02",
    title: "Get Matched Picks",
    description:
      "We analyze your answers against real specs and player feedback. No generic 'Top 10' lists — just 3-5 options that actually fit YOU.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
    color: "var(--v2-secondary)",
  },
  {
    num: "03",
    title: "Compare & Choose",
    description:
      "See exactly why each pick works for your needs. Honest tradeoffs, real-world insights, and links to buy when you're ready.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 6h18M3 12h18M3 18h18" />
        <circle cx="7" cy="6" r="2" fill="currentColor" />
        <circle cx="17" cy="12" r="2" fill="currentColor" />
        <circle cx="10" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
    color: "var(--v2-accent)",
  },
];

const HowItWorksV2 = () => {
  const { ref, revealed } = useReveal(0.1);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--v2-bg-surface)" }}
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--v2-border-bright), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={`v2-reveal ${revealed ? "v2-revealed" : ""}`}
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "var(--v2-primary)",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            [ Process ]
          </div>
          <h2
            className={`v2-reveal v2-reveal-d1 ${
              revealed ? "v2-revealed" : ""
            }`}
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "0.03em",
              marginBottom: "12px",
            }}
          >
            HOW IT{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--v2-primary), #00cc7d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              WORKS
            </span>
          </h2>
          <p
            className={`v2-reveal v2-reveal-d2 ${
              revealed ? "v2-revealed" : ""
            }`}
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "17px",
              color: "var(--v2-text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            No spreadsheets. No endless Reddit threads. Just answer a few
            questions and get gear that fits.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-0 relative">
          {/* Connector lines (desktop only) */}
          <div
            className="hidden lg:block absolute top-1/2 left-[33.33%] w-[33.33%] h-px"
            style={{
              background: `repeating-linear-gradient(90deg, var(--v2-border-bright) 0px, var(--v2-border-bright) 6px, transparent 6px, transparent 12px)`,
              transform: "translateY(-50%)",
            }}
          />

          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`v2-reveal ${revealed ? "v2-revealed" : ""} relative`}
              style={{
                transitionDelay: `${0.15 + index * 0.15}s`,
              }}
            >
              <div
                className="v2-card v2-brackets group"
                style={{
                  padding: "32px",
                  margin: "0 auto",
                  maxWidth: "360px",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                {/* Large background number */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "16px",
                    fontFamily: "var(--v2-font-display)",
                    fontSize: "72px",
                    color: "var(--v2-border)",
                    lineHeight: 1,
                    opacity: 0.5,
                    pointerEvents: "none",
                    transition: "color 0.3s ease",
                  }}
                  className="group-hover:!text-[var(--v2-border-bright)]"
                >
                  {step.num}
                </div>

                {/* Icon in hex */}
                <div
                  className="v2-hex-icon mb-6"
                  style={{
                    background: `color-mix(in srgb, ${step.color} 12%, transparent)`,
                    color: step.color,
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--v2-font-ui)",
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "12px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--v2-text-muted)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksV2;
