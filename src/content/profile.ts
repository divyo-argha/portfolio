import type { Link, NewsItem } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  subtitle: "Researcher in Human-Centered Security & Privacy",
  /** The breadth line: kept separate from `subtitle` so the hero states one
   * coherent identity first, then the adjacent areas it connects to — rather
   * than opening with a list of topic tags. */
  focusLine: "Usable security & privacy · Human-computer interaction · Security education · Applied machine learning",
  status: "PhD applicant · Fall 2027",
  /** The three structured paragraphs for the About Me narrative. */
  bioParagraphs: [
    "I am a human-centered security and privacy researcher investigating how everyday people perceive, encounter, and defend against deceptive digital threats. My work focuses on non-traditional and vulnerable user populations whose digital lives were never designed around them—particularly those navigating shared devices, varying literacy levels, or constrained institutional protections.",
    "Bridging usable security, human-computer interaction, and applied machine learning, I design tangible educational interventions and evaluate them through rigorous empirical and qualitative field methods. Most recently, I led the creation and empirical evaluation of CyQured, a physical tabletop security game published at USENIX SOUPS 2026, demonstrating how collaborative gameplay can demystify defensive decision-making. My broader background also includes published research in clinical natural language processing at NAACL 2024 and diagnostic deep learning at IEEE ICCIT 2024.",
    "Currently, I conduct research as an RA at BRAC University's Human-Centered Computing and Society (HCCS) group and engineer conversational agent systems at ShellBeeHaken. Looking ahead, I am actively preparing for PhD applications (Fall 2027), where I aim to investigate human-AI security, privacy-preserving interfaces, and algorithmic trust in high-stakes environments.",
  ],
  bio: "I am a human-centered security and privacy researcher investigating how everyday people perceive, encounter, and defend against deceptive digital threats. My work focuses on non-traditional and vulnerable user populations whose digital lives were never designed around them—particularly those navigating shared devices, varying literacy levels, or constrained institutional protections. Bridging usable security, human-computer interaction, and applied machine learning, I design tangible educational interventions and evaluate them through rigorous empirical and qualitative field methods. Most recently, I led the creation and empirical evaluation of CyQured, a physical tabletop security game published at USENIX SOUPS 2026.",
  location: "Dhaka, Bangladesh",
  email: "arghapratimsaha00@gmail.com",
  university: "Shahjalal University of Science and Technology (SUST)",
  cvUrl: "/cv.pdf",
} as const;

/** What ties the work together and where it's headed next, as one short
 * paragraph rather than a philosophy statement plus a list of future-work
 * bullets — `ResearchFocus.tsx` used to split those apart into two full
 * sections; merged back into one on request, kept deliberately brief. */
export const researchFocus = {
  note: "The thread through my work is security and privacy for people systems were never really built around: no training, no device of their own, no vocabulary for what happened to them. I build interventions for that group, then test whether they actually hold up. What I want to work on next is human-AI security, how people trust or get fooled by decisions an AI makes for them, a question CyQured pointed me toward but I haven't published on yet.",
  tags: [
    "Human-centered security",
    "Security & privacy in everyday contexts",
    "Security education",
    "Human-AI security",
    "Applied machine learning",
  ],
};

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
    title: "Paper Published at USENIX SOUPS 2026",
    description:
      "Our paper 'CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education' was published at the 22nd USENIX Symposium on Usable Privacy and Security in Hanover, Germany.",
    link: { label: "CyQured Write-up", href: "/publications/cyqured" },
    secondaryLink: { label: "Paper (PDF)", href: "https://www.usenix.org/system/files/soups2026-das.pdf" },
  },
  {
    date: "Jan 2026",
    badge: "BRAC University",
    title: "Joined BRAC University as a Research Assistant",
    description:
      "Joined Dr. Farida Chowdhury's group part-time to study how young adults in Bangladesh read phishing and smishing attempts. I am also a founding member of the new Human-Centered Computing and Society (HCCS) research group.",
    link: { label: "Experience", href: "#experience" },
  },
  {
    date: "Oct 2025",
    badge: "ShellBeeHaken",
    title: "Joined ShellBeeHaken Ltd. as an Associate Software Engineer",
    description:
      "Joined the team building KriyaKarak, working on front-end modules and a Bengali-English code-switching framework for a real-time conversational voice agent, plus the WebSocket layer carrying its audio.",
    link: { label: "Experience", href: "#experience" },
  },
  {
    date: "Jul 2025",
    badge: "SUST",
    title: "Graduated with B.Sc. in Computer Science & Engineering",
    description:
      "Completed B.Sc. (Engg.) in CSE at Shahjalal University of Science and Technology with a CGPA of 3.71 / 4.00. My undergraduate thesis grew into CyQured.",
    link: { label: "Education Details", href: "#education" },
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
];
