# 2026-08-24 — handoff (second session, templates)

**Next session: layout fixes on `design/kanvas-grid`.** Cedric has chosen that
branch and says there are "multiple layout issues" — **get him to name them
before changing anything.** The first 08-24 note carried the same instruction
and it still holds: the round before it guessed from screenshots and only
partly landed.

Previous handoff: [2026-08-24](2026-08-24.md) (same day, first session).

---

## Where things stand

**Three branches, none merged, none pushed. `main` is untouched** and still
holds the white + orange (Criteo) site Cedric rejected.

| Branch | State |
| --- | --- |
| `main` | Unchanged at `636448e`. Still deployed. |
| `design/aura-premium` | One commit `a070dd9`. Dark serif. **Not chosen; keep for reference.** |
| `design/kanvas-grid` | One commit `a8c662b`. **This is the one to continue.** |

Both design branches fork directly from `636448e` and share no commits — see
`git log --graph --all`. Cedric asked twice whether the second was built on top
of the first; it is not, and the graph is the fastest way to show that.

---

## What got done

Cedric evaluated two Aura templates and picked the second.

### Round 1 — `design/aura-premium` (not chosen)

Reference: <https://primeestat-real.aura.build/>. Near-black ground, Fraunces
display serif, JetBrains Mono labels, amber `#e8b10d`, hairline rules. 11
files, +256 lines. He called it "nice" with "a few things that need to be
changed" — **that list was never collected**, because he moved to the second
template first. Still owed if he returns to this branch.

### Round 2 — `design/kanvas-grid` (chosen)

Reference: <https://digital-creative-76.aura.build/>. 14 files, +447 lines,
3 new files.

- `#0b0d11` ground, `#7dd3fc` cyan accent, Geist Mono + Inter.
- `GridLines.tsx` — fixed 12-column overlay, `z-0`, `pointer-events-none`.
- `KanvasHeader.tsx` — fixed blurred bar, `z-50`, boxed "CE", numbered nav.
- `kanvas.ts` — image slots, see "Cedric's open task".
- Triptych cycles solid white against `.text-stroke` outlines.
- Hero keeps the template's red-orange gradient; the rest stays cold.
- Stats triplet (`06` projects / `02` theses / `04` countries) — **computed
  from real data**, not invented. Projects and theses come from `byCategory()`;
  countries is a hardcoded `04` read off the journey timeline.
- Projects page: CASE numbering across categories, grayscale thumbnails that
  colour on hover.

**Deliberately not carried over**: menu and cart drawers, testimonials, star
ratings, prices, UnicornStudio (third-party CDN script), the 19 Google Font
imports, and every hotlinked Supabase asset.

The spec Aura gave Cedric described a **different, muted page** than the live
URL — `#0B0D11` with sky blue and no warm gradient. Where they disagreed the
live page won, except on the accent, which he confirmed he wanted kept.

---

## Cedric's open task

**`imageSlots.workBanner` in `src/data/kanvas.ts` is `null`.** He said he would
download images himself. Until then the "Selected work" banner renders a faint
cyan radial glow — deliberate, not a bug.

To fill it: drop a wide image (~2400px) into `public/images/`, set the path.
It renders at `opacity-40` with `mix-blend-luminosity`, so most moody images
work. `heroPortrait` sits in the same file if he wants a different photo.

Static export means **`next/image` optimisation is off** (`images.unoptimized`
in `next.config.ts`), so anything new must be pre-processed. `sharp` at
1200x1500 WebP was used for the carousel; three source photos had EXIF
orientation 6 and needed `.rotate()`.

---

## Things that will bite the next session

- **Neither design branch is pushed.** `git push -u origin design/kanvas-grid`
  is needed before Vercel sees any of it. A fresh commit is required after any
  Vercel author-attribution fix — *Redeploy reuses the same commit*.
- **The dev server ran on port 3007**, chosen to dodge the BetterWorld donation
  app on 3000/3001. `npm run dev` will not pick 3007 on its own — **read the
  port it prints.**
- **`scroll-smooth` is now on `<html>`** (kanvas branch only). Playwright
  captures must scroll with `behavior:'instant'` or screenshots land
  mid-animation. This produced a false "the header is missing" report; the
  header was fine, verified by reading `getBoundingClientRect()` off the live
  DOM before touching any code.
- **Aura sites render inside an `about:srcdoc` iframe.** Measuring the outer
  document reports `scrollHeight === innerHeight` and zero sections, which
  looks exactly like a page that does not scroll. Use
  `page.frames().find(f => f.url() === 'about:srcdoc')`. This caused a wrong
  claim that the first template was a single screen; Cedric corrected it.
- **Long `Bash` heredocs get truncated** mid-write in this environment. Both
  `page.tsx` writes and this note had to be split into appends. Check `wc -l`
  after any large heredoc.
- Carried forward: `motion/react` not `motion/react-client` in client
  components; `tsc --noEmit` needs a build first for `LayoutProps`; `next lint`
  does not exist in Next 16, use `npx eslint src/`.

---

## Verification state

Both branches: `npm run build`, `npx tsc --noEmit`, `npx eslint src/` all pass.
Screenshotted at **390px / 1440px / 2540px** — no horizontal overflow, no
hydration errors at any width. 2540px is Cedric's actual screen and the width
the first layout attempt failed at.

**Lighthouse still never run.** `portfolio-spec.md` §6 sets a floor of >=90
performance and accessibility. Outstanding since the previous handoff.

---

## Still open, unchanged

1. **School projects** — Cedric is still supplying data science coursework
   entries. Empty categories do not render, so nothing is broken meanwhile.
2. **`mistakes/` note** — offered across two sessions now. The strongest case
   is this session's `about:srcdoc` iframe: a measurement that was internally
   consistent and completely wrong, caught only because Cedric pushed back.
   Pairs with the four runtime bugs from the previous session, all of which
   passed a clean build. **The directory does not exist in this repo yet** — he
   keeps `mistakes/` on the BetterWorld project.
3. **`site.url`** in `src/data/site.ts` still points at the Vercel subdomain.
4. `screenshots-to-be-deleted/` is gitignored and can be deleted.

---

## Deliverables from this session

- **Slide deck**, 12 slides, published as a Claude artifact:
  <https://claude.ai/code/artifact/343d0892-80df-4d62-9f50-b30877ae0b0e>

  Covers branches, design tokens, components, the z-index stack, the
  placeholder pattern, and why a clean build is not a correct page — each
  mapped to a Python or data-science parallel. Written because Cedric said he
  wants to understand software engineering, not just receive it.

---

## How Cedric works

Unchanged from the previous handoff, plus two things this session confirmed:

- **He pushes back and he is usually right.** He challenged the claim that the
  first template did not scroll. It scrolls — 5929px, 8 sections. The
  measurement was wrong, not his eyes. **Check the artefact before defending a
  diagnosis.**
- **He notices when an explanation is missing.** "I am a bit lost" and "did you
  add the changes from the first template" meant the same thing: the two
  branches were never explained clearly enough. Showing the git graph settled
  it in one command. Prefer showing state over asserting it.
- Direct answers, action first. He has called out verbosity explicitly.
- He keeps `notes/`, `decisions/`, and `mistakes/` for self-study and quizzes
  himself on them. Offer a `mistakes/` note after real debugging.
