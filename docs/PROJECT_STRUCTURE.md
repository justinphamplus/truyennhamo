# Project Structure

## Current Files

```text
package.json
next.config.ts
playwright.config.ts
src/
  app/
    layout.tsx
    page.tsx
    auth/
      actions.ts
      confirm/route.ts
      logout/route.ts
    dang-ky/page.tsx
    dang-nhap/page.tsx
    tai-khoan/page.tsx
    tim-kiem/page.tsx
    story/page.tsx
    truyen/[slug]/page.tsx
    truyen/[slug]/[chapterSlug]/page.tsx
    reader/page.tsx
  components/prototype-shell.tsx
  components/auth/
  lib/prototype-markup.ts
  lib/auth/
  lib/queries/homepage.ts
  lib/queries/search.ts
  lib/supabase/
    public-env.ts
    browser.ts
    server.ts
    admin.ts
  types/database.ts
  proxy.ts
public/
  app.js
  assets/
  bia-truyen/
index.html
styles.css
app.js
tests/
supabase/
  config.toml
  migrations/
  seed.sql
  tests/catalog.sql
docs/
```

## File Responsibilities

### `src/app/`

Chua Next.js App Router:

- `/`: homepage.
- `/tim-kiem`: server-rendered search results backed by the `search_stories` RPC.
- `/dang-ky` and `/dang-nhap`: email/password Auth forms backed by Server Actions.
- `/tai-khoan`: protected profile page; authenticated users can edit only their own row.
- `/auth/confirm`: email confirmation token exchange.
- `/auth/logout`: POST endpoint used by the prototype header menu.
- `/truyen/[slug]`: canonical dynamic story detail and keyset-paginated chapter list.
- `/truyen/[slug]/[chapterSlug]`: canonical Reader with RLS-protected free content and locked VIP
  metadata.
- `/story` and `/story/[slug]`: compatibility redirects to `/truyen`.
- `/reader`: compatibility redirect to the seeded latest chapter.
- Root metadata, font stylesheet va legacy interaction script.

### `src/components/prototype-shell.tsx`

Server Component render prototype markup hien tai trong App Router.

### `src/lib/prototype-markup.ts`

Doc markup tu `index.html`, chuyen hash page links sang pathname va danh dau route dang active.

### `src/lib/supabase/`

Chua client boundaries:

- `browser.ts`: browser singleton voi publishable key.
- `server.ts`: SSR/Server Component client voi Next.js cookie store.
- `admin.ts`: privileged lazy client, chi duoc import tu server.
- `public-env.ts`: validate hai public environment variables khi client duoc tao.
- `proxy.ts`: refresh session cookies before Server Components read Auth state.

### `src/lib/auth/`

- `current-user.ts`: validate session with Supabase Auth and load the current RLS profile.
- `validation.ts`: Zod schemas shared by signup, login and profile Server Actions.

### `src/lib/queries/homepage.ts`

Typed Server Component query cho Homepage. Chuyen database rows thanh payload hien thi featured,
latest, ranking, hot, completed va genres; chi doc published rows qua RLS.

### `src/lib/queries/story-detail.ts`

Typed Server Component query cho Story Detail. Doc published story theo slug, author/genres va
chapter metadata qua RLS; chapter list dung keyset cursor `before`/`after`.

### `src/lib/queries/reader.ts`

Typed Reader query. Luon doc published story/chapter metadata; chi query `chapter_contents` khi
chapter la Free. VIP payload tra `content: null`, trong khi RLS tren database van chan body.

### `src/lib/queries/search.ts`

Typed search query goi Supabase RPC `search_stories`. Query, rank va id cursor nam trong URL;
payload chi chua published stories ma publishable SSR client duoc phep doc.

### `src/lib/queries/library.ts`

Typed personalized queries cho bookmark state va danh sach `/tu-truyen`. Moi query loc `user_id`
tuong minh de RLS co the dung index hieu qua.

### `src/lib/queries/reading-progress.ts`

Typed personalized queries cho progress cua mot story va reading history. Embedded relation dung
composite FK de chapter/story luon nhat quan.

### `src/app/reading-progress/actions.ts`

Server-only validation va atomic upsert cho reading progress. User id luon lay tu authenticated
session; client khong duoc tu chon owner.

### `src/app/api/reading-progress/route.ts`

Internal POST boundary cho background autosave. Route Handler tranh RSC refresh lam reset legacy
Reader DOM trong khi van tai su dung server-side validation/RLS.

### `src/app/bookmarks/actions.ts`

Server Action cho follow/unfollow. Mutation validate input, re-check authenticated user, dung
upsert/delete idempotent va revalidate cac route lien quan.

### `src/app/tu-truyen/page.tsx`

Protected Server Component page cho tủ truyện. Co URL tab `reading`/`saved`, reading history,
bookmark list va empty states; khong shared-cache du lieu ca nhan.

### `src/components/library/`

Client interaction nho cho optimistic follow controls tren Story Detail va remove action trong
user library; reading history list render resume URL va accessible progressbar.

### `src/components/reader/reading-progress-tracker.tsx`

Client island nho cho debounce autosave, periodic flush, save status va restore vi tri Reader.

### `src/types/database.ts`

Generated types tu local Supabase schema. Khong sua tay; chay `npm run db:types` sau migration.

### `index.html`

Tam thoi la source markup cua public website trong giai doan migration:

- Header.
- Homepage.
- Story detail page.
- Footer.
- Mobile CTA.

Dung cac `data-*` attribute de JavaScript gan interaction va render mock data.

### `styles.css`

Chua toan bo UI styling:

- CSS variables.
- Layout desktop/mobile.
- Component styles.
- Cover art CSS mock.
- Responsive breakpoints.

### `app.js` va `public/app.js`

Chua:

- Mock data stories, genres, chapters, comments.
- Render functions.
- Path routing.
- UI interactions.

### `docs/`

Chua tai lieu du an:

- `README.md`
- `SPEC.md`
- `IMPLEMENTATION_PLAN.md`
- `TASKS.md`
- `PROGRESS.md`
- `DESIGN_SYSTEM.md`
- `PROJECT_STRUCTURE.md`
- `DECISIONS.md`
- `TEST_PLAN.md`

### `supabase/`

Chua local backend workflow:

- `config.toml`: Supabase local services va PostgreSQL 17.
- `migrations/`: schema catalog/user data, indexes, grants, RLS va search RPC.
- `seed.sql`: data catalog deterministic cho Home/Story/Reader.
- `tests/catalog.sql`: SQL assertions cho RLS, indexes, search, Auth/profile va bookmark isolation.

## Next Refactor Direction

Sau khi Supabase catalog contract san sang, tach dan prototype shell thanh component React theo vertical slice:

```text
src/
  components/
    base/
    home/
    story/
  data/
    mock-stories.ts
  app/
    page.tsx
    story/page.tsx
    reader/page.tsx
  styles/
    tokens.css
    global.css
```

Khong refactor dong loat trong task migration de tranh visual regression.
