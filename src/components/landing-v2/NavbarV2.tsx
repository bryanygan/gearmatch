import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarV2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 20,
  );
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/#" + sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle hash scroll after navigation from another page
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      // Small delay to let the page render before scrolling
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(7, 7, 13, 0.92)"
          : "rgba(7, 7, 13, 0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 255, 157, 0.12)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="flex items-center gap-3 group"
            style={{ textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {/* Logo mark */}
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
          </button>

          {/* Desktop Nav Links */}
          <div
            className="hidden md:flex items-center gap-8"
            style={{ fontFamily: "var(--v2-font-ui)", fontSize: "13px" }}
          >
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="transition-colors duration-200"
              style={{
                color: "var(--v2-text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                fontSize: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--v2-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--v2-text-muted)")
              }
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="transition-colors duration-200"
              style={{
                color: "var(--v2-text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                fontSize: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--v2-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--v2-text-muted)")
              }
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("why-trust-us")}
              className="transition-colors duration-200"
              style={{
                color: "var(--v2-text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                fontSize: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--v2-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--v2-text-muted)")
              }
            >
              Why Trust Us
            </button>
            <Link
              to="/loadout"
              className="transition-colors duration-200"
              style={{
                color: "var(--v2-text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--v2-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--v2-text-muted)")
              }
            >
              Loadout
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/quiz/mouse"
              className="v2-btn v2-btn-primary v2-btn-sm"
              style={{ textDecoration: "none" }}
            >
              Get Started
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
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            style={{ color: "var(--v2-text-muted)" }}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu-v2"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu-v2"
            className="md:hidden py-4"
            style={{
              borderTop: "1px solid var(--v2-border)",
              fontFamily: "var(--v2-font-ui)",
              animation: "v2-slide-down 0.2s ease",
            }}
          >
            <style>{`
              @keyframes v2-slide-down {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @media (prefers-reduced-motion: reduce) {
                #mobile-menu-v2 { animation: none !important; }
              }
            `}</style>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("how-it-works")}
                style={{
                  color: "var(--v2-text-muted)",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                }}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("categories")}
                style={{
                  color: "var(--v2-text-muted)",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                }}
              >
                Categories
              </button>
              <button
                onClick={() => scrollToSection("why-trust-us")}
                style={{
                  color: "var(--v2-text-muted)",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                }}
              >
                Why Trust Us
              </button>
              <Link
                to="/loadout"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--v2-text-muted)",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "8px 0",
                }}
              >
                Loadout
              </Link>
              <Link
                to="/quiz/mouse"
                className="v2-btn v2-btn-primary v2-btn-sm mt-2"
                style={{ textDecoration: "none", textAlign: "center", justifyContent: "center" }}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarV2;
