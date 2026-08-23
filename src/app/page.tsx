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
      <section className="mx-auto flex w-full max-w-[110rem] items-center justify-center px-5 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:px-16">
        <Triptych />
      </section>

      {/* Everything below carries the gradient, which spans the full viewport. */}
      <div className="page-wash">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:max-w-[78rem] lg:px-16">
        <section className="pt-4 pb-16 sm:pt-8 sm:pb-24">
          <h2 className="mb-12 text-center text-2xl font-bold sm:text-4xl lg:text-5xl">
            Hey, I&apos;m Cedric Emmanuel!
          </h2>

          <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,320px)_1fr] sm:gap-14 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
            <Carousel />

            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl lg:text-[1.7rem] lg:leading-snug">
                I aspire to be extremely good at being technical, and also
                extremely good on the business aspect.
              </p>
              <div className="mt-9">
                <ProjectsCta />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-12 py-16 sm:grid-cols-2 sm:gap-16 sm:py-24 lg:gap-20">
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
