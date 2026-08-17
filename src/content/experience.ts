import type { Position } from "./types";

const bracuLogo = { src: "/media/institutions/bracu.png", alt: "BRAC University logo", width: 56, height: 52 };
const shellbeehakenLogo = { src: "/media/institutions/shellbeehaken.jpeg", alt: "ShellBeeHaken logo", width: 56, height: 56 };
const hccsLogo = { src: "/media/institutions/hccs.jpeg", alt: "Human-Centered Computing Society (HCCS) logo", width: 56, height: 56 };

export const positions: Position[] = [
  {
    kind: "industry",
    title: "Associate Software Engineer",
    org: "ShellBeeHaken Ltd., Dhaka",
    dates: "Oct 2025 – Present",
    bullets: [
      "Built front-end modules for KriyaKarak, including expert profiles and the reservation flow, with end-to-end testing across the stack.",
      "Designed a Bengali–English code-switching framework for a real-time conversational voice agent, backed by a retrieval-augmented generation (RAG) pipeline to keep responses grounded.",
      "Engineered the WebSocket layer for low-latency, two-way audio streaming between clients and the conversational agent.",
    ],
    logo: shellbeehakenLogo,
  },
  {
    kind: "research",
    title: "Research Assistant (part-time)",
    org: "BRAC University, Dhaka",
    dates: "Jan 2026 – Present",
    detail: "Supervisor: Dr. Farida Chowdhury",
    bullets: [
      "Studying how young adults in Bangladesh understand and respond to phishing and smishing, designing usable interventions that don't assume prior cybersecurity knowledge.",
      "Extending evaluation frameworks and threat scenario design from CyQured to broader home and mobile network contexts.",
      "Mentoring undergraduate thesis groups on problem formulation, experimental study design, qualitative coding, and scholarly writing.",
    ],
    logo: bracuLogo,
  },
  {
    kind: "service",
    title: "Member, Human-Centered Computing Society (HCCS)",
    org: "BRAC University, Dhaka",
    dates: "Jan 2026 – Present",
    bullets: [
      "Participating in digital accessibility research, usable technology workshops, and cross-institutional HCI & privacy initiatives.",
      "Collaborating on community outreach and empirical usability testing for emerging software tools.",
    ],
    link: { label: "HCCS website", href: "https://sites.google.com/bracu.ac.bd/hccs" },
    logo: hccsLogo,
  },
];
