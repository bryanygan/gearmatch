import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollingProductGrid from "@/components/landing/ScrollingProductGrid";
import { CURATED_LOADOUTS } from "@/data/curated-loadouts";

const HeroV2 = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-dvh md:min-h-screen pt-20 md:pt-24 pb-4 md:pb-12 overflow-hidden"
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
        <div>2000+ PRODUCTS</div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex flex-col justify-center">
        <div className="relative md:grid md:grid-cols-12 md:gap-6 md:items-center min-h-[calc(100dvh-120px)] md:min-h-[calc(100vh-180px)]">

          {/* Mobile Background Carousel — sits behind text on small screens */}
          <div
            className={`md:hidden absolute inset-0 z-0 overflow-hidden transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Fade overlay: transparent at top/bottom edges so carousel peeks through, dark in center for text legibility */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to bottom,
                    transparent 0%,
                    rgba(7, 7, 13, 0.7) 15%,
                    rgba(7, 7, 13, 0.95) 28%,
                    rgba(7, 7, 13, 0.98) 40%,
                    rgba(7, 7, 13, 0.98) 60%,
                    rgba(7, 7, 13, 0.97) 75%,
                    rgba(7, 7, 13, 0.85) 88%,
                    transparent 100%
                  )
                `,
              }}
            />
            {/* Force the grid to fill the full hero height */}
            <style>{`
              .v2-mobile-carousel .scrolling-grid-container {
                height: 100% !important;
              }
            `}</style>
            <div className="v2-mobile-carousel h-full">
              <ScrollingProductGrid />
            </div>
          </div>

          {/* Left Column - Content (full width on mobile, overlays the carousel) */}
          <div className="col-span-12 md:col-span-6 xl:col-span-5 relative z-10 flex flex-col justify-center min-h-[calc(100dvh-120px)] md:min-h-0">
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
                fontSize: "clamp(14px, 2vw, 17px)",
                lineHeight: 1.7,
                color: "var(--v2-text-muted)",
                maxWidth: "440px",
                marginBottom: "24px",
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
              className={`grid grid-cols-2 gap-2 sm:gap-3 mb-5 md:mb-8 transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ maxWidth: "420px", transitionDelay: "400ms" }}
            >
              <Link
                to="/quiz/mouse"
                className="v2-btn v2-btn-primary v2-btn-sm sm:v2-btn"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="hidden sm:block"
                >
                  <path d="M12 2a8 8 0 0 0-8 8v4a8 8 0 0 0 16 0v-4a8 8 0 0 0-8-8z" />
                  <line x1="12" y1="6" x2="12" y2="10" />
                </svg>
                Mouse
              </Link>
              <Link
                to="/quiz/audio"
                className="v2-btn v2-btn-secondary v2-btn-sm sm:v2-btn"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="hidden sm:block"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6" />
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                </svg>
                Audio
              </Link>
              <Link
                to="/quiz/keyboard"
                className="v2-btn v2-btn-white v2-btn-sm sm:v2-btn"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="hidden sm:block"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
                </svg>
                Keyboard
              </Link>
              <Link
                to="/quiz/monitor"
                className="v2-btn v2-btn-tertiary v2-btn-sm sm:v2-btn"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="hidden sm:block"
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
              <StatItem value="2,000+" label="products" />
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

          {/* Right Column - Scrolling Product Grid (desktop only, mobile uses background version) */}
          <div
            className={`hidden md:block md:col-span-6 xl:col-span-7 relative transition-all duration-1000 delay-300 ${
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
                  filter: "blur(10px)",
                  opacity: 0.3,
                }}
              />

              <ScrollingProductGrid />
            </div>
          </div>
        </div>

        {/* Recommendation Preview Section */}
        <div
          className={`mt-4 md:mt-12 transition-all duration-1000 delay-700 ${
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

/** Product display names for curated loadout items */
const PRODUCT_NAMES: Record<string, string> = {
  logitech_g305_lightspeed: "Logitech G305 LIGHTSPEED",
  attack_shark_x3: "ATTACK SHARK X3",
  steelseries_arctis_nova_3: "SteelSeries Arctis Nova 3",
  redragon_k552_kumara_rgb: "Redragon K552 KUMARA RGB",
  aoc_24g2: "AOC 24G2",
  logitech_mx_master_3s: "Logitech MX Master 3S",
  logitech_mx_ergo: "Logitech MX ERGO",
  audeze_maxwell: "Audeze Maxwell",
  keychron_q5_max: "Keychron Q5 Max",
  dell_u2725qe: "Dell U2725QE",
  razer_viper_v3_pro: "Razer Viper V3 Pro",
  pulsar_x2: "Pulsar X2",
  hyperx_cloud_alpha_wireless: "HyperX Cloud Alpha Wireless",
  wooting_80he: "Wooting 80HE",
  dell_alienware_aw2725df: "Dell Alienware AW2725DF",
  logitech_g_pro_x_superlight_2: "Logitech G Pro X Superlight 2",
  razer_blackshark_v3_pro: "Razer BlackShark V3 Pro",
  steelseries_arctis_nova_7: "SteelSeries Arctis Nova 7 Wireless",
  wooting_60he_v2: "Wooting 60HE v2",
  dell_alienware_aw2524h: "Dell Alienware AW2524H",
};

/** Accent color + category label per curated loadout */
const LOADOUT_STYLE: Record<string, { accent: string; category: string }> = {
  "budget-fps-setup": { accent: "var(--v2-primary)", category: "Gaming • Budget" },
  "premium-productivity-pack": { accent: "var(--v2-accent)", category: "Work • Ergonomic" },
  "competitive-esports-kit": { accent: "var(--v2-secondary)", category: "Esports • Competitive" },
  "streaming-pro-loadout": { accent: "var(--v2-tertiary)", category: "Streaming • Content" },
};

const PackCardV2 = ({
  loadout,
}: {
  loadout: (typeof CURATED_LOADOUTS)[number];
}) => {
  const style = LOADOUT_STYLE[loadout.id] ?? {
    accent: "var(--v2-primary)",
    category: "Loadout",
  };
  const itemNames = loadout.items.map(
    (item) => PRODUCT_NAMES[item.productId] ?? item.productId,
  );

  return (
    <Link
      to={`/loadout?loadout=${loadout.id}`}
      className="v2-card group block"
      style={{
        padding: "20px",
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        textDecoration: "none",
        color: "inherit",
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
          background: style.accent,
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
        {style.category}
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
        {loadout.name}
      </h3>

      {/* Items */}
      <div style={{ marginBottom: "16px" }}>
        {itemNames.map((name) => (
          <div
            key={name}
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "14px",
              color: "var(--v2-text-muted)",
              lineHeight: 1.6,
              paddingLeft: "12px",
              borderLeft: `1px solid var(--v2-border)`,
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Price Range */}
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
          ${loadout.totalPriceRange[0].toLocaleString()}–$
          {loadout.totalPriceRange[1].toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: "var(--v2-font-mono)",
            fontSize: "10px",
            color: style.accent,
            letterSpacing: "0.1em",
          }}
        >
          VIEW LOADOUT →
        </span>
      </div>
    </Link>
  );
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {CURATED_LOADOUTS.map((loadout) => (
            <PackCardV2 key={loadout.id} loadout={loadout} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HeroV2;
