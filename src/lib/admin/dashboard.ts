import "server-only";

import { requireAdminUser } from "@/lib/admin/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminMetricTone = "violet" | "ruby" | "gold" | "blue" | "green";

export type AdminStoryProductionType =
  | "self_produced"
  | "licensed_translation";

export type AdminMetric = {
  label: string;
  value: string;
  deltaPercent: number | null;
  deltaLabel: string;
  tone: AdminMetricTone;
  note?: string;
};

export type AdminDashboardPayload = {
  source: "mock" | "supabase";
  generatedAt: string;
  dateRange: {
    from: string;
    to: string;
    label: string;
  };
  metrics: {
    totalStories: AdminMetric;
    totalUsers: AdminMetric;
    totalReads: AdminMetric;
    revenueVnd: AdminMetric;
    transactions: AdminMetric;
  };
  readsByDay: Array<{
    date: string;
    label: string;
    reads: number;
  }>;
  topStories: Array<{
    id: number;
    slug: string;
    title: string;
    authorName: string;
    uploaderUsername: string | null;
    productionType: AdminStoryProductionType;
    productionTypeLabel: string;
    genreLabel: string;
    coverUrl: string | null;
    readCountLabel: string;
  }>;
  genreDistribution: Array<{
    genre: string;
    count: number;
    percent: number;
    tone: AdminMetricTone;
  }>;
  recentStories: Array<{
    id: number;
    slug: string;
    title: string;
    authorName: string;
    uploaderUsername: string | null;
    productionType: AdminStoryProductionType;
    productionTypeLabel: string;
    latestChapterLabel: string;
    updatedAtLabel: string;
  }>;
  userActivity: Array<{
    id: string;
    kind: "comment" | "follow" | "rating" | "transaction" | "story_created";
    actorLabel: string;
    actionLabel: string;
    targetLabel: string;
    createdAtLabel: string;
  }>;
  revenueByDay: Array<{
    date: string;
    label: string;
    revenueVnd: number;
    revenueLabel: string;
  }>;
};

