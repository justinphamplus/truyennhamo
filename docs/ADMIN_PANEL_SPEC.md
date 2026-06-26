# Admin Panel Spec

Cap nhat: 2026-06-26

## 1. Muc tieu

Xay dung admin panel cho `truyennhamo` theo visual da chon:

- Visual reference: `docs/admin-visuals/admin-visual-01-ruby-dashboard-v2.png`
- Design direction: Ruby Noir dashboard, lay cau truc tu `visual/admin-dashboard.png`
- Pham vi tai lieu nay: dac ta giao dien, contract du lieu, bao mat va thu tu trien khai
- Chua code trong buoc nay

Admin panel khong duoc copy pixel tu SVG hien tai. SVG chi la reference ve bo cuc va vibe. Khi trien khai, UI phai dung component responsive that, text tieng Viet co dau, khong de chu de len nhau, khong hard-code kich thuoc lam vo layout.

## 2. Nguyen tac san pham

Admin la cong cu van hanh noi bo, khong phai landing page.

- Uu tien scan nhanh, thao tac lap lai, trang thai ro rang.
- Dashboard dau tien phai cho biet tinh hinh he thong nhung khong thuc hien mutation nguy hiem.
- Mutation bien tap noi dung nam trong cac module con: Truyen, Binh luan, Marketing.
- Chuong truyen khong la module doc lap. Moi thao tac chuong nam trong trang chi tiet truyen de quan ly tap trung.
- Doanh thu hien o dang doc/thong ke placeholder cho den khi co payment/ledger that, nhung IA phai co san Goi nap va Goi VIP.
- Moi action nhay cam can co validation, authorization, audit va revalidation ro rang.

## 3. Pham vi MVP admin

### Co trong MVP admin

- `/admin`: dashboard tong quan.
- Admin shell: sidebar, topbar, content frame, footer status.
- Dashboard cards:
  - Tong truyen
  - Tong nguoi dung
  - Luot doc
  - Doanh thu
  - Giao dich
- Dashboard panels:
  - Luot doc trong 7 ngay qua
  - Top truyen duoc doc nhieu
  - Ty le truyen theo the loai
  - Truyen moi cap nhat
  - Hoat dong nguoi dung
  - Thong ke doanh thu
- Module shell cho:
  - Truyen
  - The loai
  - Tac gia
  - Tags
  - Binh luan
  - Bao cao
  - Nguoi dung
  - Vai tro va phan quyen
  - Giao dich
  - Goi nap
  - Goi VIP
  - Rut tien
  - Thong ke doanh thu
  - Marketing
  - Cai dat
  - Thong bao
  - Nhat ky hoat dong

### Defer co chu dich

- Payment/VIP entitlement that.
- Gold/Xu ledger va giao dich that.
- Rut tien that.
- Notification system that.
- Role management UI day du.
- Realtime dashboard.
- WYSIWYG editor nang cao.
- Ma khuyen mai/voucher that.
- Event marketing co reward/entitlement that.

Nhung module defer van co the xuat hien trong sidebar de giu information architecture, nhung route chi nen co empty/deferred state ro rang.

## 3.1. Quyet dinh san pham cap nhat

### Truyen va chuong

- `Truyen` la module trung tam cho metadata, anh bia, the loai, tags, tac gia, danh sach chuong va trang thai xuat ban.
- Trang chi tiet truyen can co tab hoac segment cho: `Tong quan`, `Chuong`, `Cai dat xuat ban`, `Lich su`.
- Chua tao sidebar item rieng cho `Chuong truyen`.
- Route chuong nam duoi route truyen, vi du `/admin/truyen/[id]/chuong/[chapterId]`.

### Loai truyen va tac gia

- Truyen co 2 loai van hanh:
  - `Tu san xuat`: noi dung do team tu san xuat/dang truc tiep.
  - `Truyen dich da mua ban quyen`: noi dung dich co ban quyen da mua.
- De xuat enum noi bo: `self_produced` va `licensed_translation`.
- Tac gia chi can du lieu gon de search/filter truyen theo ten tac gia.
- Khong can `bio`, `avatar` cho tac gia trong MVP admin.
- Truong tac gia toi thieu: `name`, `slug` hoac normalized search key, optional aliases neu can import/search tot hon.

