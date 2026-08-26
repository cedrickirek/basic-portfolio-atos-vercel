# I Designed Into a Space I Never Measured — Mistake Note

**Date:** 2026-08-26
**Symptom:** Fixed Cédric's complaint that hovering one project card resized
its neighbours. The fix worked. He came back: *"the box on which i put my
mouse does not magnify anymore. so the tags 'RAG', 'LLM' etc disappear."* My
fix had traded one visible bug for another.
**Time lost:** two commits and most of an exchange — `c791845` shipped the
bug, `275d19a` undid the approach entirely.
**Root cause:** I chose an overlay as the solution without ever measuring
whether the content fit the space I was overlaying. It needed ~266px; the
largest free region in a card is ~180px. **No placement could have worked,
and one calculation up front would have said so.**

---

## 1. What happened

Cédric reported that moving the pointer along a row of project cards made the
adjacent ones grow and shrink — "a weird decrease/increase movement".

The diagnosis went well, and it is worth keeping. **No card was scaling.** The
only `transform` on the card is on the thumbnail image, inside its own
`overflow-hidden`. What actually moved was the description: hover swapped
`line-clamp-2` for `line-clamp-none`, the card grew taller, and because a CSS
grid row stretches every card to a common height, **one card growing re-flowed
the entire row**. Measured per card:

```
case 001  +88px      case 004  +44px
case 002  +44px      case 005  +22px
case 003  +44px      case 006  +88px
```

Crossing from 001 to 002 meant the row went +88px then back to +44px. That
step change at every crossing is exactly what he was describing.

So far so good. Then I jumped.

**I decided the fix was to float the expanded text over the card** — reserve
the space in the layout, paint the full text on its own layer, card height
never changes. I wrote it, measured the row, and it was genuinely fixed: card
heights `608, 608, 461` before hover and `608, 608, 461` after. I committed it
and reported the measurement.

What I never measured was **the panel against the space underneath it.** The
floated text is ~266px tall. It was anchored `top-0` to the description slot,
so it grew downward — straight over the tag list and the action buttons. The
thing I had spent two previous commits making prominent (`PDF →`, `REPO →`)
was now hidden by the thing I added.

Cédric saw it immediately. I then made it worse by treating it as a
positioning problem:

1. Anchor to the bottom instead, so it grows upward into the title's
   whitespace. Measured: panel bottom 854, tags top 846. **Still overlapping
   by 8px.**
2. Cap the height with `overflow-y-auto` — which puts a scrollbar inside a
   hover panel, worse than the problem.

Only then did I do the arithmetic I should have done first:

```
full description         ~266px
thumbnail (16:9 @ 320px)  180px   ← largest free region in the card
description slot (3 lines) ~66px
```

**Nothing in the card fits 266px.** Every anchoring covers something, because
there is no space to cover nothing. Three attempts were spent discovering a
fact that one subtraction would have produced before the first line of code.

### The second thing I nearly got wrong

Having established the overlay was dead, the obvious retreat was "just don't
expand — show three lines and stop." I nearly did it. Checking first showed
what it would cost:

```
case 001  100% shown in 3 lines      case 005   85%
case 002   53%                       case 006  100%
case 003   75%                       case 007   49%
case 004   76%
```

Half of two descriptions would have been unreachable with no way to get at
them. **The retreat was as unmeasured as the original plan** — I only avoided
it because the same instinct that was missing at the start finally kicked in.

---

## 2. Before / After

