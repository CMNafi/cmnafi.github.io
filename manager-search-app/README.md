# Manager Search App

A standalone Next.js App Router workspace for the Institutional Investment Manager Intelligence Dashboard.

## Why it lives here

The production site in the repo root is an Astro static site. This workspace keeps the dashboard's server routes, API orchestration, and LLM integration isolated so it can be deployed on infrastructure that supports Next.js route handlers.

## Local setup

1. `cd manager-search-app`
2. `npm install`
3. Copy `.env.example` to `.env.local`
4. Set `SEC_API_KEY` and `OPENAI_API_KEY`
5. `npm run dev`

## Route layout

- Dashboard page: `/apps/manager-search`
- Search API: `/api/search-entity`
- Summary API: `/api/generate-summary`

## Deployment note

To mount this under `cmnafi.com/apps/manager-search`, deploy the workspace to a host that supports Next.js App Router and route handlers, then route the subpath to that deployment at the edge or reverse proxy layer.

