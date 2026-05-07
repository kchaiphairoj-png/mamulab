# Supabase Setup สำหรับ MAMULAB

ทำตามคู่มือนี้ครั้งเดียว ใช้เวลา ~10 นาที

## 1. สร้าง Project

1. ไป https://supabase.com → Sign up ด้วย GitHub
2. กด **New Project**
3. ตั้งค่า:
   - Name: `mamulab`
   - Database Password: ตั้งให้แข็งแรง (เซฟไว้)
   - Region: **Southeast Asia (Singapore)**
4. รอ ~2 นาที

## 2. รัน SQL Schema

ไปที่ **SQL Editor** → กด **New query** → copy SQL ด้านล่างไปวาง → กด **Run**

```sql
-- =============================================
-- MAMULAB Membership Schema
-- =============================================

-- 1. PROFILES — extends auth.users with display info
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  birth_date    date,
  line_id       text,
  role          text default 'member' check (role in ('member','admin')),
  created_at    timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "admins read all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin')
  );

-- 2. MEMBERSHIPS — current subscription state per user
create table public.memberships (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  plan          text not null default 'monthly',
  status        text not null default 'pending'
                  check (status in ('pending','active','expired','cancelled')),
  started_at    timestamptz,
  expires_at    timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index on public.memberships(user_id);
create index on public.memberships(expires_at);

alter table public.memberships enable row level security;

create policy "users read own memberships"
  on public.memberships for select
  using (auth.uid() = user_id);

create policy "admins manage memberships"
  on public.memberships for all
  using (
    exists (select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin')
  );

-- 3. PAYMENTS — every slip submission, verified or not
create table public.payments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  amount          integer not null,
  slip_url        text,
  slip_ref        text,                -- reference number from SlipOK
  trans_date      timestamptz,
  status          text not null default 'pending'
                    check (status in ('pending','verified','rejected')),
  verified_at     timestamptz,
  rejected_reason text,
  slipok_response jsonb,
  created_at      timestamptz default now()
);

create unique index payments_slip_ref_unique
  on public.payments(slip_ref) where slip_ref is not null;
create index on public.payments(user_id);
create index on public.payments(status);

alter table public.payments enable row level security;

create policy "users read own payments"
  on public.payments for select
  using (auth.uid() = user_id);

create policy "users insert own payments"
  on public.payments for insert
  with check (auth.uid() = user_id);

create policy "admins manage payments"
  on public.payments for all
  using (
    exists (select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin')
  );

-- 4. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Helper function: is user currently active member?
create or replace function public.is_active_member(uid uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.memberships
    where user_id = uid
      and status = 'active'
      and expires_at > now()
  );
$$;
```

## 3. Storage Bucket สำหรับสลิป

ไป **Storage** → กด **Create bucket**
- Name: `slips`
- Public: ❌ **ไม่ติ๊ก** (private)
- กด **Create**

แล้วไป **Storage → Policies** → เพิ่ม policy ดังนี้ (กด New policy → For full customization):

```sql
-- Users can upload their own slips
create policy "users upload own slips"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'slips'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can read their own slips
create policy "users read own slips"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'slips'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins can read all slips
create policy "admins read all slips"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'slips'
    and exists (select 1 from public.profiles p
                where p.id = auth.uid() and p.role = 'admin')
  );
```

## 4. Email Settings

ไป **Authentication → Email Templates** — แก้ template เป็นภาษาไทย (optional)

ที่ **Authentication → URL Configuration**:
- Site URL: `https://mamulab.com`
- Redirect URLs: เพิ่ม `https://mamulab.com/**` และ `http://localhost:3000/**`

## 5. ดึง API Keys

ไป **Project Settings → API**:
- Copy **Project URL** → ใส่เป็น env `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public** key → ใส่เป็น env `NEXT_PUBLIC_SUPABASE_ANON_KEY`

ใส่ที่ Vercel:
👉 https://vercel.com/komtharnongchais-projects/mamulab-zm8d/settings/environment-variables

ติ๊กทั้ง 3 environments → Save → Redeploy

## 6. ตั้งค่าตัวเองเป็น Admin

หลังจาก register บัญชีแรก ไป **SQL Editor** รัน:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'YOUR_EMAIL@example.com');
```

แทน YOUR_EMAIL ด้วย email ที่ใช้ register
