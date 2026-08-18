import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";
import { Chip } from "@/components/primitives/Chip";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import type { Publication } from "@/content/types";
import cardStyles from "./BentoCard.module.css";
import styles from "./FeaturedPublication.module.css";

export function FeaturedPublication({ publication }: { publication: Publication }) {
  return (
    <article className={[cardStyles.card, cardStyles.interactive, styles.card].join(" ")}>
      <div className={styles.topBar}>
        <div className={styles.metaRow}>
          <Badge status={publication.status} />
          <span className={styles.venue}>{publication.venueShort}</span>
        </div>
        <Link
          href={`/publications/${publication.slug}`}
          className={styles.arrowBadge}
          aria-label={`View ${publication.title}`}
        >
          <IconArrowUpRight size={16} className={styles.arrowIcon} />
        </Link>
      </div>

      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h3 className={styles.title}>
            <Link href={`/publications/${publication.slug}`} className={styles.titleLink}>
              {publication.title}
            </Link>
          </h3>
        </div>

        {publication.venueMark ? (
          <div className={styles.logoWrapper}>
            <Image
              src={publication.venueMark.src}
              alt={publication.venueMark.alt}
              width={110}
              height={110}
              className={styles.logoImg}
            />
          </div>
        ) : null}
      </div>

      <p className={styles.authors}>
        {publication.authors.map((author, i) => {
          const isYou = author.you || author.name === "Argha Pratim Saha";
          return (
            <span key={author.name} className={isYou ? styles.you : undefined}>
              {isYou ? (
                <Link href="/" className={styles.youLink} title="Argha Pratim Saha — Back to Home">
                  <strong>
                    <u>{author.name}</u>
                  </strong>
                </Link>
              ) : (
                author.name
              )}
              {author.equalContribution ? "*" : ""}
              {i < publication.authors.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </p>

      {publication.authors.some((a) => a.equalContribution) ? (
        <p className={styles.equalNote}>* Equal contribution</p>
      ) : null}

      <p className={styles.summary}>{publication.summary}</p>

      <ul className={styles.tags}>
        {publication.tags.map((tag) => (
          <li key={tag}>
            <Chip>{tag}</Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}
