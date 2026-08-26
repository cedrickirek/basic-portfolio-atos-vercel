"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import type { Project } from "@/data/projects";

/**
 * Full-screen player for a project's reel, in the 9:16 frame the format is
 * shot for.
 *
 * A dialog that traps nothing is a trap of its own: this one closes on
 * Escape and on a backdrop click, moves focus to the panel on open, returns
 * it to the trigger on close, and holds Tab inside while it is up. Body
 * scroll is frozen so the page behind does not slide under the overlay.
 */
export function ReelModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Whatever had focus when the modal opened, to hand it back on close.
  const restoreRef = useRef<HTMLElement | null>(null);

  const hasCaseStudy = Boolean(project.caseStudy);

  const focusables = useCallback(
    () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ),
    [],
  );

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Keep Tab inside the dialog: wrap at both ends.
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus();
    };
  }, [onClose, focusables]);


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        // The backdrop closes on click; the panel must not pass its own
        // clicks up to it.
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-[30rem] flex-col overflow-y-auto outline-none"
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          {/* The panel below carries the title, so the header shows the
              category instead of printing it twice. */}
          <p className="font-mono text-[0.6875rem] leading-relaxed tracking-[0.14em] text-fog uppercase">
            {project.category}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-fog uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Esc &times;
          </button>
        </div>

        {/*
          One layout, three stacked blocks, in the order Cedric set:
          context first, then the video, then the way out. The description
          sits ABOVE the reel deliberately -- you should know what you are
          about to watch before it starts playing.
        */}
        <div className="flex flex-col gap-4">
          <div className="border border-rule bg-panel p-5 sm:p-6">
            <h2 className="text-base font-bold tracking-tight text-white uppercase text-balance sm:text-lg">
              {project.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-chalk sm:text-base">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
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

          {/* The reel, when there is one. Cards without one still open --
              the modal is the project's front door either way. */}
          {project.reel && (
            <div>
              <video
                src={project.reel.src}
                poster={project.reel.poster}
                controls
                autoPlay
                playsInline
                className="max-h-[62svh] w-full bg-black object-contain"
              />
              {project.reel.caption && (
                <p className="mt-2 text-sm leading-relaxed text-fog">
                  {project.reel.caption}
                </p>
              )}
            </div>
          )}

          {/* The way out, at the bottom. Rendered only once a project page
              exists -- a link to a route that was never generated is a 404,
              and tsc cannot see that. */}
          {hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              onClick={onClose}
              className="group/cta flex items-center justify-between gap-3 border border-accent/40 bg-accent/5 px-5 py-4 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase transition-colors hover:border-accent hover:bg-accent hover:text-night"
            >
              Lire l&apos;étude de cas
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
