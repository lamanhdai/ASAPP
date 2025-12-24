# Amazon Trend Analysis & Affiliate Content Platform

## Overview
A production‑ready **Next.js 14** application (App Router) that:
- Analyzes mock Amazon US data to surface top trends.
- Generates Pinterest‑compatible CSV files.
- Provides an admin dashboard to view, delete, and manage CSVs.
- Auto‑generates SEO‑optimized blog posts (Markdown) from CSV rows.
- Includes full SEO support (meta tags, OpenGraph, Twitter cards, JSON‑LD schema).
- Uses **TailwindCSS** with a premium dark‑mode design.
- Stores data on the filesystem (no database).
- Ready for Vercel deployment with a cron job for weekly analysis.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **csv-writer** for CSV creation
- **Dayjs** for ISO week filenames
- **Node.js fs** for file handling

## Getting Started
```bash
# Clone the repo
git clone <repo-url>
cd amazon-trend-affiliate

# Install dependencies
npm install

# Run the development server
npm run dev
```
The app will be available at `http://localhost:3000`.

## Available Scripts
- `npm run dev` – Start development server.
- `npm run build` – Create a production build.
- `npm run start` – Run the production build.
- `npm run lint` – Lint the code.
- `npm run test` – Run Jest tests.
- `npm run weekly-analysis` – Manually trigger the weekly analysis (generates a CSV).

## Deployment (Vercel)
1. Connect the repository to Vercel.
2. Vercel will detect the Next.js project automatically.
3. Ensure the `vercel.json` file is present – it configures the cron job.
4. Add any required environment variables in the Vercel dashboard (e.g., affiliate tag).

## Project Structure
```
my-amazon-trend/
├─ app/                # Next.js pages & API routes
├─ components/         # Reusable UI components (Button, Table, etc.)
├─ lib/                # Business logic (analysis, CSV, content, SEO)
├─ generated/          # Runtime‑generated CSVs and markdown posts
├─ scripts/            # Helper scripts (weekly‑analysis.ts)
├─ public/             # Static assets (icons, og‑image)
├─ styles/             # Tailwind globals
├─ .gitignore
├─ README.md
├─ package.json
├─ tsconfig.json
├─ next.config.mjs
├─ tailwind.config.cjs
└─ vercel.json
```

## License
MIT © 2025 Your Name
