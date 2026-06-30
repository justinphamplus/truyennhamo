# NovelVerse Project Docs

Thu muc nay la noi theo doi yeu cau, ke hoach va tien do cua du an NovelVerse.

## Nen doc theo thu tu

1. `SPEC.md` - Final UI spec: muc tieu, pages, sections, components, data, motion va tieu chi hoan thanh.
2. `IMPLEMENTATION_PLAN.md` - Cach trien khai theo giai doan.
3. `TASKS.md` - Danh sach task cu the, co acceptance va verification.
4. `PROGRESS.md` - Tien do hien tai: da code gi, chua code gi, viec tiep theo.
5. `DESIGN_SYSTEM.md` - Mau sac, typography, spacing, component guideline.
6. `PROJECT_STRUCTURE.md` - Y nghia cac file/thuc muc trong project.
7. `DECISIONS.md` - Cac quyet dinh ky thuat da chon va ly do.
8. `TEST_PLAN.md` - Cach kiem tra UI, responsive va interaction.
9. `BACKEND_SPEC.md` - Stack, schema, RLS, Storage va API contract cho MVP.
10. `BACKEND_TASKS.md` - Thu tu migration va vertical slice backend.
11. `ADMIN_RELEASE_CHECKLIST.md` - Checklist env, migration, smoke va rollback cho admin production release.

## Trang thai hien tai

Du an dang o giai doan Next.js + Supabase MVP:

- Public catalog, auth, library, comments, reader va admin editorial core da co local/CI coverage.
- Admin revenue, role, notification va marketing advanced modules dang la read-only/deferred shells.
- Ruby Noir Romance la visual theme chinh thuc va duy nhat.
- Production release can di qua `ADMIN_RELEASE_CHECKLIST.md`.

Chay local bang Next.js va Supabase local workflow trong `package.json`.
