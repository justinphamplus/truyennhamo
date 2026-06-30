import type { ReactNode } from "react";

import type { AdminNavKey } from "@/components/admin/admin-nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

type AdminShellProps = {
  activeSection: AdminNavKey;
  adminEmail: string;
  children: ReactNode;
  title: string;
};

export function AdminShell({
  activeSection,
  adminEmail,
  children,
  title,
}: AdminShellProps) {
  return (
    <div className="admin-shell" data-admin-shell>
      <AdminSidebar activeSection={activeSection} />
      <div className="admin-workspace">
        <AdminTopbar adminEmail={adminEmail} title={title} />
        <main className="admin-main">{children}</main>
        <footer className="admin-footer" data-admin-footer>
          <span>© 2026 Truyện Nhà Mò Admin.</span>
          <span>Phiên bản 1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
