/**
 * The template's fixed 12-column hairline grid, sitting behind every section.
 * Pure decoration: fixed, z-0, and inert to the pointer. Content sits at z-10
 * (see the layout), the header at z-50.
 */
export function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 grid grid-cols-6 lg:grid-cols-12"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className={`border-r border-white/[0.04] ${i >= 6 ? "hidden lg:block" : ""}`}
        />
      ))}
    </div>
  );
}
