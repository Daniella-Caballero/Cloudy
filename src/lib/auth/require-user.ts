import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export async function requireUserId() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return session.user.id;
}
