begin;

do $$
declare
  story_count integer;
  chapter_count integer;
  rls_table_count integer;
  expected_index_count integer;
begin
  select count(*) into story_count from public.stories;
  if story_count <> 10 then
    raise exception 'Expected 10 stories, found %', story_count;
  end if;

  select count(*) into chapter_count
  from public.chapters
  join public.stories on stories.id = chapters.story_id
  where stories.slug = 'van-co-than-de';
  if chapter_count <> 20 then
    raise exception 'Expected 20 Vạn Cổ chapters, found %', chapter_count;
  end if;

  select count(*) into rls_table_count
  from pg_class
  join pg_namespace on pg_namespace.oid = pg_class.relnamespace
  where pg_namespace.nspname = 'public'
    and pg_class.relname in (
      'authors',
      'genres',
      'stories',
      'story_genres',
      'chapters',
      'chapter_contents'
    )
    and pg_class.relrowsecurity;
  if rls_table_count <> 6 then
    raise exception 'Expected RLS on 6 catalog tables, found %', rls_table_count;
  end if;

  select count(*) into expected_index_count
  from pg_indexes
  where schemaname = 'public'
    and indexname in (
      'stories_author_id_idx',
      'stories_published_latest_idx',
      'stories_published_read_count_idx',
      'stories_featured_idx',
      'stories_search_vector_idx',
      'story_genres_genre_story_idx',
      'story_genres_one_primary_idx',
      'chapters_published_number_idx',
      'chapters_story_published_at_idx'
    );
  if expected_index_count <> 9 then
    raise exception 'Expected 9 catalog indexes, found %', expected_index_count;
  end if;
end
$$;

set local role anon;
select set_config('request.jwt.claim.role', 'anon', true);

do $$
declare
  visible_story_count integer;
  draft_story_count integer;
  vip_content_count integer;
  vip_metadata_count integer;
  free_content_count integer;
  author_search_count integer;
begin
  select count(*) into visible_story_count from public.stories;
  if visible_story_count <> 9 then
    raise exception 'Anon expected 9 published stories, found %', visible_story_count;
  end if;

  select count(*) into draft_story_count
  from public.stories
  where slug = 'ban-thao-chua-cong-bo';
  if draft_story_count <> 0 then
    raise exception 'Anon can read draft stories';
  end if;

  select count(*) into vip_content_count
  from public.chapter_contents
  join public.chapters on chapters.id = chapter_contents.chapter_id
  where chapters.access_level = 'vip';
  if vip_content_count <> 0 then
    raise exception 'Anon can read VIP chapter content';
  end if;

  select count(*) into vip_metadata_count
  from public.chapters
  where access_level = 'vip';
  if vip_metadata_count < 1 then
    raise exception 'Anon cannot read published VIP chapter metadata';
  end if;

  select count(*) into free_content_count
  from public.chapter_contents
  join public.chapters on chapters.id = chapter_contents.chapter_id
  where chapters.access_level = 'free';
  if free_content_count < 1 then
    raise exception 'Anon cannot read published free chapter content';
  end if;

  select count(*) into author_search_count
  from public.search_stories('Phi Thiên Ngư');
  if author_search_count < 1 then
    raise exception 'Author search returned no published stories';
  end if;

  if not exists (
    select 1
    from public.search_stories('Vạn Cổ')
    where slug = 'van-co-than-de'
  ) then
    raise exception 'Vietnamese title search did not return the expected story';
  end if;

  if exists (
    select 1
    from public.search_stories('Bản Thảo')
    where slug = 'ban-thao-chua-cong-bo'
  ) then
    raise exception 'Search exposed a draft story';
  end if;
end
$$;

do $$
declare
  first_result record;
  second_result record;
begin
  select id, rank into first_result
  from public.search_stories('Phi Thiên Ngư', null, null, 1);

  select id, rank into second_result
  from public.search_stories(
    'Phi Thiên Ngư',
    first_result.rank,
    first_result.id,
    1
  );

  if first_result.id is null or second_result.id is null then
    raise exception 'Search cursor test requires at least two results';
  end if;

  if first_result.id = second_result.id
    or second_result.rank > first_result.rank then
    raise exception 'Search cursor did not advance in rank/id order';
  end if;
end
$$;

do $$
begin
  begin
    insert into public.authors (slug, name) values ('khong-duoc-phep', 'Không Được Phép');
    raise exception 'Anon unexpectedly inserted an author';
  exception
    when insufficient_privilege then
      null;
  end;
end
$$;

reset role;

