import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// A thin champagne line that draws itself as it scrolls into view, with a small
// diamond at the centre — echoes the logo's hairline style.
export default function Divider() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.6"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="mx-auto flex max-w-3xl justify-center px-10 py-6">
      <svg viewBox="0 0 600 24" className="w-full" fill="none" aria-hidden="true">
        <motion.line
          x1="0" y1="12" x2="270" y2="12"
          stroke="var(--color-champagne)" strokeWidth="1.2"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
        <motion.line
          x1="600" y1="12" x2="330" y2="12"
          stroke="var(--color-champagne)" strokeWidth="1.2"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
        <motion.path
          d="M300 4 L308 12 L300 20 L292 12 Z"
          stroke="var(--color-burgundy)" strokeWidth="1.2"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
}
