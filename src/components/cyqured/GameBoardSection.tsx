import Image from "next/image";
import styles from "./GameBoardSection.module.css";

const CONNECTED_DEVICES = [
  { name: "Smart Utility Meter", category: "Energy & Comfort", points: 8, color: "#e5493c" },
  { name: "Smart Thermostat", category: "Energy & Comfort", points: 6, color: "#e5493c" },
  { name: "IP Camera", category: "Home Security", points: 10, color: "#2f6fe0" },
  { name: "Smart Door-lock", category: "Home Security", points: 10, color: "#2f6fe0" },
  { name: "Smart Speaker", category: "Entertainment", points: 10, color: "#e14fa0" },
  { name: "Smart TV", category: "Entertainment", points: 10, color: "#e14fa0" },
  { name: "Smart Printer", category: "Appliances", points: 8, color: "#3fa65a" },
  { name: "Smart Fridge", category: "Appliances", points: 6, color: "#3fa65a" },
  { name: "Laptop", category: "Personal Computing", points: 16, color: "#9b5fd1" },
  { name: "Desktop", category: "Personal Computing", points: 14, color: "#9b5fd1" },
  { name: "Smartphone", category: "Personal Gadgets", points: 16, color: "#c67a35" },
  { name: "Tablet", category: "Personal Gadgets", points: 12, color: "#c67a35" },
  { name: "Gaming Console", category: "Personal Gadgets", points: 10, color: "#c67a35" },
  { name: "Smart Wearables", category: "Personal Gadgets", points: 10, color: "#c67a35" },
  { name: "Wireless Router", category: "Core Infrastructure", points: 18, color: "#5ee1f2" },
  { name: "Home Server", category: "Core Infrastructure", points: 20, color: "#5ee1f2" },
];

const SPECIAL_CELLS = [
  {
    name: "GO Cell",
    desc: "Complete a full circuit around the connected home to collect 10 credit points and draw an action card.",
  },
  {
    name: "Chance Cards",
    desc: "Draw an unexpected event card modeling real-world vulnerabilities, zero-days, or sudden security incidents.",
  },
  {
    name: "Scenario Challenges",
    desc: "Examine a situational security prompt and classify the primary STRIDE threat vector to earn points.",
  },
  {
    name: "Power Outage",
    desc: "Devices temporarily lose continuous active power protections, creating immediate threat windows.",
  },
  {
    name: "STOP Cell",
    desc: "Forced incident response lockdown: forfeit your next turn to perform system diagnostics.",
  },
  {
    name: "Card Penalty",
    desc: "Discard selected action defense cards from your current hand into the central discard pile.",
  },
];

export function GameBoardSection() {
  return (
    <section id="board" className={styles.section} aria-label="Game Board and Connected Devices">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Physical Track & Assets</span>
        <h2 className={styles.title}>The Board & Devices</h2>
        <p className={styles.subtitle}>
          A 28-cell circuit modeling the perimeter of an interconnected smart home, with 16 acquirable devices.
        </p>
      </div>

      {/* Board High-Res Visual */}
      <div className={styles.boardContainer}>
        <div className={styles.boardImgWrap}>
          <Image
            src="/media/publications/cyqured/board.webp"
            alt="The CyQured physical board layout modeling connected home devices"
            width={1403}
            height={1800}
            className={styles.boardImg}
            loading="lazy"
          />
        </div>
      </div>

      {/* 16 Connected Devices */}
      <h3 className={styles.subheading}>16 Connected Home Assets</h3>
      <div className={styles.deviceGrid}>
        {CONNECTED_DEVICES.map((dev) => (
          <div
            key={dev.name}
            className={styles.deviceCard}
            style={{ "--dev-color": dev.color } as React.CSSProperties}
          >
            <div className={styles.deviceTop}>
              <h4 className={styles.deviceName}>{dev.name}</h4>
              <span className={styles.devicePoints}>{dev.points} PTS</span>
            </div>
            <span className={styles.deviceCategory}>{dev.category}</span>
          </div>
        ))}
      </div>

      {/* Special Track Cells */}
      <h3 className={styles.subheading}>Special Track Cells</h3>
      <div className={styles.specialGrid}>
        {SPECIAL_CELLS.map((cell) => (
          <div key={cell.name} className={styles.specialCard}>
            <h4 className={styles.specialName}>{cell.name}</h4>
            <p className={styles.specialDesc}>{cell.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
