import { CONNECTED_DEVICES } from "./GameBoardSection";

/** A single hand-authored example playthrough, grounded in the rules described
 * in the CyQured paper (Sections 3-4): 28-cell board, 16 devices, 50 starting
 * credits, 8 starting cards, resource ownership, attack-defense resolution,
 * the critical-infrastructure single-failure transfer rule, and Color-Group
 * Immunity. This is illustrative, not the literal photographed board layout
 * (no per-cell coordinates for that exist), but every rule and every card
 * reference (ids, targets, pairIds) is the real one from cardData.ts.
 *
 * Every turn is broken into small phases so the UI can show a distinct beat
 * for each: rolling the die, landing and reading the cell, then resolving it
 * (buy / draw / pay / fight). Combat itself can span several rounds: if a
 * defense succeeds, the attacker's card is spent and they may try again with
 * a different one, until they succeed, run out of suitable cards, or stop. */

export type PlayerId = "alice" | "bob" | "dylan" | "divyo" | "argha";

export type Player = {
  id: PlayerId;
  name: string;
  color: string;
};

export const PLAYERS: Player[] = [
  { id: "alice", name: "Alice", color: "#5ee1f2" },
  { id: "bob", name: "Bob", color: "#ff5e7e" },
  { id: "dylan", name: "Dylan", color: "#a3d94f" },
  { id: "divyo", name: "Divyo", color: "#f5a623" },
  { id: "argha", name: "Argha", color: "#b48fe0" },
];

export const PLAYER_IDS: PlayerId[] = PLAYERS.map((p) => p.id);

export type PlayerState = {
  credits: number;
  points: number;
  devices: string[];
  handSize: number;
  boardPos: number;
  skippingNextTurn?: boolean;
  note?: string;
};

export type CardRef = {
  id: string;
  title: string;
  category: "attack" | "defense";
  strideType?: string;
  src: string;
};

const cardImg = (id: string) => `/media/publications/cyqured/cards/action/${id}.png`;

/** The small set of real cards (ids match cardData.ts exactly) used in this
 * walkthrough's combat rounds. */
export const CARDS: Record<string, CardRef> = {
  "action-07": {
    id: "action-07",
    title: "Zero-Day Exploit",
    category: "attack",
    strideType: "Elevation of Privilege",
    src: cardImg("action-07"),
  },
  "action-09": {
    id: "action-09",
    title: "Activity Log Manipulation",
    category: "attack",
    strideType: "Repudiation",
    src: cardImg("action-09"),
  },
  "action-13": {
    id: "action-13",
    title: "Wireless Sniffing",
    category: "attack",
    strideType: "Information Disclosure",
    src: cardImg("action-13"),
  },
  "action-15": {
    id: "action-15",
    title: "Router Hijacking",
    category: "attack",
    strideType: "Tampering",
    src: cardImg("action-15"),
  },
  "action-33": {
    id: "action-33",
    title: "Intrusion Detection & Prevention System",
    category: "defense",
    src: cardImg("action-33"),
  },
  "action-34": {
    id: "action-34",
    title: "Immutable Logging",
    category: "defense",
    src: cardImg("action-34"),
  },
};

export type BoardCellKind = "go" | "stop" | "power-outage" | "card-penalty" | "chance" | "scenario" | "device";

export type BoardCell = {
  kind: BoardCellKind;
  name: string;
  color?: string;
  points?: number;
  description: string;
};

const KIND_DESC: Record<Exclude<BoardCellKind, "device">, string> = {
  go: "Complete a full circuit to collect 10 credit points and draw an action card.",
  stop: "Forced incident-response lockdown: forfeit your next turn to run system diagnostics.",
  "power-outage": "Devices briefly lose their continuous active protections, a short window where attacks land more easily.",
  "card-penalty": "Discard one action card from your hand into the central discard pile.",
  chance: "Draw an unexpected event card: real-world vulnerabilities, zero-days, or sudden security incidents.",
  scenario: "Draw a situational security prompt and classify its STRIDE threat category to earn points.",
};

