import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { FeaturedPublication } from "@/components/bento/FeaturedPublication";
import { IconArrowRight } from "@/components/primitives/Icons";
import { publications } from "@/content/publications";
import styles from "./FeaturedPublicationSection.module.css";

/**
 * Home shows exactly one publication — the flagship — so it's never more
 * than a glance away. The rest of the record (ICCIT, NAACL, work in
 * progress, Scholar profile) lives at `/publications`, one click further for
 * a reader who wants it.
 */
export function FeaturedPublicationSection() {
  const [cyqured] = publications;

  return (
    <Section id="publications" label="Publications" title="Peer-reviewed record.">
      <Reveal>
        <FeaturedPublication publication={cyqured} />
      </Reveal>
      <Link href="/publications" className={styles.seeAll}>
        <span>See all publications</span>
        <IconArrowRight size={13} />
      </Link>
    </Section>
  );
}
