"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const readingProgressSchema = z.object({
  storyId: z.number().int().positive(),
  chapterId: z.number().int().positive(),
  progressPercent: z.number().min(0).max(100),
  scrollOffset: z.number().int().min(0),
});

export type SaveReadingProgressResult = {
  ok: boolean;
  progressPercent?: number;
  message?: string;
};

export async function saveReadingProgressAction(
  input: unknown,
): Promise<SaveReadingProgressResult> {
  const parsed = readingProgressSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Tiến độ đọc không hợp lệ." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Bạn cần đăng nhập để lưu tiến độ." };
  }

  const { storyId, chapterId, progressPercent, scrollOffset } = parsed.data;
  const { data: chapter, error: chapterError } = await supabase
    .from("chapters")
    .select("id")
    .eq("id", chapterId)
    .eq("story_id", storyId)
    .eq("publication_status", "published")
    .eq("access_level", "free")
    .maybeSingle();

  if (chapterError || !chapter) {
    return { ok: false, message: "Chương này chưa thể lưu tiến độ." };
  }

  const now = new Date().toISOString();
  const roundedPercent = Math.round(progressPercent * 100) / 100;
  const { error } = await supabase.from("reading_progress").upsert(
    {
      user_id: user.id,
      story_id: storyId,
      chapter_id: chapterId,
      progress_percent: roundedPercent,
      scroll_offset: scrollOffset,
      last_read_at: now,
      updated_at: now,
    },
    { onConflict: "user_id,story_id" },
  );

  if (error) {
    return {
      ok: false,
      message: "Chưa thể lưu tiến độ. Vui lòng thử lại.",
    };
  }

  revalidatePath("/tu-truyen");
  revalidatePath("/");

  return { ok: true, progressPercent: roundedPercent };
}
