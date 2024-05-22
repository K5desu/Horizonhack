```js
Header Image
```

:triangular*flag_on_post: [*英語*](https://github.com/Ryukoku-Horizon/2023-Hack-S-no1) / [*日本語\_](README.ja-JP.md)

# Link Mono - 日本語 🚀

Link Monoは、ZennやQiitaのようなプラットフォームからインスパイアを受けた、技術知識共有スペースです．Horizonコミュニティに飛び込みましょう．ここは、学びとつながりをベースとしています．このスペースの特徴は？GitHubログインと組織認証を使用して、あなたの知見を記事で共有し、スタイリッシュなカードを使って成果物を披露できます！

## 特徴 🛠️

- **GitHub ログイン＆組織認証:** 安全にログインし、組織内で記事作成やプロジェクトの成果物カードなどの機能にアクセスできます．

- **Markdown を使用した記事作成:** 強力でシンプルな Markdown を活かして、さまざまな技術トピックに関する記事を作成して共有できます．

- **プロジェクト展示カード:** カード形式で成果物を共有。カードをクリックすると指定したURL（製品やリポジトリ）に移動します．

- **コミュニティリンク:** 活気ある Horizon コミュニティ内の学習仲間と繋がることができます．

- **知識共有:** 知見と学習経験を交換できる環境を育てます．

- **一般公開:** 外部ユーザーでも、ログインせずに記事やプロジェクトを閲覧できます．

## 始め方 🚀

1. **Link Mono を訪れる:** 以下にアクセスして、すぐにその空間に飛び込むことができます．

   [Link Mono]() _(準備中)_

2. **探索してつながる:** サイトにアクセスしたら、記事やプロジェクトのカードを探索し、活気あるHorizonコミュニティ内で他の学習者とつながりましょう．

3. **共有して貢献:** 記事を作成したり、プロジェクトを披露したりして、気軽に貢献してください。協力的な空間に参加し、コミュニティと知識を共有しましょう．

4. **楽しい学びと交流を！ 🌐✨**

## このプロジェクトに貢献する場合 🤝

1. **リポジトリをクローン:**

   ```bash
   git clone https://github.com/Ryukoku-Horizon/2023-Hack-S-no1.git
   ```

2. **依存関係をインストール:**

   ```bash
   cd link-mono
   npm install
   ```

3. **新しいからのファイルを作成:**

   ```bash
   touch .env
   ```

4. **Vercel PostgresとVercel Blobの環境変数を取得:**
   [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) と [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)を作成する必要があります．

   ```js
   POSTGRES_URL = '************'
   POSTGRES_PRISMA_URL = '************'
   POSTGRES_URL_NON_POOLING = '************'
   POSTGRES_USER = '************'
   POSTGRES_HOST = '************'
   POSTGRES_PASSWORD = '************'
   POSTGRES_DATABASE = '************'
   ```

   ```js
   BLOB_READ_WRITE_TOKEN = '************'
   ```

5. **GitHub OAuth Appを作成し、環境変数を取得:**

   GitHub組織内でOAuth Appを作成する必要があります．

   - HomePage URL: `https://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

   ```js
   GITHUB_ID = '************'
   GITHUB_SECRET = '************'
   ```

6. **.envファイルを更新:**

   先ほど取得した環境変数を追加してください．

   ```js
   NEXTAUTH_URL = 'http://localhost:3000'
   NEXTAUTH_SECRET = '************' // `openssl rand -base64 32`

   GITHUB_ORG = 'DammyOrg' // Your GitHub Organization Name
   ADMIN_USER_IDS = '88787489' // GitHub ID of the user you want to be Admin. (Integer)
   ```

7. **アプリケーションを実行:**

   ```bash
   npm run dev
   ```

   または

   ```bash
   npm run build
   npm run start
   ```

8. **ブラウザで [http://localhost:3000](http://localhost:3000) を訪れてください．**

Link Monoで楽しくコーディングと知識共有を！ 🚀🌈

---

Created by [@Riku-Mono](https://github.com/Riku-mono) and [@K5desu](https://github.com/K5desu)
