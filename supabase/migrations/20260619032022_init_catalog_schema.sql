create table public.authors (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  bio text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint authors_slug_not_blank check (btrim(slug) <> ''),
  constraint authors_name_not_blank check (btrim(name) <> '')
);

create table public.genres (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null unique,
  description text,
  sort_order integer not null default 0,
  constraint genres_slug_not_blank check (btrim(slug) <> ''),
  constraint genres_name_not_blank check (btrim(name) <> '')
);

create table public.stories (
  id bigint generated always as identity primary key,
  slug text not null unique,
  author_id bigint not null references public.authors (id) on delete restrict,
  title text not null,
  alternative_title text,
  synopsis text not null,
  cover_path text,
  story_status text not null default 'ongoing',
  publication_status text not null default 'draft',
  is_featured boolean not null default false,
  is_hot boolean not null default false,
  is_vip boolean not null default false,
  rating_average numeric(3, 2) not null default 0,
  rating_count bigint not null default 0,
  read_count bigint not null default 0,
  follow_count bigint not null default 0,
  chapter_count integer not null default 0,
  latest_chapter_number numeric(10, 2),
  latest_published_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(alternative_title, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(synopsis, '')), 'C')
  ) stored,
  constraint stories_slug_not_blank check (btrim(slug) <> ''),
  constraint stories_title_not_blank check (btrim(title) <> ''),
  constraint stories_synopsis_not_blank check (btrim(synopsis) <> ''),
  constraint stories_story_status_check
    check (story_status in ('ongoing', 'completed', 'hiatus')),
  constraint stories_publication_status_check
    check (publication_status in ('draft', 'published', 'archived')),
  constraint stories_rating_average_check
    check (rating_average between 0 and 5),
  constraint stories_rating_count_check check (rating_count >= 0),
  constraint stories_read_count_check check (read_count >= 0),
  constraint stories_follow_count_check check (follow_count >= 0),
  constraint stories_chapter_count_check check (chapter_count >= 0),
  constraint stories_latest_chapter_number_check
    check (latest_chapter_number is null or latest_chapter_number > 0),
  constraint stories_published_at_check
    check (publication_status <> 'published' or published_at is not null)
);

create table public.story_genres (
  story_id bigint not null references public.stories (id) on delete cascade,
  genre_id bigint not null references public.genres (id) on delete restrict,
  is_primary boolean not null default false,
  primary key (story_id, genre_id)
);

create table public.chapters (
  id bigint generated always as identity primary key,
  story_id bigint not null references public.stories (id) on delete cascade,
  chapter_number numeric(10, 2) not null,
  slug text not null,
  title text not null,
  access_level text not null default 'free',
  coin_price integer not null default 0,
  publication_status text not null default 'draft',
  is_hot boolean not null default false,
  published_at timestamptz,
  word_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (story_id, chapter_number),
  unique (story_id, slug),
  constraint chapters_number_check check (chapter_number > 0),
  constraint chapters_slug_not_blank check (btrim(slug) <> ''),
  constraint chapters_title_not_blank check (btrim(title) <> ''),
  constraint chapters_access_level_check check (access_level in ('free', 'vip')),
  constraint chapters_coin_price_check check (coin_price >= 0),
  constraint chapters_free_price_check check (access_level <> 'free' or coin_price = 0),
  constraint chapters_publication_status_check
    check (publication_status in ('draft', 'published', 'archived')),
  constraint chapters_word_count_check check (word_count >= 0)
);

create table public.chapter_contents (
  chapter_id bigint primary key references public.chapters (id) on delete cascade,
  content text not null,
  content_format text not null default 'plain_text',
  updated_at timestamptz not null default now(),
  constraint chapter_contents_content_not_blank check (btrim(content) <> ''),
  constraint chapter_contents_format_check
    check (content_format in ('plain_text', 'markdown'))
);

create index stories_author_id_idx on public.stories (author_id);
create index stories_published_latest_idx
  on public.stories (latest_published_at desc, id desc)
  where publication_status = 'published';
create index stories_published_read_count_idx
  on public.stories (read_count desc, id desc)
  where publication_status = 'published';
create index stories_featured_idx
  on public.stories (id)
  where publication_status = 'published' and is_featured;
