import styles from "./CardGrid.module.css";

type CardGridItem = { title: string; body: string };

export function CardGrid({ items, columns = 3 }: { items: CardGridItem[]; columns?: 2 | 3 | 4 }) {
  return (
    <div className={[styles.grid, styles[`cols${columns}`]].join(" ")}>
      {items.map((item) => (
        <div key={item.title} className={styles.card}>
          <h4 className={styles.title}>{item.title}</h4>
          <p className={styles.body}>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
