"use client";

import { useEffect } from "react";
import { cardFaces, type CardFace } from "@/app/publications/cyqured/cardData";
import { IconClose } from "@/components/primitives/Icons";
import { CATEGORY_COLOR, LazyImg, renderInline, compareGroupOf, type CompareGroup } from "./GameExperience";
import styles from "./CompareModal.module.css";

const GROUP_LABEL: Record<CompareGroup, string> = {
  combat: "Attack & Defense",
  chance: "Chance",
  scenario: "Scenario",
};

/** For a defense card, the STRIDE categories it mitigates — derived from the
 * attack cards it counters, since defense cards carry no strideType of their own. */
function counteredStrideTypes(card: CardFace): string[] {
  if (card.category !== "defense") return [];
  const attacks = (card.pairIds ?? [])
    .map((id) => cardFaces.find((c) => c.id === id))
    .filter((c): c is CardFace => Boolean(c && c.strideType));
  return Array.from(new Set(attacks.map((c) => c.strideType as string)));
}

function pairedCards(card: CardFace): CardFace[] {
  return (card.pairIds ?? [])
    .map((id) => cardFaces.find((c) => c.id === id))
    .filter((c): c is CardFace => Boolean(c));
}

export function CompareModal({
  cards,
  onClose,
  onRemove,
}: {
  cards: CardFace[];
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  const group = compareGroupOf(cards[0].category);
  const isCombat = group === "combat";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Compare cards">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Compare {GROUP_LABEL[group]} Cards</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close comparison">
            <IconClose size={18} />
          </button>
        </div>

        <div className={styles.tableScroll}>
          <div
            className={styles.table}
            style={{ gridTemplateColumns: `150px repeat(${cards.length}, minmax(200px, 1fr))` }}
          >
            {/* Header row: art, category, title, remove */}
            <div className={styles.rowLabel} aria-hidden="true" />
            {cards.map((card) => (
              <div
                key={card.id}
                className={styles.cardCol}
                style={{ "--c": CATEGORY_COLOR[card.category] } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => onRemove(card.id)}
                  aria-label={`Remove ${card.title} from comparison`}
                >
                  <IconClose size={12} />
                </button>
                <div className={styles.cardArt}>
                  <LazyImg src={card.src} alt={card.title} eager />
                </div>
                <span className={styles.cardBadge}>{card.category}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                {card.category === "scenario" || card.category === "chance" ? (
                  <span className={styles.cardSubId}>#{card.id.split("-")[1]}</span>
                ) : null}
              </div>
            ))}

            {isCombat ? (
              <>
                {/* STRIDE type (attack only) */}
                <div className={styles.rowLabel}>STRIDE Type</div>
                {cards.map((card) => (
                  <div key={card.id} className={styles.cell}>
                    {card.strideType ?? <span className={styles.cellEmpty}>—</span>}
                  </div>
                ))}

                {/* Devices targeted (attack only) */}
                <div className={styles.rowLabel}>Devices Targeted</div>
                {cards.map((card) => (
                  <div key={card.id} className={styles.cell}>
                    {card.targets && card.targets.length > 0 ? (
                      <div className={styles.chipList}>
                        {card.targets.map((t) => (
                          <span key={t} className={styles.chip}>
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.cellEmpty}>—</span>
                    )}
                  </div>
                ))}

                {/* STRIDE coverage (defense only, derived from countered attacks) */}
                <div className={styles.rowLabel}>Mitigates STRIDE</div>
                {cards.map((card) => {
                  const stride = counteredStrideTypes(card);
                  return (
                    <div key={card.id} className={styles.cell}>
                      {stride.length > 0 ? (
                        <div className={styles.chipList}>
                          {stride.map((s) => (
                            <span key={s} className={styles.chip}>
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={styles.cellEmpty}>—</span>
                      )}
                    </div>
                  );
                })}

                {/* Paired cards on the opposite side of the deck */}
                <div className={styles.rowLabel}>Paired Cards</div>
                {cards.map((card) => {
                  const pairs = pairedCards(card);
                  return (
                    <div key={card.id} className={styles.cell}>
                      {pairs.length > 0 ? (
                        <div className={styles.chipList}>
                          {pairs.map((p) => (
                            <span
                              key={p.id}
                              className={styles.chip}
                              style={{ "--c": CATEGORY_COLOR[p.category] } as React.CSSProperties}
                            >
                              {p.title}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={styles.cellEmpty}>—</span>
                      )}
                    </div>
                  );
                })}
              </>
            ) : null}

            {/* Full description */}
            <div className={styles.rowLabel}>Description</div>
            {cards.map((card) => (
              <div key={card.id} className={[styles.cell, styles.cellBody].join(" ")}>
                {card.body.split("\n\n").map((p) => (
                  <p key={p.slice(0, 24)}>{renderInline(p)}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
