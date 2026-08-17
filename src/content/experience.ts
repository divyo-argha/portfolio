import type { Position } from "./types";

const bracuLogo = { src: "/media/venues/bracu.png", alt: "BRAC University logo", width: 32, height: 29 };
const sustLogo = { src: "/media/venues/sust.png", alt: "SUST logo", width: 32, height: 32 };
const shellbeehakenLogo = { src: "/media/venues/shellbeehaken.jpeg", alt: "ShellBeeHaken logo", width: 32, height: 32 };

export const positions: Position[] = [
  {
    kind: "education",
    title: "BSc in Computer Science and Engineering",
    org: "Shahjalal University of Science and Technology (SUST), Sylhet",
    dates: "Feb 2020 – Jul 2025",
    detail: "CGPA 3.71 / 4.00 · Supervisors: Md Masum, Dr. Farida Chowdhury, Dr. Md Sadek Ferdous",
    bullets: [
      "Thesis: designed a tabletop game mapping the STRIDE threat framework onto smart-home scenarios, so people without a security background can reason about concrete threats.",
      "Ran a calibration study for the knowledge test, then a mixed-methods evaluation with 50 undergraduate participants.",
      "Analysed pre/post-test results with linear mixed-effects models, finding significant gains in threat identification alongside high usability scores.",
    ],
    logo: sustLogo,
  },
  {
    kind: "industry",
    title: "Associate Software Engineer",
    org: "ShellBeeHaken Ltd., Dhaka",
    dates: "Oct 2025 – Present",
    bullets: [
      "Built front-end modules for KriyaKarak, including expert profiles and the reservation flow, with end-to-end testing across the stack.",
      "Designed a Bengali–English code-switching framework for a real-time conversational voice agent, backed by a retrieval-augmented pipeline to keep responses grounded.",
      "Built the WebSocket layer for low-latency two-way voice streaming between users and the agent.",
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
      "Studying how young adults in Bangladesh understand and respond to phishing and smishing, designing interventions that don't assume prior security knowledge.",
      "Extending the evaluation methods from CyQured to home network threat scenarios.",
      "Mentoring undergraduate thesis groups on problem formulation, literature review, study design, and writing.",
    ],
    logo: bracuLogo,
  },
  {
    kind: "service",
    title: "Member, Human-Centered Computing Society (HCCS)",
    org: "BRAC University, Dhaka",
    dates: "Jan 2026 – Present",
    bullets: ["Participate in digital accessibility workshops and cross-institutional HCI activities."],
    link: { label: "HCCS website", href: "https://sites.google.com/bracu.ac.bd/hccs" },
    logo: bracuLogo,
  },
];
