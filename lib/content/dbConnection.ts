import type { PoolConfig } from "pg";

/**
 * Builds the pg.PoolConfig for @prisma/adapter-pg. When connecting through
 * Supabase's pooler, node-postgres's default strict TLS verification rejects
 * Supabase's certificate chain ("self-signed certificate in certificate
 * chain") — Supabase's own guidance for Node/Prisma clients is to disable
 * chain verification while keeping the connection encrypted.
 *
 * This can't be done by passing a separate `ssl` option alongside
 * `connectionString`: node-postgres's ConnectionParameters re-parses
 * `connectionString` and merges it *over* the rest of the config object
 * (see pg/lib/connection-parameters.js), so a connection string containing
 * `sslmode=require` silently clobbers any explicit `ssl` override. Instead,
 * `sslmode=no-verify` is rewritten directly into the URL, which
 * pg-connection-string's own parser turns into `rejectUnauthorized: false`.
 *
 * Local Postgres has no TLS at all, so this only applies when a Supabase
 * env var is actually present.
 */
export function getPoolConfig(supabaseUrl: string | undefined, localUrl: string | undefined): PoolConfig {
  if (!supabaseUrl) return { connectionString: localUrl };
  const url = new URL(supabaseUrl);
  url.searchParams.set("sslmode", "no-verify");
  return { connectionString: url.toString() };
}
