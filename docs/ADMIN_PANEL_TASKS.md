# Admin Panel Task Breakdown

Source of truth:

- `docs/ADMIN_PANEL_SPEC.md`
- Selected visual: `docs/admin-visuals/admin-visual-01-ruby-dashboard-v2.png`
- Backend constraints: `docs/BACKEND_SPEC.md`, Phase B4

Trang thai: Chua code admin panel.

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
- [ ] Guest bi redirect hoac notFound khi vao `/admin`.
- [ ] Non-admin authenticated user bi chan.
- [ ] Admin allowlist chi doc o server.
- [ ] Helper khong import vao Client Component.

**Verification:**
- [ ] Unit/integration test helper neu co test harness phu hop.
- [ ] Playwright guest blocked.
- [ ] `npx.cmd tsc --noEmit`
- [ ] `npm run build`

**Dependencies:** A0.1

**Files likely touched:**
- `src/lib/admin/auth.ts`
- `src/app/admin/layout.tsx`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A1.2: Build static admin shell

**Description:** Tao `/admin` route voi shell tinh: sidebar, topbar, content container va footer status. Chua ket noi dashboard data that.

**Acceptance criteria:**
- [ ] Sidebar dung dung nhom va label tieng Viet.
- [ ] Topbar co title, search placeholder, profile affordance.
- [ ] Link `Truy cập trang web` ve `/`.
- [ ] Layout khong bi overflow o 320/768/1024/1440.

**Verification:**
- [ ] Playwright screenshot desktop/mobile.
- [ ] Keyboard tab qua nav/topbar duoc.
- [ ] `npm run lint`
- [ ] `npm run build`

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
- [ ] `AdminDashboardPayload` duoc type ro.
- [ ] Mock payload co 5 KPI va 6 panels.
- [ ] Revenue/giao dich co note deferred neu chua co data that.
- [ ] Revenue breakdown va Marketing summary khong render trong dashboard MVP; chung thuoc module rieng.

**Verification:**
- [ ] `npx.cmd tsc --noEmit`
- [ ] Dashboard render duoc voi payload mock.

**Dependencies:** A1.2

**Files likely touched:**
- `src/lib/admin/dashboard.ts`
- `src/components/admin/dashboard/admin-dashboard.tsx`
- `src/app/admin/page.tsx`

**Estimated scope:** S

## Checkpoint: Admin foundation

- [ ] Guest/non-admin access bi chan.
- [ ] Admin shell render voi mock payload.
- [ ] `npx.cmd tsc --noEmit`, `npm run lint`, `npm run build` pass.
- [ ] Visual QA 320/768/1024/1440 pass.

## Phase A2: Dashboard UI Components

### Task A2.1: Implement metric cards

**Description:** Render 5 KPI cards theo token Ruby Noir, co icon slot, value, delta text va accessible labels.

**Acceptance criteria:**
- [ ] Tong truyen, Tong nguoi dung, Luot doc, Doanh thu, Giao dich hien dung.
- [ ] Delta co text tang/giam, khong chi dua vao mau.
- [ ] Value khong wrap/leak khoi card desktop.

**Verification:**
- [ ] Component renders with mock payload.
- [ ] Responsive QA 320/768/1024/1440.
- [ ] `npm run lint`

**Dependencies:** A1.3

**Files likely touched:**
- `src/components/admin/metric-card.tsx`
- `src/components/admin/dashboard/admin-dashboard.tsx`
- `styles.css`

**Estimated scope:** S

### Task A2.2: Implement dashboard charts without new dependency

**Description:** Implement reads line chart, genre donut chart va revenue bar chart bang SVG/CSS noi bo.

**Acceptance criteria:**
- [ ] Charts render tu payload typed.
- [ ] Co empty state khi arrays rong.
- [ ] Co text summary cho screen reader.
- [ ] Khong them chart dependency.

**Verification:**
- [ ] `npx.cmd tsc --noEmit`
- [ ] Browser screenshot desktop/mobile.
- [ ] Manual inspect reduced data/empty state.

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
- [ ] Top stories co rank, cover, title, genre, read count.
- [ ] Recent stories dung `<table>` desktop va stacked rows mobile.
- [ ] Activity feed co kind label va target ro rang.
- [ ] Khong co text overlap trong row dai.

**Verification:**
- [ ] Playwright screenshot desktop/mobile.
- [ ] Keyboard/focus review for links.
- [ ] `npm run lint`

**Dependencies:** A2.1

**Files likely touched:**
- `src/components/admin/dashboard/top-stories-list.tsx`
- `src/components/admin/dashboard/recent-stories-table.tsx`
- `src/components/admin/dashboard/user-activity-feed.tsx`
- `styles.css`

