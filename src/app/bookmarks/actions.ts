"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const toggleBookmarkSchema = z.object({
  storyId: z.number().int().positive(),
  storySlug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/),
  bookmarked: z.boolean(),
});

export type ToggleBookmarkResult = {
  ok: boolean;
  bookmarked: boolean;
  authRequired?: boolean;
  message?: string;
};

export async function toggleBookmarkAction(
  input: z.input<typeof toggleBookmarkSchema>,
): Promise<ToggleBookmarkResult> {
  const parsed = toggleBookmarkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      bookmarked: false,
      message: "Thông tin truyện không hợp lệ.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      bookmarked: !parsed.data.bookmarked,
      authRequired: true,
    };
  }

  const { storyId, storySlug, bookmarked } = parsed.data;
  const mutation = bookmarked
    ? supabase.from("bookmarks").upsert(
        { user_id: user.id, story_id: storyId },
        { onConflict: "user_id,story_id", ignoreDuplicates: true },
      )
    : supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("story_id", storyId);
  const { error } = await mutation;

  if (error) {
    return {
      ok: false,
      bookmarked: !bookmarked,
      message: "Chưa thể cập nhật tủ truyện. Vui lòng thử lại.",
    };
  }

  revalidatePath(`/truyen/${storySlug}`);
  revalidatePath("/tu-truyen");
  revalidatePath("/");

  return { ok: true, bookmarked };
}
