# Website Analytics — Vercel Web Analytics API

A tutorial demonstrating how to use the [Vercel Web Analytics API](https://vercel.com/docs/analytics/api) to query visitor and pageview data. Two implementations are provided: **Next.js** (server-side API route) and **React + Vite** (client-side).

**Live:** https://website-analytics-vercel-zeta.vercel.app/

## Prerequisites

- A Vercel project with [Web Analytics](https://vercel.com/docs/analytics) enabled
- A [Vercel API token](https://vercel.com/account/tokens)
- Your Vercel Project ID (found in **Project → Settings → General**)

## Environment Variables

Project ID is optional and can be hardcoded

| Variable   | Next.js (`.env.local`) | React/Vite (`.env`)      |
| ---------- | ---------------------- | ------------------------ |
| Project ID | `VERCEL_PROJECT_ID`    | `VITE_VERCEL_PROJECT_ID` |
| API Token  | `VERCEL_TOKEN`         | `VITE_VERCEL_TOKEN`      |

## Project Structure

```
├── nextjs-ver/      # Next.js implementation
└── react-ver/       # React + Vite implementation
```

---

## Next.js Version (`nextjs-ver/`)

Uses a **server-side API route** to keep the Vercel token secure.

### Key Routes

| Route            | Description                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`              | Home — displays total **visitors** and **pageviews**                                                                                                       |
| `/projects`      | Displays pageview count filtered to the `/projects` path                                                                                                   |
| `/experiences`   | Displays pageview count filtered to the `/experiences` path                                                                                                |
| `/api/analytics` | API route that proxies requests to `api.vercel.com/v1/query/web-analytics/visits/count`. Accepts an optional `?filter=` query param to filter by page path |

### How it works

1. The `<Analytics />` component from `@vercel/analytics/next` is added in the root layout to track visits.
2. Pages fetch `/api/analytics` (with an optional `?filter=<page>` param) to get visit counts.
3. The API route reads `VERCEL_PROJECT_ID` and `VERCEL_TOKEN` from server-side env vars — **the token is never exposed to the client**.

---

## React Version (`react-ver/`)

Uses **Vite** with `react-router-dom` and calls the Vercel API **directly from the client** via `axios`.

### Key Routes

| Route         | Description                                          |
| ------------- | ---------------------------------------------------- |
| `/`           | Home — displays total **visitors** and **pageviews** |
| `/projects`   | Displays pageview count filtered to `/projects`      |
| `/experience` | Displays pageview count filtered to `/experience`    |

### How it works

1. The `<Analytics />` component from `@vercel/analytics/react` is rendered in `App.jsx` to track visits.
2. Each page calls `https://api.vercel.com/v1/query/web-analytics/visits/count` directly with `axios`, passing the project ID and an optional `filter` param.

> **⚠️ Security Note:** The React version exposes `VITE_VERCEL_TOKEN` in the client bundle. This is intentional for demo purposes only. In production, proxy the request through a backend (see the Next.js version for an example).

---

## Getting Started

```bash
# Next.js
cd nextjs-ver
npm install
npm run dev

# React + Vite
cd react-ver
npm install
npm run dev
```

---

## Use Cases & Advice

- **Portfolio / personal sites** — Show a live visitor counter on your landing page to add social proof without third-party widgets.
- **Per-page analytics** — Use the `filter` param (`requestPath eq '/some-page'`) to display view counts on individual blog posts, project pages, or docs.
- **Internal dashboards** — Build a lightweight analytics dashboard for your team without needing Google Analytics or paid tools.
- **A/B content decisions** — Compare pageview counts across pages to identify which content resonates most with your audience.
- **Choose the right approach:**
  - Use the **Next.js pattern** (API route proxy) for production apps — it keeps your token secure.
  - Use the **React pattern** (direct client call) only for quick prototyping or private/internal tools where token exposure is acceptable.
