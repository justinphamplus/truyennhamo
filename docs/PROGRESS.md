# Progress Tracker: NovelVerse

Cap nhat lan cuoi: 2026-06-30

## Current Phase

Next.js App Router frontend connected to Supabase catalog, Auth, profiles and bookmarks.

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
| Backend/API | Reading progress ready | Catalog + Auth + bookmarks + reading resume are connected |
| Admin dashboard | Real dashboard ready | `/admin` reads Supabase payload, has route boundaries, and passes checkpoint QA |
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
- `Dang doc do` lay reading progress that cho user da dang nhap; anonymous van thay fallback catalog.
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
- No real payment/VIP purchase.
- Chua co entitlement/payment flow de mo khoa body VIP.

## Supabase Auth And Profiles 2026-06-20

- Them `public.profiles` voi FK `auth.users`, constraints, grants va RLS.
- Trigger `private.handle_new_user` tao profile sau signup; security-definer function khong nam trong
  exposed schema.
- Them email/password signup, login, logout va profile update bang Next.js Server Actions.
- Them `/auth/confirm` cho hosted email confirmation va `src/proxy.ts` de refresh session cookies.
- Them route `/dang-ky`, `/dang-nhap`, protected `/tai-khoan`.
- Header public phan biet anonymous/authenticated va hien ten/avatar/profile/logout phu hop.
- Validation server dung Zod; username normalize lowercase va chi cho phep `[a-z0-9_]`.
- Verification:
  - `supabase db reset --local`, migration list va SQL RLS/trigger tests pass.
  - Supabase security/performance advisors: no issues.
  - Browser E2E pass signup -> update profile -> authenticated header -> logout -> login.
  - 42 Playwright tests pass; Auth UI pass tai 320/768/1024/1440, console sach.
  - TypeScript, ESLint, production build va production dependency audit pass.

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

## Supabase Bookmarks And User Library 2026-06-21

- Them `public.bookmarks` voi primary key `(user_id, story_id)`, FK cascade va index
  `(user_id, created_at desc)`/`story_id`.
- Bat RLS, explicit grant cho authenticated va chan user doc/ghi/xoa bookmark cua user khac.
- Policy insert chi cho phep published story.
- Them Server Action idempotent dung upsert/delete va revalidate Story/Home/Library.
- Story Detail co nut Theo doi dong bo tai desktop/mobile; guest duoc chuyen den login voi return URL.
- Them protected route `/tu-truyen`, empty state, danh sach theo thoi gian luu va thao tac bo theo doi.
- Menu tai khoan va nav Tu truyen tro den route that.
- Verification:
  - Local database reset va SQL role tests pass.
  - Supabase database lint, security advisor va performance advisor: no issues.
  - TypeScript, ESLint va production build pass.
  - 44 Playwright tests pass; follow -> library -> remove pass.
  - `/tu-truyen` khong horizontal overflow tai 320/768/1024/1440.

## Supabase Reading Progress 2026-06-21

- Them `public.reading_progress` voi primary key `(user_id, story_id)`, progress/scroll checks,
  explicit grants va owner-only RLS.
- Them composite FK `(story_id, chapter_id)` den `chapters(story_id, id)` de database tu choi
  chapter khong thuoc story.
- Them index `(user_id, last_read_at desc)` va `chapter_id`.
- Reader chapter Free autosave sau 1.2 giay ngung cuon, heartbeat 15 giay va restore theo phan tram
  noi dung; VIP khong ghi progress.
- Mutation di qua internal Route Handler `/api/reading-progress`, re-check session/chapter Free va
  goi atomic upsert server-side.
- `/tu-truyen` co hai che do `Dang doc` va `Da theo doi`; reading card co progressbar va canonical
  resume URL.
