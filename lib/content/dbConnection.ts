import type { PoolConfig } from "pg";

/**
 * Builds the pg.PoolConfig for @prisma/adapter-pg. When connecting through
 * Supabase's pooler, node-postgres's default strict TLS verification rejects
 * Supabase's certificate chain ("self-signed certificate in certificate
 * chain") — Supabase's own guidance for Node/Prisma clients is to disable
 * chain verification while keeping the connection encrypted. Local Postgres
 * has no TLS at all, so this override only applies when a Supabase env var
 * is actually present.
 */
export function getPoolConfig(supabaseUrl: string | undefined, localUrl: string | undefined): PoolConfig {
  if (supabaseUrl) {
    return { connectionString: supabaseUrl, ssl: { rejectUnauthorized: false } };
  }
  return { connectionString: localUrl };
}