const deviceCell = (name: string): BoardCell => {
  const dev = CONNECTED_DEVICES.find((d) => d.name === name)!;
  return {
    kind: "device",
    name,
    color: dev.color,
    points: dev.points,
    description: `${dev.category} device, worth ${dev.points} points. Unowned: pay ${dev.points} credits to claim it. Owned by someone else: pay half its value to pass, or attack for it.`,
  };
};

const specialCell = (kind: Exclude<BoardCellKind, "device">, name: string): BoardCell => ({
  kind,
  name,
  description: KIND_DESC[kind],
});

/** 28-cell board track. Corners sit at indices 0, 7, 14, 21 (7 cells per
 * side, matching the paper's cyclic 28-cell design). Device cells reuse the
 * canonical 16-device list from the Game Board tab. */
export const BOARD_TRACK: BoardCell[] = [
  specialCell("go", "GO"),
  deviceCell("Smart Utility Meter"),
  deviceCell("Smart Thermostat"),
  specialCell("chance", "Chance"),
  deviceCell("IP Camera"),
  deviceCell("Smart Door-lock"),
  specialCell("scenario", "Scenario"),
  specialCell("stop", "STOP"),
  deviceCell("Smart Speaker"),
  deviceCell("Smart TV"),
  specialCell("chance", "Chance"),
  deviceCell("Smart Printer"),
  deviceCell("Smart Fridge"),
  specialCell("scenario", "Scenario"),
  specialCell("power-outage", "Power Outage"),
  deviceCell("Laptop"),
  deviceCell("Desktop"),
  specialCell("chance", "Chance"),
  deviceCell("Smartphone"),
  deviceCell("Tablet"),
  specialCell("scenario", "Scenario"),
  specialCell("card-penalty", "Card Penalty"),
  deviceCell("Gaming Console"),
  deviceCell("Smart Wearables"),
  specialCell("chance", "Chance"),
  deviceCell("Wireless Router"),
  deviceCell("Home Server"),
  specialCell("scenario", "Scenario"),
];

const START: Record<PlayerId, PlayerState> = {
  alice: { credits: 50, points: 0, devices: [], handSize: 8, boardPos: 0 },
  bob: { credits: 50, points: 0, devices: [], handSize: 8, boardPos: 0 },
  dylan: { credits: 50, points: 0, devices: [], handSize: 8, boardPos: 0 },
  divyo: { credits: 50, points: 0, devices: [], handSize: 8, boardPos: 0 },
  argha: { credits: 50, points: 0, devices: [], handSize: 8, boardPos: 0 },
};

function clone(state: Record<PlayerId, PlayerState>): Record<PlayerId, PlayerState> {
  const next = {} as Record<PlayerId, PlayerState>;
  for (const id of PLAYER_IDS) next[id] = { ...state[id], devices: [...state[id].devices] };
  return next;
}

export type PhaseKind = "setup" | "roll" | "land" | "resolve" | "combat" | "snapshot";

export type CombatOutcome = "defended" | "attack-succeeds" | "critical-transfer" | "immunity-block";

export type CombatInfo = {
  attacker: PlayerId;
  defender: PlayerId;
  deviceName: string;
  round: number;
  attackCard: CardRef;
  defenseCard: CardRef | null;
  outcome: CombatOutcome;
  pointsDelta: { attacker: number; defender: number };
  deviceTransferred: boolean;
};

export type WalkthroughStep = {
  id: string;
  phase: PhaseKind;
  turnLabel: string;
  activePlayer: PlayerId | null;
  highlightCellIndex: number | null;
  title: string;
  narration: string[];
  playerStates: Record<PlayerId, PlayerState>;
  historyEntries: string[];
  roll?: number;
  combat?: CombatInfo;
};

const steps: WalkthroughStep[] = [];

function prev(): Record<PlayerId, PlayerState> {
  return steps.length ? clone(steps[steps.length - 1].playerStates) : clone(START);
}

