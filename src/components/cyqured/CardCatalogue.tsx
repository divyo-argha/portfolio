"use client";

import { useMemo, useState } from "react";
import { cardFaces, type CardCategory, type CardFace } from "@/app/publications/cyqured/cardData";
import { IconAttack, IconDefense, IconChance, IconScenario, IconClose } from "@/components/primitives/Icons";
import styles from "./CardCatalogue.module.css";

const FILTERS: { id: CardCategory | "all"; label: string; icon?: (p: { size?: number }) => React.ReactNode }[] = [
  { id: "all", label: "All cards" },
  { id: "attack", label: "Attack", icon: (p) => <IconAttack {...p} /> },
  { id: "defense", label: "Defense", icon: (p) => <IconDefense {...p} /> },
  { id: "chance", label: "Chance", icon: (p) => <IconChance {...p} /> },
  { id: "scenario", label: "Scenario", icon: (p) => <IconScenario {...p} /> },
];

const CATEGORY_VAR: Record<CardCategory, string> = {
  attack: "var(--cyq-attack)",
  defense: "var(--cyq-defense)",
  chance: "var(--cyq-chance)",
  scenario: "var(--cyq-scenario)",
};

export function CardCatalogue() {
  const [filter, setFilter] = useState<CardCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? cardFaces : cardFaces.filter((c) => c.category === filter)),
    [filter],
  );

  const selected = cardFaces.find((c) => c.id === selectedId) ?? null;

  return (
    <div className={styles.wrap}>
      <div className={styles.filterBar} role="tablist" aria-label="Filter cards by category">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={filter === f.id ? styles.filterActive : styles.filter}
            style={f.id !== "all" ? ({ "--filter-color": CATEGORY_VAR[f.id as CardCategory] } as React.CSSProperties) : undefined}
            onClick={() => setFilter(f.id)}
          >
            {f.icon ? f.icon({ size: 15 }) : null}
            {f.label}
            <span className={styles.filterCount}>
              {f.id === "all" ? cardFaces.length : cardFaces.filter((c) => c.category === f.id).length}
            </span>
          </button>
        ))}
      </div>

      {cardFaces.length === 0 ? (
        <p className={styles.pending}>Card text is still being transcribed from the source art — check back shortly.</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((card) => (
            <button
              key={card.id}
              type="button"
              className={styles.thumb}
              style={{ "--card-color": CATEGORY_VAR[card.category] } as React.CSSProperties}
              onClick={() => setSelectedId(card.id)}
            >
              <img src={card.src} alt={card.title} loading="lazy" />
              <span className={styles.thumbTitle}>{card.title}</span>
            </button>
          ))}
        </div>
      )}

      {selected ? <CardDetail card={selected} onClose={() => setSelectedId(null)} onJump={setSelectedId} /> : null}

      <BoardSection />
    </div>
  );
}

function CardDetail({
  card,
  onClose,
  onJump,
}: {
  card: CardFace;
  onClose: () => void;
  onJump: (id: string) => void;
}) {
  const pairs = (card.pairIds ?? [])
    .map((id) => cardFaces.find((c) => c.id === id))
    .filter((c): c is CardFace => Boolean(c));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
          <IconClose size={20} />
        </button>
        <div className={styles.panelImage}>
          <img src={card.src} alt={card.title} />
        </div>
        <div className={styles.panelBody}>
          <span className={styles.panelBadge} style={{ "--card-color": CATEGORY_VAR[card.category] } as React.CSSProperties}>
            {card.category}
            {card.strideType ? ` · ${card.strideType}` : ""}
          </span>
          <h4 className={styles.panelTitle}>{card.title}</h4>
          {card.body.split("\n\n").map((p) => (
            <p key={p.slice(0, 30)} className={styles.panelText}>
              {p}
            </p>
          ))}
          {pairs.length > 0 ? (
            <div className={styles.pairRow}>
              <span className={styles.pairLabel}>
                {card.category === "attack" ? "Countered by" : "Counters"}
              </span>
              {pairs.map((p) => (
                <button key={p.id} type="button" className={styles.pairChip} onClick={() => onJump(p.id)}>
                  {p.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const BOARD_GROUPS: { label: string; note: string }[] = [
  { label: "GO", note: "Grants points and action cards each completed lap." },
  { label: "Color groups", note: "Own every device in a group for immunity and increased point gains." },
  { label: "Router · Home Server", note: "Highest-value cells — a single failed defense can lose them." },
  { label: "Chance / Scenario", note: "Draw a chance card, or name the STRIDE category behind a scenario." },
  { label: "STOP", note: "Skip a turn." },
  { label: "Power Outage / Card Penalty", note: "Deactivate assets, or discard from hand." },
];

function BoardSection() {
  return (
    <div className={styles.boardSection}>
      <div className={styles.boardImageWrap}>
        <img src="/media/publications/cyqured/board.png" alt="The CyQured game board: a 28-cell cyclic track of 16 devices, special cells, and three card decks in the center." />
      </div>
      <dl className={styles.boardLegend}>
        {BOARD_GROUPS.map((g) => (
          <div key={g.label} className={styles.boardLegendItem}>
            <dt>{g.label}</dt>
            <dd>{g.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
