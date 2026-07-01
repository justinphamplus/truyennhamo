import Script from "next/script";

import { getPrototypeMarkup, type PrototypePage } from "@/lib/prototype-markup";
import { getCurrentProfile } from "@/lib/auth/current-user";
import { BookmarkControls } from "@/components/library/bookmark-controls";
import { CommentControls } from "@/components/comments/comment-controls";
import { ReadingProgressTracker } from "@/components/reader/reading-progress-tracker";
import type { HomepageCatalog } from "@/lib/queries/homepage";
import {
  getBookmarkedStories,
  isStoryBookmarked,
} from "@/lib/queries/library";
import {
  getReadingHistory,
  getStoryReadingProgress,
} from "@/lib/queries/reading-progress";
import type { ReaderPayload } from "@/lib/queries/reader";
import type { SearchPayload } from "@/lib/queries/search";
import type { StoryDetailPayload } from "@/lib/queries/story-detail";

type PrototypeShellProps = {
  page: PrototypePage;
  homepageCatalog?: HomepageCatalog;
  storyDetail?: StoryDetailPayload;
  reader?: ReaderPayload;
  search?: SearchPayload;
};

export async function PrototypeShell({
  page,
  homepageCatalog,
  storyDetail,
  reader,
  search,
}: PrototypeShellProps) {
  const profile = await getCurrentProfile();
  const bookmarked =
    storyDetail && profile
      ? await isStoryBookmarked(profile.id, storyDetail.story.id)
      : false;
  const progressStoryId = storyDetail?.story.id ?? reader?.story.id;
  const readingProgress =
    profile && progressStoryId
      ? await getStoryReadingProgress(profile.id, progressStoryId)
      : null;
  const personalLibrary =
    profile && homepageCatalog
      ? await Promise.all([
          getReadingHistory(profile.id),
          getBookmarkedStories(profile.id),
        ]).then(([reading, saved]) => ({ reading, saved }))
      : null;

  return (
    <>
      <div
        data-homepage-source={homepageCatalog?.source}
        data-story-source={storyDetail?.source}
        data-reader-source={reader?.source}
        data-search-source={search?.source}
        data-auth-state={profile ? "authenticated" : "anonymous"}
        dangerouslySetInnerHTML={{ __html: getPrototypeMarkup(page, profile) }}
      />
      {homepageCatalog ? (
        <script
          id="homepage-catalog-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homepageCatalog).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {personalLibrary ? (
        <script
          id="user-library-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personalLibrary).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {storyDetail ? (
        <script
          id="story-detail-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...storyDetail,
              readingProgress,
            }).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {reader ? (
        <script
          id="reader-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reader).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {search ? (
        <script
          id="search-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(search).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {storyDetail ? (
        <BookmarkControls
          storyId={storyDetail.story.id}
          storySlug={storyDetail.story.slug}
          initialBookmarked={bookmarked}
          authenticated={Boolean(profile)}
        />
      ) : null}
      {storyDetail ? (
        <CommentControls
          storyId={storyDetail.story.id}
          storySlug={storyDetail.story.slug}
          initialComments={storyDetail.comments}
          authenticated={Boolean(profile)}
        />
      ) : null}
      {reader && profile && !reader.chapter.isLocked ? (
        <ReadingProgressTracker
          storyId={reader.story.id}
          chapterId={reader.chapter.id}
          initialProgress={readingProgress}
        />
      ) : null}
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
