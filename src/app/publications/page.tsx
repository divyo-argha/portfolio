import type { Metadata } from "next";
import { Publications } from "@/components/sections/Publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Peer-reviewed record and work in progress — Argha Pratim Saha.",
};

export default function PublicationsPage() {
  return <Publications />;
}
