"use client";

import type { MouseEvent } from "react";
import { Section } from "@/components/primitives/Section";
import { Portrait } from "@/components/primitives/Portrait";
import { IconDownload } from "@/components/primitives/Icons";
import { useSectionNav } from "@/hooks/useSectionNav";
import { profile } from "@/content/profile";
import styles from "./Hero.module.css";

/**
 * Portrait, name, status, and identity keywords live permanently in
 * `ProfileIsland` on desktop (>=1040px), so this section's own portrait is
 * CSS-hidden there (see .mobilePortrait) and only shows below that width.
 * The About Me narrative is split across a 2-column layout on desktop
 * to naturally balance horizontal space without stretching line width.
 */
export function Hero() {
  const navigateToSection = useSectionNav();
  const [para1, para2, para3] = profile.bioParagraphs;

  function handleResearchClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigateToSection("#research");
  }

  return (
    <>
      <h1 className="visually-hidden">{profile.name}</h1>

      <Section id="top" label="About" title="About Me.">
        <div className={styles.mobilePortrait}>
          <Portrait src="/media/people/portrait.webp" alt="Argha Pratim Saha" priority />
        </div>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <p className={styles.subtitle}>{profile.subtitle}</p>
            <p className={styles.statement}>{para1}</p>

            <div className={styles.buttonRow}>
              <a href="#research" onClick={handleResearchClick} className={styles.primaryButton}>
                <span>View Research</span>
              </a>

              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className={styles.cvButton}>
                <IconDownload size={15} />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <div className={styles.rightCol}>
            <p className={styles.statement}>{para2}</p>
            <p className={styles.statement}>{para3}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
