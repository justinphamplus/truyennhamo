# Test Plan: NovelVerse Static Prototype

## Syntax Check

```powershell
node --check app.js
```

Expected:

- Exit code 0.
- Khong bao loi cu phap.

## Browser Smoke Test

1. Mo `index.html`.
2. Expected: Homepage hien thi, khong trang trang.
3. Click `Doc ngay`.
4. Expected: Chuyen sang story detail `#story`.
5. Click logo hoac `Trang chu`.
6. Expected: Ve homepage.

## Homepage Interaction Test

- Press `Ctrl K`.
  - Expected: Search input duoc focus.
- Click mobile menu o viewport nho.
  - Expected: Menu hien/ẩn.
- Click user avatar.
  - Expected: User dropdown hien/ẩn.
- Click ranking tabs.
  - Expected: Tab active thay doi va score mock update.
- Click `Dang doc do` / `Da luu`.
  - Expected: List thay doi.

## Story Detail Interaction Test

- Type keyword vao `Tim chuong`.
  - Expected: Chapter list filter theo keyword.
- Click sort A-Z/Z-A.
  - Expected: Thu tu chapter doi.
- Submit comment.
  - Expected: Comment moi "Ban" xuat hien dau list.
- Click related carousel controls.
  - Expected: Track scroll ngang.
- Click back-to-top.
  - Expected: Page scroll len dau.

## Responsive Test

Kiem tra cac width:

- 1440px desktop.
- 1024px laptop/tablet landscape.
- 768px tablet.
- 390px mobile.
- 320px mobile nho.

Expected:

- Khong co horizontal overflow bat thuong.
- Header khong tran.
- Button text khong tran.
- Story card/genre card van doc duoc.
- Detail page poster va stats xep hop ly.
- Mobile sticky CTA chi hien o story detail.

## Accessibility Test

- Tab tu dau trang den cuoi trang.
- Expected: Focus order hop ly.
- Icon-only buttons co accessible label.
- Inputs co label an.
- Co skip link.
- Khong co button khong ten.

## Visual QA Notes

Ghi loi tim thay vao `PROGRESS.md` duoi muc "Not Yet Verified" hoac tao muc "Issues Found".
