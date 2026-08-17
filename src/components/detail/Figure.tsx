import Image from "next/image";
import styles from "./Figure.module.css";

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className={styles.figure}>
      <Image src={src} alt={alt} width={1200} height={800} className={styles.image} />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
