# Final UI Spec: NovelVerse Public Website

Cap nhat: 2026-06-18

## 1. Muc tieu website

NovelVerse la website doc truyen online theo phong cach Ruby Noir Romance premium. Muc tieu cua phase hien tai la xay dung public website ngon tinh voi mock data, chua lam backend that.

Website can giup doc gia:

- Kham pha truyen noi bat ngay tren trang chu.
- Xem de cu, the loai, bang xep hang va truyen moi cap nhat.
- Xem chi tiet mot truyen, bao gom thong tin, stats, tag, mo ta, danh sach chuong, binh luan va truyen lien quan.
- Tuong tac voi UI co ban nhu search, tabs, menu mobile, chapter filter, comment mock.

Nguoi dung muc tieu:

- Doc gia truyen tien hiep, huyen huyen, ngon tinh, do thi, lich su.
- Nguoi dung mobile va desktop.
- Nguoi doc muon trai nghiem giong app doc truyen hien dai, toi mau, co cam giac premium.

## 2. Danh sach trang can lam

### Phase hien tai

1. Trang chu public
2. Trang chi tiet truyen
3. Trang doc chuong

### Future phase, chua lam trong scope hien tai

1. Trang danh sach the loai
2. Trang ket qua tim kiem (da trien khai tai `/tim-kiem`)
3. Trang bang xep hang day du
4. Trang tu truyen/user library
5. Trang dang nhap/dang ky (da trien khai)
6. Admin dashboard

## 3. Section cua tung trang

### 3.1 Trang chu

Trang chu la man hinh kham pha noi dung. Desktop nen dung container 1180-1280px, section card toi, spacing gon giong visual.

Sections:

- Header
  - Logo NovelVerse
  - Nav: Trang chu, The loai, BXH, Truyen moi, Cong dong
  - Search input voi hint `Ctrl K`
  - Notification icon
  - Bookmark/library icon
  - User avatar/dropdown
  - Mobile menu button

- Hero truyen hot
  - Anh/visual truyen noi bat lon
  - Badge `Truyen hot`
  - Ten truyen noi bat
  - Trang thai: Dang ra/Hoan tat
  - Mo ta ngan
  - CTA: Doc ngay, Them vao tu
  - Stats: binh luan/luot doc/danh gia hoac metadata tuong duong

- De cu cho ban
  - Grid/list cac truyen de cu
  - Moi item co cover, title, status, loai dich/convert, mo ta ngan, thoi gian cap nhat
  - Link `Xem tat ca`

- The loai pho bien
  - Tile cho Tien Hiep, Huyen Huyen, Do Thi, He Thong, Ngon Tinh, Kinh Di, Lich Su, Tat ca
  - Moi tile co icon, ten, so luong truyen

- Bang xep hang
  - Tabs: Tuan nay, Thang nay, Tat ca thoi gian
  - List top 10 co rank, cover, title, genre, score/luot doc
  - Link xem bang xep hang day du

- Truyen moi cap nhat
  - List truyen moi update
  - Moi item co cover, title, chuong moi nhat, thoi gian, badge New
  - Link xem tat ca cap nhat

- Truyen moi
  - Grid story cards 5-6 cards tren desktop
  - Moi card co cover, title, genre, rating, luot doc

- Danh cho ban
  - Tabs: Dang doc do, Da luu
  - Continue reading cards co cover, title, chuong dang doc, progress
  - Card kham pha them

- Cong dong noi bat
  - 3 cards: Thao luan soi noi, Fanart & Sang tao, Su kien & Mini game
  - Moi card co icon/illustration, title, mo ta, CTA

- Footer
  - Brand description
  - Social links
  - Kham pha links
  - Ho tro links
  - Cong dong links
  - Newsletter input
  - Copyright
  - Back-to-top button

### 3.2 Trang chi tiet truyen

Trang chi tiet truyen la noi nguoi dung quyet dinh doc/theo doi/mua combo.

Sections:

- Header chung
  - Giong trang chu

- Breadcrumb
  - Trang chu / The loai / Subgenre / Ten truyen

