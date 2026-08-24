import Image from "next/image";
import Link from "next/link";
import { Triptych } from "@/components/Triptych";
import { Carousel } from "@/components/Carousel";
import { ProjectsCta } from "@/components/ProjectsCta";
import { Timeline } from "@/components/Timeline";
import { Interests } from "@/components/Interests";
import { contact, site } from "@/data/site";
import { journey, work } from "@/data/timeline";
import { categories, byCategory } from "@/data/projects";
import { imageSlots } from "@/data/kanvas";

export default function Home() {
  const projectCount = categories.reduce(
    (n, c) => n + byCategory(c).length,
    0,
  );
  const thesisCount = byCategory("Research").length;

  return (
    <main>
      {/*
        Hero. The template's one warm moment: a red-orange gradient behind the
        headline, fading into the night ground before the section ends. The
        portrait panel sits right with the status box overlaid.
      */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, #b91c1c 0%, #ea580c 30%, #f59e0b 48%, transparent 72%)",
          }}
        />
        {/* Fade the gradient down into the ground so the next section starts
            on clean night, not on a hard colour edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night"
        />

        <div className="relative grid min-h-[calc(100svh-4rem)] gap-10 px-5 py-14 sm:px-10 lg:grid-cols-12 lg:items-center lg:gap-0 lg:px-16">
          <div className="lg:col-span-7 lg:pr-16">
            <p className="eyebrow mb-8 inline-block border border-white/25 px-3 py-2 text-white/90">
              {site.role}
            </p>
            <Triptych />
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-200/90 sm:text-lg">
              {site.location}. I aspire to be extremely good at being
              technical, and also extremely good on the business aspect.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-white px-8 py-4 font-mono text-xs font-medium tracking-[0.18em] text-night uppercase transition-colors hover:bg-accent"
              >
                View projects
              </Link>
              <a
                href={contact.cv}
                className="border border-white/30 px-8 py-4 font-mono text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Portrait panel. First on phones so the page opens on a face. */}
          <div className="order-first lg:order-none lg:col-span-5">
            <div className="relative aspect-4/5 w-full max-w-[24rem] overflow-hidden border border-white/15 lg:max-w-none">
              {imageSlots.heroPortrait ? (
                <Image
                  src={imageSlots.heroPortrait}
                  alt="Cedric Emmanuel Kiré"
                  fill
                  sizes="(max-width: 1024px) 88vw, 40vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-panel via-night to-panel" />
              )}
              {/* The studio portraits are shot on near-white; a bottom-up
                  scrim ties the frame into the dark ground. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent"
              />

              {/* Status box, after the template -- content is real: current
                  role from the timeline, location from site data. */}
              <div className="absolute right-0 bottom-6 border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-white/70 uppercase">
                  Status
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                </p>
                <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed tracking-[0.14em] text-white uppercase">
                  Co-founder &amp; CTO — EdTech
                  <br />
                  Abidjan, Côte d&apos;Ivoire
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Fact triplet, divided by hairlines like the template's rows.
              Every figure is derived from real site data. ---- */}
      <section className="border-y border-rule">
        <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-rule">
          {[
            { n: String(projectCount).padStart(2, "0"), label: "Projects" },
            { n: String(thesisCount).padStart(2, "0"), label: "Research theses" },
            // CI, UK, Japan, France -- from the journey timeline.
            { n: "04", label: "Countries lived in" },
          ].map((f) => (
            <div key={f.label} className="px-5 py-10 sm:px-10 lg:px-16">
              <p className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                {f.n}
              </p>
              <p className="eyebrow mt-3">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- About + carousel ---- */}
      <section className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-4">
            <Carousel />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="eyebrow mb-6">About</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl">
              Hey, I&apos;m Cedric Emmanuel.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl">
              An ML/AI engineer and co-founder based in Abidjan, working across
              research, applied machine learning, and the products built on
              top of them.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Work banner (the template's reel section, made honest: same
              full-bleed backdrop and big stroked type, but the action is a
              real link rather than a play button with no video). ---- */}
      <section className="relative overflow-hidden border-y border-rule">
        {imageSlots.workBanner ? (
          <Image
            src={imageSlots.workBanner}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-luminosity"
          />
        ) : (
          /* Placeholder until an image lands in the slot -- see
             src/data/kanvas.ts for the drop instructions. */
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.08),transparent_65%)]"
          />
        )}
        <div className="relative flex min-h-[50vh] flex-col items-start justify-center px-5 py-20 sm:px-10 lg:px-16">
          <p className="eyebrow mb-6">Selected work</p>
          <p
            aria-hidden="true"
            className="text-stroke text-[clamp(2.2rem,6vw,6rem)] leading-[1] font-extrabold tracking-tight uppercase"
          >
            Research · Apps
            <br />
            Humanitarian
          </p>
          <div className="mt-10">
            <ProjectsCta />
          </div>
        </div>
      </section>

      {/* ---- Two timelines ---- */}
      <section className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
        <p className="eyebrow mb-10">Path</p>
        <div className="grid gap-14 sm:grid-cols-2 sm:gap-16 lg:gap-24">
          <Timeline heading="My Journey so far" entries={journey} />
          <Timeline heading="Work Experiences" entries={work} />
        </div>
      </section>

      {/* ---- Interests marquee ---- */}
      <section className="border-t border-rule py-14">
        <p className="eyebrow mb-8 px-5 sm:px-10 lg:px-16">My interests</p>
        <Interests />
      </section>

      {/* ---- Contact ---- */}
      <footer className="border-t border-rule px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
        <p className="eyebrow mb-6">Reach out</p>
        <a
          href={`mailto:${contact.email}`}
          className="text-2xl font-extrabold tracking-tight break-all text-white uppercase transition-colors hover:text-accent sm:text-4xl lg:text-5xl"
        >
          {contact.email}
        </a>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-rule pt-8 font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
          {[
            { n: "01", label: "GitHub", href: contact.github, ext: true },
            { n: "02", label: "LinkedIn", href: contact.linkedin, ext: true },
            { n: "03", label: "Download CV", href: contact.cv, ext: false },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-fog transition-colors hover:text-accent"
            >
              <span className="text-accent">{l.n}</span> {l.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
