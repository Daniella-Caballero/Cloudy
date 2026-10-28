import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/auth/actions";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function NotesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/notes">
          Cloudy<span aria-hidden="true">✳</span>
        </Link>
        <div className="account-tools">
          <span className="account-email">{session.user.email}</span>
          <form action={signOutAction}>
            <button className="button button-quiet" type="submit">
              Salir
            </button>
          </form>
        </div>
      </header>
      {children}
      <footer className="site-footer">Tus ideas, a buen recaudo.</footer>
    </div>
  );
}
