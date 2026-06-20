import { expect, test } from "@playwright/test";

const viewports = [320, 768, 1024, 1440] as const;
const routes = [
  { path: "/", page: "home", screenshot: "home" },
  { path: "/truyen/van-co-than-de", page: "story", screenshot: "story" },
  {
    path: "/truyen/van-co-than-de/chuong-2686",
    page: "reader",
    screenshot: "reader-free",
  },
  {
    path: "/truyen/van-co-than-de/chuong-2685",
    page: "reader",
    screenshot: "reader-vip",
  },
  {
    path: "/tim-kiem?q=V%E1%BA%A1n%20C%E1%BB%95",
    page: "search",
    screenshot: "search",
  },
] as const;

for (const width of viewports) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of routes) {
      test(`${route.path} renders without horizontal overflow`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error" || message.type() === "warning") {
            errors.push(message.text());
          }
        });
        page.on("pageerror", (error) => errors.push(error.message));

        await page.goto(route.path);
        await expect(page.locator(`[data-page="${route.page}"]`)).toHaveClass(/is-active/);
        await expect(page.locator(`[data-page="${route.page}"] h1`).first()).toBeVisible();

        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );

        await page.screenshot({
          path: `.tmp/qa-next-${width}-${route.screenshot}.png`,
          fullPage: true,
        });

        expect(hasOverflow).toBe(false);
        expect(errors).toEqual([]);
      });
    }
  });
}

test("Home → Story → Reader uses App Router paths", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-open-story]").first().click();
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de$/);

  await page.locator("[data-open-reader]").first().click();
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de\/chuong-2686$/);
  await expect(page.locator("[data-page='reader']")).toHaveClass(/is-active/);
});

test("Story detail and chapter metadata load from Supabase by slug", async ({ page }) => {
  await page.goto("/truyen/van-co-than-de");

  await expect(page.locator("[data-story-source='supabase']")).toBeVisible();
  await expect(page.locator("#story-title")).toHaveText("Vạn Cổ Thần Đế");
  await expect(page.locator(".author-line strong")).toHaveText("Phi Thiên Ngư");
  await expect(page.locator("[data-expand-description]")).toBeHidden();
  await expect(page.locator("[data-chapter-list] .chapter-row")).toHaveCount(12);
  await expect(page.locator(".chapters .pagination")).toContainText("Trang tiếp");

  const payload = JSON.parse(
    (await page.locator("#story-detail-data").textContent()) ?? "{}",
  ) as {
    source?: string;
    story?: { slug?: string };
    chapters?: { accessLevel?: string }[];
  };

  expect(payload.source).toBe("supabase");
  expect(payload.story?.slug).toBe("van-co-than-de");
  expect(payload.chapters).toHaveLength(12);
  expect(payload.chapters?.some((chapter) => chapter.accessLevel === "vip")).toBe(true);

  await page.getByRole("link", { name: "Trang tiếp" }).click();
  await expect(page).toHaveURL(/before=2675/);
  await expect(page.locator("[data-chapter-list] .chapter-row")).toHaveCount(8);
  await expect(page.locator(".chapters .pagination")).toContainText("Trang trước");
});

test("Another published slug renders while draft and unknown slugs return 404", async ({
  page,
}) => {
  await page.goto("/truyen/dau-pha-thuong-khung");
  await expect(page.locator("#story-title")).toHaveText("Đấu Phá Thương Khung");
  await expect(page.locator("[data-chapter-list] .chapter-row")).toHaveCount(2);

  const draftResponse = await page.goto("/truyen/ban-thao-chua-cong-bo");
  expect(draftResponse?.status()).toBe(404);

  const missingResponse = await page.goto("/truyen/khong-ton-tai");
  expect(missingResponse?.status()).toBe(404);
});

test("Legacy story routes redirect to the canonical Vietnamese route", async ({
  page,
}) => {
  await page.goto("/story/van-co-than-de");
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de$/);

  await page.goto("/story");
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de$/);
});

