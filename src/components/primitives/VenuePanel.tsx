import Image from "next/image";
import type { VenueMark } from "@/content/types";
import styles from "./VenuePanel.module.css";

/** A full-space showcase for a venue's mark — used where the space would
 * otherwise sit empty, so the conference identity gets real presence
 * instead of a small corner badge. */
export function VenuePanel({ mark }: { mark: VenueMark }) {
  return (
    <div className={styles.panel}>
      <Image src={mark.src} alt={mark.alt} width={mark.width} height={mark.height} className={styles.image} />
    </div>
  );
}
