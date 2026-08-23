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
      className="group inline-block border border-ink px-7 py-4 transition-all duration-[250ms] ease-out hover:scale-[1.04] hover:border-orange hover:shadow-[0_0_24px_rgba(255,107,53,0.45)]"
    >
      <motion.span
        layoutId="projects-title"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="block text-base font-semibold sm:text-lg"
      >
        See my Projects here
      </motion.span>
    </Link>
  );
}
