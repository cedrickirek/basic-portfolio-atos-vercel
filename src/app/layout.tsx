import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { GridLines } from "@/components/GridLines";
import { KanvasHeader } from "@/components/KanvasHeader";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Labels, nav, years, tags. The template leans on a mono for everything
// small; two families total, not its nineteen.
const geistMono = Geist_Mono({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Personal site`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.shortName} — Personal site`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — Personal site`,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-sans">
        <GridLines />
        <KanvasHeader />
        {/* z-10 keeps every section above the grid overlay, below the header. */}
        <div className="relative z-10 pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
