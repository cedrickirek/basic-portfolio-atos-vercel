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
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-grey">
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
            className="flex shrink-0 gap-8 text-sm text-grey"
          >
            {interests.map((item) => (
              <li key={item} className="whitespace-nowrap">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
