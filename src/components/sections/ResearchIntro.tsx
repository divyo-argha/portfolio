import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { pillars, profile } from "@/content/profile";
import styles from "./ResearchSections.module.css";

/**
 * The research thesis: what I work on, and why. Evidence (publications,
 * methods, future directions) each get their own section further down the
 * page — see `ResearchGlance.tsx`, `ResearchMethods.tsx`, and
 * `FutureDirections.tsx` — so this one stays focused on the argument itself.
 */
export function ResearchIntro() {
  return (
    <Section
      id="research"
      label="Research"
      title="Research focus."
      lede="Centering on human-centered security, usable privacy, mental models, and empirical mixed-methods evaluation."
    >
      <div className={styles.container}>
        <div className={styles.subBlock}>
          <div className={styles.focusGrid}>
            <div className={styles.focusLeft}>
              <Reveal>
                <div className={styles.statementCard}>
                  <span className={styles.cardEyebrow}>Core Philosophy</span>
                  {profile.statement.map((paragraph) => (
                    <p key={paragraph} className={styles.statementText}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className={styles.focusRight}>
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={Math.min(i + 1, 2) as 1 | 2}>
                  <article className={styles.pillar}>
                    <span className={styles.pillarIndex}>Pillar 0{i + 1}</span>
                    <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                    <p className={styles.pillarBody}>{pillar.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
