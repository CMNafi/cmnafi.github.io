create extension if not exists pgcrypto;

create table if not exists public.form_adv_firm_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot_date date not null,
  crd text not null,
  firm_name text not null,
  legal_name text,
  sec_number text,
  aliases text[] not null default '{}',
  headquarters text,
  country text,
  phone text,
  website text,
  registration_snapshot text,
  service_snapshot text,
  fee_snapshot text,
  brochure_audiences text[] not null default '{}',
  state_registrations text[] not null default '{}',
  focus_tags text[] not null default '{}',
  next_read text,
  notes text[] not null default '{}',
  source_coverage text[] not null default '{}',
  aum_bucket text,
  client_focus text[] not null default '{}',
  office_count integer,
  disclosure_count integer not null default 0,
  latest_changes text[] not null default '{}',
  raw_record jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (snapshot_date, crd)
);

alter table public.form_adv_firm_snapshots enable row level security;

create or replace function public.set_form_adv_firm_snapshots_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists form_adv_firm_snapshots_set_updated_at on public.form_adv_firm_snapshots;

create trigger form_adv_firm_snapshots_set_updated_at
before update on public.form_adv_firm_snapshots
for each row
execute function public.set_form_adv_firm_snapshots_updated_at();

drop policy if exists form_adv_public_read on public.form_adv_firm_snapshots;
create policy form_adv_public_read
on public.form_adv_firm_snapshots
for select
using (true);

drop policy if exists form_adv_admin_write on public.form_adv_firm_snapshots;
create policy form_adv_admin_write
on public.form_adv_firm_snapshots
for all
using (auth.email() = 'nafi@cmnafi.com')
with check (auth.email() = 'nafi@cmnafi.com');

create index if not exists form_adv_firm_snapshots_crd_snapshot_idx
on public.form_adv_firm_snapshots (crd, snapshot_date desc);

create index if not exists form_adv_firm_snapshots_snapshot_idx
on public.form_adv_firm_snapshots (snapshot_date desc);

create index if not exists form_adv_firm_snapshots_firm_name_idx
on public.form_adv_firm_snapshots (firm_name);

create or replace view public.form_adv_current_firms as
select distinct on (crd)
  snapshot_date,
  crd,
  firm_name,
  legal_name,
  sec_number,
  aliases,
  headquarters,
  country,
  phone,
  website,
  registration_snapshot,
  service_snapshot,
  fee_snapshot,
  brochure_audiences,
  state_registrations,
  focus_tags,
  next_read,
  notes,
  source_coverage,
  aum_bucket,
  client_focus,
  office_count,
  disclosure_count,
  latest_changes,
  raw_record,
  created_at,
  updated_at
from public.form_adv_firm_snapshots
order by crd, snapshot_date desc, created_at desc;

grant select on public.form_adv_firm_snapshots to anon, authenticated;
grant select on public.form_adv_current_firms to anon, authenticated;
