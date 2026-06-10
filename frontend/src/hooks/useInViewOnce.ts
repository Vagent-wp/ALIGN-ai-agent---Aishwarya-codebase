import { useEffect, useRef, useState } from 'react';

export function useInViewOnce<T extends HTMLElement>(rootMargin = '-80px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
