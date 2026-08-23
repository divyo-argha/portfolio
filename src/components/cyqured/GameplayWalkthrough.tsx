"use client";

import { useMemo, useState } from "react";
import {
  PLAYERS,
  WALKTHROUGH_STEPS,
  BOARD_TRACK,
  TURN_BOUNDARIES,
  turnGroupOf,
  rankByTotal,
  eliminationStatus,
  totalScore,
  cardById,
  TARGET_SCORE,
  type PlayerId,
} from "./walkthroughData";
import type { CardFace } from "@/app/publications/cyqured/cardData";
import { CONNECTED_DEVICES } from "./boardData";
import { GameTable } from "./GameTable";
import { DiceRoll } from "./DiceRoll";
import { CombatCard } from "./CombatCard";
import { TurnProgressBar, segmentFor } from "./TurnProgressBar";
import { FlipCard, CATEGORY_COLOR, LazyImg } from "./GameExperience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@/components/primitives/Icons";
import styles from "./GameplayWalkthrough.module.css";

const DEVICE_COLOR: Record<string, string> = Object.fromEntries(CONNECTED_DEVICES.map((d) => [d.name, d.color]));

function CellInfoBox({ cellIndex }: { cellIndex: number }) {
  const cell = BOARD_TRACK[cellIndex];
  return (
    <div className={styles.cellInfoBox}>
      <div className={styles.cellInfoHeader}>
        <span className={styles.cellInfoName}>{cell.name}</span>
        <span className={styles.cellInfoTag}>
          Cell #{cellIndex}
          {cell.points ? ` · ${cell.points} pts` : ""}
        </span>
      </div>
      <p className={styles.cellInfoDesc}>{cell.description}</p>
    </div>
  );
}

function DrawnCardBox({ card }: { card: (typeof WALKTHROUGH_STEPS)[number]["drawnCard"] }) {
  const reducedMotion = useReducedMotion();
  if (!card) return null;
  return (
    <div className={styles.drawnCardBox}>
      <span className={styles.drawnCardLabel}>Card drawn</span>
      <div className={styles.drawnCardFlip} style={{ "--c": CATEGORY_COLOR[card.category] } as React.CSSProperties}>
        <FlipCard card={card} reducedMotion={reducedMotion} />
      </div>
      <p className={styles.flipHint}>Click the card to flip it over.</p>
    </div>
  );
}

/** Just the hovered/focused hand card, blown up to a readable size — the
 * fanned cards render too small to read. Absolutely positioned (anchored to
 * .detailCard, its nearest positioned ancestor) so it overlays the top of
 * the player detail box instead of pushing its layout around, and renders
 * nothing at all when no card is hovered. */
function HandPreview({ card }: { card: CardFace | null }) {
  if (!card) return null;
  return (
    <div className={styles.handPreview} style={{ "--c": CATEGORY_COLOR[card.category] } as React.CSSProperties}>
      <LazyImg src={card.src} alt={card.title} eager />
    </div>
  );
}

/** A player's actual hand, rendered with the same flippable card art used
 * everywhere else (Cards tab, combat, chance/scenario draws), fanned out a
 * bit like cards held in hand. Hovering/focusing a card blows it up in the
 * preview overlay, since the cards themselves are too small to read. */
function HandGrid({ cardIds }: { cardIds: string[] }) {
  const reducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  if (cardIds.length === 0) {
    return <p className={styles.noDevices}>No cards left in hand.</p>;
  }
  const hoveredCard = hoveredIndex !== null ? cardById(cardIds[hoveredIndex]) : null;
  return (
    <>
      <div className={styles.handGrid}>
        {cardIds.map((id, i) => {
          const card = cardById(id);
          // A gentle, deterministic tilt per card (not random) so the hand
          // reads as a loosely fanned stack, each one peeking out from under
          // the last, instead of a rigid grid.
          const rot = ((i % 5) - 2) * 2.4;
          return (
            <div
              key={`${id}-${i}`}
              className={styles.handCardHolder}
              style={{ "--c": CATEGORY_COLOR[card.category], "--i": i, "--rot": `${rot}deg` } as React.CSSProperties}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex((v) => (v === i ? null : v))}
              onFocus={() => setHoveredIndex(i)}
              onBlur={() => setHoveredIndex((v) => (v === i ? null : v))}
            >
              <FlipCard card={card} reducedMotion={reducedMotion} compact />
            </div>
          );
        })}
      </div>
      <HandPreview card={hoveredCard} />
    </>
  );
}

