"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/**
 * The page title's entrance.
 *
 * This used to be the receiving end of a `layoutId` morph from the landing
 * CTA. Across an App Router navigation the two elements are never mounted at
 * the same time -- the old route unmounts, the new one mounts and paints, and
 * only on a later frame does Motion notice the shared id. The result was the
 * title animating on top of an already-settled page, reading as an
 * afterthought rather than as the page arriving.
 *
 * So it animates itself instead, starting on the first painted frame.
 */
export function ProjectsHeading() {
  const reduced = useReducedMotionSafe();

  return (
    <h1>
      <motion.span
        initial={reduced ? false : { opacity: 0, y: "0.35em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="block text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[0.98] font-extrabold tracking-tight text-white uppercase"
      >
        My Projects
      </motion.span>
    </h1>
  );
}
