import { cardFaces, type CardFace } from "@/app/publications/cyqured/cardData";
import { CONNECTED_DEVICES } from "./boardData";

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
  /** The actual card ids this player is physically holding right now (not
   * just a count) — starts as 8 action cards, plus any Chance card whose
   * effect the narration says they keep rather than resolve immediately —
   * so the UI can render each one with the same card art used everywhere
   * else. */
  hand: string[];
  boardPos: number;
  skippingNextTurn?: boolean;
  note?: string;
};

/** Looks up a real card by its cardData.ts id. Every card shown in this
 * walkthrough (attack, defense, chance, scenario) is the actual card, not a
 * stand-in, so it renders with the same flippable art used in the Cards tab. */
export function cardById(id: string): CardFace {
  const card = cardFaces.find((c) => c.id === id);
  if (!card) throw new Error(`walkthroughData: unknown card id "${id}"`);
  return card;
}

export type BoardCellKind = "go" | "stop" | "power-outage" | "card-penalty" | "bonus-cards" | "chance" | "scenario" | "device";

export type BoardCell = {
  kind: BoardCellKind;
  name: string;
  color?: string;
  points?: number;
  description: string;
  /** Column (0-6) and row (0-8) on the real board image's 7x9 cell grid. */
  col: number;
  row: number;
};

const KIND_DESC: Record<Exclude<BoardCellKind, "device">, string> = {
  go: "Complete a full circuit to collect 10 credit points and draw an action card.",
  stop: "Skip a turn: forced incident-response lockdown.",
  "power-outage": "Devices briefly lose their continuous active protections, a short window where attacks land more easily.",
  "card-penalty": "Discard one action card from your hand into the central discard pile.",
  "bonus-cards": "Get 2 cards from the action deck.",
  chance: "Draw an unexpected event card: real-world vulnerabilities, zero-days, or sudden security incidents.",
  scenario: "Draw a situational security prompt and classify its STRIDE threat category to earn points.",
};

const deviceCell = (name: string, col: number, row: number): BoardCell => {
  const dev = CONNECTED_DEVICES.find((d) => d.name === name)!;
  return {
    kind: "device",
    name,
    color: dev.color,
    points: dev.points,
    description: `${dev.category} device, worth ${dev.points} points. Unowned: pay ${dev.points} credits to claim it. Owned by someone else: pay half its value to pass, or attack for it.`,
    col,
    row,
  };
};

const specialCell = (kind: Exclude<BoardCellKind, "device">, name: string, col: number, row: number): BoardCell => ({
  kind,
  name,
  description: KIND_DESC[kind],
  col,
  row,
});

/** The 28-cell board track, matching the real printed board
 * (public/media/publications/cyqured/board.webp) exactly: a 7-column x
 * 9-row grid of square cells, GO at the bottom-left corner, play moving up
 * the left side first. Every device, point value, and special cell here is
 * read directly off that image, not invented. */
export const BOARD_TRACK: BoardCell[] = [
  specialCell("go", "GO", 0, 8),
  deviceCell("Smart Fridge", 0, 7),
  specialCell("chance", "Chance", 0, 6),
  deviceCell("Smart Printer", 0, 5),
  specialCell("scenario", "Scenario", 0, 4),
  deviceCell("Wireless Router", 0, 3),
  specialCell("card-penalty", "Card Penalty", 0, 2),
  deviceCell("Smart Thermostat", 0, 1),
  specialCell("power-outage", "Power Outage", 0, 0),
  deviceCell("Smart Utility Meter", 1, 0),
  deviceCell("Smart Door-lock", 2, 0),
  specialCell("chance", "Chance", 3, 0),
  deviceCell("IP Camera", 4, 0),
  deviceCell("Smart Speaker", 5, 0),
  specialCell("bonus-cards", "+2 Cards", 6, 0),
  deviceCell("Smart TV", 6, 1),
  specialCell("chance", "Chance", 6, 2),
  deviceCell("Home Server", 6, 3),
  specialCell("scenario", "Scenario", 6, 4),
  deviceCell("Smart Wearables", 6, 5),
  specialCell("card-penalty", "Card Penalty", 6, 6),
  deviceCell("Tablet", 6, 7),
  specialCell("stop", "STOP", 6, 8),
  deviceCell("Smartphone", 5, 8),
  deviceCell("Gaming Console", 4, 8),
  specialCell("chance", "Chance", 3, 8),
  deviceCell("Desktop", 2, 8),
  deviceCell("Laptop", 1, 8),
];

