-- profiles テーブル（auth.usersと1:1）
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- articles テーブル
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS（Row Level Security）有効化
alter table public.profiles enable row level security;
alter table public.articles enable row level security;

-- profiles ポリシー
create policy "プロフィールは誰でも閲覧可能"
  on public.profiles for select using (true);

create policy "自分のプロフィールのみ更新可能"
  on public.profiles for update using (auth.uid() = id);

-- articles ポリシー
create policy "公開記事は誰でも閲覧可能"
  on public.articles for select
  using (status = 'published' or auth.uid() = user_id);

create policy "ログインユーザーは記事を作成可能"
  on public.articles for insert
  with check (auth.uid() = user_id);

create policy "自分の記事のみ更新可能"
  on public.articles for update
  using (auth.uid() = user_id);

create policy "自分の記事のみ削除可能"
  on public.articles for delete
  using (auth.uid() = user_id);

-- ユーザー登録時にprofileを自動作成するトリガー
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
