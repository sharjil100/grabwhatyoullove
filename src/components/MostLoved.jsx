import { Reveal } from "../lib/motion.jsx";
import Divider from "./Divider.jsx";

// "Infinite Sparkle / Most Loved" bento — ring-in-box pedestal + feature shot.
export default function MostLoved() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
      <Reveal className="mb-3 text-center">
        <h2 className="font-serif text-4xl text-ink md:text-5xl">
          Infinite <span className="italic text-burgundy">Sparkle</span>
        </h2>
      </Reveal>
      <Divider />

      <div className="mt-8 grid gap-5 md:grid-cols-12">
        {/* most loved — ring in box on pedestal */}
        <Reveal className="md:col-span-3" y={30}>
          <div className="flex h-full flex-col rounded-[1.8rem] border border-champagne/50 bg-cream/70 p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
                Most loved
              </p>
              <span className="rounded-full border border-burgundy/25 px-3 py-0.5 text-[10px] uppercase tracking-[0.12em] text-burgundy">
                Gemstone
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/hero-product.png"
                alt="signature rings in box"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              High-quality finishes — gently cleaned with mild soapy water to keep
              their shine.
            </p>
          </div>
        </Reveal>

        {/* center feature */}
        <Reveal className="md:col-span-6" y={36} delay={0.05}>
          <div className="group relative h-[320px] overflow-hidden rounded-[1.8rem] md:h-full">
            <img
              src="/images/product-3.jpg"
              alt="best in crafting jewellery"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/55 via-transparent to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-7">
              <h3 className="max-w-sm font-serif text-3xl leading-tight text-cream md:text-4xl">
                We&apos;re <span className="italic">best</span> in crafting the best
                jewellery
              </h3>
              <a
                href="#showcase"
                className="mt-5 w-fit rounded-full bg-cream px-6 py-3 text-sm uppercase tracking-[0.14em] text-burgundy transition-transform hover:-translate-y-0.5"
              >
                Find your piece →
              </a>
            </div>
          </div>
        </Reveal>

        {/* right — world famous */}
        <Reveal className="md:col-span-3" y={30} delay={0.1}>
          <div className="group relative h-[320px] overflow-hidden rounded-[1.8rem] md:h-full">
            <img
              src="/images/product-9.jpg"
              alt="layered jewellery"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/55 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cream/70">
                World famous
              </p>
              <h4 className="font-serif text-2xl text-cream">Layered sets</h4>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
