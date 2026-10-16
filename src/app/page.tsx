import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import FeaturedListings from "@/components/sections/FeaturedListings";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

// Section order mirrors the reference: dark, dark, light, dark, light, light.
export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <About />
      <FeaturedListings />
      <Team />
      <Contact />
    </>
  );
}
