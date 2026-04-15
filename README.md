# Blogify

Blogify is a React + TypeScript blog platform powered by Supabase for authentication, database, and image storage.

## Features

- User authentication (register, login, logout)
- Browse blogs and blog details
- Create, edit, and delete your own blogs
- Category-based blog filtering
- Image upload for blog posts
- Protected routes for authenticated actions

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Supabase
- Tailwind CSS + shadcn/ui

## Environment Variables

Create a `.env` file in the project root and add:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

`VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is the public (anon) Supabase key used by this project.

## Getting Started

```bash
npm ci
npm run dev
```

Open the app at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript type checking
- `npm run format` - format TypeScript files with Prettier