create index stories_search_vector_idx
  on public.stories using gin (search_vector);
create index story_genres_genre_story_idx
  on public.story_genres (genre_id, story_id);
create unique index story_genres_one_primary_idx
  on public.story_genres (story_id)
  where is_primary;
create index chapters_published_number_idx
  on public.chapters (story_id, chapter_number desc, id desc)
  where publication_status = 'published';
create index chapters_story_published_at_idx
  on public.chapters (story_id, published_at desc, id desc);

alter table public.authors enable row level security;
alter table public.genres enable row level security;
alter table public.stories enable row level security;
alter table public.story_genres enable row level security;
alter table public.chapters enable row level security;
alter table public.chapter_contents enable row level security;

create policy "Published story authors are readable"
on public.authors
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.stories
    where stories.author_id = authors.id
      and stories.publication_status = 'published'
  )
);

create policy "Published story genres are readable"
on public.genres
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.story_genres
    join public.stories on stories.id = story_genres.story_id
    where story_genres.genre_id = genres.id
      and stories.publication_status = 'published'
  )
);

create policy "Published stories are readable"
on public.stories
for select
to anon, authenticated
using (publication_status = 'published');

create policy "Published story genre links are readable"
on public.story_genres
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.stories
    where stories.id = story_genres.story_id
      and stories.publication_status = 'published'
  )
);

create policy "Published chapter metadata is readable"
on public.chapters
for select
to anon, authenticated
using (
  publication_status = 'published'
  and exists (
    select 1
    from public.stories
    where stories.id = chapters.story_id
      and stories.publication_status = 'published'
  )
);

create policy "Published free chapter content is readable"
on public.chapter_contents
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.chapters
    join public.stories on stories.id = chapters.story_id
    where chapters.id = chapter_contents.chapter_id
      and chapters.publication_status = 'published'
      and chapters.access_level = 'free'
      and stories.publication_status = 'published'
  )
);

revoke all on table
  public.authors,
  public.genres,
  public.stories,
  public.story_genres,
  public.chapters,
  public.chapter_contents
from anon, authenticated;

grant usage on schema public to anon, authenticated;
grant select on table
  public.authors,
  public.genres,
  public.stories,
  public.story_genres,
  public.chapters,
  public.chapter_contents
to anon, authenticated;

create or replace function public.search_stories(
  search_query text,
  cursor_rank real default null,
  cursor_id bigint default null,
  page_size integer default 20
)
returns table (
  id bigint,
  slug text,
  title text,
  synopsis text,
  cover_path text,
  author_name text,
  story_status text,
  latest_chapter_number numeric,
  latest_published_at timestamptz,
  rank real
)
language sql
stable
set search_path = ''
as $$
  with query as (
    select websearch_to_tsquery('simple', btrim(search_query)) as value
  ),
  ranked as (
    select
      stories.id,
      stories.slug,
      stories.title,
      stories.synopsis,
      stories.cover_path,
      authors.name as author_name,
      stories.story_status,
      stories.latest_chapter_number,
      stories.latest_published_at,
      greatest(
        ts_rank(stories.search_vector, query.value),
        ts_rank(to_tsvector('simple', authors.name), query.value)
      )::real as rank
    from public.stories
    join public.authors on authors.id = stories.author_id
    cross join query
    where stories.publication_status = 'published'
      and (
        stories.search_vector @@ query.value
        or to_tsvector('simple', authors.name) @@ query.value
      )
  )
  select
    ranked.id,
    ranked.slug,
    ranked.title,
    ranked.synopsis,
    ranked.cover_path,
    ranked.author_name,
    ranked.story_status,
    ranked.latest_chapter_number,
    ranked.latest_published_at,
    ranked.rank
  from ranked
  where cursor_rank is null
    or cursor_id is null
    or ranked.rank < cursor_rank
    or (ranked.rank = cursor_rank and ranked.id < cursor_id)
  order by ranked.rank desc, ranked.id desc
  limit least(greatest(page_size, 1), 50);
$$;

revoke all on function public.search_stories(text, real, bigint, integer) from public;
grant execute on function public.search_stories(text, real, bigint, integer)
to anon, authenticated;
