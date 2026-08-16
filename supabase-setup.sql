-- Run this once in Supabase: SQL Editor > New query > paste > Run.

create table if not exists panthers_kv (
  key        text primary key,
  value      text not null,
  updated_at timestamptz default now()
);

alter table panthers_kv enable row level security;

-- The anon key is public, so these rules are what actually protect the table.
-- This allows anyone with the app link to read and write the coaching data.
-- Fine for drills and session plans. Do not put anything private in here.
create policy "anyone can read"   on panthers_kv for select using (true);
create policy "anyone can insert" on panthers_kv for insert with check (true);
create policy "anyone can update" on panthers_kv for update using (true) with check (true);
create policy "anyone can delete" on panthers_kv for delete using (true);
