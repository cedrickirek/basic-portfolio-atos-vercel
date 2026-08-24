import Image from "next/image";
import { Triptych } from "@/components/Triptych";
import { Carousel } from "@/components/Carousel";
import { ProjectsCta } from "@/components/ProjectsCta";
import { Timeline } from "@/components/Timeline";
import { Interests } from "@/components/Interests";
import { contact, site } from "@/data/site";
import { journey, work } from "@/data/timeline";

export default function Home() {
  return (
    <main className="bg-grid">
      {/*
        Hero. The reference insets its photograph inside the dark ground with
        margin all around rather than running it full-bleed -- the surrounding
        dark is what makes the image read as expensive. The portrait sits right
        on desktop and above the headline on phones.
      */}
      <section className="mx-auto w-full max-w-[110rem] px-5 pt-16 pb-14 sm:px-10 sm:pt-24 sm:pb-20 lg:px-16">
        <p className="eyebrow mb-8 flex items-center gap-3">
          <span aria-hidden="true" className="inline-block h-1 w-1 bg-amber" />
          {site.role}
        </p>

        <div className="grid items-end gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
          <Triptych />

          {/* Portrait, framed by a hairline. Ordered first on phones so the
              page opens on a face rather than on three lines of type. */}
          <div className="order-first lg:order-none">
            <div className="relative aspect-4/5 w-full max-w-[22rem] overflow-hidden border border-rule lg:max-w-none">
              <Image
                src="/carousel/selfie.webp"
                alt="Cedric Emmanuel Kiré"
                fill
                sizes="(max-width: 1024px) 88vw, 26rem"
                priority
                className="object-cover"
              />
              {/* These are studio portraits on a near-white backdrop, which
                  reads as a lit rectangle against the near-black page. A
                  bottom-up scrim ties the frame into the ground instead of
                  letting it float. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
              />
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
          {site.location}. I aspire to be extremely good at being technical, and
          also extremely good on the business aspect.
        </p>

        <div className="mt-9">
          <ProjectsCta />
        </div>
      </section>

      {/* ---- Intro + carousel ---- */}
      <section className="border-t border-rule">
        <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-24">
            <Carousel />

            <div>
              <p className="eyebrow mb-6">About</p>
              <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.08] font-normal tracking-[-0.02em] text-balance">
                Hey, I&apos;m Cedric Emmanuel.
              </h2>
              <p className="mt-8 max-w-4xl text-lg leading-relaxed text-ash sm:text-xl lg:text-2xl lg:leading-relaxed">
                An ML/AI engineer and co-founder based in Abidjan, working
                across research, applied machine learning, and the products
                built on top of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Two timelines ---- */}
      <section className="border-t border-rule bg-slate">
        <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
            <p className="eyebrow lg:pt-3">Path</p>
            <div className="grid gap-14 sm:grid-cols-2 sm:gap-16 lg:gap-24">
              <Timeline heading="My Journey so far" entries={journey} />
              <Timeline heading="Work Experiences" entries={work} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Interests marquee ---- */}
      <section className="border-t border-rule py-14">
        <p className="eyebrow mb-8 px-5 sm:px-10 lg:px-16">My interests</p>
        <Interests />
      </section>

      {/* ---- Contact ---- */}
      <footer className="border-t border-rule">
        <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
          <p className="eyebrow mb-6">Reach out</p>
          <a
            href={`mailto:${contact.email}`}
            className="font-serif text-[clamp(1.6rem,4vw,3.2rem)] leading-tight font-normal tracking-[-0.02em] break-all transition-colors hover:text-amber"
          >
            {contact.email}
          </a>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-8 font-mono text-xs tracking-[0.12em] uppercase">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-ash transition-colors hover:text-amber"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-ash transition-colors hover:text-amber"
            >
              LinkedIn
            </a>
            <a
              href={contact.cv}
              className="text-ash transition-colors hover:text-amber"
            >
              Download CV
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
