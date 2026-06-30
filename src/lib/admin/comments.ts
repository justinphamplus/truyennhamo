import "server-only";

import { cache } from "react";

import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

export type AdminCommentStatus = "visible" | "hidden" | "deleted";

export type AdminCommentListFilters = {
  q: string;
  status: "all" | AdminCommentStatus;
};

export type AdminCommentListItem = {
  id: number;
  body: string;
  status: AdminCommentStatus;
  statusLabel: string;
  statusTone: "published" | "archived";
  actorLabel: string;
  storyTitle: string;
  storyHref: string | null;
  chapterLabel: string;
  likeCountLabel: string;
  createdAtLabel: string;
  updatedAtLabel: string;
};

export type AdminCommentQueuePayload = {
  comments: AdminCommentListItem[];
  filters: AdminCommentListFilters;
  statusCounts: Record<"all" | AdminCommentStatus, number>;
  totalCount: number;
};

type AdminCommentRow = {
  id: number;
  user_id: string;
  body: string;
  status: string;
  like_count: number;
  chapter_id: number | null;
  created_at: string;
  updated_at: string;
  story: { id: number; slug: string; title: string; publication_status: string } | null;
};

type AdminProfileRow = {
  id: string;
  display_name: string;
  username: string | null;
};

const statusLabels: Record<AdminCommentStatus, string> = {
  visible: "Hiển thị",
  hidden: "Đã ẩn",
  deleted: "Đã xoá",
};

function asCommentStatus(value: string): AdminCommentStatus {
  if (value === "hidden" || value === "deleted") return value;
  return "visible";
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

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function toCommentListItem(
  row: AdminCommentRow,
  profileNames: Map<string, string>,
): AdminCommentListItem {
  const status = asCommentStatus(row.status);

  return {
    id: row.id,
    body: row.body,
    status,
    statusLabel: statusLabels[status],
    statusTone: status === "visible" ? "published" : "archived",
    actorLabel: profileNames.get(row.user_id) ?? "Độc giả Ruby Noir",
    storyTitle: row.story?.title ?? "Truyện đã xoá",
    storyHref:
      row.story?.publication_status === "published" ? `/truyen/${row.story.slug}` : null,
    chapterLabel: row.chapter_id ? `Chương #${row.chapter_id}` : "Bình luận truyện",
    likeCountLabel: `${formatInteger(row.like_count)} thích`,
    createdAtLabel: formatDateTime(row.created_at),
    updatedAtLabel: formatDateTime(row.updated_at),
  };
}

export const getAdminCommentQueue = cache(
  async (filters: AdminCommentListFilters): Promise<AdminCommentQueuePayload> => {
    await requireAdminUser();

    const supabase = getAdminSupabaseClient();
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        user_id,
        body,
        status,
        like_count,
        chapter_id,
        created_at,
        updated_at,
        story:stories(id, slug, title, publication_status)
      `)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(100);

    if (error) {
      throw new Error(`Failed to load admin comments: ${error.message}`);
    }

    const rows = data as AdminCommentRow[];
    const userIds = Array.from(new Set(rows.map((comment) => comment.user_id)));
    const { data: profiles, error: profileError } = userIds.length
      ? await supabase
          .from("profiles")
          .select("id, display_name, username")
          .in("id", userIds)
      : { data: [], error: null };

    if (profileError) {
      throw new Error(`Failed to load admin comment profiles: ${profileError.message}`);
    }

    const profileNames = new Map(
      (profiles as AdminProfileRow[]).map((profile) => [
        profile.id,
        profile.username ? `@${profile.username}` : profile.display_name,
      ]),
    );
    const comments = rows.map((row) => toCommentListItem(row, profileNames));
    const q = normalizeSearch(filters.q);
    const filteredComments = comments.filter((comment) => {
      if (filters.status !== "all" && comment.status !== filters.status) {
        return false;
      }

      if (
        q &&
        ![comment.body, comment.storyTitle, comment.actorLabel].some((value) =>
          includesSearch(value, q),
        )
      ) {
        return false;
      }

      return true;
    });

    return {
      comments: filteredComments,
      filters,
      statusCounts: {
        all: comments.length,
        visible: comments.filter((comment) => comment.status === "visible").length,
        hidden: comments.filter((comment) => comment.status === "hidden").length,
        deleted: comments.filter((comment) => comment.status === "deleted").length,
      },
      totalCount: comments.length,
    };
  },
);