**Estimated scope:** M

## Checkpoint: Static dashboard complete

- [ ] Dashboard visually gan selected V2 nhung khong bi loi text/pixel.
- [ ] Tat ca visible copy tieng Viet co dau.
- [ ] Loading/empty/error states co skeleton hoac message ro.
- [ ] `npx.cmd tsc --noEmit`, `npm run lint`, `npm run build` pass.

## Phase A3: Real Dashboard Data

### Task A3.1: Add server dashboard query

**Description:** Ket noi dashboard voi du lieu that co san: stories, profiles, story_genres, comments/bookmarks neu can. Revenue va transaction van placeholder cho den phase payment.

**Acceptance criteria:**
- [ ] Query nam o server module.
- [ ] Component UI chi nhan `AdminDashboardPayload`.
- [ ] Khong `select("*")` trong query quan trong.
- [ ] Draft/admin-only data chi doc qua guard server.

**Verification:**
- [ ] `npx.cmd tsc --noEmit`
- [ ] `npm run build`
- [ ] Manual check local Supabase seeded data.

**Dependencies:** A2.3

**Files likely touched:**
- `src/lib/admin/dashboard.ts`
- `src/app/admin/page.tsx`
- `src/types/database.ts` only if schema changed

**Estimated scope:** M

### Task A3.2: Add dashboard loading and error boundaries

**Description:** Them loading/error UI cho `/admin` dashboard.

**Acceptance criteria:**
- [ ] Loading state dung skeleton shape.
- [ ] Error state khong leak database error.
- [ ] Empty states ro cho chart/list rong.

**Verification:**
- [ ] Manual route tests.
- [ ] `npm run build`

**Dependencies:** A3.1

**Files likely touched:**
- `src/app/admin/loading.tsx`
- `src/app/admin/error.tsx`
- `src/components/admin/data-panel.tsx`

**Estimated scope:** S

## Checkpoint: Real dashboard ready

- [ ] Dashboard doc du lieu that cho nhung bang hien co.
- [ ] Revenue/giao dich hien placeholder/deferred ro.
- [ ] Guest/non-admin van bi chan.
- [ ] Build/lint/typecheck pass.

## Phase A4: Editorial Mutations

### Task A4.1: Define story-centered editorial contracts

**Description:** Thiet ke contract cho create/update/publish/archive story va chapter theo IA moi: chuong nam trong trang chi tiet truyen, khong co module admin chuong rieng.

**Acceptance criteria:**
- [ ] Input/output schemas ro cho story metadata, story production type, author search name, chapter metadata/content.
- [ ] Error shape nhat quan.
- [ ] `AdminMutationResult<T>` dung chung cho story/chapter actions.
- [ ] Slug/status/published_at validation ro.
- [ ] Story production type chi nhan `self_produced` hoac `licensed_translation`.
- [ ] Author payload khong co bio/avatar.
- [ ] Destructive actions co confirmation contract ro.
- [ ] Khong nhan actor/user_id tu browser.

**Verification:**
- [ ] Unit tests validators.
- [ ] Typecheck.

**Dependencies:** A3.1

**Files likely touched:**
- `src/lib/admin/validators.ts`
- `src/app/admin/truyen/actions.ts`
- `tests/` validator/action tests if available

**Estimated scope:** M

### Task A4.2: Implement story list and detail shell

**Description:** Tao route danh sach truyen admin va trang chi tiet truyen co tabs tong quan/chuong/xuat ban/lich su. Chua can publish mutation trong cung task neu scope lon.

**Acceptance criteria:**
- [ ] Admin xem duoc draft/published/archived stories.
- [ ] Search/filter basic theo title/status/author/production type/uploader.
- [ ] Edit shell co form fields chinh va validation messages.
- [ ] Story detail co khu vuc danh sach chuong nhung chua can edit content day du.
- [ ] Sidebar khong co item `Chuong truyen` rieng.

**Verification:**
- [ ] Playwright admin story list.
- [ ] `npm run build`

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
- [ ] Publish story set status/published_at dung invariant.
- [ ] Archive story an khoi public pages.
- [ ] Archive story can confirmation tu UI.
- [ ] Publish/archive ghi audit event neu audit schema co san.
- [ ] Public route revalidated.
- [ ] Browser client khong co write grant vao content tables.

**Verification:**
- [ ] SQL RLS/grants test.
- [ ] Playwright: publish makes story visible, archive hides it.
- [ ] Supabase advisors neu schema/policy thay doi.

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
- [ ] Admin mo va edit chapter tu trang chi tiet truyen.
- [ ] Admin co the save draft chapter metadata/content.
- [ ] Publish chapter validate story, content row, access_level, published_at.
- [ ] Publish chapter ghi audit event neu audit schema co san.
- [ ] Public Reader chi hien content free published theo RLS hien co.
- [ ] VIP body khong leak ra public.

