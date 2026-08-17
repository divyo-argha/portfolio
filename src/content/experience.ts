import type { Position } from "./types";

const bracuLogo = { src: "/media/institutions/bracu.png", alt: "BRAC University logo", width: 56, height: 52 };
const shellbeehakenLogo = { src: "/media/institutions/shellbeehaken.jpeg", alt: "ShellBeeHaken logo", width: 56, height: 56 };
const hccsLogo = { src: "/media/institutions/hccs.jpeg", alt: "Human-Centered Computing and Society (HCCS) logo", width: 56, height: 56 };

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
    kind: "leadership",
    title: "Student Executive Co-Coordinator & Founding Member",
    org: "Human-Centered Computing and Society (HCCS)",
    dates: "Jan 2026 – Present",
    detail: "BRAC University",
    bullets: [
      "Founding member and Student Executive Co-Coordinator of the Human-Centered Computing and Society (HCCS) research group, driving executive operations and student leadership.",
      "Leading and coordinating student research initiatives, reading groups, and workshops on digital accessibility and usable privacy.",
      "Directing cross-institutional HCI outreach, collaborative research seminars, and peer mentorship programs for student researchers.",
    ],
    link: { label: "website", href: "https://sites.google.com/bracu.ac.bd/hccs" },
    logo: hccsLogo,
  },
];
