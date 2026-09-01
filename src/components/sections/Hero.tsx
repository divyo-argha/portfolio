"use client";

import type { MouseEvent } from "react";
import { Section } from "@/components/primitives/Section";
import { Portrait } from "@/components/primitives/Portrait";
import { IconDownload, IconMail, IconScholar, IconGithub, IconLinkedin } from "@/components/primitives/Icons";
import { useSectionNav } from "@/hooks/useSectionNav";
import { profile, socialLinks } from "@/content/profile";
import styles from "./Hero.module.css";

const IDENTITY_LINE = profile.focusLine.split(" · ").slice(0, 3).join(" · ");

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Email: IconMail,
  "Google Scholar": IconScholar,
  GitHub: IconGithub,
  LinkedIn: IconLinkedin,
};

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
        {/* Mobile profile introduction (< 1040px) */}
        <div className={styles.mobileProfileHeader}>
          <div className={styles.mobilePortraitWrap}>
            <Portrait src="/media/people/portrait.webp" alt="Argha Pratim Saha" priority />
          </div>

          <div className={styles.mobileProfileMeta}>
            <h2 className={styles.mobileName}>{profile.name}</h2>
            <div className={styles.mobileStatusBadge}>
              <span className={styles.mobileStatusDot} />
              <span>{profile.status}</span>
            </div>
            <p className={styles.mobileIdentityLine}>{IDENTITY_LINE}</p>

            <ul className={styles.mobileSocials}>
              {socialLinks
                .filter((link) => link.label !== "CV (PDF)")
                .map((link) => {
                  const Icon = iconMap[link.label];
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={styles.mobileSocialLink}
                        aria-label={link.label}
                        title={link.label}
                      >
                        {Icon ? <Icon size={16} /> : null}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        {/* Narrative Grid */}
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
