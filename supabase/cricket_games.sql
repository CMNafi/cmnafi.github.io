create extension if not exists pgcrypto;

create table if not exists public.cricket_games (
  id uuid primary key default gen_random_uuid(),
  game_date date not null,
  season_label text,
  competition text,
  format text,
  team text not null,
  opponent text,
  venue text,
  result text,
  runs integer,
  balls integer,
  wickets integer,
  overs numeric(4,1),
  runs_conceded integer,
  catches integer not null default 0,
  run_outs integer not null default 0,
  distance_driven_miles numeric(6,1),
  scorecard_url text,
  story_slug text,
  personal_note text,
  source_status text not null default 'manually added',
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid default auth.uid(),
  updated_by uuid default auth.uid(),
  constraint cricket_games_source_status_check check (source_status in ('verified', 'imported', 'provisional', 'manually added')),
  constraint cricket_games_non_negative_runs check (runs is null or runs >= 0),
  constraint cricket_games_non_negative_balls check (balls is null or balls >= 0),
  constraint cricket_games_non_negative_wickets check (wickets is null or wickets >= 0),
  constraint cricket_games_non_negative_overs check (overs is null or overs >= 0),
  constraint cricket_games_non_negative_runs_conceded check (runs_conceded is null or runs_conceded >= 0),
  constraint cricket_games_non_negative_catches check (catches >= 0),
  constraint cricket_games_non_negative_run_outs check (run_outs >= 0),
  constraint cricket_games_non_negative_distance check (distance_driven_miles is null or distance_driven_miles >= 0)
);

alter table public.cricket_games enable row level security;

create or replace function public.set_cricket_games_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists cricket_games_set_updated_at on public.cricket_games;

create trigger cricket_games_set_updated_at
before update on public.cricket_games
for each row
execute function public.set_cricket_games_updated_at();

drop policy if exists cricket_games_public_read on public.cricket_games;
create policy cricket_games_public_read
on public.cricket_games
for select
using (true);

-- Replace the email below with the admin account you will use in Supabase Auth.
drop policy if exists cricket_games_admin_write on public.cricket_games;
create policy cricket_games_admin_write
on public.cricket_games
for all
using (auth.email() = 'nafi@cmnafi.com')
with check (auth.email() = 'nafi@cmnafi.com');

create index if not exists cricket_games_active_game_date_idx
on public.cricket_games (game_date desc)
where is_archived = false;

create index if not exists cricket_games_active_team_idx
on public.cricket_games (team, game_date desc)
where is_archived = false;

create index if not exists cricket_games_active_season_label_idx
on public.cricket_games (season_label, game_date desc)
where is_archived = false;

create index if not exists cricket_games_story_slug_idx
on public.cricket_games (story_slug)
where story_slug is not null;
