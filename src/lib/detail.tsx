import type { ReactNode } from "react";
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
  const hasCitations = typeof publication.citations === "number" && !isAccepted;

  const yearValue: ReactNode = (
    <span>
      {publication.year}
      <span className={styles.citationText}>
        {" · "}
        {hasCitations ? (
          `${publication.citations} ${publication.citations === 1 ? "citation" : "citations"} (Google Scholar)`
        ) : (
          "Citations: N/A"
        )}
      </span>
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
    </span>
  );

  return {
    slug: publication.slug,
    kind: "publication",
    eyebrow: publication.venueShort,
    title: publication.title,
    meta: [
      { label: "Venue", value: publication.venue },
      { label: "Year", value: yearValue },
      { label: "Authors", value: authorsValue },
    ],
    links: publication.links ?? [],
    blocks: publicationDetails[slug] ?? [],
    tabs: publicationTabs[slug],
    venueMark: publication.venueMark,
    heroMark: publication.heroMark,
    scholarUrl: publication.scholarUrl,
    publicationStatus: publication.status,
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
    meta: [{ label: "Stack", value: project.stack.join(", ") }],
    links: project.links,
    blocks: projectDetails[slug] ?? [],
  };
}

export const publicationSlugs = publications.map((p) => p.slug);
export const projectSlugs = projects.map((p) => p.slug);
