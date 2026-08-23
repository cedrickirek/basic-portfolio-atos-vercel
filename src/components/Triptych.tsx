"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { triptych } from "@/data/site";

/**
 * The signature element: three lines held in fixed positions, one at full
 * opacity and the others ghosted behind it like a watermark. The active line
 * cycles on a slow loop. Nothing reflows — only opacity changes.
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
    <h1 className="flex flex-col items-center gap-1 text-center sm:gap-2">
      <span className="sr-only">{triptych.join(". ")}.</span>
      {triptych.map((line, i) => (
        <span
          key={line}
          aria-hidden="true"
          className="text-3xl font-extrabold tracking-tight transition-opacity duration-[800ms] ease-in-out sm:text-5xl lg:text-6xl"
          style={{
            // Under reduced motion every line stays legible and nothing cycles.
            opacity: reduced ? 1 : i === active ? 1 : 0.15,
          }}
        >
          {line}
        </span>
      ))}
    </h1>
  );
}
