create table public.bookmarks (
  user_id uuid not null references auth.users (id) on delete cascade,
  story_id bigint not null references public.stories (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, story_id)
);

create index bookmarks_user_created_at_idx
on public.bookmarks (user_id, created_at desc);

create index bookmarks_story_id_idx
on public.bookmarks (story_id);

alter table public.bookmarks enable row level security;

revoke all on table public.bookmarks from anon, authenticated;
grant select, insert, delete on table public.bookmarks to authenticated;

create policy "Users can read their own bookmarks"
on public.bookmarks
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can bookmark published stories"
on public.bookmarks
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
);

create policy "Users can delete their own bookmarks"
on public.bookmarks
for delete
to authenticated
using ((select auth.uid()) = user_id);
