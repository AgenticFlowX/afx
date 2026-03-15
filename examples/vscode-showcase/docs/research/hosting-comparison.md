---
afx: true
type: RES
status: Accepted
version: 1.0
created: 2026-03-07T14:00:00.000Z
owner: '@rix'
tags: [research, infrastructure, hosting]
---

# Research: Hosting Platform Comparison

## Question

Where should we host the web app and API — Vercel, Railway, or self-managed AWS?

## Options Evaluated

### Option A: Vercel (Web) + Railway (API)

- Vercel: Best-in-class Next.js hosting, edge functions, preview deployments
- Railway: Simple container hosting for the API, managed Postgres included
- **Concern**: Two platforms to manage, but each does one thing well

### Option B: AWS (ECS + RDS)

- Full control over infrastructure
- ECS for container orchestration, RDS for managed Postgres
- **Concern**: Significant ops overhead for a small team, slow iteration on infra changes

### Option C: Vercel for everything

- Deploy API as Vercel serverless functions alongside the web app
- Single platform, simpler deployment
- **Concern**: Serverless cold starts on auth endpoints, connection pooling complexity with Postgres

## Decision

**Option A** — Vercel for web app, Railway for API + Postgres.

## Rationale

- Vercel gives us instant preview deployments for every PR — essential for design review
- Railway's managed Postgres eliminates database ops burden
- Separating web and API allows independent scaling and deployment
- Total cost for MVP stage: ~$25/month (Railway Starter + Vercel Pro)

## Follow-up

- Set up Railway project with Postgres addon
- Configure Vercel project with environment variables pointing to Railway API
- Set up GitHub Actions for API deployment to Railway on merge to main
