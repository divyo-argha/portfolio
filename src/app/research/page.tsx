import type { Metadata } from "next";
import { ResearchIntro } from "@/components/sections/ResearchIntro";
import { ResearchMethods } from "@/components/sections/ResearchMethods";
import { FutureDirections } from "@/components/sections/FutureDirections";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research focus, empirical methods, and future research directions — Argha Pratim Saha.",
};

export default function ResearchPage() {
  return (
    <>
      <ResearchIntro />
      <ResearchMethods />
      <FutureDirections />
    </>
  );
}
