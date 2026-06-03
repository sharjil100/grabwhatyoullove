import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Cohesive easing + timing shared by every animation on the page.
export const EASE = [0.22, 1, 0.36, 1];
export const DUR = 0.62;

// Scroll fade-up reveal that triggers once. Collapses to a plain fade (or
// nothing) when the user prefers reduced motion.
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DUR, ease: EASE, delay: reduce ? 0 : delay }}
    >
      {children}
    </MotionTag>
  );
}

// Stagger container + item for grids (product cards, etc.).
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

// Word-by-word heading reveal on scroll-in. Pass plain text; wrap words you
// want italicised in the optional `accents` set. Triggers once.
export function WordReveal({ text, className = "", accents = [], delay = 0 }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ staggerChildren: reduce ? 0 : 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <motion.span
          key={w + i}
          className={`mr-[0.25em] inline-block ${
            accents.includes(w) ? "italic text-burgundy" : ""
          }`}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: 2 },
            show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.55, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.h2>
  );
}

// Count-up that starts when the element scrolls into view (once). Honors
// reduced motion by jumping straight to the final value.
export function useCountUp(target, { duration = 1400 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, duration]);

  return [ref, value];
}
