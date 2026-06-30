import Image from "next/image";
import Link from "next/link";

import {
  archiveStoryAction,
  deleteStoryCoverAction,
  publishStoryAction,
  uploadStoryCoverAction,
} from "@/app/admin/truyen/actions";
import type { AdminStoryDetailPayload } from "@/lib/admin/stories";

type AdminStoryDetailProps = {
  payload: AdminStoryDetailPayload;
};

export function AdminStoryDetail({ payload }: AdminStoryDetailProps) {
  const { story, chapters } = payload;

  return (
    <section className="admin-dashboard admin-story-admin" data-admin-story-detail>
      <div className="admin-content-header">
        <div>
          <span>Nội dung / Truyện #{story.id}</span>
          <h2>{story.title}</h2>
        </div>
        <p>
          {story.publicationStatusLabel} · {story.chapterCountLabel} ·{" "}
          {story.followCountLabel}
        </p>
      </div>

      <nav className="admin-story-tabs" aria-label="Khu vực chỉnh sửa truyện">
        <Link href="#tong-quan">Tổng quan</Link>
        <Link href="#chuong">Chương</Link>
        <Link href="#xuat-ban">Xuất bản</Link>
        <Link href="#lich-su">Lịch sử</Link>
      </nav>

      <div className="admin-story-detail-grid">
        <form
          aria-label="Thông tin truyện"
          className="admin-data-panel admin-story-form"
          data-admin-story-form
          id="tong-quan"
        >
          <div className="admin-panel-heading">
            <div>
              <h3>Hồ sơ truyện</h3>
              <span>Metadata biên tập</span>
            </div>
            <span className={`admin-status-pill is-${story.publicationStatus}`}>
              {story.publicationStatusLabel}
            </span>
          </div>

          <label className="admin-filter-field">
            <span>Tên truyện</span>
            <input name="title" readOnly value={story.title} />
          </label>

          <label className="admin-filter-field">
            <span>Slug</span>
            <input name="slug" readOnly value={story.slug} />
            <small>Slug chỉ dùng chữ thường, số và dấu gạch ngang.</small>
          </label>

          <label className="admin-filter-field">
            <span>Mô tả</span>
            <textarea name="description" readOnly rows={5} value={story.synopsis} />
          </label>

          <div className="admin-story-form-grid">
            <label className="admin-filter-field">
              <span>Tác giả</span>
              <input name="authorName" readOnly value={story.authorName} />
            </label>

            <label className="admin-filter-field">
              <span>Loại sản xuất</span>
              <select
                defaultValue={story.productionType}
                disabled
                name="productionType"
              >
                <option value="self_produced">Tự sản xuất</option>
                <option value="licensed_translation">Truyện dịch đã mua bản quyền</option>
              </select>
            </label>

            <label className="admin-filter-field">
              <span>Trạng thái</span>
              <select
                defaultValue={story.publicationStatus}
                disabled
                name="status"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
                <option value="archived">Đã lưu trữ</option>
              </select>
            </label>

            <label className="admin-filter-field">
              <span>Ngày xuất bản</span>
              <input
                name="publishedAt"
                readOnly
                value={story.publishedAt ?? "Chưa đặt"}
              />
            </label>
          </div>
        </form>

        <div className="admin-story-side-stack">
          <section
            className="admin-data-panel admin-story-cover-panel"
            data-admin-story-cover-panel
            id="anh-bia"
          >
            <div className="admin-panel-heading">
              <div>
                <h3>Ảnh bìa</h3>
                <span>Public Storage</span>
              </div>
            </div>

            <div className="admin-story-cover-preview" data-admin-cover-preview>
              {story.coverPath ? (
                <Image
                  alt={`Ảnh bìa ${story.title}`}
                  height={300}
                  src={story.coverPath}
                  unoptimized
                  width={220}
                />
              ) : (
                <span>{story.title.slice(0, 1).toUpperCase()}</span>
              )}
            </div>

            <form
              action={uploadStoryCoverAction}
              className="admin-story-cover-form"
              data-admin-cover-upload-form
            >
              <input name="storyId" type="hidden" value={story.id} />
              <input name="storySlug" type="hidden" value={story.slug} />
              <label className="admin-filter-field">
                <span>File ảnh</span>
                <input
                  accept="image/jpeg,image/png,image/webp"
                  name="coverFile"
                  required
                  type="file"
                />
                <small>JPG, PNG hoặc WebP, tối đa 5MB.</small>
              </label>
              <button className="admin-filter-button" type="submit">
                Cập nhật ảnh bìa
              </button>
            </form>

            <form action={deleteStoryCoverAction} data-admin-cover-delete-form>
              <input name="storyId" type="hidden" value={story.id} />
              <input name="storySlug" type="hidden" value={story.slug} />
              <button
                className="admin-filter-button is-danger"
                disabled={!story.coverPath}
                type="submit"
              >
                Xoá ảnh bìa
              </button>
            </form>
          </section>

          <aside className="admin-data-panel admin-story-side-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>Tóm tắt</h3>
              <span>Dữ liệu đọc nhanh</span>
            </div>
          </div>
          <dl className="admin-story-facts">
            <div>
              <dt>Tác giả</dt>
              <dd>{story.authorName}</dd>
            </div>
            <div>
              <dt>Thể loại</dt>
              <dd>{story.genreNames.join(", ") || story.primaryGenre}</dd>
            </div>
            <div>
              <dt>Lượt đọc</dt>
              <dd>{story.readCountLabel}</dd>
            </div>
            <div>
              <dt>Cập nhật</dt>
              <dd>{story.updatedAtLabel}</dd>
            </div>
          </dl>
          {story.publicHref ? (
            <Link className="admin-filter-button" href={story.publicHref} prefetch={false}>
              Xem trang public
            </Link>
          ) : null}
          </aside>
        </div>
      </div>

      <section className="admin-data-panel" id="chuong" data-admin-story-chapters>
        <div className="admin-panel-heading">
          <div>
            <h3>Chương thuộc truyện</h3>
            <span>5 chương mới nhất</span>
          </div>
        </div>

        {chapters.length ? (
          <table className="admin-recent-table admin-story-table">
            <thead>
              <tr>
                <th>Chương</th>
                <th>Trạng thái</th>
                <th>Quyền đọc</th>
                <th>Ngày xuất bản</th>
                <th>Dung lượng</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr data-admin-chapter-row key={chapter.id}>
                  <td data-label="Chương">
                    <Link href={`/admin/truyen/${story.id}/chuong/${chapter.id}`}>
                      Chương {chapter.number}
                    </Link>
                    <small>{chapter.title}</small>
                  </td>
                  <td data-label="Trạng thái">{chapter.publicationStatusLabel}</td>
                  <td data-label="Quyền đọc">{chapter.accessLevel}</td>
                  <td data-label="Ngày xuất bản">{chapter.publishedAtLabel}</td>
                  <td data-label="Dung lượng">{chapter.wordCountLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="admin-empty-state" role="status">
            Chưa có chương.
          </p>
        )}
      </section>

      <div className="admin-list-grid">
        <section className="admin-data-panel" id="xuat-ban">
          <div className="admin-panel-heading">
            <div>
              <h3>Xuất bản</h3>
              <span>Trạng thái hiện tại</span>
            </div>
          </div>
          <div className="admin-publish-state">
            <span className={`admin-status-pill is-${story.publicationStatus}`}>
              {story.publicationStatusLabel}
            </span>
            <p>{story.publicHref ? "Đang hiển thị trên public." : "Đang ẩn khỏi public."}</p>
          </div>

          <div className="admin-story-action-grid">
            <form action={publishStoryAction} data-admin-publish-story-form>
              <input name="storyId" type="hidden" value={story.id} />
              <input name="storySlug" type="hidden" value={story.slug} />
              <button
                className="admin-filter-button"
                disabled={story.publicationStatus === "published"}
                type="submit"
              >
                Xuất bản truyện
              </button>
            </form>

            <form action={archiveStoryAction} data-admin-archive-story-form>
              <input name="storyId" type="hidden" value={story.id} />
              <input name="storySlug" type="hidden" value={story.slug} />
              <label className="admin-confirmation-field">
                <input
                  name="confirmation"
                  required
                  type="checkbox"
                  value="ARCHIVE_STORY"
                />
                <span>Xác nhận lưu trữ truyện</span>
              </label>
              <button
                className="admin-filter-button is-danger"
                disabled={story.publicationStatus === "archived"}
                type="submit"
              >
                Lưu trữ truyện
              </button>
            </form>
          </div>
        </section>

        <section className="admin-data-panel" id="lich-su">
          <div className="admin-panel-heading">
            <div>
              <h3>Lịch sử</h3>
              <span>Cập nhật gần nhất</span>
            </div>
          </div>
          <p>{story.updatedAtLabel}</p>
        </section>
      </div>
    </section>
  );
}
