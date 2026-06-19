# Task Checklist: NovelVerse Public Website UI

File nay la checklist ngan de theo doi tien do. Chi tiet tung task nam trong `IMPLEMENTATION_PLAN.md`.

## Bat buoc cho moi thay doi lon

- [ ] Chup screenshot desktop sau thay doi.
- [ ] Chup screenshot mobile sau thay doi.
- [ ] So sanh voi design goc.
- [ ] Kiem tra mobile-friendly o 390px va 320px neu co the.
- [ ] Neu sua JavaScript, chay `node --check app.js`.
- [ ] Cap nhat `docs/PROGRESS.md`.

## Phase 0: Documentation

- [x] Task 0.1: Lock final UI spec
  - Muc tieu: `docs/SPEC.md` la source of truth.
  - Files: `docs/SPEC.md`, `docs/README.md`
  - Ket qua: Spec co pages, sections, components, colors, typography, responsive, interactions, data, motion, completion criteria.
  - Kiem tra: `rg -n "Muc tieu|Component|Responsive|Interaction|motion" docs\SPEC.md`

- [x] Task 0.2: Create implementation tracking docs
  - Muc tieu: Co plan/task/progress/test docs de nguoi moi theo doi.
  - Files: `docs/IMPLEMENTATION_PLAN.md`, `docs/TASKS.md`, `docs/PROGRESS.md`, `docs/TEST_PLAN.md`
  - Ket qua: Moi task co muc tieu, files/components, expected result, verification.
  - Kiem tra: `rg --files docs`

## Phase 1: Static Foundation

- [x] Task 1.1: Create static app shell
  - Muc tieu: Tao app static mo truc tiep duoc.
  - Files/components: `index.html`, `styles.css`, `app.js`; `PublicHeader`, `Main`, `Footer`
  - Ket qua: Page render duoc, khong trang trang.
  - Kiem tra: Mo `index.html`; chay `node --check app.js`; chup screenshot desktop/mobile.

- [x] Task 1.2: Define design tokens and base styles
  - Muc tieu: Tao dark theme va base UI system.
  - Files/components: `styles.css`; `Button`, `IconButton`, `Card`, `Badge`, `Tabs`
  - Ket qua: Mau, font, card, button, input nhat quan.
  - Kiem tra: So sanh mau voi design goc; test focus; chup screenshot desktop/mobile.

## Phase 2: Homepage

- [x] Task 2.1: Build public header and navigation
  - Muc tieu: Header giong visual goc.
  - Files/components: `index.html`, `styles.css`, `app.js`; `PublicHeader`, `Logo`, `MainNav`, `SearchInput`, `UserMenu`, `MobileMenu`
  - Ket qua: Desktop co full nav, mobile co menu compact.
  - Kiem tra: `Ctrl K`, avatar dropdown, mobile menu, screenshot desktop/mobile.

- [x] Task 2.2: Build homepage hero story
  - Muc tieu: Hero truyen hot la first-viewport signal.
  - Files/components: `index.html`, `styles.css`; `StoryHero`, `HeroStats`, `StoryActions`
  - Ket qua: Co visual hero, badge, title, CTA, stats.
  - Kiem tra: Click `Doc ngay`; screenshot desktop/mobile; so sanh `Trang-chu-topaz-2.jpg`.

- [x] Task 2.3: Build recommendation panel
  - Muc tieu: Tao `De cu cho ban`.
  - Files/components: `index.html`, `styles.css`, `app.js`; `RecommendedStoryList`, `RecommendedStoryItem`
  - Ket qua: Render tu mock data, item click mo detail.
  - Kiem tra: Desktop panel phai, mobile xep duoi hero, screenshot.

- [x] Task 2.4: Build genre section
  - Muc tieu: Tao the loai pho bien.
  - Files/components: `index.html`, `styles.css`, `app.js`; `GenreGrid`, `GenreTile`
  - Ket qua: 8 genre tiles, mobile khong overflow.
  - Kiem tra: Desktop 8 tile; mobile horizontal scroll; screenshot.

- [x] Task 2.5: Build ranking and latest updates
  - Muc tieu: Tao bang xep hang va truyen moi cap nhat.
  - Files/components: `index.html`, `styles.css`, `app.js`; `RankingPanel`, `RankingItem`, `UpdatedStoryList`, `UpdatedStoryItem`
  - Ket qua: Desktop 2 cot, mobile stack, tabs ranking hoat dong.
  - Kiem tra: Click tabs; screenshot desktop/mobile.

- [x] Task 2.6: Build story cards, continue reading and community
  - Muc tieu: Hoan thien cac section con lai homepage.
  - Files/components: `index.html`, `styles.css`, `app.js`; `StoryCard`, `ContinueReadingCard`, `CommunityCard`
  - Ket qua: Story grid, continue tabs, community cards.
  - Kiem tra: Click library tabs; full homepage screenshot desktop/mobile.

## Phase 3: Story Detail

