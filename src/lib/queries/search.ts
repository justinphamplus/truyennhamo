import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type SearchStory = {
  id: number;
  slug: string;
  title: string;
  synopsis: string;
  coverImage: string | null;
  author: string;
  status: string;
  latestChapter: string;
  rank: number;
};

export type SearchPayload = {
  source: "supabase-rpc";
  query: string;
  results: SearchStory[];
  nextCursor: {
    rank: number;
    id: number;
  } | null;
};

type SearchCursor = {
  rank: number;
  id: number;
} | null;

const PAGE_SIZE = 8;

function formatChapter(chapterNumber: number | null) {
  if (chapterNumber === null) return "Chưa có chương";
  return `Chương ${String(chapterNumber).replace(".", ",")}`;
}

export async function searchStories(
  rawQuery: string,
  cursor: SearchCursor,
): Promise<SearchPayload> {
  const query = rawQuery.trim().slice(0, 120);

  if (!query) {
    return {
      source: "supabase-rpc",
      query: "",
      results: [],
      nextCursor: null,
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("search_stories", {
    search_query: query,
    cursor_rank: cursor?.rank,
    cursor_id: cursor?.id,
    page_size: PAGE_SIZE + 1,
  });

  if (error) {
    throw new Error(`Failed to search stories: ${error.message}`);
  }

  const visibleRows = data.slice(0, PAGE_SIZE);
  const lastVisibleRow = visibleRows.at(-1);

  return {
    source: "supabase-rpc",
    query,
    results: visibleRows.map((story) => ({
      id: story.id,
      slug: story.slug,
      title: story.title,
      synopsis: story.synopsis,
      coverImage: story.cover_path,
      author: story.author_name,
      status: story.story_status === "completed" ? "Hoàn tất" : "Đang ra",
      latestChapter: formatChapter(story.latest_chapter_number),
      rank: story.rank,
    })),
    nextCursor:
      data.length > PAGE_SIZE && lastVisibleRow
        ? {
            rank: lastVisibleRow.rank,
            id: lastVisibleRow.id,
          }
        : null,
  };
}
