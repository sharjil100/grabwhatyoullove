// Infinite horizontal marquee of brand phrases (CSS-driven; pauses on hover,
// frozen by the global prefers-reduced-motion rule).
const WORDS = [
  "Affordable Luxury",
  "Gift-Ready",
  "Hand-Finished",
  "Editorial Sparkle",
  "Fast Delivery",
  "Colour-Guaranteed",
];

function Row() {
  return (
    <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span className="font-serif text-2xl italic text-cream/90 md:text-3xl">
            {w}
          </span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-champagne" fill="currentColor">
            <path d="M12 1l2.6 6.8L21 10l-6.4 2.2L12 19l-2.6-6.8L3 10l6.4-2.2z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-mauve via-burgundy to-mauve py-4">
      <div className="flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
