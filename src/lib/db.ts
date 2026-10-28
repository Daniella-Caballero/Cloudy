import "server-only";

import { attachDatabasePool } from "@vercel/functions";
import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  cloudyPool?: Pool;
};

export const pool =
  globalForDatabase.cloudyPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.cloudyPool = pool;
}

if (process.env.VERCEL) {
  attachDatabasePool(pool);
}
