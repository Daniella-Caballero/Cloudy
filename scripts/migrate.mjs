import { readFile } from "node:fs/promises";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Falta DATABASE_URL_UNPOOLED o DATABASE_URL en .env.local.");
}

const pool = new Pool({ connectionString, max: 1 });

try {
  const migration = await readFile(
    new URL("../db/migrations/0001_create_notes.sql", import.meta.url),
    "utf8",
  );
  await pool.query(migration);
  process.stdout.write("Migración aplicada: tabla notes e índice de usuario/fecha.\n");
} finally {
  await pool.end();
}
