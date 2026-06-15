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
