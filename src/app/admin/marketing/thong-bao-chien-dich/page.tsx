import type { Metadata } from "next";

import { MarketingDeferredPage } from "@/components/admin/marketing/marketing-deferred-page";

export const metadata: Metadata = {
  title: "Thông báo chiến dịch | Admin Ruby Noir",
};

export default function AdminMarketingCampaignNotificationsPage() {
  return (
    <MarketingDeferredPage
      title="Thông báo chiến dịch"
      description="Shell chuẩn bị thông báo marketing theo campaign. Phần này phụ thuộc notification system trước khi gửi thật."
      sections={[
        {
          key: "notification-contract",
          title: "Thông báo tạm hoãn",
          description:
            "Không gửi thông báo giả, push/email hay lưu lịch gửi khi chưa có notification system và opt-in policy.",
          items: [
            "Phụ thuộc notification system",
            "Kênh push/email",
            "Nhóm người nhận",
            "Nhật ký gửi",
          ],
        },
      ]}
    />
  );
}
