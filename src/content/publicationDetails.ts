import type { Block } from "./types";

/** Extra body content for each publication's detail page, keyed by slug. */
export const publicationDetails: Record<string, Block[]> = {
  // Titled shell only — Argha will add board/gameplay photography and card
  // galleries here later. Adding them is a pure data edit: append `gallery`
  // blocks below, drop images in public/media/cyqured/.
  cyqured: [],

  "arsenic-classification-efficientnet-b1": [
    {
      kind: "prose",
      body: [
        "Arsenic contamination in groundwater remains a major public health issue in Bangladesh, and skin lesions are often the earliest visible sign of chronic exposure. Manual screening by dermatologists is accurate but doesn't scale to the population at risk.",
        "This work fine-tunes an EfficientNet-B1 classifier on clinical photographs to automate detection of arsenic-affected skin, aiming for a lightweight model that could plausibly run in low-resource clinical settings.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Architecture", value: "EfficientNet-B1" },
        { label: "Venue", value: "ICCIT 2024" },
        { label: "Focus", value: "Clinical image classification" },
      ],
    },
  ],

  "ehrsql-primus-text-to-sql": [
    {
      kind: "prose",
      body: [
        "Project PRIMUS was built for the EHRSQL 2024 shared task at the 6th Clinical Natural Language Processing Workshop (NAACL 2024), which asks systems to translate natural-language clinical questions into SQL queries over electronic health records.",
        "The team's pipeline used large language models for text-to-SQL generation, with attention to the reliability failure modes that matter most in a clinical setting — malformed queries and unanswerable questions.",
      ],
    },
    {
      kind: "findings",
      items: [
        { label: "Task", value: "Text-to-SQL over EHR data" },
        { label: "Venue", value: "NAACL 2024 · CLNLP Workshop" },
        { label: "Location", value: "Mexico City" },
      ],
    },
  ],
};
