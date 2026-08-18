import type { ReactNode } from "react";

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

export type Author = {
  name: string;
  you?: boolean;
  equalContribution?: boolean;
  avatar?: string;
  url?: string;
  role?: string;
};

export type AffiliationInfo = {
  department: string;
  institution: string;
  location?: string;
  logo: string;
};

export type Publication = {
  slug: string;
  venue: string;
  venueShort: string;
  year: number;
  status: PublicationStatus;
  title: string;
  authors: Author[];
  summary: string;
  tags: string[];
  links?: Link[];
  citations?: number;
  scholarUrl?: string;
  scholarCitationsUrl?: string;
  bentoSpan: "feature" | "wide" | "normal";
  venueMark: VenueMark;
  /** Show the venue mark huge on the detail page's hero, right-aligned. */
  heroMark?: boolean;
  affiliation?: string;
  affiliationInfo?: AffiliationInfo;
};

export type Position = {
  kind: "education" | "research" | "industry" | "service" | "leadership";
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
  logo?: VenueMark;
};

/** Discriminated union rendered by BlockRenderer on detail pages. Every
 * variant may carry an optional `heading`, rendered above it as a small
 * section title (e.g. "What was the problem?"). */
type BlockVariant =
  | { kind: "prose"; body: string[] }
  | { kind: "figure"; src: string; alt: string; caption?: string; href?: string }
  | { kind: "gallery"; items: { src: string; alt: string; caption?: string; href?: string }[]; columns?: 2 | 3; compact?: boolean }
  | { kind: "findings"; items: { label: string; value: string }[] }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "code"; language: string; body: string }
  | { kind: "cardGrid"; items: { title: string; body: string }[]; columns?: 2 | 3 | 4 }
  | { kind: "statGrid"; items: { value: string; label: string; highlight?: boolean }[]; columns?: 2 | 3 | 4 | 5 }
  | { kind: "heroStat"; value: string; label: string }
  | { kind: "barChart"; unit?: string; items: { label: string; value: number; highlight?: boolean }[] }
  | {
      kind: "confusionMatrix";
      truePositive: number;
      trueNegative: number;
      falsePositive: number;
      falseNegative: number;
      positiveLabel: string;
      negativeLabel: string;
    }
  | { kind: "pipeline"; steps: { label: string; highlight?: boolean }[] }
  | { kind: "carousel"; items: { src: string; alt: string; caption?: string }[] }
  | {
      kind: "rocCurve";
      auc?: number;
      modelName?: string;
      models?: { name: string; auc: number; color?: string; points: [number, number][]; highlight?: boolean }[];
    };

export type Block = BlockVariant & { heading?: string };

/** A tab groups a subsection of a detail page's body under its own label,
 * e.g. separating a full write-up from a poster and a photo gallery.
 * Optional — most publications render `blocks` flat with no tabs. */
export type DetailTab = { id: string; label: string; blocks: Block[] };

export type DetailMeta = {
  slug: string;
  kind: "publication" | "project";
  eyebrow: string;
  title: string;
  meta: { label: string; value: ReactNode }[];
  links: Link[];
  blocks: Block[];
  tabs?: DetailTab[];
  venueMark?: VenueMark;
  heroMark?: boolean;
  scholarUrl?: string;
  publicationStatus?: PublicationStatus;
  authors?: Author[];
  affiliationInfo?: AffiliationInfo;
};
