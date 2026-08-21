"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./StrideGuide.module.css";

export type StrideCategoryDef = {
  slug: string;
  letter: string;
  name: string;
  color: string;
  summary: string;
  body: string[];
  spot: string;
};

/** Matches a `strideType` value from cardData.ts (e.g. "Information Disclosure")
 * to the id used on its accordion item here (e.g. "stride-information-disclosure"). */
export function strideSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

const STRIDE_GUIDE: StrideCategoryDef[] = [
  {
    slug: "spoofing",
    letter: "S",
    name: "Spoofing",
    color: "#5ee1f2",
    summary: "Someone or something pretends to be a person, company, or device you trust.",
    body: [
      "Spoofing is when an attacker pretends to be someone else. It could be a person, a company, a website, or even a device on your home network. The goal is simple: if you believe the fake thing is real, you will trust it and do what it asks.",
      "This works because people usually trust things that look familiar. A logo you know, a phone number you recognize, or a login page that looks exactly like the real one. Attackers copy these familiar things so you let your guard down.",
      "In this deck, Phishing, Caller ID Spoofing, Credential Stuffing, ARP Spoofing, and replay attacks are all forms of spoofing. In every case, something fake is standing in for something real.",
    ],
    spot: "Ask yourself: can I really prove this is who it says it is? A message that pushes you to act fast, a caller who already knows a bit about you, or a login page that looks slightly off, these are all warning signs.",
  },
  {
    slug: "tampering",
    letter: "T",
    name: "Tampering",
    color: "#4fe0a8",
    summary: "Something gets changed without your permission, like a file, a setting, or a message.",
    body: [
      "Tampering means an attacker changes something that should have stayed the same. This could be a file on your computer, a setting on your router, or a message as it travels across the network.",
      "The key idea is that the thing still exists, it is just not trustworthy anymore. Your router still works, but its settings might now point you to the wrong place. Your files still open, but the code inside them might now be different.",
      "In this deck, Router Hijacking, Firmware Attacks, and ARP Spoofing all involve tampering. The attacker gets in, then quietly rewrites something.",
    ],
    spot: "Look for settings you did not change, files that behave differently, or a device that keeps acting strange even after a reset.",
  },
  {
    slug: "repudiation",
    letter: "R",
    name: "Repudiation",
    color: "#b48fe0",
    summary: "There is no record to prove what really happened, so the attacker can deny it.",
    body: [
      "Repudiation is a little different from the others. It is not about breaking in, it is about covering tracks afterward. If there is no proof that something happened, the attacker can simply deny it.",
      "This matters because most defenses rely on being able to look back and see what happened. Logs, timestamps, and records are how you prove an event took place. If an attacker deletes or changes those records, the attack becomes very hard to prove.",
      "In this deck, Activity Log Manipulation is the clearest example. The attacker gets in, then deletes the logs that would have shown they were ever there.",
    ],
    spot: "Missing logs, gaps in your history, or an account that clearly did something but has no record of doing it, these all point to repudiation.",
  },
  {
    slug: "information-disclosure",
    letter: "I",
    name: "Information Disclosure",
    color: "#f5a623",
    summary: "Private information ends up somewhere, or with someone, it should never reach.",
    body: [
      "Information Disclosure means private information is seen by someone who should not see it. This does not always need hacking. Sometimes it is as simple as someone watching you type your PIN, or a message being read while it travels unprotected across a network.",
      "The information itself is not changed and nothing stops working. The only thing that happens is a secret is no longer a secret.",
      "In this deck, Shoulder Surfing, Wireless Sniffing, and a smartwatch quietly sending your health data to an unknown server are all information disclosure. In each case, something private leaked out.",
    ],
    spot: "Ask where your data is going, and who is allowed to see it. If something sensitive shows up somewhere it should not, that is information disclosure.",
  },
  {
    slug: "denial-of-service",
    letter: "D",
    name: "Denial of Service",
    color: "#ff5e7e",
    summary: "Something that should work suddenly does not, even though nothing was stolen or changed.",
    body: [
      "Denial of Service means making something unavailable. It could be a website that will not load, a Wi-Fi network that stops working, or files you cannot open because they are locked.",
      "The attacker is not trying to steal your data or trick you into logging in somewhere. Their whole goal is to stop you, or everyone, from using something normally.",
      "In this deck, a DDoS Attack with Botnet and a Network Jammer are direct examples. Ransomware also counts as denial of service here, because the real damage is that you can no longer access your own files, not that they were secretly changed.",
    ],
    spot: "If something you rely on suddenly stops working, and nothing else seems to have been touched or stolen, that points to denial of service.",
  },
  {
    slug: "elevation-of-privilege",
    letter: "E",
    name: "Elevation of Privilege",
    color: "#a3d94f",
    summary: "Someone or something ends up with more power than they should have.",
    body: [
      "Elevation of Privilege happens when an attacker starts with very little access and ends up with a lot. They might begin as a random visitor and end up as an administrator who can control everything.",
      "This is often the last step in an attack. First the attacker gets a small foothold, maybe through a weak password or a hidden bug, and then they use that foothold to grant themselves more control than they were ever supposed to have.",
      "In this deck, Zero-Day Exploits, Password Cracking, Trojan Horses, and Firmware Attacks can all lead to elevation of privilege. The pattern is always the same: less access before the attack, full control after.",
    ],
    spot: "Watch for a device or account that suddenly does things only an administrator should be able to do, especially right after something small and unnoticed happened first.",
  },
];

