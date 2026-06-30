import type { Metadata } from "next";

import { DeferredAdminPage } from "@/components/admin/deferred-admin-page";

export const metadata: Metadata = {
  title: "Thông báo | Admin Ruby Noir",
};

export default function AdminNotificationsPage() {
  return (
    <DeferredAdminPage
      eyebrow="Cấu hình hệ thống"
      title="Thông báo"
      description="Thông báo hệ thống đang ở trạng thái chuẩn bị, chưa gửi message thật tới người dùng."
      dependency="Cần notification schema, kênh gửi, template, trạng thái delivery và opt-out policy trước khi bật mutation."
      contracts={[
        "Template thông báo, kênh gửi và nhóm người nhận.",
        "Trạng thái draft, scheduled, sent, failed.",
        "Log gửi và thống kê delivery/read khi backend sẵn sàng.",
      ]}
    />
  );
}
