import type { Metadata } from "next";
import { Programming } from "@/components/sections/Programming";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software projects, algorithmic problem solving, and technical stack — Argha Pratim Saha.",
};

export default function WorkPage() {
  return <Programming />;
}
