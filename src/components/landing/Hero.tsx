import { ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RecommendationPreview from "./RecommendationPreview";
import ScrollingProductGrid from "./ScrollingProductGrid";

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
                <div className="font-display text-sm md:text-xl font-bold text-foreground">530+</div>
                <div className="text-[9px] md:text-xs text-muted-foreground">products</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-sm md:text-xl font-bold text-foreground">0%</div>
                <div className="text-[9px] md:text-xs text-muted-foreground">sponsored</div>
              </div>
            </div>
          </div>

          {/* Right Column - Scrolling Product Grid */}
          <div className="relative col-span-6 lg:col-span-7 h-full flex items-center justify-center">
            <div className="relative w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {/* Glow effect behind grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 blur-3xl bg-primary/10 rounded-full pointer-events-none" />

              <ScrollingProductGrid />
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
