import { motion } from "framer-motion";
import { Reveal } from "../lib/motion.jsx";

// Horizontal product rail like the reference's "New jewellery collections".
const ITEMS = [
  { img: "product-1.jpg", name: "Clover Trio Set", price: "৳650" },
  { img: "product-3.jpg", name: "Kundan Statement", price: "৳299" },
  { img: "product-4.jpg", name: "Emerald Drops", price: "৳250" },
  { img: "product-6.jpg", name: "Miss Dior Mini", price: "৳320" },
  { img: "product-8.jpg", name: "Crystal Cascade", price: "৳210" },
  { img: "product-10.jpg", name: "Peacock Jhumka", price: "৳280" },
  { img: "product-11.jpg", name: "Chandelier Drops", price: "৳300" },
  { img: "product-5.jpg", name: "Libre Eau de Parfum", price: "৳320" },
];

export default function CollectionCarousel() {
  return (
    <section id="collection" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
      <Reveal className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-serif text-4xl text-ink md:text-5xl">
          New <span className="italic text-burgundy">jewellery</span> collections
        </h2>
        <a
          href="#showcase"
          className="hidden shrink-0 items-center gap-2 text-sm uppercase tracking-[0.14em] text-burgundy hover:underline md:inline-flex"
        >
          View collection →
        </a>
      </Reveal>

      {/* snap-scroll rail */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((p, i) => (
          <motion.article
            key={p.img}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className="group w-[180px] shrink-0 snap-start rounded-3xl border border-champagne/40 bg-cream p-3 shadow-soft transition-shadow hover:shadow-card md:w-[220px]"
          >
            <div className="overflow-hidden rounded-2xl bg-blush-soft/50">
              <img
                src={`/images/${p.img}`}
                alt={p.name}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-1 pt-3">
              <div className="min-w-0">
                <p className="truncate font-serif text-base text-ink">{p.name}</p>
                <p className="text-sm text-burgundy">{p.price}</p>
              </div>
              <button
                aria-label={`Add ${p.name}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy text-cream transition-transform hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
