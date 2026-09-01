"use client";

import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Chip } from "@/components/primitives/Chip";
import { Badge } from "@/components/primitives/Badge";
import { VenueMark } from "@/components/primitives/VenueMark";
import { AccordionRow } from "@/components/primitives/AccordionRow";
import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import { socialLinks } from "@/content/profile";
import { publications } from "@/content/publications";
import styles from "./Publications.module.css";

const scholarUrl = socialLinks.find((link) => link.label === "Google Scholar")!.href;

/**
 * The peer-reviewed record, plain and list-wise — same accordion pattern as
 * Experience and Education, with each entry's venue logo standing in for
 * the institution logos those sections show. First thing under "Research"
 * now that Publications leads the block; `OngoingWork` and
 * `ResearchInterests` follow. The `#research` span makes this section double
 * as the nav's "Research" target, since it's the entry point of the block,
 * and it keeps `DetailLayout`'s `/#publications` back-link landing here.
 */
export function Publications() {
  return (
    <Section
      id="publications"
      label="Publications"
      title="Publications and research works."
      action={
        <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className={styles.scholarPill}>
          <IconScholar size={14} />
          <span>Google Scholar</span>
          <IconArrowUpRight size={11} />
        </a>
      }
    >
      <span id="research" aria-hidden="true" style={{ position: "relative", top: "-5rem", display: "block" }} />

      <div className={styles.list}>
        {publications.map((pub, i) => (
          <Reveal key={pub.slug} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
            <AccordionRow
              icon={pub.venueMark ? <VenueMark mark={pub.venueMark} size="lg" /> : null}
              eyebrow={pub.venueShort}
              title={pub.title}
              subtitle={pub.venue}
              meta={
                <>
                  <Badge status={pub.status} />
                  <Link
                    href={`/publications/${pub.slug}`}
                    className={styles.visitButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit</span>
                    <IconArrowUpRight size={11} />
                  </Link>
                </>
              }
            >
              <p>{pub.summary}</p>

              <p className={styles.authors}>
                {pub.authors.map((author, idx) => (
                  <span key={author.name}>
                    {author.you ? (
                      <Link href="/" className={styles.youLink} title="Argha Pratim Saha — Back to Home">
                        <strong>
                          <u>{author.name}</u>
                        </strong>
                      </Link>
                    ) : (
                      author.name
                    )}
                    {author.equalContribution ? "*" : ""}
                    {idx < pub.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <div className={styles.tags}>
                {pub.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>

              <div className={styles.links}>
                {pub.links?.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <span>{link.label}</span>
                    <IconArrowUpRight size={12} />
                  </a>
                ))}
                {pub.scholarUrl ? (
                  <a href={pub.scholarUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <span>Google Scholar{pub.citations ? ` · ${pub.citations} citations` : ""}</span>
                    <IconArrowUpRight size={12} />
                  </a>
                ) : null}
              </div>
            </AccordionRow>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
