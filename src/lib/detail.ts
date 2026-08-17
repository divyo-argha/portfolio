import { publications } from "@/content/publications";
import { publicationDetails } from "@/content/publicationDetails";
import { projects } from "@/content/projects";
import { projectDetails } from "@/content/projectDetails";
import type { DetailMeta } from "@/content/types";

export function getPublicationDetail(slug: string): DetailMeta | undefined {
  const publication = publications.find((p) => p.slug === slug);
  if (!publication) return undefined;

  return {
    slug: publication.slug,
    kind: "publication",
    eyebrow: publication.venueShort,
    title: publication.title,
    meta: [
      { label: "Venue", value: publication.venue },
      { label: "Year", value: String(publication.year) },
      { label: "Authors", value: publication.authors.map((a) => a.name).join(", ") },
    ],
    links: [],
    blocks: publicationDetails[slug] ?? [],
    venueMark: publication.venueMark,
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
