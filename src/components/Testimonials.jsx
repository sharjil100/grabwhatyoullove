import { motion } from "framer-motion";
import { Reveal, WordReveal, staggerParent, staggerItem } from "../lib/motion.jsx";

const REVIEWS = [
  {
    name: "Tahsina R.",
    text: "The Clover set looks so much more expensive than it was. Got compliments all evening!",
    handle: "@tahsina",
  },
  {
    name: "Mehjabin A.",
    text: "Packaging felt like a real gift. The perfume mini smells gorgeous and lasted all day.",
    handle: "@mehjabin",
  },
  {
    name: "Nusrat J.",
    text: "Ordered the emerald earrings for my sister — delivery was quick and they're stunning.",
    handle: "@nusrat",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-burgundy" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
          Loved &amp; reviewed
        </p>
        <WordReveal
          text="Words from our people"
          accents={["people"]}
          className="mt-2 font-serif text-4xl text-ink md:text-5xl"
        />
      </Reveal>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {REVIEWS.map((r) => (
          <motion.figure
            key={r.name}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="rounded-[1.6rem] bg-blush-soft/80 p-7 shadow-soft transition-shadow hover:shadow-card"
          >
            <Stars />
            <blockquote className="mt-4 font-serif text-xl leading-snug text-ink">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                className="h-9 w-9 rounded-full"
                style={{ background: "linear-gradient(135deg,#f6dcd9,#8c3343)" }}
              />
              <span>
                <span className="block text-sm font-medium text-ink">{r.name}</span>
                <span className="block text-xs text-ink/50">{r.handle}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
