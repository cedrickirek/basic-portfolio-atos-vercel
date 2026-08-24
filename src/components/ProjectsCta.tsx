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
      className="group inline-flex items-stretch border border-rule transition-colors duration-200 hover:border-amber"
    >
      <motion.span
        layoutId="projects-title"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="block px-7 py-4 text-sm font-medium sm:text-base"
      >
        See my Projects here
      </motion.span>
      {/* Amber only fills this arrow block, not the whole button -- the
          accent stays small on purpose. */}
      <span
        aria-hidden="true"
        className="flex items-center bg-amber px-5 text-ink transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
