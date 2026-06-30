grant select on table public.chapter_contents to service_role;

grant update (
  title,
  slug,
  chapter_number,
  access_level,
  coin_price,
  publication_status,
  published_at,
  updated_at,
  word_count
)
on public.chapters
to service_role;

grant update (
  content,
  content_format,
  updated_at
)
on public.chapter_contents
to service_role;

grant update (
  latest_chapter_number,
  latest_published_at,
  updated_at
)
on public.stories
to service_role;
