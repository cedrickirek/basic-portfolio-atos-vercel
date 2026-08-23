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
        className="block text-3xl font-extrabold tracking-tight sm:text-5xl"
      >
        My Projects
      </motion.span>
    </h1>
  );
}
