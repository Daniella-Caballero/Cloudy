import Link from "next/link";
import { createNote } from "@/app/notes/actions";
import { NoteForm } from "@/app/notes/note-form";

type NewNotePageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewNotePage({ searchParams }: NewNotePageProps) {
  const { error } = await searchParams;

  return (
    <main className="editor-main">
      <Link className="back-link" href="/notes">← Volver a mis notas</Link>
      <p className="eyebrow">Una idea nueva</p>
      <h1>Escribe tu nota</h1>
      <NoteForm action={createNote} title="" error={error} />
    </main>
  );
}
