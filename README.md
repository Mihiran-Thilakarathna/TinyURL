<div align="center">
  <h1 align="center">TinyURL</h1>
  <p align="center">
    <strong>A modern, open-source URL shortener built with Next.js</strong>
  </p>
  <p align="center">
    <a href="https://www.tiny-url.tech/">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-%238B5CF6?style=for-the-badge" alt="Live Demo" />
    </a>
  </p>
</div>

## 🚀 Overview

TinyURL is a robust, full-stack URL shortener application designed to provide a complete toolkit to create, secure, and track your URLs without the bloat. Whether you need a quick short link, a custom alias, or a password-protected gateway, TinyURL has you covered.

**[Try it live at www.tiny-url.tech](https://www.tiny-url.tech/)**

## ✨ Features

- 🔗 **URL Shortening:** Convert long, unwieldy URLs into clean, shareable links instantly.
- 🎨 **Custom Aliases:** Personalize your shortened links with custom slugs (e.g., `tiny-url.tech/my-custom-link`).
- 🔒 **Password Protection:** Secure sensitive links by requiring a password to access them.
- ⏳ **Expiration Dates:** Set a time limit for your links, after which they automatically expire.
- 📱 **QR Codes:** Generate and download QR codes for your shortened URLs for easy mobile sharing.
- 📊 **Click Analytics:** Track the performance of your links.
- 🔐 **Authentication:** Secure Google Sign-In using NextAuth.
- 🛡️ **Rate Limiting:** Built-in rate limiting with Upstash Redis to prevent abuse.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Caching & Rate Limiting:** [Upstash Redis](https://upstash.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Auth.js) v4

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (or a Supabase project)
- A Redis database (e.g., Upstash)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TinyURL.git
   cd TinyURL
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database
   DATABASE_URL="your-postgresql-connection-string"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Upstash Redis (for Rate Limiting)
   UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"
   ```

4. **Initialize the Database:**
   Push the Prisma schema to your database:
   ```bash
   npm run db:push
   # or npm run db:migrate
   ```
   Generate the Prisma client:
   ```bash
   npm run db:generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the MIT License.
