import { Hero } from "@/components/sections/Hero";
import { News } from "@/components/sections/News";
import { ResearchFocus } from "@/components/sections/ResearchFocus";
import { ResearchBento } from "@/components/sections/ResearchBento";
import { Experience } from "@/components/sections/Experience";
import { ProblemSolving } from "@/components/sections/ProblemSolving";
import { Education } from "@/components/sections/Education";
import { Engineering } from "@/components/sections/Engineering";
import { MethodsStack } from "@/components/sections/MethodsStack";
import { ContactBand } from "@/components/sections/ContactBand";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <News />
      <ResearchFocus />
      <ResearchBento />
      <Experience />
      <ProblemSolving />
      <Education />
      <Engineering />
      <MethodsStack />
      <ContactBand />
    </>
  );
}
