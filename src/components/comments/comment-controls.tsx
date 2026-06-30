"use client";

import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";

import {
  createCommentAction,
  deleteOwnCommentAction,
  updateOwnCommentAction,
} from "@/app/comments/actions";
import type { StoryComment } from "@/lib/queries/story-detail";

type CommentControlsProps = {
  storyId: number;
  storySlug: string;
  initialComments: StoryComment[];
  authenticated: boolean;
};

export function CommentControls({
  storyId,
  storySlug,
  initialComments,
  authenticated,
}: CommentControlsProps) {
  const router = useRouter();
  const [listSlot, setListSlot] = useState<HTMLElement | null>(null);
  const [form, setForm] = useState<HTMLFormElement | null>(null);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingBody, setEditingBody] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const commentList = document.querySelector<HTMLElement>("[data-comment-list]");
      if (commentList) commentList.textContent = "";
      setListSlot(commentList);
      setForm(document.querySelector<HTMLFormElement>(".comment-form"));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!form) return;

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (!authenticated) {
        router.push(
          `/dang-nhap?next=${encodeURIComponent(`/truyen/${storySlug}`)}`,
        );
        return;
      }

      const input = form.querySelector<HTMLInputElement>("#comment-input");
      const body = input?.value.trim() ?? "";
      if (!body) return;

      setMessage("");
      startTransition(async () => {
        const result = await createCommentAction({ storyId, storySlug, body });

        if (result.authRequired) {
          router.push(
            `/dang-nhap?next=${encodeURIComponent(`/truyen/${storySlug}`)}`,
          );
          return;
        }

        if (!result.ok) {
          setMessage(result.message ?? "Chưa thể gửi bình luận.");
          return;
        }

        if (input) input.value = "";
        window.location.reload();
      });
    };

    form.addEventListener("submit", handleSubmit, { capture: true });
    return () => form.removeEventListener("submit", handleSubmit, { capture: true });
  }, [authenticated, form, router, storyId, storySlug]);

  function startEdit(comment: StoryComment) {
    setEditingId(comment.id);
    setEditingBody(comment.body);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingBody("");
  }

  function submitEdit(event: FormEvent<HTMLFormElement>, commentId: number) {
    event.preventDefault();
    const body = editingBody.trim();
    if (!body) return;

    setMessage("");
    startTransition(async () => {
      const result = await updateOwnCommentAction({
        commentId,
        storySlug,
        body,
      });

      if (result.authRequired) {
        router.push(
          `/dang-nhap?next=${encodeURIComponent(`/truyen/${storySlug}`)}`,
        );
        return;
      }

      if (!result.ok) {
        setMessage(result.message ?? "Chưa thể sửa bình luận.");
        return;
      }

      setEditingId(null);
      setEditingBody("");
      window.location.reload();
    });
  }

  function deleteComment(commentId: number) {
    setMessage("");
    startTransition(async () => {
      const result = await deleteOwnCommentAction({ commentId, storySlug });

      if (result.authRequired) {
        router.push(
          `/dang-nhap?next=${encodeURIComponent(`/truyen/${storySlug}`)}`,
        );
        return;
      }

      if (!result.ok) {
        setMessage(result.message ?? "Chưa thể xóa bình luận.");
        return;
      }

      window.location.reload();
    });
  }

  const list = (
    <>
      {initialComments.length ? (
        initialComments.map((comment) => (
          <article className="comment" key={comment.id}>
            <span className="avatar">{comment.authorInitial}</span>
            <div className="comment-body">
              <strong>{comment.authorName}</strong>
              {editingId === comment.id ? (
                <form
                  className="comment-edit-form"
                  onSubmit={(event) => submitEdit(event, comment.id)}
                >
                  <label className="sr-only" htmlFor={`comment-edit-${comment.id}`}>
                    Sửa bình luận
                  </label>
                  <textarea
                    id={`comment-edit-${comment.id}`}
                    maxLength={2000}
                    value={editingBody}
                    onChange={(event) => setEditingBody(event.target.value)}
                  />
                  <span className="comment-actions">
                    <button className="text-button" disabled={isPending} type="submit">
                      Lưu
                    </button>
                    <button
                      className="text-button"
                      disabled={isPending}
                      type="button"
                      onClick={cancelEdit}
                    >
                      Hủy
                    </button>
                  </span>
                </form>
              ) : (
                <>
                  <p>{comment.body}</p>
                  <span className="comment-meta">
                    <time dateTime={comment.createdAt}>{comment.relativeTime}</time>
                    {comment.canMutate ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <button
                          className="text-button"
                          disabled={isPending}
                          type="button"
                          onClick={() => startEdit(comment)}
                        >
                          Sửa
                        </button>
                        <span aria-hidden="true">·</span>
                        <button
                          className="text-button"
                          disabled={isPending}
                          type="button"
                          onClick={() => deleteComment(comment.id)}
                        >
                          Xóa
                        </button>
                      </>
                    ) : null}
                  </span>
                </>
              )}
            </div>
          </article>
        ))
      ) : (
        <p className="continue-empty" role="status">
          Chưa có bình luận nào. Hãy là người mở lời.
        </p>
      )}
      <span className="visually-hidden" role="status" aria-live="polite">
        {message}
      </span>
    </>
  );

  return listSlot ? createPortal(list, listSlot) : null;
}
