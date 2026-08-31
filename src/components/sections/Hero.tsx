import { Section } from "@/components/primitives/Section";
import { Portrait } from "@/components/primitives/Portrait";
import { IconDownload } from "@/components/primitives/Icons";
import { profile } from "@/content/profile";
import styles from "./Hero.module.css";

/**
 * Portrait, name, status, and identity keywords live permanently in
 * `ProfileIsland` on desktop (>=1040px), so this section's own portrait is
 * CSS-hidden there (see .mobilePortrait) and only shows below that width —
 * without it, a mobile reader never sees a photo at all, since the island
 * that normally carries one is display:none for them. The `<h1>` renders
 * before the section, visually hidden, because it's the only element
 * guaranteed to be in the accessibility tree at every breakpoint.
 */
export function Hero() {
  return (
    <>
      <h1 className="visually-hidden">{profile.name}</h1>

      <Section id="top" label="About" title="About Me.">
        <div className={styles.mobilePortrait}>
          <Portrait src="/media/people/portrait.webp" alt="Argha Pratim Saha" priority />
        </div>

        <p className={styles.subtitle}>{profile.subtitle}</p>
        <p className={styles.statement}>{profile.bio}</p>

        <div className={styles.buttonRow}>
          <a href="#research" className={styles.primaryButton}>
            <span>View Research</span>
          </a>

          <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className={styles.cvButton}>
            <IconDownload size={15} />
            <span>Download CV</span>
          </a>
        </div>
      </Section>
    </>
  );
}
