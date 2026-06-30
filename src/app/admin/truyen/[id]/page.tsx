import { notFound } from "next/navigation";

import { AdminStoryDetail } from "@/components/admin/stories/admin-story-detail";
import { getAdminStoryDetail } from "@/lib/admin/stories";

type AdminStoryDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminStoryDetailPage({
  params,
}: AdminStoryDetailPageProps) {
  const { id } = await params;
  const storyId = Number(id);

  if (!Number.isInteger(storyId) || storyId <= 0) {
    notFound();
  }

  const payload = await getAdminStoryDetail(storyId);

  if (!payload) {
    notFound();
  }

  return <AdminStoryDetail payload={payload} />;
}