- Homepage `Dang doc do`/`Da luu` dung personalized payload that khi da dang nhap.
- Nut `Doc tiep` tren Story Detail mo chapter da luu; `Doc ngay` van mo chapter moi nhat.
- Verification:
  - Clean database reset, SQL RLS/upsert/cross-story FK tests pass.
  - Supabase database lint, security advisor va performance advisor: no issues.
  - JavaScript syntax, TypeScript, ESLint va production build pass.
  - 45 Playwright tests pass, gom save -> reload restore -> library/home -> Story resume.
  - Reading library pass khong overflow tai 320/768/1024/1440.

## Supabase Comments 2026-06-26

- Them `public.comments` voi story/chapter/parent FK, soft-delete status, body length check,
  like counter check va indexes cho story/chapter/user/parent access patterns.
- Bat RLS va explicit grant: anon/authenticated doc comment `visible` tren published story;
  authenticated insert own comment tren published story/chapter; update/delete own comment.
- Seed 3 comment mau cho `van-co-than-de`.
- Story Detail query 20 comment moi nhat va profile display name, render vao payload Supabase.
- Them Server Actions `createCommentAction`, `updateOwnCommentAction`, `deleteOwnCommentAction`
  voi Zod validation, session user check, owner/status filters va revalidate canonical story route.
- Them `CommentControls` client component portal vao form/list prototype de tao/sua/xoa comment that
  ma khong rewrite shell hien tai.
- Them Playwright coverage cho luong signup -> comment -> edit -> delete.
- Verification:
  - `npm run supabase:start` started local Supabase tren Docker Desktop.
  - `npm run db:reset` pass va apply migration `20260626044535_add_comments.sql`.
  - `npm run db:test` pass cho public visible comments, own create/update/soft-delete, draft-story
    block, cross-user block va cross-story chapter block.
  - Supabase security va performance advisors local: no issues.
  - `npm run db:types` pass va generated lai `src/types/database.ts` tu local schema.
  - `npx tsc --noEmit`, `npm run lint` va `npm run build` pass.
  - Full Playwright suite pass: 46/46, gom signup -> comment -> edit -> delete.

## Admin Foundation 2026-06-27

- Them canonical `/admin` route voi server-side layout guard.
- Them `src/lib/admin/auth.ts` server-only helper dung Supabase Auth `getUser()` va `ADMIN_EMAILS`
  allowlist; khong dung `raw_user_meta_data`.
- Guest vao `/admin` duoc redirect ve `/dang-nhap?next=/admin`.
- Authenticated non-admin vao `/admin` nhan 404.
- Them placeholder `ADMIN_EMAILS` vao `.env.example`.
- Them static admin shell: sidebar grouped navigation, topbar, search placeholder, profile affordance,
  content frame va footer status.
- Admin sidebar co day du nhom Noi dung, Nguoi dung, Doanh thu, Marketing va Cau hinh he thong theo spec.
- Them `AdminDashboardPayload` typed contract va `adminDashboardMockPayload` gom 5 KPI, 6 panel dataset,
  note deferred cho Doanh thu/Giao dich.
- `/admin` nhung JSON payload `#admin-dashboard-data` de A2 render component tu contract, khong truyen
  row Supabase raw vao UI.
- Public prototype script chi khoi dong tren cac page public duoc ho tro, khong chay nham tren admin route.
- Verification:
  - Playwright admin guard tests pass cho guest va non-admin.
  - Playwright admin shell tests pass cho grouped navigation, topbar, keyboard focus va screenshots
    tai 320/768/1024/1440.
  - Playwright admin dashboard payload contract test pass.
  - `npx.cmd tsc --noEmit`, `npm run lint`, `npm run build` pass.
  - `npm.cmd audit --audit-level=high`: 0 vulnerabilities.
  - Full Playwright suite pass: 51/51.

## Admin Dashboard A2.1 2026-06-27

- Render 5 KPI metric cards tu `AdminDashboardPayload` mock: Tong truyen, Tong nguoi dung,
  Luot doc, Doanh thu va Giao dich.
