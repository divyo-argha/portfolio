import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { profile } from "@/content/profile";
import { publications } from "@/content/publications";
import { positions } from "@/content/experience";
import { education } from "@/content/education";
import { methodGroups } from "@/content/skills";
import styles from "./ResearchGlance.module.css";

/**
 * Fast, factual evidence — everything here is read from content already
 * published elsewhere on the site (publications, experience, education,
 * methods), just surfaced together so a first-time visitor doesn't have to
 * assemble it themselves from four different sections.
 */
export function ResearchGlance() {
  const featured = publications[0];
  const researchRole = positions.find((p) => p.kind === "research");
  const sampleMethods = methodGroups[0]?.methods.slice(0, 4) ?? [];

  const tiles = [
    {
      eyebrow: "Publication",
      href: `/publications/${featured.slug}`,
      headline: featured.venueShort,
      detail: "Peer-reviewed research, accepted for presentation.",
    },
    {
      eyebrow: "Research experience",
      href: "#experience",
      headline: researchRole ? researchRole.org : "Research Assistant",
      detail: researchRole
        ? `${researchRole.title} · ${researchRole.dates}`
        : "Undergraduate & assistantship research.",
    },
    {
      eyebrow: "Methods",
      href: "#methods",
      headline: "Mixed methods",
      detail: sampleMethods.length > 0 ? sampleMethods.join(" · ") : "Qualitative & quantitative evaluation.",
    },
    {
      eyebrow: "Research areas",
      href: "#research",
      headline: "Human-centered security",
      detail: profile.focusLine,
    },
  ];

  return (
    <Section id="research-glance" label="At a glance" title="Research at a glance.">
      <div className={styles.grid}>
        {tiles.map((tile, i) => (
          <Reveal key={tile.eyebrow} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <Link href={tile.href} className={styles.tile}>
              <div className={styles.tileHead}>
                <span className={styles.eyebrow}>{tile.eyebrow}</span>
                <IconArrowUpRight size={12} className={styles.arrow} />
              </div>
              <p className={styles.headline}>{tile.headline}</p>
              <p className={styles.detail}>{tile.detail}</p>
            </Link>
          </Reveal>
        ))}
      </div>
      <p className={styles.footnote}>
        Undergraduate thesis at {education.university.institution.replace(/\s*\([^)]*\)\s*$/, "")} grew into the SOUPS
        2026 paper above.
      </p>
    </Section>
  );
}
