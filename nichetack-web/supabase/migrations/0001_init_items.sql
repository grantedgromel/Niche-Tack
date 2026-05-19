-- 0001_init_items.sql
-- Nichetack: per-user saved items with row-level security.

-- ── Enums (mirror the TS unions in src/lib/data.ts) ──────────────────
create type public.item_kind  as enum ('product', 'article', 'video', 'screenshot', 'recipe');
create type public.item_state as enum ('wishlist', 'active', 'purchased', 'archived');

-- ── items table ─────────────────────────────────────────────────────
create table public.items (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users (id) on delete cascade,
  kind          public.item_kind  not null,
  title         text        not null check (char_length(title) between 1 and 200),
  source        text        not null default '' check (char_length(source) <= 200),
  price         numeric     check (price is null or price >= 0),
  state         public.item_state not null default 'wishlist',
  ar            text        not null default '4/5',
  seed          text        not null,
  tags          text[]      not null default '{}',
  price_history numeric[]   not null default '{}',
  read_time     integer     check (read_time is null or read_time >= 0),
  note          text        not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Indexes — every query is "this user's items", newest-first or by state
create index items_user_created_idx on public.items (user_id, created_at desc);
create index items_user_state_idx   on public.items (user_id, state);

-- ── updated_at trigger ──────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger items_touch_updated_at
  before update on public.items
  for each row execute function public.touch_updated_at();

-- ── Row-Level Security — a user only ever sees/edits their own rows ──
alter table public.items enable row level security;

create policy "items_select_own" on public.items
  for select using (auth.uid() = user_id);

create policy "items_insert_own" on public.items
  for insert with check (auth.uid() = user_id);

create policy "items_update_own" on public.items
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "items_delete_own" on public.items
  for delete using (auth.uid() = user_id);
