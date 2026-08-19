"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { useSectionNav } from "@/hooks/useSectionNav";
import { Container } from "@/components/primitives/Container";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigateToSection = useSectionNav();
  const pathname = usePathname();
  const dark = pathname === "/publications/cyqured/game";

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    navigateToSection(href);
  }

  // Returns focus to the toggle button on close (Escape, backdrop click, nav
  // link click) so keyboard/screen-reader users aren't dropped onto <body>.
  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <header className={dark ? `${styles.header} ${styles.headerDark}` : styles.header}>
      <Container>
        <div className={styles.bar}>
          <a href="#top" className={styles.mark} onClick={(e) => handleAnchorClick(e, "#top")}>
            <Image src="/media/people/portrait.jpg" alt="" width={32} height={32} className={styles.markPhoto} />
            Argha
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.list}>
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
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

      <MobileNav open={open} onClose={closeMenu} />
    </header>
  );
}
