import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { VenueMark } from "@/components/primitives/VenueMark";
import type { DetailMeta } from "@/content/types";
import { BackLink } from "./BackLink";
import { MetaRail } from "./MetaRail";
import { BlockRenderer } from "./BlockRenderer";
import { Tabs } from "./Tabs";
import styles from "./DetailLayout.module.css";

export function DetailLayout({ detail }: { detail: DetailMeta }) {
  const backHref = detail.kind === "publication" ? "/#publications" : "/#engineering";
  const backLabel = detail.kind === "publication" ? "Back to publications" : "Back to engineering";
  const showHeroMark = detail.heroMark && detail.venueMark;

  return (
    <article className={styles.page}>
      <Container>
        <BackLink href={backHref} label={backLabel} />

        <header className={[styles.header, showHeroMark ? styles.headerWithMark : ""].join(" ")}>
          <div className={styles.headerText}>
            <div className={styles.eyebrowRow}>
              {detail.venueMark && !showHeroMark ? <VenueMark mark={detail.venueMark} size="lg" /> : null}
              <p className={styles.eyebrow}>{detail.eyebrow}</p>
            </div>
            <h1 className={styles.title}>{detail.title}</h1>
          </div>

          {showHeroMark && detail.venueMark ? (
            <div className={styles.heroMark}>
              <Image
                src={detail.venueMark.src}
                alt={detail.venueMark.alt}
                width={500}
                height={220}
                className={styles.heroMarkImage}
                priority
              />
            </div>
          ) : null}
        </header>

        <div className={styles.grid}>
          <div className={styles.body}>
            {detail.tabs && detail.tabs.length > 0 ? (
              <Tabs
                panels={detail.tabs.map((tab) => ({
                  id: tab.id,
                  label: tab.label,
                  content: <BlockRenderer blocks={tab.blocks} />,
                }))}
              />
            ) : detail.blocks.length > 0 ? (
              <BlockRenderer blocks={detail.blocks} />
            ) : (
              <p className={styles.pending}>Full write-up and photography coming soon.</p>
            )}
          </div>
          <aside className={styles.rail}>
            <MetaRail
              meta={detail.meta}
              links={detail.links}
              kind={detail.kind}
              scholarUrl={detail.scholarUrl}
            />
          </aside>
        </div>
      </Container>
    </article>
  );
}
