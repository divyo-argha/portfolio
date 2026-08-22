import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { pillars, profile } from "@/content/profile";
import { MethodsStack } from "./MethodsStack";
import styles from "./ResearchSections.module.css";

/**
 * Research focus and the methods behind it. The publications that used to sit
 * between these two blocks are now their own section above (see
 * `Publications.tsx`), which leaves this reading as one argument: what I work
 * on and why, then how I actually study it.
 */
export function Research() {
  return (
    <Section
      id="research"
      label="Research"
      title="Research focus & empirical methods."
      lede="Centering on human-centered security, usable privacy, mental models, and empirical mixed-methods evaluation."
    >
      {/* Kept so any existing link to /#methods still lands on the methods block. */}
      <span
        id="methods"
        aria-hidden="true"
        style={{ position: "relative", top: "-5rem", display: "block" }}
      />

      <div className={styles.container}>
        <div className={styles.subBlock}>
          <div className={styles.subheadRow}>
            <span className={styles.subheadEyebrow}>01 · Focus &amp; Vision</span>
            <h3 className={styles.subheadTitle}>What I work on, and why.</h3>
          </div>

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

              <Reveal delay={1}>
                <div className={styles.openBox}>
                  <p className={styles.openHeading}>{profile.openQuestionHeading}</p>
                  <p className={styles.openText}>{profile.openQuestion}</p>
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

        <hr className={styles.divider} />

        <div className={styles.subBlock}>
          <MethodsStack />
        </div>
      </div>
    </Section>
  );
}
