"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconArrowUpRight, IconClose } from "@/components/primitives/Icons";
import { useLockScroll } from "@/hooks/useLockScroll";
import styles from "./CyquredNavbar.module.css";

export const GAME_NAV_LINKS = [
  { label: "Assets", href: "/publications/cyqured/game" },
  { label: "Mechanics", href: "/publications/cyqured/game/mechanics" },
  { label: "Publication", href: "/publications/cyqured/game/publication" },
];

export function CyquredNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useLockScroll(isExpanded);

  // Scroll detection for Dynamic Island morphing
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 25);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    if (!isExpanded) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      {/* Dimmed backdrop when mobile island is expanded */}
      <div
        className={[
          styles.backdrop,
          isExpanded ? styles.backdropVisible : "",
        ].join(" ")}
        onClick={() => setIsExpanded(false)}
        aria-hidden="true"
      />

      <header
        className={[
          styles.navbarWrapper,
          isScrolled ? styles.navbarFloating : styles.navbarTop,
          isExpanded ? styles.navbarExpanded : "",
        ].join(" ")}
      >
        <div className={styles.islandContainer} ref={containerRef}>
          {/* Collapsed State: CyQured Logo (Desktop & Mobile) */}
          {!isExpanded ? (
            <>
              {/* Brand Logo Link */}
              <Link
                href="/publications/cyqured/game"
                className={styles.brandLink}
                aria-label="CyQured Game Home"
              >
                <Image
                  src="/media/publications/cyqured/cyqured-logo.png"
                  alt="CyQured"
                  width={130}
                  height={42}
                  className={styles.brandLogo}
                  priority
                />
              </Link>

              {/* Desktop Nav Links with Deterministic Route Active State */}
              <nav className={styles.desktopNav} aria-label="Game Sections">
                <ul className={styles.navList}>
                  {GAME_NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={[
                            styles.navLink,
                            isActive ? styles.navLinkActive : "",
                          ].join(" ")}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Desktop Direct Bridge to Overview */}
              <div className={styles.actionGroup}>
                <Link href="/publications/cyqured" className={styles.paperLink}>
                  <span>Overview</span>
                  <IconArrowUpRight size={13} />
                </Link>
              </div>
            </>
          ) : (
            /* Expanded State: Morph into Floating Cyberpunk Menu Box */
            <div className={styles.mobileExpandedContent}>
              {/* Top Row: Centered Logo + Close Button */}
              <div className={styles.expandedTopRow}>
                <Link
                  href="/publications/cyqured/game"
                  className={styles.brandLink}
                  onClick={() => setIsExpanded(false)}
                >
                  <Image
                    src="/media/publications/cyqured/cyqured-logo.png"
                    alt="CyQured"
                    width={120}
                    height={38}
                    className={styles.brandLogo}
                  />
                </Link>
                <button
                  type="button"
                  className={styles.expandedCloseButton}
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close navigation"
                >
                  <IconClose size={18} />
                </button>
              </div>

              {/* Navigation list with Route Active Highlighting */}
              <nav aria-label="Mobile Game Navigation">
                <ul className={styles.mobileNavList}>
                  {GAME_NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsExpanded(false)}
                          className={[
                            styles.mobileNavItemLink,
                            isActive ? styles.mobileNavItemLinkActive : "",
                          ].join(" ")}
                        >
                          <span className={styles.mobileNavIndex}>0{idx + 1}</span>
                          <span className={styles.mobileNavLabel}>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom Action - Scholarly Bridge */}
              <div className={styles.mobileExpandedFooter}>
                <Link
                  href="/publications/cyqured"
                  className={styles.mobilePaperCta}
                  onClick={() => setIsExpanded(false)}
                >
                  <span>Academic Study & Overview</span>
                  <IconArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Prolonged Dynamic Handle underneath the Pill */}
        {!isExpanded ? (
          <div className={styles.prolongedHandleRow}>
            <button
              type="button"
              className={styles.prolongedHandle}
              onClick={() => setIsExpanded(true)}
              aria-label="Expand game navigation menu"
            >
              <span className={styles.notchGrip} />
            </button>
          </div>
        ) : null}
      </header>
    </>
  );
}
