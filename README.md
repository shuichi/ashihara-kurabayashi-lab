# 芦原・倉林研究室

東京理科大学 創域情報学部 情報理工学科 芦原・倉林研究室Webページ

日本語・英語の研究室サイトです。Astroで14ページを静的HTMLに生成し、GitHub Pagesで公開します。Reactはビルド時のテンプレートに使用し、ブラウザーでのReact起動・hydrationは行いません。公開先にNode.js、SSR、API、データベースは不要です。

## 開発と確認

Node.js 24以降を使用します。CIはNode.js 24です。

```sh
npm ci
npm run dev
```

開発URLは起動ログを確認してください。既定のパスは `/ashihara-kurabayashi-lab/` です。

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium firefox webkit
npm run test:browser
npm run preview:static
```

`npm run preview:static` はビルド済み `dist/` を `http://127.0.0.1:4322/ashihara-kurabayashi-lab/` で確認するためのローカルツールです。存在しないURLは404を返し、SPA向けのフォールバックは行いません。`npm run preview` でもAstroのプレビューを利用できます。これらのプロセスは公開サイトには配置しません。

## URLと検索対応

| ページ       | 日本語（公開ベースパスから） | 英語                |
| ------------ | ---------------------------- | ------------------- |
| ホーム       | `/`                          | `/en/`              |
| 研究紹介     | `/research/`                 | `/en/research/`     |
| 教員紹介     | `/people/`                   | `/en/people/`       |
| 研究実績     | `/publications/`             | `/en/publications/` |
| 配属案内     | `/students/`                 | `/en/students/`     |
| アクセス     | `/access/`                   | `/en/access/`       |
| お問い合わせ | `/contact/`                  | `/en/contact/`      |

各ページは直接アクセス・再読み込みできます。言語はURLで決まり、言語切り替えは同じページと見出しへのリンクです。保存済みの言語設定で別のURLへ自動転送しません。

旧ブックマーク `#/research#projects` などは、少量のJavaScriptで `/research/#projects` に置き換えます。旧URL移行のみJavaScriptが必要です。本文、通常のページ移動、FAQ、モバイルメニューはJavaScriptを無効にしても利用できます。存在しないURLには `404.html` を表示します。

ページごとのtitle、description、canonical、日英とx-defaultのhreflang、OGP、構造化データ、`sitemap.xml`、共有画像 `social.png` を出力します。研究室全体の構造化データを使用し、未確認の個人属性や論文情報は追加していません。

開発モードと404はnoindexです。**本番ビルドは既定で `index, follow`** になります。確認用サイトを公開する場合はビルド時に `SITE_INDEXABLE=false` を指定してください。これはアクセス制限ではなく検索エンジンへの指示です。プロジェクト配下のサイトからドメイン直下の `robots.txt` は管理できないため、ページ内のmetaを用います。必要に応じて公開後にサイトマップをSearch Consoleへ登録してください。

## GitHub Pagesへの公開

