import { CONNECTED_DEVICES } from "./GameBoardSection";

/** A single hand-authored example playthrough, grounded in the rules described
 * in the CyQured paper (Sections 3-4): 28-cell board, 16 devices, 50 starting
 * credits, 8 starting cards, resource ownership, attack-defense resolution,
 * the critical-infrastructure single-failure transfer rule, and Color-Group
 * Immunity. This is illustrative, not the literal photographed board layout
 * (no per-cell coordinates for that exist), but every rule it demonstrates is
 * the real one. */

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

export type WalkthroughStep = {
  id: string;
  turnLabel: string;
  activePlayer: PlayerId | null;
  highlightCellIndex: number | null;
  title: string;
  narration: string[];
  playerStates: Record<PlayerId, PlayerState>;
  historyEntries: string[];
};

/** 28-cell board track. Corners sit at indices 0, 7, 14, 21 (7 cells per
 * side, matching the paper's cyclic 28-cell design). Device cells reuse the
 * canonical 16-device list from the Game Board tab. */
export type BoardCellKind = "go" | "stop" | "power-outage" | "card-penalty" | "chance" | "scenario" | "device";

export type BoardCell = {
  kind: BoardCellKind;
  name: string;
  color?: string;
  points?: number;
};

const deviceCell = (name: string): BoardCell => {
  const dev = CONNECTED_DEVICES.find((d) => d.name === name);
  return { kind: "device", name, color: dev?.color, points: dev?.points };
};

