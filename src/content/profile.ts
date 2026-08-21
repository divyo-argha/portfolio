import type { Link, NewsItem } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  subtitle: "Computer Science · Research · SUST",
  status: "Open to PhD opportunities for Fall 2027",
  positioning: "Human-Centered Security · Usable Privacy · Applied Machine Learning",
  bio: "I am a Computer Science graduate from Shahjalal University of Science and Technology (SUST). My research focuses on usable security, human-centered computing, and empirical software systems—designing and evaluating technologies where security mechanisms interact with real-world users and constraints. My work spans empirical HCI, privacy education, and data-driven intelligent systems.",
  location: "Dhaka, Bangladesh",
  email: "arghastm@gmail.com",
  phone: "+880 1521 200978",
  applyingFor: "Applying for PhD positions, Fall 2027 intake",
  cgpa: "3.71 / 4.00",
  university: "Shahjalal University of Science and Technology (SUST)",
  cvUrl: "/cv.pdf",
  researchIntro:
    "My research interests lie at the intersection of usable security, human-centered computing, and applied machine learning. I investigate how humans interact with security and privacy mechanisms, and build empirical and computational tools to make complex systems more trustworthy, interpretable, and resilient.",
  openDirections:
    "I am eager to pursue doctoral research exploring usable security, privacy-enhancing technologies, trustworthy AI, human-AI interaction, and empirical software engineering, building upon my background in experimental study design, algorithmic problem solving, and intelligent systems.",
} as const;

export const socialLinks: Link[] = [
  { label: "CV (PDF)", href: "/cv.pdf" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en" },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: "https://github.com/divyo-argha" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/argha-pratim-saha-a25b502b5/" },
];

export const news: NewsItem[] = [
  {
    date: "Jul 2026",
    badge: "USENIX SOUPS 2026",
    title: "Paper Accepted at USENIX SOUPS 2026",
    description:
      "Our research paper 'CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education' has been accepted at the 22nd USENIX Symposium on Usable Privacy and Security.",
    link: { label: "CyQured Write-up", href: "/publications/cyqured" },
    secondaryLink: { label: "Paper (PDF)", href: "/papers/cyqured.pdf" },
  },
  {
    date: "Nov 2024",
    badge: "IEEE ICCIT 2024",
    title: "Presented & Published at IEEE ICCIT 2024",
    description:
      "Presented and published 'A Deep Learning Approach to Automate Classification of Arsenic-Affected Skin using EfficientNet-B1' at the 27th International Conference on Computer and Information Technology.",
    link: { label: "Arsenic Write-up", href: "/publications/arsenic" },
    secondaryLink: { label: "IEEE Xplore", href: "https://doi.org/10.1109/ICCIT64611.2024.11022014" },
  },
  {
    date: "Jun 2024",
    badge: "NAACL 2024",
    title: "Presented PRIMUS Online at NAACL Clinical NLP Workshop",
    description:
      "Presented 'Project PRIMUS at EHRSQL 2024: Text-to-SQL Generation using Large Language Models for EHR Analysis' online at the 6th Clinical NLP Workshop (NAACL 2024).",
    link: { label: "PRIMUS Write-up", href: "/publications/ehrsql-primus-text-to-sql" },
    secondaryLink: { label: "ACL Anthology", href: "https://aclanthology.org/2024.clinicalnlp-1.46/" },
  },
  {
    date: "2024",
    badge: "SUST",
    title: "Graduated with B.Sc. in Computer Science & Engineering",
    description:
      "Completed B.Sc. (Engg.) in CSE from Shahjalal University of Science and Technology (SUST) with CGPA 3.71 / 4.00, completing an undergraduate thesis on usable cybersecurity education.",
    link: { label: "Education Details", href: "#education" },
  },
];

export const pillars = [
  {
    title: "Usable Security, Privacy & Empirical HCI",
    body: "My primary research investigates human-centered security, security mental models, and empirical evaluations. I design and evaluate security interventions—ranging from educational games to threat modeling interfaces—using rigorous mixed-methods studies, constructivist frameworks, and statistical modeling.",
  },
  {
    title: "Applied Machine Learning & Intelligent Systems",
    body: "I apply machine learning, computer vision, and NLP to real-world domain challenges, including clinical text-to-SQL pipelines (NAACL 2024) and medical skin lesion classification (IEEE ICCIT 2024), grounding computational methods in practical utility.",
  },
  {
    title: "Human-Centered Computing & Experimental Methods",
    body: "My research methodology combines qualitative user studies (interviews, thematic analysis) with quantitative evaluations (NASA-TLX, SUS, TAM, and mixed-effects linear regression models) to evaluate learning gains, cognitive workload, and usability.",
  },
] as const;
