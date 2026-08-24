"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Primary CTA. The text carries a shared layoutId into the /projects heading,
 * so the label morphs across the navigation while the box fades out.
 */
export function ProjectsCta() {
  return (
    <Link
      href="/projects"
      className="group inline-flex items-stretch border border-white/25 transition-colors duration-200 hover:border-accent"
    >
      <motion.span
        layoutId="projects-title"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="block px-7 py-4 font-mono text-xs font-medium tracking-[0.18em] text-white uppercase sm:text-sm"
      >
        See my Projects here
      </motion.span>
      <span
        aria-hidden="true"
        className="flex items-center bg-accent px-5 font-mono text-night transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
