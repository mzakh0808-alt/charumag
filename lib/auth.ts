import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "more_chaya_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function secret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  if (process.env.VERCEL) throw new Error("SESSION_SECRET is required on Vercel");
  return "demo-only-session-secret-change-before-deploy";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export async function createAdminSession(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, expires: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS }),
  ).toString("base64url");
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      email: string;
      expires: number;
    };
    return session.expires > Math.floor(Date.now() / 1000) ? session : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function checkAdminCredentials(email: string, password: string) {
  if (process.env.VERCEL && (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD)) return false;
  const expectedEmail = process.env.ADMIN_EMAIL || "admin@more-chaya.demo";
  const expectedPassword = process.env.ADMIN_PASSWORD || "demo-admin-2026";
  const emailMatches = email.toLowerCase() === expectedEmail.toLowerCase();
  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expectedPassword);
  const passwordMatches =
    passwordBuffer.length === expectedBuffer.length && timingSafeEqual(passwordBuffer, expectedBuffer);
  return emailMatches && passwordMatches;
}
