import Link from "next/link";

import { adminNavGroups, type AdminNavKey } from "@/components/admin/admin-nav";

type AdminSidebarProps = {
  activeSection: AdminNavKey;
};

export function AdminSidebar({ activeSection }: AdminSidebarProps) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link className="admin-brand" href="/admin" aria-label="Truyện Nhà Mò Admin">
          <span className="admin-brand-mark" aria-hidden="true">
            TN
          </span>
          <span>
            <strong>Truyện Nhà Mò</strong>
            <small>Admin</small>
          </span>
        </Link>
        <Link className="admin-public-link" href="/">
          <span className="material-symbols-rounded" aria-hidden="true">
            arrow_outward
          </span>
          Truy cập trang web
        </Link>
      </div>

      <nav className="admin-nav" aria-label="Điều hướng quản trị">
        {adminNavGroups.map((group) => (
          <section className="admin-nav-group" key={group.label}>
            <h2>{group.label}</h2>
            <ul>
              {group.items.map((item) => {
                const isActive = item.key === activeSection;

                return (
                  <li key={item.key}>
                    <Link
                      className={isActive ? "admin-nav-link is-active" : "admin-nav-link"}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="material-symbols-rounded" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
