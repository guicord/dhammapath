# Deployment

## Live site

**https://dhammapath-mu.vercel.app** (Vercel project `guicord/dhammapath`; the plain `dhammapath.vercel.app` name was already taken, so Vercel assigned the `-mu` suffix).

## Infrastructure

- **Hosting**: Vercel, project `guicord/dhammapath`, GitHub repo `guicord/dhammapath` connected as the source.
- **Database**: Supabase Postgres, linked to the Vercel project via Supabase's native **"Connect to Vercel"** integration (not manually copied connection strings). That integration injected its own env vars directly into the Vercel project's **Production** environment only (not Preview/Development):
  - `POSTGRES_PRISMA_URL` — pooled connection (Supavisor transaction mode), used by the app at runtime.
  - `POSTGRES_URL_NON_POOLING` — direct/session-mode connection, used for migrations and seeding.
  - Plus various `SUPABASE_*`/`POSTGRES_*` vars not currently used by the app (the integration sets a standard bundle; only the two above are consumed today).
- **Local development is unaffected** — `.env`'s single `DATABASE_URL` (local Postgres via `brew services start postgresql@16`) is what every script falls back to when the Supabase vars aren't present.

## How the code picks the right connection

| File | Purpose | Env var preference |
|---|---|---|
| `lib/content/prisma.ts` | App runtime queries | `POSTGRES_PRISMA_URL` → falls back to `DATABASE_URL` |
| `prisma/seed.ts` | Seeding | `POSTGRES_URL_NON_POOLING` → falls back to `DATABASE_URL` |
| `prisma7.config.ts` | CLI (migrate, studio) | `POSTGRES_URL_NON_POOLING` → falls back to `DATABASE_URL` |

Migrations and seeding need the **direct** connection because Supavisor's transaction-pooling mode doesn't reliably support the operations they perform; runtime queries use the **pooled** connection so concurrent serverless function invocations don't exhaust Supabase's connection limit.

## The TLS gotcha (if this breaks again, read this first)

Supabase's certificate chain fails node-postgres's default strict TLS verification (`self-signed certificate in certificate chain`). The fix is in `lib/content/dbConnection.ts`'s `getPoolConfig()` — it rewrites `sslmode=no-verify` directly into the connection string before handing it to `@prisma/adapter-pg`.

**This is not optional and not obvious**: passing a separate `ssl: { rejectUnauthorized: false }` option *alongside* `connectionString` does **not** work, because node-postgres's `ConnectionParameters` re-parses `connectionString` and merges the parsed result *over* the rest of the config object (see `node_modules/pg/lib/connection-parameters.js`). Any `sslmode` already present in the URL (Supabase's URLs include `sslmode=require`) silently wins over an explicit `ssl` object passed next to it. The only way to reliably disable verification is to control `sslmode` in the URL itself.

## Build pipeline

`package.json`:
```json
"postinstall": "prisma generate",
"build": "prisma migrate deploy && prisma db seed && next build"
```

Every deploy: generates the Prisma client, applies any pending migrations, **re-seeds the database** (idempotent — safe to run every time, keeps `content/dhamma-concepts.ts` edits shipping automatically per story 12), then builds all 84 static concept pages.

## Deploy workflow

**Deploys are manual, not automatic.** `vercel git connect` was attempted to wire up deploy-on-push, but it fails via CLI with an unhelpful generic error, and `vercel project inspect` doesn't surface Git connection status to confirm either way. Rather than keep debugging an opaque CLI/dashboard mismatch, we settled on manual deploys as the known-working path:

```bash
cd /Users/gc/Dev/DhammaPath
npx vercel --prod
```

Takes ~3 minutes (install → generate → migrate → seed → build → deploy). Run this after pushing any commit you want live.

Revisiting true git-push auto-deploy is a cheap future check (one dashboard page: `https://vercel.com/guicord/dhammapath/settings/git`) — not urgent, deferred for now.

## Verifying a deployment

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://dhammapath-mu.vercel.app
curl -s -o /dev/null -w "%{http_code}\n" https://dhammapath-mu.vercel.app/concepts/anicca
curl -s -o /dev/null -w "%{http_code}\n" https://dhammapath-mu.vercel.app/concepts/does-not-exist
```

Expect `200`, `200`, `404`. If a deploy fails, check build logs with `npx vercel inspect <deployment-url> --logs` rather than guessing.

## Accounts involved

- GitHub: `guicord` (repo `guicord/dhammapath`)
- Vercel: logged in as `guicord` via `vercel login`
- Supabase: project created via the dashboard (not CLI-managed); connected to Vercel via Supabase's own integration
