import Link from "next/link";

import {
  publishChapterAction,
  saveChapterDraftAction,
} from "@/app/admin/truyen/actions";
import type { AdminChapterEditorPayload } from "@/lib/admin/stories";

type StoryChapterEditorProps = {
  payload: AdminChapterEditorPayload;
};

export function StoryChapterEditor({ payload }: StoryChapterEditorProps) {
  const { story, chapter } = payload;

  return (
    <section className="admin-dashboard admin-story-admin" data-admin-chapter-editor>
      <div className="admin-content-header">
        <div>
          <span>Nội dung / Truyện #{story.id}</span>
          <h2>{chapter.title}</h2>
        </div>
        <p>
          {story.title} · Chương {chapter.number} · {chapter.publicationStatusLabel}
        </p>
      </div>

      <nav className="admin-story-tabs" aria-label="Điều hướng chương">
        <Link href={`/admin/truyen/${story.id}`}>Truyện</Link>
        <Link href={`/admin/truyen/${story.id}#chuong`}>Chương</Link>
        {story.publicationStatus === "published" && chapter.publicationStatus === "published" ? (
          <Link href={`/truyen/${story.slug}/${chapter.slug}`} prefetch={false}>
            Public
          </Link>
        ) : null}
      </nav>

      <div className="admin-story-detail-grid">
        <form
          action={saveChapterDraftAction}
          aria-label="Biên tập chương"
          className="admin-data-panel admin-story-form"
          data-admin-save-chapter-form
        >
          <input name="storyId" type="hidden" value={story.id} />
          <input name="chapterId" type="hidden" value={chapter.id} />

          <div className="admin-panel-heading">
            <div>
              <h3>Hồ sơ chương</h3>
              <span>Metadata và nội dung</span>
            </div>
            <span className={`admin-status-pill is-${chapter.publicationStatus}`}>
              {chapter.publicationStatusLabel}
            </span>
          </div>

          <label className="admin-filter-field">
            <span>Tên chương</span>
            <input name="title" defaultValue={chapter.title} />
          </label>

          <div className="admin-story-form-grid">
            <label className="admin-filter-field">
              <span>Slug</span>
              <input name="slug" defaultValue={chapter.slug} />
            </label>

            <label className="admin-filter-field">
              <span>Số chương</span>
              <input
                name="number"
                defaultValue={chapter.number}
                min="0.01"
                step="0.01"
                type="number"
              />
            </label>

            <label className="admin-filter-field">
              <span>Quyền đọc</span>
              <select name="accessLevel" defaultValue={chapter.accessLevel}>
                <option value="free">free</option>
                <option value="vip">vip</option>
              </select>
            </label>

            <label className="admin-filter-field">
              <span>Ngày xuất bản</span>
              <input readOnly value={chapter.publishedAtLabel} />
            </label>
          </div>

          <label className="admin-filter-field">
            <span>Nội dung chương</span>
            <textarea name="body" defaultValue={chapter.body} rows={16} />
          </label>

          <button className="admin-filter-button" type="submit">
            Lưu bản nháp
          </button>
        </form>

        <aside className="admin-data-panel admin-story-side-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>Xuất bản chương</h3>
              <span>Trạng thái hiện tại</span>
            </div>
          </div>
          <dl className="admin-story-facts">
            <div>
              <dt>Truyện</dt>
              <dd>{story.publicationStatusLabel}</dd>
            </div>
            <div>
              <dt>Chương</dt>
              <dd>{chapter.publicationStatusLabel}</dd>
            </div>
            <div>
              <dt>Dung lượng</dt>
              <dd>{chapter.wordCountLabel}</dd>
            </div>
            <div>
              <dt>Định dạng</dt>
              <dd>{chapter.contentFormat}</dd>
            </div>
          </dl>

          <form action={publishChapterAction} data-admin-publish-chapter-form>
            <input name="storyId" type="hidden" value={story.id} />
            <input name="chapterId" type="hidden" value={chapter.id} />
            <button
              className="admin-filter-button"
              disabled={
                story.publicationStatus !== "published" ||
                chapter.publicationStatus === "published"
              }
              type="submit"
            >
              Xuất bản chương
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
