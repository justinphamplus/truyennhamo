# Implementation Plan: NovelVerse Public Website UI

Cap nhat: 2026-06-13

Plan nay danh cho nguoi moi de theo doi tung buoc. Chua code o buoc nay. Khi bat dau code, lam lan luot tung task, moi task xong phai kiem tra truoc khi qua task tiep theo.

## Quy tac bat buoc khi implement

- Sau moi thay doi lon, chup screenshot va so sanh voi design goc:
  - Trang chu: `D:/0. Vibe Code Idea/Web Truyen/Trang-chu-topaz-2.jpg`
  - Chi tiet truyen: `D:/0. Vibe Code Idea/Web Truyen/Chi-tiet-truyen copy.jpg`
  - Admin dashboard chi dung tham chieu visual system: `D:/0. Vibe Code Idea/Web Truyen/admin-dashboard.png`
- Moi screenshot moi nen luu vao `docs/screenshots/` theo ten:
  - `home-desktop-after-task-XX.png`
  - `story-desktop-after-task-XX.png`
  - `home-mobile-after-task-XX.png`
  - `story-mobile-after-task-XX.png`
- Website phai mobile-friendly o moi phase, khong doi den cuoi moi sua mobile.
- Moi task sua JavaScript phai chay `node --check app.js`.
- Moi task co thay doi UI lon phai kiem tra desktop va mobile toi thieu:
  - Desktop: 1440px hoac man hinh hien tai
  - Mobile: 390px va 320px neu co the
- Neu phat hien loi layout, ghi vao `docs/PROGRESS.md` truoc khi sua.
- Sau khi task xong, cap nhat `docs/TASKS.md` va `docs/PROGRESS.md`.

## Phase 0: Project Documentation Setup

### Task 0.1: Lock final UI spec

**Muc tieu task**

Dam bao final UI spec la source of truth truoc khi code tiep.

**File/component se tao hoac sua**

- Sua: `docs/SPEC.md`
- Sua: `docs/README.md`

**Ket qua mong doi**

- `docs/SPEC.md` co day du: muc tieu, pages, sections, components, colors, typography, responsive, interactions, mock data, motion, completion criteria.
- `docs/README.md` huong dan nguoi moi doc tai lieu theo dung thu tu.

**Cach kiem tra task da xong**

- Mo `docs/SPEC.md` va check cac heading chinh co ton tai.
- Chay:

```powershell
rg -n "Muc tieu|Danh sach trang|Component|Mau sac|Responsive|Interaction|Du lieu mau|Tieu chi|motion" docs\SPEC.md
```

**Trang thai hien tai**

- Done.

### Task 0.2: Create implementation tracking docs

**Muc tieu task**

Tao tai lieu theo doi tien do de khong mat ngu canh khi lam nhieu buoc.

**File/component se tao hoac sua**

- Tao/sua: `docs/IMPLEMENTATION_PLAN.md`
- Tao/sua: `docs/TASKS.md`
- Tao/sua: `docs/PROGRESS.md`
- Tao/sua: `docs/TEST_PLAN.md`

**Ket qua mong doi**

- Co plan chi tiet tung task.
- Co checklist task da lam/chua lam.
- Co progress tracker.
- Co test plan rieng.

**Cach kiem tra task da xong**

- Chay:

```powershell
rg --files docs
```

- Dam bao co cac file tren.

**Trang thai hien tai**

- In progress trong lan cap nhat nay.

## Phase 1: Static Foundation

### Task 1.1: Create static app shell

**Muc tieu task**

Tao app static co the mo truc tiep bang browser, phu hop cho nguoi moi.

**File/component se tao hoac sua**

- Tao/sua: `index.html`
- Tao/sua: `styles.css`
- Tao/sua: `app.js`
- Components logical:
  - `PublicHeader`
  - `Main`
  - `Footer`

**Ket qua mong doi**

- Mo `index.html` thay duoc website, khong trang trang.
- HTML co semantic layout: `header`, `main`, `section`, `footer`.
- CSS co global tokens co ban.
- JS load duoc khong loi cu phap.

**Cach kiem tra task da xong**

- Mo `index.html` trong browser.
- Chay:

```powershell
node --check app.js
```

- Chup screenshot desktop dau tien:
  - `docs/screenshots/foundation-desktop-after-task-01.png`
- Kiem tra mobile 390px: header khong tran ngang.

