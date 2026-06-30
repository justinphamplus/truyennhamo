# Decision Log

## 2026-06-13: Build Static Prototype First

Decision: Dung HTML/CSS/JS tinh thay vi scaffold React/Vite/Next ngay.

Reason:

- Workspace ban dau trong, chua co framework.
- User la nguoi moi va muon huong dan tung buoc.
- Static app co the mo truc tiep bang browser.
- Khong can install dependency.

Consequence:

- Nhanh de xem visual.
- CSS/JS co the lon hon neu tiep tuc mo rong.
- Khi san pham on dinh hon, co the chuyen sang framework.

## 2026-06-13: Public Site First

Decision: Lam public website truoc, admin dashboard de sau.

Reason:

- User da xac nhan "Public truoc".
- Visual public gom homepage va story detail la core user flow.

Consequence:

- Admin visual chi dung tham chieu design system.
- Task admin dashboard nam trong future tasks.

## 2026-06-13: Mock Data Only

Decision: Du lieu nam trong `app.js`.

Reason:

- User da xac nhan mock data.
- Chua can backend/database.

Consequence:

- Search/filter hien chi la UI mock cuc bo.
- Sau nay can tach data/API neu lam app that.

## 2026-06-13: CSS Art Instead Of Real Assets

Decision: Tao cover/hero bang CSS approximation.

Reason:

- Cac visual upload nam ngoai workspace code.
- Static prototype khong nen phu thuoc asset ngoai chua duoc copy vao project.

Consequence:

- Giao dien co cam giac tuong tu nhung khong trung anh goc 100%.
- Neu muon sat hon, buoc tiep theo la dua image assets vao `assets/`.

## 2026-06-13: Docs Required Before Further Work

Decision: Them bo docs de theo doi spec, plan, task va progress.

Reason:

- User yeu cau truoc khi lam tiep.
- Du an dang bat dau lon hon, can source of truth de khong mat tien do.

Consequence:

- Moi task tiep theo nen cap nhat `PROGRESS.md` va `TASKS.md`.

## 2026-06-15: Mystical Night Theme Refactor

Decision: Doi design system sang bang mau Mystical Night / Tieu Mo va ap dung glassmorphism, nhung giu nguyen layout hien tai.

Reason:

- User cung cap `New Design.md` lam guideline mau moi.
- Yeu cau chi thay bo mau, glass effect va chi tiet visual can thiet.
- Layout homepage/story detail dang dung dung flow nen khong refactor cau truc.

Consequence:

- `styles.css` la noi map token mau moi va glass treatment.
- Khong doi grid/flex/position chinh cua cac section.
- Neu them theme tiep theo, can cap nhat `docs/SPEC.md` truoc khi sua CSS.

## 2026-06-15: Tieu Mo Cozy Fantasy Library Theme

Decision: Refactor visual style sang brand "Tieu Mo - Nam Truyen" theo file `tieu-mo-style-refactor-codex.md`.

Reason:

- User cung cap design moi voi huong cozy fantasy library, dark emerald, mint glow va warm gold.
- Can loai bo cam giac cyber neon / laser / sci-fi cua theme cu.
- Mascot Tieu Mo can co vai tro ro hon trong homepage.

Consequence:

- Header/logo, hero, action bar, cards, badges, VIP, footer va detail page dung token `--tm-*`.
- Them CSS-art mascot/action bar/widget de khong can asset moi.
- Layout va mock data hien co van duoc giu.

## 2026-06-18: Ruby Noir Romance Becomes The Only Theme

Decision: Chot Ruby Noir Romance lam giao dien chinh thuc va duy nhat cua public website.

Reason:

- Ruby Noir phu hop hon voi noi dung truyen ngon va bo anh bia hien tai.
- User da hoan tat giai doan so sanh theme va chon Ruby Noir.
- Theme toggle, query parameter va localStorage tao them state khong con can thiet.

Consequence:

- `index.html` khoi tao `data-theme="ruby-noir"` va `data-layout="ruby-noir"`.
- Xoa nut palette khoi header desktop/mobile.
- Xoa logic toggle, doc query `?theme=` va luu `novelverse-theme`.
- CSS Ruby Noir tiep tuc duoc scope de tranh refactor lon khong can thiet.
- Tieu Mo/Mystical Night chi con la lich su thiet ke, khong con la giao dien runtime.

## 2026-06-18: Skip Further Desktop Reference Comparison

Decision: Khong tiep tuc task so sanh desktop voi visual goc.

Reason:

- User da chu dong sua va chot layout theo y rieng.
- Visual hien tai la source of truth thay vi anh tham chieu cu.

Consequence:

