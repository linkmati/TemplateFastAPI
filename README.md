# Agnostic Web Template

A full-stack boilerplate with Next.js, FastAPI, and Supabase.

## Features
- **Service Agnostic:** Uses standard ORM (SQLModel) and standard JWT verification.
- **FastAPI Backend:** High performance, auto-generated docs, and easy integration.
- **Next.js Frontend:** App Router, Server Components, and Supabase Auth.
- **Supabase Integration:** Managed Database and Authentication.
- **Dockerized:** Easy local development with `docker-compose`.

## Getting Started

### 1. Prerequisites
- [Docker](https://www.docker.com/)
- [Supabase Project](https://supabase.com/)

### 2. Environment Variables

Create `.env` in the root (or set them in your environment):
```bash
SUPABASE_JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Running Locally

```bash
docker-compose up --build
```

Access the frontend at `http://localhost:3000` and the backend docs at `http://localhost:8000/docs`.

## Structure
- `/frontend`: Next.js application.
- `/backend`: FastAPI application.
- `/docker-compose.yml`: Local setup.

## Deployment

### Frontend (Vercel)
Connect your GitHub repo to Vercel. Set the `frontend` folder as the root. Add the required environment variables.

### Backend
Deploy to any Docker-supporting host (Render, Railway, Fly.io, or AWS ECS).

### Database
Use your Supabase PostgreSQL connection string in `DATABASE_URL`.
