import { readFile } from "node:fs/promises";
import path from "node:path";

import { expect, type Page, test } from "@playwright/test";

const viewports = [320, 768, 1024, 1440] as const;
const adminShellEmail = "admin-shell@example.com";
const adminShellPassword = "RubyNoir2026!";
const repoRoot = path.resolve(__dirname, "..");
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
const accountRoutes = [
  { path: "/dang-nhap", heading: "Đăng nhập", screenshot: "login" },
  { path: "/dang-ky", heading: "Tạo tài khoản", screenshot: "signup" },
] as const;

async function signInOrSignUpAdmin(page: Page) {
  await page.goto("/dang-nhap");
  await page.locator('input[name="email"]').fill(adminShellEmail);
  await page.locator('input[name="password"]').fill(adminShellPassword);
  await page.locator('.auth-form button[type="submit"]').click();
  await page.waitForURL(/\/(tai-khoan|dang-nhap\?error=)/);

  if (/\/tai-khoan/.test(page.url())) return;

  await page.goto("/dang-ky");
  await page.locator('input[name="displayName"]').fill("Quản trị Shell");
  await page.locator('input[name="email"]').fill(adminShellEmail);
  await page.locator('input[name="password"]').fill(adminShellPassword);
  await page.locator('input[name="confirmPassword"]').fill(adminShellPassword);
  await page.locator('.auth-form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/tai-khoan\?created=1$/);
}

const tinyPngCover = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64",
);

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

    for (const route of accountRoutes) {
      test(`${route.path} renders without horizontal overflow`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error" || message.type() === "warning") {
            errors.push(message.text());
          }
        });
        page.on("pageerror", (error) => errors.push(error.message));

        await page.goto(route.path);
        await expect(page.getByRole("heading", { name: route.heading, level: 1 })).toBeVisible();

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

test("Home hydrates after client navigation from sign-in", async ({ page }) => {
  await page.goto("/dang-nhap");
  await page.locator(".account-back-link").click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("[data-page='home']")).toHaveClass(/is-active/);
  await expect(page.locator("[data-recommend-list] .story-card").first()).toBeVisible();
  await expect(page.locator("[data-ranking-list] .ranking-item").first()).toBeVisible();
  await expect(page.locator("[data-updates-list] .update-item").first()).toBeVisible();
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

test("User can sign up, edit profile, log out and sign back in", async ({ page }) => {
  const uniqueId = Date.now();
  const email = `reader-${uniqueId}@example.com`;
  const username = `doc_gia_${uniqueId}`;
  const password = "RubyNoir2026!";

  await page.goto("/dang-ky");
  await page.getByLabel("Tên hiển thị").fill("Độc Giả Mộng");
  await page.getByLabel("Email").fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByLabel("Xác nhận mật khẩu").fill(password);
  await page.getByRole("button", { name: "Đăng ký" }).click();

  await expect(page).toHaveURL(/\/tai-khoan\?created=1$/);
  await expect(page.getByRole("heading", { name: "Độc Giả Mộng", level: 1 })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Tài khoản đã được tạo");

  await page.getByLabel("Tên người dùng").fill(username);
  await page.locator('textarea[name="bio"]').fill("Mê truyện tiên hiệp và ngôn tình.");
  await page.getByRole("button", { name: "Lưu hồ sơ" }).click();

  await expect(page).toHaveURL(/\/tai-khoan\?saved=1$/);
  await expect(page.getByRole("status")).toContainText("Hồ sơ đã được cập nhật");
  await expect(page.getByLabel("Tên người dùng")).toHaveValue(username);

  await page.goto("/");
  await expect(page.locator("[data-auth-state='authenticated']")).toBeVisible();
  await page.locator("[data-user-menu-trigger]").click();
  await expect(page.locator("[data-auth-menu]")).toContainText("Độc Giả Mộng");
  await expect(page.getByRole("link", { name: "Hồ sơ cá nhân" })).toBeVisible();

  await page.goto("/tai-khoan");
  await page.getByRole("button", { name: "Đăng xuất" }).click();
  await expect(page).toHaveURL(/\/dang-nhap\?message=/);
  await expect(page.getByRole("status")).toContainText("Đã đăng xuất");

  await page.goto("/tai-khoan");
  await expect(page).toHaveURL(/\/dang-nhap\?next=\/tai-khoan$/);

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mật khẩu").fill(password);
  await page.getByRole("button", { name: "Đăng nhập" }).click();

  await expect(page).toHaveURL(/\/tai-khoan$/);
  await expect(page.getByLabel("Tên người dùng")).toHaveValue(username);
  await expect(page.locator('textarea[name="bio"]')).toHaveValue(
    "Mê truyện tiên hiệp và ngôn tình.",
  );
});

test("Auth forms return useful validation and credential errors", async ({ page }) => {
  await page.goto("/dang-ky");
  await page.getByLabel("Tên hiển thị").fill("Độc Giả");
  await page.getByLabel("Email").fill(`mismatch-${Date.now()}@example.com`);
  await page.locator('input[name="password"]').fill("RubyNoir2026!");
  await page.getByLabel("Xác nhận mật khẩu").fill("RubyNoir2027!");
  await page.getByRole("button", { name: "Đăng ký" }).click();
  await expect(page).toHaveURL(/\/dang-ky\?error=/);
  await expect(page.getByRole("status")).toContainText("Mật khẩu xác nhận chưa khớp");

  await page.goto("/dang-nhap");
  await page.getByLabel("Email").fill("unknown@example.com");
  await page.getByLabel("Mật khẩu").fill("WrongPassword!");
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(page).toHaveURL(/\/dang-nhap\?error=/);
  await expect(page.getByRole("status")).toContainText("Email hoặc mật khẩu không đúng");
});

test("Anonymous users are asked to sign in before using the library", async ({
  page,
}) => {
  await page.goto("/tu-truyen?tab=saved");
  await expect(page).toHaveURL(/\/dang-nhap\?next=\/tu-truyen$/);

  await page.goto("/truyen/van-co-than-de");
  await page.getByRole("button", { name: "Thêm truyện vào tủ" }).first().click();
  await expect(page).toHaveURL(
    /\/dang-nhap\?next=%2Ftruyen%2Fvan-co-than-de$/,
  );
});

test("Anonymous users are asked to sign in before entering admin @admin-smoke", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/dang-nhap\?next=\/admin$/);
});

