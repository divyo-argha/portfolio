import { Figure } from "./Figure";
import styles from "./Gallery.module.css";

type GalleryItem = { src: string; alt: string; caption?: string; href?: string };

export function Gallery({
  items,
  columns = 2,
  compact = false,
}: {
  items: GalleryItem[];
  columns?: 2 | 3;
  compact?: boolean;
}) {
  const classNames = [styles.gallery, columns === 3 ? styles.three : styles.two, compact ? styles.compact : ""];
  return (
    <div className={classNames.join(" ")}>
      {items.map((item) => (
        <Figure key={item.src} {...item} />
      ))}
    </div>
  );
}
