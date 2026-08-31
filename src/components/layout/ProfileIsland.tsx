"use client";

import type { MouseEvent } from "react";
import { Portrait } from "@/components/primitives/Portrait";
import { IconMail, IconScholar, IconGithub, IconLinkedin, IconDownload } from "@/components/primitives/Icons";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSectionNav } from "@/hooks/useSectionNav";
import { siteConfig } from "@/lib/site";
import { profile, socialLinks } from "@/content/profile";
import styles from "./ProfileIsland.module.css";

const NAV_HASHES = siteConfig.navLinks.map((link) => link.href);

// The three keywords a reader should walk away with — the first three of the
// four in profile.focusLine. "Applied machine learning" (the fourth) is left
// off: profile.ts's own `pillars` already frame it as grounding rather than a
// headline identity, and the island only has room for three. Rendered as one
// mono-set line (the same treatment the old Hero gave focusLine) rather than
// pill chips — chips read as generic dashboard UI; this reads as this site.
const IDENTITY_LINE = profile.focusLine.split(" · ").slice(0, 3).join(" · ");

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Email: IconMail,
  "Google Scholar": IconScholar,
  GitHub: IconGithub,
  LinkedIn: IconLinkedin,
};

/**
 * The sticky left panel: portrait, name, status, a three-word identity, the
 * full nav, and socials — everything a reader needs to orient, always in
 * view while the right column scrolls past it. Desktop only (>=1040px, see
 * .island's media query); FloatingNavTrigger + MobileNav cover the same
 * content below that width.
 */
export function ProfileIsland() {
  const activeSection = useActiveSection(NAV_HASHES);
  const navigateToSection = useSectionNav();

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    navigateToSection(href);
  }

  return (
    <aside className={styles.island} aria-label="Profile and navigation">
      <div className={styles.card}>
        <div className={styles.portraitWrap}>
          <Portrait src="/media/people/portrait.webp" alt="Argha Pratim Saha" priority />
        </div>

        {/* Not an <h1> — the page's one heading lives in Hero.tsx (visually
            hidden there) so it stays in the accessibility tree even below
            1040px, where this island is display:none and drops out of it. */}
        <p className={styles.name}>{profile.name}</p>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>{profile.status}</span>
        </div>

        <p className={styles.identityLine}>{IDENTITY_LINE}</p>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={isActive ? styles.navLinkActive : styles.navLink}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <ul className={styles.socials}>
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
                    className={styles.socialLink}
                    aria-label={link.label}
                    title={link.label}
                  >
                    {Icon ? <Icon size={16} /> : null}
                  </a>
                </li>
              );
            })}
        </ul>

        <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className={styles.cvButton}>
          <IconDownload size={17} />
          <span>Download CV</span>
        </a>
      </div>
    </aside>
  );
}
