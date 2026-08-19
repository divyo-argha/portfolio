"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { useSectionNav } from "@/hooks/useSectionNav";
import { Container } from "@/components/primitives/Container";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigateToSection = useSectionNav();

  useEffect(() => {
    const sectionIds = siteConfig.navLinks.map((l) => l.href.replace(/^#/, ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    navigateToSection(href);
    setActiveSection(href);
  }

  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <a href="#top" className={styles.mark} onClick={(e) => handleAnchorClick(e, "#top")}>
            <Image src="/media/people/portrait.jpg" alt="" width={32} height={32} className={styles.markPhoto} />
            Argha
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.list}>
              {siteConfig.navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className={isActive ? styles.active : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className={open ? `${styles.menuButton} ${styles.menuButtonOpen}` : styles.menuButton}
              onClick={() => setOpen((value) => !value)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </Container>

      <MobileNav open={open} onClose={closeMenu} activeSection={activeSection} />
    </header>
  );
}
