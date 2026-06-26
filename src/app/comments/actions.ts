"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const commentBodySchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().min(1).max(2000));

const storySlugSchema = z.string().min(1).max(160).regex(/^[a-z0-9-]+$/);

const createCommentSchema = z.object({
  storyId: z.number().int().positive(),
  storySlug: storySlugSchema,
  chapterId: z.number().int().positive().nullable().optional(),
  parentId: z.number().int().positive().nullable().optional(),
  body: commentBodySchema,
});

const updateCommentSchema = z.object({
  commentId: z.number().int().positive(),
  storySlug: storySlugSchema,
  body: commentBodySchema,
});

const deleteCommentSchema = z.object({
  commentId: z.number().int().positive(),
  storySlug: storySlugSchema,
});

export type CommentMutationResult = {
  ok: boolean;
  authRequired?: boolean;
  message?: string;
};

export async function createCommentAction(
  input: unknown,
): Promise<CommentMutationResult> {
  const parsed = createCommentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Bình luận cần từ 1 đến 2000 ký tự." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, authRequired: true };
  }

  const { storyId, storySlug, chapterId, parentId, body } = parsed.data;
  const { error } = await supabase.from("comments").insert({
    user_id: user.id,
    story_id: storyId,
    chapter_id: chapterId ?? null,
    parent_id: parentId ?? null,
    body,
  });

  if (error) {
    return {
      ok: false,
      message: "Chưa thể gửi bình luận. Vui lòng thử lại.",
    };
  }

  revalidatePath(`/truyen/${storySlug}`);
  return { ok: true };
}

export async function updateOwnCommentAction(
  input: unknown,
): Promise<CommentMutationResult> {
  const parsed = updateCommentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Bình luận cần từ 1 đến 2000 ký tự." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, authRequired: true };
  }

  const { commentId, storySlug, body } = parsed.data;
  const { error, count } = await supabase
    .from("comments")
    .update({ body, updated_at: new Date().toISOString() }, { count: "exact" })
    .eq("id", commentId)
    .eq("user_id", user.id)
    .eq("status", "visible");

  if (error || count !== 1) {
    return {
      ok: false,
      message: "Chưa thể sửa bình luận này.",
    };
  }

  revalidatePath(`/truyen/${storySlug}`);
  return { ok: true };
}

export async function deleteOwnCommentAction(
  input: unknown,
): Promise<CommentMutationResult> {
  const parsed = deleteCommentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Bình luận không hợp lệ." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, authRequired: true };
  }

  const { commentId, storySlug } = parsed.data;
  const { error, count } = await supabase
    .from("comments")
    .update(
      {
        body: "[deleted]",
        status: "deleted",
        updated_at: new Date().toISOString(),
      },
      { count: "exact" },
    )
    .eq("id", commentId)
    .eq("user_id", user.id)
    .eq("status", "visible");

  if (error || count !== 1) {
    return {
      ok: false,
      message: "Chưa thể xóa bình luận này.",
    };
  }

  revalidatePath(`/truyen/${storySlug}`);
  return { ok: true };
}
