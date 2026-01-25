import { ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-12 gap-6 min-h-[calc(100vh-5rem)] items-center">
          
          {/* Left Column - Content */}
          <div className="relative z-10 lg:col-span-5 pt-8 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border mb-5 animate-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />
              <span className="text-xs text-muted-foreground">
                Mice + audio live — keyboards coming soon
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-5 animate-slide-up leading-[1.1]" style={{ animationDelay: "0.1s" }}>
              Stop Guessing.
              <br />
              <span className="text-gradient">Find Your</span>
              <br />
              <span className="text-gradient">Perfect Gear.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base text-muted-foreground max-w-md mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Answer a few quick questions about how you play, and we'll match you with gear that actually fits —{" "}
              <span className="text-foreground font-medium">your grip, your playstyle, your budget.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
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
            <div className="flex gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <div className="font-display text-xl font-bold text-foreground">2-3 min</div>
                <div className="text-xs text-muted-foreground">to match</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-xl font-bold text-foreground">150+</div>
                <div className="text-xs text-muted-foreground">products</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-xl font-bold text-foreground">0%</div>
                <div className="text-xs text-muted-foreground">sponsored</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Showcase */}
          <div className="relative lg:col-span-7 h-full flex items-center justify-center py-8 lg:py-0">
            <div className="relative w-full max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              
              {/* Main mouse placeholder - Large central */}
              <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-3xl bg-primary/15 rounded-full" />
                
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/50 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 mx-auto mb-3 rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl lg:text-7xl">🖱️</span>
                    </div>
                    <p className="text-xs text-muted-foreground/60">Mouse PNG</p>
                  </div>
                </div>
              </div>

              {/* Floating headset - top right */}
              <div className="absolute -top-2 right-0 lg:right-4 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/60 border border-border/40 flex items-center justify-center backdrop-blur-sm animate-float shadow-lg shadow-accent/5">
                <div className="text-center p-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-xl bg-muted/30 border border-border/20 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">🎧</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60">Headset</p>
                </div>
              </div>

              {/* Floating IEMs - bottom left */}
              <div className="absolute bottom-4 -left-2 lg:left-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/60 border border-border/40 flex items-center justify-center backdrop-blur-sm animate-float shadow-lg shadow-primary/5" style={{ animationDelay: "1.5s" }}>
                <div className="text-center p-3">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 mx-auto mb-2 rounded-xl bg-muted/30 border border-border/20 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🎵</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60">IEMs</p>
                </div>
              </div>

              {/* Extra floating element - keyboard teaser bottom right */}
              <div className="absolute -bottom-2 right-8 lg:right-16 w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-secondary/50 border border-border/30 flex items-center justify-center backdrop-blur-sm animate-float opacity-60" style={{ animationDelay: "2.5s" }}>
                <div className="text-center p-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-1 rounded-lg bg-muted/20 border border-border/10 flex items-center justify-center">
                    <span className="text-lg sm:text-xl opacity-50">⌨️</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground/40">Soon</p>
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border border-border/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