// ---- Setup ----
steps.push({
  id: "setup",
  phase: "setup",
  turnLabel: "Setup",
  activePlayer: null,
  highlightCellIndex: 0,
  title: "Five players sit down at the board",
  narration: [
    "Alice, Bob, Dylan, Divyo, and Argha are playing a game of CyQured. Every player starts on the GO cell, with 50 credit points, 8 action cards from the shuffled attack-and-defense deck, and no devices owned yet.",
    "The Chance deck (30 cards), the Scenario deck (20 cards), and the rest of the action deck sit in the middle of the board, face down. Play moves clockwise starting with Alice.",
  ],
  playerStates: clone(START),
  historyEntries: ["Game start. Five players, 50 credits and 8 cards each, all tokens on GO."],
});

/** Push a roll phase: position doesn't change yet, this is just the animated die. */
function pushRoll(id: string, player: PlayerId, roll: number, turnLabel: string, lead?: string) {
  steps.push({
    id,
    phase: "roll",
    turnLabel,
    activePlayer: player,
    highlightCellIndex: null,
    title: `${PLAYERS.find((p) => p.id === player)!.name} rolls the die`,
    narration: [lead ?? `${PLAYERS.find((p) => p.id === player)!.name} rolls the die...`],
    playerStates: prev(),
    historyEntries: [],
    roll,
  });
}

/** Push a land phase: the token moves to the new cell and its description shows. */
function pushLand(
  id: string,
  player: PlayerId,
  toPos: number,
  turnLabel: string,
  narration: string[],
  historyEntries: string[] = [],
) {
  const s = prev();
  s[player].boardPos = toPos;
  steps.push({
    id,
    phase: "land",
    turnLabel,
    activePlayer: player,
    highlightCellIndex: toPos,
    title: `${PLAYERS.find((p) => p.id === player)!.name} lands on ${BOARD_TRACK[toPos].name}`,
    narration,
    playerStates: s,
    historyEntries,
  });
}

// =========================================================================
// Round 1 — everyone takes a first turn
// =========================================================================

// ---- Alice: buy IP Camera ----
pushRoll("r1-alice-roll", "alice", 4, "Turn 1 — Alice", "Alice rolls a 4.");
pushLand("r1-alice-land", "alice", 4, "Turn 1 — Alice", [
  "She moves 4 cells and lands on the IP Camera: a Home Security device, unowned, worth 10 points.",
]);
{
  const s = prev();
  s.alice.credits -= 10;
  s.alice.points += 10;
  s.alice.devices.push("IP Camera");
  steps.push({
    id: "r1-alice-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 4,
    title: "Alice buys the IP Camera",
    narration: ["It's unowned, so she pays its 10-credit value outright and claims it. +10 points."],
    playerStates: s,
    historyEntries: ["Alice rolled 4, landed on IP Camera (unowned), paid 10 credits to acquire it. +10 points."],
  });
}

// ---- Bob: buy Smart Door-lock ----
pushRoll("r1-bob-roll", "bob", 5, "Turn 1 — Bob", "Bob rolls a 5.");
pushLand("r1-bob-land", "bob", 5, "Turn 1 — Bob", [
  "He moves 5 cells and lands on the Smart Door-lock: a Home Security device, unowned, worth 10 points.",
]);
{
  const s = prev();
  s.bob.credits -= 10;
  s.bob.points += 10;
  s.bob.devices.push("Smart Door-lock");
  steps.push({
    id: "r1-bob-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 5,
    title: "Bob buys the Smart Door-lock",
    narration: ["He pays the 10-credit value and claims it. +10 points."],
    playerStates: s,
    historyEntries: ["Bob rolled 5, landed on Smart Door-lock (unowned), paid 10 credits to acquire it. +10 points."],
  });
}

