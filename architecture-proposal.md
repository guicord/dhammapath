# Dhamma Learning App — Architecture Proposal

Based on `product-requirements.md` (sections 3, 4, 6) and the 15 stories in `stories/`. Each design decision below is traced to the story or requirement that drives it, so scope stays anchored to what's actually needed.

## 1. Guiding constraint

The product has one central tension: the concept map must stay **hand-curated** (story 13, PRD 4.1) while the content behind it must be **freely expandable** (story 12, PRD 4.2). Every structural decision below exists to keep those two things decoupled — the map is a presentation layer that *points into* the data layer, it never *is* the data layer.

## 2. High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js application (Vercel)               │
│                                                                     │
│  ┌───────────────────┐   ┌───────────────────────────────────┐   │
│  │ Curated Map Layer  │   │        Concept Template Layer      │   │
│  │ (hand-built SVG/   │   │  (data-driven, one React template  │   │
│  │  HTML/CSS, ported  │──▶│   rendering every concept page)    │   │
│  │  from prototype)   │   │                                     │   │
│  └───────────────────┘   └───────────────────┬───────────────┘   │
│                                                │                    │
│              ┌─────────────────────────────────┼─────────────┐    │
│              │           API / Server layer     │             │    │
│              │  (Next.js route handlers / RSC data access)    │    │
│              └───────┬─────────────┬─────────────┬───────────┘    │
└──────────────────────┼─────────────┼─────────────┼────────────────┘
                        │             │             │
              ┌─────────▼───┐ ┌───────▼──────┐ ┌────▼─────────┐
              │  Content DB  │ │  Auth (Users) │ │ Progress/Quiz │
              │  (Postgres:  │ │  Supabase Auth │ │ (Postgres,    │
              │  concepts,   │ │                │ │ same instance,│
              │  relations,  │ │                │ │ separate      │
              │  sources)    │ │                │ │ tables)       │
              └──────────────┘ └────────────────┘ └───────────────┘
```

Five layers from PRD §6, mapped onto concrete components:

| PRD layer | Concrete implementation |
|---|---|
| Curated static visual map | Ported prototype (`input/dhamma-map.html`) → React/SVG component tree, statically rendered |
| Dynamic concept database + API | PostgreSQL (via Supabase) + Next.js route handlers |
| User-auth and progress layer | Supabase Auth + `user_progress` / `quiz_attempts` tables |
| Learning and quiz layer | Quiz tables + a quiz React component reused per concept |
| Source-reference layer | `sources` table + a "Read the source" section in the concept template |

## 3. Stack

| Concern | Choice | Why |
|---|---|---|
| Frontend + API | Next.js (App Router), TypeScript | SSR/ISR for concept pages, route handlers double as the API, one deployable unit |
| Styling | CSS Modules + CSS variables | Matches the prototype's hand-authored CSS; no heavy design-system dependency that would fight the curated look |
| Database | PostgreSQL (Supabase-hosted) | Relational model fits concept graph + relational progress/quiz data; Supabase bundles Postgres + Auth |
| Auth | Supabase Auth | Free-tier email/password login satisfies stories 10/11 with no custom auth code |
| ORM/query layer | Prisma (or Drizzle) | Typed schema shared between seed scripts, route handlers, and migrations |
| Hosting | Vercel (app) + Supabase (DB/Auth) | Matches PRD §6 recommended stack; minimal ops |

## 4. Data model

The schema is the single source of truth (PRD §6 principle). The map layer only ever *references* it by `slug`.

```
concepts
  id                uuid pk
  slug              text unique        -- stable id used by map nodes and URLs
  title             text
  pali_term         text
  translation       text
  short_summary     text
  explanation       text               -- fuller teaching content
  category          text               -- e.g. "path-and-practice"
  difficulty_level  enum(foundational, intermediate, advanced)
  tags              text[]
  map_node_id       text nullable      -- FK-by-convention into the curated map; null = not on map yet
  created_at, updated_at

