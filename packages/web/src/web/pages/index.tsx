import { Nav } from "../components/sections/nav";
import { Hero } from "../components/sections/hero";
import { Marquee } from "../components/sections/marquee";
import { About } from "../components/sections/about";
import { Flavors } from "../components/sections/flavors";
import { Gallery } from "../components/sections/gallery";
import { Referral } from "../components/sections/referral";
import { Cta } from "../components/sections/cta";
import { Footer } from "../components/sections/footer";

function Index() {
  return (
    <main id="conteudo" tabIndex={-1} className="bg-page text-content">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Flavors />
      <Referral />
      <Gallery />
      <Cta />
      <Footer />
    </main>
  );
}

export default Index;
