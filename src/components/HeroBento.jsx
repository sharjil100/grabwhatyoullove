import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE, useCountUp } from "../lib/motion.jsx";
import Sparkles from "./Sparkles.jsx";

const IG_URL = "https://www.instagram.com/grabwhatyoulove_/";

// Small round arrow button used throughout the bento (reference motif).
function ArrowBtn({ className = "" }) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream/15 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function PlayBtn() {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/85 text-burgundy backdrop-blur">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

export default function HeroBento() {
  const reduce = useReducedMotion();
  const [statRef, customers] = useCountUp(2000);
  const { scrollY } = useScroll();
  // gentle parallax drift on the satin backdrop as you scroll
  const bgY = useTransform(scrollY, [0, 700], [0, 90]);

  const word = (text, i, italic) => (
    <motion.span
      key={text + i}
      className={`mr-3 inline-block ${italic ? "italic text-burgundy" : ""}`}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.12 }}
    >
      {text}
    </motion.span>
  );

  return (
    <section id="top" className="relative overflow-hidden px-3 pb-10 pt-20 md:px-6 md:pb-16 md:pt-24">
      {/* moody rose-satin backdrop */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
        <motion.img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          style={{ y: reduce ? 0 : bgY }}
          className="absolute inset-0 h-[112%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-plum/70 via-mauve/55 to-rose-deep/45" />
        <Sparkles count={reduce ? 0 : 14} />

        <div className="relative grid gap-4 p-4 md:p-6 lg:grid-cols-12">
          {/* ── left: headline + bottom tiles ── */}
          <div className="lg:col-span-8">
            <div className="px-3 pt-10 text-center md:px-6 md:pt-16 lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-[11px] uppercase tracking-[0.35em] text-cream/70"
              >
                — Affordable Luxury
              </motion.p>

              <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
                <span className="block">
                  {word("Grab", 0)}
                  {word("what", 1)}
                  {word("you", 2)}
                </span>
                <span className="mt-1 flex items-center justify-center gap-3 lg:justify-start">
                  {/* inline isolated ring (reference motif): entrance, then a
                      continuous gentle float, with a pulsing halo behind it */}
                  <motion.span
                    className="relative inline-flex"
                    animate={reduce ? {} : { y: [0, -9, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="halo-pulse absolute inset-0 -z-10 rounded-full bg-blush/50 blur-xl" />
                    <motion.img
                      src="/images/hero-ring.png"
                      alt="signature ring"
                      initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
                      whileHover={reduce ? {} : { scale: 1.12, rotate: 6 }}
                      className="inline-block h-16 w-16 rounded-full object-cover shadow-card sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                    />
                  </motion.span>
                  {word("truly", 3)}
                  {word("love.", 4, true)}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
                className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/75 lg:mx-0"
              >
                Editorial jewellery &amp; perfume miniatures — hand-picked,
                gift-ready and delivered fast. Little luxuries, entirely yours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              >
                <a
                  href="#collection"
                  className="shine rounded-full bg-cream px-7 py-3 text-sm uppercase tracking-[0.15em] text-burgundy shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  Shop Now
                </a>
                <a href="#collection" aria-label="Explore">
                  <ArrowBtn />
                </a>
              </motion.div>
            </div>

            {/* bottom-left two tiles */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* designers + avatar stack */}
              <motion.div
                ref={statRef}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1 }}
                className="flex flex-col justify-between rounded-3xl bg-cream/90 p-6 backdrop-blur"
              >
                <div>
                  <div className="mb-3 flex -space-x-3">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-cream"
                        style={{
                          background: [
                            "linear-gradient(135deg,#f6dcd9,#eec6c1)",
                            "linear-gradient(135deg,#e7d3b8,#c79a52)",
                            "linear-gradient(135deg,#fbeae7,#d98a92)",
                            "linear-gradient(135deg,#a85561,#6e1f2c)",
                          ][i],
                        }}
                      />
                    ))}
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-ink">
                    Best <span className="italic text-burgundy">jewellery</span> from
                    the world&apos;s best designers
                  </h3>
                </div>
                <p className="mt-4 text-sm text-ink/60">
                  <span className="font-serif text-lg text-burgundy">
                    {customers.toLocaleString()}+
                  </span>{" "}
                  happy customers ·{" "}
                  <a href="#collection" className="uppercase tracking-[0.12em] text-burgundy underline-offset-4 hover:underline">
                    Learn more
                  </a>
                </p>
              </motion.div>

              {/* model worn tile + play button */}
              <motion.a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
                className="group relative min-h-[220px] overflow-hidden rounded-3xl"
              >
                <img
                  src="/images/product-4.jpg"
                  alt="worn earrings"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayBtn />
                </div>
                <span className="absolute bottom-4 left-4 rounded-full bg-cream/85 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-burgundy">
                  Hand-finished
                </span>
              </motion.a>
            </div>
          </div>

          {/* ── right: bento column ── */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            {/* Premium grade ring-in-box */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              className="rounded-3xl bg-cream/90 p-5 backdrop-blur"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
                    Premium grade
                  </p>
                  <h3 className="font-serif text-xl text-ink">Gemstone Rings</h3>
                </div>
                <ArrowBtn className="border-burgundy/30 text-burgundy hover:bg-burgundy/5" />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img src="/images/hero-product.png" alt="gemstone rings in box" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="mt-3 flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`h-1.5 rounded-full ${i === 0 ? "w-5 bg-burgundy" : "w-1.5 bg-burgundy/25"}`} />
                ))}
              </div>
            </motion.div>

            {/* Handpicked on-stone */}
            <motion.a
              href="#collection"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
              className="group relative flex-1 overflow-hidden rounded-3xl"
            >
              <img
                src="/images/card-on-stone.jpg"
                alt="handpicked designer jewellery"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent" />
              <div className="relative flex h-full min-h-[180px] flex-col justify-end p-5">
                <div className="flex items-end justify-between">
                  <h3 className="max-w-[70%] font-serif text-2xl leading-tight text-cream">
                    Handpicked <span className="italic">designer</span> jewellery
                  </h3>
                  <ArrowBtn />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
