# Backend Implementation Tasks

Source of truth: `BACKEND_SPEC.md`.

## Phase B0: Framework And Local Tooling

- [x] B0.1 Scaffold Next.js App Router in current repository
  - Acceptance: current Home/Story/Reader visual runs in Next.js routes without feature regression.
  - Verify: `npm run build`, browser QA 320/1440.
  - Files: Next scaffold, `src/app`, migrated assets/styles.
  - Completed: 2026-06-19. QA expanded to 320/768/1024/1440 for all three routes.

- [x] B0.2 Initialize Supabase local workflow
  - Acceptance: `supabase/config.toml`, migrations folder and seed file exist.
  - Verify: `npx supabase start`, `npx supabase db reset`.
  - Files: `supabase/config.toml`, `supabase/migrations`, `supabase/seed.sql`.
  - Completed: 2026-06-19 with Supabase CLI 2.107.0 and PostgreSQL 17.

## Phase B1: Catalog Schema

- [x] B1.1 Create authors, genres, stories and story_genres
  - Acceptance: constraints, FK indexes, published-read RLS and grants match spec.
  - Verify: anon sees published stories only; draft is hidden; advisors clean.

- [x] B1.2 Create chapters and chapter_contents
  - Acceptance: metadata is public for published chapters; free body readable; VIP body inaccessible.
  - Verify: role tests for anon/authenticated/admin.

- [x] B1.3 Add search and catalog indexes
  - Acceptance: generated search vector, GIN index, keyset indexes and search RPC exist.
  - Verify: search title/author/synopsis; inspect query plans.

- [x] B1.4 Seed representative content
  - Acceptance: Home, Story and Reader have realistic data including free/VIP metadata.
  - Verify: reset produces deterministic usable dataset.

Phase B1 completed 2026-06-19:

- `supabase db reset --local` passes from a clean database.
- SQL role tests verify table counts, RLS, indexes, draft isolation, VIP body isolation,
  free-body access and author search.
- Data API verification returns 9 published stories, 0 drafts and 0 VIP bodies for the publishable
  client.
- Supabase security and performance advisors report no issues.

## Phase B2: Public Frontend Integration

- [x] B2.1 Add Supabase clients and generated database types
  - Acceptance: separate browser, SSR user and admin server clients.
  - Verify: build passes; secret client cannot enter client bundle.
  - Completed: 2026-06-19 with generated `Database` types, publishable browser/SSR clients and a
    lazy server-only admin client.

- [x] B2.2 Connect homepage
  - Acceptance: featured/latest/hot/completed/genres use database.
  - Verify: no mock story dataset used by Home.
  - Completed: 2026-06-19. Homepage loads the published catalog through the typed SSR client and
    RLS; Story/Reader remain on mock data until their dedicated tasks.

- [x] B2.3 Connect story detail and chapter list
  - Acceptance: slug route, author/genres, chapter metadata and cursor pagination work.
  - Verify: published story renders; unknown/draft returns not found.
  - Completed: 2026-06-20. Dynamic `/truyen/[slug]` loads published story metadata and a
    keyset-paginated chapter list through the publishable SSR client and RLS. Draft and unknown
    slugs return 404; legacy `/story` routes redirect to the canonical Vietnamese route.

- [x] B2.4 Connect Reader
  - Acceptance: free body loads; prev/next and selector use real chapter route.
  - Verify: VIP metadata visible but body never returned to unauthorized client.
  - Completed: 2026-06-20. Canonical Reader route is
    `/truyen/[storySlug]/[chapterSlug]`; free content is queried through the publishable SSR client,
    while VIP payloads contain metadata and `content: null`. Previous/next, selector and keyboard
    arrows navigate with story/chapter slugs.

- [x] B2.5 Connect search
  - Acceptance: URL query, search RPC and cursor pagination work.
  - Verify: Vietnamese title/author searches return expected stories.
  - Completed: 2026-06-20. Route `/tim-kiem?q=...` calls typed `search_stories` through the
    publishable SSR client, renders title/author/synopsis results, and carries `(rank, id)` in the
    next-page URL. Empty and no-result states are handled; draft stories remain hidden.

## Phase B3: Auth And User Data

- [x] B3.1 Add email/password Auth and profile creation
  - Acceptance: signup, confirm, login, logout and profile row work.
  - Verify: server validates claims; session cookies work.
  - Completed: 2026-06-20. Supabase email/password Auth uses Server Actions and SSR cookies;
    `/dang-ky`, `/dang-nhap` and protected `/tai-khoan` cover signup, login, profile update and
    logout. A private trigger creates `public.profiles`; own-row updates are protected by RLS.
    `/auth/confirm` handles hosted email confirmation and `src/proxy.ts` refreshes sessions.

- [x] B3.2 Add bookmarks
  - Acceptance: toggle bookmark and user library work with RLS.
  - Verify: users cannot access each other's rows.
  - Completed: 2026-06-21. `public.bookmarks` dung composite primary key, explicit grants,
    owner-only RLS va index cho user library/follow lookup. Story Detail co optimistic follow
    controls; protected `/tu-truyen` doc danh sach theo user va cho phep bo theo doi.

- [x] B3.3 Add reading progress
  - Acceptance: Reader periodically saves and resumes chapter/progress.
  - Verify: atomic upsert; chapter belongs to story.
  - Completed: 2026-06-21. `public.reading_progress` dung atomic upsert, owner-only RLS,
    composite FK dam bao chapter thuoc story va index cho reading history. Reader Free debounce
    autosave/restore; Story/Home/`/tu-truyen` deu co luong Doc tiep dung chapter da luu.

- [x] B3.4 Add comments
  - Acceptance: read public comments; authenticated create/edit/delete own comment.
  - Verify: body validation and cross-user RLS tests pass.
  - Completed: 2026-06-26. `public.comments` co constraints, indexes, explicit grants va RLS;
    Story Detail doc comment that, user dang nhap co the tao/sua/xoa comment cua chinh minh qua
    Server Actions. Local Supabase reset, SQL RLS tests, generated DB types, TypeScript, ESLint,
    production build va Playwright comment flow pass.

## Phase B4: Admin And Production Hardening

- [ ] B4.1 Server-only editorial mutations
  - Acceptance: story/chapter publish actions use separate secret client.
  - Verify: no content-table browser write grants.

- [ ] B4.2 Storage buckets and policies
  - Acceptance: story covers admin-only write; avatars own-folder write.
  - Verify: upload/download/upsert policy matrix.

- [ ] B4.3 Performance and security audit
  - Acceptance: advisors clean or documented; critical queries indexed.
  - Verify: Supabase advisors, EXPLAIN plans, browser E2E.

## Deferred

- Payment and VIP entitlement.
- Gold/Xu ledger.
- Realtime comment.
- Notification.
- Recommendation engine.
- Full admin dashboard.
