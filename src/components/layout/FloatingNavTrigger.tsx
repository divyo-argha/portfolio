"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingNavTrigger.module.css";

/**
 * Mobile/tablet stand-in for the desktop `ProfileIsland` (hidden at
 * >=1040px, see the module CSS). Stays out of the way near the top of the
 * page, then fades in once the reader has scrolled past the hero, showing
 * the section currently in view. Opens the existing `MobileNav` overlay.
 */
export function FloatingNavTrigger({
  activeLabel,
  onOpen,
}: {
  activeLabel?: string;
  onOpen: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 320);
          ticking = false;
        });
        ticking = true;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={visible ? `${styles.trigger} ${styles.visible}` : styles.trigger}
      aria-haspopup="dialog"
      aria-label="Open navigation"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{activeLabel || "Menu"}</span>
    </button>
  );
}
