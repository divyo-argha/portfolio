import { Hero } from "@/components/sections/Hero";
import { ResearchFocus } from "@/components/sections/ResearchFocus";
import { Education } from "@/components/sections/Education";
import { ResearchBento } from "@/components/sections/ResearchBento";
import { Positions } from "@/components/sections/Positions";
import { Engineering } from "@/components/sections/Engineering";
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
      <Positions />
      <Engineering />
      <MethodsStack />
      <ContactBand />
    </>
  );
}
