import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/primitives/Chip";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import type { Project } from "@/content/types";
import cardStyles from "@/components/bento/BentoCard.module.css";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const isGitUser = project.slug === "git-user";

  return (
    <article className={[cardStyles.card, cardStyles.interactive, styles.card].join(" ")}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          {isGitUser && project.logo ? (
            <div className={styles.logoWrap}>
              <Image
                src={project.logo.src}
                alt={project.logo.alt}
                width={36}
                height={36}
                className={styles.logoImg}
              />
            </div>
          ) : null}

          <div className={styles.nameBlock}>
            <h3 className={styles.name}>
              <Link href={`/work/${project.slug}`} className={styles.nameLink}>
                {project.name}
              </Link>
            </h3>
            {isGitUser ? (
              <span className={styles.featuredBadge}>9.7k+ downloads</span>
            ) : null}
          </div>
        </div>

        <Link
          href={`/work/${project.slug}`}
          className={styles.arrowBadge}
          aria-label={`View ${project.name} details`}
        >
          <IconArrowUpRight size={14} />
        </Link>
      </div>

      <p className={styles.tagline}>{project.tagline}</p>

      <div className={styles.footer}>
        <ul className={styles.stack}>
          {project.stack.map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
