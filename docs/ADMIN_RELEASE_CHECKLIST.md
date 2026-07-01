# Admin Production Release Checklist

Checklist nay dung cho lan release admin editorial core A1-A7.4 len production.
No la tai lieu van hanh, khong phai migration moi.

## Scope

- Release cac route admin da co: dashboard, story/chapter editorial flow, comment moderation, story cover upload va cac deferred module shells.
- Revenue, role, notification va marketing module shells van read-only/deferred; khong bat mutation gia.
- Public site, auth, library, comments va reader flow phai tiep tuc hoat dong nhu truoc.

## Production Release Note 2026-07-01

- Supabase production project `truyennhamo` (`uamtsrntbpqckjrjaojj`, `ap-southeast-1`) da apply migrations va seed catalog production theo `docs/PRODUCTION_SEED_RUNBOOK.md`.
- Seed baseline verified: 10 stories, 9 published stories, 1 draft story, 37 chapters, 36 published chapters, 13 published free chapters va 37 chapter contents; fake auth users/comments khong seed.
- Production deployment da redeploy tu commit `299e6bc` (`chore: add production seed runbook`) vao `https://truyennhamo.vercel.app`; Vercel metadata tro dung commit va khong co `gitDirty`.
- Browser smoke production pass cho `/`, `/truyen/van-co-than-de`, `/truyen/van-co-than-de/chuong-2686`, `/truyen/van-co-than-de/chuong-2685` va `/tim-kiem?q=Phi%20Thi%C3%AAn%20Ng%C6%B0`.
- Browser smoke ghi nhan 0 console errors/warnings, 0 page errors, 0 failed requests; Vercel runtime logs gan nhat khong co `error`/`fatal`.

## Supabase Changelog Notes

Da kiem tra `https://supabase.com/changelog.md` ngay 2026-06-30.

- Supabase thong bao tu 2026-04-28: table moi co the khong tu dong expose qua Data API. Vi vay production release phai xac nhan grants/RLS cho public/user data va service-role admin path sau migration.
- Supabase Postgres 14 bi deprecate tu 2026-07-01. Production project khong nen chay Postgres 14; local repo dang dung PostgreSQL 17.
- Supabase dang chuyen default `log_connections` cho Free/Pro projects. Day khong chan release admin, nhung neu dung log ket noi de debug thi khong duoc coi do la signal bat buoc.
- Supabase/JS ecosystem dang huong ve Node 22; CI cua repo da dung Node 22.

## Pre-Release Gate

- [ ] PR vao `master` da ready-for-review, khong draft.
- [ ] Branch protection tren `master` bat required checks.
- [ ] GitHub checks xanh: `Quality`, `DB Contracts`, `Admin E2E Smoke`.
- [ ] Local hoac CI gan nhat da pass:
  - [ ] `npm run text:check`
  - [ ] `npx tsc --noEmit`
  - [ ] `npm run lint`
  - [ ] `npm run build`
  - [ ] `npm run db:test`
  - [ ] `npx supabase db advisors --local --type all --level warn --fail-on error`
  - [ ] `npx playwright test --grep @admin-smoke`
  - [ ] `npm audit --audit-level=high`
- [ ] Khong co `.env*`, service role key, secret key, access token hoac password trong staged diff.

## Production Env

