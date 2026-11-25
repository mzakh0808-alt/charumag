import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/ui/logo";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Вход для администратора", robots: { index: false } };

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return (
    <main className="login-page">
      <div className="login-card">
        <Logo />
        <h1>Панель управления</h1>
        <p className="muted text-sm">Войдите, чтобы управлять демонстрационным сайтом.</p>
        <LoginForm showDemoCredentials={!process.env.VERCEL} />
        {!process.env.VERCEL ? (
          <div className="notice mt-6">
            Демодоступ уже заполнен в форме. Перед публикацией задайте свои переменные окружения и уберите подсказку.
          </div>
        ) : null}
      </div>
    </main>
  );
}
