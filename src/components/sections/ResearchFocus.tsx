import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { pillars } from "@/content/profile";
import styles from "./ResearchFocus.module.css";

export function ResearchFocus() {
  return (
    <Section id="research" label="Research focus">
      <div className={styles.pillars}>
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <article className={styles.pillar}>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
