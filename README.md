# WCCHUN Portfolio

The portfolio website of Hong Kong artist and creative technologist WCCHUN. It presents selected interactive installations, generative artworks, creative-technology experiments, and project details through a responsive editorial interface.

## Technology

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- vinext and Vite
- Cloudflare Workers
- Optional Cloudflare D1 with Drizzle ORM

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm run build
```

## Useful commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm test             # Build and test rendered HTML
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations
```

## Repository structure

```text
app/                  Pages, layout, portfolio data, and site styling
public/art/           Portfolio thumbnails and project imagery
public/art/details/   Detailed artwork assets
public/art/legacy/    Archive imagery from earlier projects
worker/               Cloudflare worker entry point
db/                   Optional D1/Drizzle database setup
tests/                Rendered-output checks
```

The main portfolio content is maintained in `app/portfolio.tsx`, with page composition in `app/page.tsx` and the global visual system in `app/globals.css`.

## Deployment

The application is configured for vinext and Cloudflare Workers. Review the hosting configuration and environment bindings before deploying a new production version.
