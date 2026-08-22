import { Hero } from "@/components/sections/Hero";
import { News } from "@/components/sections/News";
import { Publications } from "@/components/sections/Publications";
import { Research } from "@/components/sections/Research";
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
      <Publications />
      <Research />
      <Education />
      <Experience />
      <Programming />
      <ContactBand />
    </>
  );
}
