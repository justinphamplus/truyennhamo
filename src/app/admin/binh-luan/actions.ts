"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/admin/auth";
import {
  adminCommentModerationInputSchema,
  adminMutationError,
  type AdminMutationResult,
  adminMutationSuccess,
} from "@/lib/admin/validators";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

type CommentModerationData = {
  commentId: number;
  status: "visible" | "hidden";
};

type CommentModerationResult = AdminMutationResult<CommentModerationData>;

type ModerationCommentRow = {
  id: number;
  status: string;
  story:
    | {
        slug: string;
        publication_status: string;
      }
    | null;
};

function getFormNumber(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? Number(value) : NaN;
}

function revalidateCommentModerationPaths(storySlug: string | null) {
  revalidatePath("/admin", "page");
  revalidatePath("/admin/binh-luan", "page");
  if (storySlug) revalidatePath(`/truyen/${storySlug}`, "page");
}

async function getModerationComment(commentId: number) {
  const { data, error } = await getAdminSupabaseClient()
    .from("comments")
    .select("id, status, story:stories(slug, publication_status)")
    .eq("id", commentId)
    .maybeSingle();

  return {
    data: data as ModerationCommentRow | null,
    error,
  };
}

async function moderateCommentMutation(
  formData: FormData,
  nextStatus: "visible" | "hidden",
): Promise<CommentModerationResult> {
  await requireAdminUser();

  const parsed = adminCommentModerationInputSchema.safeParse({
    commentId: getFormNumber(formData, "commentId"),
  });

  if (!parsed.success) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Bình luận không hợp lệ.",
      parsed.error.flatten(),
    );
  }

  const { commentId } = parsed.data;
  const { data: comment, error: loadError } = await getModerationComment(commentId);

  if (loadError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể tải bình luận.");
  }

  if (!comment) {
    return adminMutationError("NOT_FOUND", "Không tìm thấy bình luận.");
  }

  if (nextStatus === "visible" && comment.story?.publication_status !== "published") {
    return adminMutationError(
      "CONFLICT",
      "Chỉ khôi phục bình luận khi truyện đang xuất bản.",
    );
  }

  const currentStatus = nextStatus === "hidden" ? "visible" : "hidden";
  const { data: updatedComment, error: updateError } = await getAdminSupabaseClient()
    .from("comments")
    .update({ status: nextStatus, updated_at: new Date().toISOString() })
    .eq("id", commentId)
    .eq("status", currentStatus)
    .select("id, status")
    .maybeSingle();

  if (updateError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể cập nhật bình luận.");
  }

  if (!updatedComment) {
    return adminMutationError("CONFLICT", "Trạng thái bình luận đã thay đổi.");
  }

  revalidateCommentModerationPaths(comment.story?.slug ?? null);

  return adminMutationSuccess(
    { commentId, status: nextStatus },
    nextStatus === "hidden" ? "Đã ẩn bình luận." : "Đã khôi phục bình luận.",
  );
}

export async function hideCommentAction(formData: FormData): Promise<void> {
  const result = await moderateCommentMutation(formData, "hidden");
  if (!result.ok) throw new Error("Admin comment hide failed.");
  redirect("/admin/binh-luan?saved=hidden");
}

export async function restoreCommentAction(formData: FormData): Promise<void> {
  const result = await moderateCommentMutation(formData, "visible");
  if (!result.ok) throw new Error("Admin comment restore failed.");
  redirect("/admin/binh-luan?saved=visible");
}
