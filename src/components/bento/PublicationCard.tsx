import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import type { Publication } from "@/content/types";
import cardStyles from "./BentoCard.module.css";
import styles from "./PublicationCard.module.css";

export function PublicationCard({
  publication,
  variant,
}: {
  publication: Publication;
  variant?: "banner" | "compact";
}) {
  const isBanner = variant === "banner" || publication.slug === "arsenic";

  return (
    <article
      className={[
        cardStyles.card,
        cardStyles.interactive,
        isBanner ? styles.bannerCard : styles.compactCard,
      ].join(" ")}
    >
      {/* For ICCIT: Edge-to-edge wide top banner */}
      {isBanner && publication.venueMark ? (
        <div className={styles.topBanner}>
          <Image
            src={publication.venueMark.src}
            alt={publication.venueMark.alt}
            width={600}
            height={200}
            className={styles.bannerImg}
          />
        </div>
      ) : null}

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

        {/* Title area: For compact (NAACL), title on left + logo on right side */}
        {!isBanner && publication.venueMark ? (
          <div className={styles.compactHeaderRow}>
            <h3 className={styles.title}>
              <Link href={`/publications/${publication.slug}`} className={styles.titleLink}>
                {publication.title}
              </Link>
            </h3>
            <div className={styles.sideLogoWrapper}>
              <Image
                src={publication.venueMark.src}
                alt={publication.venueMark.alt}
                width={120}
                height={120}
                className={styles.sideLogoImg}
              />
            </div>
          </div>
        ) : (
          <h3 className={styles.title}>
            <Link href={`/publications/${publication.slug}`} className={styles.titleLink}>
              {publication.title}
            </Link>
          </h3>
        )}

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

        {publication.authors.some((a) => a.equalContribution) ? (
          <p className={styles.equalNote}>* Equal contribution</p>
        ) : null}

        <p className={styles.summary}>{publication.summary}</p>
      </div>
    </article>
  );
}
