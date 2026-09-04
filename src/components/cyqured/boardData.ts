import { cardFaces, type CardFace } from "@/app/cyqured/cardData";

export type ConnectedDevice = {
  name: string;
  category: string;
  points: number;
  color: string;
  /** What the device is in a real connected home, and why it is worth attacking. */
  blurb: string;
  /** Core-infrastructure devices lose on a single failed defense: ownership
   * transfers immediately instead of the attacker needing another round. */
  critical?: boolean;
};

export const CONNECTED_DEVICES: ConnectedDevice[] = [
  {
    name: "Smart Utility Meter",
    category: "Energy & Comfort",
    points: 8,
    color: "#e5493c",
    blurb:
      "Reports household electricity and water draw back to the provider over a continuous uplink. Those readings are a minute-by-minute record of when the house is occupied, and tampered firmware can under-report usage or cut service outright.",
  },
  {
    name: "Smart Thermostat",
    category: "Energy & Comfort",
    points: 6,
    color: "#e5493c",
    blurb:
      "Learns the household schedule to drive heating and cooling. That schedule is a map of when the home is empty, and remote control over it turns into a physical-comfort denial of service.",
  },
  {
    name: "IP Camera",
    category: "Home Security",
    points: 10,
    color: "#2f6fe0",
    blurb:
      "Streams live indoor and doorway video, usually into a cloud account reachable from anywhere. A compromised camera is both a privacy breach and reconnaissance for whatever attack comes next.",
  },
  {
    name: "Smart Door-lock",
    category: "Home Security",
    points: 10,
    color: "#2f6fe0",
    blurb:
      "Replaces the physical key with a PIN, an app, or a paired phone. It is the one device on the track where a successful attack ends with an intruder physically inside the home.",
  },
  {
    name: "Smart Speaker",
    category: "Entertainment",
    points: 10,
    color: "#e14fa0",
    blurb:
      "An always-listening microphone wired to a voice assistant and the accounts behind it. Voice commands are rarely authenticated, so anyone audible to the device can act as the owner.",
  },
  {
    name: "Smart TV",
    category: "Entertainment",
    points: 10,
    color: "#e14fa0",
    blurb:
      "Runs a full app platform with signed-in streaming accounts, a microphone, and often a camera. Vendor firmware ships slowly and almost nobody patches it by hand.",
  },
  {
    name: "Smart Printer",
    category: "Appliances",
    points: 8,
    color: "#3fa65a",
    blurb:
      "Spools a copy of everything it prints and exposes an admin panel on the local network, frequently with the factory credentials still in place.",
  },
  {
    name: "Smart Fridge",
    category: "Appliances",
    points: 6,
    color: "#3fa65a",
    blurb:
      "Cheap, always connected, and kept for a decade. Low value on its own, which is exactly why it makes such a comfortable foothold and botnet recruit.",
  },
  {
    name: "Laptop",
    category: "Personal Computing",
    points: 16,
    color: "#9b5fd1",
    blurb:
      "Carries work files, live sessions, and a password manager, and moves between the trusted home network and whatever café Wi-Fi it meets next.",
  },
  {
    name: "Desktop",
    category: "Personal Computing",
    points: 14,
    color: "#9b5fd1",
    blurb:
      "The household's stationary workstation and archive: tax records, photo libraries, local backups. High value and rarely rebuilt, which is what ransomware counts on.",
  },
  {
    name: "Smartphone",
    category: "Personal Gadgets",
    points: 16,
    color: "#c67a35",
    blurb:
      "The identity hub of the home: second factor, banking apps, messages, and location. Compromise it and the protections guarding every other account come down with it.",
  },
  {
    name: "Tablet",
    category: "Personal Gadgets",
    points: 12,
    color: "#c67a35",
    blurb:
      "Passed around the household and signed into the same accounts as the phone, but patched, locked, and monitored far less carefully.",
  },
  {
    name: "Gaming Console",
    category: "Personal Gadgets",
    points: 10,
    color: "#c67a35",
    blurb:
      "Holds a paid account with stored payment details and deliberately opens inbound network ports so multiplayer traffic can reach it.",
  },
  {
    name: "Smart Wearables",
    category: "Personal Gadgets",
    points: 10,
    color: "#c67a35",
    blurb:
      "Logs heart rate, sleep, and precise location continuously, and keeps persistent Bluetooth pairings that nobody ever goes back and reviews.",
  },
  {
    name: "Wireless Router",
    category: "Core Infrastructure",
    points: 18,
    color: "#5ee1f2",
    critical: true,
    blurb:
      "Every other device's traffic passes through it. Owning the router means owning the household's whole view of the network, which is why the board treats it as critical infrastructure.",
  },
  {
    name: "Home Server",
    category: "Core Infrastructure",
    points: 20,
    color: "#5ee1f2",
    critical: true,
    blurb:
      "Hosts the backups, the media library, and the self-hosted services, and usually holds admin credentials for the rest of the home. The most valuable single cell on the track.",
  },
];

export type SpecialCell = {
  name: string;
  /** How many cells of this kind sit on the 28-cell track. */
  count: number;
  desc: string;
};

/** The 12 non-device cells of the 28-cell track, grouped by kind. Counts are
 * read off the printed board (see BOARD_TRACK in walkthroughData.ts):
 * 12 special cells + 16 devices = 28. */
export const SPECIAL_CELLS: SpecialCell[] = [
  {
    name: "GO",
    count: 1,
    desc: "The starting corner. Complete a full circuit around the connected home to collect 10 credit points and draw an action card.",
  },
  {
    name: "Chance",
    count: 4,
    desc: "Draw an unexpected event card modeling real-world vulnerabilities, zero-days, and sudden security incidents. Some resolve immediately; others are kept in hand and played later.",
  },
  {
    name: "Scenario Challenge",
    count: 2,
    desc: "Read a situational security prompt aloud and classify the primary STRIDE threat vector it describes. A correct call earns points; the forced verbal justification is where most of the learning happens.",
  },
  {
    name: "+2 Cards",
    count: 1,
    desc: "A corner bonus: draw two extra cards from the shared action deck, attack or defense as they come.",
  },
  {
    name: "Power Outage",
    count: 1,
    desc: "Devices lose their continuously powered protections for the round, opening a window where attacks land more easily. A Backup Generator card restores power immediately.",
  },
  {
    name: "STOP",
    count: 1,
    desc: "A forced incident-response lockdown: forfeit your next turn to run system diagnostics while the rest of the table keeps moving.",
  },
  {
    name: "Card Penalty",
    count: 2,
    desc: "Discard an action card from your hand into the central discard pile, modeling credential loss and the defenses you no longer have when you need them.",
  },
];

/** Devices sharing a color group — hold every device in one and Color-Group
 * Immunity blocks attacks on all of them. */
export function groupSize(category: string): number {
  return CONNECTED_DEVICES.filter((d) => d.category === category).length;
}

const ATTACK_CARDS = cardFaces.filter((c) => c.category === "attack");

/** Attack cards that hit any cell: those printed "All devices", plus Ultimate
 * Attack, which names no target because it stands in for any attack in the deck. */
export const UNIVERSAL_ATTACKS: CardFace[] = ATTACK_CARDS.filter(
  (c) => !c.targets || c.targets.includes("All devices"),
);

/** Attack cards whose printed target list names this device specifically. */
export function attacksOn(deviceName: string): CardFace[] {
  return ATTACK_CARDS.filter((c) => c.targets?.includes(deviceName));
}
