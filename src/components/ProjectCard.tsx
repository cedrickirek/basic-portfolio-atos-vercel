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
      className={`group relative flex h-fit flex-col overflow-hidden rounded-lg border border-grey/20 bg-white transition-all duration-200 hover:border-orange/60 hover:shadow-lg ${
        project.featured ? "sm:col-span-2" : ""
      }`}
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => !canHover && setOpen((v) => !v)}
        className="flex flex-1 flex-col text-left"
      >
        <div className="relative aspect-video w-full shrink-0 bg-cloud">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              priority={priority}
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-semibold text-balance sm:text-base">
            {project.title}
          </h3>

          <p
            className={`mt-2 text-sm text-grey transition-all ${
              open ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded bg-cloud px-2 py-0.5 text-xs font-medium tracking-wide text-grey"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </button>

      {project.links && (
        <div className="flex gap-4 px-4 pb-4 text-sm font-medium">
          {project.links.demo && (
            <a href={project.links.demo} className="text-orange hover:underline">
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} className="text-orange hover:underline">
              Repo
            </a>
          )}
          {project.links.pdf && (
            <a href={project.links.pdf} className="text-orange hover:underline">
              PDF
            </a>
          )}
        </div>
      )}
    </article>
  );
}
