import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";

const categories = [
  {
    id: "mice",
    title: "MICE",
    description:
      "From ultralight precision mice to ergonomic all-day options. Find the shape, weight, and sensor that matches how you actually use your mouse.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a8 8 0 0 0-8 8v4a8 8 0 0 0 16 0v-4a8 8 0 0 0-8-8z" />
        <line x1="12" y1="6" x2="12" y2="10" />
      </svg>
    ),
    factors: ["Hand size & grip style", "Weight preference", "Wireless vs wired", "Primary use"],
    available: true,
    cta: "Find Your Mouse",
    href: "/quiz/mouse",
    accent: "var(--v2-primary)",
    accentBg: "var(--v2-primary-dim)",
    btnClass: "v2-btn-primary",
  },
  {
    id: "audio",
    title: "AUDIO GEAR",
    description:
      "IEMs, headsets, and headphones for every need — precise audio clarity, immersive sound, or all-day comfort with a solid mic.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18v-6a9 9 0 0118 0v6" />
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
      </svg>
    ),
    factors: ["Competitive vs immersive", "Mic quality needs", "Comfort priority", "Open vs closed back"],
    available: true,
    cta: "Find Your Audio",
    href: "/quiz/audio",
    accent: "var(--v2-secondary)",
    accentBg: "var(--v2-secondary-dim)",
    btnClass: "v2-btn-secondary",
  },
  {
    id: "keyboards",
    title: "KEYBOARDS",
    description:
      "Switches, layouts, and features that match your typing feel and workflow — from competitive gaming to premium typing experiences.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
      </svg>
    ),
    factors: ["Switch type", "Form factor", "Gaming features", "Connectivity"],
    available: true,
    cta: "Find Your Keyboard",
    href: "/quiz/keyboard",
    accent: "var(--v2-keyboard-color)",
    accentBg: "rgba(228, 228, 231, 0.06)",
    btnClass: "v2-btn-white",
  },
  {
    id: "monitors",
    title: "MONITORS",
    description:
      "Resolution, refresh rate, and panel tech matched to your use case — from competitive gaming to color-accurate content creation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    factors: ["Resolution & size", "Refresh rate", "Panel type", "HDR & color"],
    available: true,
    cta: "Find Your Monitor",
    href: "/quiz/monitor",
    accent: "var(--v2-tertiary)",
    accentBg: "var(--v2-tertiary-dim)",
    btnClass: "v2-btn-tertiary",
  },
  {
    id: "switches",
    title: "KEYBOARD SWITCHES",
    description:
      "Linear, tactile, or clicky — find the perfect switch for your typing feel and sound preference. Coming soon.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M8 8V6a4 4 0 018 0v2" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
    factors: ["Switch type", "Actuation force", "Sound level", "Travel distance"],
    available: false,
    cta: "Coming Soon",
    href: "#",
    accent: "var(--v2-text-dim)",
    accentBg: "rgba(63, 63, 80, 0.1)",
    btnClass: "v2-btn-ghost",
  },
  {
    id: "controllers",
    title: "CONTROLLERS",
    description:
      "Console, PC, or specialized use — find the right controller for your hands and preferences. Coming soon.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 12h4M8 10v4" />
        <circle cx="17" cy="11" r="1" fill="currentColor" />
        <circle cx="15" cy="13" r="1" fill="currentColor" />
        <path d="M7.5 20C4.5 20 2 17.5 2 14.5S4 7 7 7h10c3 0 5 4.5 5 7.5S19.5 20 16.5 20" />
      </svg>
    ),
    factors: ["Platform", "Hand size", "Button layout", "Pro features"],
    available: false,
    cta: "Coming Soon",
    href: "#",
    accent: "var(--v2-text-dim)",
    accentBg: "rgba(63, 63, 80, 0.1)",
    btnClass: "v2-btn-ghost",
  },
];

const CategoryCardsV2 = () => {
  const { ref, revealed } = useReveal(0.05);

  return (
    <section
      id="categories"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: "var(--v2-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={`v2-reveal ${revealed ? "v2-revealed" : ""}`}
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "var(--v2-secondary)",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            [ Select Category ]
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
            PICK YOUR{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--v2-secondary), #FF6B8A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LOADOUT
            </span>
          </h2>
          <p
            className={`v2-reveal v2-reveal-d2 ${revealed ? "v2-revealed" : ""}`}
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "17px",
              color: "var(--v2-text-muted)",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            We're starting with the most popular categories. More are in the works.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`v2-reveal ${revealed ? "v2-revealed" : ""}`}
              style={{ transitionDelay: `${0.1 + index * 0.08}s` }}
            >
              <div
                className={`v2-card group relative overflow-hidden ${
                  !cat.available ? "opacity-50" : ""
                }`}
                style={{
                  padding: "28px",
                  clipPath:
                    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: cat.available
                      ? `linear-gradient(90deg, ${cat.accent}, transparent)`
                      : "var(--v2-border)",
                    opacity: cat.available ? 0.6 : 0.3,
                    transition: "opacity 0.3s ease",
                  }}
                  className={cat.available ? "group-hover:!opacity-100" : ""}
                />

                {/* Hover glow */}
                {cat.available && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${cat.accentBg}, transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative">
                  {/* Icon + Title Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="v2-hex-icon shrink-0"
                      style={{
                        background: cat.accentBg,
                        color: cat.accent,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--v2-font-display)",
                          fontSize: "20px",
                          letterSpacing: "0.05em",
                          marginBottom: "2px",
                        }}
                      >
                        {cat.title}
                      </h3>
                      {!cat.available && (
                        <span
                          style={{
                            fontFamily: "var(--v2-font-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            color: "var(--v2-text-dim)",
                            textTransform: "uppercase",
                          }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--v2-font-body)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--v2-text-muted)",
                      marginBottom: "16px",
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Factor Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.factors.map((factor) => (
                      <span
                        key={factor}
                        style={{
                          fontFamily: "var(--v2-font-mono)",
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          padding: "4px 10px",
                          background: "var(--v2-bg-surface)",
                          border: "1px solid var(--v2-border)",
                          color: "var(--v2-text-muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        {factor}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {cat.available ? (
                    <Link
                      to={cat.href}
                      className={`v2-btn ${cat.btnClass} w-full`}
                      style={{
                        textDecoration: "none",
                        justifyContent: "center",
                      }}
                    >
                      {cat.cta}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="v2-btn v2-btn-ghost w-full"
                      style={{
                        justifyContent: "center",
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                    >
                      {cat.cta}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCardsV2;