// ---- Dylan: buy Smart Utility Meter ----
pushRoll("r1-dylan-roll", "dylan", 1, "Turn 1 — Dylan", "Dylan rolls a 1.");
pushLand("r1-dylan-land", "dylan", 1, "Turn 1 — Dylan", [
  "He moves 1 cell and lands on the Smart Utility Meter: an Energy & Comfort device, unowned, worth 8 points.",
]);
{
  const s = prev();
  s.dylan.credits -= 8;
  s.dylan.points += 8;
  s.dylan.devices.push("Smart Utility Meter");
  steps.push({
    id: "r1-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 1,
    title: "Dylan buys the Smart Utility Meter",
    narration: ["He pays 8 credits and claims it. He's already planning to come back for its Energy & Comfort partner."],
    playerStates: s,
    historyEntries: ["Dylan rolled 1, landed on Smart Utility Meter (unowned), paid 8 credits to acquire it. +8 points."],
  });
}

// ---- Divyo: Scenario ----
pushRoll("r1-divyo-roll", "divyo", 6, "Turn 1 — Divyo", "Divyo rolls a 6.");
pushLand("r1-divyo-land", "divyo", 6, "Turn 1 — Divyo", [
  "He moves 6 cells and lands on Scenario: draw a situational prompt and classify its STRIDE category to earn points.",
]);
{
  const s = prev();
  s.divyo.points += 6;
  steps.push({
    id: "r1-divyo-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 6,
    title: "Divyo reasons out a Scenario",
    narration: [
      "He draws a card describing an ISP phishing email asking for payment details, and says out loud which STRIDE category it is, and why.",
      "He identifies it as Spoofing: the email is impersonating the ISP to trick the reader into handing over card details. Correct reasoning earns him 6 points.",
    ],
    playerStates: s,
    historyEntries: [
      "Divyo rolled 6, landed on Scenario, drew \"ISP Phishing Email.\" Correctly identified it as Spoofing. +6 points.",
    ],
  });
}

// ---- Argha: Chance ----
pushRoll("r1-argha-roll", "argha", 3, "Turn 1 — Argha", "Argha rolls a 3.");
pushLand("r1-argha-land", "argha", 3, "Turn 1 — Argha", [
  "He moves 3 cells and lands on Chance: draw an unexpected event card.",
]);
{
  const s = prev();
  s.argha.note = "Holding a Firewall Upgrade bonus";
  steps.push({
    id: "r1-argha-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 3,
    title: "Argha draws Firewall Upgrade",
    narration: [
      "The card blocks the next attacker who lands on his cell, and earns him points from the block. He tucks it away for later.",
    ],
    playerStates: s,
    historyEntries: ["Argha rolled 3, landed on Chance, drew \"Firewall Upgrade\" (blocks the next attacker on his cell)."],
  });
}

// =========================================================================
// Round 2 — a color group completes, then the first fight
// =========================================================================

// ---- Dylan: buy Smart Thermostat, complete Energy & Comfort ----
pushRoll("r2-dylan-roll", "dylan", 1, "Turn 2 — Dylan", "Dylan rolls a 1.");
pushLand("r2-dylan-land", "dylan", 2, "Turn 2 — Dylan", [
  "He moves 1 cell and lands on the Smart Thermostat: the second and last Energy & Comfort device, unowned, worth 6 points.",
]);
{
  const s = prev();
  s.dylan.credits -= 6;
  s.dylan.points += 6;
  s.dylan.devices.push("Smart Thermostat");
  steps.push({
    id: "r2-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 2 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 2,
    title: "Dylan completes the Energy & Comfort group",
    narration: [
      "He pays 6 credits and claims it. Because he now owns every device in that color group, Color-Group Immunity kicks in: both devices are now immune to attack, and point gains tied to them grow.",
    ],
    playerStates: s,
    historyEntries: [
      "Dylan rolled 1, landed on Smart Thermostat (unowned), paid 6 credits to acquire it. +6 points.",
      "Dylan now owns the full Energy & Comfort group. Color-Group Immunity is active on Smart Utility Meter and Smart Thermostat.",
    ],
  });
}

