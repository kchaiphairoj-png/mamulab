-- =====================================================================
-- Phase 0 migration: generalise memberships → product-scoped entitlements
-- =====================================================================
-- Run once in Supabase SQL editor. Idempotent — safe to re-run.
--
-- What it does:
--   1. Adds product_code to `memberships` and `payments` (default 'library'
--      so all existing rows are preserved as Library purchases).
--   2. Adds composite indexes so the most common entitlement lookup
--      (user + product + status) stays fast.
--   3. Allows one user to hold multiple concurrent product entitlements
--      (e.g. Library + Course + Inner Circle).
--
-- Roll-back:
--   alter table public.memberships drop column product_code;
--   alter table public.payments drop column product_code;
-- =====================================================================

alter table public.memberships
  add column if not exists product_code text not null default 'library';

alter table public.payments
  add column if not exists product_code text not null default 'library';

-- One active entitlement per (user, product) at a time. Past expired rows
-- don't conflict because the index only covers status='active'.
create unique index if not exists memberships_one_active_per_product
  on public.memberships (user_id, product_code)
  where status = 'active';

-- Common lookup: "what does this user own right now?"
create index if not exists memberships_user_product_status_idx
  on public.memberships (user_id, product_code, status);

-- For analytics / admin queries.
create index if not exists payments_product_code_idx
  on public.payments (product_code, status);

-- Optional: leave a note so future contributors know products live in code,
-- not in the DB.
comment on column public.memberships.product_code is
  'Slug into lib/products.ts PRODUCTS registry. Defaults to ''library'' for backwards compat.';
comment on column public.payments.product_code is
  'Slug into lib/products.ts PRODUCTS registry. Defaults to ''library'' for backwards compat.';
