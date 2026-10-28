"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/auth/require-user";
import { pool } from "@/lib/db";
import { isUuid } from "@/lib/notes";

export async function createNote(formData: FormData) {
  const userId = await requireUserId();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");

  if (!title) {
    redirect("/notes/new?error=title");
  }

  await pool.query(
    "INSERT INTO notes (user_id, title, body) VALUES ($1, $2, $3)",
    [userId, title, body],
  );
  revalidatePath("/notes");
  redirect("/notes");
}

export async function updateNote(formData: FormData) {
  const userId = await requireUserId();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");

  if (!isUuid(id)) {
    redirect("/notes");
  }
  if (!title) {
    redirect(`/notes/${id}?error=title`);
  }

  const result = await pool.query(
    `UPDATE notes
     SET title = $1, body = $2, updated_at = now()
     WHERE id = $3 AND user_id = $4`,
    [title, body, id, userId],
  );

  if (result.rowCount === 0) {
    redirect("/notes");
  }

  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  redirect("/notes");
}

export async function deleteNote(formData: FormData) {
  const userId = await requireUserId();
  const id = String(formData.get("id") ?? "");

  if (isUuid(id)) {
    await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);
  }

  revalidatePath("/notes");
  redirect("/notes");
}
