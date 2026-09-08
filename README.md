# 芦原・倉林研究室

Ashihara-Kurabayashi Lab. — 東京理科大学 創域情報学部 情報理工学科。

研究室提供の原稿をもとにした、日本語・英語対応の研究室ホームページです。

## 開発

Node.js 22.13 以降を使用します。

```sh
npm ci
npm run dev
```

```sh
npm run build
npx tsc --noEmit
npm test
```

React / TypeScript / Vite を使用した静的SPAです。開発時のURLは起動時に表示されます。

## 静的ビルドとGitHub Pagesへの公開

```sh
npm run build
```

`dist/` に `index.html`、JavaScript、CSS、`.nojekyll` が生成されます。このディレクトリーの内容をそのまま静的ホスティングに配置できます。公開環境にはNode.js、Cloudflare Workers、SSR、APIサーバーは不要です。

GitHub Pagesでは次の手順で公開します。

1. リポジトリーの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定します。
2. 変更を `main` ブランチへpushします。別のブランチから公開する場合は `.github/workflows/pages.yml` の `on.push.branches` を変更してください。
3. ワークフローが依存関係のインストール、型チェック、ルーティングテスト、ビルドを実行し、`dist/` を公開します。Actions画面から手動実行もできます。

アセットは相対パスで出力するため、`https://<user>.github.io/<repository>/`、ユーザーサイトのルート、カスタムドメインのいずれにも同じビルドを配置できます。設定方法の参考: [GitHub Pagesのカスタムワークフロー](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

内部の画面切り替えは `#/research` のようなURLのハッシュ変更をReactが検知し、DOMのみを更新します。全画面のコードは初回に読み込むため、切り替え時のHTML・データ取得はありません。ページ内目次は `#/research#projects`、研究実績の年は `#/publications#year-2026` の形式です。URLの共有、直接アクセス、再読み込み、ブラウザーの戻る・進むに対応し、サーバーのリライト設定や404ページによる転送は不要です。旧形式の `/research` などは使用せず、リンクをハッシュ形式へ更新してください。

ビルド結果を手元で確認する場合は `npm run preview`（または `npm start`）を実行します。これは確認用の静的配信で、公開サイトの実行に必要なサーバーではありません。HTMLを `file://` で直接開く方式には対応していません。

## 内容の更新

- `app/content.ts`: 日本語・英語の表示文言。研究テーマ、研究成果、メンバー、配属案内、FAQを両言語で更新します。
- `app/publications.ts`: 論文・研究業績32件の書誌情報と出典リンク。
- `components/publications-list.tsx`: 全32件の年別一覧と発表年へのページ内リンク。
- `app/page.tsx`: 研究室の概要と各ページへの入口。
- `app/navigation.ts`: 7ページの共通メニュー、ページ案内、見出しの日英文言。
- `app/main.tsx`: Reactの起動と7画面の対応表。すべてブラウザー内で描画します。
- `components/research-page.tsx`: 研究テーマ、計算環境、5つの研究事例。
- `components/people-page.tsx`: 教員の専門分野、経歴、連絡先。
- `components/publications-page.tsx`: 年別の研究実績。
- `components/students-page.tsx`: 配属案内、研究室生活、卒業研究の進め方、FAQ。
- `components/page-header.tsx`: 各ページの明確なタイトルとページ内目次。
- `components/page-link.tsx`: 内部リンクとページ内リンクをハッシュ形式へ変換します。外部リンクは通常のリンクのままです。
- `components/spa-router.tsx` / `lib/spa-navigation.ts`: ハッシュの解析と変更検知、画面切り替え後のスクロール・フォーカス制御。
- `components/site-shell.tsx`: 全ページ共通のナビゲーション、フッター、テーマ・言語の切り替え。
- `components/access-page.tsx`: 所在地とGoogleマップ。
- `components/contact-page.tsx`: 指定Googleフォームの埋め込み。
- `app/page-content.ts`: アクセス・お問い合わせの日英文言、所在地、フォームURL。
- `components/knowledge-field.tsx`: 波形が連続して変化するSVGアニメーション。
- `app/globals.css`: 配色、文字、余白、レスポンシブ表示。`:root` と `.dark` がテーマの定義です。
- `index.html`: 初期タイトル、説明文、初期テーマ、検索エンジン向け設定。表示中の画面と言語に応じて `components/site-shell.tsx` がタイトルと説明文を更新します。

研究の三本柱、研究テーマと5つの事例、教員紹介、関連業績、配属時に求めるスキル、研究室生活、成長ロードマップ、FAQ、教員へのメールリンクを掲載しています。内容は研究室提供の原稿を編集・英訳したものです。

書誌情報は提供原稿に基づき、重複していたRayauthを1件に整理しています。原稿の改行・空白に起因するDOIやURLの表記崩れを修正し、掲載予定の論文はその状態を維持しています。2026年以前の関連業績も含み、すべてを新設研究室の在籍中の成果として扱うものではありません。論文タイトルと著者名は両言語で原文を保持しています。

正式公開前に、`index.html` の `robots` 設定を公開方針に合わせて変更してください。現在はデザイン確認用のため `noindex, nofollow` です。

所属の英語表記は東京理科大学の公式ページに基づきます。
https://www.tus.ac.jp/en/fac/ist/ist/

芦原栄登士氏の英語氏名は情報処理学会の著者表記を確認しています。
https://ipsj.ixsq.nii.ac.jp/records/30220

## 表示と操作

- 日本語・英語の切り替えと端末内への設定保存。
- 初回はOS設定にかかわらずライトテーマ。ユーザーが選択したライト／ダークテーマは端末内に保存。
- 背景動画を使用しない、SVGとCSSによる穏やかな無限ループ。
- アニメーションの一時停止と `prefers-reduced-motion` への対応。
- モバイルメニュー、キーボード操作に対応するFAQ、本文へのスキップリンク。
- `#/research`・`#/people`・`#/publications`・`#/students`: 情報ごとに切り替える画面。日本語ではナビゲーションと見出しも日本語で表示します。
- `#/access`: 東京理科大学野田キャンパス6号館4Fの住所とGoogleマップ。
- `#/contact`: 研究室指定のGoogleフォーム。質問文は元フォームの表記を保持し、周辺の案内とGoogle標準UIは日英を切り替えます。
- 地図・フォームはGoogleから読み込みます。表示できない環境向けに外部で直接開くリンクも用意しています。
- ロゴ画像、架空の研究実績、未確定の連絡先は使用していません。

## 確認

`npm test` で、ルート／リポジトリー配下のURL、全7画面、ページ内目次、直接アクセス用ハッシュ、不明な画面・不正なエンコード、外部リンクの扱いを検証します。`npm run typecheck` と `npm run build` で型と静的出力を確認できます。実ブラウザーの操作・画面テストは未実施です。

既存のSites向け設定は `.openai/hosting.json` に残し、同じ `dist/` を配信する静的構成に変更しています。GitHub Pagesでの公開にはSitesの契約・接続やサーバー機能は必要ありません。
