import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";
import { Chip } from "@/components/primitives/Chip";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import type { Publication } from "@/content/types";
import cardStyles from "./BentoCard.module.css";
import styles from "./PublicationCard.module.css";

export function PublicationCard({
  publication,
}: {
  publication: Publication;
  variant?: "banner" | "compact";
}) {
  return (
    <article
      className={[
        cardStyles.card,
        cardStyles.interactive,
        styles.compactCard,
      ].join(" ")}
    >
      <div className={styles.body}>
        {/* Top metadata row with Status, Venue, Citations, and hover Arrow */}
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <Badge status={publication.status} />
            <span className={styles.venue}>{publication.venueShort}</span>
            {publication.status === "accepted" ? (
              <span className={styles.citations}>· Accepted</span>
            ) : typeof publication.citations === "number" && publication.citations > 0 ? (
              <span className={styles.citations}>
                · {publication.citations} {publication.citations === 1 ? "citation" : "citations"}
              </span>
            ) : null}
          </div>

          <Link
            href={`/publications/${publication.slug}`}
            className={styles.arrowBadge}
            aria-label={`View ${publication.title}`}
          >
            <IconArrowUpRight size={15} className={styles.arrowIcon} />
          </Link>
        </div>

        {/* Compact Header: Title on left, Venue Logo on right */}
        <div className={styles.compactHeaderRow}>
          <h3 className={styles.title}>
            <Link href={`/publications/${publication.slug}`} className={styles.titleLink}>
              {publication.title}
            </Link>
          </h3>
          {publication.venueMark ? (
            <div className={styles.sideLogoWrapper}>
              <Image
                src={publication.venueMark.src}
                alt={publication.venueMark.alt}
                width={56}
                height={56}
                className={styles.sideLogoImg}
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

        {publication.tags && publication.tags.length > 0 ? (
          <ul className={styles.tags}>
            {publication.tags.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
