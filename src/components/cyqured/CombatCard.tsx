"use client";

import { LazyImg } from "./GameExperience";
import { PLAYERS, type CardRef, type CombatInfo, type PlayerId } from "./walkthroughData";
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

function CardFace({ card, label }: { card: CardRef | null; label: string }) {
  return (
    <div className={styles.side}>
      <span className={styles.sideLabel}>{label}</span>
      {card ? (
        <>
          <div className={styles.cardArt}>
            <LazyImg src={card.src} alt={card.title} eager />
          </div>
          <span className={styles.cardName}>{card.title}</span>
          {card.strideType ? <span className={styles.cardStride}>{card.strideType}</span> : null}
        </>
      ) : (
        <div className={styles.cardArtEmpty}>No matching card in hand</div>
      )}
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
  return (
    <div className={styles.combatWrap}>
      <div className={styles.duel}>
        <CardFace card={combat.attackCard} label={`${nameOf(combat.attacker)} attacks with`} />
        <span className={styles.vsBadge}>VS</span>
        <CardFace card={combat.defenseCard} label={`${nameOf(combat.defender)} defends with`} />
      </div>

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
