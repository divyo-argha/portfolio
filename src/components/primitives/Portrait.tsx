import Image from "next/image";
import styles from "./Portrait.module.css";

type PortraitProps = {
  src: string;
  alt: string;
  priority?: boolean;
  mirrored?: boolean;
};

/**
 * An author photo, clipped to an asymmetric cut-corner frame rather than a
 * plain rectangle — the one deliberately un-uniform shape on an otherwise
 * grid-strict page. Used for both the hero portrait and the smaller contact
 * photo; `mirrored` flips which corners are cut so the two read as a pair
 * rather than identical stamps.
 */
export function Portrait({ src, alt, priority, mirrored }: PortraitProps) {
  return (
    <div className={[styles.frame, mirrored ? styles.mirrored : ""].join(" ")}>
      <Image src={src} alt={alt} width={1280} height={1599} priority={priority} className={styles.image} />
    </div>
  );
}
