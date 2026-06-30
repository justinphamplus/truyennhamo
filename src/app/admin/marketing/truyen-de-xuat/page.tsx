import type { Metadata } from "next";

import { FeaturedStoriesList } from "@/components/admin/marketing/featured-stories-list";

export const metadata: Metadata = {
  title: "Truyện đề xuất | Admin Ruby Noir",
};

export default function AdminMarketingFeaturedStoriesPage() {
  return <FeaturedStoriesList />;
}
