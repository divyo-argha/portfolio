import { Container } from "@/components/primitives/Container";
import { VenueMark } from "@/components/primitives/VenueMark";
import type { DetailMeta } from "@/content/types";
import { BackLink } from "./BackLink";
import { MetaRail } from "./MetaRail";
import { BlockRenderer } from "./BlockRenderer";
import styles from "./DetailLayout.module.css";

export function DetailLayout({ detail }: { detail: DetailMeta }) {
  const backHref = detail.kind === "publication" ? "/#publications" : "/#engineering";
  const backLabel = detail.kind === "publication" ? "Back to publications" : "Back to engineering";

  return (
    <article className={styles.page}>
      <Container>
        <BackLink href={backHref} label={backLabel} />

        <header className={styles.header}>
          <div className={styles.eyebrowRow}>
            {detail.venueMark ? <VenueMark mark={detail.venueMark} size="lg" /> : null}
            <p className={styles.eyebrow}>{detail.eyebrow}</p>
          </div>
          <h1 className={styles.title}>{detail.title}</h1>
        </header>

        <div className={styles.grid}>
          <div className={styles.body}>
            {detail.blocks.length > 0 ? (
              <BlockRenderer blocks={detail.blocks} />
            ) : (
              <p className={styles.pending}>Full write-up and photography coming soon.</p>
            )}
          </div>
          <aside className={styles.rail}>
            <MetaRail meta={detail.meta} links={detail.links} />
          </aside>
        </div>
      </Container>
    </article>
  );
}
