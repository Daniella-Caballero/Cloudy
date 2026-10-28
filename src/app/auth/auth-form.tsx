"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthFormState } from "@/app/auth/actions";

type AuthFormProps = {
  action: (
    state: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  mode: "sign-in" | "sign-up";
};

const initialState: AuthFormState = { error: null };

export function AuthForm({ action, mode }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const isSignup = mode === "sign-up";

  return (
    <form className="form-card" action={formAction}>
      {isSignup && (
        <label className="field">
          <span>Correo electrónico</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      )}
      {!isSignup && (
        <label className="field">
          <span>Correo electrónico</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      )}
      <label className="field">
        <span>Contraseña</span>
        <input
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
          minLength={isSignup ? 8 : undefined}
        />
      </label>
      {isSignup && (
        <label className="field">
          <span>Repite la contraseña</span>
          <input
            name="confirmation"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </label>
      )}
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="button button-primary form-submit" disabled={pending}>
        {pending
          ? "Un momento…"
          : isSignup
            ? "Crear cuenta"
            : "Entrar"}
      </button>
      <p className="form-switch">
        {isSignup ? "¿Ya tienes cuenta? " : "¿Aún no tienes cuenta? "}
        <Link href={isSignup ? "/sign-in" : "/sign-up"}>
          {isSignup ? "Inicia sesión" : "Regístrate"}
        </Link>
      </p>
    </form>
  );
}
