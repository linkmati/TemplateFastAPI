# Project Plan: Agnostic Web Template

## Overview
A boilerplate for modern web applications using a Next.js frontend, FastAPI backend, and Supabase (PostgreSQL + Auth). Designed to be "service agnostic" by using standard tools that can be easily migrated.

## Stack
- **Frontend:** Next.js (App Router, TypeScript, CSS Modules)
- **Backend:** FastAPI (Python 3.11+, SQLModel for ORM)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (integrated with Next.js and FastAPI)
- **Deployment:** Vercel (Frontend), [Anywhere] (Backend - Dockerized)

## Project Structure
```text
/
├── frontend/             # Next.js Application
├── backend/              # FastAPI Application
├── docker-compose.yml    # Local development orchestration
├── README.md             # Documentation
└── .github/              # GitHub Actions for CI/CD
```

## Implementation Steps
1. **Infrastructure Setup:**
   - Create `docker-compose.yml` for local Postgres (mimicking Supabase locally).
   - Setup basic repository structure.

2. **Backend Development (FastAPI):**
   - Initialize FastAPI project.
   - Implement `SQLModel` base and database connection.
   - Setup Supabase Auth middleware (JWT verification).
   - Create sample "Item" CRUD API.

3. **Frontend Development (Next.js):**
   - Initialize Next.js project.
   - Setup Supabase client for Auth.
   - Implement basic protected dashboard and login pages.
   - Connect to FastAPI backend using Server Components and Client components.

4. **Service Agnostic Considerations:**
   - Use environment variables for all service-specific URLs and keys.
   - Keep Database interactions through an ORM (SQLModel).
   - Implement a generic Auth interface in the backend if possible.

5. **GitHub Integration:**
   - Initialize git.
   - Add `.gitignore`.
   - Prepare repository for upload.

## Verification
- Run local environment.
- Test login flow.
- Verify API endpoints.
