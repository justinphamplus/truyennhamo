import type { Metadata } from "next";

import { MarketingDeferredPage } from "@/components/admin/marketing/marketing-deferred-page";

export const metadata: Metadata = {
  title: "Mã khuyến mãi | Admin Ruby Noir",
};

export default function AdminMarketingPromoCodesPage() {
  return (
    <MarketingDeferredPage
      title="Mã khuyến mãi"
      description="Shell chuẩn bị quản lý ưu đãi marketing. Phần này phụ thuộc payment/VIP trước khi có coupon thật."
      sections={[
        {
          key: "promo-contract",
          title: "Mã ưu đãi tạm hoãn",
          description:
            "Không có coupon mutation, tạo mã, áp dụng giảm giá hay chỉnh quyền VIP khi chưa có payment/VIP contract.",
          items: [
            "Phụ thuộc payment/VIP",
            "Phạm vi coupon",
            "Giới hạn đổi mã",
            "Nhật ký kiểm toán",
          ],
        },
      ]}
    />
  );
}
