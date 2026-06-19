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
