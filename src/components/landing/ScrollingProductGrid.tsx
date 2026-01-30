import { useMemo } from "react";

interface ScrollingProductGridProps {
  skipAnimations?: boolean;
}

// Product image data organized by category
// Each image has base, @2x, and _large variants for responsive loading
type ProductCategory = "mouse" | "headphone" | "keyboard" | "iem";

interface HeroImage {
  baseName: string;
  category: ProductCategory;
}

const HERO_IMAGES: Record<ProductCategory, string[]> = {
  mouse: [
    "22572_1",
    "26-197-336-01",
    "32163_1",
    "35327_1",
    "619xpFKAXPL",
    "razer_viper",
    "8189uwDnMkL",
    "zowie_ec2",
    "keychron_m3",
    "pulsar_tenz",
    "logitech_superlight",
  ],
  headphone: [
    "bosequietcomfort",
    "logitech",
    "maxwell",
    "razer_blackshark",
    "sennheiserhd800s",
    "sonyxm6",
    "steelseries",
    "technics",
    "astro",
    "soundcore",
  ],
  keyboard: [
    "aula",
    "ergo",
    "fun60",
    "keyabord",
    "keyboard",
    "logiergo",
    "logikeys",
    "logiwave",
    "rk",
    "corsairk70",
    "razerkeeb",
  ],
  iem: [
    "51r5xVvVy2L",
    "sennheiser_ie600",
    "moondrop_aria",
    "61KWuxrtzcL",
  ],
};

const CATEGORY_PATHS: Record<ProductCategory, string> = {
  mouse: "/hero_images/mouse_images",
  headphone: "/hero_images/headphone_images",
  keyboard: "/hero_images/keyboard_images",
  iem: "/hero_images/iem_images",
};

// Column configuration - which categories to show in each column
const COLUMN_CATEGORIES: ProductCategory[] = ["mouse", "headphone", "iem", "keyboard"];

// Seeded random for consistent shuffling across renders (but different per session)
function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let currentIndex = result.length;
  let randomValue = seed;

  while (currentIndex !== 0) {
    // Simple LCG for pseudo-random
    randomValue = (randomValue * 1103515245 + 12345) & 0x7fffffff;
    const randomIndex = randomValue % currentIndex;
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }

  return result;
}

// Generate infinite image sequence for a column by cycling through shuffled images
function generateColumnImages(category: ProductCategory, seed: number, count: number): HeroImage[] {
  const categoryImages = HERO_IMAGES[category];
  const shuffled = seededShuffle(categoryImages, seed);
  const result: HeroImage[] = [];

  for (let i = 0; i < count; i++) {
    result.push({
      baseName: shuffled[i % shuffled.length],
      category,
    });
  }

  return result;
}

function getImageSrc(image: HeroImage): string {
  return `${CATEGORY_PATHS[image.category]}/${image.baseName}.webp`;
}

function getImageSrcSet(image: HeroImage): string {
  const base = CATEGORY_PATHS[image.category];
  const name = image.baseName;
  return `${base}/${name}.webp 1x, ${base}/${name}@2x.webp 2x`;
}

const ScrollingProductGrid = ({ skipAnimations = false }: ScrollingProductGridProps) => {
  // Generate column images with stable randomization per session
  const columnData = useMemo(() => {
    // Use timestamp at component mount for session-unique seed
    const sessionSeed = Math.floor(Date.now() / 1000);

    return COLUMN_CATEGORIES.map((category, colIndex) => {
      // Different seed per column for variety
      const columnSeed = sessionSeed + colIndex * 1000;
      // Generate enough images for seamless looping (2x for duplication)
      const images = generateColumnImages(category, columnSeed, 8);
      return { category, images };
    });
  }, []);

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
        {columnData.map(({ images }, columnIndex) => {
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
                {images.map((image, imgIndex) => (
                  <div
                    key={`original-${imgIndex}`}
                    className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-secondary/50 shadow-lg"
                  >
                    <img
                      src={getImageSrc(image)}
                      srcSet={getImageSrcSet(image)}
                      alt=""
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Duplicated images for seamless loop */}
                {images.map((image, imgIndex) => (
                  <div
                    key={`duplicate-${imgIndex}`}
                    className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-secondary/50 shadow-lg"
                  >
                    <img
                      src={getImageSrc(image)}
                      srcSet={getImageSrcSet(image)}
                      alt=""
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ScrollingProductGrid;
