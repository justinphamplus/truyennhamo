# Progress Tracker: NovelVerse

Cap nhat lan cuoi: 2026-06-20

## Current Phase

Next.js App Router frontend connected to the local Supabase public catalog.

## Overall Status

| Area | Status | Notes |
| --- | --- | --- |
| Project shell | Done | Next.js 16 App Router + TypeScript; legacy markup/CSS preserved during migration |
| Homepage | Done | Day du section theo spec phase dau |
| Story detail | Done | Co hero, stats, chapters, comments, related |
| Reader page | Done | Co noi dung chuong, dieu huong va tuy chinh doc |
| Interactions | Done | Mock interactions da co |
| Responsive CSS | Done | Da QA browser tai 320px, 768px, 1024px va 1440px |
| Documentation | Done | Bo docs du an da duoc tao |
| Visual theme | Done | Ruby Noir Romance la theme chinh thuc duy nhat |
| Backend/API | Catalog ready | Supabase local + catalog migration/search/RLS/seed done; user data not started |
| Admin dashboard | Not started | Out of scope hien tai |
| Deployment | Not started | Chua yeu cau |

## Completed Code

- Tao public header voi logo, nav, search, notification/bookmark/user/mobile menu.
- Tao homepage:
  - Hero truyen hot.
  - De cu cho ban.
  - The loai pho bien.
  - Bang xep hang.
  - Truyen moi cap nhat.
  - Truyen moi dang card.
  - Dang doc do/da luu.
  - Cong dong noi bat.
  - Footer.
- Tao story detail:
  - Breadcrumb.
  - Poster va thong tin truyen.
  - CTA doc/yêu thich/mua combo.
  - Stats va tags.
  - Gioi thieu truyen.
  - Danh sach chuong.
  - Binh luan.
  - Truyen lien quan.
- Tao interactions:
  - `Ctrl K` focus search.
  - Mobile menu.
  - User dropdown.
  - App Router paths `/`, `/story` va `/reader`.
  - Section anchors tren homepage.

## Theme Refactor 2026-06-15

- Applied Mystical Night color tokens from `C:/Users/Admin/Desktop/New Design.md`.
- Added glassmorphism treatment for header, cards, panels, rows, menus, footer and mobile CTA.
- Updated badge, CTA, VIP/rating, status and cover placeholder colors.
- Kept homepage and story detail layout structure unchanged.
- Applied Tieu Mo Cozy Fantasy Library tokens from `C:/Users/Admin/Desktop/tieu-mo-style-refactor-codex.md`.
- Added Tieu Mo mascot CSS art, mascot action bar, suggestion widget and story banner.
- Refactored visual language toward dark emerald, mint glow, warm gold and soft glassmorphism.

## Ruby Noir Finalization 2026-06-18

- Chot Ruby Noir Romance lam theme duy nhat cho home va story detail.
- Xoa nut chuyen theme khoi header.
- Xoa query/localStorage/toggle logic cua theme cu.
- Gan Ruby Noir truc tiep tren HTML de tranh flash giao dien cu.
- Cap nhat spec, design system, decision log va theme documentation.
- Latest QA screenshots:
  - `docs/screenshots/tieumo-home-desktop-1440.png`
  - `docs/screenshots/tieumo-home-mobile-390-fixed.png`
  - `docs/screenshots/tieumo-story-desktop-1440.png`
  - `docs/screenshots/tieumo-story-mobile-390.png`
  - `docs/screenshots/theme-home-desktop-1440.png`
  - `docs/screenshots/theme-home-mobile-390-fixed-2.png`
  - `docs/screenshots/theme-story-desktop-1440.png`
  - `docs/screenshots/theme-story-mobile-390-fixed-3.png`
  - Ranking tabs.
  - Library tabs.
  - Chapter search/sort.
  - Comment submit mock.
  - Newsletter mock submit.
  - Related carousel controls.
  - Back-to-top.

## Verification Done

- [x] `node --check app.js` pass.
- [x] Workspace file list checked.
- [x] No `TODO`, `console.log`, `debugger` found in source by `rg`.

## Not Yet Verified

- [x] Browser console clean.
- [x] Visual QA at 1440px.
- [x] Visual QA at 1024px.
- [x] Visual QA at 768px.
- [x] Visual QA at 390px.
- [x] Visual QA at 320px.
- [x] Full keyboard tab order.
- [x] Accessibility tree/labels.
- [ ] Contrast check with real browser.

## Latest Screenshot Audit

Screenshots saved in `docs/screenshots/`:

- `home-desktop.png`
- `story-desktop.png`
- `home-mobile-390.png`
- `story-mobile-390.png`

