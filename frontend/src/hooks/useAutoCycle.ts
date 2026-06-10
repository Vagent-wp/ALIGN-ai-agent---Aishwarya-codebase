import { useCallback, useEffect, useRef, useState } from 'react';

export function useAutoCycle(length: number, cycleMs: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(Date.now());

  const goTo = useCallback(
    (index: number) => {
      if (length <= 0) return;
      setActiveIndex(((index % length) + length) % length);
      setProgress(0);
      startRef.current = Date.now();
    },
    [length]
  );

  const pauseHandlers = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => {
      setIsPaused(false);
      startRef.current = Date.now();
      setProgress(0);
    },
    onFocusCapture: () => setIsPaused(true),
    onBlurCapture: () => {
      setIsPaused(false);
      startRef.current = Date.now();
      setProgress(0);
    },
  };

  useEffect(() => {
    if (isPaused || length <= 0) return;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / cycleMs) * 100, 100);
      setProgress(pct);

      if (elapsed >= cycleMs) {
        goTo(activeIndex + 1);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, isPaused, cycleMs, goTo, length]);

  return { activeIndex, progress, goTo, isPaused, pauseHandlers };
}
