-- Run once in the Supabase SQL Editor. Existing unrelated tables are untouched.
begin;
create table if not exists public.pos_private_state (
  id integer primary key check (id=1),
  version integer not null default 0,
  data jsonb not null
);
alter table public.pos_private_state enable row level security;
revoke all on public.pos_private_state from public, anon, authenticated;
grant select,update,insert on public.pos_private_state to service_role;
insert into public.pos_private_state(id,data) values (1,'{"users":[],"venues":[],"slots":[],"events":[],"notifications":[]}') on conflict(id) do nothing;
create or replace function public.pos_compare_and_swap(expected_version integer,next_data jsonb)
returns boolean language plpgsql security invoker set search_path='' as $$
begin
  update public.pos_private_state set data=next_data,version=version+1 where id=1 and version=expected_version;
  return found;
end; $$;
revoke all on function public.pos_compare_and_swap(integer,jsonb) from public,anon,authenticated;
grant execute on function public.pos_compare_and_swap(integer,jsonb) to service_role;
create table if not exists public.pos_request_limits(
  key text primary key,
  started_at timestamptz not null,
  requests integer not null
);
alter table public.pos_request_limits enable row level security;
revoke all on public.pos_request_limits from public,anon,authenticated;
grant select,insert,update,delete on public.pos_request_limits to service_role;
create or replace function public.pos_rate_limit(bucket_key text,max_requests integer,window_seconds integer)
returns boolean language plpgsql security invoker set search_path='' as $$
declare count_value integer;
begin
  insert into public.pos_request_limits as limits(key,started_at,requests) values(bucket_key,clock_timestamp(),1)
  on conflict(key) do update set
    requests=case when limits.started_at < clock_timestamp()-make_interval(secs=>window_seconds) then 1 else limits.requests+1 end,
    started_at=case when limits.started_at < clock_timestamp()-make_interval(secs=>window_seconds) then clock_timestamp() else limits.started_at end
  returning requests into count_value;
  delete from public.pos_request_limits where started_at < clock_timestamp()-interval '1 day';
  return count_value<=max_requests;
end; $$;
revoke all on function public.pos_rate_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.pos_rate_limit(text,integer,integer) to service_role;
commit;
