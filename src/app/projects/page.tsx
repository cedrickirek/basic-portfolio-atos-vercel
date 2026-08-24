import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsHeading } from "@/components/ProjectsHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { byCategory, categories, prioritySlugs } from "@/data/projects";

export const metadata: Metadata = {
  title: "My Projects",
  description: "Research, apps and humanitarian work by Cédric Emmanuel Kiré.",
};

export default function ProjectsPage() {
  // Stable CASE numbering across every category, in display order.
  const caseIndex = new Map(
    categories
      .flatMap((category) => byCategory(category))
      .map((project, i) => [project.slug, i] as const),
  );

  return (
    <main className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
      <p className="eyebrow mb-6">Selected work</p>
      <ProjectsHeading />

      <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-24">
        {categories
          .filter((category) => byCategory(category).length > 0)
          .map((category) => (
            <section key={category}>
              {/* Label sits left of the row on desktop, above it on mobile. */}
              <div className="grid gap-6 border-t border-rule pt-10 sm:grid-cols-[10rem_1fr] sm:gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
                <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase sm:pt-2">
                  {category}
                </h2>

                <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:grid-cols-4">
                  {byCategory(category).map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      priority={prioritySlugs.has(project.slug)}
                      index={caseIndex.get(project.slug)}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
      </div>

      <div className="mt-24 border-t border-rule pt-8">
        <Link
          href="/"
          className="font-mono text-[0.6875rem] tracking-[0.18em] text-fog uppercase transition-colors hover:text-accent"
        >
          &larr; Back home
        </Link>
      </div>
    </main>
  );
}
