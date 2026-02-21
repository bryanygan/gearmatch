import { useState, useEffect } from "react";

/**
 * Reactive media-query hook.
 *
 * Returns `true` when the given CSS media query matches, and updates
 * automatically when the viewport changes (resize, rotation, etc.).
 *
 * @example useMediaQuery("(min-width: 900px)")
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
