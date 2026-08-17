import Link from "next/link";
import { IconArrowLeft } from "@/components/primitives/Icons";
import styles from "./BackLink.module.css";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={styles.link}>
      <IconArrowLeft size={14} className={styles.icon} />
      <span>{label}</span>
    </Link>
  );
}