export function GameplayWalkthrough() {
  const [stepIndex, setStepIndex] = useState(0);
  const [manualSelection, setManualSelection] = useState<PlayerId | null>(null);

  const step = WALKTHROUGH_STEPS[stepIndex];
  const isVeryLastStep = stepIndex === WALKTHROUGH_STEPS.length - 1;
  const selectedPlayer = manualSelection ?? step.activePlayer ?? "alice";

  const history = useMemo(
    () => WALKTHROUGH_STEPS.slice(0, stepIndex + 1).flatMap((s) => s.historyEntries),
    [stepIndex],
  );

  const standings = useMemo(() => rankByTotal(step.playerStates), [step.playerStates]);
  const elimination = useMemo(() => eliminationStatus(step.playerStates), [step.playerStates]);
  const leader = standings[0];

  const turnGroup = turnGroupOf(stepIndex);
  const isFirstTurn = turnGroup === 0;
  const isLastTurn = turnGroup === TURN_BOUNDARIES.length - 1 && isVeryLastStep;
  const turnStart = TURN_BOUNDARIES[turnGroup];
  const turnEnd = (TURN_BOUNDARIES[turnGroup + 1] ?? WALKTHROUGH_STEPS.length) - 1;
  const phaseInTurn = stepIndex - turnStart + 1;
  const phasesInTurn = turnEnd - turnStart + 1;
  // Fine nav stays inside the current turn — rolling the die for a new turn
  // is only ever done with the top-level turn navigation.
  const isFirstStep = stepIndex === turnStart;
  const isLastStep = stepIndex === turnEnd;

  const currentSegment = segmentFor(stepIndex);
  const currentSegmentPlayer = currentSegment.player ? PLAYERS.find((p) => p.id === currentSegment.player) : null;

  // Fine navigation: one phase at a time (roll, land, resolve, combat...),
  // constrained to this turn. This is what moves the token: advancing from
  // the roll phase into the land phase is what animates it to its new cell.
  function goNextStep() {
    setStepIndex((i) => Math.min(i + 1, turnEnd));
    setManualSelection(null);
  }
  function goBackStep() {
    setStepIndex((i) => Math.max(i - 1, turnStart));
    setManualSelection(null);
  }

  // Coarse navigation: rolls the die for the next/previous turn, jumping
  // straight to it and skipping every decision/event phase in between.
  function goNextTurn() {
    const g = turnGroupOf(stepIndex);
    setStepIndex(TURN_BOUNDARIES[g + 1] ?? WALKTHROUGH_STEPS.length - 1);
    setManualSelection(null);
  }
  function goBackTurn() {
    const g = turnGroupOf(stepIndex);
    setStepIndex(TURN_BOUNDARIES[Math.max(0, g - 1)]);
    setManualSelection(null);
  }
  function jumpTo(index: number) {
    setStepIndex(index);
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
        {/* Nav bar pinned at the top-left of the simulation box, so it never
            shifts position as narration/combat content below it changes length.
            This is the coarse "turn" navigation: it jumps straight to the next
            or previous die roll, skipping every decision/event phase between them. */}
        <div className={styles.navBar}>
          <span className={styles.navBarLabel}>Turn navigation</span>
          <button type="button" className={styles.navButton} onClick={goBackTurn} disabled={isFirstTurn}>
            <IconArrowLeft size={15} />
            <span>Back</span>
          </button>
          <button type="button" className={styles.navButtonPrimary} onClick={goNextTurn} disabled={isLastTurn}>
            <span>Next</span>
            <IconArrowRight size={15} />
          </button>
          <TurnProgressBar stepIndex={stepIndex} onJump={jumpTo} />
          <span className={styles.stepCounter}>
            {currentSegment.label}
            {currentSegmentPlayer ? ` — ${currentSegmentPlayer.name}` : ""}
          </span>
        </div>

        <div className={styles.stageGrid}>
          <GameTable
            playerStates={step.playerStates}
            activePlayer={step.activePlayer}
            selectedPlayer={selectedPlayer}
            onSelectPlayer={setManualSelection}
            highlightCellIndex={step.highlightCellIndex}
          />

          <div className={styles.narrationCol}>
            <div className={styles.titleRow}>
              <div className={styles.titleRowLeft}>
                <span className={styles.turnLabel}>{step.turnLabel}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              {/* Fine navigation: steps through the decisions/events within
                  this turn one at a time (roll, land, resolve, combat...). */}
              <div className={styles.phaseNav}>
                <button
                  type="button"
                  className={styles.phaseNavButton}
                  onClick={goBackStep}
                  disabled={isFirstStep}
                  aria-label="Previous event"
                >
                  <IconArrowLeft size={13} />
                </button>
                <span className={styles.phaseNavCounter}>
                  {phaseInTurn}/{phasesInTurn}
                </span>
                <button
                  type="button"
                  className={styles.phaseNavButton}
                  onClick={goNextStep}
                  disabled={isLastStep}
                  aria-label="Next event"
                >
                  <IconArrowRight size={13} />
                </button>
              </div>
            </div>

            {step.phase === "roll" && step.roll ? <DiceRoll key={step.id} result={step.roll} /> : null}

            {step.phase === "land" && step.highlightCellIndex !== null ? (
              <CellInfoBox cellIndex={step.highlightCellIndex} />
            ) : null}

            {step.narration.map((p) => (
              <p key={p.slice(0, 24)} className={styles.narrationText}>
                {p}
              </p>
            ))}

            {step.phase === "resolve" && step.drawnCard ? <DrawnCardBox card={step.drawnCard} /> : null}

            {step.phase === "combat" && step.combat ? <CombatCard combat={step.combat} /> : null}
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
                {s.credits} credits · {BOARD_TRACK[s.boardPos].name}
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
            <span className={styles.detailStatValue}>{selectedState.hand.length} cards</span>
          </div>
          <div className={styles.detailStat}>
            <span className={styles.detailStatLabel}>Current stage</span>
            <span className={styles.detailStatValue}>{BOARD_TRACK[selectedState.boardPos].name}</span>
          </div>
        </div>
        <div className={styles.handSection}>
          <span className={styles.detailDevicesLabel}>{selectedPlayerMeta.name}&apos;s hand</span>
          <HandGrid key={selectedPlayer} cardIds={selectedState.hand} />
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
