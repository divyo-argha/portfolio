"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconArrowUpRight } from "@/components/primitives/Icons";
import styles from "./ExpandableEntry.module.css";

/**
 * One compact row — title + one-line meta — that expands in place for its
 * bullet detail. For Home's Education/Experience list: fast to scan closed,
 * full detail one click away without leaving the page. Not a substitute for
 * a real subpage — see `/research`, `/publications`, `/work` for the content
 * that actually needed to move off Home instead of just collapsing.
 */
export function ExpandableEntry({
  title,
  meta,
  bullets,
  link,
}: {
  title: string;
  meta: string;
  bullets?: string[];
  link?: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const hasBullets = Boolean(bullets && bullets.length > 0);

  return (
    <div className={styles.entry}>
      <button
        type="button"
        className={styles.row}
        onClick={() => hasBullets && setOpen((v) => !v)}
        aria-expanded={hasBullets ? open : undefined}
        disabled={!hasBullets}
      >
        <div className={styles.text}>
          <span className={styles.title}>{title}</span>
          <span className={styles.meta}>{meta}</span>
        </div>
        {hasBullets ? (
          <span className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}>
            <IconChevronDown size={14} />
          </span>
        ) : null}
      </button>

      {open && hasBullets ? (
        <ul className={styles.bullets}>
          {bullets!.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {link ? (
        link.href.startsWith("http") ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <span>{link.label}</span>
            <IconArrowUpRight size={11} />
          </a>
        ) : (
          <Link href={link.href} className={styles.link}>
            <span>{link.label}</span>
            <IconArrowUpRight size={11} />
          </Link>
        )
      ) : null}
    </div>
  );
}
