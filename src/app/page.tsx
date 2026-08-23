import { Triptych } from "@/components/Triptych";
import { Carousel } from "@/components/Carousel";
import { ProjectsCta } from "@/components/ProjectsCta";
import { Timeline } from "@/components/Timeline";
import { Interests } from "@/components/Interests";
import { contact } from "@/data/site";
import { journey, work } from "@/data/timeline";

export default function Home() {
  return (
    <main>
      {/* Hero — the triptych, above where the page wash begins. */}
      <section className="mx-auto flex min-h-[70svh] w-full max-w-6xl items-center justify-center px-5 py-20 sm:px-8">
        <Triptych />
      </section>

      {/* Everything below carries the gradient, which spans the full viewport. */}
      <div className="page-wash">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="py-16 sm:py-24">
          <h2 className="mb-12 text-center text-2xl font-bold sm:text-4xl">
            Hey, I&apos;m Cedric Emmanuel!
          </h2>

          <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,340px)_1fr] sm:gap-14">
            <Carousel />

            <div>
              <p className="text-lg leading-relaxed text-balance sm:text-xl">
                I aspire to be extremely good at being technical, and also
                extremely good on the business aspect.
              </p>
              <div className="mt-9">
                <ProjectsCta />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-12 py-16 sm:grid-cols-2 sm:gap-16 sm:py-24">
          <Timeline heading="My Journey so far" entries={journey} />
          <Timeline heading="Work Experiences" entries={work} />
        </section>

        <section className="py-14">
          <h2 className="mb-6 text-center text-sm font-semibold tracking-wide text-grey">
            My interests
          </h2>
          <Interests />
        </section>

        <footer className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-16 text-sm font-medium">
          <a href={`mailto:${contact.email}`} className="hover:text-orange">
            Email
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-orange"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-orange"
          >
            LinkedIn
          </a>
          <a href={contact.cv} className="hover:text-orange">
            Download CV
          </a>
        </footer>
        </div>
      </div>
    </main>
  );
}
