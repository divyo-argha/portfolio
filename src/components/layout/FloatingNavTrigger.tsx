"use client";

import styles from "./FloatingNavTrigger.module.css";

/**
 * Mobile/tablet stand-in for the desktop `ProfileIsland` (hidden at
 * >=1040px, see the module CSS): a conventional hamburger button, grouped
 * with `ThemeToggle` in the top-right corner (see Header.tsx) and visible
 * from the first paint rather than fading in after a scroll threshold — a
 * reader landing on the page needs a way to reach the nav immediately, not
 * just once they've scrolled past the hero. Opens the existing `MobileNav`
 * overlay; the icon morphs into a close (X) mark while that overlay is open.
 */
export function FloatingNavTrigger({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={open ? `${styles.trigger} ${styles.open}` : styles.trigger}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={open ? "Close navigation" : "Open navigation"}
    >
      <span className={styles.icon} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
