const coverImages = [
  "/bia-truyen/ba-xa-xinh-dep-sau-khi-ly-hon-1774133037.jpg",
  "/bia-truyen/chi-dai-xung-than-trong-show-tap-ky-thong-linh-1764284981.jpg",
  "/bia-truyen/cong-chua-hom-nay-tay-trang-sao-1752423420.jpg",
  "/bia-truyen/giong-cai-cuoi-cung-thoi-tinh-te-1754907283.jpg",
  "/bia-truyen/huynh-truong-doc-sung-tieu-muoi-1762460517.jpg",
  "/bia-truyen/ke-hoach-thuan-hoa-bao-quan-tan-doc-1759585901.jpg",
  "/bia-truyen/ke-nao-noi-xau-bon-gia-1778546324.jpg",
  "/bia-truyen/my-nhan-trong-long-lang-vuong-1764415439.jpg",
  "/bia-truyen/song-lai-thanh-bao-boi-trong-long-nhiep-chinh-vuong-1757198074.jpg",
  "/bia-truyen/tam-can-cua-nhiep-chinh-vuong-1757175850.jpg",
  "/bia-truyen/thai-tu-cuong-ai-doat-the-1767748297.jpg",
  "/bia-truyen/thap-nien-80-tieu-dang-thuong-trong-dai-vien-la-dai-lao-huyen-hoc-1772670958.jpg",
  "/bia-truyen/the-tu-cung-chieu-muoi-muoi-toi-tan-troi-xanh-1754925855.jpg",
  "/bia-truyen/truc-ma-cua-ta-la-thien-tai-khoa-cu-1747531540.jpg",
];

const stories = [
  {
    title: "Vạn Cổ Thần Đế",
    genre: "Huyền Huyễn",
    status: "Đang ra",
    chapter: "Chương 2686: Quyết chiến",
    blurb: "Trương Thần trọng sinh trong thân phận thiếu niên, mang theo ký ức Thần Đế để phá cục sinh tử và mở lại con đường tu luyện vô thượng.",
    time: "2 phút trước",
    reads: "1.2M",
    rating: "4.8",
    score: "2.5M",
    cover: "cover-blue",
  },
  {
    title: "Đấu Phá Thương Khung",
    genre: "Huyền Huyễn",
    status: "Đang ra",
    chapter: "Chương 1652: Hỗn độn",
    blurb: "Một thiếu niên mất đi thiên phú bước vào hành trình nghịch thiên, dùng ý chí và dị hỏa để giành lại tất cả.",
    time: "30 phút trước",
    reads: "1.2M",
    rating: "4.8",
    score: "1.0M",
    cover: "cover-red",
  },
  {
    title: "Thần Đạo Đan Tôn",
    genre: "Tu Tiên",
    status: "Hoàn tất",
    chapter: "Chương 1044: Phá cảnh",
    blurb: "Đan đạo chí tôn quay về thời niên thiếu, vừa luyện đan vừa bước qua những bí cảnh nguy hiểm nhất đại lục.",
    time: "1 giờ trước",
    reads: "1.2M",
    rating: "4.7",
    score: "1.2M",
    cover: "cover-mono",
  },
  {
    title: "Toàn Chức Pháp Sư",
    genre: "Đô Thị",
    status: "Đang ra",
    chapter: "Chương 1198: Tấn công",
    blurb: "Một thế giới đô thị nơi ma pháp song hành với đời sống hiện đại, và kẻ yếu có thể xoay chuyển vận mệnh bằng tri thức.",
    time: "15 phút trước",
    reads: "1.1M",
    rating: "4.8",
    score: "1.1M",
    cover: "cover-aqua",
  },
  {
    title: "Nhất Niệm Vĩnh Hằng",
    genre: "Tiên Hiệp",
    status: "Đang ra",
    chapter: "Chương 981: Trảm ma",
    blurb: "Một ý niệm có thể thành tiên, một lựa chọn có thể đổi cả thiên hạ trong hành trình vừa hài hước vừa bi tráng.",
    time: "1 giờ trước",
    reads: "980K",
    rating: "4.8",
    score: "980K",
    cover: "cover-gold",
  },
  {
    title: "Kiếm Lai",
    genre: "Tiên Hiệp",
    status: "Đang ra",
    chapter: "Chương 778: Kiếm ý",
    blurb: "Một thiếu niên giữ kiếm trong lòng, đi qua giang hồ, học cách nhìn thẳng vào nhân tình và đại đạo.",
    time: "2 giờ trước",
    reads: "870K",
    rating: "4.9",
    score: "870K",
    cover: "cover-red",
  },
  {
    title: "Hồng Hoang Chí Tôn",
    genre: "Huyền Huyễn",
    status: "Đang ra",
    chapter: "Chương 622: Thiên phạt",
    blurb: "Khi hồng hoang thức tỉnh, một người trẻ bị cuốn vào cuộc chiến giữa thần linh, yêu tộc và những lời thề cổ xưa.",
    time: "5 giờ trước",
    reads: "760K",
    rating: "4.7",
    score: "760K",
    cover: "cover-mono",
  },
  {
    title: "Ta Có Một Tòa Luyện Yêu Trì",
    genre: "Huyền Huyễn",
    status: "Đang ra",
    chapter: "Chương 1286: Đại chiến",
    blurb: "Từ một tòa luyện yêu trì bí ẩn, nhân vật chính mở ra con đường thu phục dị thú và phá vỡ thiên mệnh.",
    time: "2 giờ trước",
    reads: "690K",
    rating: "4.8",
    score: "690K",
    cover: "cover-blue",
  },
  {
    title: "Đại Đạo Độc Tôn",
    genre: "Tu Tiên",
    status: "Đang ra",
    chapter: "Chương 706: Sơn hải",
    blurb: "Giữa vô số đạo thống tranh phong, một kẻ cô độc chọn con đường khó nhất để chứng minh đại đạo của mình.",
    time: "8 giờ trước",
    reads: "620K",
    rating: "4.6",
    score: "620K",
    cover: "cover-aqua",
  },
  {
    title: "Ta Là Tà Đế",
    genre: "Huyền Huyễn",
    status: "Đang ra",
    chapter: "Chương 766: Kiếm ý",
    blurb: "Mang danh tà đế, hắn bước qua những âm mưu trong bóng tối để bảo vệ thứ duy nhất còn đáng tin.",
    time: "10 giờ trước",
    reads: "590K",
    rating: "4.7",
    score: "590K",
    cover: "cover-gold",
  },
];

