import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import type { Author, AffiliationInfo } from "@/content/types";
import styles from "./AuthorAffiliation.module.css";

export function AuthorAffiliation({
  authors,
  affiliation,
}: {
  authors?: Author[];
  affiliation?: AffiliationInfo[];
}) {
  if (!authors && (!affiliation || affiliation.length === 0)) return null;

  return (
    <div className={styles.byline}>
      {/* Authors Row */}
      {authors && authors.length > 0 ? (
        <div className={styles.authorsRow}>
          {authors.map((author) => {
            const isYou = author.you;
            const hasExternalLink = Boolean(author.url && !isYou);

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
                  {author.affiliationMark ? (
                    <sup className={styles.affMark}>{author.affiliationMark}</sup>
                  ) : null}
                  {author.equalContribution ? <sup className={styles.sup}>*</sup> : null}
                  {hasExternalLink ? <IconArrowUpRight size={11} className={styles.arrow} /> : null}
                </span>
                {author.role ? <span className={styles.role}>{author.role}</span> : null}
              </div>
            );

            if (isYou) {
              return (
                <Link
                  key={author.name}
                  href="/"
                  className={[styles.authorLink, styles.youLink].join(" ")}
                  title="Argha Pratim Saha — Back to Home"
                >
                  {chip}
                </Link>
              );
            }

            if (hasExternalLink && author.url) {
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

      {/* Prominent Institutional Affiliation Plate(s) — one per institution */}
      {affiliation && affiliation.length > 0 ? (
        <div className={styles.affiliationRow}>
          {affiliation.map((info) => (
            <div key={info.institution} className={styles.affiliationPlate}>
              <div className={styles.logoFrame}>
                <Image
                  src={info.logo}
                  alt={`${info.institution} logo`}
                  width={48}
                  height={48}
                  className={styles.instLogo}
                />
              </div>
              <div className={styles.affiliationText}>
                <span className={styles.dept}>
                  {info.mark ? <sup className={styles.affMark}>{info.mark}</sup> : null}
                  {info.department}
                </span>
                <span className={styles.institution}>
                  {info.institution}
                  {info.location ? ` · ${info.location}` : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
