import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { Logo } from "@/components/ui/logo";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="admin-body">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <Logo light />
          <AdminNav />
          <form action={logout} className="mt-5">
            <button type="submit" className="admin-nav-link w-full border-0 bg-transparent text-left"><LogOut size={17} />Выйти</button>
          </form>
        </aside>
        <main className="admin-main"><div className="admin-content">{children}</div></main>
      </div>
    </div>
  );
}
