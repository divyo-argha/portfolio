import type { Position } from "./types";

const bracuLogo = { src: "/media/institutions/bracu.webp", alt: "BRAC University logo", width: 56, height: 52 };
const shellbeehakenLogo = { src: "/media/institutions/shellbeehaken.webp", alt: "ShellBeeHaken logo", width: 56, height: 56 };
const hccsLogo = { src: "/media/institutions/hccs.webp", alt: "Human-Centered Computing and Society (HCCS) logo", width: 56, height: 56 };

export const positions: Position[] = [
  {
    kind: "research",
    title: "Research Assistant (part-time)",
    org: "BRAC University, Dhaka",
    dates: "Jan 2026 – Present",
    detail: "Supervisor: Dr. Farida Chowdhury",
    bullets: [
      "Studying how young adults in Bangladesh read phishing and smishing attempts, and building interventions that assume no prior security knowledge.",
      "Carrying the evaluation framework and threat scenarios from CyQured over to home network and mobile contexts.",
      "Mentoring undergraduate thesis groups on problem formulation, study design, qualitative coding, and academic writing.",
    ],
    link: { label: "website", href: "https://www.bracu.ac.bd/" },
    logo: bracuLogo,
  },
  {
    kind: "leadership",
    title: "Student Executive Co-Coordinator & Founding Member",
    org: "Human-Centered Computing and Society (HCCS)",
    dates: "Jan 2026 – Present",
    detail: "BRAC University",
    bullets: [
      "Run the reading group on usable privacy and digital accessibility, and pick most of the papers we work through.",
      "Mentor undergraduates on their first research project, mostly on how to frame a question and scope it down to something they can finish.",
    ],
    link: { label: "website", href: "https://hccs.cse.bracu.ac.bd/" },
    logo: hccsLogo,
  },
  {
    kind: "industry",
    title: "Associate Software Engineer",
    org: "ShellBeeHaken Ltd., Dhaka",
    dates: "Oct 2025 – Present",
    bullets: [
      "Built front-end modules for KriyaKarak, including expert profiles and the reservation flow, plus end-to-end tests across the stack.",
      "Designed a Bengali-English code-switching framework for a real-time conversational voice agent. A retrieval-augmented generation (RAG) pipeline sits behind it and keeps the answers grounded.",
      "Engineered the WebSocket layer that carries two-way audio between the client and the agent at low latency.",
    ],
    link: { label: "website", href: "https://shellbeehaken.com/" },
    logo: shellbeehakenLogo,
  },
];