test("Authenticated non-admin users cannot enter admin", async ({ page }) => {
  const uniqueId = Date.now();
  const email = `not-admin-${uniqueId}@example.com`;
  const password = "RubyNoir2026!";

  await page.goto("/dang-ky");
  await page.locator('input[name="displayName"]').fill("Doc Gia Thuong");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('input[name="confirmPassword"]').fill(password);
  await page.locator('.auth-form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/tai-khoan\?created=1$/);

  const response = await page.goto("/admin");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveURL(/\/admin$/);
});

test("Admin shell renders grouped navigation and topbar for an allowlisted admin @admin-smoke", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.text().includes("status of 404")) return;
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  await expect(page.locator("[data-admin-shell]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bảng điều khiển", level: 1 })).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Tìm kiếm quản trị" })).toHaveAttribute(
    "placeholder",
    "Tìm kiếm truyện, tác giả, người dùng...",
  );
  await expect(page.getByText("Quản trị viên")).toBeVisible();
  await expect(page.getByRole("link", { name: "Truy cập trang web" })).toHaveAttribute(
    "href",
    "/",
  );

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  await expect(nav).toContainText("QUẢN LÝ NỘI DUNG");
  await expect(nav).toContainText("QUẢN LÝ NGƯỜI DÙNG");
  await expect(nav).toContainText("QUẢN LÝ DOANH THU");
  await expect(nav).toContainText("MARKETING");
  await expect(nav).toContainText("CẤU HÌNH HỆ THỐNG");
  await expect(nav.getByRole("link", { name: "Truyện", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Gói VIP" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Tổng quan Marketing" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Nhật ký hoạt động" })).toBeVisible();
  await expect(page.locator("[data-admin-footer]")).toContainText(
    "© 2026 Truyện Nhà Mò Admin.",
  );

  expect(errors).toEqual([]);
});

test("Admin shell is responsive and keyboard reachable", async ({ page }) => {
  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  await page.getByRole("link", { name: "Truy cập trang web" }).focus();
  await expect(page.getByRole("link", { name: "Truy cập trang web" })).toBeFocused();

  await page.getByRole("link", { name: "Tổng quan", exact: true }).focus();
  await expect(page.getByRole("link", { name: "Tổng quan", exact: true })).toBeFocused();

  await page.getByRole("searchbox", { name: "Tìm kiếm quản trị" }).focus();
  await expect(page.getByRole("searchbox", { name: "Tìm kiếm quản trị" })).toBeFocused();

  await page.getByRole("button", { name: "Thông báo quản trị" }).focus();
  await expect(page.getByRole("button", { name: "Thông báo quản trị" })).toBeFocused();

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin");
    await expect(page.locator("[data-admin-shell]")).toBeVisible();

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBe(false);

    await page.screenshot({
      path: `.tmp/qa-admin-shell-${width}.png`,
      fullPage: true,
    });
  }
});

test("Admin revenue module links open deferred route shells", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const revenueRoutes = [
    { label: "Giao dịch", path: "/admin/giao-dich", heading: "Giao dịch" },
    { label: "Gói nạp", path: "/admin/goi-nap", heading: "Gói nạp" },
    { label: "Gói VIP", path: "/admin/goi-vip", heading: "Gói VIP" },
    { label: "Rút tiền", path: "/admin/rut-tien", heading: "Rút tiền" },
    {
      label: "Thống kê doanh thu",
      path: "/admin/thong-ke-doanh-thu",
      heading: "Thống kê doanh thu",
    },
  ] as const;

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  for (const route of revenueRoutes) {
    await expect(nav.getByRole("link", { name: route.label })).toHaveAttribute(
      "href",
      route.path,
    );
    await nav.getByRole("link", { name: route.label }).click();
    await expect(page).toHaveURL(new RegExp(`${route.path}$`));
    const shell = page.locator("[data-admin-revenue-shell]");
    await expect(shell).toBeVisible();
    await expect(shell.getByRole("heading", { name: route.heading, level: 2 })).toBeVisible();
    await expect(shell).toContainText("Đang chuẩn bị");
    await expect(shell.locator("form")).toHaveCount(0);
    await expect(shell.getByRole("button")).toHaveCount(0);
  }

  await page.goto("/admin/thong-ke-doanh-thu");
  const statsShell = page.locator("[data-admin-revenue-shell]");
  await expect(statsShell.locator("[data-admin-revenue-breakdown='stories']")).toContainText(
    "Theo truyện",
  );
  await expect(statsShell.locator("[data-admin-revenue-breakdown='uploaders']")).toContainText(
    "Theo username người đăng",
  );

  expect(errors).toEqual([]);
});

