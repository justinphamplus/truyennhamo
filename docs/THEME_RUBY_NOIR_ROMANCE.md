# Theme Spec: Ruby Noir Romance

Cap nhat: 2026-06-17

## 1. Muc tieu theme

Ruby Noir Romance la theme thu hai cho public website, khong thay the theme hien tai.

Muc tieu:

- Tao giao dien phu hop hon voi web doc truyen ngon tinh, dac biet cac nhom truyen tong tai, cuoi truoc yeu sau, drama, co dai, sung/nguc.
- Tao mot trai nghiem Ruby Noir rieng, co the doi layout, section order va density de bam sat visual Ruby Noir da chon.
- Giu theme hien tai nhu default de co the chuyen qua lai va so sanh nhanh giua theme cu va Ruby Noir.
- Them nut doi theme tren nav de nguoi dung co the chuyen qua lai giua theme hien tai va Ruby Noir.
- Van giu cam giac premium, toi, nhieu anh bia truyen, nhung bot chat fantasy/teal va chuyen sang noir romance: den, do ruby, hong rose, vang champagne.

Pham vi theme:

- Duoc doi visual system: mau sac, nen, border, glow, glass, button, badge, card, section, nav.
- Duoc doi layout chinh, section order, component composition va spacing rieng cho Ruby Noir de giong visual da chon.
- Duoc them behavior phu tro cho Ruby Noir neu can: carousel density, section toggle, card hover, sticky/detail actions.
- Routing hien co phai tiep tuc dung duoc. Neu Ruby Noir can layout rieng cho home/detail, nen render theo theme tren cung route thay vi pha luong dieu huong.
- Khong doi data domain, khong doi schema mock data neu khong can.
- Khong doi backend vi hien tai van la static prototype/mock data.

## 2. Dinh huong visual

Ten theme: `Ruby Noir Romance`

Tinh cach:

- Mature romance
- Noir, dramatic, sang hon la de thuong
- Hop truyen ngon tinh co drama, ham chiem huu, tong tai, co dai, nu cuong
- Nhieu contrast giua nen den va accent ruby
- Anh bia truyen la tam diem, UI khong can tranh minh hoa mascot

Khong nen:

- Khong dung teal/emerald lam mau chinh.
- Khong dung nen thu vien ma thuat/fantasy qua manh.
- Khong dung mascot, hoa la qua nhieu, icon qua cute.
- Khong bien thanh landing page marketing.
- Khong lam UI qua sang mau.

## 3. Theme architecture de xuat

Ruby Noir khong chi la CSS skin. Theme nay la mot layout variant rieng cho public site, nhung van nam trong cung app de toggle nhanh voi default theme.

Huong trien khai:

- Theme hien tai la default.
- Them `data-theme="ruby-noir"` tren `document.documentElement` hoac `body`.
- Dung CSS custom properties de override mau:
  - `:root` giu token theme hien tai.
  - `[data-theme="ruby-noir"]` override token cho theme moi.
- Them layout mode cho Ruby Noir:
  - Co the dung `data-layout="ruby-noir"` tren body/root.
  - Hoac tach render function rieng: `renderDefaultHome()` va `renderRubyNoirHome()`.
  - Detail page co the co `renderDefaultStoryDetail()` va `renderRubyNoirStoryDetail()`.
- Nen tai su dung data va component nho, nhung cho phep compose lai section de bam visual Ruby Noir.
- Nut doi theme tren nav:
  - Desktop: icon palette hoac nut nho gan search/gold balance.
  - Mobile: icon button trong header action.
  - Click de toggle giua `default` va `ruby-noir`.
- Luu lua chon vao `localStorage` voi key `novelverse-theme`.

Trang thai theme:

| Theme id | Ten hien thi | Mo ta |
| --- | --- | --- |
| `default` | Mac dinh | Theme hien tai cua website |
| `ruby-noir` | Ruby Noir | Theme ngon tinh toi, ruby/champagne |

## 4. Ruby Noir layout direction

Layout Ruby Noir can bam visual da chon, khong bi rang buoc boi section order hien tai.

### Home page

Thu tu section de xuat:

1. Header Ruby Noir
2. Hero truyen noi bat dang editorial
3. Truyen moi ra dang carousel ngang co nut mui ten dieu huong
4. Split row: Truyen hot card grid ben trai + Cap nhat moi list compact ben phai
5. Split row: Bang xep hang ben trai + The loai noi bat ben phai
6. Truyen da hoan thanh dang carousel/grid ngang
7. Footer Ruby Noir

