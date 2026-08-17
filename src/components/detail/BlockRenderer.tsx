import { Prose } from "@/components/primitives/Prose";
import type { Block } from "@/content/types";
import { Figure } from "./Figure";
import { Gallery } from "./Gallery";
import { CardGrid } from "./CardGrid";
import styles from "./BlockRenderer.module.css";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.stack}>
      {blocks.map((block, i) => (
        <div key={`${block.kind}-${i}`}>
          {block.heading ? <h3 className={styles.blockHeading}>{block.heading}</h3> : null}
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: Block) {
  switch (block.kind) {
    case "prose":
      return <Prose paragraphs={block.body} />;
    case "figure":
      return <Figure src={block.src} alt={block.alt} caption={block.caption} />;
    case "gallery":
      return <Gallery items={block.items} columns={block.columns} />;
    case "cardGrid":
      return <CardGrid items={block.items} columns={block.columns} />;
    case "findings":
      return (
        <dl className={styles.findings}>
          {block.items.map((item) => (
            <div key={item.label} className={styles.findingItem}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "code":
      return (
        <pre className={styles.code}>
          <code>{block.body}</code>
        </pre>
      );
    default:
      return null;
  }
}