insert into auth.users (
  id,
  email,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'reader-one@example.com',
    '{"display_name":"Độc Giả Một"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'reader-two@example.com',
    '{"display_name":"Độc Giả Hai"}'::jsonb,
    now(),
    now()
  );

do $$
begin
  if not exists (
    select 1
    from public.profiles
    where id = '00000000-0000-0000-0000-000000000001'
      and display_name = 'Độc Giả Một'
  ) then
    raise exception 'Profile trigger did not create the expected row';
  end if;
end
$$;

set local role authenticated;
select set_config(
  'request.jwt.claim.sub',
  '00000000-0000-0000-0000-000000000001',
  true
);

do $$
declare
  affected_rows integer;
  published_story_id bigint;
  draft_story_id bigint;
  published_chapter_id bigint;
  other_story_chapter_id bigint;
begin
  select id into published_story_id
  from public.stories
  where slug = 'van-co-than-de';

  select id into draft_story_id
  from public.stories
  where slug = 'ban-thao-chua-cong-bo';

  select id into published_chapter_id
  from public.chapters
  where story_id = published_story_id
    and slug = 'chuong-2686';

  select chapters.id into other_story_chapter_id
  from public.chapters
  join public.stories on stories.id = chapters.story_id
  where stories.slug = 'dau-pha-thuong-khung'
  order by chapters.chapter_number desc
  limit 1;

  update public.profiles
  set username = 'doc_gia_mot'
  where id = '00000000-0000-0000-0000-000000000001';
  get diagnostics affected_rows = row_count;

  if affected_rows <> 1 then
    raise exception 'Authenticated user could not update own profile';
  end if;

  update public.profiles
  set username = 'khong_duoc_phep'
  where id = '00000000-0000-0000-0000-000000000002';
  get diagnostics affected_rows = row_count;

  if affected_rows <> 0 then
    raise exception 'Authenticated user updated another profile';
  end if;

  insert into public.bookmarks (user_id, story_id)
  values ('00000000-0000-0000-0000-000000000001', published_story_id);

  if not exists (
    select 1
    from public.bookmarks
    where user_id = '00000000-0000-0000-0000-000000000001'
      and story_id = published_story_id
  ) then
    raise exception 'Authenticated user could not read own bookmark';
  end if;

  begin
    insert into public.bookmarks (user_id, story_id)
    values ('00000000-0000-0000-0000-000000000002', published_story_id);
    raise exception 'Authenticated user inserted a bookmark for another user';
  exception
    when insufficient_privilege then
      null;
  end;

  begin
    insert into public.bookmarks (user_id, story_id)
    values ('00000000-0000-0000-0000-000000000001', draft_story_id);
    raise exception 'Authenticated user bookmarked a draft story';
  exception
    when insufficient_privilege then
      null;
  end;

  insert into public.reading_progress (
    user_id,
    story_id,
    chapter_id,
    progress_percent,
    scroll_offset
  )
  values (
    '00000000-0000-0000-0000-000000000001',
    published_story_id,
    published_chapter_id,
    42.5,
    840
  )
  on conflict (user_id, story_id)
  do update set
    chapter_id = excluded.chapter_id,
    progress_percent = excluded.progress_percent,
    scroll_offset = excluded.scroll_offset,
    last_read_at = now(),
    updated_at = now();

  if not exists (
    select 1
    from public.reading_progress
    where user_id = '00000000-0000-0000-0000-000000000001'
      and story_id = published_story_id
      and chapter_id = published_chapter_id
      and progress_percent = 42.5
      and scroll_offset = 840
  ) then
    raise exception 'Authenticated user could not upsert own reading progress';
  end if;

  begin
    insert into public.reading_progress (
      user_id,
      story_id,
      chapter_id
    )
    values (
      '00000000-0000-0000-0000-000000000002',
      published_story_id,
      published_chapter_id
    );
    raise exception 'Authenticated user inserted progress for another user';
  exception
    when insufficient_privilege then
      null;
  end;

  begin
    update public.reading_progress
    set chapter_id = other_story_chapter_id
    where user_id = '00000000-0000-0000-0000-000000000001'
      and story_id = published_story_id;
    raise exception 'Reading progress accepted a chapter from another story';
  exception
    when foreign_key_violation then
      null;
  end;
end
$$;

reset role;

set local role authenticated;
select set_config(
  'request.jwt.claim.sub',
  '00000000-0000-0000-0000-000000000002',
  true
);

do $$
begin
  if exists (select 1 from public.bookmarks) then
    raise exception 'Authenticated user can read another user bookmark';
  end if;

  if exists (select 1 from public.reading_progress) then
    raise exception 'Authenticated user can read another user reading progress';
  end if;
end
$$;

rollback;
