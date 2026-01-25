import { MousePointer2, Headphones, Keyboard, Gamepad2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "mice",
    title: "Gaming Mice",
    description: "From lightweight FPS demons to ergonomic MMO beasts. Find the shape, weight, and sensor that matches how you actually play.",
    icon: MousePointer2,
    factors: ["Hand size & grip style", "Weight preference", "Wireless vs wired", "Game genre"],
    available: true,
    cta: "Find Your Mouse",
    accent: "primary" as const,
    href: "/quiz/mouse",
  },
  {
    id: "audio",
    title: "Audio Gear",
    description: "IEMs, headsets, and headphones for every need — competitive footsteps, immersive worlds, or all-day comfort with a solid mic.",
    icon: Headphones,
    factors: ["Competitive vs immersive", "Mic quality needs", "Comfort priority", "Open vs closed back"],
    available: true,
    cta: "Find Your Audio",
    accent: "accent" as const,
    href: "/quiz/audio",
  },
  {
    id: "keyboards",
    title: "Keyboards",
    description: "Switches, layouts, and features that match your typing feel and gaming needs. Coming soon.",
    icon: Keyboard,
    factors: ["Switch type", "Form factor", "Actuation speed", "Build quality"],
    available: false,
    cta: "Coming Soon",
    accent: "primary" as const,
    href: "#",
  },
  {
    id: "controllers",
    title: "Controllers",
    description: "Console, PC, or fighting games — find the right controller for your hands and playstyle. Coming soon.",
    icon: Gamepad2,
    factors: ["Platform", "Hand size", "Button layout", "Pro features"],
    available: false,
    cta: "Coming Soon",
    accent: "accent" as const,
    href: "#",
  },
];

const CategoryCards = () => {
  return (
    <section id="categories" className="py-24 md:py-32 bg-gradient-section relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pick Your <span className="text-gradient-accent">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We're starting with what matters most to gamers. More categories are in the works.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative bg-card border rounded-2xl p-8 transition-all duration-300 ${
                category.available 
                  ? "border-border hover:border-primary/50 cursor-pointer" 
                  : "border-border/50 opacity-60"
              }`}
            >
              {/* Glow effect */}
              {category.available && (
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  category.accent === "primary" 
                    ? "bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                    : "bg-gradient-to-br from-accent/10 via-transparent to-transparent"
                }`} />
              )}

              <div className="relative">
                {/* Icon & Title Row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    category.accent === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-1">
                      {category.title}
                    </h3>
                    {!category.available && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Factors */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.factors.map((factor) => (
                    <span
                      key={factor}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {factor}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant={category.available ? (category.accent === "primary" ? "hero" : "accent") : "outline"}
                  className="w-full group/btn"
                  disabled={!category.available}
                  asChild={category.available}
                >
                  {category.available ? (
                    <Link to={category.href}>
                      {category.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span>{category.cta}</span>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