Findings are documented in `docs/visual-audit.md`.

Current blockers before moving to the next implementation task:

- Fixed: mobile horizontal overflow from the first screenshot pass.
- Fixed: story detail mobile large blank hero area.
- Fixed: story desktop visible horizontal scrollbar.

Latest fix screenshots:

- `home-mobile-390-after-search-width-fix.png`
- `story-mobile-390-after-final-overflow-fix.png`
- `story-desktop-after-overflow-fix.png`
- `compare-home-after-cover-fix.png`
- `compare-story-after-controls-fix.png`

Latest minimal fixes:

- Story card covers now render in homepage/story related sections.
- Story detail chapter toolbar and comment submit button are no longer clipped in the latest screenshot.
- JavaScript syntax check still passes.

Recommendation/cover cleanup:

- Fixed `De cu cho ban` to show story title, status, synopsis, and time instead of latest chapter info.
- Removed all `Dich`/`Convert` labels from public UI mock data.
- Standardized story covers to 9:16 ratio across recommendation, ranking, updates, cards, continue reading, and detail cover.
- Restyled `Xem tat ca` in the recommendation panel as a full-width button-like link.
- Added per-category icon accent colors in `The loai pho bien`.

Latest screenshots:

- `home-1440-after-recommendation-final.png`
- `home-mobile-390-after-recommendation-final-3.png`
- `detail-1440-after-recommendation-final.png`

## Next Recommended Task

Chot frontend MVP va thiet ke schema/backend contract truoc khi ket noi du lieu that.

## Reader Page 2026-06-18

- Them route `#reader` trong static hash routing.
- Click chapter row, `Doc ngay`, `Doc tiep` va mobile CTA mo trang doc.
- Them title chuong, metadata, noi dung mock 12 doan va drop cap.
- Them chapter selector, chuong truoc/sau o toolbar va cuoi bai.
- Toolbar co link quay lai thong tin truyen; phim mui ten trai/phai chuyen chuong.
- Them reader settings:
  - Co chu 16-24px.
  - Do rong gon/can bang/rong.
  - Nen Ruby Noir/Sepia/Sang.
- Reader toolbar sticky tren desktop/tablet va chuyen thanh grid 2 cot tren mobile.
- Focus den tieu de chuong khi mo bang ban phim.
- QA tai 320px, 768px, 1024px va 1440px: khong horizontal overflow.
- Browser console sach; `node --check app.js` pass.
- Anh QA:
  - `docs/screenshots/reader-mobile-320.png`
  - `docs/screenshots/reader-desktop-1440.png`

## Legacy Theme Cleanup 2026-06-19

- Xoa HTML Tieu Mo mascot/suggestion da bi an trong Ruby Noir.
- Xoa CSS mascot, story banner va animation `tmFloat` khong con selector runtime.
- Giu `--tm-*` token contract vi Ruby Noir van phu thuoc truc tiep.
- Screenshot comparison 1440px:
  - Home: 0 pixel thay doi.
  - Story: 0 pixel thay doi.
  - Reader: 0.0102% pixel sai khac rat nho do render, khong co layout shift.
- Anh before/after duoc luu trong `docs/screenshots/cleanup-*-1440.png`.
- QA Home/Story/Reader tai 320px: khong horizontal overflow.
- Browser console sach; `node --check app.js` va `git diff --check` pass.

## Backend Architecture 2026-06-19

- Chot Next.js App Router + TypeScript cho application layer.
- Chot Supabase PostgreSQL + Auth + Storage.
- Chot Data API + RLS cho public/user data, secret client server-only cho admin.
- Thiet ke schema authors, genres, stories, story_genres, chapters, chapter_contents, profiles, bookmarks, reading_progress va comments.
- Tach chapter metadata/body de locked chapter khong bi lo noi dung.
- Chot index plan, keyset pagination, Storage policy va logical API contract.
- Tao:
  - `docs/BACKEND_SPEC.md`
  - `docs/BACKEND_TASKS.md`
- Next.js da scaffold; chua tao Supabase project va chua apply migration.

## Next.js App Router Migration 2026-06-19

- Cai Next.js 16.2.9, React 19.2.7 va TypeScript.
- Tao App Router cho `/`, `/story` va `/reader`.
- Giu nguyen Ruby Noir markup/CSS va mock interaction de migration framework khong lam lech giao dien.
- Chuyen dieu huong page-level tu hash sang pathname; section anchors tren homepage van duoc giu.
- Chuyen asset tinh sang `public/`; cover path dung absolute URL de hoat dong tren moi route.
- Them ESLint va Playwright browser QA.
- `npm run lint` va `npm run build` pass.
- 14 Playwright tests pass:
  - Home/Story/Reader tai 320px, 768px, 1024px va 1440px.
  - Khong horizontal overflow, console khong error/warning.
  - Home -> Story -> Reader dung App Router paths.
  - Reader button va phim mui ten chuyen chuong.
