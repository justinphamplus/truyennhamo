import type { Metadata } from "next";

import { MarketingDeferredPage } from "@/components/admin/marketing/marketing-deferred-page";

export const metadata: Metadata = {
  title: "Thống kê Marketing | Admin Ruby Noir",
};

export default function AdminMarketingStatsPage() {
  return (
    <MarketingDeferredPage
      title="Thống kê Marketing"
      description="Shell chuẩn bị dashboard đo hiệu quả marketing. Chưa có analytics mutation hay tracking giả."
      sections={[
        {
          key: "analytics-funnel",
          title: "Giữ chỗ funnel",
          description:
            "Bảng thật sẽ chỉ mở sau khi có event tracking, attribution rule và campaign schema.",
          items: ["clicks", "reads", "conversion", "attribution"],
        },
      ]}
    />
  );
}
