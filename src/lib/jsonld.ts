import { profile, socialLinks } from "@/content/profile";
import { siteConfig } from "@/lib/site";
import type { Publication } from "@/content/types";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    email: profile.email,
    jobTitle: "PhD Applicant",
    affiliation: { "@type": "CollegeOrUniversity", name: profile.university },
    sameAs: socialLinks.filter((l) => l.href.startsWith("http")).map((l) => l.href),
  };
}

export function scholarlyArticleJsonLd(publication: Publication) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: publication.title,
    author: publication.authors.map((a) => ({ "@type": "Person", name: a.name })),
    datePublished: String(publication.year),
    isPartOf: { "@type": "PublicationVolume", name: publication.venue },
    url: `${siteConfig.url}/publications/${publication.slug}`,
  };
}
