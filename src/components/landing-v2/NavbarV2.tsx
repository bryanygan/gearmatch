import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarV2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(7, 7, 13, 0.92)"
          : "rgba(7, 7, 13, 0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 255, 157, 0.12)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            style={{ textDecoration: "none" }}
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
          </Link>

          {/* Desktop Nav Links */}
          <div
            className="hidden md:flex items-center gap-8"
            style={{ fontFamily: "var(--v2-font-ui)", fontSize: "13px" }}
          >
            <Link
              to="/#how-it-works"
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
              How It Works
            </Link>
            <Link
              to="/#categories"
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
              Categories
            </Link>
            <Link
              to="/#why-trust-us"
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
              Why Trust Us
            </Link>
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
            `}</style>
            <div className="flex flex-col gap-3">
              <Link
                to="/#how-it-works"
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
                How It Works
              </Link>
              <Link
                to="/#categories"
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
                Categories
              </Link>
              <Link
                to="/#why-trust-us"
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
                Why Trust Us
              </Link>
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
