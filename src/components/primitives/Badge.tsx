import styles from "./Badge.module.css";
import type { PublicationStatus } from "@/content/types";

const LABEL: Record<PublicationStatus, string> = {
  accepted: "Accepted",
  published: "Published",
  "in-progress": "In progress",
};

export function Badge({ status }: { status: PublicationStatus }) {
  return <span className={[styles.badge, styles[status]].join(" ")}>{LABEL[status]}</span>;
}
