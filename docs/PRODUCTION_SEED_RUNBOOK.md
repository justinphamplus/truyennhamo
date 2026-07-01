# Production Seed Runbook

Runbook này dùng khi production database đã apply migration nhưng chưa có catalog công khai đủ để Home, detail, reader và search smoke dùng dữ liệu thật.

## Scope

Seed production chỉ thêm dữ liệu catalog/public reader:

- `public.authors`
- `public.genres`
- `public.stories`
- `public.story_genres`
- `public.chapters`
- `public.chapter_contents`

Không seed fake auth users, profiles, comments, admin roles, purchases, reading progress, bookmarks hoặc storage objects.

## Prerequisites

- Production Supabase project đúng là `truyennhamo` (`uamtsrntbpqckjrjaojj`, `ap-southeast-1`).
- Production migrations đã apply xong.
- Đã có backup/snapshot hoặc point-in-time recovery sẵn sàng.
- Repo local đang link đúng production project khi dùng CLI.
- Tuyệt đối không chạy `supabase db reset` trên production.

## Run

Ưu tiên `psql` hoặc Supabase SQL Editor để file chạy đúng UTF-8 và giữ nguyên transaction multi-statement:

```powershell
psql "$env:SUPABASE_PROD_DB_URL" -f .\supabase\production_homepage_seed.sql
```

`SUPABASE_PROD_DB_URL` là Postgres connection string của production database. Nếu dùng Supabase connector/SQL Editor, mở file trong editor UTF-8 rồi chạy nguyên nội dung SQL; không copy từ terminal đang hiển thị mojibake.

Không dùng `supabase db query --file` cho file này: CLI hiện tại gửi file như prepared statement và có thể lỗi với multi-statement SQL.

File seed này idempotent: có thể chạy lại để khôi phục bộ catalog smoke cơ bản mà không tạo duplicate row.

## Verify

Chạy SQL kiểm số lượng:

```sql
select
  (select count(*) from public.stories) as stories_total,
  (select count(*) from public.stories where publication_status = 'published') as stories_published,
  (select count(*) from public.stories where publication_status = 'draft') as stories_draft,
  (select count(*) from public.chapters) as chapters_total,
  (select count(*) from public.chapters where publication_status = 'published') as chapters_published,
  (select count(*) from public.chapters where publication_status = 'published' and access_level = 'free') as free_published_chapters,
  (select count(*) from public.chapter_contents) as chapter_contents_total;
```

Expected baseline:

- `stories_total = 10`
- `stories_published = 9`
- `stories_draft = 1`
- `chapters_total = 37`
- `chapters_published = 36`
- `free_published_chapters = 13`
- `chapter_contents_total = 37`

Smoke production:

- `/`
- `/truyen/van-co-than-de`
- `/truyen/van-co-than-de/chuong-2686`
- `/truyen/van-co-than-de/chuong-2685`
- `/tim-kiem?q=Phi%20Thi%C3%AAn%20Ng%C6%B0`
- `/tim-kiem?q=B%E1%BA%A3n%20Th%E1%BA%A3o`

RLS expectations:

- Anonymous users thấy published stories/chapters.
- Anonymous users không thấy draft story `ban-thao-chua-cong-bo`.
- Anonymous users đọc được free chapter content.
- Anonymous users không đọc được VIP chapter body.

## Rollback

Đừng xóa dữ liệu production bằng script chung. Nếu seed nhầm môi trường, ưu tiên restore backup/PITR. Nếu chỉ cần ẩn dữ liệu seed, dùng admin UI hoặc SQL có điều kiện theo slug seed ở trên, rồi ghi lại migration/hotfix riêng.