1. [Pages設定](https://github.com/shuichi/ashihara-kurabayashi-lab/settings/pages)で **Build and deployment → Source → GitHub Actions** を選びます。
2. Pull requestを作成すると、型・Lint・内容・静的出力・3種類のブラウザーでの操作とアクセシビリティを検証します。
3. `main` へのpush、または `main` を選んだ手動実行で、全チェックに合格した `dist/` だけを公開します。

公開URLは [芦原・倉林研究室](https://shuichi.github.io/ashihara-kurabayashi-lab/) です。`dist/` はGit管理しません。ワークフローは検証とデプロイを分離し、Pagesへの書き込み権限はデプロイジョブに限定しています。PRから公開することはありません。

公開先を変える場合は、リポジトリーの **Settings → Secrets and variables → Actions → Variables** で次の変数を設定します。秘密情報は不要です。

| 変数             | 既定値                      | 設定例                                      |
| ---------------- | --------------------------- | ------------------------------------------- |
| `SITE_URL`       | `https://shuichi.github.io` | `https://lab.example.org`（パスを含めない） |
| `SITE_BASE`      | `/ashihara-kurabayashi-lab` | ルート公開なら `/`                          |
| `SITE_INDEXABLE` | `true`                      | 検索対象外の確認用公開は `false`            |

カスタムドメインではGitHub Pages側のドメイン・DNS・HTTPS設定も必要です。ベースパスや公開先を変更したら再ビルドします。同じHTMLを別パスにそのまま移す方式ではありません。ローカルではシェルの環境変数で指定します（`.env` の自動読み込みは使用しません）。

```sh
SITE_URL=https://lab.example.org SITE_BASE=/ SITE_INDEXABLE=false npm run build
```

誤った更新を戻す場合は、該当コミットをrevertするPRを作り、検証後に `main` へマージします。検証済みの以前の内容が再生成・再公開されます。失敗したチェックからはデプロイされないため、公開済みサイトは維持されます。

## 内容を更新する場所

| 対象                          | ファイル                                                 |
| ----------------------------- | -------------------------------------------------------- |
| 概要の本文                    | `content/about/ja.md`・`en.md`                           |
| トップページの見出し・三本柱  | `content/home/ja.json`・`en.json`                        |
| お知らせの日付・本文・リンク  | `content/news.json`（日英を同じ項目で管理）              |
| 研究テーマ・設備・事例        | `content/research/ja.json`・`en.json`                    |
| 教員紹介・経歴・メール        | `content/people/ja.json`・`en.json`                      |
| 論文の書誌情報                | `content/publications.json`（日英で共有）                |
| 研究実績ページの表示文言      | `content/publications/ja.json`・`en.json`                |
| 配属案内・研究室生活・FAQ     | `content/students/ja.json`・`en.json`                    |
| 所在地・問い合わせの表示文言  | `content/pages/ja.json`・`en.json`                       |
| 共通文言／メニュー            | `content/common/`・`content/navigation/`                 |
| 地図の検索語・既存フォームURL | `content/site.json`                                      |
| 教員写真の原本                | `assets/profile-ashihara.png`・`profile-kurabayashi.png` |
| 活動写真の原本                | `assets/activities/`                                     |
| 活動写真の説明・代替テキスト  | `content/photography/ja.json`・`en.json`                 |

日英の同じ項目を一緒に更新し、`npm test` と `npm run build` を実行してください。Markdown冒頭の `language` はファイル名と一致させます。JSONの型、空文字、日英の項目・件数の不一致、論文IDの重複、研究事例からの参照切れはビルド時に検出します。

活動写真はトップページに3テーマの入口を置き、オープンキャンパスの3枚を配属案内、Gen AI Summit 2025を教員紹介、百科事典を研究実績に掲載しています。原本から幅640・1280・1920pxのAVIF/WebPをビルド時に生成し、画面幅に合う画像を読み込みます。写真はトリミングせず、元の縦横比を保ちます。提供内容と掲載先は `docs/photo-sources.md` を参照してください。

お知らせは `date`（YYYY-MM-DD）の新しい順に直近3件をトップに表示します。追加時は一意の `id` と日英の本文を記入し、外部リンクがなければ `url` は `null` にします。論文に関する項目は `publicationId` に既存の論文IDを指定します。初期掲載分の日付・出典は `docs/news-sources.md` に記録しています。配属案内冒頭の見学・相談文は `content/students/ja.json`・`en.json` の `visit` から更新でき、募集条件・日程は確定後に記入してください。

L＋点のマークは `public/favicon.svg` をfavicon・ヘッダー・共有画像で共用します。共有画像 `social.png` はビルド時に同じSVGを合成するため、マークの更新後は再ビルドします。

論文を追加する場合は一意の `id` を付け、既存のIDは変更しないでください。新しい年は自動的に一覧へ加わります。出典のない掲載予定論文は `url: null` と `forthcoming: true` にできます。元の36件の書誌情報、著者、出典、掲載予定の状態、研究事例からの参照を保持しています。以前の所属時の業績も含み、すべてを新設研究室の在籍中の成果として扱うものではありません。

元の原稿に基づく研究内容を維持しています。所属の英語表記は[東京理科大学の公式案内](https://www.tus.ac.jp/en/fac/ist/ist/)、芦原栄登士氏の英語氏名は[情報処理学会の著者表記](https://ipsj.ixsq.nii.ac.jp/records/30220)を参照しています。

## 表示・プライバシー・保守

- 既存の配色、明朝系の見出し、波形の意匠と日英の本文を継承しています。フォントは端末内のフォントを使用します。
- 写真はビルド時にAVIF/WebPへ変換し、寸法を指定して遅延読み込みします。
- ライト／ダークの選択だけをlocalStorageに保存します。保存を禁止したブラウザーでもページは動作します。
- 波形はトップページのみで動かし、停止ボタン、OSの動きを減らす設定、画面外・バックグラウンドでの停止に対応します。
- 地図・フォームはボタンを押すまでGoogleへ接続しません。住所、直接開くリンク、教員へのメールは埋め込みなしでも利用できます。Googleフォームの質問や送信先は変更していません。
- フォーカス表示、スキップリンク、キーボード操作、狭い画面、拡大文字、印刷に対応します。モバイルメニューはHTMLの `details` / `summary` を使用し、FAQはすべての回答を常に表示します。
- 未使用のUIコンポーネント、Tailwind、旧SPAルーターを削除しました。依存バージョンとActionsのコミットを固定し、Dependabotが更新PRを作成します。更新はテスト後に取り込みます。

レイアウトは `components/`、ルート生成は `src/pages/[...page].astro`、メタ情報は `src/layouts/Document.astro`、CSSは `app/globals.css` です。`src/scripts/` はテーマ・旧URL互換・埋め込み・波形の操作だけを担当します。`sitemap.xml.ts` と `social.png.ts` はビルド時にファイルを生成し、公開先では実行されません。APIキーや秘密情報をフロントエンドへ埋め込まないでください。

## 検証と性能

`npm run build` は全14ページのHTML、内部リンク・見出し、36件の書誌情報、canonical・hreflang・サイトマップ・404を検査します。ブラウザーに配信するJavaScriptは各ページgzip換算8 KiB以下、CSSは12 KiB以下を予算とし、超過すると失敗します。JSON-LDは実行スクリプトの予算から除外します。Astroが生成する未参照のReactクライアント用ファイルは読み込まれません。

PlaywrightはChromium、Firefox、WebKitの60ケースを検証します。axeによるWCAG 2.2 AA関連の自動検査に加え、キーボード操作、直接アクセス、404、旧URL、JavaScript無効、埋め込み、画面幅320–1440px、文字200%での横はみ出しを確認します。これはアクセシビリティ適合の認証や、実機の全組み合わせの保証ではありません。公開後の利用者による確認も続けてください。

```sh
npm run test:performance
```

Chromiumでモバイル幅・CPU4倍スロットリング・下り1.6Mbps・遅延150ms・毎回キャッシュなしの3回測定を行い、`test-results/performance.json` に保存します。以前の静的ビルドを比較する場合は `BASELINE_DIST=/path/to/old/dist` を指定します。ローカル計測のLCP・CLS・長いタスクを記録し、実利用者のINPやCore Web Vitals合格を推定するものではありません。今回の比較と検証記録は `docs/verification.md` を参照してください。
