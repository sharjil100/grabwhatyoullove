import { motion } from "framer-motion";
import { Reveal, WordReveal, staggerParent, staggerItem } from "../lib/motion.jsx";

// Thin line-art icons drawn to match the logo's hairline rose-gold style.
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Authentic() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" {...stroke}>
      <path d="M24 5l5 4 6-1 1 6 4 5-4 5-1 6-6-1-5 4-5-4-6 1-1-6-4-5 4-5 1-6 6 1z" />
      <path d="M18 24l4 4 9-9" />
    </svg>
  );
}
function AffordableLuxury() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" {...stroke}>
      <path d="M12 18h24l-12 24z" />
      <path d="M12 18l4-7h16l4 7" />
      <path d="M20 11l-3 7 7 24M28 11l3 7-7 24" />
    </svg>
  );
}
function FastDelivery() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" {...stroke}>
      <path d="M4 30V14h22v16" />
      <path d="M26 19h9l5 6v5h-14" />
      <circle cx="14" cy="33" r="3.2" />
      <circle cx="33" cy="33" r="3.2" />
    </svg>
  );
}
function GiftReady() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" {...stroke}>
      <path d="M8 18h32v6H8z" />
      <path d="M10 24h28v18H10z" />
      <path d="M24 18v24" />
      <path d="M24 18c-3-1-9-3-9-7s7-2 9 7c2-9 9-7 9-7s-6 6-9 7z" />
    </svg>
  );
}

const ITEMS = [
  { Icon: Authentic, title: "Authentic", text: "Color-guaranteed, hypoallergenic pieces you can trust." },
  { Icon: AffordableLuxury, title: "Affordable luxury", text: "Editorial looks, never the editorial price tag." },
  { Icon: FastDelivery, title: "Fast delivery", text: "Carefully packed and on its way in no time." },
  { Icon: GiftReady, title: "Gift-ready", text: "Boxed and ribboned, ready to be given with love." },
];

export default function WhyUs() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
            The grabwhatyoulove promise
          </p>
          <WordReveal
            text="Little luxuries, done right"
            accents={["done", "right"]}
            className="mt-2 font-serif text-4xl text-ink md:text-5xl"
          />
        </Reveal>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {ITEMS.map(({ Icon, title, text }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group/why rounded-[1.4rem] border border-champagne/50 bg-cream/70 p-6 text-center text-burgundy transition-shadow hover:shadow-card md:p-8"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blush-soft text-burgundy transition-transform duration-500 group-hover/why:rotate-6 group-hover/why:scale-110">
                <Icon />
              </div>
              <h3 className="font-serif text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