**Trang thai hien tai**

- Done.

### Task 1.2: Define design tokens and base styles

**Muc tieu task**

Thiet lap mau sac, typography, spacing, radius va base component style de toan bo UI nhat quan.

**File/component se tao hoac sua**

- Sua: `styles.css`
- Components logical:
  - `Button`
  - `IconButton`
  - `Card`
  - `Badge`
  - `Tabs`

**Ket qua mong doi**

- Dark theme giong visual goc.
- Co CSS variables cho background, surface, text, border, violet, pink, green, amber.
- Button/card/input co radius 8px va hover/focus state.
- Font `Be Vietnam Pro` duoc khai bao.

**Cach kiem tra task da xong**

- So sanh mau nen/card voi visual goc.
- Tab qua cac control de thay focus visible.
- Kiem tra mobile 320px khong co horizontal overflow.
- Chup screenshot:
  - `docs/screenshots/tokens-desktop-after-task-02.png`
  - `docs/screenshots/tokens-mobile-after-task-02.png`

**Trang thai hien tai**

- Done, can browser QA ky hon.

## Phase 2: Homepage

### Task 2.1: Build public header and navigation

**Muc tieu task**

Tao header giong visual: logo, nav, search, icons, user avatar va mobile menu.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `PublicHeader`
  - `Logo`
  - `MainNav`
  - `SearchInput`
  - `UserMenu`
  - `MobileMenu`

**Ket qua mong doi**

- Desktop co full nav.
- Search hien `Ctrl K`.
- Notification/bookmark/user nam ben phai.
- Mobile an nav desktop va hien menu button.

**Cach kiem tra task da xong**

- Desktop: nav khong bi chen/vo hang.
- Mobile 390px: header gon, khong tran.
- Press `Ctrl K`: search input duoc focus.
- Click avatar: dropdown mo/dong.
- Click menu mobile: panel mo/dong.
- Chup screenshot desktop/mobile va so sanh voi header visual goc.

**Trang thai hien tai**

- Done, can browser screenshot QA.

### Task 2.2: Build homepage hero story

**Muc tieu task**

Tao hero lon de nguoi dung thay ngay truyen noi bat.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Components logical:
  - `StoryHero`
  - `HeroStats`
  - `StoryActions`

**Ket qua mong doi**

- Hero co visual nen lon, badge `Truyen hot`, title, status, mo ta, CTA, stats.
- Desktop hero chiem cot trai lon.
- Mobile hero van cinematic, text khong chep/khong tran.

**Cach kiem tra task da xong**

- Desktop: so sanh hero voi `Trang-chu-topaz-2.jpg`.
- Mobile 390px va 320px: title/CTA khong tran.
- Click `Doc ngay`: mo story detail.
- Chup:
  - `docs/screenshots/home-hero-desktop-after-task-04.png`
  - `docs/screenshots/home-hero-mobile-after-task-04.png`

**Trang thai hien tai**

- Done, visual co CSS art thay anh that.

### Task 2.3: Build recommendation panel

**Muc tieu task**

Tao khu `De cu cho ban` ben phai hero, render tu mock data.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `RecommendedStoryList`
  - `RecommendedStoryItem`

**Ket qua mong doi**

- Desktop panel nam ben phai hero.
- Item co cover, title, status, translation type, mo ta ngan, time.
- Mobile panel xep duoi hero, 1 cot.

**Cach kiem tra task da xong**

- Desktop: grid de cu can doi, text khong tran.
- Mobile: moi item doc duoc, cover khong meo.
- Click item: mo story detail.
- Chup screenshot va so sanh voi khu `De cu cho ban` trong visual goc.

**Trang thai hien tai**

- Done.

### Task 2.4: Build genre section

**Muc tieu task**

Tao section the loai pho bien de nguoi dung scan nhanh cac genre.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `GenreGrid`
  - `GenreTile`

**Ket qua mong doi**

- Desktop co 8 genre tile ngang.
- Tablet giam cot hop ly.
- Mobile horizontal scroll hoac grid gon, khong tran.

**Cach kiem tra task da xong**

- Desktop: genre tile nam trong 1 hang nhu visual.
- Mobile: scroll ngang muot, khong lam page overflow.
- Chup screenshot desktop/mobile.

**Trang thai hien tai**

- Done.

### Task 2.5: Build ranking and latest updates

**Muc tieu task**

