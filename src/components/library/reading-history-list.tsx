import Image from "next/image";
import Link from "next/link";

import type { ReadingHistoryItem } from "@/lib/queries/reading-progress";

type ReadingHistoryListProps = {
  stories: ReadingHistoryItem[];
};

function formatLastRead(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ReadingHistoryList({ stories }: ReadingHistoryListProps) {
  if (!stories.length) {
    return (
      <section className="library-empty" role="status">
        <span className="material-symbols-rounded" aria-hidden="true">
          menu_book
        </span>
        <h2>Chưa có hành trình đọc dở</h2>
        <p>
          Khi bạn mở một chương Free, vị trí đọc sẽ tự động được lưu tại đây.
        </p>
        <Link className="button primary" href="/#new">
          Bắt đầu đọc
        </Link>
      </section>
    );
  }

  return (
    <section className="library-grid" aria-label="Truyện đang đọc">
      {stories.map((story) => {
        const resumeHref = `/truyen/${story.storySlug}/${story.chapterSlug}`;
        const percent = Math.round(story.progressPercent);

        return (
          <article className="library-story-card" key={story.storyId}>
            <Link
              className="library-story-cover"
              href={resumeHref}
              aria-label={`Đọc tiếp ${story.storyTitle}`}
            >
              {story.coverImage ? (
                <Image
                  src={story.coverImage}
                  alt=""
                  width={180}
                  height={320}
                  sizes="(max-width: 560px) 96px, 132px"
                />
              ) : (
                <span aria-hidden="true">
                  {story.storyTitle.trim().charAt(0).toLocaleUpperCase("vi")}
                </span>
              )}
            </Link>

            <div className="library-story-copy">
              <div className="library-story-meta">
                <span className="status ongoing">Đang đọc</span>
                <span>{story.chapterLabel}</span>
              </div>
              <h2>
                <Link href={`/truyen/${story.storySlug}`}>
                  {story.storyTitle}
                </Link>
              </h2>
              <p className="library-story-author">{story.author}</p>
              <p className="library-story-synopsis">{story.synopsis}</p>
              <div
                className="library-reading-progress"
                role="progressbar"
                aria-label={`Đã đọc ${percent}% chương hiện tại`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <span style={{ width: `${percent}%` }} />
              </div>
              <small>
                {percent}% chương · Đọc gần nhất {formatLastRead(story.lastReadAt)}
              </small>
              <div className="library-story-actions">
                <Link className="button primary" href={resumeHref}>
                  Đọc tiếp
                </Link>
                <Link
                  className="button ghost"
                  href={`/truyen/${story.storySlug}`}
                >
                  Thông tin truyện
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
