# Multi-Vendor Marketplace (Mini Amazon)

This repository hosts a full‑stack multi-vendor marketplace built with a Node.js/Express backend and a Next.js frontend. The project is still under active development.

## Project Structure

- `server/` – Express API (JWT auth, MongoDB, Swagger, Jest tests)
- `client/` – Next.js frontend (React Query, Tailwind, Zustand)

## Getting Started

1. `cd server && npm install`
2. `cd client && npm install`
3. Copy `.env.example` to `.env` in each app and fill in secrets.
4. `cd server && npm run dev` to boot the API, `cd client && npm run dev` for the UI.

Detailed setup, deployment, CI/CD, and video walkthrough instructions will be added once implementation stabilizes.

## Backend (server) status

- ✅ Express app scaffolded with security middlewares, Dockerfile, and docker-compose support
- ✅ MongoDB connection + User & RefreshToken models
- ✅ JWT auth flows (register, login, refresh, logout, change password) with refresh token rotation
- ✅ Swagger docs served at `/api/docs`
- ✅ Jest + Supertest coverage for core auth flows (`npm test`)

