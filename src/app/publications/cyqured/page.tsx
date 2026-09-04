import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch } from "next/font/google";
import { DetailLayout } from "@/components/detail/DetailLayout";
import { BlockRenderer } from "@/components/detail/BlockRenderer";
import { Tabs } from "@/components/detail/Tabs";
import { Hero } from "@/components/cyqured/Hero";
import { getPublicationDetail } from "@/lib/detail";
import { publications } from "@/content/publications";
import { scholarlyArticleJsonLd } from "@/lib/jsonld";
import { IconArrowUpRight } from "@/components/primitives/Icons";
import { overviewBlocks, howToPlayBlocks, studyBlocks } from "./content";
import styles from "./cyqured.module.css";

const display = Chakra_Petch({
  variable: "--font-cyq-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const detail = getPublicationDetail("cyqured");
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.eyebrow,
  };
}

export default function CyQuredPage() {
  const detail = getPublicationDetail("cyqured");
  const publication = publications.find((p) => p.slug === "cyqured");
  if (!detail || !publication) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd(publication)) }}
      />
      <DetailLayout
        detail={detail}
        customBody={
          <div className={`${display.variable} ${styles.brandScope}`}>
            <div className={styles.heroBand}>
              <Link
                href="/cyqured"
                className={styles.cornerGameButton}
                title="Explore all 84 cards and interactive game mechanics"
              >
                <span className={styles.cornerPulse} />
                <span className={styles.cornerText}>
                  <span className={styles.cornerEyebrow}>Interactive Game Details</span>
                  <span className={styles.cornerLabel}>Explore the Game & Rules</span>
                </span>
                <span className={styles.cornerArrow}>
                  <IconArrowUpRight size={18} />
                </span>
              </Link>
              <Hero />
            </div>

            <Tabs
              panels={[
                { id: "overview", label: "Overview", content: <BlockRenderer blocks={overviewBlocks} /> },
                { id: "how-to-play", label: "How to Play", content: <BlockRenderer blocks={howToPlayBlocks} /> },
                { id: "study", label: "Study & Results", content: <BlockRenderer blocks={studyBlocks} /> },
              ]}
            />
          </div>
        }
      />
    </>
  );
}