const COLUMN_LEFT = STRIDE_GUIDE.slice(0, 3);
const COLUMN_RIGHT = STRIDE_GUIDE.slice(3);

export function StrideGuide() {
  const reducedMotion = useReducedMotion();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = useCallback((slug: string) => {
    setOpenMap((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }, []);

  useEffect(() => {
    function onJump(e: Event) {
      const detail = (e as CustomEvent<{ slug: string }>).detail;
      if (!detail?.slug) return;
      setOpenMap((prev) => ({ ...prev, [detail.slug]: true }));
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const el = document.getElementById(`stride-${detail.slug}`);
          el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        }, 60);
      });
    }
    window.addEventListener("cyq:jump-to-stride", onJump as EventListener);
    return () => window.removeEventListener("cyq:jump-to-stride", onJump as EventListener);
  }, [reducedMotion]);

  return (
    <section id="stride-guide" className={styles.section} aria-label="STRIDE threat categories guide">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Learn The Threats</span>
        <h2 className={styles.title}>What do the STRIDE letters mean?</h2>
        <p className={styles.subtitle}>
          Every attack and scenario card in this deck fits into one of six simple buckets. Open one below to see what
          it means, in plain English.
        </p>
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>
          {COLUMN_LEFT.map((cat) => (
            <StrideItem key={cat.slug} cat={cat} open={Boolean(openMap[cat.slug])} onToggle={() => toggle(cat.slug)} />
          ))}
        </div>
        <div className={styles.column}>
          {COLUMN_RIGHT.map((cat) => (
            <StrideItem key={cat.slug} cat={cat} open={Boolean(openMap[cat.slug])} onToggle={() => toggle(cat.slug)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StrideItem({
  cat,
  open,
  onToggle,
}: {
  cat: StrideCategoryDef;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div id={`stride-${cat.slug}`} className={styles.item} style={{ "--c": cat.color } as React.CSSProperties}>
      <button
        type="button"
        className={styles.itemHeader}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`stride-${cat.slug}-panel`}
      >
        <span className={styles.itemLetter}>{cat.letter}</span>
        <span className={styles.itemHeaderText}>
          <span className={styles.itemName}>{cat.name}</span>
          <span className={styles.itemSummary}>{cat.summary}</span>
        </span>
        <span className={[styles.itemChevron, open ? styles.itemChevronOpen : ""].join(" ")} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        id={`stride-${cat.slug}-panel`}
        role="region"
        aria-label={`${cat.name} explained`}
        className={[styles.itemBody, open ? styles.itemBodyOpen : ""].join(" ")}
      >
        <div className={styles.itemBodyInner}>
          {cat.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className={styles.spotBox}>
            <span className={styles.spotLabel}>How to spot it</span>
            <p>{cat.spot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