stories.forEach((story, index) => {
  story.coverImage = coverImages[index % coverImages.length];
});

function readHomepageCatalog() {
  const node = document.getElementById("homepage-catalog-data");
  if (!node) return null;

  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

function readStoryDetail() {
  const node = document.getElementById("story-detail-data");
  if (!node) return null;

  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

function readReaderData() {
  const node = document.getElementById("reader-data");
  if (!node) return null;

  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

function readSearchData() {
  const node = document.getElementById("search-data");
  if (!node) return null;

  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

const homepageCatalog = readHomepageCatalog();
const storyDetail = readStoryDetail();
const readerData = readReaderData();
const searchData = readSearchData();
const homepageStories = homepageCatalog?.stories?.length
  ? homepageCatalog.stories
  : stories;
const homepageLatest = homepageCatalog?.latest?.length
  ? homepageCatalog.latest
  : homepageStories;
const homepageRanking = homepageCatalog?.ranking?.length
  ? homepageCatalog.ranking
  : homepageStories;
const homepageHot = homepageCatalog?.hot?.length
  ? homepageCatalog.hot
  : homepageStories;
const homepageCompleted = homepageCatalog?.completed?.length
  ? homepageCatalog.completed
  : homepageStories.filter((story) => story.status.includes("Hoàn"));

const fallbackHeroStories = [
  {
    title: "Trở Thành Kiều Nữ Trong Lòng Thái Tử, Bùi Đại Nhân Hối Hận",
    status: "Đang ra",
    blurb: "Năm bảy tuổi, Thiên Mẫn Châu được nhận vào phủ thái tử. Nàng tự mình thoát khỏi lời nguyền cổ, mở ra con đường quyền mưu đầy hiểm nguy.",
    time: "52 phút trước",
    reads: "125.6K",
    rating: "4.8",
    cover: "cover-gold",
    coverImage: coverImages[10],
  },
  ...stories.slice(0, 4).map((story) => ({
    title: story.title,
    status: story.status,
    blurb: story.blurb,
    time: story.time,
    reads: story.reads,
    rating: story.rating,
    cover: story.cover,
    coverImage: story.coverImage,
  })),
];
const heroStories = homepageCatalog?.featured?.length
  ? homepageCatalog.featured
  : fallbackHeroStories;

let activeHeroIndex = 0;
let heroAutoSlideTimer;

const fallbackGenres = [
  ["Tiên Hiệp", "122K truyện"],
  ["Huyền Huyễn", "98K truyện"],
  ["Đô Thị", "76K truyện"],
  ["Hệ Thống", "64K truyện"],
  ["Ngôn Tình", "58K truyện"],
  ["Kinh Dị", "32K truyện"],
  ["Tất cả", "thể loại"],
];
const genres = homepageCatalog?.genres?.length
  ? homepageCatalog.genres
  : fallbackGenres;

const tags = ["Tiên Hiệp", "Huyền Huyễn", "Tu Luyện", "Trận Pháp", "Long Huyền", "Dị Giới", "Không Gian", "Quân Đấu", "Ngôn Tình", "Nữ Cường", "Thế Giới", "Sủng"];

const chapters = [
  ["Chương 2686: Quyết chiến", "2 phút trước", ["new", "hot"]],
  ["Chương 2685: Phá vỡ cấm chế", "15 phút trước", ["vip"]],
  ["Chương 2684: Thâm ma đại chiến", "30 phút trước", ["vip"]],
  ["Chương 2683: Trận pháp liên hoàn", "1 giờ trước", ["vip"]],
  ["Chương 2682: Vạn cổ đệ nhất kiếm", "2 giờ trước", ["vip"]],
  ["Chương 2681: Linh hồn chi chiến", "3 giờ trước", ["vip"]],
  ["Chương 2680: Thần bí cấm địa", "5 giờ trước", ["vip"]],
  ["Chương 2679: Thiên tài tụ hội", "8 giờ trước", ["vip"]],
  ["Chương 2678: Huyết chiến", "12 giờ trước", ["vip"]],
  ["Chương 2677: Truy tìm manh mối", "15 giờ trước", ["vip"]],
  ["Chương 2676: Dị tượng xuất hiện", "18 giờ trước", ["vip"]],
  ["Chương 2675: Thánh nữ ra tay", "21 giờ trước", ["vip"]],
  ["Chương 2674: Bí cảnh mở ra", "1 ngày trước", ["vip"]],
  ["Chương 2673: Truyền thừa bí mật", "1 ngày trước", ["vip"]],
  ["Chương 2672: Đối đầu cường giả", "1 ngày trước", ["vip"]],
  ["Chương 2671: Sinh tử quyết đấu", "1 ngày trước", ["vip"]],
  ["Chương 2670: Vượt qua thử thách", "2 ngày trước", ["vip"]],
  ["Chương 2669: Bất ngờ lớn", "2 ngày trước", ["vip"]],
  ["Chương 2668: Tổ chức thần bí", "2 ngày trước", ["vip"]],
  ["Chương 2667: Âm mưu dần lộ", "3 ngày trước", ["vip"]],
];

let activeReaderIndex = 0;
let readerFontSize = 19;

const comments = [
  ["Thiên Đạo Vô Cực", "Truyện quá hay! Mình đã đọc, tình tiết hấp dẫn, càng đọc càng cuốn!", "2 giờ trước"],
  ["Kiếm Tâm", "Chương mới ra nhanh quá, cảm ơn tác giả và nhóm tác giả nhiều!", "1 giờ trước"],
  ["Huyền Vũ", "Top 1 tiên hiệp không phải tự nhiên mà có!", "30 phút trước"],
];

const continueItems = [
  { title: "Vạn Cổ Thần Đế", chapter: "Chương 2686", progress: 85, cover: "cover-blue", coverImage: coverImages[0] },
  { title: "Toàn Chức Pháp Sư", chapter: "Chương 1198", progress: 60, cover: "cover-mono", coverImage: coverImages[3] },
  { title: "Đấu Phá Thương Khung", chapter: "Chương 1652", progress: 45, cover: "cover-red", coverImage: coverImages[1] },
];
const homepageContinueItems = homepageCatalog
  ? homepageStories.slice(0, 3).map((story, index) => ({
      title: story.title,
      chapter: story.chapter,
      progress: [85, 60, 45][index],
      cover: story.cover,
      coverImage: story.coverImage,
    }))
  : continueItems;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const RUBY_NOIR_THEME = "ruby-noir";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function storyHref(story) {
  return story?.slug
    ? `/truyen/${encodeURIComponent(story.slug)}`
    : "/truyen/van-co-than-de";
}

function readerHref(storySlug, chapterSlug) {
  return `/truyen/${encodeURIComponent(storySlug)}/${encodeURIComponent(chapterSlug)}`;
}

function coverImageStyle(image) {
  return image ? `style="background-image: url('${image.replace(/'/g, "%27")}')"` : "";
}

function cover(item = "") {
  const className = typeof item === "string" ? item : item.cover || "";
  const image = typeof item === "string" ? "" : item.coverImage;
  return `<span class="cover-thumb ${className}${image ? " has-cover-image" : ""}" ${coverImageStyle(image)} aria-hidden="true"></span>`;
}

function storyBlurb(story) {
  return story.blurb;
}

function statusText(status) {
  return status.includes("Hoàn") ? "Full" : status;
}

function statusClass(status) {
  return status.includes("Hoàn") ? "full" : "ongoing";
}

function truncateHeroTitle(title) {
  return title.length > 48 ? `${title.slice(0, 48).trim()}...` : title;
}

function renderHero(index = activeHeroIndex) {
  activeHeroIndex = index;
  const story = heroStories[activeHeroIndex];
  const stats = $$(".hero-stats div");
  const isRubyNoir = document.documentElement.dataset.theme === RUBY_NOIR_THEME;

  $("#home-title").textContent = truncateHeroTitle(story.title);
  $(".hero-copy .status").className = `status ${statusClass(story.status)}`;
  $(".hero-copy .status").textContent = statusText(story.status);
  $(".hero-copy p").textContent = story.blurb;
  if (isRubyNoir) {
    stats[0].querySelector("dt").textContent = story.author || "Mặc Liên";
    stats[0].querySelector("dd").textContent = "tác giả";
    stats[1].querySelector("dt").textContent = story.reads;
    stats[1].querySelector("dd").textContent = "lượt đọc";
    stats[2].querySelector("dt").textContent = (Number(story.rating) * 2).toFixed(1);
    stats[2].querySelector("dd").textContent = "điểm";
  } else {
    stats[0].querySelector("dt").textContent = story.time;
    stats[0].querySelector("dd").textContent = "cập nhật";
    stats[1].querySelector("dt").textContent = story.reads;
    stats[1].querySelector("dd").textContent = "lượt đọc";
    stats[2].querySelector("dt").textContent = story.rating;
    stats[2].querySelector("dd").textContent = "đánh giá";
  }
  const heroCover = $("[data-hero-cover]");
  heroCover.className = `hero-featured-cover ${story.cover}${story.coverImage ? " has-cover-image" : ""}`;
  heroCover.style.backgroundImage = story.coverImage ? `url('${story.coverImage}')` : "";
  $(".hero-actions [data-open-story]")?.setAttribute("href", storyHref(story));
  $("[data-hero-rank] strong").textContent = `#${activeHeroIndex + 1}`;

  $("[data-hero-dots]").innerHTML = heroStories.map((item, itemIndex) => `
    <button class="hero-dot ${itemIndex === activeHeroIndex ? "is-active" : ""}" type="button" data-hero-slide="${itemIndex}" aria-label="Xem truyện hot ${itemIndex + 1}"${itemIndex === activeHeroIndex ? ' aria-current="true"' : ""}></button>
  `).join("");

  const thumbs = $("[data-ruby-hero-thumbs]");
  if (thumbs) {
    const thumbIndexes = Array.from({ length: Math.min(4, heroStories.length) }, (_, offset) => (activeHeroIndex + offset) % heroStories.length);
    thumbs.innerHTML = thumbIndexes.map((storyIndex) => {
      const item = heroStories[storyIndex];
      return `
      <button class="ruby-hero-thumb ${storyIndex === activeHeroIndex ? "is-active" : ""}" type="button" data-hero-slide="${storyIndex}" aria-label="Xem truyện nổi bật ${storyIndex + 1}"${storyIndex === activeHeroIndex ? ' aria-current="true"' : ""}>
        <span class="${item.cover}${item.coverImage ? " has-cover-image" : ""}" ${coverImageStyle(item.coverImage)}></span>
      </button>`;
    }).join("");
  }
}

function startHeroAutoSlide() {
  window.clearInterval(heroAutoSlideTimer);
  heroAutoSlideTimer = window.setInterval(() => {
    renderHero((activeHeroIndex + 1) % heroStories.length);
  }, 5000);
}

function genreIcon(index) {
  const paths = [
    "M12 3 4 21l8-4 8 4-8-18Z",
    "M4 20V8l5 5 3-9 3 9 5-5v12H4Z",
    "M4 20V9h4v11m4 0V4h4v16m4 0v-8h-4",
    "M12 2v20M5 7l7-5 7 5M5 17l7 5 7-5",
    "M20.8 8.6a5.5 5.5 0 0 0-8.8-4.4 5.5 5.5 0 0 0-8.8 4.4c0 5.6 8.8 10.4 8.8 10.4s8.8-4.8 8.8-10.4Z",
    "M12 3c5 2 7 5 7 9a7 7 0 0 1-14 0c0-4 2-7 7-9Z",
    "M12 2a10 10 0 1 0 10 10c-4 0-6-2-6-6-4 0-4-4-4-4Z",
    "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",
  ];
  return `<span class="genre-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${paths[index % paths.length]}"/></svg></span>`;
}

function renderRecommendations() {
  const list = $("[data-recommend-list]");
  const isRubyNoir = document.documentElement.dataset.theme === RUBY_NOIR_THEME;
  const items = isRubyNoir
    ? [...homepageLatest, ...homepageLatest.slice(0, 8)]
    : homepageLatest.slice(0, 8);
  list.innerHTML = items.map((story) => storyCard(story, {
    showMeta: false,
    cornerTag: isRubyNoir ? statusText(story.status) : "",
  })).join("");
}

function renderGenres() {
  const list = $("[data-genre-list]");
  list.innerHTML = genres.map(([name, count], index) => `
    <a class="genre-tile" href="#genres">
      ${genreIcon(index)}
      <span><strong>${name}</strong><span>${count}</span></span>
    </a>
  `).join("");
}

function renderRanking(mode = "week") {
  const multiplier = mode === "month" ? 1.2 : mode === "all" ? 1.5 : 1;
  const list = $("[data-ranking-list]");
  list.innerHTML = homepageRanking.slice(0, 10).map((story, index) => `
    <li class="ranking-item">
      <span class="rank-number">${index + 1}</span>
      ${cover(story)}
      <span class="ranking-copy">
        <h3>${story.title}</h3>
        <p>${story.genre}</p>
        <span class="score">${flameIcon()}${formatScore(story.score, multiplier)}</span>
      </span>
    </li>
  `).join("");
}

function flameIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22c4.2 0 7-2.8 7-6.7 0-2.7-1.5-4.7-3.1-6.3-.7 1.7-1.8 2.8-3 3.3.5-3.4-1.1-6.5-4.3-9.3.2 3.9-1.6 5.8-3 7.5A7.7 7.7 0 0 0 4 15.3C4 19.2 7.8 22 12 22Z"/></svg>`;
}

function formatScore(score, multiplier) {
  const value = Number(score.replace("M", "").replace("K", ""));
  const unit = score.endsWith("M") ? "M" : "K";
  return `${(value * multiplier).toFixed(unit === "M" ? 1 : 0)}${unit}`;
}

function renderUpdates() {
  const list = $("[data-updates-list]");
  list.innerHTML = homepageLatest.slice(0, 5).map((story) => `
    <a class="update-item" href="${storyHref(story)}" data-open-story>
      ${cover(story)}
      <span class="update-copy">
        <h3>${story.title}</h3>
        <p>${story.chapter}</p>
      </span>
      <span class="update-time">${story.time} <i class="badge-new">New</i></span>
    </a>
  `).join("");
}

function renderStoryCards() {
  const list = $("[data-story-card-list]");
  const isRubyNoir = document.documentElement.dataset.theme === RUBY_NOIR_THEME;
  const items = isRubyNoir
    ? homepageHot.slice(0, 10)
    : [...homepageHot, ...homepageHot.slice(0, 6)];
  list.innerHTML = items.map((story, index) => storyCard(story, {
    showMeta: false,
    rank: isRubyNoir ? index + 1 : null,
  })).join("");
}

function renderCompletedCards() {
  const list = $("[data-completed-card-list]");
  const limit = 16;
  list.innerHTML = homepageCompleted.slice(0, limit).map((story) => storyCard(story, {
    showMeta: false,
    fullBadge: true,
  })).join("");
}

function storyCard(story, options = {}) {
  const { showMeta = true, fullBadge = false, rank = null, cornerTag = "" } = options;
  const meta = showMeta ? `
      <p>${story.genre}</p>
      <span class="rating-line"><strong>★ ${story.rating}</strong></span>
      <span class="read-line">${story.reads} lượt đọc</span>` : "";
  const badge = fullBadge
    ? '<span class="full-tag">Full</span>'
    : rank
      ? `<span class="rank-tag">${rank}</span>`
      : cornerTag
        ? `<span class="full-tag">${cornerTag}</span>`
        : "";

  return `
    <a class="story-card ${fullBadge ? "is-full" : ""}" href="${storyHref(story)}" data-open-story>
      <span class="story-cover ${story.cover}${story.coverImage ? " has-cover-image" : ""}" ${coverImageStyle(story.coverImage)} aria-hidden="true">${badge}</span>
      <h3>${story.title}</h3>
      ${meta}
    </a>
  `;
}

function renderContinue(type = "reading") {
  const list = $("[data-continue-list]");
  if (type === "saved") {
    list.innerHTML = homepageStories.slice(3, 6).map((story) => `
      <article class="continue-card">
        ${cover(story)}
        <span>
          <h3>${story.title}</h3>
          <p>Đã lưu vào tủ truyện</p>
          <button class="mini-button" type="button">Đọc tiếp</button>
        </span>
      </article>
    `).join("");
    return;
  }

  list.innerHTML = [
    ...homepageContinueItems.map((item) => `
      <article class="continue-card">
        ${cover(item)}
        <span>
          <h3>${item.title}</h3>
          <p>${item.chapter}</p>
          <div class="progress" aria-label="Đã đọc ${item.progress}%"><span style="width:${item.progress}%"></span></div>
          <span class="meta-row">Cập nhật gần đây</span>
        </span>
      </article>
    `),
    `<article class="continue-card">
      <span class="cover-thumb cover-aqua" aria-hidden="true"></span>
      <span>
        <h3>Khám phá thêm truyện hấp dẫn khác</h3>
        <p>Gợi ý dựa trên thể loại bạn thường đọc.</p>
        <button class="mini-button" type="button">Khám phá</button>
      </span>
    </article>`,
  ].join("");
}

function renderTags() {
  const storyTags = storyDetail?.story?.genres?.length
    ? storyDetail.story.genres
    : tags;
  $("[data-story-tags]").innerHTML = storyTags
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function renderChapters(filter = "", reversed = false) {
  const list = $("[data-chapter-list]");
  const sourceChapters = storyDetail?.chapters?.length
    ? storyDetail.chapters
    : chapters.map(([title, time, flags], index) => ({
        id: index,
        number: Number(title.match(/\d+(?:[.,]\d+)?/)?.[0].replace(",", ".")) || 0,
        slug: "",
        title: title.split(": ").slice(1).join(": "),
        label: title,
        accessLevel: flags.includes("vip") ? "vip" : "free",
        coinPrice: flags.includes("vip") ? 700 : 0,
        isHot: flags.includes("hot"),
        publishedAt: time,
      }));
  const items = sourceChapters
    .filter((chapter) => chapter.label.toLowerCase().includes(filter.trim().toLowerCase()))
    .sort((a, b) => reversed ? a.number - b.number : b.number - a.number);

  if (!items.length) {
    list.innerHTML = `<div class="chapter-empty" role="status">Không tìm thấy chương phù hợp.</div>`;
    return;
  }

  list.innerHTML = items.map((chapter, index) => {
    const chapterIndex = sourceChapters.findIndex((item) => item.id === chapter.id);
    const chapterNo = `Chương ${String(chapter.number).replace(".", ",")}`;
    const isVip = chapter.accessLevel === "vip";
    const isLatest = chapter.number === storyDetail?.story?.latestChapterNumber || index === 0;
    const meta = isVip
      ? `<span class="chapter-meta">
          <span class="label-vip"><span class="material-symbols-rounded vip-star" aria-hidden="true">star</span><span>VIP</span></span>
          <span class="chapter-price"><span>${chapter.coinPrice}</span><span class="material-symbols-rounded coin-icon" aria-hidden="true">monetization_on</span></span>
          <span class="material-symbols-rounded lock-mini" aria-hidden="true">lock</span>
        </span>`
      : `<span class="chapter-meta">
          <i class="label-free">Free</i>
          <span class="chapter-chevron" aria-hidden="true">›</span>
        </span>`;
    return `
    <button class="chapter-row ${isVip ? "is-vip" : ""} ${isLatest ? "is-latest" : ""}" type="button" data-open-reader="${chapterIndex}" data-chapter-slug="${escapeHtml(chapter.slug)}" aria-label="${escapeHtml(chapter.label)}${isVip ? ` VIP ${chapter.coinPrice} Xu` : ""}">
      <span class="chapter-title"><strong>${chapterNo}</strong>${chapter.title ? `<span>${escapeHtml(chapter.title)}</span>` : ""}</span>
      ${meta}
    </button>
  `;
  }).join("");
}

function renderChapterPagination() {
  if (!storyDetail) return;

  const pagination = $(".chapters .pagination");
  const { hasPrevious, hasNext, previousCursor, nextCursor } = storyDetail.pagination;
  const basePath = `/truyen/${encodeURIComponent(storyDetail.story.slug)}`;
  const links = [];

  if (hasPrevious && previousCursor !== null) {
    links.push(`<a class="mini-button" href="${basePath}?after=${previousCursor}">Trang trước</a>`);
  }

  links.push('<span aria-current="page">Trang hiện tại</span>');

  if (hasNext && nextCursor !== null) {
    links.push(`<a class="mini-button" href="${basePath}?before=${nextCursor}">Trang tiếp</a>`);
  }

  pagination.innerHTML = links.join("");
}

function renderComments() {
  $("[data-comment-list]").innerHTML = comments.map(([name, text, time]) => `
    <article class="comment">
      <span class="avatar">${name.slice(0, 1)}</span>
      <div class="comment-body">
        <strong>${name}</strong>
        <p>${text}</p>
        <span class="comment-meta"><time>${time}</time><span aria-hidden="true">·</span><button class="text-button" type="button">Phản hồi</button></span>
      </div>
    </article>
  `).join("");
}

function renderRelated() {
  const isRubyNoir = document.documentElement.dataset.theme === RUBY_NOIR_THEME;
  $("[data-related-list]").innerHTML = stories.slice(2, 10).map((story) => storyCard(story, {
    showMeta: !isRubyNoir,
  })).join("");
}

function renderStoryDetailCover() {
  const detailCover = $(".story-detail .cover-card");
  const story = storyDetail?.story;
  const fallbackStory = stories[0];
  const coverImage = story?.coverImage || fallbackStory.coverImage;
  detailCover.className = `cover-card featured-cover lightning-cover ${fallbackStory.cover}${coverImage ? " has-cover-image" : ""}`;
  detailCover.style.backgroundImage = coverImage ? `url('${coverImage}')` : "";
}

function renderSearchResults() {
  if (!searchData) return;

  const query = searchData.query || "";
  const results = searchData.results || [];
  const summary = $("[data-search-summary]");
  const resultList = $("[data-search-results]");
  const pagination = $("[data-search-pagination]");

  $("#global-search").value = query;
  $("#search-page-input").value = query;

  if (!query) {
    summary.textContent = "Nhập tên truyện, tác giả hoặc từ khóa nội dung.";
    resultList.innerHTML = `
      <div class="search-empty" role="status">
        <span class="material-symbols-rounded" aria-hidden="true">manage_search</span>
        <h2>Bắt đầu tìm một câu chuyện</h2>
        <p>Kết quả sẽ được tìm trong tên truyện, giới thiệu và tên tác giả.</p>
      </div>
    `;
    pagination.innerHTML = "";
    return;
  }

  summary.textContent = results.length
    ? `${results.length} kết quả cho “${query}”${searchData.nextCursor ? " trên trang này" : ""}.`
    : `Không tìm thấy kết quả cho “${query}”.`;

  if (!results.length) {
    resultList.innerHTML = `
      <div class="search-empty" role="status">
        <span class="material-symbols-rounded" aria-hidden="true">search_off</span>
        <h2>Chưa tìm thấy truyện phù hợp</h2>
        <p>Thử một phần tên truyện, tên tác giả hoặc từ khóa ngắn hơn.</p>
      </div>
    `;
    pagination.innerHTML = "";
    return;
  }

  resultList.innerHTML = results.map((story, index) => `
    <article class="search-result-card">
      <a class="search-result-cover cover-thumb cover-${["gold", "red", "blue", "aqua", "mono"][index % 5]}${story.coverImage ? " has-cover-image" : ""}" href="${storyHref(story)}" ${coverImageStyle(story.coverImage)} aria-label="Xem ${escapeHtml(story.title)}"></a>
      <div class="search-result-copy">
        <div class="search-result-meta">
          <span class="status ${statusClass(story.status)}">${escapeHtml(story.status)}</span>
          <span>${escapeHtml(story.latestChapter)}</span>
        </div>
        <h2><a href="${storyHref(story)}">${escapeHtml(story.title)}</a></h2>
        <p class="search-result-author">Tác giả: <strong>${escapeHtml(story.author)}</strong></p>
        <p class="search-result-synopsis">${escapeHtml(story.synopsis)}</p>
        <a class="search-result-link" href="${storyHref(story)}">Xem thông tin truyện <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `).join("");

  if (!searchData.nextCursor) {
    pagination.innerHTML = "";
    return;
  }

  const nextParams = new URLSearchParams({
    q: query,
    rank: String(searchData.nextCursor.rank),
    id: String(searchData.nextCursor.id),
  });
  pagination.innerHTML = `<a class="button ghost" href="/tim-kiem?${nextParams}">Trang tiếp <span aria-hidden="true">→</span></a>`;
}

function renderStoryDetail() {
  const story = storyDetail?.story;
  if (!story) return;

  $("#story-page .breadcrumb").innerHTML = `
    <a href="/">Trang chủ</a>
    <span aria-hidden="true">/</span>
    <a href="/#genres">${escapeHtml(story.primaryGenre)}</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page">${escapeHtml(story.title)}</span>
  `;

  $("#story-title").textContent = story.title;
  $(".story-info > .pill").textContent = story.primaryGenre;
  $(".author-line .avatar").textContent = story.authorInitial;
  $(".author-line strong").textContent = story.author;

  const status = $(".status-line.detail .status");
  status.textContent = story.status;
  status.className = `status ${statusClass(story.status)}`;
  $(".status-line.detail span:last-child").textContent = story.latestChapterNumber
    ? `Chương ${String(story.latestChapterNumber).replace(".", ",")}`
    : "Chưa có chương";

  const stats = $$(".story-info .stat-grid dt");
  stats[0].textContent = story.reads;
  stats[1].textContent = story.follows;
  stats[2].textContent = String(story.chapterCount);

  const descriptionParagraphs = $$(".story-description p");
  descriptionParagraphs[0].textContent = story.synopsis;
  descriptionParagraphs[1].hidden = true;
  $("[data-expand-description]").style.display = "none";

  $$(".story-actions [data-open-reader], .mobile-cta [data-open-reader]").forEach((button) => {
    button.dataset.storySlug = story.slug;
    button.dataset.chapterSlug = storyDetail.chapters[0]?.slug || "";
  });

  if (!story.isVip) {
    $(".story-actions .button.buy").hidden = true;
    $(".vip-upgrade").hidden = true;
  }
}

const readerParagraphs = [
  "Màn đêm phủ xuống Thần Uyên như một tấm lụa đen không đáy. Trương Thần đứng trên vách đá, áo bào bị gió kéo căng về phía sau, ánh mắt dừng lại ở những đạo phù văn đang lần lượt sáng lên giữa thung lũng.",
  "Tiếng chuông cổ vang từ nơi rất xa. Mỗi nhịp chuông đi qua, linh khí trong thiên địa lại nặng thêm một tầng, khiến đá vụn quanh chân hắn khẽ rung lên rồi lơ lửng giữa không trung.",
  "Đối diện hắn, cánh cổng bằng huyền thiết từ từ mở ra. Sau khe cửa là một khoảng tối đặc quánh, nhưng trong bóng tối ấy có vô số ánh mắt đỏ như máu đang đồng loạt nhìn về phía trước.",
  "Trương Thần không lùi. Hắn giơ tay, từng sợi kiếm ý mỏng như tơ tụ lại trên đầu ngón tay. Kiếm chưa xuất hiện, nhưng mặt đất phía trước đã nứt thành một đường thẳng kéo dài hàng trăm trượng.",
  "Người áo đen bước ra khỏi cổng, giọng nói khàn đặc: “Ngươi đã biết nơi này là cấm địa, vì sao vẫn đến?”",
  "“Bởi thứ các ngươi lấy đi vốn thuộc về ta.” Trương Thần đáp, thanh âm không lớn, nhưng át qua cả tiếng gió và tiếng gầm đang dâng lên phía sau cánh cổng.",
  "Trong khoảnh khắc tiếp theo, hàng nghìn đạo trận văn bùng sáng. Ánh đỏ phủ kín bầu trời, hóa thành những sợi xích khổng lồ lao xuống. Trương Thần xoay cổ tay, kiếm quang trắng bạc vạch một vòng cung tròn hoàn mỹ.",
  "Va chạm không phát ra tiếng nổ. Mọi âm thanh dường như bị rút khỏi thế giới trong một nhịp thở. Sau đó, luồng khí cuồng bạo mới tràn ra, nghiền nát những vách núi gần nhất thành bụi mịn.",
  "Người áo đen lùi ba bước. Trên mặt nạ xuất hiện một vết nứt nhỏ. Hắn đưa tay chạm vào vết nứt, lần đầu tiên trong mắt hiện lên vẻ kinh ngạc không thể che giấu.",
  "Trương Thần tiến về phía trước. Mỗi bước chân của hắn đều khiến một tầng trận pháp tắt đi. Những ký ức từ vạn năm trước trở lại rõ ràng hơn bao giờ hết, nhưng trong lòng hắn không còn phẫn nộ, chỉ còn sự bình tĩnh lạnh lẽo.",
  "Sau cánh cổng, một luồng khí tức cổ xưa thức tỉnh. Cả Thần Uyên nghiêng đi như sắp sụp đổ, còn thanh kiếm trong tay Trương Thần cuối cùng cũng hiện hình, sáng như một vầng trăng mới mọc.",
  "Hắn nâng kiếm, mũi kiếm hướng thẳng vào bóng tối. “Trận chiến này đã kéo dài quá lâu. Hôm nay, chúng ta kết thúc nó.”",
];

function renderReader(index = activeReaderIndex) {
  if (readerData) {
    const { story, chapter, chapters: readerChapters, previous, next } = readerData;
    const select = $("[data-reader-select]");
    const storyUrl = storyHref(story);

    select.innerHTML = readerChapters.map((item) => `
      <option value="${readerHref(story.slug, item.slug)}"${item.slug === chapter.slug ? " selected" : ""}>${escapeHtml(item.label)}${item.accessLevel === "vip" ? " · VIP" : ""}</option>
    `).join("");

    $$(".reader-story-link, .reader-breadcrumb a, .reader-bottom-nav a").forEach((link) => {
      link.href = storyUrl;
    });
    $(".reader-breadcrumb a").textContent = story.title;
    $(".reader-kicker").textContent = story.title;
    $("[data-reader-title]").textContent = chapter.label;
    $("[data-reader-breadcrumb]").textContent = `Chương ${String(chapter.number).replace(".", ",")}`;

    const content = $("[data-reader-content]");
    $("[data-reader-paper]").classList.toggle("is-locked", chapter.isLocked);
    if (chapter.isLocked) {
      content.innerHTML = `
        <section class="reader-lock" role="status" aria-labelledby="reader-lock-title" data-vip-paywall>
          <span class="reader-lock-icon" aria-hidden="true">
            <span class="material-symbols-rounded">lock</span>
          </span>
          <h2 id="reader-lock-title">Chương VIP</h2>
          <p class="reader-lock-description">Bạn cần dùng Xu để mở khóa và tiếp tục đọc chương này.</p>
          <strong class="reader-lock-price">
            <span class="material-symbols-rounded" aria-hidden="true">monetization_on</span>
            ${chapter.coinPrice} Xu
          </strong>
          <p class="reader-lock-balance">
            Số dư của bạn:
            <strong><span class="material-symbols-rounded" aria-hidden="true">monetization_on</span> 0 Xu</strong>
          </p>
          <div class="reader-lock-actions">
            <button class="reader-unlock-button" type="button" data-vip-unlock>Mở khóa ngay</button>
            <button class="reader-topup-button" type="button" data-vip-topup>Nạp thêm Xu</button>
          </div>
        </section>
      `;
    } else {
      const paragraphs = (chapter.content || "")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
      content.innerHTML = paragraphs.length
        ? paragraphs.map((paragraph, paragraphIndex) => `
            <p${paragraphIndex === 0 ? ' class="reader-lead"' : ""}>${escapeHtml(paragraph)}</p>
          `).join("")
        : '<p class="reader-empty" role="status">Nội dung chương đang được cập nhật.</p>';
    }

    $$("[data-reader-prev]").forEach((button) => {
      button.disabled = !previous;
      button.dataset.readerHref = previous
        ? readerHref(story.slug, previous.slug)
        : "";
    });
    $$("[data-reader-next]").forEach((button) => {
      button.disabled = !next;
      button.dataset.readerHref = next
        ? readerHref(story.slug, next.slug)
        : "";
    });
    return;
  }

  activeReaderIndex = Math.min(Math.max(index, 0), chapters.length - 1);
  $("[data-reader-paper]").classList.remove("is-locked");
  const [title] = chapters[activeReaderIndex];
  const [chapterNo] = title.split(":");
  const select = $("[data-reader-select]");

  select.innerHTML = chapters.map(([chapterTitle], chapterIndex) => `
    <option value="${chapterIndex}"${chapterIndex === activeReaderIndex ? " selected" : ""}>${chapterTitle}</option>
  `).join("");

  $("[data-reader-title]").textContent = title;
  $("[data-reader-breadcrumb]").textContent = chapterNo;
  $("[data-reader-content]").innerHTML = readerParagraphs.map((paragraph, paragraphIndex) => `
    <p${paragraphIndex === 0 ? ' class="reader-lead"' : ""}>${paragraph}</p>
  `).join("");

  $$("[data-reader-prev]").forEach((button) => {
    button.disabled = activeReaderIndex >= chapters.length - 1;
  });
  $$("[data-reader-next]").forEach((button) => {
    button.disabled = activeReaderIndex <= 0;
  });
}

function changeReaderChapter(index, focusHeading = false) {
  if (readerData) {
    const target = index < 0 ? readerData.previous : readerData.next;
    if (target) {
      location.assign(readerHref(readerData.story.slug, target.slug));
    }
    return;
  }

  renderReader(index);
  $(".reader-heading").scrollIntoView({ behavior: "smooth", block: "start" });
  if (focusHeading) {
    $("[data-reader-title]").focus();
  }
}

function setPage(page, options = {}) {
  $$("[data-page]").forEach((node) => node.classList.toggle("is-active", node.dataset.page === page));
  $$("[data-nav]").forEach((node) => {
    const isCurrent = page === "home" && node.dataset.nav === "home";
    node.classList.toggle("is-active", isCurrent);
    if (isCurrent) {
      node.setAttribute("aria-current", "page");
    } else {
      node.removeAttribute("aria-current");
    }
  });
  $("[data-mobile-cta]").classList.toggle("is-visible", page === "story");
  document.body.classList.toggle("reader-mode", page === "reader");
  document.body.classList.remove("menu-open");
  $("[data-mobile-panel]").classList.remove("is-open");
  $("[data-menu-trigger]").setAttribute("aria-expanded", "false");
  if (options.scrollTop !== false) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (options.focusHeading) {
    const headingId = page === "reader"
      ? "reader-title"
      : page === "story"
        ? "story-title"
        : page === "search"
          ? "search-title"
          : "home-title";
    $(`#${headingId}`).focus();
  }
}

function syncRoute() {
  if (readerData || location.pathname === "/reader") {
    const chapterIndex = Number(new URLSearchParams(location.search).get("chapter"));
    if (Number.isInteger(chapterIndex)) {
      activeReaderIndex = chapterIndex;
    }
    renderReader(activeReaderIndex);
    setPage("reader");
    return;
  }

  if (searchData || location.pathname === "/tim-kiem") {
    setPage("search");
    return;
  }

  if (
    location.pathname === "/story" ||
    location.pathname.startsWith("/story/") ||
    location.pathname.startsWith("/truyen/")
  ) {
    setPage("story");
    return;
  }

  setPage("home", { scrollTop: false });
  const target = location.hash ? $(location.hash) : null;
  if (target) {
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function bindInteractions() {
  document.addEventListener("click", (event) => {
    const readerDirection = event.target.closest("[data-reader-prev]")
      ? -1
      : event.target.closest("[data-reader-next]")
        ? 1
        : 0;
    if (readerDirection) {
      changeReaderChapter(activeReaderIndex + readerDirection, event.detail === 0);
      return;
    }

    const readerFontButton = event.target.closest("[data-reader-font]");
    if (readerFontButton) {
      readerFontSize = Math.min(24, Math.max(16, readerFontSize + Number(readerFontButton.dataset.readerFont)));
      $("[data-reader-paper]").style.setProperty("--reader-font-size", `${readerFontSize}px`);
      $("[data-reader-font-value]").value = `${readerFontSize}px`;
      return;
    }

    if (event.target.closest("[data-hero-prev]")) {
      renderHero((activeHeroIndex - 1 + heroStories.length) % heroStories.length);
      startHeroAutoSlide();
      return;
    }

    if (event.target.closest("[data-hero-next]")) {
      renderHero((activeHeroIndex + 1) % heroStories.length);
      startHeroAutoSlide();
      return;
    }

    const recommendDirection = event.target.closest("[data-recommend-prev]") ? -1 : event.target.closest("[data-recommend-next]") ? 1 : 0;
    if (recommendDirection) {
      const track = $("[data-recommend-list]");
      track.scrollBy({ left: recommendDirection * Math.max(track.clientWidth * 0.85, 320), behavior: "smooth" });
      return;
    }

    const hotDirection = event.target.closest("[data-hot-prev]") ? -1 : event.target.closest("[data-hot-next]") ? 1 : 0;
    if (hotDirection) {
      const track = $("[data-story-card-list]");
      track.scrollBy({ left: hotDirection * Math.max(track.clientWidth * 0.85, 320), behavior: "smooth" });
      return;
    }

    const openStory = event.target.closest("[data-open-story]");
    if (openStory) {
      event.preventDefault();
      location.assign(openStory.getAttribute("href") || "/truyen/van-co-than-de");
      return;
    }

    const openReader = event.target.closest("[data-open-reader]");
    if (openReader) {
      const storySlug = openReader.dataset.storySlug || storyDetail?.story?.slug;
      const chapterSlug = openReader.dataset.chapterSlug;
      if (storySlug && chapterSlug) {
        location.assign(readerHref(storySlug, chapterSlug));
        return;
      }
      activeReaderIndex = Number(openReader.dataset.openReader) || 0;
      location.assign(`/reader?chapter=${activeReaderIndex}`);
      return;
    }

    const heroSlide = event.target.closest("[data-hero-slide]");
    if (heroSlide) {
      renderHero(Number(heroSlide.dataset.heroSlide));
      startHeroAutoSlide();
      return;
    }

    const menuTrigger = event.target.closest("[data-menu-trigger]");
    if (menuTrigger) {
      const panel = $("[data-mobile-panel]");
      const isOpen = panel.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      menuTrigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen && event.detail === 0) {
        panel.querySelector("a")?.focus();
      }
      return;
    }

    const userTrigger = event.target.closest("[data-user-menu-trigger]");
    if (userTrigger) {
      const menu = $("[data-user-menu]");
      const isOpen = menu.classList.toggle("is-open");
      userTrigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen && event.detail === 0) {
        menu.querySelector("a, button")?.focus();
      }
      return;
    }

    if (!event.target.closest("[data-user-menu]")) {
      $("[data-user-menu]").classList.remove("is-open");
      $("[data-user-menu-trigger]").setAttribute("aria-expanded", "false");
    }

    if (event.target.closest("[data-back-top]")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const scrollButton = event.target.closest("[data-scroll-related]");
    if (scrollButton) {
      const track = $("[data-related-list]");
      track.scrollBy({ left: Number(scrollButton.dataset.scrollRelated) * 340, behavior: "smooth" });
    }
  });

  $$("[data-ranking-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$("[data-ranking-tab]").forEach((node) => {
        node.classList.remove("is-active");
        node.setAttribute("aria-pressed", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed", "true");
      renderRanking(tab.dataset.rankingTab);
    });
  });

  $$("[data-library-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$("[data-library-tab]").forEach((node) => {
        node.classList.remove("is-active");
        node.setAttribute("aria-pressed", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed", "true");
      renderContinue(tab.dataset.libraryTab);
    });
  });

  $("[data-reader-select]").addEventListener("change", (event) => {
    if (readerData) {
      location.assign(event.target.value);
      return;
    }
    changeReaderChapter(Number(event.target.value));
  });

  $("[data-reader-width]").addEventListener("change", (event) => {
    $("[data-reader-paper]").dataset.readerWidthValue = event.target.value;
  });

  $("[data-reader-theme]").addEventListener("change", (event) => {
    $("[data-reader-paper]").dataset.readerThemeValue = event.target.value;
  });

  let reversed = false;
  $("[data-chapter-search]").addEventListener("input", (event) => renderChapters(event.target.value, reversed));
  $("[data-sort-chapters]").addEventListener("click", (event) => {
    reversed = !reversed;
    event.currentTarget.textContent = reversed ? "Z-A Sắp xếp" : "A-Z Sắp xếp";
    renderChapters($("[data-chapter-search]").value, reversed);
  });

  $(".comment-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#comment-input");
    const value = input.value.trim();
    if (!value) return;
    comments.unshift(["Bạn", value, "vừa xong"]);
    input.value = "";
    renderComments();
  });

  $(".newsletter").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#newsletter-email");
    input.value = "";
    input.placeholder = "Đã đăng ký nhận thông báo";
  });

  document.addEventListener("keydown", (event) => {
    const readerIsActive = $("#reader-page").classList.contains("is-active");
    const isReaderControl = event.target.closest("input, select, textarea, button, summary");
    if (readerIsActive && !isReaderControl && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      if (readerData) {
        changeReaderChapter(event.key === "ArrowLeft" ? -1 : 1, true);
      } else {
        changeReaderChapter(activeReaderIndex + (event.key === "ArrowLeft" ? 1 : -1), true);
      }
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#global-search").focus();
    }
    if (event.key === "Escape") {
      const userMenuWasOpen = $("[data-user-menu]").classList.contains("is-open");
      const mobileMenuWasOpen = $("[data-mobile-panel]").classList.contains("is-open");
      $("[data-user-menu]").classList.remove("is-open");
      $("[data-mobile-panel]").classList.remove("is-open");
      $("[data-user-menu-trigger]").setAttribute("aria-expanded", "false");
      $("[data-menu-trigger]").setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      if (userMenuWasOpen) {
        $("[data-user-menu-trigger]").focus();
      } else if (mobileMenuWasOpen) {
        $("[data-menu-trigger]").focus();
      }
    }
  });

  window.addEventListener("hashchange", syncRoute);
}

function renderApp() {
  renderHero();
  startHeroAutoSlide();
  renderRecommendations();
  renderGenres();
  renderRanking();
  renderUpdates();
  renderStoryCards();
  renderCompletedCards();
  renderContinue();
  renderStoryDetail();
  renderTags();
  renderChapters();
  renderChapterPagination();
  renderComments();
  renderRelated();
  renderStoryDetailCover();
  renderSearchResults();
  renderReader();
  bindInteractions();
  syncRoute();
}

renderApp();
