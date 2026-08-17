import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { FeaturedPublication } from "@/components/bento/FeaturedPublication";
import { PublicationCard } from "@/components/bento/PublicationCard";
import { InProgressCard } from "@/components/bento/InProgressCard";
import { ScholarCard } from "@/components/bento/ScholarCard";
import { publications } from "@/content/publications";

export function ResearchBento() {
  const [cyqured, iccit, naacl] = publications;

  return (
    <Section
      id="publications"
      label="Research & publications"
      title="Publications and research in progress."
      lede="Focus: Usable security & privacy, mental models, and empirical mixed-methods evaluation."
    >
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
    </Section>
  );
}
