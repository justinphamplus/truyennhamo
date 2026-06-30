# Admin Panel Task Breakdown

Source of truth:

- `docs/ADMIN_PANEL_SPEC.md`
- Selected visual: `docs/admin-visuals/admin-visual-01-ruby-dashboard-v2.png`
- Backend constraints: `docs/BACKEND_SPEC.md`, Phase B4

Trang thai: A5.2 comment hide/restore actions da complete; story cover storage/upload la task tiep theo.

## Dependency graph

```text
Admin auth decision
  -> Admin route guard
  -> Admin shell
  -> Static dashboard payload
  -> Dashboard components
  -> Real dashboard query
  -> Editorial mutations
  -> Moderation/actions
  -> Storage/revenue/marketing/system modules
```

## Phase A0: Documentation And Alignment

### Task A0.1: Chot selected admin spec

**Description:** Chot `ADMIN_PANEL_SPEC.md` lam source of truth cho visual, copy tieng Viet, layout, data contract va security constraints.

**Acceptance criteria:**
- [ ] Spec tro den selected visual V2.
- [ ] Tat ca visible copy trong spec la tieng Viet co dau.
- [ ] Spec noi ro visual khong phai pixel contract.

**Verification:**
- [ ] Review docs manually.
- [ ] `git diff -- docs/ADMIN_PANEL_SPEC.md`

**Dependencies:** None

**Files likely touched:**
- `docs/ADMIN_PANEL_SPEC.md`

**Estimated scope:** XS

### Task A0.2: Chot task breakdown

**Description:** Chia admin panel thanh cac phase nho, moi task co acceptance criteria va verification.

**Acceptance criteria:**
- [ ] Moi task co dependencies.
- [ ] Khong co task nao yeu cau lam ca dashboard + mutations cung luc.
- [ ] Co checkpoint sau moi phase lon.

**Verification:**
- [ ] Review docs manually.
- [ ] `git diff -- docs/ADMIN_PANEL_TASKS.md`

**Dependencies:** A0.1

**Files likely touched:**
- `docs/ADMIN_PANEL_TASKS.md`

**Estimated scope:** XS

## Checkpoint: Docs ready

- [ ] User chon spec/task breakdown.
- [ ] Chua code app.
- [ ] Co the bat dau Phase A1 sau khi duoc approve.

## Phase A1: Admin Foundation

### Task A1.1: Define admin authorization helper

**Description:** Tao server-only helper kiem tra user hien tai co quyen admin khong. MVP de xuat dung Supabase Auth user + server-only email allowlist, khong dung `raw_user_meta_data`.

**Acceptance criteria:**
- [x] Guest bi redirect hoac notFound khi vao `/admin`.
- [x] Non-admin authenticated user bi chan.
- [x] Admin allowlist chi doc o server.
- [x] Helper khong import vao Client Component.

**Verification:**
- [x] Unit/integration test helper neu co test harness phu hop. Repo hien chua co unit test harness; covered bang Playwright route tests.
- [x] Playwright guest blocked.
- [x] `npx.cmd tsc --noEmit`
- [x] `npm run build`

**Dependencies:** A0.1

**Files likely touched:**
- `src/lib/admin/auth.ts`
- `src/app/admin/layout.tsx`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A1.2: Build static admin shell

**Description:** Tao `/admin` route voi shell tinh: sidebar, topbar, content container va footer status. Chua ket noi dashboard data that.

**Acceptance criteria:**
- [x] Sidebar dung dung nhom va label tieng Viet.
- [x] Topbar co title, search placeholder, profile affordance.
- [x] Link `Truy cập trang web` ve `/`.
- [x] Layout khong bi overflow o 320/768/1024/1440.

**Verification:**
- [x] Playwright screenshot desktop/mobile.
- [x] Keyboard tab qua nav/topbar duoc.
- [x] `npm run lint`
- [x] `npm run build`

**Dependencies:** A1.1

