# Visual Audit: NovelVerse Screenshots

Cap nhat: 2026-06-13

## Screenshots captured

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/story-desktop.png`
- `docs/screenshots/home-mobile-390.png`
- `docs/screenshots/story-mobile-390.png`

## Summary

Prototype render duoc va dung duoc o desktop ve cau truc tong the. Tuy nhien chua du dieu kien qua task tiep theo vi mobile dang co horizontal overflow va story detail mobile bi loi hero/poster.

## Findings

### P1: Mobile co horizontal overflow

- Affected: `home-mobile-390.png`, `story-mobile-390.png`
- Evidence: Co scrollbar ngang o day screenshot.
- Impact: Khong dat yeu cau mobile-friendly.
- Likely causes:
  - Header/search/avatar bi vuot width.
  - Mot so section/card/button co width lon hon viewport.
  - Story detail CTA/tag/chapter area co item khong wrap dung.

### P1: Story detail mobile hero bi khoang trong rat lon

- Affected: `story-mobile-390.png`
- Evidence: Khu poster/detail tren mobile hien mot block trong rat cao truoc title.
- Impact: Mobile detail page khong giong design goc va trai nghiem doc kem.
- Likely cause:
  - `cover-card`/story detail grid mobile sizing hoac background/cover bi an sai.

### P1: Story desktop co horizontal overflow

- Affected: `story-desktop.png`
- Evidence: Co scrollbar ngang o day screenshot; ben phai section chapter/comment bi cat.
- Impact: Desktop detail chua dat QA.
- Likely causes:
  - Story stats/tags/chapter toolbar/rows vuot container.
  - Grid column hoac item `auto` khong co `min-width: 0`.

### P2: Homepage mobile header bi cat hai ben

- Affected: `home-mobile-390.png`
- Evidence: Logo chi hien mot phan ben trai, avatar bi cat ben phai.
- Impact: Header mobile chua polished.

### P2: Homepage mobile hero text/CTA vuot ngang

- Affected: `home-mobile-390.png`
- Evidence: Noi dung hero bi cat o canh phai; stats hang duoi bi cat.
- Impact: First viewport mobile chua dat spec.

### P3: Visual fidelity chua sat vi cover/hero la CSS art

- Affected: all screenshots.
- Evidence: Visual co dung dark premium/card layout, nhung cover khong phai artwork nhu design goc.
- Impact: Chap nhan duoc neu van giu quyet dinh CSS mock; neu muon sat visual hon can them image assets.

## Passes

- Homepage desktop co dung cau truc section chinh: header, hero, de cu, genre, ranking, updates.
- Story desktop co dung cau truc section chinh: breadcrumb, detail hero, description, chapters, comments.
- Mau sac va dark theme dung huong spec.
- Mock data render duoc.

## Required before next task

- Fix horizontal overflow desktop/mobile.
- Fix story detail mobile hero/cover height.
- Re-capture screenshots sau khi sua.
- Kiem tra lai `node --check app.js` neu co sua JS.

## Fix pass: 2026-06-13

Files changed:

- `styles.css`

Screenshots after fix:

- `docs/screenshots/home-desktop-after-overflow-fix.png`
- `docs/screenshots/story-desktop-after-overflow-fix.png`
- `docs/screenshots/home-mobile-390-after-search-width-fix.png`
- `docs/screenshots/story-mobile-390-after-final-overflow-fix.png`

Result:

- Story detail mobile no longer has the large blank cover area.
- Mobile header now shows the menu button within viewport.
- Mobile screenshots no longer show the previous horizontal scrollbar.
- Desktop story screenshot no longer shows the previous bottom horizontal scrollbar.

Remaining visual polish:

- Artwork is still CSS mock, not real reference art.
- Some desktop story detail spacing can be improved later, but the overflow blocker is addressed.

## Compare pass against local visual references: 2026-06-13

Reference files:

- `visual/Trang-chu.jpg`
- `visual/Chi-tiet-truyen.jpg`

Current screenshots:

- `docs/screenshots/compare-home-after-cover-fix.png`
- `docs/screenshots/compare-story-after-controls-fix.png`

Minimal fixes applied:

- Fixed missing story covers in `Truyen moi` and `Truyen lien quan` by making cover elements block-level.
- Fixed chapter toolbar/comment submit clipping by allowing the toolbar to wrap and placing comment submit below the input.
- Fixed `.shell` width syntax to use `calc()` inside CSS `min()`.

Verification:

- `node --check app.js` passed.
- Homepage and story detail preserve the section structure from the references.
- Remaining difference: cover/hero art is CSS mock, not the real artwork from the reference images.

## Recommendation and cover pass: 2026-06-13

Current screenshots:

- `docs/screenshots/home-1440-after-recommendation-final.png`
- `docs/screenshots/home-mobile-390-after-recommendation-final-3.png`
- `docs/screenshots/detail-1440-after-recommendation-final.png`

Minimal fixes applied:

- Recommendation cards now use 9:16 covers.
- Recommendation copy now shows title, status, synopsis, and time.
- The recommendation `Xem tat ca` link now reads as a button-like footer action, closer to the reference visual.
- Story cover ratios are standardized to 9:16 across the public sections.
- `Dich` and `Convert` labels were removed from the UI/data.
- Popular genre icons now use distinct accent colors per category.

Verification:

- `node --check app.js` passed.
- `rg` found no remaining `Dich`/`Convert` labels in `index.html`, `app.js`, or `styles.css`.
