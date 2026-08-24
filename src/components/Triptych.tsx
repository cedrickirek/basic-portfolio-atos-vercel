"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { triptych } from "@/data/site";

/**
 * The signature element, in the template's idiom: big uppercase sans where
 * the active line is solid white and the others render as outlines
 * (.text-stroke), the way the source strokes "CREATIVE STUDIO" under a solid
 * "DIGITAL". The active line still cycles; stroke does not animate, so the
 * swap rides on the colour change alone.
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
    <h1 className="flex flex-col text-left">
      <span className="sr-only">{triptych.join(". ")}.</span>
      {triptych.map((line, i) => {
        // Under reduced motion nothing cycles: the first line stays solid and
        // the rest stay stroked, matching the template's static hero.
        const solid = reduced ? i === 0 : i === active;
        return (
          <span
            key={line}
            aria-hidden="true"
            className={`text-[clamp(2.4rem,6.5vw,7rem)] leading-[0.98] font-extrabold tracking-tight uppercase transition-colors duration-500 ${
              solid ? "text-white" : "text-stroke"
            }`}
          >
            {line}
          </span>
        );
      })}
    </h1>
  );
}
