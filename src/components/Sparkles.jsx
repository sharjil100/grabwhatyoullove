import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Drifting champagne sparkle particles. Deliberately low count for performance;
// rendered as cheap CSS dots, not canvas. Disabled entirely under reduced motion.
// `count` is kept small (and callers pass even fewer on mobile).
export default function Sparkles({ count = 14, className = "" }) {
  const reduce = useReducedMotion();

  // Deterministic pseudo-random so SSR/refresh stay stable (no Math.random in
  // render path jitter). Seeded by index.
  const dots = useMemo(() => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      const r1 = s - Math.floor(s);
      const r2 = (Math.sin((i + 1) * 78.233) * 12543.123) % 1;
      out.push({
        left: `${(r1 * 100).toFixed(2)}%`,
        top: `${(Math.abs(r2) * 100).toFixed(2)}%`,
        size: 2 + Math.abs(r2) * 4,
        delay: r1 * 4,
        duration: 5 + Math.abs(r2) * 5,
        drift: -8 - r1 * 18,
      });
    }
    return out;
  }, [count]);

  if (reduce) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background:
              "radial-gradient(circle, rgba(255,250,244,0.95) 0%, rgba(231,211,184,0.7) 45%, rgba(231,211,184,0) 70%)",
            boxShadow: "0 0 6px rgba(231,211,184,0.7)",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0.4, 0], y: [0, d.drift, d.drift * 1.6] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
