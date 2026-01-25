import { ArrowRight, MousePointer2, Headphones } from "lucide-react";
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group" asChild>
              <Link to="/quiz/mouse">
                <MousePointer2 className="w-5 h-5" />
                Find Your Perfect Mouse
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="accent" size="xl" className="w-full sm:w-auto group" asChild>
              <Link to="/quiz/audio">
                <Headphones className="w-5 h-5" />
                Get Audio Recommendations
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
