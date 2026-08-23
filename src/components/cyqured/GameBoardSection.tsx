"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CardFace } from "@/app/publications/cyqured/cardData";
import {
  CONNECTED_DEVICES,
  SPECIAL_CELLS,
  UNIVERSAL_ATTACKS,
  attacksOn,
  groupSize,
} from "./boardData";
import { IconChevronDown } from "@/components/primitives/Icons";
import styles from "./GameBoardSection.module.css";

const CARDS_HREF = "/publications/cyqured/game/assets";

function cardHref(id: string): string {
  return `${CARDS_HREF}?tab=cards&category=attack&card=${id}`;
}

/** One linked attack card chip. Every chip resolves to that card's face and
 * full description in the Game Cards tab. */
function AttackChip({ card, muted }: { card: CardFace; muted?: boolean }) {
  return (
    <Link
      href={cardHref(card.id)}
      className={[styles.attackChip, muted ? styles.attackChipMuted : ""].join(" ")}
    >
      <span className={styles.attackChipName}>{card.title}</span>
      {card.strideType && <span className={styles.attackChipStride}>{card.strideType}</span>}
    </Link>
  );
}

function CellAccordion({
  id,
  open,
  onToggle,
  accent,
  kicker,
  name,
  badge,
  children,
}: {
  id: string;
  open: boolean;
  onToggle: (id: string) => void;
  accent: string;
  kicker: string;
  name: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[styles.cell, open ? styles.cellOpen : ""].join(" ")}
      style={{ "--dev-color": accent } as React.CSSProperties}
    >
      <h4 className={styles.cellHeading}>
        <button
          type="button"
          className={styles.cellTrigger}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          onClick={() => onToggle(id)}
        >
          <span className={styles.cellTitleGroup}>
            <span className={styles.cellKicker}>{kicker}</span>
            <span className={styles.cellName}>{name}</span>
          </span>
          <span className={styles.cellTriggerRight}>
            {badge && <span className={styles.cellBadge}>{badge}</span>}
            <span className={styles.chevron} aria-hidden="true">
              <IconChevronDown size={16} />
            </span>
          </span>
        </button>
      </h4>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={styles.cellPanel}
        hidden={!open}
      >
        <div className={styles.cellPanelInner}>{children}</div>
      </div>
    </div>
  );
}

export function GameBoardSection() {
  // A set, not a single index: every cell opens and closes on its own and
  // leaves its neighbours exactly as they were.
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <section id="board" className={styles.section} aria-label="Game Board and Connected Devices">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Physical Track & Assets</span>
        <h2 className={styles.title}>The Board & Devices</h2>
        <p className={styles.subtitle}>
          A 28-cell circuit modeling the perimeter of an interconnected smart home: 12 special cells and 16 acquirable devices.
        </p>
      </div>

      {/* Board High-Res Visual */}
      <div className={styles.boardContainer}>
        <div className={styles.boardImgWrap}>
          <Image
            src="/media/publications/cyqured/board.webp"
            alt="The CyQured physical board layout modeling connected home devices"
            width={1403}
            height={1800}
            className={styles.boardImg}
            loading="lazy"
          />
        </div>
      </div>

      <h3 className={styles.subheading}>Every cell on the track</h3>
      <p className={styles.listHint}>
        Open a cell for what it does, and — for devices — every attack card that can be played on it. Cells open independently.
      </p>

      <div className={styles.cellGrid}>
        {/* Special cells first, holding the top of the list */}
        {SPECIAL_CELLS.map((cell) => {
          const id = `special-${cell.name.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <CellAccordion
              key={cell.name}
              id={id}
              open={openIds.has(id)}
              onToggle={toggle}
              accent="#5ee1f2"
              kicker="Special cell"
              name={cell.name}
              badge={cell.count > 1 ? `×${cell.count}` : undefined}
            >
              <p className={styles.panelText}>{cell.desc}</p>
              <p className={styles.panelMeta}>
                {cell.count > 1
                  ? `${cell.count} of these cells sit on the 28-cell track.`
                  : "One of these sits on the 28-cell track."}{" "}
                No device is owned here, so no attack card is played on it.
              </p>
            </CellAccordion>
          );
        })}

        {/* Device cells */}
        {CONNECTED_DEVICES.map((dev) => {
          const id = `device-${dev.name.replace(/\W+/g, "-").toLowerCase()}`;
          const named = attacksOn(dev.name);
          const groupCount = groupSize(dev.category);
          return (
            <CellAccordion
              key={dev.name}
              id={id}
              open={openIds.has(id)}
              onToggle={toggle}
              accent={dev.color}
              kicker={dev.category}
              name={dev.name}
              badge={`${dev.points} PTS`}
            >
              <p className={styles.panelText}>{dev.blurb}</p>

              <ul className={styles.ruleList}>
                <li>
                  Unowned: pay <strong>{dev.points} credits</strong> to claim it. Owned by someone else: pay half its
                  value to pass, or attack for it.
                </li>
                <li>
                  Part of the <strong>{dev.category}</strong> color group ({groupCount} device
                  {groupCount === 1 ? "" : "s"}) — hold the whole group and Color-Group Immunity blocks attacks on all
                  of them.
                </li>
                {dev.critical && (
                  <li className={styles.ruleCritical}>
                    Critical infrastructure: one failed defense transfers ownership immediately, with no second round.
                  </li>
                )}
              </ul>

              <div className={styles.attackBlock}>
                <span className={styles.attackLabel}>
                  Attack cards naming this device
                  <span className={styles.attackCount}>{named.length}</span>
                </span>
                {named.length > 0 ? (
                  <div className={styles.attackChips}>
                    {named.map((card) => (
                      <AttackChip key={card.id} card={card} />
                    ))}
                  </div>
                ) : (
                  <p className={styles.panelMeta}>
                    No attack card singles this device out — it is reachable only through the board-wide attacks below.
                  </p>
                )}
              </div>

              <div className={styles.attackBlock}>
                <span className={styles.attackLabel}>
                  Board-wide attacks that also hit it
                  <span className={styles.attackCount}>{UNIVERSAL_ATTACKS.length}</span>
                </span>
                <div className={styles.attackChips}>
                  {UNIVERSAL_ATTACKS.map((card) => (
                    <AttackChip key={card.id} card={card} muted />
                  ))}
                </div>
              </div>
            </CellAccordion>
          );
        })}
      </div>
    </section>
  );
}
