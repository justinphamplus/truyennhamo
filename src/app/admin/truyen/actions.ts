"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/admin/auth";
import {
  adminChapterMutationDataSchema,
  adminChapterUpsertInputSchema,
  adminArchiveStoryInputSchema,
  adminMutationError,
  type AdminMutationResult,
  adminMutationSuccess,
  adminPublishChapterInputSchema,
  adminPublishStoryInputSchema,
  adminStoryCoverInputSchema,
  adminStoryMutationDataSchema,
  type AdminStoryStatus,
} from "@/lib/admin/validators";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

const STORY_COVER_BUCKET = "story-covers";
const STORY_COVER_MAX_BYTES = 5 * 1024 * 1024;
const STORY_COVER_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type StoryMutationData = {
  storyId: number;
  slug: string;
  status: AdminStoryStatus;
};

type StoryMutationResult = AdminMutationResult<StoryMutationData>;

type ChapterMutationData = {
  storyId: number;
  chapterId: number;
  slug: string;
  status: AdminStoryStatus;
};

type ChapterMutationResult = AdminMutationResult<ChapterMutationData>;

type StoryCoverMutationData = {
  storyId: number;
  slug: string;
  coverPath: string | null;
};

type StoryCoverMutationResult = AdminMutationResult<StoryCoverMutationData>;

function getFormString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function revalidateStoryPaths(storyId: number, slug: string) {
  revalidatePath("/", "page");
  revalidatePath("/tim-kiem", "page");
  revalidatePath("/admin", "page");
  revalidatePath("/admin/truyen", "page");
  revalidatePath(`/admin/truyen/${storyId}`, "page");
  revalidatePath(`/truyen/${slug}`, "page");
}

function revalidateChapterPaths(
  storyId: number,
  storySlug: string,
  chapterId: number,
  chapterSlug: string,
  previousChapterSlug = chapterSlug,
) {
  revalidateStoryPaths(storyId, storySlug);
  revalidatePath(`/admin/truyen/${storyId}/chuong/${chapterId}`, "page");
  revalidatePath(`/truyen/${storySlug}/${chapterSlug}`, "page");
  if (previousChapterSlug !== chapterSlug) {
    revalidatePath(`/truyen/${storySlug}/${previousChapterSlug}`, "page");
  }
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function asStoryStatus(value: string): AdminStoryStatus {
  if (value === "draft" || value === "archived") return value;
  return "published";
}

function getStoryCoverExtension(type: string) {
  return STORY_COVER_EXTENSIONS[type as keyof typeof STORY_COVER_EXTENSIONS];
}

function hasExpectedImageSignature(bytes: Uint8Array, type: string) {
  if (type === "image/jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (type === "image/png") {
    return (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47
    );
  }

  if (type === "image/webp") {
    return (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }

  return false;
}

function getStoryCoverObjectPath(coverPath: string | null) {
  if (!coverPath) return null;

  const publicPathMarker = `/storage/v1/object/public/${STORY_COVER_BUCKET}/`;

  try {
    const url = new URL(coverPath);
    const markerIndex = url.pathname.indexOf(publicPathMarker);
    if (markerIndex === -1) return null;
    return decodeURIComponent(
      url.pathname.slice(markerIndex + publicPathMarker.length),
    );
  } catch {
    const relativeMarker = `${STORY_COVER_BUCKET}/`;
    return coverPath.startsWith(relativeMarker)
      ? coverPath.slice(relativeMarker.length)
      : null;
  }
}

function storyMutationSuccess(
  storyId: number,
  slug: string,
  status: AdminStoryStatus,
  message: string,
): StoryMutationResult {
  return adminMutationSuccess(
    adminStoryMutationDataSchema.parse({ storyId, slug, status }),
    message,
  );
}

function chapterMutationSuccess(
  storyId: number,
  chapterId: number,
  slug: string,
  status: AdminStoryStatus,
  message: string,
): ChapterMutationResult {
  return adminMutationSuccess(
    adminChapterMutationDataSchema.parse({ storyId, chapterId, slug, status }),
    message,
  );
}

function storyCoverMutationSuccess(
  storyId: number,
  slug: string,
  coverPath: string | null,
  message: string,
): StoryCoverMutationResult {
  return adminMutationSuccess({ storyId, slug, coverPath }, message);
}

async function publishStoryMutation(
  formData: FormData,
): Promise<StoryMutationResult> {
  await requireAdminUser();

  const parsed = adminPublishStoryInputSchema.safeParse({
    storyId: Number(getFormString(formData, "storyId")),
    storySlug: getFormString(formData, "storySlug"),
    publishedAt: new Date().toISOString(),
  });

  if (!parsed.success) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Thông tin xuất bản truyện không hợp lệ.",
      parsed.error.flatten(),
    );
  }

  const { storyId, storySlug, publishedAt } = parsed.data;
  const supabase = getAdminSupabaseClient();
  const { data: story, error: storyError } = await supabase
    .from("stories")
    .select("id, slug, published_at, latest_published_at")
    .eq("id", storyId)
    .eq("slug", storySlug)
    .maybeSingle();

  if (storyError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể tải truyện.");
  }

  if (!story) {
    return adminMutationError("NOT_FOUND", "Không tìm thấy truyện.");
  }

  const { data: updatedStory, error: updateError } = await supabase
    .from("stories")
    .update({
      publication_status: "published",
      published_at: story.published_at ?? publishedAt,
      latest_published_at: story.latest_published_at ?? publishedAt,
      updated_at: publishedAt,
    })
    .eq("id", storyId)
    .eq("slug", storySlug)
    .select("id, slug, publication_status")
    .maybeSingle();

  if (updateError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể xuất bản truyện.");
  }

  if (!updatedStory) {
    return adminMutationError("NOT_FOUND", "Không tìm thấy truyện.");
  }

  revalidateStoryPaths(storyId, storySlug);

  return storyMutationSuccess(
    storyId,
    updatedStory.slug,
    "published",
    "Đã xuất bản truyện.",
  );
}

