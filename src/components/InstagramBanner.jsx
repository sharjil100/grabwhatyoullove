import { motion } from "framer-motion";
import { Reveal, staggerParent, staggerItem } from "../lib/motion.jsx";

const IG_URL = "https://www.instagram.com/grabwhatyoulove_/";
const FEED = [1, 2, 3, 4, 5, 6];

export default function InstagramBanner() {
  return (
    <section className="py-20 md:py-24">
      <Reveal className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
          @grabwhatyoulove_
        </p>
        <h2 className="mt-2 font-serif text-4xl text-ink md:text-5xl">
          Follow us on <span className="italic text-burgundy">Instagram</span>
        </h2>
        <a
          href={IG_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm uppercase tracking-[0.15em] text-burgundy underline-offset-4 hover:underline"
        >
          @grabwhatyoulove_
        </a>
      </Reveal>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-3 gap-2 px-3 md:grid-cols-6 md:gap-3 md:px-6"
      >
        {FEED.map((n) => (
          <motion.a
            key={n}
            variants={staggerItem}
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={`/images/insta-${n}.jpg`}
              alt={`grabwhatyoulove instagram ${n}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-burgundy/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-cream" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
              </svg>
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
