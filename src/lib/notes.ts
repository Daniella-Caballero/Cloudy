import "server-only";

import { pool } from "@/lib/db";
import { requireUserId } from "@/lib/auth/require-user";

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getNotes(search = "") {
  const userId = await requireUserId();
  const result = await pool.query<Note>(
    `SELECT id, title, body, created_at AS "createdAt", updated_at AS "updatedAt"
     FROM notes
     WHERE user_id = $1
       AND ($2 = '' OR title ILIKE '%' || $2 || '%' OR body ILIKE '%' || $2 || '%')
     ORDER BY updated_at DESC, id DESC`,
    [userId, search],
  );

  return result.rows;
}

export async function getNote(id: string) {
  if (!isUuid(id)) {
    return null;
  }

  const userId = await requireUserId();
  const result = await pool.query<Note>(
    `SELECT id, title, body, created_at AS "createdAt", updated_at AS "updatedAt"
     FROM notes
     WHERE id = $1 AND user_id = $2`,
    [id, userId],
  );

  return result.rows[0] ?? null;
}

export function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
