import { Mouse, Headphones, Target, Music } from "lucide-react";

const mouseRecommendations = [
  {
    icon: Mouse,
    name: "Logitech G Pro X Superlight 2",
    specs: "Wireless • 60g • Large hands",
    match: 98,
  },
  {
    icon: Target,
    name: "Pulsar X2V2",
    specs: "Wireless • 52g • Claw grip",
    match: 94,
  },
  {
    icon: Mouse,
    name: "Razer DeathAdder V3",
    specs: "Wireless • 63g • Ergo shape",
    match: 91,
  },
];

const audioRecommendations = [
  {
    icon: Headphones,
    name: "SteelSeries Arctis Nova Pro",
    specs: "Wireless • ANC • Gaming DAC",
    match: 96,
  },
  {
    icon: Music,
    name: "Moondrop Aria 2",
    specs: "IEM • Neutral • Budget king",
    match: 93,
  },
  {
    icon: Headphones,
    name: "HyperX Cloud III",
    specs: "Wired • 53mm drivers • Comfort",
    match: 89,
  },
];

const RecommendationPreview = () => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in relative" style={{ animationDelay: "0.5s" }}>
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none rounded-b-2xl" />
      
      {/* Browser window container */}
      <div className="bg-[hsl(var(--card))] border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
        {/* macOS title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 border-b border-border/30">
          {/* Traffic light buttons */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            GearMatch — Your recommendations
          </span>
        </div>

        {/* Content area */}
        <div className="p-4 md:p-6 space-y-4">
          {/* Mouse recommendations row */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">🖱️ Mice</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {mouseRecommendations.map((rec, index) => (
                <div
                  key={rec.name}
                  className="group bg-secondary/60 border border-border/30 rounded-xl p-4 md:p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  role="article"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-3 md:mb-4">
                    <rec.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1 leading-tight">
                    {rec.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {rec.specs}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium">
                    {rec.match}% match
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio recommendations row */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">🎧 Audio</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {audioRecommendations.map((rec, index) => (
                <div
                  key={rec.name}
                  className="group bg-secondary/60 border border-border/30 rounded-xl p-4 md:p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(251,191,36,0.1)]"
                  style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  role="article"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-3 md:mb-4">
                    <rec.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1 leading-tight">
                    {rec.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {rec.specs}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium">
                    {rec.match}% match
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPreview;