- [x] Task 3.1: Build story detail hero
  - Muc tieu: Tao chi tiet truyen voi poster, info, stats, CTA.
  - Files/components: `index.html`, `styles.css`; `Breadcrumb`, `StoryDetailHero`, `StoryCover`, `StoryStats`, `StoryActions`, `StoryTagList`
  - Ket qua: Desktop poster trai/info phai; mobile poster tren/info duoi.
  - Kiem tra: Mo `#story`; screenshot desktop/mobile; so sanh `Chi-tiet-truyen copy.jpg`.

- [x] Task 3.2: Build story description
  - Muc tieu: Tao gioi thieu truyen.
  - Files/components: `index.html`, `styles.css`, `app.js`; `StoryDescription`
  - Ket qua: Text mo ta doc duoc, khong tran.
  - Kiem tra: Desktop/mobile screenshot.

- [x] Task 3.3: Build chapter section
  - Muc tieu: Tao danh sach chuong co search/sort.
  - Files/components: `index.html`, `styles.css`, `app.js`; `ChapterSection`, `ChapterToolbar`, `ChapterList`, `ChapterRow`, `Pagination`, `ChapterLegend`
  - Ket qua: 2 cot desktop, 1 cot mobile, VIP/new/hot states.
  - Kiem tra: Search, sort, empty state, screenshot desktop/mobile.

- [x] Task 3.4: Build comments and related stories
  - Muc tieu: Tao comments mock va related carousel.
  - Files/components: `index.html`, `styles.css`, `app.js`; `CommentSection`, `CommentForm`, `CommentItem`, `RelatedStoriesCarousel`
  - Ket qua: Submit comment mock, carousel controls hoat dong.
  - Kiem tra: Submit comment, click carousel controls, screenshot desktop/mobile.

## Phase 4: Motion and Interaction Polish

- [ ] Task 4.1: Add motion library decision
  - Muc tieu: Xac nhan static `motion` hay framework `framer-motion`.
  - Files/components: `docs/SPEC.md`, `docs/DECISIONS.md`
  - Ket qua: Co decision ro truoc khi install dependency.
  - Kiem tra: Mo docs va thay decision.

- [ ] Task 4.2: Add tasteful UI animations
  - Muc tieu: Them animation nhe va premium.
  - Files/components: `styles.css`, `app.js`, co the them dependency; `PageTransition`, `AnimatedCard`, `AnimatedDropdown`, `AnimatedCarousel`
  - Ket qua: Hover, dropdown, page transition, carousel muot; respect `prefers-reduced-motion`.
  - Kiem tra: Screenshot desktop/mobile; test motion; `node --check app.js` neu sua JS.

## Phase 5: Mobile-Friendly QA

- [x] Task 5.1: Mobile layout audit
  - Muc tieu: Dam bao mobile-friendly.
  - Files/components: `styles.css`, `index.html`; header, hero, cards, detail, chapter list, footer.
  - Ket qua: 320px/390px khong overflow, CTA bam duoc, text doc duoc.
  - Kiem tra: Screenshot mobile home/story tai 320px va 390px.

- [x] Task 5.2: Desktop visual comparison audit (bo qua theo quyet dinh user)
  - Muc tieu: So sanh desktop voi design goc.
  - Files/components: `docs/visual-audit.md` neu can; co the sua `styles.css`, `index.html`, `app.js` sau audit.
  - Ket qua: Co danh sach khac biet va screenshot before/after.
  - Kiem tra: Screenshot homepage/story desktop, ghi issue vao docs.

- [x] Task 5.3: Accessibility and keyboard audit
  - Muc tieu: Kiem tra keyboard va label.
  - Files/components: `index.html`, `styles.css`, `app.js`
  - Ket qua: Focus order hop ly, icon buttons co label, Escape dong menu.
  - Kiem tra: Tab thu cong, Escape, focus state screenshot neu can.

## Phase 6: Future Expansion

- [ ] Task 6.1: Decide static vs React/Vite/Next
  - Muc tieu: Quyet dinh co chuyen framework khong.
  - Files/components: `docs/DECISIONS.md`, future `package.json` neu co.
  - Ket qua: Decision ro truoc khi scaffold/cai dependency.
  - Kiem tra: Docs co decision va commands neu co framework.

- [x] Task 6.2: Add reader page
  - Muc tieu: Tao trang doc chuong.
  - Files/components: `index.html`, `styles.css`, `app.js`; `ReaderPage`, `ReaderToolbar`, `ChapterContent`, `ReaderSettings`
  - Ket qua: Click chapter row mo reader page, mobile doc thoai mai.
  - Kiem tra: Screenshot reader desktop/mobile.

- [ ] Task 6.3: Add admin dashboard
  - Muc tieu: Lam admin dashboard theo visual admin.
  - Files/components: tuy static/framework; `AdminShell`, `AdminSidebar`, `MetricCard`, `ChartCard`, `AdminTable`
  - Ket qua: Dashboard co sidebar, KPI, charts, tables, activity feed.
  - Kiem tra: So sanh `admin-dashboard.png`, screenshot desktop/mobile.
