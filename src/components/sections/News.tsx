"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { IconArrowUpRight, IconArrowRight, IconDownload } from "@/components/primitives/Icons";
import { useSectionNav } from "@/hooks/useSectionNav";
import { news } from "@/content/profile";
import type { Link as LinkType } from "@/content/types";
import styles from "./News.module.css";

function NewsActionLink({
  link,
  variant = "primary",
}: {
  link: LinkType;
  variant?: "primary" | "secondary";
}) {
  const navigateToSection = useSectionNav();
  const isHash = link.href.startsWith("#");
  const isExternal = link.href.startsWith("http");
  const isPdf = link.href.endsWith(".pdf");

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (isHash) {
      e.preventDefault();
      navigateToSection(link.href);
    }
  }

  const className = variant === "primary" ? styles.actionPrimary : styles.actionSecondary;

  if (isHash) {
    return (
      <a href={link.href} onClick={handleClick} className={className}>
        <span>{link.label}</span>
        <IconArrowRight size={12} className={styles.actionIcon} />
      </a>
    );
  }

  if (isExternal || isPdf) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span>{link.label}</span>
        {isPdf ? (
          <IconDownload size={12} className={styles.actionIcon} />
        ) : (
          <IconArrowUpRight size={12} className={styles.actionIcon} />
        )}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      <span>{link.label}</span>
      <IconArrowRight size={12} className={styles.actionIcon} />
    </Link>
  );
}

export function News() {
  const navigateToSection = useSectionNav();

  if (!news || news.length === 0) return null;

  return (
    <Section id="news" label="Recent Updates" title="Latest milestones & research activity.">
      <div className={styles.newsList}>
        {news.map((item, index) => {
          const primaryLink = item.link;
          const isHash = primaryLink?.href.startsWith("#");
          const isExternal = primaryLink?.href.startsWith("http");

          function handleTitleClick(e: MouseEvent<HTMLAnchorElement>) {
            if (isHash && primaryLink) {
              e.preventDefault();
              navigateToSection(primaryLink.href);
            }
          }

          return (
            <Reveal key={item.title} delay={(index % 4) as 0 | 1 | 2 | 3}>
              <article className={styles.item}>
                <div className={styles.timeCol}>
                  <time className={styles.date}>{item.date}</time>
                  {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
                </div>

                <div className={styles.contentCol}>
                  <h3 className={styles.title}>
                    {primaryLink ? (
                      isHash ? (
                        <a
                          href={primaryLink.href}
                          onClick={handleTitleClick}
                          className={styles.titleLink}
                        >
                          <span>{item.title}</span>
                          <IconArrowRight size={13} className={styles.linkIcon} />
                        </a>
                      ) : isExternal ? (
                        <a
                          href={primaryLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.titleLink}
                        >
                          <span>{item.title}</span>
                          <IconArrowUpRight size={13} className={styles.linkIcon} />
                        </a>
                      ) : (
                        <Link href={primaryLink.href} className={styles.titleLink}>
                          <span>{item.title}</span>
                          <IconArrowRight size={13} className={styles.linkIcon} />
                        </Link>
                      )
                    ) : (
                      item.title
                    )}
                  </h3>

                  <p className={styles.description}>{item.description}</p>

                  {(item.link || item.secondaryLink) ? (
                    <div className={styles.actionsRow}>
                      {item.link ? <NewsActionLink link={item.link} variant="primary" /> : null}
                      {item.secondaryLink ? (
                        <NewsActionLink link={item.secondaryLink} variant="secondary" />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
