import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type LibraryStory = {
  id: number;
  slug: string;
  title: string;
  synopsis: string;
  coverImage: string | null;
  author: string;
  status: string;
  latestChapter: string;
  savedAt: string;
};

function formatChapter(value: number | null) {
  return value === null
    ? "Chưa có chương"
    : `Chương ${String(value).replace(".", ",")}`;
}

export async function isStoryBookmarked(
  userId: string,
  storyId: number,
): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("story_id")
    .eq("user_id", userId)
    .eq("story_id", storyId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load bookmark state: ${error.message}`);
  }

  return Boolean(data);
}

export async function getBookmarkedStories(
  userId: string,
): Promise<LibraryStory[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      created_at,
      story:stories(
        id,
        slug,
        title,
        synopsis,
        cover_path,
        story_status,
        latest_chapter_number,
        author:authors(name)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load user library: ${error.message}`);
  }

  return data.map((bookmark) => ({
    id: bookmark.story.id,
    slug: bookmark.story.slug,
    title: bookmark.story.title,
    synopsis: bookmark.story.synopsis,
    coverImage: bookmark.story.cover_path,
    author: bookmark.story.author.name,
    status:
      bookmark.story.story_status === "completed" ? "Hoàn tất" : "Đang ra",
    latestChapter: formatChapter(bookmark.story.latest_chapter_number),
    savedAt: bookmark.created_at,
  }));
}