- Story detail hero
  - Poster/cover lon ben trai tren desktop
  - Thong tin ben phai:
    - Badge genre
    - Ten truyen
    - Tac gia
    - Nut Theo doi
    - Trang thai Dang ra
    - Chuong hien tai
    - Rating
    - So luot danh gia
  - Stats cards:
    - Luot doc
    - Luot theo doi
    - So chuong
    - Danh gia
  - CTA:
    - Doc ngay
    - Yeu thich
    - Mua Combo VIP
  - Tags genre/theme

- Gioi thieu truyen
  - Title section
  - 2-3 doan mo ta
  - Nut xem them/rut gon neu noi dung dai

- Danh sach chuong
  - Title
  - Search chapter input
  - Sort A-Z/Z-A
  - Chapter grid 2 cot desktop, 1 cot mobile
  - Moi row co title, time, badge New/Hot/VIP/lock
  - Pagination ranges
  - Legend cho chuong moi, hot, VIP

- Binh luan truyen
  - Title voi tong so comment
  - Comment input
  - Submit button
  - Comment list: avatar, ten, level, noi dung, thoi gian, likes, reply
  - Link xem tat ca binh luan

- Truyen lien quan
  - Horizontal carousel
  - Story cards co cover, title, genre, rating/luot doc
  - Previous/next controls

- Footer chung
  - Giong trang chu

## 4. Component can tao

### Base components

- `PublicHeader`
- `Logo`
- `MainNav`
- `SearchInput`
- `IconButton`
- `UserMenu`
- `MobileMenu`
- `Button`
- `Card`
- `Badge`
- `StatusPill`
- `Tabs`
- `SectionHeader`
- `Footer`
- `NewsletterForm`
- `BackToTopButton`

### Homepage components

- `HomePage`
- `StoryHero`
- `HeroStats`
- `RecommendedStoryList`
- `RecommendedStoryItem`
- `GenreGrid`
- `GenreTile`
- `RankingPanel`
- `RankingItem`
- `UpdatedStoryList`
- `UpdatedStoryItem`
- `StoryCardGrid`
- `StoryCard`
- `ContinueReadingSection`
- `ContinueReadingCard`
- `CommunitySection`
- `CommunityCard`

### Story detail components

- `StoryDetailPage`
- `Breadcrumb`
- `StoryDetailHero`
- `StoryCover`
- `StoryMeta`
- `StoryStats`
- `StoryActions`
- `StoryTagList`
- `StoryDescription`
- `ChapterSection`
- `ChapterToolbar`
- `ChapterList`
- `ChapterRow`
- `Pagination`
- `ChapterLegend`
- `CommentSection`
- `CommentForm`
- `CommentItem`
- `RelatedStoriesCarousel`

### Motion/animation components

Khi chuyen sang framework, them motion library:

- Recommended library: `framer-motion` neu dung React/Vite/Next.
- Alternative cho static/lightweight: `motion` / Motion One.

Motion components/patterns can co:

- Page transition giua Home va Story Detail.
- Stagger animation cho story cards khi section vao viewport.
- Hover lift nhe cho card.
- Button press/tap feedback.
- Dropdown/mobile menu enter/exit animation.
- Carousel slide animation.
- Number/stat fade-up animation.

## 5. Mau sac

Theme chinh thuc va duy nhat la Ruby Noir Romance: silk noir, ruby/rose, champagne gold, serif typography va glassmorphism toi. Khong con theme toggle, query theme hoac localStorage theme.

### Core colors

| Purpose | Token | Value |
| --- | --- | --- |
| Main background / Dark Emerald | `--tm-bg-main` | `#031F1F` |
| Deep background | `--tm-bg-deep` | `#021514` |
| Black depth | `--tm-bg-black` | `#010B0A` |
| Library layer | `--tm-bg-library` | `#082B28` |
| Card surface | `--tm-surface-card` | `rgba(8, 48, 45, 0.78)` |
| Card hover | `--tm-surface-card-hover` | `rgba(11, 70, 65, 0.9)` |
| Primary text / Cream | `--tm-text-primary` | `#F5F1E6` |
| Secondary text | `--tm-text-secondary` | `rgba(245, 241, 230, 0.72)` |
| Muted text | `--tm-text-muted` | `rgba(245, 241, 230, 0.52)` |

