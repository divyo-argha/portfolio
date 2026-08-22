"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/primitives/Icons";
import styles from "./Accordion.module.css";

export function Accordion({
  title,
  subtitle,
  defaultOpen = false,
  content,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  content: string[];
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.summaryButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={styles.headerContent}>
          <span className={styles.badge}>Official Abstract</span>
          <h4 className={styles.title}>{title}</h4>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        <div className={styles.chevron}>
          <IconChevronDown size={18} />
        </div>
      </button>

      {isOpen ? (
        <div className={styles.contentWrapper}>
          {content.map((paragraph, idx) => (
            <p key={idx} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
