import type { Link, NewsItem, VenueCredential } from "./types";

export const profile = {
  name: "Argha Pratim Saha",
  subtitle: "Researcher · Usable Security & Privacy · Human-Computer Interaction · Applied Machine Learning",
  status: "Applying for PhD positions, Fall 2027 intake",
  positioning: "Human-Centered Security · Usable Privacy · Applied Machine Learning",
  bio: "I am a Researcher with a background in usable security, human-computer interaction, and applied machine learning. My research focuses on how people who have never been taught security recognise and respond to digital threats, including phishing, smishing, and other forms of social engineering.",
  location: "Dhaka, Bangladesh",
  email: "[EMAIL_ADDRESS]",
  phone: "+880 1521 200978",
  applyingFor: "Applying for PhD positions, Fall 2027 intake",
  cgpa: "3.71 / 4.00",
  university: "Shahjalal University of Science and Technology (SUST)",
  cvUrl: "/cv.pdf",

  /** The core research philosophy and direction. */
  statement: [
    "Most security advice assumes people who already understand threats and institutional defenses. My research starts from the opposite reality: the individuals most vulnerable to attacks are often those with no security training, shared devices, or formal vocabulary for what they experience.",
    "I build human-centered security interventions and evaluate them empirically through mixed-methods user studies (pre/post assessments, NASA-TLX, SUS, thematic coding) to measure both learning gains and cognitive burdens.",
  ],

  trajectory: [
    "My early work in applied machine learning (medical imaging at ICCIT 2024, clinical text-to-SQL at NAACL 2024) grounded my systems background. It taught me that model accuracy alone does not equal a usable, trustworthy system—leading directly to my focus on usable security in CyQured (SOUPS 2026) and ongoing phishing research at BRAC University.",
  ],

  openQuestionHeading: "Doctoral Research Vision",
  openQuestion:
    "I aim to investigate security mental models, mobile financial risks, and privacy mechanisms in emerging, non-WEIRD environments—such as mobile money ecosystems on shared Android devices—designing and evaluating interventions that hold up under real-world human and socio-technical constraints.",
} as const;

/** The published record, shown in the hero so it lands before any scrolling. */
export const venueCredentials: VenueCredential[] = [
  {
    venue: "USENIX SOUPS 2026",
    note: "Co-first author",
    href: "/publications/cyqured",
  },
  {
    venue: "IEEE ICCIT 2024",
    href: "/publications/arsenic",
  },
  {
    venue: "NAACL 2024 · Clinical NLP",
    href: "/publications/ehrsql-primus-text-to-sql",
  },
];

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
      "Our paper 'CyQured: Design, Development, and Empirical Evaluation of a Tabletop Game for Personal Cybersecurity Education' was accepted at the 22nd USENIX Symposium on Usable Privacy and Security, held in Hanover, Germany in August 2026.",
    link: { label: "CyQured Write-up", href: "/publications/cyqured" },
    secondaryLink: { label: "Paper (PDF)", href: "/papers/cyqured.pdf" },
  },
  {
    date: "Jan 2026",
    badge: "BRAC University",
    title: "Joined BRAC University as a Research Assistant",
    description:
      "Started as a part-time Research Assistant with Dr. Farida Chowdhury, studying how young adults in Bangladesh recognise phishing and smishing, and helping found the Human-Centered Computing and Society (HCCS) research group.",
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
      "Completed B.Sc. (Engg.) in CSE from Shahjalal University of Science and Technology (SUST) with CGPA 3.71 / 4.00, with an undergraduate thesis on usable cybersecurity education.",
    link: { label: "Education Details", href: "#education" },
  },
];

/** Two, not three. The old first and third pillars described the same work
 * twice; the ML pillar is framed as background rather than a parallel track. */
export const pillars = [
  {
    title: "Usable security & empirical HCI",
    body: "I design security interventions and then evaluate them properly: mixed-methods study design, pre/post knowledge assessment, cognitive load and usability instrumentation, and thematic analysis of what participants actually said. CyQured is the worked example, with fifty participants and a set of findings that included the ways the design fell short.",
  },
  {
    title: "Applied machine learning, as background",
    body: "Two published papers in medical imaging and clinical NLP. I still build in this area, but I treat it as the technical grounding underneath human-centered work rather than as a separate research direction.",
  },
] as const;
