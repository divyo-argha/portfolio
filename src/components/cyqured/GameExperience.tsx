"use client";

import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cardFaces, type CardCategory, type CardDeck, type CardFace } from "@/app/publications/cyqured/cardData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  IconAttack,
  IconDefense,
  IconChance,
  IconScenario,
  IconSearch,
  IconClose,
  IconArrowUpRight,
} from "@/components/primitives/Icons";
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

const DEVICE_INFO: Record<string, { points: number; color: string }> = {
  "Smart Utility Meter": { points: 8, color: "#e5493c" },
  "Smart Thermostat": { points: 6, color: "#e5493c" },
  "Smart Door-lock": { points: 10, color: "#2f6fe0" },
  "IP Camera": { points: 10, color: "#2f6fe0" },
  "Smart Speaker": { points: 10, color: "#e14fa0" },
  "Smart Light Bulb": { points: 4, color: "#e14fa0" },
  "Smart Plug": { points: 4, color: "#e14fa0" },
  "Smart TV": { points: 12, color: "#1fa980" },
  "Streaming Box": { points: 8, color: "#1fa980" },
  Laptop: { points: 14, color: "#9b5fd1" },
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
  return `/media/publications/cyqured/covers/${deck}.webp`;
}

function LazyImg({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <span className={[styles.lazyWrap, loaded ? styles.lazyLoaded : ""].join(" ")}>
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

/**
 * Smooth, luxurious programmatic scrolling with easeInOutCubic easing.
 * Eliminates snappy browser defaults and produces a silky, deliberate camera glide.
 */
function smoothScrollTo(targetY: number, duration = 850) {
  if (typeof window === "undefined") return;

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 4) return;

  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function animationStep(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animationStep);
    }
  }

  requestAnimationFrame(animationStep);
}

