import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { profile, futureDirections } from "@/content/profile";
import sharedStyles from "./ResearchSections.module.css";
import styles from "./ResearchFocus.module.css";

/**
 * "What I want to work on next" — merges the old `ResearchIntro` (the core
 * philosophy statement) with `FutureDirections` (the four forward-looking
 * items) into one section, positioned right after the three Research
 * subsections above and before Experience.
 */
export function ResearchFocus() {
  return (
    <Section
      id="research-focus"
      label="Looking ahead"
      title="What I want to work on next."
      lede={futureDirections.unifyingThread}
    >
      <div className={sharedStyles.subBlock}>
        <Reveal>
          <div className={sharedStyles.statementCard}>
            <span className={sharedStyles.cardEyebrow}>Core Philosophy</span>
            {profile.statement.map((paragraph) => (
              <p key={paragraph} className={sharedStyles.statementText}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <div className={styles.grid}>
          {futureDirections.items.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
              <article className={sharedStyles.pillar}>
                <div className={styles.itemHead}>
                  <h4 className={sharedStyles.pillarTitle}>{item.title}</h4>
                  {item.status === "emerging" ? <Chip>Emerging interest</Chip> : null}
                </div>
                <p className={sharedStyles.pillarBody}>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className={styles.closingNote}>{futureDirections.closingNote}</p>
      </div>
    </Section>
  );
}
