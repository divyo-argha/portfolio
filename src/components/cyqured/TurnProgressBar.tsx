"use client";

import { WALKTHROUGH_STEPS, TURN_BOUNDARIES, PLAYERS, type PlayerId } from "./walkthroughData";
import styles from "./TurnProgressBar.module.css";

type Segment = {
  index: number;
  start: number;
  end: number;
  label: string;
  player: PlayerId | null;
  eventLabel: string;
};

function buildSegments(): Segment[] {
  const lastIdx = WALKTHROUGH_STEPS.length - 1;
  const hasTrailingSnapshot = WALKTHROUGH_STEPS[lastIdx].phase === "snapshot";

  const bounds = TURN_BOUNDARIES.map((start, i) => ({
    start,
    end: (TURN_BOUNDARIES[i + 1] ?? WALKTHROUGH_STEPS.length) - 1,
  }));

  if (hasTrailingSnapshot && bounds.length > 0) {
    bounds[bounds.length - 1].end = lastIdx - 1;
    bounds.push({ start: lastIdx, end: lastIdx });
  }

  return bounds.map((b, i) => {
    const first = WALKTHROUGH_STEPS[b.start];
    const last = WALKTHROUGH_STEPS[b.end];
    const isSetup = first.phase === "setup";
    const isSnapshot = first.phase === "snapshot";
    return {
      index: i,
      start: b.start,
      end: b.end,
      label: isSetup ? "Setup" : isSnapshot ? "Summary" : `Turn ${i}`,
      player: first.activePlayer,
      eventLabel: last.title,
    };
  });
}

const SEGMENTS = buildSegments();

export function segmentFor(stepIndex: number): Segment {
  return SEGMENTS.find((s) => stepIndex >= s.start && stepIndex <= s.end) ?? SEGMENTS[0];
}

/** A segmented, clickable turn timeline: one segment per die roll (plus
 * Setup and the closing Summary), colour-coded by whose turn it is. Click
 * any segment to jump straight to it. The current segment is enlarged and
 * glowing; hovering any segment shows who it belongs to and what happens. */
export function TurnProgressBar({ stepIndex, onJump }: { stepIndex: number; onJump: (index: number) => void }) {
  return (
    <div className={styles.track} role="list" aria-label="Turn-by-turn progress, click any segment to jump to it">
      {SEGMENTS.map((seg) => {
        const isCurrent = stepIndex >= seg.start && stepIndex <= seg.end;
        const meta = seg.player ? PLAYERS.find((p) => p.id === seg.player) : null;
        return (
          <button
            key={seg.index}
            type="button"
            role="listitem"
            className={isCurrent ? styles.segmentCurrent : styles.segment}
            style={meta ? ({ "--c": meta.color } as React.CSSProperties) : undefined}
            onClick={() => onJump(seg.start)}
            title={`${seg.label}${meta ? ` — ${meta.name}` : ""}: ${seg.eventLabel}`}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`${seg.label}${meta ? `, ${meta.name}'s turn` : ""}`}
          />
        );
      })}
    </div>
  );
}
