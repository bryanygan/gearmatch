import { MessageCircle } from "lucide-react";

// Placeholder peripheral packs - fill in your own data later
const peripheralPacks = [
  {
    id: 1,
    title: "Budget FPS Gaming Setup",
    category: "Gaming • Competitive",
    items: [
      "Logitech G Pro X Superlight 2",
      "HyperX Cloud III",
      "Razer BlackWidow V4",
    ],
    price: 329.99,
    comments: 47,
    images: [
      "/placeholder-mouse.png",
    ],
  },
  {
    id: 2,
    title: "Premium Productivity Pack",
    category: "Work • Ergonomic",
    items: [
      "Logitech MX Master 3S",
      "Sony WH-1000XM5",
      "Keychron Q1 Pro",
    ],
    price: 649.99,
    comments: 82,
    images: [
      "/placeholder-mouse.png",
      "/placeholder-headset.png",
    ],
  },
  {
    id: 3,
    title: "Music Production Essentials",
    category: "Audio • Creative",
    items: [
      "Sennheiser HD 600",
      "Focusrite Scarlett 2i2",
      "Audio-Technica AT2020",
    ],
    price: 479.99,
    comments: 34,
    images: [
      "/placeholder-headphones.png",
      "/placeholder-interface.png",
      "/placeholder-mic.png",
    ],
  },
  {
    id: 4,
    title: "CS Student Starter Kit",
    category: "Student • Budget",
    items: [
      "Pulsar X2V2",
      "Moondrop Aria 2",
      "Royal Kludge RK84",
    ],
    price: 199.99,
    comments: 156,
    images: [
      "/placeholder-mouse.png",
      "/placeholder-iem.png",
      "/placeholder-keyboard.png",
      "/placeholder-monitor.png",
    ],
  },
  {
    id: 5,
    title: "Streamer Pro Setup",
    category: "Streaming • Content",
    items: [
      "Elgato Wave:3",
      "SteelSeries Arctis Nova Pro",
      "Razer DeathAdder V3",
    ],
    price: 549.99,
    comments: 93,
    images: [
      "/placeholder-mic.png",
      "/placeholder-headset.png",
      "/placeholder-mouse.png",
      "/placeholder-keyboard.png",
      "/placeholder-camera.png",
    ],
  },
  {
    id: 6,
    title: "Graphic Designer Bundle",
    category: "Creative • Precision",
    items: [
      "Wacom Intuos Pro",
      "Logitech MX Anywhere 3",
      "Apple Magic Keyboard",
    ],
    price: 429.99,
    comments: 28,
    images: [
      "/placeholder-tablet.png",
      "/placeholder-mouse.png",
      "/placeholder-keyboard.png",
      "/placeholder-monitor.png",
      "/placeholder-stylus.png",
      "/placeholder-hub.png",
    ],
  },
];

const ImageShowcase = ({ images }: { images: string[] }) => {
  const displayImages = images.slice(0, 6);
  const count = displayImages.length;

  // Placeholder image component
  const PlaceholderImg = ({ label }: { label: string }) => (
    <div className="w-full h-full bg-muted/50 flex items-center justify-center text-muted-foreground text-xs">
      {label}
    </div>
  );

  // 1 image: full width
  if (count === 1) {
    return (
      <div className="w-full h-full">
        <PlaceholderImg label="IMG 1" />
      </div>
    );
  }

  // 2 images: side by side
  if (count === 2) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-0.5">
        <PlaceholderImg label="IMG 1" />
        <PlaceholderImg label="IMG 2" />
      </div>
    );
  }

  // 3 images: main image left, 2 stacked right
  if (count === 3) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-0.5">
        <div className="h-full">
          <PlaceholderImg label="IMG 1" />
        </div>
        <div className="h-full grid grid-rows-2 gap-0.5">
          <PlaceholderImg label="IMG 2" />
          <PlaceholderImg label="IMG 3" />
        </div>
      </div>
    );
  }

  // 4 images: 2x2 grid
  if (count === 4) {
    return (
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
        <PlaceholderImg label="IMG 1" />
        <PlaceholderImg label="IMG 2" />
        <PlaceholderImg label="IMG 3" />
        <PlaceholderImg label="IMG 4" />
      </div>
    );
  }

  // 5 images: main image left, 2x2 grid right
  if (count === 5) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-0.5">
        <div className="h-full">
          <PlaceholderImg label="IMG 1" />
        </div>
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-0.5">
          <PlaceholderImg label="IMG 2" />
          <PlaceholderImg label="IMG 3" />
          <PlaceholderImg label="IMG 4" />
          <PlaceholderImg label="IMG 5" />
        </div>
      </div>
    );
  }

  // 6 images: 3x2 grid
  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-0.5">
      <PlaceholderImg label="IMG 1" />
      <PlaceholderImg label="IMG 2" />
      <PlaceholderImg label="IMG 3" />
      <PlaceholderImg label="IMG 4" />
      <PlaceholderImg label="IMG 5" />
      <PlaceholderImg label="IMG 6" />
    </div>
  );
};

const PackCard = ({ pack }: { pack: typeof peripheralPacks[0] }) => {
  return (
    <div className="group bg-[hsl(var(--card))] border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary/30">
      {/* Image Showcase Area */}
      <div className="relative h-44 bg-secondary/30 overflow-hidden">
        <ImageShowcase images={pack.images} />
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-foreground leading-tight">
            {pack.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{pack.category}</p>
        </div>

        {/* Spec Summary */}
        <div className="space-y-1">
          {pack.items.map((item, index) => (
            <p key={index} className="text-sm text-muted-foreground leading-snug">
              {item}
            </p>
          ))}
        </div>

        {/* Bottom Meta Row */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-lg font-bold text-foreground">
            ${pack.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{pack.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendationPreview = () => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
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
            GearMatch — Curated Peripheral Packs
          </span>
        </div>

        {/* Content area */}
        <div className="p-4 md:p-6">
          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {peripheralPacks.map((pack, index) => (
              <div
                key={pack.id}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                className="animate-fade-in"
              >
                <PackCard pack={pack} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPreview;
