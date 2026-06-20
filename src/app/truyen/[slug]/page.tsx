import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrototypeShell } from "@/components/prototype-shell";
import {
  getStoryDetailBySlug,
  type ChapterCursorDirection,
} from "@/lib/queries/story-detail";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ before?: string; after?: string }>;
};

export const dynamic = "force-dynamic";

function parseChapterCursor(searchParams: {
  before?: string;
  after?: string;
}): {
  direction: ChapterCursorDirection;
  value: number | null;
} {
  const rawValue = searchParams.before ?? searchParams.after;
  const value = rawValue ? Number(rawValue) : null;

  if (value === null || !Number.isFinite(value) || value <= 0) {
    return { direction: null, value: null };
  }

  return {
    direction: searchParams.before ? "before" : "after",
    value,
  };
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getStoryDetailBySlug(slug);

  if (!payload) {
    return { title: "Không tìm thấy truyện | Ruby Noir" };
  }

  return {
    title: `${payload.story.title} | Ruby Noir`,
    description: payload.story.synopsis,
  };
}

export default async function StoryPage({
  params,
  searchParams,
}: StoryPageProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const cursor = parseChapterCursor(resolvedSearchParams);
  const storyDetail = await getStoryDetailBySlug(
    slug,
    cursor.direction,
    cursor.value,
  );

  if (!storyDetail) notFound();

  return <PrototypeShell page="story" storyDetail={storyDetail} />;
}
