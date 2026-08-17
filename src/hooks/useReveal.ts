"use client";

import { useEffect, useRef, useState } from "react";

/** Attaches to any element; flips `revealed` true once it enters the viewport. Reduced-motion users get `revealed` immediately (see globals — animation is also disabled at the CSS level). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support (very old browsers): reveal on the next tick
      // rather than synchronously, so content isn't stuck at opacity 0.
      const timeout = setTimeout(() => setRevealed(true), 0);
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}
