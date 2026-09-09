create extension if not exists citext;

create table if not exists public.leads (
  id                 uuid        primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  full_name          text        not null check (char_length(full_name) between 2 and 120),
  business_name      text        not null check (char_length(business_name) between 2 and 160),
  website            text        check (website is null or website ~* '^https?://[a-z0-9.-]+\.[a-z]{2,}'),
  email              citext      not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  surface            text        not null check (char_length(surface) between 2 and 40),
  offer              text        not null check (char_length(offer) between 2 and 120),
  category           text        not null default 'unspecified' check (char_length(category) <= 60),
  linkedin_url       text        check (linkedin_url is null or linkedin_url ~* '^https?://(www\.)?linkedin\.com/'),
  consent            boolean     not null default false check (consent = true),
  utm                jsonb       not null default '{}'::jsonb,
  referred_by_surface text       not null default 'direct',
  source             text        not null,
  user_agent         text,
  fulfillment_tier   text        not null default 'mass' check (fulfillment_tier in ('mass','first_round')),
  fulfillment_url    text,
  fulfilled_at       timestamptz,
  hubspot_id         text,
  status             text        not null default 'new'
    check (status in ('new','qualified','fulfillment','nurture','converted','archived'))
);

create unique index if not exists leads_email_surface_key on public.leads (email, surface);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_surface_idx on public.leads (surface);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_tier_idx on public.leads (fulfillment_tier);
create index if not exists leads_utm_campaign_idx on public.leads ((utm ->> 'utm_campaign'));

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

alter table public.leads enable row level security;
drop policy if exists leads_anon_insert on public.leads;
create policy leads_anon_insert on public.leads for insert to anon with check (true);
-- Default-deny everything else. service_role (ops) bypasses RLS; never shipped to an app.

comment on table public.leads is 'MTM Subdomain Forge — shared lead stomach. Every forager page inserts; none read. Moolah governs.';
