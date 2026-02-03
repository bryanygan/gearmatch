import { Link } from "react-router-dom";
import {
  ClipboardList,
  Sparkles,
  Scale,
  Zap,
  Target,
  Wrench,
  Database,
  ShieldCheck,
  Eye,
  UserX,
  Heart,
  MousePointer2,
  Headphones,
  Keyboard,
  Monitor,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How <span className="text-gradient">GearMatch</span> Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              No more guesswork. Answer a few questions about how you use your gear,
              and we'll match you with products that actually fit your needs.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Three Simple <span className="text-gradient-accent">Steps</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From questions to recommendations in under 5 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-primary/10 text-primary">
                  <ClipboardList className="w-7 h-7" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 01</div>
                <h3 className="font-display text-xl font-semibold mb-3">Take the Quiz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose your quiz depth and answer questions about your hand size, grip style,
                  primary use case, and preferences. No account needed.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-accent/10 text-accent">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="text-sm font-medium text-accent mb-2">Step 02</div>
                <h3 className="font-display text-xl font-semibold mb-3">Get Matched</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your answers are evaluated against 9-11 weighted scoring rules per category.
                  Each product gets a match score based on how well it fits your needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-primary/10 text-primary">
                  <Scale className="w-7 h-7" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 03</div>
                <h3 className="font-display text-xl font-semibold mb-3">See Results</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get your top 3 picks with transparent scores. See exactly why each product
                  matched, plus any concerns to consider before buying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Modes */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="text-gradient">Depth</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Pick the quiz mode that fits your time and how precise you want your results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Quick */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-yellow-500/10 text-yellow-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Quick Match</h3>
              <div className="text-sm text-muted-foreground mb-4">~1 minute</div>
              <p className="text-muted-foreground leading-relaxed">
                Just the essentials. Answer 3-5 core questions and get solid recommendations
                based on the most important factors.
              </p>
            </div>

            {/* Personalized */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Recommended
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Personalized</h3>
              <div className="text-sm text-muted-foreground mb-4">~2 minutes</div>
              <p className="text-muted-foreground leading-relaxed">
                The sweet spot. More questions about your preferences and use patterns
                for recommendations tailored to how you actually use your gear.
              </p>
            </div>

            {/* Expert */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-violet-500/10 text-violet-500">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Expert</h3>
              <div className="text-sm text-muted-foreground mb-4">~4 minutes</div>
              <p className="text-muted-foreground leading-relaxed">
                Maximum precision. Every question available, including advanced options
                for enthusiasts who know exactly what they want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Transparency */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Transparent <span className="text-gradient-accent">Scoring</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Every recommendation comes with a detailed breakdown. You'll see exactly
                which factors contributed to the match score and why.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Weighted Rule System</div>
                    <div className="text-sm text-muted-foreground">
                      Each category uses 9-11 scoring rules like Grip Fit (20%), Size Match (17%),
                      and Weight Preference (17%) for mice.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Match Reasons</div>
                    <div className="text-sm text-muted-foreground">
                      See the specific reasons why each product scored well for your preferences.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Honest Concerns</div>
                    <div className="text-sm text-muted-foreground">
                      We also show potential drawbacks so you can make an informed decision.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Score Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-sm text-muted-foreground mb-4">Example Scoring Breakdown</div>
              <div className="space-y-3">
                {[
                  { name: "Grip Fit", weight: "20%", score: 92 },
                  { name: "Size & Hand Match", weight: "17%", score: 88 },
                  { name: "Weight Preference", weight: "17%", score: 95 },
                  { name: "Connection Type", weight: "13%", score: 100 },
                  { name: "Use Case Fit", weight: "8%", score: 85 },
                ].map((rule) => (
                  <div key={rule.name} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{rule.name}</span>
                        <span className="text-muted-foreground">{rule.weight}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${rule.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-medium w-10 text-right">{rule.score}%</div>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
                  <span className="font-semibold">Overall Match</span>
                  <span className="text-2xl font-bold text-primary">91%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Database */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Database</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              1,040+ products across 4 categories, with detailed specs and real performance data.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: MousePointer2, count: "185", label: "Mice", color: "text-primary" },
              { icon: Headphones, count: "198", label: "Audio", color: "text-accent" },
              { icon: Keyboard, count: "279", label: "Keyboards", color: "text-white" },
              { icon: Monitor, count: "378", label: "Monitors", color: "text-violet-500" },
            ].map((cat) => (
              <div key={cat.label} className="bg-card border border-border rounded-xl p-6 text-center">
                <cat.icon className={`w-8 h-8 mx-auto mb-3 ${cat.color}`} />
                <div className="text-3xl font-bold mb-1">{cat.count}</div>
                <div className="text-sm text-muted-foreground">{cat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Data from RTINGS, community, & manufacturer specs</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Regularly verified & updated</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Makes Us <span className="text-gradient-accent">Different</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Zero Sponsored Picks",
                description: "Recommendations based purely on fit. No paid placements or affiliate-driven rankings.",
              },
              {
                icon: Eye,
                title: "Transparent Reasoning",
                description: "See exactly why products matched, plus honest concerns about potential drawbacks.",
              },
              {
                icon: UserX,
                title: "No Account Required",
                description: "Jump straight into a quiz. No sign-ups, no tracking, no spam.",
              },
              {
                icon: Heart,
                title: "Built by Enthusiasts",
                description: "Made by people who've spent too much time researching gear themselves.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your <span className="text-gradient">Perfect Gear</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Pick a category and start your quiz.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/quiz/mouse">
                Mice
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="accent" size="lg" asChild>
              <Link to="/quiz/audio">
                Audio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="keyboard" size="lg" asChild>
              <Link to="/quiz/keyboard">
                Keyboards
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="monitor" size="lg" asChild>
              <Link to="/quiz/monitor">
                Monitors
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

export default HowItWorksPage;