| # | Topic | Before (what I thought ✗) | After (correct ✓) |
| --- | --- | --- | --- |
| 1 | "Cards magnify on hover" | Something has a `scale` transform on the card. | Nothing scaled. A **`line-clamp` change** grew the card, and the grid row propagated it. Take the symptom seriously, but find the mechanism — the reported cause and the real one differed. |
| 2 | Grid rows | Cards are independent boxes side by side. | A grid row **stretches every card to a common height**. One card growing moves all of them. That is what makes a local change look global. |
| 3 | Choosing an overlay | If the layout must not move, paint on a layer above it. | Only if the content **fits** the layer. An overlay does not create space, it borrows it — from whatever is underneath. |
| 4 | Verifying a fix | Measure the thing the bug was about (row heights). | Measure what the fix **displaces** too. My row measurement was correct and the fix was still broken. A passing check on the original symptom proves nothing about the new state. |
| 5 | An overlapping panel | A positioning problem — move the anchor. | A **capacity** problem. Re-anchoring redistributes an overflow that has nowhere to go. Compute the space once instead of trying placements. |
| 6 | `overflow-y-auto` as an escape | Caps the panel so it cannot overflow. | Puts a scrollbar inside a hover panel. A fix that makes the interaction worse than the bug is not a fix. |
| 7 | The retreat option | "Just truncate" is always safe. | Truncation is a content decision. Three lines hid **half** of two descriptions. Measure the cost of the fallback as well. |
| 8 | Where the full text goes | Somewhere on the card. | Somewhere with **room** — a dialog. The constraint was never where to put it, it was that the card is too small. |

---

## 3. The fix

The card does not expand at all.

- `src/components/ProjectCard.tsx` — description fixed at `line-clamp-3`,
  permanently. Hover only lifts the border and zooms the thumbnail. Nothing
  moves, nothing is covered.
- Full text opens in a dialog on click, which is what touch already did — so
  both pointer types now behave identically instead of diverging.
- `src/components/ReelModal.tsx` gained a `mode` to serve both cases rather
  than growing a second dialog beside it (the focus trap, Escape handling,
  scroll lock and focus restore are the same work either way). One commit
  later that `mode` was removed again when the modal became a single layout —
  the reuse was still right, the parameter was temporary.

Verified through CDP with a real pointer rather than by eye: card heights
`631, 631, 484` before hover and after; tag rows at `869, 896, 1572` before
and after; `LI`/`UL` topmost at the tag centres, so nothing overlays them.

---

## 4. How I'd catch this faster next time

- **Before choosing where to put something, measure how big it is and how big
  the hole is.** One subtraction. `266 > 180` ends the design discussion
  before it starts.
- **When a fix hides something, that is a capacity problem, not a placement
  problem.** Re-anchoring an overflow moves which thing gets covered. If the
  first two placements both collide, stop moving it.
- **Verify the state after the fix, not the symptom before it.** "Row heights
  are stable" was true and insufficient. Ask what the change *displaces*, and
  measure that too — `getBoundingClientRect` on the elements underneath would
  have caught this in the same tool call as the heights.
- **Measure the fallback before retreating to it.** "Just truncate" hid 51%
  of a description. The safe option needs the same check as the risky one.
- **When the user reports a mechanism, believe the observation and re-derive
  the mechanism.** "The boxes magnify" was not literally true; the movement
  was completely real. Both of his hover reports were correct about the
  symptom and led straight to genuine bugs.

---

## 5. One-line summaries to memorize

- **Measure the space before designing into it.** `266 > 180` is one
  subtraction and it settles the whole question.
- An overlay does not create space. It **borrows** it from whatever is
  underneath — so check what is underneath.
- A grid row stretches every card to a common height: **one card growing
  moves the entire row.**
- Verifying that the original symptom is gone says nothing about what the fix
  broke. **Measure the displacement, not just the target.**
- If two different anchorings both collide, it is a **capacity** problem.
  Stop repositioning and do the arithmetic.
- A scrollbar inside a hover panel is worse than the bug it hides.
- **The fallback needs measuring too** — "just truncate" cost half of two
  descriptions.
- The user's symptom was right and his mechanism was wrong; **both halves
  matter**. Take the observation, re-derive the cause.
- Sibling to the BetterWorld note *I Diagnosed a Photograph Without Looking at
  It*: that one substituted a number for the thing itself, this one skipped
  the number entirely. **Both are refusing to measure the actual object.**
