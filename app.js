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

const heroStories = [
  {
    title: "Trở Thành Kiều Nữ Trong Lòng Thái Tử, Bùi Đại Nhân Hối Hận",
    status: "Đang ra",
    blurb: "Năm bảy tuổi, Thiên Mẫn Châu được nhận vào phủ thái tử. Nàng tự mình thoát khỏi lời nguyền cổ, mở ra con đường quyền mưu đầy hiểm nguy.",
    time: "52 phút trước",
    reads: "125.6K",
    rating: "4.8",
  },
  ...stories.slice(0, 4).map((story) => ({
    title: story.title,
    status: story.status,
    blurb: story.blurb,
    time: story.time,
    reads: story.reads,
    rating: story.rating,
  })),
];

let activeHeroIndex = 0;

const genres = [
  ["Tiên Hiệp", "122K truyện"],
  ["Huyền Huyễn", "98K truyện"],
  ["Đô Thị", "76K truyện"],
  ["Hệ Thống", "64K truyện"],
  ["Ngôn Tình", "58K truyện"],
  ["Kinh Dị", "32K truyện"],
  ["Lịch Sử", "28K truyện"],
  ["Tất cả", "thể loại"],
];

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

const comments = [
  ["Thiên Đạo Vô Cực", "Lv.32", "Truyện quá hay! Mình đã đọc, tình tiết hấp dẫn, càng đọc càng cuốn!", "2 giờ trước", "245"],
  ["Kiếm Tâm", "Lv.28", "Chương mới ra nhanh quá, cảm ơn tác giả và nhóm tác giả nhiều!", "1 giờ trước", "128"],
  ["Huyền Vũ", "Lv.45", "Top 1 tiên hiệp không phải tự nhiên mà có!", "30 phút trước", "86"],
];

