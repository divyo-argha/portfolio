import Image from "next/image";
import type { VenueMark as VenueMarkType } from "@/content/types";
import styles from "./VenueMark.module.css";

/**
 * Conference logo, shown on its own white plate regardless of theme —
 * these marks ship with an opaque white background baked in, so they read
 * as an intentional badge rather than a jarring rectangle in dark mode.
 */
export function VenueMark({ mark, size = "sm" }: { mark: VenueMarkType; size?: "sm" | "lg" }) {
  return (
    <span className={[styles.plate, size === "lg" ? styles.lg : styles.sm].join(" ")}>
      <Image src={mark.src} alt={mark.alt} width={mark.width} height={mark.height} className={styles.image} />
    </span>
  );
}