// Starting hands: 8 real cards each, dealt from the shared 34-card
// attack-and-defense action deck (17 attack ids action-02..action-18, 17
// defense ids action-19..action-35 in cardData.ts). A real shuffle-and-deal
// doesn't hand every player a balanced 4-4 split — it produces a spread of
// ratios. Each player here gets one distinct attack:defense split from
// {7-1, 6-2, 5-3, 4-4, 3-5}, so nobody is holding an implausible 8-0 or 1-7
// hand. Every id a later combat/penalty step spends is seeded into the
// right player's hand here, so a card never leaves a hand it wasn't
// actually in.
const START: Record<PlayerId, PlayerState> = {
  // 3 attack / 5 defense — Alice never initiates a fight all game; she only
  // ever defends once and pays to pass otherwise, so a defense-heavy hand
  // matches how she actually plays.
  alice: {
    credits: 50,
    points: 0,
    devices: [],
    hand: ["action-20", "action-05", "action-33", "action-21", "action-06", "action-22", "action-10", "action-23"],
    boardPos: 0,
  },
  // 4 attack / 4 defense — Bob both attacks once and defends twice, an
  // even mix.
  bob: {
    credits: 50,
    points: 0,
    devices: [],
    hand: ["action-24", "action-11", "action-13", "action-25", "action-29", "action-12", "action-26", "action-14"],
    boardPos: 0,
  },
  // 6 attack / 2 defense — Dylan never fights at all (he's only ever on the
  // buying/passing side), so his hand composition is just flavor.
  dylan: {
    credits: 50,
    points: 0,
    devices: [],
    hand: ["action-31", "action-02", "action-05", "action-32", "action-03", "action-14", "action-04", "action-06"],
    boardPos: 0,
  },
  // 5 attack / 3 defense — Divyo only ever attacks (once), never defends.
  divyo: {
    credits: 50,
    points: 0,
    devices: [],
    hand: ["action-09", "action-27", "action-17", "action-30", "action-12", "action-18", "action-28", "action-10"],
    boardPos: 0,
  },
  // 7 attack / 1 defense — Argha is the table's aggressor: every fight in
  // this walkthrough that isn't Bob-vs-Dylan is Argha attacking someone.
  argha: {
    credits: 50,
    points: 0,
    devices: [],
    hand: ["action-07", "action-02", "action-19", "action-15", "action-03", "action-08", "action-04", "action-16"],
    boardPos: 0,
  },
};

function clone(state: Record<PlayerId, PlayerState>): Record<PlayerId, PlayerState> {
  const next = {} as Record<PlayerId, PlayerState>;
  for (const id of PLAYER_IDS) next[id] = { ...state[id], devices: [...state[id].devices], hand: [...state[id].hand] };
  return next;
}

/** Removes one card from a player's hand by id (a card being spent in
 * combat, or discarded to a Card Penalty cell). */
function discard(s: Record<PlayerId, PlayerState>, player: PlayerId, cardId: string) {
  s[player].hand = s[player].hand.filter((id) => id !== cardId);
}

export type PhaseKind = "setup" | "roll" | "land" | "resolve" | "combat" | "snapshot";

export type CombatOutcome = "defended" | "attack-succeeds" | "critical-transfer" | "immunity-block";

