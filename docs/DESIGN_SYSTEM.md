# Design System: NovelVerse

## Design Direction

NovelVerse dung phong cach Ruby Noir Romance premium:

- Nen silk noir gan den, ruby grain nhe.
- Card ruby glass co border rose mong.
- Accent ruby/rose cho brand, active state va CTA.
- Champagne/gold cho nap vang, VIP va currency.
- Green cho trang thai Full/Free va nut Doc Tiep.
- Anh bia truyen la diem nhan lon.
- Khong co theme toggle; Ruby Noir la theme duy nhat.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#06030a` | Nen chinh |
| `--bg-deep` | `#030106` | Nen sau/footer |
| `--surface` | `#210716` | Card |
| `--surface-2` | `#160712` | Card layer 2 |
| `--surface-3` | `#2a0a1c` | Hover/raised |
| `--border` | `rgba(244, 114, 182, 0.3)` | Border |
| `--text` | `#fff4f7` | Text chinh |
| `--text-soft` | `rgba(255, 228, 238, 0.74)` | Text phu |
| `--muted` | `rgba(223, 197, 207, 0.56)` | Metadata |
| `--violet` | `#e11d48` | Ruby primary |
| `--violet-2` | `#f472b6` | Rose hover/accent |
| `--pink` | `#ff3d8d` | Hot/accent |
| `--green` | `#16a34a` | Full/Free/Doc Tiep |
| `--amber` | `#f59e0b` | VIP/currency |
| `--red` | `#fb7185` | Alert |

## Typography

Font display va body hien tai: `Lora`, fallback `Be Vietnam Pro`/system serif-sans.

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
