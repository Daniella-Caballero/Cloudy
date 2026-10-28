import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/app/auth/auth-form";
import { signInAction } from "@/app/auth/actions";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const { data: session } = await auth.getSession();
  if (session?.user) {
    redirect("/notes");
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="brand" href="/sign-in">
          Cloudy<span aria-hidden="true">✳</span>
        </Link>
        <p className="eyebrow">Un rinconcito para tus ideas</p>
        <h1>Qué bueno verte.</h1>
        <p className="auth-intro">Entra para volver a tus notas.</p>
        <AuthForm action={signInAction} mode="sign-in" />
      </section>
    </main>
  );
}
