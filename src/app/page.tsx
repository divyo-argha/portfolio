import { Hero } from "@/components/sections/Hero";
import { ResearchFocus } from "@/components/sections/ResearchFocus";
import { Education } from "@/components/sections/Education";
import { ResearchBento } from "@/components/sections/ResearchBento";
import { Experience } from "@/components/sections/Experience";
import { Engineering } from "@/components/sections/Engineering";
import { ProblemSolving } from "@/components/sections/ProblemSolving";
import { MethodsStack } from "@/components/sections/MethodsStack";
import { ContactBand } from "@/components/sections/ContactBand";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <ResearchFocus />
      <Education />
      <ResearchBento />
      <Experience />
      <Engineering />
      <ProblemSolving />
      <MethodsStack />
      <ContactBand />
    </>
  );
}
