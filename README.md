```js
Header Image
```

:triangular_flag_on_post: [English](https://github.com/Ryukoku-Horizon/2023-Hack-S-no1/edit/main/README.md) / [Japanese](https://github.com/Ryukoku-Horizon/2023-Hack-S-no1/edit/main/README.ja-JP.md)

# Link Mono 🚀

Link Mono is your tech knowledge hub, inspired by the likes of Zenn and Qiita. Dive into a Horizon community-driven space, where learning and connecting are at the core. What sets us apart? You can share your insights in articles and showcase your achievements through stylish cards – all with GitHub login and organization-wide authentication! 

## Features 🛠️

- **GitHub Login & Organization Authentication:** Securely log in and access features like article creation and project showcase cards within the organization.

- **Article Creation with Markdown:** Craft and share articles on diverse technical topics using the power and simplicity of Markdown.
  
- **Community Linking:** Connect with fellow learners within the lively Horizon community.

- **Knowledge Sharing:** Cultivate an environment for the joyful exchange of insights and learning experiences.

- **Project Showcase Cards:** Share your achievements in a sleek card format! Clicking on a card takes you to the designated URL (product or repository).

- **Public Viewing:** Even external users can browse and explore articles and projects without logging in.

## Getting Started 🚀

1. **Visit Link Mono:** You can immediately dive into the space by accessing the following.

   [Link Mono]() *(Still Getting Ready)*

3. **Explore and Connect:** Once on the site, explore articles, project showcase cards, and connect with other learners within the vibrant Horizon community. 

4. **Contribute and Share:** Feel free to contribute by creating articles or showcasing your projects. Join the collaborative space and share your knowledge with the community. 

5. **Happy Learning and Linking! 🌐✨**

## If you contribute to this project 🤝

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Ryukoku-Horizon/2023-Hack-S-no1.git
   ```

2. **Install Dependencies:**
   ```bash
   cd link-mono
   npm install
   ```

3. **Create a new empty file:**
   ```bash
   touch .env
   ```

4. **Get environment variables for Vercel Postgres and Vercel Blob:**
   You must be created [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) and [Vercel Blob](https://vercel.com/docs/storage/vercel-blob).

   ```js
   POSTGRES_URL="************"
   POSTGRES_PRISMA_URL="************"
   POSTGRES_URL_NON_POOLING="************"
   POSTGRES_USER="************"
   POSTGRES_HOST="************"
   POSTGRES_PASSWORD="************"
   POSTGRES_DATABASE="************"
   ```

   ```js
   BLOB_READ_WRITE_TOKEN="************"
   ```

5. **Create GitHub OAuth App and Get enviroment variables:**

   You need to create an OAuth App in your GitHub organisation.

   - HomePage URL: `https://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

   ```js
   GITHUB_ID="************"
   GITHUB_SECRET="************"
   ```


7. **Update to .env file:**

   Add the environment variables you have just retrieved.

   ```js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="************" // `openssl rand -base64 32`

   GITHUB_ORG="DammyOrg" // Your GitHub Organization Name
   ADMIN_USER_IDS="88787489"  // GitHub ID of the user you want to be Admin. (Integer)
   ```

9. **Run the Application:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm run build
   npm run start
   ```

10. **Visit [http://localhost:3000](http://localhost:3000) in your browser.**

Happy coding and knowledge sharing with Link Mono! 🚀🌈

---

Created by [@Riku-Mono](https://github.com/Riku-mono) and [@K5desu](https://github.com/K5desu)
