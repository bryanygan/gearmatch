import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarV2 from "@/components/landing-v2/NavbarV2";
import FooterV2 from "@/components/landing-v2/FooterV2";
import { usePageTitle } from "@/hooks/usePageTitle";

const PrivacyPage = () => {
  usePageTitle("Privacy Policy");
  return (
    <div className="min-h-screen bg-background">
      <NavbarV2 />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your privacy matters. Here's exactly how we handle your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: March 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <div className="space-y-12">
              {/* Overview */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  GearMatch is designed with privacy in mind. We don't require accounts,
                  we don't track you across the web, and we don't sell your data. This
                  policy explains exactly what information we collect, which third-party
                  services receive it, and how it is used.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Quiz Answers:</strong> When you
                    take a quiz, your answers are encoded in the URL. This allows you to
                    bookmark and share your results. We do not store your quiz answers on
                    our servers — they exist only in your browser's address bar.
                  </p>
                  <p>
                    <strong className="text-foreground">Loadout Preferences:</strong> If
                    you use the Loadout Builder, your selected products are saved in your
                    browser's localStorage. This data never leaves your device — it is
                    never transmitted to our servers.
                  </p>
                  <p>
                    <strong className="text-foreground">Analytics Data:</strong> We use
                    privacy-focused analytics to understand how people use GearMatch. This
                    includes aggregate data such as page views, quiz completion rates, and
                    general geographic regions derived from your IP address. Your IP
                    address is processed to determine approximate location but is not
                    stored in identifiable form.
                  </p>
                  <p>
                    <strong className="text-foreground">Error Reports (Sentry):</strong>{" "}
                    We use Sentry (sentry.io) for application error monitoring. When an
                    error occurs in your browser, Sentry automatically collects your IP
                    address, browser type, operating system, device information, and a
                    technical report of the error (stack trace). This data is used solely
                    to identify and fix bugs. Sentry retains error data for up to 90 days.
                    See{" "}
                    <a
                      href="https://sentry.io/privacy/"
                      target="_blank"
                      rel="noopener noreferrer" referrerPolicy="no-referrer"
                      className="text-primary hover:underline"
                    >
                      Sentry's Privacy Policy
                    </a>{" "}
                    for details.
                  </p>
                  <p>
                    <strong className="text-foreground">Contact Information:</strong> If
                    you email us, we'll have your email address and any information you
                    choose to share. We use this only to respond to your inquiry.
                  </p>
                </div>
              </div>

              {/* Information We Don't Collect */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Information We <span className="text-gradient">Don't</span> Collect
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Personal accounts or login credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Payment information (we don't sell anything directly)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Tracking cookies that follow you across other websites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Your browsing history outside of GearMatch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Precise location data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Any personal information from children under 13 (see Children's Privacy below)</span>
                  </li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Third-Party Services That Receive Your Data
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The following named third parties may receive limited technical data
                    as a result of your use of GearMatch:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>
                        <strong className="text-foreground">Cloudflare</strong> — our
                        hosting and CDN provider. Cloudflare processes your IP address
                        and HTTP request data to serve the site. See{" "}
                        <a
                          href="https://www.cloudflare.com/privacypolicy/"
                          target="_blank"
                          rel="noopener noreferrer" referrerPolicy="no-referrer"
                          className="text-primary hover:underline"
                        >
                          Cloudflare's Privacy Policy
                        </a>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>
                        <strong className="text-foreground">Sentry</strong> — error
                        monitoring. Receives your IP address, browser/device info, and
                        crash reports when application errors occur. Data retained up to
                        90 days. See{" "}
                        <a
                          href="https://sentry.io/privacy/"
                          target="_blank"
                          rel="noopener noreferrer" referrerPolicy="no-referrer"
                          className="text-primary hover:underline"
                        >
                          Sentry's Privacy Policy
                        </a>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>
                        <strong className="text-foreground">Analytics provider</strong> —
                        privacy-focused analytics that collect aggregate page view data,
                        general geographic regions, and device type. No personal
                        identifiers are stored.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>
                        <strong className="text-foreground">Amazon</strong> — when you
                        click an affiliate link to Amazon, Amazon may set its own cookies
                        on your browser to track the referral. We have no control over
                        Amazon's data practices. See{" "}
                        <a
                          href="https://www.amazon.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer" referrerPolicy="no-referrer"
                          className="text-primary hover:underline"
                        >
                          Amazon's Privacy Notice
                        </a>
                        .
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  GearMatch itself uses minimal, functional cookies. We do not place
                  advertising cookies or behavioral tracking cookies on your browser.
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Analytics cookies — anonymized, no personal identification</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  When you click affiliate links to third-party retailers (such as Amazon),
                  those retailers may place their own cookies on your browser to track the
                  purchase referral. These are the retailer's cookies, not ours, and are
                  governed by the retailer's own privacy policy.
                </p>
              </div>

              {/* Affiliate Links */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Affiliate Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you click a link to purchase a product, it may contain an affiliate
                  code. This tells the retailer that you came from GearMatch, allowing us
                  to earn a small commission at no additional cost to you. The retailer
                  may use cookies to track this referral. We have no control over
                  third-party retailer privacy practices — please review their policies
                  before purchasing. See our{" "}
                  <Link to="/affiliate-disclosure" className="text-primary hover:underline">
                    Affiliate Disclosure
                  </Link>{" "}
                  for more details.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Data Retention
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  GearMatch does not maintain user accounts and does not store personal
                  data on our servers beyond what is described above. Sentry retains error
                  reports for up to 90 days. Analytics data is aggregated and anonymized
                  per the analytics provider's own retention schedule. If you contact us
                  via email, we retain those communications for as long as necessary to
                  address your inquiry and for our records.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Children's Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  GearMatch is not directed to children under the age of 13 and does not
                  knowingly collect personal information from children under 13. If you
                  are a parent or guardian and believe your child under 13 has provided
                  personal information to us (for example, via email), please contact us
                  at{" "}
                  <a
                    href="mailto:hello@gearmatch.app"
                    className="text-primary hover:underline"
                  >
                    hello@gearmatch.app
                  </a>{" "}
                  and we will promptly delete that information.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have rights regarding your personal
                  data, including the right to access, correct, or delete it. Since we
                  collect minimal data and don't maintain user accounts, most data subject
                  rights don't apply in practice. If you have contacted us via email and
                  want us to delete that correspondence, just let us know. You may also
                  contact us to ask what information (if any) Sentry has recorded about
                  errors from your session, and we will respond within 45 days.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. When we do, we'll
                  update the "Last updated" date at the top of this page. We encourage
                  you to review this policy periodically.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this privacy policy, please contact us at{" "}
                  <a
                    href="mailto:hello@gearmatch.app"
                    className="text-primary hover:underline"
                  >
                    hello@gearmatch.app
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your <span className="text-gradient">Perfect Gear</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Take a quiz and get personalized recommendations in minutes.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/quiz/mouse">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterV2 />
    </div>
  );
};

export default PrivacyPage;
