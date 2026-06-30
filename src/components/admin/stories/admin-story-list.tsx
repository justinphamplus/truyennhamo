import Link from "next/link";

import type { AdminStoryListItem } from "@/lib/admin/stories";

type AdminStoryListProps = {
  filters: {
    q: string;
    status: string;
    productionType: string;
    uploader: string;
  };
  stories: AdminStoryListItem[];
  statusCounts: {
    all: number;
    draft: number;
    published: number;
    archived: number;
  };
  totalCount: number;
};

export function AdminStoryList({
  filters,
  stories,
  statusCounts,
  totalCount,
}: AdminStoryListProps) {
  return (
    <section className="admin-dashboard admin-story-admin" data-admin-story-list>
      <div className="admin-content-header">
        <div>
          <span>Nội dung</span>
          <h2>Quản lý truyện</h2>
        </div>
        <p>
          {stories.length} / {totalCount} truyện khớp bộ lọc.
        </p>
      </div>

      <form className="admin-story-filter-form" action="/admin/truyen">
        <label className="admin-filter-field">
          <span>Tìm theo tên truyện hoặc tác giả</span>
          <input
            defaultValue={filters.q}
            name="q"
            placeholder="Tên truyện, slug, tác giả..."
            type="search"
          />
        </label>

        <label className="admin-filter-field">
          <span>Trạng thái</span>
          <select defaultValue={filters.status} name="status">
            <option value="all">Tất cả ({statusCounts.all})</option>
            <option value="published">Đã xuất bản ({statusCounts.published})</option>
            <option value="draft">Bản nháp ({statusCounts.draft})</option>
            <option value="archived">Đã lưu trữ ({statusCounts.archived})</option>
          </select>
        </label>

        <label className="admin-filter-field">
          <span>Loại sản xuất</span>
          <select defaultValue={filters.productionType} name="productionType">
            <option value="all">Tất cả</option>
            <option value="self_produced">Tự sản xuất</option>
            <option value="licensed_translation">Truyện dịch đã mua bản quyền</option>
          </select>
        </label>

        <label className="admin-filter-field">
          <span>Người đăng</span>
          <input
            defaultValue={filters.uploader}
            name="uploader"
            placeholder="Chưa gán"
            type="search"
          />
        </label>

        <button className="admin-filter-button" type="submit">
          Lọc
        </button>
      </form>

      <div className="admin-data-panel">
        <div className="admin-panel-heading">
          <div>
            <h3>Danh sách truyện</h3>
            <span>Draft, published và archived trong một hàng đợi biên tập</span>
          </div>
        </div>

        {stories.length ? (
          <table className="admin-recent-table admin-story-table">
            <thead>
              <tr>
                <th>Truyện</th>
                <th>Trạng thái</th>
                <th>Sản xuất</th>
                <th>Người đăng</th>
                <th>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr data-admin-story-row key={story.id}>
                  <td data-label="Truyện">
                    <Link href={`/admin/truyen/${story.id}`}>{story.title}</Link>
                    <small>
                      {story.authorName} · {story.primaryGenre} · {story.latestChapterLabel}
                    </small>
                    <small>{story.readCountLabel}</small>
                  </td>
                  <td data-label="Trạng thái">
                    <span className={`admin-status-pill is-${story.publicationStatus}`}>
                      {story.publicationStatusLabel}
                    </span>
                  </td>
                  <td data-label="Sản xuất">{story.productionTypeLabel}</td>
                  <td data-label="Người đăng">{story.uploaderLabel}</td>
                  <td data-label="Cập nhật">{story.updatedAtLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="admin-empty-state" role="status">
            Không có truyện khớp bộ lọc.
          </p>
        )}
      </div>
    </section>
  );
}
