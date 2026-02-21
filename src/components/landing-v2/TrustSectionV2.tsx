import { useReveal } from "./useReveal";

const trustPoints = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Zero Sponsored Picks",
    description:
      "We don't take money from brands. Ever. Our recommendations are based purely on fit and quality.",
    status: "VERIFIED",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Transparent Reasoning",
    description:
      "Every recommendation comes with clear explanations. You'll know exactly why each pick works for you.",
    status: "ACTIVE",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Built by Enthusiasts",
    description:
      "We've been through the frustration of bad gear purchases. This tool exists because we needed it ourselves.",
    status: "CONFIRMED",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Real-World Testing",
    description:
      "Specs are just numbers. We consider actual user feedback, durability reports, and edge cases.",
    status: "ENABLED",
  },
];

const TrustSectionV2 = () => {
  const { ref, revealed } = useReveal(0.1);

  return (
    <section
      id="why-trust-us"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: "var(--v2-bg-surface)" }}
    >
      {/* Top border */}
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
            [ System Integrity ]
          </div>
          <h2
            className={`v2-reveal v2-reveal-d1 ${revealed ? "v2-revealed" : ""}`}
            style={{
              fontFamily: "var(--v2-font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "0.03em",
              marginBottom: "12px",
            }}
          >
            WHY{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--v2-primary), #00cc7d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TRUST US
            </span>
          </h2>
          <p
            className={`v2-reveal v2-reveal-d2 ${revealed ? "v2-revealed" : ""}`}
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "17px",
              color: "var(--v2-text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            We're not here to push products. We're here to help you stop wasting
            money on gear that doesn't fit.
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16 md:mb-20">
          {trustPoints.map((point, index) => (
            <div
              key={point.title}
              className={`v2-reveal ${revealed ? "v2-revealed" : ""}`}
              style={{ transitionDelay: `${0.15 + index * 0.1}s` }}
            >
              <div className="v2-card v2-card-glow group text-center" style={{ padding: "28px 20px" }}>
                {/* Status indicator */}
                <div
                  style={{
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--v2-primary)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--v2-primary)",
                      display: "inline-block",
                      animation: "v2-blink 2s step-end infinite",
                    }}
                  />
                  {point.status}
                </div>

                {/* Icon */}
                <div
                  className="mx-auto mb-5"
                  style={{
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--v2-border)",
                    background: "var(--v2-primary-dim)",
                    color: "var(--v2-primary)",
                    transition: "all 0.3s ease",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  {point.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--v2-font-ui)",
                    fontSize: "16px",
                    fontWeight: 700,
                    marginBottom: "8px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {point.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "var(--v2-text-muted)",
                  }}
                >
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial - "Communication Received" Style */}
        <div
          className={`v2-reveal v2-reveal-d4 ${revealed ? "v2-revealed" : ""}`}
        >
          <div className="max-w-3xl mx-auto">
            <div
              style={{
                background: "var(--v2-bg-card)",
                border: "1px solid var(--v2-border)",
                overflow: "hidden",
              }}
            >
              {/* Message header */}
              <div
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--v2-border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(14, 14, 24, 0.5)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--v2-primary)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--v2-font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: "var(--v2-text-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  Transmission Received // User Feedback
                </span>
              </div>

              {/* Message body */}
              <div style={{ padding: "28px 32px" }}>
                <p
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    lineHeight: 1.5,
                    color: "var(--v2-text)",
                    fontWeight: 600,
                    marginBottom: "20px",
                  }}
                >
                  "I spent $150 on three different mice before finding one that
                  fit my claw grip. This would've saved me so much money and
                  frustration."
                </p>

                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--v2-primary-dim)",
                      border: "1px solid rgba(0, 255, 157, 0.2)",
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--v2-font-ui)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--v2-primary)",
                      }}
                    >
                      JK
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--v2-font-ui)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Jake K.
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--v2-font-mono)",
                        fontSize: "10px",
                        color: "var(--v2-text-dim)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      CLAW GRIP • MEDIUM HANDS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSectionV2;
