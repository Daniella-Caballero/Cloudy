import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/app/auth/auth-form";
import { signUpAction } from "@/app/auth/actions";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const { data: session } = await auth.getSession();
  if (session?.user) {
    redirect("/notes");
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="brand" href="/sign-up">
          Cloudy<span aria-hidden="true">✳</span>
        </Link>
        <p className="eyebrow">Un rinconcito para tus ideas</p>
        <h1>Empieza con una nota.</h1>
        <p className="auth-intro">Crea tu cuenta y guarda tus ideas en un lugar tranquilo.</p>
        <AuthForm action={signUpAction} mode="sign-up" />
      </section>
    </main>
  );
}