Tao hai panel chinh giua trang: bang xep hang va truyen moi cap nhat.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `RankingPanel`
  - `RankingItem`
  - `UpdatedStoryList`
  - `UpdatedStoryItem`
  - `Tabs`

**Ket qua mong doi**

- Desktop: 2 cot bang nhau.
- Ranking co tabs `Tuan nay`, `Thang nay`, `Tat ca thoi gian`.
- Latest updates co list title/chuong/time/badge New.
- Mobile: 2 panel xep doc.

**Cach kiem tra task da xong**

- Click ranking tabs: active state doi, data mock doi.
- Desktop: so sanh voi khu ranking/update trong visual.
- Mobile: list doc duoc, time khong tran.
- Chup screenshot desktop/mobile.

**Trang thai hien tai**

- Done.

### Task 2.6: Build story cards, continue reading and community sections

**Muc tieu task**

Hoan thien cac section con lai cua homepage.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `StoryCardGrid`
  - `StoryCard`
  - `ContinueReadingSection`
  - `ContinueReadingCard`
  - `CommunitySection`
  - `CommunityCard`

**Ket qua mong doi**

- `Truyen moi` co grid cards.
- `Danh cho ban` co tabs `Dang doc do` va `Da luu`.
- `Cong dong noi bat` co 3 cards.
- Mobile story cards co carousel/horizontal scroll hoac layout than thien.

**Cach kiem tra task da xong**

- Click tab `Da luu`: content doi.
- Mobile: cards khong qua nho, scroll duoc.
- Desktop: section spacing giong visual.
- Chup screenshot full homepage desktop va mobile:
  - `docs/screenshots/home-full-desktop-after-task-07.png`
  - `docs/screenshots/home-full-mobile-after-task-07.png`

**Trang thai hien tai**

- Done.

## Phase 3: Story Detail Page

### Task 3.1: Build story detail hero

**Muc tieu task**

Tao man hinh chi tiet truyen co poster, thong tin, stats va CTA.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Components logical:
  - `Breadcrumb`
  - `StoryDetailHero`
  - `StoryCover`
  - `StoryMeta`
  - `StoryStats`
  - `StoryActions`
  - `StoryTagList`

**Ket qua mong doi**

- Desktop: poster trai, info phai.
- Mobile: poster tren, info duoi.
- CTA doc/yeu thich/mua combo ro rang.
- Tags wrap dep.

**Cach kiem tra task da xong**

- Mo `#story`.
- Desktop: so sanh voi `Chi-tiet-truyen copy.jpg`.
- Mobile: poster khong tran, stats 2x2, CTA de bam.
- Chup:
  - `docs/screenshots/story-hero-desktop-after-task-08.png`
  - `docs/screenshots/story-hero-mobile-after-task-08.png`

**Trang thai hien tai**

- Done.

### Task 3.2: Build story description

**Muc tieu task**