concept_relationships
  id                uuid pk
  from_concept_id   uuid fk -> concepts.id
  to_concept_id     uuid fk -> concepts.id
  relationship_type enum(related, prerequisite, derives_from)
  -- many-to-many, self-referencing; supports "A2 derives from both A and B" (PRD 4.3)

sources
  id                uuid pk
  concept_id        uuid fk -> concepts.id
  title             text
  url               text
  attribution       text               -- translator / publisher
  source_type       enum(sutta, commentary, translation, other)

quiz_questions
  id                uuid pk
  concept_id        uuid fk -> concepts.id
  question_text     text
  question_type     enum(multiple_choice, true_false, matching, short_answer)
  order             int

quiz_options
  id                uuid pk
  question_id       uuid fk -> quiz_questions.id
  option_text       text
  is_correct        boolean
  explanation       text               -- shown on incorrect answer (story 8)

-- Supabase-managed:
auth.users

user_profiles
  id                uuid pk fk -> auth.users.id
  display_name      text
  plan              enum(free, premium) default 'free'   -- future-proofs premium (PRD 4.7) without a redesign
  created_at

user_progress
  id                uuid pk
  user_id           uuid fk -> auth.users.id
  concept_id        uuid fk -> concepts.id
  status            enum(not_started, in_progress, learned)
  updated_at
  unique(user_id, concept_id)

quiz_attempts
  id                uuid pk
  user_id           uuid fk -> auth.users.id
  question_id       uuid fk -> quiz_questions.id
  is_correct        boolean
  attempted_at      timestamp
