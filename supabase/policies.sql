-- Run this in the Supabase SQL editor after `npm run db:push` has created the tables.

alter table public.custom_drinks enable row level security;
alter table public.drink_logs enable row level security;
alter table public.user_settings enable row level security;

create policy "Users can manage their own custom drinks"
  on public.custom_drinks
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own drink logs"
  on public.drink_logs
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own settings"
  on public.user_settings
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
