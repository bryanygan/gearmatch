import { ArrowRight, MousePointer2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-[10%] w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-float opacity-60">
        <MousePointer2 className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-1/4 right-[10%] w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center animate-float opacity-60" style={{ animationDelay: "2s" }}>
        <Headphones className="w-8 h-8 text-accent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
            <span className="text-sm text-muted-foreground">
              Now covering mice + audio gear — keyboards & more coming soon
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Stop Guessing.{" "}
            <span className="text-gradient">Find Your</span>
            <br />
            <span className="text-gradient">Perfect Gear.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Answer a few quick questions about how you play, and we'll match you with gear that actually fits — 
            <span className="text-foreground font-medium"> your grip, your playstyle, your budget.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto group">
              Find Your Perfect Mouse
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="accent" size="xl" className="w-full sm:w-auto group">
              Get Audio Recommendations
              <Headphones className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">2-3</div>
              <div className="text-sm text-muted-foreground">Minutes to match</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Products reviewed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">$20-300</div>
              <div className="text-sm text-muted-foreground">Budget range</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">0%</div>
              <div className="text-sm text-muted-foreground">Sponsored picks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
