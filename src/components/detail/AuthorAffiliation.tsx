import Image from "next/image";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import type { Author, AffiliationInfo } from "@/content/types";
import styles from "./AuthorAffiliation.module.css";

export function AuthorAffiliation({
  authors,
  affiliation,
}: {
  authors?: Author[];
  affiliation?: AffiliationInfo;
}) {
  if (!authors && !affiliation) return null;

  return (
    <div className={styles.byline}>
      {/* Authors Row */}
      {authors && authors.length > 0 ? (
        <div className={styles.authorsRow}>
          {authors.map((author) => {
            const isYou = author.you;
            const hasLink = Boolean(author.url);

            const chip = (
              <div className={[styles.authorChip, isYou ? styles.youChip : ""].join(" ")}>
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={28}
                    height={28}
                    className={styles.avatar}
                  />
                ) : (
                  <span className={styles.avatarFallback}>
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <span className={styles.name}>
                  {isYou ? <u>{author.name}</u> : author.name}
                  {author.equalContribution ? <sup className={styles.sup}>*</sup> : null}
                  {hasLink ? <IconArrowUpRight size={11} className={styles.arrow} /> : null}
                </span>
                {author.role ? <span className={styles.role}>{author.role}</span> : null}
              </div>
            );

            if (hasLink && author.url) {
              return (
                <a
                  key={author.name}
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.authorLink}
                  title={`View ${author.name}'s profile`}
                >
                  {chip}
                </a>
              );
            }

            return (
              <div key={author.name} className={styles.authorWrapper}>
                {chip}
              </div>
            );
          })}
        </div>
      ) : null}

      {authors?.some((a) => a.equalContribution) ? (
        <p className={styles.equalNote}>* Equal contribution</p>
      ) : null}

      {/* Prominent Institutional Affiliation Plate */}
      {affiliation ? (
        <div className={styles.affiliationPlate}>
          <div className={styles.logoFrame}>
            <Image
              src={affiliation.logo}
              alt={`${affiliation.institution} logo`}
              width={42}
              height={42}
              className={styles.instLogo}
            />
          </div>
          <div className={styles.affiliationText}>
            <span className={styles.dept}>{affiliation.department}</span>
            <span className={styles.institution}>
              {affiliation.institution}
              {affiliation.location ? ` · ${affiliation.location}` : ""}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
