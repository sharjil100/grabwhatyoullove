import { Reveal } from "../lib/motion.jsx";

// "Glamour that steals the show" — the draped-chain-on-stone editorial row.
export default function GlamourRow() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="grid items-stretch gap-6 md:grid-cols-12">
        {/* big image with overlaid headline */}
        <Reveal className="md:col-span-7" y={36}>
          <div className="group relative h-[340px] overflow-hidden rounded-[2rem] md:h-[460px]">
            <img
              src="/images/card-chain-stone.jpg"
              alt="hand-made gold chain on stone"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
              <span className="w-fit rounded-full bg-cream/85 px-4 py-1 text-[11px] uppercase tracking-[0.16em] text-burgundy">
                Hand-made
              </span>
              <h2 className="max-w-md font-serif text-4xl leading-[1.05] text-cream md:text-5xl">
                <span className="italic">Glamour</span> that steals the show
              </h2>
            </div>
          </div>
        </Reveal>

        {/* right copy stack */}
        <div className="flex flex-col justify-between gap-6 md:col-span-5">
          <Reveal as="div">
            <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
              Premium grade
            </p>
            <h3 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
              Exquisite <span className="italic text-burgundy">jewellery</span> for
              the extraordinary you
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              Colour-guaranteed, hypoallergenic and water-proof finishes — known
              for their durability and their quiet, everyday sparkle.
            </p>
          </Reveal>

          <Reveal as="div" delay={0.1}>
            <a
              href="#collection"
              className="flex items-center justify-between rounded-3xl border border-champagne/50 bg-cream/70 p-5 transition-colors hover:bg-cream"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/images/product-1.jpg"
                  alt="clover set"
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-serif text-lg text-ink">Explore handmade</p>
                  <p className="text-sm text-ink/55">Bracelets &amp; chains</p>
                </div>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
