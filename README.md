# アシタモハレルヤ

仲間と一緒にプロジェクトを仕掛けるオンラインサロンの MVP フロントエンドです。

- LP（`/`）
- プロジェクト・タイムライン（`/home`）
- 企画詳細・提案スレッド（`/detail`）
- 運営管理ダッシュボード（`/admin`）

データはすべてモック（`src/data`）で、バックエンドや実際の決済処理はありません。

## 開発

前提: Node.js

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # dist/ に出力
npm run lint    # 型チェック
```

## ディレクトリ構成

```
src/
  components/  各画面・UI コンポーネント
  constants/   サイト情報・ルート・表示用の定数
  data/        モックデータ
  utils/       ルーティング等のヘルパー
  types.ts     型定義
```
