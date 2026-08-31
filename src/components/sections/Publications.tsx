import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { FeaturedPublication } from "@/components/bento/FeaturedPublication";
import { PublicationCard } from "@/components/bento/PublicationCard";
import { ScholarCard } from "@/components/bento/ScholarCard";
import { publications } from "@/content/publications";
import styles from "./ResearchSections.module.css";

/**
 * The peer-reviewed record — the load-bearing credential for a PhD
 * application, and the first thing under "Research" now that Publications
 * leads the block. `OngoingWork` and `ResearchInterests` follow. Also gives
 * `DetailLayout`'s existing `/#publications` back-link a real section to land
 * on instead of the offset anchor span that used to stand in for one. The
 * `#research` span makes this section double as the nav's "Research" target,
 * since it's the entry point of the whole block.
 */
export function Publications() {
  const [cyqured, iccit, naacl] = publications;

  return (
    <Section
      id="publications"
      label="Publications"
      title="Peer-reviewed record."
      lede="Each entry links to the full write-up, the paper itself, and the study materials behind it."
    >
      <span id="research" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />
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
            scholar={
              <Reveal delay={3}>
                <ScholarCard />
              </Reveal>
            }
          />
        </div>
      </div>
    </Section>
  );
}
