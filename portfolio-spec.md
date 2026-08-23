# Personal Site — Build Spec

> Written for an AI coding agent. Attach the Samsung Notes PDF alongside this file as visual reference, but treat this document as the source of truth where the two disagree.

---

## 0. Intent

Two layers, deliberately separated:

- **Layer 1 — the personal site (`/`).** A front door. It is about who Cedric is, not what he sells. No job title in the hero, no elevator pitch, no recruiter-optimized summary. Personality first.
- **Layer 2 — the portfolio (`/projects`).** The professional room behind the door. This is the URL sent directly to recruiters and hiring managers.

Do not collapse these into one page. The separation is the design decision.

**Author:** Cédric Emmanuel Kiré — ML/AI engineer, co-founder & CTO of an EdTech startup, based in Abidjan, Côte d'Ivoire.

---

## 1. Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for all animation
- Static export, deployable to Vercel
- No CMS. Content lives in typed data files under `/data` so entries can be edited without touching components.

---

## 2. Page: `/` (landing)

Sections in order, top to bottom.

### 2.1 Hero — the triptych

Three lines, stacked, centered:

```
Never Stop Improving
Never Stop Exploring
Never Stop Building
```

**Signature effect (the one bold element on the page):** a watermark / *filigrane* treatment in which the three lines interchange. All three are present simultaneously — one at full opacity, the other two ghosted behind it — and on a slow loop the active line cycles: Improving → Exploring → Building → Improving. The ghosted lines should feel like a watermark, not like a fade transition.

- Cycle interval: ~3.5s per line
- Crossfade duration: ~800ms
- Ghost opacity: 0.12–0.18, tune against final background
- The three lines occupy fixed positions and never reflow. Only opacity and layering change.
- Respect `prefers-reduced-motion`: render all three lines at equal, legible opacity with no cycling.

This is the only place in the site where an ambient looping animation is permitted. Everything else is triggered by scroll or interaction.

### 2.2 Intro

```
Hey, I'm Cedric Emmanuel!
```

A gradient begins at this element and carries down through the rest of the page — the sketch marks this as "début d'effet dégradé ici." The gradient should be a background treatment on the page body from this point onward, subtle enough that text contrast never drops below WCAG AA.

Body copy beneath it:

> I aspire to be extremely good at being technical, and also extremely good on the business aspect.

Keep this line as written. It is a personal statement on a personal page and is not to be rewritten into achievement copy.

### 2.3 Carousel

Left column, beside the intro on desktop. Frames in this order:

1. LinkedIn portrait
2. Selfie, smiling
3. Playing basketball
4. With friends
5. Chill guy meme

Behavior: auto-advance every 4s, pause on hover/focus, swipeable on touch, dot indicators, keyboard arrow support. Fixed aspect ratio container so the layout never jumps between frames of different dimensions.

`TODO(cedric)`: supply the five images. Deliver at 2x, WebP, longest edge ≤1600px.

### 2.4 Primary CTA

```
See my Projects here
```

A bordered rectangle, per the sketch. Two effects on hover/focus:

- **Glow** — a soft outer glow in the accent color, ~250ms ease-out
- **Magnify** — scale to ~1.04, same easing

On click, this element morphs into the `/projects` page heading. See §4.

Visible keyboard focus ring, distinct from the hover glow.

### 2.5 Timelines

Two columns on desktop, stacked on mobile.

**Left — My Journey so far**

| Year | Entry |
|------|-------|
| 2001 | Born and raised in Côte d'Ivoire |
| 2018 | Studied engineering in the UK on a fully funded scholarship |
| 2022 | Two-year research master's on a Japanese Government (MEXT) scholarship |
| 2024 | Joined X-HEC Data Science & AI |

**Right — Work Experiences**

| Year | Entry |
|------|-------|
| 2026 | EdTech startup |
| 2025 | L'Oréal |
| 2022–2024 | Tokyo Tech |
| 2023 | Kozo Keikaku Engineering |

Rendering notes:

- Each column has its own vertical rule with a node marker per entry, as sketched.
- The two columns run on **independent scales**. Do not attempt to align 2018 on the left with anything on the right — there is no correspondence and forcing one will mislead.
- Years sit in a distinct utility face/weight from the entry text.
- Scroll-triggered reveal: entries fade and rise in sequence, ~60ms stagger, triggered once. Not on every scroll pass.

`TODO(cedric)`: the Work Experiences column has years but no roles. Add a role line under each employer (e.g. "Co-founder & CTO", "Data Science Intern"). Employer names alone read as a list of logos rather than a record of work.

### 2.6 Interests bar

A horizontally flowing marquee — "flowing bar" in the sketch:

`YouTube · Podcasting · East Asia · Basketball · Productivity · Religion`

