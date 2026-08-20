import { Prose } from "@/components/primitives/Prose";
import type { Block } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { Figure } from "./Figure";
import { Gallery } from "./Gallery";
import { CardGrid } from "./CardGrid";
import { StatGrid } from "./StatGrid";
import { HeroStat } from "./HeroStat";
import { BarChart } from "./BarChart";
import { ConfusionMatrix } from "./ConfusionMatrix";
import { Pipeline } from "./Pipeline";
import { Carousel } from "./Carousel";
import { RocCurve } from "./RocCurve";
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
      return <Figure src={block.src} alt={block.alt} caption={block.caption} href={block.href} />;
    case "gallery":
      return <Gallery items={block.items} columns={block.columns} compact={block.compact} />;
    case "cardGrid":
      return <CardGrid items={block.items} columns={block.columns} />;
    case "statGrid":
      return <StatGrid items={block.items} columns={block.columns} />;
    case "heroStat":
      return <HeroStat value={block.value} label={block.label} />;
    case "barChart":
      return <BarChart items={block.items} unit={block.unit} />;
    case "confusionMatrix":
      return (
        <ConfusionMatrix
          truePositive={block.truePositive}
          trueNegative={block.trueNegative}
          falsePositive={block.falsePositive}
          falseNegative={block.falseNegative}
          positiveLabel={block.positiveLabel}
          negativeLabel={block.negativeLabel}
        />
      );
    case "pipeline":
      return <Pipeline steps={block.steps} />;
    case "carousel":
      return <Carousel items={block.items} />;
    case "rocCurve":
      return <RocCurve models={block.models} heading={block.heading} auc={block.auc} modelName={block.modelName} />;
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
      return <CodeBlock body={block.body} language={block.language} />;
    default:
      return null;
  }
}
