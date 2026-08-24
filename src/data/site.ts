/** Site-wide constants and contact details. */

export const site = {
  name: "Cédric Emmanuel Kiré",
  shortName: "Cedric Emmanuel",
  role: "Aspiring ML/AI engineer",
  location: "Paris, France",
  url: "https://basic-portfolio-atos-vercel.vercel.app",
  description:
    "Personal site of Cédric Emmanuel Kiré — aspiring ML/AI engineer and co-founder based in Paris, France.",
} as const;

export const contact = {
  email: "cedric.kire@hec.edu",
  github: "https://github.com/cedrickirek",
  linkedin: "https://www.linkedin.com/in/cedric-emmanuel-kire-b528111b8/",
  cv: "/docs/cedric-kire-cv.pdf",
} as const;

/**
 * The hero headline, split for the typewriter: `triptychStem` never changes,
 * while `triptychWords` are typed and erased one after another beneath the
 * caret. Keep the stem free of trailing space -- the component owns the gap.
 */
export const triptychStem = "Never stop";

export const triptychWords = [
  "improving",
  "exploring",
  "building",
] as const;

export const interests = [
  "YouTube",
  "Podcasting",
  "East Asia",
  "Basketball",
  "Productivity",
  "Religion",
] as const;
