import { Link } from "react-router-dom";

const FooterV2 = () => {
  return (
    <footer
      style={{
        background: "var(--v2-bg-surface)",
        borderTop: "1px solid var(--v2-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:max-w-xs">
            <Link
              to="/"
              className="flex items-center gap-3 mb-4"
              style={{ textDecoration: "none" }}
            >
              <div
                className="w-7 h-7 flex items-center justify-center"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: "var(--v2-primary)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ color: "#07070D" }}
                >
                  <path
                    d="M8 1L15 5v6l-7 4-7-4V5l7-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--v2-font-display)",
                  fontSize: "16px",
                  letterSpacing: "0.08em",
                  color: "var(--v2-text)",
                }}
              >
                GEARMATCH
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--v2-font-body)",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "var(--v2-text-muted)",
              }}
            >
              Find your perfect peripherals with personalized recommendations
              based on how you actually use your gear.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {/* Quizzes */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "var(--v2-primary)",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Quizzes
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { to: "/quiz/mouse", label: "Mice" },
                  { to: "/quiz/audio", label: "Audio" },
                  { to: "/quiz/keyboard", label: "Keyboards" },
                  { to: "/quiz/monitor", label: "Monitors" },
                ].map((link) => (
                  <li key={link.to} style={{ marginBottom: "10px" }}>
                    <Link
                      to={link.to}
                      style={{
                        fontFamily: "var(--v2-font-body)",
                        fontSize: "14px",
                        color: "var(--v2-text-muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--v2-text)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--v2-text-muted)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "var(--v2-primary)",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Company
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { to: "/about", label: "About Us" },
                  { to: "/how-it-works", label: "How It Works" },
                  { to: "/contact", label: "Contact" },
                  { to: "/faq", label: "FAQ" },
                ].map((link) => (
                  <li key={link.to} style={{ marginBottom: "10px" }}>
                    <Link
                      to={link.to}
                      style={{
                        fontFamily: "var(--v2-font-body)",
                        fontSize: "14px",
                        color: "var(--v2-text-muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--v2-text)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--v2-text-muted)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--v2-font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "var(--v2-primary)",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Legal
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" },
                  { to: "/affiliate-disclosure", label: "Affiliate Disclosure" },
                ].map((link) => (
                  <li key={link.to} style={{ marginBottom: "10px" }}>
                    <Link
                      to={link.to}
                      style={{
                        fontFamily: "var(--v2-font-body)",
                        fontSize: "14px",
                        color: "var(--v2-text-muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--v2-text)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--v2-text-muted)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--v2-border)" }}
        >
          <p
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: "11px",
              color: "var(--v2-text-dim)",
              letterSpacing: "0.06em",
            }}
          >
            &copy; {new Date().getFullYear()} GEARMATCH. ALL RIGHTS RESERVED.
          </p>
          <p
            style={{
              fontFamily: "var(--v2-font-mono)",
              fontSize: "10px",
              color: "var(--v2-text-dim)",
              letterSpacing: "0.06em",
            }}
          >
            WE MAY EARN A COMMISSION WHEN YOU BUY THROUGH OUR LINKS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