// ---- Alice attacks Bob's Smart Door-lock ----
pushRoll("r2-alice-roll", "alice", 1, "Turn 2 — Alice", "Alice rolls a 1.");
pushLand("r2-alice-land", "alice", 5, "Turn 2 — Alice", [
  "She moves 1 cell and lands on the Smart Door-lock, which Bob already owns.",
  "Landing on an occupied device is a choice: pay Bob half its value (5 credits) to pass, or attack it outright with a card from her hand. Alice decides to attack.",
]);
{
  const s = prev();
  const card = CARDS["action-09"];
  steps.push({
    id: "r2-alice-combat-1",
    phase: "combat",
    turnLabel: "Turn 2 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 5,
    title: "Round 1: Alice plays Activity Log Manipulation",
    narration: [
      "She plays Activity Log Manipulation, a Repudiation attack: the plan is to delete the Smart Door-lock's access logs so there's no clean record of what happened.",
      "Bob checks his hand for Immutable Logging, the one defense that stops this attack, and doesn't have it. The defense fails.",
    ],
    playerStates: s,
    historyEntries: ["Alice plays Activity Log Manipulation (Repudiation) on Bob's Smart Door-lock. Bob has no Immutable Logging in hand."],
    combat: {
      attacker: "alice",
      defender: "bob",
      deviceName: "Smart Door-lock",
      round: 1,
      attackCard: card,
      defenseCard: null,
      outcome: "attack-succeeds",
      pointsDelta: { attacker: 5, defender: -5 },
      deviceTransferred: false,
    },
  });
}
{
  const s = prev();
  s.alice.handSize -= 1;
  s.alice.points += 5;
  s.bob.points -= 5;
  steps.push({
    id: "r2-alice-resolve",
    phase: "resolve",
    turnLabel: "Turn 2 — Alice (resolution)",
    activePlayer: "alice",
    highlightCellIndex: 5,
    title: "Resolution: Alice wins the round",
    narration: [
      "A failed defense lets the attacker gain points: Alice +5, Bob -5. The Smart Door-lock isn't critical infrastructure like a router, so ownership does not change hands on a single failed defense. Bob keeps it, just with a smaller score and no clean log of the breach.",
    ],
    playerStates: s,
    historyEntries: [
      "Round resolved: attack succeeded. Alice +5 points, Bob -5 points. Ownership of Smart Door-lock stays with Bob (not a critical asset). Alice's Activity Log Manipulation is spent.",
    ],
  });
}

// ---- Bob: buy Wireless Router (elided travel) ----
pushRoll("r2-bob-roll", "bob", 6, "Turn 2 — Bob", "A couple of turns later, Bob rolls a 6.");
pushLand("r2-bob-land", "bob", 25, "Turn 2 — Bob", [
  "He lands on the Wireless Router: critical infrastructure, unowned, worth 18 points. Landing here on an owned Router or Home Server works the same as any device, except a single failed defense is enough to change hands, not just points.",
]);
{
  const s = prev();
  s.bob.credits -= 18;
  s.bob.points += 18;
  s.bob.devices.push("Wireless Router");
  steps.push({
    id: "r2-bob-resolve",
    phase: "resolve",
    turnLabel: "Turn 2 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 25,
    title: "Bob buys the Wireless Router",
    narration: ["He pays the full 18 credits and claims it, hoping to recover the points he just lost to Alice."],
    playerStates: s,
    historyEntries: ["Bob rolled 6, landed on Wireless Router (unowned), paid 18 credits to acquire it. +18 points."],
  });
}

