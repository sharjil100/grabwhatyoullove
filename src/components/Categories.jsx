import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "../lib/motion.jsx";

// One editorial category tile with an inner parallax image.
function CategoryTile({ image, label, blurb, href, className, range = 40 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax only when motion is allowed; mobile is handled by md: classes that
  // pin the image (overflow-hidden + scale) so the transform stays subtle.
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <a
      href={href}
      ref={ref}
      className={`group relative block overflow-hidden rounded-[2rem] shadow-card ${className}`}
    >
      <motion.img
        src={image}
        alt={label}
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-0 h-[120%] w-full -translate-y-[8%] object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy/55 via-burgundy/10 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-7 md:p-9">
        <p className="text-[11px] uppercase tracking-[0.3em] text-cream/80">
          Collection
        </p>
        <h3 className="font-serif text-3xl text-cream md:text-4xl">{label}</h3>
        <p className="mt-1 max-w-xs text-sm text-cream/80">{blurb}</p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.15em] text-cream">
          Explore
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  );
}

export default function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
          Two ways to glow
        </p>
        <h2 className="mt-2 font-serif text-4xl text-ink md:text-5xl">
          Shop by <span className="italic text-burgundy">category</span>
        </h2>
      </Reveal>

      {/* asymmetric grid: jewellery taller on the left, perfume offset right */}
      <div className="grid gap-6 md:grid-cols-5">
        <Reveal className="md:col-span-3" y={36}>
          <CategoryTile
            image="/images/cat-jewellery.jpg"
            label="Jewellery"
            blurb="Rings, earrings & necklaces with editorial sparkle."
            href="#showcase"
            className="h-[360px] md:h-[520px]"
          />
        </Reveal>
        <Reveal className="md:col-span-2 md:pt-16" y={36} delay={0.1}>
          <CategoryTile
            image="/images/cat-perfume.jpg"
            label="Perfumes"
            blurb="Designer-inspired miniatures, beautifully boxed."
            href="#showcase"
            className="h-[360px] md:h-[440px]"
            range={28}
          />
        </Reveal>
      </div>
    </section>
  );
}