**Verification:**
- [ ] SQL RLS test for no browser writes.
- [ ] Playwright: publish free chapter appears in public reader.
- [ ] `npm run build`

**Dependencies:** A4.3

**Files likely touched:**
- `src/app/admin/truyen/[id]/chuong/[chapterId]/page.tsx`
- `src/app/admin/truyen/actions.ts`
- `src/components/admin/stories/story-chapter-editor.tsx`
- `supabase/tests/catalog.sql`

**Estimated scope:** M

## Checkpoint: Editorial core

- [ ] Story/chapter publish flows work end-to-end.
- [ ] No browser write grants to content tables.
- [ ] Public cache/routes revalidate.
- [ ] SQL RLS tests, typecheck, lint, build, Playwright pass.

## Phase A5: Moderation And Storage

### Task A5.1: Comment moderation read-only queue

**Description:** Tao admin comments queue de xem visible/hidden/deleted comments voi context story/user.

**Acceptance criteria:**
- [ ] Admin xem comments voi filters status/story.
- [ ] Public user permissions khong thay doi.
- [ ] No raw database errors in UI.

**Verification:**
- [ ] Playwright admin comments page.
- [ ] `npm run build`

**Dependencies:** A3.1

**Files likely touched:**
- `src/app/admin/binh-luan/page.tsx`
- `src/components/admin/comments/`
- `src/lib/admin/comments.ts`

**Estimated scope:** M

### Task A5.2: Comment hide/restore actions

**Description:** Them moderation mutations cho hidden/visible status theo server-only admin path.

**Acceptance criteria:**
- [ ] Admin hide comment.
- [ ] Hidden comment khong hien public.
- [ ] Restore comment dua ve visible neu story published.
- [ ] Hide/restore ghi audit event neu audit schema co san.
- [ ] Owner public action khong the tu unhide.

**Verification:**
- [ ] SQL RLS test.
- [ ] Playwright: hide removes comment from public story.

**Dependencies:** A5.1

**Files likely touched:**
- `src/app/admin/binh-luan/actions.ts`
- `supabase/tests/catalog.sql`
- `tests/app-router-migration.spec.ts`

**Estimated scope:** M

### Task A5.3: Story cover storage policy and upload UI

**Description:** Implement bucket/policy cho story covers va admin upload UI.

**Acceptance criteria:**
- [ ] Public read story covers.
- [ ] Upload/update/delete cover chi server/admin.
- [ ] File type/size/path validated.
- [ ] Story cover path update goes through server-only action.
- [ ] Cover update/delete ghi audit event neu audit schema co san.

**Verification:**
- [ ] Supabase storage policy tests/manual matrix.
- [ ] Upload happy path local.
- [ ] `npm run build`

**Dependencies:** A4.2

**Files likely touched:**
- `supabase/migrations/`
- `src/app/admin/truyen/actions.ts`
- `src/components/admin/storage/`
- `supabase/tests/catalog.sql`

**Estimated scope:** M

## Checkpoint: Moderation/storage

- [ ] Comment moderation works.
- [ ] Story cover upload follows admin-only write policy.
- [ ] Advisors clean or documented.

## Phase A6: Revenue Module Shells

### Task A6.1: Add deferred pages for revenue modules

**Description:** Tao read-only/deferred states cho cac module doanh thu chua co backend that: giao dich, goi nap, goi VIP, rut tien, thong ke doanh thu.

**Acceptance criteria:**
- [ ] Sidebar links khong dead-end.
- [ ] Moi deferred page noi ro tinh nang dang chuan bi.
- [ ] Khong fake mutation cho payment/revenue.
- [ ] `Goi nap` va `Goi VIP` la 2 route/module rieng.
- [ ] `Thong ke doanh thu` co placeholder cho breakdown theo truyen va username nguoi dang.

**Verification:**
- [ ] Playwright route smoke test.
- [ ] `npm run build`

**Dependencies:** A1.2

**Files likely touched:**
- `src/app/admin/giao-dich/page.tsx`
- `src/app/admin/goi-nap/page.tsx`
- `src/app/admin/goi-vip/page.tsx`
- `src/app/admin/rut-tien/page.tsx`
- `src/app/admin/thong-ke-doanh-thu/page.tsx`
- `src/components/admin/revenue/`

**Estimated scope:** M

### Task A6.2: Add deferred pages for role and notification modules

**Description:** Tao read-only/deferred states cho cac module chua co backend day du: vai tro, thong bao.

