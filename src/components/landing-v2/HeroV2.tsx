import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollingProductGrid from "@/components/landing/ScrollingProductGrid";

const HeroV2 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen pt-20 md:pt-24 pb-12 overflow-hidden"
      style={{ background: "var(--v2-bg)" }}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 v2-dot-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 40%, rgba(0, 255, 157, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255, 51, 102, 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Animated Scan Line */}
      <div className="absolute inset-0 v2-scanline pointer-events-none" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="v2-particle"
          style={{
            left: `${15 + i * 14}%`,
            bottom: "20%",
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${6 + i * 0.8}s`,
          }}
        />
      ))}

      {/* Corner Decorations */}
      <div
        className="absolute top-20 left-6 hidden lg:block"
        style={{
          fontFamily: "var(--v2-font-mono)",
          fontSize: "10px",
          color: "var(--v2-text-dim)",
          letterSpacing: "0.1em",
        }}
      >
        <div>SYS.ONLINE</div>
        <div style={{ color: "var(--v2-primary)", opacity: 0.5 }}>
          ● ACTIVE
        </div>
      </div>

      <div
        className="absolute top-20 right-6 text-right hidden lg:block"
        style={{
          fontFamily: "var(--v2-font-mono)",
          fontSize: "10px",
          color: "var(--v2-text-dim)",
          letterSpacing: "0.1em",
        }}
      >
        <div>v2.0.26</div>
        <div>1040+ PRODUCTS</div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[calc(100vh-180px)]">
          {/* Left Column - Content */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-10">
            {/* System Label */}
            <div
              className={`transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "var(--v2-font-mono)",
                fontSize: "11px",
                color: "var(--v2-primary)",
                letterSpacing: "0.12em",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "1px",
                  background: "var(--v2-primary)",
                  opacity: 0.5,
                }}
              />
              PERIPHERAL MATCHING SYSTEM
            </div>

            {/* Main Headline */}
            <h1
              className={`transition-all duration-700 delay-100 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                marginBottom: "8px",
              }}
            >
              STOP
              <br />
              GUESSING.
            </h1>

            {/* Gradient Sub-headline */}
            <h2
              className={`transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                fontFamily: "var(--v2-font-display)",
                fontSize: "clamp(24px, 3.5vw, 44px)",
                lineHeight: 1.15,
                background:
                  "linear-gradient(135deg, var(--v2-primary) 0%, #00cc7d 50%, var(--v2-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "24px",
              }}
            >
              Find Your Perfect Gear.
            </h2>

            {/* Description */}
            <p
              className={`transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                fontFamily: "var(--v2-font-body)",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "var(--v2-text-muted)",
                maxWidth: "440px",
                marginBottom: "32px",
                fontWeight: 500,
              }}
            >
              Answer a few quick questions about how you work and play, and
              we'll match you with gear that actually fits —{" "}
              <span style={{ color: "var(--v2-text)" }}>
                your grip, your style, your budget.
              </span>
            </p>

            {/* CTA Buttons - 2x2 Grid */}
            <div
              className={`grid grid-cols-2 gap-3 mb-8 transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ maxWidth: "420px", transitionDelay: "400ms" }}
            >
              <Link
                to="/quiz/mouse"
                className="v2-btn v2-btn-primary"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a8 8 0 0 0-8 8v4a8 8 0 0 0 16 0v-4a8 8 0 0 0-8-8z" />
                  <line x1="12" y1="6" x2="12" y2="10" />
                </svg>
                Mouse
              </Link>
              <Link
                to="/quiz/audio"
                className="v2-btn v2-btn-secondary"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6" />
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                </svg>
                Audio
              </Link>
              <Link
                to="/quiz/keyboard"
                className="v2-btn v2-btn-white"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
                </svg>
                Keyboard
              </Link>
              <Link
                to="/quiz/monitor"
                className="v2-btn v2-btn-tertiary"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
                Monitor
              </Link>
            </div>

            {/* Stats Row */}
            <div
              className={`flex items-center gap-6 transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <StatItem value="2-3 min" label="to match" />
              <div
                style={{
                  width: "1px",
                  height: "32px",
                  background: "var(--v2-border-bright)",
                }}
              />
              <StatItem value="1040+" label="products" />
              <div
                style={{
                  width: "1px",
                  height: "32px",
                  background: "var(--v2-border-bright)",
                }}
              />
              <StatItem value="0%" label="sponsored" />
            </div>
          </div>

          {/* Right Column - Scrolling Product Grid */}
          <div
            className={`lg:col-span-6 xl:col-span-7 relative transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* HUD Frame around grid */}
            <div className="relative">
              {/* Corner brackets */}
              <div
                className="absolute -top-3 -left-3 w-6 h-6 hidden md:block"
                style={{
                  borderTop: "2px solid var(--v2-primary)",
                  borderLeft: "2px solid var(--v2-primary)",
                  opacity: 0.4,
                }}
              />
              <div
                className="absolute -top-3 -right-3 w-6 h-6 hidden md:block"
                style={{
                  borderTop: "2px solid var(--v2-primary)",
                  borderRight: "2px solid var(--v2-primary)",
                  opacity: 0.4,
                }}
              />
              <div
                className="absolute -bottom-3 -left-3 w-6 h-6 hidden md:block"
                style={{
                  borderBottom: "2px solid var(--v2-primary)",
                  borderLeft: "2px solid var(--v2-primary)",
                  opacity: 0.4,
                }}
              />
              <div
                className="absolute -bottom-3 -right-3 w-6 h-6 hidden md:block"
                style={{
                  borderBottom: "2px solid var(--v2-primary)",
                  borderRight: "2px solid var(--v2-primary)",
                  opacity: 0.4,
                }}
              />

              {/* HUD Label */}
              <div
                className="absolute -top-6 left-4 hidden md:block"
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "9px",
                  color: "var(--v2-text-dim)",
                  letterSpacing: "0.15em",
                }}
              >
                PRODUCT DATABASE // LIVE FEED
              </div>

              {/* Glow behind grid */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, var(--v2-primary-glow), transparent 70%)",
                  filter: "blur(60px)",
                  opacity: 0.3,
                }}
              />

              <ScrollingProductGrid />
            </div>
          </div>
        </div>

        {/* Recommendation Preview Section */}
        <div
          className={`mt-8 lg:mt-12 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <RecommendationPreviewV2 />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to top, var(--v2-bg), transparent)",
        }}
      />
    </section>
  );
};

/* ---- STAT ITEM ---- */
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div
      style={{
        fontFamily: "var(--v2-font-display)",
        fontSize: "clamp(16px, 2vw, 22px)",
        color: "var(--v2-text)",
        letterSpacing: "0.02em",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: "var(--v2-font-mono)",
        fontSize: "10px",
        color: "var(--v2-text-dim)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  </div>
);

/* ---- RECOMMENDATION PREVIEW V2 ---- */
const peripheralPacks = [
  {
    id: 1,
    title: "Budget FPS Gaming Setup",
    category: "Gaming • Competitive",
    items: [
      "Logitech G Pro X Superlight 2",
      "HyperX Cloud III",
      "Razer BlackWidow V4",
    ],
    price: 329.99,
    accent: "var(--v2-primary)",
  },
  {
    id: 2,
    title: "Premium Productivity Pack",
    category: "Work • Ergonomic",
    items: [
      "Logitech MX Master 3S",
      "Sony WH-1000XM5",
      "Keychron Q1 Pro",
    ],
    price: 649.99,
    accent: "var(--v2-accent)",
  },
  {
    id: 3,
    title: "Music Production Essentials",
    category: "Audio • Creative",
    items: [
      "Sennheiser HD 600",
      "Focusrite Scarlett 2i2",
      "Audio-Technica AT2020",
    ],
    price: 479.99,
    accent: "var(--v2-secondary)",
  },
  {
    id: 4,
    title: "CS Student Starter Kit",
    category: "Student • Budget",
    items: [
      "Pulsar X2V2",
      "Moondrop Aria 2",
      "Royal Kludge RK84",
    ],
    price: 199.99,
    accent: "var(--v2-primary)",
  },
  {
    id: 5,
    title: "Streamer Pro Setup",
    category: "Streaming • Content",
    items: [
      "Elgato Wave:3",
      "SteelSeries Arctis Nova Pro",
      "Razer DeathAdder V3",
    ],
    price: 549.99,
    accent: "var(--v2-tertiary)",
  },
  {
    id: 6,
    title: "Graphic Designer Bundle",
    category: "Creative • Precision",
    items: [
      "Wacom Intuos Pro",
      "Logitech MX Anywhere 3",
      "Apple Magic Keyboard",
    ],
    price: 429.99,
    accent: "var(--v2-accent)",
  },
];

const PackCardV2 = ({
  pack,
}: {
  pack: (typeof peripheralPacks)[0];
}) => (
  <div
    className="v2-card group"
    style={{
      padding: "20px",
      clipPath:
        "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
    }}
  >
    {/* Accent line */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "3px",
        height: "40%",
        background: pack.accent,
        opacity: 0.6,
        transition: "height 0.3s ease, opacity 0.3s ease",
      }}
      className="group-hover:!h-[60%] group-hover:!opacity-100"
    />

    {/* Category Tag */}
    <div
      style={{
        fontFamily: "var(--v2-font-mono)",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "var(--v2-text-dim)",
        textTransform: "uppercase",
        marginBottom: "8px",
      }}
    >
      {pack.category}
    </div>

    {/* Title */}
    <h3
      style={{
        fontFamily: "var(--v2-font-ui)",
        fontSize: "16px",
        fontWeight: 700,
        marginBottom: "12px",
        color: "var(--v2-text)",
      }}
    >
      {pack.title}
    </h3>

    {/* Items */}
    <div style={{ marginBottom: "16px" }}>
      {pack.items.map((item, idx) => (
        <div
          key={idx}
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: "14px",
            color: "var(--v2-text-muted)",
            lineHeight: 1.6,
            paddingLeft: "12px",
            borderLeft: `1px solid var(--v2-border)`,
          }}
        >
          {item}
        </div>
      ))}
    </div>

    {/* Price */}
    <div
      style={{
        borderTop: "1px solid var(--v2-border)",
        paddingTop: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--v2-font-display)",
          fontSize: "18px",
          color: "var(--v2-text)",
        }}
      >
        ${pack.price.toFixed(2)}
      </span>
      <span
        style={{
          fontFamily: "var(--v2-font-mono)",
          fontSize: "10px",
          color: pack.accent,
          letterSpacing: "0.1em",
        }}
      >
        VIEW LOADOUT →
      </span>
    </div>
  </div>
);

const RecommendationPreviewV2 = () => (
  <div className="w-full max-w-6xl mx-auto">
    {/* Terminal-style container */}
    <div
      style={{
        background: "var(--v2-bg-surface)",
        border: "1px solid var(--v2-border)",
        overflow: "hidden",
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderBottom: "1px solid var(--v2-border)",
          background: "rgba(14, 14, 24, 0.8)",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#FF5F57",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#FEBC2E",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#28C840",
              opacity: 0.8,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--v2-font-mono)",
            fontSize: "11px",
            color: "var(--v2-text-dim)",
            letterSpacing: "0.08em",
          }}
        >
          GEARMATCH // CURATED LOADOUTS
        </span>
        <div className="flex-1" />
        <div className="v2-loading-bar" style={{ width: "60px" }} />
      </div>

      {/* Cards Grid */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {peripheralPacks.map((pack) => (
            <PackCardV2 key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HeroV2;
