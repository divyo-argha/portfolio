import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { researchFocus } from "@/content/profile";
import styles from "./ResearchFocus.module.css";

/**
 * Replaces the old split between this section (a philosophy statement plus
 * four future-direction cards) and the separate `ResearchInterests` section
 * (tags only) — merged into one short paragraph and one tag row, on
 * request, instead of two sections making roughly the same point twice.
 */
export function ResearchFocus() {
  return (
    <Section id="research-focus" label="Looking ahead" title="What I want to work on next.">
      <Reveal>
        <p className={styles.note}>{researchFocus.note}</p>
      </Reveal>

      <Reveal delay={1}>
        <ul className={styles.tags}>
          {researchFocus.tags.map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