export async function publishStoryAction(formData: FormData): Promise<void> {
  const result = await publishStoryMutation(formData);
  if (!result.ok) throw new Error("Admin story publish failed.");
  redirect(`/admin/truyen/${result.data.storyId}?saved=published`);
}

async function archiveStoryMutation(
  formData: FormData,
): Promise<StoryMutationResult> {
  await requireAdminUser();

  const parsed = adminArchiveStoryInputSchema.safeParse({
    storyId: Number(getFormString(formData, "storyId")),
    storySlug: getFormString(formData, "storySlug"),
    confirmation: getFormString(formData, "confirmation"),
  });

  if (!parsed.success) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Cần xác nhận trước khi lưu trữ truyện.",
      parsed.error.flatten(),
    );
  }

  const { storyId, storySlug } = parsed.data;
  const updatedAt = new Date().toISOString();
  const { data: updatedStory, error } = await getAdminSupabaseClient()
    .from("stories")
    .update({
      publication_status: "archived",
      updated_at: updatedAt,
    })
    .eq("id", storyId)
    .eq("slug", storySlug)
    .select("id, slug, publication_status")
    .maybeSingle();

  if (error) {
    return adminMutationError("SERVER_ERROR", "Chưa thể lưu trữ truyện.");
  }

  if (!updatedStory) {
    return adminMutationError("NOT_FOUND", "Không tìm thấy truyện.");
  }

  revalidateStoryPaths(storyId, storySlug);

  return storyMutationSuccess(
    storyId,
    updatedStory.slug,
    "archived",
    "Đã lưu trữ truyện.",
  );
}

export async function archiveStoryAction(formData: FormData): Promise<void> {
  const result = await archiveStoryMutation(formData);
  if (!result.ok) throw new Error("Admin story archive failed.");
  redirect(`/admin/truyen/${result.data.storyId}?saved=archived`);
}

