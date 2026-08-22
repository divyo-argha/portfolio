"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "@/components/primitives/Icons";
import styles from "./BackToTop.module.css";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 600;
          setVisible((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={visible ? `${styles.button} ${styles.visible}` : styles.button}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <IconArrowUp size={18} />
    </button>
  );
}
