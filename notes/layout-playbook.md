# Layout playbook — porting the Kanvas layout work to `design/aura-premium`

Everything below was built and verified on `design/kanvas-grid` (now merged
to `main`, commits `07a28a6`, `d5bac41`, `6e3b0ba`). This note is the
instruction set for applying the same **layout** to the aura branch.

**The rule: structure ports, skin does not.** Every change here is about
where things sit, how big they are, and what order they come in. None of it
should change aura's colours, fonts, or spacing personality. Wherever a
Kanvas class name appears below, translate it — the token map is in §1 —
rather than pasting it.

Do not port the Kanvas *look*: not `--color-accent`, not Geist Mono, not the
12-column `GridLines` overlay, not `KanvasHeader`. Aura is a dark serif
design and stays one.

---

## 1. Token map

Kanvas and aura name the same roles differently. Translate, never copy.

| Role | Kanvas | Aura |
| --- | --- | --- |
| Page ground | `night` `#0b0d11` | `ink` `#0f0f0f` |
| Raised surface | `panel` `#11151c` | `slate` `#161616` |
| Body text | `fog` `#94a3b8` | `ash` `#8a8a85` |
| Heading text | `chalk` `#e2e8f0` | `chalk` `#ededea` |
| Accent | `accent` `#7dd3fc` (sky) | `amber` `#e8b10d` |
| Hairline | `rule` `#1e293b` | `rule` `#262626` |
| Display face | Inter extra-bold, uppercase | Fraunces serif, normal weight, **not** uppercase |
| Mono | Geist Mono | JetBrains Mono |

Two traps:

- **Aura's display type is serif and not uppercase.** Kanvas snippets below
  carry `font-extrabold ... uppercase`. On aura that becomes
  `font-serif font-normal` with no `uppercase`. Applying Kanvas's treatment
  to Fraunces will look wrong.
- `hover:border-accent/60` on Kanvas is `hover:border-amber/50` on aura —
  aura already uses a different opacity. Keep aura's.

---

## 2. What to apply, in priority order

Seven changes. Items 1–4 are real bugs and worth doing; 5–7 are
improvements. **Item 8 does not apply to aura — read it before you start.**

### 1. Cards are ragged because they are shrunk twice

The bug aura has today, identically.

`items-start` on the grid and `self-start` on the card each collapse a card
to its own content height. Together they guarantee cards in the same row end
at different heights — which is exactly the "case 001 is bigger than case
002" complaint.

**`src/app/projects/page.tsx`** — drop `items-start`:

```diff
-<div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:grid-cols-4">
+<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:grid-cols-4">
```

**`src/components/ProjectCard.tsx`** — drop `self-start`, add `h-full`:

```diff
-className="group relative flex flex-col self-start overflow-hidden border border-rule bg-slate transition-colors duration-200 hover:border-amber/50"
+className="group relative flex h-full flex-col overflow-hidden border border-rule bg-slate transition-colors duration-200 hover:border-amber/50"
```

Equal height alone is not enough — a stretched card floats its content at
the top and leaves dead space underneath. The body must grow and the tags
must sit on the floor:

```diff
-<div className="flex flex-col p-5">
+<div className="flex flex-1 flex-col p-5">
```

```diff
-<ul className="mt-3 flex flex-wrap gap-1.5">
+{/* mt-auto pins the tags to the floor of a stretched card. */}
+<ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
```

Note `mt-3` becomes `pt-3`: `mt-auto` and `mt-3` are the same property and
`mt-auto` has to win.

**Aura also needs `flex-1` added to its button**, which Kanvas already had:

```diff
-className="flex flex-col text-left"
+className="flex flex-1 flex-col text-left"
```

### 2. Link buttons — PDF / Repo / Live demo

Aura's are bare text links in amber, the same problem Kanvas had: on a
touch device there is no hover, so a text link is indistinguishable from
ordinary copy. Give the affordance to the resting state.

Add above the `ProjectCard` component:

