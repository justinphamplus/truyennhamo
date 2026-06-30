import type { Metadata } from "next";

import { MarketingDeferredPage } from "@/components/admin/marketing/marketing-deferred-page";

export const metadata: Metadata = {
  title: "Sự kiện | Admin Ruby Noir",
};

export default function AdminMarketingEventsPage() {
  return (
    <MarketingDeferredPage
      title="Sự kiện"
      description="Sự kiện marketing đang là list shell cho campaign theo thời gian, chưa tạo dữ liệu thật."
      sections={[
        {
          key: "event-list",
          title: "Danh sách sự kiện",
          description: "Bảng thật sẽ chỉ mở sau khi có campaign schema, audit và trạng thái lịch chạy.",
          items: ["draft", "scheduled", "live", "ended"],
        },
      ]}
    />
  );
}
