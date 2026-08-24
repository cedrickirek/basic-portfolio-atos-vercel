"use client";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { interests } from "@/data/site";

/**
 * Horizontally flowing bar. The list is duplicated so the loop wraps
 * seamlessly; under reduced motion it renders as a static centered row.
 */
export function Interests() {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs tracking-[0.14em] text-fog uppercase">
        {interests.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="group relative overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-8 text-3xl font-extrabold tracking-tight uppercase sm:text-5xl"
          >
            {/* Alternating solid and outlined items, echoing the hero. */}
            {interests.map((item, i) => (
              <li key={item} className="flex items-center gap-8 whitespace-nowrap">
                <span className={i % 2 === 0 ? "text-white" : "text-stroke"}>
                  {item}
                </span>
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
