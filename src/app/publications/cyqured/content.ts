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
      "CyQured is a tabletop card-and-board game designed to teach personal cybersecurity in everyday connected homes. It models a home ecosystem of 16 devices and translates 16 STRIDE-inspired threat-and-defense mechanisms into structured, turn-based tabletop gameplay.",
      "Accepted at the 22nd USENIX Symposium on Usable Privacy and Security (SOUPS 2026), Hannover, Germany.",
    ],
  },
  {
    kind: "accordion",
    title: "Read the full paper abstract",
    subtitle: "USENIX SOUPS 2026 (Hannover, Germany)",
    content: [
      "As reliance on connected home devices grows, human behavior remains a critical vulnerability that is often inadequately addressed by traditional, overly technical educational methods. To bridge this gap, we introduce CyQured, a tabletop board game that models a digital home ecosystem of 16 devices, enabling players to simulate 16 STRIDE-inspired attacks and defenses through structured gameplay. We evaluated CyQured with 50 university students, 13 with prior cybersecurity coursework and 37 without, including 14 with limited tabletop gaming experience. The evaluation was conducted using a mixed-methods approach that included knowledge assessments and user-centered evaluations, including the SUS, TAM, and NASA-TLX scales. While novices without domain or tabletop gaming experience reported higher cognitive load and borderline usability scores, knowledge gains were observed across all cohorts. Thematic analysis revealed that novices encountered initial accessibility barriers and elevated cognitive load due to unfamiliar cybersecurity terminology and gameplay mechanics; however, high engagement and social interaction motivated them to persist. Collectively, these findings suggest that game-based simulations can effectively engage diverse learners in understanding home cybersecurity, while also underscoring the need for accessible game design to support players without prior domain knowledge or tabletop gaming experience.",
    ],
  },
  {
    kind: "prose",
    heading: "Why personal cybersecurity needs a different approach",
    body: [
      "Most security training assumes an enterprise environment. It assumes full-time IT administrators, corporate firewalls, and institutional policies. That setup does not exist in a normal home.",
      "People live with a growing ecosystem of connected hardware: wireless routers, IP cameras, smartphones, smart TVs, and IoT appliances. When something goes wrong, there is no IT support ticket to file. The user has to recognize the risk and make a decision on their own.",
      "Traditional awareness programs rely heavily on passive compliance modules or slide decks. Advice like 'use strong passwords' or 'be careful on public Wi-Fi' stays abstract and disconnects from real behavior. Existing security games also have clear limits. Many focus on enterprise IT management, require an expert facilitator to run the session, or target narrow single threats like phishing while ignoring how devices connect across a home network.",
    ],
  },
  {
    kind: "prose",
    heading: "How CyQured works",
    body: [
      "CyQured turns the connected home into an interactive, self-contained tabletop board game. The 28-cell board represents a digital household, where players acquire devices, launch realistic STRIDE attacks, and mount defensive mitigations.",
      "The game is designed to run entirely without an instructor or game master. Players take turns rolling the die, moving across the track, trading assets, and defending against opponents.",
      "A core mechanic is forced verbal justification. When a player plays an attack or defense card, they must read the description aloud and explain to the table why their response counters the threat. This turns security into an active social dialogue rather than passive rote memorization.",
    ],
  },
  {
    kind: "boardShowcase",
    heading: "The physical game on the table",
  },
  {
    kind: "cardRow",
    heading: "Action, chance, and scenario cards",
  },
  {
    kind: "cardGrid",
    heading: "Inside the game box",
    columns: 3,
    items: [
      {
        title: "16 Connected Devices",
        body: "From laptops and phones to smart speakers, IP cameras, wireless routers, and home servers.",
      },
      {
        title: "68 Action Cards",
        body: "34 attack cards and 34 defense cards mapped to STRIDE threat categories with target suggestions.",
      },
      {
        title: "30 Chance Cards",
        body: "Unexpected security events and real-world incidents that introduce uncertainty into play.",
      },
      {
        title: "20 Scenario Cards",
        body: "Short narrative incident prompts where players identify the underlying STRIDE category.",
      },
      {
        title: "28 Board Cells",
        body: "A cyclic Monopoly-inspired track optimized with Monte Carlo simulations to balance cell frequency.",
      },
      {
        title: "Facilitator Independent",
        body: "All rules and card prompts are self-contained so small groups can play without an instructor.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Core contributions of the paper",
    columns: 3,
    items: [
      {
        title: "Home-Context Security Artifact",
        body: "A tangible tabletop game that operationalizes STRIDE threat modeling for everyday household devices without needing enterprise knowledge.",
      },
      {
        title: "Empirical Learning Evidence",
        body: "A mixed-methods evaluation with 50 university students demonstrating statistically significant knowledge gains across all participant backgrounds.",
      },
      {
        title: "Design Insights for Usable Security",
        body: "Practical principles on decoupling interaction complexity from domain learning and scaffolding game mechanics for non-gamers.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Theoretical foundations",
    columns: 3,
    items: [
      {
        title: "Constructivist Learning",
        body: "Players construct mental models by alternating between attacker and defender roles rather than receiving passive instructions.",
      },
      {
        title: "Self-Determination Theory",
        body: "Fosters autonomy, competence, and relatedness through collaborative decision-making in a shared social setting.",
      },
      {
        title: "Cognitive Load Theory",
        body: "Balances challenge and usability by breaking down security concepts into structured card prompts and turn phases.",
      },
    ],
  },
  {
    kind: "serpentinePipeline",
    heading: "Evolution from undergraduate thesis to USENIX SOUPS 2026",
  },
  {
    kind: "prose",
    body: [
      "Early prototype testing showed that novice players hesitated when cards were too open-ended. Without guidance on targets or defenses, participants relied heavily on the game master for reassurance.",
      "We redesigned the cards with explicit attack titles, concise descriptions, target device tags, and suggested mitigations. This reduced extraneous cognitive load and allowed players to run the game independently during our formal study.",
    ],
  },
];

export const howToPlayBlocks: Block[] = [
  {
    kind: "prose",
    heading: "Setup and starting conditions",
    body: [
      "Each player starts with 50 credit points, 8 action cards, and a token on GO. The board represents a connected home, and the devices on it become the assets players can acquire, trade, and protect.",
      "The action deck, 30 chance cards, and 20 scenario cards sit in the center of the board. Play moves clockwise around the table until an agreed end condition is reached.",
    ],
  },
  {
    kind: "figure",
    heading: "Turn structure and gameplay flow",
    src: "/media/cyqured/turn_flow.png",
    alt: "CyQured gameplay turn structure and attack-defense resolution flow",
    caption: "Figure: Complete turn loop: roll-and-move, cell evaluation, adversarial card play, forced verbal justification, and outcome resolution.",
    size: "lg",
  },
  {
    kind: "prose",
    body: [
      "Phase four is the active learning engine of CyQured. When playing an attack or defense, the player must read the card text aloud and justify their strategic choice to the other players. This embeds active verbal reasoning into every round.",
    ],
  },
  {
    kind: "cardGrid",
    heading: "Resolving an attack on a device",
    columns: 2,
    items: [
      {
        title: "01 Attacker plays",
        body: "The attacking player chooses an attack card compatible with the target device.",
      },
      {
        title: "02 Defender responds",
        body: "The defending player selects a defense card from their hand that mitigates the incoming threat.",
      },
      {
        title: "03 Verbal explanation",
        body: "Both players read their cards aloud and explain why the defense works or fails against the attack.",
      },
      {
        title: "04 Outcome and points",
        body: "A successful defense prevents point loss. A failed defense costs points or risks asset ownership.",
      },
    ],
  },
  {
    kind: "prose",
    body: [
      "Critical network gateways like the Wireless Router and Home Server carry special stakes. Compromising a router allows lateral movement across the network, so a single failed defense can trigger an immediate transfer of device ownership.",
    ],
  },
  {
    kind: "prose",
    heading: "STRIDE threat modeling in the deck",
    body: [
      "All attack and defense cards are grounded in the STRIDE framework, making formal threat categories intuitive through direct play.",
    ],
  },
  {
    kind: "cardGrid",
    columns: 3,
    items: [
      { title: "S: Spoofing", body: "Impersonating a person, device, or service to gain unauthorized network access." },
      { title: "T: Tampering", body: "Modifying sensitive files, firmware, or live communication streams maliciously." },
      { title: "R: Repudiation", body: "Denying an action occurred when systems lack tamper-evident audit logs." },
      { title: "I: Information Disclosure", body: "Exposing private credentials, personal photos, or device traffic." },
      { title: "D: Denial of Service", body: "Flooding a router or service with traffic to make it unavailable to users." },
      { title: "E: Elevation of Privilege", body: "Gaining administrator rights or unauthorized capabilities on a device." },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Special board cells",
    columns: 3,
    items: [
      { title: "GO", body: "Complete a full lap around the home to collect bonus points and new action cards." },
      { title: "Chance", body: "Draw an event card reflecting real-world uncertainty and security incidents." },
      { title: "Scenario", body: "Analyze an incident prompt and identify the correct STRIDE category for points." },
      { title: "Power Outage", body: "Temporarily deactivates all active device defenses for a round." },
      { title: "STOP", body: "Simulates downtime or mandatory security updates, skipping the player's turn." },
      { title: "Card Penalty", body: "Forces a player to discard cards, simulating credential or data loss." },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Game completion modes",
    columns: 3,
    items: [
      { title: "Elimination", body: "Players who run out of points and assets exit. The last surviving player wins." },
      { title: "Timed Play", body: "Play runs for a set duration such as 45 or 60 minutes. Highest score wins." },
      { title: "Target Score", body: "The first player to reach an agreed number of points and assets wins." },
    ],
  },
];

export const studyBlocks: Block[] = [
  {
    kind: "prose",
    heading: "Empirical evaluation: design and participant cohorts",
    body: [
      "We evaluated CyQured through a mixed-methods empirical study with 50 university students to evaluate knowledge acquisition (RQ1) and user experience across differing technical backgrounds (RQ2).",
      "Participants were split into two primary cohorts based on prior security background: 13 students with formal cybersecurity coursework (SC) and 37 students without cybersecurity coursework (NC). Within the non-coursework group, we also tracked tabletop gaming literacy: 23 participants had played Monopoly before (NC-M), while 14 had no prior board game experience (NC-NM).",
    ],
  },
  {
    kind: "figure",
    heading: "Study design and evaluation workflow",
    src: "/media/cyqured/study_workflow.png",
    alt: "Empirical study workflow showing 5 evaluation phases and the supplemental control baseline",
    caption: "Figure: Mixed-methods study methodology (N = 50) and parallel 60-minute test-retest control baseline (N = 20).",
    size: "lg",
  },
  {
    kind: "statGrid",
    heading: "Participant demographics (N = 50)",
    columns: 5,
    items: [
      { value: "50", label: "Total participants", highlight: true },
      { value: "13", label: "Security Coursework (SC)" },
      { value: "37", label: "No Coursework (NC)" },
      { value: "23", label: "NC with Monopoly Exp (NC-M)" },
      { value: "14", label: "NC no Monopoly Exp (NC-NM)" },
    ],
  },
  {
    kind: "prose",
    heading: "RQ1: Knowledge acquisition across all groups",
    body: [
      "Every participant group demonstrated statistically significant knowledge gains between the pre-test and post-test. The 10-item pre-test evaluated threat identification, while the post-test measured corresponding defensive mitigation strategies.",
      "The security coursework group improved by an average of 3.38 points out of 10 (SD = 1.80, d = 1.88, p < .001). The non-coursework group gained an average of 1.95 points (SD = 1.20, d = 1.62, p < .001). Both effect sizes are large, demonstrating meaningful learning regardless of prior background.",
      "Prior security coursework gave students a larger gain (Welch's t = 2.87, p = .01), showing that familiarity with domain terms helped accelerate learning. Importantly, prior board game experience did not affect knowledge gain: NC-M gained 1.96 points (d = 1.55) and NC-NM gained 1.93 points (d = 1.69). Both groups learned the security concepts equally well.",
    ],
  },
  {
    kind: "figure",
    src: "/media/cyqured/knowledge_gain.jpeg",
    alt: "Knowledge gain distributions showing mean score improvements across SC, NC, NC-M, NC-NM, and All Game cohorts",
    caption: "Figure 1: Knowledge score gain (post-test minus pre-test out of 10) across participant cohorts, showing large effect sizes (d > 1.5) across all groups.",
    size: "md",
  },
  {
    kind: "findings",
    items: [
      { label: "Security Coursework (SC, n = 13)", value: "ΔM = +3.38, SD = 1.80, d = 1.88, p < .001 (large effect)" },
      { label: "No Coursework (NC, n = 37)", value: "ΔM = +1.95, SD = 1.20, d = 1.62, p < .001 (large effect)" },
      { label: "All Gameplay Participants (N = 50)", value: "ΔM = +2.32, SD = 1.46, d = 1.58, p < .001 (LMM β = 2.32, p < .001)" },
    ],
  },
  {
    kind: "prose",
    heading: "Guarding against test-retest bias: supplemental control study",
    body: [
      "To verify that score improvements reflected genuine learning rather than familiarity from taking the test twice, we conducted a control study with 20 demographically matched participants from the NC cohort.",
      "Control participants took the pre-test and post-test 60 minutes apart without playing CyQured or receiving any security instruction.",
      "The control group showed no significant score change (Pre: 4.05 vs Post: 3.85, ΔM = -0.20, SD = 1.61, t = 0.56, p = .58, d = 0.12). This confirms that knowledge gains in the main study were directly caused by gameplay.",
    ],
  },
  {
    kind: "figure",
    src: "/media/cyqured/control_study.jpeg",
    alt: "Comparison of score gains between the Gameplay group (+2.32) and the Control group (-0.20)",
    caption: "Figure 2: Supplemental control study comparison showing significant gains for gameplay participants (n = 50) versus no change for the non-playing control group (n = 20).",
    size: "sm",
  },
  {
    kind: "prose",
    heading: "RQ2: The usability divide and gaming literacy",
    body: [
      "While learning was consistent across cohorts, perceived usability told a more nuanced story.",
      "Participants with cybersecurity coursework rated the game at a mean System Usability Scale (SUS) score of 80.6 (SD = 10.6), placing it in the 'Excellent' category. For students without security coursework, the mean SUS score dropped to 66.3 (SD = 14.9), categorized as 'Borderline' against the standard 68-point usability benchmark.",
      "Dividing the non-coursework cohort by prior Monopoly experience revealed the source of this gap. Participants familiar with Monopoly rated usability at 73.7 ('Good'), while non-gamers rated it at 54.1 ('Poor'). This difference was statistically significant (t = 6.13, p < .001, d = 1.90), showing that familiarity with board game mechanics heavily buffered usability friction.",
    ],
  },
  {
    kind: "figure",
    src: "/media/cyqured/sus_scores.jpeg",
    alt: "System Usability Scale scores across participant groups: SC (80.6), NC-M (73.7), All (70.0), NC (66.3), and NC-NM (54.1)",
    caption: "Figure 3: System Usability Scale (SUS) scores across cohorts compared to the 68-point industry benchmark for acceptable usability.",
    size: "md",
  },
  {
    kind: "prose",
    heading: "Cognitive workload: learning rules vs learning security",
    body: [
      "NASA-TLX subscales clarify why non-gamers felt more friction. Participants in the NC-NM subgroup reported elevated Mental Demand, Effort, and Frustration compared to their board-game-literate peers.",
      "Non-gamers had to handle a double cognitive burden: learning turn mechanics, card types, and movement rules while simultaneously reasoning about unfamiliar cybersecurity threats.",
      "Crucially, both groups rated their own Performance highly on the NASA-TLX. This indicates that participants experienced the initial difficulty as an active challenge rather than failure.",
    ],
  },
  {
    kind: "figure",
    src: "/media/cyqured/TLX.jpeg",
    alt: "NASA-TLX cognitive load radar chart comparing NC-M and NC-NM across six workload dimensions",
    caption: "Figure 4: NASA-TLX workload profiles comparing non-coursework players with Monopoly experience (NC-M) and without Monopoly experience (NC-NM).",
    size: "sm",
  },
  {
    kind: "prose",
    heading: "High technology acceptance across all groups",
    body: [
      "Despite the usability hurdles experienced by novice players, Technology Acceptance Model (TAM) scores remained uniformly high across both cohorts.",
      "Participants strongly agreed that CyQured improved their ability to identify threats and defenses (Perceived Usefulness > 4.25 out of 5), expressed high intention to use it again (ITU > 4.40), and reported positive attitudes toward the experience (ATT > 4.60).",
      "Perceived Ease of Use (PEOU) showed the expected divide between SC (4.42) and NC (4.09, p = .005, d = 0.64), aligning with the SUS findings while confirming that usability friction did not diminish the game's perceived educational value.",
    ],
  },
  {
    kind: "figure",
    src: "/media/cyqured/TAM.jpeg",
    alt: "Technology Acceptance Model construct scores for SC and NC groups across PEOU, PU, ATT, and ITU",
    caption: "Figure 5: Technology Acceptance Model (TAM) constructs (5-point Likert) comparing Security Coursework (SC) and No Coursework (NC) groups.",
    size: "md",
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
      "The NC-NM subgroup had the lowest usability score (54.1) and highest reported mental effort, yet achieved a substantial learning gain of 1.93 points (d = 1.69). We call this tension the CyQured Paradox.",
      "Our findings suggest that high perceived usefulness and the social energy of tabletop play acted as a motivational reserve. Even when players felt overwhelmed by rules during the first round, peer interaction and collaborative discussion kept them engaged through the productive struggle.",
    ],
  },
  {
    kind: "quoteBento",
    heading: "What participants said in post-game interviews",
  },
  {
    kind: "cardGrid",
    heading: "Design implications for usable security games",
    columns: 3,
    items: [
      {
        title: "Decouple Interaction from Content",
        body: "Pedagogical success and usability are separate dimensions. Game rules must be scaffolded as carefully as security concepts so mechanics do not consume cognitive capacity needed for learning.",
      },
      {
        title: "Design for Asymmetric Literacy",
        body: "Novices often lack both security domain knowledge and tabletop experience. Games should introduce mechanics progressively across rounds before layering complex threat interactions.",
      },
      {
        title: "Ease of Use for Long-Term Adoption",
        body: "High perceived usefulness sustains attention during structured studies, but high interaction friction can cause security fatigue. Accessible onboarding is vital for voluntary home adoption.",
      },
    ],
  },
  {
    kind: "cardGrid",
    heading: "Limitations and future work",
    columns: 3,
    items: [
      {
        title: "Population Diversity",
        body: "The study evaluated university students in Bangladesh. Future research should evaluate CyQured across broader non-academic and older adult demographics.",
      },
      {
        title: "Long-Term Retention",
        body: "Knowledge assessments were conducted immediately post-gameplay. Longitudinal studies are needed to evaluate retention and transfer to everyday device habits.",
      },
      {
        title: "Unsupervised Deployment",
        body: "Sessions were conducted in a controlled environment with researchers present. Future trials will test fully self-administered play in living rooms and community centers.",
      },
    ],
  },
  {
    kind: "prose",
    heading: "Publication and citation",
    body: [
      "CyQured started as our undergraduate thesis at Shahjalal University of Science and Technology (SUST). It evolved into a comprehensive design and empirical study accepted at USENIX SOUPS 2026 in Hannover, Germany.",
      "Authors: Utsho Das*, Argha Pratim Saha*, Md Sadek Ferdous, Md Masum, Farida Chowdhury (*equal contribution).",
    ],
  },
  {
    kind: "code",
    heading: "Citation (Coming Soon)",
    language: "bibtex",
    body: `% BibTeX citation will be available upon official publication in the USENIX SOUPS 2026 Proceedings.
% Paper accepted at USENIX SOUPS 2026 (Hannover, Germany).`,
  },
];
