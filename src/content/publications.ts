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
      {
        name: "Utsho Das",
        equalContribution: true,
        avatar: "/media/people/utsho.jpeg",
      },
      {
        name: "Argha Pratim Saha",
        you: true,
        equalContribution: true,
        avatar: "/media/people/portrait-alt.jpg",
      },
      {
        name: "Md Masum",
        avatar: "/media/people/masum-sir.jpg",
        url: "https://www.sust.edu/departments/cse/faculty/masum@sust.edu",
        email: "masum-cse@sust.edu",
      },
      {
        name: "Farida Chowdhury",
        avatar: "/media/people/fdc-maam.jpeg",
        url: "https://cse.bracu.ac.bd/faculty_profile/211/dr_farida_chowdhury",
        email: "farida.chowdhury@bracu.ac.bd",
      },
      {
        name: "Md Sadek Ferdous",
        avatar: "/media/people/sadek-sir.jpg",
        url: "https://www.bracu.ac.bd/about/people/md-sadek-ferdous-phd",
        email: "sadek.ferdous@bracu.ac.bd",
      },
    ],
    summary:
      "Originated from our undergraduate thesis at SUST, where we substantially extended the game design, calibration study, and mixed-methods empirical evaluation with 50 participants to evaluate STRIDE-based smart-home threat learning: accepted at USENIX SOUPS 2026.",
    tags: [
      "STRIDE",
      "Tabletop game",
      "Security awareness",
      "Constructivist learning",
      "Usability",
      "TAM",
      "NASA-TLX",
      "SUS",
      "N=50",
      "Mixed-effects models",
    ],
    links: [{ label: "Read the paper", href: "/papers/cyqured.pdf" }],
    bentoSpan: "feature",
    venueMark: { src: "/media/venues/soups.png", alt: "SOUPS 2026 logo", width: 30, height: 32 },
    heroMark: true,
    affiliation: "Shahjalal University of Science and Technology (SUST)",
    affiliationInfo: {
      department: "Department of Computer Science and Engineering",
      institution: "Shahjalal University of Science and Technology, Sylhet (SUST)",
      location: "Sylhet, Bangladesh",
      logo: "/media/institutions/sust.png",
    },
  },
  {
    slug: "arsenic",
    venue: "27th International Conference on Computer and Information Technology",
    venueShort: "ICCIT 2024",
    year: 2024,
    status: "published",
    title: "A Deep Learning Approach to Automate Classification of Arsenic-Affected Skin using EfficientNet-B1",
    authors: [
      {
        name: "Argha Pratim Saha",
        you: true,
        avatar: "/media/people/portrait-alt.jpg",
      },
      {
        name: "Utsho Das",
        avatar: "/media/people/utsho.jpeg",
      },
      {
        name: "M. Shahidur Rahman",
        role: "Supervisor",
        avatar: "/media/people/shahid-sir.jpg",
        url: "https://www.sust.edu/departments/cse/faculty/rahmanms@sust.edu",
      },
    ],
    summary:
      "An EfficientNet-B1 classifier for automating detection of arsenic-affected skin lesions from clinical photographs.",
    tags: ["Deep learning", "EfficientNet-B1", "Medical imaging"],
    citations: 3,
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=EKrGm9UAAAAJ&citation_for_view=EKrGm9UAAAAJ:9yKSN-GCB0IC",
    links: [
      {
        label: "Read the paper",
        href: "https://doi.org/10.1109/ICCIT64618.2024.10878546",
      },
    ],
    bentoSpan: "normal",
    venueMark: { src: "/media/venues/iccit.jpeg", alt: "ICCIT 2024 logo", width: 88, height: 32 },
    heroMark: true,
    affiliation: "Shahjalal University of Science and Technology (SUST)",
    affiliationInfo: {
      department: "Department of Computer Science and Engineering",
      institution: "Shahjalal University of Science and Technology, Sylhet (SUST)",
      location: "Sylhet, Bangladesh",
      logo: "/media/institutions/sust.png",
    },
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
      {
        name: "Argha Pratim Saha",
        you: true,
        avatar: "/media/people/portrait-alt.jpg",
      },
      { name: "Partha Sarothi Bhowmik" },
      {
        name: "Utsho Das",
        avatar: "/media/people/utsho.jpeg",
      },
      { name: "Minhaj Ahmed" },
    ],
    summary:
      "A text-to-SQL pipeline built on large language models for querying electronic health records, presented in Mexico City.",
    tags: ["LLMs", "Text-to-SQL", "Clinical NLP"],
    citations: 1,
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=EKrGm9UAAAAJ&citation_for_view=EKrGm9UAAAAJ:u-x6o8ySG0sC",
    links: [
      {
        label: "ACL Anthology",
        href: "https://aclanthology.org/2024.clinicalnlp-1.46/",
      },
    ],
    bentoSpan: "normal",
    venueMark: { src: "/media/venues/naacl.webp", alt: "NAACL 2024 logo", width: 32, height: 32 },
    heroMark: true,
    affiliation: "Shahjalal University of Science and Technology (SUST)",
    affiliationInfo: {
      department: "Department of Computer Science and Engineering",
      institution: "Shahjalal University of Science and Technology, Sylhet (SUST)",
      location: "Sylhet, Bangladesh",
      logo: "/media/institutions/sust.png",
    },
  },
];
