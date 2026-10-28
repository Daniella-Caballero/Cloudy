"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export type AuthFormState = {
  error: string | null;
};

export async function signInAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Escribe tu correo y tu contraseña." };
  }

  try {
    const { error } = await auth.signIn.email({ email, password });
    if (error) {
      return { error: "No se pudo iniciar sesión. Revisa tus datos e inténtalo de nuevo." };
    }
  } catch {
    return { error: "No se pudo conectar con el servicio de inicio de sesión." };
  }

  redirect("/notes");
}

export async function signUpAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (!email || !password) {
    return { error: "Completa todos los campos." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (password !== confirmation) {
    return { error: "Las contraseñas no coinciden." };
  }

  try {
    const { error } = await auth.signUp.email({
      email,
      name: email.split("@")[0],
      password,
    });
    if (error) {
      return { error: "No se pudo crear la cuenta. Puede que ese correo ya esté registrado." };
    }
  } catch {
    return { error: "No se pudo conectar con el servicio de registro." };
  }

  redirect("/notes");
}

export async function signOutAction() {
  await auth.signOut();
  redirect("/sign-in");
}
