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
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs tracking-[0.14em] text-ash uppercase">
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
            className="flex shrink-0 items-center gap-8 font-serif text-2xl tracking-[-0.01em] text-chalk sm:text-4xl"
          >
            {interests.map((item) => (
              <li key={item} className="flex items-center gap-8 whitespace-nowrap">
                {item}
                <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-amber" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
