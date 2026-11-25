"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";

function Submit() {
  const { pending } = useFormStatus();
  return <button className="button button-primary w-full" type="submit" disabled={pending}>{pending ? "Входим…" : "Войти"}</button>;
}

export function LoginForm({ showDemoCredentials }: { showDemoCredentials: boolean }) {
  const [state, formAction] = useActionState(login, {});
  return (
    <form action={formAction} className="form-grid mt-6">
      {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
      <div className="field">
        <label htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" className="input" type="email" defaultValue={showDemoCredentials ? "admin@more-chaya.demo" : ""} autoComplete="username" required />
      </div>
      <div className="field">
        <label htmlFor="admin-password">Пароль</label>
        <input id="admin-password" name="password" className="input" type="password" defaultValue={showDemoCredentials ? "demo-admin-2026" : ""} autoComplete="current-password" required />
      </div>
      <Submit />
    </form>
  );
}
