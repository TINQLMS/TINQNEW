TINQLMS is a secure, scalable LMS with role-based access for admins, instructors, and students.

Quickstart (Web + Supabase)

1) Requirements
- Node 18+

2) Install
- From repo root:
  - npm install

3) Configure environment
- Copy `apps/web/.env.example` to `apps/web/.env.local` and set:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY

4) Develop
- npm run dev

5) Build & Preview
- npm run build
- npm run preview

Notes
- This skeleton includes a minimal React + TypeScript PWA shell with Supabase auth (magic link). Configure OAuth providers in Supabase for social sign-in.
