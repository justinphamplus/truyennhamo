import "server-only";

import { cache } from "react";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const CHAPTER_PAGE_SIZE = 12;

export type StoryChapter = {
  id: number;
  number: number;
  slug: string;
  title: string;
  label: string;
  accessLevel: "free" | "vip";
  coinPrice: number;
  isHot: boolean;
  publishedAt: string | null;
  wordCount: number;
};

export type StoryComment = {
  id: number;
  userId: string;
  authorName: string;
  authorInitial: string;
  body: string;
  createdAt: string;
  relativeTime: string;
  canMutate: boolean;
};

export type StoryDetailPayload = {
  source: "supabase";
  story: {
    id: number;
    slug: string;
    title: string;
    alternativeTitle: string | null;
    synopsis: string;
    coverImage: string | null;
    author: string;
    authorInitial: string;
    primaryGenre: string;
    genres: string[];
    status: string;
    isVip: boolean;
    rating: string;
    ratingCount: string;
    reads: string;
    follows: string;
    chapterCount: number;
    latestChapterNumber: number | null;
  };
  chapters: StoryChapter[];
  comments: StoryComment[];
  pagination: {
    hasPrevious: boolean;
    hasNext: boolean;
    previousCursor: number | null;
    nextCursor: number | null;
  };
};

export type ChapterCursorDirection = "before" | "after" | null;

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    notation: value >= 1_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatChapterNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
}

function formatRelativeTime(value: string) {
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 1000),
  );

  if (elapsedSeconds < 60) return "vừa xong";
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) return `${elapsedMinutes} phút trước`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours} giờ trước`;
  const elapsedDays = Math.floor(elapsedHours / 24);
  return `${elapsedDays} ngày trước`;
}

export const getStoryDetailBySlug = cache(
  async (
    slug: string,
    cursorDirection: ChapterCursorDirection = null,
    cursor: number | null = null,
  ): Promise<StoryDetailPayload | null> => {
    const supabase = await createServerSupabaseClient();

    const { data: story, error: storyError } = await supabase
      .from("stories")
      .select(`
        id,
        slug,
        title,
        alternative_title,
        synopsis,
        cover_path,
        story_status,
        is_vip,
        rating_average,
        rating_count,
        read_count,
        follow_count,
        chapter_count,
        latest_chapter_number,
        author:authors(name),
        story_genres(is_primary, genre:genres(name))
      `)
      .eq("slug", slug)
      .eq("publication_status", "published")
      .maybeSingle();

    if (storyError) {
      throw new Error(`Failed to load story detail: ${storyError.message}`);
    }

    if (!story) return null;

    let chapterQuery = supabase
      .from("chapters")
      .select(`
        id,
        chapter_number,
        slug,
        title,
        access_level,
        coin_price,
        is_hot,
        published_at,
        word_count
      `)
      .eq("story_id", story.id)
      .eq("publication_status", "published");

    if (cursor !== null && cursorDirection === "before") {
      chapterQuery = chapterQuery.lt("chapter_number", cursor);
    } else if (cursor !== null && cursorDirection === "after") {
      chapterQuery = chapterQuery.gt("chapter_number", cursor);
    }

    const ascending = cursorDirection === "after";
    const { data: chapterRows, error: chapterError } = await chapterQuery
      .order("chapter_number", { ascending })
      .limit(CHAPTER_PAGE_SIZE + 1);

    if (chapterError) {
      throw new Error(`Failed to load story chapters: ${chapterError.message}`);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: commentRows, error: commentError } = await supabase
      .from("comments")
      .select("id, user_id, body, created_at")
      .eq("story_id", story.id)
      .eq("status", "visible")
      .is("chapter_id", null)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(20);

    if (commentError) {
      throw new Error(`Failed to load story comments: ${commentError.message}`);
    }

    const commentUserIds = Array.from(
      new Set(commentRows.map((comment) => comment.user_id)),
    );
    const { data: profiles, error: profileError } = commentUserIds.length
      ? await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", commentUserIds)
      : { data: [], error: null };

    if (profileError) {
      throw new Error(`Failed to load comment profiles: ${profileError.message}`);
    }

    const profileNames = new Map(
      profiles.map((profile) => [profile.id, profile.display_name]),
    );

    const hasExtraRow = chapterRows.length > CHAPTER_PAGE_SIZE;
    const pageRows = chapterRows.slice(0, CHAPTER_PAGE_SIZE);
    if (ascending) pageRows.reverse();

    const chapters: StoryChapter[] = pageRows.map((chapter) => ({
      id: chapter.id,
      number: chapter.chapter_number,
      slug: chapter.slug,
      title: chapter.title,
      label: `Chương ${formatChapterNumber(chapter.chapter_number)}: ${chapter.title}`,
      accessLevel: chapter.access_level === "vip" ? "vip" : "free",
      coinPrice: chapter.coin_price,
      isHot: chapter.is_hot,
      publishedAt: chapter.published_at,
      wordCount: chapter.word_count,
    }));
    const comments: StoryComment[] = commentRows.map((comment) => {
      const authorName = profileNames.get(comment.user_id) ?? "Độc giả Ruby Noir";
      return {
        id: comment.id,
        userId: comment.user_id,
        authorName,
        authorInitial: authorName.trim().slice(0, 1).toUpperCase(),
        body: comment.body,
        createdAt: comment.created_at,
        relativeTime: formatRelativeTime(comment.created_at),
        canMutate: user?.id === comment.user_id,
      };
    });

    const primaryGenre =
      story.story_genres.find((item) => item.is_primary)?.genre?.name ??
      story.story_genres[0]?.genre?.name ??
      "Khác";
    const genres = story.story_genres
      .map((item) => item.genre?.name)
      .filter((name): name is string => Boolean(name));

    return {
      source: "supabase",
      story: {
        id: story.id,
        slug: story.slug,
        title: story.title,
        alternativeTitle: story.alternative_title,
        synopsis: story.synopsis,
        coverImage: story.cover_path,
        author: story.author.name,
        authorInitial: story.author.name.trim().slice(0, 1).toUpperCase(),
        primaryGenre,
        genres,
        status: story.story_status === "completed" ? "Hoàn tất" : "Đang ra",
        isVip: story.is_vip,
        rating: story.rating_average.toFixed(1),
        ratingCount: formatCompactNumber(story.rating_count),
        reads: formatCompactNumber(story.read_count),
        follows: formatCompactNumber(story.follow_count),
        chapterCount: story.chapter_count,
        latestChapterNumber: story.latest_chapter_number,
      },
      chapters,
      comments,
      pagination: {
        hasPrevious:
          cursor !== null &&
          (cursorDirection === "before" || hasExtraRow),
        hasNext: cursorDirection === "after" || hasExtraRow,
        previousCursor: chapters[0]?.number ?? null,
        nextCursor: chapters.at(-1)?.number ?? null,
      },
    };
  },
);
