import { expect, test } from "@playwright/test";

import {
  adminArchiveChapterInputSchema,
  adminArchiveStoryInputSchema,
  adminChapterUpsertInputSchema,
  adminMutationError,
  adminMutationSuccess,
  adminStoryProductionTypeSchema,
  adminStoryUpsertInputSchema,
} from "../src/lib/admin/validators";

test("admin story contract accepts editorial metadata and rejects client actor fields", () => {
  const parsed = adminStoryUpsertInputSchema.safeParse({
    title: "  Truyen Moi  ",
    slug: "Truyen-Moi",
    description: "Noi dung gioi thieu",
    productionType: "self_produced",
    author: {
      name: "Tac Gia",
      slug: "tac-gia",
      aliases: ["But danh"],
    },
    genreIds: [1, 2],
    tagIds: [],
    coverPath: "/covers/truyen-moi.jpg",
    status: "draft",
    actorUserId: "user-controlled",
  });

  expect(parsed.success).toBe(false);

  const valid = adminStoryUpsertInputSchema.parse({
    title: "  Truyen Moi  ",
    slug: "Truyen-Moi",
    description: "Noi dung gioi thieu",
    productionType: "self_produced",
    author: {
      name: "Tac Gia",
      slug: "tac-gia",
      aliases: ["But danh"],
    },
    genreIds: [1, 2],
    tagIds: [],
    coverPath: "/covers/truyen-moi.jpg",
    status: "draft",
  });

  expect(valid.title).toBe("Truyen Moi");
  expect(valid.slug).toBe("truyen-moi");
  expect(valid).not.toHaveProperty("actorUserId");
});

test("admin story contract validates production type, author shape and publish timestamp", () => {
  expect(adminStoryProductionTypeSchema.safeParse("licensed_translation").success).toBe(true);
  expect(adminStoryProductionTypeSchema.safeParse("scraped").success).toBe(false);

  expect(
    adminStoryUpsertInputSchema.safeParse({
      title: "Truyen Da Xuat Ban",
      slug: "truyen-da-xuat-ban",
      description: "Mo ta",
      productionType: "licensed_translation",
      author: {
        name: "Tac Gia",
        bio: "Khong nhan bio tu browser",
        avatar: "/avatar.png",
      },
      genreIds: [1],
      tagIds: [],
      status: "published",
      publishedAt: null,
    }).success,
  ).toBe(false);

  expect(
    adminStoryUpsertInputSchema.safeParse({
      title: "Truyen Da Xuat Ban",
      slug: "truyen-da-xuat-ban",
      description: "Mo ta",
      productionType: "licensed_translation",
      author: { name: "Tac Gia" },
      genreIds: [1],
      tagIds: [],
      status: "published",
      publishedAt: "2026-06-29T00:00:00.000Z",
    }).success,
  ).toBe(true);
});

test("admin chapter contract validates metadata, body and client actor boundary", () => {
  const valid = adminChapterUpsertInputSchema.parse({
    storyId: 1,
    title: " Chuong 1 ",
    slug: "Chuong-1",
    number: 1,
    accessLevel: "free",
    body: " Noi dung chuong ",
    status: "draft",
  });

  expect(valid.title).toBe("Chuong 1");
  expect(valid.slug).toBe("chuong-1");
  expect(valid.body).toBe("Noi dung chuong");

  expect(
    adminChapterUpsertInputSchema.safeParse({
      storyId: 1,
      title: "Chuong 2",
      slug: "chuong-2",
      number: 2,
      accessLevel: "vip",
      body: "",
      status: "draft",
      userId: "user-controlled",
    }).success,
  ).toBe(false);
});

test("admin mutation result and destructive confirmations have stable shapes", () => {
  expect(adminMutationSuccess({ storyId: 1 }, "Da luu")).toEqual({
    ok: true,
    data: { storyId: 1 },
    message: "Da luu",
  });
  expect(adminMutationError("VALIDATION_ERROR", "Du lieu chua hop le")).toEqual({
    ok: false,
    error: {
      code: "VALIDATION_ERROR",
      message: "Du lieu chua hop le",
    },
  });

  expect(
    adminArchiveStoryInputSchema.safeParse({
      storyId: 1,
      storySlug: "truyen-moi",
      confirmation: "ARCHIVE_STORY",
    }).success,
  ).toBe(true);
  expect(
    adminArchiveChapterInputSchema.safeParse({
      storyId: 1,
      chapterId: 2,
      confirmation: "delete",
    }).success,
  ).toBe(false);
});
