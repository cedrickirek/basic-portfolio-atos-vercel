"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { ReelModal } from "@/components/ReelModal";

/**
 * A card's outbound link, styled as a button rather than as text. The border
 * and arrow carry the affordance at rest -- on touch there is no hover state
 * to discover, so a bare text link reads as ordinary copy.
 */
function CardLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group/link inline-flex items-center gap-1.5 border border-accent/40 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase transition-colors hover:border-accent hover:bg-accent hover:text-night"
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  );
}

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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-rule bg-panel/60 transition-colors duration-200 hover:border-accent/60">
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-haspopup="dialog"
        className="flex flex-1 cursor-pointer flex-col text-left"
      >
        {/* No placeholder block when there is no image — an empty grey box
            reads as a broken thumbnail rather than a deliberate choice. */}
        {project.thumbnail && (
          <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-night">
            {/* Full colour at rest -- grayscale-until-hover hid the colour
                entirely on touch, where there is no hover to reveal it. */}
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-5">
          <p className="mb-3 font-mono text-[0.625rem] tracking-[0.18em] text-fog uppercase">
            Case {String(index + 1).padStart(3, "0")}
          </p>
          <h3 className="text-sm font-bold tracking-tight text-white uppercase text-balance sm:text-base">
            {project.title}
          </h3>

          {/*
            Fixed at three lines, always. The full text needs ~266px and no
            region of the card has that, so every hover panel covered either
            the tags or the action buttons. Reading it in full is a click,
            which is also the behaviour touch already had.
          */}
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fog">
            {project.description}
          </p>

          {/* Say the card opens. Hover reveals nothing now, so the hint is
              the only affordance on any pointer type. */}
          <span
            aria-hidden="true"
            className="mt-2 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase"
          >
            {project.reel
              ? canHover
                ? "Click to watch"
                : "Tap to watch"
              : canHover
                ? "Click to read more"
                : "Tap to read more"}
          </span>

          {/* mt-auto pins the tags to the floor of a stretched card. */}
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
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

      {/* Outbound links only. Watching the reel is the card's own click, so
          a Watch button here would be a second control for the same thing. */}
      {(project.slides || project.links) && (
        <div className="flex flex-wrap gap-2 px-5 pb-5">
          {project.slides && <CardLink href={project.slides}>Slides</CardLink>}
          {project.links?.demo && (
            <CardLink href={project.links.demo} external>
              Live demo
            </CardLink>
          )}
          {project.links?.repo && (
            <CardLink href={project.links.repo} external>
              Repo
            </CardLink>
          )}
          {project.links?.pdf && <CardLink href={project.links.pdf}>PDF</CardLink>}
        </div>
      )}

      {modalOpen && (
        <ReelModal project={project} onClose={() => setModalOpen(false)} />
      )}
    </article>
  );
}
