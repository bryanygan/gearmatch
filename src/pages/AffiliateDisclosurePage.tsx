import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Shield, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const AffiliateDisclosurePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Affiliate <span className="text-gradient">Disclosure</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Transparency about how we make money and how it affects (or doesn't
              affect) our recommendations.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                icon: DollarSign,
                title: "We Earn Commissions",
                description:
                  "When you buy products through our links, we may earn a small commission from the retailer.",
                color: "primary",
              },
              {
                icon: Shield,
                title: "Same Price for You",
                description:
                  "You pay the same price whether you use our links or not. Commissions come from the retailer, not you.",
                color: "accent",
              },
              {
                icon: Scale,
                title: "No Bias in Rankings",
                description:
                  "Affiliate relationships never influence which products we recommend or how they're ranked.",
                color: "primary",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    item.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <div className="space-y-12">
              {/* How It Works */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  How Affiliate Links Work
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you click a link to a product on GearMatch and make a purchase,
                  the retailer knows you came from our site. If you complete a purchase
                  (usually within a certain time window), we receive a small percentage
                  of the sale as a commission.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This is a standard practice across the web and is how many content
                  creators and recommendation sites sustain themselves. It allows us to
                  keep GearMatch free for everyone.
                </p>
              </div>

              {/* Our Commitment */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Our <span className="text-gradient">Commitment</span> to You
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We built GearMatch because we were frustrated with biased reviews and
                    sponsored "top 10" lists. Our commitment to you is simple:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 font-bold">1.</span>
                      <span>
                        <strong className="text-foreground">
                          Recommendations come first.
                        </strong>{" "}
                        Our scoring algorithm evaluates products based on how well they
                        match your stated preferences — nothing else. Whether a product
                        has a high or low affiliate commission (or none at all) has zero
                        impact on its score or ranking.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 font-bold">2.</span>
                      <span>
                        <strong className="text-foreground">
                          No paid placements.
                        </strong>{" "}
                        We don't accept money from brands to feature or promote their
                        products. Every product in our database is there because it meets
                        our inclusion criteria, not because someone paid us.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 font-bold">3.</span>
                      <span>
                        <strong className="text-foreground">
                          Transparent reasoning.
                        </strong>{" "}
                        Every recommendation includes detailed scoring breakdowns so you
                        can see exactly why a product matched your needs. We have nothing
                        to hide.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Amazon Associates Disclosure */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Amazon Associates Disclosure
                </h2>
                <p className="text-lg font-semibold text-foreground mb-4">
                  As an Amazon Associate I earn from qualifying purchases.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  GearMatch is a participant in the Amazon Services LLC Associates
                  Program, an affiliate advertising program designed to provide a
                  means for sites to earn advertising fees by advertising and linking
                  to Amazon.com.
                </p>
              </div>

              {/* Affiliate Programs */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Other Affiliate Programs We Participate In
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In addition to Amazon Associates, GearMatch may participate in other
                  affiliate programs, which may include:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Retailer-specific affiliate programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span>Affiliate networks (CJ, ShareASale, etc.)</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  These programs are advertising programs designed to provide a means
                  for sites to earn fees by linking to retailers.
                </p>
              </div>

              {/* What This Means for You */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  What This Means for You
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">You pay nothing extra.</strong>{" "}
                    Affiliate commissions are paid by retailers out of their marketing
                    budgets. The price you see is the price you pay, whether you use our
                    links or go directly to the retailer.
                  </p>
                  <p>
                    <strong className="text-foreground">You support GearMatch.</strong>{" "}
                    Using our links helps us cover operating costs and continue improving
                    the service. If you find value in our recommendations, using our
                    links is a great way to support us at no cost to you.
                  </p>
                  <p>
                    <strong className="text-foreground">You're never obligated.</strong>{" "}
                    If you prefer, you can always search for products directly. We'll
                    never guilt you into using our links or hide information to push you
                    toward a purchase.
                  </p>
                </div>
              </div>

              {/* FTC Compliance */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  FTC Compliance & Disclosure Requirements
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In accordance with Federal Trade Commission (FTC) regulations, we
                    are committed to transparent disclosure of our affiliate
                    relationships. Our disclosures are designed to be:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 font-bold">•</span>
                      <span>
                        <strong className="text-foreground">Clear.</strong> We use
                        straightforward language such as "(paid link)", "#ad", or
                        "#CommissionsEarned" to identify affiliate links.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 font-bold">•</span>
                      <span>
                        <strong className="text-foreground">Conspicuous.</strong>{" "}
                        Disclosures are placed near affiliate links and product
                        recommendations in locations that are easy to notice.
                      </span>
                    </li>
                  </ul>
                  <p>
                    This disclosure page, along with notices in our website footer and
                    near product links, ensures you always know when we may earn a
                    commission from your purchases.
                  </p>
                  <p className="text-sm">
                    For more information about FTC endorsement guidelines, visit the{" "}
                    <a
                      href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking#affiliate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      FTC's Endorsement Guides FAQ
                    </a>{" "}
                    or the{" "}
                    <a
                      href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      FTC's Disclosures 101 for Social Media Influencers
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Questions */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Questions?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our affiliate relationships or how
                  they work, please don't hesitate to contact us at{" "}
                  <a
                    href="mailto:hello@gearmatch.app"
                    className="text-primary hover:underline"
                  >
                    hello@gearmatch.app
                  </a>
                  . We're happy to explain anything in more detail.
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

      <Footer />
    </div>
  );
};

export default AffiliateDisclosurePage;
