import Image from "next/image";
import styles from "./Hero.module.css";

const DECKS = [
  {
    id: "scenario",
    src: "/media/publications/cyqured/covers/scenario.webp",
    accent: "var(--cyq-scenario)",
    className: styles.cardLeft,
  },
  {
    id: "chance",
    src: "/media/publications/cyqured/covers/chance.webp",
    accent: "var(--cyq-chance)",
    className: styles.cardCenter,
  },
  {
    id: "action",
    src: "/media/publications/cyqured/covers/action.webp",
    accent: "var(--cyq-attack)",
    className: styles.cardRight,
  },
] as const;

export function Hero() {
  return (
    <div className={styles.stage}>
      {/* These three are DIRECT children of .stage on purpose. CSS perspective
          only reaches an element's direct children, so the old wrapper around
          them had to carry transform-style: preserve-3d to pass it down — and
          that put the whole scene in a real 3D rendering context, where paint
          order comes from depth sorting and every hover has to be hit-tested
          by inverse-projecting the pointer through the transform. That was the
          source of the flaky hovers and the re-rasterisation jank. Parented
          straight to .stage they get exactly the same projection with no 3D
          context at all: plain z-index paint order, plain hit-testing. */}
      <HeroBoard />
      {/* Light falloff across the table, sharing the board's box and tilt so it
          lies in the board's plane. The board art is a bright white printout
          and needs shading to live in this dark scene at all — but a scrim in
          viewport space over a perspective scene reads as a grey patch pasted
          on top. Tilted with the board, the same gradient reads as light. */}
      <div className={styles.tableLight} aria-hidden="true" />
      <HeroCardFan />
      <HeroLogoLockup />
    </div>
  );
}

function HeroBoard() {
  return (
    <div className={styles.board} aria-hidden="true">
      {/* fill: .board is position:absolute with a definite box (see its inset
          in Hero.module.css), so the image sizes to that box exactly like the
          plain <img width:100%;height:100%> it replaces. object-fit: contain
          still comes from the CSS rule targeting `.board img`. */}
      <Image
        src="/media/publications/cyqured/board.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function HeroCardFan() {
  return (
    <div className={styles.cardGroup} aria-hidden="true">
      {DECKS.map((deck: typeof DECKS[number]) => (
        <div
          key={deck.id}
          className={[styles.card, deck.className].join(" ")}
          style={{ "--deck-c": deck.accent } as React.CSSProperties}
        >
          <Image src={deck.src} alt="" fill sizes="280px" loading="eager" decoding="async" />
        </div>
      ))}
    </div>
  );
}

function HeroLogoLockup() {
  return (
    <div className={styles.overlayBand}>
      <div className={styles.overlayContent}>
        {/* Not `fill` — the mark's width is intrinsic-driven (min(...%, px)
            with height:auto), same pattern as Figure.tsx: give Image the
            source file's real pixel size so it can compute the aspect ratio,
            and let the CSS width override the rendered size. */}
        <Image
          src="/media/publications/cyqured/cyqured-logo.webp"
          alt="cyQured"
          width={632}
          height={225}
          className={styles.logo}
          loading="eager"
          decoding="async"
        />
        <p className={styles.tagline}>Making cybersecurity something you can play.</p>
      </div>
    </div>
  );
}
