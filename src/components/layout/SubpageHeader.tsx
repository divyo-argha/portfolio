"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { IconArrowLeft, IconDownload, IconScholar, IconGithub } from "@/components/primitives/Icons";
import { profile } from "@/content/profile";
import styles from "./SubpageHeader.module.css";

export function SubpageHeader() {
  return (
    <header className={styles.header} aria-label="Page navigation">
      <div className={styles.inner}>
        {/* Author Avatar + Return Home Button */}
        <Link href="/" className={styles.homeButton} title="Return to Home">
          <div className={styles.avatarWrap}>
            <div className={styles.avatarFrame}>
              <Image
                src="/media/people/portrait.webp"
                alt="Argha Pratim Saha"
                width={80}
                height={100}
                priority
                className={styles.avatarImage}
              />
            </div>
            <span className={styles.statusDot} aria-hidden="true" />
          </div>

          <div className={styles.textGroup}>
            <div className={styles.nameRow}>
              <span className={styles.name}>{profile.name}</span>
            </div>
            <div className={styles.returnCue}>
              <IconArrowLeft size={13} className={styles.arrowIcon} />
              <span>Return to Home</span>
            </div>
          </div>
        </Link>

        {/* Right Utility Cluster */}
        <div className={styles.utilityCluster}>
          <a
            href="https://scholar.google.com/citations?user=EKrGm9UAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="Google Scholar"
            title="Google Scholar"
          >
            <IconScholar size={16} />
          </a>

          <a
            href="https://github.com/divyo-argha"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
            title="GitHub"
          >
            <IconGithub size={16} />
          </a>

          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cvPill}
            title="Download Curriculum Vitae (PDF)"
          >
            <IconDownload size={14} />
            <span className={styles.cvText}>CV</span>
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
