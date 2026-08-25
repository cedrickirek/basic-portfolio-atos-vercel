/**
 * Image slots for the Kanvas skin.
 *
 * Each slot is either a path under public/ or null. A null slot renders a
 * styled gradient placeholder, so the page works before any file exists --
 * download an image, drop it into public/images/, set the path here.
 * Suggested sizes: workBanner ~2400px wide (it runs full-bleed and sits at
 * 40% opacity under text), heroPortrait portrait-ratio ~1200x1500.
 */
export const imageSlots = {
  /** Full-bleed backdrop of the "Selected work" banner on the landing page. */
  workBanner: "/images/selected-work.jpg" as string | null,
  /** The hero panel photograph. */
  heroPortrait: "/carousel/selfie.webp" as string | null,
};
