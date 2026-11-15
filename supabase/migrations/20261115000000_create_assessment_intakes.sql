create table if not exists public.assessment_intakes (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null
    check (char_length(btrim(organization_name)) between 2 and 200),
  contact_name text not null
    check (char_length(btrim(contact_name)) between 1 and 200),
  contact_title text
    check (contact_title is null or char_length(btrim(contact_title)) <= 200),
  contact_email text not null
    check (
      char_length(contact_email) <= 254
      and contact_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    ),
  project_details text not null
    check (char_length(btrim(project_details)) between 10 and 5000),
  nda_accepted boolean not null default false
    check (nda_accepted),
  nda_version text not null
    check (nda_version = 'mutual-nda-2026-11-15-v1'),
  nda_accepted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.assessment_intakes enable row level security;

revoke all on public.assessment_intakes from public, anon, authenticated;
grant insert on public.assessment_intakes to anon;

drop policy if exists "Allow accepted assessment intake submissions"
  on public.assessment_intakes;

create policy "Allow accepted assessment intake submissions"
  on public.assessment_intakes
  for insert
  to anon
  with check (
    nda_accepted is true
    and nda_version = 'mutual-nda-2026-11-15-v1'
  );
