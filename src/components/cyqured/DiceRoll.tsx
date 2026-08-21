"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./DiceRoll.module.css";

const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
};

function DiceFace({ value }: { value: number }) {
  return (
    <div className={styles.face}>
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const active = PIP_LAYOUTS[value]?.some(([r, c]) => r === row && c === col);
        return <span key={i} className={active ? styles.pipOn : styles.pipOff} />;
      })}
    </div>
  );
}

/** An animated six-sided die that cycles faces briefly, then settles on
 * `result`. Remount with a new `key` (e.g. the step id) to replay it. */
export function DiceRoll({ result }: { result: number }) {
  const reducedMotion = useReducedMotion();
  const [face, setFace] = useState(() => (reducedMotion ? result : 1));
  const [settled, setSettled] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    let ticks = 0;
    const interval = window.setInterval(() => {
      ticks += 1;
      setFace(1 + Math.floor(Math.random() * 6));
      if (ticks >= 9) {
        window.clearInterval(interval);
        setFace(result);
        setSettled(true);
      }
    }, 65);
    return () => window.clearInterval(interval);
  }, [result, reducedMotion]);

  return (
    <div className={styles.wrap}>
      <div className={[styles.cube, settled ? styles.cubeSettled : styles.cubeRolling].join(" ")}>
        <DiceFace value={face} />
      </div>
      <span className={styles.resultLabel}>{settled ? `Rolled a ${result}` : "Rolling…"}</span>
    </div>
  );
}
