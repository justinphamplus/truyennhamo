import Link from "next/link";

import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type RecentStoriesTableProps = {
  stories: AdminDashboardPayload["recentStories"];
};

export function RecentStoriesTable({ stories }: RecentStoriesTableProps) {
  return (
    <section className="admin-data-panel admin-recent-panel">
      <div className="admin-panel-heading">
        <h3>Truyện cập nhật gần đây</h3>
        <span>{stories.length} dòng</span>
      </div>
      {stories.length === 0 ? (
        <p role="status">Chưa có truyện cập nhật.</p>
      ) : (
        <table className="admin-recent-table" aria-label="Truyện cập nhật gần đây">
          <thead>
            <tr>
              <th>Truyện</th>
              <th>Tác giả</th>
              <th>Loại</th>
              <th>Chương mới</th>
              <th>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id}>
                <td data-label="Truyện">
                  <Link href={`/truyen/${story.slug}`}>{story.title}</Link>
                  <small>{story.uploaderUsername ?? "Chưa gán uploader"}</small>
                </td>
                <td data-label="Tác giả">{story.authorName}</td>
                <td data-label="Loại">{story.productionTypeLabel}</td>
                <td data-label="Chương mới">{story.latestChapterLabel}</td>
                <td data-label="Cập nhật">{story.updatedAtLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
