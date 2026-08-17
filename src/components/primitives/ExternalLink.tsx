import type { ReactNode } from "react";
import { IconArrowUpRight } from "./Icons";
import styles from "./ExternalLink.module.css";

export function ExternalLink({ href, children, icon }: { href: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {icon}
      <span>{children}</span>
      <IconArrowUpRight className={styles.arrow} />
      <span className="visually-hidden"> (opens in new tab)</span>
    </a>
  );
}
