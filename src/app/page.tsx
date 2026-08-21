import { Hero } from "@/components/sections/Hero";
import { News } from "@/components/sections/News";
import { ResearchAndPublications } from "@/components/sections/ResearchAndPublications";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Programming } from "@/components/sections/Programming";
import { ContactBand } from "@/components/sections/ContactBand";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <News />
      <ResearchAndPublications />
      <Experience />
      <Education />
      <Programming />
      <ContactBand />
    </>
  );
}
