import "server-only";

import { cache } from "react";

import { requireAdminUser } from "@/lib/admin/auth";
import {
  type AdminStoryProductionType,
  type AdminStoryStatus,
} from "@/lib/admin/validators";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

const statusLabels: Record<AdminStoryStatus, string> = {
  draft: "Bản nháp",
  published: "Đã xuất bản",
  archived: "Đã lưu trữ",
};

const productionTypeLabels: Record<AdminStoryProductionType, string> = {
  self_produced: "Tự sản xuất",
  licensed_translation: "Truyện dịch đã mua bản quyền",
};

type AdminStoryRow = {
  id: number;
  slug: string;
  title: string;
  synopsis: string;
  cover_path: string | null;
  publication_status: string;
  story_status: string;
  read_count: number;
  follow_count: number;
  chapter_count: number;
  latest_chapter_number: number | null;
  latest_published_at: string | null;
  published_at: string | null;
  updated_at: string;
  author: { id: number; name: string; slug: string } | null;
  story_genres: Array<{
    is_primary: boolean;
    genre: { id: number; name: string; slug: string } | null;
  }>;
};

type AdminChapterRow = {
  id: number;
  story_id?: number;
  chapter_number: number;
  slug: string;
  title: string;
  access_level: string;
  publication_status: string;
  published_at: string | null;
  word_count: number;
};

type AdminChapterContentRow = {
  content: string;
  content_format: string;
};

export type AdminStoryListFilters = {
  q: string;
  status: "all" | AdminStoryStatus;
  productionType: "all" | AdminStoryProductionType;
  uploader: string;
};

export type AdminStoryListItem = {
  id: number;
  slug: string;
  title: string;
  synopsis: string;
  authorName: string;
  primaryGenre: string;
  genreNames: string[];
  publicationStatus: AdminStoryStatus;
  publicationStatusLabel: string;
  productionType: AdminStoryProductionType;
  productionTypeLabel: string;
  uploaderUsername: string | null;
  uploaderLabel: string;
  readCountLabel: string;
  chapterCountLabel: string;
  latestChapterLabel: string;
  updatedAtLabel: string;
  publicHref: string | null;
};

export type AdminStoryDetailPayload = {
  story: AdminStoryListItem & {
    coverPath: string | null;
    storyStatusLabel: string;
    followCountLabel: string;
    publishedAt: string | null;
  };
  chapters: Array<{
    id: number;
    number: number;
    title: string;
    slug: string;
    accessLevel: string;
    publicationStatusLabel: string;
    publishedAtLabel: string;
    wordCountLabel: string;
  }>;
};

export type AdminChapterEditorPayload = {
  story: {
    id: number;
    slug: string;
    title: string;
    publicationStatus: AdminStoryStatus;
    publicationStatusLabel: string;
  };
  chapter: {
    id: number;
    number: number;
    title: string;
    slug: string;
    accessLevel: "free" | "vip";
    publicationStatus: AdminStoryStatus;
    publicationStatusLabel: string;
    publishedAt: string | null;
    publishedAtLabel: string;
    wordCount: number;
    wordCountLabel: string;
    body: string;
    contentFormat: string;
  };
};

