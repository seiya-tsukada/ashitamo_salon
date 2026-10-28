-- アシタモハレルヤ: 自前ログイン + 課金ステータス
--
-- 他サービスと同居する Supabase プロジェクトのため、2 つのスキーマに分ける。
--   ashitamo     … テーブルと内部関数。API には公開しない（anon / authenticated から一切触れない）
--   ashitamo_api … クライアントが supabase.rpc() で呼ぶ関数だけを置く。Dashboard の
--                  Settings > API > Exposed schemas に ashitamo_api を追加して公開する
--
-- auth.users は使わない。パスワードは bcrypt、セッションはランダムトークンの SHA-256 を保存する。

create extension if not exists pgcrypto with schema extensions;

create schema if not exists ashitamo;
create schema if not exists ashitamo_api;

revoke all on schema ashitamo from public, anon, authenticated;
grant usage on schema ashitamo to service_role;
grant usage on schema ashitamo_api to anon, authenticated, service_role;

-- Postgres は新しい関数の EXECUTE を PUBLIC に付けるので、両スキーマとも既定で外す
alter default privileges in schema ashitamo revoke execute on functions from public;
alter default privileges in schema ashitamo_api revoke execute on functions from public;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table ashitamo.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  display_name text not null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_email_normalized check (email = lower(btrim(email))),
  constraint users_display_name_length check (char_length(display_name) between 1 and 50),
  constraint users_role_check check (role in ('member', 'admin'))
);

create table ashitamo.sessions (
  token_hash bytea primary key,
  user_id uuid not null references ashitamo.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index sessions_user_id_idx on ashitamo.sessions (user_id);

-- ブルートフォース対策（sign_in の試行回数制限）
create table ashitamo.login_attempts (
  id bigint generated always as identity primary key,
  email text not null,
  succeeded boolean not null,
  attempted_at timestamptz not null default now()
);

create index login_attempts_email_idx on ashitamo.login_attempts (email, attempted_at desc);

-- pending: 登録直後で決済未確認 / active: 課金中 / past_due: 決済エラー / paused: 休会 / canceled: 退会
create type ashitamo.subscription_status as enum ('pending', 'active', 'past_due', 'paused', 'canceled');

create table ashitamo.subscriptions (
  user_id uuid primary key references ashitamo.users (id) on delete cascade,
  status ashitamo.subscription_status not null default 'pending',
  plan text not null default 'monthly_1000',
  current_period_end timestamptz,
  -- 決済サービス連携用（Stripe などの Webhook から更新する想定）
  provider text,
  provider_customer_id text,
  provider_subscription_id text unique,
  updated_at timestamptz not null default now()
);

-- 課金ステータスの変更履歴
create table ashitamo.subscription_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references ashitamo.users (id) on delete cascade,
  from_status ashitamo.subscription_status,
  to_status ashitamo.subscription_status not null,
  source text not null,
  actor_id uuid references ashitamo.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint subscription_events_source_check check (source in ('signup', 'admin', 'webhook'))
);

create index subscription_events_user_id_idx on ashitamo.subscription_events (user_id, created_at desc);

-- 多重の防御: API 経由では関数しか通さないが、念のため RLS を有効化（ポリシーなし = 全拒否）
alter table ashitamo.users enable row level security;
alter table ashitamo.sessions enable row level security;
alter table ashitamo.login_attempts enable row level security;
alter table ashitamo.subscriptions enable row level security;
alter table ashitamo.subscription_events enable row level security;

revoke all on all tables in schema ashitamo from public, anon, authenticated;
grant all on all tables in schema ashitamo to service_role;

-- ---------------------------------------------------------------------------
-- Internal helpers (ashitamo)
-- ---------------------------------------------------------------------------

create function ashitamo.hash_token(p_token text)
returns bytea
language sql
immutable
set search_path = ''
as $$
  select extensions.digest(p_token, 'sha256')
$$;

create function ashitamo.user_profile(p_user_id uuid)
returns jsonb
language sql
stable
set search_path = ''
as $$
  select jsonb_build_object(
    'id', u.id,
    'email', u.email,
    'display_name', u.display_name,
    'role', u.role,
    'created_at', u.created_at,
    'subscription', jsonb_build_object(
      'status', coalesce(s.status, 'pending'),
      'plan', coalesce(s.plan, 'monthly_1000'),
      'current_period_end', s.current_period_end
    )
  )
  from ashitamo.users u
  left join ashitamo.subscriptions s on s.user_id = u.id
  where u.id = p_user_id
$$;

create function ashitamo.create_session(p_user_id uuid)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_token text := encode(extensions.gen_random_bytes(32), 'hex');
  v_expires_at timestamptz := now() + interval '30 days';
begin
  delete from ashitamo.sessions where user_id = p_user_id and expires_at <= now();

  insert into ashitamo.sessions (token_hash, user_id, expires_at)
  values (ashitamo.hash_token(v_token), p_user_id, v_expires_at);

  return jsonb_build_object(
    'token', v_token,
    'expires_at', v_expires_at,
    'user', ashitamo.user_profile(p_user_id)
  );
end;
$$;

