"use client";

import { useEffect, useRef, useState } from "react";

type RevealCallback = () => void;

let sharedObserver: IntersectionObserver | null = null;
const listeners = new WeakMap<Element, RevealCallback>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = listeners.get(entry.target);
            if (cb) {
              cb();
              listeners.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      // Reveal *before* the element reaches the viewport: the bottom margin
      // extends the root downward, so a card starts fading in while it is
      // still below the fold and is fully painted by the time it scrolls into view.
      { threshold: 0, rootMargin: "0px 0px 20% 0px" },
    );
  }
  return sharedObserver;
}

/**
 * Attaches to any element; flips `revealed` true once it enters the viewport.
 * Uses a single shared IntersectionObserver across all components to eliminate
 * redundant observer allocations and multi-callback dispatch jank.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = getSharedObserver();
    if (!observer) {
      const timeout = setTimeout(() => setRevealed(true), 0);
      return () => clearTimeout(timeout);
    }

    listeners.set(node, () => setRevealed(true));
    observer.observe(node);

    return () => {
      listeners.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return { ref, revealed };
}
