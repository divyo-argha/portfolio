"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { IconChevronDown } from "./Icons";
import styles from "./AccordionRow.module.css";

/**
 * Collapsed-by-default list row shared by Experience, Education, Projects,
 * Problem Solving, and Ongoing Work — a professor can scan the summary line
 * of every entry in a section without expanding anything, then open the ones
 * they actually want detail on. Separate from `detail/Accordion.tsx`, which
 * keeps its own single-item "Official Abstract" shape for publication pages.
 */
export function AccordionRow({
  eyebrow,
  title,
  subtitle,
  meta,
  defaultOpen = false,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={`${styles.row} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.summary}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className={styles.summaryMain}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <span className={styles.title}>{title}</span>
          {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </div>

        <div className={styles.summarySide}>
          {meta ? <div className={styles.meta}>{meta}</div> : null}
          <span className={styles.chevron} aria-hidden="true">
            <IconChevronDown size={16} />
          </span>
        </div>
      </button>

      {isOpen ? (
        <div id={contentId} className={styles.content}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
