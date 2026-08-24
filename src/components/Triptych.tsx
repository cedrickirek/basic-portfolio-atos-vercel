"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { triptych } from "@/data/site";

/**
 * The signature element: three lines held in fixed positions, one at full
 * opacity and the others ghosted behind it like a watermark. The active line
 * cycles on a slow loop. Nothing reflows -- only opacity changes.
 *
 * Set in the display serif and left-aligned. The reference pairs a large
 * serif against a tiny mono eyebrow, and that contrast is what carries the
 * page; centred bold sans read as a generic hero.
 */
export function Triptych() {
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % triptych.length),
      3500,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <h1 className="flex flex-col gap-0 text-left">
      <span className="sr-only">{triptych.join(". ")}.</span>
      {triptych.map((line, i) => (
        <span
          key={line}
          aria-hidden="true"
          className="font-serif text-[clamp(2.2rem,7vw,6.5rem)] leading-[1.02] font-normal tracking-[-0.02em] transition-opacity duration-[800ms] ease-in-out"
          style={{
            // Under reduced motion every line stays legible and nothing cycles.
            opacity: reduced ? 1 : i === active ? 1 : 0.16,
          }}
        >
          {line}
        </span>
      ))}
    </h1>
  );
}
