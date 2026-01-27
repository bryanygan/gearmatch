interface ScrollingProductGridProps {
  skipAnimations?: boolean;
}

// Placeholder product images for each column
// Using different image sets per column for visual variety
const columnImages = [
  // Column 1 - Mice
  [
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=Mouse+1",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=Mouse+2",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=Mouse+3",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=Mouse+4",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=Mouse+5",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=Mouse+6",
  ],
  // Column 2 - Headsets
  [
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Headset+1",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Headset+2",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Headset+3",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Headset+4",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Headset+5",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Headset+6",
  ],
  // Column 3 - IEMs
  [
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=IEM+1",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=IEM+2",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=IEM+3",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=IEM+4",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=IEM+5",
    "https://placehold.co/200x200/1a1f2e/00d4ff?text=IEM+6",
  ],
  // Column 4 - Keyboards
  [
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Keyboard+1",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Keyboard+2",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Keyboard+3",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Keyboard+4",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Keyboard+5",
    "https://placehold.co/200x200/1a1f2e/f59e0b?text=Keyboard+6",
  ],
];

const ScrollingProductGrid = ({ skipAnimations = false }: ScrollingProductGridProps) => {
  return (
    <div
      className="scrolling-grid-container relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden"
      aria-hidden="true"
    >
      {/* Gradient overlays for fade effect at top and bottom */}
      <div className="absolute inset-x-0 top-0 h-16 md:h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Grid columns */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 h-full justify-center px-2">
        {columnImages.map((images, columnIndex) => {
          const isScrollingUp = columnIndex % 2 === 1;
          const animationClass = skipAnimations
            ? ""
            : isScrollingUp
              ? "animate-scroll-up"
              : "animate-scroll-down";

          // Scale factor for outer columns (depth effect)
          const isOuterColumn = columnIndex === 0 || columnIndex === 3;
          const scaleClass = isOuterColumn ? "scale-95 opacity-70" : "";

          return (
            <div
              key={columnIndex}
              className={`scrolling-column flex-1 max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] overflow-hidden ${scaleClass}`}
            >
              <div
                className={`scroll-content flex flex-col gap-2 sm:gap-3 md:gap-4 ${animationClass}`}
                style={{
                  animationDelay: `${columnIndex * -5}s`,
                }}
              >
                {/* Original images */}
                {images.map((src, imgIndex) => (
                  <div
                    key={`original-${imgIndex}`}
                    className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-secondary/50 shadow-lg"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Subtle glow on some images */}
                    {imgIndex % 3 === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                    )}
                  </div>
                ))}
                {/* Duplicated images for seamless loop */}
                {images.map((src, imgIndex) => (
                  <div
                    key={`duplicate-${imgIndex}`}
                    className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-secondary/50 shadow-lg"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {imgIndex % 3 === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-5 pointer-events-none" />
    </div>
  );
};

export default ScrollingProductGrid;
