import { Link } from "react-router-dom";
import {
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  ArrowRight,
  MousePointer2,
  Headphones,
  Keyboard,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarV2 from "@/components/landing-v2/NavbarV2";
import FooterV2 from "@/components/landing-v2/FooterV2";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavbarV2 />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">GearMatch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're on a mission to end the endless research spiral and help you find
              peripherals that actually fit how you work and play.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              The <span className="text-gradient-accent">Problem</span>
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Finding the right mouse, keyboard, headset, or monitor shouldn't require
                a PhD in peripheral research. But that's exactly what it feels like.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You start with a simple question: "What mouse should I get?" Three hours
                later, you've read 47 Reddit threads (all with conflicting opinions), watched 12 YouTube reviews, and
                you're more confused than when you started. Every "Top 10" list recommends
                different products, and none of them seem to consider that your hands,
                your grip, and your use case are unique. Plus, most reviews are usually sponsored or
                biased, making it hard to trust any recommendation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We've been there. That frustration is exactly why we built GearMatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-gradient">Solution</span>
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                GearMatch flips the script. Instead of throwing a generic list at you
                and hoping something sticks, we start with <em>you</em>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our quizzes ask about the things that actually matter: your hand size,
                how you grip your mouse, whether you're a competitive gamer or a
                productivity powerhouse, your budget, and your deal-breakers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Then we run your answers through a weighted scoring system that evaluates
                every product in our database against your specific needs. The result?
                Personalized recommendations with transparent reasoning — you'll see
                exactly why each product matched and what trade-offs to consider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What We <span className="text-gradient-accent">Believe</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Target,
                title: "Fit Over Hype",
                description:
                  "The 'best' product is the one that fits your needs, not the one with the most marketing budget. We recommend based on fit, not popularity.",
                color: "primary",
              },
              {
                icon: Lightbulb,
                title: "Transparency Matters",
                description:
                  "You deserve to know why we're recommending something. Every recommendation comes with detailed reasoning and honest concerns.",
                color: "accent",
              },
              {
                icon: Users,
                title: "Respect Your Time",
                description:
                  "We built GearMatch to save you hours of research. Take a 2-minute quiz instead of falling down a 3-hour rabbit hole.",
                color: "primary",
              },
              {
                icon: TrendingUp,
                title: "Always Improving",
                description:
                  "We're constantly adding products, refining our scoring algorithms, and incorporating feedback to make better recommendations.",
                color: "accent",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    value.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What We <span className="text-gradient">Cover</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Currently supporting 4 categories with 890+ products and growing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: MousePointer2,
                label: "Mice",
                description: "Gaming, productivity, ergonomic",
                color: "text-primary",
              },
              {
                icon: Headphones,
                label: "Audio",
                description: "Headsets, headphones, IEMs",
                color: "text-accent",
              },
              {
                icon: Keyboard,
                label: "Keyboards",
                description: "Mechanical, magnetic, all sizes",
                color: "text-white",
              },
              {
                icon: Monitor,
                label: "Monitors",
                description: "Gaming, content creation, office",
                color: "text-violet-500",
              },
            ].map((cat) => (
              <div
                key={cat.label}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <cat.icon className={`w-10 h-10 mx-auto mb-3 ${cat.color}`} />
                <div className="font-semibold mb-1">{cat.label}</div>
                <div className="text-sm text-muted-foreground">{cat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Skip the <span className="text-gradient-accent">Research</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Take a quiz and get personalized recommendations in minutes.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/quiz/mouse">
                Find Your Mouse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterV2 />
    </div>
  );
};

export default AboutPage;