export function GameExperience() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const categoryParam = searchParams.get("category");
  const cardParam = searchParams.get("card");
  const qParam = searchParams.get("q") || "";

  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(qParam));
  const [searchQuery, setSearchQuery] = useState(qParam);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateUrl = useCallback(
    (newFilter: CardCategory, newCardId: string | null, newSearch: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "cards");

      if (newSearch.trim()) {
        params.set("q", newSearch.trim());
      } else {
        params.delete("q");
      }

      params.set("category", newFilter);

      if (newCardId) {
        params.set("card", newCardId);
      } else {
        params.delete("card");
      }

      const qs = params.toString();
      const nextUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setShowSuggestions(false);
    updateUrl(filter, selected?.id ?? null, "");
  }, [filter, selected?.id, updateUrl]);

  const closeCard = useCallback(() => {
    updateUrl(filter, null, searchQuery);

    if (gridRef.current) {
      setTimeout(() => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const navbarOffset = 96;
        const targetY = Math.max(0, window.scrollY + rect.top - navbarOffset);

        if (reducedMotion) {
          window.scrollTo({ top: targetY, behavior: "auto" });
          return;
        }

        smoothScrollTo(targetY, 850);
      }, 100);
    }
  }, [filter, searchQuery, updateUrl, reducedMotion]);

  // Keyboard shortcut: Escape closes search or selected card
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          handleCloseSearch();
        } else if (selected) {
          closeCard();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, selected, handleCloseSearch, closeCard]);

  // Real-time search matching strictly across card names (title) and card contents (body & targets)
  // Excludes card types/categories so category names do not match every card of that type
  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return cardFaces.filter((card) => {
      const matchTitle = card.title.toLowerCase().includes(q);
      const matchBody = card.body.toLowerCase().includes(q);
      const matchTargets = card.targets?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchBody || matchTargets;
    });
  }, [searchQuery]);

  const isSearching = isSearchOpen && searchQuery.trim().length > 0;

  // Grid items: If search query is non-empty, display all matching cards; otherwise display filtered category
  const visible = useMemo(() => {
    if (isSearching) {
      return searchMatches;
    }
    return cardFaces.filter((c) => c.category === filter);
  }, [isSearching, searchMatches, filter]);

  function handleCategoryChange(cat: CardCategory) {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery("");
      setShowSuggestions(false);
    }
    updateUrl(cat, null, "");
  }

  function handleOpenSearch() {
    setIsSearchOpen(true);
    setShowSuggestions(true);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSuggestions(true);
    updateUrl(filter, selected?.id ?? null, val);
  }

  const scrollToStage = useCallback(
    (delayMs = 120) => {
      if (typeof window === "undefined" || !stageRef.current) return;

      setTimeout(() => {
        if (!stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        // Navbar floating island pill is ~60px + top offset ~14px = ~74px.
        // Leaving a crisp gap of ~12px below the pill gives an offset of 86px.
        const navbarOffset = 86;
        const targetY = Math.max(0, window.scrollY + rect.top - navbarOffset);

        if (reducedMotion) {
          window.scrollTo({ top: targetY, behavior: "auto" });
          return;
        }

        smoothScrollTo(targetY, 900);
      }, delayMs);
    },
    [reducedMotion],
  );

  function openCard(id: string) {
    if (id === selected?.id) {
      // Toggle off / close card with smooth return scroll
      closeCard();
      return;
    }

    const target = cardFaces.find((c) => c.id === id);
    if (target) {
      updateUrl(target.category, target.id, searchQuery);
    }

    // Scroll up to stage with deliberate 120ms delay allowing 3D flip card initiation
    scrollToStage(120);
  }

  function handleSelectSuggestion(card: CardFace) {
    setShowSuggestions(false);
    openCard(card.id);
  }

  return (
    <div className={styles.wrap}>
      {/* Flip Stage Anchor */}
      <div ref={stageRef} className={styles.stageAnchor}>
        <div
          className={styles.stageFrame}
          style={{ "--c": selected ? CATEGORY_COLOR[selected.category] : "#5ee1f2" } as React.CSSProperties}
        >
          <div key={selected?.id ?? "idle"} className={reducedMotion ? undefined : styles.stageSwap}>
            {selected ? (
              <SelectedStage card={selected} onJump={openCard} onClose={closeCard} reducedMotion={reducedMotion} />
            ) : (
              <IdleStage onPick={openCard} />
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar with Animated Expanding Search Bar */}
      <div ref={gridRef} className={styles.filterBarWrapper}>
        <div className={styles.filterBar}>
          {/* 4 Category Tabs (smoothly collapses when search expands) */}
          <div
            className={[
              styles.categoryPillGroup,
              isSearchOpen ? styles.categoryPillGroupCollapsed : "",
            ].join(" ")}
            role="tablist"
            aria-label="Filter cards by category"
          >
            {FILTERS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={!isSearching && filter === id}
                className={!isSearching && filter === id ? styles.filterActive : styles.filter}
                style={{ "--f": CATEGORY_COLOR[id] } as React.CSSProperties}
                onClick={() => handleCategoryChange(id)}
              >
                <Icon size={14} />
                {label}
                <span className={styles.count}>{cardFaces.filter((c) => c.category === id).length}</span>
              </button>
            ))}
          </div>

          {/* Morphing Search Container (Seamlessly expands and collapses in two-way animation) */}
          <div
            className={[
              styles.searchContainer,
              isSearchOpen ? styles.searchContainerExpanded : styles.searchContainerCollapsed,
            ].join(" ")}
          >
            {!isSearchOpen ? (
              <button
                type="button"
                className={styles.searchPillTrigger}
                onClick={handleOpenSearch}
                aria-label="Search all cards"
              >
                <IconSearch size={14} />
                <span>Search</span>
              </button>
            ) : (
              <div className={styles.searchBarInner}>
                <span className={styles.searchIconGlow}>
                  <IconSearch size={16} />
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search by card name or content..."
                  className={styles.searchInput}
                  aria-label="Search cards"
                />
                {searchQuery.trim() ? (
                  <span className={styles.searchMatchesBadge}>
                    {searchMatches.length} {searchMatches.length === 1 ? "match" : "matches"}
                  </span>
                ) : null}
                <button
                  type="button"
                  className={styles.searchClearBtn}
                  onClick={handleCloseSearch}
                  title="Close search (Esc)"
                  aria-label="Close search"
                >
                  <IconClose size={16} />
                </button>
              </div>
            )}

            {/* Real-time Live Search Suggestions Dropdown */}
            {isSearchOpen && showSuggestions && searchQuery.trim() ? (
              <div className={styles.suggestionsDropdown} role="listbox" aria-label="Card search suggestions">
                {searchMatches.length > 0 ? (
                  searchMatches.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      role="option"
                      aria-selected={card.id === selected?.id}
                      className={styles.suggestionItem}
                      onClick={() => handleSelectSuggestion(card)}
                    >
                      <div className={styles.suggestionThumbWrap}>
                        <LazyImg src={card.src} alt={card.title} />
                      </div>
                      <div className={styles.suggestionLeft}>
                        <div className={styles.suggestionMetaRow}>
                          <span
                            className={styles.suggestionCatBadge}
                            style={{ background: CATEGORY_COLOR[card.category] }}
                          >
                            {card.category}
                          </span>
                          {card.strideType ? (
                            <span className={styles.suggestionStride}>· {card.strideType}</span>
                          ) : null}
                        </div>
                        <h4 className={styles.suggestionTitle}>{card.title}</h4>
                        <p className={styles.suggestionSnippet}>
                          {card.body.replace(/\*\*/g, "")}
                        </p>
                      </div>
                      <span className={styles.suggestionArrow}>
                        <IconArrowUpRight size={14} />
                      </span>
                    </button>
                  ))
                ) : (
                  <div style={{ padding: "0.85rem", textAlign: "center", color: "#8fb4bd", fontSize: "0.82rem" }}>
                    No cards match &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Card Grid or Empty State */}
      {visible.length > 0 ? (
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
                {/* Unified 3D Group: Card + Shadow move and rotate together */}
                <span className={[styles.cardGroup, isActive ? styles.cardGroupActive : ""].join(" ")}>
                  {/* 3D Tilted Cast Shadow */}
                  <span className={styles.cardShadow} aria-hidden="true" />

                  {/* 3D Flip Container */}
                  <span className={[styles.thumbFlipper, isActive ? styles.thumbFlipped : ""].join(" ")}>
                    <span className={styles.thumbFace}>
                      <LazyImg src={card.src} alt={card.title} />
                    </span>
                    <span className={[styles.thumbFace, styles.thumbFaceBack].join(" ")}>
                      <LazyImg src={coverSrcFor(card.deck)} alt="" />
                    </span>
                  </span>

                  <span className={styles.thumbLabel}>{card.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptySearchNotice}>
          <h3 className={styles.emptySearchTitle}>No Cards Found</h3>
          <p>No attack, defense, chance, or scenario cards match &ldquo;{searchQuery}&rdquo;.</p>
          <button type="button" className={styles.emptySearchReset} onClick={handleCloseSearch}>
            <span>Reset Search</span>
          </button>
        </div>
      )}
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
  onClose,
  reducedMotion,
}: {
  card: CardFace;
  onJump: (id: string) => void;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const pairs = (card.pairIds ?? []).map((id) => cardFaces.find((c) => c.id === id)).filter((c): c is CardFace => Boolean(c));

  return (
    <div className={styles.stagePanel} style={{ "--c": CATEGORY_COLOR[card.category] } as React.CSSProperties}>
      <FlipCard card={card} reducedMotion={reducedMotion} />

      <div className={styles.detail}>
        <div className={styles.detailHeaderRow}>
          <span className={styles.detailBadge}>
            {card.category}
            {card.strideType ? ` · ${card.strideType}` : ""}
          </span>
          <button
            type="button"
            className={styles.closeStageBtn}
            onClick={onClose}
            title="Close card description"
            aria-label="Close card description"
          >
            <IconClose size={13} />
            <span>Close</span>
          </button>
        </div>

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
                    className={styles.solutionTarget}
                    style={info ? ({ "--dot": info.color } as React.CSSProperties) : undefined}
                  >
                    <span className={styles.targetDot} />
                    {t}
                    {info ? <span className={styles.targetPoints}>{info.points} pts</span> : null}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}

        {pairs.length > 0 ? (
          <div className={styles.solutions}>
            <span className={styles.solutionsLabel}>
              {card.category === "attack" ? "Mitigations" : "Counters"}
            </span>
            <div className={styles.solutionChips}>
              {pairs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.solutionChip}
                  style={{ "--c": CATEGORY_COLOR[p.category] } as React.CSSProperties}
                  onClick={() => onJump(p.id)}
                >
                  <span className={styles.solutionCategory}>{p.category}</span>
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
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={styles.flipOuter}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      aria-label={`${card.title}, click to flip`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
    >
      <div
        className={[styles.flipInner, flipped ? styles.flipped : ""].join(" ")}
        style={{ transition: reducedMotion ? "none" : undefined }}
      >
        <div className={styles.face}>
          <LazyImg src={card.src} alt={card.title} eager />
        </div>
        <div className={[styles.face, styles.faceBack].join(" ")}>
          <LazyImg src={coverSrcFor(card.deck)} alt={`${card.deck} deck cover`} eager />
        </div>
      </div>
    </div>
  );
}
