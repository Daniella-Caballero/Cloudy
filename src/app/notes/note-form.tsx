import Link from "next/link";

type NoteFormProps = {
  action: (formData: FormData) => Promise<void>;
  title: string;
  body?: string;
  noteId?: string;
  error?: string;
};

export function NoteForm({ action, title, body = "", noteId, error }: NoteFormProps) {
  return (
    <form className="note-editor" action={action}>
      {noteId && <input type="hidden" name="id" value={noteId} />}
      {error === "title" && (
        <p className="form-error" role="alert">
          La nota necesita un título.
        </p>
      )}
      <label className="field">
        <span>Título</span>
        <input
          name="title"
          type="text"
          required
          maxLength={160}
          defaultValue={title}
          autoFocus
        />
      </label>
      <label className="field">
        <span>Texto</span>
        <textarea name="body" rows={14} defaultValue={body} />
      </label>
      <div className="editor-actions">
        <button className="button button-primary" type="submit">
          Guardar
        </button>
        <Link className="button button-quiet" href="/notes">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
