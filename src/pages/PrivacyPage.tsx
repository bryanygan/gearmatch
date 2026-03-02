import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarV2 from "@/components/landing-v2/NavbarV2";
import FooterV2 from "@/components/landing-v2/FooterV2";

const PrivacyPage = () => {
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
              Your privacy matters. Here's how we handle your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 2026
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
                  policy explains what little information we do collect and how we use it.
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
                    bookmark and share your results. We don't store your quiz answers on
                    our servers — they exist only in your browser and the URL.
                  </p>
                  <p>
                    <strong className="text-foreground">Analytics Data:</strong> We use
                    privacy-focused analytics to understand how people use GearMatch. This
                    includes aggregate data like page views, quiz completion rates, and
                    general geographic regions. This data is anonymized and cannot be used
                    to identify you personally.
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
                    <span>Tracking cookies that follow you across websites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Your browsing history outside of GearMatch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Precise location data</span>
                  </li>
                </ul>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use minimal, essential cookies to make the site function properly.
                  These may include:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Theme preference (light/dark mode)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Analytics cookies (anonymized, no personal identification)</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not use advertising cookies or third-party tracking cookies.
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
                  to earn a small commission. The retailer may use cookies to track this
                  referral. We have no control over third-party retailer privacy practices
                  — please review their policies before purchasing. See our{" "}
                  <Link to="/affiliate-disclosure" className="text-primary hover:underline">
                    Affiliate Disclosure
                  </Link>{" "}
                  for more details.
                </p>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Third-Party Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services for hosting, analytics, and email. These
                  services have their own privacy policies. We choose providers that
                  respect user privacy and comply with applicable regulations.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Data Retention
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Since we don't collect personal data through accounts, there's nothing
                  to retain. Analytics data is aggregated and anonymized. If you contact
                  us via email, we retain those communications for as long as necessary
                  to address your inquiry and for our records.
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
                  collect minimal data and don't maintain user accounts, most of these
                  rights don't apply in practice. If you've contacted us via email and
                  want us to delete that correspondence, just let us know.
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
