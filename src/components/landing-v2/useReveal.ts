import { useEffect, useRef, useState } from "react";

/**
 * Hook for scroll-triggered reveal animations.
 * Returns a ref to attach to the element and a boolean for whether it's revealed.
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Normalize threshold to a valid [0, 1] range
  const safeThreshold = Number.isFinite(threshold)
    ? Math.min(1, Math.max(0, threshold))
    : 0.15;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for environments without IntersectionObserver (e.g. older browsers, SSR)
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: safeThreshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [safeThreshold]);

  return { ref, revealed };
}