Hero Ruby Noir:

- Nen toi ruby/noir voi diagonal light trails.
- Text, meta va CTA o ben trai.
- Anh truyen lon nam trong nua phai hero, dong vai tro nhu background editorial chu khong phai poster card dung doc nhu default.
- Co thumbnail rail doc ben phai de xem cac truyen noi bat khac.
- Co nut dieu huong trai/phai va dots carousel o giua duoi hero.
- Hot badge nam o cum text ben trai; khong dat rank badge lon tren poster nhu default.
- Khong dung mascot, khong dung background thu vien xanh/teal.

Header Ruby Noir:

- Compact, toi, glass, border rose mong.
- Logo + nav + search + nap vang + so xu + notification + avatar + theme toggle.
- Mobile uu tien action row gon: search icon, nap vang, so xu, notification, avatar, menu.

Section cards:

- Ruby Noir duoc phep dung card layout khac default:
  - Card nho hon, nhieu cover hon.
  - Truyen hot la grid 5 cot trong cot trai.
  - Moi cap nhat co the la list compact 2 cot.
  - Bang xep hang co the co rank column va list table-like.
- Section Truyen hot co rank badge tren anh bia tung truyen, giong visual reference.
- Cac section khong nam trong visual Ruby Noir, vi du library/dang doc do hoac mascot suggestion, co the an di trong theme Ruby Noir.

### Story detail page

Detail Ruby Noir:

- Hero/detail panel noi bat: cover ben trai, thong tin ben phai, nen ruby/noir glass.
- CTA gom `Doc truyen`, `Yeu thich`, `Mua combo VIP`.
- Stats va tags compact, uu tien de khong tran panel.
- Section VIP upgrade co the dung champagne/ruby gradient.
- Gioi thieu truyen nam sau hero/VIP panel.
- Danh sach chuong desktop giu 2 cot, mobile 1 cot.
- Binh luan va truyen lien quan dung card glass ruby/noir.

### Routing and behavior

- Route hien co van phai vao dung page.
- Khi theme Ruby Noir dang bat, cung URL co the render layout Ruby Noir.
- Theme toggle khong duoc reset route hien tai.
- Neu dang o detail page, toggle theme phai giu lai story dang xem.
- Carousel/dots/hover co the khac default neu can de giong visual Ruby Noir.

## 5. Color tokens

Ruby Noir nen dung bo mau rieng sau:

| Token | Value | Use |
| --- | --- | --- |
| `--rn-bg` | `#06030a` | Nen goc gan den |
| `--rn-bg-deep` | `#030106` | Nen sau/footer |
| `--rn-bg-soft` | `#100712` | Nen phu |
| `--rn-surface` | `rgba(22, 7, 18, 0.62)` | Card/section glass |
| `--rn-surface-strong` | `rgba(34, 10, 24, 0.78)` | Header, modal, mobile drawer |
| `--rn-surface-soft` | `rgba(225, 29, 72, 0.08)` | Hover/soft accent |
| `--rn-border` | `rgba(244, 114, 182, 0.22)` | Border card |
| `--rn-border-strong` | `rgba(244, 114, 182, 0.42)` | Active/hover border |
| `--rn-text` | `#fff4f7` | Text chinh |
| `--rn-text-soft` | `#dfc5cf` | Text phu |
| `--rn-muted` | `#9b7f8c` | Metadata |
| `--rn-ruby` | `#e11d48` | Accent chinh, active nav, hot |
| `--rn-rose` | `#f472b6` | Hover, badge, highlight |
| `--rn-pink` | `#ff3d8d` | CTA doc ngay, neon glow |
| `--rn-champagne` | `#f6c76b` | Gold, VIP, rating |
| `--rn-amber` | `#f59e0b` | Coin, purchase CTA |
| `--rn-green` | `#34d399` | Dang ra/free/success |
| `--rn-danger` | `#fb7185` | Error/hot alert |

### Mapping token hien tai sang Ruby Noir

| Current token | Ruby Noir mapping |
| --- | --- |
| `--bg` | `--rn-bg` |
| `--bg-deep` | `--rn-bg-deep` |
| `--surface` | `--rn-surface` |
| `--surface-2` | `--rn-surface-strong` |
| `--border` | `--rn-border` |
| `--text` | `--rn-text` |
| `--text-soft` | `--rn-text-soft` |
| `--muted` | `--rn-muted` |
| `--violet` | `--rn-ruby` |
| `--pink` | `--rn-rose` |
| `--amber` | `--rn-champagne` |
| `--green` | `--rn-green` |

