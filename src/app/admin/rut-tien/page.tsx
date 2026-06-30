import type { Metadata } from "next";

import { DeferredRevenuePage } from "@/components/admin/revenue/deferred-revenue-page";

export const metadata: Metadata = {
  title: "Rút tiền | Admin Ruby Noir",
};

export default function AdminWithdrawalsPage() {
  return (
    <DeferredRevenuePage
      title="Rút tiền"
      description="Luồng rút tiền sẽ chỉ mở khi có ledger doanh thu và quy trình duyệt payout."
      dependency="Cần số dư tác giả/uploader, thông tin payout, trạng thái duyệt và audit log trước khi xử lý thật."
      contracts={[
        "Người yêu cầu, số tiền, tài khoản nhận và ghi chú duyệt.",
        "Trạng thái requested, reviewing, approved, rejected, paid.",
        "Dấu vết audit cho người duyệt và thời điểm chuyển trạng thái.",
      ]}
    />
  );
}
