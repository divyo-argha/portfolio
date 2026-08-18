import type { ReactNode } from "react";
import Image from "next/image";
import { publications } from "@/content/publications";
import { publicationDetails, publicationTabs } from "@/content/publicationDetails";
import { projects } from "@/content/projects";
import { projectDetails } from "@/content/projectDetails";
import type { DetailMeta } from "@/content/types";
import styles from "@/components/detail/MetaRail.module.css";

export function getPublicationDetail(slug: string): DetailMeta | undefined {
  const publication = publications.find((p) => p.slug === slug);
  if (!publication) return undefined;

  const isAccepted = publication.status === "accepted";
  // Only ever state a citation count that exists. An accepted-but-unindexed
  // paper says nothing here rather than volunteering "N/A".
  const hasCitations =
    typeof publication.citations === "number" && publication.citations > 0 && !isAccepted;

  const yearValue: ReactNode = (
    <span>
      {publication.year}
      {hasCitations ? (
        <span className={styles.citationText}>
          {" · "}
          {`${publication.citations} ${publication.citations === 1 ? "citation" : "citations"}`}
        </span>
      ) : null}
    </span>
  );

  const authorsValue: ReactNode = (
    <span className={styles.authorList}>
      {publication.authors.map((author, i) => {
        const isYou = author.you || author.name === "Argha Pratim Saha";
        return (
          <span key={author.name} className={isYou ? styles.youAuthor : undefined}>
            {isYou ? (
              <strong className={styles.youName}>
                <u>{author.name}</u>
              </strong>
            ) : (
              author.name
            )}
            {author.equalContribution ? "*" : ""}
            {i < publication.authors.length - 1 ? ", " : ""}
          </span>
        );
      })}
      {publication.authors.some((a) => a.equalContribution) ? (
        <span className={styles.equalNote}>* Equal contribution</span>
      ) : null}
    </span>
  );

  const affiliationValue: ReactNode = publication.affiliation ? (
    <span className={styles.affiliationRow}>
      <Image
        src="/media/institutions/sust.png"
        alt="SUST logo"
        width={18}
        height={18}
        className={styles.instLogo}
      />
      <span>{publication.affiliation}</span>
    </span>
  ) : null;

  return {
    slug: publication.slug,
    kind: "publication",
    eyebrow: publication.venueShort,
    title: publication.title,
    meta: [
      { label: "Venue", value: publication.venue },
      { label: "Year", value: yearValue },
      ...(!publication.affiliationInfo
        ? [
            { label: "Authors", value: authorsValue },
            ...(affiliationValue ? [{ label: "Affiliation", value: affiliationValue }] : []),
          ]
        : []),
    ],
    links: publication.links ?? [],
    blocks: publicationDetails[slug] ?? [],
    tabs: publicationTabs[slug],
    venueMark: publication.venueMark,
    heroMark: publication.heroMark,
    scholarUrl: publication.scholarUrl,
    publicationStatus: publication.status,
    authors: publication.authors,
    affiliationInfo: publication.affiliationInfo,
  };
}

export function getProjectDetail(slug: string): DetailMeta | undefined {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return undefined;

  return {
    slug: project.slug,
    kind: "project",
    eyebrow: project.tagline,
    title: project.name,
    meta: [
      { label: "Stack", value: project.stack.join(", ") },
      ...(project.stats ?? []).map((stat) => ({ label: stat.label, value: stat.value })),
    ],
    links: project.links,
    blocks: projectDetails[slug] ?? [],
  };
}

export const publicationSlugs = publications.map((p) => p.slug);
export const projectSlugs = projects.map((p) => p.slug);
