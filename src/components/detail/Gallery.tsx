import { Figure } from "./Figure";
import styles from "./Gallery.module.css";

type GalleryItem = { src: string; alt: string; caption?: string };

export function Gallery({ items, columns = 2 }: { items: GalleryItem[]; columns?: 2 | 3 }) {
  return (
    <div className={[styles.gallery, columns === 3 ? styles.three : styles.two].join(" ")}>
      {items.map((item) => (
        <Figure key={item.src} {...item} />
      ))}
    </div>
  );
}
