import { Section } from "@/components/primitives/Section";
import { IconDownload } from "@/components/primitives/Icons";
import { profile } from "@/content/profile";
import styles from "./Hero.module.css";

/**
 * Portrait, name, status, and identity keywords now live permanently in
 * `ProfileIsland` (desktop) / `MobileNav` (mobile), so this section stays
 * focused on the one thing that isn't already visible everywhere: the bio
 * itself, plus the two primary calls to action. The `<h1>` renders before
 * the section, visually hidden, because it's the only element guaranteed to
 * be in the accessibility tree at every breakpoint (the island is
 * `display: none` below 1040px, which also removes it from that tree).
 */
export function Hero() {
  return (
    <>
      <h1 className="visually-hidden">{profile.name}</h1>

      <Section id="top" label="About" title="About Me.">
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