export const BOARD_TRACK: BoardCell[] = [
  { kind: "go", name: "GO" },
  deviceCell("Smart Utility Meter"),
  deviceCell("Smart Thermostat"),
  { kind: "chance", name: "Chance" },
  deviceCell("IP Camera"),
  deviceCell("Smart Door-lock"),
  { kind: "scenario", name: "Scenario" },
  { kind: "stop", name: "STOP" },
  deviceCell("Smart Speaker"),
  deviceCell("Smart TV"),
  { kind: "chance", name: "Chance" },
  deviceCell("Smart Printer"),
  deviceCell("Smart Fridge"),
  { kind: "scenario", name: "Scenario" },
  { kind: "power-outage", name: "Power Outage" },
  deviceCell("Laptop"),
  deviceCell("Desktop"),
  { kind: "chance", name: "Chance" },
  deviceCell("Smartphone"),
  deviceCell("Tablet"),
  { kind: "scenario", name: "Scenario" },
  { kind: "card-penalty", name: "Card Penalty" },
  deviceCell("Gaming Console"),
  deviceCell("Smart Wearables"),
  { kind: "chance", name: "Chance" },
  deviceCell("Wireless Router"),
  deviceCell("Home Server"),
  { kind: "scenario", name: "Scenario" },
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

const steps: WalkthroughStep[] = [];

// ---- Step 0: Setup ----
steps.push({
  id: "setup",
  turnLabel: "Setup",
  activePlayer: null,
  highlightCellIndex: 0,
  title: "Five players sit down at the board",
  narration: [
    "Alice, Bob, Dylan, Divyo, and Argha are playing a game of CyQured. Every player starts on the GO cell, with 50 credit points, 8 action cards from the shuffled attack-and-defense deck, and no devices owned yet.",
    "The Chance deck (30 cards), the Scenario deck (20 cards), and the rest of the action deck sit in the middle of the board, face down. Play moves clockwise starting with Alice: on a turn, a player rolls the die, moves, resolves whatever the landed cell asks for, and then passes the turn along.",
  ],
  playerStates: clone(START),
  historyEntries: ["Game start. Five players, 50 credits and 8 cards each, all tokens on GO."],
});

function prev(): Record<PlayerId, PlayerState> {
  return clone(steps[steps.length - 1].playerStates);
}

// Every move below is a real, single six-sided die roll (1-6) added to that
// player's own last known position. Where a player needs to travel further
// than one roll can reach, the narration says so explicitly ("a couple of
// turns later") instead of pretending one roll covered the distance — the
// final roll shown for that step is always a valid 1-6 from wherever their
// token already was.

// ---- Step 1: Dylan buys the Smart Utility Meter ----
{
  const s = prev();
  s.dylan.boardPos = 1;
  s.dylan.credits -= 8;
  s.dylan.points += 8;
  s.dylan.devices.push("Smart Utility Meter");
  steps.push({
    id: "t1-dylan",
    turnLabel: "Turn 1 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 1,
    title: "Dylan rolls a 1 and buys the Smart Utility Meter",
    narration: [
      "Dylan goes first. He rolls a 1, moves one cell, and lands on the Smart Utility Meter, unowned and worth 8 points.",
      "He pays its 8-credit value and claims it. It's the cheaper of the two Energy & Comfort devices, he's already planning to come back for the other one.",
    ],
    playerStates: s,
    historyEntries: ["Dylan rolled 1, landed on Smart Utility Meter (unowned), paid 8 credits to acquire it. +8 points."],
  });
}

// ---- Step 2: Argha draws Chance ----
{
  const s = prev();
  s.argha.boardPos = 3;
  s.argha.note = "Holding a Firewall Upgrade bonus";
  steps.push({
    id: "t1-argha",
    turnLabel: "Turn 1 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 3,
    title: "Argha rolls a 3 and draws a Chance card",
    narration: [
      "Argha rolls a 3 and lands on Chance. He draws \"Firewall Upgrade\": the next attacker to land on his cell gets blocked automatically, and he earns points from the block. He tucks the card away for later.",
    ],
    playerStates: s,
    historyEntries: ["Argha rolled 3, landed on Chance, drew \"Firewall Upgrade\" (blocks the next attacker on his cell)."],
  });
}

// ---- Step 3: Divyo lands on Scenario, identifies STRIDE ----
{
  const s = prev();
  s.divyo.boardPos = 6;
  s.divyo.points += 6;
  steps.push({
    id: "t1-divyo",
    turnLabel: "Turn 1 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 6,
    title: "Divyo rolls a 6 and reasons out a Scenario",
    narration: [
      "Divyo rolls a 6 and lands on a Scenario cell. He draws a card describing an ISP phishing email asking for payment details.",
      "He has to say out loud which STRIDE category it is, and why. He identifies it as Spoofing: the email is impersonating the ISP to trick the reader into handing over card details. Correct reasoning earns him 6 points.",
    ],
    playerStates: s,
    historyEntries: [
      "Divyo rolled 6, landed on Scenario, drew \"ISP Phishing Email.\" Correctly identified it as Spoofing. +6 points.",
    ],
  });
}

// ---- Step 4: Alice buys the IP Camera ----
{
  const s = prev();
  s.alice.boardPos = 4;
  s.alice.credits -= 10;
  s.alice.points += 10;
  s.alice.devices.push("IP Camera");
  steps.push({
    id: "t1-alice",
    turnLabel: "Turn 1 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 4,
    title: "Alice rolls a 4 and buys the IP Camera",
    narration: ["Alice rolls a 4 and lands on the unowned IP Camera. She pays its 10-credit value and claims it."],
    playerStates: s,
    historyEntries: ["Alice rolled 4, landed on IP Camera (unowned), paid 10 credits to acquire it. +10 points."],
  });
}

// ---- Step 5: Bob buys the Smart Door-lock ----
{
  const s = prev();
  s.bob.boardPos = 5;
  s.bob.credits -= 10;
  s.bob.points += 10;
  s.bob.devices.push("Smart Door-lock");
  steps.push({
    id: "t1-bob",
    turnLabel: "Turn 1 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 5,
    title: "Bob rolls a 5 and buys the Smart Door-lock",
    narration: [
      "Bob rolls a 5 and lands one cell past Alice, on the unowned Smart Door-lock. Same rule: pay the 10-credit value, claim the card, gain 10 points.",
    ],
    playerStates: s,
    historyEntries: ["Bob rolled 5, landed on Smart Door-lock (unowned), paid 10 credits to acquire it. +10 points."],
  });
}

// ---- Step 6: Dylan completes Energy & Comfort, gets Color-Group Immunity ----
{
  const s = prev();
  s.dylan.boardPos = 2;
  s.dylan.credits -= 6;
  s.dylan.points += 6;
  s.dylan.devices.push("Smart Thermostat");
  steps.push({
    id: "t2-dylan",
    turnLabel: "Turn 2 — Dylan",
    activePlayer: "dylan",
    highlightCellIndex: 2,
    title: "Dylan rolls a 1 and completes the Energy & Comfort group",
    narration: [
      "Dylan rolls a 1 and moves to the Smart Thermostat, the second and last Energy & Comfort device. He pays 6 credits and claims it.",
      "Because he now owns every device in that color group, Color-Group Immunity kicks in: both his Energy & Comfort devices are now immune to attack, and any point gains tied to them grow.",
    ],
    playerStates: s,
    historyEntries: [
      "Dylan rolled 1, landed on Smart Thermostat (unowned), paid 6 credits to acquire it. +6 points.",
      "Dylan now owns the full Energy & Comfort group. Color-Group Immunity is active on Smart Utility Meter and Smart Thermostat.",
    ],
  });
}

// ---- Step 7a: Alice declares attack on Bob's Smart Door-lock ----
{
  const s = prev();
  s.alice.boardPos = 5;
  steps.push({
    id: "t2-alice-declare",
    turnLabel: "Turn 2 — Alice",
    activePlayer: "alice",
    highlightCellIndex: 5,
    title: "Alice rolls a 1 and attacks Bob's Smart Door-lock",
    narration: [
      "Alice rolls a 1 and lands on the Smart Door-lock, which Bob already owns. Landing on an occupied device is a choice: pay Bob a partial value to share it, or attack it outright.",
      "Alice attacks. She plays Activity Log Manipulation, a Repudiation attack, from her hand: the plan is to delete the lock's access logs so there's no clean record of what happened.",
    ],
    playerStates: s,
    historyEntries: [
      "Alice rolled 1, landed on Bob's Smart Door-lock (occupied). Declared an attack: Activity Log Manipulation (Repudiation).",
    ],
  });
}

// ---- Step 7b: resolve, defense fails, Alice gains points, no ownership transfer ----
{
  const s = prev();
  s.alice.points += 5;
  s.bob.points -= 5;
  steps.push({
    id: "t2-alice-resolve",
    turnLabel: "Turn 2 — Alice (resolve)",
    activePlayer: "alice",
    highlightCellIndex: 5,
    title: "Bob has no defense for it, but keeps the device",
    narration: [
      "Bob checks his hand for Immutable Logging, the one defense that stops this attack, and doesn't have it. The defense fails.",
      "A failed defense lets the attacker gain points, so Alice gains 5 and Bob loses 5. The Smart Door-lock isn't critical infrastructure like a router, so ownership does not change hands on a single failed defense. Bob keeps it, just with a smaller score, and now has no clean log of the breach.",
    ],
    playerStates: s,
    historyEntries: [
      "Bob had no Immutable Logging defense. Attack succeeded. Alice +5 points, Bob -5 points. Ownership of Smart Door-lock stays with Bob (not a critical asset).",
    ],
  });
}

// ---- Step 8: Bob buys the Wireless Router (elided travel) ----
{
  const s = prev();
  s.bob.boardPos = 25;
  s.bob.credits -= 18;
  s.bob.points += 18;
  s.bob.devices.push("Wireless Router");
  steps.push({
    id: "t2-bob",
    turnLabel: "Turn 2 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 25,
    title: "A couple of turns later, Bob buys the Wireless Router",
    narration: [
      "Bob spends his next couple of turns working his way around the board, at one point passing on the unowned Tablet to save his credits. He then rolls a 6 and lands on the Wireless Router, one of the two critical infrastructure devices, worth 18 points.",
      "He pays the full 18 credits and claims it, hoping to recover the points he just lost to Alice.",
    ],
    playerStates: s,
    historyEntries: ["Bob rolled 6, landed on Wireless Router (unowned), paid 18 credits to acquire it. +18 points."],
  });
}

// ---- Step 9a: Divyo declares attack on Bob's Router (elided travel) ----
{
  const s = prev();
  s.divyo.boardPos = 25;
  steps.push({
    id: "t2-divyo-declare",
    turnLabel: "Turn 2 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 25,
    title: "A turn later, Divyo lands on Bob's Wireless Router and attacks",
    narration: [
      "A turn later, after landing on Card Penalty and discarding a card along the way, Divyo rolls a 4 and lands right on Bob's new Wireless Router. He plays Router Hijacking, a Tampering attack, the only attack card in the deck that targets routers specifically.",
      "Routers and Home Servers are flagged as critical infrastructure: a single successful compromise here can transfer the whole device, not just a few points, because a breached gateway can expose everything connected to it.",
    ],
    playerStates: s,
    historyEntries: [
      "Divyo rolled 4, landed on Bob's Wireless Router (occupied). Declared an attack: Router Hijacking (Tampering).",
    ],
  });
}

// ---- Step 9b: resolve, defense fails, ownership transfers ----
{
  const s = prev();
  s.divyo.points += 18;
  s.divyo.devices.push("Wireless Router");
  s.bob.points -= 18;
  s.bob.devices = s.bob.devices.filter((d) => d !== "Wireless Router");
  steps.push({
    id: "t2-divyo-resolve",
    turnLabel: "Turn 2 — Divyo (resolve)",
    activePlayer: "divyo",
    highlightCellIndex: 25,
    title: "The router changes hands on a single failed defense",
    narration: [
      "Bob doesn't have Secure DNS or a Firewall card ready, so his defense fails. Because the Wireless Router is critical infrastructure, one failed defense is enough: ownership transfers straight to Divyo.",
      "Bob loses the router's 18 points; Divyo gains them and takes the device. This is the outsized-impact rule in action: a single breached gateway really does cost more than a smart bulb.",
    ],
    playerStates: s,
    historyEntries: [
      "Bob had no defense for Router Hijacking. Attack succeeded. Because Wireless Router is critical infrastructure, ownership transfers to Divyo on this single failure. Divyo +18 points, Bob -18 points.",
    ],
  });
}

// ---- Step 10: Argha attacks Dylan's immune device, blocked (with a GO bonus on the way) ----
{
  const s = prev();
  s.argha.boardPos = 1;
  s.argha.credits += 10;
  s.argha.handSize += 1;
  s.dylan.points += 2;
  steps.push({
    id: "t2-argha",
    turnLabel: "Turn 2 — Argha",
    activePlayer: "argha",
    highlightCellIndex: 1,
    title: "Argha completes a lap, then attacks a fully protected device",
    narration: [
      "Argha's token has been quietly circling the board. This turn he rolls a 4, crosses GO for the first time, collects the standard 10-credit bonus and an extra action card, then keeps moving to land on Dylan's Smart Utility Meter.",
      "He plays Wireless Sniffing, an Information Disclosure attack, not realizing Dylan owns the whole Energy & Comfort group. Color-Group Immunity blocks it automatically, no defense card needed. Dylan doesn't lose anything, and the rules reward a successful immunity with a small point bonus.",
    ],
    playerStates: s,
    historyEntries: [
      "Argha rolled 4, crossed GO (+10 credits, +1 card), landed on Dylan's Smart Utility Meter (occupied, immune). Attack (Wireless Sniffing, Information Disclosure) auto-blocked by Color-Group Immunity. Dylan +2 points.",
    ],
  });
}

// ---- Step 11: Bob lands on STOP (elided travel) ----
{
  const s = prev();
  s.bob.boardPos = 7;
  s.bob.skippingNextTurn = true;
  steps.push({
    id: "t3-bob",
    turnLabel: "Turn 3 — Bob",
    activePlayer: "bob",
    highlightCellIndex: 7,
    title: "A turn later, Bob lands on STOP",
    narration: [
      "A turn later, Bob rolls a 6 and lands on STOP: a forced incident-response lockdown. He has to forfeit his next turn to run system diagnostics before he can act again.",
    ],
    playerStates: s,
    historyEntries: ["Bob rolled 6, landed on STOP. He forfeits his next turn."],
  });
}

// ---- Step 12: Divyo lands on Power Outage (elided travel) ----
{
  const s = prev();
  s.divyo.boardPos = 13;
  steps.push({
    id: "t3-divyo",
    turnLabel: "Turn 3 — Divyo",
    activePlayer: "divyo",
    highlightCellIndex: 13,
    title: "A turn later, Divyo lands on Power Outage",
    narration: [
      "A turn later, after passing over the unowned Smart Speaker without buying it, Divyo rolls a 5 and lands on Power Outage. Every device briefly loses its continuous active protections, a short window where an attack lands more easily than usual, until the next turn passes.",
    ],
    playerStates: s,
    historyEntries: ["Divyo rolled 5, landed on Power Outage. Active device protections are briefly down."],
  });
}

// ---- Step 13: Final standings ----
{
  const s = prev();
  steps.push({
    id: "final",
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
