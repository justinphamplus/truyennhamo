import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

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
  library: "/#library",
  settings: "/#settings",
  footer: "/#footer",
};

function convertHashRoutes(markup: string) {
  return Object.entries(routeLinks).reduce(
    (result, [hash, route]) => result.replaceAll(`href="#${hash}"`, `href="${route}"`),
    markup,
  );
}

export function getPrototypeMarkup(page: PrototypePage) {
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

  return markup;
}
