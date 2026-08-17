import type { ReactNode } from "react";
import styles from "./IconLink.module.css";

export function IconLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} className={styles.link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      <span className={styles.icon}>{icon}</span>
      <span>{children}</span>
    </a>
  );
}
