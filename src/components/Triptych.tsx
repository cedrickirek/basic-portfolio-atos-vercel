"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { triptychStem, triptychWords } from "@/data/site";

/**
 * The signature element: a fixed stem ("Never stop") followed by a word that
 * types itself in, holds under a blinking caret, erases, and gives way to the
 * next one -- improving, exploring, building, forever.
 *
 * The caret never moves away from the end of the word, so the erase reads as
 * a backspace rather than a swap. Only the cycling word is animated; the stem
 * is ordinary text and stays put, which also keeps the line from reflowing.
 */

// Per-character timings. Erasing runs faster than typing because a backspace
// held at full typing speed reads as a stall rather than as deletion.
const TYPE_MS = 90;
const ERASE_MS = 45;
// How long the completed word sits under the caret before it starts erasing.
const HOLD_MS = 1600;
// A beat on the bare stem, so the next word does not begin the instant the
// previous one disappears.
const PAUSE_MS = 400;

export function Triptych() {
  const reduced = useReducedMotionSafe();
  const [wordIndex, setWordIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    // Under reduced motion the headline is static: the first word is printed
    // in full and nothing types, erases, or blinks.
    if (reduced) return;

    const word = triptychWords[wordIndex];
    let delay: number;

    if (!erasing && count < word.length) {
      delay = TYPE_MS;
    } else if (!erasing) {
      delay = HOLD_MS;
    } else if (count > 0) {
      delay = ERASE_MS;
    } else {
      delay = PAUSE_MS;
    }

    const id = setTimeout(() => {
      if (!erasing && count < word.length) {
        setCount(count + 1);
      } else if (!erasing) {
        setErasing(true);
      } else if (count > 0) {
        setCount(count - 1);
      } else {
        setErasing(false);
        setWordIndex((i) => (i + 1) % triptychWords.length);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [reduced, wordIndex, count, erasing]);

  const typed = reduced
    ? triptychWords[0]
    : triptychWords[wordIndex].slice(0, count);

  return (
    <h1 className="text-[clamp(2.4rem,6.5vw,7rem)] leading-[0.98] font-extrabold tracking-tight text-white uppercase">
      {/* Screen readers get the whole set as plain text; the animation itself
          is decorative and would otherwise be announced one letter at a time. */}
      <span className="sr-only">
        {triptychWords.map((w) => `${triptychStem} ${w}.`).join(" ")}
      </span>

      <span aria-hidden="true" className="flex flex-col text-left">
        <span>{triptychStem}</span>
        {/* The cycling line reserves its height whatever the word length, so
            the block below it never jumps as letters come and go. */}
        <span className="flex min-h-[1em] items-center">
          <span className="text-accent">{typed}</span>
          {!reduced && (
            <span
              className="ml-[0.06em] inline-block h-[0.82em] w-[0.06em] shrink-0 animate-caret bg-accent"
            />
          )}
        </span>
      </span>
    </h1>
  );
}