- Screenshot QA luu tam trong `.tmp/qa-next-*.png`.
- Supabase va database chua duoc khoi tao trong task nay.

## Supabase Catalog 2026-06-19

- Them Supabase CLI 2.107.0 vao devDependencies.
- Khoi tao `supabase/config.toml` voi PostgreSQL 17.
- Tao migration catalog:
  - `authors`
  - `genres`
  - `stories`
  - `story_genres`
  - `chapters`
  - `chapter_contents`
- Them constraints, FK indexes, partial/composite indexes va GIN full-text index.
- Them RPC `search_stories` dung `websearch_to_tsquery('simple', ...)` va cursor `(rank, id)`.
- Explicit `GRANT SELECT` cho `anon`/`authenticated` theo Data API default tu 2026-04-28.
- Bat RLS tren ca 6 table:
  - Draft story/chapter bi an.
  - VIP chapter metadata van public.
  - VIP chapter body bi chan.
  - Published free chapter body doc duoc.
- Seed 10 stories, 6 genres va chapter/content mau; `Vạn Cổ Thần Đế` co 20 chapters.
- Verification:
  - `supabase db reset --local` pass.
  - SQL role tests pass.
  - REST Data API: 9 published stories, 0 draft, 0 VIP body.
  - Security Advisor: no issues.
  - Performance Advisor: no issues.
- Local Supabase co the khoi dong lai bang `npm run supabase:start`.

## Supabase Clients And Types 2026-06-19

- Cai `@supabase/supabase-js@2.108.2` va `@supabase/ssr@0.12.0`.
- Sinh `src/types/database.ts` truc tiep tu local PostgreSQL schema.
- Them `npm run db:types` de regenerate types sau moi migration.
- Tao ba client boundary:
  - Browser singleton dung publishable key.
  - Next.js Server Component client dung `await cookies()` va publishable key.
  - Admin client lazy-init, `server-only`, dung secret key va tat session persistence.
- Them `.env.example`; khong commit local key hoac secret.
- Khong tao proxy/auth refresh trong task nay vi chua co login flow.
- Verification:
  - `npm run db:types` deterministic.
  - `npx tsc --noEmit` pass.
  - `npm run lint` pass.
  - `npm run build` pass khi khong co `.env.local`.
  - Production dependency audit: 0 vulnerabilities.

## Homepage Supabase Integration 2026-06-19

- Homepage `/` chuyen thanh dynamic Server Component.
- Them typed query `getHomepageData()` dung publishable SSR client va RLS.
- Lay featured, latest, ranking, hot, completed va genre counts tu catalog database.
- Explicit filter `publication_status = 'published'`; draft khong vao payload.
- Embedded chapter query chi lay chapter moi nhat cho moi story.
- Legacy Ruby Noir renderer nhan serialized server payload; khong fetch Supabase tu browser.
- Cac section story tren Homepage khong con dung mock story dataset.
- `Dang doc do` van la UI progress placeholder cho den phase user data, nhung title/cover/chapter lay tu catalog that.
- Story Detail va Reader van dung mock data dung theo scope task.
- Verification:
  - Server HTML co `data-homepage-source="supabase"`.
  - Payload co 9 published stories va khong co draft.
  - 15 Playwright tests pass tai 320/768/1024/1440.
  - Khong horizontal overflow; browser console sach.
  - `npm run build`, TypeScript va ESLint pass.

## Story Detail Supabase Integration 2026-06-20

- Them canonical dynamic route `/truyen/[slug]` va dynamic metadata theo du lieu story.
- `/story` va `/story/[slug]` redirect sang `/truyen` de giu tuong thich voi lien ket cu.
- Story detail lay title, author, genres, status, cover, synopsis, stats va chapter metadata tu
  Supabase bang publishable SSR client.
- Danh sach chapter dung keyset cursor `before`/`after`, 12 chapter moi trang.
- Homepage story links tro den canonical `/truyen/[slug]`.
- Published slug render binh thuong; draft va slug khong ton tai tra 404 qua RLS/notFound.
- Reader body va chapter route that chua duoc noi trong task nay.
- Verification:
  - 18 Playwright tests pass tren Chrome, gom redirect tu route `/story` cu.
  - Story page pass tai 320/768/1024/1440, khong horizontal overflow.
  - Browser console khong co error/warning.
  - TypeScript, ESLint va production build pass.

