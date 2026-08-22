import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { FeaturedPublication } from "@/components/bento/FeaturedPublication";
import { PublicationCard } from "@/components/bento/PublicationCard";
import { InProgressCard } from "@/components/bento/InProgressCard";
import { ScholarCard } from "@/components/bento/ScholarCard";
import { publications } from "@/content/publications";
import styles from "./ResearchSections.module.css";

/**
 * The peer-reviewed record, split out of the old combined
 * "Research & Publications" block and placed ahead of the research statement.
 *
 * Reasoning: the record is the load-bearing credential for an application, and
 * previously it sat below a screen of philosophy prose. The hero already states
 * the research area, so leading with evidence and following with interpretation
 * reads better than the reverse. It also gives `DetailLayout`'s existing
 * `/#publications` back-link a real section to land on instead of the offset
 * anchor span that used to stand in for one.
 */
export function Publications() {
  const [cyqured, iccit, naacl] = publications;

  return (
    <Section
      id="publications"
      label="Publications"
      title="Peer-reviewed record & work in progress."
      lede="Each entry links to the full write-up, the paper itself, and the study materials behind it."
    >
      <div className={styles.container}>
        <div className={styles.subBlock}>
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
      </div>
    </Section>
  );
}
