# tech-blog 要件定義

## 概要

技術者向けの記事投稿プラットフォーム（Zenn / Qiita ライク）。
シンプルな構成を優先し、記事を書いて公開することをコアとする。

---

## 技術スタック

| 項目 | 採用技術 |
|------|----------|
| フロントエンド | Next.js (App Router) + TypeScript |
| スタイリング | Tailwind CSS |
| バックエンド | Supabase (DB + Auth + Storage) |
| 認証 | Supabase Auth（Google OAuth） |
| デプロイ | Vercel（任意） |

---

## 認証

- Supabase Auth を使用
- Google OAuth によるソーシャルログイン
- 未ログインユーザーは記事の閲覧のみ可能
- 投稿・編集・削除はログインユーザーのみ

---

## 機能一覧

### MVP（最初に実装する機能）

| 機能 | 説明 |
|------|------|
| ログイン / ログアウト | Google OAuth |
| 記事一覧表示 | 公開記事を新着順で表示 |
| 記事詳細表示 | Markdown をレンダリングして表示 |
| 記事投稿 | Markdown エディタで記事を書いて投稿 |
| 記事編集 | 自分の記事のみ編集可能 |
| 記事削除 | 自分の記事のみ削除可能 |
| 下書き / 公開 | 投稿時にステータスを選択 |

### 将来拡張（今回はスコープ外）

- タグ機能
- いいね / ブックマーク
- コメント
- フォロー
- 画像アップロード
- 検索

---

## データベース設計

### `profiles` テーブル

Supabase Auth の `auth.users` と 1:1 で紐づくプロフィール情報。

| カラム | 型 | 説明 |
|--------|----|------|
| id | uuid (PK) | auth.users.id と同一 |
| username | text | 表示名 |
| avatar_url | text | アバター画像URL |
| created_at | timestamptz | 作成日時 |

### `articles` テーブル

| カラム | 型 | 説明 |
|--------|----|------|
| id | uuid (PK) | 記事ID |
| user_id | uuid (FK) | 投稿者（profiles.id） |
| title | text | タイトル |
| content | text | 本文（Markdown） |
| status | text | `draft` or `published` |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |

---

## 画面構成

```
/                        # 記事一覧（トップページ）
/articles/[id]           # 記事詳細
/articles/new            # 記事投稿（要ログイン）
/articles/[id]/edit      # 記事編集（本人のみ）
/login                   # ログインページ
/profile/[username]      # ユーザーの記事一覧（任意）
```

---

## Markdown

- `react-markdown` + `remark-gfm` でレンダリング
- コードブロックのシンタックスハイライトは `rehype-highlight` または `rehype-pretty-code`
- エディタはシンプルな `<textarea>` + プレビュー表示

---

## 環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## ディレクトリ構成（予定）

```
src/
├── app/
│   ├── page.tsx                  # 記事一覧
│   ├── login/page.tsx            # ログイン
│   ├── articles/
│   │   ├── new/page.tsx          # 記事投稿
│   │   └── [id]/
│   │       ├── page.tsx          # 記事詳細
│   │       └── edit/page.tsx     # 記事編集
├── components/
│   ├── ArticleCard.tsx
│   ├── MarkdownEditor.tsx
│   └── MarkdownPreview.tsx
├── lib/
│   └── supabase/
│       ├── client.ts             # クライアントサイド用
│       └── server.ts             # サーバーサイド用
└── types/
    └── index.ts                  # 型定義
```
