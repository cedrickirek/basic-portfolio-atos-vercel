"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { slides } from "@/data/carousel";

/**
 * Fixed-ratio carousel so the layout never jumps between frames.
 * Auto-advances, pauses on hover/focus, swipeable, arrow-key navigable.
 */
export function Carousel() {
  const reduced = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 1650);
    return () => clearInterval(id);
  }, [paused, reduced]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos of Cedric"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
        className="relative aspect-4/5 w-full overflow-hidden border border-rule bg-panel"
      >
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            priority={i === 0}
            className="object-cover transition-opacity duration-300"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
        {/* The studio shots are on near-white and glare against the dark
            ground; the scrim ties them in. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-1 w-5 transition-colors ${
              i === index ? "bg-accent" : "bg-rule hover:bg-fog/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
