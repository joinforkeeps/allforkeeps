create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt_key text not null
    check (prompt_key in ('tool-cost', 'data-exit', 'team-training', 'first-step', 'open-note')),
  body text not null
    check (char_length(btrim(body)) between 20 and 2000),
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.community_posts enable row level security;

revoke all on public.community_posts from public, anon, authenticated;
grant select (id, prompt_key, body, created_at)
  on public.community_posts to anon, authenticated;
grant insert (user_id, prompt_key, body)
  on public.community_posts to authenticated;

drop policy if exists "Read published community field notes"
  on public.community_posts;
create policy "Read published community field notes"
  on public.community_posts
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Authenticated members submit pending field notes"
  on public.community_posts;
create policy "Authenticated members submit pending field notes"
  on public.community_posts
  for insert
  to authenticated
  with check (user_id = auth.uid() and status = 'pending');
