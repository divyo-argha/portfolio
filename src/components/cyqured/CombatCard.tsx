"use client";

import type { CardFace } from "@/app/publications/cyqured/cardData";
import { FlipCard, CATEGORY_COLOR } from "./GameExperience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PLAYERS, type CombatInfo, type PlayerId } from "./walkthroughData";
import styles from "./CombatCard.module.css";

const OUTCOME_LABEL: Record<CombatInfo["outcome"], string> = {
  defended: "Defended — attack blocked",
  "attack-succeeds": "Attack succeeds",
  "critical-transfer": "Attack succeeds — ownership transfers",
  "immunity-block": "Auto-blocked by Color-Group Immunity",
};

function nameOf(id: PlayerId): string {
  return PLAYERS.find((p) => p.id === id)!.name;
}

function CardSlot({ card, label, reducedMotion }: { card: CardFace | null; label: string; reducedMotion: boolean }) {
  return (
    <div className={styles.side}>
      <span className={styles.sideLabel}>{label}</span>
      {card ? (
        <div className={styles.flipHolder} style={{ "--c": CATEGORY_COLOR[card.category] } as React.CSSProperties}>
          <FlipCard card={card} reducedMotion={reducedMotion} />
        </div>
      ) : (
        <div className={styles.cardArtEmpty}>No matching card in hand</div>
      )}
      {card ? (
        <>
          <span className={styles.cardName}>{card.title}</span>
          {card.strideType ? <span className={styles.cardStride}>{card.strideType}</span> : null}
        </>
      ) : null}
    </div>
  );
}

function pointsClass(n: number): string {
  if (n > 0) return styles.pointsPositive;
  if (n < 0) return styles.pointsNegative;
  return styles.pointsNeutral;
}

function fmtDelta(n: number): string {
  if (n > 0) return `+${n}`;
  return `${n}`;
}

export function CombatCard({ combat }: { combat: CombatInfo }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={styles.combatWrap}>
      <div className={styles.duel}>
        <CardSlot card={combat.attackCard} label={`${nameOf(combat.attacker)} attacks with`} reducedMotion={reducedMotion} />
        <span className={styles.vsBadge}>VS</span>
        <CardSlot card={combat.defenseCard} label={`${nameOf(combat.defender)} defends with`} reducedMotion={reducedMotion} />
      </div>
      <p className={styles.flipHint}>Click a card to flip it over.</p>

      <div className={styles.resolutionBox} data-outcome={combat.outcome}>
        <span className={styles.resolutionLabel}>{OUTCOME_LABEL[combat.outcome]}</span>
        <div className={styles.resolutionRow}>
          <span>
            Target: <strong>{combat.deviceName}</strong>
          </span>
          <span>
            {nameOf(combat.attacker)}:{" "}
            <span className={pointsClass(combat.pointsDelta.attacker)}>{fmtDelta(combat.pointsDelta.attacker)} pts</span>
          </span>
          <span>
            {nameOf(combat.defender)}:{" "}
            <span className={pointsClass(combat.pointsDelta.defender)}>{fmtDelta(combat.pointsDelta.defender)} pts</span>
          </span>
          {combat.deviceTransferred ? (
            <span>
              Ownership: <strong>transfers to {nameOf(combat.attacker)}</strong>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
