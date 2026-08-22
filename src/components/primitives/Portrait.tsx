import Image from "next/image";
import styles from "./Portrait.module.css";

type PortraitProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/**
 * The author photo, seated on a lit circular disc. The source image is a
 * cut-out on transparency, so the frame's gradient backdrop reads as the
 * photo's own background — see Portrait.module.css for how it is built.
 *
 * (The old asymmetric cut-corner frame carried a `mirrored` prop to flip which
 * corners were cut; a circle has nothing to mirror, and the second call site it
 * existed for is gone, so it went with the polygon.)
 */
export function Portrait({ src, alt, priority }: PortraitProps) {
  return (
    <div className={styles.frame}>
      <Image src={src} alt={alt} width={447} height={558} priority={priority} className={styles.image} />
    </div>
  );
}
