/** Site-wide constants and contact details. */

export const site = {
  name: "Cédric Emmanuel Kiré",
  shortName: "Cedric Emmanuel",
  role: "ML/AI engineer · co-founder & CTO",
  location: "Abidjan, Côte d'Ivoire",
  url: "https://example.com", // TODO(cedric): set the real domain
  description:
    "Personal site of Cédric Emmanuel Kiré — ML/AI engineer and co-founder based in Abidjan.",
} as const;

export const contact = {
  email: "cedric.kire@hec.edu",
  github: "https://github.com/cedrickirek",
  linkedin: "https://www.linkedin.com/in/cedric-emmanuel-kire-b528111b8/",
  cv: "/docs/cedric-kire-cv.pdf",
} as const;

export const triptych = [
  "Never Stop Improving",
  "Never Stop Exploring",
  "Never Stop Building",
] as const;

export const interests = [
  "YouTube",
  "Podcasting",
  "East Asia",
  "Basketball",
  "Productivity",
  "Religion",
] as const;
