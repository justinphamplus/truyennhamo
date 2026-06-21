import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type StoryReadingProgress = {
  chapterId: number;
  chapterSlug: string;
  chapterLabel: string;
  progressPercent: number;
  scrollOffset: number;
  lastReadAt: string;
};

export type ReadingHistoryItem = StoryReadingProgress & {
  storyId: number;
  storySlug: string;
  storyTitle: string;
  synopsis: string;
  coverImage: string | null;
  author: string;
};

function chapterLabel(number: number, title: string) {
  return `Chương ${String(number).replace(".", ",")}: ${title}`;
}

export async function getStoryReadingProgress(
  userId: string,
  storyId: number,
): Promise<StoryReadingProgress | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("reading_progress")
    .select(`
      chapter_id,
      progress_percent,
      scroll_offset,
      last_read_at,
      chapter:chapters!reading_progress_story_chapter_fkey(
        slug,
        chapter_number,
        title
      )
    `)
    .eq("user_id", userId)
    .eq("story_id", storyId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load reading progress: ${error.message}`);
  }

  if (!data) return null;

  return {
    chapterId: data.chapter_id,
    chapterSlug: data.chapter.slug,
    chapterLabel: chapterLabel(
      data.chapter.chapter_number,
      data.chapter.title,
    ),
    progressPercent: Number(data.progress_percent),
    scrollOffset: data.scroll_offset,
    lastReadAt: data.last_read_at,
  };
}

export async function getReadingHistory(
  userId: string,
): Promise<ReadingHistoryItem[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("reading_progress")
    .select(`
      story_id,
      chapter_id,
      progress_percent,
      scroll_offset,
      last_read_at,
      story:stories(
        slug,
        title,
        synopsis,
        cover_path,
        author:authors(name)
      ),
      chapter:chapters!reading_progress_story_chapter_fkey(
        slug,
        chapter_number,
        title
      )
    `)
    .eq("user_id", userId)
    .order("last_read_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load reading history: ${error.message}`);
  }

  return data.map((item) => ({
    storyId: item.story_id,
    storySlug: item.story.slug,
    storyTitle: item.story.title,
    synopsis: item.story.synopsis,
    coverImage: item.story.cover_path,
    author: item.story.author.name,
    chapterId: item.chapter_id,
    chapterSlug: item.chapter.slug,
    chapterLabel: chapterLabel(
      item.chapter.chapter_number,
      item.chapter.title,
    ),
    progressPercent: Number(item.progress_percent),
    scrollOffset: item.scroll_offset,
    lastReadAt: item.last_read_at,
  }));
}
