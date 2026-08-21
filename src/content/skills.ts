import type { MethodGroup } from "./types";

/** Methods grouped under the study that used them. A flat list of method
 * names reads as vocabulary; attached to a study and a sample size, the same
 * list reads as experience — which is what it actually is. */
export const methodGroups: MethodGroup[] = [
  {
    study: "CyQured · tabletop security education",
    context: "N = 50 · USENIX SOUPS 2026",
    href: "/publications/cyqured",
    methods: [
      "Mixed-methods study design",
      "Pre/post knowledge assessment",
      "NASA-TLX (cognitive load)",
      "System Usability Scale (SUS)",
      "Technology Acceptance Model (TAM)",
      "Linear mixed-effects models",
      "Semi-structured interviews",
      "Thematic analysis",
      "Calibration / pilot study",
    ],
  },
  {
    study: "Phishing & smishing recognition",
    context: "BRAC University · manuscript in preparation",
    methods: [
      "Threat scenario design",
      "Participant recruitment & consent protocols",
      "Qualitative coding",
      "Interview protocol design",
    ],
  },
  {
    study: "Arsenic classification & EHRSQL text-to-SQL",
    context: "IEEE ICCIT 2024 · NAACL 2024",
    href: "/publications/arsenic",
    methods: [
      "Comparative model evaluation",
      "Confusion matrix & ROC analysis",
      "Transfer-learning ablations",
      "Dataset augmentation & splitting",
    ],
  },
];

export const skillGroups = [
  { label: "Languages", items: ["C/C++", "Python", "Go", "JavaScript", "TypeScript", "Java"] },
  {
    label: "Web & systems",
    items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "WebSockets", "MySQL", "MongoDB", "Qdrant"],
  },
  { label: "Analysis & writing", items: ["R", "Python statistical libraries", "LaTeX", "Git"] },
];