### Doanh thu

- `Quan ly doanh thu` gom: `Giao dich`, `Goi nap`, `Goi VIP`, `Rut tien`, `Thong ke doanh thu`.
- `Goi nap` va `Goi VIP` la 2 nhom rieng vi co logic san pham khac nhau.
- `Thong ke doanh thu` can co tong quan va breakdown theo:
  - Truyen.
  - Username nguoi dang truyen.
- Khi chua co payment/ledger that, cac trang nay chi hien placeholder/deferred state va khong fake mutation.

### Marketing

Marketing la nhom tinh nang rieng de chuan bi cho event sau nay. MVP co the bat dau bang shell/doc state, nhung IA nen on dinh som.

De xuat module Marketing gom:

- `Tong quan Marketing`: nhin nhanh campaign dang chay, lich su kien, banner active, chi so click/read/conversion neu co.
- `Su kien`: tao va quan ly event theo thoi gian, trang thai draft/scheduled/live/ended, landing target va noi dung mo ta.
- `Banner & vi tri hien thi`: quan ly banner theo placement nhu trang chu, trang the loai, trang chi tiet truyen, reader.
- `Truyen de xuat`: editorial picks, boost thu cong, danh sach truyen can day trong campaign.
- `Ma khuyen mai`: placeholder cho voucher/coupon sau khi co payment/VIP.
- `Thong bao chien dich`: placeholder cho in-app/push/email notification sau nay.
- `Thong ke Marketing`: attribution theo campaign/source, clicks, reads tu campaign, follow/VIP/purchase conversion khi co tracking.

## 4. Visible copy tieng Viet

Tat ca UI copy trong admin phai dung tieng Viet co dau. Khong dung ban khong dau tu SVG.

### Copy chuan de dung khi code

Brand va topbar:

- Brand: `Truyện Nhà Mò`
- Page title: `Bảng điều khiển`
- Search placeholder: `Tìm kiếm truyện, tác giả, người dùng...`
- Search shortcut: `Ctrl K`
- Profile role: `Quản trị viên`
- Visit public site: `Truy cập trang web`
- Footer: `© 2026 Truyện Nhà Mò Admin.`
- Version: `Phiên bản 1.0.0`

Sidebar sections:

- `QUẢN LÝ NỘI DUNG`
- `QUẢN LÝ NGƯỜI DÙNG`
- `QUẢN LÝ DOANH THU`
- `MARKETING`
- `CẤU HÌNH HỆ THỐNG`

Navigation labels:

- `Tổng quan`
- `Truyện`
- `Thể loại`
- `Tác giả`
- `Tags`
- `Bình luận`
- `Báo cáo`
- `Người dùng`
- `Vai trò & phân quyền`
- `Giao dịch`
- `Gói nạp`
- `Gói VIP`
- `Rút tiền`
- `Thống kê doanh thu`
- `Tổng quan Marketing`
- `Sự kiện`
- `Banner & vị trí hiển thị`
- `Truyện đề xuất`
- `Mã khuyến mãi`
- `Thông báo chiến dịch`
- `Thống kê Marketing`
- `Cài đặt`
- `Thông báo`
- `Nhật ký hoạt động`

Dashboard labels:

- `Tổng quan`
- `Thống kê tổng quan hệ thống`
- `Tổng truyện`
- `Tổng người dùng`
- `Lượt đọc`
- `Doanh thu`
- `Giao dịch`
- `Lượt đọc trong 7 ngày qua`
- `Top truyện được đọc nhiều`
- `Tỷ lệ truyện theo thể loại`
- `Truyện mới cập nhật`
- `Hoạt động người dùng`
- `Thống kê doanh thu`
- `Doanh thu theo truyện`
- `Doanh thu theo người đăng`

Table labels:

- `Truyện`
- `Loại truyện`
- `Tác giả`
- `Người đăng`
- `Chương mới nhất`
- `Thời gian`
- `Lượt đọc`
- `Thể loại`
- `Trạng thái`
- `Hành động`