// ---- Divyo attacks Bob's Router: two rounds ----
pushRoll("r2-divyo-roll", "divyo", 4, "Turn 2 — Divyo", "A turn later, Divyo rolls a 4.");
pushLand("r2-divyo-land", "divyo", 25, "Turn 2 — Divyo", [
  "He lands right on Bob's new Wireless Router. Routers and Home Servers are flagged as critical infrastructure: a single successful compromise here can transfer the whole device, not just a few points, because a breached gateway can expose everything connected to it.",
  "Divyo chooses to attack.",
]);
{
  const s = prev();
  const card = CARDS["action-07"];
  const def = CARDS["action-33"];
  steps.push({
    id: "r2-divyo-combat-1",
    phase: "combat",
    turnLabel: "Turn 2 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 25,
    title: "Round 1: Divyo plays Zero-Day Exploit",
    narration: [
      "He plays Zero-Day Exploit, an Elevation of Privilege attack that can target any device before a patch exists.",
      "Bob happens to have Intrusion Detection & Prevention System in hand. It monitors traffic in real time and catches the exploit attempt. The defense succeeds.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 1: Divyo plays Zero-Day Exploit (Elevation of Privilege) on Bob's Wireless Router. Bob defends with Intrusion Detection & Prevention System. Defense succeeds, attack blocked.",
    ],
    combat: {
      attacker: "divyo",
      defender: "bob",
      deviceName: "Wireless Router",
      round: 1,
      attackCard: card,
      defenseCard: def,
      outcome: "defended",
      pointsDelta: { attacker: 0, defender: 0 },
      deviceTransferred: false,
    },
  });
}
{
  const s = prev();
  s.divyo.handSize -= 1;
  s.bob.handSize -= 1;
  steps.push({
    id: "r2-divyo-resolve-1",
    phase: "resolve",
    turnLabel: "Turn 2 — Divyo (round 1 resolution)",
    activePlayer: "divyo",
    highlightCellIndex: 25,
    title: "Resolution: Bob defends, nobody scores",
    narration: [
      "No points move and the router stays with Bob. But both cards used to fight this round are spent: Divyo's Zero-Day Exploit and Bob's Intrusion Detection & Prevention System are gone. Divyo still has other attack cards, so he tries again.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 1 resolved: defended, no points change. Divyo's Zero-Day Exploit and Bob's Intrusion Detection & Prevention System are both spent.",
    ],
  });
}
{
  const s = prev();
  const card = CARDS["action-15"];
  steps.push({
    id: "r2-divyo-combat-2",
    phase: "combat",
    turnLabel: "Turn 2 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 25,
    title: "Round 2: Divyo plays Router Hijacking",
    narration: [
      "Undeterred, Divyo plays Router Hijacking, a Tampering attack that only works on routers, but is exactly on target here.",
      "Bob checks his hand again. His one broad defense card is already spent from round 1, and he doesn't have Secure DNS or a Firewall card either. The defense fails.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 2: Divyo plays Router Hijacking (Tampering) on Bob's Wireless Router. Bob has no defense left for it.",
    ],
    combat: {
      attacker: "divyo",
      defender: "bob",
      deviceName: "Wireless Router",
      round: 2,
      attackCard: card,
      defenseCard: null,
      outcome: "critical-transfer",
      pointsDelta: { attacker: 18, defender: -18 },
      deviceTransferred: true,
    },
  });
}
{
  const s = prev();
  s.divyo.handSize -= 1;
  s.divyo.points += 18;
  s.divyo.devices.push("Wireless Router");
  s.bob.points -= 18;
  s.bob.devices = s.bob.devices.filter((d) => d !== "Wireless Router");
  steps.push({
    id: "r2-divyo-resolve-2",
    phase: "resolve",
    turnLabel: "Turn 2 — Divyo (round 2 resolution)",
    activePlayer: "divyo",
    highlightCellIndex: 25,
    title: "Resolution: the router changes hands",
    narration: [
      "Because the Wireless Router is critical infrastructure, this one failed defense is enough: ownership transfers straight to Divyo. Bob loses the router's 18 points; Divyo gains them and takes the device.",
      "This is the outsized-impact rule in action: a single breached gateway really does cost more than a smart bulb, and it took a second, different attack card to get there after the first one was blocked.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 2 resolved: attack succeeded. Because Wireless Router is critical infrastructure, ownership transfers to Divyo on this single failure. Divyo +18 points, Bob -18 points.",
    ],
  });
}

