import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "../lib/motion.jsx";

const IG_URL = "https://www.instagram.com/grabwhatyoulove_/";
const LINKS = [
  { label: "Shop", href: "#showcase" },
  { label: "Jewellery", href: "#collection" },
  { label: "Perfumes", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  // Nav blur-on-scroll: transparent at top, frosted blush once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/75 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(110,31,44,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        {/* left links */}
        <ul className="hidden flex-1 items-center gap-7 text-[13px] uppercase tracking-[0.18em] text-ink/80 md:flex">
          {LINKS.slice(0, 3).map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-burgundy">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* centred logo (uses the transparent mark so it sits on blush) */}
        <a href="#top" className="flex flex-1 justify-center md:flex-none">
          <img
            src="/images/logo-mark.png"
            alt="grabwhatyoulove"
            className="h-12 w-12 object-contain md:h-14 md:w-14"
          />
        </a>

        {/* right links + IG */}
        <ul className="hidden flex-1 items-center justify-end gap-7 text-[13px] uppercase tracking-[0.18em] text-ink/80 md:flex">
          {LINKS.slice(3).map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-burgundy">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-burgundy/80 transition-colors hover:text-burgundy"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </li>
        </ul>

        {/* mobile IG only */}
        <a
          href={IG_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-burgundy md:hidden"
        >
          <InstagramIcon className="h-6 w-6" />
        </a>
      </nav>
    </motion.header>
  );
}
