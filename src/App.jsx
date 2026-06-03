import Nav from "./components/Nav.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import HeroBento from "./components/HeroBento.jsx";
import Marquee from "./components/Marquee.jsx";
import CollectionCarousel from "./components/CollectionCarousel.jsx";
import DazzlePanel from "./components/DazzlePanel.jsx";
import GlamourRow from "./components/GlamourRow.jsx";
import ProductShowcase from "./components/ProductShowcase.jsx";
import MostLoved from "./components/MostLoved.jsx";
import WhyUs from "./components/WhyUs.jsx";
import About from "./components/About.jsx";
import Testimonials from "./components/Testimonials.jsx";
import InstagramBanner from "./components/InstagramBanner.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <HeroBento />
        <Marquee />
        <CollectionCarousel />
        <DazzlePanel />
        <GlamourRow />
        <ProductShowcase />
        <MostLoved />
        <WhyUs />
        <About />
        <Testimonials />
        <Marquee />
        <InstagramBanner />
      </main>
      <Footer />
    </>
  );
}
