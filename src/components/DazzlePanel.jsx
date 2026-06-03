import { motion } from "framer-motion";
import { Reveal } from "../lib/motion.jsx";
import Sparkles from "./Sparkles.jsx";

// The deep-rose "Dare to dazzle differently" feature block (the reference's
// terracotta panel, translated to the pink palette).
export default function DazzlePanel() {
  return (
    <section className="px-3 py-6 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-mauve via-rose-deep to-burgundy md:rounded-[2.5rem]">
        <Sparkles count={12} />
        <div className="relative grid gap-6 p-6 md:grid-cols-12 md:p-10">
          {/* left copy */}
          <Reveal className="md:col-span-4 md:self-center" as="div">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">
              Unleash your own hidden flare
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-cream md:text-5xl">
              Dare to <span className="italic text-blush">dazzle</span> differently
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">
              Affordable-luxury pieces that are strongly recommended for the ones
              who like to stand a little brighter.
            </p>
            <a
              href="#showcase"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm uppercase tracking-[0.14em] text-burgundy transition-transform hover:-translate-y-0.5"
            >
              Shop the look →
            </a>
          </Reveal>

          {/* center model */}
          <Reveal className="md:col-span-4" as="div" y={36}>
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <img
                src="/images/product-8.jpg"
                alt="model wearing crystal necklace"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </Reveal>

          {/* right: new arrivals + earrings tile */}
          <div className="flex flex-col gap-6 md:col-span-4">
            <Reveal as="div" delay={0.1}>
              <div className="flex items-end justify-between border-b border-cream/20 pb-4">
                <h3 className="font-serif text-3xl text-cream">New Arrivals</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/55">
                  01 / 2025 / FA
                </span>
              </div>
            </Reveal>

            <motion.a
              href="#collection"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative flex-1 overflow-hidden rounded-[1.6rem]"
            >
              <img
                src="/images/product-11.jpg"
                alt="hand-made earrings"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/70 to-transparent" />
              <div className="relative flex h-full min-h-[180px] flex-col justify-end p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cream/70">
                  Creative design
                </p>
                <h4 className="font-serif text-2xl text-cream">
                  Hand-made <span className="italic">earrings</span>
                </h4>
              </div>
            </motion.a>

            <Reveal as="p" delay={0.2} className="font-serif text-xl italic text-cream/85">
              We&apos;re crafting personalised memories since 2019.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
