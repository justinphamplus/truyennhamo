import { z } from "zod";

export const adminStoryProductionTypeSchema = z.enum([
  "self_produced",
  "licensed_translation",
]);
export const adminStoryStatusSchema = z.enum(["draft", "published", "archived"]);
export const adminChapterAccessLevelSchema = z.enum(["free", "vip"]);
export const adminMutationErrorCodeSchema = z.enum([
  "VALIDATION_ERROR",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "SERVER_ERROR",
]);

const positiveIdSchema = z.number().int().positive();
const adminTextSchema = (max: number) => z.string().trim().min(1).max(max);
const adminSlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(160)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const publishedAtSchema = z.string().datetime().nullable().optional();
const uploaderUsernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9_]{3,32}$/);

export const adminAuthorSearchInputSchema = z
  .object({
    name: adminTextSchema(100),
    slug: adminSlugSchema.optional(),
    aliases: z.array(adminTextSchema(100)).max(12).optional(),
  })
  .strict();

export const adminStoryUpsertInputSchema = z
  .object({
    storyId: positiveIdSchema.optional(),
    title: adminTextSchema(180),
    slug: adminSlugSchema,
    description: adminTextSchema(5000),
    productionType: adminStoryProductionTypeSchema,
    author: adminAuthorSearchInputSchema,
    uploaderUsername: uploaderUsernameSchema.optional(),
    genreIds: z.array(positiveIdSchema).min(1).max(12),
    tagIds: z.array(positiveIdSchema).max(24),
    coverPath: z.string().trim().min(1).max(240).nullable().optional(),
    status: adminStoryStatusSchema,
    publishedAt: publishedAtSchema,
  })
  .strict()
  .refine((value) => value.status !== "published" || Boolean(value.publishedAt), {
    message: "Published stories require publishedAt.",
    path: ["publishedAt"],
  });

export const adminChapterUpsertInputSchema = z
  .object({
    storyId: positiveIdSchema,
    chapterId: positiveIdSchema.optional(),
    title: adminTextSchema(180),
    slug: adminSlugSchema,
    number: z.number().positive().finite(),
    accessLevel: adminChapterAccessLevelSchema,
    body: adminTextSchema(200_000),
    status: adminStoryStatusSchema,
    publishedAt: publishedAtSchema,
  })
  .strict()
  .refine((value) => value.status !== "published" || Boolean(value.publishedAt), {
    message: "Published chapters require publishedAt.",
    path: ["publishedAt"],
  });

export const adminStoryMutationDataSchema = z.object({
  storyId: positiveIdSchema,
  slug: adminSlugSchema,
  status: adminStoryStatusSchema,
});

export const adminChapterMutationDataSchema = z.object({
  storyId: positiveIdSchema,
  chapterId: positiveIdSchema,
  slug: adminSlugSchema,
  status: adminStoryStatusSchema,
});

export const adminPublishStoryInputSchema = z
  .object({
    storyId: positiveIdSchema,
    storySlug: adminSlugSchema,
    publishedAt: z.string().datetime(),
  })
  .strict();

export const adminPublishChapterInputSchema = z
  .object({
    storyId: positiveIdSchema,
    chapterId: positiveIdSchema,
    publishedAt: z.string().datetime(),
  })
  .strict();

export const adminArchiveStoryInputSchema = z
  .object({
    storyId: positiveIdSchema,
    storySlug: adminSlugSchema,
    confirmation: z.literal("ARCHIVE_STORY"),
  })
  .strict();

export const adminStoryCoverInputSchema = z
  .object({
    storyId: positiveIdSchema,
    storySlug: adminSlugSchema,
  })
  .strict();

export const adminArchiveChapterInputSchema = z
  .object({
    storyId: positiveIdSchema,
    chapterId: positiveIdSchema,
    confirmation: z.literal("ARCHIVE_CHAPTER"),
  })
  .strict();

export const adminCommentModerationInputSchema = z
  .object({
    commentId: positiveIdSchema,
  })
  .strict();

export type AdminStoryProductionType = z.infer<
  typeof adminStoryProductionTypeSchema
>;
export type AdminStoryStatus = z.infer<typeof adminStoryStatusSchema>;
export type AdminChapterAccessLevel = z.infer<
  typeof adminChapterAccessLevelSchema
>;
export type AdminAuthorSearchInput = z.output<
  typeof adminAuthorSearchInputSchema
>;
export type AdminStoryUpsertInput = z.output<typeof adminStoryUpsertInputSchema>;
export type AdminStoryCoverInput = z.output<typeof adminStoryCoverInputSchema>;
export type AdminChapterUpsertInput = z.output<
  typeof adminChapterUpsertInputSchema
>;
export type AdminCommentModerationInput = z.output<
  typeof adminCommentModerationInputSchema
>;
export type AdminMutationErrorCode = z.infer<
  typeof adminMutationErrorCodeSchema
>;

export type AdminMutationResult<T> =
  | { ok: true; data: T; message: string }
  | {
      ok: false;
      error: {
        code: AdminMutationErrorCode;
        message: string;
        details?: unknown;
      };
    };

export function adminMutationSuccess<T>(
  data: T,
  message: string,
): AdminMutationResult<T> {
  return { ok: true, data, message };
}

export function adminMutationError(
  code: AdminMutationErrorCode,
  message: string,
  details?: unknown,
): AdminMutationResult<never> {
  return {
    ok: false,
    error: details === undefined ? { code, message } : { code, message, details },
  };
}
