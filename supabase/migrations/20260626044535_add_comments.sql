create table public.comments (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  story_id bigint not null references public.stories (id) on delete cascade,
  chapter_id bigint,
  parent_id bigint references public.comments (id) on delete cascade,
  body text not null,
  status text not null default 'visible',
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comments_story_chapter_fkey
    foreign key (story_id, chapter_id)
    references public.chapters (story_id, id)
    on delete cascade,
  constraint comments_body_length_check
    check (char_length(btrim(body)) between 1 and 2000),
  constraint comments_status_check
    check (status in ('visible', 'hidden', 'deleted')),
  constraint comments_like_count_check check (like_count >= 0)
);

create index comments_visible_story_created_idx
on public.comments (story_id, created_at desc, id desc)
where status = 'visible';

create index comments_visible_chapter_created_idx
on public.comments (chapter_id, created_at desc, id desc)
where status = 'visible' and chapter_id is not null;

create index comments_user_created_at_idx
on public.comments (user_id, created_at desc);

create index comments_parent_id_idx
on public.comments (parent_id)
where parent_id is not null;

alter table public.comments enable row level security;

revoke all on table public.comments from anon, authenticated;
grant select on table public.comments to anon, authenticated;
grant insert on table public.comments to authenticated;
grant update (body, status, updated_at) on table public.comments to authenticated;
grant delete on table public.comments to authenticated;
grant usage on sequence public.comments_id_seq to authenticated;

create policy "Comments are readable when public or owned"
on public.comments
for select
to anon, authenticated
using (
  (
    comments.status = 'visible'
    and exists (
      select 1
      from public.stories
      where stories.id = comments.story_id
        and stories.publication_status = 'published'
    )
  )
  or (select auth.uid()) = comments.user_id
);

create policy "Users can comment on published stories"
on public.comments
for insert
to authenticated
with check (
  (select auth.uid()) = comments.user_id
  and comments.status = 'visible'
  and comments.like_count = 0
  and exists (
    select 1
    from public.stories
    where stories.id = comments.story_id
      and stories.publication_status = 'published'
  )
  and (
    comments.chapter_id is null
    or exists (
      select 1
      from public.chapters
      where chapters.id = comments.chapter_id
        and chapters.story_id = comments.story_id
        and chapters.publication_status = 'published'
    )
  )
);

create policy "Users can update their own visible comments"
on public.comments
for update
to authenticated
using (
  (select auth.uid()) = comments.user_id
  and comments.status = 'visible'
)
with check (
  (select auth.uid()) = comments.user_id
  and comments.status in ('visible', 'deleted')
);

create policy "Users can delete their own comments"
on public.comments
for delete
to authenticated
using ((select auth.uid()) = comments.user_id);
