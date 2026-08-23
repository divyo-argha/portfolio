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
 * The full peer-reviewed record. Home only shows the flagship publication
 * (see `FeaturedPublicationSection.tsx`) with a link through to this
 * standalone `/publications` page — keeps Home short while still giving the
 * complete record its own real page, which is also where `DetailLayout`'s
 * publication back-link now points.
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