**Acceptance criteria:**
- [ ] Sidebar links khong dead-end.
- [ ] Moi deferred page noi ro tinh nang dang chuan bi.
- [ ] Khong fake mutation cho role/notification.

**Verification:**
- [ ] Playwright route smoke test.
- [ ] `npm run build`

**Dependencies:** A1.2

**Files likely touched:**
- `src/app/admin/vai-tro/page.tsx`
- `src/app/admin/thong-bao/page.tsx`

**Estimated scope:** S

## Phase A7: Marketing Module Shells

### Task A7.1: Add marketing overview and campaign shells

**Description:** Tao nhom Marketing voi overview, su kien/campaign va deferred state de sau nay gan event marketing.

**Acceptance criteria:**
- [ ] Sidebar co nhom `MARKETING`.
- [ ] Marketing overview hien campaign dang chay/upcoming banners/upcoming events o dang placeholder co cau truc.
- [ ] Su kien co list shell voi status draft/scheduled/live/ended.
- [ ] Khong co mutation that neu chua co campaign schema.

**Verification:**
- [ ] Playwright route smoke test.
- [ ] `npm run build`

**Dependencies:** A1.2

**Files likely touched:**
- `src/app/admin/marketing/page.tsx`
- `src/app/admin/marketing/su-kien/page.tsx`
- `src/components/admin/marketing/`

**Estimated scope:** M

### Task A7.2: Add banner placement shell

**Description:** Tao route shell cho banner placement de chuan bi quan ly banner theo vi tri hien thi.

**Acceptance criteria:**
- [ ] Banner route co placement list placeholder: trang chu, the loai, chi tiet truyen, reader.
- [ ] Moi placement hien status placeholder va kich thuoc/vi tri du kien.
- [ ] Khong co upload/mutation that neu chua co storage/campaign schema.

**Verification:**
- [ ] Playwright route smoke test.
- [ ] `npm run build`

**Dependencies:** A7.1

**Files likely touched:**
- `src/app/admin/marketing/banner/page.tsx`
- `src/components/admin/marketing/banner-placement-list.tsx`

**Estimated scope:** S

### Task A7.3: Add featured stories shell

**Description:** Tao route shell cho truyen de xuat/editorial picks dung trong campaign.

**Acceptance criteria:**
- [ ] Truyen de xuat route co table/list placeholder cho editorial picks.
- [ ] Placeholder noi ro dependency campaign schema va story ranking/boost policy.
- [ ] Khong fake boost mutation.

**Verification:**
- [ ] Playwright route smoke test.
- [ ] `npm run build`

**Dependencies:** A7.1

**Files likely touched:**
- `src/app/admin/marketing/truyen-de-xuat/page.tsx`
- `src/components/admin/marketing/featured-stories-list.tsx`

**Estimated scope:** S

### Task A7.4: Add promo, campaign notification, and marketing analytics shells

**Description:** Tao cac route deferred cho ma khuyen mai, thong bao chien dich va thong ke Marketing.

**Acceptance criteria:**
- [ ] Ma khuyen mai route noi ro dependency payment/VIP.
- [ ] Thong bao chien dich route noi ro dependency notification system.
- [ ] Thong ke Marketing co placeholder cho clicks, reads, conversion va attribution.
- [ ] Khong fake coupon, push/email, hoac analytics mutation.

**Verification:**
- [ ] Playwright route smoke test.
- [ ] `npm run build`

**Dependencies:** A7.1

**Files likely touched:**
- `src/app/admin/marketing/ma-khuyen-mai/page.tsx`
- `src/app/admin/marketing/thong-bao-chien-dich/page.tsx`
- `src/app/admin/marketing/thong-ke/page.tsx`
- `src/components/admin/marketing/marketing-deferred-panel.tsx`

**Estimated scope:** M

## Final checkpoint

- [ ] Admin dashboard selected visual implemented without overlap.
- [ ] All visible copy is Vietnamese with accents.
- [ ] Guest/non-admin blocked.
- [ ] Server-only admin client stays server-only.
- [ ] Story/chapter publish actions verified.
- [ ] Chapter management lives under story detail, not a separate top-level admin module.
- [ ] Comment moderation verified.
- [ ] Storage policy verified if upload shipped.
- [ ] Revenue shell includes `Goi nap`, `Goi VIP`, and breakdown placeholders by story/uploader.
- [ ] Marketing shell includes campaigns/events, banner placements, featured stories, promo placeholder, notification placeholder, analytics placeholder.
- [ ] `npm run db:test`
- [ ] `npx.cmd tsc --noEmit`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npx.cmd playwright test`

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
