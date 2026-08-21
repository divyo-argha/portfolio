import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { FeaturedPublication } from "@/components/bento/FeaturedPublication";
import { PublicationCard } from "@/components/bento/PublicationCard";
import { InProgressCard } from "@/components/bento/InProgressCard";
import { ScholarCard } from "@/components/bento/ScholarCard";
import { publications } from "@/content/publications";
import { pillars, profile } from "@/content/profile";
import { MethodsStack } from "./MethodsStack";
import styles from "./ResearchAndPublications.module.css";

export function ResearchAndPublications() {
  const [cyqured, iccit, naacl] = publications;

  return (
    <Section
      id="research"
      label="Research & Publications"
      title="Research focus, publications & empirical methods."
      lede="Centering on human-centered security, usable privacy, mental models, and empirical mixed-methods evaluation."
    >
      {/* Anchor for direct publication links */}
      <span id="publications" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />
      <span id="methods" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />

      <div className={styles.container}>
        {/* Subsection 1: Research Focus & Philosophy */}
        <div className={styles.subBlock}>
          <div className={styles.subheadRow}>
            <span className={styles.subheadEyebrow}>01 · Focus & Vision</span>
            <h3 className={styles.subheadTitle}>What I work on, and why.</h3>
          </div>

          <div className={styles.focusGrid}>
            {/* Left Column: Core Statement + Doctoral Vision */}
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

            {/* Right Column: Key Pillars */}
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

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Subsection 2: Publications & Ongoing Work */}
        <div className={styles.subBlock}>
          <div className={styles.subheadRow}>
            <span className={styles.subheadEyebrow}>02 · Peer-Reviewed Record</span>
            <h3 className={styles.subheadTitle}>Publications & research in progress.</h3>
          </div>

          <BentoGrid
            feature={
              <Reveal>
                <FeaturedPublication publication={cyqured} />
              </Reveal>
            }
            iccit={
              <Reveal delay={1}>
                <PublicationCard publication={iccit} />
              </Reveal>
            }
            naacl={
              <Reveal delay={2}>
                <PublicationCard publication={naacl} />
              </Reveal>
            }
            inProgress={
              <Reveal delay={3}>
                <InProgressCard />
              </Reveal>
            }
            scholar={
              <Reveal delay={4}>
                <ScholarCard />
              </Reveal>
            }
          />
        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Subsection 3: Empirical Study Methods */}
        <div className={styles.subBlock}>
          <MethodsStack />
        </div>
      </div>
    </Section>
  );
}
