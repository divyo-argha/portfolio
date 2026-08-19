import type { Block } from "@/content/types";

/**
 * Content for the CyQured page's three data-driven tabs:
 * Overview, How to Play, and Study & Results.
 * Rendered through the shared BlockRenderer component.
 */

export const overviewBlocks: Block[] = [
  {
    kind: "prose",
    body: [
      "CyQured is a tabletop game about the cybersecurity of everyday connected homes. Players move around a home filled with familiar devices, face different threats, choose how to respond, and explain their decisions as they play.",
      "SOUPS 2026 · Tabletop cybersecurity education · SUST undergraduate thesis",
    ],
  },
  {
    kind: "prose",
    heading: "A connected home, turned into a game",
    body: [
      "Most of us live around connected devices without thinking much about how they fit together as a security system. CyQured turns that everyday setting into a tabletop game.",
      "Your router, laptop, phone, smart speaker, camera, and other devices become part of the board. Players can acquire them, attack them, defend them, and talk through what they would do when something goes wrong.",
      "The goal is not just to remember security terms. It is to make players stop and think about what a threat means for a device they actually use.",
    ],
  },
  {
    kind: "gallery",
    heading: "The game brings the connected home onto the table",
    columns: 2,
    items: [
      {
        src: "/media/publications/cyqured/board.webp",
        alt: "The CyQured physical board layout modeling connected home devices",
        caption: "Tabletop board representing connected devices in a modern home",
      },
      {
        src: "/media/publications/cyqured/example-attack.png",
        alt: "Close-up of a CyQured attack action card",
        caption: "Attack card turning common threats into playable actions",
      },
      {
        src: "/media/publications/cyqured/example-defense.png",
        alt: "Close-up of a CyQured defense action card",
        caption: "Defense card specifying counters and security mitigations",
      },
      {
        src: "/media/publications/cyqured/example-chance.png",
        alt: "Close-up of a CyQured chance card",
        caption: "Chance card introducing uncertainty and real-world incidents",
      },
    ],
  },
  {
    kind: "prose",
    body: [
      "A board, action cards, chance cards, scenario cards, and asset cards work together to turn common cybersecurity situations into something players can see and discuss.",
    ],
  },
  {
    kind: "cardGrid",
    heading: "Inside the game",
    columns: 3,
    items: [
      {
        title: "16 connected devices",
        body: "From laptops and phones to smart speakers, cameras, routers, and a home server.",
      },
      {
        title: "68 action cards",
        body: "Attack and defense cards that turn threats and mitigations into playable choices.",
      },
      {
        title: "30 chance cards",
        body: "Unexpected events that introduce uncertainty into the game.",
      },
      {
        title: "20 scenario cards",
        body: "Short situations where players identify the relevant STRIDE category.",
      },
      {
        title: "28 board cells",
        body: "A familiar board structure built around a connected home.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "What we were trying to explore",
    columns: 3,
    items: [
      {
        title: "Bringing security into the home",
        body: "CyQured focuses on the devices people encounter in everyday life rather than putting the player in the role of an enterprise security professional.",
      },
      {
        title: "Learning through decisions",
        body: "Players do not simply read about a phishing attack, spoofing, or another threat. They have to decide what to do, choose a card, and explain why that response makes sense.",
      },
      {
        title: "What happens when the game is not easy?",
        body: "We were also interested in the other side of the experience. Does making a game engaging automatically make it easy to learn? The study gave us a more complicated answer.",
      },
    ],
  },
  {
    kind: "prose",
    heading: "Where CyQured fits",
    body: [
      "CyQured builds on a broader line of cybersecurity games and learning tools, but focuses on a particular setting: the connected home.",
    ],
  },
  {
    kind: "cardGrid",
    columns: 2,
    items: [
      {
        title: "CyQured",
        body: "Personal cybersecurity in a connected home setting, designed for self-facilitated small groups.",
      },
      {
        title: "Riskio",
        body: "Risk management and cybersecurity decision-making in enterprise environments.",
      },
      {
        title: "Cyber Threat Defender",
        body: "Cybersecurity threats and defensive thinking across broader network architectures.",
      },
      {
        title: "Other security games",
        body: "Specific isolated skills such as phishing or passwords, or requiring expert facilitators to guide the session.",
      },
    ],
  },
  {
    kind: "prose",
    body: [
      "The point is not that one approach is better than another. CyQured explores what happens when cybersecurity education is placed in a familiar home setting and delivered through a game that players can run themselves.",
    ],
  },
  {
    kind: "pipeline",
    heading: "From the first prototype to the final game",
    steps: [
      { label: "Initial prototype" },
      { label: "Pilot playtesting" },
      { label: "Observed friction", highlight: true },
      { label: "Card redesign" },
      { label: "Empirical evaluation" },
    ],
  },
  {
    kind: "prose",
    body: [
      "The first version of the cards did not give players enough guidance. During pilot testing, some participants were unsure about the threats they were seeing and depended on the Game Master for help.",
      "We responded by making the cards clearer: adding explicit titles, shortening descriptions, identifying target devices, and showing possible defenses.",
      "This iterative cycle turned an expert-dependent prototype into a self-facilitated learning tool ready for controlled study.",
    ],
  },
];

export const howToPlayBlocks: Block[] = [
  {
    kind: "prose",
    heading: "Everyone starts with a small home to protect",
    body: [
      "Each player begins with 50 credit points, eight cards, and a token on GO. The board represents a connected home, and the devices on it become the assets players can acquire and defend.",
      "The rest of the action deck, plus 30 chance cards and 20 scenario cards, sit face-down on the board. Play proceeds clockwise around the table until an end condition is reached.",
    ],
  },
  {
    kind: "pipeline",
    heading: "A turn",
    steps: [
      { label: "01: Roll (Move around the board)" },
      { label: "02: Land (Resolve the cell)" },
      { label: "03: Decide (Acquire, attack, defend, or solve)" },
      { label: "04: Explain (Justify your choice aloud)", highlight: true },
    ],
  },
  {
    kind: "prose",
    body: [
      "That last step is important. Players have to read their chosen card aloud and justify the attack or defense they picked. The game therefore turns security decisions into something players have to explain, not just recognize.",
    ],
  },
  {
    kind: "cardGrid",
    heading: "When a device is attacked",
    columns: 2,
    items: [
      {
        title: "01 Attacker",
        body: "Choose an attack card that fits the target device.",
      },
      {
        title: "02 Defender",
        body: "Choose a defense card that could stop the incoming threat.",
      },
      {
        title: "03 Both players",
        body: "Read cards aloud and explain why their choices make sense.",
      },
      {
        title: "04 Outcome",
        body: "The defense succeeds or fails, changing what happens to the asset and the players' points.",
      },
    ],
  },
  {
    kind: "prose",
    body: [
      "The router and home server are treated differently because compromising them can affect the wider home network. A failed defense can therefore change ownership after a single failure.",
    ],
  },
  {
    kind: "prose",
    heading: "The threats behind the cards",
    body: [
      "The attack and defense cards are grounded in STRIDE, a common way of thinking about different kinds of security threats.",
    ],
  },
  {
    kind: "cardGrid",
    columns: 3,
    items: [
      { title: "S: Spoofing", body: "Impersonating a person, device, or service to gain unauthorized access." },
      { title: "T: Tampering", body: "Modifying data, code, or communication streams maliciously." },
      { title: "R: Repudiation", body: "Denying an action occurred without proof or audit logs." },
      { title: "I: Information Disclosure", body: "Exposing confidential data or credentials to unauthorized parties." },
      { title: "D: Denial of Service", body: "Making a device, network, or service unavailable to legitimate users." },
      { title: "E: Elevation of Privilege", body: "Gaining unpermitted capabilities or administrator control." },
    ],
  },
  {
    kind: "prose",
    body: [
      "Players encounter these ideas through concrete situations on the board rather than having to learn the framework first.",
    ],
  },
  {
    kind: "cardGrid",
    heading: "The board has a few surprises",
    columns: 3,
    items: [
      { title: "GO", body: "Complete a lap and collect points and action cards." },
      { title: "Chance", body: "Draw an unexpected event and deal with what happens." },
      { title: "Scenario", body: "Read a situation and identify the relevant type of threat." },
      { title: "Power Outage", body: "Your devices temporarily go offline." },
      { title: "STOP", body: "Lose your next turn." },
      { title: "Card Penalty", body: "Give up cards from your hand." },
    ],
  },
  {
    kind: "prose",
    body: [
      "Some devices matter more than others: the router and home server carry higher values because compromising them can affect much more of the home network.",
    ],
  },
  {
    kind: "cardGrid",
    heading: "How does the game end?",
    columns: 3,
    items: [
      { title: "Elimination", body: "Last player with points or assets remaining wins." },
      { title: "Timed", body: "When time runs out, the player with the highest total score wins." },
      { title: "Target score", body: "The first player to reach the agreed score wins." },
    ],
  },
];

export const studyBlocks: Block[] = [
  {
    kind: "prose",
    heading: "So, did it actually help people learn?",
    body: [
      "We wanted to know two things. First, whether playing CyQured could improve cybersecurity knowledge. Second, whether the experience felt different for students who already had some cybersecurity background.",
      "We evaluated the game with 50 university students. They played in small groups, completed a knowledge test before and after the game, and then reported on usability, cognitive load, and technology acceptance.",
    ],
  },
  {
    kind: "pipeline",
    heading: "Study workflow",
    steps: [
      { label: "Before playing (10-item knowledge test)" },
      { label: "Play (Small-group gameplay)" },
      { label: "After playing (10-item knowledge test)" },
      { label: "Experience (SUS, TAM, NASA-TLX)" },
      { label: "Discussion (Open-ended interviews)", highlight: true },
    ],
  },
  {
    kind: "statGrid",
    heading: "Who took part?",
    columns: 5,
    items: [
      { value: "50", label: "University students in total", highlight: true },
      { value: "13", label: "Security coursework (SC)" },
      { value: "37", label: "No security coursework (NC)" },
      { value: "23", label: "NC, had played Monopoly" },
      { value: "14", label: "NC, had not played Monopoly" },
    ],
  },
  {
    kind: "prose",
    body: [
      "We also looked at prior Monopoly experience because the board uses a familiar roll-and-move movement structure.",
    ],
  },
  {
    kind: "prose",
    heading: "Players knew more after playing",
    body: [
      "Both groups improved on the knowledge test, although the students with prior cybersecurity coursework showed the larger gain.",
    ],
  },
  {
    kind: "barChart",
    heading: "Knowledge score gain (points out of 10, post-test minus pre-test)",
    unit: " pt",
    items: [
      { label: "Security coursework", value: 3.38, highlight: true },
      { label: "All players", value: 2.32 },
      { label: "No security coursework", value: 1.95 },
    ],
  },
  {
    kind: "findings",
    items: [
      { label: "Effect size (Security coursework)", value: "d = 1.88, p < .001 (large effect)" },
      { label: "Effect size (No security coursework)", value: "d = 1.62, p < .001 (large effect)" },
    ],
  },
  {
    kind: "prose",
    heading: "Could the improvement just come from taking the test twice?",
    body: [
      "We ran a separate control study with 20 participants who took the same test twice, 60 minutes apart, without playing the game in between.",
    ],
  },
  {
    kind: "findings",
    items: [
      { label: "Control group score change (N = 20)", value: "Pre 4.05 to Post 3.85 (-0.20 points)" },
      { label: "Statistical significance", value: "p = .58 (not significant), making a test-practice explanation unlikely" },
    ],
  },
  {
    kind: "prose",
    heading: "But learning was not the whole story",
    body: [
      "The game was easier for some people than others.",
      "Students with prior cybersecurity coursework gave the game a System Usability Scale (SUS) score of 80.6. Among students without that background, the score dropped to 66.3.",
    ],
  },
  {
    kind: "barChart",
    heading: "System Usability Scale by group (0 to 100, where 68 is the standard benchmark)",
    unit: "",
    items: [
      { label: "Security coursework", value: 80.6, highlight: true },
      { label: "All players", value: 70.0 },
      { label: "No security coursework", value: 66.3 },
    ],
  },
  {
    kind: "prose",
    heading: "The board was familiar to some players. Not to everyone.",
    body: [
      "The difference became even more striking when we looked at prior Monopoly experience.",
    ],
  },
  {
    kind: "barChart",
    heading: "SUS within the no-coursework group by prior Monopoly experience",
    unit: "",
    items: [
      { label: "Had played Monopoly", value: 73.7, highlight: true },
      { label: "Had not played Monopoly", value: 54.1 },
    ],
  },
  {
    kind: "prose",
    body: [
      "Prior board game familiarity did not change how much knowledge players gained. But it changed how easy the game felt to play.",
    ],
  },
  {
    kind: "prose",
    heading: "Learning the game was part of the learning",
    body: [
      "Students without prior cybersecurity coursework reported more mental demand and effort. Among them, those who had never played Monopoly reported the highest workload.",
      "They were learning two things at once: how to play the game and how to reason about the security concepts inside it.",
      "Both groups rated their own performance positively, showing that the difficulty was experienced as an active challenge rather than a failure.",
    ],
  },
  {
    kind: "quote",
    heading: "The CyQured Paradox",
    text: "Some players found the game difficult to use, but that did not stop them from learning.",
    attribution: "Core finding on learning amidst usability friction",
  },
  {
    kind: "prose",
    body: [
      "The students without cybersecurity coursework and without prior Monopoly experience had the lowest usability score, 54.1. Yet they still showed a substantial gain on the knowledge test.",
      "We call this tension the CyQured Paradox: the experience could be difficult to navigate while still feeling useful and engaging enough for players to stay with it.",
      "Participants described the game as confusing at first, but several also said that it became easier as they played and that the social interaction made the experience enjoyable.",
    ],
  },
  {
    kind: "findings",
    heading: "What did players actually say?",
    items: [
      { label: "P1, novice", value: '"It was confusing in the beginning, but it got easier as we played."' },
      { label: "P15, novice", value: '"It was confusing, sure, but I actually learned a lot of things."' },
      { label: "P27, novice", value: '"The fun part was everyone sitting together and playing."' },
      { label: "P9, security coursework", value: '"It was engaging to have such good discussions with everyone."' },
    ],
  },
  {
    kind: "prose",
    body: [
      "The comments point to a pattern we also saw in the quantitative results: the early experience could be difficult, but players often adjusted as they became familiar with the rules and concepts.",
    ],
  },
  {
    kind: "prose",
    heading: "People still saw value in the game",
    body: [
      "Despite the differences in usability, both groups rated the game's usefulness, attitude, and intention to use positively.",
    ],
  },
  {
    kind: "barChart",
    heading: "Technology acceptance comparison (mean score out of 5)",
    unit: "",
    items: [
      { label: "SC: Attitude", value: 4.85, highlight: true },
      { label: "SC: Intent to use", value: 4.54 },
      { label: "SC: Ease of use", value: 4.42 },
      { label: "SC: Usefulness", value: 4.26 },
      { label: "NC: Attitude", value: 4.61, highlight: true },
      { label: "NC: Intent to use", value: 4.43 },
      { label: "NC: Usefulness", value: 4.25 },
      { label: "NC: Ease of use", value: 4.09 },
    ],
  },
  {
    kind: "cardGrid",
    heading: "What we still do not know",
    columns: 2,
    items: [
      {
        title: "Will the learning last?",
        body: "The study measured knowledge immediately after gameplay. We did not test long-term retention.",
      },
      {
        title: "Would this work outside a study session?",
        body: "Participants played in a controlled setting with researchers present. We have not yet tested completely unsupervised home or classroom use.",
      },
      {
        title: "Who else would benefit?",
        body: "The participants were university students. A broader population may respond differently.",
      },
      {
        title: "How reliable are the estimates?",
        body: "The sample was modest (N = 50), so the large effect sizes should be interpreted cautiously and replicated with larger studies.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "What we learned",
    columns: 3,
    items: [
      {
        title: "Games can make security decisions tangible",
        body: "Players interacted with threats and defenses directly rather than only reading about them.",
      },
      {
        title: "Familiarity matters",
        body: "Prior experience with cybersecurity and tabletop games affected how easy the game felt.",
      },
      {
        title: "A game can teach and still be difficult",
        body: "The strongest result was not simply that knowledge improved. It was the tension between learning, usability, and cognitive load.",
      },
    ],
  },
  {
    kind: "prose",
    heading: "From thesis to SOUPS",
    body: [
      "CyQured began as an undergraduate thesis at Shahjalal University of Science and Technology. The project grew into a larger design and evaluation study and was accepted for publication at the USENIX Symposium on Usable Privacy and Security (SOUPS) 2026 in Hannover, Germany.",
      "Authors: Utsho Das*, Argha Pratim Saha*, Md Sadek Ferdous, Md Masum, Farida Chowdhury (*equal contribution).",
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
