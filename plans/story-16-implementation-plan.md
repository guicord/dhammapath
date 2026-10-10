# Implement Story 16: Understand what this map is before diving in

## Context

A design/UX audit of DhammaPath surfaced that first-time visitors land directly on dense Pali terminology ("Three Marks of Existence") with no framing of what the map represents, what tradition it's drawn from, or how to read it. The only definition of "Dhamma" itself lives behind a hover/click on the masthead title — easy to miss, since nothing signals the title is interactive. This was captured as [story-16-understand-what-this-map-is-before-diving-in.md](../stories/story-16-understand-what-this-map-is-before-diving-in.md), with acceptance criteria requiring: plain-language tradition/scope framing before the first content section, a visible (non-hover-dependent) Dhamma gloss, an extended interaction legend covering all three affordances (term, arrow, flip card), and no modal/no blocking of first load.

Intended outcome: two small, always-visible text additions near the masthead — no new interactive elements, no layout restructuring, minimal diff.

## Approach

### 1. JSX changes — `components/map/MapExperience.tsx`

Replace lines 419–432 (the `<header>` block through the existing hint paragraph):

```tsx
      <header className={styles.masthead}>
        <LotusIcon className={styles.lotus} />
        <div>
          <h1>
            <Term k="dhamma">Dhamma</Term> map
          </h1>
          <p ref={subRef}>The path to happiness</p>
          <p className={styles.framing}>
            This map traces core teachings of the Theravāda Buddhist tradition as a structured overview — not a
            complete course. Dhamma means the Buddha&rsquo;s teaching, and the nature of reality that teaching
            describes.
          </p>
        </div>
        <LotusIcon className={styles.lotus} />
      </header>

      <p className={styles.hint} ref={hintRef}>
        Underlined terms (like Dhamma, above) show a definition on hover or tap. The arrows between sections mark
        the order to read them. A card with an arrow icon flips over on click for more.
      </p>
```

Two changes, both additive/textual:
- **New `<p className={styles.framing}>`** inside the masthead's middle column, after the existing `subRef` subtitle. Does not touch `subRef` (still wired to the page-chrome subtitle swap in `chrome()`).
- **`.hint` paragraph keeps its existing element and `hintRef`** — only its text content changes, now covering all three affordances instead of two. This is a literal *extension* of the existing hint, per the acceptance criteria wording.

**Copy sourcing**, not invented from scratch:
- Tradition/scope sentence paraphrases the app's own existing self-description (`app/layout.tsx:6`: *"A visual, structured map of core Theravada Buddhist teachings."*).
- The Dhamma sentence reuses the canonical `shortSummary` from the `dhamma` concept record (`content/dhamma-concepts.ts:58`, *"The Buddha's teaching, and the nature of reality that teaching describes."*) verbatim after "Dhamma means" — so the always-visible gloss can't drift from what the hover tooltip already says.
- "(like Dhamma, above)" in the legend explicitly cross-references the masthead title, directly satisfying "visible without depending on a visitor discovering the title is interactive."

**Persistence decision — make the legend visible on both pages, not page-1-only as today.** Page 2 uses the same underlined-term and section-arrow affordances extensively; hiding the explanation there would leave them unexplained. This requires one deletion in the paging effect, same file, currently line 160:

```tsx
function chrome(n: number) {
  sub!.textContent = subs[n];
  pageno!.textContent = `Page ${n + 1} of 2`;
  prev!.hidden = n === 0;
  next!.hidden = n === pages.length - 1;
  hint!.style.display = n === 0 ? "" : "none";   // <-- delete this line
}
```

Everything else referencing `hint`/`hintRef` (the ref declaration, the destructure, the null-guard) stays untouched — `hint` remains read in the guard, so no unused-variable fallout.

### 2. CSS changes — `components/map/MapExperience.module.css`

No change to the existing `.hint` rule (lines 659–664) — only its JSX text content changes.

Add a new rule after the `.masthead h1::after` block (after line 36, before `.lotus`):

```css
.masthead .framing {
  margin: 10px auto 0;
  max-width: 46ch;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: 0.01em;
  color: #8a5a12;
}
```

- Scoped as `.masthead .framing` so it overrides the generic `.masthead p` rule's `margin`/`font-size` without `!important`, while inheriting `text-align: center` from it.
- `color: #8a5a12` matches the existing `.masthead p` amber-ink tone exactly — stays visually part of the masthead.
- `max-width: 46ch` keeps the two-sentence paragraph readable on wide viewports.
- Named `.framing`, deliberately **not** `.legend` — `.legend` (lines 652–658) is already used for the unrelated near/far-enemies captions inside flip-card backs; reusing it would silently mis-style this new paragraph as small italic caption text.

No new media query needed — both paragraphs are plain flowing text inside containers that already reflow at the existing 520px breakpoint without special-casing (same as `.hint`/`.masthead p` today).

### 3. Why plain text, not an icon-based legend

Considered reusing `ArrowIcon`/`FlipToIcon` inline for a visual legend. Rejected: those icons are hard-coded to specific sizes/saturated colors for their current contexts (`icons.tsx`), so reuse would need new sizing/color overrides plus a flex/grid layout — disproportionate effort for what the story's own notes call "a few sentences... not a lesson in itself." Plain text matches the existing `.hint` style and keeps the addition calm rather than feature-like.

### 4. Accessibility

- Both additions are plain `<p>` elements — no new ARIA roles, no new focus stops, no keyboard-order changes.
- Reading order already matches visual order: title → subtitle → framing → (header ends) → legend → first content section.
- The two `<LotusIcon>` decorations are already `aria-hidden="true"` inside their own SVG markup (`icons.tsx:3`) — nothing to change there, and the component's prop signature doesn't accept an `aria-hidden` override at the call site.
- Making the legend persistent (removing the page-2 `display: none`) is strictly more informative for assistive tech than the current page-1-only behavior, not a regression.

## Files touched

- `components/map/MapExperience.tsx` — JSX edit (lines 419–432) + one-line deletion in `chrome()` (line 160)
- `components/map/MapExperience.module.css` — one new rule (`.masthead .framing`)

Read-only references (not edited): `content/dhamma-concepts.ts` (Dhamma copy source), `app/layout.tsx` (tradition/scope copy source), `components/map/icons.tsx` (confirmed `LotusIcon` aria-hidden handling and icon prop signatures).

## Verification

No test suite exists in this repo, and `npm run build` requires a live database (`prisma migrate deploy && prisma db seed`), so it's not a quick check. Feasible verification:

1. `npm run lint` — confirm no unused-variable/JSX issues after removing the one `hint.style.display` line (`hint`/`hintRef` are still read in the effect's null-guard).
2. `npm run dev`, manual check:
   - Framing paragraph renders under the subtitle inside the masthead, before any content section, and reads calmly without crowding the title.
   - Legend paragraph covers all three affordances.
   - Navigate to page 2 and confirm the legend **stays visible** (the one actual behavior change to eyeball).
   - Hover/tap "Dhamma" in the title — tooltip still opens (unaffected mechanic).
   - Click a flip card's arrow button — flip still works (unaffected mechanic).
   - Resize to ≤520px — both paragraphs wrap reasonably with no new breakpoint needed.
