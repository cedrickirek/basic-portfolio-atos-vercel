import Link from "next/link";

/**
 * Primary CTA. The label used to carry a shared layoutId into the /projects
 * heading, but that morph could not fire across an App Router navigation --
 * see ProjectsHeading. Plain markup now; the heading animates on arrival.
 */
export function ProjectsCta() {
  return (
    <Link
      href="/projects"
      className="group inline-flex items-stretch border border-white/25 transition-colors duration-200 hover:border-accent"
    >
      <span className="block px-7 py-4 font-mono text-xs font-medium tracking-[0.18em] text-white uppercase sm:text-sm">
        See my Projects here
      </span>
      <span
        aria-hidden="true"
        className="flex items-center bg-accent px-5 font-mono text-night transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
