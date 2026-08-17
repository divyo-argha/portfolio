/** Shared content types. Every section reads typed data from `src/content` — no markup here. */

export type Link = {
  label: string;
  href: string;
};

export type PublicationStatus = "accepted" | "published" | "in-progress";

export type VenueMark = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Publication = {
  slug: string;
  venue: string;
  venueShort: string;
  year: number;
  status: PublicationStatus;
  title: string;
  authors: { name: string; you?: boolean; equalContribution?: boolean }[];
  summary: string;
  tags: string[];
  links?: Link[];
  bentoSpan: "feature" | "wide" | "normal";
  venueMark: VenueMark;
};

export type Position = {
  kind: "education" | "research" | "industry" | "service";
  title: string;
  org: string;
  dates: string;
  detail?: string;
  bullets: string[];
  link?: Link;
  logo?: VenueMark;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  featured?: boolean;
  stats?: { label: string; value: string }[];
  links: Link[];
  installCommand?: string;
};

/** Discriminated union rendered by BlockRenderer on detail pages. */
export type Block =
  | { kind: "prose"; body: string[] }
  | { kind: "figure"; src: string; alt: string; caption?: string }
  | { kind: "gallery"; items: { src: string; alt: string; caption?: string }[]; columns?: 2 | 3 }
  | { kind: "findings"; items: { label: string; value: string }[] }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "code"; language: string; body: string };

export type DetailMeta = {
  slug: string;
  kind: "publication" | "project";
  eyebrow: string;
  title: string;
  meta: { label: string; value: string }[];
  links: Link[];
  blocks: Block[];
  venueMark?: VenueMark;
};
