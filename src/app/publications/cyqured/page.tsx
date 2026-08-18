import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch } from "next/font/google";
import { DetailLayout } from "@/components/detail/DetailLayout";
import { BlockRenderer } from "@/components/detail/BlockRenderer";
import { Tabs } from "@/components/detail/Tabs";
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
              <div>
                <p className={styles.heroWordmark}>cyQured</p>
                <p className={styles.heroTagline}>
                  A tabletop model of a 16-device smart home — players attack and defend it, one STRIDE
                  threat at a time.
                </p>
              </div>
              <div>
                <div className={styles.heroPhotoFrame}>
                  <img
                    src="/media/publications/cyqured/hero.jpg"
                    alt="Four players around a printed CyQured board mid-session: the board, all three card decks, and player tokens on the table."
                    loading="eager"
                  />
                </div>
                <p className={styles.heroCaption}>From an actual study session — the printed board, in play.</p>
              </div>
            </div>

            <Link href="/publications/cyqured/game" className={styles.playBanner}>
              <div>
                <span className={styles.playEyebrow}>Interactive</span>
                <h2 className={styles.playTitle}>Play every card</h2>
                <p className={styles.playBody}>
                  All 84 cards, flip animations, and live attack-to-defense mappings — the full catalogue,
                  in its own space.
                </p>
              </div>
              <span className={styles.playCta}>
                Enter the game <IconArrowUpRight size={16} />
              </span>
            </Link>

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