test("Admin role and notification module links open deferred route shells", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const deferredRoutes = [
    {
      label: "Vai trò & phân quyền",
      path: "/admin/vai-tro",
      heading: "Vai trò & phân quyền",
    },
    { label: "Thông báo", path: "/admin/thong-bao", heading: "Thông báo" },
  ] as const;

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  for (const route of deferredRoutes) {
    await expect(
      nav.getByRole("link", { name: route.label, exact: true }),
    ).toHaveAttribute("href", route.path);
    await nav.getByRole("link", { name: route.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${route.path}$`));
    const shell = page.locator("[data-admin-deferred-shell]");
    await expect(shell).toBeVisible();
    await expect(shell.getByRole("heading", { name: route.heading, level: 2 })).toBeVisible();
    await expect(shell).toContainText("Đang chuẩn bị");
    await expect(shell.locator("form")).toHaveCount(0);
    await expect(shell.getByRole("button")).toHaveCount(0);
  }

  expect(errors).toEqual([]);
});

test("Admin marketing overview and event links open deferred route shells", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const marketingRoutes = [
    {
      label: "Tổng quan Marketing",
      path: "/admin/marketing",
      heading: "Tổng quan Marketing",
      markers: ["Campaign đang chạy", "Banner sắp tới", "Sự kiện sắp tới"],
    },
    {
      label: "Sự kiện",
      path: "/admin/marketing/su-kien",
      heading: "Sự kiện",
      markers: ["draft", "scheduled", "live", "ended"],
    },
  ] as const;

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  for (const route of marketingRoutes) {
    await expect(
      nav.getByRole("link", { name: route.label, exact: true }),
    ).toHaveAttribute("href", route.path);
    await nav.getByRole("link", { name: route.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${route.path}$`));
    const shell = page.locator("[data-admin-marketing-shell]");
    await expect(shell).toBeVisible();
    await expect(shell.getByRole("heading", { name: route.heading, level: 2 })).toBeVisible();
    await expect(shell).toContainText("Đang chuẩn bị");
    for (const marker of route.markers) {
      await expect(shell).toContainText(marker);
    }
    await expect(shell.locator("form")).toHaveCount(0);
    await expect(shell.getByRole("button")).toHaveCount(0);
  }

  expect(errors).toEqual([]);
});

