create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  email text not null check (
    char_length(btrim(email)) between 3 and 254
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  message text not null check (char_length(btrim(message)) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from public, anon, authenticated;
grant insert on table public.contact_messages to anon, authenticated;

drop policy if exists "Allow public contact submissions" on public.contact_messages;
create policy "Allow public contact submissions"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
