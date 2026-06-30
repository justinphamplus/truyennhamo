import type { Metadata } from "next";

import { DeferredRevenuePage } from "@/components/admin/revenue/deferred-revenue-page";

export const metadata: Metadata = {
  title: "Thống kê doanh thu | Admin Ruby Noir",
};

export default function AdminRevenueStatsPage() {
  return (
    <DeferredRevenuePage
      title="Thống kê doanh thu"
      description="Trang này giữ contract thống kê cho payment ledger, chưa hiển thị số liệu doanh thu giả."
      dependency="Cần ledger giao dịch, mapping doanh thu theo truyện và username người đăng trước khi tính breakdown thật."
      contracts={[
        "Khoảng ngày, doanh thu theo ngày và nhãn tiền tệ.",
        "Breakdown theo truyện để phục vụ biên tập và đối soát.",
        "Breakdown theo username người đăng để chuẩn bị chia sẻ doanh thu.",
      ]}
      breakdowns={[
        {
          key: "stories",
          title: "Theo truyện",
          description: "Giữ chỗ cho revenueByStory trong AdminRevenueStatsPayload.",
          columns: ["storyId", "storyTitle", "revenueVnd", "revenueLabel"],
        },
        {
          key: "uploaders",
          title: "Theo username người đăng",
          description: "Giữ chỗ cho revenueByUploader trong AdminRevenueStatsPayload.",
          columns: ["username", "revenueVnd", "revenueLabel"],
        },
      ]}
    />
  );
}
