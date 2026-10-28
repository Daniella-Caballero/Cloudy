import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteNote, updateNote } from "@/app/notes/actions";
import { NoteForm } from "@/app/notes/note-form";
import { getNote } from "@/lib/notes";

type EditNotePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditNotePage({
  params,
  searchParams,
}: EditNotePageProps) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const note = await getNote(id);

  if (!note) {
    notFound();
  }

  return (
    <main className="editor-main">
      <Link className="back-link" href="/notes">← Volver a mis notas</Link>
      <p className="eyebrow">Tu espacio personal</p>
      <h1>Edita tu nota</h1>
      <NoteForm
        action={updateNote}
        noteId={note.id}
        title={note.title}
        body={note.body}
        error={error}
      />
      <form action={deleteNote} className="delete-form">
        <input type="hidden" name="id" value={note.id} />
        <button className="delete-button" type="submit">Borrar esta nota</button>
      </form>
    </main>
  );
}
