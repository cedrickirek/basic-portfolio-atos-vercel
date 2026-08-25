"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

/**
 * Card with a preview of the project.
 *
 * On fine pointers the preview opens on hover. On coarse pointers hover does
 * not exist, so the same content opens on tap — detected by pointer capability
 * rather than viewport width.
 */
export function ProjectCard({
  project,
  priority = false,
  index = 0,
}: {
  project: Project;
  /** Set on the first card of the first row so the LCP image loads eagerly. */
  priority?: boolean;
  /** Position across all categories, for the template's CASE numbering. */
  index?: number;
}) {
  const [canHover, setCanHover] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const expanded = canHover ? undefined : open;

  return (
    <article
      onMouseEnter={() => canHover && setOpen(true)}
      onMouseLeave={() => canHover && setOpen(false)}
      className="group relative flex flex-col self-start overflow-hidden border border-rule bg-panel/60 transition-colors duration-200 hover:border-accent/60"
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => !canHover && setOpen((v) => !v)}
        className="flex flex-1 flex-col text-left"
      >
        {/* No placeholder block when there is no image — an empty grey box
            reads as a broken thumbnail rather than a deliberate choice. */}
        {project.thumbnail && (
          <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-night">
            {/* The template's journal treatment: grayscale at rest, colour
                and a slight zoom on hover. */}
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              priority={priority}
              className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        )}

        <div className="flex flex-col p-5">
          <p className="mb-3 font-mono text-[0.625rem] tracking-[0.18em] text-fog uppercase">
            Case {String(index + 1).padStart(3, "0")}
          </p>
          <h3 className="text-sm font-bold tracking-tight text-white uppercase text-balance sm:text-base">
            {project.title}
          </h3>

          <p
            className={`mt-3 text-sm leading-relaxed text-fog transition-all ${
              open ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          {/* Touch has no hover to reveal the rest, so say the card opens. */}
          {!canHover && (
            <span
              aria-hidden="true"
              className="mt-2 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase"
            >
              {open ? "Tap to close" : "Tap to read more"}
            </span>
          )}

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-rule px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-fog uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </button>

      {project.links && (
        <div className="flex gap-5 px-5 pb-5">
          {project.links.demo && (
            <a href={project.links.demo} className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase hover:underline">
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase hover:underline">
              Repo
            </a>
          )}
          {project.links.pdf && (
            <a href={project.links.pdf} className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase hover:underline">
              PDF
            </a>
          )}
        </div>
      )}
    </article>
  );
}
