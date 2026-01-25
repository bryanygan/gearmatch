import { ClipboardList, Sparkles, Scale } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Us How You Play",
    description: "Quick questions about your grip style, hand size, game genres, and what drives you crazy about your current gear. Takes about 2 minutes.",
    color: "primary" as const,
  },
  {
    icon: Sparkles,
    step: "02", 
    title: "Get Matched Picks",
    description: "We analyze your answers against real specs and player feedback. No generic 'Top 10' lists — just 3-5 options that actually fit YOU.",
    color: "accent" as const,
  },
  {
    icon: Scale,
    step: "03",
    title: "Compare & Choose",
    description: "See exactly why each pick works for your needs. Honest tradeoffs, real-world insights, and links to buy when you're ready.",
    color: "primary" as const,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No spreadsheets. No endless Reddit threads. Just answer a few questions and get gear that fits.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Step number */}
                <div className="text-6xl font-display font-bold text-border/50 absolute -top-2 -left-2">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10 ${
                  step.color === "primary" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-accent/10 text-accent"
                }`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-4 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
