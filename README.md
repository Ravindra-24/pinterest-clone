# Canvas web application

The premium React SPA for the visual discovery platform. `Canvas` is a configurable working name until the rebrand and domain checks are complete.

## Stack

- Vite, React, TypeScript, React Router
- Tailwind CSS tokens with Radix UI primitives
- Redux Toolkit and RTK Query
- React Hook Form and Zod
- Masonic, Cloudinary responsive images, Sonner, Lucide
- React Helmet Async plus Vercel public-route HTML shells
- Vitest, Testing Library, and Playwright

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

The API base URL must include its `/api` prefix. The web app adds `/v1` for the current endpoints.

## Quality commands

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

On macOS the Playwright config uses the installed Google Chrome binary. CI/Linux should run `npx playwright install --with-deps chromium` before the E2E suite.

## Deployment

Vercel builds `dist/`. Direct public post, profile, and collection requests pass through `api/render.js`, which injects the same public content, canonical metadata, social cards, and JSON-LD before the SPA starts. Configure both `API_BASE_URL` and `VITE_API_BASE_URL` in Vercel because the serverless renderer and browser bundle read separate environment scopes.

Required production settings are documented in `.env.example`. Replace the working name, logo, site URL, contact address, and social image templates when the rebrand is approved.