export type CombatInfo = {
  attacker: PlayerId;
  defender: PlayerId;
  deviceName: string;
  round: number;
  attackCard: CardFace;
  defenseCard: CardFace | null;
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
  /** A chance/scenario card being drawn and shown at this step. */
  drawnCard?: CardFace;
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

// Every move below is a real, single six-sided die roll (1-6) added to that
// player's own last known position on the real board layout above. Where a
// player needs to travel further than one roll can reach, the narration
// says so explicitly ("a few turns later") instead of pretending one roll
// covered the distance.

// ---- Turn 1: everyone's opening move ----

// Dylan buys the Smart Fridge
pushRoll("t1-dylan-roll", "dylan", 1, "Turn 1 — Dylan", "Dylan goes first. He rolls a 1.");
pushLand("t1-dylan-land", "dylan", 1, "Turn 1 — Dylan", [
  "He moves one cell up from GO and lands on the Smart Fridge: an Appliances device, unowned, worth 6 points.",
]);
{
  const s = prev();
  s.dylan.credits -= 6;
  s.dylan.points += 6;
  s.dylan.devices.push("Smart Fridge");
  steps.push({
    id: "t1-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 1,
    title: "Dylan buys the Smart Fridge",
    narration: ["He pays 6 credits and claims it. There's a second Appliances device further up the same side; he's already eyeing it."],
    playerStates: s,
    historyEntries: ["Dylan rolled 1, landed on Smart Fridge (unowned), paid 6 credits to acquire it. +6 points."],
  });
}

// Alice buys the Wireless Router
pushRoll("t1-alice-roll", "alice", 5, "Turn 1 — Alice", "Alice rolls a 5.");
pushLand("t1-alice-land", "alice", 5, "Turn 1 — Alice", [
  "She moves 5 cells up the same side and lands on the Wireless Router: critical infrastructure, unowned, worth 18 points.",
]);
{
  const s = prev();
  s.alice.credits -= 18;
  s.alice.points += 18;
  s.alice.devices.push("Wireless Router");
  steps.push({
    id: "t1-alice-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 5,
    title: "Alice buys the Wireless Router",
    narration: [
      "She pays the full 18 credits and claims it. It's expensive, but owning a router is worth a lot, if she can hold onto it.",
    ],
    playerStates: s,
    historyEntries: ["Alice rolled 5, landed on Wireless Router (unowned), paid 18 credits to acquire it. +18 points."],
  });
}

// Bob lands on Card Penalty
pushRoll("t1-bob-roll", "bob", 6, "Turn 1 — Bob", "Bob rolls a 6.");
{
  const s = prev();
  s.bob.boardPos = 6;
  discard(s, "bob", "action-11");
  steps.push({
    id: "t1-bob-land",
    phase: "land",
    turnLabel: "Turn 1 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 6,
    title: "Bob lands on Card Penalty",
    narration: ["Rough start: he has to discard one action card from his hand into the central discard pile, sight unseen."],
    playerStates: s,
    historyEntries: ["Bob rolled 6, landed on Card Penalty. Discarded 1 action card."],
  });
}

// Divyo lands on Scenario
pushRoll("t1-divyo-roll", "divyo", 4, "Turn 1 — Divyo", "Divyo rolls a 4.");
pushLand("t1-divyo-land", "divyo", 4, "Turn 1 — Divyo", [
  "He moves 4 cells and lands on Scenario: draw a situational prompt and classify its STRIDE category to earn points.",
]);
{
  const s = prev();
  s.divyo.points += 6;
  steps.push({
    id: "t1-divyo-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 4,
    title: "Divyo reasons out a Scenario",
    narration: [
      "He draws a card describing an ISP phishing email asking for payment details, and says out loud which STRIDE category it is, and why.",
      "He identifies it as Spoofing: the email is impersonating the ISP to trick the reader into handing over card details. Correct reasoning earns him 6 points.",
    ],
    playerStates: s,
    historyEntries: [
      "Divyo rolled 4, landed on Scenario, drew \"ISP Phishing Email.\" Correctly identified it as Spoofing. +6 points.",
    ],
    drawnCard: cardById("scenario-02"),
  });
}

// Argha draws Chance
pushRoll("t1-argha-roll", "argha", 2, "Turn 1 — Argha", "Argha rolls a 2.");
pushLand("t1-argha-land", "argha", 2, "Turn 1 — Argha", [
  "He moves 2 cells and lands on Chance: draw an unexpected event card.",
]);
{
  const s = prev();
  s.argha.note = "Holding a Firewall Upgrade bonus";
  s.argha.hand.push("chance-06");
  steps.push({
    id: "t1-argha-resolve",
    phase: "resolve",
    turnLabel: "Turn 1 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 2,
    title: "Argha draws Firewall Upgrade",
    narration: [
      "The card blocks the next attacker who lands on his cell, and earns him points from the block. He tucks it away for later.",
    ],
    playerStates: s,
    historyEntries: ["Argha rolled 2, landed on Chance, drew \"Firewall Upgrade\" (blocks the next attacker on his cell)."],
    drawnCard: cardById("chance-06"),
  });
}

// =========================================================================
// Turn 2 — a color group completes, then the first fight
// =========================================================================

// Dylan buys the Smart Printer, completes Appliances
pushRoll("t2-dylan-roll", "dylan", 2, "Turn 2 — Dylan", "Dylan rolls a 2.");
pushLand("t2-dylan-land", "dylan", 3, "Turn 2 — Dylan", [
  "He moves 2 cells and lands on the Smart Printer: the second and last Appliances device, unowned, worth 8 points.",
]);
{
  const s = prev();
  s.dylan.credits -= 8;
  s.dylan.points += 8;
  s.dylan.devices.push("Smart Printer");
  steps.push({
    id: "t2-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 2 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 3,
    title: "Dylan completes the Appliances group",
    narration: [
      "He pays 8 credits and claims it. Because he now owns every device in that color group, Color-Group Immunity kicks in: both the Fridge and the Printer are now immune to attack, and point gains tied to them grow.",
    ],
    playerStates: s,
    historyEntries: [
      "Dylan rolled 2, landed on Smart Printer (unowned), paid 8 credits to acquire it. +8 points.",
      "Dylan now owns the full Appliances group. Color-Group Immunity is active on Smart Fridge and Smart Printer.",
    ],
  });
}

// Bob buys the Smart Door-lock
pushRoll("t2-bob-roll", "bob", 4, "Turn 2 — Bob", "Bob rolls a 4.");
pushLand("t2-bob-land", "bob", 10, "Turn 2 — Bob", [
  "He moves 4 cells and lands on the Smart Door-lock: a Home Security device, unowned, worth 10 points.",
]);
{
  const s = prev();
  s.bob.credits -= 10;
  s.bob.points += 10;
  s.bob.devices.push("Smart Door-lock");
  steps.push({
    id: "t2-bob-resolve",
    phase: "resolve",
    turnLabel: "Turn 2 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 10,
    title: "Bob buys the Smart Door-lock",
    narration: ["He pays 10 credits and claims it."],
    playerStates: s,
    historyEntries: ["Bob rolled 4, landed on Smart Door-lock (unowned), paid 10 credits to acquire it. +10 points."],
  });
}

// Divyo lands on Power Outage
pushRoll("t2-divyo-roll", "divyo", 4, "Turn 2 — Divyo", "Divyo rolls a 4.");
{
  const s = prev();
  s.divyo.boardPos = 8;
  steps.push({
    id: "t2-divyo-land",
    phase: "land",
    turnLabel: "Turn 2 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 8,
    title: "Divyo lands on Power Outage",
    narration: [
      "Every device briefly loses its continuous active protections, a short window where an attack lands more easily than usual, until the next turn passes.",
    ],
    playerStates: s,
    historyEntries: ["Divyo rolled 4, landed on Power Outage. Active device protections are briefly down."],
  });
}

// Alice lands on Card Penalty
pushRoll("t2-alice-roll", "alice", 1, "Turn 2 — Alice", "Alice rolls a 1.");
{
  const s = prev();
  s.alice.boardPos = 6;
  discard(s, "alice", "action-06");
  steps.push({
    id: "t2-alice-land",
    phase: "land",
    turnLabel: "Turn 2 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 6,
    title: "Alice lands on Card Penalty",
    narration: [
      "She discards one action card. Her Wireless Router stays put a few cells back, still very much a target for anyone who lands on it.",
    ],
    playerStates: s,
    historyEntries: ["Alice rolled 1, landed on Card Penalty. Discarded 1 action card."],
  });
}

// Argha attacks Alice's Wireless Router: two rounds
pushRoll("t2-argha-roll", "argha", 3, "Turn 2 — Argha", "Argha rolls a 3.");
pushLand("t2-argha-land", "argha", 5, "Turn 2 — Argha", [
  "He lands right on Alice's Wireless Router. Routers and Home Servers are flagged as critical infrastructure: a single successful compromise here can transfer the whole device, not just a few points, because a breached gateway can expose everything connected to it.",
  "Argha chooses to attack rather than pay.",
]);
{
  const s = prev();
  const card = cardById("action-07");
  const def = cardById("action-33");
  steps.push({
    id: "t2-argha-combat-1",
    phase: "combat",
    turnLabel: "Turn 2 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 5,
    title: "Round 1: Argha plays Zero-Day Exploit",
    narration: [
      "He plays Zero-Day Exploit, an Elevation of Privilege attack that can target any device before a patch exists.",
      "Alice happens to have Intrusion Detection & Prevention System in hand. It monitors traffic in real time and catches the exploit attempt. The defense succeeds.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 1: Argha plays Zero-Day Exploit (Elevation of Privilege) on Alice's Wireless Router. Alice defends with Intrusion Detection & Prevention System. Defense succeeds, attack blocked.",
    ],
    combat: {
      attacker: "argha",
      defender: "alice",
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
  discard(s, "argha", "action-07");
  discard(s, "alice", "action-33");
  steps.push({
    id: "t2-argha-resolve-1",
    phase: "resolve",
    turnLabel: "Turn 2 — Argha (round 1 resolution)",
    activePlayer: "argha",
    highlightCellIndex: 5,
    title: "Resolution: Alice defends, nobody scores",
    narration: [
      "No points move and the router stays with Alice. Both cards used this round are spent: Argha's Zero-Day Exploit and Alice's Intrusion Detection & Prevention System. Argha still has other ideas, so he tries again.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 1 resolved: defended, no points change. Argha's Zero-Day Exploit and Alice's Intrusion Detection & Prevention System are both spent.",
    ],
  });
}
{
  const s = prev();
  const card = cardById("action-15");
  steps.push({
    id: "t2-argha-combat-2",
    phase: "combat",
    turnLabel: "Turn 2 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 5,
    title: "Round 2: Argha plays Router Hijacking",
    narration: [
      "Undeterred, Argha plays Router Hijacking, a Tampering attack that only works on routers, but is exactly on target here.",
      "Alice checks her hand again. Her one broad defense card is already spent from round 1, and she doesn't have Secure DNS or a Firewall card either. The defense fails.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 2: Argha plays Router Hijacking (Tampering) on Alice's Wireless Router. Alice has no defense left for it.",
    ],
    combat: {
      attacker: "argha",
      defender: "alice",
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
  discard(s, "argha", "action-15");
  s.argha.points += 18;
  s.argha.devices.push("Wireless Router");
  s.alice.points -= 18;
  s.alice.devices = s.alice.devices.filter((d) => d !== "Wireless Router");
  steps.push({
    id: "t2-argha-resolve-2",
    phase: "resolve",
    turnLabel: "Turn 2 — Argha (round 2 resolution)",
    activePlayer: "argha",
    highlightCellIndex: 5,
    title: "Resolution: the router changes hands",
    narration: [
      "Because the Wireless Router is critical infrastructure, this one failed defense is enough: ownership transfers straight to Argha. Alice loses the router's 18 points; Argha gains them and takes the device.",
      "This is the outsized-impact rule in action: a single breached gateway really does cost more than a smart bulb, and it took a second, different attack card to get there after the first one was blocked.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 2 resolved: attack succeeded. Because Wireless Router is critical infrastructure, ownership transfers to Argha on this single failure. Argha +18 points, Alice -18 points.",
    ],
  });
}

// =========================================================================
// Turn 3 — new purchases, a normal-asset fight, and a half-price pass
// =========================================================================

// Bob buys the IP Camera
pushRoll("t3-bob-roll", "bob", 2, "Turn 3 — Bob", "Bob rolls a 2.");
pushLand("t3-bob-land", "bob", 12, "Turn 3 — Bob", [
  "He moves 2 cells and lands on the IP Camera: a Home Security device, unowned, worth 10 points.",
]);
{
  const s = prev();
  s.bob.credits -= 10;
  s.bob.points += 10;
  s.bob.devices.push("IP Camera");
  steps.push({
    id: "t3-bob-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 12,
    title: "Bob buys the IP Camera",
    narration: ["He pays 10 credits and claims it."],
    playerStates: s,
    historyEntries: ["Bob rolled 2, landed on IP Camera (unowned), paid 10 credits to acquire it. +10 points."],
  });
}

// Divyo attacks Bob's Smart Door-lock
pushRoll("t3-divyo-roll", "divyo", 2, "Turn 3 — Divyo", "Divyo rolls a 2.");
pushLand("t3-divyo-land", "divyo", 10, "Turn 3 — Divyo", [
  "He lands on Bob's Smart Door-lock. Landing on an occupied device is a choice: pay Bob half its value to pass, or attack it outright. Divyo attacks.",
]);
{
  const s = prev();
  const card = cardById("action-09");
  steps.push({
    id: "t3-divyo-combat",
    phase: "combat",
    turnLabel: "Turn 3 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 10,
    title: "Divyo plays Activity Log Manipulation",
    narration: [
      "He plays Activity Log Manipulation, a Repudiation attack: the plan is to delete the lock's access logs so there's no clean record of what happened.",
      "Bob checks his hand for Immutable Logging, the one defense that stops this attack, and doesn't have it. The defense fails.",
    ],
    playerStates: s,
    historyEntries: [
      "Divyo plays Activity Log Manipulation (Repudiation) on Bob's Smart Door-lock. Bob has no Immutable Logging in hand.",
    ],
    combat: {
      attacker: "divyo",
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
  discard(s, "divyo", "action-09");
  s.divyo.points += 5;
  s.bob.points -= 5;
  steps.push({
    id: "t3-divyo-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Divyo (resolution)",
    activePlayer: "divyo",
    highlightCellIndex: 10,
    title: "Resolution: Divyo wins the round",
    narration: [
      "A failed defense lets the attacker gain points: Divyo +5, Bob -5. The Smart Door-lock isn't critical infrastructure like a router, so ownership does not change hands on a single failed defense. Bob keeps it, just with a smaller score and no clean log of the breach.",
    ],
    playerStates: s,
    historyEntries: [
      "Round resolved: attack succeeded. Divyo +5 points, Bob -5 points. Ownership of Smart Door-lock stays with Bob (not a critical asset). Divyo's Activity Log Manipulation is spent.",
    ],
  });
}

// Alice lands on Bob's IP Camera and pays instead of fighting
pushRoll("t3-alice-roll", "alice", 6, "Turn 3 — Alice", "Alice rolls a 6.");
pushLand("t3-alice-land", "alice", 12, "Turn 3 — Alice", [
  "She lands on Bob's IP Camera. She could attack, but she's still short on cards after losing the router, so she chooses to just pay and pass.",
]);
{
  const s = prev();
  s.alice.credits -= 5;
  s.bob.credits += 5;
  steps.push({
    id: "t3-alice-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 12,
    title: "Alice pays half value instead of attacking",
    narration: [
      "For a normal device, passing costs half its point value in credits: the IP Camera is worth 10 points, so Alice pays Bob 5 credits. No cards are used, no points move, and the device stays exactly as it was.",
    ],
    playerStates: s,
    historyEntries: ["Alice rolled 6, landed on Bob's IP Camera (occupied). Chose to pay instead of attack: 5 credits to Bob (half of 10)."],
  });
}

// Dylan buys the Smart Thermostat
pushRoll("t3-dylan-roll", "dylan", 4, "Turn 3 — Dylan", "Dylan rolls a 4.");
pushLand("t3-dylan-land", "dylan", 7, "Turn 3 — Dylan", [
  "He moves 4 cells and lands on the Smart Thermostat: an Energy & Comfort device, unowned, worth 6 points. It's not part of his Appliances group, but it's still worth having.",
]);
{
  const s = prev();
  s.dylan.credits -= 6;
  s.dylan.points += 6;
  s.dylan.devices.push("Smart Thermostat");
  steps.push({
    id: "t3-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 7,
    title: "Dylan buys the Smart Thermostat",
    narration: ["He pays 6 credits and claims it."],
    playerStates: s,
    historyEntries: ["Dylan rolled 4, landed on Smart Thermostat (unowned), paid 6 credits to acquire it. +6 points."],
  });
}

// Argha buys the Smart Utility Meter
pushRoll("t3-argha-roll", "argha", 4, "Turn 3 — Argha", "Argha rolls a 4.");
pushLand("t3-argha-land", "argha", 9, "Turn 3 — Argha", [
  "He moves 4 cells from his new Wireless Router and lands on the Smart Utility Meter: unowned, worth 8 points.",
]);
{
  const s = prev();
  s.argha.credits -= 8;
  s.argha.points += 8;
  s.argha.devices.push("Smart Utility Meter");
  steps.push({
    id: "t3-argha-resolve",
    phase: "resolve",
    turnLabel: "Turn 3 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 9,
    title: "Argha buys the Smart Utility Meter",
    narration: ["He pays 8 credits and claims it."],
    playerStates: s,
    historyEntries: ["Argha rolled 4, landed on Smart Utility Meter (unowned), paid 8 credits to acquire it. +8 points."],
  });
}

// =========================================================================
// Turn 4 — Divyo grabs the Home Server, then the last two fights
// =========================================================================

// Divyo draws Chance, then buys Home Server
pushRoll("t4-divyo-roll-1", "divyo", 6, "Turn 4 — Divyo", "Divyo rolls a 6.");
pushLand("t4-divyo-land-1", "divyo", 16, "Turn 4 — Divyo", [
  "He moves 6 cells and lands on Chance: draw another unexpected event card.",
]);
{
  const s = prev();
  s.divyo.hand.push("chance-02");
  steps.push({
    id: "t4-divyo-resolve-1",
    phase: "resolve",
    turnLabel: "Turn 4 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 16,
    title: "Divyo draws Backup Power Generator",
    narration: [
      "The card automatically restores his systems the moment a power outage hits, useful given what happened to him earlier. He keeps it in reserve.",
    ],
    playerStates: s,
    historyEntries: ["Divyo rolled 6, landed on Chance, drew \"Backup Power Generator.\""],
    drawnCard: cardById("chance-02"),
  });
}
pushRoll("t4-divyo-roll-2", "divyo", 1, "Turn 4 — Divyo", "Divyo rolls a 1.");
pushLand("t4-divyo-land-2", "divyo", 17, "Turn 4 — Divyo", [
  "He moves 1 more cell and lands on the Home Server: the second piece of critical infrastructure, unowned, worth 20 points, the most valuable device on the board.",
]);
{
  const s = prev();
  s.divyo.credits -= 20;
  s.divyo.points += 20;
  s.divyo.devices.push("Home Server");
  steps.push({
    id: "t4-divyo-resolve-2",
    phase: "resolve",
    turnLabel: "Turn 4 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 17,
    title: "Divyo buys the Home Server",
    narration: ["He pays the full 20 credits and claims it."],
    playerStates: s,
    historyEntries: ["Divyo rolled 1, landed on Home Server (unowned), paid 20 credits to acquire it. +20 points."],
  });
}

// Bob attacks Dylan's immune Smart Printer, blocked
pushRoll("t4-bob-roll", "bob", 5, "Turn 4 — Bob", "A few turns later, Bob rolls a 5.");
pushLand("t4-bob-land", "bob", 3, "Turn 4 — Bob", [
  "He lands on Dylan's Smart Printer, not realizing Dylan owns the whole Appliances group. He decides to attack.",
]);
{
  const s = prev();
  const card = cardById("action-13");
  discard(s, "bob", card.id);
  s.dylan.points += 2;
  steps.push({
    id: "t4-bob-combat",
    phase: "combat",
    turnLabel: "Turn 4 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 3,
    title: "Bob plays Wireless Sniffing, but Color-Group Immunity blocks it",
    narration: [
      "He plays Wireless Sniffing, an Information Disclosure attack that works on any device. It doesn't matter: Color-Group Immunity blocks it automatically, before any defense card is even needed.",
      "Dylan doesn't lose anything, and the rules reward a successful immunity with a small point bonus. Bob's card is still spent, though: he committed it before finding out.",
    ],
    playerStates: s,
    historyEntries: [
      "Bob plays Wireless Sniffing (Information Disclosure) on Dylan's Smart Printer. Auto-blocked by Color-Group Immunity before any defense is needed. Dylan +2 points. Bob's card is spent regardless.",
    ],
    combat: {
      attacker: "bob",
      defender: "dylan",
      deviceName: "Smart Printer",
      round: 1,
      attackCard: card,
      defenseCard: null,
      outcome: "immunity-block",
      pointsDelta: { attacker: 0, defender: 2 },
      deviceTransferred: false,
    },
  });
}

// Argha tries Bob's IP Camera: two rounds, defended both times, he gives up
pushRoll("t4-argha-roll", "argha", 3, "Turn 4 — Argha", "Argha rolls a 3.");
pushLand("t4-argha-land", "argha", 12, "Turn 4 — Argha", [
  "He lands on Bob's IP Camera. He's had good and bad luck with attacks so far; he decides to press it again rather than pay.",
]);
{
  const s = prev();
  const card = cardById("action-16");
  const def = cardById("action-29");
  steps.push({
    id: "t4-argha-combat-1",
    phase: "combat",
    turnLabel: "Turn 4 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 12,
    title: "Round 1: Argha plays ARP Spoofing",
    narration: [
      "He plays ARP Spoofing, a Tampering and Information Disclosure attack that forges the local network's address table to intercept traffic.",
      "Bob has VPN & Secure Encryption in hand. It encrypts the connection so intercepted traffic is unreadable. The defense succeeds.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 1: Argha plays ARP Spoofing (Tampering, Information Disclosure) on Bob's IP Camera. Bob defends with VPN & Secure Encryption. Defense succeeds, attack blocked.",
    ],
    combat: {
      attacker: "argha",
      defender: "bob",
      deviceName: "IP Camera",
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
  discard(s, "argha", "action-16");
  discard(s, "bob", "action-29");
  steps.push({
    id: "t4-argha-resolve-1",
    phase: "resolve",
    turnLabel: "Turn 4 — Argha (round 1 resolution)",
    activePlayer: "argha",
    highlightCellIndex: 12,
    title: "Resolution: Bob defends, nobody scores",
    narration: [
      "Both cards used this round are spent: Argha's ARP Spoofing and Bob's VPN & Secure Encryption. He still has one more idea, so he tries again.",
    ],
    playerStates: s,
    historyEntries: ["Round 1 resolved: defended, no points change. Argha's ARP Spoofing and Bob's VPN & Secure Encryption are both spent."],
  });
}
{
  const s = prev();
  const card = cardById("action-08");
  const def = cardById("action-24");
  steps.push({
    id: "t4-argha-combat-2",
    phase: "combat",
    turnLabel: "Turn 4 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 12,
    title: "Round 2: Argha plays Firmware Attack",
    narration: [
      "He switches tactics and plays Firmware Attack, aiming to slip malicious code into the camera's low-level software.",
      "Bob happens to also have Secure Firmware & Software Updates in hand. His firmware is already patched, so there's nothing to exploit. The defense succeeds again.",
    ],
    playerStates: s,
    historyEntries: [
      "Round 2: Argha plays Firmware Attack (Tampering, Elevation of Privilege) on Bob's IP Camera. Bob defends with Secure Firmware & Software Updates. Defense succeeds, attack blocked.",
    ],
    combat: {
      attacker: "argha",
      defender: "bob",
      deviceName: "IP Camera",
      round: 2,
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
  discard(s, "argha", "action-08");
  discard(s, "bob", "action-24");
  steps.push({
    id: "t4-argha-resolve-2",
    phase: "resolve",
    turnLabel: "Turn 4 — Argha (gives up)",
    activePlayer: "argha",
    highlightCellIndex: 12,
    title: "Argha gives up the fight",
    narration: [
      "Two attacks, two clean defenses, and four cards gone between them. Argha checks his hand and doesn't have another card he trusts against this camera, so he stops here rather than keep guessing.",
      "This is the same rule as before working in the defender's favor: the attacker can keep trying with different cards, but nothing forces them to, and nothing forces the defender to lose eventually either. Bob keeps the IP Camera untouched, no points change, and both players are a little lighter on cards for it.",
    ],
    playerStates: s,
    historyEntries: [
      "Argha has no further suitable attack card and stops. IP Camera stays with Bob, unaffected. Two rounds cost Argha 2 attack cards and Bob 2 defense cards, with no points or ownership changing hands.",
    ],
  });
}

// =========================================================================
// Turn 5 — passing on a critical asset, then STOP
// =========================================================================

// Dylan lands on Divyo's Home Server and pays the full value
pushRoll("t5-dylan-roll", "dylan", 4, "Turn 5 — Dylan", "A few turns later, Dylan rolls a 4.");
pushLand("t5-dylan-land", "dylan", 17, "Turn 5 — Dylan", [
  "He lands on Divyo's Home Server. It's critical infrastructure, he doesn't have a card he trusts for it, and he's not willing to risk a fight he might lose. He pays instead.",
]);
{
  const s = prev();
  s.dylan.credits -= 20;
  s.divyo.credits += 20;
  steps.push({
    id: "t5-dylan-resolve",
    phase: "resolve",
    turnLabel: "Turn 5 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 17,
    title: "Dylan pays the full value on critical infrastructure",
    narration: [
      "Special cells don't get the half-price discount: passing on a Router or Home Server costs its full value. Dylan pays Divyo all 20 credits. No attack, no risk, no points change, ownership stays with Divyo.",
    ],
    playerStates: s,
    historyEntries: [
      "Dylan rolled 4, landed on Divyo's Home Server (occupied, critical infrastructure). Chose to pay instead of attack: 20 credits to Divyo (full value).",
    ],
  });
}

// Bob lands on STOP
pushRoll("t5-bob-roll", "bob", 6, "Turn 5 — Bob", "A turn later, Bob rolls a 6.");
{
  const s = prev();
  s.bob.boardPos = 22;
  s.bob.skippingNextTurn = true;
  steps.push({
    id: "t5-bob-land",
    phase: "land",
    turnLabel: "Turn 5 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 22,
    title: "Bob lands on STOP",
    narration: ["Skip a turn: he has to sit out his next go before he can act again."],
    playerStates: s,
    historyEntries: ["Bob rolled 6, landed on STOP. He forfeits his next turn."],
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

/** Step indices where a new turn's die roll begins (plus 0, the setup
 * step). The coarse "turn" navigation jumps between these, skipping every
 * decision/event phase in between; the progress bar uses them to draw one
 * segment per turn. */
export const TURN_BOUNDARIES: number[] = [0];
WALKTHROUGH_STEPS.forEach((s, i) => {
  if (s.phase === "roll") TURN_BOUNDARIES.push(i);
});

export function turnGroupOf(stepIndex: number): number {
  let g = 0;
  for (let i = 0; i < TURN_BOUNDARIES.length; i++) {
    if (TURN_BOUNDARIES[i] <= stepIndex) g = i;
    else break;
  }
  return g;
}

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
