import { Hero } from "@/components/sections/Hero";
import { ResearchIntro } from "@/components/sections/ResearchIntro";
import { ResearchGlance } from "@/components/sections/ResearchGlance";
import { Publications } from "@/components/sections/Publications";
import { ResearchMethods } from "@/components/sections/ResearchMethods";
import { FutureDirections } from "@/components/sections/FutureDirections";
import { Programming } from "@/components/sections/Programming";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { News } from "@/components/sections/News";
import { ContactBand } from "@/components/sections/ContactBand";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <ResearchIntro />
      <ResearchGlance />
      <Publications />
      <ResearchMethods />
      <FutureDirections />
      <Programming />
      <Education />
      <Experience />
      <News />
      <ContactBand />
    </>
  );
}