- Task 5.2 duoc dong theo decision, khong can them vong visual comparison.
- Cong viec tiep theo chuyen sang Reader Page.

## 2026-06-19: Remove Dormant Tieu Mo UI

Decision: Xoa section mascot/suggestion Tieu Mo dang bi an trong Ruby Noir va CSS chi phuc vu cac component nay.

Reason:

- Ruby Noir la theme runtime duy nhat.
- HTML Tieu Mo khong hien thi nhung van lam tang DOM va CSS.
- Screenshot comparison Home/Story khong co pixel thay doi sau cleanup.

Consequence:

- Xoa `mascot-feature-grid`, `mascot-widget`, `mascot-mini`, `story-banner` va `tmFloat`.
- Giu token `--tm-*` vi Ruby Noir hien van dung chung token contract nay; doi ten token la refactor rieng co rui ro cao hon.

## 2026-06-19: Next.js And Supabase Backend Stack

Decision:

- Chuyen frontend sang Next.js App Router + TypeScript.
- Dung Supabase PostgreSQL, Auth va Storage.
- Dung Data API + RLS cho public/user-owned data.
- Dung Server Actions cho mutation noi bo; Route Handlers cho webhook/API ben ngoai.

Reason:

- Public story pages can SEO va server rendering.
- Supabase cung cap PostgreSQL, Auth, Storage va RLS trong mot stack gon.
- Vertical slice Home/Story/Reader co the migrate dan, khong can build custom backend CRUD.

Security consequences:

- Publishable key duoc phep o client voi RLS va least-privilege grants.
- Secret key chi nam trong server-only client rieng.
- Chapter metadata va body duoc tach de khong lo noi dung locked.
- Payment/VIP entitlement khong nam trong migration dau.

Full specification: `docs/BACKEND_SPEC.md`.

## 2026-06-20: Email/Password Auth First

Decision: Trien khai Supabase email/password Auth truoc, chua them social OAuth.

Reason:

- Day la default trong backend spec va du de mo khoa profile/bookmark/progress.
- Giu pham vi Auth nho, de test RLS va session cookie end-to-end.

Consequence:

- Production co the bat email confirmation; app co `/auth/confirm` de verify token.
- Google OAuth la task rieng neu can sau.

## 2026-06-21: Bookmark Is The First User-Owned Data Slice

Decision:

- Trien khai theo doi/tủ truyện truoc reading progress va comments.
- Bookmark mutation dung Server Action; personalized reads dung SSR client va owner-only RLS.
- `/tu-truyen` la route protected rieng, khong tiep tuc dung homepage mock section lam source of truth.

Reason:

- Bookmark la vertical slice nho nhat de kiem tra day du Auth cookie, RLS, mutation va personalized UI.
- Composite primary key `(user_id, story_id)` giup toggle idempotent va khong tao duplicate.
- Route rieng de mo rong reading progress sau nay ma khong lam homepage thanh personalized monolith.

Consequence:

- Guest bam Theo doi duoc dua den login va quay lai Story Detail.
- Homepage `Dang doc do` se duoc thay bang du lieu that trong B3.3; danh sach Da luu chinh thuc nam
  tai `/tu-truyen`.

## 2026-06-21: Reading Progress Uses An Internal Route Handler

Decision:

- Autosave Reader gui POST den `/api/reading-progress`.
- Route Handler tai su dung server-side validation/upsert, Auth cookie va RLS.
- Khong goi Server Action truc tiep tu progress tracker.

Reason:

- Public Reader hien van render noi dung bang legacy imperative `public/app.js`.
- Server Action invocation tao RSC refresh va thay lai prototype DOM, trong khi imperative script
  khong chay lai; ket qua la Reader quay ve markup mac dinh.
- Route Handler cho background mutation ma khong thay component tree dang doc.

Consequence:

- Autosave khong gay layout/content reset.
- Homepage va `/tu-truyen` la dynamic routes nen doc progress moi khi dieu huong; khong can refresh
  Reader sau moi lan save.
- Khi prototype shell duoc tach thanh React components hoan chinh, mutation co the duoc danh gia lai.

## 2026-06-30: UTF-8 Text Hygiene

Decision: Treat repository text files as UTF-8 and keep a repeatable mojibake guard in `npm run text:check`.

Reason:

- Vietnamese UI copy and SQL seed/test strings are easy to corrupt on Windows terminals/editors.
- Console rendering can look broken even when files are correct, so checks should inspect file content directly.
- A small Node stdlib script is enough; no new dependency is needed.

Consequence:

- Editors should follow `.editorconfig` with `charset = utf-8`.
- Git should keep normal text/binary handling through `.gitattributes`.
- Before shipping copy-heavy changes, run `npm run text:check` with the usual lint/type/build checks.
