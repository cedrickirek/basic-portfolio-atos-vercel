"use client";

import { motion } from "motion/react";
import type { TimelineEntry } from "@/data/timeline";

/**
 * One timeline column: a vertical rule with a node per entry, revealed in
 * sequence on first scroll into view. The two columns on the page run on
 * independent scales — years do not correspond across them.
 */
export function Timeline({
  heading,
  entries,
}: {
  heading: string;
  entries: TimelineEntry[];
}) {
  return (
    <div>
      <h3 className="mb-8 text-lg font-extrabold tracking-tight text-white uppercase sm:text-xl">
        {heading}
      </h3>
      <ol className="relative border-l border-rule pl-6">
        {entries.map((entry, i) => (
          <motion.li
            key={`${entry.year}-${entry.title}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative mb-7 last:mb-0"
          >
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[1.8rem] h-1.5 w-1.5 bg-accent"
            />
            <span className="block font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
              {entry.year}
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-chalk sm:text-base">
              {entry.title}
            </span>
            {entry.detail && (
              <span className="mt-1 block text-sm text-fog">
                {entry.detail}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
