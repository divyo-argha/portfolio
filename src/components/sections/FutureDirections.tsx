import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { futureDirections } from "@/content/profile";
import sharedStyles from "./ResearchSections.module.css";
import styles from "./FutureDirections.module.css";

/**
 * Where the work might go next — kept separate from `ResearchIntro` (what I
 * already do) so a reader isn't left guessing which claims are established
 * and which are direction. Each item is a question, not a credential; the
 * "emerging" item says outright that there's no publication behind it yet.
 */
export function FutureDirections() {
  return (
    <Section
      id="future-directions"
      label="Looking ahead"
      title="What I want to investigate next."
      lede={futureDirections.unifyingThread}
    >
      <div className={styles.grid}>
        {futureDirections.items.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
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
    </Section>
  );
}
