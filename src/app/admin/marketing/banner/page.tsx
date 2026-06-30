import type { Metadata } from "next";

import { BannerPlacementList } from "@/components/admin/marketing/banner-placement-list";

export const metadata: Metadata = {
  title: "Banner & vị trí hiển thị | Admin Ruby Noir",
};

export default function AdminMarketingBannerPage() {
  return <BannerPlacementList />;
}
