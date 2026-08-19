"use client";

import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cardFaces, type CardCategory, type CardDeck, type CardFace } from "@/app/publications/cyqured/cardData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconAttack, IconDefense, IconChance, IconScenario } from "@/components/primitives/Icons";
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

// Board device values: color group + point value, read directly off the board art.
const DEVICE_INFO: Record<string, { points: number; color: string }> = {
  "Smart Utility Meter": { points: 8, color: "#e5493c" },
  "Smart Thermostat": { points: 6, color: "#e5493c" },
  "Smart Door-lock": { points: 10, color: "#2f6fe0" },
  "IP Camera": { points: 10, color: "#2f6fe0" },
  "Smart Speaker": { points: 10, color: "#e14fa0" },
  "Smart TV": { points: 10, color: "#e14fa0" },
  "Smart Printer": { points: 8, color: "#3fa65a" },
  "Smart Fridge": { points: 6, color: "#3fa65a" },
  Laptop: { points: 16, color: "#9b5fd1" },
  Desktop: { points: 14, color: "#9b5fd1" },
  "Gaming Console": { points: 10, color: "#c67a35" },
  Smartphone: { points: 16, color: "#c67a35" },
  "Smart Wearables": { points: 10, color: "#c67a35" },
  Tablet: { points: 12, color: "#c67a35" },
  "Wireless Router": { points: 18, color: "#7c8a93" },
  "Home Server": { points: 20, color: "#7c8a93" },
};

const FILTERS: { id: CardCategory; label: string; Icon: typeof IconAttack }[] = [
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
  // .webp: the source .png covers are ~650KB each (busy gradient art
  // compresses poorly as PNG) and this face loads eagerly for every
  // card back plus the idle deck picker; re-encoding cut that by ~90%
  // with no visible loss.
  return `/media/publications/cyqured/covers/${deck}.webp`;
}

// Shimmers behind every card image until it finishes loading, then
// crossfades in: the "skeleton" for individual card art.
//
// fill, not width/height: every caller places this inside a box that's
// already sized by CSS (the flip faces, thumb faces, idle deck cards, board
// frame all reach LazyImg through a position:relative/absolute ancestor with
// a definite aspect-ratio), and card art comes from many source files of
// varying exact pixel dimensions: fill sizes to that box directly instead of
// needing each one's real intrinsic size.
function LazyImg({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached/instant image can finish loading before hydration attaches
  // onLoad below, so the event never fires: catch that case explicitly.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <span className={[styles.imgShell, loaded ? styles.imgShellLoaded : ""].join(" ")}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 960px) 210px, (min-width: 640px) 20vw, 30vw"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}

export function GameExperience() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const categoryParam = searchParams.get("category");
  const cardParam = searchParams.get("card");

  // Determine currently selected card from URL query param
  const selected = useMemo(
    () => (cardParam ? cardFaces.find((c) => c.id === cardParam) ?? null : null),
    [cardParam],
  );

  // Active category: If card is selected, use card's category; otherwise read ?category or default to "attack"
  const filter: CardCategory = useMemo(() => {
    if (selected) return selected.category;
    if (
      categoryParam === "attack" ||
      categoryParam === "defense" ||
      categoryParam === "chance" ||
      categoryParam === "scenario"
    ) {
      return categoryParam;
    }
    return "attack";
  }, [selected, categoryParam]);

  const updateUrl = useCallback(
    (nextCategory: CardCategory, nextCardId: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "cards");
      params.set("category", nextCategory);
      if (nextCardId) {
        params.set("card", nextCardId);
      } else {
        params.delete("card");
      }
      const qs = params.toString();
      router.replace(`${pathname}?${qs}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const visible = useMemo(
    () => cardFaces.filter((c) => c.category === filter),
    [filter],
  );

  function handleCategoryChange(cat: CardCategory) {
    updateUrl(cat, null);
  }

  function openCard(id: string) {
    if (id === selected?.id) {
      // Toggle off / close card
      updateUrl(filter, null);
      return;
    }

    const target = cardFaces.find((c) => c.id === id);
    if (target) {
      updateUrl(target.category, target.id);
    }

    if (typeof window !== "undefined" && window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  }

  return (
    <div className={styles.wrap}>
      <div ref={stageRef} className={styles.stageAnchor}>
        <div
          className={styles.stageFrame}
          style={{ "--c": selected ? CATEGORY_COLOR[selected.category] : "#5ee1f2" } as React.CSSProperties}
        >
          <div key={selected?.id ?? "idle"} className={reducedMotion ? undefined : styles.stageSwap}>
            {selected ? (
              <SelectedStage card={selected} onJump={openCard} reducedMotion={reducedMotion} />
            ) : (
              <IdleStage onPick={openCard} />
            )}
          </div>
        </div>
      </div>

      <div className={styles.filterBar} role="tablist" aria-label="Filter cards by category">
        {FILTERS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={filter === id ? styles.filterActive : styles.filter}
            style={{ "--f": CATEGORY_COLOR[id] } as React.CSSProperties}
            onClick={() => handleCategoryChange(id)}
          >
            <Icon size={14} />
            {label}
            <span className={styles.count}>{cardFaces.filter((c) => c.category === id).length}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((card, i) => {
          const isActive = card.id === selected?.id;
          return (
            <button
              key={card.id}
              type="button"
              className={isActive ? styles.thumbActive : styles.thumb}
              style={
                {
                  "--c": CATEGORY_COLOR[card.category],
                  animationDelay: `${Math.min(i, 24) * 18}ms`,
                } as React.CSSProperties
              }
              onClick={() => openCard(card.id)}
            >
              <span className={[styles.thumbFlipper, isActive ? styles.thumbFlipped : ""].join(" ")}>
                <span className={styles.thumbFace}>
                  <LazyImg src={card.src} alt={card.title} />
                </span>
                <span className={[styles.thumbFace, styles.thumbFaceBack].join(" ")}>
                  <LazyImg src={coverSrcFor(card.deck)} alt="" />
                </span>
              </span>
              <span className={styles.thumbLabel}>{card.title}</span>
            </button>
          );
        })}
      </div>
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
              <span className={styles.idleCardClip}>
                <LazyImg src={coverSrcFor(deck.id)} alt={`${deck.label} deck back`} eager />
              </span>
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
              {card.targets.map((t) => {
                const info = DEVICE_INFO[t];
                return (
                  <span
                    key={t}
                    className={styles.targetChip}
                    style={info ? ({ "--dot": info.color } as React.CSSProperties) : undefined}
                  >
                    {info ? <span className={styles.targetDot} /> : null}
                    {t}
                    {info ? <span className={styles.targetPoints}>{info.points}</span> : null}
                  </span>
                );
              })}
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
                  {/* Fixed 22x30 chip icon, not fill: no positioned box to
                      size to here, just a small inline decoration. 782x1110
                      matches the source card art's own aspect ratio; the
                      rendered size comes from .solutionChip img in CSS. */}
                  <Image src={p.src} alt="" width={782} height={1110} />
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
        <LazyImg src={showBack ? coverSrc : card.src} alt={showBack ? `${card.title} card back` : card.title} eager />
      </div>
    );
  }

  return (
    <div className={styles.flipOuter} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className={[styles.flipInner, showBack ? styles.flipped : ""].join(" ")}>
        <div className={styles.face}>
          <LazyImg src={card.src} alt={card.title} eager />
        </div>
        <div className={[styles.face, styles.faceBack].join(" ")}>
          <LazyImg src={coverSrc} alt="" eager />
        </div>
      </div>
    </div>
  );
}
