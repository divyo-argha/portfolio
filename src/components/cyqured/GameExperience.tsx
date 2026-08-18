"use client";

import { useMemo, useRef, useState } from "react";
import { cardFaces, type CardCategory, type CardFace } from "@/app/publications/cyqured/cardData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconAttack, IconDefense, IconChance, IconScenario, IconBoard } from "@/components/primitives/Icons";
import styles from "./GameExperience.module.css";

const CATEGORY_COLOR: Record<CardCategory, string> = {
  attack: "var(--cyq-attack)",
  defense: "var(--cyq-defense)",
  chance: "var(--cyq-chance)",
  scenario: "var(--cyq-scenario)",
};

const FILTERS: { id: CardCategory | "all"; label: string; Icon?: typeof IconAttack }[] = [
  { id: "all", label: "All" },
  { id: "attack", label: "Attack", Icon: IconAttack },
  { id: "defense", label: "Defense", Icon: IconDefense },
  { id: "chance", label: "Chance", Icon: IconChance },
  { id: "scenario", label: "Scenario", Icon: IconScenario },
];

export function GameExperience() {
  const [filter, setFilter] = useState<CardCategory | "all">("all");
  const [selectedId, setSelectedId] = useState(cardFaces[0]?.id ?? "");
  const [locked, setLocked] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? cardFaces : cardFaces.filter((c) => c.category === filter)),
    [filter],
  );
  const selected = cardFaces.find((c) => c.id === selectedId) ?? cardFaces[0];

  function openCard(id: string) {
    setSelectedId(id);
    setLocked(false);
    stageRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  if (!selected) return null;

  const pairs = (selected.pairIds ?? [])
    .map((id) => cardFaces.find((c) => c.id === id))
    .filter((c): c is CardFace => Boolean(c));

  return (
    <div className={styles.wrap}>
      <div ref={stageRef} className={styles.stageAnchor}>
        <div className={styles.stagePanel} style={{ "--c": CATEGORY_COLOR[selected.category] } as React.CSSProperties}>
          <FlipCard card={selected} locked={locked} onToggle={() => setLocked((v) => !v)} reducedMotion={reducedMotion} />

          <div className={styles.detail}>
            <span className={styles.detailBadge}>
              {selected.category}
              {selected.strideType ? ` · ${selected.strideType}` : ""}
            </span>
            <h3 className={styles.detailTitle}>{selected.title}</h3>
            <div className={styles.detailBody}>
              {selected.body.split("\n\n").map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {pairs.length > 0 ? (
              <div className={styles.solutions}>
                <span className={styles.solutionsLabel}>
                  {selected.category === "attack" ? "Countered by" : "Counters"}
                </span>
                <div className={styles.solutionChips}>
                  {pairs.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={styles.solutionChip}
                      style={{ "--c": CATEGORY_COLOR[p.category] } as React.CSSProperties}
                      onClick={() => openCard(p.id)}
                    >
                      <img src={p.src} alt="" />
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.filterBar} role="tablist" aria-label="Filter cards">
        {FILTERS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={filter === id ? styles.filterActive : styles.filter}
            style={id !== "all" ? ({ "--f": CATEGORY_COLOR[id as CardCategory] } as React.CSSProperties) : undefined}
            onClick={() => setFilter(id)}
          >
            {Icon ? <Icon size={14} /> : null}
            {label}
            <span className={styles.count}>{id === "all" ? cardFaces.length : cardFaces.filter((c) => c.category === id).length}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((card, i) => (
          <button
            key={card.id}
            type="button"
            className={card.id === selectedId ? styles.thumbActive : styles.thumb}
            style={{ "--c": CATEGORY_COLOR[card.category], animationDelay: `${Math.min(i, 24) * 18}ms` } as React.CSSProperties}
            onClick={() => openCard(card.id)}
          >
            <img src={card.src} alt={card.title} loading="lazy" />
            <span className={styles.thumbLabel}>{card.title}</span>
          </button>
        ))}
      </div>

      <BoardPanel />
    </div>
  );
}

function FlipCard({
  card,
  locked,
  onToggle,
  reducedMotion,
}: {
  card: CardFace;
  locked: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  const coverSrc = `/media/publications/cyqured/covers/${card.deck}.png`;
  const showBack = locked || hovering;

  if (reducedMotion) {
    return (
      <button type="button" className={styles.flipOuterStatic} onClick={onToggle}>
        <img src={showBack ? coverSrc : card.src} alt={showBack ? `${card.title} card back` : card.title} />
      </button>
    );
  }

  return (
    <div
      className={styles.flipOuter}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onToggle}
      role="button"
      tabIndex={0}
    >
      <div className={[styles.flipInner, showBack ? styles.flipped : ""].join(" ")}>
        <div className={styles.face}>
          <img src={card.src} alt={card.title} />
        </div>
        <div className={[styles.face, styles.faceBack].join(" ")}>
          <img src={coverSrc} alt="" />
        </div>
      </div>
    </div>
  );
}

function BoardPanel() {
  return (
    <div className={styles.boardPanel}>
      <div className={styles.boardHeading}>
        <IconBoard size={20} />
        <span>The board</span>
      </div>
      <img
        className={styles.boardImage}
        src="/media/publications/cyqured/board.png"
        alt="The CyQured board: a 28-cell track of 16 devices, special cells, and three card decks at the center."
      />
    </div>
  );
}
