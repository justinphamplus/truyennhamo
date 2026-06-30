import type { Metadata } from "next";

import { MarketingDeferredPage } from "@/components/admin/marketing/marketing-deferred-page";

export const metadata: Metadata = {
  title: "Tổng quan Marketing | Admin Ruby Noir",
};

export default function AdminMarketingPage() {
  return (
    <MarketingDeferredPage
      title="Tổng quan Marketing"
      description="Tổng quan marketing đang ở trạng thái shell để chốt IA trước khi có campaign, banner và tracking thật."
      sections={[
        {
          key: "active-campaigns",
          title: "Campaign đang chạy",
          description: "Giữ chỗ cho danh sách campaign live/scheduled khi schema sự kiện sẵn sàng.",
          items: ["Tên campaign", "Trạng thái", "Thời gian chạy"],
        },
        {
          key: "upcoming-banners",
          title: "Banner sắp tới",
          description: "Giữ chỗ cho banner theo vị trí hiển thị trước khi có upload và placement rules.",
          items: ["Vị trí hiển thị", "Thời gian bật", "Trạng thái duyệt"],
        },
        {
          key: "upcoming-events",
          title: "Sự kiện sắp tới",
          description: "Giữ chỗ cho lịch event marketing và landing target.",
          items: ["Tên sự kiện", "Ngày bắt đầu", "Landing target"],
        },
      ]}
    />
  );
}