## Reader Supabase Integration 2026-06-20

- Them canonical route `/truyen/[storySlug]/[chapterSlug]`.
- `/reader` redirect ve chapter Free moi nhat cua story seed de giu tuong thich.
- Reader query published story va chapter metadata qua publishable SSR client.
- Chi query `chapter_contents` khi chapter co `access_level = free`.
- VIP Reader hien metadata khoa va gia Xu; serialized payload co `content: null`, khong co body.
- Paywall VIP hien lock icon, gia Xu, so du 0 Xu va hai CTA theo visual reference; CTA chua
  thuc hien giao dich cho den khi co Auth/Xu ledger.
- Nut chapter tren Story Detail, previous/next, selector va phim mui ten deu dung slug URL that.
- Draft story, chapter khong ton tai va chapter khong thuoc story deu tra 404.
- Verification:
  - Free payload co body; VIP payload khong chua noi dung seed.
  - 25 Playwright tests pass tren Chrome.
  - Free va VIP Reader pass tai 320/768/1024/1440, khong horizontal overflow.
  - Browser console khong co error/warning.
  - TypeScript, ESLint va production build pass.

## Accessibility And Keyboard QA 2026-06-18

- Kiem tra chuoi Tab tren homepage, story detail va mobile 320px; khong focus vao phan tu an.
- Them focus ring Ruby Noir co do tuong phan ro cho link, button, input va phan tu co `tabindex`.
- Skip link dua focus den `main`; mo story bang ban phim dua focus den tieu de trang.
- Mobile menu va user menu mo bang Enter/Space, dong bang Escape va tra focus ve nut mo.
- Them `aria-controls`, `aria-haspopup`, `aria-current` va dong bo `aria-expanded`.
- Chuyen hai nhom nut loc tu tab semantics sang button group va dong bo `aria-pressed`.
- Kiem tra Ctrl+K, loc chuong va gui binh luan bang ban phim.
- Accessibility tree cua header co ten truy cap cho search va cac nut dang hien thi.
- Browser console khong co error/warning; `node --check app.js` pass.
- Anh QA:
  - `docs/screenshots/a11y-focus-mobile-320.png`
  - `docs/screenshots/a11y-focus-story-1440.png`

## Responsive QA 2026-06-18

- Da kiem tra homepage va story detail tai 320px, 768px, 1024px va 1440px.
- Khong co horizontal page overflow va browser console khong co error/warning.
- Tach breakpoint header 1100px khoi breakpoint layout 960px de story detail tai 1024px giu bo cuc hai cot.
- Tai 320px, an notification de giu nut mobile menu va dam bao van truy cap duoc dieu huong chinh.
- Mobile menu dong bang Escape va dong bo lai `aria-expanded`.
- Anh QA:
  - `docs/screenshots/qa-home-320.png`
  - `docs/screenshots/qa-home-768.png`
  - `docs/screenshots/qa-home-1024.png`
  - `docs/screenshots/qa-home-1440.png`
  - `docs/screenshots/qa-story-320.png`
  - `docs/screenshots/qa-story-768.png`
  - `docs/screenshots/qa-story-1024.png`
  - `docs/screenshots/qa-story-1440.png`

## Known Limitations

- Cover art and hero art are CSS approximations, not real uploaded images.
- Chua co production Supabase project; backend hien tai chay local.
- No real auth.
- No real payment/VIP purchase.
- Chua co entitlement/payment flow de mo khoa body VIP.

## Search Supabase RPC Integration 2026-06-20

- Them dynamic route `/tim-kiem` voi query `q`, cursor `rank` va `id` trong URL.
- Goi typed RPC `search_stories` bang publishable SSR client; khong fetch Supabase tu browser.
- Header search va form tren trang ket qua deu submit bang GET.
- Render ket qua theo ten truyen, synopsis va tac gia; link ve canonical `/truyen/[slug]`.
- Co initial state, no-result state va next-page cursor.
- Draft story khong xuat hien trong payload hoac giao dien.
- Verification:
  - SQL role tests pass cho title, author, draft isolation va cursor `(rank, id)`.
  - 32 Playwright tests pass tren Chrome.
  - Search pass tai 320/768/1024/1440, khong horizontal overflow, console sach.
  - TypeScript, ESLint va production build pass.

## Decision Log Shortcut

Full decisions live in `DECISIONS.md`.

Important current decisions:

- Static HTML/CSS/JS for first prototype.
- Mock data only.
- Public website first.
- Admin dashboard later.
- Visual fidelity should stay close to uploaded NovelVerse design.
