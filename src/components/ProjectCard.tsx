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
  const [open, setOpen] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);

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
      // The floated description escapes the card box, so a hovered card has
      // to paint above its neighbours rather than under the next one.
      style={open ? { zIndex: 20 } : undefined}
      className="group relative flex h-full flex-col border border-rule bg-panel/60 transition-colors duration-200 hover:border-accent/60"
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
            The description reserves three lines in the layout and never
            changes the card's height. Opening it floats the full text over
            the card on its own layer: every card in a grid row is stretched
            to a common height, so one card growing re-flowed the whole row,
            and running the pointer along a row read as a jump at each
            crossing. The longest description here is six lines, so the
            floated copy is left to size itself rather than scroll.
          */}
          <div className="relative mt-3">
            <p className="line-clamp-3 text-sm leading-relaxed text-fog">
              {project.description}
            </p>

            <p
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 z-10 -m-2 rounded-xs bg-panel p-2 text-sm leading-relaxed text-chalk ring-1 ring-accent/30 transition-opacity duration-200 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Touch has no hover to reveal the rest, so say the card opens. */}
          {!canHover && (
            <span
              aria-hidden="true"
              className="mt-2 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase"
            >
              {open ? "Tap to close" : "Tap to read more"}
            </span>
          )}

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

      {/* One row for everything actionable: watch, slides, demo, repo, pdf.
          Empty until a project actually has any, so cards stay clean. */}
      {(project.reel || project.slides || project.links) && (
        <div className="flex flex-wrap gap-2 px-5 pb-5">
          {project.reel && (
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              className="group/link inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase transition-colors hover:border-accent hover:bg-accent hover:text-night"
            >
              <span aria-hidden="true" className="text-[0.5rem]">
                &#9654;
              </span>
              Watch
            </button>
          )}
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

      {reelOpen && project.reel && (
        <ReelModal project={project} onClose={() => setReelOpen(false)} />
      )}
    </article>
  );
}
