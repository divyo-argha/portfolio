"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { cardFaces, type CardCategory, type CardDeck, type CardFace } from "@/app/publications/cyqured/cardData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconAttack, IconDefense, IconChance, IconScenario, IconBoard } from "@/components/primitives/Icons";
import styles from "./GameExperience.module.css";

const CATEGORY_COLOR: Record<CardCategory, string> = {
  attack: "var(--cyq-attack)",
  defense: "var(--cyq-defense)",
  chance: "var(--cyq-chance)",
  scenario: "var(--cyq-scenario)",
};

const DECK_COLOR: Record<CardDeck, string> = {
  action: "var(--cyq-attack)",
  chance: "var(--cyq-chance)",
  scenario: "var(--cyq-scenario)",
};

const DECKS: { id: CardDeck; label: string }[] = [
  { id: "action", label: "Action" },
  { id: "chance", label: "Chance" },
  { id: "scenario", label: "Scenario" },
];

const FILTERS: { id: CardCategory | "all"; label: string; Icon?: typeof IconAttack }[] = [
  { id: "all", label: "All" },
  { id: "attack", label: "Attack", Icon: IconAttack },
  { id: "defense", label: "Defense", Icon: IconDefense },
  { id: "chance", label: "Chance", Icon: IconChance },
  { id: "scenario", label: "Scenario", Icon: IconScenario },
];

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

function coverSrcFor(deck: CardDeck) {
  return `/media/publications/cyqured/covers/${deck}.png`;
}

export function GameExperience() {
  const [filter, setFilter] = useState<CardCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? cardFaces : cardFaces.filter((c) => c.category === filter)),
    [filter],
  );
  const selected = selectedId ? cardFaces.find((c) => c.id === selectedId) ?? null : null;

  function openCard(id: string) {
    if (id === selectedId) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
    stageRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <div className={styles.wrap}>
      <div ref={stageRef} className={styles.stageAnchor}>
        <div key={selected?.id ?? "idle"} className={reducedMotion ? undefined : styles.stageSwap}>
          {selected ? (
            <SelectedStage card={selected} onJump={openCard} reducedMotion={reducedMotion} />
          ) : (
            <IdleStage onPick={openCard} />
          )}
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
        {visible.map((card, i) => {
          const isActive = card.id === selectedId;
          return (
            <button
              key={card.id}
              type="button"
              className={isActive ? styles.thumbActive : styles.thumb}
              style={{ "--c": CATEGORY_COLOR[card.category], animationDelay: `${Math.min(i, 24) * 18}ms` } as React.CSSProperties}
              onClick={() => openCard(card.id)}
            >
              <span className={[styles.thumbFlipper, isActive ? styles.thumbFlipped : ""].join(" ")}>
                <span className={styles.thumbFace}>
                  <img src={card.src} alt={card.title} loading="lazy" />
                </span>
                <span className={[styles.thumbFace, styles.thumbFaceBack].join(" ")}>
                  <img src={coverSrcFor(card.deck)} alt="" loading="lazy" />
                </span>
              </span>
              <span className={styles.thumbLabel}>{card.title}</span>
            </button>
          );
        })}
      </div>

      <BoardPanel />
    </div>
  );
}

function IdleStage({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className={styles.idlePanel}>
      <p className={styles.idleHint}>Pick a card below, or start with a deck</p>
      <div className={styles.idleRow}>
        {DECKS.map((deck) => {
          const first = cardFaces.find((c) => c.deck === deck.id);
          if (!first) return null;
          return (
            <button
              key={deck.id}
              type="button"
              className={styles.idleCard}
              style={{ "--c": DECK_COLOR[deck.id] } as React.CSSProperties}
              onClick={() => onPick(first.id)}
            >
              <img src={coverSrcFor(deck.id)} alt={`${deck.label} deck back`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelectedStage({
  card,
  onJump,
  reducedMotion,
}: {
  card: CardFace;
  onJump: (id: string) => void;
  reducedMotion: boolean;
}) {
  const pairs = (card.pairIds ?? []).map((id) => cardFaces.find((c) => c.id === id)).filter((c): c is CardFace => Boolean(c));

  return (
    <div className={styles.stagePanel} style={{ "--c": CATEGORY_COLOR[card.category] } as React.CSSProperties}>
      <FlipCard card={card} reducedMotion={reducedMotion} />

      <div className={styles.detail}>
        <span className={styles.detailBadge}>
          {card.category}
          {card.strideType ? ` · ${card.strideType}` : ""}
        </span>
        <h3 className={styles.detailTitle}>{card.title}</h3>
        <div className={styles.detailBody}>
          {card.body.split("\n\n").map((p) => (
            <p key={p.slice(0, 24)}>{renderInline(p)}</p>
          ))}
        </div>

        {card.targets && card.targets.length > 0 ? (
          <div className={styles.solutions}>
            <span className={styles.solutionsLabel}>Targets</span>
            <div className={styles.solutionChips}>
              {card.targets.map((t) => (
                <span key={t} className={styles.targetChip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {pairs.length > 0 ? (
          <div className={styles.solutions}>
            <span className={styles.solutionsLabel}>{card.category === "attack" ? "Countered by" : "Counters"}</span>
            <div className={styles.solutionChips}>
              {pairs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.solutionChip}
                  style={{ "--c": CATEGORY_COLOR[p.category] } as React.CSSProperties}
                  onClick={() => onJump(p.id)}
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
  );
}

function FlipCard({ card, reducedMotion }: { card: CardFace; reducedMotion: boolean }) {
  const [hovering, setHovering] = useState(false);
  const coverSrc = coverSrcFor(card.deck);
  const showBack = hovering;

  if (reducedMotion) {
    return (
      <div
        className={styles.flipOuterStatic}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img src={showBack ? coverSrc : card.src} alt={showBack ? `${card.title} card back` : card.title} />
      </div>
    );
  }

  return (
    <div className={styles.flipOuter} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
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