- Them `MetricCard` voi icon slot, accessible label, value, delta text va note deferred khi co.
- Them `AdminDashboard` server component de `/admin` render payload typed thay cho placeholder cards.
- Verification:
  - Focused Playwright KPI test pass.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Admin Dashboard A2.2 2026-06-27

- Them 3 SVG/CSS chart khong dependency moi: reads line chart, genre donut chart va revenue bar chart.
- Charts render tu `AdminDashboardPayload`, co text summary va empty state cho arrays rong.
- Revenue chart giu trang thai deferred cho den payment ledger.
- Verification:
  - Focused Playwright chart test pass.
  - Admin Playwright group pass: 7/7.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.
  - Screenshot desktop/mobile tai 1440 va 320 khong overlap.

## Admin Dashboard A2.3 2026-06-27

- Them top stories list voi rank, cover fallback, title link, genre/production type va read count.
- Them recent stories semantic table; mobile rows stack bang `data-label`.
- Them user activity feed voi kind label, actor/action va target ro rang.
- Verification:
  - Focused Playwright list/table/feed test pass.
  - Admin Playwright group pass: 8/8.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.
  - Screenshot desktop/mobile khong overlap; title link focus duoc.

## Static Dashboard Checkpoint 2026-06-27

- Dashboard static visually complete tu mock payload: KPI, charts, top stories, recent stories va activity feed.
- Visible admin copy scan khong co mojibake; screenshots 1440/320 khong overlap.
- Empty states co message trong dashboard panels; route loading/error boundaries duoc giu cho A3.2.
- Verification:
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.
  - Full Playwright suite pass: 54/54.
  - `git diff --check` pass voi CRLF warnings cu.

## Admin Dashboard Data A3.1 2026-06-27

- `/admin` now calls server-side `getAdminDashboardPayload()` and embeds `source: "supabase"` in the JSON contract.
- KPI, reads chart, genre distribution, top stories, recent stories, and activity feed use existing Supabase tables.
- Revenue and transactions remain explicit deferred placeholders until payment/ledger tasks.
- Verification:
  - `npx.cmd tsc --noEmit` pass.
  - `npm.cmd run build` pass.
  - `npx.cmd playwright test tests/app-router-migration.spec.ts -g "Admin dashboard"` pass.

## Admin Dashboard A3.2 2026-06-29

- Added `/admin/loading.tsx` with skeleton shapes matching the dashboard grid.
- Added `/admin/error.tsx` with a generic retry state that does not render raw database errors.
- Verification:
  - `npx.cmd playwright test tests/app-router-migration.spec.ts -g "Admin"` pass: 9/9.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Real Dashboard Checkpoint 2026-06-29

- Reviewed A3.1/A3.2 for correctness, security, test coverage, and over-engineering.
- No required code changes found during checkpoint review.
- Dashboard data is server-side, guarded by admin auth, and UI still consumes only `AdminDashboardPayload`.
- Revenue and transactions remain explicit deferred placeholders.
- Verification:
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.
  - Full Playwright suite pass: 55/55.
  - `npm.cmd audit --audit-level=high`: 0 vulnerabilities.
  - `git diff --check` pass voi CRLF warnings cu.

## Admin Editorial Contracts A4.1 2026-06-29

- Defined story-centered admin contracts in `src/lib/admin/validators.ts` for story upsert,
  chapter upsert, publish, archive and shared mutation results.
- Story production type is limited to `self_produced` or `licensed_translation`.
- Story/chapter status and slug validation are explicit; published items require `publishedAt`.
- Author search payload accepts only name, slug and aliases; no bio/avatar fields from browser input.
- Story/chapter inputs are strict and do not accept browser-supplied actor/user ids.
- Destructive archive inputs require explicit confirmation literals.
- Verification:
  - Focused validator Playwright spec pass: 4/4.
  - `npx.cmd tsc --noEmit` pass.
  - `npm.cmd run lint` pass.

