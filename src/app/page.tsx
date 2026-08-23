import { Hero } from "@/components/sections/Hero";
import { ResearchGlance } from "@/components/sections/ResearchGlance";
import { FeaturedPublicationSection } from "@/components/sections/FeaturedPublicationSection";
import { CredentialsCompact } from "@/components/sections/CredentialsCompact";
import { ContactBand } from "@/components/sections/ContactBand";
import { HashScrollHandler } from "@/components/HashScrollHandler";

// Home is deliberately short — identity, fast evidence, one flagship
// publication, a compact trajectory, and contact. The research narrative,
// full publication record, and technical projects each have their own page
// (see /research, /publications, /work) reached through the nav, rather than
// stacking as more homepage sections a reader has to scroll past.
export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <ResearchGlance />
      <FeaturedPublicationSection />
      <CredentialsCompact />
      <ContactBand />
    </>
  );
}
