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

/** Standard die layout, opposite faces sum to 7. Each entry says which
 * cube rotation brings that value's face to point at the viewer. */
const FACE_ROTATION: Record<number, { x: number; y: number; face: string }> = {
  1: { x: 0, y: 0, face: "front" },
  6: { x: 0, y: 180, face: "back" },
  2: { x: 0, y: -90, face: "right" },
  5: { x: 0, y: 90, face: "left" },
  3: { x: -90, y: 0, face: "top" },
  4: { x: 90, y: 0, face: "bottom" },
};

function Pips({ value }: { value: number }) {
  return (
    <div className={styles.pipGrid}>
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const active = PIP_LAYOUTS[value]?.some(([r, c]) => r === row && c === col);
        return <span key={i} className={active ? styles.pipOn : styles.pipOff} />;
      })}
    </div>
  );
}

/** An animated six-sided die that tumbles in 3D, then settles showing the
 * correct face pointing at the viewer. Remount with a new `key` (e.g. the
 * step id) to replay it. */
export function DiceRoll({ result }: { result: number }) {
  const reducedMotion = useReducedMotion();
  const [rolling, setRolling] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const timeout = window.setTimeout(() => setRolling(false), 750);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  const target = FACE_ROTATION[result] ?? FACE_ROTATION[1];

  return (
    <div className={styles.wrap}>
      <div className={styles.scene}>
        <div className={styles.shadow} />
        <div
          className={[styles.cube, rolling ? styles.cubeTumbling : styles.cubeSettled].join(" ")}
          style={rolling ? undefined : { transform: `rotateX(${target.x}deg) rotateY(${target.y}deg)` }}
        >
          <div className={[styles.face, styles.faceFront].join(" ")}>
            <Pips value={1} />
          </div>
          <div className={[styles.face, styles.faceBack].join(" ")}>
            <Pips value={6} />
          </div>
          <div className={[styles.face, styles.faceRight].join(" ")}>
            <Pips value={2} />
          </div>
          <div className={[styles.face, styles.faceLeft].join(" ")}>
            <Pips value={5} />
          </div>
          <div className={[styles.face, styles.faceTop].join(" ")}>
            <Pips value={3} />
          </div>
          <div className={[styles.face, styles.faceBottom].join(" ")}>
            <Pips value={4} />
          </div>
        </div>
      </div>
      <span className={styles.resultLabel}>{rolling ? "Rolling…" : `Rolled a ${result}`}</span>
    </div>
  );
}
