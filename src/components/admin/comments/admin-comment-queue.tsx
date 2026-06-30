import Link from "next/link";

import {
  hideCommentAction,
  restoreCommentAction,
} from "@/app/admin/binh-luan/actions";
import type {
  AdminCommentListItem,
  AdminCommentQueuePayload,
} from "@/lib/admin/comments";

type AdminCommentQueueProps = AdminCommentQueuePayload;

function AdminCommentAction({ comment }: { comment: AdminCommentListItem }) {
  if (comment.status === "visible") {
    return (
      <form action={hideCommentAction} className="admin-inline-action-form">
        <input name="commentId" type="hidden" value={comment.id} />
        <button className="admin-filter-button is-danger" type="submit">
          Ẩn
        </button>
      </form>
    );
  }

  if (comment.status === "hidden") {
    return (
      <form action={restoreCommentAction} className="admin-inline-action-form">
        <input name="commentId" type="hidden" value={comment.id} />
        <button className="admin-filter-button" type="submit">
          Khôi phục
        </button>
      </form>
    );
  }

  return <span className="admin-muted-action">Không thao tác</span>;
}

function AdminCommentRow({ comment }: { comment: AdminCommentListItem }) {
  return (
    <tr data-admin-comment-row>
      <td data-label="Bình luận">
        <span className="admin-comment-body">{comment.body}</span>
        <small>
          #{comment.id} · {comment.likeCountLabel} · cập nhật {comment.updatedAtLabel}
        </small>
      </td>
      <td data-label="Truyện">
        {comment.storyHref ? (
          <Link href={comment.storyHref} prefetch={false}>
            {comment.storyTitle}
          </Link>
        ) : (
          <span>{comment.storyTitle}</span>
        )}
        <small>{comment.chapterLabel}</small>
      </td>
      <td data-label="Người đọc">{comment.actorLabel}</td>
      <td data-label="Trạng thái">
        <span className={`admin-status-pill is-${comment.statusTone}`}>
          {comment.statusLabel}
        </span>
      </td>
      <td data-label="Thời gian">{comment.createdAtLabel}</td>
      <td data-label="Thao tác">
        <AdminCommentAction comment={comment} />
      </td>
    </tr>
  );
}

export function AdminCommentQueue({
  comments,
  filters,
  statusCounts,
  totalCount,
}: AdminCommentQueueProps) {
  return (
    <section className="admin-dashboard admin-story-admin" data-admin-comment-queue>
      <div className="admin-content-header">
        <div>
          <span>Kiểm duyệt</span>
          <h2>Duyệt bình luận</h2>
        </div>
        <p>
          {comments.length} / {totalCount} bình luận khớp bộ lọc.
        </p>
      </div>

      <form className="admin-comment-filter-form" action="/admin/binh-luan">
        <label className="admin-filter-field">
          <span>Tìm theo nội dung hoặc truyện</span>
          <input
            defaultValue={filters.q}
            name="q"
            placeholder="Nội dung, truyện, người đọc..."
            type="search"
          />
        </label>

        <label className="admin-filter-field">
          <span>Trạng thái</span>
          <select defaultValue={filters.status} name="status">
            <option value="all">Tất cả ({statusCounts.all})</option>
            <option value="visible">Hiển thị ({statusCounts.visible})</option>
            <option value="hidden">Đã ẩn ({statusCounts.hidden})</option>
            <option value="deleted">Đã xoá ({statusCounts.deleted})</option>
          </select>
        </label>

        <button className="admin-filter-button" type="submit">
          Lọc
        </button>
      </form>

      <div className="admin-data-panel">
        <div className="admin-panel-heading">
          <div>
            <h3>Hàng đợi bình luận</h3>
            <span>100 bình luận mới nhất, gồm visible, hidden và deleted</span>
          </div>
        </div>

        {comments.length ? (
          <table className="admin-recent-table admin-comment-table">
            <thead>
              <tr>
                <th>Bình luận</th>
                <th>Truyện</th>
                <th>Người đọc</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <AdminCommentRow comment={comment} key={comment.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="admin-empty-state" role="status">
            Không có bình luận khớp bộ lọc.
          </p>
        )}
      </div>
    </section>
  );
}