Set cac bien nay trong hosting platform, khong commit vao repo:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`: production Supabase project URL.
- [ ] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: publishable key danh cho browser/SSR public client.
- [ ] `SUPABASE_SECRET_KEY`: server-only secret key, khong co prefix `NEXT_PUBLIC_`.
- [ ] `SUPABASE_SERVICE_ROLE_KEY`: server-only service role key, khong co prefix `NEXT_PUBLIC_`.
- [ ] `ADMIN_EMAILS`: comma-separated allowlist email admin production.

Rules:

- [ ] Chi `NEXT_PUBLIC_SUPABASE_URL` va `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` duoc expose ra browser.
- [ ] `SUPABASE_SECRET_KEY` va `SUPABASE_SERVICE_ROLE_KEY` chi nam trong server runtime.
- [ ] `ADMIN_EMAILS` chi gom email that su can quyen admin cho release nay.
- [ ] Neu can dong admin khan cap, set `ADMIN_EMAILS` ve empty list va redeploy/restart runtime.

## Supabase Production Migration

Before apply:

- [ ] Xac nhan production project ID, region va Postgres version.
- [ ] Tao backup/snapshot hoac xac nhan point-in-time recovery san sang.
- [ ] Ghi lai migration state hien tai cua production.
- [ ] Khong chay `supabase db reset` tren production.
- [ ] Chay day du migration tren local/staging truoc production.

Migrations can co trong release:

- [ ] `20260619032022_init_catalog_schema.sql`
- [ ] `20260620094810_add_profiles.sql`
- [ ] `20260621030841_add_bookmarks.sql`
- [ ] `20260621032406_add_reading_progress.sql`
- [ ] `20260626044535_add_comments.sql`
- [ ] `20260629102906_grant_admin_read_catalog.sql`
- [ ] `20260629104531_grant_admin_story_mutations.sql`
- [ ] `20260629145105_grant_admin_chapter_mutations.sql`
- [ ] `20260629152811_add_admin_chapter_rpc.sql`
- [ ] `20260630021134_grant_admin_comment_moderation_read.sql`
- [ ] `20260630024448_grant_admin_comment_moderation_mutations.sql`
- [ ] `20260630032137_add_story_cover_storage_policy.sql`

After apply:

- [ ] Ghi lai migration state moi cua production.
- [ ] Xac nhan RLS van enabled cho exposed public tables.
- [ ] Xac nhan public/user grants khong mo them admin-only data.
- [ ] Xac nhan `public.admin_save_chapter` va `public.admin_publish_chapter` chi grant execute cho `service_role`.
- [ ] Xac nhan bucket `story-covers` ton tai, public object URL read duoc, khong co public list policy, write/update/delete chi qua admin server path.
- [ ] Xac nhan image upload limit/MIME policy cho `story-covers`: JPG, PNG, WebP va 5MB.
- [ ] Neu production catalog dang rong, chay `supabase/production_homepage_seed.sql` theo `docs/PRODUCTION_SEED_RUNBOOK.md`; khong chay local `supabase/seed.sql` tren production vi file do co fake auth users/comments.

## Deploy Order

- [ ] Apply/verify Supabase migrations truoc app deploy neu app code phu thuoc schema moi.
- [ ] Neu can seed catalog production, chay production seed sau migrations va truoc app smoke.
- [ ] Set production env vars.
- [ ] Deploy app commit da qua CI.
- [ ] Neu deploy preview/staging co production-like env, smoke test staging truoc khi promote.
- [ ] Sau deploy, khong sua database truc tiep bang dashboard de "fix nhanh" neu chua ghi lai SQL.

## Post-Deploy Smoke

Public:

- [ ] `/` render catalog.
- [ ] `/truyen/van-co-than-de` render detail va comments.
- [ ] `/truyen/van-co-than-de/chuong-2686` render reader.
- [ ] `/tim-kiem?q=Van%20Co` tra ket qua hop ly.

Auth/admin:

- [ ] Guest vao `/admin` bi redirect login hoac bi chan dung thiet ke hien tai.
- [ ] Non-admin authenticated user khong vao duoc `/admin`.
- [ ] Admin allowlisted vao `/admin` thay dashboard.
- [ ] `/admin/truyen` load story list.
- [ ] `/admin/binh-luan` load comment queue.
- [ ] Neu dung test story/comment production-safe: save/publish chapter, hide/restore comment, upload/delete cover.

Security checks:

- [ ] Browser bundle khong chua `SUPABASE_SERVICE_ROLE_KEY` hoac `SUPABASE_SECRET_KEY`.
- [ ] Server error UI khong hien raw stack trace/database error cho user.
- [ ] Public user khong doc duoc hidden/deleted comments.
- [ ] Public user khong upload/update/delete `story-covers` truc tiep.

## Rollback

App rollback:

- [ ] Roll back hosting deployment ve version truoc neu app deploy gay loi.
- [ ] Neu can dong admin ngay, clear `ADMIN_EMAILS` va redeploy/restart runtime.

Database rollback:

- [ ] Cac migration admin hien tai chu yeu la additive/grants/RPC/storage policy; rollback app thuong nen giu database compatible.
- [ ] Neu policy/grant gay mo quyen, uu tien revoke grant/policy bang SQL hotfix nho va ghi lai migration follow-up.
- [ ] Khong delete user content, comments, chapters hoac uploaded covers khi rollback tru khi co xac nhan mat du lieu/bao mat.

Go/no-go:

- [ ] Go neu CI xanh, migration apply thanh cong, smoke pass va rollback path san sang.
- [ ] No-go neu env production thieu server-only key, migration state lech, advisors bao loi, hoac admin auth khong chan guest/non-admin.
