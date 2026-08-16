<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# TinyURL Project Guidelines

Welcome to the TinyURL repository. As an AI Agent working on this codebase, you must adhere to the following rules and best practices:

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + UI components (Lucide icons, class-variance-authority, clsx, tailwind-merge)
- **Database ORM:** Prisma
- **Database:** Supabase (PostgreSQL)
- **Caching / Rate Limiting:** Upstash Redis
- **Auth:** NextAuth (Auth.js) v4

## Coding Standards

### 1. TypeScript Strictness
- Always provide proper types or interfaces for all components, API requests, and responses.
- Avoid using `any`. Use `unknown` if absolutely necessary, but prefer strict Zod schemas for validation.

### 2. Next.js App Router Patterns
- By default, assume all components in `app/` are Server Components. 
- Only add `"use client";` at the top of a file when you need interactivity (e.g., `useState`, `onClick`, `useSession`, window objects).
- Fetch data on the server when possible. Use Server Actions or API routes (`route.ts`) for mutations.

### 3. Tailwind & Styling
- Avoid inline CSS. Rely strictly on Tailwind utility classes.
- Maintain the aesthetic of the project: use dark-mode optimized colors (e.g., `bg-slate-950`), vibrant gradients (`from-violet-600 to-indigo-600`), and glassmorphism effects (`bg-white/5 border-white/10`).

### 4. Code Cleanliness
- Keep components small, modular, and focused on a single responsibility.
- Do NOT generate overly long or excessive inline comments unless they explain complex logic. Let the code be self-documenting.
- Follow the DRY (Don't Repeat Yourself) principle.

### 5. Git & Commits
- Do not commit `.env` or `.env.local` files.
- Commit messages should be descriptive and concise.

*These rules ensure that the TinyURL project remains clean, secure, and easily maintainable.*
