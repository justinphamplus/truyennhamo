import "server-only";

import { cache } from "react";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ReaderChapterLink = {
  slug: string;
  label: string;
  number: number;
  accessLevel: "free" | "vip";
};

export type ReaderPayload = {
  source: "supabase";
  story: {
    id: number;
    slug: string;
    title: string;
  };
  chapter: {
    id: number;
    slug: string;
    number: number;
    title: string;
    label: string;
    accessLevel: "free" | "vip";
    coinPrice: number;
    wordCount: number;
    content: string | null;
    contentFormat: string | null;
    isLocked: boolean;
  };
  chapters: ReaderChapterLink[];
  previous: ReaderChapterLink | null;
  next: ReaderChapterLink | null;
};

function formatChapterNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
}

function toChapterLabel(number: number, title: string) {
  return `Chương ${formatChapterNumber(number)}: ${title}`;
}

export const getReaderData = cache(
  async (
    storySlug: string,
    chapterSlug: string,
  ): Promise<ReaderPayload | null> => {
    const supabase = await createServerSupabaseClient();

    const { data: story, error: storyError } = await supabase
      .from("stories")
      .select("id, slug, title")
      .eq("slug", storySlug)
      .eq("publication_status", "published")
      .maybeSingle();

    if (storyError) {
      throw new Error(`Failed to load reader story: ${storyError.message}`);
    }

    if (!story) return null;

    const { data: targetChapter, error: chapterError } = await supabase
      .from("chapters")
      .select(`
        id,
        slug,
        chapter_number,
        title,
        access_level,
        coin_price,
        word_count
      `)
      .eq("story_id", story.id)
      .eq("slug", chapterSlug)
      .eq("publication_status", "published")
      .maybeSingle();

    if (chapterError) {
      throw new Error(`Failed to load reader chapter: ${chapterError.message}`);
    }

    if (!targetChapter) return null;

    const { data: chapterRows, error: chapterListError } = await supabase
      .from("chapters")
      .select("slug, chapter_number, title, access_level")
      .eq("story_id", story.id)
      .eq("publication_status", "published")
      .order("chapter_number", { ascending: true });

    if (chapterListError) {
      throw new Error(`Failed to load reader chapter list: ${chapterListError.message}`);
    }

    let content: string | null = null;
    let contentFormat: string | null = null;

    if (targetChapter.access_level === "free") {
      const { data: chapterContent, error: contentError } = await supabase
        .from("chapter_contents")
        .select("content, content_format")
        .eq("chapter_id", targetChapter.id)
        .maybeSingle();

      if (contentError) {
        throw new Error(`Failed to load chapter content: ${contentError.message}`);
      }

      content = chapterContent?.content ?? null;
      contentFormat = chapterContent?.content_format ?? null;
    }

    const chapters: ReaderChapterLink[] = chapterRows.map((chapter) => ({
      slug: chapter.slug,
      number: chapter.chapter_number,
      label: toChapterLabel(chapter.chapter_number, chapter.title),
      accessLevel: chapter.access_level === "vip" ? "vip" : "free",
    }));
    const activeIndex = chapters.findIndex(
      (chapter) => chapter.slug === targetChapter.slug,
    );
    const accessLevel =
      targetChapter.access_level === "vip" ? "vip" : "free";

    return {
      source: "supabase",
      story: {
        id: story.id,
        slug: story.slug,
        title: story.title,
      },
      chapter: {
        id: targetChapter.id,
        slug: targetChapter.slug,
        number: targetChapter.chapter_number,
        title: targetChapter.title,
        label: toChapterLabel(
          targetChapter.chapter_number,
          targetChapter.title,
        ),
        accessLevel,
        coinPrice: targetChapter.coin_price,
        wordCount: targetChapter.word_count,
        content,
        contentFormat,
        isLocked: accessLevel === "vip",
      },
      chapters,
      previous: activeIndex > 0 ? chapters[activeIndex - 1] : null,
      next:
        activeIndex >= 0 && activeIndex < chapters.length - 1
          ? chapters[activeIndex + 1]
          : null,
    };
  },
);