test("Legacy reader route redirects to the canonical chapter route", async ({
  page,
}) => {
  await page.goto("/reader");
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de\/chuong-2686$/);
});

test("Homepage renders the published Supabase catalog", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("[data-homepage-source='supabase']")).toBeVisible();
  await expect(page.locator("#home-title")).toHaveText("Vạn Cổ Thần Đế");

  const catalog = JSON.parse(
    (await page.locator("#homepage-catalog-data").textContent()) ?? "{}",
  ) as {
    source?: string;
    stories?: { title: string }[];
    completed?: { status: string }[];
  };

  expect(catalog.source).toBe("supabase");
  expect(catalog.stories).toHaveLength(9);
  expect(catalog.stories?.some((story) => story.title === "Bản Thảo Chưa Công Bố")).toBe(
    false,
  );
  expect(catalog.completed?.every((story) => story.status === "Hoàn tất")).toBe(true);
});

test("Global search submits to Supabase RPC results and opens the canonical story route", async ({
  page,
}) => {
  await page.goto("/");
  const searchbox = page.getByRole("searchbox", { name: "Tìm kiếm truyện" });
  await searchbox.fill("Phi Thiên Ngư");
  await searchbox.press("Enter");

  await expect(page).toHaveURL(/\/tim-kiem\?q=Phi\+Thi%C3%AAn\+Ng%C6%B0$/);
  await expect(page.locator("[data-search-source='supabase-rpc']")).toBeVisible();
  await expect(page.locator("[data-page='search']")).toHaveClass(/is-active/);
  await expect(page.locator("[data-search-results]")).toContainText("Vạn Cổ Thần Đế");
  await expect(page.locator("[data-search-results]")).toContainText("Phi Thiên Ngư");

  const payload = JSON.parse(
    (await page.locator("#search-data").textContent()) ?? "{}",
  ) as {
    source?: string;
    query?: string;
    results?: { slug: string; rank: number }[];
  };

  expect(payload.source).toBe("supabase-rpc");
  expect(payload.query).toBe("Phi Thiên Ngư");
  expect(payload.results?.length).toBeGreaterThan(0);
  expect(payload.results?.every((story) => story.rank > 0)).toBe(true);

  await page.getByRole("link", { name: "Vạn Cổ Thần Đế" }).first().click();
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de$/);
});

test("Search matches story title and never exposes draft stories", async ({ page }) => {
  await page.goto("/tim-kiem?q=V%E1%BA%A1n%20C%E1%BB%95");
  await expect(page.locator("[data-search-results]")).toContainText("Vạn Cổ Thần Đế");

  await page.goto("/tim-kiem?q=B%E1%BA%A3n%20Th%E1%BA%A3o");
  await expect(page.locator("[data-search-results]")).toContainText(
    "Chưa tìm thấy truyện phù hợp",
  );
  await expect(page.locator("[data-search-results]")).not.toContainText(
    "Bản Thảo Chưa Công Bố",
  );

  const payloadText = (await page.locator("#search-data").textContent()) ?? "";
  expect(payloadText).not.toContain("ban-thao-chua-cong-bo");
});

test("Empty search query renders a useful initial state", async ({ page }) => {
  await page.goto("/tim-kiem");

  await expect(page.locator("[data-search-results]")).toContainText(
    "Bắt đầu tìm một câu chuyện",
  );
  await expect(page.locator("[data-search-pagination]")).toBeEmpty();
});

