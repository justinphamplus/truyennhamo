grant usage on schema public to service_role;

grant select on table
  public.authors,
  public.genres,
  public.stories,
  public.story_genres,
  public.chapters
to service_role;
