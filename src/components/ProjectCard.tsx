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
}: {
  project: Project;
  /** Set on the first card of the first row so the LCP image loads eagerly. */
  priority?: boolean;
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
      className="group relative flex flex-col self-start overflow-hidden border border-rule bg-slate transition-colors duration-200 hover:border-amber/50"
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => !canHover && setOpen((v) => !v)}
        className="flex flex-col text-left"
      >
        {/* No placeholder block when there is no image — an empty grey box
            reads as a broken thumbnail rather than a deliberate choice. */}
        {project.thumbnail && (
          <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-ink">
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Scrim so the card body reads as continuous with the photo
                rather than butting against it on a hard edge. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-slate via-slate/20 to-transparent"
            />
          </div>
        )}

        <div className="flex flex-col p-5">
          <h3 className="font-serif text-lg leading-snug font-normal text-balance sm:text-xl">
            {project.title}
          </h3>

          <p
            className={`mt-3 text-sm leading-relaxed text-ash transition-all ${
              open ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-rule px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-ash uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </button>

      {project.links && (
        <div className="flex gap-5 px-4 pb-4">
          {project.links.demo && (
            <a href={project.links.demo} className="font-mono text-[0.6875rem] tracking-[0.14em] text-amber uppercase hover:underline">
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} className="font-mono text-[0.6875rem] tracking-[0.14em] text-amber uppercase hover:underline">
              Repo
            </a>
          )}
          {project.links.pdf && (
            <a href={project.links.pdf} className="font-mono text-[0.6875rem] tracking-[0.14em] text-amber uppercase hover:underline">
              PDF
            </a>
          )}
        </div>
      )}
    </article>
  );
}