**Files likely touched:**
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/components/admin/admin-shell.tsx`
- `src/components/admin/admin-sidebar.tsx`
- `src/components/admin/admin-topbar.tsx`
- `styles.css`

**Estimated scope:** M

### Task A1.3: Add admin dashboard mock payload

**Description:** Tao typed mock/static payload cho dashboard de render UI dung contract, khong lay raw data trong component.

**Acceptance criteria:**
- [x] `AdminDashboardPayload` duoc type ro.
- [x] Mock payload co 5 KPI va 6 panels.
- [x] Revenue/giao dich co note deferred neu chua co data that.
- [x] Revenue breakdown va Marketing summary khong render trong dashboard MVP; chung thuoc module rieng.

**Verification:**
- [x] `npx.cmd tsc --noEmit`
- [x] Dashboard render duoc voi payload mock.

**Dependencies:** A1.2

**Files likely touched:**
- `src/lib/admin/dashboard.ts`
- `src/components/admin/dashboard/admin-dashboard.tsx`
- `src/app/admin/page.tsx`

**Estimated scope:** S

## Checkpoint: Admin foundation

- [x] Guest/non-admin access bi chan.
- [x] Admin shell render voi mock payload.
- [x] `npx.cmd tsc --noEmit`, `npm run lint`, `npm run build` pass.
- [x] Visual QA 320/768/1024/1440 pass.

## Phase A2: Dashboard UI Components

### Task A2.1: Implement metric cards

**Description:** Render 5 KPI cards theo token Ruby Noir, co icon slot, value, delta text va accessible labels.

**Acceptance criteria:**
- [x] Tong truyen, Tong nguoi dung, Luot doc, Doanh thu, Giao dich hien dung.
- [x] Delta co text tang/giam, khong chi dua vao mau.
- [x] Value khong wrap/leak khoi card desktop.

**Verification:**
- [x] Component renders with mock payload.
- [x] Responsive QA 320/768/1024/1440.
- [x] `npm run lint`

**Dependencies:** A1.3

**Files likely touched:**
- `src/components/admin/metric-card.tsx`
- `src/components/admin/dashboard/admin-dashboard.tsx`
- `styles.css`

**Estimated scope:** S

### Task A2.2: Implement dashboard charts without new dependency

**Description:** Implement reads line chart, genre donut chart va revenue bar chart bang SVG/CSS noi bo.

**Acceptance criteria:**
- [x] Charts render tu payload typed.
- [x] Co empty state khi arrays rong.
- [x] Co text summary cho screen reader.
- [x] Khong them chart dependency.

**Verification:**
- [x] `npx.cmd tsc --noEmit`
- [x] Browser screenshot desktop/mobile.
- [x] Manual inspect reduced data/empty state.

**Dependencies:** A2.1

**Files likely touched:**
- `src/components/admin/charts/reads-line-chart.tsx`
- `src/components/admin/charts/genre-donut-chart.tsx`
- `src/components/admin/charts/revenue-bar-chart.tsx`
- `styles.css`

**Estimated scope:** M

### Task A2.3: Implement dashboard lists and tables

**Description:** Implement top stories list, recent stories semantic table va user activity feed.

**Acceptance criteria:**
- [x] Top stories co rank, cover, title, genre, read count.
- [x] Recent stories dung `<table>` desktop va stacked rows mobile.
- [x] Activity feed co kind label va target ro rang.
- [x] Khong co text overlap trong row dai.

**Verification:**
- [x] Playwright screenshot desktop/mobile.
- [x] Keyboard/focus review for links.
- [x] `npm run lint`

**Dependencies:** A2.1

**Files likely touched:**
- `src/components/admin/dashboard/top-stories-list.tsx`
- `src/components/admin/dashboard/recent-stories-table.tsx`
- `src/components/admin/dashboard/user-activity-feed.tsx`
- `styles.css`

**Estimated scope:** M

## Checkpoint: Static dashboard complete

- [x] Dashboard visually gan selected V2 nhung khong bi loi text/pixel.
- [x] Tat ca visible copy tieng Viet co dau.
- [x] Empty states co message ro; route loading/error boundaries de rieng o A3.2.
- [x] `npx.cmd tsc --noEmit`, `npm run lint`, `npm run build` pass.

## Phase A3: Real Dashboard Data

### Task A3.1: Add server dashboard query

**Description:** Ket noi dashboard voi du lieu that co san: stories, profiles, story_genres, comments/bookmarks neu can. Revenue va transaction van placeholder cho den phase payment.

**Acceptance criteria:**
- [x] Query nam o server module.
- [x] Component UI chi nhan `AdminDashboardPayload`.
- [x] Khong `select("*")` trong query quan trong.
- [x] Draft/admin-only data chi doc qua guard server.

**Verification:**
- [x] `npx.cmd tsc --noEmit`
- [x] `npm run build`
- [x] Manual check local Supabase seeded data.

**Dependencies:** A2.3

**Files likely touched:**
- `src/lib/admin/dashboard.ts`
- `src/app/admin/page.tsx`
- `src/types/database.ts` only if schema changed

**Estimated scope:** M

### Task A3.2: Add dashboard loading and error boundaries

**Description:** Them loading/error UI cho `/admin` dashboard.

**Acceptance criteria:**
- [x] Loading state dung skeleton shape.
- [x] Error state khong leak database error.
- [x] Empty states ro cho chart/list rong.

**Verification:**
- [x] Manual route tests.
- [x] `npm run build`

**Dependencies:** A3.1

**Files likely touched:**
- `src/app/admin/loading.tsx`
- `src/app/admin/error.tsx`
- `src/components/admin/data-panel.tsx`

**Estimated scope:** S

## Checkpoint: Real dashboard ready

- [x] Dashboard doc du lieu that cho nhung bang hien co.
- [x] Revenue/giao dich hien placeholder/deferred ro.
- [x] Guest/non-admin van bi chan.
- [x] Build/lint/typecheck pass.

## Phase A4: Editorial Mutations

### Task A4.1: Define story-centered editorial contracts

**Description:** Thiet ke contract cho create/update/publish/archive story va chapter theo IA moi: chuong nam trong trang chi tiet truyen, khong co module admin chuong rieng.

**Acceptance criteria:**
- [x] Input/output schemas ro cho story metadata, story production type, author search name, chapter metadata/content.
- [x] Error shape nhat quan.
- [x] `AdminMutationResult<T>` dung chung cho story/chapter actions.
- [x] Slug/status/published_at validation ro.
- [x] Story production type chi nhan `self_produced` hoac `licensed_translation`.
- [x] Author payload khong co bio/avatar.
- [x] Destructive actions co confirmation contract ro.
- [x] Khong nhan actor/user_id tu browser.

**Verification:**
- [x] Unit tests validators.
- [x] Typecheck.

**Dependencies:** A3.1

**Files likely touched:**
- `src/lib/admin/validators.ts`
- `src/app/admin/truyen/actions.ts`
- `tests/` validator/action tests if available

**Estimated scope:** M

### Task A4.2: Implement story list and detail shell

**Description:** Tao route danh sach truyen admin va trang chi tiet truyen co tabs tong quan/chuong/xuat ban/lich su. Chua can publish mutation trong cung task neu scope lon.

**Acceptance criteria:**
- [x] Admin xem duoc draft/published/archived stories.
- [x] Search/filter basic theo title/status/author/production type/uploader.
- [x] Edit shell co form fields chinh va validation messages.
- [x] Story detail co khu vuc danh sach chuong nhung chua can edit content day du.
- [x] Sidebar khong co item `Chuong truyen` rieng.

**Verification:**
- [x] Playwright admin story list.
- [x] `npm run build`

**Dependencies:** A4.1

**Files likely touched:**
- `src/app/admin/truyen/page.tsx`
- `src/app/admin/truyen/[id]/page.tsx`
- `src/app/admin/truyen/[id]/chuong/page.tsx`
- `src/components/admin/stories/`
- `styles.css`

**Estimated scope:** M

### Task A4.3: Implement story publish/archive action

**Description:** Them server-only publish/archive story action voi admin client, validation va revalidation.

**Acceptance criteria:**
- [x] Publish story set status/published_at dung invariant.
- [x] Archive story an khoi public pages.
- [x] Archive story can confirmation tu UI.
- [x] Publish/archive ghi audit event neu audit schema co san.
- [x] Public route revalidated.
- [x] Browser client khong co write grant vao content tables.

**Verification:**
- [x] SQL RLS/grants test.
- [x] Playwright: publish makes story visible, archive hides it.
- [x] Supabase advisors neu schema/policy thay doi.

**Completed:** 2026-06-29. Audit event write is deferred because no audit schema exists yet; action shape leaves the server-only boundary ready for that table.

**Dependencies:** A4.2

**Files likely touched:**
- `src/app/admin/truyen/actions.ts`
- `src/lib/admin/validators.ts`
- `supabase/tests/catalog.sql`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A4.4: Implement nested chapter edit and publish action

**Description:** Them admin chapter metadata/body edit va publish action server-only duoi route `truyen/[id]/chuong`.

**Acceptance criteria:**
- [x] Admin mo va edit chapter tu trang chi tiet truyen.
- [x] Admin co the save draft chapter metadata/content.
- [x] Publish chapter validate story, content row, access_level, published_at.
- [x] Publish chapter ghi audit event neu audit schema co san.
- [x] Public Reader chi hien content free published theo RLS hien co.
- [x] VIP body khong leak ra public.

**Verification:**
- [x] SQL RLS test for no browser writes.
- [x] Playwright: publish free chapter appears in public reader.
- [x] `npm run build`

**Completed:** 2026-06-29. Audit event write is deferred because no audit schema exists yet; chapter save/publish now runs through service-role RPC transactions so saving a published chapter does not demote it.

**Dependencies:** A4.3

**Files likely touched:**
- `src/app/admin/truyen/[id]/chuong/[chapterId]/page.tsx`
- `src/app/admin/truyen/actions.ts`
- `src/components/admin/stories/story-chapter-editor.tsx`
- `supabase/tests/catalog.sql`

**Estimated scope:** M

## Checkpoint: Editorial core

- [x] Story/chapter publish flows work end-to-end.
- [ ] No browser write grants to content tables.
- [ ] Public cache/routes revalidate.
- [ ] SQL RLS tests, typecheck, lint, build, Playwright pass.

## Phase A5: Moderation And Storage

### Task A5.1: Comment moderation read-only queue

**Description:** Tao admin comments queue de xem visible/hidden/deleted comments voi context story/user.

**Acceptance criteria:**
- [x] Admin xem comments voi filters status/story.
- [x] Public user permissions khong thay doi.
- [x] No raw database errors in UI.

**Verification:**
- [x] SQL service-role read test.
- [x] Playwright admin comments page.
- [x] `npx.cmd tsc --noEmit`
- [x] `npm run lint`
- [x] `npm run build`

**Dependencies:** A3.1

**Files likely touched:**
- `src/app/admin/binh-luan/page.tsx`
- `src/components/admin/comments/`
- `src/lib/admin/comments.ts`
- `supabase/migrations/*_grant_admin_comment_moderation_read.sql`
- `supabase/tests/catalog.sql`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A5.2: Comment hide/restore actions

**Description:** Them moderation mutations cho hidden/visible status theo server-only admin path.

**Acceptance criteria:**
- [x] Admin hide comment.
- [x] Hidden comment khong hien public.
- [x] Restore comment dua ve visible neu story published.
- [x] Hide/restore ghi audit event neu audit schema co san.
- [x] Owner public action khong the tu unhide.

**Verification:**
- [x] SQL RLS test.
- [x] Playwright: hide removes comment from public story.
- [x] `npx.cmd tsc --noEmit`
- [x] `npm run lint`
- [x] `npm run build`

**Dependencies:** A5.1

**Files likely touched:**
- `src/app/admin/binh-luan/actions.ts`
- `src/components/admin/comments/admin-comment-queue.tsx`
- `supabase/migrations/*_grant_admin_comment_moderation_mutations.sql`
- `supabase/tests/catalog.sql`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A5.3: Story cover storage policy and upload UI

**Description:** Implement bucket/policy cho story covers va admin upload UI.

**Acceptance criteria:**
- [x] Public read story covers.
- [x] Upload/update/delete cover chi server/admin.
- [x] File type/size/path validated.
- [x] Story cover path update goes through server-only action.
- [x] Cover update/delete ghi audit event neu audit schema co san.

Note: audit event write remains deferred because no audit schema/table exists yet.

**Verification:**
- [x] Supabase storage policy tests/manual matrix.
- [x] Upload happy path local.
- [x] `npm run build`

**Dependencies:** A4.2

**Files likely touched:**
- `supabase/migrations/20260630032137_add_story_cover_storage_policy.sql`
- `src/app/admin/truyen/actions.ts`
- `src/components/admin/stories/admin-story-detail.tsx`
- `src/lib/admin/validators.ts`
- `supabase/tests/catalog.sql`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

## Checkpoint: Moderation/storage

- [x] Comment moderation works.
- [x] Story cover upload follows admin-only write policy.
- [x] Advisors clean or documented.

## Phase A6: Revenue Module Shells

### Task A6.1: Add deferred pages for revenue modules

**Description:** Tao read-only/deferred states cho cac module doanh thu chua co backend that: giao dich, goi nap, goi VIP, rut tien, thong ke doanh thu.

**Acceptance criteria:**
- [x] Sidebar links khong dead-end.
- [x] Moi deferred page noi ro tinh nang dang chuan bi.
- [x] Khong fake mutation cho payment/revenue.
- [x] `Goi nap` va `Goi VIP` la 2 route/module rieng.
- [x] `Thong ke doanh thu` co placeholder cho breakdown theo truyen va username nguoi dang.

**Verification:**
- [x] Playwright route smoke test.
- [x] `npm run build`

**Dependencies:** A1.2

**Files likely touched:**
- `src/app/admin/giao-dich/page.tsx`
- `src/app/admin/goi-nap/page.tsx`
- `src/app/admin/goi-vip/page.tsx`
- `src/app/admin/rut-tien/page.tsx`
- `src/app/admin/thong-ke-doanh-thu/page.tsx`
- `src/components/admin/revenue/deferred-revenue-page.tsx`
- `src/components/admin/admin-nav.ts`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A6.2: Add deferred pages for role and notification modules

**Description:** Tao read-only/deferred states cho cac module chua co backend day du: vai tro, thong bao.

**Acceptance criteria:**
- [x] Sidebar links khong dead-end.
- [x] Moi deferred page noi ro tinh nang dang chuan bi.
- [x] Khong fake mutation cho role/notification.

**Verification:**
- [x] Playwright route smoke test.
- [x] `npm run build`

**Dependencies:** A1.2

**Files likely touched:**
- `src/app/admin/vai-tro/page.tsx`
- `src/app/admin/thong-bao/page.tsx`
- `src/components/admin/deferred-admin-page.tsx`
- `src/components/admin/admin-nav.ts`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** S

## Phase A7: Marketing Module Shells

### Task A7.1: Add marketing overview and campaign shells

**Description:** Tao nhom Marketing voi overview, su kien/campaign va deferred state de sau nay gan event marketing.

**Acceptance criteria:**
- [x] Sidebar co nhom `MARKETING`.
- [x] Marketing overview hien campaign dang chay/upcoming banners/upcoming events o dang placeholder co cau truc.
- [x] Su kien co list shell voi status draft/scheduled/live/ended.
- [x] Khong co mutation that neu chua co campaign schema.

**Verification:**
- [x] Playwright route smoke test.
- [x] `npm run build`

**Dependencies:** A1.2

**Files likely touched:**
- `src/app/admin/marketing/page.tsx`
- `src/app/admin/marketing/su-kien/page.tsx`
- `src/components/admin/marketing/`
- `src/components/admin/admin-nav.ts`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A7.2: Add banner placement shell

**Description:** Tao route shell cho banner placement de chuan bi quan ly banner theo vi tri hien thi.

**Acceptance criteria:**
- [x] Banner route co placement list placeholder: trang chu, the loai, chi tiet truyen, reader.
- [x] Moi placement hien status placeholder va kich thuoc/vi tri du kien.
- [x] Khong co upload/mutation that neu chua co storage/campaign schema.

**Verification:**
- [x] Playwright route smoke test.
- [x] `npm run build`

**Dependencies:** A7.1

**Files likely touched:**
- `src/app/admin/marketing/banner/page.tsx`
- `src/components/admin/marketing/banner-placement-list.tsx`
- `src/components/admin/admin-nav.ts`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** S

### Task A7.3: Add featured stories shell

**Description:** Tao route shell cho truyen de xuat/editorial picks dung trong campaign.

**Acceptance criteria:**
- [x] Truyen de xuat route co table/list placeholder cho editorial picks.
- [x] Placeholder noi ro dependency campaign schema va story ranking/boost policy.
- [x] Khong fake boost mutation.

**Verification:**
- [x] Playwright route smoke test.
- [x] `npm run build`

**Dependencies:** A7.1

**Files likely touched:**
- `src/app/admin/marketing/truyen-de-xuat/page.tsx`
- `src/components/admin/marketing/featured-stories-list.tsx`

**Estimated scope:** S

### Task A7.4: Add promo, campaign notification, and marketing analytics shells

**Description:** Tao cac route deferred cho ma khuyen mai, thong bao chien dich va thong ke Marketing.

**Acceptance criteria:**
- [x] Ma khuyen mai route noi ro dependency payment/VIP.
- [x] Thong bao chien dich route noi ro dependency notification system.
- [x] Thong ke Marketing co placeholder cho clicks, reads, conversion va attribution.
- [x] Khong fake coupon, push/email, hoac analytics mutation.

**Verification:**
- [x] Playwright route smoke test.
- [x] `npm run build`

**Dependencies:** A7.1

**Files likely touched:**
- `src/app/admin/marketing/ma-khuyen-mai/page.tsx`
- `src/app/admin/marketing/thong-bao-chien-dich/page.tsx`
- `src/app/admin/marketing/thong-ke/page.tsx`
- `src/components/admin/marketing/marketing-deferred-page.tsx`
- `src/components/admin/admin-nav.ts`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

## Final checkpoint

- [x] Admin dashboard selected visual implemented without overlap.
- [x] All visible copy is Vietnamese with accents; technical status/code tokens remain where the contract requires them.
- [x] Guest/non-admin blocked.
- [x] Server-only admin client stays server-only.
- [x] Story/chapter publish actions verified.
- [x] Chapter management lives under story detail, not a separate top-level admin module.
- [x] Comment moderation verified.
- [x] Storage policy verified if upload shipped.
- [x] Revenue shell includes `Goi nap`, `Goi VIP`, and breakdown placeholders by story/uploader.
- [x] Marketing shell includes campaigns/events, banner placements, featured stories, promo placeholder, notification placeholder, analytics placeholder.
- [x] `npm run db:test`
- [x] `npx.cmd tsc --noEmit`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npx.cmd playwright test`

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Admin authorization model unclear | High | Use server-only email allowlist for MVP, move role model to explicit later task |
| Secret client leaks to browser | High | Keep admin client in server-only modules, verify build and imports |
| Dashboard tries to show revenue before ledger exists | Medium | Mark revenue/transactions as placeholder/deferred until payment phase |
| Revenue package types get conflated | Medium | Keep `Goi nap` and `Goi VIP` as separate modules/contracts until detailed brief |
| Marketing scope grows too large | Medium | Ship route shells first, then implement campaign/event schema in a later phase |
| Large UI task becomes tangled | Medium | Build shell, mock dashboard, real data, mutations as separate phases |
| SVG visual has pixel/text issues | Low | Treat visual as mood/reference, implement with responsive CSS grid and real text |

## Open questions before implementation

- Admin MVP allowlist should use which env name and which admin email(s)?
- Should `/admin` redirect non-admins to `/dang-nhap`, `/`, or return 404?
- Should admin dashboard ship first with mock revenue values or show revenue as `Chưa có dữ liệu`?
- Should story/chapter edit pages use plain textarea first for chapter content?
- Should story production type be stored on `stories` as `self_produced`/`licensed_translation`, or derived from another publishing/licensing table later?
- Should author search support aliases immediately, or only normalized exact author names for MVP?
- Which Marketing piece should come first after shell: event campaign, banner placements, or featured stories?
