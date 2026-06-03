import { Reveal } from "../lib/motion.jsx";

// Hairline bow echoing the logo's central motif.
function Bow({ className = "" }) {
  return (
    <svg viewBox="0 0 120 70" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 35c-10-3-30-9-30-20 0-7 8-9 14-4 8 6 16 18 16 24z" />
        <path d="M60 35c10-3 30-9 30-20 0-7-8-9-14-4-8 6-16 18-16 24z" />
        <path d="M60 35c-6 2-16 7-16 16 0 6 7 7 12 3 4-3 6-13 4-19z" />
        <path d="M60 35c6 2 16 7 16 16 0 6-7 7-12 3-4-3-6-13-4-19z" />
        <circle cx="60" cy="35" r="5" />
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      {/* about-bg.jpg as the soft dreamy background */}
      <img
        src="/images/about-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-cream/55" />

      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        <div className="mx-auto mb-6 w-28 text-burgundy">
          <Bow className="w-full" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
          Our story
        </p>
        <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
          Made for the ones who{" "}
          <span className="italic text-burgundy">grab what they love</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70">
          grabwhatyoulove began with a simple belief — that everyday luxury
          shouldn&apos;t be out of reach. We hand-pick jewellery and perfume
          miniatures that feel editorial and special, then box them up so each
          one arrives like a little gift to yourself. Soft sparkle, warm tones,
          and pieces you&apos;ll actually reach for, again and again.
        </p>
        <a
          href="#showcase"
          className="mt-8 inline-block rounded-full border border-burgundy/30 px-8 py-3 text-sm uppercase tracking-[0.15em] text-burgundy transition-colors hover:bg-burgundy/5"
        >
          Explore the collection
        </a>
      </Reveal>
    </section>
  );
}
