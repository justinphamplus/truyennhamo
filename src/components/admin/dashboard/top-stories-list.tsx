import Link from "next/link";

import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type TopStoriesListProps = {
  stories: AdminDashboardPayload["topStories"];
};

export function TopStoriesList({ stories }: TopStoriesListProps) {
  return (
    <section className="admin-data-panel" data-admin-top-stories>
      <div className="admin-panel-heading">
        <h3>Truyện đọc nhiều</h3>
        <span>{stories.length} truyện</span>
      </div>
      {stories.length === 0 ? (
        <p role="status">Chưa có dữ liệu truyện đọc nhiều.</p>
      ) : (
        <ol className="admin-top-story-list">
          {stories.map((story, index) => (
            <li key={story.id}>
              <span className="admin-rank">#{index + 1}</span>
              <span className="admin-cover-fallback" aria-hidden="true">
                {story.title.slice(0, 1)}
              </span>
              <span className="admin-story-main">
                <Link href={`/truyen/${story.slug}`}>{story.title}</Link>
                <small>{story.genreLabel} · {story.productionTypeLabel}</small>
              </span>
              <span className="admin-read-count">{story.readCountLabel}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
