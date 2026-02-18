import { useState, useCallback, useRef } from "react";

/**
 * Synthetic sound effects using Web Audio API.
 * No audio files needed — generates short tones programmatically.
 * Disabled by default; toggle with `toggleSound()`.
 */
export function useSoundEffects() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (ctxRef.current) return ctxRef.current;
    try {
      ctxRef.current = new AudioContext();
      return ctxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playTone = useCallback(
    (
      freqStart: number,
      freqEnd: number,
      duration: number,
      type: OscillatorType = "sine",
    ) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(
        freqEnd,
        ctx.currentTime + duration / 1000,
      );
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration / 1000,
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration / 1000);
    },
    [enabled, getCtx],
  );

  const playClick = useCallback(
    () => playTone(800, 800, 50),
    [playTone],
  );

  const playAdd = useCallback(
    () => playTone(400, 600, 100),
    [playTone],
  );

  const playRemove = useCallback(
    () => playTone(500, 300, 80),
    [playTone],
  );

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      if (!prev) {
        // Resume context on first enable (browser autoplay policy)
        const ctx = getCtx();
        if (ctx?.state === "suspended") ctx.resume();
      }
      return !prev;
    });
  }, [getCtx]);

  return { enabled, toggleSound, playClick, playAdd, playRemove };
}