export const adminDashboardMockPayload: AdminDashboardPayload = {
  source: "mock",
  generatedAt: "2026-06-27T00:00:00.000+07:00",
  dateRange: {
    from: "2026-06-21",
    to: "2026-06-27",
    label: "7 ngày qua",
  },
  metrics: {
    totalStories: {
      label: "Tổng truyện",
      value: "1.284",
      deltaPercent: 4.8,
      deltaLabel: "+58 truyện trong 7 ngày",
      tone: "ruby",
    },
    totalUsers: {
      label: "Tổng người dùng",
      value: "42.918",
      deltaPercent: 6.2,
      deltaLabel: "+2.431 người dùng mới",
      tone: "blue",
    },
    totalReads: {
      label: "Lượt đọc",
      value: "8,7M",
      deltaPercent: 12.4,
      deltaLabel: "+12,4% so với kỳ trước",
      tone: "green",
    },
    revenueVnd: {
      label: "Doanh thu",
      value: "--",
      deltaPercent: null,
      deltaLabel: "Chờ ledger thanh toán",
      tone: "gold",
      note: "deferred: revenue metrics will connect after payment and ledger tasks.",
    },
    transactions: {
      label: "Giao dịch",
      value: "--",
      deltaPercent: null,
      deltaLabel: "Chờ dữ liệu giao dịch thật",
      tone: "violet",
      note: "deferred: transaction metrics will connect after payment and ledger tasks.",
    },
  },
  readsByDay: [
    { date: "2026-06-21", label: "T2", reads: 98400 },
    { date: "2026-06-22", label: "T3", reads: 112800 },
    { date: "2026-06-23", label: "T4", reads: 108200 },
    { date: "2026-06-24", label: "T5", reads: 126700 },
    { date: "2026-06-25", label: "T6", reads: 141300 },
    { date: "2026-06-26", label: "T7", reads: 153900 },
    { date: "2026-06-27", label: "CN", reads: 149600 },
  ],
  topStories: [
    {
      id: 1,
      slug: "van-co-than-de",
      title: "Vạn Cổ Thần Đế",
      authorName: "Phi Thiên Ngư",
      uploaderUsername: "editor_huyenhiep",
      productionType: "licensed_translation",
      productionTypeLabel: "Truyện dịch đã mua bản quyền",
      genreLabel: "Huyền huyễn",
      coverUrl: null,
      readCountLabel: "1,2M lượt đọc",
    },
    {
      id: 2,
      slug: "dau-pha-thuong-khung",
      title: "Đấu Phá Thương Khung",
      authorName: "Thiên Tàm Thổ Đậu",
      uploaderUsername: "editor_tutien",
      productionType: "licensed_translation",
      productionTypeLabel: "Truyện dịch đã mua bản quyền",
      genreLabel: "Tiên hiệp",
      coverUrl: null,
      readCountLabel: "840K lượt đọc",
    },
    {
      id: 3,
      slug: "ban-thao-tu-san-xuat",
      title: "Bản Thảo Tự Sản Xuất",
      authorName: "Nhà Mò Studio",
      uploaderUsername: "studio_team",
      productionType: "self_produced",
      productionTypeLabel: "Tự sản xuất",
      genreLabel: "Ngôn tình",
      coverUrl: null,
      readCountLabel: "316K lượt đọc",
    },
  ],
  genreDistribution: [
    { genre: "Huyền huyễn", count: 438, percent: 34, tone: "ruby" },
    { genre: "Tiên hiệp", count: 321, percent: 25, tone: "violet" },
    { genre: "Ngôn tình", count: 257, percent: 20, tone: "gold" },
    { genre: "Đô thị", count: 166, percent: 13, tone: "blue" },
    { genre: "Khác", count: 102, percent: 8, tone: "green" },
  ],
  recentStories: [
    {
      id: 11,
      slug: "van-co-than-de",
      title: "Vạn Cổ Thần Đế",
      authorName: "Phi Thiên Ngư",
      uploaderUsername: "editor_huyenhiep",
      productionType: "licensed_translation",
      productionTypeLabel: "Truyện dịch đã mua bản quyền",
      latestChapterLabel: "Chương 2686",
      updatedAtLabel: "2 phút trước",
    },
    {
      id: 12,
      slug: "dau-pha-thuong-khung",
      title: "Đấu Phá Thương Khung",
      authorName: "Thiên Tàm Thổ Đậu",
      uploaderUsername: "editor_tutien",
      productionType: "licensed_translation",
      productionTypeLabel: "Truyện dịch đã mua bản quyền",
      latestChapterLabel: "Chương 1652",
      updatedAtLabel: "30 phút trước",
    },
    {
      id: 13,
      slug: "truyen-nha-mo-doc-quyen",
      title: "Truyện Nhà Mò Độc Quyền",
      authorName: "Nhà Mò Studio",
      uploaderUsername: "studio_team",
      productionType: "self_produced",
      productionTypeLabel: "Tự sản xuất",
      latestChapterLabel: "Chương 42",
      updatedAtLabel: "1 giờ trước",
    },
  ],
  userActivity: [
    {
      id: "activity-comment-001",
      kind: "comment",
      actorLabel: "docgia_mayman",
      actionLabel: "bình luận",
      targetLabel: "Vạn Cổ Thần Đế",
      createdAtLabel: "5 phút trước",
    },
    {
      id: "activity-follow-002",
      kind: "follow",
      actorLabel: "minhchau88",
      actionLabel: "theo dõi",
      targetLabel: "Đấu Phá Thương Khung",
      createdAtLabel: "12 phút trước",
    },
    {
      id: "activity-story-003",
      kind: "story_created",
      actorLabel: "studio_team",
      actionLabel: "tạo truyện",
      targetLabel: "Truyện Nhà Mò Độc Quyền",
      createdAtLabel: "1 giờ trước",
    },
  ],
  revenueByDay: [
    { date: "2026-06-21", label: "T2", revenueVnd: 0, revenueLabel: "Deferred" },
    { date: "2026-06-22", label: "T3", revenueVnd: 0, revenueLabel: "Deferred" },
    { date: "2026-06-23", label: "T4", revenueVnd: 0, revenueLabel: "Deferred" },
    { date: "2026-06-24", label: "T5", revenueVnd: 0, revenueLabel: "Deferred" },
    { date: "2026-06-25", label: "T6", revenueVnd: 0, revenueLabel: "Deferred" },
    { date: "2026-06-26", label: "T7", revenueVnd: 0, revenueLabel: "Deferred" },
    { date: "2026-06-27", label: "CN", revenueVnd: 0, revenueLabel: "Deferred" },
  ],
};

