import type { Publication } from "./types";

export const publications: Publication[] = [
  {
    slug: "cyqured",
    venue: "USENIX Symposium on Usable Privacy and Security",
    venueShort: "SOUPS 2026",
    year: 2026,
    status: "accepted",
    title:
      "CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education",
    authors: [
      { name: "Utsho Das", equalContribution: true },
      { name: "Argha Pratim Saha", you: true, equalContribution: true },
      { name: "Md Sadek Ferdous" },
      { name: "Md Masum" },
      { name: "Farida Chowdhury" },
    ],
    summary:
      "A tabletop game mapping the STRIDE threat framework onto smart-home scenarios, evaluated with 50 participants using pre/post knowledge testing and linear mixed-effects models.",
    tags: ["STRIDE", "Tabletop game", "N=50", "Mixed-effects models", "SUS"],
    bentoSpan: "feature",
    venueMark: { src: "/media/venues/soups.png", alt: "SOUPS 2026 logo", width: 30, height: 32 },
  },
  {
    slug: "arsenic-classification-efficientnet-b1",
    venue: "27th International Conference on Computer and Information Technology",
    venueShort: "ICCIT 2024",
    year: 2024,
    status: "published",
    title: "A Deep Learning Approach to Automate Classification of Arsenic-Affected Skin using EfficientNet-B1",
    authors: [
      { name: "Argha Pratim Saha", you: true },
      { name: "Utsho Das" },
      { name: "Shahidur Rahman" },
    ],
    summary:
      "An EfficientNet-B1 classifier for automating detection of arsenic-affected skin lesions from clinical photographs.",
    tags: ["Deep learning", "EfficientNet-B1", "Medical imaging"],
    bentoSpan: "normal",
    venueMark: { src: "/media/venues/iccit.jpeg", alt: "ICCIT 2024 logo", width: 88, height: 32 },
  },
  {
    slug: "ehrsql-primus-text-to-sql",
    venue: "6th Clinical Natural Language Processing Workshop, NAACL 2024",
    venueShort: "NAACL 2024 · CLNLP",
    year: 2024,
    status: "published",
    title: "Project PRIMUS at EHRSQL 2024: Text-to-SQL Generation using Large Language Models for EHR Analysis",
    authors: [
      { name: "Sourav Bhowmik Joy" },
      { name: "Rohan Ahmed" },
      { name: "Argha Pratim Saha", you: true },
      { name: "Partha Sarothi Bhowmik" },
      { name: "Utsho Das" },
      { name: "Minhaj Ahmed" },
    ],
    summary:
      "A text-to-SQL pipeline built on large language models for querying electronic health records, presented in Mexico City.",
    tags: ["LLMs", "Text-to-SQL", "Clinical NLP"],
    bentoSpan: "normal",
    venueMark: { src: "/media/venues/naacl.webp", alt: "NAACL 2024 logo", width: 32, height: 32 },
  },
];