// ---- Argha crosses GO, attacks Dylan's immune meter ----
pushRoll("r2-argha-roll", "argha", 4, "Turn 2 — Argha", "A few turns later, Argha rolls a 4.");
{
  const s = prev();
  s.argha.boardPos = 1;
  s.argha.credits += 10;
  s.argha.handSize += 1;
  steps.push({
    id: "r2-argha-land",
    phase: "land",
    turnLabel: "Turn 2 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 1,
    title: "Argha crosses GO and lands on Dylan's Smart Utility Meter",
    narration: [
      "His token has been quietly circling the board. This roll crosses GO for the first time, so he collects the standard 10-credit bonus and draws an extra action card, then keeps moving to land on Dylan's Smart Utility Meter.",
      "Dylan owns it, so it's another decision point: pay half its value (4 credits) to pass, or attack. Argha decides to attack, not realizing Dylan owns the whole Energy & Comfort group.",
    ],
    playerStates: s,
    historyEntries: ["Argha rolled 4, crossed GO (+10 credits, +1 card), landed on Dylan's Smart Utility Meter (occupied)."],
  });
}
{
  const s = prev();
  const card = CARDS["action-13"];
  s.argha.handSize -= 1;
  s.dylan.points += 2;
  steps.push({
    id: "r2-argha-combat",
    phase: "combat",
    turnLabel: "Turn 2 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 1,
    title: "Argha plays Wireless Sniffing, but Color-Group Immunity blocks it",
    narration: [
      "He plays Wireless Sniffing, an Information Disclosure attack that works on any device. It doesn't matter: Color-Group Immunity blocks it automatically before any defense card is even needed.",
      "Dylan doesn't lose anything, and the rules reward a successful immunity with a small point bonus. Argha's card is still spent, though, he committed it before finding out.",
    ],
    playerStates: s,
    historyEntries: [
      "Argha plays Wireless Sniffing (Information Disclosure) on Dylan's Smart Utility Meter. Auto-blocked by Color-Group Immunity before any defense is needed. Dylan +2 points. Argha's card is spent regardless.",
    ],
    combat: {
      attacker: "argha",
      defender: "dylan",
      deviceName: "Smart Utility Meter",
      round: 1,
      attackCard: card,
      defenseCard: null,
      outcome: "immunity-block",
      pointsDelta: { attacker: 0, defender: 2 },
      deviceTransferred: false,
    },
  });
}

// =========================================================================
// Round 3 — passing instead of fighting, then the special cells
// =========================================================================

// ---- Bob lands on Alice's IP Camera and pays instead of fighting ----
pushRoll("r3-bob-roll", "bob", 4, "Turn 3 — Bob", "A couple of turns later, Bob rolls a 4.");
pushLand("r3-bob-land", "bob", 4, "Turn 3 — Bob", [
  "He lands on Alice's IP Camera. He could attack, but he's saving his remaining cards for a safer fight, so he chooses to just pay and pass.",
]);
{
  const s = prev();
  s.bob.credits -= 5;
  s.alice.credits += 5;
  steps.push({
    id: "r3-bob-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 4,
    title: "Bob pays half value instead of attacking",
    narration: [
      "For a normal device, passing costs half its point value in credits: the IP Camera is worth 10 points, so Bob pays Alice 5 credits. No cards are used, no points move, and the device stays exactly as it was.",
    ],
    playerStates: s,
    historyEntries: ["Bob rolled 4, landed on Alice's IP Camera (occupied). Chose to pay instead of attack: 5 credits to Alice (half of 10)."],
  });
}