### Accent colors

| Purpose | Token | Value |
| --- | --- | --- |
| Mint primary | `--tm-primary` | `#38D4C7` |
| Mint soft | `--tm-primary-soft` | `#A8F0E6` |
| Emerald deep | `--tm-primary-deep` | `#14998F` |
| Warm gold | `--tm-gold` | `#FFD98A` |
| Gold light | `--tm-gold-light` | `#FFE8B6` |
| Lantern accent | `--tm-lantern` | `#FFB86B` |

### Glassmorphism tokens

| Purpose | Token | Value |
| --- | --- | --- |
| Soft border | `--tm-border-soft` | `rgba(168, 240, 230, 0.14)` |
| Medium border | `--tm-border-medium` | `rgba(168, 240, 230, 0.22)` |
| Gold border | `--tm-border-gold` | `rgba(255, 217, 138, 0.28)` |
| Mint glow | `--tm-glow-soft` | `0 0 18px rgba(168, 240, 230, 0.22)` |
| Gold glow | `--tm-glow-gold` | `0 0 24px rgba(255, 217, 138, 0.35)` |

### Usage rules

- Header, cards, menus and rows use translucent emerald glass with `backdrop-filter: blur(18px) saturate(145%)`.
- Primary CTA uses mint gradient.
- Buy/VIP CTA and VIP/rating accents use warm gold.
- Status Dang ra and New badges use mint.
- Hot badges use lantern gold/orange.
- Avoid cyber neon pink, laser lines, RGB glow and hard sci-fi borders.

## 6. Font/typography

Primary font:

- Body/actions: `Be Vietnam Pro`
- Display/headings: `Lora`
- Reading/long description content: `Lora`

Fallback:

- system sans-serif

Reason:

- Match Ruby Noir Romance design guideline.
- Keep Vietnamese text readable in compact novel UI.
- De doc o kich thuoc nho.

Typography scale:

| Role | Desktop | Mobile | Weight |
| --- | --- | --- | --- |
| H1 hero/detail | 32-56px | 30-36px | 700-800 |
| H2 section | 20-25px | 20-22px | 700 |
| H3/card title | 14-16px | 14-16px | 600-700 |
| Body | 14-16px | 14px | 400-500 |
| Metadata | 12-13px | 12px | 400-500 |
| Button | 13-14px | 13-14px | 700 |

Rules:

- Khong dung font-size theo viewport width cho text nho.
- Khong dung letter-spacing am.
- Title dai can clamp/wrap de khong tran card.
- Metadata phai du contrast tren dark background.

## 7. Responsive desktop/tablet/mobile

### Desktop: 1200px+

- Container: 1180-1280px, center.
- Header full nav.
- Homepage hero: 2 cot.
  - Left: hero story lon.
  - Right: recommendation grid.
- Genre: 8 tiles ngang.
- Ranking + Updates: 2 cot.
- Story cards: 5-6 cards ngang.
- Continue reading: 4 cards ngang.
- Community: 3 cards ngang.
- Story detail hero: poster trai, info phai.
- Chapter list: 2 cot.

### Tablet: 768px-1199px

- Header co the giam nav hoac an bot item neu hep.
- Homepage hero chuyen 1 cot neu khong du ngang.
- Genre: 4 cot hoac horizontal scroll.
- Story cards: 3 cot.
- Continue reading: 2 cot.
- Story detail: poster tren hoac trai tuy width, info duoi/phai.
- Chapter list: 2 cot neu du rong, 1 cot neu hep.

### Mobile: 320px-767px

- Header compact:
  - Logo icon.
  - Search compact.
  - Avatar.
  - Menu button.
- Nav chuyen thanh mobile drawer/panel.
- Homepage:
  - Tat ca section chuyen 1 cot.
  - Hero giu height du de visual co cam giac cinematic.
  - Recommendation list 1 cot.
  - Genre horizontal scroll.
  - Story cards horizontal carousel hoac 2-card visible.
  - Ranking list 1 cot.
  - Footer stack 1 cot.