## Admin Story Shell A4.2 2026-06-29

- Added `/admin/truyen` story list route and `/admin/truyen/[id]` detail shell.
- Added server-only admin story queries using the Supabase admin client; list supports title/author
  search plus status, production type and uploader filters.
- Added read-only editorial form shell with title, slug, description, author, production type, status
  and published date fields.
- Kept chapters nested under the story detail page with a metadata table; no separate admin chapter
  sidebar item was added.
- Added migration `20260629102906_grant_admin_read_catalog.sql` to grant service-role read access to
  catalog metadata needed by server-only admin pages.
- Playwright output artifacts now use `.tmp/playwright-results` to avoid stale locked traces.
- Verification:
  - `npm.cmd run db:reset` pass.
  - `npm.cmd run db:test` pass.
  - Supabase local advisors: no issues.
  - Focused Playwright admin story list/detail pass, including 320/768/1024/1440 overflow checks and screenshots.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Admin Story Publish/Archive A4.3 2026-06-29

- Added server-only story publish/archive actions under `/admin/truyen/actions.ts`.
- Publish sets `publication_status = 'published'`, preserves existing `published_at`, sets missing publish timestamps server-side, and revalidates admin/public story paths.
- Archive requires UI confirmation, sets `publication_status = 'archived'`, and hides the story from public RLS-backed routes.
- Added column-level `service_role` update grant for story publication fields; anon/authenticated still have no story write grant.
- Audit event writing remains deferred because the audit schema/table does not exist yet.
- Verification:
  - `npm.cmd run db:reset` pass.
  - `npm.cmd run db:test` pass.
  - Supabase local advisors: no issues.
  - Focused Playwright publish/archive test pass.
  - `npx.cmd tsc --noEmit`, `npm.cmd run build` pass.

## Admin Chapter Edit/Publish A4.4 2026-06-29

- Added nested admin chapter editor route `/admin/truyen/[id]/chuong/[chapterId]`.
- Story detail chapter rows now link into the nested editor instead of creating a separate sidebar module.
- Added server-only chapter save draft and publish actions using existing admin contracts.
- Save draft updates chapter metadata and `chapter_contents`; publish validates published story, content row,
  access level and server-side publish timestamp before exposing the chapter.
- Follow-up consistency fix moved chapter save/publish writes into service-role RPC transactions and preserves
  `published` status when saving an already published chapter.
- Added column-level `service_role` grants for chapter/content mutation fields; anon/authenticated still have
  no write grant to content tables.
- Audit event writing remains deferred because the audit schema/table does not exist yet.
- Verification:
  - `npm.cmd run db:reset` pass.
  - `npm.cmd run db:test` pass.
  - Supabase local advisors: no issues.
  - Focused Playwright nested chapter edit/publish test pass.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Admin Comment Moderation A5.1 2026-06-30

- Added read-only admin comment queue at `/admin/binh-luan`.
- Queue shows latest comments with story context, reader profile label, status, like count and timestamps.
- Added status and search filters through URL params; no hide/restore mutations yet.
- Added service-role read grant migration for comments, profiles and stories; public/user comment permissions are unchanged.
- Verification:
  - `npm.cmd run db:reset` pass.
  - `npm.cmd run db:test` pass.
  - Supabase local advisors: no issues.
  - Focused Playwright admin comment queue test pass with 320/768/1024/1440 overflow screenshots.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## UTF-8 Hygiene 2026-06-30

- Added `.editorconfig` to pin repository text editing to UTF-8 with final newlines.
- Added `.gitattributes` to keep Git text normalization and binary asset handling explicit.
- Added `npm run text:check`, a dependency-free Node guard for replacement characters and common UTF-8 mojibake patterns.
- Fixed confirmed mojibake in the admin spec public-link label and comment RLS SQL test literals.
- Verification:
  - `npm.cmd run text:check` pass.