-- トークンを検証してユーザー ID を返す。期限内なら last_seen_at を更新する
create function ashitamo.session_user_id(p_token text)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  update ashitamo.sessions
     set last_seen_at = now()
   where token_hash = ashitamo.hash_token(p_token)
     and expires_at > now()
  returning user_id into v_user_id;

  if v_user_id is null then
    raise exception 'invalid_session';
  end if;
  return v_user_id;
end;
$$;

create function ashitamo.require_admin(p_token text)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_user_id uuid := ashitamo.session_user_id(p_token);
begin
  if not exists (select 1 from ashitamo.users where id = v_user_id and role = 'admin') then
    raise exception 'forbidden';
  end if;
  return v_user_id;
end;
$$;

-- 課金ステータス変更の唯一の入口。管理画面と、将来の決済 Webhook（service_role）から呼ぶ
create function ashitamo.set_subscription_status(
  p_user_id uuid,
  p_status ashitamo.subscription_status,
  p_source text,
  p_actor_id uuid default null
)
returns void
language plpgsql
set search_path = ''
as $$
declare
  v_from ashitamo.subscription_status;
begin
  select status into v_from from ashitamo.subscriptions where user_id = p_user_id for update;
  if not found then
    raise exception 'user_not_found';
  end if;
  if v_from = p_status then
    return;
  end if;

  update ashitamo.subscriptions set status = p_status, updated_at = now() where user_id = p_user_id;

  insert into ashitamo.subscription_events (user_id, from_status, to_status, source, actor_id)
  values (p_user_id, v_from, p_status, p_source, p_actor_id);
end;
$$;

grant execute on function ashitamo.set_subscription_status(uuid, ashitamo.subscription_status, text, uuid) to service_role;

-- ---------------------------------------------------------------------------
-- Public API (ashitamo_api) — security definer で ashitamo のテーブルに触れる
-- ---------------------------------------------------------------------------

create function ashitamo_api.sign_up(p_email text, p_password text, p_display_name text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(p_email));
  v_display_name text := btrim(p_display_name);
  v_user_id uuid;
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid_email';
  end if;
  -- bcrypt は 72 バイトを超えた分を無視するため上限を設ける
  if char_length(p_password) < 8 or octet_length(p_password) > 72 then
    raise exception 'invalid_password';
  end if;
  if char_length(v_display_name) not between 1 and 50 then
    raise exception 'invalid_display_name';
  end if;

  insert into ashitamo.users (email, password_hash, display_name)
  values (v_email, extensions.crypt(p_password, extensions.gen_salt('bf', 10)), v_display_name)
  on conflict (email) do nothing
  returning id into v_user_id;

  if v_user_id is null then
    raise exception 'email_taken';
  end if;

  insert into ashitamo.subscriptions (user_id) values (v_user_id);
  insert into ashitamo.subscription_events (user_id, to_status, source) values (v_user_id, 'pending', 'signup');

  return ashitamo.create_session(v_user_id);
end;
$$;

-- 認証失敗時は例外ではなく null を返す（例外だと login_attempts への記録もロールバックされるため）
create function ashitamo_api.sign_in(p_email text, p_password text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(p_email));
  v_user_id uuid;
  v_hash text;
  v_ok boolean;
begin
  if (
    select count(*)
      from ashitamo.login_attempts
     where email = v_email
       and not succeeded
       and attempted_at > now() - interval '15 minutes'
  ) >= 5 then
    raise exception 'too_many_attempts';
  end if;

  select id, password_hash into v_user_id, v_hash from ashitamo.users where email = v_email;

  -- 未登録でも同じ重さの bcrypt を回し、応答時間から登録有無が分からないようにする
  v_ok := coalesce(extensions.crypt(p_password, coalesce(v_hash, extensions.gen_salt('bf', 10))) = v_hash, false);

  delete from ashitamo.login_attempts where email = v_email and attempted_at < now() - interval '1 day';
  insert into ashitamo.login_attempts (email, succeeded) values (v_email, v_ok);

  if not v_ok then
    return null;
  end if;
  return ashitamo.create_session(v_user_id);
end;
$$;

create function ashitamo_api.sign_out(p_token text)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from ashitamo.sessions where token_hash = ashitamo.hash_token(p_token)
$$;

create function ashitamo_api.get_me(p_token text)
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select ashitamo.user_profile(ashitamo.session_user_id(p_token))
$$;

create function ashitamo_api.admin_list_members(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform ashitamo.require_admin(p_token);
  return coalesce(
    (select jsonb_agg(ashitamo.user_profile(u.id) order by u.created_at desc) from ashitamo.users u),
    '[]'::jsonb
  );
end;
$$;

create function ashitamo_api.admin_set_subscription_status(p_token text, p_user_id uuid, p_status text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_admin_id uuid := ashitamo.require_admin(p_token);
begin
  perform ashitamo.set_subscription_status(p_user_id, p_status::ashitamo.subscription_status, 'admin', v_admin_id);
  return ashitamo.user_profile(p_user_id);
end;
$$;

grant execute on all functions in schema ashitamo_api to anon, authenticated, service_role;

-- PostgREST のスキーマキャッシュを更新
notify pgrst, 'reload schema';

-- 最初の管理者は SQL Editor から昇格させる:
--   update ashitamo.users set role = 'admin' where email = 'you@example.com';
