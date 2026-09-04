"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/primitives/Container";
import { useSectionNav } from "@/hooks/useSectionNav";
import { profile } from "@/content/profile";
import styles from "./Footer.module.css";

export function Footer() {
  const pathname = usePathname();
  const isCyquredGame = pathname?.startsWith("/publications/cyqured/game");
  const navigateToSection = useSectionNav();

  if (isCyquredGame) {
    return null;
  }

  function handleBackToTop(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigateToSection("#top");
  }

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="#top" onClick={handleBackToTop} className={styles.authorLink}>
              {profile.name}
            </Link>
          </div>

          <div className={styles.right}>
            <span className={styles.lastUpdated}>
              Last updated: September 2026
            </span>
            <a href="#top" onClick={handleBackToTop} className={styles.backToTop} aria-label="Back to top of page">
              ↑ Back to top
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
