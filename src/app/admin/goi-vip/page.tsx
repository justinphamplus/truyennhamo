import type { Metadata } from "next";

import { DeferredRevenuePage } from "@/components/admin/revenue/deferred-revenue-page";

export const metadata: Metadata = {
  title: "Gói VIP | Admin Ruby Noir",
};

export default function AdminVipPlansPage() {
  return (
    <DeferredRevenuePage
      title="Gói VIP"
      description="Gói VIP là module entitlement riêng, không dùng chung contract với gói nạp."
      dependency="Cần bảng entitlement, thời hạn VIP, rule gia hạn và quyền đọc chương VIP trước khi bật mutation."
      contracts={[
        "Tên gói VIP, thời hạn ngày/tháng và giá.",
        "Quyền lợi mở khóa chương VIP và ưu đãi kèm theo.",
        "Trạng thái bán, gia hạn và hết hạn entitlement.",
      ]}
    />
  );
}
