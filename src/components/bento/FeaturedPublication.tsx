import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";
import { Chip } from "@/components/primitives/Chip";
import { VenuePanel } from "@/components/primitives/VenuePanel";
import type { Publication } from "@/content/types";
import cardStyles from "./BentoCard.module.css";
import styles from "./FeaturedPublication.module.css";

export function FeaturedPublication({ publication }: { publication: Publication }) {
  return (
    <article className={[cardStyles.card, cardStyles.interactive, cardStyles.stretchedLink, styles.card].join(" ")}>
      <div className={styles.content}>
        <div className={styles.head}>
          <Badge status={publication.status} />
          <span className={styles.venue}>{publication.venueShort}</span>
          {publication.status === "accepted" ? (
            <span className={styles.citations}>· Citations: N/A</span>
          ) : typeof publication.citations === "number" && publication.citations > 0 ? (
            <span className={styles.citations}>
              · {publication.citations} {publication.citations === 1 ? "citation" : "citations"}
            </span>
          ) : null}
        </div>

        <h3 className={styles.title}>
          <Link href={`/publications/${publication.slug}`} className={styles.titleLink}>
            {publication.title}
          </Link>
        </h3>

        <p className={styles.authors}>
          {publication.authors.map((author, i) => {
            const isYou = author.you || author.name === "Argha Pratim Saha";
            return (
              <span key={author.name} className={isYou ? styles.you : undefined}>
                {isYou ? (
                  <strong>
                    <u>{author.name}</u>
                  </strong>
                ) : (
                  author.name
                )}
                {author.equalContribution ? "*" : ""}
                {i < publication.authors.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>

        <p className={styles.summary}>{publication.summary}</p>

        <ul className={styles.tags}>
          {publication.tags.map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.media}>
        <VenuePanel mark={publication.venueMark} />
      </div>
    </article>
  );
}
