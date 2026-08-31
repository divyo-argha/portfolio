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
  icon,
  eyebrow,
  title,
  subtitle,
  meta,
  defaultOpen = false,
  expandable = true,
  children,
}: {
  /** A conference/institution logo shown to the left of the title. Omit for
   * rows with nothing to show — the layout collapses cleanly without it. */
  icon?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  defaultOpen?: boolean;
  /** Set false for an entry that should just always show its full content —
   * no toggle, no chevron, nothing to click. The summary line renders as a
   * plain header instead of a button. */
  expandable?: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const open = expandable ? isOpen : true;

  const summaryContent = (
    <>
      <div className={styles.summaryLeft}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}

        <div className={styles.summaryMain}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <span className={styles.title}>{title}</span>
          {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </div>
      </div>

      <div className={styles.summarySide}>
        {meta ? <div className={styles.meta}>{meta}</div> : null}
        {expandable ? (
          <span className={styles.chevron} aria-hidden="true">
            <IconChevronDown size={16} />
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <div className={`${styles.row} ${open ? styles.open : ""}`}>
      {expandable ? (
        <button
          type="button"
          className={styles.summary}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          {summaryContent}
        </button>
      ) : (
        <div className={styles.summary}>{summaryContent}</div>
      )}

      {open ? (
        <div id={contentId} className={styles.content}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
