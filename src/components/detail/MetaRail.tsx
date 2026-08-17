import type { ReactNode } from "react";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import { IconArrowUpRight, IconScholar } from "@/components/primitives/Icons";
import type { Link as LinkType, PublicationStatus } from "@/content/types";
import styles from "./MetaRail.module.css";

export function MetaRail({
  meta,
  links,
  kind,
  scholarUrl,
  publicationStatus,
}: {
  meta: { label: string; value: ReactNode }[];
  links: LinkType[];
  kind?: "publication" | "project";
  scholarUrl?: string;
  publicationStatus?: PublicationStatus;
}) {
  const isPublication = kind === "publication";

  if (meta.length === 0 && links.length === 0 && !isPublication) return null;

  return (
    <div className={styles.rail}>
      {meta.map((item) => (
        <div key={item.label} className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}

      {(isPublication || links.length > 0) && (
        <div className={styles.links}>
          {isPublication && (
            scholarUrl ? (
              <a
                href={scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.scholarButton}
              >
                <IconScholar size={15} />
                <span>Google Scholar</span>
                <IconArrowUpRight size={13} className={styles.scholarArrow} />
              </a>
            ) : (
              <div
                className={styles.scholarButtonDisabled}
                title="Accepted publication — Google Scholar indexing coming soon"
              >
                <IconScholar size={15} />
                <span>Google Scholar (Accepted, coming soon)</span>
              </div>
            )
          )}

          {links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      )}
    </div>
  );
}
