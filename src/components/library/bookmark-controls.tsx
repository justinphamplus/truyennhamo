"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";

import { toggleBookmarkAction } from "@/app/bookmarks/actions";

type BookmarkControlsProps = {
  storyId: number;
  storySlug: string;
  initialBookmarked: boolean;
  authenticated: boolean;
};

export function BookmarkControls({
  storyId,
  storySlug,
  initialBookmarked,
  authenticated,
}: BookmarkControlsProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [message, setMessage] = useState("");
  const [slots, setSlots] = useState<HTMLElement[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSlots(
        Array.from(
          document.querySelectorAll<HTMLElement>("[data-bookmark-slot]"),
        ),
      );
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function toggle() {
    if (!authenticated) {
      router.push(
        `/dang-nhap?next=${encodeURIComponent(`/truyen/${storySlug}`)}`,
      );
      return;
    }

    const nextBookmarked = !bookmarked;
    setBookmarked(nextBookmarked);
    setMessage("");

    startTransition(async () => {
      const result = await toggleBookmarkAction({
        storyId,
        storySlug,
        bookmarked: nextBookmarked,
      });

      if (result.authRequired) {
        setBookmarked(!nextBookmarked);
        router.push(
          `/dang-nhap?next=${encodeURIComponent(`/truyen/${storySlug}`)}`,
        );
        return;
      }

      if (!result.ok) {
        setBookmarked(result.bookmarked);
        setMessage(result.message ?? "Chưa thể cập nhật tủ truyện.");
        return;
      }

      setBookmarked(result.bookmarked);
      setMessage(
        result.bookmarked
          ? "Đã thêm truyện vào tủ."
          : "Đã bỏ truyện khỏi tủ.",
      );
      router.refresh();
    });
  }

  const label = bookmarked ? "Đã theo dõi" : "Theo dõi";

  return (
    <>
      {slots.map((slot) =>
        createPortal(
          <button
            className={
              slot.dataset.bookmarkSlot === "author"
                ? `mini-button bookmark-button${bookmarked ? " is-active" : ""}`
                : `button ghost bookmark-button${bookmarked ? " is-active" : ""}`
            }
            type="button"
            aria-pressed={bookmarked}
            aria-label={
              bookmarked ? "Bỏ truyện khỏi tủ" : "Thêm truyện vào tủ"
            }
            disabled={isPending}
            onClick={toggle}
          >
            {slot.dataset.bookmarkSlot === "author" ? null : (
              <span className="material-symbols-rounded" aria-hidden="true">
                {bookmarked ? "favorite" : "favorite_border"}
              </span>
            )}
            {isPending ? "Đang lưu…" : label}
          </button>,
          slot,
        ),
      )}
      <span className="visually-hidden" role="status" aria-live="polite">
        {message}
      </span>
    </>
  );
}
