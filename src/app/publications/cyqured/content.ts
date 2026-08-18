import type { Block } from "@/content/types";

/** Content for the CyQured page's three data-driven tabs (Overview, How to
 * Play, Study & Results). Rendered through the shared `BlockRenderer`, which
 * reads design tokens as CSS custom properties — so this content picks up
 * CyQured's own brand palette from the page's scope wrapper for free. The
 * fourth tab, Cards & Board, is a bespoke interactive component instead
 * (see CardCatalogue) since it needs filtering/enlarge behavior BlockRenderer
 * doesn't support. */

export const overviewBlocks: Block[] = [
  {
    kind: "prose",
    body: [
      "CyQured models a digital home of 16 connected devices — router, laptop, smart speaker, IP camera, and more — as a Monopoly-style tabletop board. Players acquire, attack, and defend those devices through 16 STRIDE-inspired threat/mitigation pairs, learning home cybersecurity by playing both sides of the fight rather than reading about it.",
      "Originated as an undergraduate thesis at SUST, substantially extended with a 50-participant mixed-methods evaluation (knowledge assessments, SUS, TAM, NASA-TLX, and thematic analysis of interviews) — accepted to USENIX SOUPS 2026.",
    ],
  },
  {
    kind: "heroStat",
    value: "50",
    label: "university students playtested the study — 13 with prior security coursework, 37 without",
  },
  {
    kind: "statGrid",
    heading: "What's on the table",
    columns: 5,
    items: [
      { value: "16", label: "connected devices" },
      { value: "68", label: "action cards (attack + defense)" },
      { value: "30", label: "chance cards" },
      { value: "20", label: "scenario cards" },
      { value: "28", label: "board cells" },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Three contributions",
    columns: 3,
    items: [
      {
        title: "A home-context learning artifact",
        body: "Models a connected home ecosystem and maps STRIDE-inspired threats into accessible, facilitator-independent gameplay — no expert needs to run the session.",
      },
      {
        title: "Evidence of a learning/usability trade-off",
        body: "A mixed-methods study with 50 students shows measurable knowledge gains alongside real usability and cognitive-load challenges for non-expert players.",
      },
      {
        title: "Design insights for low-barrier security games",
        body: "How terminology, onboarding, and prior tabletop familiarity shape engagement — extending prior work on security mental models and training.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Why not just play Riskio or Cyber Threat Defender?",
    columns: 2,
    items: [
      {
        title: "Home, not enterprise",
        body: "Riskio, CyberCIEGE, and similar tools assume institutional resources and an IT-manager role — CyQured targets an individual securing their own home.",
      },
      {
        title: "No facilitator required",
        body: "Riskio, Security Cards, and Elevation of Privilege all lean on an expert running the session — excluding exactly the novice users who'd benefit most.",
      },
      {
        title: "Holistic, not one skill",
        body: "Anti-Phishing Phil, GAP, and Cyber Suraksha each teach a single isolated skill (phishing, passwords, permissions) rather than ecosystem-level reasoning.",
      },
      {
        title: "Attack and defense, not just attack",
        body: "Hacknet, Control-Alt-Hack, and d0x3d! play up the thrill of attacking; CyQured spends equal weight on choosing and justifying a defense.",
      },
    ],
  },
];

export const howToPlayBlocks: Block[] = [
  {
    kind: "prose",
    body: [
      "Each player starts with 8 cards, 50 credit points, and a token on GO. The rest of the action deck, plus 30 chance and 20 scenario cards, sit face-down on the board. Play proceeds around the table until an end condition is reached.",
    ],
  },
  {
    kind: "pipeline",
    heading: "A turn",
    steps: [
      { label: "Roll & move" },
      { label: "Land on a cell" },
      { label: "Resolve it", highlight: true },
      { label: "Next player" },
    ],
  },
  {
    kind: "prose",
    heading: "Resolving a cell",
    body: [
      "Unowned device: pay its point value and claim the asset card. Device already owned by someone else: pay a partial toll, or attack — play an attack card and the owner responds with a defense card. A successful defense costs the attacker nothing extra; a failed one hands the attacker points, or eventually the asset itself.",
      "The router and home server are special: because compromising a gateway or NAS has an outsized blast radius, they can change hands after a single failed defense, instead of the usual repeated failures other devices allow.",
      "One rule does a lot of pedagogical work: players must read the card text aloud and justify their attack or defense choice to the table. That forced verbal justification is a deliberate literacy mechanism, not flavor text.",
    ],
  },
  {
    kind: "cardGrid",
    heading: "Special cells & mechanics",
    columns: 3,
    items: [
      { title: "GO", body: "Grants points and action cards each time a player completes a lap." },
      { title: "STOP", body: "Skip a turn — represents forced updates or device downtime." },
      { title: "Power Outage", body: "Temporarily deactivates every asset on the board." },
      { title: "Card Penalty", body: "Discard from hand — adds pressure without a knowledge check." },
      { title: "Chance", body: "A short unpredictable event; teaches risk assessment under uncertainty." },
      { title: "Scenario", body: "An open-ended incident — name the STRIDE category. Right answers earn points; wrong ones cost nothing, to keep frustration low." },
      {
        title: "Color-Group Immunity",
        body: "Own every device in a color group and you're immune to attacks on it, with increased point gains — a Monopoly-derived motivator, not a security analog.",
      },
      {
        title: "Router & Home Server",
        body: "Highest-value cells (18 and 20 points) — a single failed defense is enough to lose them, reflecting real gateway/NAS blast radius.",
      },
      {
        title: "Optional Game Master",
        body: "CyQured plays fully without one; an optional facilitator can add pedagogical color, but every rule is designed to be self-taught from the manual.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Three ways a game ends — the table picks one before starting",
    columns: 3,
    items: [
      { title: "Elimination", body: "Players with no points or assets are out. Last one standing wins." },
      { title: "Timed", body: "Play for a fixed duration; highest combined score at the buzzer wins." },
      { title: "Target score", body: "First player to reach an agreed total wins." },
    ],
  },
];

export const studyBlocks: Block[] = [
  {
    kind: "prose",
    body: [
      "Two questions drove the evaluation: how effective is CyQured at improving cybersecurity knowledge across technical backgrounds (RQ1), and how do usability, cognitive load, and technology acceptance differ between students with and without a security background (RQ2)?",
      "50 university students played in groups of 4–5 for about an hour, each taking a 10-item knowledge test before and after, then SUS, TAM, and NASA-TLX questionnaires. A separate 20-person control group took the same pre/post test 60 minutes apart with no gameplay in between, to rule out a simple practice effect.",
    ],
  },
  {
    kind: "statGrid",
    heading: "Who played",
    columns: 5,
    items: [
      { value: "50", label: "total participants", highlight: true },
      { value: "13", label: "security coursework (SC)" },
      { value: "37", label: "no coursework (NC)" },
      { value: "23", label: "NC, knew Monopoly" },
      { value: "14", label: "NC, didn't know Monopoly" },
    ],
  },
  {
    kind: "barChart",
    heading: "Knowledge gain by group (points out of 10, post-test minus pre-test)",
    unit: " pt",
    items: [
      { label: "SC", value: 3.38, highlight: true },
      { label: "All players", value: 2.32 },
      { label: "NC", value: 1.95 },
    ],
  },
  {
    kind: "findings",
    items: [
      { label: "Effect size", value: "SC d = 1.88, NC d = 1.62 — both p < .001" },
      { label: "Control group (no gameplay, N = 20)", value: "−0.20 pts, p = .58 (not significant) — rules out a practice effect" },
    ],
  },
  {
    kind: "prose",
    body: [
      "Prior board-game familiarity didn't affect how much knowledge players gained (t(35) = .07, p = .95) — but it strongly affected how the game felt to play.",
    ],
  },
  {
    kind: "barChart",
    heading: "System Usability Scale by group (0–100; 68 is the standard “acceptable” benchmark)",
    unit: "",
    items: [
      { label: "SC", value: 80.6, highlight: true },
      { label: "All", value: 70.0 },
      { label: "NC", value: 66.3 },
    ],
  },
  {
    kind: "barChart",
    heading: "SUS within the NC group, split by prior Monopoly experience",
    unit: "",
    items: [
      { label: "Knew Monopoly", value: 73.7, highlight: true },
      { label: "Never played Monopoly", value: 54.1 },
    ],
  },
  {
    kind: "barChart",
    heading: "Technology acceptance — security-coursework students (mean, out of 5)",
    unit: "",
    items: [
      { label: "Ease of use", value: 4.42 },
      { label: "Usefulness", value: 4.26 },
      { label: "Attitude", value: 4.85, highlight: true },
      { label: "Intent to use", value: 4.54 },
    ],
  },
  {
    kind: "barChart",
    heading: "Technology acceptance — no-coursework students (mean, out of 5)",
    unit: "",
    items: [
      { label: "Ease of use", value: 4.09 },
      { label: "Usefulness", value: 4.25 },
      { label: "Attitude", value: 4.61, highlight: true },
      { label: "Intent to use", value: 4.43 },
    ],
  },
  {
    kind: "prose",
    heading: "Cognitive load (NASA-TLX)",
    body: [
      "The no-coursework group reported higher Mental Demand and Effort than the security-coursework group — and within that group, students with no prior tabletop-gaming experience reported the highest load of anyone, consistent with learning game mechanics and security concepts at the same time. Both groups rated their own Performance highly regardless — the difficulty read as a challenge, not a failure.",
    ],
  },
  {
    kind: "quote",
    text: "How did participants with no security background and no tabletop experience achieve substantial knowledge gains despite a usability score usually associated with poor acceptance? We refer to this tension as the CyQured Paradox.",
    attribution: "Discussion · CyQured, SOUPS 2026",
  },
  {
    kind: "prose",
    body: [
      "High perceived usefulness and a positive attitude appear to act as a motivational reserve that carries players through mechanical friction — consistent with “desirable difficulties” in learning research and “productive struggle” in serious games.",
    ],
  },
  {
    kind: "findings",
    heading: "What players said",
    items: [
      { label: "Perceived complexity (P27, novice)", value: "“There are just too many rules to remember right at the start.”" },
      { label: "Terminology (P33, novice)", value: "“At first, concepts like spoofing were really confusing to me.”" },
      { label: "Gradual adjustment (P1, novice)", value: "“It was confusing in the beginning, but it got easier as we played.”" },
      { label: "Productive struggle (P15, novice)", value: "“It was confusing, sure, but I actually learned a lot of things.”" },
      { label: "Social interaction (P27, novice)", value: "“The fun part was everyone sitting together and playing.”" },
      { label: "Peer scaffolding (P9, coursework)", value: "“It was engaging to have such good discussions with everyone.”" },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Limitations",
    columns: 2,
    items: [
      {
        title: "Convenience sample",
        body: "University students may skew more tech-savvy than the general population most in need of this kind of training.",
      },
      {
        title: "Effect sizes need replication",
        body: "Large effect sizes (d = 1.6–1.9) at N = 50 should be read cautiously — small samples can inflate estimates.",
      },
      {
        title: "Self-report measures",
        body: "SUS, TAM, and NASA-TLX are all susceptible to social-desirability bias; the knowledge test measures immediate recall, not long-term retention.",
      },
      {
        title: "Lab setting",
        body: "Sessions ran with a researcher present. CyQured is designed to be facilitator-independent, but that hasn't yet been tested in an unsupervised home or classroom.",
      },
    ],
  },
  {
    kind: "code",
    heading: "Cite this paper",
    language: "bibtex",
    body: `@inproceedings{das2026cyqured,
  title     = {{CyQured}: Design, Development, and Empirical Evaluation of a
               Tabletop Game for Personal Cybersecurity Education},
  author    = {Das, Utsho and Saha, Argha Pratim and Ferdous, Md Sadek and
               Masum, Md and Chowdhury, Farida},
  booktitle = {Symposium on Usable Privacy and Security (SOUPS 2026)},
  year      = {2026},
  address   = {Hannover, Germany},
  publisher = {USENIX Association},
}`,
  },
];
