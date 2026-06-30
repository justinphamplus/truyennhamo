import { notFound } from "next/navigation";

import { StoryChapterEditor } from "@/components/admin/stories/story-chapter-editor";
import { getAdminChapterEditor } from "@/lib/admin/stories";

type AdminChapterEditorPageProps = {
  params: Promise<{ id: string; chapterId: string }>;
};

export default async function AdminChapterEditorPage({
  params,
}: AdminChapterEditorPageProps) {
  const { id, chapterId } = await params;
  const storyId = Number(id);
  const resolvedChapterId = Number(chapterId);

  if (
    !Number.isInteger(storyId) ||
    storyId <= 0 ||
    !Number.isInteger(resolvedChapterId) ||
    resolvedChapterId <= 0
  ) {
    notFound();
  }

  const payload = await getAdminChapterEditor(storyId, resolvedChapterId);

  if (!payload) {
    notFound();
  }

  return <StoryChapterEditor payload={payload} />;
}
