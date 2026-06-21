alter table public.chapters
add constraint chapters_story_id_id_key unique (story_id, id);

create table public.reading_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  story_id bigint not null references public.stories (id) on delete cascade,
  chapter_id bigint not null,
  progress_percent numeric(5, 2) not null default 0,
  scroll_offset integer not null default 0,
  last_read_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, story_id),
  constraint reading_progress_story_chapter_fkey
    foreign key (story_id, chapter_id)
    references public.chapters (story_id, id)
    on delete cascade,
  constraint reading_progress_percent_check
    check (progress_percent between 0 and 100),
  constraint reading_progress_scroll_offset_check
    check (scroll_offset >= 0)
);

create index reading_progress_user_last_read_idx
on public.reading_progress (user_id, last_read_at desc);

create index reading_progress_chapter_id_idx
on public.reading_progress (chapter_id);

alter table public.reading_progress enable row level security;

revoke all on table public.reading_progress from anon, authenticated;
grant select, insert, update, delete on table public.reading_progress to authenticated;

create policy "Users can read their own reading progress"
on public.reading_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own reading progress"
on public.reading_progress
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.stories
    where stories.id = story_id
      and stories.publication_status = 'published'
  )
  and exists (
    select 1
    from public.chapters
    where chapters.id = chapter_id
      and chapters.story_id = story_id
      and chapters.publication_status = 'published'
  )
);

create policy "Users can update their own reading progress"
on public.reading_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.stories
    where stories.id = story_id
      and stories.publication_status = 'published'
  )
  and exists (
    select 1
    from public.chapters
    where chapters.id = chapter_id
      and chapters.story_id = story_id
      and chapters.publication_status = 'published'
  )
);

create policy "Users can delete their own reading progress"
on public.reading_progress
for delete
to authenticated
using ((select auth.uid()) = user_id);