type DashboardStoryRow = {
  id: number;
  slug: string;
  title: string;
  cover_path: string | null;
  latest_chapter_number: number | null;
  latest_published_at: string | null;
  publication_status: string;
  read_count: number;
  updated_at: string;
  author: { name: string } | null;
  story_genres: Array<{
    is_primary: boolean;
    genre: { name: string } | null;
  }>;
};

type DashboardCommentRow = {
  id: number;
  user_id: string;
  created_at: string;
  story: { title: string } | null;
};

const genreTones: AdminMetricTone[] = ["ruby", "violet", "gold", "blue", "green"];

function formatInteger(value: number) {
  return value.toLocaleString("vi-VN");
}

function formatCompactReads(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "").replace(".", ",")}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(".0", "").replace(".", ",")}K`;
  }

  return formatInteger(value);
}

function formatRelativeTime(value: string | null) {
  if (!value) return "Chưa cập nhật";

  const elapsedMinutes = Math.max(
    1,
    Math.round((Date.now() - new Date(value).getTime()) / 60_000),
  );

  if (elapsedMinutes < 60) return `${elapsedMinutes} phút trước`;

  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours} giờ trước`;

  return `${Math.round(elapsedHours / 24)} ngày trước`;
}

function formatDayLabel(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { weekday: "short" }).format(
    new Date(value),
  );
}

function isoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function getPrimaryGenre(story: DashboardStoryRow) {
  return (
    story.story_genres.find((item) => item.is_primary)?.genre?.name ??
    story.story_genres[0]?.genre?.name ??
    "Khác"
  );
}

function getLatestChapterLabel(value: number | null) {
  return value === null ? "Chưa có chương" : `Chương ${value}`;
}

