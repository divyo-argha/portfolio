import Image from "next/image";
import styles from "./Figure.module.css";

export function Figure({
  src,
  alt,
  caption,
  href,
}: {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
}) {
  const image = <Image src={src} alt={alt} width={1200} height={800} className={styles.image} />;

  return (
    <figure className={styles.figure}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {image}
        </a>
      ) : (
        image
      )}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
