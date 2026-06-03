import { motion } from "framer-motion";
import { Reveal, WordReveal, staggerParent, staggerItem } from "../lib/motion.jsx";

// Maps product-1..8 (the varied treatments) to display copy.
const PRODUCTS = [
  { img: "product-1.jpg", name: "Clover Trio Set", tag: "Necklace · Bracelet · Ring", price: "৳650" },
  { img: "product-2.jpg", name: "Black Opium Mini", tag: "Eau de Parfum", price: "৳320" },
  { img: "product-3.jpg", name: "Kundan Statement Set", tag: "Necklace & Earrings", price: "৳299" },
  { img: "product-4.jpg", name: "Emerald Drop Earrings", tag: "Oxidised Silver", price: "৳250" },
  { img: "product-5.jpg", name: "Libre Eau de Parfum", tag: "Gift-Boxed Mini", price: "৳320" },
  { img: "product-6.jpg", name: "Miss Dior Blooming", tag: "Eau de Parfum", price: "৳320" },
  { img: "product-7.jpg", name: "Sauvage Mini", tag: "Eau de Toilette", price: "৳320" },
  { img: "product-8.jpg", name: "Crystal Cascade Necklace", tag: "Crystal Drops", price: "৳210" },
];

function Card({ p }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-[1.6rem] bg-cream shadow-card"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* hover: image zoom 1.05 */}
        <img
          src={`/images/${p.img}`}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* price/name panel slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <div className="flex items-center justify-between rounded-2xl bg-cream/90 px-4 py-3 backdrop-blur">
            <div>
              <p className="font-serif text-lg leading-tight text-ink">{p.name}</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-ink/50">{p.tag}</p>
            </div>
            <span className="font-serif text-lg text-burgundy">{p.price}</span>
          </div>
        </div>
      </div>

      {/* resting label (fades out as the hover panel rises) */}
      <div className="flex items-center justify-between px-5 py-4 transition-opacity duration-300 group-hover:opacity-0">
        <p className="font-serif text-lg text-ink">{p.name}</p>
        <span className="font-serif text-lg text-burgundy">{p.price}</span>
      </div>
    </motion.article>
  );
}

export default function ProductShowcase() {
  return (
    <section id="showcase" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
          The collection
        </p>
        <WordReveal
          text="Pieces to fall for"
          accents={["fall", "for"]}
          className="mt-2 font-serif text-4xl text-ink md:text-5xl"
        />
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
          Every shot, one look — editorial luxury without the luxury price.
        </p>
      </Reveal>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PRODUCTS.map((p) => (
          <Card key={p.img} p={p} />
        ))}
      </motion.div>
    </section>
  );
}
