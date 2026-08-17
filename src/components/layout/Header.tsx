"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { useSectionNav } from "@/hooks/useSectionNav";
import { Container } from "@/components/primitives/Container";
import { IconMenu } from "@/components/primitives/Icons";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigateToSection = useSectionNav();

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    navigateToSection(href);
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
              type="button"
              className={styles.menuButton}
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label="Open navigation"
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </Container>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
