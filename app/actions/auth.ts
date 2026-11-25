"use server";

import { redirect } from "next/navigation";
import { checkAdminCredentials, clearAdminSession, createAdminSession } from "@/lib/auth";

export interface LoginState { error?: string }

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!checkAdminCredentials(email, password)) {
    return { error: "Неверный email или пароль" };
  }
  await createAdminSession(email);
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}