```

Notes:
- `concept_relationships` is deliberately generic (one table, a `relationship_type` enum) rather than separate "related" and "prerequisite" tables — it's the same shape of data (story 3, story 6), and one table keeps traversal queries simple.
- Progress and quiz data live in tables entirely separate from content (PRD §6 principle) — wiping and reseeding content never touches user data.
- `map_node_id` being nullable is what makes story 12 possible: a new concept can be inserted and get a working detail page immediately, and get wired into the hand-drawn map later, on the curator's own schedule (story 13).

## 5. Rendering strategy

Two rendering paths, matching the two-layer product concept (PRD §3):

**Map page (`/`)**
- The prototype (`input/dhamma-map.html`) is ported into React as a set of hand-authored SVG/CSS components (masthead, themed sections, arrows, flip cards, tooltips) — kept as close to the original markup/CSS as possible since the visual design is the point (story 1, story 13).
- Interactivity (tooltip on hover/tap, flip cards, keyboard nav, swipe, `prefers-reduced-motion`) ports over largely unchanged as client components — the prototype already implements all of this in vanilla JS.
- Each interactive map node carries a `data-concept-slug` and links to `/concepts/[slug]` (story 2) instead of an in-page tooltip-only interaction, where a concept record exists for it.
- Statically generated at build time (SSG); revalidated when concept content backing map nodes changes.

**Concept detail page (`/concepts/[slug]`)**
- One reusable `ConceptTemplate` component renders every concept from its DB record: title, Pali term, summary, explanation, related concepts, prerequisites/progression, "Read the source" section, quiz, mark-as-learned control (PRD 4.4, stories 3/4/5/6/8).
- Rendered with ISR (revalidate on content change) — fast loads (NFR: performance) without a rebuild per concept edit.
- This is what makes story 12 real: adding a concept is a database insert, not a new page.

## 6. API surface

Route handlers under `app/api/`:

| Route | Method | Purpose | Story |
|---|---|---|---|
| `/api/concepts` | GET | List concepts, filterable by category/difficulty/tag | 1, 15 |
| `/api/concepts/[slug]` | GET | Concept + relationships + sources + quiz, joined | 2–6, 14 |
| `/api/progress` | GET | Current user's progress across concepts | 7, 11 |
| `/api/progress` | POST | Mark a concept learned / in-progress / not-started | 7 |
| `/api/review` | GET | Ranked list of weak/unlearned concepts for the user | 9 |
| `/api/quiz/[conceptId]/attempt` | POST | Submit a quiz answer, returns correctness + explanation | 8 |

Auth (signup/login/session) is handled client-side via the Supabase SDK directly — no custom auth routes needed (story 10, 11).

**Review-queue logic (story 9)**, kept intentionally simple for MVP: a concept qualifies for review if `user_progress.status != 'learned'`, or if its most recent `quiz_attempts` for the user contain an incorrect answer. Ordered by least-recently-attempted. This avoids building a spaced-repetition engine (explicitly future-phase, PRD §8) while still satisfying the story's acceptance criteria.

## 7. Story-to-architecture traceability

| Story | Satisfied by |
|---|---|
| 1. Explore the concept map | Curated map component (§5) |
| 2. Navigate to concept detail | `map_node_id` → slug links, `/concepts/[slug]` route |
| 3. See concept connections | `concept_relationships` table, rendered in `ConceptTemplate` |
| 4. Read a clear explanation | `concepts.short_summary` / `.explanation` fields |
| 5. Read the source text | `sources` table, "Read the source" section |
| 6. Understand context/progression | `difficulty_level`, `prerequisite` relationship type |
| 7. Track learned concepts | `user_progress` table + POST `/api/progress` |
| 8. Check understanding with quizzes | `quiz_questions`/`quiz_options` + POST `/api/quiz/.../attempt` |
| 9. Review weak areas | GET `/api/review` heuristic over `user_progress` + `quiz_attempts` |
| 10. Create a free account | Supabase Auth signup, `user_profiles.plan = 'free'` |
| 11. Resume learning later | Supabase session + `/api/progress` on load |
| 12. Add concepts without redesign | Content DB is the source of truth; `ConceptTemplate` renders any record |
| 13. Maintain curated design while scaling | Map layer decoupled via nullable `map_node_id`; map is never generated from the DB |
| 14. Study content in context | Sources rendered inline in `ConceptTemplate`, no separate app/section |
| 15. Learn at sustainable pace | Filtering by category/difficulty in `/api/concepts`; progressive disclosure (summary → explanation → source → quiz) in the template |

## 8. Non-functional requirements

- **Accessibility**: the prototype already implements keyboard navigation, focus states, ARIA labels on SVG, and `prefers-reduced-motion` handling — carry these over verbatim during the React port rather than re-deriving them.
- **Maintainability**: static map and data model stay in separate codebases-within-the-repo (`/components/map` vs `/lib/content`); new concepts are DB rows, not code changes.
- **Performance**: ISR for concept pages, DB indexes on `concepts.slug`, `concept_relationships.from_concept_id/to_concept_id`; map page is fully static.
- **Trust**: `sources.attribution` is a required field at the schema level, not just a convention; content edits go through normal migration/seed review since content lives in version-controlled seed data, not an ad hoc CMS.

## 9. MVP build order

Matches PRD §7, sequenced by dependency:

1. Schema + seed data for the concepts already in the prototype (Three Marks, Four Noble Truths, Eightfold Path, etc.)
2. Port the static map, wire node clicks to `/concepts/[slug]`
3. `ConceptTemplate` (summary, explanation, related concepts, sources)
4. Supabase Auth (signup/login) + `user_profiles`
5. Mark-as-learned (`user_progress`)
6. Quiz (`quiz_questions`/`quiz_options`/`quiz_attempts`)
7. Review queue (`/api/review`)

## 10. Explicitly deferred (PRD §8)

Guided learning paths, spaced repetition, map filter views, flashcards, progress dashboards, and community features are out of scope for this architecture pass. The schema above doesn't block any of them — e.g. spaced repetition would add a `next_review_at` column to `user_progress` rather than a new subsystem — but building them now would be speculative.