## 6. Background direction

Nen website:

- Nen tong the: den cherry/ruby gan den.
- Dung huong `Silk Noir + Ruby Grain nhe`: nen den ruby nhu lua satin, co nep sang mem va hat grain rat nho.
- Tranh cac vet neon dai qua ro; neu co duong cheo thi chi la nep sang mo, opacity thap.
- Nen co glow rat nhe o goc phai/trai, tao chieu sau.
- Card/section trong suot hon de thay nen phia sau.
- Co the dung CSS radial/linear gradient truoc, chua can anh nen moi neu muon toi uu.

Nen goi y:

```css
background:
  radial-gradient(circle at 16% 8%, rgba(225, 29, 72, 0.18), transparent 28rem),
  radial-gradient(circle at 84% 18%, rgba(244, 114, 182, 0.1), transparent 24rem),
  linear-gradient(118deg, rgba(255, 244, 247, 0.035) 0 10%, transparent 15% 30%, rgba(133, 18, 52, 0.12) 38%, transparent 52%),
  linear-gradient(180deg, #07020a 0%, #13050f 48%, #040106 100%);
```

Hero:

- Hero nen theo layout Ruby Noir: text trai, cover/cum cover lon phai, nen editorial rong va dramatic.
- Background hero nen co ruby glow sau cover va fade toi ben trai de chu doc tot.
- Cover truyen nen noi hon bang border rose/champagne glow.
- Rank badge tren cover nen ruby/pink, khong dung gold qua vang neu khong can.

## 7. Typography

Giu font hien tai neu dang dung tot voi tieng Viet.

De xuat:

- Body/UI: `Be Vietnam Pro`, fallback `Inter`, sans-serif.
- Heading hero/detail: co the dung font serif display neu da co san an toan, vi Ruby Noir hop romance:
  - Option an toan: tiep tuc `Be Vietnam Pro`, weight 800.
  - Option dep hon: them `Playfair Display` hoac `Cormorant Garamond` cho H1/H2 neu sau nay chap nhan them font.
- Khong bat buoc doi font o phase dau de tranh lam vo layout.

Scale:

| Element | Desktop | Mobile |
| --- | --- | --- |
| Hero H1 | 42-56px | 30-36px |
| Detail H1 | 38-48px | 28-34px |
| Section H2 | 22-28px | 20-24px |
| Card title | 13-16px | 13-15px |
| Metadata | 12-13px | 12px |

## 8. Component style

### Header

- Nen header: `rgba(6, 3, 10, 0.78)` voi blur.
- Border bottom: ruby/rose rat mong.
- Active nav: underline hoac pill ruby.
- Theme toggle button:
  - Icon: palette/swatch/moon-sparkle.
  - Tooltip/aria-label: `Doi theme`.
  - State active Ruby: vien rose + glow nhe.

### Search

- Nen search: dark glass.
- Border rose translucent.
- Focus: rose glow.
- `Ctrl K` badge: nen den ruby, text champagne/soft.

### Buttons

Primary read:

- Background: ruby to pink gradient.
- Text: white/cream.
- Shadow: ruby glow nhe.

Buy/VIP:

- Background: champagne to amber.
- Text: near black.
- Shadow: amber glow.

Ghost:

- Transparent dark glass.
- Border rose translucent.
- Hover: rose tint.

### Cards/sections

- Surface: glass den cherry, alpha thap.
- Border: rose translucent.
- Hover: border sang hon, transform nhe `translateY(-1px)`.
- Khong nen dung nen xanh/teal.

### Story cards

- Cover 2:3 giu nguyen.
- Border cover: rose translucent.
- Hover card: cover glow ruby/champagne.
- Badge `Full`: rose hoac green tuy nghia:
  - Full/Free: green neu can phan biet trang thai mien phi.
  - Hot: ruby/pink.
  - VIP: champagne.

### Chapter rows

- Desktop van 2 cot.
- Row VIP:
  - Border/top accent champagne.
  - Star/currency/lock mau champagne.
- Free:
  - Tag green nhe.
- Row hover:
  - Ruby tint rat nhe.

### Footer