## 5. Visual system

### Theme

Admin dung dark theme Ruby Noir. Khong tao theme toggle that trong MVP neu chua co light theme. Icon theme tren topbar co the la nut disabled/placeholder hoac an di trong MVP.

### Tokens

```css
--admin-bg: #090b11;
--admin-bg-ruby: #171119;
--admin-bg-glow: #43203a;
--admin-sidebar: #0c0e15;
--admin-panel: #1d1b27;
--admin-panel-deep: #111620;
--admin-panel-inner: #141823;
--admin-border: #302a3c;
--admin-text: #fff7fa;
--admin-text-soft: #a79ba5;
--admin-text-muted: #7e7480;
--admin-ruby: #d94a64;
--admin-violet: #8a36f2;
--admin-gold: #ffb23d;
--admin-green: #46c885;
--admin-blue: #3d9be9;
```

### Typography

- Font UI: existing project font stack, later co the chuan hoa sang Geist neu can.
- So lieu dung tabular/mono styling de can cot on dinh.
- Khong de chu trong card metric wrap len 2 dong o desktop.
- Heading admin khong dung hero-scale type.

### Shape va spacing

- Sidebar nav item: 8px radius.
- Metric card: 10px radius.
- Dashboard panel: 12px radius.
- Button/control: 8px hoac 10px radius theo container.
- Page gutter desktop: 24px.
- Panel padding desktop: 16-24px.
- Khoang cach grid desktop: 12-16px.

### Chart strategy

Khong them chart library trong phase dau neu chua can.

- Line chart co the render bang SVG noi bo.
- Donut chart co the render bang SVG noi bo.
- Revenue chart co the render bang CSS/SVG bars.
- Can co empty state khi khong co data.

## 6. Layout contract

### Desktop 1440px tro len

- Sidebar: 242px fixed.
- Topbar: 66px high, nam ben phai sidebar.
- Content width: phan con lai, co padding 24px.
- KPI row: 5 cot.
- Upper dashboard:
  - Reads chart: 5/12 cot.
  - Top stories: 3/12 cot.
  - Genre distribution: 4/12 cot.
- Lower dashboard:
  - Recent stories: 5/12 cot.
  - User activity: 3/12 cot.
  - Revenue: 4/12 cot.

### 1024px den 1439px

- Sidebar co the thu gon thanh icon rail hoac drawer tuy implementation.
- KPI row: 3 cot hang dau, 2 cot hang sau.
- Dashboard panels: 2 cot.
- Topbar search co the ngan hon nhung khong de chen profile.

### 768px den 1023px

- Sidebar thanh drawer.
- Topbar: menu button, title, profile.
- Search chuyen thanh button mo command panel.
- KPI row: 2 cot.
- Panels: 1 hoac 2 cot tuy noi dung.

### 320px den 767px

- Mot cot duy nhat.
- Metric cards la list 1 cot.
- Tables thanh stacked rows.
- Chart chieu cao co dinh theo container, khong dung viewport height.
- Tat ca touch target toi thieu 44px.

## 7. Component contract

### `AdminShell`

Trach nhiem:

- Render sidebar, topbar, main content, footer.
- Quan ly collapsed/drawer state neu can.
- Khong tu fetch dashboard data.

Props de xuat:

```ts
type AdminShellProps = {
  activeSection: AdminNavKey;
  title: string;
  children: React.ReactNode;
};
```

### `AdminSidebar`

Trach nhiem:

- Render grouped navigation.
- Active route state ro rang.
- Dung semantic `<nav>`.
- Nut `Truy cáº­p trang web` link ve `/`.

### `AdminTopbar`

Trach nhiem:

- Page title.
- Search control.
- Notification/profile affordance.
- Khong chua secret/admin data nhay cam trong client state.

### `MetricCard`

Props de xuat:

```ts
type MetricCardProps = {
  label: string;
  value: string;
  deltaLabel: string;
  tone: "violet" | "blue" | "ruby" | "gold" | "green";
};
```

### `AdminDashboard`

Trach nhiem:

