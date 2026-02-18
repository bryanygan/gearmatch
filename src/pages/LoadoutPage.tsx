import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LoadoutPageWrapper from "@/components/loadout/LoadoutPageWrapper";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const LoadoutPage = () => {
  const sound = useSoundEffects();
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <div className="min-h-screen bg-background loadout-grid-bg loadout-vignette relative">
      <Navbar />

      {/* Header */}
      <section className="relative z-10 pt-24 pb-4 md:pt-28 md:pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto relative">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Build Your Setup
            </p>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Build Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Loadout
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Pick your peripherals like you're gearing up for a match.
            </p>

            {/* Sound toggle — desktop only */}
            {isDesktop && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-8 w-8 text-slate-500 hover:text-slate-300"
                onClick={sound.toggleSound}
                aria-label={sound.enabled ? "Mute sound effects" : "Enable sound effects"}
              >
                {sound.enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Buy Menu */}
      <section className="relative z-10 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <LoadoutPageWrapper />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoadoutPage;