const continueItems = [
  { title: "Vạn Cổ Thần Đế", chapter: "Chương 2686", progress: 85, cover: "cover-blue" },
  { title: "Toàn Chức Pháp Sư", chapter: "Chương 1198", progress: 60, cover: "cover-mono" },
  { title: "Đấu Phá Thương Khung", chapter: "Chương 1652", progress: 45, cover: "cover-red" },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function cover(className = "") {
  return `<span class="cover-thumb ${className}" aria-hidden="true"></span>`;
}

function storyBlurb(story) {
  return story.blurb;
}

function truncateHeroTitle(title) {
  return title.length > 48 ? `${title.slice(0, 48).trim()}...` : title;
}

function renderHero(index = activeHeroIndex) {
  activeHeroIndex = index;
  const story = heroStories[activeHeroIndex];
  const stats = $$(".hero-stats div");

  $("#home-title").textContent = truncateHeroTitle(story.title);
  $(".hero-copy .status").textContent = story.status;
  $(".hero-copy p").textContent = story.blurb;
  stats[0].querySelector("dt").textContent = story.time;
  stats[0].querySelector("dd").textContent = "cập nhật";
  stats[1].querySelector("dt").textContent = story.reads;
  stats[2].querySelector("dt").textContent = story.rating;

  $("[data-hero-dots]").innerHTML = heroStories.map((item, itemIndex) => `
    <button class="hero-dot ${itemIndex === activeHeroIndex ? "is-active" : ""}" type="button" data-hero-slide="${itemIndex}" aria-label="Xem truyện hot ${itemIndex + 1}"></button>
  `).join("");
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
  list.innerHTML = stories.slice(0, 6).map((story) => `
    <a class="recommend-item" href="#story" data-open-story>
      ${cover(story.cover)}
      <span class="recommend-copy">
        <h3>${story.title}</h3>
        <span class="status ongoing">${story.status}</span>
        <p>${storyBlurb(story)}</p>
        <span class="meta-row">${story.time}</span>
      </span>
    </a>
  `).join("");
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
  list.innerHTML = stories.slice(0, 10).map((story, index) => `
    <li class="ranking-item">
      <span class="rank-number">${index + 1}</span>
      ${cover(story.cover)}
      <span class="ranking-copy">
        <h3>${story.title}</h3>
        <p>${story.genre}</p>
        <span class="score">${formatScore(story.score, multiplier)}</span>
      </span>
    </li>
  `).join("");
}

function formatScore(score, multiplier) {
  const value = Number(score.replace("M", "").replace("K", ""));
  const unit = score.endsWith("M") ? "M" : "K";
  return `${(value * multiplier).toFixed(unit === "M" ? 1 : 0)}${unit}`;
}

function renderUpdates() {
  const list = $("[data-updates-list]");
  list.innerHTML = stories.slice(0, 5).map((story) => `
    <a class="update-item" href="#story" data-open-story>
      ${cover(story.cover)}
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
  list.innerHTML = [...stories, ...stories.slice(0, 6)].map((story) => storyCard(story)).join("");
}

function storyCard(story) {
  return `
    <a class="story-card" href="#story" data-open-story>
      <span class="story-cover ${story.cover}" aria-hidden="true"></span>
      <h3>${story.title}</h3>
      <p>${story.genre}</p>
      <span class="rating-line"><strong>★ ${story.rating}</strong></span>
      <span class="read-line">${story.reads} lượt đọc</span>
    </a>
  `;
}

function renderContinue(type = "reading") {
  const list = $("[data-continue-list]");
  if (type === "saved") {
    list.innerHTML = stories.slice(3, 6).map((story) => `
      <article class="continue-card">
        ${cover(story.cover)}
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
    ...continueItems.map((item) => `
      <article class="continue-card">
        ${cover(item.cover)}
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
  $("[data-story-tags]").innerHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function renderChapters(filter = "", reversed = false) {
  const list = $("[data-chapter-list]");
  const items = chapters
    .filter(([title]) => title.toLowerCase().includes(filter.trim().toLowerCase()))
    .sort((a, b) => reversed ? a[0].localeCompare(b[0], "vi") : b[0].localeCompare(a[0], "vi"));

  if (!items.length) {
    list.innerHTML = `<div class="chapter-empty" role="status">Không tìm thấy chương phù hợp.</div>`;
    return;
  }

  list.innerHTML = items.map(([title, time, flags], index) => `
    <button class="chapter-row ${index === 0 ? "is-latest" : ""}" type="button" aria-label="${title}${flags.includes("vip") ? " VIP" : ""}">
      <strong>${title}</strong>
      <time>${time}</time>
      ${flags.includes("hot") ? '<i class="label-hot">Hot</i>' : ""}
      ${flags.includes("vip") ? '<i class="lock-mini" aria-hidden="true"></i>' : ""}
    </button>
  `).join("");
}

function renderComments() {
  $("[data-comment-list]").innerHTML = comments.map(([name, level, text, time, likes]) => `
    <article class="comment">
      <span class="avatar">${name.slice(0, 1)}</span>
      <div>
        <strong>${name}</strong> <span class="level">${level}</span>
        <p>${text}</p>
        <span class="comment-meta">${time} · ${likes} lượt thích · <button class="text-button" type="button">Phản hồi</button></span>
      </div>
    </article>
  `).join("");
}

function renderRelated() {
  $("[data-related-list]").innerHTML = stories.slice(2, 10).map((story) => storyCard(story)).join("");
}

function setPage(page, options = {}) {
  $$("[data-page]").forEach((node) => node.classList.toggle("is-active", node.dataset.page === page));
  $$("[data-nav]").forEach((node) => node.classList.toggle("is-active", page === "home" && node.dataset.nav === "home"));
  $("[data-mobile-cta]").classList.toggle("is-visible", page === "story");
  document.body.classList.remove("menu-open");
  $("[data-mobile-panel]").classList.remove("is-open");
  $("[data-menu-trigger]").setAttribute("aria-expanded", "false");
  if (options.scrollTop !== false) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function syncRoute() {
  if (location.hash === "#story") {
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
    const openStory = event.target.closest("[data-open-story]");
    if (openStory) {
      event.preventDefault();
      history.pushState(null, "", "#story");
      setPage("story");
      return;
    }

    const heroSlide = event.target.closest("[data-hero-slide]");
    if (heroSlide) {
      renderHero(Number(heroSlide.dataset.heroSlide));
      return;
    }

    const menuTrigger = event.target.closest("[data-menu-trigger]");
    if (menuTrigger) {
      const panel = $("[data-mobile-panel]");
      const isOpen = panel.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      menuTrigger.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const userTrigger = event.target.closest("[data-user-menu-trigger]");
    if (userTrigger) {
      const menu = $("[data-user-menu]");
      const isOpen = menu.classList.toggle("is-open");
      userTrigger.setAttribute("aria-expanded", String(isOpen));
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
      $$("[data-ranking-tab]").forEach((node) => node.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderRanking(tab.dataset.rankingTab);
    });
  });

  $$("[data-library-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$("[data-library-tab]").forEach((node) => node.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderContinue(tab.dataset.libraryTab);
    });
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
    comments.unshift(["Bạn", "Lv.1", value, "vừa xong", "0"]);
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
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#global-search").focus();
    }
    if (event.key === "Escape") {
      $("[data-user-menu]").classList.remove("is-open");
      $("[data-mobile-panel]").classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });

  window.addEventListener("hashchange", syncRoute);
}

function renderApp() {
  renderHero();
  renderRecommendations();
  renderGenres();
  renderRanking();
  renderUpdates();
  renderStoryCards();
  renderContinue();
  renderTags();
  renderChapters();
  renderComments();
  renderRelated();
  bindInteractions();
  syncRoute();
}

renderApp();
