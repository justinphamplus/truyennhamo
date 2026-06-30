import type { Metadata } from "next";

import { DeferredRevenuePage } from "@/components/admin/revenue/deferred-revenue-page";

export const metadata: Metadata = {
  title: "Giao dịch | Admin Ruby Noir",
};

export default function AdminTransactionsPage() {
  return (
    <DeferredRevenuePage
      title="Giao dịch"
      description="Danh sách giao dịch sẽ nối payment ledger khi phase thanh toán bắt đầu."
      dependency="Cần bảng giao dịch, provider thanh toán, trạng thái đối soát và rule hoàn tiền trước khi cho thao tác thật."
      contracts={[
        "Mã giao dịch, người dùng, số tiền và loại tiền tệ.",
        "Trạng thái pending, paid, failed, refunded.",
        "Thời điểm tạo, thanh toán và đối soát.",
      ]}
    />
  );
}
