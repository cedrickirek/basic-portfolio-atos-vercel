import Link from "next/link";
import { contact, site } from "@/data/site";

/**
 * Fixed blurred header after the template: boxed initials for the logo, and
 * numbered mono links on the right. The template's menu/cart panels are
 * omitted -- two destinations do not need a drawer.
 */
export function KanvasHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-night/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-5 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-rule font-mono text-xs font-medium text-chalk">
            CE
          </span>
          <span className="hidden font-mono text-[0.6875rem] tracking-[0.18em] text-fog uppercase sm:block">
            {site.shortName}
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-mono text-[0.6875rem] tracking-[0.18em] uppercase sm:gap-8">
          <Link href="/projects" className="text-fog transition-colors hover:text-accent">
            <span className="text-accent">01</span> Work
          </Link>
          <a href={contact.cv} className="text-fog transition-colors hover:text-accent">
            <span className="text-accent">02</span> CV
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hidden text-fog transition-colors hover:text-accent sm:block"
          >
            <span className="text-accent">03</span> Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