- Continuous horizontal scroll, slow (~40s per full loop), seamless wrap
- Pause on hover
- Under `prefers-reduced-motion`, render as a static centered row

### 2.7 Contact

Not in the sketch; required. Keep it as quiet as the rest of the page — a single row of links, no form:

- Email
- GitHub
- LinkedIn
- Download CV (PDF)

`TODO(cedric)`: supply the four values and the CV file.

---

## 3. Page: `/projects`

Heading: **My Projects**

Three categories, each a labeled row of cards. The category label sits to the left of the row on desktop, above it on mobile.

| Category | Cards in sketch |
|----------|-----------------|
| Research | 3 |
| Apps | 6 |
| Humanitarian | 3 |

### Card anatomy

Each card, once populated, carries:

- Title
- One-line description
- Tech stack tags
- Links: live demo and/or repo
- Thumbnail

### Hover previsualization

The sketch calls for a hover effect that previews the project's page. Implementation:

- On hover (desktop, pointer devices), the card expands to reveal the preview — a larger thumbnail plus the full description
- **Touch fallback is mandatory:** on coarse pointers, the same content opens via tap into a bottom sheet or expanded inline panel. A hover-only interaction is invisible on phones.
- Detect with `@media (hover: hover) and (pointer: fine)`, not by viewport width

### On card count

Twelve cards is a lot of surface area for a portfolio whose job is to be read, not scanned. Recommendation: lead each category with its strongest one or two entries at larger card size, and let the remainder sit smaller beneath. Build the grid so card prominence is a per-entry property rather than uniform.

`TODO(cedric)`: the sketch has empty boxes. Supply title, description, stack, and links for each. Two entries that should not be missed:

- **The MSc thesis** — *Curriculum-Grounded Retrieval-Augmented Generation for High-school Mathematics Self-Tutoring in Côte d'Ivoire.* Give it a Research card with a PDF link.
- **Tutorly** — the EdTech startup, as the anchor Apps entry.

---

## 4. Morph transition

The sketch specifies a morph from the landing CTA **"See my Projects here"** into the `/projects` heading **"My Projects"**.

Implementation: Framer Motion shared layout animation.

- Assign `layoutId="projects-title"` to both the CTA text and the projects page heading
- The CTA's border/box does not carry across — only the text morphs; the box fades
- Duration ~500ms, ease-in-out
- The rest of the projects page enters after the morph settles, ~150ms delay
- Under `prefers-reduced-motion`, navigate directly with no morph
- The transition must not gate content: `/projects` loaded directly by URL renders immediately and correctly, with no dependence on having come from `/`

---

## 5. Responsive

The sketch is annotated "optimized for laptops." Desktop is the design target, but the site must be fully functional and legible on phones — links get opened on phones more often than not.

- Mobile-first breakpoints; desktop is the enhanced case
- Below `md`: all two-column layouts stack, carousel becomes swipeable, timelines run full-width sequentially, hover previews become tap interactions
- The triptych, gradient, glow, and morph may be simplified on mobile but must not break or disappear
- No horizontal overflow at any width from 320px up

---

## 6. Quality floor

- Semantic HTML; one `h1` per page
- Visible keyboard focus on every interactive element
- `prefers-reduced-motion` honored throughout, per the notes above
- Alt text on all images
- Text contrast ≥ WCAG AA against the gradient at every scroll position
- Lighthouse ≥ 90 on performance and accessibility
- Open Graph and Twitter card metadata on both pages

---

## 7. Visual direction

The sketch pins structure and motion but leaves palette and typography open. Two things to hold to when filling that gap:

**Avoid the defaults.** Cream background with a serif display and a terracotta accent; near-black with a single acid accent; broadsheet hairline rules with zero border-radius. These are what generic AI-generated portfolios look like right now. Pick something derived from this specific person instead.

**Where to look for it.** The material here is a trajectory across Abidjan, Wolverhampton, Tokyo, and Paris — four places with genuinely different visual vernaculars. The handwritten sketch itself is also a legitimate source: an ink-on-paper quality in the display face, or dividers that echo the hand-drawn dashed rules between sections, would tie the site to its own origin.

Deliverable before writing components: a short token plan — 4–6 named hex values, a display face, a body face, a utility face for years and tags — and a one-line justification for each choice tying it to the above. Revise anything in that plan that would appear unchanged on a different person's portfolio.

The triptych is the signature. Everything else stays quiet.

---

## 8. Open items for Cedric

- [ ] Five carousel images
- [ ] Role titles for each of the four work experiences
- [ ] Content for all twelve project cards
- [ ] Thesis PDF
- [ ] CV PDF
- [ ] Email, GitHub, LinkedIn
- [ ] Domain
