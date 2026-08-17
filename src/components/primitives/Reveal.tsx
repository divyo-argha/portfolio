"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Reveal.module.css";

type Delay = 0 | 1 | 2 | 3 | 4 | 5;

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: Delay }) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const show = revealed || reducedMotion;

  const className = [styles.reveal, show && styles.revealed, delay > 0 && styles[`delay${delay}`]]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
