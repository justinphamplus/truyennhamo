insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'story-covers',
  'story-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types,
  updated_at = now();

drop policy if exists "Story covers are publicly readable" on storage.objects;

create policy "Story covers are publicly readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'story-covers');

grant update (cover_path, updated_at)
on public.stories
to service_role;
