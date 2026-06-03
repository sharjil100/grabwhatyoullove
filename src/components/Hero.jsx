import { motion, useReducedMotion } from "framer-motion";
import { EASE, useCountUp } from "../lib/motion.jsx";
import Sparkles from "./Sparkles.jsx";

const IG_URL = "https://www.instagram.com/grabwhatyoulove_/";

// Headline revealed word-by-word; the final word is the italic serif accent.
const WORDS = ["Grab", "what", "you"];
const ACCENT = "love.";

export default function Hero() {
  const reduce = useReducedMotion();
  const [statRef, customers] = useCountUp(2000);

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* hero-product.png lives on the right inside a rotating champagne frame */}
      <Sparkles count={reduce ? 0 : 16} />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 md:grid-cols-2 md:px-10 md:pb-24">
        {/* ── copy ── */}
        <div className="relative z-10 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 inline-block rounded-full border border-burgundy/20 bg-cream/60 px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-burgundy/80"
          >
            Affordable luxury · since the first sparkle
          </motion.p>

          <h1 className="font-serif text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            {WORDS.map((w, i) => (
              <motion.span
                key={w}
                className="mr-3 inline-block"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.13 }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="inline-block italic text-burgundy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + WORDS.length * 0.13 }}
            >
              {ACCENT}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink/70 md:mx-0"
          >
            Editorial jewellery &amp; perfume miniatures — hand-picked, gift-ready,
            and delivered fast. Little luxuries that feel entirely yours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <a
              href="#showcase"
              className="rounded-full bg-burgundy px-8 py-3 text-sm uppercase tracking-[0.15em] text-cream shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-burgundy-soft"
            >
              Shop Now
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-burgundy/30 px-8 py-3 text-sm uppercase tracking-[0.15em] text-burgundy transition-colors hover:bg-burgundy/5"
            >
              View on Instagram
            </a>
          </motion.div>

          {/* social proof: avatar stack + count-up */}
          <motion.div
            ref={statRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1 }}
            className="mt-9 flex items-center justify-center gap-4 md:justify-start"
          >
            <div className="flex -space-x-3">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-cream"
                  style={{
                    background: [
                      "linear-gradient(135deg,#f6dcd9,#eec6c1)",
                      "linear-gradient(135deg,#e7d3b8,#c9b6a4)",
                      "linear-gradient(135deg,#fbeae7,#f6dcd9)",
                      "linear-gradient(135deg,#8c3343,#6e1f2c)",
                    ][i],
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-ink/70">
              <span className="font-serif text-xl text-burgundy">
                {customers.toLocaleString()}+
              </span>{" "}
              happy customers
            </p>
          </motion.div>
        </div>

        {/* ── hero image in slowly-rotating champagne circle frame ── */}
        <div className="relative z-10 mx-auto flex w-full max-w-md items-center justify-center">
          <div className="relative aspect-square w-full">
            {/* rotating thin champagne ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-champagne/80"
              style={{ boxShadow: "inset 0 0 40px rgba(231,211,184,0.25)" }}
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            >
              {/* a couple of jewels riding the ring */}
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne shadow-[0_0_8px_rgba(231,211,184,0.9)]" />
              <span className="absolute bottom-3 right-6 h-1.5 w-1.5 rounded-full bg-burgundy/50" />
            </motion.div>
            <motion.div
              className="absolute inset-4 rounded-full border border-blush-deep/50"
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* the product */}
            <motion.img
              src="/images/hero-product.png"
              alt="grabwhatyoulove signature gemstone rings"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] rounded-full object-cover shadow-card"
            />
          </div>
        </div>
      </div>

      {/* soft fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
