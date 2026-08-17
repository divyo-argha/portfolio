import { ExternalLink } from "@/components/primitives/ExternalLink";
import type { Link as LinkType } from "@/content/types";
import styles from "./MetaRail.module.css";

export function MetaRail({ meta, links }: { meta: { label: string; value: string }[]; links: LinkType[] }) {
  if (meta.length === 0 && links.length === 0) return null;

  return (
    <div className={styles.rail}>
      {meta.map((item) => (
        <div key={item.label} className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
      {links.length > 0 ? (
        <div className={styles.links}>
          {links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