- Nen footer: gan den, co ruby glow rat nhe.
- Link hover: rose.
- Newsletter CTA: ruby button.

## 9. Theme toggle interaction

Yeu cau:

- Nut doi theme nam tren nav.
- Click toggle theme giua current va Ruby Noir.
- Luu theme vao `localStorage`.
- Khi reload, giu theme da chon.
- Neu `localStorage` khong co, dung default theme hien tai.

Pseudo behavior:

```js
const theme = localStorage.getItem("novelverse-theme") || "default";
document.documentElement.dataset.theme = theme;

toggleButton.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "ruby-noir" ? "default" : "ruby-noir";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("novelverse-theme", next);
});
```

Accessibility:

- Button co `aria-label="Doi theme"`.
- Button co `aria-pressed="true"` khi Ruby Noir dang bat.
- Keyboard focus visible.

## 10. Responsive behavior

Desktop:

- Ruby Noir duoc phep dung layout khac default de giong visual reference.
- Hero cover phai noi bat hon vi bìa truyen ngon tinh da rat dep.
- Card glass trong hon nen nen phia sau can du toi de text doc duoc.

Tablet:

- Giu grid nhu hien tai.
- Neu section qua trong, tang alpha surface rieng tablet/mobile mot chut.

Mobile:

- Header can gon, theme toggle la icon button.
- Hero cover o tren hoac nam trung tam tuy visual Ruby Noir, text/CTA ben duoi va khong tran ngang.
- Bia truyen that nen duoc giu 2:3, khong crop qua muc.
- Neu background line neon lam roi, giam opacity line o mobile.

## 11. Data/assets

Can giu:

- Thu muc `bia-truyen/` dung lam cover that cho visual.
- Background hien tai co the giu cho default theme.
- Ruby Noir co the dung CSS gradient truoc.

Neu can asset rieng sau nay:

- `assets/ruby-noir-bg.webp`
- `assets/ruby-noir-hero-bg.webp`

Asset yeu cau:

- Nen dung WebP.
- Nen duoi 250KB moi file neu co the.
- Khong commit screenshot/visual audit.

## 12. Acceptance criteria

Theme Ruby Noir duoc xem la dat khi:

- Co the chuyen qua lai giua default theme va Ruby Noir bang nut nav.
- Theme default khong bi thay doi ngoai y muon va van giu layout hien tai.
- Ruby Noir ap dung tren ca home va detail page.
- Ruby Noir co layout/section order rieng, giong visual Ruby Noir hon thay vi chi doi mau.
- Toggle theme doi dung visual va layout ma khong lam mat route hien tai.
- Cac section, card, chapter, button, badge, header, footer deu doi mau dong bo.
- Anh bia truyen that van hien thi dung ti le 2:3.
- Text khong bi kho doc tren nen toi.
- Mobile khong tran ngang o 320px/390px.
- Build/static check khong loi.

## 13. Test plan cho theme

Can kiem tra:

- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px va 320px
- Home page va detail page
- Toggle theme bang mouse
- Toggle theme bang keyboard
- Reload page van giu theme da chon
- Bia truyen trong:
  - Hero
  - De cu
  - Bang xep hang
  - Truyen moi cap nhat
  - Trang chi tiet
  - Truyen lien quan

## 14. Implementation notes

Thu tu code de xuat sau khi spec nay duoc chap nhan:

1. Ghi nhan baseline default theme hien tai de tranh sua nham.
2. Them theme toggle UI tren header.
3. Them JS doc/luu `localStorage` theme va giu route hien tai khi toggle.
4. Them CSS token block `[data-theme="ruby-noir"]`.
5. Tach layout rendering cho Ruby Noir neu can:
   - Home: render section order Ruby Noir.
   - Detail: render detail hero/chapter/comment theo Ruby Noir.
6. Style header, hero, cards, chapter rows, footer theo Ruby Noir.
7. Kiem tra screenshot desktop/mobile va so sanh voi visual Ruby Noir.
8. Dieu chinh layout, opacity, spacing theo screenshot.
9. Commit rieng cho theme toggle + Ruby Noir.

Ghi chu:

- Nen giu theme default tach bach de rollback/so sanh nhanh.
- Ruby Noir duoc phep doi layout, nhung khong nen rewrite data layer hoac mock data neu khong can.
- Neu mot thay doi chi phuc vu Ruby Noir, scope bang `data-theme="ruby-noir"` hoac render branch rieng de tranh anh huong default.
