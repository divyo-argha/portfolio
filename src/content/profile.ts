import type { FutureDirection, Link, NewsItem } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  subtitle: "Researcher in Human-Centered Security & Privacy",
  /** The breadth line: kept separate from `subtitle` so the hero states one
   * coherent identity first, then the adjacent areas it connects to — rather
   * than opening with a list of topic tags. */
  focusLine: "Usable security & privacy · Human-computer interaction · Security education · Applied machine learning",
  status: "PhD applicant · Fall 2027",
  /** Leads with the general research question, then the concrete work that
   * question has produced so far — not the reverse, so the identity doesn't
   * read as narrower than it is. */
  bio: "My research looks at people whose digital lives were never designed around them: how they notice, understand, and respond to security and privacy risks when systems, interfaces, and security mechanisms don't line up with what they know, expect, or have access to. Most of my work so far has followed that question into phishing, smishing, and the kind of social engineering that arrives on a shared phone. I build interventions for that gap, then run studies to find out whether they hold up. The most recent is CyQured, a tabletop security game accepted at USENIX SOUPS 2026.",
  location: "Dhaka, Bangladesh",
  email: "arghapratimsaha00@gmail.com",
  university: "Shahjalal University of Science and Technology (SUST)",
  cvUrl: "/cv.pdf",

  /** The core research philosophy and direction. */
  statement: [
    "Most security advice is written for people who already understand the threat and have an institution standing behind them. I start from the other end. The people most exposed to attacks usually have no training, no device of their own, and no vocabulary for what happened to them.",
    "So I build interventions for that group, then evaluate them properly. Pre/post knowledge assessment, NASA-TLX, SUS, interviews, thematic coding. I want to know what people learned and what it cost them to learn it.",
  ],
} as const;

/** What ties the work together, and where it might go next. Kept apart from
 * `profile.statement` (what I already do) because a PhD-facing site should be
 * clear about which is which — see each item's optional `status`. */
export const futureDirections: {
  unifyingThread: string;
  items: FutureDirection[];
  closingNote: string;
} = {
  unifyingThread:
    "The constant across my work is security and privacy for people the system was never designed around — cases where the assumptions built into a system don't match the people, contexts, or knowledge it's actually used by.",
  items: [
    {
      title: "Human-centered security",
      body: "How people form expectations about security mechanisms, and where those expectations break down.",
    },
    {
      title: "Security & privacy in everyday contexts",
      body: "How people make security decisions with limited knowledge, competing priorities, or unfamiliar systems — shared Android phones, mobile money, first-time internet users well outside the WEIRD sample.",
    },
    {
      title: "Security education",
      body: "How security education moves past one-off awareness into something that actually changes decisions later. CyQured is one attempt at that question, not the last one.",
    },
    {
      title: "Human-AI security",
      status: "emerging",
      body: "How people understand, trust, and respond to security decisions that are made or mediated by AI systems. I haven't published in this space yet — it's where I want to extend the human-factors approach I already use.",
    },
  ],
  closingNote:
    "What matters to me is that whatever we build survives contact with real users, real devices, and real constraints. I'm equally open to reaching these questions through human factors and study design, through systems and applied security, or through machine learning for detection and risk.",
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
