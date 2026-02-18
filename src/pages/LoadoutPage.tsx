import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LoadoutPageWrapper from "@/components/loadout/LoadoutPageWrapper";

const LoadoutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Build Your Setup
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Build Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Loadout
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick your peripherals like you're gearing up for a match. Select a
              curated loadout or build your own from scratch.
            </p>
          </div>
        </div>
      </section>

      {/* Buy Menu */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <LoadoutPageWrapper />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoadoutPage;