function asStoryStatus(value: string): AdminStoryStatus {
  if (value === "draft" || value === "archived") return value;
  return "published";
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function includesSearch(value: string, query: string) {
  return normalizeSearch(value).includes(query);
}

function formatInteger(value: number) {
  return value.toLocaleString("vi-VN");
}

function formatDateTime(value: string | null) {
  if (!value) return "Chưa đặt";

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatRelativeTime(value: string) {
  const elapsedMinutes = Math.max(
    1,
    Math.round((Date.now() - new Date(value).getTime()) / 60_000),
  );

  if (elapsedMinutes < 60) return `${elapsedMinutes} phút trước`;

  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours} giờ trước`;

  return `${Math.round(elapsedHours / 24)} ngày trước`;
}

function formatChapterNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
}

function getPrimaryGenre(row: AdminStoryRow) {
  return (
    row.story_genres.find((item) => item.is_primary)?.genre?.name ??
    row.story_genres[0]?.genre?.name ??
    "Khác"
  );
}

function getGenreNames(row: AdminStoryRow) {
  return row.story_genres
    .map((item) => item.genre?.name)
    .filter((name): name is string => Boolean(name));
}

function getProductionType(row: AdminStoryRow): AdminStoryProductionType {
  // ponytail: replace with a real column/table when production type storage lands.
  return row.author?.name === "Nhà Mò Studio"
    ? "self_produced"
    : "licensed_translation";
}

function toStoryListItem(row: AdminStoryRow): AdminStoryListItem {
  const publicationStatus = asStoryStatus(row.publication_status);
  const productionType = getProductionType(row);
  const latestChapterLabel =
    row.latest_chapter_number === null
      ? "Chưa có chương"
      : `Chương ${formatChapterNumber(row.latest_chapter_number)}`;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    synopsis: row.synopsis,
    authorName: row.author?.name ?? "Không rõ",
    primaryGenre: getPrimaryGenre(row),
    genreNames: getGenreNames(row),
    publicationStatus,
    publicationStatusLabel: statusLabels[publicationStatus],
    productionType,
    productionTypeLabel: productionTypeLabels[productionType],
    uploaderUsername: null,
    uploaderLabel: "Chưa gán",
    readCountLabel: `${formatInteger(row.read_count)} lượt đọc`,
    chapterCountLabel: `${formatInteger(row.chapter_count)} chương`,
    latestChapterLabel,
    updatedAtLabel: formatRelativeTime(row.updated_at),
    publicHref:
      publicationStatus === "published" ? `/truyen/${row.slug}` : null,
  };
}

export const getAdminStoryList = cache(
  async (filters: AdminStoryListFilters) => {
    await requireAdminUser();

    const { data, error } = await getAdminSupabaseClient()
      .from("stories")
      .select(`
        id,
        slug,
        title,
        synopsis,
        cover_path,
        publication_status,
        story_status,
        read_count,
        follow_count,
        chapter_count,
        latest_chapter_number,
        latest_published_at,
        published_at,
        updated_at,
        author:authors(id, name, slug),
        story_genres(is_primary, genre:genres(id, name, slug))
      `)
      .order("updated_at", { ascending: false })
      .order("id", { ascending: true });

    if (error) {
      throw new Error(`Failed to load admin stories: ${error.message}`);
    }

    const stories = (data as AdminStoryRow[]).map(toStoryListItem);
    const q = normalizeSearch(filters.q);
    const uploader = normalizeSearch(filters.uploader);
    const filteredStories = stories.filter((story) => {
      if (filters.status !== "all" && story.publicationStatus !== filters.status) {
        return false;
      }

      if (
        filters.productionType !== "all" &&
        story.productionType !== filters.productionType
      ) {
        return false;
      }

      if (
        q &&
        ![story.title, story.slug, story.authorName, story.primaryGenre].some(
          (value) => includesSearch(value, q),
        )
      ) {
        return false;
      }

      if (uploader && !includesSearch(story.uploaderLabel, uploader)) {
        return false;
      }

      return true;
    });

    return {
      filters,
      stories: filteredStories,
      totalCount: stories.length,
      statusCounts: {
        all: stories.length,
        draft: stories.filter((story) => story.publicationStatus === "draft").length,
        published: stories.filter((story) => story.publicationStatus === "published").length,
        archived: stories.filter((story) => story.publicationStatus === "archived").length,
      },
    };
  },
);

export const getAdminStoryDetail = cache(
  async (storyId: number): Promise<AdminStoryDetailPayload | null> => {
    await requireAdminUser();

    const supabase = getAdminSupabaseClient();
    const { data: story, error: storyError } = await supabase
      .from("stories")
      .select(`
        id,
        slug,
        title,
        synopsis,
        cover_path,
        publication_status,
        story_status,
        read_count,
        follow_count,
        chapter_count,
        latest_chapter_number,
        latest_published_at,
        published_at,
        updated_at,
        author:authors(id, name, slug),
        story_genres(is_primary, genre:genres(id, name, slug))
      `)
      .eq("id", storyId)
      .maybeSingle();

    if (storyError) {
      throw new Error(`Failed to load admin story detail: ${storyError.message}`);
    }

    if (!story) return null;

    const { data: chapters, error: chapterError } = await supabase
      .from("chapters")
      .select(`
        id,
        chapter_number,
        slug,
        title,
        access_level,
        publication_status,
        published_at,
        word_count
      `)
      .eq("story_id", storyId)
      .order("chapter_number", { ascending: false })
      .limit(5);

    if (chapterError) {
      throw new Error(`Failed to load admin story chapters: ${chapterError.message}`);
    }

    const row = story as AdminStoryRow;
    const listItem = toStoryListItem(row);

    return {
      story: {
        ...listItem,
        coverPath: row.cover_path,
        storyStatusLabel: row.story_status === "completed" ? "Hoàn tất" : "Đang ra",
        followCountLabel: `${formatInteger(row.follow_count)} theo dõi`,
        publishedAt: row.published_at,
      },
      chapters: (chapters as AdminChapterRow[]).map((chapter) => ({
        id: chapter.id,
        number: chapter.chapter_number,
        title: chapter.title,
        slug: chapter.slug,
        accessLevel: chapter.access_level,
        publicationStatusLabel: statusLabels[asStoryStatus(chapter.publication_status)],
        publishedAtLabel: formatDateTime(chapter.published_at),
        wordCountLabel: `${formatInteger(chapter.word_count)} từ`,
      })),
    };
  },
);

export const getAdminChapterEditor = cache(
  async (
    storyId: number,
    chapterId: number,
  ): Promise<AdminChapterEditorPayload | null> => {
    await requireAdminUser();

    const supabase = getAdminSupabaseClient();
    const { data: story, error: storyError } = await supabase
      .from("stories")
      .select("id, slug, title, publication_status")
      .eq("id", storyId)
      .maybeSingle();

    if (storyError) {
      throw new Error(`Failed to load admin chapter story: ${storyError.message}`);
    }

    if (!story) return null;

    const { data: chapter, error: chapterError } = await supabase
      .from("chapters")
      .select(`
        id,
        story_id,
        chapter_number,
        slug,
        title,
        access_level,
        publication_status,
        published_at,
        word_count
      `)
      .eq("id", chapterId)
      .eq("story_id", storyId)
      .maybeSingle();

    if (chapterError) {
      throw new Error(`Failed to load admin chapter editor: ${chapterError.message}`);
    }

    if (!chapter) return null;

    const { data: content, error: contentError } = await supabase
      .from("chapter_contents")
      .select("content, content_format")
      .eq("chapter_id", chapterId)
      .maybeSingle();

    if (contentError) {
      throw new Error(`Failed to load admin chapter content: ${contentError.message}`);
    }

    if (!content) return null;

    const storyStatus = asStoryStatus(story.publication_status);
    const chapterRow = chapter as AdminChapterRow;
    const contentRow = content as AdminChapterContentRow;
    const chapterStatus = asStoryStatus(chapterRow.publication_status);
    const accessLevel = chapterRow.access_level === "vip" ? "vip" : "free";

    return {
      story: {
        id: story.id,
        slug: story.slug,
        title: story.title,
        publicationStatus: storyStatus,
        publicationStatusLabel: statusLabels[storyStatus],
      },
      chapter: {
        id: chapterRow.id,
        number: chapterRow.chapter_number,
        title: chapterRow.title,
        slug: chapterRow.slug,
        accessLevel,
        publicationStatus: chapterStatus,
        publicationStatusLabel: statusLabels[chapterStatus],
        publishedAt: chapterRow.published_at,
        publishedAtLabel: formatDateTime(chapterRow.published_at),
        wordCount: chapterRow.word_count,
        wordCountLabel: `${formatInteger(chapterRow.word_count)} từ`,
        body: contentRow.content,
        contentFormat: contentRow.content_format,
      },
    };
  },
);
