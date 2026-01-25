import { ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 min-h-[calc(100vh-5rem)] items-center">
          
          {/* Left Column - Content */}
          <div className="relative z-10 max-w-xl pt-8 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border mb-6 animate-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />
              <span className="text-xs text-muted-foreground">
                Mice + audio live — keyboards coming soon
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Stop Guessing.
              <br />
              <span className="text-gradient">Find Your</span>
              <br />
              <span className="text-gradient">Perfect Gear.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Answer a few quick questions about how you play, and we'll match you with gear that actually fits —{" "}
              <span className="text-foreground font-medium">your grip, your playstyle, your budget.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" className="group">
                Find Your Perfect Mouse
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="accent" size="lg" className="group">
                Get Audio Picks
                <Headphones className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats - Horizontal compact */}
            <div className="flex flex-wrap gap-6 sm:gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">2-3 min</div>
                <div className="text-xs text-muted-foreground">to match</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">150+</div>
                <div className="text-xs text-muted-foreground">products</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">0%</div>
                <div className="text-xs text-muted-foreground">sponsored</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Showcase */}
          <div className="relative lg:h-full flex items-center justify-center lg:justify-end">
            {/* Main product placeholder - Mouse */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {/* Glow effect behind main product */}
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-75" />
              
              {/* Main mouse placeholder */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-secondary/50 border border-border/50 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center p-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-2xl bg-muted/50 border border-border/30 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🖱️</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Mouse PNG here</p>
                </div>
              </div>

              {/* Floating headphone placeholder - offset top right */}
              <div className="absolute -top-8 -right-4 sm:-right-12 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-secondary/70 border border-border/50 flex items-center justify-center backdrop-blur-sm animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-center p-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-xl bg-muted/50 border border-border/30 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🎧</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Headset</p>
                </div>
              </div>

              {/* Floating IEM placeholder - offset bottom left */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-secondary/70 border border-border/50 flex items-center justify-center backdrop-blur-sm animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-center p-3">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 rounded-xl bg-muted/50 border border-border/30 flex items-center justify-center">
                    <span className="text-lg sm:text-xl">🎵</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">IEMs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
