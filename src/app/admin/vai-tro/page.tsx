import type { Metadata } from "next";

import { DeferredAdminPage } from "@/components/admin/deferred-admin-page";

export const metadata: Metadata = {
  title: "Vai trò & phân quyền | Admin Ruby Noir",
};

export default function AdminRolesPage() {
  return (
    <DeferredAdminPage
      eyebrow="Quản lý người dùng"
      title="Vai trò & phân quyền"
      description="Phân quyền thật sẽ chỉ mở khi có role schema hoặc app_metadata policy rõ ràng."
      dependency="Cần bảng role/permission, audit log và rule cấp quyền server-side trước khi cho thao tác thật."
      contracts={[
        "Danh sách vai trò, phạm vi quyền và mô tả quyền.",
        "Mapping user-role lấy từ server, không tin flag admin từ browser.",
        "Audit người cấp quyền, người nhận quyền và thời điểm thay đổi.",
      ]}
    />
  );
}