- Nhan `AdminDashboardPayload`.
- Render dashboard panels.
- Xu ly empty/error/loading state thong qua parent route hoac boundary.

### `AdminDataPanel`

Container chung cho panels:

- title
- action link optional
- children
- loading/empty state optional

Khong dung nested cards qua nhieu lop. Panel la frame chinh; item ben trong dung row/divider.

## 8. Data contract

Dashboard payload phai typed ro, khong truyen row Supabase raw vao component UI.

```ts
export type AdminDashboardPayload = {
  generatedAt: string;
  dateRange: {
    from: string;
    to: string;
    label: string;
  };
  metrics: {
    totalStories: AdminMetric;
    totalUsers: AdminMetric;
    totalReads: AdminMetric;
    revenueVnd: AdminMetric;
    transactions: AdminMetric;
  };
  readsByDay: Array<{
    date: string;
    label: string;
    reads: number;
  }>;
  topStories: Array<{
    id: number;
    slug: string;
    title: string;
    authorName: string;
    uploaderUsername: string | null;
    productionType: "self_produced" | "licensed_translation";
    productionTypeLabel: string;
    genreLabel: string;
    coverUrl: string | null;
    readCountLabel: string;
  }>;
  genreDistribution: Array<{
    genre: string;
    count: number;
    percent: number;
    tone: "violet" | "ruby" | "gold" | "blue" | "green";
  }>;
  recentStories: Array<{
    id: number;
    slug: string;
    title: string;
    authorName: string;
    uploaderUsername: string | null;
    productionType: "self_produced" | "licensed_translation";
    productionTypeLabel: string;
    latestChapterLabel: string;
    updatedAtLabel: string;
  }>;
  userActivity: Array<{
    id: string;
    kind: "comment" | "follow" | "rating" | "transaction" | "story_created";
    actorLabel: string;
    actionLabel: string;
    targetLabel: string;
    createdAtLabel: string;
  }>;
  revenueByDay: Array<{
    date: string;
    label: string;
    revenueVnd: number;
    revenueLabel: string;
  }>;
};

export type AdminMetric = {
  label: string;
  value: string;
  deltaPercent: number | null;
  deltaLabel: string;
};
```

Dashboard MVP chi render 5 KPI va 6 panels:

- 5 KPI: `totalStories`, `totalUsers`, `totalReads`, `revenueVnd`, `transactions`.
- 6 panels: `readsByDay`, `topStories`, `genreDistribution`, `recentStories`, `userActivity`, `revenueByDay`.
- Revenue breakdown va Marketing summary khong nam trong dashboard MVP; chung thuoc module rieng ben duoi.

### Editorial mutation contracts

Contracts nay la source of truth cho A4, truoc khi viet Server Actions.

```ts
export type AdminStoryProductionType =
  | "self_produced"
  | "licensed_translation";

export type AdminStoryStatus = "draft" | "published" | "archived";

export type AdminAuthorSearchInput = {
  name: string;
  slug?: string;
  aliases?: string[];
};

export type AdminStoryUpsertInput = {
  title: string;
  slug: string;
  description: string;
  productionType: AdminStoryProductionType;
  author: AdminAuthorSearchInput;
  uploaderUsername?: string;
  genreIds: number[];
  tagIds: number[];
  coverPath?: string | null;
  status: AdminStoryStatus;
};

export type AdminChapterAccessLevel = "free" | "vip";

export type AdminChapterUpsertInput = {
  storyId: number;
  chapterId?: number;
  title: string;
  slug: string;
  number: number;
  accessLevel: AdminChapterAccessLevel;
  body: string;
  status: AdminStoryStatus;
};

export type AdminMutationResult<T> =
  | { ok: true; data: T; message: string }
  | {
      ok: false;
      error: {
        code: "VALIDATION_ERROR" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "SERVER_ERROR";
        message: string;
        details?: unknown;
      };
    };
```

Rules:

- Khong nhan `actorUserId` tu browser; actor lay tu authenticated server user.
- Author input khong co `bio` hoac `avatar`.
- `archive` va cac destructive action can confirmation token/string tu UI.
- Publish/archive/hide/restore can ghi audit event khi audit schema co san.

