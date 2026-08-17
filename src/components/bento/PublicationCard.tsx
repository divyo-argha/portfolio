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
        <Badge status={publication.status} />
        <span className={styles.venue}>{publication.venueShort}</span>
      </div>
      <h3 className={styles.title}>
        <Link href={`/publications/${publication.slug}`} className={styles.titleLink}>
          {publication.title}
        </Link>
      </h3>
      <p className={styles.summary}>{publication.summary}</p>
    </article>
  );
}