- Story detail:
  - Poster tren, info duoi.
  - Stats grid 2x2.
  - CTA full width hoac sticky bottom.
  - Chapter list 1 cot.
  - Comment form stack hop ly.
- Related stories horizontal carousel.

### 3.3 Trang doc chuong

Trang doc chuong tap trung vao kha nang doc lau, it nhieu va khong bi phan tam.

Sections:

- Breadcrumb ve trang chi tiet truyen.
- Ten truyen, ten chuong va metadata ngan.
- Toolbar:
  - Chuong truoc / chuong sau.
  - Chon chuong trong danh sach mock.
  - Mo tuy chinh doc.
- Noi dung chuong:
  - Cot doc can giua.
  - Do rong dong thoai mai.
  - Font chu ro, line-height rong.
  - Noi dung mock co nhieu doan de kiem tra cuon trang.
- Reader settings:
  - Tang/giam co chu.
  - Chon do rong cot doc.
  - Chon nen Ruby Noir, Sepia hoac Sang.
- Chapter navigation lap lai o cuoi bai.

Responsive:

- Desktop: noi dung toi da 760-860px, toolbar sticky ben duoi header.
- Tablet: toolbar co the wrap, cot doc giu khoang trong.
- Mobile: noi dung full width co padding, nut chuong truoc/sau de bam, khong overflow.

Boundaries:

- Dung mock data trong `app.js`.
- Khong luu setting hoac reading progress vao backend/localStorage trong task nay.
- Khong them auth, payment hoac khoa VIP that.
- Khong cai dependency moi.

## 8. Interaction

### Navigation

- Click logo/trang chu ve homepage.
- Click story card/hero CTA mo story detail.
- Hash routing hoac real route sau khi dung framework.
- Section anchors tren homepage phai cuon dung section.

### Search

- Global search input co shortcut `Ctrl K`.
- `Ctrl K` focus input.
- Submit bang GET den `/tim-kiem?q=...`; ket qua lay qua Supabase RPC theo ten truyen, synopsis
  va tac gia.
- Cursor phan trang dung `(rank, id)` trong URL.

### Header

- Mobile menu open/close.
- User dropdown open/close.
- Escape dong dropdown/menu.
- Notification/bookmark icon co hover/focus state.

### Homepage

- Ranking tabs doi dataset hien thi.
- Library tabs doi giua Dang doc do/Da luu.
- Story cards co hover lift nhe.
- CTA buttons co hover/tap feedback.

### Story detail

- Chapter search filter theo keyword.
- Chapter sort A-Z/Z-A.
- Locked VIP chapter click hien trang thai yeu cau VIP trong future.
- Comment submit mock them comment moi.
- Related carousel previous/next.
- Back-to-top scroll len dau.

### Reader page

- Click chapter row, `Doc ngay`, `Doc tiep` hoac mobile CTA mo `#reader`.
- Chon chuong cap nhat title va noi dung mock.
- Nut chuong truoc/sau cap nhat chuong va scroll len dau noi dung.
- Phim mui ten trai/phai chuyen chuong khi focus khong nam trong control.
- Tang/giam co chu trong gioi han an toan.
- Doi do rong cot doc va nen doc.
- Focus duoc dua den tieu de chuong khi mo bang ban phim.

### Motion

Motion can tinh te, khong lam cham UI:

- Page transition: fade + slight y movement 120-220ms.
- Cards enter viewport: stagger 40-70ms/item.
- Hover lift: translateY(-2px) + border glow nhe.
- Button tap: scale 0.98.
- Drawer/dropdown: opacity + y/height transition 160-220ms.
- Respect `prefers-reduced-motion`: tat animation lon neu user yeu cau.

## 9. Du lieu mau can co

### Story

Moi story can co:

- `id`
- `slug`
- `title`
- `author`
- `cover`
- `genre`
- `subGenres`
- `status`
- `description`
- `latestChapter`
- `latestChapterTitle`
- `updatedAt`
- `readCount`
- `followCount`
- `chapterCount`
- `rating`
- `ratingCount`
- `tags`
- `isVip`
- `isHot`
- `isNew`

### Chapter

Moi chapter can co:

- `id`
- `storyId`
- `number`
- `title`
- `updatedAt`
- `isVip`
- `isHot`
- `isNew`
- `isLocked`

### Comment

Moi comment can co:

- `id`
- `storyId`
- `userName`
- `userAvatar`
- `userLevel`
- `content`
- `createdAt`
- `likeCount`
- `replyCount`

### Genre

Moi genre can co:

- `id`
- `name`
- `icon`
- `storyCount`
- `color`

### User reading item

Moi reading item can co:

- `storyId`
- `title`
- `cover`
- `currentChapter`
- `progressPercent`
- `updatedAt`

### Homepage data groups

Trang chu can co cac dataset mock:

- `featuredStory`
- `recommendedStories`
- `popularGenres`
- `rankingStories`
- `latestUpdates`
- `newStories`
- `continueReading`
- `savedStories`
- `communityCards`

## 10. Thu vien motion

### Decision

Them motion library trong buoc chuyen sang framework hoac khi can animation nang cao.

Recommended:

```text
framer-motion
```

Neu giu static HTML/CSS/JS:

```text
motion
```

### Khi nao them

Them sau khi xac nhan dung framework hoac xac nhan cho phep cai dependency npm. Hien tai chua code them vi user yeu cau chi viet spec.

### Motion acceptance

- Animation khong lam layout shift.
- Animation khong gay giat o mobile.
- Co fallback cho `prefers-reduced-motion`.
- Khong animate qua nhieu element cung luc.
- Motion phuc vu feedback va polish, khong che noi dung.

## 11. Tieu chi hoan thanh

### UI completion

- Trang chu co day du section trong spec.
- Trang chi tiet co day du section trong spec.
- Header/footer dung chung va nhat quan.
- Visual bam sat uploaded design: dark, premium, card-based, novel-focused.
- Story cards, ranking, chapter list, comments co du data mock.

### Responsive completion

- 1440px: layout desktop day du, can doi.
- 1024px: khong tran, grid giam cot hop ly.
- 768px: tablet dung duoc, section khong vo.
- 390px: mobile dep, CTA/story card doc duoc.
- 320px: khong co horizontal overflow bat thuong.

### Interaction completion

- `Ctrl K` focus search.
- Mobile menu hoat dong.
- User dropdown hoat dong.
- Home/story navigation hoat dong.
- Tabs ranking va library hoat dong.
- Chapter search/sort hoat dong.
- Comment mock submit hoat dong.
- Carousel controls hoat dong.
- Back-to-top hoat dong.
- Reader route, chapter navigation va reader settings hoat dong.

### Accessibility completion

- Tat ca button icon-only co accessible label.
- Inputs co label.
- Tab order hop ly.
- Focus visible ro.
- Text contrast dat muc chap nhan duoc tren dark background.
- Co skip link.
- Motion ton trong `prefers-reduced-motion`.

### Verification completion

- JavaScript syntax pass: `node --check app.js`.
- Browser console khong co error.
- Visual QA pass tren desktop/tablet/mobile.
- `docs/PROGRESS.md` duoc cap nhat sau moi task.
- `docs/TASKS.md` danh dau task da hoan thanh/chua lam.

## 12. Assumptions da xac nhan

- Lam public website truoc.
- Dung mock data truoc.
- Bam visual rat sat.
- Ruby Noir Romance la theme duy nhat.
- Chua code them o buoc spec nay.

## 13. Open questions cho phase tiep theo

- Da chot chuyen sang Next.js App Router + TypeScript.
- Da chot Supabase PostgreSQL + Auth + Storage; xem `BACKEND_SPEC.md`.
- Co copy/upload asset anh that vao project de thay cover CSS mock khong?
- Payment/VIP entitlement se dung provider va rule nao?
- Auth phase dau da chot email/password; Google OAuth de phase sau.