Tao section gioi thieu truyen de nguoi doc hieu noi dung.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js` neu co expand/collapse
- Components logical:
  - `StoryDescription`

**Ket qua mong doi**

- Co title `Gioi thieu truyen`.
- Co 2-3 doan mo ta.
- Co nut `Xem them` neu can.
- Mobile text de doc, line-height thoang.

**Cach kiem tra task da xong**

- Kiem tra desktop/mobile text khong tran.
- Neu co button xem them: click khong gay loi.
- Chup screenshot story description tren desktop/mobile.

**Trang thai hien tai**

- Done basic.

### Task 3.3: Build chapter section

**Muc tieu task**

Tao danh sach chuong co search, sort, VIP/new/hot states.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `ChapterSection`
  - `ChapterToolbar`
  - `ChapterList`
  - `ChapterRow`
  - `Pagination`
  - `ChapterLegend`

**Ket qua mong doi**

- Desktop chapter grid 2 cot.
- Mobile chapter list 1 cot.
- Search chapter filter theo keyword.
- Sort A-Z/Z-A doi thu tu.
- Row co icon/label cho new, hot, VIP/lock.

**Cach kiem tra task da xong**

- Tim `2686`: list filter dung.
- Tim keyword khong co: hien empty state.
- Click sort: order doi.
- Mobile 320px: title chuong khong lam tran ngang.
- Chup screenshot desktop/mobile cua chapter section.

**Trang thai hien tai**

- Done basic.

### Task 3.4: Build comments and related stories

**Muc tieu task**

Tao khu binh luan mock va carousel truyen lien quan.

**File/component se tao hoac sua**

- Sua: `index.html`
- Sua: `styles.css`
- Sua: `app.js`
- Components logical:
  - `CommentSection`
  - `CommentForm`
  - `CommentItem`
  - `RelatedStoriesCarousel`

**Ket qua mong doi**

- Comment form co input va submit.
- Submit comment mock them comment moi len dau list.
- Related stories co horizontal carousel.
- Controls prev/next hoat dong.

**Cach kiem tra task da xong**

- Nhap comment va submit: comment moi xuat hien.
- Click carousel next/prev: list scroll.
- Mobile: carousel scroll ngang duoc, khong vo layout.
- Chup full story detail desktop/mobile va so sanh voi design goc.

**Trang thai hien tai**

- Done basic.

## Phase 4: Motion and Interaction Polish

### Task 4.1: Add motion library decision

**Muc tieu task**

Chon cach them motion de UI muot hon ma khong lam phuc tap qua som.

**File/component se tao hoac sua**

- Sua: `docs/SPEC.md`
- Sua: `docs/DECISIONS.md`
- Neu implement sau:
  - Static: them `motion`
  - React/Vite/Next: them `framer-motion`

**Ket qua mong doi**

- Co quyet dinh ro: static thi dung `motion`, framework React thi dung `framer-motion`.
- Chua cai dependency neu user chua xac nhan.

**Cach kiem tra task da xong**

- Mo `docs/SPEC.md`, section `Thu vien motion` co noi dung ro.
- Mo `docs/DECISIONS.md`, co decision ve motion neu da chon.

**Trang thai hien tai**

- Spec da ghi, chua install library.

### Task 4.2: Add tasteful UI animations

**Muc tieu task**

Them hieu ung dep hon: page transition, card stagger, hover lift, dropdown animation.

**File/component se tao hoac sua**

- Neu static:
  - Sua: `index.html`
  - Sua: `styles.css`
  - Sua: `app.js`
  - Co the them dependency sau khi user xac nhan
- Components logical:
  - `PageTransition`
  - `AnimatedCard`
  - `AnimatedDropdown`
  - `AnimatedCarousel`

**Ket qua mong doi**

- Animation nhe, premium, khong lam roi mat.
- Card hover co lift/glow nhe.
- Mobile menu/dropdown enter/exit muot.
- Respect `prefers-reduced-motion`.

**Cach kiem tra task da xong**

- Desktop: hover cards/button thay feedback nhe.
- Mobile: menu open/close khong giat.
- Kiem tra khong layout shift lon.
- Chup screenshot sau thay doi motion va so sanh voi design goc.
- Sua JS thi chay:

```powershell
node --check app.js
```

**Trang thai hien tai**

- Not started.

## Phase 5: Mobile-Friendly QA

### Task 5.1: Mobile layout audit

**Muc tieu task**

Dam bao website dung tot tren mobile, khong chi dep tren desktop.

**File/component se tao hoac sua**

- Co the sua: `styles.css`
- Co the sua: `index.html`
- Components logical:
  - `PublicHeader`
  - `StoryHero`
  - `StoryCard`
  - `StoryDetailHero`
  - `ChapterList`
  - `Footer`

**Ket qua mong doi**

- 320px khong co horizontal overflow bat thuong.
- Header khong bi chen.
- CTA bam duoc bang ngon tay.
- Cards, chapter rows, footer doc duoc.

**Cach kiem tra task da xong**

- Kiem tra 320px, 390px, 768px.
- Chup:
  - `docs/screenshots/mobile-home-320-after-task-15.png`
  - `docs/screenshots/mobile-story-320-after-task-15.png`
  - `docs/screenshots/mobile-home-390-after-task-15.png`
  - `docs/screenshots/mobile-story-390-after-task-15.png`
- So sanh voi visual goc ve tinh than layout, spacing, card density.

**Trang thai hien tai**

- Not fully verified.

### Task 5.2: Desktop visual comparison audit

**Muc tieu task**

So sanh giao dien desktop voi design goc va ghi lai diem can sua.

**File/component se tao hoac sua**

- Tao: `docs/visual-audit.md` neu can
- Co the sua sau audit: `styles.css`, `index.html`, `app.js`

**Ket qua mong doi**

- Co danh sach khac biet ro:
  - Header spacing
  - Hero proportions
  - Card density
  - Color/contrast
  - Detail page poster/info ratio
  - Footer spacing
- Co screenshot before/after.

**Cach kiem tra task da xong**

- Chup homepage desktop.
- Chup story detail desktop.
- Dat canh design goc va ghi issue trong `docs/PROGRESS.md` hoac `docs/visual-audit.md`.

**Trang thai hien tai**

- Not started.

### Task 5.3: Accessibility and keyboard audit

**Muc tieu task**

Dam bao UI co the dung bang keyboard va khong thieu label co ban.

**File/component se tao hoac sua**

- Co the sua: `index.html`
- Co the sua: `styles.css`
- Co the sua: `app.js`

**Ket qua mong doi**

- Icon-only buttons co `aria-label`.
- Inputs co label.
- Focus visible ro.
- Tab order hop ly.
- Escape dong menu/dropdown.

**Cach kiem tra task da xong**

- Dung phim Tab di tu dau trang den footer.
- Press Escape khi menu/dropdown dang mo.
- Kiem tra khong co control quan trong nao bi bo qua.
- Chup screenshot focus state neu co thay doi lon.

**Trang thai hien tai**

- Partially done, can audit ky hon.

## Phase 6: Future Expansion

### Task 6.1: Decide static vs React/Vite/Next

**Muc tieu task**

Quyet dinh co giu static app hay chuyen sang framework de tach component va dung motion library tot hon.

**File/component se tao hoac sua**

- Sua: `docs/DECISIONS.md`
- Neu chuyen framework sau:
  - Tao: `package.json`
  - Tao: source structure moi

**Ket qua mong doi**

- Co quyet dinh ro truoc khi cai dependency.
- Nguoi moi hieu vi sao chon framework hoac giu static.

**Cach kiem tra task da xong**

- `docs/DECISIONS.md` co decision moi.
- Neu co scaffold framework, build/dev command phai duoc ghi vao docs.

**Trang thai hien tai**

- Not started.

### Task 6.2: Add reader page

**Muc tieu task**

Tao trang doc chuong rieng sau khi public homepage/detail on dinh.

**File/component se tao hoac sua**

- Co the sua: `index.html`, `styles.css`, `app.js`
- Components logical:
  - `ReaderPage`
  - `ReaderToolbar`
  - `ChapterContent`
  - `ReaderSettings`
  - `ChapterNavigation`

**Ket qua mong doi**

- Click chapter row mo reader page.
- Co title chuong, noi dung, next/prev.
- Co setting font size/theme.
- Mobile doc thoai mai.

**Cach kiem tra task da xong**

- Click chapter row.
- Kiem tra doc chuong o desktop va mobile.
- Chup screenshot reader desktop/mobile.

**Trang thai hien tai**

- Not started.

### Task 6.3: Add admin dashboard

**Muc tieu task**

Lam admin dashboard theo visual admin sau khi public site on dinh.

**File/component se tao hoac sua**

- Chua xac dinh, tuy static hay framework.
- Components logical:
  - `AdminShell`
  - `AdminSidebar`
  - `MetricCard`
  - `ChartCard`
  - `AdminTable`
  - `ActivityFeed`

**Ket qua mong doi**

- Dashboard co sidebar, KPI cards, charts, tables, activity feed.
- Mobile admin co drawer/sidebar gon.

**Cach kiem tra task da xong**

- So sanh voi `admin-dashboard.png`.
- Chup desktop/mobile dashboard.

**Trang thai hien tai**

- Not started.

## Suggested implementation order from now

Vi app static da co prototype, thu tu tiep theo nen la:

1. Task 5.2: Desktop visual comparison audit.
2. Task 5.1: Mobile layout audit.
3. Task 5.3: Accessibility and keyboard audit.
4. Task 4.1: Xac nhan motion library approach.
5. Task 4.2: Them motion polish.
6. Task 6.1: Quyet dinh co chuyen framework khong.

## Definition of Done for each large UI change

Mot thay doi UI lon chi duoc coi la xong khi:

- Desktop screenshot da chup.
- Mobile screenshot da chup.
- Da so sanh voi design goc va ghi nhan khac biet neu co.
- Khong co horizontal overflow tren mobile.
- Interaction lien quan hoat dong.
- Neu sua JS: `node --check app.js` pass.
- `docs/PROGRESS.md` duoc cap nhat.
