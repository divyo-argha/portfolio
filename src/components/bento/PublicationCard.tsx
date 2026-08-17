import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";
import type { Publication } from "@/content/types";
import cardStyles from "./BentoCard.module.css";
import styles from "./PublicationCard.module.css";

export function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <article className={[cardStyles.card, cardStyles.interactive, cardStyles.stretchedLink].join(" ")}>
      <div className={styles.banner}>
        <Image
          src={publication.venueMark.src}
          alt={publication.venueMark.alt}
          width={publication.venueMark.width}
          height={publication.venueMark.height}
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.head}>
        <div className={styles.headLeft}>
          <Badge status={publication.status} />
          <span className={styles.venue}>{publication.venueShort}</span>
        </div>
        {publication.status === "accepted" ? (
          <span className={styles.citations}>N/A</span>
        ) : typeof publication.citations === "number" && publication.citations > 0 ? (
          <span className={styles.citations}>
            {publication.citations} {publication.citations === 1 ? "cit." : "cits."}
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
    </article>
  );
}
