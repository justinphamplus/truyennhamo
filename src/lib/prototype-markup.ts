import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { CurrentProfile } from "@/lib/auth/current-user";

export type PrototypePage = "home" | "search" | "story" | "reader";

const source = readFileSync(join(process.cwd(), "index.html"), "utf8");
const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<script[^>]*src="app\.js[^"]*"[^>]*><\/script>\s*<\/body>/);

if (!bodyMatch) {
  throw new Error("Không thể đọc markup prototype từ index.html");
}

const routeLinks: Record<string, string> = {
  home: "/",
  story: "/truyen/van-co-than-de",
  genres: "/#genres",
  ranking: "/#ranking",
  new: "/#new",
  completed: "/#completed",
  community: "/#community",
  library: "/tu-truyen",
  settings: "/#settings",
  footer: "/#footer",
};

function convertHashRoutes(markup: string) {
  return Object.entries(routeLinks).reduce(
    (result, [hash, route]) => result.replaceAll(`href="#${hash}"`, `href="${route}"`),
    markup,
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAuthMenu(profile: CurrentProfile | null) {
  if (!profile) {
    return `
      <a href="/dang-nhap">Đăng nhập</a>
      <a href="/dang-ky">Tạo tài khoản</a>
    `;
  }

  return `
    <span class="user-menu-name">${escapeHtml(profile.displayName)}</span>
    <a href="/tai-khoan">Hồ sơ cá nhân</a>
    <a href="/tu-truyen">Tủ truyện</a>
    <form action="/auth/logout" method="post">
      <button type="submit">Đăng xuất</button>
    </form>
  `;
}

export function getPrototypeMarkup(
  page: PrototypePage,
  profile: CurrentProfile | null = null,
) {
  let markup = convertHashRoutes(bodyMatch![1]);

  markup = markup.replace(
    /class="page(?: reader-page)?(?: is-active)?" id="(home|search|story|reader)-page"/g,
    (_match, pageName: PrototypePage) => {
      const classes = ["page"];
      if (pageName === "reader") classes.push("reader-page");
      if (pageName === page) classes.push("is-active");
      return `class="${classes.join(" ")}" id="${pageName}-page"`;
    },
  );

  if (page !== "story") {
    markup = markup.replace('class="mobile-cta is-visible"', 'class="mobile-cta"');
  }

  const avatarText = profile?.displayName.trim().charAt(0).toLocaleUpperCase("vi") || "M";
  markup = markup.replace(
    /(<span class="avatar" data-user-avatar>)[\s\S]*?(<\/span>)/,
    `$1${escapeHtml(avatarText)}$2`,
  );
  markup = markup.replace(
    /(<div class="user-menu" id="user-menu" data-user-menu data-auth-menu>)[\s\S]*?(<\/div>)/,
    `$1${renderAuthMenu(profile)}$2`,
  );

  return markup;
}
