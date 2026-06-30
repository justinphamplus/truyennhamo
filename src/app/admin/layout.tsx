import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin | Ruby Noir",
  description: "Khu vuc quan tri noi dung va van hanh Ruby Noir.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminUser = await requireAdminUser();

  return (
    <AdminShell activeSection="overview" adminEmail={adminUser.email} title="Bảng điều khiển">
      {children}
    </AdminShell>
  );
}
