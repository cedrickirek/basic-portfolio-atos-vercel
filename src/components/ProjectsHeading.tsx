"use client";

import { motion } from "motion/react";

/**
 * Receiving end of the CTA morph. Renders correctly on a direct URL load —
 * the shared layout animation only fires when arriving from the landing page.
 */
export function ProjectsHeading() {
  return (
    <h1 className="text-center">
      <motion.span
        layoutId="projects-title"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="block text-[clamp(2rem,5vw,5rem)] font-extrabold tracking-tight"
      >
        My Projects
      </motion.span>
    </h1>
  );
}
