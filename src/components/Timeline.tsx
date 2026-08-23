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
      <h3 className="mb-6 text-lg font-bold sm:text-xl">{heading}</h3>
      <ol className="relative border-l border-grey/25 pl-6">
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
              className="absolute top-1.5 -left-[1.8rem] h-2.5 w-2.5 rounded-full bg-orange"
            />
            <span className="block text-xs font-medium tracking-wide text-grey">
              {entry.year}
            </span>
            <span className="mt-1 block text-sm leading-relaxed sm:text-base">
              {entry.title}
            </span>
            {entry.detail && (
              <span className="mt-0.5 block text-sm text-grey">
                {entry.detail}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
