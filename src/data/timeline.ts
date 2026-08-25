export type TimelineEntry = {
  year: string;
  title: string;
  /** Optional second line — used for roles in the work column. */
  detail?: string;
  /** Optional country, shown beside the year. The journey entries name their
      places in the title already, so it is left unset there. */
  country?: string;
};

/** Left column. Runs on its own scale; no correspondence with the work column. */
export const journey: TimelineEntry[] = [
  { year: "2001", title: "Born and raised in Côte d'Ivoire" },
  {
    year: "2018",
    title: "Studied engineering in the UK on a fully funded scholarship",
  },
  {
    year: "2022",
    title: "Two-year research master's on a Japanese Government (MEXT) scholarship",
  },
  { year: "2024", title: "Joined X-HEC Data Science & AI" },
];

/** Right column. Runs on its own scale; no correspondence with the journey column. */
export const work: TimelineEntry[] = [
  { year: "2026", title: "EdTech startup", detail: "Co-founder & CTO", country: "France" },
  { year: "2025", title: "L'Oréal", detail: "Data Science Intern", country: "France" },
  { year: "2022–2024", title: "Tokyo Institute of Technology", detail: "Research Student in Applied Machine Learning", country: "Japan" },
  { year: "2023", title: "Kozo Keikaku Engineering", detail: "Data Scientist Consultant Intern", country: "Japan" },
];
