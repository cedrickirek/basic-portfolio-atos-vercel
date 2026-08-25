"use client";

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
  mode = "reel",
  onClose,
}: {
  project: Project;
  /** "reel" plays the walkthrough; "details" shows the full write-up. */
  mode?: "reel" | "details";
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Whatever had focus when the modal opened, to hand it back on close.
  const restoreRef = useRef<HTMLElement | null>(null);

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

  if (mode === "reel" && !project.reel) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        mode === "reel"
          ? `${project.title} — video walkthrough`
          : project.title
      }
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        // The backdrop closes on click; the panel must not pass its own
        // clicks up to it.
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-full w-full flex-col overflow-y-auto outline-none ${
          mode === "reel" ? "max-w-[26rem]" : "max-w-[34rem]"
        }`}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          {/* In details mode the panel carries its own heading, so the
              header would print the title twice. */}
          <p className="font-mono text-[0.6875rem] leading-relaxed tracking-[0.14em] text-fog uppercase">
            {mode === "reel" ? project.title : project.category}
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

        {mode === "reel" && project.reel ? (
          <>
            <video
              src={project.reel.src}
              poster={project.reel.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[78svh] w-full bg-black object-contain"
            />

            {project.reel.caption && (
              <p className="mt-3 text-sm leading-relaxed text-fog">
                {project.reel.caption}
              </p>
            )}
          </>
        ) : (
          <div className="border border-rule bg-panel p-6">
            <h2 className="text-base font-bold tracking-tight text-white uppercase text-balance sm:text-lg">
              {project.title}
            </h2>
            <p className="mt-4 leading-relaxed text-chalk">
              {project.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
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
        )}
      </div>
    </div>
  );
}
