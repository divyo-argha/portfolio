"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconArrowUpRight, IconClose } from "@/components/primitives/Icons";
import { useLockScroll } from "@/hooks/useLockScroll";
import styles from "./CyquredNavbar.module.css";

export const GAME_NAV_LINKS = [
  { label: "Home", href: "/cyqured" },
  { label: "Assets", href: "/cyqured/assets" },
  { label: "Mechanics", href: "/cyqured/mechanics" },
  { label: "Publication", href: "/cyqured/publication" },
];

export function CyquredNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useLockScroll(isExpanded);

  // Scroll detection for Dynamic Island morphing
  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 25;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
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
        ].join(" ")}
      >
        {/* Main Navbar Bar */}
        <div className={styles.islandContainer} ref={containerRef}>
          {/* Brand Logo Link */}
          <Link
            href="/cyqured"
            className={styles.brandLink}
            aria-label="CyQured Game Home"
          >
            <Image
              src="/media/publications/cyqured/cyqured-logo.webp"
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

          {/* Desktop Direct Bridge to Paper Overview */}
          <div className={styles.actionGroup}>
            <Link href="/publications/cyqured" className={styles.paperLink} title="Academic Research Overview">
              <span>Paper Overview</span>
              <IconArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Hamburger / Close Button */}
          <button
            type="button"
            className={[
              styles.mobileMenuToggle,
              isExpanded ? styles.mobileMenuToggleActive : "",
            ].join(" ")}
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <IconClose size={18} />
            ) : (
              <span className={styles.hamburgerLines}>
                <span />
                <span />
                <span />
              </span>
            )}
          </button>
        </div>

        {/* Structured Menu Panel that Expands Downward */}
        <div
          className={[
            styles.expandedMenuPanel,
            isExpanded ? styles.expandedMenuPanelOpen : "",
          ].join(" ")}
          aria-hidden={!isExpanded}
        >
          <div className={styles.expandedMenuInner}>
            <nav aria-label="Mobile Navigation List">
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

            <div className={styles.mobileExpandedFooter}>
              <Link
                href="/publications/cyqured"
                className={styles.mobilePaperCta}
                onClick={() => setIsExpanded(false)}
              >
                <span>Academic Study &amp; Overview</span>
                <IconArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
