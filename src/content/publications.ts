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
        avatar: "/media/people/utsho.webp",
        affiliationMark: 1,
      },
      {
        name: "Argha Pratim Saha",
        you: true,
        equalContribution: true,
        avatar: "/media/people/argha.jpeg",
        affiliationMark: 1,
      },
      {
        name: "Md Sadek Ferdous",
        avatar: "/media/people/sadek-sir.webp",
        url: "https://www.bracu.ac.bd/about/people/md-sadek-ferdous-phd",
        email: "sadek.ferdous@bracu.ac.bd",
        affiliationMark: 2,
      },
      {
        name: "Md Masum",
        avatar: "/media/people/masum-sir.webp",
        url: "https://www.sust.edu/departments/cse/faculty/masum@sust.edu",
        email: "masum-cse@sust.edu",
        affiliationMark: 1,
      },
      {
        name: "Farida Chowdhury",
        avatar: "/media/people/fdc-maam.webp",
        url: "https://cse.bracu.ac.bd/faculty_profile/211/dr_farida_chowdhury",
        email: "farida.chowdhury@bracu.ac.bd",
        affiliationMark: 2,
      },
    ],
    summary:
      "A tabletop game that teaches people to reason about threats in their own smart home, built around STRIDE. It began as our undergraduate thesis at SUST. We then rebuilt the design, ran a calibration study, and evaluated it with fifty participants using pre/post knowledge tests, NASA-TLX, SUS, and interviews.",
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
    cover: {
      src: "/media/publications/cyqured/board-card.webp",
      alt: "The CyQured board. A square track of smart-home devices (wireless router, IP camera, smart TV, thermostat, smartphone) runs around a center that holds the Scenario, Chance and Action card decks.",
      width: 900,
      height: 1155,
    },
    venueMark: { src: "/media/venues/soups.webp", alt: "SOUPS 2026 logo", width: 240, height: 255 },
    heroMark: true,
    heroMarkScale: 0.7,
    affiliation: "Shahjalal University of Science and Technology (SUST)",
    affiliationInfo: [
      {
        department: "Department of Computer Science and Engineering",
        institution: "Shahjalal University of Science and Technology, Sylhet (SUST)",
        location: "Sylhet, Bangladesh",
        logo: "/media/institutions/sust.webp",
        mark: 1,
      },
      {
        department: "Department of Computer Science and Engineering",
        institution: "BRAC University",
        location: "Dhaka, Bangladesh",
        logo: "/media/institutions/bracu.webp",
        mark: 2,
      },
    ],
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
        avatar: "/media/people/argha.jpeg",
      },
      {
        name: "Utsho Das",
        avatar: "/media/people/utsho.webp",
      },
      {
        name: "M. Shahidur Rahman",
        role: "Supervisor",
        avatar: "/media/people/shahid-sir.webp",
        url: "https://www.sust.edu/departments/cse/faculty/rahmanms@sust.edu",
      },
    ],
    summary:
      "An EfficientNet-B1 classifier for automating detection of arsenic-affected skin lesions from clinical photographs.",
    tags: ["Deep learning", "EfficientNet-B1", "Medical imaging"],
    citations: 3,
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=EKrGm9UAAAAJ&citation_for_view=EKrGm9UAAAAJ:9yKSN-GCB0IC",
    doi: "10.1109/ICCIT64611.2024.11022014",
    cover: {
      src: "/media/publications/arsenic/roc-card.webp",
      alt: "ROC curves comparing five architectures, with EfficientNet-B1 highest at AUC 0.98.",
      width: 800,
      height: 600,
    },
    links: [
      {
        label: "Read the paper",
        href: "/papers/iccit.pdf",
      },
    ],
    bentoSpan: "normal",
    venueMark: { src: "/media/venues/iccit-logo.webp", alt: "ICCIT 2024 logo", width: 200, height: 200 },
    heroMark: true,
    affiliation: "Shahjalal University of Science and Technology (SUST)",
    affiliationInfo: [
      {
        department: "Department of Computer Science and Engineering",
        institution: "Shahjalal University of Science and Technology, Sylhet (SUST)",
        location: "Sylhet, Bangladesh",
        logo: "/media/institutions/sust.webp",
      },
    ],
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
        avatar: "/media/people/argha.jpeg",
      },
      { name: "Partha Sarothi Bhowmik" },
      {
        name: "Utsho Das",
        avatar: "/media/people/utsho.webp",
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
    venueMark: { src: "/media/venues/naacl.webp", alt: "NAACL 2024 logo", width: 300, height: 300 },
    heroMark: true,
    affiliation: "Shahjalal University of Science and Technology (SUST)",
    affiliationInfo: [
      {
        department: "Department of Computer Science and Engineering",
        institution: "Shahjalal University of Science and Technology, Sylhet (SUST)",
        location: "Sylhet, Bangladesh",
        logo: "/media/institutions/sust.webp",
      },
    ],
  },
];
