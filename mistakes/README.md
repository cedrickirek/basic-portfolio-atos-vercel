# Mistakes Log

Debugging post-mortems for this site. One file per incident, named
`YYYY-MM-DD-<slug>.md`.

**Purpose:** I re-read these to improve as a programmer. Each entry should be
useful months later, to someone who has forgotten the incident entirely — and
should be quiz-able (the Before/After table is the natural question bank).

**What belongs here:** things that went wrong and cost real time. Bugs, wrong
diagnoses, misunderstandings about how a library or service behaves.

**What does not:** end-of-session handoffs and weekly plans (those are
`notes/`), or concept clarifications that weren't triggered by something
breaking.

Same convention as the `mistakes/` log on the BetterWorld project.

## Template

```markdown
# <Short title> — Mistake Note

**Date:** YYYY-MM-DD
**Symptom:** what I actually saw, in one line
**Time lost:** rough estimate
**Root cause:** one line, the real one

## 1. What happened

Narrative. What I did, what I expected, what I got.

## 2. Before / After

| # | Topic | Before (what I thought ✗) | After (correct ✓) |
| --- | --- | --- | --- |

## 3. The fix

What actually resolved it, with file references.

## 4. How I'd catch this faster next time

Concrete diagnostic moves, not "be more careful".

## 5. One-line summaries to memorize
```