## Admin Comment Moderation A5.2 2026-06-30

- Added server-only admin hide/restore actions for comments at `/admin/binh-luan`.
- Admin queue now shows per-row actions: visible comments can be hidden, hidden comments can be restored, deleted comments stay non-actionable.
- Restore only allows returning a comment to `visible` when the related story is still published.
- Added service-role update grant for comment moderation status fields; anon/authenticated grants are unchanged.
- SQL coverage verifies service-role hide/restore and that a comment owner cannot restore a hidden moderated comment.
- Public story cache is revalidated after moderation so hidden comments disappear from story pages and restored comments return.
- Audit event writing remains deferred because the audit schema/table does not exist yet.
- Verification:
  - `npm.cmd run db:reset` pass.
  - `npm.cmd run db:test` pass.
  - Focused Playwright admin comment hide/restore test pass.
  - `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Story Cover Storage A5.3 2026-06-30

- Added Supabase Storage bucket `story-covers` as public object URL read with no broad public list policy, plus a 5MB image limit and JPG/PNG/WebP MIME allowlist.
- Kept object reads available through public bucket URLs while avoiding anon/authenticated `storage.objects` list access; upload/update/delete stay server-admin only via service-role actions.
- Added admin story detail cover UI for preview, upload/update and delete.
- Server action validates story id/slug, MIME, file size, image signature and server-generated `{story_id}/{version}.{ext}` object paths before updating `stories.cover_path`.
- Added `service_role` update grant for `stories.cover_path` and `updated_at`.
- Audit event writing remains deferred because the audit schema/table does not exist yet.
- Verification:
  - `npm.cmd run db:reset` pass after implementation and again after full browser suite.
  - `npm.cmd run db:test` pass with storage bucket/policy/grant checks.
  - Supabase local advisors: no issues.
  - Focused Playwright story cover upload/delete test pass.
  - Full `npx.cmd playwright test`: 66/66 pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=high`, `git diff --check` pass.

## Admin Revenue Shells A6.1 2026-06-30

- Added real admin routes for `/admin/giao-dich`, `/admin/goi-nap`, `/admin/goi-vip`, `/admin/rut-tien` and `/admin/thong-ke-doanh-thu`.
- Updated revenue sidebar links from query-param placeholders to those routes.
- Added a shared read-only deferred revenue shell with no forms, buttons or fake mutations.
- Kept `Gói nạp` and `Gói VIP` as separate route/module contracts.
- `Thống kê doanh thu` now reserves breakdown placeholders for revenue by story and by uploader username.
- Verification:
  - Focused Playwright revenue route smoke test pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Admin Role/Notification Shells A6.2 2026-06-30

- Added real admin routes for `/admin/vai-tro` and `/admin/thong-bao`.
- Updated role and notification sidebar links from query-param placeholders to those routes.
- Added a shared read-only deferred admin shell with no forms, buttons or fake mutations.
- Role shell states dependency on server-side role/permission schema and audit.
- Notification shell states dependency on notification schema, delivery channels and opt-out policy.
- Verification:
  - Focused Playwright role/notification route smoke test pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build` pass.

## Admin Marketing Shells A7.1 2026-06-30

- Added real admin routes for `/admin/marketing` and `/admin/marketing/su-kien`.
- Updated marketing overview and event sidebar links from query-param placeholders to those routes.
- Added a shared read-only marketing shell with no forms, buttons or fake mutations.
- Marketing overview reserves structured placeholders for active campaigns, upcoming banners and upcoming events.
- Event shell reserves draft, scheduled, live and ended status slots until campaign schema exists.
- Verification:
  - Focused Playwright marketing route smoke test pass.
  - Full `npx.cmd playwright test`: 69/69 pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=high`, `git diff --check` pass.
  - `npm.cmd run db:reset` pass after browser suite.

## Admin Banner Placement Shell A7.2 2026-06-30

