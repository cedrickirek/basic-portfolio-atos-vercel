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
      {/* --marquee-gap must match the gap utility below: the keyframe shifts
          by half of it to land one copy over without a seam. */}
      <div className="flex w-max animate-marquee gap-5 [--marquee-gap:1.25rem] group-hover:[animation-play-state:paused] sm:gap-8 sm:[--marquee-gap:2rem]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-5 text-2xl font-extrabold tracking-tight uppercase sm:gap-8 sm:text-5xl"
          >
            {/* Alternating solid and outlined items, echoing the hero. */}
            {interests.map((item, i) => (
              <li key={item} className="flex items-center gap-5 whitespace-nowrap sm:gap-8">
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
