import Link from "next/link";
import { Chip } from "@/components/primitives/Chip";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import type { Project } from "@/content/types";
import cardStyles from "@/components/bento/BentoCard.module.css";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links[0];

  return (
    <article className={[cardStyles.card, cardStyles.interactive].join(" ")}>
      <h3 className={styles.name}>
        <Link href={`/work/${project.slug}`} className={styles.nameLink}>
          {project.name}
        </Link>
      </h3>
      <p className={styles.tagline}>{project.tagline}</p>

      <ul className={styles.stack}>
        {project.stack.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>

      {primaryLink ? (
        <div className={styles.footer}>
          <ExternalLink href={primaryLink.href}>{primaryLink.label}</ExternalLink>
        </div>
      ) : null}
    </article>
  );
}
