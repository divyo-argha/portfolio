"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useLockScroll } from "@/hooks/useLockScroll";
import { useSectionNav } from "@/hooks/useSectionNav";
import { siteConfig } from "@/lib/site";
import styles from "./MobileNav.module.css";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navigateToSection = useSectionNav();
  useLockScroll(open);

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    onClose();
    navigateToSection(href);
  }

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, onClose]);

  if (!open) return null;

  // Portalled to <body>: the header has `backdrop-filter`, which creates a
  // new containing block for `position: fixed` descendants in modern
  // browsers — without the portal, this overlay sizes itself against the
  // header's box instead of the viewport.
  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className={styles.panel} ref={panelRef}>
        <nav>
          <ul className={styles.list}>
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className={styles.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