export async function getAdminDashboardPayload(): Promise<AdminDashboardPayload> {
  await requireAdminUser();

  const supabase = await createServerSupabaseClient();
  const now = new Date();
  const from = new Date(now);
  from.setDate(now.getDate() - 6);

  const [
    storyResult,
    totalStoriesResult,
    totalUsersResult,
    commentResult,
  ] = await Promise.all([
    supabase
      .from("stories")
      .select(`
        id,
        slug,
        title,
        cover_path,
        latest_chapter_number,
        latest_published_at,
        publication_status,
        read_count,
        updated_at,
        author:authors(name),
        story_genres(is_primary, genre:genres(name))
      `)
      .order("read_count", { ascending: false })
      .order("id", { ascending: true }),
    supabase.from("stories").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("comments")
      .select("id, user_id, created_at, story:stories(title)")
      .eq("status", "visible")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(3),
  ]);

  if (storyResult.error) {
    throw new Error(`Failed to load admin dashboard stories: ${storyResult.error.message}`);
  }

  if (totalStoriesResult.error) {
    throw new Error(`Failed to count admin dashboard stories: ${totalStoriesResult.error.message}`);
  }

  if (totalUsersResult.error) {
    throw new Error(`Failed to count admin dashboard users: ${totalUsersResult.error.message}`);
  }

  if (commentResult.error) {
    throw new Error(`Failed to load admin dashboard activity: ${commentResult.error.message}`);
  }

  const stories = storyResult.data as DashboardStoryRow[];
  const comments = commentResult.data as DashboardCommentRow[];
  const totalReads = stories.reduce((total, story) => total + story.read_count, 0);
  const recentStories = [...stories]
    .sort(
      (left, right) =>
        new Date(right.latest_published_at ?? right.updated_at).getTime() -
        new Date(left.latest_published_at ?? left.updated_at).getTime(),
    )
    .slice(0, 3);
  const recentReadRows = [...recentStories].reverse();
  const genreCounts = new Map<string, number>();

  stories.forEach((story) => {
    const genre = getPrimaryGenre(story);
    genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1);
  });

  const genreTotal = Math.max(stories.length, 1);
  const commentUserIds = Array.from(
    new Set(comments.map((comment) => comment.user_id)),
  );
  const { data: profiles, error: profileError } = commentUserIds.length
    ? await supabase
        .from("profiles")
        .select("id, display_name")
        .in("id", commentUserIds)
    : { data: [], error: null };

  if (profileError) {
    throw new Error(`Failed to load admin dashboard profiles: ${profileError.message}`);
  }

  const profileNames = new Map(
    profiles.map((profile) => [profile.id, profile.display_name]),
  );
  const revenueByDay = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(from);
    date.setDate(from.getDate() + index);
    return {
      date: isoDate(date),
      label: formatDayLabel(date.toISOString()),
      revenueVnd: 0,
      revenueLabel: "Deferred",
    };
  });

  return {
    source: "supabase",
    generatedAt: now.toISOString(),
    dateRange: {
      from: isoDate(from),
      to: isoDate(now),
      label: adminDashboardMockPayload.dateRange.label,
    },
    metrics: {
      totalStories: {
        label: adminDashboardMockPayload.metrics.totalStories.label,
        value: formatInteger(totalStoriesResult.count ?? stories.length),
        deltaPercent: null,
        deltaLabel: "Dữ liệu thật từ Supabase",
        tone: "ruby",
      },
      totalUsers: {
        label: adminDashboardMockPayload.metrics.totalUsers.label,
        value: formatInteger(totalUsersResult.count ?? 0),
        deltaPercent: null,
        deltaLabel: "Dữ liệu thật từ profiles",
        tone: "blue",
      },
      totalReads: {
        label: adminDashboardMockPayload.metrics.totalReads.label,
        value: formatCompactReads(totalReads),
        deltaPercent: null,
        deltaLabel: `${formatInteger(totalReads)} lượt đọc từ stories`,
        tone: "green",
      },
      revenueVnd: adminDashboardMockPayload.metrics.revenueVnd,
      transactions: adminDashboardMockPayload.metrics.transactions,
    },
    readsByDay: recentReadRows.map((story) => ({
      date: isoDate(new Date(story.latest_published_at ?? story.updated_at)),
      label: formatDayLabel(story.latest_published_at ?? story.updated_at),
      reads: story.read_count,
    })),
    topStories: stories.slice(0, 3).map((story) => ({
      id: story.id,
      slug: story.slug,
      title: story.title,
      authorName: story.author?.name ?? "Không rõ",
      uploaderUsername: null,
      productionType: "licensed_translation",
      productionTypeLabel:
        adminDashboardMockPayload.topStories[0].productionTypeLabel,
      genreLabel: getPrimaryGenre(story),
      coverUrl: story.cover_path,
      readCountLabel: `${formatCompactReads(story.read_count)} lượt đọc`,
    })),
    genreDistribution: [...genreCounts.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 5)
      .map(([genre, count], index) => ({
        genre,
        count,
        percent: Math.round((count / genreTotal) * 100),
        tone: genreTones[index % genreTones.length],
      })),
    recentStories: recentStories.map((story) => ({
      id: story.id,
      slug: story.slug,
      title: story.title,
      authorName: story.author?.name ?? "Không rõ",
      uploaderUsername: null,
      productionType: "licensed_translation",
      productionTypeLabel:
        adminDashboardMockPayload.topStories[0].productionTypeLabel,
      latestChapterLabel: getLatestChapterLabel(story.latest_chapter_number),
      updatedAtLabel: formatRelativeTime(story.latest_published_at ?? story.updated_at),
    })),
    userActivity: comments.length
      ? comments.map((comment) => ({
          id: `comment-${comment.id}`,
          kind: "comment",
          actorLabel:
            profileNames.get(comment.user_id) ?? "Độc giả Ruby Noir",
          actionLabel: "bình luận",
          targetLabel: comment.story?.title ?? "Truyện",
          createdAtLabel: formatRelativeTime(comment.created_at),
        }))
      : recentStories.map((story) => ({
          id: `story-${story.id}`,
          kind: "story_created",
          actorLabel: story.author?.name ?? "Không rõ",
          actionLabel: "tạo truyện",
          targetLabel: story.title,
          createdAtLabel: formatRelativeTime(story.updated_at),
        })),
    revenueByDay,
  };
}

export function serializeAdminDashboardPayload(
  payload: AdminDashboardPayload = adminDashboardMockPayload,
) {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
