import Link from "next/link";
import { getNotes } from "@/lib/notes";

type NotesPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";
  const notes = await getNotes(query.trim());

  return (
    <main className="notes-main">
      <div className="notes-heading">
        <div>
          <p className="eyebrow">Tu espacio personal</p>
          <h1>Mis notas</h1>
        </div>
        <Link className="button button-primary" href="/notes/new">
          <span aria-hidden="true">＋</span> Nueva nota
        </Link>
      </div>

      <form className="search-form" action="/notes" role="search">
        <label className="search-label" htmlFor="note-search">
          Buscar en mis notas
        </label>
        <div className="search-row">
          <input
            id="note-search"
            name="q"
            type="search"
            placeholder="Busca por título o texto…"
            defaultValue={query}
          />
          <button className="button button-soft" type="submit">
            Buscar
          </button>
          {query && (
            <Link className="button button-quiet" href="/notes">
              Limpiar
            </Link>
          )}
        </div>
      </form>

      {notes.length === 0 ? (
        <section className="empty-state">
          <span className="empty-flower" aria-hidden="true">✿</span>
          <h2>{query ? "No encontramos esa nota" : "Todavía no hay notas"}</h2>
          <p>
            {query
              ? "Prueba con otras palabras."
              : "Empieza por guardar esa idea que no quieres perder."}
          </p>
          {!query && (
            <Link className="text-link" href="/notes/new">
              Escribir mi primera nota
            </Link>
          )}
        </section>
      ) : (
        <section className="note-list" aria-label="Notas">
          {notes.map((note) => (
            <article className="note-card" key={note.id}>
              <Link className="note-card-link" href={`/notes/${note.id}`}>
                <div className="note-card-top">
                  <h2>{note.title}</h2>
                  <time dateTime={note.updatedAt.toISOString()}>
                    {formatDate(note.updatedAt)}
                  </time>
                </div>
                <p>{note.body || "Esta nota aún no tiene texto."}</p>
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
