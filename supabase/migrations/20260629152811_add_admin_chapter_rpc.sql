create or replace function public.admin_save_chapter(
  p_story_id bigint,
  p_chapter_id bigint,
  p_title text,
  p_slug text,
  p_chapter_number numeric,
  p_access_level text,
  p_body text,
  p_word_count integer,
  p_updated_at timestamptz
)
returns table (
  story_id bigint,
  chapter_id bigint,
  story_slug text,
  chapter_slug text,
  previous_chapter_slug text,
  publication_status text
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_story_slug text;
  v_previous_chapter_slug text;
  v_chapter_slug text;
  v_coin_price integer;
  v_publication_status text;
  v_content_count integer;
begin
  if p_access_level not in ('free', 'vip') then
    raise exception 'Invalid chapter access level' using errcode = '23514';
  end if;

  if btrim(p_body) = '' then
    raise exception 'Chapter content must not be blank' using errcode = '23514';
  end if;

  select stories.slug
  into v_story_slug
  from public.stories
  where stories.id = p_story_id
  for update;

  if not found then
    raise exception 'Story not found' using errcode = 'P0002';
  end if;

  select chapters.slug,
         chapters.coin_price,
         chapters.publication_status
  into v_previous_chapter_slug,
       v_coin_price,
       v_publication_status
  from public.chapters
  where chapters.id = p_chapter_id
    and chapters.story_id = p_story_id
  for update;

  if not found then
    raise exception 'Chapter not found' using errcode = 'P0002';
  end if;

  update public.chapters
  set title = p_title,
      slug = p_slug,
      chapter_number = p_chapter_number,
      access_level = p_access_level,
      coin_price = case
        when p_access_level = 'free' then 0
        when v_coin_price > 0 then v_coin_price
        else 500
      end,
      updated_at = p_updated_at,
      word_count = p_word_count
  where chapters.id = p_chapter_id
    and chapters.story_id = p_story_id
  returning chapters.slug,
            chapters.publication_status
  into v_chapter_slug,
       v_publication_status;

  update public.chapter_contents
  set content = p_body,
      content_format = 'plain_text',
      updated_at = p_updated_at
  where chapter_contents.chapter_id = p_chapter_id;
  get diagnostics v_content_count = row_count;

  if v_content_count <> 1 then
    raise exception 'Chapter content not found' using errcode = 'P0002';
  end if;

  return query
  select p_story_id,
         p_chapter_id,
         v_story_slug,
         v_chapter_slug,
         v_previous_chapter_slug,
         v_publication_status;
end;
$$;

create or replace function public.admin_publish_chapter(
  p_story_id bigint,
  p_chapter_id bigint,
  p_published_at timestamptz
)
returns table (
  story_id bigint,
  chapter_id bigint,
  story_slug text,
  chapter_slug text,
  previous_chapter_slug text,
  publication_status text
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_story_slug text;
  v_story_status text;
  v_latest_chapter_number numeric;
  v_chapter_slug text;
  v_publication_status text;
  v_chapter_number numeric;
  v_access_level text;
  v_existing_published_at timestamptz;
begin
  select stories.slug,
         stories.publication_status,
         stories.latest_chapter_number
  into v_story_slug,
       v_story_status,
       v_latest_chapter_number
  from public.stories
  where stories.id = p_story_id
  for update;

  if not found then
    raise exception 'Story not found' using errcode = 'P0002';
  end if;

  if v_story_status <> 'published' then
    raise exception 'Story must be published first' using errcode = '23514';
  end if;

  select chapters.slug,
         chapters.chapter_number,
         chapters.access_level,
         chapters.published_at
  into v_chapter_slug,
       v_chapter_number,
       v_access_level,
       v_existing_published_at
  from public.chapters
  where chapters.id = p_chapter_id
    and chapters.story_id = p_story_id
  for update;

  if not found then
    raise exception 'Chapter not found' using errcode = 'P0002';
  end if;

  if v_access_level not in ('free', 'vip') then
    raise exception 'Invalid chapter access level' using errcode = '23514';
  end if;

  if not exists (
    select 1
    from public.chapter_contents
    where chapter_contents.chapter_id = p_chapter_id
      and btrim(chapter_contents.content) <> ''
  ) then
    raise exception 'Chapter content must not be blank' using errcode = '23514';
  end if;

  update public.chapters
  set publication_status = 'published',
      published_at = coalesce(v_existing_published_at, p_published_at),
      updated_at = p_published_at
  where chapters.id = p_chapter_id
    and chapters.story_id = p_story_id
  returning chapters.slug,
            chapters.publication_status
  into v_chapter_slug,
       v_publication_status;

  update public.stories
  set latest_chapter_number = greatest(
        coalesce(v_latest_chapter_number, v_chapter_number),
        v_chapter_number
      ),
      latest_published_at = p_published_at,
      updated_at = p_published_at
  where stories.id = p_story_id;

  return query
  select p_story_id,
         p_chapter_id,
         v_story_slug,
         v_chapter_slug,
         v_chapter_slug,
         'published'::text;
end;
$$;

revoke execute on function public.admin_save_chapter(
  bigint,
  bigint,
  text,
  text,
  numeric,
  text,
  text,
  integer,
  timestamptz
) from public, anon, authenticated;

revoke execute on function public.admin_publish_chapter(
  bigint,
  bigint,
  timestamptz
) from public, anon, authenticated;

grant execute on function public.admin_save_chapter(
  bigint,
  bigint,
  text,
  text,
  numeric,
  text,
  text,
  integer,
  timestamptz
) to service_role;

grant execute on function public.admin_publish_chapter(
  bigint,
  bigint,
  timestamptz
) to service_role;
