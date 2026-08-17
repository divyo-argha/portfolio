import Image from "next/image";
import Link from "next/link";
import { StatPair } from "@/components/primitives/StatPair";
import { ExternalLink } from "@/components/primitives/ExternalLink";
import type { Project } from "@/content/types";
import styles from "./ProjectFeatureCard.module.css";

export function ProjectFeatureCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Featured build</span>
          <h3 className={styles.name}>
            <Link href={`/work/${project.slug}`} className={styles.nameLink}>
              {project.name}
            </Link>
          </h3>
          <p className={styles.tagline}>{project.tagline}</p>
          <p className={styles.description}>{project.description}</p>
        </div>

        {project.installCommand ? (
          <div className={styles.rightSide}>
            <div className={styles.installBlock}>
              <span className={styles.installLabel}>Install</span>
              <code className={styles.install}>{project.installCommand}</code>
            </div>

            {project.logo ? (
              <div className={styles.logoWrapper}>
                <Image
                  src={project.logo.src}
                  alt={project.logo.alt}
                  width={project.logo.width}
                  height={project.logo.height}
                  className={styles.logoImg}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {project.stats ? (
        <div className={styles.stats}>
          {project.stats.map((stat) => (
            <StatPair key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      ) : null}

      <div className={styles.footer}>
        <div className={styles.stack}>
          {project.stack.map((item) => (
            <span key={item} className={styles.stackItem}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          {project.links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
          <Link href={`/work/${project.slug}`} className={styles.detailLink}>
            Full write-up →
          </Link>
        </div>
      </div>
    </article>
  );
}