```tsx
/**
 * A card's outbound link, styled as a button rather than as text. The border
 * and arrow carry the affordance at rest -- on touch there is no hover state
 * to discover, so a bare text link reads as ordinary copy.
 */
function CardLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group/link inline-flex items-center gap-1.5 border border-amber/40 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.14em] text-amber uppercase transition-colors hover:border-amber hover:bg-amber hover:text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  );
}
```

Then replace the three repeated anchors with `<CardLink>` calls, and change
the row from `flex gap-5 px-4 pb-4` to `flex flex-wrap gap-2 px-4 pb-4` —
buttons are wider than text and will wrap on a phone.

`hover:text-ink` is the aura translation of Kanvas's `hover:text-night`: the
fill inverts to ground-on-accent. On amber this gives dark text on gold,
which contrasts well — but **check it**, amber is much lighter than sky blue
and the inverted state is a different problem on each palette.

The links sit *outside* the card's `<button>` in the markup. Keep it that
way — moving them inside nests interactive elements, which is invalid HTML.
No `stopPropagation` is needed while they stay outside.

### 3. Hero: copy before portrait on mobile

Aura has `order-first` on the portrait, same as Kanvas did. On a phone the
portrait is ~488px tall and pushes the headline and buttons below the fold.

**`src/app/page.tsx`**:

```diff
-          {/* Portrait, framed by a hairline. Ordered first on phones so the
-              page opens on a face rather than on three lines of type. */}
-          <div className="order-first lg:order-none">
+          {/* The copy leads on phones -- the headline is the message and the
+              portrait pushed it under the fold. */}
+          <div>
```

The old comment states the opposite intent, so it has to go with the class.

Aura's hero grid is `lg:grid-cols-[1fr_minmax(0,26rem)]` with `items-end`,
not Kanvas's 12-column split — leave that alone. Removing `order-first` is
the whole change; the desktop layout is unaffected because the portrait is
already the second grid child.

### 4. Footer email breaks mid-word

Both branches had `break-all`, which snaps at an arbitrary character.

```diff
-className="font-serif text-[clamp(1.6rem,4vw,3.2rem)] leading-tight font-normal tracking-[-0.02em] break-all transition-colors hover:text-amber"
+className="font-serif text-[clamp(1.6rem,4vw,3.2rem)] leading-tight font-normal tracking-[-0.02em] break-words transition-colors hover:text-amber"
```

Aura's email is already fluid via `clamp()`, so it does not need the
responsive size steps Kanvas got. `break-all` → `break-words` is the whole fix.

### 5. Tap affordance on cards

Both branches expand the description on tap on coarse pointers, and neither
says so. Inside the card body, after the description `<p>`:

```tsx
{/* Touch has no hover to reveal the rest, so say the card opens. */}
{!canHover && (
  <span
    aria-hidden="true"
    className="mt-2 font-mono text-[0.625rem] tracking-[0.14em] text-amber uppercase"
  >
    {open ? "Tap to close" : "Tap to read more"}
  </span>
)}
```

`canHover` starts `true` and is corrected in an effect, so this is absent
from the static HTML and appears after hydration on touch. That is correct
for a static export — the build cannot know the pointer type.

### 6. Reels and slides (optional, structure only)

If aura should carry them too, the three files port with only token
translation:

- `src/data/projects.ts` — the `reel` and `slides` optional fields
- `src/components/ReelModal.tsx`
- `src/components/ReelStrip.tsx`

Both branches share `src/data/projects.ts`, so **the type fields may already
be there** depending on how the branches get reconciled — check before
adding them twice.

In both components swap `night`→`ink`, `panel`→`slate`, `fog`→`ash`,
`accent`→`amber`. In `ReelStrip` the tile title is
`text-sm font-bold uppercase` on Kanvas; on aura make it
`font-serif text-base font-normal` with no `uppercase`.

The homepage section is guarded by `projects.some((p) => p.reel)` so it
renders nothing until a reel exists. Keep that guard — without it the page
announces an empty rail.