### Revenue module contract

```ts
export type AdminRevenueStatsPayload = {
  generatedAt: string;
  dateRange: {
    from: string;
    to: string;
    label: string;
  };
  revenueByDay: Array<{
    date: string;
    label: string;
    revenueVnd: number;
    revenueLabel: string;
  }>;
  revenueByStory: Array<{
    storyId: number;
    storyTitle: string;
    revenueVnd: number;
    revenueLabel: string;
  }>;
  revenueByUploader: Array<{
    username: string;
    revenueVnd: number;
    revenueLabel: string;
  }>;
};
```

### Marketing module contract

```ts
export type AdminMarketingSummaryPayload = {
  activeCampaigns: number;
  activeBanners: number;
  upcomingEvents: number;
  campaignStatusCounts: {
    draft: number;
    scheduled: number;
    live: number;
    ended: number;
  };
};
```

### Data source phasing

Phase dau co the dung mock payload typed de chot UI.

Khi noi data that:

- `totalStories`: count `stories`.
- `totalUsers`: count `profiles`.
- `totalReads`: tong `read_count` tu `stories`.
- `topStories`: `stories` order by `read_count`.
- `genreDistribution`: `story_genres` group by genre.
- `recentStories`: `stories` order by `updated_at` hoac `latest_published_at`.
- `userActivity`: tam thoi tong hop tu comments/bookmarks/reading events neu co; audit table se thay the sau.
- `revenueVnd` va `transactions`: placeholder 0 hoac mock until payment/ledger exists.
- `revenueByStory` va `revenueByUploader`: chi dung trong module `Thong ke doanh thu`, placeholder until payment/ledger exists.
- `AdminMarketingSummaryPayload`: chi dung trong module Marketing, placeholder until campaign/event schema exists.

## 9. Admin authorization

Admin panel can auth guard truoc khi render UI.

### Canonical admin entry

- `/admin` la canonical admin entry cho MVP.
- Khong tao secret/hidden admin slug de lam lop bao mat chinh.
- Security khong duoc dua vao obscurity: attacker co the doan hoac scan duoc `/admin`.
- Public UI khong can hien link `/admin` cho user thuong; admin co the truy cap truc tiep.
- Neu sau nay doi admin path, thay doi do chi la routing/product decision, khong phai security control.

MVP de xuat:

- User phai dang nhap Supabase Auth.
- Server-side guard doc `supabase.auth.getUser()`.
- Admin allowlist nam trong server-only env, vi du `ADMIN_EMAILS`.
- Khong dung `raw_user_meta_data`.
- Khong tin bat ky flag admin nao tu browser.
- Guest vao `/admin` bi redirect ve dang nhap hoac tra 404.
- Authenticated non-admin vao `/admin` nen tra 404 trong MVP de giam lo admin surface.
- Moi Server Action/Route Handler admin phai re-check admin authorization, khong chi dua vao layout guard.

Future:

- Chuyen sang `app_metadata.role` hoac bang role rieng neu can phan quyen that.
- Neu dung JWT/app metadata, server van phai re-check cho mutation nhay cam.

## 10. Security model

Trust boundaries:

- Browser -> Server Action/Route: untrusted input.
- Server -> Supabase admin client: privileged boundary.
- Admin UI -> public cache: phai revalidate sau publish/archive.
- File upload -> Storage: untrusted file, can validate type/size/path.

Rules:

- `/admin` la public-guessable URL; moi request toi admin surface phai duoc authorize server-side.
- `src/lib/supabase/admin.ts` chi duoc import trong server-only modules.
- Khong grant browser write vao `stories`, `chapters`, `chapter_contents`.
- Moi mutation input validate bang Zod.
- Mutation khong nhan `user_id` tu client lam actor.
- Actor lay tu authenticated server user.
- Expected errors tra domain message tieng Viet, khong leak raw database errors.
- Moi privileged mutation nen ghi audit event khi audit schema co san.
- Destructive actions can confirmation UI.

## 11. Route map admin

