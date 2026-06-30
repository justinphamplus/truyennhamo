import { AdminDashboard } from "@/components/admin/dashboard/admin-dashboard";
import {
  getAdminDashboardPayload,
  serializeAdminDashboardPayload,
} from "@/lib/admin/dashboard";

export default async function AdminPage() {
  const payload = await getAdminDashboardPayload();

  return (
    <>
      <script
        id="admin-dashboard-data"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: serializeAdminDashboardPayload(payload),
        }}
      />
      <AdminDashboard payload={payload} />
    </>
  );
}
