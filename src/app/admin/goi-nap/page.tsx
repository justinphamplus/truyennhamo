import type { Metadata } from "next";

import { DeferredRevenuePage } from "@/components/admin/revenue/deferred-revenue-page";

export const metadata: Metadata = {
  title: "Gói nạp | Admin Ruby Noir",
};

export default function AdminTopupPlansPage() {
  return (
    <DeferredRevenuePage
      title="Gói nạp"
      description="Gói nạp là module riêng cho sản phẩm Xu/Gold, tách khỏi gói VIP."
      dependency="Cần ledger tiền ảo, bảng sản phẩm nạp và policy giá trước khi bật tạo/sửa gói."
      contracts={[
        "Tên gói, số Xu/Gold nhận được và giá VND.",
        "Trạng thái hiển thị, thứ tự sắp xếp và thời hạn khuyến mãi.",
        "Mapping sang provider payment khi checkout.",
      ]}
    />
  );
}