Aura's landing page has no work banner and no stat triplet, so place the
section wherever it reads best before the timelines.

### 7. Marquee gap is coupled to a keyframe constant

Not a bug on aura today, but a trap if anyone touches the gap.

`@keyframes marquee` translates `-50%` minus a hard-coded offset for the gap
between the two duplicated copies. That constant is only correct for one
`gap` value. If you change the marquee's `gap`, the loop develops a visible
seam.

Kanvas's fix, which aura can adopt:

```css
transform: translateX(calc(-50% - var(--marquee-gap, 1rem) / 2));
```

with `[--marquee-gap:2rem]` set on the track alongside its `gap-8`. The
offset is **half** the gap: the track is `2W + G` wide, `-50%` lands at
`-(W + G/2)`, and one full copy over is `-(W + G)`.

Aura's marquee is already `text-2xl` on mobile, so it does **not** need the
size reduction Kanvas got.

### 8. Colour thumbnails — **already done on aura, skip**

Kanvas rendered thumbnails `grayscale` until hover, which hid every image's
colour permanently on touch. Aura never did this: its card image is already
`transition-transform ... group-hover:scale-[1.03]` with no filter.

Nothing to do. Listed only so it is not "ported" by adding a grayscale
filter that was never there.

---

## 3. What does *not* port

- **`GridLines.tsx`** and **`KanvasHeader.tsx`** — Kanvas-only furniture.
  Aura has its own header treatment and `bg-grid`.
- **The category-heading size change.** On Kanvas the `/projects` category
  labels went from `text-[0.6875rem]` to `text-base tracking-[0.1em]`. This
  is a deliberate divergence from the shared eyebrow scale and it is a
  *design* decision, not a layout fix. Aura's headings are the same eyebrow
  scale in amber — **ask Cedric** whether he wants the same jump there
  before changing it.
- **Hero grid geometry.** Kanvas is 12-column with a red-orange gradient;
  aura is a two-column `[1fr_minmax(0,26rem)]`. Item 3 removes one class and
  touches nothing else.
- **The stat triplet dividers and work-banner heights.** Aura has neither
  section.
- **The three case thumbnails** (`d5bac41`) are content, not layout. Both
  branches read the same `src/data/projects.ts`, so they arrive on their own.

---

## 4. Verify before committing

In this order. The first two are cheap and catch most of it:

```bash
npx tsc --noEmit      # Turbopack does not type-check; the dev server will
                      # serve straight past a type error
npx eslint src/       # `next lint` does not exist in Next 16
npm run build
```

Then **look at it**, which is the step that has been skipped for four
sessions:

```bash
npm run build && npx serve out -l 4031
```

Screenshot at 390px. One trap worth knowing: headless Chrome's
`--window-size` does **not** set the layout viewport the way a phone does —
the page renders wider and gets cropped, which looks exactly like a
horizontal-overflow bug. Load the page in a 390px-wide `<iframe>` from a
local harness file instead; that reflows for real.

To check the touch-only states (the tap hint, and that hover-dependent
affordances are not the only signal):

```bash
chrome --headless --blink-settings=primaryHoverType=1,availableHoverTypes=1,primaryPointerType=2,availablePointerTypes=2 \
  --screenshot=out.png --virtual-time-budget=9000 http://localhost:4031/projects
```

Two checks a type checker cannot do for you:

- **`tsc` cannot see the filesystem.** A `thumbnail`, `reel`, or `poster`
  path is a valid string whether or not the file exists. Fetch every one off
  the built output and confirm a 200 — that is how a 404 shipped before.
- **Static export means images and video are never optimised**
  (`images.unoptimized`). Whatever you drop in `public/` is what every
  visitor downloads. `sharp` is installed; 1280px wide at q82 is right for a
  card. `public/images/youtube-videos_summary.png` is still 2.24MB on both
  branches and reduces to ~121KB.

Commit messages: use `git commit -F <file>`. PowerShell's `@'...'@`
here-string leaks a literal `@` as the first line under Bash.
