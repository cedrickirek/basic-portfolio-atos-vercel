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
  onClose,
}: {
  project: Project;
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

  if (!project.reel) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — video walkthrough`}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        // The backdrop closes on click; the panel must not pass its own
        // clicks up to it.
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-[26rem] flex-col outline-none"
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <p className="font-mono text-[0.6875rem] leading-relaxed tracking-[0.14em] text-fog uppercase">
            {project.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="shrink-0 border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-fog uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Esc &times;
          </button>
        </div>

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
      </div>
    </div>
  );
}
