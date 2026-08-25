"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ReelModal } from "@/components/ReelModal";
import type { Project } from "@/data/projects";

/**
 * Horizontal rail of reel extracts, in the 9:16 frame the format is shot for.
 *
 * The motion is the point: each tile previews itself silently on hover (and
 * on tap, where hover does not exist), and opens the full player on click.
 * Previews are muted, loop, and never autoplay unprompted -- a page that
 * starts four videos on load is a page people leave.
 */
export function ReelStrip({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const withReels = projects.filter((p) => p.reel);

  // Nothing to show until reels exist; the section header would otherwise
  // announce an empty rail.
  if (withReels.length === 0) return null;

  return (
    <>
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {withReels.map((project) => (
          <ReelTile
            key={project.slug}
            project={project}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      {active && (
        <ReelModal project={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}

function ReelTile({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const preview = () => {
    const el = videoRef.current;
    if (!el) return;
    // play() rejects if the element is torn down mid-gesture; nothing to
    // recover from, the poster simply stays put.
    void el.play().then(() => setPlaying(true)).catch(() => {});
  };

  const stop = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={preview}
      onMouseLeave={stop}
      onFocus={preview}
      onBlur={stop}
      aria-label={`Play walkthrough of ${project.title}`}
      className="group relative aspect-9/16 w-[62vw] shrink-0 snap-start overflow-hidden border border-rule bg-panel text-left transition-colors hover:border-accent/60 min-[420px]:w-[52vw] sm:w-[15rem] lg:w-[16rem]"
    >
      {/* The poster carries the tile until a preview starts; without one the
          frame sits black until the first video frame decodes. */}
      {project.reel?.poster && (
        <Image
          src={project.reel.poster}
          alt=""
          fill
          sizes="(max-width: 640px) 62vw, 16rem"
          className={`object-cover transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      <video
        ref={videoRef}
        src={project.reel?.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrim, so the title holds over whatever frame is underneath. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-accent uppercase">
          <span
            aria-hidden="true"
            className="text-[0.5rem] transition-transform duration-200 group-hover:scale-125"
          >
            &#9654;
          </span>
          Watch
        </span>
        <span className="mt-2 block text-sm leading-snug font-bold text-white uppercase">
          {project.title}
        </span>
      </div>
    </button>
  );
}
