import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type HomepageStory = {
  id: number;
  slug: string;
  title: string;
  author: string;
  genre: string;
  status: string;
  chapter: string;
  blurb: string;
  time: string;
  reads: string;
  rating: string;
  score: string;
  cover: string;
  coverImage: string | null;
};

export type HomepageCatalog = {
  source: "supabase";
  stories: HomepageStory[];
  featured: HomepageStory[];
  latest: HomepageStory[];
  ranking: HomepageStory[];
  hot: HomepageStory[];
  completed: HomepageStory[];
  genres: [name: string, count: string][];
};

type InternalHomepageStory = HomepageStory & {
  readCount: number;
  isFeatured: boolean;
  isHot: boolean;
  storyStatus: string;
};

const coverClasses = [
  "cover-gold",
  "cover-red",
  "cover-blue",
  "cover-aqua",
  "cover-mono",
] as const;

function formatCompactNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(".0", "")}K`;
  }

  return String(value);
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

function formatChapter(
  chapterNumber: number | null,
  title: string | undefined,
) {
  if (chapterNumber === null) return "Chưa có chương";
  return `Chương ${chapterNumber}${title ? `: ${title}` : ""}`;
}

function toHomepageStory(story: InternalHomepageStory): HomepageStory {
  return {
    id: story.id,
    slug: story.slug,
    title: story.title,
    author: story.author,
    genre: story.genre,
    status: story.status,
    chapter: story.chapter,
    blurb: story.blurb,
    time: story.time,
    reads: story.reads,
    rating: story.rating,
    score: story.score,
    cover: story.cover,
    coverImage: story.coverImage,
  };
}

export async function getHomepageData(): Promise<HomepageCatalog> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("stories")
    .select(`
      id,
      slug,
      title,
      synopsis,
      cover_path,
      story_status,
      is_featured,
      is_hot,
      rating_average,
      read_count,
      latest_chapter_number,
      latest_published_at,
      author:authors(name),
      story_genres(is_primary, genre:genres(name)),
      chapters(chapter_number, title, published_at)
    `)
    .eq("publication_status", "published")
    .order("latest_published_at", { ascending: false })
    .order("chapter_number", {
      referencedTable: "chapters",
      ascending: false,
    })
    .limit(1, { referencedTable: "chapters" });

  if (error) {
    throw new Error(`Failed to load homepage catalog: ${error.message}`);
  }

  const mappedStories: InternalHomepageStory[] = data.map((story, index) => {
    const primaryGenre =
      story.story_genres.find((item) => item.is_primary)?.genre?.name ??
      story.story_genres[0]?.genre?.name ??
      "Khác";
    const latestChapter = story.chapters[0];

    return {
      id: story.id,
      slug: story.slug,
      title: story.title,
      author: story.author.name,
      genre: primaryGenre,
      status: story.story_status === "completed" ? "Hoàn tất" : "Đang ra",
      chapter: formatChapter(
        story.latest_chapter_number,
        latestChapter?.title,
      ),
      blurb: story.synopsis,
      time: formatRelativeTime(story.latest_published_at),
      reads: formatCompactNumber(story.read_count),
      rating: story.rating_average.toFixed(1),
      score: formatCompactNumber(story.read_count),
      cover: coverClasses[index % coverClasses.length],
      coverImage: story.cover_path,
      readCount: story.read_count,
      isFeatured: story.is_featured,
      isHot: story.is_hot,
      storyStatus: story.story_status,
    };
  });

  const stories = mappedStories.map(toHomepageStory);
  const byReads = [...mappedStories].sort(
    (left, right) => right.readCount - left.readCount,
  );
  const featuredCandidates = mappedStories.filter((story) => story.isFeatured);
  const featured = [
    ...featuredCandidates,
    ...byReads.filter(
      (story) =>
        !featuredCandidates.some((featuredStory) => featuredStory.id === story.id),
    ),
  ]
    .slice(0, 5)
    .map(toHomepageStory);
  const hot = byReads
    .filter((story) => story.isHot)
    .map(toHomepageStory);
  const completed = mappedStories
    .filter((story) => story.storyStatus === "completed")
    .map(toHomepageStory);
  const genreCounts = new Map<string, number>();

  data.forEach((story) => {
    story.story_genres.forEach((item) => {
      const genreName = item.genre?.name;
      if (genreName) {
        genreCounts.set(genreName, (genreCounts.get(genreName) ?? 0) + 1);
      }
    });
  });

  const genres: [string, string][] = [...genreCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([name, count]) => [name, `${count} truyện`]);
  genres.push(["Tất cả", `${stories.length} truyện`]);

  return {
    source: "supabase",
    stories,
    featured,
    latest: stories,
    ranking: byReads.map(toHomepageStory),
    hot: hot.length ? hot : stories,
    completed,
    genres,
  };
}
