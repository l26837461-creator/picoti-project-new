-- Run in Supabase SQL Editor before first submission

create table if not exists public.customizations (
  id uuid primary key default gen_random_uuid(),
  product_type text not null check (product_type in ('pet', 'owner')),
  pet_name text not null default '',
  gender text check (gender in ('male', 'female')),
  birthday text not null default '',
  owner_phone text not null default '',
  owner_name text not null default '',
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.customizations enable row level security;

create policy "Allow anonymous insert"
  on public.customizations
  for insert
  to anon
  with check (true);

insert into storage.buckets (id, name, public)
values ('pet-photos', 'pet-photos', true)
on conflict (id) do nothing;

create policy "Allow anonymous upload"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'pet-photos');

create policy "Allow public read"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'pet-photos');
