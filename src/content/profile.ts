import type { Link, NewsItem } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  subtitle: "Researcher · Usable Security & Privacy · Human-Computer Interaction · Applied Machine Learning",
  status: "PhD applicant · Fall 2027 intake",
  bio: "My research looks at how people who were never taught security recognize and respond to digital threats: phishing, smishing, and the kind of social engineering that arrives on a shared phone. I build interventions for that gap, then run studies to find out whether they hold up. The most recent is CyQured, a tabletop security game accepted at USENIX SOUPS 2026.",
  location: "Dhaka, Bangladesh",
  email: "arghapratimsaha00@gmail.com",
  university: "Shahjalal University of Science and Technology (SUST)",
  cvUrl: "/cv.pdf",

  /** The core research philosophy and direction. */
  statement: [
    "Most security advice is written for people who already understand the threat and have an institution standing behind them. I start from the other end. The people most exposed to attacks usually have no training, no device of their own, and no vocabulary for what happened to them.",
    "So I build interventions for that group, then evaluate them properly. Pre/post knowledge assessment, NASA-TLX, SUS, interviews, thematic coding. I want to know what people learned and what it cost them to learn it.",
  ],

  openQuestionHeading: "What I want to work on next",
  openQuestion:
    "The constant in my work is security and privacy for people the system was never designed around. Shared Android phones, mobile money, first-time internet users well outside the WEIRD sample. The angle is open. I am equally interested in reaching that problem through human factors and study design, through systems and applied security, or through machine learning for detection and risk. What matters to me is that whatever we build survives contact with real users, real devices, and real constraints.",
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
      "Our paper 'CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education' was accepted at the 22nd USENIX Symposium on Usable Privacy and Security in Hanover, Germany.",
    link: { label: "CyQured Write-up", href: "/publications/cyqured" },
    secondaryLink: { label: "Paper (PDF)", href: "/papers/cyqured.pdf" },
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
      "Completed B.Sc. (Engg.) in CSE at Shahjalal University of Science and Technology with a CGPA of 3.71 / 4.00. My undergraduate thesis grew into CyQured.",
    link: { label: "Education Details", href: "#education" },
  },
];

/** Two, not three. The old first and third pillars described the same work
 * twice; the ML pillar is framed as grounding rather than a parallel track. */
export const pillars = [
  {
    title: "Usable security & empirical HCI",
    body: "I design security interventions and then evaluate them properly. Mixed-methods study design, pre/post knowledge assessment, cognitive load and usability instrumentation, thematic analysis of what participants actually said. CyQured is the worked example: fifty participants, and a set of findings that included the places where the design fell short.",
  },
  {
    title: "Applied machine learning",
    body: "Two published papers, one in medical imaging and one in clinical NLP. I still build and read in this space. For me it sits underneath the human-centered work rather than beside it, though the two keep meeting around detection, risk scoring, and anything that has to explain itself to a non-expert user.",
  },
] as const;
