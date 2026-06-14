# Design System: NovelVerse

## Design Direction

NovelVerse dung phong cach dark fantasy premium:

- Nen toi, gan den.
- Card toi co border mong.
- Accent tim/violet cho brand va CTA.
- Pink/orange cho hot, combo, VIP.
- Green cho trang thai dang ra.
- Anh bia truyen la diem nhan lon.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#070a13` | Nen chinh |
| `--bg-deep` | `#050710` | Nen sau/footer |
| `--surface` | `#111624` | Card |
| `--surface-2` | `#151a2a` | Card layer 2 |
| `--surface-3` | `#1a2032` | Hover/raised |
| `--border` | `#252b3d` | Border |
| `--text` | `#f8fafc` | Text chinh |
| `--text-soft` | `#c7c9d4` | Text phu |
| `--muted` | `#8a91a6` | Metadata |
| `--violet` | `#7c3aed` | Brand/CTA |
| `--violet-2` | `#8b5cf6` | Hover/accent |
| `--pink` | `#ec4899` | Hot/accent |
| `--green` | `#22c55e` | Dang ra/success |
| `--amber` | `#f59e0b` | VIP/rating |
| `--red` | `#f43f5e` | Hot/alert |

## Typography

Font chinh: `Be Vietnam Pro`.

Guideline:

- H1 homepage/detail: 32-56px tuy viewport.
- H2 section: 20-25px.
- Card title: 14-16px, semibold/bold.
- Body: 14px.
- Metadata: 12-13px.

Khong dung letter spacing am. Text dai can clamp hoac wrap.

## Radius and Spacing

- Card/button radius: 8px.
- Container desktop: toi da 1240px.
- Section gap desktop: 24px.
- Section gap mobile: 16px.
- Card padding desktop: 20px.
- Card padding mobile: 16px.

## Components

Base:

- Header
- Search input
- Icon button
- Button primary/ghost/buy
- Card
- Badge/pill/status
- Tabs
- Footer

Homepage:

- Hero story card
- Recommendation item
- Genre tile
- Ranking item
- Update item
- Story card
- Continue reading card
- Community card

Story detail:

- Breadcrumb
- Cover card
- Story stats
- Tag list
- Chapter row
- Comment item
- Related carousel

## Responsive Rules

- Desktop: grid 2 cot cho hero va ranking/update.
- Tablet: giam so cot story card/category.
- Mobile: section xep 1 cot; story cards va category co horizontal scroll khi can.
- Detail page mobile: poster tren, info duoi, CTA sticky bottom.

## Accessibility Rules

- Interactive element phai la `button` hoac `a`.
- Icon-only button phai co `aria-label`.
- Input phai co label an bang `.sr-only`.
- Co skip link.
- Heading khong bo qua cap quan trong.
- Khong chi dua vao mau de truyen tai trang thai; can text/icon.
