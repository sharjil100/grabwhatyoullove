const IG_URL = "https://www.instagram.com/grabwhatyoulove_/";

const QUICK = [
  { label: "Shop", href: "#showcase" },
  { label: "Jewellery", href: "#categories" },
  { label: "Perfumes", href: "#categories" },
  { label: "About", href: "#about" },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-champagne/50 bg-cream-warm/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
        {/* brand */}
        <div>
          <img
            src="/images/logo-mark.png"
            alt="grabwhatyoulove"
            className="mb-4 h-16 w-16 object-contain"
          />
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            Affordable luxury jewellery &amp; perfume miniatures — gift-ready and
            delivered with love.
          </p>
        </div>

        {/* quick links */}
        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-burgundy/70">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-ink/70">
            {QUICK.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-burgundy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* contact / social */}
        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-burgundy/70">
            Stay in touch
          </h4>
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink/70 transition-colors hover:text-burgundy"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
            @grabwhatyoulove_
          </a>
          <p className="mt-3 text-sm text-ink/60">hello@grabwhatyoulove.com</p>
        </div>
      </div>

      <div className="border-t border-champagne/40 px-6 py-5 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} grabwhatyoulove. All rights reserved.
      </div>
    </footer>
  );
}
