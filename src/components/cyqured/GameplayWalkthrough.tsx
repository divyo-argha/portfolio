"use client";

import { useMemo, useState } from "react";
import {
  PLAYERS,
  WALKTHROUGH_STEPS,
  rankByTotal,
  eliminationStatus,
  totalScore,
  TARGET_SCORE,
  type PlayerId,
} from "./walkthroughData";
import { CONNECTED_DEVICES } from "./GameBoardSection";
import { GameTable } from "./GameTable";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@/components/primitives/Icons";
import styles from "./GameplayWalkthrough.module.css";

const DEVICE_COLOR: Record<string, string> = Object.fromEntries(CONNECTED_DEVICES.map((d) => [d.name, d.color]));

export function GameplayWalkthrough() {
  const [stepIndex, setStepIndex] = useState(0);
  const [manualSelection, setManualSelection] = useState<PlayerId | null>(null);

  const step = WALKTHROUGH_STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === WALKTHROUGH_STEPS.length - 1;
  const selectedPlayer = manualSelection ?? step.activePlayer ?? "alice";

  const history = useMemo(
    () => WALKTHROUGH_STEPS.slice(0, stepIndex + 1).flatMap((s) => s.historyEntries),
    [stepIndex],
  );

  const standings = useMemo(() => rankByTotal(step.playerStates), [step.playerStates]);
  const elimination = useMemo(() => eliminationStatus(step.playerStates), [step.playerStates]);
  const leader = standings[0];

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, WALKTHROUGH_STEPS.length - 1));
    setManualSelection(null);
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
    setManualSelection(null);
  }

  const selectedState = step.playerStates[selectedPlayer];
  const selectedPlayerMeta = PLAYERS.find((p) => p.id === selectedPlayer)!;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>One Example Playthrough</span>
        <h2 className={styles.title}>See a Turn Play Out</h2>
        <p className={styles.subtitle}>
          Five players, one board. Step through a real slice of a CyQured game, buying devices, attacking, defending,
          and watching the score change, to see how the rules from the Rules & Mechanics tab actually play out at the
          table.
        </p>
      </div>

      <div className={styles.stage}>
        <GameTable
          playerStates={step.playerStates}
          activePlayer={step.activePlayer}
          selectedPlayer={selectedPlayer}
          onSelectPlayer={setManualSelection}
          highlightCellIndex={step.highlightCellIndex}
        />

        <div className={styles.narrationCol}>
          <div className={styles.stepMeta}>
            <span className={styles.stepCounter}>
              Step {stepIndex + 1} / {WALKTHROUGH_STEPS.length}
            </span>
            <span className={styles.turnLabel}>{step.turnLabel}</span>
          </div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          {step.narration.map((p) => (
            <p key={p.slice(0, 24)} className={styles.narrationText}>
              {p}
            </p>
          ))}

          <div className={styles.navRow}>
            <button type="button" className={styles.navButton} onClick={goBack} disabled={isFirst}>
              <IconArrowLeft size={15} />
              <span>Back</span>
            </button>
            <div className={styles.progressTrack} aria-hidden="true">
              {WALKTHROUGH_STEPS.map((s, i) => (
                <span key={s.id} className={i === stepIndex ? styles.progressDotActive : styles.progressDot} />
              ))}
            </div>
            <button type="button" className={styles.navButtonPrimary} onClick={goNext} disabled={isLast}>
              <span>Next</span>
              <IconArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Player chips row */}
      <div className={styles.playerRow}>
        {PLAYERS.map((p) => {
          const s = step.playerStates[p.id];
          const isActive = p.id === step.activePlayer;
          const isSelected = p.id === selectedPlayer;
          return (
            <button
              key={p.id}
              type="button"
              className={isSelected ? styles.playerChipSelected : styles.playerChip}
              style={{ "--c": p.color } as React.CSSProperties}
              onClick={() => setManualSelection(p.id)}
            >
              <span className={styles.chipDot} />
              <span className={styles.chipName}>
                {p.name}
                {isActive ? <span className={styles.chipActiveTag}>turn</span> : null}
              </span>
              <span className={styles.chipStats}>
                {s.credits}cr · {s.points}pt
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected player detail */}
      <div className={styles.detailCard} style={{ "--c": selectedPlayerMeta.color } as React.CSSProperties}>
        <div className={styles.detailHeader}>
          <span className={styles.detailAvatarDot} />
          <h4 className={styles.detailName}>{selectedPlayerMeta.name}</h4>
          {step.activePlayer === selectedPlayer ? <span className={styles.detailActiveBadge}>Current turn</span> : null}
        </div>
        <div className={styles.detailStatsRow}>
          <div className={styles.detailStat}>
            <span className={styles.detailStatLabel}>Credits</span>
            <span className={styles.detailStatValue}>{selectedState.credits}</span>
          </div>
          <div className={styles.detailStat}>
            <span className={styles.detailStatLabel}>Points</span>
            <span className={styles.detailStatValue}>{selectedState.points}</span>
          </div>
          <div className={styles.detailStat}>
            <span className={styles.detailStatLabel}>Total</span>
            <span className={styles.detailStatValue}>{totalScore(selectedState)}</span>
          </div>
          <div className={styles.detailStat}>
            <span className={styles.detailStatLabel}>Hand</span>
            <span className={styles.detailStatValue}>{selectedState.handSize} cards</span>
          </div>
          <div className={styles.detailStat}>
            <span className={styles.detailStatLabel}>Board cell</span>
            <span className={styles.detailStatValue}>#{selectedState.boardPos}</span>
          </div>
        </div>
        <div className={styles.detailDevices}>
          <span className={styles.detailDevicesLabel}>Devices owned</span>
          {selectedState.devices.length > 0 ? (
            <div className={styles.deviceChips}>
              {selectedState.devices.map((d) => (
                <span key={d} className={styles.deviceChip} style={{ "--dc": DEVICE_COLOR[d] ?? "#5c6b78" } as React.CSSProperties}>
                  {d}
                </span>
              ))}
            </div>
          ) : (
            <span className={styles.noDevices}>None yet</span>
          )}
        </div>
        {selectedState.note ? <p className={styles.detailNote}>{selectedState.note}</p> : null}
        {selectedState.skippingNextTurn ? <p className={styles.detailNote}>Forfeits their next turn (STOP cell).</p> : null}
      </div>

      <div className={styles.lowerGrid}>
        {/* Win-condition calculations */}
        <div className={styles.modesCard}>
          <h4 className={styles.panelTitle}>Win Condition, By Mode</h4>
          <p className={styles.panelHint}>Same snapshot, scored three different ways.</p>

          <div className={styles.modeBlock}>
            <span className={styles.modeName}>Elimination</span>
            <p className={styles.modeDesc}>
              {elimination.out.length === 0
                ? "Everyone still has credits and a functioning device. Nobody is eliminated yet."
                : `${elimination.out.length} player(s) eliminated so far.`}
            </p>
          </div>

          <div className={styles.modeBlock}>
            <span className={styles.modeName}>Timed Match</span>
            <p className={styles.modeDesc}>Ranked by credits + device points combined, if the timer ran out right now:</p>
            <ol className={styles.standingsList}>
              {standings.map((s, i) => {
                const meta = PLAYERS.find((p) => p.id === s.playerId)!;
                return (
                  <li key={s.playerId} className={i === 0 ? styles.standingsRowLeader : styles.standingsRow}>
                    <span className={styles.standingsRank}>{i + 1}</span>
                    <span className={styles.standingsDot} style={{ background: meta.color }} />
                    <span className={styles.standingsName}>{meta.name}</span>
                    <span className={styles.standingsValue}>{s.value}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className={styles.modeBlock}>
            <span className={styles.modeName}>Target Score ({TARGET_SCORE})</span>
            <p className={styles.modeDesc}>First to {TARGET_SCORE} combined points wins outright. Progress so far:</p>
            <div className={styles.targetBars}>
              {standings.map((s) => {
                const meta = PLAYERS.find((p) => p.id === s.playerId)!;
                const pct = Math.min(100, (s.value / TARGET_SCORE) * 100);
                return (
                  <div key={s.playerId} className={styles.targetRow}>
                    <span className={styles.targetName}>{meta.name}</span>
                    <div className={styles.targetTrack}>
                      <div className={styles.targetFill} style={{ width: `${pct}%`, background: meta.color }} />
                    </div>
                    <span className={styles.targetValue}>{s.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {leader ? (
            <p className={styles.leaderNote}>
              <IconCheck size={13} />
              Right now, {PLAYERS.find((p) => p.id === leader.playerId)?.name} leads on combined score.
            </p>
          ) : null}
        </div>

        {/* Turn history */}
        <div className={styles.historyCard}>
          <h4 className={styles.panelTitle}>Turn History</h4>
          <p className={styles.panelHint}>Every resolved action up to this step.</p>
          <ol className={styles.historyList}>
            {history.map((entry, i) => (
              <li key={i} className={styles.historyItem}>
                {entry}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
