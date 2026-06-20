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
    tim-kiem/page.tsx
    story/page.tsx
    truyen/[slug]/page.tsx
    truyen/[slug]/[chapterSlug]/page.tsx
    reader/page.tsx
  components/prototype-shell.tsx
  lib/prototype-markup.ts
  lib/queries/homepage.ts
  lib/queries/search.ts
  lib/supabase/
    public-env.ts
    browser.ts
    server.ts
    admin.ts
  types/database.ts
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
- `migrations/`: schema catalog, indexes, grants, RLS va search RPC.
- `seed.sql`: data catalog deterministic cho Home/Story/Reader.
- `tests/catalog.sql`: SQL assertions cho RLS, indexes, search va visibility boundary.

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
