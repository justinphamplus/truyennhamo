"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { StoryReadingProgress } from "@/lib/queries/reading-progress";

type ReadingProgressTrackerProps = {
  storyId: number;
  chapterId: number;
  initialProgress: StoryReadingProgress | null;
};

type SaveState = "idle" | "saving" | "saved" | "error";

type SaveReadingProgressResult = {
  ok: boolean;
  progressPercent?: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function ReadingProgressTracker({
  storyId,
  chapterId,
  initialProgress,
}: ReadingProgressTrackerProps) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedPercent, setSavedPercent] = useState(
    initialProgress?.chapterId === chapterId
      ? Math.round(initialProgress.progressPercent)
      : 0,
  );
  const dirtyRef = useRef(true);
  const savingRef = useRef(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSlot(document.querySelector<HTMLElement>("[data-reading-progress-slot]"));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const paper = document.querySelector<HTMLElement>("[data-reader-paper]");
    if (!paper) return;
    const readerPaper = paper;

    let mounted = true;
    let restoring = true;
    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    let restoreFrame = 0;

    function measure() {
      const paperTop = readerPaper.offsetTop;
      const progressPercent = clamp(
        ((window.scrollY + window.innerHeight - paperTop) /
          Math.max(1, readerPaper.offsetHeight)) *
          100,
        0,
        100,
      );

      return {
        progressPercent,
        scrollOffset: Math.max(0, Math.round(window.scrollY)),
      };
    }

    async function flush() {
      if (!dirtyRef.current || savingRef.current) return;

      dirtyRef.current = false;
      savingRef.current = true;
      if (mounted) setSaveState("saving");
      const measured = measure();
      const response = await fetch("/api/reading-progress", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          storyId,
          chapterId,
          ...measured,
        }),
      });
      const result = (await response.json()) as SaveReadingProgressResult;
      savingRef.current = false;

      if (!response.ok || !result.ok) {
        dirtyRef.current = true;
        if (mounted) setSaveState("error");
        return;
      }

      if (mounted) {
        setSavedPercent(Math.round(result.progressPercent ?? measured.progressPercent));
        setSaveState("saved");
      }
    }

    function scheduleSave() {
      if (restoring) return;
      dirtyRef.current = true;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => void flush(), 1_200);
    }

    function restorePosition() {
      if (
        initialProgress?.chapterId === chapterId &&
        initialProgress.progressPercent > 0
      ) {
        const target =
          readerPaper.offsetTop +
          (initialProgress.progressPercent / 100) * readerPaper.offsetHeight -
          window.innerHeight;
        window.scrollTo({ top: Math.max(0, target), behavior: "instant" });
      }

      requestAnimationFrame(() => {
        restoring = false;
        saveTimer = setTimeout(() => void flush(), 1_200);
      });
    }

    function waitForReaderContent(attempt = 0) {
      const content = readerPaper.querySelector("[data-reader-content]");
      if (!content?.childElementCount && attempt < 60) {
        restoreFrame = requestAnimationFrame(() =>
          waitForReaderContent(attempt + 1),
        );
        return;
      }

      restorePosition();
    }

    restoreFrame = requestAnimationFrame(() => waitForReaderContent());
    const interval = window.setInterval(() => void flush(), 15_000);
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") void flush();
    };

    window.addEventListener("scroll", scheduleSave, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      mounted = false;
      cancelAnimationFrame(restoreFrame);
      clearTimeout(saveTimer);
      clearInterval(interval);
      window.removeEventListener("scroll", scheduleSave);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", handleVisibility);
      void flush();
    };
  }, [chapterId, initialProgress, storyId]);

  if (!slot) return null;

  const text =
    saveState === "saving"
      ? "Đang lưu tiến độ…"
      : saveState === "error"
        ? "Chưa lưu được tiến độ"
        : saveState === "saved"
          ? `Đã lưu ${savedPercent}%`
          : "Tự động lưu tiến độ";

  return createPortal(
    <span
      className="reader-progress-status"
      data-save-state={saveState}
      role="status"
      aria-live="polite"
    >
      <span className="material-symbols-rounded" aria-hidden="true">
        {saveState === "error" ? "sync_problem" : "bookmark_added"}
      </span>
      {text}
    </span>,
    slot,
  );
}