async function uploadStoryCoverMutation(
  formData: FormData,
): Promise<StoryCoverMutationResult> {
  await requireAdminUser();

  const parsed = adminStoryCoverInputSchema.safeParse({
    storyId: Number(getFormString(formData, "storyId")),
    storySlug: getFormString(formData, "storySlug"),
  });
  const file = formData.get("coverFile");

  if (!parsed.success || !(file instanceof File)) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Thông tin ảnh bìa không hợp lệ.",
      parsed.success ? undefined : parsed.error.flatten(),
    );
  }

  if (file.size <= 0 || file.size > STORY_COVER_MAX_BYTES) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Ảnh bìa phải nhỏ hơn hoặc bằng 5MB.",
    );
  }

  const extension = getStoryCoverExtension(file.type);
  if (!extension) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Ảnh bìa chỉ hỗ trợ JPG, PNG hoặc WebP.",
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!hasExpectedImageSignature(bytes, file.type)) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Nội dung ảnh bìa không khớp định dạng đã chọn.",
    );
  }

  const { storyId, storySlug } = parsed.data;
  const supabase = getAdminSupabaseClient();
  const { data: story, error: storyError } = await supabase
    .from("stories")
    .select("id, slug, cover_path")
    .eq("id", storyId)
    .eq("slug", storySlug)
    .maybeSingle();

  if (storyError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể tải truyện.");
  }

  if (!story) {
    return adminMutationError("NOT_FOUND", "Không tìm thấy truyện.");
  }

  const objectPath = `${storyId}/${Date.now()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from(STORY_COVER_BUCKET)
    .upload(objectPath, bytes, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể tải ảnh bìa lên.");
  }

  const { data: publicUrl } = supabase.storage
    .from(STORY_COVER_BUCKET)
    .getPublicUrl(objectPath);
  const updatedAt = new Date().toISOString();
  const { data: updatedStory, error: updateError } = await supabase
    .from("stories")
    .update({
      cover_path: publicUrl.publicUrl,
      updated_at: updatedAt,
    })
    .eq("id", storyId)
    .eq("slug", storySlug)
    .select("id, slug, cover_path")
    .maybeSingle();

  if (updateError || !updatedStory) {
    await supabase.storage.from(STORY_COVER_BUCKET).remove([objectPath]);
    return adminMutationError(
      updateError ? "SERVER_ERROR" : "NOT_FOUND",
      updateError ? "Chưa thể cập nhật ảnh bìa." : "Không tìm thấy truyện.",
    );
  }

  const previousObjectPath = getStoryCoverObjectPath(story.cover_path);
  if (previousObjectPath && previousObjectPath !== objectPath) {
    await supabase.storage.from(STORY_COVER_BUCKET).remove([previousObjectPath]);
  }

  revalidateStoryPaths(storyId, updatedStory.slug);

  return storyCoverMutationSuccess(
    storyId,
    updatedStory.slug,
    updatedStory.cover_path,
    "Đã cập nhật ảnh bìa.",
  );
}

export async function uploadStoryCoverAction(formData: FormData): Promise<void> {
  const result = await uploadStoryCoverMutation(formData);
  if (!result.ok) throw new Error(result.error.message);
  redirect(`/admin/truyen/${result.data.storyId}?saved=cover`);
}

async function deleteStoryCoverMutation(
  formData: FormData,
): Promise<StoryCoverMutationResult> {
  await requireAdminUser();

  const parsed = adminStoryCoverInputSchema.safeParse({
    storyId: Number(getFormString(formData, "storyId")),
    storySlug: getFormString(formData, "storySlug"),
  });

  if (!parsed.success) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Thông tin ảnh bìa không hợp lệ.",
      parsed.error.flatten(),
    );
  }

  const { storyId, storySlug } = parsed.data;
  const supabase = getAdminSupabaseClient();
  const { data: story, error: storyError } = await supabase
    .from("stories")
    .select("id, slug, cover_path")
    .eq("id", storyId)
    .eq("slug", storySlug)
    .maybeSingle();

  if (storyError) {
    return adminMutationError("SERVER_ERROR", "Chưa thể tải truyện.");
  }

  if (!story) {
    return adminMutationError("NOT_FOUND", "Không tìm thấy truyện.");
  }

  const { data: updatedStory, error: updateError } = await supabase
    .from("stories")
    .update({
      cover_path: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", storyId)
    .eq("slug", storySlug)
    .select("id, slug, cover_path")
    .maybeSingle();

  if (updateError || !updatedStory) {
    return adminMutationError(
      updateError ? "SERVER_ERROR" : "NOT_FOUND",
      updateError ? "Chưa thể xoá ảnh bìa." : "Không tìm thấy truyện.",
    );
  }

  const objectPath = getStoryCoverObjectPath(story.cover_path);
  if (objectPath) {
    const { error: removeError } = await supabase.storage
      .from(STORY_COVER_BUCKET)
      .remove([objectPath]);
    if (removeError) {
      return adminMutationError("SERVER_ERROR", "Chưa thể xoá file ảnh bìa.");
    }
  }

  revalidateStoryPaths(storyId, updatedStory.slug);

  return storyCoverMutationSuccess(
    storyId,
    updatedStory.slug,
    null,
    "Đã xoá ảnh bìa.",
  );
}

export async function deleteStoryCoverAction(formData: FormData): Promise<void> {
  const result = await deleteStoryCoverMutation(formData);
  if (!result.ok) throw new Error(result.error.message);
  redirect(`/admin/truyen/${result.data.storyId}?saved=cover-deleted`);
}

async function saveChapterDraftMutation(
  formData: FormData,
): Promise<ChapterMutationResult> {
  await requireAdminUser();

  const parsed = adminChapterUpsertInputSchema.safeParse({
    storyId: Number(getFormString(formData, "storyId")),
    chapterId: Number(getFormString(formData, "chapterId")),
    title: getFormString(formData, "title"),
    slug: getFormString(formData, "slug"),
    number: Number(getFormString(formData, "number")),
    accessLevel: getFormString(formData, "accessLevel"),
    body: getFormString(formData, "body"),
    status: "draft",
    publishedAt: null,
  });

  if (!parsed.success) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Thông tin chương không hợp lệ.",
      parsed.error.flatten(),
    );
  }

  const { storyId, title, slug, number, accessLevel, body } = parsed.data;
  const chapterId = parsed.data.chapterId;

  if (!chapterId) {
    return adminMutationError("VALIDATION_ERROR", "Thiếu mã chương.");
  }
  const supabase = getAdminSupabaseClient();
  const updatedAt = new Date().toISOString();
  const { data: updatedChapter, error } = await supabase
    .rpc("admin_save_chapter", {
      p_story_id: storyId,
      p_chapter_id: chapterId,
      p_title: title,
      p_slug: slug,
      p_chapter_number: number,
      p_access_level: accessLevel,
      p_body: body,
      p_word_count: countWords(body),
      p_updated_at: updatedAt,
    })
    .single();

  if (error) {
    return adminMutationError("SERVER_ERROR", "Chưa thể lưu chương.");
  }

  revalidateChapterPaths(
    updatedChapter.story_id,
    updatedChapter.story_slug,
    updatedChapter.chapter_id,
    updatedChapter.chapter_slug,
    updatedChapter.previous_chapter_slug,
  );

  const status = asStoryStatus(updatedChapter.publication_status);

  return chapterMutationSuccess(
    updatedChapter.story_id,
    updatedChapter.chapter_id,
    updatedChapter.chapter_slug,
    status,
    status === "published" ? "Đã lưu chương đã xuất bản." : "Đã lưu bản nháp chương.",
  );
}

export async function saveChapterDraftAction(formData: FormData): Promise<void> {
  const result = await saveChapterDraftMutation(formData);
  if (!result.ok) throw new Error("Admin chapter save failed.");
  redirect(
    `/admin/truyen/${result.data.storyId}/chuong/${result.data.chapterId}?saved=${result.data.status}`,
  );
}

async function publishChapterMutation(
  formData: FormData,
): Promise<ChapterMutationResult> {
  await requireAdminUser();

  const parsed = adminPublishChapterInputSchema.safeParse({
    storyId: Number(getFormString(formData, "storyId")),
    chapterId: Number(getFormString(formData, "chapterId")),
    publishedAt: new Date().toISOString(),
  });

  if (!parsed.success) {
    return adminMutationError(
      "VALIDATION_ERROR",
      "Thông tin xuất bản chương không hợp lệ.",
      parsed.error.flatten(),
    );
  }

  const { storyId, chapterId, publishedAt } = parsed.data;
  const supabase = getAdminSupabaseClient();
  const { data: updatedChapter, error } = await supabase
    .rpc("admin_publish_chapter", {
      p_story_id: storyId,
      p_chapter_id: chapterId,
      p_published_at: publishedAt,
    })
    .single();

  if (error) {
    return adminMutationError("SERVER_ERROR", "Chưa thể xuất bản chương.");
  }

  revalidateChapterPaths(
    updatedChapter.story_id,
    updatedChapter.story_slug,
    updatedChapter.chapter_id,
    updatedChapter.chapter_slug,
    updatedChapter.previous_chapter_slug,
  );

  return chapterMutationSuccess(
    updatedChapter.story_id,
    updatedChapter.chapter_id,
    updatedChapter.chapter_slug,
    "published",
    "Đã xuất bản chương.",
  );
}

export async function publishChapterAction(formData: FormData): Promise<void> {
  const result = await publishChapterMutation(formData);
  if (!result.ok) throw new Error("Admin chapter publish failed.");
  redirect(
    `/admin/truyen/${result.data.storyId}/chuong/${result.data.chapterId}?saved=published`,
  );
}
