import { ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RecommendationPreview from "./RecommendationPreview";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-32 pb-8 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
        {/* Always side-by-side grid, scales down together */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-center w-full max-w-7xl">
          
          {/* Left Column - Content */}
          <div className="relative z-10 col-span-6 lg:col-span-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-secondary/80 border border-border mb-3 md:mb-5 animate-slide-up">
              <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary animate-pulse-subtle" />
              <span className="text-[9px] md:text-xs text-muted-foreground whitespace-nowrap">
                Mice + audio live — keyboards soon
              </span>
            </div>

            {/* Headline - Larger */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-3 md:mb-5 animate-slide-up leading-[1.05]" style={{ animationDelay: "0.1s" }}>
              Stop Guessing.
              <br />
              <span className="text-gradient">Find Your</span>
              <br />
              <span className="text-gradient">Perfect Gear.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mb-4 md:mb-6 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Answer a few quick questions about how you work and play, and we'll match you with gear that actually fits —{" "}
              <span className="text-foreground font-medium">your grip, your style, your budget.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-5 md:mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="default" className="group text-xs md:text-sm h-9 md:h-11 px-3 md:px-6" asChild>
                <Link to="/quiz/mouse">
                  Find Your Perfect Mouse
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="accent" size="default" className="group text-xs md:text-sm h-9 md:h-11 px-3 md:px-6" asChild>
                <Link to="/quiz/audio">
                  Get Audio Picks
                  <Headphones className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-3 md:gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <div className="font-display text-sm md:text-xl font-bold text-foreground">2-3 min</div>
                <div className="text-[9px] md:text-xs text-muted-foreground">to match</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-sm md:text-xl font-bold text-foreground">150+</div>
                <div className="text-[9px] md:text-xs text-muted-foreground">products</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-sm md:text-xl font-bold text-foreground">0%</div>
                <div className="text-[9px] md:text-xs text-muted-foreground">sponsored</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Showcase */}
          <div className="relative col-span-6 lg:col-span-7 h-full flex items-center justify-center">
            <div className="relative w-full max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              
              {/* Main mouse placeholder - scales with viewport */}
              <div className="relative mx-auto w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[420px] xl:h-[420px]">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-3xl bg-primary/15 rounded-full" />
                
                <div className="relative w-full h-full rounded-2xl md:rounded-3xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/50 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-2 md:p-8">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-52 xl:h-52 mx-auto mb-1 md:mb-3 rounded-xl md:rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center">
                      <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">🖱️</span>
                    </div>
                    <p className="text-[8px] md:text-xs text-muted-foreground/60">Mouse PNG</p>
                  </div>
                </div>
              </div>

              {/* Floating headset - top right */}
              <div className="absolute -top-1 md:-top-2 right-0 w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/60 border border-border/40 flex items-center justify-center backdrop-blur-sm animate-float shadow-lg shadow-accent/5">
                <div className="text-center p-1 md:p-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-0.5 md:mb-2 rounded-lg md:rounded-xl bg-muted/30 border border-border/20 flex items-center justify-center">
                    <span className="text-base sm:text-xl md:text-2xl lg:text-3xl">🎧</span>
                  </div>
                  <p className="text-[7px] md:text-[10px] text-muted-foreground/60 hidden sm:block">Headset</p>
                </div>
              </div>

              {/* Floating IEMs - bottom left */}
              <div className="absolute bottom-2 md:bottom-4 -left-1 md:left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/60 border border-border/40 flex items-center justify-center backdrop-blur-sm animate-float shadow-lg shadow-primary/5" style={{ animationDelay: "1.5s" }}>
                <div className="text-center p-1 md:p-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 mx-auto mb-0.5 md:mb-2 rounded-lg md:rounded-xl bg-muted/30 border border-border/20 flex items-center justify-center">
                    <span className="text-sm sm:text-lg md:text-xl lg:text-2xl">🎵</span>
                  </div>
                  <p className="text-[7px] md:text-[10px] text-muted-foreground/60 hidden sm:block">IEMs</p>
                </div>
              </div>

              {/* Keyboard teaser - bottom right */}
              <div className="absolute -bottom-1 md:-bottom-2 right-4 md:right-8 lg:right-16 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-lg md:rounded-xl bg-secondary/50 border border-border/30 flex items-center justify-center backdrop-blur-sm animate-float opacity-60" style={{ animationDelay: "2.5s" }}>
                <div className="text-center p-1 md:p-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-auto mb-0.5 md:mb-1 rounded-md md:rounded-lg bg-muted/20 border border-border/10 flex items-center justify-center">
                    <span className="text-xs sm:text-base md:text-lg lg:text-xl opacity-50">⌨️</span>
                  </div>
                  <p className="text-[6px] md:text-[9px] text-muted-foreground/40 hidden sm:block">Soon</p>
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] rounded-full border border-border/10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Recommendation Preview */}
        <div className="mt-6 md:mt-10 w-full">
          <RecommendationPreview />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
