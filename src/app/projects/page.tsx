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
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-[88rem] lg:px-16">
      <ProjectsHeading />

      <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-24">
        {categories
          .filter((category) => byCategory(category).length > 0)
          .map((category) => (
            <section key={category}>
              {/* Label sits left of the row on desktop, above it on mobile. */}
              <div className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
                <h2 className="text-lg font-bold tracking-wide sm:pt-1 sm:text-right">
                  {category}
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                  {byCategory(category).map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      priority={prioritySlugs.has(project.slug)}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
      </div>

      <div className="mt-20 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-grey hover:text-orange"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
