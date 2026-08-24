import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display serif, for headings and figures only. `opsz` is what keeps Fraunces
// from looking spindly at large sizes -- the variable optical-size axis is the
// reason this face was picked over a static Bodoni.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

// Eyebrow labels and figures. Wide-tracked uppercase at ~11px.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
