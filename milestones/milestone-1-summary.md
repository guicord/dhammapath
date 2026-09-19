# Milestone 1 Summary — Content Schema, Map Port, Concept Pages

Scope: `architecture-proposal.md` §9, steps 1–3. Full plan: `~/.claude/plans/quiet-brewing-boot.md`.

## What was built

- **Repo initialized and pushed**: [github.com/guicord/dhammapath](https://github.com/guicord/dhammapath) (public, `main` branch).
- **Next.js 16 app scaffolded** (App Router, TypeScript, CSS Modules — no Tailwind, to match the prototype's hand-authored theming).
- **Local Postgres** via Homebrew (`postgresql@16`), running as a background service.
- **Prisma 7 schema**: `Concept`, `ConceptRelationship`, `Source` models + enums, one migration applied.
- **Content authored**: `content/dhamma-concepts.ts` — all 84 concepts transcribed from the prototype's tooltip dictionary (`input/dhamma-map.html`), 123 relationships (98 `related`, 25 `prerequisite`), 6 verified sutta citations. Seed script is idempotent (safe to re-run).
- **Map ported to React**: `components/map/MapExperience.tsx` — tooltip system, flip cards, page navigation (click, arrow keys, touch swipe, trackpad/wheel), `prefers-reduced-motion` support. Interaction logic kept close to a line-for-line port of the original vanilla JS to minimize regression risk.
- **Concept detail pages**: `components/concept/ConceptTemplate.tsx` + `/concepts/[slug]` route. Statically generated at build time (all 84 pages), hourly ISR. Shows related concepts grouped by direction (understand first / leads to / related) and a sources section with a graceful placeholder when none exist yet.

## Key decisions made along the way

- **Local Postgres instead of Docker** — Docker Desktop's installer needs an interactive `sudo` prompt this sandboxed shell couldn't provide; Homebrew's `postgresql@16` needed no sudo and worked cleanly.
- **Prisma pinned to 7.10.0** — npm's `latest` tag pointed to an 8.0 release candidate for the `prisma` CLI while `@prisma/client`'s `latest` was still 7.10.0; pinned both to the matching stable release rather than run a mismatched pair.
- **Category taxonomy**: 6 categories — the PRD's 5 plus a new `nature-of-reality` for Three Marks / Dependent Origination / Kamma.
- **Thematic-overlap terms** (e.g. `vedanā` in the Five Aggregates vs. in Dependent Origination) kept as separate concept records linked via a `related` relationship, preserving each context's distinct explanation rather than merging them.
- **Map "Read more" link**: added inside the tooltip per the approved decision, which required extending the original's hide-on-mouseleave/blur logic to detect focus or hover moving into the tooltip itself — otherwise the link was unreachable by mouse or keyboard.
- **Sources**: seeded 6 real, verified sutta citations only; every other concept shows a "coming soon" placeholder rather than a fabricated reference.
- **Found and fixed a pre-existing bug** in the original prototype (confirmed in `input/dhamma-map.html` itself): a CSS specificity tie made the "Back" nav button visible on page 1 despite its `hidden` attribute.

## Verification performed

- TypeScript (`tsc --noEmit`) and ESLint clean.
- Scripted Playwright regression pass: tooltip (hover/focus/click/Escape), flip cards, page navigation (click/arrow keys/reduced motion), screenshots at desktop and mobile widths — zero console errors.
- `npm run build` — all 84 concept pages generated statically.
- `npm run start` — production server smoke-tested (home, a concept page, a 404).

## Explicitly out of scope for this milestone

Auth, user accounts, mark-as-learned/progress tracking, quizzes, the review queue, and public hosting — all deferred to later milestones per the architecture proposal's MVP build order.

## Running it locally

```bash
brew services start postgresql@16   # if not already running
cd /Users/gc/Dev/DhammaPath
npm run dev
```

Visit `http://localhost:3000` for the map; click "Read more →" in any tooltip to reach `/concepts/<slug>`.

## Reference docs

- `architecture-proposal.md` — full architecture
- `product-requirements.md`, `stories/` — product requirements and the 15 user stories
- `~/.claude/plans/quiet-brewing-boot.md` — the detailed Milestone 1 implementation plan
