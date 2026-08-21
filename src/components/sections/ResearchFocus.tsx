import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { pillars, profile } from "@/content/profile";
import styles from "./ResearchFocus.module.css";

export function ResearchFocus() {
  return (
    <Section id="research" label="Research" title="What I work on, and why.">
      <div className={styles.grid}>
        {/* Left Column: Core Philosophy & Doctoral Vision */}
        <div className={styles.leftCol}>
          <Reveal>
            <div className={styles.statementCard}>
              <span className={styles.eyebrow}>Core Philosophy</span>
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

        {/* Right Column: Research Focus Pillars */}
        <div className={styles.rightCol}>
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={Math.min(i + 1, 2) as 1 | 2}>
              <article className={styles.pillar}>
                <span className={styles.pillarIndex}>0{i + 1}</span>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarBody}>{pillar.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