test("Free Reader returns content while VIP Reader exposes metadata only", async ({
  page,
}) => {
  await page.goto("/truyen/van-co-than-de/chuong-2686");

  await expect(page.locator("[data-reader-source='supabase']")).toBeVisible();
  await expect(page.locator("[data-reader-content]")).toContainText(
    "Màn đêm phủ xuống Thần Uyên",
  );

  const freePayload = JSON.parse(
    (await page.locator("#reader-data").textContent()) ?? "{}",
  ) as {
    chapter?: {
      accessLevel?: string;
      content?: string | null;
      isLocked?: boolean;
    };
  };
  expect(freePayload.chapter?.accessLevel).toBe("free");
  expect(freePayload.chapter?.isLocked).toBe(false);
  expect(freePayload.chapter?.content).toContain("Màn đêm phủ xuống Thần Uyên");

  await page.goto("/truyen/van-co-than-de/chuong-2685");
  await expect(page.locator(".reader-lock")).toBeVisible();
  await expect(page.locator("[data-vip-paywall]")).toContainText("Chương VIP");
  await expect(page.locator(".reader-lock-description")).toContainText("dùng Xu");
  await expect(page.locator(".reader-lock-price")).toHaveText(/700 Xu/);
  await expect(page.locator(".reader-lock-balance")).toContainText("0 Xu");
  await expect(page.locator("[data-vip-unlock]")).toHaveText("Mở khóa ngay");
  await expect(page.locator("[data-vip-topup]")).toHaveText("Nạp thêm Xu");

  const lockGeometry = await page.locator(".reader-lock-icon").evaluate((circle) => {
    const glyph = circle.querySelector(".material-symbols-rounded");
    if (!glyph) return null;
    const circleRect = circle.getBoundingClientRect();
    const glyphRect = glyph.getBoundingClientRect();

    return {
      circleWidth: circleRect.width,
      circleHeight: circleRect.height,
      glyphWidth: glyphRect.width,
      glyphHeight: glyphRect.height,
      centerDeltaX: Math.abs(
        circleRect.left + circleRect.width / 2 - (glyphRect.left + glyphRect.width / 2),
      ),
      centerDeltaY: Math.abs(
        circleRect.top + circleRect.height / 2 - (glyphRect.top + glyphRect.height / 2),
      ),
    };
  });
  expect(lockGeometry).toEqual({
    circleWidth: 56,
    circleHeight: 56,
    glyphWidth: 28,
    glyphHeight: 28,
    centerDeltaX: 0,
    centerDeltaY: 0,
  });
  await expect(page.locator("[data-reader-content]")).not.toContainText(
    "Màn đêm phủ xuống Thần Uyên",
  );

  const vipPayloadText = (await page.locator("#reader-data").textContent()) ?? "";
  const vipPayload = JSON.parse(vipPayloadText) as {
    chapter?: {
      accessLevel?: string;
      content?: string | null;
      isLocked?: boolean;
    };
  };
  expect(vipPayload.chapter?.accessLevel).toBe("vip");
  expect(vipPayload.chapter?.isLocked).toBe(true);
  expect(vipPayload.chapter?.content).toBeNull();
  expect(vipPayloadText).not.toContain("Đây là nội dung mẫu");
});

test("Reader controls, selector and keyboard arrows use chapter slugs", async ({
  page,
}) => {
  await page.goto("/truyen/van-co-than-de/chuong-2686");
  const heading = page.locator("[data-reader-title]");

  await page.locator("[data-reader-prev]").first().click();
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de\/chuong-2685$/);
  await expect(heading).toContainText("Chương 2685");

  await page.locator("[data-reader-content]").click();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de\/chuong-2686$/);

  await page.locator("[data-reader-select]").selectOption(
    "/truyen/van-co-than-de/chuong-2680",
  );
  await expect(page).toHaveURL(/\/truyen\/van-co-than-de\/chuong-2680$/);
  await expect(heading).toContainText("Chương 2680");
});

test("Unknown, draft-story and mismatched chapter routes return 404", async ({
  page,
}) => {
  expect(
    (await page.goto("/truyen/van-co-than-de/chuong-khong-ton-tai"))?.status(),
  ).toBe(404);
  expect(
    (await page.goto("/truyen/ban-thao-chua-cong-bo/chuong-1"))?.status(),
  ).toBe(404);
  expect(
    (await page.goto("/truyen/dau-pha-thuong-khung/chuong-2686"))?.status(),
  ).toBe(404);
});