```text
src/app/admin/
  layout.tsx
  page.tsx
  truyen/page.tsx
  truyen/[id]/page.tsx
  truyen/[id]/chuong/page.tsx
  truyen/[id]/chuong/[chapterId]/page.tsx
  the-loai/page.tsx
  tac-gia/page.tsx
  tags/page.tsx
  binh-luan/page.tsx
  bao-cao/page.tsx
  nguoi-dung/page.tsx
  vai-tro/page.tsx
  giao-dich/page.tsx
  goi-nap/page.tsx
  goi-vip/page.tsx
  rut-tien/page.tsx
  thong-ke-doanh-thu/page.tsx
  marketing/page.tsx
  marketing/su-kien/page.tsx
  marketing/banner/page.tsx
  marketing/truyen-de-xuat/page.tsx
  marketing/ma-khuyen-mai/page.tsx
  marketing/thong-bao-chien-dich/page.tsx
  marketing/thong-ke/page.tsx
  cai-dat/page.tsx
  thong-bao/page.tsx
  nhat-ky/page.tsx
```

Route co the duoc tao dan. Chua can tao tat ca trong task dau tien; nhung sidebar label/slug phai on dinh.
`/admin` la entry path on dinh cua admin panel; khong tao parallel hidden route cho cung mot admin surface.

## 12. Module boundaries

De xuat khi trien khai:

```text
src/components/admin/
  admin-shell.tsx
  admin-sidebar.tsx
  admin-topbar.tsx
  metric-card.tsx
  data-panel.tsx
  charts/
    reads-line-chart.tsx
    genre-donut-chart.tsx
    revenue-bar-chart.tsx
  dashboard/
    admin-dashboard.tsx
    top-stories-list.tsx
    recent-stories-table.tsx
    user-activity-feed.tsx
  stories/
    story-list.tsx
    story-form.tsx
    story-chapter-list.tsx
    story-chapter-editor.tsx
  revenue/
    revenue-overview.tsx
    package-list.tsx
    vip-package-list.tsx
  marketing/
    marketing-overview.tsx
    campaign-list.tsx
    banner-placement-list.tsx

src/lib/admin/
  auth.ts
  dashboard.ts
  format.ts
  validators.ts

src/app/admin/
  layout.tsx
  page.tsx
```

## 13. Loading, empty, error states

Moi panel can co state:

- Loading: skeleton co cung shape voi final UI.
- Empty: text cu the, vi du `Chưa có dữ liệu trong khoảng thời gian này.`
- Error: inline panel message, vi du `Không thể tải thống kê. Vui lòng thử lại.`

Khong dung spinner tron generic cho dashboard content.

## 14. Accessibility

- Sidebar la `<nav aria-label="Điều hướng quản trị">`.
- Search input co label an: `Tìm kiếm trong trang quản trị`.
- KPI cards la region/list, khong phai button neu khong click duoc.
- Chart phai co text summary cho screen reader.
- Table dung `<table>` that tren desktop.
- Stacked mobile rows van giu label/value ro rang.
- Focus ring ro tren tat ca link/button.
- Khong chi dung mau de truyen dat tang/giam; delta co text `tăng`/`giảm`.

## 15. Acceptance criteria tong

- UI copy tieng Viet co dau.
- Dashboard khong de text overlap o 320, 768, 1024, 1440.
- Admin route bi chan voi guest.
- `/admin` la canonical admin entry va khong duoc coi la security-by-obscurity.
- Guest/non-admin bi chan bang server-side authorization, khong chi an link tren UI.
- Admin shell khong import secret client vao client bundle.
- Dashboard static/mock co day du 5 KPI va 6 panels.
- Dashboard data contract typed, khong truyen raw Supabase rows vao UI.
- Chuong truyen duoc quan ly trong `Truyen`, khong co sidebar module rieng.
- Tac gia khong co bio/avatar trong MVP admin.
- Revenue/giao dich neu chua co backend that phai hien ro la placeholder/deferred.
- Goi VIP co route/module shell rieng ben canh Goi nap.
- Marketing co IA va route shell ro de sau nay gan event.
- Build, lint, typecheck pass.