// ---- Dylan lands on Divyo's Router and pays the full value ----
pushRoll("r3-dylan-roll", "dylan", 6, "Turn 3 — Dylan", "Several turns later, Dylan rolls a 6.");
pushLand("r3-dylan-land", "dylan", 25, "Turn 3 — Dylan", [
  "He lands on Divyo's Wireless Router. It's critical infrastructure, he doesn't have a card he trusts for it, and he's not willing to risk losing his own devices' worth of cards for a fight he might lose. He pays instead.",
]);
{
  const s = prev();
  s.dylan.credits -= 18;
  s.divyo.credits += 18;
  steps.push({
    id: "r3-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 25,
    title: "Dylan pays the full value on critical infrastructure",
    narration: [
      "Special cells don't get the half-price discount: passing on a Router or Home Server costs its full value. Dylan pays Divyo all 18 credits. No attack, no risk, no points change, ownership stays with Divyo.",
    ],
    playerStates: s,
    historyEntries: [
      "Dylan rolled 6, landed on Divyo's Wireless Router (occupied, critical infrastructure). Chose to pay instead of attack: 18 credits to Divyo (full value).",
    ],
  });
}

// ---- Bob lands on STOP ----
pushRoll("r3b-bob-roll", "bob", 3, "Turn 4 — Bob", "A turn later, Bob rolls a 3.");
{
  const s = prev();
  s.bob.boardPos = 7;
  s.bob.skippingNextTurn = true;
  steps.push({
    id: "r3b-bob-land",
    phase: "land",
    turnLabel: "Turn 4 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 7,
    title: "Bob lands on STOP",
    narration: ["A forced incident-response lockdown: he has to forfeit his next turn to run system diagnostics before he can act again."],
    playerStates: s,
    historyEntries: ["Bob rolled 3, landed on STOP. He forfeits his next turn."],
  });
}

// ---- Divyo lands on Power Outage ----
pushRoll("r3b-divyo-roll", "divyo", 5, "Turn 3 — Divyo", "A few turns later, Divyo rolls a 5.");
{
  const s = prev();
  s.divyo.boardPos = 13;
  steps.push({
    id: "r3b-divyo-land",
    phase: "land",
    turnLabel: "Turn 3 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 13,
    title: "Divyo lands on Power Outage",
    narration: [
      "Every device briefly loses its continuous active protections, a short window where an attack lands more easily than usual, until the next turn passes.",
    ],
    playerStates: s,
    historyEntries: ["Divyo rolled 5, landed on Power Outage. Active device protections are briefly down."],
  });
}

// ---- Final standings ----
{
  const s = prev();
  steps.push({
    id: "final",
    phase: "snapshot",
    turnLabel: "Snapshot",
    activePlayer: null,
    highlightCellIndex: null,
    title: "How each win condition reads right now",
    narration: [
      "This is only a slice of a full game, but it's enough to see how the three win conditions would be scored if play stopped here.",
      "Elimination checks who still holds credits and functioning devices; nobody has been wiped out yet. Timed Match and Target Score both use the same running total: credits on hand plus the point value of every device owned. Whoever is highest on that combined number is currently leading.",
    ],
    playerStates: s,
    historyEntries: ["End of this example. Final standings and win-condition snapshot below."],
  });
}

export const WALKTHROUGH_STEPS: WalkthroughStep[] = steps;

export function totalScore(state: PlayerState): number {
  return state.credits + state.points;
}

export type ModeStanding = {
  playerId: PlayerId;
  value: number;
};

export function eliminationStatus(states: Record<PlayerId, PlayerState>): { active: PlayerId[]; out: PlayerId[] } {
  const active: PlayerId[] = [];
  const out: PlayerId[] = [];
  for (const id of PLAYER_IDS) {
    const s = states[id];
    if (s.credits <= 0 && s.devices.length === 0) out.push(id);
    else active.push(id);
  }
  return { active, out };
}

export function rankByTotal(states: Record<PlayerId, PlayerState>): ModeStanding[] {
  return PLAYER_IDS.map((id) => ({ playerId: id, value: totalScore(states[id]) })).sort((a, b) => b.value - a.value);
}

export const TARGET_SCORE = 100;