- Added real admin route for `/admin/marketing/banner`.
- Updated the banner sidebar link from query-param placeholder to the route.
- Added a read-only banner placement shell with four reserved placements: Trang chủ, Thể loại, Chi tiết truyện and Reader.
- Each placement shows placeholder status plus expected size and position notes.
- Upload, campaign binding, scheduling and mutations remain deferred until storage/campaign schema is available.
- Verification:
  - Focused Playwright banner placement route smoke test pass.
  - Full `npx.cmd playwright test`: 70/70 pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=high`, `git diff --check` pass.
  - `npm.cmd run db:reset` pass after browser suite.

## Admin Featured Stories Shell A7.3 2026-06-30

- Added real admin route for `/admin/marketing/truyen-de-xuat`.
- Updated the Truyện đề xuất sidebar link from query-param placeholder to the route.
- Added a read-only featured stories shell with four editorial pick slots: Hero campaign, Trang chủ, Chi tiết truyện and Reader.
- Placeholder copy names the deferred dependencies on campaign schema and story ranking/boost policy.
- Boost mutations remain deferred until campaign/ranking rules exist.
- Verification:
  - Focused Playwright featured stories route smoke test pass.
  - Full `npx.cmd playwright test`: 71/71 pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=high`, `git diff --check` pass.
  - `npm.cmd run db:reset` pass after browser suite.

## Admin Marketing Deferred Shells A7.4 2026-06-30

- Added real admin routes for `/admin/marketing/ma-khuyen-mai`, `/admin/marketing/thong-bao-chien-dich` and `/admin/marketing/thong-ke`.
- Updated promo, campaign notification and marketing stats sidebar links from query-param placeholders to those routes.
- Reused the existing read-only marketing shell for all three pages; no coupon, push/email, analytics or tracking mutations were added.
- Promo placeholder names the deferred payment/VIP dependency.
- Campaign notification placeholder names the deferred notification system and push/email policy.
- Marketing stats placeholder reserves clicks, reads, conversion and attribution.
- Verification:
  - Focused Playwright A7.4 route smoke test pass.
  - Full `npx.cmd playwright test`: 72/72 pass.
  - `npm.cmd run text:check`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=high`, `git diff --check` pass.
  - `npm.cmd run db:reset` pass after browser suite.

## Admin Final Checkpoint QA 2026-06-30

- Completed whole-admin checkpoint review for A1-A7.4.
- Cleaned remaining visible shell labels from English-only `Read-only shell`/`Placeholder` wording to Vietnamese labels.
- Reviewed admin security boundaries:
  - Admin Supabase client remains in a `server-only` module.
  - Service-role grants stay server-side/RPC/storage-policy scoped.
  - Admin queries use explicit column selections instead of `select("*")`.
  - Dashboard JSON script escapes `<` before `dangerouslySetInnerHTML`.
- Verification:
  - `npm.cmd run text:check`, `npm.cmd run db:test`, `npx.cmd supabase db advisors --local --type all --level warn --fail-on error`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=high` pass.
  - Full `npx.cmd playwright test`: 72/72 pass after copy cleanup.
  - `npm.cmd run db:reset` pass after browser suite.

## Admin Production Release Checklist 2026-06-30

- Added `docs/ADMIN_RELEASE_CHECKLIST.md` for admin production env, Supabase migration, smoke test and rollback gates.
- Checklist captures Supabase changelog notes relevant to this release:
  - public table exposure/Data API grants must be verified after migration;
  - production should not run deprecated Postgres 14;
  - service role and secret keys must stay server-only;
  - Node 22 remains the CI/runtime target.
- Updated `docs/README.md` so the release checklist is discoverable.

## Decision Log Shortcut

Full decisions live in `DECISIONS.md`.

Important current decisions:

- Static HTML/CSS/JS for first prototype.
- Mock data only.
- Public website first.
- Admin dashboard later.
- Visual fidelity should stay close to uploaded NovelVerse design.
