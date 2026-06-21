"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toggleBookmarkAction } from "@/app/bookmarks/actions";

type RemoveBookmarkButtonProps = {
  storyId: number;
  storySlug: string;
  storyTitle: string;
};

export function RemoveBookmarkButton({
  storyId,
  storySlug,
  storyTitle,
}: RemoveBookmarkButtonProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function remove() {
    setError("");
    startTransition(async () => {
      const result = await toggleBookmarkAction({
        storyId,
        storySlug,
        bookmarked: false,
      });

      if (!result.ok) {
        setError(result.message ?? "Chưa thể bỏ truyện khỏi tủ.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <span className="library-remove-wrap">
      <button
        className="library-remove-button"
        type="button"
        disabled={isPending}
        onClick={remove}
        aria-label={`Bỏ ${storyTitle} khỏi tủ truyện`}
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          bookmark_remove
        </span>
        {isPending ? "Đang bỏ…" : "Bỏ theo dõi"}
      </button>
      {error ? (
        <span className="library-inline-error" role="status">
          {error}
        </span>
      ) : null}
    </span>
  );
}
