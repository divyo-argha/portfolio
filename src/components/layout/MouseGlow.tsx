"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./MouseGlow.module.css";

/**
 * A very light, cursor-following glow behind all page content. Position is
 * written straight onto the element's `style` inside `requestAnimationFrame`
 * rather than through React state, so tracking the mouse never triggers a
 * re-render. Off entirely for reduced-motion and for touch/coarse pointers,
 * where there is no persistent cursor to follow.
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;

    function handleMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el!.style.setProperty("--mx", `${targetX}px`);
        el!.style.setProperty("--my", `${targetY}px`);
        el!.style.opacity = "1";
        frame = 0;
      });
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
}
