# アシタモハレルヤ

仲間と一緒にプロジェクトを仕掛けるオンラインサロンの MVP フロントエンドです。

- LP（`/`）
- プロジェクト・タイムライン（`/home`）
- 企画詳細・提案スレッド（`/detail`）
- 運営管理ダッシュボード（`/admin`）

ログインと課金ステータスは Supabase（Postgres）で管理します。プロジェクトや投稿などその他のデータはモック（`src/data`）で、実際の決済処理はまだありません。

## 開発

前提: Node.js

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # dist/ に出力
npm run lint    # 型チェック + oxlint
npm run format  # Prettier で整形
```

## Supabase の設定

他サービスと同居するプロジェクトを想定し、専用スキーマで運用します。Supabase Auth（`auth.users`）は使わず、ログインは自前です。

| スキーマ       | 中身                                                                                | API 公開 |
| -------------- | ----------------------------------------------------------------------------------- | -------- |
| `ashitamo`     | `users` / `sessions` / `login_attempts` / `subscriptions` / `subscription_events`   | しない   |
| `ashitamo_api` | クライアントが呼ぶ関数（`sign_up` / `sign_in` / `sign_out` / `get_me` / `admin_*`） | する     |

1. `supabase/migrations/` の SQL を SQL Editor で実行（または `supabase db push`）
2. Dashboard の Settings > API > Exposed schemas に `ashitamo_api` を追加
3. `.env.example` を `.env.local` にコピーし、Project URL と anon key を設定
4. 管理者にするユーザーを SQL Editor で昇格: `update ashitamo.users set role = 'admin' where email = '...';`

`.env.local` が未設定のときはログインなしのモックとして動作します。

サロン（`/home`・`/detail`）に入れるのは課金ステータスが `active` の会員だけです。未ログインなら登録画面、ログイン済みで未課金なら支払い画面が開きます。決済は未連携のため支払い画面はモックで、支払いを完了する（このブラウザに記録）か「スキップ（モック用）」（このアクセス中のみ）で入れます。決済連携後は `src/constants/billing.ts` の `IS_PAYMENT_MOCK` を `false` にしてスキップを外します。

- パスワードは pgcrypto の bcrypt でハッシュ化。セッションは 30 日有効のランダムトークンで、DB には SHA-256 のみ保存
- 同じメールアドレスで 15 分間に 5 回ログインに失敗するとロック
- 課金ステータス: `pending`（新規）/ `active` / `past_due`（決済エラー）/ `paused`（休会）/ `canceled`（退会）。変更は `ashitamo.set_subscription_status` に集約し、`subscription_events` に履歴を残す。決済サービスの Webhook からは service_role でこの関数を呼ぶ想定

## ディレクトリ構成

```
src/
  components/  画面ごとのコンポーネント（ui/ は共通部品）
  constants/   サイト情報・ルート・表示用の定数
  data/        モックデータ
  hooks/       React フック（useAuth）
  lib/         Supabase クライアントと認証 API
  utils/       ルーティング等のヘルパー
  types.ts     型定義
supabase/
  migrations/  DB スキーマ（ashitamo / ashitamo_api）
```
