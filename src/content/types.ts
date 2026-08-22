import type { ReactNode } from "react";

export type Link = {
  label: string;
  href: string;
};

/** One entry in the hero's credential strip — the published record, stated
 * before the reader has to scroll for it. */
/** A study grouped with the methods it actually used, so the methods section
 * reads as experience rather than as a vocabulary list. */
export type MethodGroup = {
  study: string;
  context: string;
  href?: string;
  methods: string[];
};

export type NewsItem = {
  date: string;
  badge?: string;
  title: string;
  description: string;
  link?: Link;
  secondaryLink?: Link;
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
  email?: string;
  role?: string;
  /** Superscript index into the publication's affiliationInfo array (1-based),
   * for papers whose authors span more than one institution. */
  affiliationMark?: number;
};

export type AffiliationInfo = {
  department: string;
  institution: string;
  location?: string;
  logo: string;
  /** 1-based index shown as a superscript badge, matched against each
   * author's affiliationMark. */
  mark?: number;
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
  doi?: string;
  bentoSpan: "feature" | "wide" | "normal";
  venueMark: VenueMark;
  /** Research imagery for the homepage bento card — the artifact or a key
   * figure, so the card shows the work rather than only describing it. */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Show the venue mark huge on the detail page's hero, right-aligned. */
  heroMark?: boolean;
  /** Scales the hero venue mark relative to the shared default size (e.g. 0.7
   * for a mark that would otherwise dominate the header). Defaults to 1. */
  heroMarkScale?: number;
  affiliation?: string;
  /** One entry per institution involved — multi-institution papers (e.g.
   * co-authors split across two universities) list one plate per institution. */
  affiliationInfo?: AffiliationInfo[];
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
  /** Smaller side projects, rendered as a compact list rather than full
   * cards so they don't visually compete with the substantive work. */
  minor?: boolean;
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
  | { kind: "figure"; src: string; alt: string; caption?: string; href?: string; size?: "sm" | "md" | "lg" }
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
    }
  | { kind: "accordion"; title: string; subtitle?: string; defaultOpen?: boolean; content: string[] }
  | { kind: "quoteBento" }
  | { kind: "serpentinePipeline" }
  | { kind: "boardShowcase" }
  | { kind: "cardRow" };

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
  heroMarkScale?: number;
  scholarUrl?: string;
  publicationStatus?: PublicationStatus;
  authors?: Author[];
  affiliationInfo?: AffiliationInfo[];
};

export type OnlineJudgeProfile = {
  platform: string;
  handle: string;
  url: string;
  rating?: string | number;
  ratingTier?: string;
  problemsSolved?: string | number;
  badge?: string;
  metaBadges?: { label: string; value: string }[];
  additionalHandles?: { handle: string; rating?: string | number; url: string }[];
};

export type CampusContestInfo = {
  title: string;
  institution: string;
  dates: string;
  tag: string;
  detail: string;
};

export type ProblemSolvingData = {
  totalSolved: string;
  headline: string;
  description: string;
  codeforces: OnlineJudgeProfile;
  leetcode: OnlineJudgeProfile;
  otherJudges: { platform: string; handle: string; url: string; badge?: string }[];
  campusContests: CampusContestInfo;
};
