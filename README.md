# Curiofold web application

The premium React SPA for Curiofold, a thoughtful visual discovery and collection platform.

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

### Netlify

Netlify configuration is provided in `netlify.toml`. It builds the Vite app from this directory, proxies `/api/v1/*` to the Cloud Run API, and falls back to `index.html` for client-side routes. Keep `VITE_API_BASE_URL` set to `/api` in Netlify; remove any older value that points the browser directly at the Cloud Run hostname.

For authenticated writes, add the exact deployed origin (for example, `https://your-site.netlify.app`) to the API function's comma-separated `ALLOWED_ORIGINS` environment variable and redeploy the API.

Google sign-in and One Tap require the same OAuth web client on both deployments:

- Netlify: set `VITE_GOOGLE_AUTH_CLIENT_ID`.
- Cloud Run/Firebase Functions: set `GOOGLE_CLIENT_ID` to the same value.
- Google Cloud Console: add the exact Netlify origin under **Authorized JavaScript origins**.

After changing Netlify environment variables, use **Clear cache and deploy site** so Vite embeds the new public client ID.

Required production settings are documented in `.env.example`. Configure the approved production domain, contact address, analytics IDs, and final raster social-card URL before launch.
