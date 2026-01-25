import { Shield, Eye, Heart, Zap } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Zero Sponsored Picks",
    description: "We don't take money from brands. Ever. Our recommendations are based purely on fit and quality.",
  },
  {
    icon: Eye,
    title: "Transparent Reasoning",
    description: "Every recommendation comes with clear explanations. You'll know exactly why each pick works for you.",
  },
  {
    icon: Heart,
    title: "Built by Gamers",
    description: "We've been through the frustration of bad gear purchases. This tool exists because we needed it ourselves.",
  },
  {
    icon: Zap,
    title: "Real-World Testing",
    description: "Specs are just numbers. We consider actual user feedback, durability reports, and edge cases.",
  },
];

const TrustSection = () => {
  return (
    <section id="why-trust-us" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why <span className="text-gradient">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We're not here to push products. We're here to help you stop wasting money on gear that doesn't fit.
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto mb-5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                <point.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote/Testimonial style block */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6">
              "I spent $150 on three different mice before finding one that fit my claw grip. 
              This would've saved me so much money and frustration."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">JK</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Jake K.</div>
                <div className="text-xs text-muted-foreground">FPS Player, Medium Hands</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
