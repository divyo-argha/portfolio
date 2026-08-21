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
      // Reveal *before* the element reaches the viewport: the bottom margin
      // extends the root downward, so a card starts fading in while it is
      // still below the fold and is fully painted by the time it scrolls into
      // view. The previous values (threshold 0.15 with a negative bottom
      // margin) required 15% of a tall card to already be on screen, which
      // left a full screen of empty page during a normal-speed scroll.
      { threshold: 0, rootMargin: "0px 0px 20% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}