test("Admin banner placement link opens a read-only placement shell", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  await expect(
    nav.getByRole("link", { name: "Banner & vị trí hiển thị", exact: true }),
  ).toHaveAttribute("href", "/admin/marketing/banner");
  await nav.getByRole("link", { name: "Banner & vị trí hiển thị", exact: true }).click();
  await expect(page).toHaveURL(/\/admin\/marketing\/banner$/);

  const shell = page.locator("[data-admin-banner-placement-shell]");
  await expect(shell).toBeVisible();
  await expect(
    shell.getByRole("heading", { name: "Banner & vị trí hiển thị", level: 2 }),
  ).toBeVisible();
  await expect(shell).toContainText("Đang chuẩn bị");
  await expect(shell.locator("[data-admin-banner-placement-row]")).toHaveCount(4);

  for (const placement of ["Trang chủ", "Thể loại", "Chi tiết truyện", "Reader"]) {
    const row = shell.locator("[data-admin-banner-placement-row]").filter({ hasText: placement });
    await expect(row).toContainText("Giữ chỗ");
    await expect(row).toContainText("Kích thước");
    await expect(row).toContainText("Vị trí");
  }

  await expect(shell.locator("form")).toHaveCount(0);
  await expect(shell.getByRole("button")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("Admin featured stories link opens a read-only editorial picks shell", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  await expect(
    nav.getByRole("link", { name: "Truyện đề xuất", exact: true }),
  ).toHaveAttribute("href", "/admin/marketing/truyen-de-xuat");
  await nav.getByRole("link", { name: "Truyện đề xuất", exact: true }).click();
  await expect(page).toHaveURL(/\/admin\/marketing\/truyen-de-xuat$/);

  const shell = page.locator("[data-admin-featured-stories-shell]");
  await expect(shell).toBeVisible();
  await expect(shell.getByRole("heading", { name: "Truyện đề xuất", level: 2 })).toBeVisible();
  await expect(shell).toContainText("Đang chuẩn bị");
  await expect(shell.locator("[data-admin-featured-story-row]")).toHaveCount(4);

  for (const slot of ["Hero chiến dịch", "Trang chủ", "Chi tiết truyện", "Reader"]) {
    const row = shell.locator("[data-admin-featured-story-row]").filter({ hasText: slot });
    await expect(row).toContainText("Giữ chỗ");
    await expect(row).toContainText("Chiến dịch");
    await expect(row).toContainText("Chính sách boost");
  }

  await expect(shell).toContainText("campaign schema");
  await expect(shell).toContainText("story ranking/boost policy");
  await expect(shell.locator("form")).toHaveCount(0);
  await expect(shell.getByRole("button")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("Admin promo, campaign notification and marketing analytics links open read-only shells @admin-smoke", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const marketingRoutes = [
    {
      label: "Mã khuyến mãi",
      path: "/admin/marketing/ma-khuyen-mai",
      heading: "Mã khuyến mãi",
      markers: ["payment/VIP", "coupon", "Không có coupon mutation"],
    },
    {
      label: "Thông báo chiến dịch",
      path: "/admin/marketing/thong-bao-chien-dich",
      heading: "Thông báo chiến dịch",
      markers: ["notification system", "push/email", "Không gửi thông báo giả"],
    },
    {
      label: "Thống kê Marketing",
      path: "/admin/marketing/thong-ke",
      heading: "Thống kê Marketing",
      markers: ["clicks", "reads", "conversion", "attribution"],
    },
  ] as const;

  const nav = page.getByRole("navigation", { name: "Điều hướng quản trị" });
  for (const route of marketingRoutes) {
    await expect(
      nav.getByRole("link", { name: route.label, exact: true }),
    ).toHaveAttribute("href", route.path);
    await nav.getByRole("link", { name: route.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${route.path}$`));

    const shell = page.locator("[data-admin-marketing-shell]");
    await expect(shell).toBeVisible();
    await expect(shell.getByRole("heading", { name: route.heading, level: 2 })).toBeVisible();
    await expect(shell).toContainText("Đang chuẩn bị");
    for (const marker of route.markers) {
      await expect(shell).toContainText(marker);
    }
    await expect(shell.locator("form")).toHaveCount(0);
    await expect(shell.getByRole("button")).toHaveCount(0);
  }

  expect(errors).toEqual([]);
});

test("Admin dashboard exposes the typed Supabase payload contract", async ({ page }) => {
  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const payload = JSON.parse(
    (await page.locator("#admin-dashboard-data").textContent()) ?? "{}",
  ) as {
    source?: string;
    metrics?: Record<string, { label?: string; note?: string }>;
    readsByDay?: unknown[];
    topStories?: unknown[];
    genreDistribution?: unknown[];
    recentStories?: unknown[];
    userActivity?: unknown[];
    revenueByDay?: unknown[];
    revenueByStory?: unknown;
    revenueByUploader?: unknown;
    marketingSummary?: unknown;
  };

  expect(payload.source).toBe("supabase");
  expect(payload.metrics?.totalStories?.label).toBeDefined();
  expect(Object.keys(payload.metrics ?? {})).toEqual([
    "totalStories",
    "totalUsers",
    "totalReads",
    "revenueVnd",
    "transactions",
  ]);
  expect(payload.metrics?.revenueVnd?.note).toContain("deferred");
  expect(payload.metrics?.transactions?.note).toContain("deferred");

  const panelKeys = [
    "readsByDay",
    "topStories",
    "genreDistribution",
    "recentStories",
    "userActivity",
    "revenueByDay",
  ] as const;

  for (const key of panelKeys) {
    expect(Array.isArray(payload[key])).toBe(true);
    expect(payload[key]?.length).toBeGreaterThan(0);
  }

  expect(payload.revenueByStory).toBeUndefined();
  expect(payload.revenueByUploader).toBeUndefined();
  expect(payload.marketingSummary).toBeUndefined();
});

test("Admin dashboard has loading and safe error boundaries", async () => {
  const [loadingSource, errorSource] = await Promise.all([
    readFile(path.join(repoRoot, "src/app/admin/loading.tsx"), "utf8"),
    readFile(path.join(repoRoot, "src/app/admin/error.tsx"), "utf8"),
  ]);

  expect(loadingSource).toContain("aria-busy");
  expect(loadingSource).toContain("data-admin-loading");
  expect(errorSource).toContain("use client");
  expect(errorSource).toContain("data-admin-error");
  expect(errorSource).not.toContain("error.message");
  expect(errorSource).not.toContain("error.stack");
});

test("Admin dashboard renders KPI metric cards from the Supabase payload", async ({ page }) => {
  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const metrics = page.locator("[data-admin-metric-card]");
  await expect(metrics).toHaveCount(5);

  await expect(metrics.filter({ hasText: "Tổng truyện" })).toContainText("9");
  await expect(metrics.filter({ hasText: "Lượt đọc" })).toContainText("6,7M");
  await expect(metrics.filter({ hasText: "Doanh thu" })).toContainText("Chờ ledger thanh toán");
  await expect(metrics.filter({ hasText: "Giao dịch" })).toContainText(
    "Chờ dữ liệu giao dịch thật",
  );
  await expect(metrics.filter({ hasText: "Doanh thu" })).toContainText("deferred");
});

test("Admin dashboard renders SVG chart panels from the Supabase payload", async ({ page }) => {
  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const charts = page.locator("[data-admin-chart]");
  await expect(charts).toHaveCount(3);

  await expect(charts.filter({ hasText: "Lượt đọc 7 ngày" })).toContainText("1.200.000");
  await expect(charts.filter({ hasText: "Phân bổ thể loại" })).toContainText("Tiên Hiệp");
  await expect(charts.filter({ hasText: "Doanh thu 7 ngày" })).toContainText("Deferred");

  await expect(page.locator('[data-admin-chart="reads"] svg')).toBeVisible();
  await expect(page.locator('[data-admin-chart="genres"] svg')).toBeVisible();
  await expect(page.locator('[data-admin-chart="revenue"] svg')).toBeVisible();
});

test("Admin dashboard renders top stories, recent stories and activity feed", async ({
  page,
}) => {
  await signInOrSignUpAdmin(page);
  await page.goto("/admin");

  const topStories = page.locator("[data-admin-top-stories]");
  await expect(topStories.getByRole("listitem")).toHaveCount(3);
  await expect(topStories).toContainText("#1");
  await expect(topStories).toContainText("Vạn Cổ Thần Đế");
  await expect(topStories).toContainText("Tiên Hiệp");
  await expect(topStories).toContainText("1,2M lượt đọc");
  await topStories.getByRole("link", { name: "Vạn Cổ Thần Đế" }).focus();
  await expect(topStories.getByRole("link", { name: "Vạn Cổ Thần Đế" })).toBeFocused();

  const recentStories = page.getByRole("table", { name: "Truyện cập nhật gần đây" });
  await expect(recentStories.getByRole("row")).toHaveCount(4);
  await expect(recentStories).toContainText("Chương 2686");
  await expect(recentStories).toContainText("Truyện dịch đã mua bản quyền");

  const activityFeed = page.locator("[data-admin-activity-feed]");
  await expect(activityFeed.getByRole("listitem")).toHaveCount(3);
  await expect(activityFeed).toContainText("bình luận");
  await expect(activityFeed).toContainText("Vạn Cổ Thần Đế");
});

test("Admin story list shows all editorial statuses and basic filters", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin/truyen");

  await expect(page.locator("[data-admin-story-list]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quản lý truyện", level: 2 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Truyện", exact: true })).toHaveAttribute(
    "href",
    "/admin/truyen",
  );
  await expect(page.getByRole("link", { name: "Chương truyện" })).toHaveCount(0);
  await expect(page.getByLabel("Tìm theo tên truyện hoặc tác giả")).toBeVisible();
  await expect(page.getByLabel("Trạng thái")).toBeVisible();
  await expect(page.getByLabel("Loại sản xuất")).toBeVisible();
  await expect(page.getByLabel("Người đăng")).toBeVisible();

  const rows = page.locator("[data-admin-story-row]");
  await expect(rows).toHaveCount(10);
  await expect(rows.filter({ hasText: "Vạn Cổ Thần Đế" })).toContainText("Đã xuất bản");
  await expect(rows.filter({ hasText: "Bản Thảo Chưa Công Bố" })).toContainText("Bản nháp");

  await page.getByLabel("Trạng thái").selectOption("draft");
  await page.getByRole("button", { name: "Lọc" }).click();
  await expect(page).toHaveURL(/\/admin\/truyen\?.*status=draft/);
  await expect(page.locator("[data-admin-story-row]")).toHaveCount(1);
  await expect(page.locator("[data-admin-story-list]")).toContainText("Bản Thảo Chưa Công Bố");

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/truyen");
    await expect(page.locator("[data-admin-story-list]")).toBeVisible();
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBe(false);
    await page.screenshot({
      path: `.tmp/qa-admin-stories-${width}.png`,
      fullPage: true,
    });
  }

  expect(errors).toEqual([]);
});

test("Admin comment moderation queue is actionable and filterable @admin-smoke", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin/binh-luan");

  await expect(page.locator("[data-admin-comment-queue]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Duyệt bình luận", level: 2 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Bình luận", exact: true })).toHaveAttribute(
    "href",
    "/admin/binh-luan",
  );
  await expect(page.getByLabel("Tìm theo nội dung hoặc truyện")).toBeVisible();
  await expect(page.getByLabel("Trạng thái")).toBeVisible();
  await expect(page.locator("[data-admin-comment-row]")).toHaveCount(3);
  await expect(page.locator("[data-admin-comment-queue]")).toContainText("Vạn Cổ Thần Đế");
  await expect(page.locator("[data-admin-comment-queue]")).toContainText("Hiển thị");
  await expect(page.locator("[data-admin-comment-queue]")).toContainText("Ẩn");

  await page.getByLabel("Tìm theo nội dung hoặc truyện").fill("khong-co-binh-luan");
  await page.getByRole("button", { name: "Lọc" }).click();
  await expect(page).toHaveURL(/\/admin\/binh-luan\?.*q=khong-co-binh-luan/);
  await expect(page.locator("[data-admin-comment-row]")).toHaveCount(0);
  await expect(page.locator("[data-admin-comment-queue]")).toContainText(
    "Không có bình luận khớp bộ lọc.",
  );

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/binh-luan");
    await expect(page.locator("[data-admin-comment-queue]")).toBeVisible();
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBe(false);
    await page.screenshot({
      path: `.tmp/qa-admin-comments-${width}.png`,
      fullPage: true,
    });
  }

  expect(errors).toEqual([]);
});

test("Admin can hide and restore a public story comment @admin-smoke", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/truyen/van-co-than-de");
  const commentBody = (
    await page.locator("[data-comment-list] .comment p").first().textContent()
  )?.trim();
  expect(commentBody).toBeTruthy();

  await page.goto("/admin/binh-luan");
  const row = page.locator("[data-admin-comment-row]").filter({ hasText: commentBody! });
  await expect(row).toBeVisible();
  await row.getByRole("button", { name: "Ẩn" }).click();
  await expect(page).toHaveURL(/\/admin\/binh-luan\?saved=hidden$/);

  await page.goto("/truyen/van-co-than-de");
  await expect(page.locator("[data-comment-list]")).not.toContainText(commentBody!);

  await page.goto("/admin/binh-luan?status=hidden");
  const hiddenRow = page.locator("[data-admin-comment-row]").filter({ hasText: commentBody! });
  await expect(hiddenRow).toBeVisible();
  await hiddenRow.getByRole("button", { name: "Khôi phục" }).click();
  await expect(page).toHaveURL(/\/admin\/binh-luan\?saved=visible$/);

  await page.goto("/truyen/van-co-than-de");
  await expect(page.locator("[data-comment-list]")).toContainText(commentBody!);

  expect(errors).toEqual([]);
});

test("Admin story detail shell keeps chapters nested under the story", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin/truyen");
  await page
    .locator("[data-admin-story-row]")
    .filter({ hasText: "Vạn Cổ Thần Đế" })
    .getByRole("link", { name: "Vạn Cổ Thần Đế" })
    .click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+$/);

  await expect(page.locator("[data-admin-story-detail]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vạn Cổ Thần Đế", level: 2 })).toBeVisible();
  const detailTabs = page.getByLabel("Khu vực chỉnh sửa truyện");
  await expect(detailTabs.getByRole("link", { name: "Tổng quan" })).toBeVisible();
  await expect(detailTabs.getByRole("link", { name: "Chương" })).toBeVisible();
  await expect(detailTabs.getByRole("link", { name: "Xuất bản" })).toBeVisible();
  await expect(detailTabs.getByRole("link", { name: "Lịch sử" })).toBeVisible();

  const form = page.locator("[data-admin-story-form]");
  await expect(form.getByLabel("Tên truyện")).toHaveValue("Vạn Cổ Thần Đế");
  await expect(form.getByLabel("Slug")).toHaveValue("van-co-than-de");
  await expect(form.getByLabel("Tác giả")).toHaveValue("Phi Thiên Ngư");
  await expect(form).toContainText("Slug chỉ dùng chữ thường, số và dấu gạch ngang.");

  const chapters = page.locator("[data-admin-story-chapters]");
  await expect(chapters.getByRole("row")).toHaveCount(6);
  await expect(chapters).toContainText("Chương 2686");
  await expect(chapters).toContainText("free");

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    await page.reload();
    await expect(page.locator("[data-admin-story-detail]")).toBeVisible();
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBe(false);
    await page.screenshot({
      path: `.tmp/qa-admin-story-detail-${width}.png`,
      fullPage: true,
    });
  }

  expect(errors).toEqual([]);
});

test("Admin can upload and delete a public story cover @admin-smoke", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);
  await page.goto("/admin/truyen");
  await page
    .locator("[data-admin-story-row]")
    .filter({ hasText: "Vạn Cổ Thần Đế" })
    .getByRole("link", { name: "Vạn Cổ Thần Đế" })
    .click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+$/);

  const uploadForm = page.locator("[data-admin-cover-upload-form]");
  await uploadForm.locator('input[name="coverFile"]').setInputFiles({
    name: "cover.png",
    mimeType: "image/png",
    buffer: tinyPngCover,
  });
  await uploadForm.getByRole("button", { name: "Cập nhật ảnh bìa" }).click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\?saved=cover$/);

  const coverImage = page.locator("[data-admin-cover-preview] img");
  await expect(coverImage).toBeVisible();
  const coverSrc = await coverImage.getAttribute("src");
  expect(coverSrc).toContain("/storage/v1/object/public/story-covers/");
  expect((await page.request.get(coverSrc!)).status()).toBe(200);

  await page.goto("/truyen/van-co-than-de");
  const storyDataText = await page.locator("#story-detail-data").textContent();
  expect(storyDataText).not.toBeNull();
  const storyData = JSON.parse(storyDataText!) as {
    story: { coverImage: string };
  };
  expect(storyData.story.coverImage).toBe(coverSrc);

  await page.goBack();
  await page.locator("[data-admin-cover-delete-form]").getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\?saved=cover-deleted$/);
  await expect(page.locator("[data-admin-cover-preview] img")).toHaveCount(0);
  await expect(
    page.locator("[data-admin-cover-delete-form]").getByRole("button"),
  ).toBeDisabled();

  expect(errors).toEqual([]);
});

test("Admin can publish and archive a story from the detail shell", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.text().includes("status of 404")) return;
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);

  expect((await page.goto("/truyen/ban-thao-chua-cong-bo"))?.status()).toBe(404);

  await page.goto("/admin/truyen");
  await page
    .locator("[data-admin-story-row]")
    .filter({ hasText: "Bản Thảo Chưa Công Bố" })
    .getByRole("link", { name: "Bản Thảo Chưa Công Bố" })
    .click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+$/);

  const detailUrl = page.url();
  const detail = page.locator("[data-admin-story-detail]");
  await expect(detail).toBeVisible();
  await expect(detail.locator(".admin-status-pill").first()).toHaveClass(
    /is-(draft|archived)/,
  );

  await page.locator("[data-admin-publish-story-form]").getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\?saved=published$/);
  await expect(detail.locator(".admin-status-pill").first()).toContainText(
    "Đã xuất bản",
  );

  expect((await page.goto("/truyen/ban-thao-chua-cong-bo"))?.status()).toBe(200);

  await page.goto(detailUrl);
  const archiveForm = page.locator("[data-admin-archive-story-form]");
  await archiveForm.getByLabel("Xác nhận lưu trữ truyện").check();
  await archiveForm.getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\?saved=archived$/);
  await expect(detail.locator(".admin-status-pill").first()).toContainText(
    "Đã lưu trữ",
  );

  expect((await page.goto("/truyen/ban-thao-chua-cong-bo"))?.status()).toBe(404);
  expect(errors).toEqual([]);
});

test("Admin can edit and publish a nested free chapter", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.text().includes("status of 404")) return;
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await signInOrSignUpAdmin(page);

  expect((await page.goto("/truyen/ban-thao-chua-cong-bo/chuong-1"))?.status()).toBe(404);

  await page.goto("/admin/truyen");
  await page
    .locator("[data-admin-story-row]")
    .filter({ hasText: "Bản Thảo Chưa Công Bố" })
    .getByRole("link", { name: "Bản Thảo Chưa Công Bố" })
    .click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+$/);

  await page.locator("[data-admin-publish-story-form]").getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\?saved=published$/);
  const storyDetailUrl = page.url().replace("?saved=published", "");

  await page
    .locator("[data-admin-chapter-row]")
    .filter({ hasText: "Chương 1" })
    .getByRole("link", { name: "Chương 1" })
    .click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\/chuong\/\d+$/);

  const editor = page.locator("[data-admin-chapter-editor]");
  await expect(editor).toBeVisible();
  await editor.getByLabel("Tên chương").fill("Chương mở khóa E2E");
  await editor.getByLabel("Slug").fill("chuong-1");
  await editor.getByLabel("Quyền đọc").selectOption("free");
  await editor.getByLabel("Nội dung chương").fill(
    "Noi dung chuong A4.4 da luu.\n\nDong thu hai xac nhan reader hien body.",
  );

  await page.locator("[data-admin-save-chapter-form]").getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\/chuong\/\d+\?saved=draft$/);
  await expect(editor.locator(".admin-status-pill").first()).toContainText("Bản nháp");

  await page.locator("[data-admin-publish-chapter-form]").getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\/chuong\/\d+\?saved=published$/);
  await expect(editor.locator(".admin-status-pill").first()).toContainText(
    "Đã xuất bản",
  );

  await editor.getByLabel("Nội dung chương").fill(
    "Noi dung chuong A4.4 da cap nhat khi published.\n\nReader van phai public sau khi luu.",
  );
  await page.locator("[data-admin-save-chapter-form]").getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\/chuong\/\d+\?saved=published$/);
  await expect(editor.locator(".admin-status-pill").first()).toContainText(
    "Đã xuất bản",
  );

  const readerPage = await page.context().newPage();
  expect((await readerPage.goto("/truyen/ban-thao-chua-cong-bo/chuong-1"))?.status()).toBe(200);
  const readerPayload = JSON.parse(
    (await readerPage.locator("#reader-data").textContent()) ?? "{}",
  ) as { chapter?: { content?: string | null } };
  expect(readerPayload.chapter?.content).toContain(
    "Noi dung chuong A4.4 da cap nhat khi published.",
  );
  await expect(readerPage.locator("[data-reader-content]")).toContainText(
    "Noi dung chuong A4.4 da cap nhat khi published.",
  );
  await expect(readerPage.locator("[data-vip-paywall]")).toHaveCount(0);
  await readerPage.close();

  await page.goto(storyDetailUrl);
  const archiveForm = page.locator("[data-admin-archive-story-form]");
  await archiveForm.getByLabel("Xác nhận lưu trữ truyện").check();
  await archiveForm.getByRole("button").click();
  await expect(page).toHaveURL(/\/admin\/truyen\/\d+\?saved=archived$/);

  expect(errors).toEqual([]);
});

test("Authenticated user can create, edit and delete an own story comment", async ({
  page,
}) => {
  const uniqueId = Date.now();
  const email = `comments-${uniqueId}@example.com`;
  const password = "RubyNoir2026!";
  const firstBody = `Binh luan E2E ${uniqueId}`;
  const editedBody = `Binh luan da sua ${uniqueId}`;

  await page.goto("/dang-ky");
  await page.locator('input[name="displayName"]').fill("Doc Gia Binh Luan");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('input[name="confirmPassword"]').fill(password);
  await page.locator('.auth-form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/tai-khoan\?created=1$/);

  await page.goto("/truyen/van-co-than-de");
  await expect(page.locator("[data-comment-list] .comment").first()).toBeVisible();
  expect(await page.locator("[data-comment-list] .comment").count()).toBeGreaterThanOrEqual(3);
  await page.locator("#comment-input").fill(firstBody);
  await page.locator(".comment-form button").click();
  await expect(page.locator("[data-comment-list]")).toContainText(firstBody);
  await expect(page.getByRole("button", { name: "Sửa" }).first()).toBeVisible();

  await page.getByRole("button", { name: "Sửa" }).first().click();
  await page.getByLabel("Sửa bình luận").fill(editedBody);
  await page.getByRole("button", { name: "Lưu" }).click();
  await expect(page.locator("[data-comment-list]")).toContainText(editedBody);
  await expect(page.locator("[data-comment-list]")).not.toContainText(firstBody);

  await page.getByRole("button", { name: "Xóa" }).first().click();
  await expect(page.locator("[data-comment-list]")).not.toContainText(editedBody);
});

test("Authenticated user can follow a story, view the library and remove it", async ({
  page,
}) => {
  const uniqueId = Date.now();
  const email = `library-${uniqueId}@example.com`;
  const password = "RubyNoir2026!";

  await page.goto("/dang-ky");
  await page.getByLabel("Tên hiển thị").fill("Độc Giả Tủ Truyện");
  await page.getByLabel("Email").fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByLabel("Xác nhận mật khẩu").fill(password);
  await page.getByRole("button", { name: "Đăng ký" }).click();
  await expect(page).toHaveURL(/\/tai-khoan\?created=1$/);

  await page.goto("/truyen/van-co-than-de");
  const followButton = page
    .getByRole("button", { name: "Thêm truyện vào tủ" })
    .first();
  await expect(followButton).toHaveAttribute("aria-pressed", "false");
  await followButton.click();
  await expect(
    page.getByRole("button", { name: "Bỏ truyện khỏi tủ" }).first(),
  ).toHaveAttribute("aria-pressed", "true");

  await page.goto("/tu-truyen?tab=saved");
  await expect(
    page.getByRole("heading", { name: "Tủ truyện", level: 1 }),
  ).toBeVisible();
  await expect(page.locator(".library-story-card")).toHaveCount(1);
  await expect(page.locator(".library-story-card")).toContainText(
    "Vạn Cổ Thần Đế",
  );

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBe(false);
  }

  await page
    .getByRole("button", { name: "Bỏ Vạn Cổ Thần Đế khỏi tủ truyện" })
    .click();
  await expect(page.locator(".library-story-card")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Tủ truyện đang chờ câu chuyện đầu tiên",
      level: 2,
    }),
  ).toBeVisible();
});

test("Reader saves, restores and resumes authenticated reading progress", async ({
  page,
}) => {
  const uniqueId = Date.now();
  const email = `progress-${uniqueId}@example.com`;
  const password = "RubyNoir2026!";

  await page.goto("/dang-ky");
  await page.getByLabel("Tên hiển thị").fill("Độc Giả Đang Đọc");
  await page.getByLabel("Email").fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByLabel("Xác nhận mật khẩu").fill(password);
  await page.getByRole("button", { name: "Đăng ký" }).click();
  await expect(page).toHaveURL(/\/tai-khoan\?created=1$/);

  await page.setViewportSize({ width: 1024, height: 360 });
  await page.goto("/truyen/van-co-than-de/chuong-2680");
  await expect(page.locator("#reader-title")).toContainText("Chương 2680");
  await expect(page.locator("[data-reader-content]")).toContainText(
    "Màn đêm phủ xuống Thần Uyên",
  );
  await expect(page.locator(".reader-progress-status")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  await expect
    .poll(async () => {
      const text =
        (await page.locator(".reader-progress-status").textContent()) ?? "";
      const percent = Number(text.match(/(\d+)%/)?.[1] ?? 0);
      return percent;
    })
    .toBeGreaterThan(0);

  const savedScrollY = await page.evaluate(() => window.scrollY);
  expect(savedScrollY).toBeGreaterThan(200);

  await page.reload();
  await expect(page.locator(".reader-progress-status")).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(100);

  await page.goto("/tu-truyen");
  await expect(
    page.getByRole("link", { name: /Đang đọc/ }).first(),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".library-story-card")).toHaveCount(1);
  await expect(page.locator(".library-story-card")).toContainText(
    "Chương 2680",
  );
  await expect(
    page.getByRole("progressbar", { name: /Đã đọc/ }),
  ).toHaveAttribute("aria-valuenow", /[1-9]\d*/);

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBe(false);
  }

  await page.goto("/");
  const libraryPayload =
    (await page.locator("#user-library-data").textContent()) ?? "";
  expect(libraryPayload).toContain("chuong-2680");
  await expect(page.locator("[data-continue-list]")).toContainText(
    "Chương 2680",
  );

  await page.goto("/truyen/van-co-than-de");
  await page.locator(".story-actions [data-open-reader]").nth(1).click();
  await expect(page).toHaveURL(
    /\/truyen\/van-co-than-de\/chuong-2680$/,
  );
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
