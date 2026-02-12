import { ArrowRight, MousePointer2, Headphones, Keyboard, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Gear That{" "}
            <span className="text-gradient">Actually Fits?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            2-3 minutes. Zero spam. Just personalized picks based on how you actually play.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Button variant="hero" size="xl" className="w-full group text-sm sm:text-lg h-11 sm:h-14 px-4 sm:px-8" asChild>
              <Link to="/quiz/mouse">
                <MousePointer2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Find Your Mouse
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="accent" size="xl" className="w-full group text-sm sm:text-lg h-11 sm:h-14 px-4 sm:px-8" asChild>
              <Link to="/quiz/audio">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
                Audio Picks
              </Link>
            </Button>
            <Button variant="keyboard" size="xl" className="w-full group text-sm sm:text-lg h-11 sm:h-14 px-4 sm:px-8" asChild>
              <Link to="/quiz/keyboard">
                <Keyboard className="w-4 h-4 sm:w-5 sm:h-5" />
                Keyboard Match
              </Link>
            </Button>
            <Button variant="monitor" size="xl" className="w-full group text-sm sm:text-lg h-11 sm:h-14 px-4 sm:px-8" asChild>
              <Link to="/quiz/monitor">
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
                Monitor Finder
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Free to use • No account required • No sponsored recommendations
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
